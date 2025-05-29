"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
// Events example data
// const events = [
//   {
//     id: 1,
//     title: "Event 1",
//     time: "12:00PM -2:00PM",
//     description: "Event 1 Description",
//   },{
//     id: 1,
//     title: "Event 1",
//     time: "12:00PM -2:00PM",
//     description: "Event 1 Description",
//   },{
//     id: 1,
//     title: "Event 1",
//     time: "12:00PM -2:00PM",
//     description: "Event 1 Description",
//   },{
//     id: 1,
//     title: "Event 1",
//     time: "12:00PM -2:00PM",
//     description: "Event 1 Description",
//   },
// ];
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
const TermCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());
    const router = useRouter();
    useEffect(() => {
        // Redirect to the calendar page when the component mounts
        if (value instanceof Date) {
            router.push(`?date=${value}`);
        }
    },[value, router]);
  return <Calendar onChange={onChange} value={value} />
          // {events.map((event) =>(
          //   <div className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-pirple even:border-t-sky' key={event.id}>
          //     <div className='flex items-center justify-between'>
          //       <h1 className="font-semibold text-gray-600">{event.title}</h1>
          //       <span className="text-gray-300 text-xs">{event.time}</span>
          //     </div>
          //     <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          //   </div>
          // ))}
};

export default TermCalendar