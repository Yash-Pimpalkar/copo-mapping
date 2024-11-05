import React, { useEffect, useState } from "react";
import api from "../../../api";
import Pagination from "../../../component/Pagination/Pagination"; // Import the pagination component
import * as XLSX from "xlsx"; // For Excel download and upload
import LoadingButton from "../../../component/Loading/Loading";
import { useNavigate } from "react-router-dom";

const MiniProject = ({ userCourseId ,onUpdateMiniProjectList, tw_id  }) => {
  const [MiniprojectData, setMiniprojectData] = useState([]);
  const [questiondata, SetQuestionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10); // Number of rows per page
  const [editMode, setEditMode] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // Search term for students
  const [loading, setLoading] = useState(false);
  const [attainmentData, setAttainmentData] = useState({
    passedPercentage: 0, // Default percentage
  });
  const [distinctConames, setDistinctConames] = useState([]);
  const [questionColumns, setQuestionColumns] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
console.log("yayy",userCourseId)


const navigate = useNavigate(); 



const curriculum = "minipro";
  useEffect(() => {
    const fetch_MiniprojectAttainment_data = async () => {
      try {
        const response = await api.get(
          `/api/termwork/show/minipro/${userCourseId}`
        );
        const response1 = await api.get(
          `/api/termwork/show/miniproco/${userCourseId}`
        );
        console.log("API Response:", response.data); 
        
        setMiniprojectData(response.data.data);
        SetQuestionData(response1.data);
      } catch (error) {
        console.error("Error fetching termwork labels:", error);
      }
    };

    if (userCourseId) {
        fetch_MiniprojectAttainment_data();
    }
  }, [userCourseId]);



  console.log("MiniprojectData", MiniprojectData)
  const fetch_MiniprojectAttainment_data = async () => {
    try {
      const response = await api.get(
        `/api/termwork/show/minipro/${userCourseId}`
      );
      const response1 = await api.get(
        `/api/termwork/show/miniproco/${userCourseId}`
      );
      console.log("api response",response.data)
      setMiniprojectData(response.data.data);
      SetQuestionData(response1.data);
    } catch (error) {
      console.error("Error fetching termwork labels:", error);
    }
  };
console.log(questiondata)

  const getAssignmentKeys = () => {
    if (MiniprojectData && MiniprojectData.length > 0) {
      return Object.keys(MiniprojectData[0]).filter((key) =>
        key.startsWith("MINIPROJECT")
      );
    }
    return [];
  };
  
  const assignmentKeys = getAssignmentKeys();
   // Check what keys are being returned
  

  console.log("assignmentKeys", assignmentKeys)
  console.log("questionData",questiondata)

  // Find the corresponding `conames` for each `assignmentKey` from `questiondata`
  const getCOName = (assignmentKey) => {
    const question = questiondata.find(
      (q) => q.question_name === assignmentKey
    );
    return question ? question.conames.join(", ") : "";
  };

  // Get the maximum marks for an assignment
  const getMaxMarks = (assignmentKey) => {
    const question = questiondata.find(
      (q) => q.question_name === assignmentKey
    );
    return question ? question.maxmarks : 100;
  };

  // Calculate total pages based on data length
  const totalPages = Math.ceil(MiniprojectData.length / dataPerPage);

  // Get current data based on the current page
  const projectDataArray = Array.isArray(MiniprojectData) ? MiniprojectData : [];

  console.log("Sample student data:", projectDataArray[0]); // Log the first student object

  const filteredData = projectDataArray.filter(
    (student) =>
      student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.stud_clg_id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  console.log("filteredData",filteredData)
  const currentData = filteredData.slice(
    (currentPage - 1) * dataPerPage,
    currentPage * dataPerPage
  );

  console.log("currentData", currentData)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Reset edit mode when changing page
    setEditMode(null);
    setEditedValues({});
  };

  // Calculate the total of all assignments for a student
  const calculateTotal = (student) => {
    return assignmentKeys.reduce((total, key) => {
      return total + (student[key] !== null ? student[key] : 0);
    }, 0);
  };

  // Start editing a student record
  const startEditing = (sid, student) => {
    setEditMode(sid);
    setEditedValues(
      assignmentKeys.reduce((values, key) => {
        values[key] = student[key];
        return values;
      }, {})
    );
  };

  // Save the edited values
  const saveEdits = async (sid) => {
    const updatedAssignments = assignmentKeys.map((key) => {
      const value = editedValues[key];
      return {
        question_id: questiondata.find((q) => q.question_name === key)
          ?.question_id,
        value: value === null ? null : parseInt(value, 10),
      };
    });

    const formattedData = {
      sid, // Include sid here
      MiniProject: updatedAssignments,
    };

    try {
      // Now passing both sid and assignments
      await api.put("/api/termwork/minipro/update", formattedData);
      
      // Refresh data after save
      const response = await api.get(
        `/api/termwork/show/minipro/${userCourseId}`
      );
      console.log("Save Response:", response);
      setMiniprojectData(response.data.data);
    } catch (error) {
      console.error("Error saving miniproject data:", error);
    }

    setEditMode(null);
    setEditedValues({});
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditMode(null);
    setEditedValues({});
  };

  // Handle input change
  const handleInputChange = (event, assignmentKey) => {
    const { value } = event.target;
    const maxLimit = getMaxMarks(assignmentKey);

    if (value === "") {
      setEditedValues((prev) => ({ ...prev, [assignmentKey]: null }));
      return;
    }

    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) {
      alert("Please enter a valid number");
      return;
    }

    if (numericValue > maxLimit) {
      alert(`Value should not be greater than ${maxLimit}`);
      return;
    }

    if (numericValue < 0) {
      alert("Value should not be less than 0");
      return;
    }

    setEditedValues((prev) => ({ ...prev, [assignmentKey]: numericValue }));
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(MiniprojectData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Miniproject");
    XLSX.writeFile(workbook, "MiniprojectData.xlsx");
  };

  // Import from Excel and upload to the backend
  const importFromExcel = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true); // Start loading

      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Assuming the first row contains headers
        const headers = jsonData[0];
        const rows = jsonData.slice(1); // Skip header row

        const formattedData = rows
          .map((row) => {
            const student = {};
            headers.forEach((header, index) => {
              student[header] = row[index];
            });
            return student;
          })
          .map((student) => ({
            sid: student.sid, // Assuming sid is present
            assignments: Object.keys(student)
              .filter((key) => key.startsWith("MINIPROJECT"))
              .map((key) => ({
                question_id: getQuestionIdFromAssignmentKey(key),
                value: student[key] === "" ? null : parseInt(student[key], 10),
              })),
          }));
        console.log(formattedData);
        try {
          // Send all the formatted data in a single request
          
          await api.put("/api/termwork//minipro/update", {
            assignments: formattedData,
          });
          setLoading(false);
          fetch_MiniprojectAttainment_data();
          alert("Excel data imported and miniprojects updated successfully.");
        } catch (error) {
          setLoading(false);
          console.error("Error uploading miniproject data:", error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };
  
  const handleAttainmentChange = (e, field) => {
    const value = e.target.value;

    // Ensure value is between 0 and 100
    if (field === "passedPercentage") {
      const numericValue = Number(value);
      if (numericValue < 0 || numericValue > 100) {
        setError("Percentage must be between 0 and 100.");
        return;
      } else {
        setError(""); // Clear error if valid
      }
    }

    // Update the state
    setAttainmentData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handle_Attenment = (
    distinctConames,
    questionColumns,
    attainmentData,
    tw_id,
    userCourseId
  ) => {
    // Logic to handle attainment calculation
    const attainmentList = calculateAttainmentList();
    
    // Store data in localStorage
    const dataToStore = {
      attainmentList,
      passedPercentage: attainmentData.passedPercentage,
      tw_id,
      userCourseId,
    };
  
    localStorage.setItem('MiniProjectAttainmentData', JSON.stringify(dataToStore));
  
    // Call onUpdateAttainmentList
    // Call the function to update the experiment list
    onUpdateMiniProjectList(attainmentList);
  
    // Log the data after updating
    console.log("Attainment updated:",  attainmentData);
  
    // Display a success message
    setMessage("Attainment data has been updated successfully.");
    // onUpdateMiniproAttainmentList(MiniproattainmentList);
  
    console.log(
      "Attainment updated",
      distinctConames,
      questionColumns,
      attainmentData
    );
  
    setMessage("Attainment data has been updated successfully.");
  };

  // Function to calculate the number of students who passed each question based on the percentage criteria
  const getTotalStudentsPassedPerQuestion = (percentage) => {
    // Validate percentage
    if (percentage < 0 || percentage > 100) {
      console.error("Percentage must be between 0 and 100.");
      return []; // Return an empty array or handle as needed
    }

    return questiondata.map((question, index) => {
      const assignmentKey = `MINIPROJECT${index + 1}`;
      const maxmarks = question.maxmarks; // Ensure maxMarks exists in questiondata

      return projectDataArray.filter((student) => {
        const studentMarks = student[assignmentKey];

        // Ensure studentMarks is not null and greater than or equal to 0
        if (studentMarks === null || studentMarks < 0) return false;

        // Calculate the student's percentage for this assignment
        const studentPercentage = (studentMarks / maxmarks) * 100;

        // Return true if the student passed based on the given percentage criteria
        return studentPercentage >= percentage;
      }).length;
    });
  };

  function getTotalStudentsAttempted() {
    return questiondata.map((question, index) => {
      // Dynamically generate the assignment key based on the question number
      const assignmentKey = `MINIPROJECT${index + 1}`;

      // Count students who attempted this question (score is not null)
      return projectDataArray.filter(
        (student) => student[assignmentKey] !== null
      ).length;
    });
  }

  console.log(questiondata);
  console.log(MiniprojectData);

  // Helper function to map assignment key (e.g., ASSIGNMENT1) to question_id
  const getQuestionIdFromAssignmentKey = (assignmentKey) => {
    const question = questiondata.find(
      (q) => q.question_name === assignmentKey
    );
    return question ? question.question_id : null;
  };
  useEffect(() => {
    // Only calculate attainment list if there is data to process
    if (MiniprojectData.length > 0 && questiondata.length > 0) {
      const MiniproattainmentList = calculateAttainmentList();
      onUpdateMiniProjectList(MiniproattainmentList); 
 
    }
  }, [MiniprojectData, questiondata]); // Trigger whenever the assignment data or question data changes
  
  const calculateAttainmentList = () => {
    const MiniproattainmentList = assignmentKeys.map((assignmentKey, index) => {
      const coname = getCOName(assignmentKey);
       
      // Get total students passed and attempted for this question/CO name
      const passedCount = getTotalStudentsPassedPerQuestion(
        attainmentData.passedPercentage
      )[index];
  
      
      const attemptedCount = getTotalStudentsAttempted()[index];
  
      // Calculate attainment percentage
      const attainment = attemptedCount
        ? ((passedCount / attemptedCount) * 100).toFixed(2)
        : 0;
  
      // Return the coname and its corresponding attainment
      return {
        coname: coname,
        attainment: `${attainment}%`,
      };
    });
  
    return MiniproattainmentList;
  };
  const handleClick = () => {
    navigate(`/AddStudent/${curriculum}/${userCourseId}`);
  };

  return (
    <div className="container overflow mx-auto mx-auto p-4 md:px-8 lg:px-10 bg-white shadow-lg rounded-lg">
      {/* Container for Export, Import and Search Bar */}
      <div className="flex flex-col items-center mb-6">
    {/* Centered Title */}
    <h1 className="text-3xl md:text-4xl lg:text-5xl text-blue-700 font-bold text-center">
      Mini Project
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
      {/* Container for Export, Import and Search Bar */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* File Upload */}
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={importFromExcel}
          className="border px-4 py-2 rounded-md"
        />

        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by student name or ID"
          className="w-64 px-5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
        />

        {/* Download Excel Button */}
        <button
          onClick={exportToExcel}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Download Excel
        </button>
      </div>
      {loading && (
        <div className="flex justify-center mb-4">
          <LoadingButton loading={loading} />
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2" rowSpan="2">
              Index
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan="2">
              Student ID
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan="2">
              Student Name
            </th>
            <th
              className="border border-gray-300 px-4 py-2"
              colSpan={assignmentKeys.length}
            >
              MiniProject
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan="2">
              Total
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan="2">
              Action
            </th>
          </tr>
          <tr>
            {assignmentKeys.map((assignmentKey, index) => (
              <th
                key={assignmentKey}
                className="border border-gray-300 px-4 py-2"
              >
                {index + 1}
                <br />
                <span className="text-sm text-white">
                  {getCOName(assignmentKey)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((student, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {student.stud_clg_id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {student.student_name}
              </td>
              {assignmentKeys.map((assignmentKey) => (
                <td
                  key={assignmentKey}
                  className="border border-gray-300 px-4 py-2"
                >
                  {editMode === student.sid ? (
                    <input
                      type="text"
                      value={
                        editedValues[assignmentKey] !== undefined
                          ? editedValues[assignmentKey]
                          : student[assignmentKey]
                      }
                      onChange={(event) =>
                        handleInputChange(event, assignmentKey)
                      }
                      className="w-24 border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  ) : student[assignmentKey] !== null ? (
                    student[assignmentKey]
                  ) : (
                    ""
                  )}
                </td>
              ))}
             
              <td className="border border-gray-300 px-4 py-2">
                {calculateTotal(student)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editMode === student.sid ? (
                  <>
                    <button
                      onClick={() => saveEdits(student.sid)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEditing(student.sid, student)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
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
      {filteredData.length > dataPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Container for Total Students Passed */}
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">
            Total Students Passed Each Question
          </h1>
          <button
            onClick={() =>
              handle_Attenment(
                distinctConames,
                questionColumns,
                attainmentData,
                tw_id,
                userCourseId
              )
            }
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
          >
            Update Attainment
          </button>
        </div>

        {/* Input for the percentage criteria */}
        <div className="mb-4">
          <label
            htmlFor="total-student-passed"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Total Students Passed with &gt;= PERCENTAGE %
          </label>
          <input
            id="total-student-passed"
            type="number"
            min="0"
            max="100"
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

        {/* Table displaying results */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Head */}
            <thead className="bg-white-50">
              {/* First Row - Assignments spanning across all columns */}
              <tr>
                <th
                  className="border border-gray-300 px-4 py-2"
                  colSpan={assignmentKeys.length + 1} // Spans all assignment columns and the "Type" column
                >
                  Miniprojects
                </th>
              </tr>

              {/* Second Row - Assignment Numbers and CO names */}
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                  Type
                </th>
                {assignmentKeys.map((assignmentKey, index) => (
                  <th
                    key={assignmentKey}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    {index + 1} {/* Assignment Number */}
                    <br />
                    <span className="text-sm text-white-600">
                      {getCOName(assignmentKey)} {/* CO name */}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Students Passed */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Total Students Passed With &gt;={" "}
                  {attainmentData.passedPercentage} %
                </td>
                {getTotalStudentsPassedPerQuestion(
                  attainmentData.passedPercentage
                ).map((count, index) => (
                  <td
                    key={index}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                  >
                    {count}
                  </td>
                ))}
              </tr>

              {/* Students Attempted */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Students Attempted Per Question
                </td>
                {getTotalStudentsAttempted().map((count, index) => (
                  <td
                    key={index}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                  >
                    {count}
                  </td>
                ))}
              </tr>

              {/* CO Attainment */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  CO Attainment
                </td>
                {getTotalStudentsPassedPerQuestion(
                  attainmentData.passedPercentage
                ).map((passedCount, index) => {
                  const attemptedCount = getTotalStudentsAttempted()[index];
                  const attainment = attemptedCount
                    ? ((passedCount / attemptedCount) * 100).toFixed(2)
                    : 0;
                  return (
                    <td
                      key={index}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                    >
                      {attainment} %
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MiniProject;
