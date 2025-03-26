'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    username: z.string()
    .min(4, { message: 'Username must be atleast 4 characters long!' })
    .max(20, { message: 'Username must be at most 20 characters long!' }),
    email: z.string().email({message: 'Invalid email address!'}),
    password:z.string().min(8,{message: 'Passowrd must be at least 8 characters long!'})
    .regex(/[0-9]/, {message: 'Password must contain at least one number!'})
    .regex(/[\W_]/, {message: 'Password must contain at least one Special Character(@!#$%)!'}),
    firstName:z.string().min(1, {message:'First Name is required'}),
    lastName:z.string().min(1, {message:'Last Name is required'}),
    Phone:z.string().min(1, {message:'Phone is required'}),
    address:z.string().min(1, {message:'Address is required'}),
    birthday:z.date({message:'Date is required!'}),
    gender:z.enum(['Male','Female'], {message:'Gender is required!'}),
    img: z.instanceof(File)
    .optional()
    .refine(file => !file || ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type), { 
        message: "File must be a valid image type (jpeg, png, jpg, webp)!" 
    })
  });
const TeacherForm = ({type, data,}: {type:'create' | 'update'; data?:any;}) => {
   
        const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm({
          resolver: zodResolver(schema),
        });
  return (
    <form className="flex flex-col gap-8" autoComplete="off">
        <h1 className="text-xl font-semibold">Create a New Teacher</h1>
        <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
        <input type="text" {...register('username')} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" />
        {errors.username?.message && <p>{errors.username?.message.toString()}</p>}
        <span className="text-xs text-gray-400 font-medium">Personal Information</span>
        <button className="bg-blue-500 text-white p-2 rounded-md">{type === 'create' ? 'Create' : 'Update'}</button>
    </form>
  )
};

export default TeacherForm;