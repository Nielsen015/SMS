import Annoucements from "@/components/Annoucements"
import BigCalendar from "@/components/Bigcalendar"
import TermCalendar from "@/components/TermCalendar"

const StudentPage = () => {
    return (
      <div className="p-4 flex gap-4 flex-col xl:flex-row">
        {/* Left */}
        <div className='w-full xl:w-2/3'>
        <div className='h-full rounded-md bg-white p-4'>
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendar />
        </div>
        </div>
        {/* Right */}
        <div className='w-full xl:w-1/3 flex flex-col gap-8'>
        <TermCalendar />
        <Annoucements /></div>
      </div>
    )
  }
  
  export default StudentPage