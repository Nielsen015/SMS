'use client';
import { useState, useEffect, useRef } from "react";
import { FaDownload, FaFileCsv, FaFilePdf, FaRegFilePdf } from "react-icons/fa6";
import CsvDownloader from 'react-csv-downloader';
import { teachersData } from "@/lib/data";

const DownloadFiles = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Auto-close dropdown after 6 seconds
  useEffect(() => {
    if (isDropdownOpen) {
      timeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 6000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isDropdownOpen]);

  // Sample Data
  const data = teachersData.map((teacher) => ({
    ...teacher,
    subjects: teacher.subjects.join(", "), // Convert array to string
    classes: teacher.classes.join(", ")    // Convert array to string
  }));
  

  // CSV Columns Definition
  const columns =
  [
    { id: "id", displayName: "ID" },
    { id: "name", displayName: "Name" },
    { id: "teacherId", displayName: "Teacher ID" },
    { id: "username", displayName: "Username" },
    { id: "firstName", displayName: "First Name" },
    { id: "lastName", displayName: "Last Name" },
    { id: "password", displayName: "Password" },
    { id: "email", displayName: "Email" },
    { id: "phone", displayName: "Phone" },
    { id: "subjects", displayName: "Subjects" },
    { id: "classes", displayName: "Classes" },
    { id: "address", displayName: "Address" },
  ];

  return (
    <div className="relative">
      <button
        className="w-8 h-8 flex items-center justify-center bg-yellow rounded-full"
        aria-label="download"
        onClick={toggleDropdown}
      >
        <FaDownload className="w-4 h-4 text-gray-700" />
      </button>

      {isDropdownOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 md:left-[100%] md:-translate-x-[100%] mt-2 w-48 bg-white shadow-lg rounded-lg p-2 border border-gray-200">
          <CsvDownloader
            filename="users"
            separator=","
            wrapColumnChar="'"
            columns={columns}
            datas= {data}
          >
            <button className="flex items-center w-full px-3 py-2 hover:bg-sky rounded-md text-sm text-gray-700">
              <FaFileCsv className="mr-2 text-[#358866]" /> Download CSV
            </button>
          </CsvDownloader>
          <button className="flex items-center w-full px-3 py-2 hover:bg-sky rounded-md text-sm text-gray-700">
            <FaRegFilePdf className="mr-2 text-[#2B92E4]" /> View PDF
          </button>
          <button className="flex items-center w-full px-3 py-2 hover:bg-sky rounded-md text-sm text-gray-700">
            <FaFilePdf className="mr-2 text-[#BE2326]" /> Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadFiles;