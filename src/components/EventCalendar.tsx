'use client';
import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "../app/CalendarStyles.css"; // Import the CSS file

const EventCalendar = () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
        <div className="bg-white p-4 rounded-md">
            <Calendar
                value={date}
                onChange={(e) => setDate(e.value as Date)}
                inline
                className="custom-calendar"
            />
        </div>
    );
};

export default EventCalendar;

