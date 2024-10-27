import React, { useEffect, useState } from "react";
import api from "../../api";
import Pagination from "../../component/Pagination/Pagination";
import * as XLSX from "xlsx";
import LoadingButton from "../../component/Loading/Loading";
import { useNavigate } from 'react-router-dom';


const Oral = ({ uid }) => {
    const [courses, setCourses] = useState([]);
    const [distinctCourses, setDistinctCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [userCourseId, setUserCourseId] = useState(null);
    const [userCourse, setUserCourse] = useState(0);
    const [OralData, SetOralData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingRow, setEditingRow] = useState(null);
    const [editedMarks, setEditedMarks] = useState({});
    const [maxLimit, setmaxlimit] = useState();
    const [loading, setLoading] = useState(false);
  const [Err, setErr] = useState();
    const [attainmentData, setAttainmentData] = useState({
        passedPercentage: 50,
    });

    const navigate = useNavigate(); 

    const curriculum = "oral";
  
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
        const fetchOralData = async () => {
            if (userCourseId) {
                try {
                    const res = await api.get(`/api/oral/show/${userCourseId}`);
                    SetOralData(res.data);
                    const res1 = await api.get(`/api/usercourse/coname/${userCourseId}`);
                    setUserCourse(res1.data);
                    const res2 = await api.get(`/api/oral/limit/${userCourseId}`);
                    setmaxlimit(res2.data[0].max_marks);
                } catch (error) {
                    console.error("Error fetching Oral data:", error);
                }
            }
        };

        fetchOralData();
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
    const totalItems = OralData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    // console.log(startIndex);
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = OralData.slice(startIndex, endIndex);

    const filteredData = OralData.filter((item) => {
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
            [index]: OralData[index].marks,
        });
    };

    const handleSaveClick = async (index) => {
        const actualIndex = index;
        const oralId = OralData[actualIndex].oral_id;
        const marks = editedMarks[index];

        try {
            await api.put("/api/oral/", { oral_id: oralId, Marks: marks });
            console.log(`Saving oral_id: ${oralId}, marks: ${marks}`);
            SetOralData((prevData) =>
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

            console.log("jsonData", jsonData);

            // Assuming the first row contains headers
            const headers = jsonData[0];
            const rows = jsonData.slice(1); // Skip header row

            const validatedData = rows
                .map((row) => {
                    const student = {};
                    headers.forEach((header, index) => {
                        student[header] = row[index];
                    });
                    return student;
                })
                .filter((student) => {
                    // Check if oral_id is not null, not a string, and is a valid number
                    return student.oral_id && !isNaN(student.oral_id);
                });

            console.log("validatedData", validatedData);

            try {
                console.log(validatedData);
                await api.put("/api/oral/", validatedData);
                SetOralData(validatedData);
                alert("File is uploaded");
                window.location.reload();
            } catch (error) {
                console.error("Error updating marks:", error);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const handleFileDownload = () => {
        const formattedData = OralData.map((student) => ({
            oral_id: student.oral_id,
            stud_clg_id: student.stud_clg_id,
            student_name: student.student_name,
            marks: student.marks,
        }));

        const headers = ["oral_id", "Student ID", "Student Name", "Marks"];
        const dataWithHeaders = [
            headers,
            ...formattedData.map(Object.values)
        ];

        const attainmentHeaders = [
            "Details",
            ...userCourse.map((course) => course.co_name)
        ];

        // Passed Row: Total number of students who passed each course
        const passedRow = [
            `Total Passed`,
            ...userCourse.map((course) => {
                // Filter students who passed for the current course
                const passedStudents = OralData.filter(
                    (student) =>
                        student.marks >= (maxLimit * attainmentData.passedPercentage) / 100
                );
                // Return the number of passed students
                return passedStudents.length;
            })
        ];

        // Attempted Row: Total number of students who attempted each course
        const attemptedRow = [
            `Total Attempted`,
            ...userCourse.map((course) => {
                // Return the total number of students who attempted (assuming all students in OralData attempted)
                return OralData.length;
            })
        ];

        const attainmentRow = userCourse.map((course) => {
            // Filter students based on passing criteria
            const passedStudents = OralData.filter(
                (student) =>
                    student.marks >= (maxLimit * attainmentData.passedPercentage) / 100
            );

            // Calculate the attainment percentage
            const attainmentPercentage = (
                (passedStudents.length / OralData.length) * 100
            ).toFixed(2);

            // Return both co_name and attainmentPercentage
            return [course.co_name, attainmentPercentage + ' %'];
        });

        // Combining everything for export
        const attainmentDataForExport = [
            attainmentHeaders,
            passedRow,
            attemptedRow,
            ...attainmentRow // Spread attainmentRow to ensure each CO row is separate in the Excel
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
        const attainmentStartRow = dataWithHeaders.length + 2;

        XLSX.utils.sheet_add_aoa(worksheet, attainmentDataForExport, {
            origin: { r: attainmentStartRow, c: 0 },
        });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "OralData");
        XLSX.writeFile(workbook, "oral_data.xlsx");
    };

    const [message, setMessage] = useState("");
    function calculateCoAverages(userCourse, OralData, maxLimit, attainmentData) {
        return userCourse.map((course) => {
            // Calculate percentage of students who passed for each CO
            const studentsPassed = OralData.filter(
                (student) =>
                    student.marks >= (maxLimit * attainmentData.passedPercentage) / 100
            ).length;

            const totalStudents = OralData.length;
            const attainment = totalStudents
                ? ((studentsPassed / totalStudents) * 100).toFixed(2)
                : 0;

            return { coName: course.co_name, coAverage: attainment };
        });
    }

    const handle_Attainment = (userCourse, OralData, maxLimit, attainmentData, userCourseId) => {
        if (userCourseId) {
            // Calculate CO averages
            const coAverages = calculateCoAverages(userCourse, OralData, maxLimit, attainmentData);
            console.log(coAverages);

            // Map over coAverages and calculate attainment for each CO
            const coAveragesWithAttainment = coAverages.map((co) => {
                let attainment;
                const average = parseFloat(co.coAverage); // Convert coAverage to float

                // Determine attainment based on coAverage
                if (average <= 40) {
                    attainment = 0;
                } else if (average > 40 && average <= 60) {
                    attainment = 1;
                } else if (average > 60 && average <= 70) {
                    attainment = 2;
                } else {
                    attainment = 3;
                }

                // Return the object with both coName, coAverage, and attainment
                return {
                    coName: co.coName,
                    coAverage: co.coAverage,
                    attainment, // Include calculated attainment
                };
            });

            console.log(coAveragesWithAttainment); // Verify the structure

            // Post the data to the backend
            api
                .post("/api/oral/insert-co-averages", {
                    coAverages: coAveragesWithAttainment,
                    userCourseId,
                })
                .then((response) => {
                    setMessage(response.data.message);
                    console.log("Data inserted successfully:", response.data);
                })
                .catch((error) => {
                    console.error("Error inserting data:", error);
                    setMessage("Error inserting data");
                });
        }
    };

    const handleClick = () => {
        navigate(`/AddStudent/${curriculum}/${userCourseId}`);
      }; 

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-blue-700 text-center font-bold">
                Oral
            </h1>
            <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Select Course and Year</h1>
                    {userCourseId && (
            <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Add Student
            </button>
          )}
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
                            className="block w-full border p-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                            className="block w-full border p-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 items-center">
  <div className="flex-1 w-full">
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
      className="block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>

  <div className="flex-1 w-full">
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
      className="block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>

  <div className="mb-4 md:mb-0 flex-1">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Download Data
    </label>
    <button
      onClick={handleFileDownload}
      className="w-full bg-indigo-600 text-white py-2 px-6 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      Download
    </button>
  </div>
</div>
{Err && (
          <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
            Error: {Err}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center items-center">
            <LoadingButton />
          </div>
        ) : (
          <>
            {/* Display Oral PCE Data */}
                {filteredData.length > 0 && (
                    <div className="mt-4 overflow-x-auto"> {/* This div will make the table scrollable on smaller screens */}
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-500">
                                <tr>
                                    <th className="sticky left-0 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-3 md:px-6">
                                        Seat No.
                                    </th>
                                    <th className="sticky left-20 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-1 md:px-4">
                                        Student ID
                                    </th>
                                    <th className="sticky left-40 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-3 md:px-3">
                                        Student Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-4 md:px-6">
                                        Total
                                    </th>
                                    <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-4 md:px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredData.slice(startIndex, endIndex).map((student, index) => {
                                    const actualIndex = index + startIndex; // Adjust index to match actual data index
                                    return (
                                        <tr key={student.sid} className="hover:bg-gray-100">
                                            <td className="sticky left-0 bg-white px-1 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-1 md:px-4">
                                                {actualIndex + 1} {/* Displaying the row number */}
                                            </td>
                                            <td className="sticky left-10 bg-white px-2 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-4 md:px-6">
                                                {student.stud_clg_id}
                                            </td>
                                            <td className="bg-white py-4 whitespace-nowrap text-sm text-gray-500 sm:px-1 md:px-4">
                                                {student.student_name}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-4 md:px-6">
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
                                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-4 md:px-6">
                                                {editingRow === actualIndex ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleSaveClick(actualIndex)}
                                                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 sm:px-4 sm:py-2"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={handleCancelClick}
                                                            className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 sm:px-4 sm:py-2"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEditClick(actualIndex)}
                                                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 sm:px-4 sm:py-2"
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
                    </>
                )}
                {totalPages > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
            {filteredData.length > 0 && (
                <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-lg font-semibold">
                            Total Students Passed Each Question
                        </h1>
                        <button
                            onClick={() =>
                                handle_Attainment(
                                    userCourse,
                                    OralData,
                                    maxLimit,
                                    attainmentData,
                                    userCourseId
                                )
                            }
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
                        <h1>

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
                                            OralData.filter(
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
                                        {OralData.length}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {userCourse.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-fixed divide-y divide-gray-200">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="sticky left-0 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
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
                                            <td className="sticky left-0 bg-white px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/4">
                                                Total Passed
                                            </td>
                                            {userCourse.map((course) => (
                                                <td
                                                    key={course.idcos}
                                                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/4"
                                                >
                                                    {
                                                        OralData.filter(
                                                            (student) =>
                                                                student.marks >=
                                                                (maxLimit * attainmentData.passedPercentage) / 100
                                                        ).length
                                                    }
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="sticky left-0 bg-white px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/4">
                                                Total Students
                                            </td>
                                            {userCourse.map((course) => (
                                                <td
                                                    key={course.idcos}
                                                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/4"
                                                >
                                                    {OralData.length}
                                                </td>
                                            ))}
                                        </tr>

                                        {userCourse.map((course) => (
                                            <tr
                                                key={course.idcos}
                                                className="sticky left-0 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                            >
                                                <td className="sticky left-0 bg-white w-1/4"> {course.co_name}</td>
                                                <td className="w-1/4">
                                                    {(
                                                        (OralData.filter(
                                                            (student) =>
                                                                student.marks >=
                                                                (maxLimit * attainmentData.passedPercentage) / 100
                                                        ).length /
                                                            OralData.length) *
                                                        100
                                                    ).toFixed(2)} %
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
    );
};

export default Oral;