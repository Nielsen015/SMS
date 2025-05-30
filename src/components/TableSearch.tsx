'use client';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const TableSearch = () => {
  // search logic
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const value = (e.currentTarget[0] as HTMLInputElement).value
    const params = new URLSearchParams(window.location.search);
    params.set('search', value);
    router.push(`${window.location.pathname}?${params}`);
  }
  const router = useRouter();
  return (
            <form onSubmit={handleSubmit} className="w-full md:auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                <Image src='/search.png' alt='' width={14} height={14}></Image>
                <input type="text" placeholder='Search...' className='w-[200px] p-2 bg-transparent outline-none'/>
            </form>
  )
}

export default TableSearch