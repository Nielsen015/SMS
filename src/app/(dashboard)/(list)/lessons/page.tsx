import BulkUpload from "@/components/BulkUpload"
import DownloadFiles from "@/components/DownloadFiles"
import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Tables from "@/components/Tables"
import TableSearch from "@/components/TableSearch"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { getAuthData } from "@/lib/utils/auth"
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client"
import Image from 'next/image'
import Link from "next/link"

type LessonList = Lesson & {teacher: Teacher} &{subject: Subject} & {class:Class}
const LessonListPage = async (
  {searchParams}:{searchParams:{[key:string]:string | undefined}}) => {
// Proper auth usage
const {role, userId} = await getAuthData();
// Define columns for the table
const columns =[
  {header:'Subject Name',accessor:'subject'},
  {header:'Class',accessor:'class'},
  {header:'Teacher',accessor:'teacher',className:'hidden md:table-cell'},
  ...(role === 'admin' ? [{ header: 'Actions', accessor: 'action' }] : []),
  // {header:'Actions',accessor: 
]
const renderRow = (item:LessonList)=>(
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
    <td className="flex items-center gap-4 p-4">
    {item.subject.name}
    </td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">{`${item.teacher.name} ${item.teacher.surname}`}</td>
    <td>
      <div className='flex items-center gap-2'>
        {role === 'admin' &&(
        // <Link href={`/list/teachers/${item.id}`}>
        // <button className='w-7 h-7 flex items-center justify-center bg-sky rounded-full' aria-label="view">
        //   <Image src='/edit.png' alt='' width={16} height={16} />
        // </button>
        // </Link>
        //   <button className='w-7 h-7 flex items-center justify-center bg-pirple rounded-full' aria-label="view">
        //   <Image src='/delete.png' alt='' width={16} height={16} />
        // </button>
        <>
        <FormModal table="lesson" type="update" data={item} />
        <FormModal table="lesson" type="delete" id={item.id} />
        </>
      )}
        
      </div>
    </td>
  </tr>
); //not returning this block
  const {page, ...queryparams} = searchParams;
  const p = page? parseInt(page): 1;
  const query: Prisma.LessonWhereInput={}

    // URL Params conditions
    if (queryparams){
      for(const [key,value] of Object.entries(queryparams)){
        if(value !== undefined){
  
          switch(key){
            case 'teacherId':
              query.teacherId = value;
            break; 
            case 'classId':
              query.classId = parseInt(value);
            break;
            case 'search':
             query.OR =[
              {subject: {name: {contains: value, mode: 'insensitive'}}},
              {teacher: {name: {contains: value, mode: 'insensitive'}}},
              {class: {name: {contains: value, mode: 'insensitive'}}},
             ]
              break;
            default:
              break;
          }
        }
      }
    }
    // get teacher's data as well as count, count will be useful for pagination
  const [data,count] = await prisma.$transaction([
     prisma.lesson.findMany({
      where: query,
      include:{
        teacher: {select: {name:true, surname:true}},
        subject: {select: {name:true}},
        class: {select: {name:true}},
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
     prisma.lesson.count({
      where: query
     })
  ]);

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */}
      <div className='flex items-center justify-between'>
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
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
            {role === 'admin' &&(
            //   <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
            //   <Image src='/plus.png' width={14} height={14} alt='' />
            // </button>
            <FormModal table="lesson" type="create" />
          )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Tables columns={columns} renderRow={renderRow} data={data}/>
      {/* Pagination */}
        <Pagination page={p} count={count}/>
    </div>
  )
}

export default LessonListPage