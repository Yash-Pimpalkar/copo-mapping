import React, { useEffect, useState } from "react";
import api from "../../api";
import Pagination from "../../component/Pagination/Pagination";
import * as XLSX from "xlsx";

const Semester = ({ uid }) => {
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
  const [attainmentData, setAttainmentData] = useState({
    passedPercentage: 50,
  });

  const calculatePercentage = (total, maxMarks) => {
    return (total / maxMarks) * 100;
  };

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

  // Placeholder for calculateTotal function
  const calculateTotal = (student) => {
    // Implement your logic to calculate the total marks for a student
    return 0;
  };

  // Last container total student passed calculation
  const getTotalStudentsPassed = (percentage) => {
    const maxMarks = 20; // Replace this with the actual maximum marks if available
    return IaData.filter((student) => {
      const totalMarks = calculateTotal(student);
      const studentPercentage = calculatePercentage(totalMarks, maxMarks);
      return studentPercentage >= percentage;
    }).length;
  };

  // Total student attempted question
  const getTotalStudentsAttempted = () => {
    const questionColumns = COsData.map((col) => col.qname); // Assuming COsData contains qname
    const attemptedCounts = questionColumns.map((col) => {
      return IaData.filter((student) => student[col] > 0).length;
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData = jsonData.filter((_, index) => index !== 0);
      setIaData(jsonData);
      const changes = [];

      jsonData.forEach((student) => {
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
        await api.post('/api/update-marks', changes); // Assuming the API endpoint for updating marks
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
    const dataWithTotal = IaData.map((row) => ({
      ...row,
      Total: calculateTotal(row),
    }));

    const headers = [
      "sid",
      "student_name",
      "stud_clg_id",
      ...ExperimentColumns.map((col) => col.qname),
      "Total",
    ];
    const coHeaders = ["", "", "", ...ExperimentColumns.map((col) => col.coname), ""];

    const dataForExport = [
      headers,
      coHeaders,
      ...dataWithTotal.map((row) => [
        row.sid,
        row.student_name,
        row.stud_clg_id,
        ...ExperimentColumns.map((col) => row[col.qname]),
        row.Total,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(dataForExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Practical Data");
    XLSX.writeFile(workbook, "student_practical_data.xlsx");
  };

  const filteredData = IaData.filter((item) => {
    const query = searchQuery.toUpperCase();
    return (
      item.student_name?.toUpperCase().includes(query) ||
      item.sid?.toString().includes(query) ||
      item.stud_clg_id?.toUpperCase().includes(query)
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-blue-700 text-center font-bold">Semester</h1>
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Select Course and Year</h1>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 pl-3  focus:border-indigo-500 sm:text-sm"
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

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Seat No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Student ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Marks</th>
              {ExperimentColumns.map((col) => (
                <th key={col.id} className="py-2 px-4 border-b">
                  {col.qname}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => (
              <tr key={student.sid}>
                {/* <td className="py-2 px-4 border-b">{student.seatno}</td> */}
                <td className="py-2 px-4 border-b">{student.sid}</td>
                <td className="py-2 px-4 border-b">{student.student_name}</td>
                {ExperimentColumns.map((col) => (
                  <td key={col.id} className="py-2 px-4 border-b">
                    {student[col.qname]}
                  </td>
                ))}
                <td className="py-2 px-4 border-b">
                  {calculateTotal(student)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEditClick(index)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination  */}
        {selectedCourse && selectedYear && filteredData.length>0 && ( <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />)}
      </div>
    </div>
  );
};

export default Semester;
