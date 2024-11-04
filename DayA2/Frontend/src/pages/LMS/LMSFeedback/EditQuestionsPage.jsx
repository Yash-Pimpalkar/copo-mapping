import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../api";
import CourseSelector from "../../../component/CourseSelector/CourseSelector";

const EditQuestionsPage = ({ uid }) => {
  const [courses, setCourses] = useState([]);
  const [distinctCourses, setDistinctCourses] = useState([]);
  const [checkedStates, setCheckedStates] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [numQuestions, setNumQuestions] = useState(0);
  const [questionsCOData, setQuestionsCOData] = useState([]);
  const [questionsLabelData, setQuestionsLabelData] = useState(
    Array.from({ length: numQuestions }, () => ({ LabelNames: [] }))
  );

  const [loading, setLoading] = useState(false);
  const [numCOs, setCOs] = useState();
  const [formData, setFormData] = useState({ label: "", questions: [] });
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const { usercourseId } = useParams();
  // Fetch courses on mount
  const [userCourseId, setUserCourseId] = useState(usercourseId);
  const navigate = useNavigate();

  const curriculum = "feedback";
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
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchCourseData();
    }
  }, [uid]);

  // Fetch classrooms from API
  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await api.get(`/api/lmsclassroom/show/${uid}`);
        console.log(response);

        const classroomData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setCOs(classroomData);
      } catch (error) {
        console.error("Error fetching classroom:", error);
      }
    };

    if (uid) {
      fetchClassroom();
    }
  }, [uid]);

  // Arrays to populate day, month, and year dropdowns
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() + i
  );

  const handleDateChange = (day, month, year) => {
    if (day && month && year) {
      console.log(day);
      console.log(month);
      console.log(year);

      const monthIndex = months.indexOf(month); // Convert month to its index (0-11)
      const dateObject = new Date(Date.UTC(year, monthIndex, day)); // Use Date.UTC to avoid timezone offset

      setSelectedDate(dateObject.toISOString().split("T")[0]); // Store date in YYYY-MM-DD format
    } else {
      console.error("Data not reached here");
    }
  };

  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    console.log("Day:", day);
    handleDateChange(day, selectedMonth, selectedYear);
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    console.log("Month:", month);
    handleDateChange(selectedDay, month, selectedYear);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    console.log("Year:", year);
    handleDateChange(selectedDay, selectedMonth, year);
  };

  const handleNumQuestionsChange = (e) => {
    const newNumQuestions = parseInt(e.target.value, 10);
    setNumQuestions(newNumQuestions);

    // Initialize questionsLabelData with empty LabelNames arrays
    setQuestionsLabelData(
      Array.from({ length: newNumQuestions }, () => ({ LabelNames: [] }))
    );

    const newQuestions = Array.from(
      { length: newNumQuestions },
      (_, index) => ({
        questionName: "",
        numCOs: 0,
        coNames: [],
      })
    );

    setFormData((prevData) => ({ ...prevData, questions: newQuestions }));
  };

  // const handleCheckboxChange = (index) => {
  //     const newCheckedStates = [...checkedStates];
  //     newCheckedStates[index] = !newCheckedStates[index];
  //     setCheckedStates(newCheckedStates);

  //     setFormData((prevData) => {
  //         const newQuestions = [...prevData.questions];
  //         if (newQuestions[index]) {
  //             newQuestions[index].required = newCheckedStates[index];
  //         }
  //         return { ...prevData, questions: newQuestions };
  //     });
  // };

  const handleNumCOsChange = (index, value) => {
    // Parse and validate input
    const numCOs = parseInt(value, 10);

    if (isNaN(numCOs) || numCOs < 0) {
      console.error("Invalid number of COs");
      return;
    }

    setQuestionsCOData((prevData) => {
      const newQuestionsCOData = [...prevData];
      newQuestionsCOData[index] = {
        ...newQuestionsCOData[index],
        coNames: Array(numCOs).fill(""),
      };
      return newQuestionsCOData;
    });

    setFormData((prevData) => {
      const newQuestions = [...prevData.questions];
      if (newQuestions[index]) {
        newQuestions[index].numCOs = numCOs;
        newQuestions[index].coNames = Array(numCOs).fill("");
      }
      return { ...prevData, questions: newQuestions };
    });
  };

  const handleCONameChange = (questionIndex, coIndex, value) => {
    setQuestionsCOData((prevData) => {
      const newQuestionsCOData = [...prevData];
      newQuestionsCOData[questionIndex].coNames[coIndex] = value;
      return newQuestionsCOData;
    });

    setFormData((prevData) => {
      const newQuestions = [...prevData.questions];
      if (newQuestions[questionIndex]) {
        newQuestions[questionIndex].coNames[coIndex] = value;
      }
      return { ...prevData, questions: newQuestions };
    });
  };

  const handleQuestionLabelChange = (questionIndex, labelIndex, value) => {
    setQuestionsLabelData((prevData) => {
      const newQuestionsLabelData = [...prevData];

      // Ensure the question exists and initialize LabelNames if necessary
      if (!newQuestionsLabelData[questionIndex]) {
        newQuestionsLabelData[questionIndex] = { LabelNames: [] };
      }

      // Ensure LabelNames is initialized as an array
      if (!Array.isArray(newQuestionsLabelData[questionIndex].LabelNames)) {
        newQuestionsLabelData[questionIndex].LabelNames = [];
      }

      // Initialize the specific index in LabelNames if it doesn't exist
      if (
        newQuestionsLabelData[questionIndex].LabelNames[labelIndex] ===
        undefined
      ) {
        newQuestionsLabelData[questionIndex].LabelNames[labelIndex] = "";
      }

      // Set the new value
      newQuestionsLabelData[questionIndex].LabelNames[labelIndex] = value;

      console.log(newQuestionsLabelData);

      return newQuestionsLabelData;
    });

    setFormData((prevData) => {
      const newQuestions = [...prevData.questions];

      // Ensure the question exists and initialize LabelNames if necessary
      if (!newQuestions[questionIndex]) {
        newQuestions[questionIndex] = { LabelNames: [] };
      }

      // Ensure LabelNames is initialized as an array
      if (!Array.isArray(newQuestions[questionIndex].LabelNames)) {
        newQuestions[questionIndex].LabelNames = [];
      }

      // Initialize the specific index in LabelNames if it doesn't exist
      if (newQuestions[questionIndex].LabelNames[labelIndex] === undefined) {
        newQuestions[questionIndex].LabelNames[labelIndex] = "";
      }

      // Set the new value
      newQuestions[questionIndex].LabelNames[labelIndex] = value;

      return { ...prevData, questions: newQuestions };
    });
  };

  const handleQuestionNameChange = (index, value) => {
    setFormData((prevData) => {
      const newQuestions = [...prevData.questions];
      if (newQuestions[index]) {
        newQuestions[index].questionName = value;
      }
      return { ...prevData, questions: newQuestions };
    });
  };

  const handleLabelChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, label: value }));
  };

  console.log(selectedDate);

  const handleSubmit = async () => {
    console.log("Form Data:", formData);
    // You can call your API or any other logic to handle the data here.

    // Get the current time
    console.log("selectedDate", selectedDate);

    const { label, questions } = formData;
    const currentTime = new Date().toISOString();

    const formatDateForDatabase = (isoDate) => {
      const date = new Date(isoDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const formattedCreatedAt = formatDateForDatabase(currentTime);

    try {
      setLoading(true);

      // Prepare data to submit
      const dataToSubmit = {
        userid: userCourseId,
        question_name: label,
        questions: questions,
        created_at: formattedCreatedAt,
        deadline: selectedDate,
      };

      console.log("dataToSubmit", dataToSubmit);

      // Send data to the server
      await api.post("/api/lmsclassroom/feedback/create", {
        formDataForStudentFeedback: dataToSubmit,
      });

      alert("Data submitted successfully");
      setError(null);
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(error.response?.data?.error || "Failed to submit data");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate(`/AddStudent/${curriculum}/${userCourseId}`);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-8xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Feedback
        </h2>
        <div className="text-gray-600 text-sm mb-4">
          <span> Feedback / Questions</span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <Link
              to="/lms/StudentFeedback"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 text-center w-full md:w-auto"
            >
              Back
            </Link>
            {userCourseId && (
              <button
                onClick={handleClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Student
              </button>
            )}
            {/* <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto">
                            <option>Choose...</option>
                            <option>Template 1</option>
                            <option>Template 2</option>
                        </select> */}
          </div>

          {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 text-center w-full md:w-auto">
                            Export questions
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 text-center w-full md:w-auto">
                            Save as new template
                        </button>
                    </div> */}
        </div>

        {/* Course Selector */}
        {/* <div className="w-full mt-6">
                    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200">
                        <CourseSelector uid={uid} onUserCourseIdChange={setUserCourseId} />
                    </div>
                </div> */}

        <div className="w-full flex flex-col justify-between items-center max-w-8xl">
          {userCourseId && (
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 mt-8 w-full max-w-lg md:max-w-2xl lg:max-w-5xl border border-gray-200">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                Course and Academic Year Selected
              </h2>
              <p className="text-gray-700">Course ID: {userCourseId}</p>
            </div>
          )}
        </div>
      </div>

      {userCourseId && (
        <div className="bg-white shadow-lg rounded-xl flex flex-col px-4 sm:px-6 md:px-8 py-6 mt-8 w-full max-w-8xl border border-gray-200">
          <div className="w-full">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="label"
            >
              Label:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="label"
              type="text"
              value={formData.label}
              onChange={handleLabelChange}
              placeholder="Enter label"
            />

            <div className="mt-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="numQuestions"
              >
                Enter the number of questions:
              </label>
              <input
                id="numQuestions"
                type="text"
                min="0"
                className="bg-white border border-gray-300 text-gray-700 w-full py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleNumQuestionsChange}
              />
            </div>

            {numQuestions > 0 && (
              <div className="mt-6">
                {Array.from({ length: numQuestions }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 sm:p-6 mb-6 shadow-md w-full max-w-8xl rounded-lg border border-gray-300"
                  >
                    {/* <div className="flex items-center gap-4 mb-4">
                                            <input
                                                type="checkbox"
                                                id={`required-checkbox-${index}`}
                                                checked={checkedStates[index] || false}
                                                onChange={() => handleCheckboxChange(index)}
                                                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <label htmlFor={`required-checkbox-${index}`} className="text-gray-900 text-lg font-bold">
                                                Required
                                            </label>
                                        </div> */}
                    <label
                      htmlFor={`questionbox-${index}`}
                      className="text-gray-900 text-lg font-bold mb-2"
                    >
                      Question {index + 1} Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Enter label"
                      value={formData.questions[index]?.questionName || ""}
                      onChange={(e) =>
                        handleQuestionNameChange(index, e.target.value)
                      }
                    />
                    <div className="flex flex-col mt-6">
                      <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="numberofCOs"
                      >
                        Number of COs:
                      </label>
                      <input
                        id={`numCOs-${index}`}
                        type="text"
                        min="0"
                        className="bg-white border border-gray-300 text-gray-700 w-full py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          handleNumCOsChange(index, e.target.value)
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      {questionsCOData[index]?.coNames.map((_, coIndex) => (
                        <div
                          key={coIndex}
                          className="flex items-center space-x-2"
                        >
                          <label
                            className="block text-gray-700 text-lg font-bold"
                            htmlFor={`coName-${index}-${coIndex}`}
                          >
                            CO Name:
                          </label>
                          <input
                            type="text"
                            id={`coName-${index}-${coIndex}`}
                            placeholder="Enter CO name"
                            value={questionsCOData[index].coNames[coIndex]}
                            onChange={(e) =>
                              handleCONameChange(index, coIndex, e.target.value)
                            }
                            className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 upper-case"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 flex flex-col items-center bg-gray-100 rounded-lg shadow-md mt-4">
            <h2 className="text-lg font-semibold mb-4">Add Deadline</h2>

            <div className="flex space-x-4">
              {/* Day Dropdown */}
              <select
                value={selectedDate}
                onChange={handleDayChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Day</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              {/* Month Dropdown */}
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              {/* Year Dropdown */}
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <p className="text-gray-700">
                Selected Date: {selectedDay} {selectedMonth} {selectedYear}
              </p>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6 w-full md:w-auto"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditQuestionsPage;
