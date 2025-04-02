import BulkUpload from "@/components/BulkUpload"
import DownloadFiles from "@/components/DownloadFiles"
import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Tables from "@/components/Tables"
import TableSearch from "@/components/TableSearch"
import {resultsData, role } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { Prisma, Result } from "@prisma/client"
import Image from 'next/image'
import Link from "next/link"
import { classNames } from "primereact/utils"

type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName:string;
  teacherSurname:string;
  score: number;
  className: string;
  startTime: Date,
}
const columns =[
  {header:'Title',accessor:'title'},
  {header:'Student',accessor:'student'},
  {header:'Score %',accessor:'score',className:'hidden md:table-cell'},
  {header:'Teacher',accessor:'teacher',className:'hidden md:table-cell'},
  {header:'Class',accessor:'class',className:'hidden md:table-cell'},
  {header:'Date',accessor:'date',className:'hidden md:table-cell'},
  {header:'Actions',accessor:'action'},
];
const renderRow = (item:ResultList)=>(
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
    <td className="flex items-center gap-4 p-4">
    {item.title}
    </td>
    <td>`${item.studentName} ${item.studentSurname}`</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td className="hidden md:table-cell">`${item.teacherName} ${item.teacherSurname}`</td>
    <td className="hidden md:table-cell">{item.className}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat('en-GB').format(item.startTime)}</td>
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
        <FormModal table="result" type="update" data={item} />
        <FormModal table="result" type="delete" id={item.id} />
        </>
      )}
        
      </div>
    </td>
  </tr>
); //not returning this block
const ResultsListPage = async (
  {searchParams}:{searchParams:{[key:string]:string | undefined}}) => {
  const {page, ...queryparams} = searchParams;
  const p = page? parseInt(page): 1;
  const query: Prisma.ResultWhereInput={}

    // URL Params conditions
    if (queryparams){
      for(const [key,value] of Object.entries(queryparams)){
        if(value !== undefined){
  
          switch(key){
            case 'studentId':
              query.studentId = value;
            break; 
            // case 'classId':
            //   query.lesson ={classId: parseInt(value)};
            // break;
            case 'search':
              query.OR = [
                {
                    exam: {
                      title: { contains: value, mode: 'insensitive' }
                    }
                },
                {
                    student: {
                      name: { contains: value, mode: 'insensitive' },
                      surname: { contains: value, mode: 'insensitive' },
                      id: { contains: value, mode: 'insensitive' }
                    }
                },
              ];
              
              break;
            default:
              break;
          }
        }
      }
    }
    // get teacher's data as well as count, count will be useful for pagination
  const [dataResponse,count] = await prisma.$transaction([
     prisma.result.findMany({
      where: query,
      include:{
        student: {select: {name: true, surname:true, id:true} },
        exam:{
          include:{
            lesson:{
              select:{
                class:{select:{name:true}},
                teacher:{select:{name:true, surname:true}},
              },

            },
          },
        }, 
        assignment:{
          include:{
            lesson:{
              select:{
                class:{select:{name:true}},
                teacher:{select:{name:true, surname:true}},
              },

            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
     prisma.result.count({
      where: query
     })
  ]);
  const data = dataResponse.map(item =>{
    const assessment = item.exam || item.assignment
    if (!assessment) return null
    const isExam = 'startTime' in assessment;

    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName:assessment.lesson.teacher.name,
      teacherSurname:assessment.lesson.teacher.surname,
      className: assessment.lesson.class.name,
      score: item.score,
      startTime: isExam ? assessment.startTime: assessment.startDate,
    }
  })
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */}
      <div className='flex items-center justify-between'>
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
              <Image src='/filter.png' width={14} height={14} alt='' />
            </button> 
            <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
              <Image src='/sort.png' width={14} height={14} alt='' />
            </button>
            <DownloadFiles />
            <BulkUpload /> 
            {role === 'admin' &&(
            //   <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
            //   <Image src='/plus.png' width={14} height={14} alt='' />
            // </button>
            <FormModal table="result" type="create" />
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

export default ResultsListPage