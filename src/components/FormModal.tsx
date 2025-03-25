'use client';

import Image from "next/image";

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
  return <>
  <button aria-label="actions" className={`${size} flex items-center justify-center rounded-full ${bgColor}`}>
    <Image src={`/${type}.png`} alt='' width={16} height={16} />
    </button></>
}

export default FormModal