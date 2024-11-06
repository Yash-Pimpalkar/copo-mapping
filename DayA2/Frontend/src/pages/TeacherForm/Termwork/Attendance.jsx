import React, { useEffect, useState } from "react";
import api from "../../../api";
import * as XLSX from "xlsx";
import Pagination from "../../../component/Pagination/Pagination";
import { useNavigate } from "react-router-dom";

const Attendance = ({ uid }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [editedMarks, setEditedMarks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [maxLimit, setMaxLimit] = useState(0);
  const [message, setMessage] = useState("");
 const userCourseId = uid;

 const navigate = useNavigate(); 

 const curriculum = "attendance";
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const res = await api.get(`/api/termwork/show/attendance/${uid}`);
        setAttendanceData(res.data);
        const res1 = await api.get(`/api/termwork/attendance/limit/${uid}`);
        setMaxLimit(res1.data[0].maxmarks);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    if (uid) {
      fetchAttendanceData();
    }
  }, [uid]);

  const filteredData = attendanceData.filter((item) => {
    const query = searchQuery.toUpperCase();
    return (
      item.student_name?.toUpperCase().includes(query) ||
      item.sid?.toString().includes(query) ||
      item.stud_clg_id?.toUpperCase().includes(query)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditClick = (att_id) => {
    setEditingRow(att_id);
    setEditedMarks((prev) => ({
      ...prev,
      [att_id]: attendanceData.find((student) => student.att_id === att_id)
        .marks,
    }));
  };

  const handleSaveClick = async (att_id) => {
    const marks = editedMarks[att_id];
  
    // Validate that marks is a valid number
    if (isNaN(marks) || marks === "") {
      setMessage("Invalid marks. Please enter a valid number.");
      return;
    }
  
    try {
      // Send the updated marks to the backend
      await api.put("/api/termwork/attendance/update", {
        att_id: att_id,
        Marks: parseInt(marks, 10), // Ensure marks are integers
      });
  
      // Update the local state to reflect saved changes
      setAttendanceData((prevData) =>
        prevData.map((item) =>
          item.att_id === att_id ? { ...item, marks: parseInt(marks, 10) } : item
        )
      );
  
      setEditingRow(null); // Exit editing mode
      setMessage("Marks updated successfully!"); // Set success message
    } catch (error) {
      console.error("Error saving marks:", error);
      setMessage("Error updating marks. Please try again."); // Set error message
    }
  };
  

  const handleCancelClick = () => {
    setEditingRow(null);
    setEditedMarks({});
  };

  const handleMarksChange = (event, att_id) => {
    const value = event.target.value;

    if (value === "") {
      setEditedMarks((prev) => ({ ...prev, [att_id]: null }));
      return;
    }

    // Validate against `maxLimit`
    if (parseInt(value) > maxLimit) {
      alert(`Value should not be greater than ${maxLimit}`);
      return;
    }

    if (parseInt(value) < 0) {
      alert("Value should not be less than 0");
      return;
    }

    setEditedMarks((prev) => ({ ...prev, [att_id]: value }));
  };

  // Function to handle file upload (Excel import)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headers = jsonData[0];
      const rows = jsonData.slice(1); // Skip header row

      const validatedData = rows.map((row) => {
        const student = {};
        headers.forEach((header, index) => {
          student[header] = row[index];
        });
        return student;
      });

      try {
        await api.put("/api/termwork/attendance/update", validatedData);
        setAttendanceData(validatedData);
        alert("File is uploaded");
        window.location.reload();
      } catch (error) {
        console.error("Error updating marks:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  console.log(attendanceData)
  // Function to handle Excel file download (Excel export)
  const handleFileDownload = () => {
    const formattedData = attendanceData.map((student) => ({
      att_id: student.att_id,
      stud_clg_id: student.stud_clg_id,
      student_name: student.student_name,
      Marks: student.marks,
    }));

    const headers = ["att_id", "Student ID", "Student Name", "Marks"];
    const dataWithHeaders = [headers, ...formattedData.map(Object.values)];

    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AttendanceData");
    XLSX.writeFile(workbook, "attendance_data.xlsx");
  };

  const handleClick = () => {
    navigate(`/AddStudent/${curriculum}/${userCourseId}`);
  }; 

  return (
    <div className="container mx-auto p-4 md:px-8 lg:px-10 bg-white shadow-lg rounded-lg">
    {/* Attendance Header */}
    <div className="flex flex-col items-center mb-6">
    {/* Centered Title */}
    <h1 className="text-3xl md:text-4xl lg:text-5xl text-blue-700 font-bold text-center">
      Attendance
    </h1>
   
 
    {/* Add Student Button aligned below the title, on the right */}
    <div className="w-full flex justify-end mt-2">
      {userCourseId && (
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Student
        </button>
      )}
    </div>
    </div>
    <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
    {/* File Upload */}
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleFileUpload}
      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
    />

    {/* Search Bar */}
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search by student name or ID"
      className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
    />

    {/* Download Excel Button */}
    <button
      onClick={handleFileDownload}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
    >
      Download Excel
    </button>
  </div>

  {/* Table Wrapper for Horizontal Scrolling */}
  <div className="overflow-x-auto">
  
  <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-blue-700 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Index</th>
            <th className="border border-gray-300 px-4 py-2">Student ID</th>
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Marks</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((student, index) => (
            <tr
              key={student.att_id}
              className="hover:bg-gray-100 transition duration-200"
            >
              <td className="border border-gray-300 px-4 py-2">
                {index + 1 + (currentPage - 1) * itemsPerPage}
              </td>
              <td className="border border-gray-300 px-4 py-2">{student.stud_clg_id}</td>
              <td className="border border-gray-300 px-4 py-2">{student.student_name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editingRow === student.att_id ? (
                  <input
                    type="number" // Ensure the input type is 'number'
                    value={
                      editedMarks[student.att_id] !== undefined
                        ? editedMarks[student.att_id]
                        : student.marks
                    }
                    onChange={(e) => handleMarksChange(e, student.att_id)}
                    className="border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500"
                  />
                ) : (
                  student.marks
                )}
              </td>

              <td className="border  px-4 py-2 flex justify-center">
                {editingRow === student.att_id ? (
                  <>
                    <button
                      onClick={() => handleSaveClick(student.att_id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditClick(student.att_id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>



    {/* Pagination Component */}
    {filteredData.length > itemsPerPage && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    )}
  </div>
  
  
  );
};

export default Attendance;