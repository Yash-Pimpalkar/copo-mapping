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
  const [userCourse, setUserCourse] = useState(0);
  const [SemData, SetSemdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [editedMarks, setEditedMarks] = useState({});
  const [maxLimit, setmaxlimit] = useState();
  const [attainmentData, setAttainmentData] = useState({
    passedPercentage: 50,
  });
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await api.get(`/api/copo/${uid}`);
        setCourses(res.data);
        console.log(res.data);
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

  useEffect(() => {
    const fetchSemData = async () => {
      if (userCourseId) {
        try {
          const res = await api.get(`/api/sem/show/${userCourseId}`);
          SetSemdata(res.data);
          const res1 = await api.get(`/api/usercourse/coname/${userCourseId}`);
          setUserCourse(res1.data);
          const res2 = await api.get(`/api/sem/limit/${userCourseId}`);
          setmaxlimit(res2.data[0].max_marks);
        } catch (error) {
          console.error("Error fetching IA data:", error);
        }
      }
    };

    fetchSemData();
  }, [userCourseId]);
  console.log(maxLimit);
  console.log(userCourse);
  const calculateTotal = (student) => {
    return 0; // Implement your logic to calculate the total marks for a student
  };
  console.log(maxLimit);

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    setSelectedYear("");
    setUserCourseId(null);
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    const course = courses.find(
      (course) =>
        course.course_name === selectedCourse &&
        course.academic_year === selectedYear
    );
    setUserCourseId(course?.usercourse_id || null);
    setCurrentPage(1); // Reset to the first page whenever the course or year is changed
  };
  const totalItems = SemData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  // console.log(startIndex);
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = SemData.slice(startIndex, endIndex);

  const filteredData = SemData.filter((item) => {
    const query = searchQuery.toUpperCase();
    return (
      item.student_name?.toUpperCase().includes(query) ||
      item.sid?.toString().includes(query) ||
      item.stud_clg_id?.toUpperCase().includes(query)
    );
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  let t;

  // const handleFileDownload = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(SemData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "SemesterData");
  //   XLSX.writeFile(workbook, "semester_data.xlsx");
  // };

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (index) => {
    console.log(index);
    setEditingRow(index);
    setEditedMarks({
      ...editedMarks,
      [index]: SemData[index].marks,
    });
  };

  const handleSaveClick = async (index) => {
    const actualIndex = index;
    const semId = SemData[actualIndex].sem_id;
    const marks = editedMarks[index];

    try {
      await api.put("/api/sem/", { sem_id: semId, Marks: marks });
      console.log(`Saving sem_id: ${semId}, marks: ${marks}`);
      SetSemdata((prevData) =>
        prevData.map((item, idx) =>
          idx === actualIndex ? { ...item, marks } : item
        )
      );
      setEditingRow(null);
    } catch (error) {
      console.error("Error saving IA data:", error);
    }
  };

  const handleCancelClick = () => {
    setEditingRow(null);
    setEditedMarks({});
  };
  //
  const handleMarksChange = (event, index) => {
    const value = event.target.value;

    // Check if the value is blank and should be sent as null
    if (value === "") {
      setEditedMarks((prev) => ({
        ...prev,
        [index]: null,
      }));
      return; // Exit the function after setting null
    }

    // Check if the value is outside the range
    if (value > maxLimit) {
      alert(`Value should not be greater than ${maxLimit}`);
      return; // Exit the function without updating
    }

    if (value < 0) {
      alert("Value should not be less than 0");
      return; // Exit the function without updating
    }

    setEditedMarks((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

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
    if (numericValue < 0 || numericValue > maxLimit) {
      setError(`Value must be between 0 and ${maxLimit}`);
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

      // Assuming the first row contains headers
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
        console.log(validatedData);
        await api.put("/api/sem/", validatedData);
        SetSemdata(validatedData);
        alert("File is uploaded");
        window.location.reload();
      } catch (error) {
        console.error("Error updating marks:", error);
      }
    };
    reader.readAsArrayBuffer(file);

  };

  const handleFileDownload = () => {
    const formattedData = SemData.map((student) => ({
      sem_id: student.sem_id,
      stud_clg_id: student.stud_clg_id,
      student_name: student.student_name,
      marks: student.marks,
    }));

    const headers = ["sem_id", "Student ID", "Student Name", "Marks"];
    const dataWithHeaders = [headers, ...formattedData.map(Object.values)];

    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SemesterData");
    XLSX.writeFile(workbook, "semester_data.xlsx");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-blue-700 text-center font-bold">
        Semester
      </h1>
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
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 pl-3 focus:border-indigo-500 sm:text-sm"
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
              <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                Seat No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                Student ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.slice(startIndex, endIndex).map((student, index) => {
              const actualIndex = index + startIndex; // Adjust index to match actual data index
              // { console.log(actualIndex)
              //  console.log(editingRow)}
              return (
                <tr key={student.sid} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {actualIndex + 1} {/* Displaying the row number */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.stud_clg_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.student_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingRow === actualIndex ? (
                      <input
                        type="text"
                        value={
                          editedMarks[actualIndex] !== undefined
                            ? editedMarks[actualIndex]
                            : student.marks
                        }
                        onChange={(event) =>
                          handleMarksChange(event, actualIndex)
                        }
                        className="w-full border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    ) : (
                      student.marks // Show existing marks if not editing
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingRow === actualIndex ? (
                      <>
                        <button
                          onClick={() => handleSaveClick(actualIndex)} // Ensure to pass correct index for saving
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEditClick(actualIndex)} // Ensure to pass correct index for editing
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
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
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h1 className="text-lg font-semibold mb-4">
          Total Students Passed Each Question
        </h1>

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
        </div>
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
          <h1 className="text-lg font-semibold mb-4">Student Statistics</h1>
          <h1>
            {" "}
            {attainmentData.passedPercentage} % of Max Marks: {maxLimit} ={" "}
            {(t = (maxLimit * attainmentData.passedPercentage) / 100)}{" "}
          </h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th
                  colSpan={2}
                  className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider"
                >
                  Attenment calculation
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
                    SemData.filter(
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
                  {SemData.length}
                </td>
              </tr>
            </tbody>
          </table>
          {userCourse.length > 0 && (
          <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                Details
              </th>
              {userCourse.map((course) => (
                <th
                  key={course.idcos}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4"
                >
                  {course.co_name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/4">
                Total Passed
              </td>
              {userCourse.map((course) => (
                <td
                  key={course.idcos}
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/4"
                >
                  {
                    SemData.filter(
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
              {userCourse.map((course) => (
                <td
                  key={course.idcos}
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/4"
                >
                  {SemData.length}
                </td>
              ))}
            </tr>
        
            {userCourse.map((course) => (
              <tr
                key={course.idcos}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                <td className="w-1/4"> {course.co_name}</td>
                <td className="w-1/4">
                  {(
                    (SemData.filter(
                      (student) =>
                        student.marks >=
                        (maxLimit * attainmentData.passedPercentage) / 100
                    ).length /
                      SemData.length) *
                    100
                  ).toFixed(2)} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>        
          )}
        </div>
      </div>
    </div>
  );
};

export default Semester;
