import prisma from "@/lib/prisma"
import { getAuthData } from "@/lib/utils/auth";

const Annoucements = async () => {
    const {role, userId} = await getAuthData();

    const roleConditions ={
        admin: {},
        teacher: {lessons: {some: {teacherId: userId!}}},
        student: {students: {some: {id: userId!}}},
        parent: {students: {some: {parentId: userId!}}}
    }
    const data = await prisma.announcement.findMany({
        take: 3,
        orderBy: {date: 'desc'},
        where:{
            ...(role !== 'admin' && {
                OR:[
                    {classId: null},
                    {
                        class: roleConditions[role as keyof typeof roleConditions] || {}
                    }
                ]
            })
        }
 })
  return (
    <div className='bg-white p-4 rounded-md'>
        <div className='flex items-center justify-between'>
            <h1 className="text-xl font-semibold">Annoucements</h1>
            <span className="text-xs text-gray-400 cursor-pointer">View All</span>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
        {data[0] &&<div className='bg-skyLight rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className="font-medium">{data[0].title}</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">{new Intl.DateTimeFormat('en-GB').format(data[0].date)}</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>
                        {data[0].description || "No data available for this announcement, please check back later."}
                    </p>
            </div>}
            {data[1] && <div className='bg-purpleLight rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className="font-medium">{data[1].title}</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">{new Intl.DateTimeFormat('en-US').format(data[1].date)}</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>
                       {data[1].description || "No data available for this announcement, please check back later."}
                    </p>
            </div>}
            {data[2] && <div className='bg-yellowLight rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className="font-medium">{data[2].title}</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">{new Intl.DateTimeFormat('en-US').format(data[2].date)}</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>
                        {data[2].description || "No data available for this announcement, please check back later."}
                    </p>
            </div>}
        </div>
    </div>
  )
}

export default Annoucements