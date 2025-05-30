import UserCard from "@/components/UserCard"
import FinanceChart from "@/components/FinanceChart"
import Annoucements from "@/components/Annoucements"
import CountChartContainer from "@/components/CountChartContainer"
import AttendanceChartContainer from "@/components/AttendanceChartContainer"
import TermCalendarContainer from "@/components/TermCalendarContainer"
const AdminPage = ({
  searchParams,
}: {
  searchParams: {[keys: string]: string | undefined}
}) => {
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
        <CountChartContainer/>
        </div>
        {/* Attendance chart */}
        <div className='w-full lg:w-2/3 h-[450px]'>
        <AttendanceChartContainer/>
        </div>
      </div>
      {/* bottom chart */}
      <div className='w-full h-[500px]'>
        <FinanceChart />
      </div>
      </div>
      {/* Right */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
      <TermCalendarContainer searchParams={searchParams} />
      <Annoucements />
      </div>
    </div>
  )
}

export default AdminPage