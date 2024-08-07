import React, { useEffect, useState } from "react";
import api from "../../api";
import Pagination from "../../component/Pagination/Pagination";
import * as XLSX from "xlsx";

const Ia1 = ({ uid }) => {
  const [courses, setCourses] = useState([]);
  const [distinctCourses, setDistinctCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [userCourseId, setUserCourseId] = useState(null);
  const [IaData, setIaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [COsData, setCOsData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [marksData, setMarksData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const calculatePercentage = (total, maxMarks) => {
    return (total / maxMarks) * 100;
  };
  const [attainmentData, setAttainmentData] = useState({
    passedPercentage: 50,
  });
  const handleAttainmentChange = (event, key) => {
    setAttainmentData((prevData) => ({
      ...prevData,
      [key]: event.target.value,
    }));
  };

  // Fetch courses and set distinct course names
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await api.get(`/api/copo/${uid}`);
        setCourses(res.data);

        const distinct = Array.from(
          new Set(res.data.map((course) => course.course_name))
        ).map((course_name) => ({
          course_name,
          academic_year: res.data.find(
            (course) => course.course_name === course_name
          ).academic_year,
        }));

        setDistinctCourses(distinct);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    if (uid) {
      fetchCourseData();
    }
  }, [uid]);

  // Fetch IA data when the userCourseId changes
  useEffect(() => {
    const fetchIaData = async () => {
      if (userCourseId) {
        try {
          const res = await api.get(`/api/ia/${userCourseId}`);
          setIaData(res.data);
          const res1 = await api.get(`/api/ia/cos/${userCourseId}`);
          setCOsData(res1.data);
        } catch (error) {
          console.error("Error fetching IA data:", error);
        }
      }
    };

    fetchIaData();
  }, [userCourseId]);

  //last container total student passed calculation
  const getTotalStudentsPassed = (percentage) => {
    // Assuming `calculateTotal` returns the total marks and you have the max marks
    const maxMarks = 20; // Replace this with the actual maximum marks if available

    return IaData.filter((student) => {
      const totalMarks = calculateTotal(student);
      const studentPercentage = calculatePercentage(totalMarks, maxMarks);
      return studentPercentage >= percentage;
    }).length;
  };

  //total student attempted question
  const getTotalStudentsAttempted = () => {
    const attemptedCounts = questionColumns.map((col) => {
      return IaData.filter((student) => student[col.qname] > 0).length;
    });
    return attemptedCounts;
  };

  // Handle course selection change
  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    setSelectedYear("");
    setUserCourseId(null);
  };

  // Handle year selection change
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    const course = courses.find(
      (course) =>
        course.course_name === selectedCourse &&
        course.academic_year === selectedYear
    );
    setUserCourseId(course?.usercourse_id || null);
  };
  console.log(COsData);
  // Get unique question columns from COsData
  const getQuestionColumns = () => {
    return COsData.map((data) => ({
      id: data.idtable_ia,
      qname: data.qname,
      coname: data.coname,
      marks: data.marks,
    }));
  };

  const questionColumns = getQuestionColumns();

  const calculateTotal = (row) => {
    const q1Columns = ["Q1A", "Q1B", "Q1C"];
    const specialColumns = ["Q2", "Q3", "Q4", "Q5"];

    // Helper function to parse and constrain values, handling null
    const parseAndConstrainValue = (value, min, max) => {
      if (value === null || value === "") {
        return null; // Return null if the value is null or empty
      }
      value = parseFloat(value);
      if (isNaN(value)) return ""; // Handle cases where conversion to number fails
      return Math.max(min, Math.min(value, max));
    };

    // Parse and constrain the values for Q1 columns
    const q1Values = q1Columns.map((col) => {
      let value = parseAndConstrainValue(row[col], 0, col === "Q1C" ? 1 : 2);
      if (value === null) return null;
      return value;
    });

    // Parse and constrain the values for special columns
    const specialValues = specialColumns.map((col) => {
      let value = parseAndConstrainValue(row[col], 0, 5);
      if (value === null) return null;
      return value;
    });

    // If any value is null, return null
    if (q1Values.includes(null) || specialValues.includes(null)) {
      return null;
    }

    // Get the highest three values from special columns
    const highestSpecialValues = specialValues
      .sort((a, b) => b - a)
      .slice(0, 3);

    // Calculate the total for Q1 columns
    const q1Total = q1Values.reduce((acc, value) => acc + value, 0);

    // Calculate the total for the highest three special columns
    const specialTotal = highestSpecialValues.reduce(
      (acc, value) => acc + value,
      0
    );

    // Sum both totals to get the final total
    const total = q1Total + specialTotal;

    return total;
  };

  // Pagination logic
  const totalItems = IaData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = IaData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle the start of editing a row
  const handleEditClick = (index) => {
    setEditingRow(index + startIndex); // Adjust index to match actual data index
  };

  // Handle saving changes to a row
  const handleSaveClick = async (index) => {
    const actualIndex = index + startIndex; // Adjust index to match actual data index
    const changes = [];

    questionColumns.forEach((col) => {
      if (
        marksData[actualIndex] &&
        marksData[actualIndex][col.qname] !== undefined
      ) {
        changes.push({
          sid: IaData[actualIndex].sid,
          qid: col.id,
          marks: marksData[actualIndex][col.qname],
        });
      }
    });

    try {
      await updateMarks(changes);
      console.log("Updated values:", changes);
      setEditingRow(null);
    } catch (error) {
      console.error("Error saving IA data:", error);
    }
  };

  // Handle changes to input fields
  const handleInputChange = (event, index, column) => {
    let value = event.target.value;

    // Handle empty value as null
    if (value === "") {
      value = null;
    } else {
      value = parseInt(value, 10); // Ensure value is an integer
    }

    // Find the corresponding CO data for the column
    const coData = COsData.find((co) => co.qname === column);

    if (coData) {
      const maxLimit = coData.marks;

      // Constrain value between 0 and maxLimit, including null
      if (value !== null) {
        value = Math.max(0, Math.min(value, maxLimit));
      }
    }

    const actualIndex = index + startIndex; // Adjust index to match actual data index
    const newData = [...IaData];
    newData[actualIndex][column] = value;
    setIaData(newData);

    setMarksData((prevMarksData) => ({
      ...prevMarksData,
      [actualIndex]: {
        ...prevMarksData[actualIndex],
        [column]: value,
      },
    }));
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData = jsonData.filter((_, index) => index !== 1 - 1);

      const validatedData = jsonData.map((student) => {
        const validatedStudent = { ...student };

        COsData.forEach((col) => {
          let marks = student[col.qname];

          // Ensure marks are within limits and handle null
          const maxLimit = col.marks;
          marks =
            marks === null ? null : Math.max(0, Math.min(marks, maxLimit));

          validatedStudent[col.qname] = marks;
        });

        return validatedStudent;
      });

      setIaData(validatedData);

      const changes = [];
      validatedData.forEach((student) => {
        COsData.forEach((col) => {
          const marks = student[col.qname];
          if (marks !== undefined) {
            changes.push({
              sid: student.sid,
              qid: col.idtable_ia,
              marks: marks,
            });
          }
        });
      });

      try {
        await updateMarks(changes);
      } catch (error) {
        console.error("Error updating marks:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const updateMarks = async (changes) => {
    console.log(changes)
    try {
      const response = await api.put("/api/ia/", changes);
      if (response.ok) {
        console.log("Marks updated successfully");
      } else {
        console.error("Failed to update marks");
      }
    } catch (error) {
      console.error("Error updating marks:", error);
    }
  };

  // Handle file download
  const handleFileDownload = () => {
    // Create a new array to include Total column
    const dataWithTotal = IaData.map((row) => ({
      ...row,
      Total: calculateTotal(row),
    }));

    // Create headers for the questions and COs
    const headers = [
      "sid",
      "student_name",
      "stud_clg_id",
      ...questionColumns.map((col) => col.qname),
      "Total",
    ];
    const coHeaders = [
      "",
      "",
      "",
      ...questionColumns.map((col) => col.coname),
      "",
    ];

    // Combine headers with the data
    const dataForExport = [
      headers,
      coHeaders,
      ...dataWithTotal.map((row) => [
        row.sid,
        row.student_name,
        row.stud_clg_id,
        ...questionColumns.map((col) => row[col.qname]),
        row.Total,
      ]),
    ];

    // Convert data to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(dataForExport);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "IA Data");

    // Write the workbook to a file
    XLSX.writeFile(workbook, "ia_data.xlsx");
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data based on search query
  const filteredData = IaData.filter((item) => {
    item.student_name = item.student_name
      ? item.student_name.toUpperCase()
      : "";
    item.sid = item.sid ? item.sid.toString() : "";
    item.stud_clg_id = item.stud_clg_id ? item.stud_clg_id.toUpperCase() : "";

    const query = searchQuery.toUpperCase();

    return (
      item.student_name.includes(query) ||
      item.sid.includes(query) ||
      item.stud_clg_id.includes(query)
    );
  });

  console.log(IaData);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Select Course and Year</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Add Student
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="mb-4 md:mb-0 flex-1">
            <label
              htmlFor="course-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Course
            </label>
            <select
              id="course-select"
              value={selectedCourse}
              onChange={handleCourseChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a course</option>
              {distinctCourses.map((course, index) => (
                <option key={index} value={course.course_name}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 md:mb-0 flex-1">
            <label
              htmlFor="year-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Year
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a year</option>
              {courses
                .filter((course) => course.course_name === selectedCourse)
                .map((course, index) => (
                  <option key={index} value={course.academic_year}>
                    {course.academic_year}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/* Upload, Search, and Download Controls */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4 items-center">
          <div className="mb-4 md:mb-0 flex-1">
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload File
            </label>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4 md:mb-0 flex-1">
            <label
              htmlFor="search-bar"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search
            </label>
            <input
              type="text"
              id="search-bar"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by student name or ID"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4 md:mb-0 flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Download Data
            </label>
            <button
              onClick={handleFileDownload}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              Download
            </button>
          </div>
        </div>
        // Display IA Data
        {filteredData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    rowSpan="2"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Student ID
                  </th>
                  <th
                    rowSpan="2"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Student Name
                  </th>
                  <th
                    rowSpan="2"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    College ID
                  </th>
                  {questionColumns.map((col) => (
                    <th
                      key={col.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {col.qname}
                    </th>
                  ))}
                  <th
                    rowSpan="2"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    rowSpan="2"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
                <tr>
                  {questionColumns.map((col) => (
                    <th
                      key={col.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {col.coname}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData
                  .slice(startIndex, endIndex)
                  .map((student, index) => {
                    const actualIndex = index + startIndex; // Adjust index to match actual data index

                    return (
                      <tr key={student.sid}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {editingRow === actualIndex ? (
                            <input
                              type="text"
                              value={student.sid}
                              onChange={(e) =>
                                handleInputChange(e, index, "sid")
                              }
                              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          ) : (
                            student.sid
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {editingRow === actualIndex ? (
                            <input
                              type="text"
                              value={student.student_name}
                              onChange={(e) =>
                                handleInputChange(e, index, "student_name")
                              }
                              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          ) : (
                            student.student_name
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {editingRow === actualIndex ? (
                            <input
                              type="text"
                              value={student.stud_clg_id}
                              onChange={(e) =>
                                handleInputChange(e, index, "stud_clg_id")
                              }
                              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          ) : (
                            student.stud_clg_id
                          )}
                        </td>
                        {questionColumns.map((col) => (
                          <td
                            key={col.id}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {editingRow === actualIndex ? (
                              <select
                                value={
                                  student[col.qname] === null
                                    ? ""
                                    : student[col.qname]
                                }
                                onChange={(e) =>
                                  handleInputChange(e, index, col.qname)
                                }
                                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option value="">NULL</option>
                                {[...Array(col.marks + 1).keys()].map((i) => (
                                  <option key={i} value={i}>
                                    {i}
                                  </option>
                                ))}
                              </select>
                            ) : student[col.qname] !== null ? (
                              student[col.qname]
                            ) : (
                              "N/A"
                            )}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {calculateTotal(student)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {editingRow === actualIndex ? (
                            <button
                              onClick={() => handleSaveClick(index)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditClick(index)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination Controls */}
        {
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        }
      </div>
      {/* New container */}
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h1 className="text-2xl font-semibold mb-4">Total Student Passed</h1>
        <div className="mb-4">
          <label
            htmlFor="total-student-passed"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Total Student Passed with &gt;= PERCENTAGE %
          </label>
          <select
            id="total-student-passed"
            value={attainmentData.passedPercentage}
            onChange={(e) => handleAttainmentChange(e, "passedPercentage")}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {[...Array(11).keys()].map((i) => (
              <option key={i} value={50 + i * 5}>
                {50 + i * 5}%
              </option>
            ))}
          </select>
        </div>
        <div className="text-lg font-semibold">
          Total Students Passed:{" "}
          {getTotalStudentsPassed(attainmentData.passedPercentage)}
        </div>

        {/* Section to display Total Students Attempted each question */}
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
          <h1 className="text-lg font-semibold mb-4">
            Total Students Attempted Each Question
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {questionColumns.map((col) => (
                    <>
                      <th
                        key={col.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {col.qname}
                      </th>
                    </>
                  ))}
                </tr>
                <tr>
                  {questionColumns.map((col) => (
                    <>
                      <th
                        key={col.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {col.coname}
                      </th>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  {getTotalStudentsAttempted().map((count, index) => (
                    <td
                      key={index}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {count}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ia1;
