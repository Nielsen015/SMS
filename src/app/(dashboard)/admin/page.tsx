import CountChart from "@/components/CountChart"
import UserCard from "@/components/UserCard"
import AttendanceChart from "@/components/AttendanceChart"
import FinanceChart from "@/components/FinanceChart"
import TermCalendar from "@/components/TermCalendar"
import Annoucements from "@/components/Annoucements"
const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Left */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
      {/* User Cards*/}
      <div className='flex gap-4 justify-between flex-wrap'>
        <UserCard type='admin'/>
        <UserCard type='teacher'/>
        <UserCard type='student'/>
        <UserCard type='parent'/>
      </div>
      {/* middle charts */}
      <div className='flex gap-4 flex-col lg:flex-row'>
        {/* Count Chart */}
        <div className='w-full lg:w-1/3 h-[450px]'>
        <CountChart/>
        </div>
        {/* Attendance chart */}
        <div className='w-full lg:w-2/3 h-[450px]'>
        <AttendanceChart/>
        </div>
      </div>
      {/* bottom chart */}
      <div className='w-full h-[500px]'>
        <FinanceChart />
      </div>
      </div>
      {/* Right */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
      <TermCalendar />
      <Annoucements />
      </div>
    </div>
  )
}

export default AdminPage