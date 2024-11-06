import React, { useEffect, useState } from "react";
import api from "../../../api";
import Pagination from "../../../component/Pagination/Pagination";
import * as XLSX from "xlsx"; // For Excel download and upload
import LoadingButton from "../../../component/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Trade = ({ uid, tw_id }) => {
  const [experimentData, setExperimentData] = useState([]);
  let [questionData, setQuestionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10); // Number of rows per page
  const [editMode, setEditMode] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // Search term for students
  const [loading, setLoading] = useState(false);
  const userCourseId = uid;
  // New State for Attainment Calculation
  const [attainmentData, setAttainmentData] = useState({
    passedPercentage: 50, // Default to 50% passing criteria
  });

  const navigate = useNavigate();

  const curriculum = "trade";
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchExperimentData = async () => {
      try {
        const response = await api.get(`/api/termwork/show/trade/${uid}`);
        console.log("response.data[0]", response.data[0]);
        const response1 = await api.get(`/api/termwork/show/tradeco/${uid}`);
        setExperimentData(response.data[0]);
        setQuestionData(response1.data);
        console.log("Here:", response1.data);
      } catch (error) {
        console.error("Error fetching experiment data:", error);
      }
    };

    if (userCourseId) {
      fetchExperimentData();
    }
  }, [userCourseId]);
  console.log("questionData", questionData);

  const fetchExperimentData = async () => {
    try {
      const response = await api.get(`/api/termwork/show/trade/${uid}`);
      const response1 = await api.get(`/api/termwork/show/tradeco/${uid}`);
      setExperimentData(response.data[0]);
      setQuestionData(response1.data);
    } catch (error) {
      console.error("Error fetching experiment data:", error);
    }
  };
  console.log("experimentData", experimentData);

  // Get experiment keys dynamically (e.g., EXPERIMENT1, EXPERIMENT2, etc.)
  const getExperimentKeys = () => {
    if (experimentData && experimentData.length > 0) {
      return Object.keys(experimentData[0]).filter((key) =>
        key.startsWith("TRADE")
      );
    }
    return [];
  };

  const experimentKeys = getExperimentKeys();
  console.log(experimentKeys);
  console.log(questionData);

  function mergeConameByTradeIdq(questiondata) {
    // Create a map to store unique entries based on trade_idq
    const mergedDataMap = new Map();

    questiondata.forEach((item) => {
      const { trade_idq, coname, ...rest } = item;

      if (mergedDataMap.has(trade_idq)) {
        // If the trade_idq exists, add the coname to the existing array
        const existingEntry = mergedDataMap.get(trade_idq);
        if (!existingEntry.conames.includes(coname)) {
          existingEntry.conames.push(coname);
        }
      } else {
        // If the trade_idq is new, add it to the map with coname as an array
        mergedDataMap.set(trade_idq, { ...rest, trade_idq, conames: [coname] });
      }
    });

    // Convert the map back to an array
    return Array.from(mergedDataMap.values());
  }

  questionData = mergeConameByTradeIdq(questionData);
  console.log(questionData);

  // Find the corresponding conames for each experimentKey from questionData
  const getCOName = (experimentKey) => {
    const question = questionData.find(
      (q) => q.tradename === experimentKey
    );
    return question ? question.conames.join(", ") : "";
  };

  // Get the maximum marks for an experiment
  const getMaxMarks = (experimentKey) => {
    const question = questionData.find(
      (q) => q.tradename === experimentKey
    );
    return question ? question.marks : 100;
  };

  console.log(experimentData.length);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(experimentData.length / dataPerPage);

  // Get current data based on the current page
  const filteredData = experimentData.filter((student) => {
    const studentName = student.student_name?.toLowerCase() || ""; // Use optional chaining
    const studentId = student.stud_clg_id?.toLowerCase() || ""; // Use optional chaining
    const search = searchTerm.toLowerCase();

    return studentName.includes(search) || studentId.includes(search);
  });

  const currentData = filteredData.slice(
    (currentPage - 1) * dataPerPage,
    currentPage * dataPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setEditMode(null);
    setEditedValues({});
  };

  // Calculate the total of all experiments for a student
  const calculateTotal = (student) => {
    return experimentKeys.reduce((total, key) => {
      return total + (student[key] !== null ? student[key] : 0);
    }, 0);
  };

  // Start editing a student record
  const startEditing = (sid, student) => {
    setEditMode(sid);
    setEditedValues(
      experimentKeys.reduce((values, key) => {
        values[key] = student[key];
        return values;
      }, {})
    );
  };

  // Save the edited values
  const saveEdits = async (sid) => {
    console.log("Experiment Keys:", experimentKeys);
    const updatedExperiments = experimentKeys.map((key) => {
      const value = editedValues[key];
      // const tradeId = parseInt(key.replace("TRADE_", ""), 10);
      // console.log(`Processing key: ${key}, parsed trade_id: ${tradeId}`);

      // Find the questionData item by matching tradename with key
      const questionItem = questionData.find((q) => q.tradename === key);
      return {
        // question_id: questionData.find((q) => q.question_name === key)
        //   ?.question_id,
        question_id: questionItem ? questionItem.trade_idq : null,
        value: value === null ? null : parseInt(value, 10),
      };
    });

    const formattedData = {
      sid, // Include sid here
      experiments: updatedExperiments,
    };

    try {
      await api.put("/api/termwork/trade/update", formattedData);
      const response = await api.get(`/api/termwork/show/trade/${uid}`);
      console.log("In save Edit", response.data[0]);
      setExperimentData(response.data[0]);
    } catch (error) {
      console.error("Error saving experiment data:", error);
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
  const handleInputChange = (event, experimentKey) => {
    const { value } = event.target;
    const maxLimit = getMaxMarks(experimentKey);

    if (value === "") {
      setEditedValues((prev) => ({ ...prev, [experimentKey]: null }));
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

    setEditedValues((prev) => ({ ...prev, [experimentKey]: numericValue }));
  };

  // Export to Excel
  const exportToExcel = () => {
    // Create a deep copy of the data to avoid mutating the original array
    const sortedExperimentData = experimentData.map((student) => {
      const sortedStudentData = {};

      // First, copy the student identification info like sid, stud_clg_id, student_name
      sortedStudentData.sid = student.sid;
      sortedStudentData.stud_clg_id = student.stud_clg_id;
      sortedStudentData.student_name = student.student_name;

      // Extract and sort the experiment fields
      const experimentKeys = Object.keys(student)
        .filter((key) => key.startsWith("TRADE")) // Only get the keys that are experiments
        .sort((a, b) => {
          const aNumber = parseInt(a.replace("TRADE", ""));
          const bNumber = parseInt(b.replace("TRADE", ""));
          return aNumber - bNumber; // Sort in ascending order based on the number
        });

      // Add sorted experiment data back to the object
      experimentKeys.forEach((key) => {
        sortedStudentData[key] = student[key];
      });

      return sortedStudentData;
    });

    // Export the sorted data to Excel
    const worksheet = XLSX.utils.json_to_sheet(sortedExperimentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trade");
    XLSX.writeFile(workbook, "TradeData.xlsx");
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

        const headers = jsonData[0];
        const rows = jsonData.slice(1);

        const formattedData = rows
          .map((row) => {
            const student = {};
            headers.forEach((header, index) => {
              student[header] = row[index];
            });
            return student;
          })
          .map((student) => ({
            sid: student.sid,
            experiments: Object.keys(student)
              .filter((key) => key.startsWith("TRADE"))
              .map((key) => ({
                question_id: getQuestionIdFromExperimentKey(key),
                value: student[key] === "" ? null : parseInt(student[key], 10),
              })),
          }));

        try {
          await api.put("/api/termwork/trade/update", {
            experiments: formattedData,
          });
          setLoading(false);
          fetchExperimentData();
          alert("Excel data imported and experiments updated successfully.");
        } catch (error) {
          setLoading(false);
          console.error("Error uploading experiment data:", error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };
  console.log(experimentData);
  console.log(experimentKeys)
  const handle_Attenment = (
    experimentKeys,
    attainmentData,
    tw_id,
    userCourseId
  ) => {
    console.log(userCourseId);
    // Logic to handle attainment calculation
    const attainmentList = calculateAttainmentList();
    console.log(attainmentData.passedPercentage);
    // Store data in localStorage as 'ExperimentAttainmentData'
    const dataToStore = {
      attainmentList,
      passedPercentage: attainmentData.passedPercentage,
      tw_id, // Include tw_id
      userCourseId, // Include userCourseId
    };

    localStorage.setItem("TradeAttainmentData", JSON.stringify(dataToStore));

    // Call the function to update the experiment list
    // updateExperimentList(attainmentList);

    // Log the data after updating
    console.log("Attainment updated:", attainmentData);

    // Display a success message
    setMessage("Attainment data has been updated successfully.");
  };
  // Get total students passed per question based on percentage criteria
  const getTotalStudentsPassedPerQuestion = (percentage) => {
    return experimentKeys.map((experimentKey) => {
      return filteredData.filter(
        (student) =>
          student[experimentKey] !== null &&
          student[experimentKey] >=
            (getMaxMarks(experimentKey) * percentage) / 100
      ).length;
    });
  };
  // Get total students attempted per question
  const getTotalStudentsAttempted = () => {
    return experimentKeys.map((experimentKey) => {
      return filteredData.filter((student) => student[experimentKey] !== null)
        .length;
    });
  };

  // Handle input change for percentage criteria
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

  // Helper function to map experiment key (e.g., EXPERIMENT1) to question_id
  const getQuestionIdFromExperimentKey = (experimentKey) => {
    const question = questionData.find(
      (q) => q.tradename === experimentKey
    );
    return question ? question.trade_idq : null;
  };

  useEffect(() => {
    // Only calculate attainment list if there is data to process
    if (experimentData.length > 0 && questionData.length > 0) {
      const attainmentList = calculateAttainmentList();
      // updateExperimentList(attainmentList); // Pass the attainment list correctly
    }
  }, [experimentData, questionData]); // Trigger whenever the experiment data or question data changes

  const calculateAttainmentList = () => {
    const attainmentList = experimentKeys.map((experimentKey, index) => {
      const coname = getCOName(experimentKey);

      // Get total students passed and attempted for this experiment/CO name
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

    return attainmentList;
  };
  const handleClick = () => {
    navigate(`/AddStudent/${curriculum}/${userCourseId}`);
  };

  return (
    <>
      <div className="container overflow mx-auto p-4 md:px-8 lg:px-10 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center mb-6">
          {/* Centered Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-blue-700 font-bold text-center">
            Trade
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
        {/* Container for Export, Import, and Search Bar */}
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* File Upload */}
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={importFromExcel}
            className="border px-4 py-2 rounded-md w-full md:w-auto"
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
            className="bg-green-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
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
            <thead className="bg-blue-700 text-white">
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
                  colSpan={experimentKeys.length}
                >
                  Trade
                </th>
                <th className="border border-gray-300 px-4 py-2" rowSpan="2">
                  Total
                </th>
                <th className="border border-gray-300 px-4 py-2" rowSpan="2">
                  Action
                </th>
              </tr>
              <tr>
                {experimentKeys.map((experimentKey, index) => (
                  <th
                    key={experimentKey}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {index + 1}
                    <br />
                    <span className="text-sm text-gray-200">
                      {getCOName(experimentKey)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((student, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.stud_clg_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.student_name}
                  </td>
                  {experimentKeys.map((experimentKey) => (
                    <td
                      key={experimentKey}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {editMode === student.sid ? (
                        <input
                          type="text"
                          value={
                            editedValues[experimentKey] !== undefined
                              ? editedValues[experimentKey]
                              : student[experimentKey]
                          }
                          onChange={(event) =>
                            handleInputChange(event, experimentKey)
                          }
                          className="w-24 border border-gray-300 rounded-md px-2 py-1 focus:ring focus:border-blue-500 sm:text-sm"
                        />
                      ) : student[experimentKey] !== null ? (
                        student[experimentKey]
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

        {/* New Section for Total Students Passed Each Question */}
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-semibold">
              Total Students Passed Each Question
            </h1>
            <button
              onClick={() =>
                handle_Attenment(
                  experimentKeys,
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
              className="block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-500"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-400">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Type</th>
                  {experimentKeys.map((experimentKey, index) => (
                    <th
                      key={experimentKey}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {index + 1}
                      <br />
                      <span className="text-sm text-gray-200">
                        {getCOName(experimentKey)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Total Students Passed
                  </td>
                  {getTotalStudentsPassedPerQuestion(
                    attainmentData.passedPercentage
                  ).map((count, index) => (
                    <td
                      key={index}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {count}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Total Students Attempted
                  </td>
                  {getTotalStudentsAttempted().map((count, index) => (
                    <td
                      key={index}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {count}
                    </td>
                  ))}
                </tr>
                {/* CO Attainment */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-sm text-gray-500">
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
                        className="border border-gray-300 px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-center"
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
    </>
  );
};

export default Trade;
