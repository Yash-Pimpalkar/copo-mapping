import React, { useEffect, useState } from 'react';
import api from '../../../api';
import * as XLSX from 'xlsx';
import Pagination from '../../../component/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const GroupDiscussion = ({ uid }) => {
  const [gdData, setGdData] = useState([]);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [editedMarks, setEditedMarks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [maxLimit, setMaxLimit] = useState(0); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 
  const userCourseId = uid;


  const curriculum = "gd";
  useEffect(() => {
    const fetchGdData = async () => {
      try {
        const res = await api.get(`/api/termwork/show/gd/${uid}`);
        setGdData(res.data);
        const res1 = await api.get(`/api/termwork/gd/limit/${uid}`);
        setMaxLimit(res1.data[0].maxmarks);
      } catch (error) {
        console.error("Error fetching GD data:", error);
      }
    };

    if (uid) {
      fetchGdData();
    }
  }, [uid]);

  const filteredData = gdData.filter((item) => {
    const query = searchQuery.toUpperCase();
    return (
      item.student_name?.toUpperCase().includes(query) ||
      item.sid?.toString().includes(query) ||
      item.stud_clg_id?.toUpperCase().includes(query)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      const rows = jsonData.slice(1); 

      const validatedData = rows.map((row) => {
        const student = {};
        headers.forEach((header, index) => {
          student[header] = row[index];
        });
        return student;
      });

      try {
        await api.put("/api/termwork/gd/update", validatedData);
        setGdData(validatedData);
        alert("File is uploaded");
        window.location.reload();
      } catch (error) {
        console.error("Error updating GD marks:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileDownload = () => {
    const formattedData = gdData.map((student) => ({
      gdid: student.gdid,
      stud_clg_id: student.stud_clg_id,
      student_name: student.student_name,
      marks: student.marks,
    }));

    const headers = ["gdid", "Student ID", "Student Name", "Marks"];
    const dataWithHeaders = [headers, ...formattedData.map(Object.values)];

    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GDData");
    XLSX.writeFile(workbook, "gd_data.xlsx");
  };

  const handleEditClick = (index) => {
    setEditingRow(index);
    setEditedMarks({
      ...editedMarks,
      [index]: gdData[index].marks,
    });
  };

  const handleSaveClick = async (index) => {
    const gdid = gdData[index].gdid;
    const marks = editedMarks[index];

    try {
      await api.put("/api/termwork/gd/update", { gdid: gdid, marks: marks });
      setGdData((prevData) =>
        prevData.map((item, idx) =>
          idx === index ? { ...item, marks } : item
        )
      );
      setEditingRow(null);
    } catch (error) {
      console.error("Error saving marks:", error);
    }
  };

  const handleCancelClick = () => {
    setEditingRow(null);
    setEditedMarks({});
  };

  const handleMarksChange = (event, index) => {
    const value = event.target.value;

    if (value === "") {
      setEditedMarks((prev) => ({ ...prev, [index]: null }));
      return; 
    }

    if (value > maxLimit) {
      alert(`Value should not be greater than ${maxLimit}`);
      return; 
    }

    if (value < 0) {
      alert("Value should not be less than 0");
      return; 
    }

    setEditedMarks((prev) => ({ ...prev, [index]: value }));
  };
  const handleClick = () => {
    navigate(`/AddStudent/${curriculum}/${userCourseId}`);
  };
  return (
    <div className="container mx-auto p-4 md:px-8 lg:px-10 bg-white shadow-lg rounded-lg">
      {/* Container for Export, Import and Search Bar */}
      <div className="flex flex-col items-center mb-6">
    {/* Centered Title */}
    <h1 className="text-3xl md:text-4xl lg:text-5xl text-blue-700 font-bold text-center">
      GroupDiscussion
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
      <div className="mb-4 flex justify-between items-center bg-white shadow-lg rounded-lg p-4">
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
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
        />

        {/* Download Excel Button */}
        <button onClick={handleFileDownload} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
          Download Excel
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border-collapse border border-gray-400 shadow-md rounded-lg">
        <thead className="bg-indigo-100">
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
            <tr key={index} className="hover:bg-gray-100 transition duration-200">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{student.sid}</td>
              <td className="border border-gray-300 px-4 py-2">{student.student_name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editingRow === index ? (
                  <input
                    type="text"
                    value={editedMarks[index] || student.marks}
                    onChange={(e) => handleMarksChange(e, index)}
                    className="border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500"
                  />
                ) : (
                  student.marks
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center">
                {editingRow === index ? (
                  <>
                    <button onClick={() => handleSaveClick(index)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
                      Save
                    </button>
                    <button onClick={handleCancelClick} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600 transition duration-300">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(index)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default GroupDiscussion;
