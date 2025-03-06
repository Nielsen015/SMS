'use client';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

const data = [
  {
    name: 'Total',
    count: 104,
    fill: 'white',
  },
  {
    name: 'Girls',
    count: 50,
    fill: '#fae27c',
  },
  {
    name: 'Boys',
    count: 54,
    fill: '#c3ebfa',
  },
];

const CountChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        {/* Title */}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Students</h1>
            <Image  src='/moreDark.png' alt='' width={20} height={20}/>
        </div>
        {/* Chart */}
        <div className='relative w-full h-[75%]'>
        <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            // label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey="count"
          />
          {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle"/> */}
        </RadialBarChart>
      </ResponsiveContainer>
      <Image src='/maleFemale.png' alt='' width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
        </div>
        {/* bottom */}
        <div className='flex justify-center gap-16'>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-sky rounded-full' />
                <h1 className='font-bold'>1,234</h1>
                <h2 className='text-xs text-gray-500'>Boys (55%)</h2>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-yellow rounded-full' />
                <h1 className='font-bold'>1,234</h1>
                <h2 className='text-xs text-gray-500'>Girls (55%)</h2>
            </div>
        </div>
    </div>
  )
}

export default CountChart