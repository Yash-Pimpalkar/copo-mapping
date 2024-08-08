
import React, { useState, useEffect } from 'react';
import api from "../../api";
import Pagination from "../../component/Pagination/Pagination";
import * as XLSX from "xlsx";

const Practical = ({ uid }) => {
  const data = [
    { name: "MHATRE JAY H", scores: [15, 14, 14, 15, 14, 14, 14, 14, 14, 14] },
    { name: "RUPANWAR ROHAN N", scores: [15, 15, 14, 14, 14, 14, 14, 14, 14, 14] },
    { name: "KSHIRSAGAR VAISHNAVI A", scores: [14, 13, 13, 14, 14, 14, 14, 14, 14, 14] },
    // ... add the rest of the data here
  ];

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

  // Handle course selection change
  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    setSelectedYear("");
    setUserCourseId(null);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination logic
  const totalItems = IaData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = IaData.slice(startIndex, endIndex);

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

  // Handle the start of editing a row
  const handleEditClick = (index) => {
    setEditingRow(index + startIndex); // Adjust index to match actual data index
  };

  // Handle saving changes to a row
  const handleSaveClick = async (index) => {
    const actualIndex = index + startIndex; // Adjust index to match actual data index
    const changes = [];

    ExperimentColumns.forEach((col) => {
      if (marksData[actualIndex] && marksData[actualIndex][col.qname] !== undefined) {
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

    // Ensure value is a single digit and an integer
    if (column === "Q1A" || column === "Q1B") {
      value = value.length > 1 ? value.charAt(0) : value; // Keep only the first character
      value = parseInt(value, 10);

      // Constrain value between 0 and 2
      value = Math.max(0, Math.min(value, 2));
    } else {
      value = parseInt(value, 10) || 0; // Ensure value is an integer

      // Constrain values based on column
      value = (() => {
        switch (column) {
          case "Q1C":
            return Math.max(0, Math.min(value, 1)); // Q1c: 0 to 1
          case "Q2":
          case "Q3":
          case "Q4":
          case "Q5":
            return Math.max(0, Math.min(value, 5)); // Q2, Q3, Q4, Q5: 0 to 5
          default:
            return value;
        }
      })();
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


  const calculateTotal = (row) => {
    const q1Columns = ["Q1A", "Q1B", "Q1C"];
    const specialColumns = ["Q2", "Q3", "Q4", "Q5"];

    // Parse and constrain the values for Q1 columns
    const q1Values = q1Columns.map((col) => {
      let value = parseFloat(row[col]) || 0;
      if (col === "Q1c") {
        value = Math.max(0, Math.min(value, 1)); // Q1c: 0 to 1
      } else {
        value = Math.max(0, Math.min(value, 2)); // Q1a and Q1b: 0 to 2
      }
      return value;
    });

    // Parse and constrain the values for special columns
    const specialValues = specialColumns.map((col) => {
      let value = parseFloat(row[col]) || 0;
      return Math.max(0, Math.min(value, 5)); // Q2, Q3, Q4, Q5: 0 to 5
    });

    // Get the highest three values from special columns
    const highestSpecialValues = specialValues.sort((a, b) => b - a).slice(0, 3);

    // Calculate the total for Q1 columns
    const q1Total = q1Values.reduce((acc, value) => acc + value, 0);

    // Calculate the total for the highest three special columns
    const specialTotal = highestSpecialValues.reduce((acc, value) => acc + value, 0);

    // Sum both totals to get the final total
    const total = q1Total + specialTotal;

    return total;
  };

  const updateMarks = async (changes) => {
    try {
      const response = await api.put('/api/ia/', changes);
      if (response.ok) {
        console.log('Marks updated successfully');
      } else {
        console.error('Failed to update marks:');
      }
    } catch (error) {
      console.error('Error updating marks:', error);
    }
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

      jsonData = jsonData.filter((_, index) => index !== (1 - 1));
      setIaData(jsonData);
      console.log(jsonData)
      const changes = [];

      jsonData.forEach((student) => {
        COsData.forEach((col) => {
          const marks = student[col.qname];
          console.log(marks)
          console.log([col.qname])
          if (marks !== undefined) {
            console.log(`idtable_ia: ${col.idtable_ia}, sid: ${student.sid}, marks: ${marks}`);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const getExperimentColumns = () => {
    return COsData.map((data) => ({
      id: data.idtable_ia,
      qname: data.qname,
      coname: data.coname,
    }));
  };

  const ExperimentColumns = getExperimentColumns();


  const handleFileDownload = () => {
    // Create a new array to include Total column
    const dataWithTotal = IaData.map(row => ({
      ...row,
      Total: calculateTotal(row)
    }));

    // Create headers for the questions and COs
    const headers = ["sid", "student_name", "stud_clg_id", ...ExperimentColumns.map(col => col.qname), "Total"];
    const coHeaders = ["", "", "", ...ExperimentColumns.map(col => col.coname), ""];

    // Combine headers with the data
    const dataForExport = [headers, coHeaders, ...dataWithTotal.map(row => [
      row.sid,
      row.student_name,
      row.stud_clg_id,
      ...ExperimentColumns.map(col => row[col.qname]),
      row.Total
    ])];

    // Convert data to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(dataForExport);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Practical Data");

    // Write the workbook to a file
    XLSX.writeFile(workbook, "student_practical_data.xlsx");
  };

  // Filter data based on search query
  const filteredData = IaData.filter((item) => {
    item.student_name = item.student_name ? item.student_name.toUpperCase() : '';
    item.sid = item.sid ? item.sid.toString() : '';
    item.stud_clg_id = item.stud_clg_id ? item.stud_clg_id.toUpperCase() : '';

    const query = searchQuery.toUpperCase();

    return (
      item.student_name.includes(query) ||
      item.sid.includes(query) ||
      item.stud_clg_id.includes(query)
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-blue-700 text-center font-bold">Practical</h1>
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Select Course and Year</h1>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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
              className="w-full bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              Download
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider sticky left-0 bg-blue-500">SID</th>
                <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider sticky left-12 bg-blue-500">Name of Students</th>
                <th colSpan="10" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider text-center">Experiments</th>
                <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Marks out of 15</th>
                <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Actions</th>
              </tr>
              <tr>
                {[...Array(10)].map((_, index) => (
                  <th key={index} className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                    PO{index % 2 + 1} <br /> PSO{index % 2 + 1} <br /> CO{index % 5 + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.slice(startIndex, endIndex).map((student, index) => {
                const actualIndex = index + startIndex;
                return (
                  <tr key={student.sid}>
                    <td className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider sticky left-0 bg-white">{student.sid}</td>
                    <td className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider sticky left-12 bg-white">{student.name}</td>
                    {student.scores.map((score, scoreIndex) => (
                      <td key={scoreIndex} className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">{score}</td>
                    ))}
                    <td className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">{Math.max(...student.scores)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
                      {editingRow === actualIndex ? (
                        <button
                          onClick={() => handleSaveClick(actualIndex)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(actualIndex)}
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
        {/* Pagination Controls */}
        {selectedCourse && selectedYear && filteredData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Practical;