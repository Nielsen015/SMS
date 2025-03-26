'use client';

import Image from "next/image";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

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
  return <>
  <button aria-label="actions" className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
  onClick={()=>setOpen(true)}
  >
    <Image src={`/${type}.png`} alt='' width={16} height={16} />
    </button>
    {open && <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
        <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>Hello
        <div className='absolute top-4 right-4 cursor-pointer' onClick={()=>setOpen(false)}>
             {/* <Image src='/close.png' alt='' width={14} height={14} /> */}
             <FaXmark className="w-5 h-5 text-[#be2326]" />
             </div>
             </div>
        </div>}
    </>
}

export default FormModal