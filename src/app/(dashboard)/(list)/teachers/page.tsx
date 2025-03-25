import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Tables from "@/components/Tables"
import TableSearch from "@/components/TableSearch"
import { role, teachersData } from "@/lib/data"
import Image from 'next/image'
import Link from "next/link"

type Teacher = {
  id:number;
  teacherId:string;
  name:string;
  email?:string;
  phone:string;
  address:string;
  subjects:string[];
  classes:string[];
  photo:string;

}
const columns =[
  {header:'Info',accessor:'info'},
  {header:'Teacher ID',accessor:'teacherId',className:'hidden md:table-cell'},
  {header:'Subjects',accessor:'subject',className:'hidden md:table-cell'},
  {header:'Classes',accessor:'classes',className:'hidden md:table-cell'},
  {header:'Phone',accessor:'phone',className:'hidden lg:table-cell'},
  {header:'Address',accessor:'address',className:'hidden lg:table-cell'},
  {header:'Actions',accessor:'action'},
]
const TeacherListPage = () => {
  const renderRow = (item:Teacher)=>(
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
      <td className="flex items-center gap-4 p-4">
        <Image alt='' src={item.photo} width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
        <div className='flex flex-col'>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
      </td>
      <td className="hidden md:table-cell">{item.teacherId}</td>
      <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.join(",")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/teachers/${item.id}`}>
          <button className='w-7 h-7 flex items-center justify-center bg-sky rounded-full' aria-label="view">
            <Image src='/view.png' alt='' width={16} height={16} />
          </button>
          </Link>
          {role === 'admin' &&(
          //   <button className='w-7 h-7 flex items-center justify-center bg-pirple rounded-full' aria-label="view">
          //   <Image src='/delete.png' alt='' width={16} height={16} />
          // </button>
          <FormModal table="teacher" type="delete" id={item.id} />
        )}
          
        </div>
      </td>
    </tr>
  ); //not returning this block
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */}
      <div className='flex items-center justify-between'>
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
              <Image src='/filter.png' width={14} height={14} alt='' />
            </button> 
            <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
              <Image src='/sort.png' width={14} height={14} alt='' />
            </button> 
            {role == 'admin' && (
            //   <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
            //   <Image src='/plus.png' width={14} height={14} alt='' />
            // </button>
            <FormModal table="teacher" type="create" />
          )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Tables columns={columns} renderRow={renderRow} data={teachersData}/>
      {/* Pagination */}
        <Pagination />
    </div>
  )
}

export default TeacherListPage