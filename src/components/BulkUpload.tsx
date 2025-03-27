"use client";

import { useState, useEffect } from "react";
import { FaCloudArrowUp, FaFileCsv } from "react-icons/fa6";

const BulkUpload = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Automatically close dropdown after 5 seconds of inactivity
  useEffect(() => {
    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 6000);

      return () => clearTimeout(timer); // Cleanup timer if dropdown closes before 5 sec
    }
  }, [isDropdownOpen]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      alert("Only CSV files are allowed.");
      setFile(null);
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a CSV file before submitting.");
      return;
    }
    console.log("File uploaded:", file);
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      {/* Bulk Upload Button */}
      <button
        className="w-8 h-8 flex items-center justify-center bg-yellow rounded-full"
        aria-label="download"
        onClick={toggleDropdown}
      >
        <FaCloudArrowUp className="w-4 h-4 text-gray-700" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute left-2/3 -translate-x-2/3 md:left-[100%] md:-translate-x-[100%] mt-2 w-56 bg-white shadow-lg rounded-lg p-2 border border-gray-200">
          <button
            className="flex items-center w-full px-3 py-2 hover:bg-sky rounded-md text-sm text-gray-700"
            onClick={() => console.log("Download CSV template")}
          >
            <FaFileCsv className="mr-1 text-[#358866]" /> Download CSV Template
          </button>
          <button
            className="flex items-center w-full px-3 py-2 hover:bg-sky rounded-md text-sm text-gray-700"
            onClick={() => setIsModalOpen(true)}
          >
            <FaCloudArrowUp className="mr-1 text-[#2B92E4]" /> Upload Bulk Data
          </button>
        </div>
      )}

      {/* Modal for File Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-96">
            <h2 className="text-lg font-medium text-center mb-4">Upload Bulk Data</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="file"
                aria-label="none"
                accept=".csv"
                onChange={handleFileChange}
                className="border p-2 rounded-md"
                required
              />
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className="text-gray-500 py-2 px-4 rounded-md border border-gray-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#358866] text-white py-2 px-4 rounded-md border-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;
