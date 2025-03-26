'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-phone-number-input/style.css';
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import Image from "next/image";

const schema = z.object({
  username: z.string()
    .min(4, { message: 'Username must be atleast 4 characters long!' })
    .max(20, { message: 'Username must be at most 20 characters long!' }),
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z.string().min(8, { message: 'Passowrd must be at least 8 characters long!' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number!' })
    .regex(/[\W_]/, { message: 'Password must contain at least one Special Character(@!#$%)!' }),
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  phone: z.string().max(1, { message: 'Phone is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],{message:'blood group can only be A+, A-, B+, B-, AB+, AB-, O+, O-'}).optional().or(z.literal('')),
  birthday: z.date({ message: 'Date is required!' }),
  gender: z.enum(['male', 'female'], { message: 'Gender is required!' }),
  img: z.instanceof(File, { message: "Image is required" }).optional(),
  // img: z.instanceof(File)
  //   .optional()
  //   .refine(file => !file || ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type), {
  //     message: "File must be a valid image type (jpeg, png, jpg, webp)!"
  //   })
});
// Pass the types of the schema to the useForm hook
type Inputs =z.infer<typeof schema>; 
const TeacherForm = ({ type, data, }: { type: 'create' | 'update'; data?: any; }) => {
  const [value, setValue] = useState()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    // pass inputs here
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit(data => {
    console.log(`Your data with ❤️❤️: ${JSON.stringify(data)}`);


  })
  return (
    <form className="flex flex-col gap-8" autoComplete="off" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a New Teacher</h1>
      <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
      <div className='flex justify-between flex-wrap gap-4'> 
      <InputField label='Username' name='username' defaultValue={data?.username} register={register} error={errors?.username} />
      <InputField label='Email' type="email" name='email' defaultValue={data?.email} register={register} error={errors?.email} />
      <InputField label='password' type="password" name='password' defaultValue={data?.password} register={register} error={errors?.password} />
      </div>
      <span className="text-xs text-gray-400 font-medium">Personal Information</span>
      <div className='flex justify-between flex-wrap gap-4'> 
      <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
            <div className='flex flex-col gap-2 rounded-sm w-full md:w-1/4'>
    <label htmlFor="" className="text-xs text-gray-500">Phone Number</label>
    <PhoneInput
    className="border border-gray-300 p-2 rounded-md text-sm w-full"
    defaultCountry="KE"
    label='Phone Number'
    defaultValue={data?.phone}
    {...register('phone')}
    international
    value={value}
    name='phone'
    onChange={setValue}/>
    {errors.phone?.message && <p className="text-xs text-[#be2326]">{errors.phone?.message.toString()}</p>}
    </div>
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
          />
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
    <label htmlFor="" className="text-xs text-gray-500">Gender</label>
    <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
    {...register('gender')}
    defaultValue={data?.gender}
    >
      <option value="male">Male</option>
      <option value='female'>Female</option>
    </select>
    {errors.gender?.message && <p className="text-xs text-[#be2326]">{errors.gender?.message.toString()}</p>}
    </div>        <div className='flex flex-col gap-2 w-full md:w-1/4 justify-center'>
    <label htmlFor="img" className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" >
      <Image alt='' src='/upload.png' width={28} height={28} />
      <span>Upload a Photo</span>
    </label>
    <input type='file' id="img" {...register('img')}  className="hidden"/>
    {errors.img?.message && <p className="text-xs text-[#be2326]">{errors.img?.message.toString()}</p>}
    </div>
        </div>
      <button className="bg-blue-500 text-white p-2 rounded-md">{type === 'create' ? 'Create' : 'Update'}</button>
    </form>
  )
};

export default TeacherForm;