import Announcements from "@/components/Annoucements";
import BigCalendar from "@/components/Bigcalendar";
import TermCalendarContainer from "@/components/TermCalendarContainer";

const TeacherPage = ({
  searchParams,
}: {
  searchParams: {[keys: string]: string | undefined}
})=> {
  return (
    // <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
      <TermCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;