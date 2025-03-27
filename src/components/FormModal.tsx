'use client';

import Image from "next/image";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import dynamic from "next/dynamic";
import NotFound from "@/app/not-found";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";
const TeacherForm = dynamic(()=> import('./forms/TeacherForm'),{
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(()=> import('./forms/StudentForm'),{
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type:'create' | 'update', data?:any) => JSX.Element;
} = {
  teacher: (type,data) => <TeacherForm type={type} data={data} />,
  student: (type,data) => <StudentForm type={type} data={data} />,
}
const FormModal = ({table,type,data,id}:{
    table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
    const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7';
    const bgColor = type === 'create' ? 'bg-yellow' : type === 'update' ? 'bg-sky' : 'bg-pirple';
    const [open, setOpen] = useState(false);

    const Form = () =>{
      return type == 'delete' && id ? (
      <form className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">All data will be deleted. Are you sure you want to delete this {table}?</span>
        <div className='flex flex-row gap-4 items-center justify-center'>
        <button className="text-gray-500 py-2 px-4 rounded-md border border-gray-500 w-max" onClick={()=>setOpen(false)}>Cancel</button>
        <button className="bg-[#be2326] text-white py-2 px-4 rounded-md border-none w-max">Delete</button>
        </div>
        
      </form>):type === 'create' || type ==='update' ? (
        // return appropriate form based on table and type
        forms[table](type,data)
        // <TeacherForm type="update" data={data}/>
        // <StudentForm type="create" data={data}/>
      ):(<NotFound />);
    }
  return (
     <>
  <button aria-label="actions" className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
  onClick={()=>setOpen(true)}
  >
    <Image src={`/${type}.png`} alt='' width={16} height={16} />
    </button>
    {open && <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
        <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
          <Form />
        <div className='absolute top-4 right-4 cursor-pointer' onClick={()=>setOpen(false)}>
             {/* <Image src='/close.png' alt='' width={14} height={14} /> */}
             <FaXmark className="w-5 h-5 text-[#be2326]" />
             </div>
             </div>
        </div>}
    </>
    )
}

export default FormModal