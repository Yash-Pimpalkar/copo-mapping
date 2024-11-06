import React, { useEffect, useState } from 'react';
import api from '../../../api';
import * as XLSX from 'xlsx';
import Pagination from '../../../component/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const PPT = ({ uid , tw_id}) => {
  const [pptData, setPptData] = useState([]);
  const [pptcoData, setPptcoData] = useState([]);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [editedMarks, setEditedMarks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [maxLimit, setMaxLimit] = useState(0);
  const [message, setMessage] = useState("");
  const [attainmentData, setAttainmentData] = useState({
    passedPercentage: 0, // Default percentage
  });

  const navigate = useNavigate(); 
  const userCourseId = uid;


  const curriculum = "ppt";

  useEffect(() => {
    const fetchPptData = async () => {
      try {
        const res = await api.get(`/api/termwork/show/ppt/${uid}`);
        setPptData(res.data);
        const res2 = await api.get(`/api/termwork/showco/ppt/${uid}`);
        setPptcoData(res2.data);
        const res1 = await api.get(`/api/termwork/ppt/limit/${uid}`);
        setMaxLimit(res1.data[0].maxmarks);
      } catch (error) {
        console.error("Error fetching PPT data:", error);
      }
    };

    if (uid) {
      fetchPptData();
    }
  }, [uid]);

  const filteredData = pptData.filter((item) => {
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

  const handleAttainmentChange = (event, key) => {
    let value = event.target.value;

    // Prevent non-numeric input
    if (!/^\d*$/.test(value)) {
      setError("Only numeric values are allowed.");
      return;
    }

    // Convert value to a number for validation
    const numericValue = Number(value);

    // Ensure value is within the range
    if (numericValue < 0 || numericValue > 100) {
      setError(`Value must be between 0 and 100`);
      return;
    } else {
      setError(""); // Clear error if within range
    }

    // Update the attainment data state
    setAttainmentData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handle_Attainment = ()=> {

  }
  

  const [error, setError] = useState("");

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
        await api.put("/api/termwork/ppt/update", validatedData);
        setPptData(validatedData);
        alert("File is uploaded");
        window.location.reload();
      } catch (error) {
        console.error("Error updating PPT data:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileDownload = () => {
    const formattedData = pptData.map((student) => ({
      id: student.id,
      stud_clg_id: student.stud_clg_id,
      student_name: student.student_name,
      marks: student.marks,
    }));

    const headers = ["id", "Student ID", "Student Name", "Marks"];
    const dataWithHeaders = [headers, ...formattedData.map(Object.values)];

    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PPTData");
    XLSX.writeFile(workbook, "ppt_data.xlsx");
  };

  const handleEditClick = (index) => {
    setEditingRow(index);
    const student = paginatedData[index]; // Access the correct paginated student
    setEditedMarks({
      ...editedMarks,
      [index]: student.marks, // Initialize the edited marks
    });
  };
  
  const handleSaveClick = async (index) => {
    const student = paginatedData[index]; // Access the correct paginated student
    const { id, sid } = student; // Get ppt_id and sid
  
    const marks = editedMarks[index]; // Get the edited marks
  
    try {
      await api.put("/api/termwork/ppt/update", { id, Marks: marks });
      
      // Update the original data using sid for accurate matching
      setPptData((prevData) => 
        prevData.map((item) => (item.sid === sid ? { ...item, marks } : item))
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
  
  
  // console.log(pptData)
  // console.log(pptcoData)
  // console.log(maxLimit)
  // console.log(attainmentData.passedPercentage)

  const handle_Attenment = (
    attainmentData,
    tw_id,
    userCourseId
  ) => {
    // Logic to handle attainment calculation
    const attainmentList = calculatePPTAttainmentList(pptcoData, pptData, maxLimit, attainmentData); // Corrected here
  
    console.log(attainmentData.passedPercentage);
  
    // Store data in localStorage
    const dataToStore = {
      attainmentList,
      passedPercentage: attainmentData.passedPercentage,
      tw_id,
      userCourseId,
    };
  
    localStorage.setItem('PPTAttainmentData', JSON.stringify(dataToStore));
  
    console.log("PPT Attainment updated", pptcoData, pptData);
    setMessage("PPT attainment data has been updated successfully.");
  };
  
  const calculatePPTAttainmentList = (pptcoData, pptData, maxLimit, attainmentData) => {
    console.log(attainmentData.passedPercentage); // Now this will correctly log the passedPercentage
    return pptcoData.map((course) => {
      const coname = course.coname; // Get the CO name
  
      // Calculate the passing threshold based on the passed percentage
      const passingMarks = (maxLimit * attainmentData.passedPercentage) / 100;
  
      // Calculate the number of students who passed
      const passedCount = pptData.filter(student => student.marks >= passingMarks).length;
  
      // Calculate the percentage of students who passed
      const attainmentPercentage = pptData.length > 0 
        ? ((passedCount / pptData.length) * 100).toFixed(2) 
        : 0;
  
      // Return the coname and its corresponding attainment percentage
      return {
        coname: coname,
        attainment: `${attainmentPercentage} %`,
      };
    });
  };  

  const handleClick = () => {
    navigate(`/AddStudent/${curriculum}/${userCourseId}`);
  };
  return (
    <div className="container overflow mx-auto p-4 md:px-8 lg:px-10 bg-white shadow-lg rounded-lg">
    {/* Container for Export, Import and Search Bar */}
    <div className="flex flex-col items-center mb-6">
  {/* Centered Title */}
  <h1 className="text-3xl md:text-4xl lg:text-5xl text-blue-700 font-bold text-center">
    PPT
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
          className="w-64 px-5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
        />

        {/* Download Excel Button */}
        <button onClick={handleFileDownload} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
          Download Excel
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
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
                value={editedMarks[index] !== undefined ? editedMarks[index] : student.marks}
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
</div>

      {/* Pagination Component */}
      {filteredData.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
     <div>
  {pptData.length > 0 && (
    <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 className="text-lg font-semibold mb-4 md:mb-0">
          Total Students Passed Each Question
        </h1>
        <button
          onClick={() => handle_Attenment(attainmentData, tw_id, uid)}
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
        >
          Update Attainment
        </button>
      </div>

      <div className="mb-4">
        <label
          htmlFor="total-student-passed"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Total Students Passed with &gt;= PERCENTAGE %
        </label>
        <input
          id="total-student-passed"
          type="text"
          value={attainmentData.passedPercentage}
          onChange={(e) => handleAttainmentChange(e, "passedPercentage")}
          className="block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {message && (
          <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
            {message}
          </div>
        )}
      </div>

      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h1 className="text-lg font-semibold mb-4">Student Statistics</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th
                  colSpan={2}
                  className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider"
                >
                  Attainment Calculation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider bg-blue-100">
                  Students passed with {attainmentData.passedPercentage} %
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {
                    pptData.filter(
                      (student) =>
                        student.marks >=
                        (maxLimit * attainmentData.passedPercentage) / 100
                    ).length
                  }
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider bg-blue-100">
                  Total Students
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {pptData.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {pptcoData.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                    Details
                  </th>
                  {pptcoData.map((course) => (
                    <th
                      key={course.idco_ppt}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4"
                    >
                      {course.coname}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/4">
                    Total Passed
                  </td>
                  {pptcoData.map((course) => (
                    <td
                      key={course.idco_ppt}
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/4"
                    >
                      {
                        pptData.filter(
                          (student) =>
                            student.marks >=
                            (maxLimit * attainmentData.passedPercentage) / 100
                        ).length
                      }
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/4">
                    Total Students
                  </td>
                  {pptcoData.map((course) => (
                    <td
                      key={course.idco_ppt}
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/4"
                    >
                      {pptData.length}
                    </td>
                  ))}
                </tr>

                {pptcoData.map((course) => (
                  <tr
                    key={course.idco_ppt}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    <td className="w-1/4">{course.coname}</td>
                    <td className="w-1/4">
                      {(
                        (pptData.filter(
                          (student) =>
                            student.marks >=
                            (maxLimit * attainmentData.passedPercentage) / 100
                        ).length /
                          pptData.length) *
                        100
                      ).toFixed(2)}{" "}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )}
</div>
</div>

  );
};

export default PPT;
