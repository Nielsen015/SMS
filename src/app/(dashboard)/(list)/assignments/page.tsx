import Pagination from "@/components/Pagination"
import Tables from "@/components/Tables"
import TableSearch from "@/components/TableSearch"
import {assignmentsData, role } from "@/lib/data"
import Image from 'next/image'
import Link from "next/link"

type Exam = {
  id:number;
  subject:string;
  class:string;
  teacher:string;
  dueDate:string;

}
const columns =[
  {header:'Subject Name',accessor:'subject'},
  {header:'Class',accessor:'class'},
  {header:'Teacher',accessor:'teacher',className:'hidden md:table-cell'},
  {header:'Due date',accessor:'dueDate',className:'hidden md:table-cell'},
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
      <td className="hidden md:table-cell">{item.dueDate}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/teachers/${item.id}`}>
          <button className='w-7 h-7 flex items-center justify-center bg-sky rounded-full' aria-label="view">
            <Image src='/edit.png' alt='' width={16} height={16} />
          </button>
          </Link>
          {role === 'admin' &&(<button className='w-7 h-7 flex items-center justify-center bg-pirple rounded-full' aria-label="view">
            <Image src='/delete.png' alt='' width={16} height={16} />
          </button>)}
          
        </div>
      </td>
    </tr>
  ); //not returning this block
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
            {role === 'admin' &&(<button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
              <Image src='/plus.png' width={14} height={14} alt='' />
            </button>)}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Tables columns={columns} renderRow={renderRow} data={assignmentsData}/>
      {/* Pagination */}
        <Pagination />
    </div>
  )
}

export default ExamsListPage