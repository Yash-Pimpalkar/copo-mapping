import React, { useEffect, useState } from "react";
import api from "../../api";
import Pagination from "../../component/Pagination/Pagination";
import * as XLSX from "xlsx";
import LoadingButton from "../../component/Loading/Loading";
import { useNavigate } from "react-router-dom";
// import { console } from "inspector/promises";

const OralPCE = ({ uid }) => {
  const [courses, setCourses] = useState([]);
  const [distinctCourses, setDistinctCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [userCourseId, setUserCourseId] = useState(null);
  const [OralPCEData, setOralPCEData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [COsData, setCOsData] = useState([]);
  const [COsActualNum, setCOsActualNum] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [marksData, setMarksData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [Err, setErr] = useState();
  const [display, setDisplay] = useState("Total student passed with >=");
  const calculatePercentage = (total, maxMarks) => {
    return (total / maxMarks) * 100;
  };
  const [attainmentData, setAttainmentData] = useState({
    passedPercentage: 50,
  });

  const navigate = useNavigate(); 

  const curriculum = "oralpce";
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
        setErr();
        setOralPCEData([]);
        setCOsData([]);
        setLoading(true);

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
        setErr(error.response?.data?.error || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchCourseData();
    }
  }, [uid]);

  // Fetch Oral PCE data when the userCourseId changes
  useEffect(() => {
    const fetchOralPCEData = async () => {
      if (userCourseId) {
        setErr("");
        setOralPCEData([]);
        setCOsData([]);
        setLoading(true);
        try {
          const res = await api.get(`/api/oral/show/pce/${userCourseId}`);
          setOralPCEData(res.data);
          console.log(res.data)
          const res1 = await api.get(`/api/oral/cos/pce/${userCourseId}`);
          setCOsData(res1.data);
          const res2 = await api.get(`/api/oral/pce/actualco/${userCourseId}`);
          setCOsActualNum(res2.data);
        } catch (error) {
          console.error("Error fetching Oral PCE data:", error);
          setErr(error.response?.data?.error || "An unexpected error occurred");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOralPCEData();
  }, [userCourseId]);

  const getTotalStudentsAttempted = () => {
    const attemptedCounts = questionColumns.map((col) => {
      return OralPCEData.filter(
        (student) => student[col.qname] !== null && student[col.qname] >= 0
      ).length;
    });

    return attemptedCounts;
  };

  const getAllRowsStudentsTotal = () => {
    // Calculate attempted totals by checking if total is >= 5
    const RowsTotal = OralPCEData.filter((student) => {
      const total = calculateTotal(student); // Use the calculateTotal function
      return total;
    }).length;
    return RowsTotal;
  };

  const getAllRowsStudentsTotalPercentage = () => {
    // Calculate attempted totals by checking if total is >= 5
    const attemptedTotal = OralPCEData.filter((student) => {
      const total = calculateTotal(student); // Use the calculateTotal function
      return total >= 5;
    }).length;
    return attemptedTotal;
  }

  // function to calculate no of student according to percentage criteria
  const getTotalStudentsPassedPerQuestion = (percentage) => {
    const passedCounts = questionColumns.map((col) => {
      // Find the corresponding object in COsData that matches the qname
      const correspondingCoData = COsData.find(
        (data) => data.qname === col.qname
      );

      // Get the maximum marks from the matched object
      const maxMarks = correspondingCoData ? correspondingCoData.marks : 0;

      return OralPCEData.filter((student) => {
        // Get the marks for the current question
        const studentMarks = student[col.qname];

        // Calculate the percentage for the student's marks in this specific question
        const studentPercentage = studentMarks
          ? (studentMarks / maxMarks) * 100
          : 0;

        return (
          studentPercentage >= percentage &&
          student[col.qname] !== null &&
          student[col.qname] >= 0
        );
      }).length;
    });

    return passedCounts;
  };


  const getTotalPercentage = () => {
    const totalStudents = getAllRowsStudentsTotalPercentage();
    const studentsPassed = getAllRowsStudentsTotal();

    if (studentsPassed === 0) {
      // Avoid division by zero by returning 0 or handling the case
      return 0;
    }

    const percentage = ((totalStudents / studentsPassed) * 100).toFixed(2);
    return percentage;
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
  const distinctConames = [
    ...new Set(COsActualNum
      .map((item) => item.coname ? item.coname.trim() : '')  // Check if coname exists before trimming
      .filter((coname) => coname !== '')  // Filter out empty strings
    ),
  ];

  // Function to group COsData by colnames
  const getQuestionColumns = () => {
    const groupedCOsData = COsData.reduce((acc, data) => {
      // If colnames doesn't exist in accumulator, add it
      if (!acc[data.colname]) {
        acc[data.colname] = {
          id: data.oralpce_idq,
          qname: data.colname, // Question name (colname)
          conames: [], // Initialize conames array
          marks: data.marks, // Keep the first marks
          usercourse_id: data.usercourseid
        };
      }

      // Push the coname under the corresponding colname
      acc[data.colname].conames.push(data.conames);

      return acc;
    }, {});

    // Convert the object back to an array to match the structure
    return Object.values(groupedCOsData);
  };

  // Call the function to get questionColumns
  const questionColumns = getQuestionColumns();

  const questionOralPce = getQuestionColumns().map(group => group.conames);

  const extractColumnNames = () => {
    const q1Columns = [];

    COsData.forEach((item) => {
      q1Columns.push(item.colname);
    });

    // Remove duplicates by converting the array to a Set, then back to an array
    const uniqueColumns = [...new Set(q1Columns)];

    return { q1Columns: uniqueColumns };
  };

  const { q1Columns } = extractColumnNames();


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
      const correspondingCoData = COsData.find((data) => data.colname === col);
      const maxMarks = correspondingCoData ? correspondingCoData.marks : 0;

      let value = parseAndConstrainValue(row[col], 0, maxMarks);
      return value !== null ? value : 0; // Replace null with 0 for calculation
    });

    // Calculate the total for Q1 columns
    const q1Total = q1Values.reduce((acc, value) => acc + value, 0);

    // Sum both totals to get the final total
    const total = q1Total;

    return total;
  };

  // Pagination logic
  const totalItems = OralPCEData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = OralPCEData.slice(startIndex, endIndex);

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
          sid: OralPCEData[actualIndex].sid,
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
      console.error("Error saving Oral PCE data:", error);
    }
  };
  // console.log(COsData)
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
    const newData = [...OralPCEData];
    newData[actualIndex][column] = value;
    setOralPCEData(newData);

    setMarksData((prevMarksData) => ({
      ...prevMarksData,
      [actualIndex]: {
        ...prevMarksData[actualIndex],
        [column]: value,
      },
    }));
  };

  console.log("COsData", COsData)

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
          let marks = student[col.colname];
          // Ensure marks are within limits and handle null
          const maxLimit = col.marks;
          if (marks !== null && marks > maxLimit) {
            errors.push(
              `Row ${rowIndex + 2}: ${col.colname
              } has marks ${marks}, which exceeds the limit of ${maxLimit}.`
            );
            marks = Math.min(marks, maxLimit); // Adjust the marks to be within the limit
          }

          validatedStudent[col.colname] = marks;
        });

        return validatedStudent;
      });

      if (errors.length > 0) {
        alert("Errors found:\n" + errors.join("\n"));
      } else {
        setOralPCEData(validatedData);

        const changes = [];
        validatedData.forEach((student) => {
          COsData.forEach((col) => {
            const marks = student[col.colname];
            if (marks !== undefined) {
              changes.push({
                sid: student.sid,
                qid: col.oralpce_idq,
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
    // console.log(changes);
    try {
      setLoading(true);
      const response = await api.put("/api/oral/pce/", changes);
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
    const dataWithTotal = OralPCEData.map((row) => ({
      ...row,
      Total: calculateTotal(row),
    }));

    // Create headers for the IA data
    const OralPCEHeaders = [
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
    const OralPCEDataForExport = [
      OralPCEHeaders,
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
      ...questionColumns.map((col) => col.coname),
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
    const coAverageRows = distinctConames.map((coName) => {
      const coAverageResult = coAverageResults.find(result => result.coursename === coName);

      const displayAttainmentPercentage = coAverageResult
        ? `${coAverageResult.attainmentPercentage} %`
        : `${total} %`;

      return [coName + " Average", displayAttainmentPercentage + " %"];
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
    const worksheet = XLSX.utils.aoa_to_sheet(OralPCEDataForExport);

    // Calculate starting row for the second table (Attainment Data)
    const attainmentStartRow = OralPCEDataForExport.length + 2; // Leave a couple of rows between tables

    // Append Attainment Data to the worksheet
    XLSX.utils.sheet_add_aoa(worksheet, attainmentDataForExport, {
      origin: { r: attainmentStartRow, c: 0 },
    });

    // Step 4: Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Oral PCE Data & Attainment");

    // Step 5: Write the workbook to a file
    XLSX.writeFile(workbook, "oral_pce_data_and_attainment.xlsx");
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data based on search query
  const filteredData = OralPCEData.filter((item) => {
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

  function calculateCoAverages(
    distinctConames,
    questionColumns,
    attainmentData
  ) {
    return distinctConames.map((coName) => {
      // const coColumns = questionColumns
      //   .map((col, index) => ({ ...col, index })) // include index for mapping
      //   .filter((col) => col.coname === coName); // filter by CO name

      // const coAverage = coColumns.length
      //   ? (
      //     coColumns.reduce((sum, col) => {
      //       const attainmentValue = getTotalStudentsPassedPerQuestion(
      //         attainmentData.passedPercentage
      //       )[col.index];
      //       const attemptedCount = getTotalStudentsAttempted()[col.index];
      //       const attainment = attemptedCount
      //         ? (attainmentValue / attemptedCount) * 100
      //         : 0;
      //       return sum + attainment;
      //     }, 0) / coColumns.length
      //   ).toFixed(2)
      //   : 0;
      // Find the current CO average result
      const coAverageResult = coAverageResults.find(result => result.coursename === coName);

      const attainmentPercentage = coAverageResult
        ? coAverageResult.attainmentPercentage
        : total;

      return {
        coName,
        attainmentPercentage: parseFloat(attainmentPercentage).toFixed(2)
      };
    });
  }

  // const coAverages = calculateCoAverages(
  //   distinctConames,
  //   questionColumns,
  //   attainmentData
  // );

  // console.log(coAverages);
  const [message, setMessage] = useState("");
  const handle_Attenment = (
    distinctConames,
    questionColumns,
    attainmentData,
    userCourseId
  ) => {
    if (userCourseId) {
      const coAverages = calculateCoAverages(
        [...new Set(distinctConames)],
        questionColumns,
        attainmentData
      );
      console.log("coAverages", coAverages);

      api
        .post("/api/oral/pce/insert-co-averages", {
          coAverages,
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

  // Call complete function once for all COs outside the map
  const allCOs = distinctConames;
  const columns = questionOralPce; // Your column structure
  const coColumns = COsActualNum.map((col, index) => ({ ...col, index })); // Include index for mapping

  const complete = (coColumns, allCOs, columns) => {
    // Object to store the calculated attainment for each CO
    const coAttainmentMap = {};

    // Initialize counters for each CO to calculate the average later
    const coAttainmentCount = {};

    // Directly perform the calculations here
    if (coColumns.length) {
      coColumns.forEach(col => {
        const coNames = Array.isArray(col.coname) ? col.coname : [col.coname]; // Ensure coNames is an array

        // Get the index for the column to calculate attainment
        const attainmentValue = getTotalStudentsPassedPerQuestion(
          attainmentData.passedPercentage
        )[col.index];

        const attemptedCount = getTotalStudentsAttempted()[col.index];

        // Calculate attainment percentage
        const attainmentPercentage = attemptedCount
          ? (attainmentValue / attemptedCount) * 100
          : 0;

        // Iterate over the COs in the current column and update their attainment in the map
        coNames.forEach(co => {
          if (attainmentPercentage > 0) { // Only consider attainments greater than 0
            // If the CO has been calculated already, sum the attainment and count occurrences
            if (coAttainmentMap[co]) {
              coAttainmentMap[co] += attainmentPercentage; // Accumulate attainment
              coAttainmentCount[co] += 1; // Increment the count for averaging later
            } else {
              coAttainmentMap[co] = attainmentPercentage; // Initialize attainment
              coAttainmentCount[co] = 1; // Initialize the count
            }
          }
        });
      });
    } else {
      // If no columns exist, set default value
      return allCOs.map(co => ({ coursename: co, attainment: "0.00" }));
    }

    // After processing, ensure every CO from the allCOs array has an entry in the map
    allCOs.forEach(co => {
      if (!coAttainmentMap[co]) {
        coAttainmentMap[co] = 0; // Default value if CO has no calculated attainment
        coAttainmentCount[co] = 1; // Avoid division by zero
      }
    });

    // Create the final output for all COs
    let finalCOAttainment = Object.keys(coAttainmentMap).map(co => ({
      coursename: co,
      attainmentPercentage: (coAttainmentMap[co] / coAttainmentCount[co]).toFixed(2) // Calculate the average attainment
    }))
      .sort((a, b) => a.coursename.localeCompare(b.coursename)); // Sort by coursename for consistent ordering

    // Create a map for quick lookup of CO index in finalCOAttainment array
    const coIndexMap = {};
    finalCOAttainment.forEach((co, index) => {
      coIndexMap[co.coursename] = index;
    });

    // Function to get average of neighbors' attainments within the same column group
    const getAverageOfNeighbors = (coArray, coIndexMap, columns) => {
      return coArray.map((co, index) => {
        if (parseFloat(co.attainmentPercentage) === 0) {
          // Find all groups where the CO is present
          const groups = columns.filter(group => group.includes(co.coursename));

          if (groups.length > 0) {
            let neighborAttainments = [];

            // Loop through each group and collect neighbor attainment values
            groups.forEach(group => {
              const currentNeighbors = group.map(neighbor => {
                const neighborIndex = coIndexMap[neighbor];
                return neighborIndex !== undefined ? parseFloat(coArray[neighborIndex].attainmentPercentage) : 0;
              }).filter(attainmentPercentage => attainmentPercentage > 0); // Only keep valid (non-zero) attainment values

              // Combine all valid neighbor attainments across groups
              neighborAttainments = neighborAttainments.concat(currentNeighbors);
            });

            if (neighborAttainments.length > 0) {
              const maxAttainment = Math.max(...neighborAttainments).toFixed(2);
              co.attainmentPercentage = maxAttainment;
            }
          }
        }
        return co;
      });
    };

    // Assign average attainment to COs with zero attainment
    finalCOAttainment = getAverageOfNeighbors(finalCOAttainment, coIndexMap, columns);

    // Filter out COs with '0.00' attainment before returning the final result
    finalCOAttainment = finalCOAttainment.filter(co => co.attainmentPercentage !== '0.00');

    console.log("finalCOAttainment", finalCOAttainment);

    return finalCOAttainment; // Return the accumulated result
  };


  // Calculate CO averages for all COs at once
  const coAverageResults = complete(coColumns, allCOs, columns);

  console.log("coAverageResults", coAverageResults);

  const total = getTotalPercentage();


  const handleClick = () => {
    navigate(`/AddStudent/${curriculum}/${userCourseId}`);
  }; 
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-blue-700 text-center font-bold">
        Oral (PCE)
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
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        rowSpan="2"
                        className="sticky left-0 px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Student ID
                      </th>
                      <th
                        rowSpan="2"
                        className="sticky left-24 px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        College ID
                      </th>
                      <th
                        rowSpan="2"
                        className="sticky left-48 px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Student Name
                      </th>
                      {questionColumns.map((col) => (
                        <th
                          key={col.qname}
                          colSpan={col.qname}
                          className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                        >
                          {col.qname}
                        </th>
                      ))}
                      <th
                        rowSpan="2"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                      <th
                        rowSpan="2"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                    <tr>
                      {questionColumns.map((col) => (
                        <th
                          key={col.qname}
                          rowSpan={col.conames}
                          className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                        >
                          {col.conames}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.slice(startIndex, endIndex).map((student, index) => {
                      const actualIndex = index + startIndex; // Adjust index to match actual data index
                      return (
                        <tr key={student.sid}>
                          <td className="sticky left-0 px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-white">
                            {editingRow === actualIndex ? (
                              <input
                                type="text"
                                value={student.sid}
                                onChange={(e) => handleInputChange(e, index, "sid")}
                                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            ) : (
                              student.sid
                            )}
                          </td>
                          <td className="sticky left-10 px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-white">
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-white">
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
                          {questionColumns.map((col) => (
                            <td
                              key={col.id}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {editingRow === actualIndex ? (
                                <select
                                  value={
                                    student[col.qname] === null ? "" : student[col.qname]
                                  }
                                  onChange={(e) => handleInputChange(e, index, col.qname)}
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
          </>
        )}
        {/* Pagination Controls */}
        {selectedCourse && selectedYear && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {filteredData.length > 0 && (
        <>
          {/* New container for Total Students Passed */}
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
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="sticky left-0 px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Type
                    </th>
                    {questionColumns.map((col) => (
                      <th
                        key={col.id}
                        className=" px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        {col.qname}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                    </th>
                  </tr>
                  <tr>
                    <th className="sticky left-0 px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      &nbsp;
                    </th>
                    {questionColumns.map((col) => (
                      <th
                        key={col.id}
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        {col.conames}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="sticky left-0 bg-white px-6 py-4 whitespace-nowrap text-sm text-white-500">
                      {display} {attainmentData.passedPercentage} {"%"}
                    </td>
                    {getTotalStudentsPassedPerQuestion(
                      attainmentData.passedPercentage
                    ).map((count, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-sm text-white-500"
                      >
                        {count}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
                      {getAllRowsStudentsTotalPercentage()}
                    </td>
                  </tr>
                  <tr>
                    <td className="sticky left-0 bg-white px-6 py-4 whitespace-nowrap text-sm text-white-500">
                      Students Attempted Per Question
                    </td>
                    {getTotalStudentsAttempted().map((count, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-sm text-white-500"
                      >
                        {count}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
                      {getAllRowsStudentsTotal()}
                    </td>
                  </tr>
                  <tr>
                    <td className="sticky left-0 bg-white px-6 py-4 whitespace-nowrap text-sm text-white-500">
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
                          className="px-6 py-4 whitespace-nowrap text-sm text-white-500"
                        >
                          {attainment} %
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
                      {getTotalPercentage()} {"%"}
                    </td>
                  </tr>
                  {/* Dynamic Rows for COs */}
                  {distinctConames.map((coName) => {

                    // Find the current CO average result
                    const coAverageResult = coAverageResults.find(result => result.coursename === coName);

                    const displayAttainmentPercentage = coAverageResult
                      ? `${coAverageResult.attainmentPercentage} %`
                      : `${total} %`;

                    return (
                      <tr key={coName}>
                        {/* Display CO Name */}
                        <td className="sticky left-0 bg-white px-6 py-4 whitespace-nowrap text-sm text-white-500">
                          {coName} Average
                        </td>

                        {/* Display the attainment or fallback total */}
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-white-500"
                          colSpan={questionColumns.length}
                        >
                          {/* Show the CO attainment percentage or '0.00%' if not found */}
                          {displayAttainmentPercentage}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {/* Section to display Total Students Attempted each question
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
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
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
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        {col.coname}
                      </th>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
             
              </tbody>
            </table> */}
    </div>
  );
};
export default OralPCE;
