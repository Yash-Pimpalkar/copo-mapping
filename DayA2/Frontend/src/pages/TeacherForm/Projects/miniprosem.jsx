import React, { useEffect, useState } from "react";
import api from "../../../api";
import Pagination from "../../../component/Pagination/Pagination";
import * as XLSX from "xlsx";
import LoadingButton from "../../../component/Loading/Loading";
import { useNavigate } from 'react-router-dom';

const MiniproSem = ({ uid }) => {
  const [courses, setCourses] = useState([]);
  const [distinctCourses, setDistinctCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [userCourseId, setUserCourseId] = useState(null);
  const [userCourse, setUserCourse] = useState([]);
  const [Err, setErr] = useState();
  const [MiniproData, SetMiniprodata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [editedMarks, setEditedMarks] = useState({});
  const [maxLimitlogbook, setmaxlimitlogbook] = useState(0);
  const [maxLimitreview1, setmaxlimitreview1] = useState(0);
  const [maxLimitreview2, setmaxlimitreview2] = useState(0);
  const [maxLimitproreport, setmaxlimitproreport] = useState(0);
  const navigate = useNavigate(); 

  const curriculum = "miniprosem";
  const [attainmentData, setAttainmentData] = useState({
    passedPercentage: 50,
  });
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
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
      }finally{
        setLoading(false);
      }
    };

    if (uid) {
      fetchCourseData();
    }
  }, [uid]);

  useEffect(() => {
    const fetchMiniproData = async () => {
      if (userCourseId) {
        try {
          setLoading(true);
          const res = await api.get(`/api/uploadminiprosem/show/${userCourseId}`);
          SetMiniprodata(res.data);
          const res1 = await api.get(`/api/uploadminiprosem/coname/${userCourseId}`);
          if (Array.isArray(res1.data)) {
            setUserCourse(res1.data);
          } else {
            console.error("Expected an array, but got: ", res1.data);
          }
          console.log("Co:", res1.data);
          const res2 = await api.get(`/api/uploadminiprosem/limit/${userCourseId}`);
          const limits = res2.data[0];  // Assuming the response structure contains the limits
          setmaxlimitlogbook(limits.logbookmarks);
          setmaxlimitreview1(limits.review1marks);
          setmaxlimitreview2(limits.review2marks);
          setmaxlimitproreport(limits.proreportmarks);
        } catch (error) {
          console.error("Error fetching Mini Project data:", error);
        } finally{
          setLoading(false);
        }
      }
    };

    fetchMiniproData();
  }, [userCourseId]);
  console.log(userCourse);

  // Calculate 50% thresholds for all categories
  const logbookHalfLimit = maxLimitlogbook * 0.5;
  const review1HalfLimit = maxLimitreview1 * 0.5;
  const review2HalfLimit = maxLimitreview2 * 0.5;
  const proreportHalfLimit = maxLimitproreport * 0.5;

  // Filter students below 50% in any category
  const studentsBelowHalf = MiniproData.filter(
    (student) =>
      student.logbookmarks < logbookHalfLimit ||
      student.review1marks < review1HalfLimit ||
      student.review2marks < review2HalfLimit ||
      student.proreportmarks < proreportHalfLimit
  );

  // Get total count of students below 50% in any category
  const countOfStudentsBelowHalf = studentsBelowHalf.length;

  // Calculate percentage of students who passed
  const passedPercentage = (countOfStudentsBelowHalf / MiniproData.length) * 100;

  console.log("Maxlimit logbook: ", maxLimitlogbook);
  console.log("Maxlimit: ", maxLimitreview1);
  console.log("Maxlimit: ", maxLimitreview2);
  console.log("Maxlimit: ", maxLimitproreport);

  console.log(userCourseId);

  const calculateTotal = (student) => {
    // Calculate average of review1_marks and review2_marks
    const avgReviews = (student.review1marks != null && student.review2marks != null)
      ? (parseInt(student.review1marks) + parseInt(student.review2marks)) / 2
      : 0;

    return (
      parseInt(parseInt(student.logbookmarks || 0) +
        avgReviews +  // Add the calculated average of reviews
        parseInt(student.proreportmarks || 0))
    );
  };

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
  const totalItems = MiniproData.length;
  console.log("Mini:", MiniproData);
  console.log("Total count of MiniproData:", MiniproData.length);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  // console.log(startIndex);
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = MiniproData.slice(startIndex, endIndex);

  const filteredData = MiniproData.filter((item) => {
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
    setEditingRow(index);
    setEditedMarks({
      ...editedMarks,
      [index]: {
        logbookmarks: MiniproData[index].logbookmarks,
        review1marks: MiniproData[index].review1marks,
        review2marks: MiniproData[index].review2marks,
        proreportmarks: MiniproData[index].proreportmarks,
        avgReviews: MiniproData[index].avgReviews,
      },
    });
  };


  //   const handleSaveClick = async (index) => {
  //     const actualIndex = index;
  //     const semId = MiniproData[actualIndex].sem_id;
  //     const marks = editedMarks[index];

  //     try {
  //       await api.put("/api/uploadminiprosem/", { sem_id: semId, Marks: marks });
  //       console.log(`Saving sem_id: ${semId}, marks: ${marks}`);
  //       SetMiniprodata((prevData) =>
  //         prevData.map((item, idx) =>
  //           idx === actualIndex ? { ...item, marks } : item
  //         )
  //       );
  //       setEditingRow(null);
  //     } catch (error) {
  //       console.error("Error saving IA data:", error);
  //     }
  //   };
  console.log(MiniproData)
  const handleSaveClick = async (index) => {
    const actualIndex = index;
    const mainminiprosemid = MiniproData[actualIndex].mainminiprosemid;
    const updatedData = editedMarks[index];
  
    try {
      setLoading(true);
      await api.put("/api/uploadminiprosem/", {
        mainminiprosemid: mainminiprosemid,
        logbookmarks: parseInt(updatedData.logbookmarks, 10),
        review1marks: parseInt(updatedData.review1marks, 10),
        review2marks: parseInt(updatedData.review2marks, 10),
        proreportmarks: parseInt(updatedData.proreportmarks, 10),
        // avgReviews: parseInt(updatedData.avgReviews, 10), // Uncomment if needed
      });
  
      SetMiniprodata((prevData) =>
        prevData.map((item, idx) =>
          idx === actualIndex ? { ...item, ...updatedData } : item
        )
      );
      setEditingRow(null);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCancelClick = () => {
    setEditingRow(null);
    setEditedMarks({});
  };
  //
  //   const handleMarksChange = (event, index) => {
  //     const value = event.target.value;

  //     // Check if the value is blank and should be sent as null
  //     if (value === "") {
  //       setEditedMarks((prev) => ({
  //         ...prev,
  //         [index]: null,
  //       }));
  //       return; // Exit the function after setting null
  //     }

  //     // Check if the value is outside the range
  //     if (value > maxLimit) {
  //       alert(`Value should not be greater than ${maxLimit}`);
  //       return; // Exit the function without updating
  //     }

  //     if (value < 0) {
  //       alert("Value should not be less than 0");
  //       return; // Exit the function without updating
  //     }

  //     setEditedMarks((prev) => ({
  //       ...prev,
  //       [index]: value,
  //     }));
  //   };

  const handleAttainmentChange = (e, key) => {
    const value = e.target.value;
    setAttainmentData({
      ...attainmentData,
      [key]: value,
    });
  };

  //1. get data from mjorprodata individual columns
  const logbookmarks = MiniproData.map(item => item.logbookmarks);
  const review1marks = MiniproData.map(item => item.review1marks);
  const review2marks = MiniproData.map(item => item.review2marks);
  const projectreportquality = MiniproData.map(item => item.proreportmarks);
  console.log(logbookmarks);
  console.log(review1marks);
  console.log(review2marks);
  console.log(projectreportquality);

  const handleLogbookMarksChange = (event, index) => {
    const value = event.target.value;

    // Check if the value is blank and should be sent as null
    if (value === "") {
      setEditedMarks((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          logbookmarks: null,
        },
      }));
      return; // Exit the function after setting null
    }

    // Check if the value is outside the range
    if (value > maxLimitlogbook) {
      alert(`Value should not be greater than ${maxLimitlogbook}`);
      return; // Exit the function without updating
    }


    if (value < 0) {
      alert("Value should not be less than 0");
      return; // Exit the function without updating
    }

    setEditedMarks((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        logbookmarks: value,
      },
    }));
  };


  const handleReview1MarksChange = (event, index) => {
    const value = event.target.value;
    // Check if the value is blank and should be sent as null
    if (value === "") {
      setEditedMarks((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          review1marks: null,
        },
      }));
      return; // Exit the function after setting null
    }

    // Check if the value is outside the range
    if (value > maxLimitreview1) {
      alert(`Value should not be greater than ${maxLimitreview1}`);
      return; // Exit the function without updating
    }

    if (value < 0) {
      alert("Value should not be less than 0");
      return; // Exit the function without updating
    }
    setEditedMarks((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        review1marks: value,
      },
    }));
  };

  const handleReview2MarksChange = (event, index) => {
    const value = event.target.value;
    // Check if the value is blank and should be sent as null
    if (value === "") {
      setEditedMarks((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          review2marks: null,
        },
      }));
      return; // Exit the function after setting null
    }

    // Check if the value is outside the range
    if (value > maxLimitreview2) {
      alert(`Value should not be greater than ${maxLimitreview2}`);
      return; // Exit the function without updating
    }

    if (value < 0) {
      alert("Value should not be less than 0");
      return; // Exit the function without updating
    }
    setEditedMarks((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        review2marks: value,
      },
    }));
  };

  const handleProreportMarksChange = (event, index) => {
    const value = event.target.value;
    // Check if the value is blank and should be sent as null
    if (value === "") {
      setEditedMarks((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          proreportmarks: null,
        },
      }));
      return; // Exit the function after setting null
    }

    // Check if the value is outside the range
    if (value > maxLimitproreport) {
      alert(`Value should not be greater than ${maxLimitproreport}`);
      return; // Exit the function without updating
    }

    if (value < 0) {
      alert("Value should not be less than 0");
      return; // Exit the function without updating
    }
    setEditedMarks((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        proreportmarks: value,
      },
    }));
  };

  // Counters for valid rows in each column
  let validLogbookmarksCount = 0;
  let validReview1marksCount = 0;
  let validReview2marksCount = 0;
  let validProreportmarksCount = 0;

  // Filter rows based on all four conditions
  const filteredDataAttainment = MiniproData.filter(item => {
    let isValid = true;

    // Validate logbookmarks
    if (item.logbookmarks > maxLimitlogbook) {
      console.error(`Error: logbookmarks value ${item.logbookmarks} exceeds the max limit of ${maxLimitlogbook}`);
      isValid = false;
    } else if (item.logbookmarks >= maxLimitlogbook / 2) {
      validLogbookmarksCount++;
    }

    // Validate review1marks
    if (item.review1marks > maxLimitreview1) {
      console.error(`Error: review1marks value ${item.review1marks} exceeds the max limit of ${maxLimitreview1}`);
      isValid = false;
    } else if (item.review1marks >= maxLimitreview1 / 2) {
      validReview1marksCount++;
    }

    // Validate review2marks
    if (item.review2marks > maxLimitreview2) {
      console.error(`Error: review2marks value ${item.review2marks} exceeds the max limit of ${maxLimitreview2}`);
      isValid = false;
    } else if (item.review2marks >= maxLimitreview2 / 2) {
      validReview2marksCount++;
    }

    // Validate proreportmarks
    if (item.proreportmarks > maxLimitproreport) {
      console.error(`Error: proreportmarks value ${item.proreportmarks} exceeds the max limit of ${maxLimitproreport}`);
      isValid = false;
    } else if (item.proreportmarks >= maxLimitproreport / 2) {
      validProreportmarksCount++;
    }

    return isValid;
  });

  // Get the length of valid rows (where all conditions are satisfied)
  const validRowsCount = filteredDataAttainment.length;

  console.log(`Number of valid rows: ${validRowsCount}`);
  console.log(`Valid logbookmarks count: ${validLogbookmarksCount}`);
  console.log(`Valid review1marks count: ${validReview1marksCount}`);
  console.log(`Valid review2marks count: ${validReview2marksCount}`);
  console.log(`Valid proreportmarks count: ${validProreportmarksCount}`);


  // const handleAttainmentChange = (event, key) => {
  //   let value = event.target.value;

  //   // Prevent non-numeric input
  //   if (!/^\d*$/.test(value)) {
  //     setError("Only numeric values are allowed.");
  //     return;
  //   }

  //   // Convert value to a number for validation
  //   const numericValue = Number(value);

  //   // Ensure value is within the range
  //   if (numericValue < 0 || numericValue > maxLimit) {
  //     setError(`Value must be between 0 and ${maxLimit}`);
  //     return;
  //   } else {
  //     setError(""); // Clear error if within range
  //   }

  //   // Update the attainment data state
  //   setAttainmentData((prevData) => ({
  //     ...prevData,
  //     [key]: value,
  //   }));
  // };

  const [error, setError] = useState("");

  const avglogbookattainment = ((validLogbookmarksCount / MiniproData.length) * 100).toFixed(2);
  const avgreviews1attainment = ((validReview1marksCount / MiniproData.length) * 100).toFixed(2);
  const avgreviews2attainment = ((validReview2marksCount / MiniproData.length) * 100).toFixed(2);
  const avgprereportattainment = ((validProreportmarksCount / MiniproData.length) * 100).toFixed(2);

  const avgattainment = (((validLogbookmarksCount + validReview1marksCount + validReview2marksCount + validProreportmarksCount) / 4) /
    ((MiniproData.length + MiniproData.length + MiniproData.length + MiniproData.length) / 4) * 100).toFixed(2);



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
        return {
          mainminiprosemid: row[headers.indexOf("Minipro Id")],
          stud_clg_id: row[headers.indexOf("Student ID")],
          student_name: row[headers.indexOf("Student Name")],
          logbookmarks: row[headers.indexOf("Logbook Marks")],
          review1marks: row[headers.indexOf("Review1 Marks")],
          review2marks: row[headers.indexOf("Review2 Marks")],
          proreportmarks: row[headers.indexOf("Project Report Quality")],
        };
      });

      try {
        setLoading(true);
        console.log(validatedData);
        await api.put("/api/uploadminiprosem/", validatedData);
        SetMiniprodata(validatedData);
        alert("File uploaded successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      } finally{
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };





  const handleFileDownload = () => {
    const formattedData = MiniproData.map((student) => {
      const avgReviews = (student.review1marks && student.review2marks)
        ? parseInt((parseInt(student.review1marks, 10) + parseInt(student.review2marks, 10)) / 2, 10)
        : 0;

      const total = parseInt(parseInt(student.logbookmarks, 10) + avgReviews + parseInt(student.proreportmarks, 10));

      return {
        mainminiprosemid: student.mainminiprosemid,
        stud_clg_id: student.stud_clg_id,
        student_name: student.student_name,
        logbookmarks: student.logbookmarks,
        review1marks: student.review1marks,
        review2marks: student.review2marks,
        avgReviews: avgReviews,
        proreportmarks: student.proreportmarks,
        total: total,
      };
    });

    const headers = ["Minipro Id", "Student ID", "Student Name", "Logbook Marks", "Review1 Marks", "Review2 Marks", "Avg of Reviews", "Project Report Quality", "Total"];
    const dataWithHeaders = [headers, ...formattedData.map(Object.values)];

    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Miniproject Data");
    XLSX.writeFile(workbook, "Miniproject data.xlsx");
  };

  const [message, setMessage] = useState("");
  function calculateCoAverages(userCourse, MiniproData, maxLimit, attainmentData) {
    return userCourse.map((course) => {

      const avgatt = (((validLogbookmarksCount + validReview1marksCount + validReview2marksCount + validProreportmarksCount) / 4) /
        ((MiniproData.length + MiniproData.length + MiniproData.length + MiniproData.length) / 4) * 100).toFixed(2);

      console.log("Avgatt:", avgatt)

      return { coName: course.coname, coAverage: avgatt };
    });
  }


  const handle_Attainment = (userCourse, MiniproData, maxLimitlogbook, maxLimitreview1, maxLimitreview2, maxLimitproreport, attainmentData, userCourseId) => {
    if (userCourseId) {
      // Calculate CO averages
      const coAveragesAtt = calculateCoAverages(userCourse, MiniproData, maxLimitlogbook, maxLimitreview1, maxLimitreview2, maxLimitproreport, attainmentData);
      console.log("coAverages: ", coAveragesAtt);

      // Map over coAverages and calculate attainment for each CO
      const coAveragesWithAttainment = coAveragesAtt.map((co) => {
        //     const average = parseFloat(co.coAverage); // Convert coAverage to float
        // Determine attainment based on coAverage
        let attainment;
        if (coAveragesAtt <= 40) {
          attainment = 0;
        } else if (coAveragesAtt > 40 && coAveragesAtt <= 60) {
          attainment = 1;
        } else if (coAveragesAtt > 60 && coAveragesAtt <= 70) {
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
        .post("/api/uploadminiprosem/insert-co-averages", {
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
        Mini Project
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
        {filteredData.length > 0 && (
          <div className="mt-4 overflow-x-auto max-w-full">
          <table className="mt-4 min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="sticky left-0 px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                  Seat No.
                </th>
                <th className="sticky left-10 px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                  Logbook Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                  Review 1 Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                  Review 2 Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                  Avg of reviews
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                  Project Report Quality
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

                // Calculate average of review1_marks and review2_marks
                const avgReviews = (student.review1marks && student.review2marks)
                  ? parseInt((parseInt(student.review1marks, 10) + parseInt(student.review2marks, 10)) / 2, 10)
                  : 0;

                return (
                  <tr key={student.sid} className="hover:bg-gray-100">
                    <td className="sticky left-0 bg-white z-10  px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {actualIndex + 1} {/* Displaying the row number */}
                    </td>
                    <td className="sticky left-10 bg-white z-10 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.stud_clg_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.student_name}
                    </td>

                    {/* Logbook Marks */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingRow === actualIndex ? (
                        <input
                          type="text"
                          value={
                            editedMarks[actualIndex]?.logbookmarks !== undefined
                              ? editedMarks[actualIndex].logbookmarks
                              : student.logbookmarks
                          }
                          onChange={(event) => handleLogbookMarksChange(event, actualIndex)}
                          className="w-full border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      ) : (
                        student.logbookmarks // Show existing logbook marks if not editing
                      )}
                    </td>
                    {/* Review 1 Marks */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingRow === actualIndex ? (
                        <input
                          type="text"
                          value={
                            editedMarks[actualIndex]?.review1marks !== undefined
                              ? editedMarks[actualIndex].review1marks
                              : student.review1marks
                          }
                          onChange={(event) => handleReview1MarksChange(event, actualIndex)}
                          className="w-full border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      ) : (
                        student.review1marks // Show existing logbook marks if not editing
                      )}
                    </td>

                    {/* Review 2 Marks */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingRow === actualIndex ? (
                        <input
                          type="text"
                          value={
                            editedMarks[actualIndex]?.review2marks !== undefined
                              ? editedMarks[actualIndex].review2marks
                              : student.review2marks
                          }
                          onChange={(event) => handleReview2MarksChange(event, actualIndex)}
                          className="w-full border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      ) : (
                        student.review2marks // Show existing logbook marks if not editing
                      )}
                    </td>

                    {/* Automatically Calculated Average of Reviews */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {avgReviews} {/* Display calculated average */}
                    </td>

                    {/* Pro Report Marks */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingRow === actualIndex ? (
                        <input
                          type="text"
                          value={
                            editedMarks[actualIndex]?.proreportmarks !== undefined
                              ? editedMarks[actualIndex].proreportmarks
                              : student.proreportmarks
                          }
                          onChange={(event) => handleProreportMarksChange(event, actualIndex)}
                          className="w-full border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      ) : (
                        student.proreportmarks // Show existing logbook marks if not editing
                      )}
                    </td>

                    {/* Total Marks */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculateTotal(student)}
                    </td>

                    {/* Actions */}
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
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
                  MiniproData,
                  maxLimitlogbook,
                  maxLimitreview1,
                  maxLimitreview2,
                  maxLimitproreport,
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
            <div className="mt-4">
              <h2 className="text-md font-semibold">
                Total Students with Marks Below 50%: {countOfStudentsBelowHalf} / {MiniproData.length}
              </h2>
              <p>
                Percentage of students who passed: {passedPercentage.toFixed(2)}%
              </p>
              <table>
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">

                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                      Logbook Marks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                      Review 1 marks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                      Review 2 marks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                      Project Quality
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                      Out of 100
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="">
                      Total student passed with {">"} 50%
                    </td>
                    <td>
                      {validLogbookmarksCount}
                    </td>
                    <td>
                      {validReview1marksCount}
                    </td>
                    <td>
                      {validReview2marksCount}
                    </td>
                    <td>
                      {validProreportmarksCount}
                    </td>
                    <td>
                      {(validLogbookmarksCount + validReview1marksCount + validReview2marksCount + validProreportmarksCount) / 4}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Total Students attempted the QUESTION
                    </td>
                    <td>
                      {MiniproData.length}
                    </td>
                    <td>
                      {MiniproData.length}
                    </td>
                    <td>
                      {MiniproData.length}
                    </td>
                    <td>
                      {MiniproData.length}
                    </td>
                    <td>
                      {(MiniproData.length + MiniproData.length + MiniproData.length + MiniproData.length) / 4}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      CO Attainment %
                    </td>
                    <td>
                      {avglogbookattainment}
                    </td>
                    <td>
                      {avgreviews1attainment}
                    </td>
                    <td>
                      {avgreviews2attainment}
                    </td>
                    <td>
                      {avgprereportattainment}
                    </td>
                    <td>
                      {avgattainment}
                    </td>
                  </tr>
                  <>
                    <tr>
                      <td>Average Attainment for</td>
                    </tr>
                    {userCourse.map((course, index) => (
                      <tr key={index}>
                        <td>{course.coname}</td>
                        <td className="text-end">{avgattainment}</td>
                      </tr>
                    ))}
                  </>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniproSem;
