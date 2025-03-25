import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Tables from "@/components/Tables"
import TableSearch from "@/components/TableSearch"
import {examsData, role } from "@/lib/data"
import Image from 'next/image'
import Link from "next/link"

type Exam = {
  id:number;
  subject:string;
  class:string;
  teacher:string;
  date:string;

}
const columns =[
  {header:'Subject',accessor:'subject'},
  {header:'Class',accessor:'class'},
  {header:'Teacher',accessor:'teacher',className:'hidden md:table-cell'},
  {header:'Date',accessor:'date',className:'hidden md:table-cell'},
  {header:'Actions',accessor:'action'},
]
const ExamsListPage = () => {
  const renderRow = (item:Exam)=>(
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
      <td className="flex items-center gap-4 p-4">
      {item.subject}
      </td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.date}</td>
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
          <FormModal table="exam" type="update" data={item} />
          <FormModal table="exam" type="delete" id={item.id} />
          </>
        )}
          
        </div>
      </td>
    </tr>
  ); //not returning this block
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */}
      <div className='flex items-center justify-between'>
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
              <Image src='/filter.png' width={14} height={14} alt='' />
            </button> 
            <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
              <Image src='/sort.png' width={14} height={14} alt='' />
            </button> 
            {role === 'admin' &&(
            //   <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
            //   <Image src='/plus.png' width={14} height={14} alt='' />
            // </button>
            <FormModal table="exam" type="create" />
          )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Tables columns={columns} renderRow={renderRow} data={examsData}/>
      {/* Pagination */}
        <Pagination />
    </div>
  )
}

export default ExamsListPage