 'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-phone-number-input/style.css';
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";
import { createSubject, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const SubjectForm = ({ type, data,setOpen }: { type: 'create' | 'update'; data?: any; setOpen:Dispatch<SetStateAction<boolean>> }) => {
  const [value, setValue] = useState()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    // pass inputs here
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });
  // After react 19, use Actionstate
  const [state, formAction] = useFormState(type === 'create' ? createSubject : updateSubject, {success: false, error: false});
  // const onSubmit = handleSubmit(data => {
  //   // console.log(`Your data with ❤️❤️: ${JSON.stringify(data)}`);
  //   formAction(data);
  // });
  const onSubmit = handleSubmit(formData => {
  const payload = type === 'update'
    ? { ...formData, id: data.id }
    : formData;
  formAction(payload);
});

  const router = useRouter();

   useEffect(() => {
    if (state.success){
      toast.success(`Subject has been ${type === 'create'? 'created' : 'updated'}!`)
      setOpen(false);
      router.refresh();
    }
   },[state, type, setOpen, router]);
  return (
    <form className="flex flex-col gap-8" autoComplete="off" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type==='create'? 'Create a new Subject' : 'Update the subject'}</h1>
      <div className='flex justify-between flex-wrap gap-4'> 
      <InputField 
      label='Subject name' 
      name='name' 
      defaultValue={data?.name} 
      register={register} 
      error={errors?.name} />
      </div>
      {state.error && <span className="text-red">Something went wrong!</span>}
      <button className="bg-blue-500 text-white p-2 rounded-md">{type === 'create' ? 'Create' : 'Update'}</button>
    </form>
  )
};

export default SubjectForm;