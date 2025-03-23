import Annoucements from "@/components/Annoucements"
import BigCalendar from "@/components/Bigcalendar"

const ParentPage = () => {
    return (
      <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
        {/* Left */}
        <div className='w-full xl:w-2/3'>
        <div className='h-full p-4 rounded-md bg-white'>
          <h1 className="text-xl font-semibold">Schedule(Moses)</h1>
          <BigCalendar />
        </div>
        </div>
        {/* Right */}
        <div className='w-full xl:w-1/3 flex flex-col gap-8'>
        <Annoucements />
        </div>
      </div>
    )
  }
  
  export default ParentPage