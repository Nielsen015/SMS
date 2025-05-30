import BulkUpload from "@/components/BulkUpload"
import DownloadFiles from "@/components/DownloadFiles"
import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Tables from "@/components/Tables"
import TableSearch from "@/components/TableSearch"
// import {assignmentsData, role } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { getAuthData } from "@/lib/utils/auth"
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client"
import Image from 'next/image'
import Link from "next/link"

type AssignmentList = Assignment & {lesson:{
  subject:Subject,
  class:Class,
  teacher:Teacher,
}}
const AssignmentListPage = async (
  {searchParams}:{searchParams:{[key:string]:string | undefined}}) => {
    // Proper auth usage
const {role, userId} = await getAuthData();
const columns =[
  {header:'Subject Name',accessor:'subject'},
  {header:'Class',accessor:'class'},
  {header:'Teacher',accessor:'teacher',className:'hidden md:table-cell'},
  {header:'Due date',accessor:'dueDate',className:'hidden md:table-cell'},
  ...(role === 'admin' || role === 'teacher' ? [{ header: 'Actions', accessor: 'action' }] : []),
  // {header:'Actions',accessor:'action'},
]
const renderRow = (item:AssignmentList)=>(
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
    <td className="flex items-center gap-4 p-4">
    {item.lesson.subject.name}
    </td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">{`${item.lesson.teacher.name} ${item.lesson.teacher.surname}`}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat('en-GB').format(item.dueDate)}</td>
    <td>
      <div className='flex items-center gap-2'>
        {(role === 'admin' || role === 'teacher') && (
           <>
           <FormModal table="assignment" type="update" data={item} />
           <FormModal table="assignment" type="delete" id={item.id} />
           </>
        // /* <Link href={`/list/teachers/${item.id}`}>
        // <button className='w-7 h-7 flex items-center justify-center bg-sky rounded-full' aria-label="view">
        //   <Image src='/edit.png' alt='' width={16} height={16} />
        // </button>
        // </Link>
        //   <button className='w-7 h-7 flex items-center justify-center bg-pirple rounded-full' aria-label="view">
        //   <Image src='/delete.png' alt='' width={16} height={16} />
        // </button> */
      )}
        
      </div>
    </td>
  </tr>
); //not returning this block
  const {page, ...queryparams} = searchParams;
  const p = page? parseInt(page): 1;
  const query: Prisma.AssignmentWhereInput={}

  query.lesson = {};
    // URL Params conditions
    if (queryparams){
      for(const [key,value] of Object.entries(queryparams)){
        if(value !== undefined){
  
          switch(key){
            case 'teacherId':
              query.lesson.teacherId =  value;
            break; 
            case 'classId':
              query.lesson.classId = parseInt(value);
            break;
            case 'search':
              query.OR = [
                {
                  lesson: {
                    subject: {
                      name: { contains: value, mode: 'insensitive' }
                    }
                  }
                },
                {
                  lesson: {
                    class: {
                      name: { contains: value, mode: 'insensitive' }
                    }
                  }
                },
                {
                  lesson: {
                    teacher: {
                      name: { contains: value, mode: 'insensitive' }
                    }
                  }
                }
              ];
              
              break;
            default:
              break;
          }
        }
      }
    }
    // ROLE CONDITIONS
    switch (role) {
      case 'admin':
        break;
      case 'teacher':
        query.lesson.teacherId = userId!;
        break;
      case 'student':
        query.lesson.class = {
          students: {
            some: {
              id: userId!,
            },
          },
        };
        break;      
      case 'parent':
        query.lesson.class = {
          students: {
            some: {
              parentId: userId!,
            },
          },
        };
        break;
      default:
        break;
    }
    // get teacher's data as well as count, count will be useful for pagination
  const [data,count] = await prisma.$transaction([
     prisma.assignment.findMany({
      where: query,
      include:{
        lesson:{
          select:{
            teacher: {select: {name:true, surname:true}},
            subject: {select: {name:true}},
            class: {select: {name:true}},
          }
        }
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
     prisma.assignment.count({
      where: query
     })
  ]);
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */}
      <div className='flex items-center justify-between'>
        <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
              <Image src='/filter.png' width={14} height={14} alt='' />
            </button> 
            <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
              <Image src='/sort.png' width={14} height={14} alt='' />
            </button>
            {/*Download Content  */}
            <DownloadFiles />
             <BulkUpload /> 
            {(role === 'admin' || role === 'teacher') && (
            //   <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
            //   <Image src='/plus.png' width={14} height={14} alt='' />
            // </button>
            <FormModal table="assignment" type="create" />
          )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Tables columns={columns} renderRow={renderRow} data={data}/>
      {/* Pagination */}
        <Pagination page={p} count={count} />
    </div>
  )
}

export default AssignmentListPage