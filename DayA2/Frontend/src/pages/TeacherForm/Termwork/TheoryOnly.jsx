import React, { useState, useEffect } from 'react';
import api from "../../../api";
import Pagination from "../../../component/Pagination/Pagination";
import * as XLSX from "xlsx";
import LoadingButton from "../../../component/Loading/Loading";

const TheoryOnly = ( {user_courseid} ) => {
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
    const [loading, setLoading] = useState(false);
    const [Err,setErr] = useState();
    const [display, setDisplay] = useState("Total student passed with >=");

    const students = [
        { id: 'VU4F2122001', name: 'Pukale Harshal', CO5: 8, CO1: 8, CO2: 10, CO3: 10, CO4: 10, CO6: 10, avgTU: 9, miniProject: 5, attendance: 5, total: 19 },
        { id: 'VU4F2122002', name: 'Gupta Shweta Sanjay Kumar', CO5: 10, CO1: 10, CO2: 10, CO3: 10, CO4: 10, CO6: 10, avgTU: 10, miniProject: 5, attendance: 5, total: 20 },
        { id: 'VU4F2122003', name: 'Kumar Aman', CO5: 9, CO1: 8, CO2: 9, CO3: 10, CO4: 9, CO6: 8, avgTU: 9, miniProject: 4, attendance: 5, total: 18 },
        { id: 'VU4F2122004', name: 'Patil Sneha', CO5: 7, CO1: 7, CO2: 8, CO3: 8, CO4: 8, CO6: 9, avgTU: 8, miniProject: 5, attendance: 5, total: 18 },
    ];

    const calculatePercentage = (total, maxMarks) => {
      return (total / maxMarks) * 100;
    };
    const [attainmentData, setAttainmentData] = useState({
      passedPercentage: 50,
    });
    const handleAttainmentChange = (event, key) => {
      const value = event.target.value;
  
      // Convert value to a number for validation
      const numericValue = Number(value);
      
      // Validate input
      if (numericValue < 50 || numericValue > 100) {
        setError("Value must be between 50 and 100.");
      } else {
        setError(""); // Clear error if within range
      }
  
      setAttainmentData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    };
    const [error, setError] = useState("");
  
    // Fetch courses and set distinct course names
    useEffect(() => {
      const fetchCourseData = async () => {
        try {
          setErr()
          setIaData([]);
          setCOsData([]);
          setLoading(true);
          
          const res = await api.get(`/api/copo/${user_courseid}`);
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
          setErr(error.response?.data?.error || 'An unexpected error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      if (user_courseid) {
        fetchCourseData();
      }
    }, [user_courseid]);
  
    // Fetch IA data when the userCourseId changes
    useEffect(() => {
      const fetchIaData = async () => {
        if (userCourseId) {
          setErr("")
          setIaData([]);
          setCOsData([]);
          setLoading(true);
          try {
            const res = await api.get(`/api/ia/${userCourseId}`);
            setIaData(res.data);
            const res1 = await api.get(`/api/ia/cos/${userCourseId}`);
            setCOsData(res1.data);
          } catch (error) {
            console.error("Error fetching IA data:", error);
            setErr(error.response?.data?.error || 'An unexpected error occurred');
          } finally {
            setLoading(false);
          }
        }
      };
  
      fetchIaData();
    }, [userCourseId]);
  
    //function to calculate no of student attempted the per question
  
    const getTotalStudentsAttempted = () => {
      const attemptedCounts = questionColumns.map((col) => {
        return IaData.filter(
          (student) => student[col.qname] !== null && student[col.qname] >= 0
        ).length;
      });
      return attemptedCounts;
    };
  
    // function to calculate no of student according to percentage criteria
    const getTotalStudentsPassedPerQuestion = (percentage) => {
      const passedCounts = questionColumns.map((col) => {
        // Find the corresponding object in COsData that matches the qname
        const correspondingCoData = COsData.find(
          (data) => data.qname === col.qname
        );
  
        // Get the maximum marks from the matched object
        const maxMarks = correspondingCoData ? correspondingCoData.marks : 0;
        console.log("Max Marks:", maxMarks);
  
        return IaData.filter((student) => {
          // Get the marks for the current question
          const studentMarks = student[col.qname];
  
          // Calculate the percentage for the student's marks in this specific question
          const studentPercentage = studentMarks
            ? (studentMarks / maxMarks) * 100
            : 0;
          console.log("Student Percentage:", studentPercentage);
  
          return (
            studentPercentage >= percentage &&
            student[col.qname] !== null &&
            student[col.qname] >= 0
          );
        }).length;
      });
  
      return passedCounts;
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
  
    // Function to extract column names based on COsData
    const extractColumnNames = () => {
      const q1Columns = [];
      const specialColumns = [];
  
      COsData.forEach((item) => {
        if (item.marks === 5) {
          specialColumns.push(item.qname);
        } else {
          q1Columns.push(item.qname);
        }
      });
  
      return { q1Columns, specialColumns };
    };
  
    const { q1Columns, specialColumns } = extractColumnNames();
  
    const calculateTotal = (row) => {
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
        // Get the max marks for the current qname from COsData
        const correspondingCoData = COsData.find((data) => data.qname === col);
        const maxMarks = correspondingCoData ? correspondingCoData.marks : 0;
  
        let value = parseAndConstrainValue(row[col], 0, maxMarks);
        return value !== null ? value : 0; // Replace null with 0 for calculation
      });
  
      // Parse and constrain the values for special columns
      const specialValues = specialColumns.map((col) => {
        // Get the max marks for the current qname from COsData
        const correspondingCoData = COsData.find((data) => data.qname === col);
        const maxMarks = correspondingCoData ? correspondingCoData.marks : 0;
  
        let value = parseAndConstrainValue(row[col], 0, maxMarks);
        return value !== null ? value : 0; // Replace null with 0 for calculation
      });
  
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
  
        let errors = [];
        const validatedData = jsonData.map((student, rowIndex) => {
          const validatedStudent = { ...student };
  
          COsData.forEach((col) => {
            let marks = student[col.qname];
  
            // Ensure marks are within limits and handle null
            const maxLimit = col.marks;
            if (marks !== null && marks > maxLimit) {
              errors.push(
                `Row ${rowIndex + 2}: ${
                  col.qname
                } has marks ${marks}, which exceeds the limit of ${maxLimit}.`
              );
              marks = Math.min(marks, maxLimit); // Adjust the marks to be within the limit
            }
  
            validatedStudent[col.qname] = marks;
          });
  
          return validatedStudent;
        });
  
        if (errors.length > 0) {
          alert("Errors found:\n" + errors.join("\n"));
        } else {
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
        }
      };
  
      reader.readAsArrayBuffer(file);
    };
  
    const updateMarks = async (changes) => {
      console.log(changes);
      try {
        setLoading(true);
        const response = await api.put("/api/ia/", changes);
        if (response.ok) {
          console.log("Marks updated successfully");
        } else {
          console.error("Failed to update marks");
        }
      } catch (error) {
        console.error("Error updating marks:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Handle file download
    const handleFileDownload = () => {
      // Step 1: Prepare the IA Data (Table 1)
  
      // Create a new array to include the Total column for IA data
      const dataWithTotal = IaData.map((row) => ({
        ...row,
        Total: calculateTotal(row),
      }));
  
      // Create headers for the IA data
      const iaHeaders = [
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
  
      // Combine headers with the IA data
      const iaDataForExport = [
        iaHeaders,
        coHeaders,
        ...dataWithTotal.map((row) => [
          row.sid,
          row.student_name,
          row.stud_clg_id,
          ...questionColumns.map((col) => row[col.qname]),
          row.Total,
        ]),
      ];
  
      // Step 2: Prepare the Attainment Data (Table 2)
  
      const attainmentHeaders = [
        "Type",
        ...questionColumns.map((col) => col.qname),
      ];
  
      const passedRow = [
        `Passed >= ${attainmentData.passedPercentage}%`,
        ...getTotalStudentsPassedPerQuestion(attainmentData.passedPercentage),
      ];
  
      const attemptedRow = [
        "Students Attempted Per Question",
        ...getTotalStudentsAttempted(),
      ];
  
      const coAttainmentRow = [
        "CO Attainment",
        ...getTotalStudentsPassedPerQuestion(attainmentData.passedPercentage).map(
          (passedCount, index) => {
            const attemptedCount = getTotalStudentsAttempted()[index];
            return attemptedCount
              ? ((passedCount / attemptedCount) * 100).toFixed(2) + " %"
              : "0 %";
          }
        ),
      ];
  
      // Add dynamic rows for CO averages
      const coAverageRows = ["CO1", "CO2"].map((coName) => {
        const coColumns = questionColumns
          .map((col, index) => ({ ...col, index })) // include index for mapping
          .filter((col) => col.coname === coName); // filter by CO name
  
        const coAverage = coColumns.length
          ? (
              coColumns.reduce((sum, col) => {
                const attainmentValue = getTotalStudentsPassedPerQuestion(
                  attainmentData.passedPercentage
                )[col.index];
                const attemptedCount = getTotalStudentsAttempted()[col.index];
                const attainment = attemptedCount
                  ? (attainmentValue / attemptedCount) * 100
                  : 0;
                return sum + attainment;
              }, 0) / coColumns.length
            ).toFixed(2)
          : 0;
  
        return [coName + " Average", coAverage + " %"];
      });
  
      const attainmentDataForExport = [
        attainmentHeaders,
        passedRow,
        attemptedRow,
        coAttainmentRow,
        ...coAverageRows.map((row) => [
          ...row,
          ...Array(questionColumns.length - 1).fill(""),
        ]),
      ];
  
      // Step 3: Combine IA Data and Attainment Data into the same worksheet
  
      // Convert IA data to worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(iaDataForExport);
  
      // Calculate starting row for the second table (Attainment Data)
      const attainmentStartRow = iaDataForExport.length + 2; // Leave a couple of rows between tables
  
      // Append Attainment Data to the worksheet
      XLSX.utils.sheet_add_aoa(worksheet, attainmentDataForExport, {
        origin: { r: attainmentStartRow, c: 0 },
      });
  
      // Step 4: Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "IA1 Data & Attainment");
  
      // Step 5: Write the workbook to a file
      XLSX.writeFile(workbook, "ia_data_and_attainment.xlsx");
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
        <>
            <div className="overflow-x-auto">
                <table className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-12">
                    <thead>
                        <tr>
                            <th className="border border-black text-center p-2" rowSpan="2">Sr.no.</th>
                            <th className="border border-black text-center p-2" rowSpan="2">ID</th>
                            <th className="border border-black text-center p-2" rowSpan="2">STUDENT NAME</th>
                            <th className="border border-black text-center p-2">CO5</th>
                            <th className="border border-black text-center p-2">CO1</th>
                            <th className="border border-black text-center p-2">CO2</th>
                            <th className="border border-black text-center p-2">CO3</th>
                            <th className="border border-black text-center p-2">CO4</th>
                            <th className="border border-black text-center p-2">CO6</th>
                            <th className="border border-black text-center p-2" colSpan="2">ALL CO</th>
                            <th className="border border-black text-center p-2">TOTAL TW(OUT OF 25)</th>
                            <th className="border border-black text-center p-2" rowSpan={3}> Edit </th>
                        </tr>
                        <tr>
                            <th className="border border-black text-center p-2">TU1</th>
                            <th className="border border-black text-center p-2">TU2</th>
                            <th className="border border-black text-center p-2">TU3</th>
                            <th className="border border-black text-center p-2">TU4</th>
                            <th className="border border-black text-center p-2">TU5</th>
                            <th className="border border-black text-center p-2">TU6</th>
                            <th className="border border-black text-center p-2">AVG(TU)(OUT OF 20)</th>
                            <th className="border border-black text-center p-2">Mini project/ SCILAB</th>
                            <th className="border border-black text-center p-2">ATTENDANCE (OUT OF 5M)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData
                            .slice(startIndex, endIndex)
                            .map((student, index) => {
                                const actualIndex = index + startIndex; // Adjust index to match actual data index
                                {
                                    console.log(actualIndex);
                                }
                                {
                                    console.log(editingRow);
                                }
                                return (
                                    <tr key={student.sid}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {editingRow === actualIndex ? (
                                                <input
                                                    type="text"
                                                    value={student.sid}
                                                    onChange={(e) =>
                                                        handleInputChange(e, index, "id")
                                                    }
                                                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sticky-left-2"
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
                                                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sticky-left-2"
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
                                                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sticky-left-2"
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
                                                        {[...Array(col.marks + 1).keys()].map(
                                                            (i) => (
                                                                <option key={i} value={i}>
                                                                    {i}
                                                                </option>
                                                            )
                                                        )}
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
        </>
    );
};


export default TheoryOnly;
