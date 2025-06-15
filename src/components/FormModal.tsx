'use client';

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import dynamic from "next/dynamic";
import NotFound from "@/app/not-found";
import Loader from "./Loader";
import { useFormState } from "react-dom";
import { deleteSubject } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";


// delete action map

const deleteActionMap = {
  teacher: deleteSubject,
  student: deleteSubject,
  parent: deleteSubject,
  subject: deleteSubject,
  class: deleteSubject,
  lesson: deleteSubject,
  exam: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject
   
}
const TeacherForm = dynamic(()=> import('./forms/TeacherForm'),{
  loading: () => <Loader />,
});
const StudentForm = dynamic(()=> import('./forms/StudentForm'),{
  loading: () => <Loader />,
});
const ParentForm = dynamic(()=> import('./forms/ParentForm'),{
  loading: () => <Loader />,
});
const AnnouncementForm = dynamic(()=> import('./forms/AnnouncementForm'),{
  loading: () => <Loader />,
});
const SubjectForm = dynamic(()=> import('./forms/SubjectForm'),{
  loading: () => <Loader />,
});
const AttendanceForm = dynamic(()=> import('./forms/AttendanceForm'),{
  loading: () => <Loader />,
});
const ExamForm = dynamic(()=> import('./forms/ExamForm'),{
  loading: () => <Loader />,
});
const EventForm = dynamic(()=> import('./forms/EventForm'),{
  loading: () => <Loader />,
});
const ClassForm = dynamic(()=> import('./forms/ClassForm'),{
  loading: () => <Loader />,
});
const LessonForm = dynamic(()=> import('./forms/LessonForm'),{
  loading: () => <Loader />,
});
const AssignmentForm = dynamic(()=> import('./forms/AssignmentForm'),{
  loading: () => <Loader />,
});
const ResultForm = dynamic(()=> import('./forms/ResultForm'),{
  loading: () => <Loader />,
});

const forms: {
  [key: string]: (setOpen:Dispatch<SetStateAction<boolean>>, type:'create' | 'update', data?:any) => JSX.Element;
} = {
  teacher: (setOpen, type,data) => <TeacherForm type={type} data={data} setOpen={setOpen} />,
  student: (setOpen, type,data) => <StudentForm type={type} data={data} setOpen={setOpen} />,
  parent: (setOpen, type,data) => <ParentForm type={type} data={data} setOpen={setOpen} />,
  announcement: (setOpen, type,data) => <AnnouncementForm type={type} data={data} setOpen={setOpen} />,
  subject: (setOpen, type,data) => <SubjectForm type={type} data={data} setOpen={setOpen} />,
  class: (setOpen, type,data) => <ClassForm type={type} data={data} setOpen={setOpen} />,
  lesson: (setOpen, type,data) => <LessonForm type={type} data={data} setOpen={setOpen} />,
  exam: (setOpen, type,data) => <ExamForm type={type} data={data} setOpen={setOpen} />,
  assignment: (setOpen, type,data) => <AssignmentForm type={type} data={data} setOpen={setOpen} />,
  event: (setOpen, type,data) => <EventForm type={type} data={data} setOpen={setOpen} />,
  attendance: (setOpen,type,data) => <AttendanceForm type={type} data={data} setOpen={setOpen} />,
  result: (setOpen, type,data) => <ResultForm type={type} data={data} setOpen={setOpen} />,
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
  id?: number | string;
}) => {
    const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7';
    const bgColor = type === 'create' ? 'bg-yellow' : type === 'update' ? 'bg-sky' : 'bg-pirple';
    const [open, setOpen] = useState(false);

    const Form = () =>{
      const [state, formAction] = useFormState(deleteActionMap[table], {success: false, error: false});
        const router = useRouter();
      
         useEffect(() => {
          if (state.success){
            toast.success(`Subject has been deleted!`)
            setOpen(false);
            router.refresh();
          }
         },[state, router]);
      return type == 'delete' && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium">All data will be deleted. Are you sure you want to delete this {table}?</span>
        <div className='flex flex-row gap-4 items-center justify-center'>
        <button className="text-gray-500 py-2 px-4 rounded-md border border-gray-500 w-max" onClick={()=>setOpen(false)}>Cancel</button>
        <button className="bg-[#be2326] text-white py-2 px-4 rounded-md border-none w-max">Delete</button>
        </div>
        
      </form>):type === 'create' || type ==='update' ? (
        // return appropriate form based on table and type
        forms[table](setOpen, type,data)
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
    {open && (<div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
        {/* <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] max-h-[calc(100vh+2rem)] overflow-y-auto flex items-center justify-center'> */}
        <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
          <Form />
        <div className='absolute top-4 right-4 cursor-pointer' onClick={()=>setOpen(false)}>
             {/* <Image src='/close.png' alt='' width={14} height={14} /> */}
             <FaXmark className="w-5 h-5 text-[#be2326]" />
             </div>
             </div>
        </div>
        )}
    </>
    )
}

export default FormModal