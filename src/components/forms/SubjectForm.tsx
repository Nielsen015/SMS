 'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-phone-number-input/style.css';
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import Image from "next/image";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";


const SubjectForm = ({ type, data, }: { type: 'create' | 'update'; data?: any; }) => {
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
  const onSubmit = handleSubmit(data => {
    console.log(`Your data with ❤️❤️: ${JSON.stringify(data)}`);


  })
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
      <button className="bg-blue-500 text-white p-2 rounded-md">{type === 'create' ? 'Create' : 'Update'}</button>
    </form>
  )
};

export default SubjectForm;