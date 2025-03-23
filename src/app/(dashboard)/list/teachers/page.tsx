import Pagination from "@/components/Pagination"
import Tables from "@/components/Tables"
import TableSearch from "@/components/TableSearch"
import Image from 'next/image'

type Teacher = {
  id:number;
  teacherId:string;
  name:string;
  email?:string;
  phone:string;
  address:string;
  subject:string[];
  clases:string[];
  photo:string;

}
const columns =[
  {header:'Info',accessor:'info'},
  {header:'Teacher ID',accessor:'teacherId',className:'hidden md:tables-cell'},
  {header:'Subjects',accessor:'subject',className:'hidden md:tables-cell'},
  {header:'Classes',accessor:'classes',className:'hidden md:tables-cell'},
  {header:'Phone',accessor:'phone',className:'hidden lg:tables-cell'},
  {header:'Address',accessor:'address',className:'hidden lg:tables-cell'},
  {header:'Actions',accessor:'action',className:'hidden lg:tables-cell'},
]
const TeacherListPage = () => {
  const renderRow = (item:Teacher)=>{
    <tr>
      <td>
        <Image alt='' src={item.photo} width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
      </td>
      <div className=''>
        
      </div>
    </tr>
  }
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
            <button className='w-8 h-8 flex items-center justify-center bg-yellow rounded-full' aria-label="filter">
              <Image src='/plus.png' width={14} height={14} alt='' />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Tables columns={columns}/>
      {/* Pagination */}
        <Pagination />
    </div>
  )
}

export default TeacherListPage