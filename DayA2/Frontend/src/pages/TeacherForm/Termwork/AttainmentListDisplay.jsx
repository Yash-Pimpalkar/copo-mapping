import React, { useState, useEffect } from "react";
import api from "../../../api";

const AttainmentListDisplay = ({ userCourseId, tw_id }) => {
  const [averageAttainment, setAverageAttainment] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");  // State to track status messages
  const [statusType, setStatusType] = useState("");  // To distinguish between success and error
  const [attainmentList, setAttainmentList] = useState([]);  // State for assignment attainment list
  const [experimentList, setExperimentList] = useState([]);  // State for experiment attainment list
  console.log(userCourseId, tw_id);

  useEffect(() => {
    // Automatically clear the status message after 10 seconds if there's an error
    if (statusMessage && statusType === "error") {
      const timer = setTimeout(() => {
        setStatusMessage("");
        setStatusType("");
      }, 10000);  // 10 seconds

      return () => clearTimeout(timer);  // Clean up the timer when the component unmounts or message changes
    }
  }, [statusMessage, statusType]);

  const calculateAverageAttainment = (list1, list2) => {
    const combinedList = [...list1, ...list2];
    const attainmentMap = {};

    combinedList.forEach((item) => {
      const { coname, attainment } = item;
      const conameArray = coname.split(",").map((name) => name.trim());
      const percentage = parseFloat(attainment.replace("%", ""));

      conameArray.forEach((name) => {
        if (attainmentMap[name]) {
          attainmentMap[name].total += percentage;
          attainmentMap[name].count += 1;
        } else {
          attainmentMap[name] = { total: percentage, count: 1 };
        }
      });
    });

    const averages = Object.keys(attainmentMap).map((coname) => {
      const { total, count } = attainmentMap[coname];
      const average = total / count;
      let classification = 0;
      if (average >= 40 && average < 60) {
        classification = 1;
      } else if (average >= 60 && average < 70) {
        classification = 2;
      } else if (average >= 70) {
        classification = 3;
      }

      return {
        coname,
        average: average.toFixed(2) + "%",
        classification,
      };
    });

    return averages;
  };

  const sortByConame = (a, b) => {
    const regex = /(\D+)(\d+)?/;
    const [, alphaA, numA] = a.coname.match(regex);
    const [, alphaB, numB] = b.coname.match(regex);

    if (alphaA < alphaB) return -1;
    if (alphaA > alphaB) return 1;
    if (numA && numB) {
      return parseInt(numA, 10) - parseInt(numB, 10);
    }
    return 0;
  };

  const insertOrUpdateAttainment = async (dataArray) => {
    try {
      console.log(dataArray);
      const response = await api.put("/api/termwork/update-attainment", { data: dataArray });
      setStatusMessage("Data successfully inserted or updated.");
      setStatusType("success");
      console.log("Data successfully saved:", dataArray);
    } catch (error) {
      console.error("Error inserting or updating attainment:", error);
      setStatusMessage("Error inserting or updating attainment data.");
      setStatusType("error");
    }
  };

  const saveAttainmentData = () => {
    const dataArray = averageAttainment.map((item) => ({
      coname: item.coname,
      average_attainment: item.average,
      attainment: item.classification,
      usercourseid: userCourseId,
    }));

    insertOrUpdateAttainment(dataArray);
  };

  const handleCheckData = () => {
    // Fetch all types of data from localStorage
    const assignmentData = localStorage.getItem("AssignmentAttainmentData");
    const experimentData = localStorage.getItem("ExperimentAttainmentData");
    const miniProjectData = localStorage.getItem("MiniProjectAttainmentData");
    const pptData = localStorage.getItem("PPTAttainmentData");
    const reportData = localStorage.getItem("ReportAttainmentData");
    const tradeData = localStorage.getItem("TradeAttainmentData");
    const journalData = localStorage.getItem("JournalAttainmentData");
    const scilabData = localStorage.getItem("ScilabAttainmentData");
  
    let validAssignmentData = [];
    let validExperimentData = [];
    let validMiniProjectData = [];
    let validPptData = [];
    let validReportData = [];
    let validTradeData = [];
    let validJournalData = [];
    let validScilabData = [];
  
    // Helper function to check if data matches userCourseId and tw_id, and parse the data
    const parseAndValidateData = (data, dataType) => {
      if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData.userCourseId !== userCourseId || parsedData.tw_id !== tw_id) {
          setStatusMessage(`Data mismatch: ${dataType} data does not match the provided userCourseId or tw_id.`);
          setStatusType("error");
          return null;
        }
        return parsedData;
      }
      return null;
    };
  
    // Parse and validate data
    const parsedAssignmentData = parseAndValidateData(assignmentData, "Assignment");
    const parsedExperimentData = parseAndValidateData(experimentData, "Experiment");
    const parsedMiniProjectData = parseAndValidateData(miniProjectData, "Mini Project");
    const parsedPptData = parseAndValidateData(pptData, "PPT");
    const parsedReportData = parseAndValidateData(reportData, "Report");
    const parsedTradeData = parseAndValidateData(tradeData, "Trade");
    const parsedJournalData = parseAndValidateData(journalData, "Journal");
    const parsedScilabData = parseAndValidateData(scilabData, "Scilab");
  
    // If any data mismatch, stop further processing
    // if (!parsedAssignmentData || !parsedExperimentData) return;
  
    // Check for passedPercentage consistency based on tw_id
    const checkPassingPercentage = () => {
      switch (tw_id) {
        case 2: // tw_id 2 - assignment and scilab
          const assignmentPassingPercentage2 = parsedAssignmentData ? parseFloat(parsedAssignmentData.passedPercentage) : null;
          const scilabPassingPercentage = parsedScilabData ? parseFloat(parsedScilabData.passedPercentage) : null;
    
          if (assignmentPassingPercentage2 !== scilabPassingPercentage) {
            setStatusMessage("Passing criteria percentage does not match between assignment and scilab data.");
            setStatusType("error");
            return false;
          }
          break;
    
        case 3: // tw_id 3 - experiment and mini project
          const experimentPassingPercentage3 = parsedExperimentData ? parseFloat(parsedExperimentData.passedPercentage) : null;
          const miniProjectPassingPercentage = parsedMiniProjectData ? parseFloat(parsedMiniProjectData.passedPercentage) : null;
    
          if (experimentPassingPercentage3 !== miniProjectPassingPercentage) {
            setStatusMessage("Passing criteria percentage does not match between experiment and mini project data.");
            setStatusType("error");
            return false;
          }
          break;
    
        case 4: // tw_id 4 - assignment only, no comparison needed
          break;
    
        case 5: // tw_id 5 - experiment and assignment
          const assignmentPassingPercentage5 = parsedAssignmentData ? parseFloat(parsedAssignmentData.passedPercentage) : null;
          const experimentPassingPercentage5 = parsedExperimentData ? parseFloat(parsedExperimentData.passedPercentage) : null;
    
          if (assignmentPassingPercentage5 !== experimentPassingPercentage5) {
            setStatusMessage("Passing criteria percentage does not match between assignment and experiment data.");
            setStatusType("error");
            return false;
          }
          break;
    
        case 6: // tw_id 6 - experiment, assignment, and mini project
          const assignmentPassingPercentage6 = parsedAssignmentData ? parseFloat(parsedAssignmentData.passedPercentage) : null;
          const experimentPassingPercentage6 = parsedExperimentData ? parseFloat(parsedExperimentData.passedPercentage) : null;
          const miniProjectPassingPercentage6 = parsedMiniProjectData ? parseFloat(parsedMiniProjectData.passedPercentage) : null;
    
          if (
            assignmentPassingPercentage6 !== experimentPassingPercentage6 ||
            experimentPassingPercentage6 !== miniProjectPassingPercentage6
          ) {
            setStatusMessage("Passing criteria percentage does not match between assignment, experiment, and mini project data.");
            setStatusType("error");
            return false;
          }
          break;
    
        case 7: // tw_id 7 - assignment, PPT, report
          const assignmentPassingPercentage7 = parsedAssignmentData ? parseFloat(parsedAssignmentData.passedPercentage) : null;
          const pptPassingPercentage = parsedPptData ? parseFloat(parsedPptData.passedPercentage) : null;
          const reportPassingPercentage = parsedReportData ? parseFloat(parsedReportData.passedPercentage) : null;
    
          if (
            assignmentPassingPercentage7 !== pptPassingPercentage ||
            pptPassingPercentage !== reportPassingPercentage
          ) {
            setStatusMessage("Passing criteria percentage does not match between assignment, PPT, and report data.");
            setStatusType("error");
            return false;
          }
          break;
    
        case 8: // tw_id 8 - trade, journal
          const tradePassingPercentage = parsedTradeData ? parseFloat(parsedTradeData.passedPercentage) : null;
          const journalPassingPercentage = parsedJournalData ? parseFloat(parsedJournalData.passedPercentage) : null;
    
          if (tradePassingPercentage !== journalPassingPercentage) {
            setStatusMessage("Passing criteria percentage does not match between trade and journal data.");
            setStatusType("error");
            return false;
          }
          break;
    
        case 9: // tw_id 9 - only assignment, no comparison needed
          break;
    
        case 10: // tw_id 10 - experiment and assignment
          const assignmentPassingPercentage10 = parsedAssignmentData ? parseFloat(parsedAssignmentData.passedPercentage) : null;
          const experimentPassingPercentage10 = parsedExperimentData ? parseFloat(parsedExperimentData.passedPercentage) : null;
    
          if (assignmentPassingPercentage10 !== experimentPassingPercentage10) {
            setStatusMessage("Passing criteria percentage does not match between assignment and experiment data.");
            setStatusType("error");
            return false;
          }
          break;
    
        case 11: // tw_id 11 - experiment, assignment, and mini project
          const assignmentPassingPercentage11 = parsedAssignmentData ? parseFloat(parsedAssignmentData.passedPercentage) : null;
          const experimentPassingPercentage11 = parsedExperimentData ? parseFloat(parsedExperimentData.passedPercentage) : null;
          const miniProjectPassingPercentage11 = parsedMiniProjectData ? parseFloat(parsedMiniProjectData.passedPercentage) : null;
    
          if (
            assignmentPassingPercentage11 !== experimentPassingPercentage11 ||
            experimentPassingPercentage11 !== miniProjectPassingPercentage11
          ) {
            setStatusMessage("Passing criteria percentage does not match between assignment, experiment, and mini project data.");
            setStatusType("error");
            return false;
          }
          break;
    
        case 12: // tw_id 12 - only assignment, no comparison needed
          break;
    
        default:
          return true; // If tw_id has no specific comparison, return true by default.
      }
      return true; // If all checks passed, return true.
    };
    
  
    // Stop further processing if passing percentage check fails
    if (!checkPassingPercentage()) {
      return;
    }
  
    // Continue with valid data handling
    validAssignmentData = parsedAssignmentData ? parsedAssignmentData.attainmentList : [];
    validExperimentData = parsedExperimentData ? parsedExperimentData.attainmentList : [];
    validMiniProjectData = parsedMiniProjectData ? parsedMiniProjectData.attainmentList : [];
    validPptData = parsedPptData ? parsedPptData.attainmentList : [];
    validReportData = parsedReportData ? parsedReportData.attainmentList : [];
    validTradeData = parsedTradeData ? parsedTradeData.attainmentList : [];
    validJournalData = parsedJournalData ? parsedJournalData.attainmentList : [];
    validScilabData = parsedScilabData ? parsedScilabData.attainmentList : [];
  
    let combinedData = [];
  
    // Combine data based on the specific tw_id
    switch (tw_id) {
      case 2: // Combine assignment and scilab for tw_id 2
        combinedData = [...validAssignmentData, ...validScilabData];
        break;
      case 3: // Combine experiment and mini-project for tw_id 3
        combinedData = [...validExperimentData, ...validMiniProjectData];
        break;
      case 4: // Only assignment for tw_id 4
        combinedData = [...validAssignmentData];
        break;
      case 5: // Combine assignment and experiment for tw_id 5
        combinedData = [...validAssignmentData, ...validExperimentData];
        break;
      case 6: // Combine assignment, experiment, and mini-project for tw_id 6
        combinedData = [...validAssignmentData, ...validExperimentData, ...validMiniProjectData];
        break;
      case 7: // Combine assignment, PPT, and report for tw_id 7
        combinedData = [...validAssignmentData, ...validPptData, ...validReportData];
        break;
      case 8: // Combine trade and journal for tw_id 8
        combinedData = [...validTradeData, ...validJournalData];
        break;
      case 9: // Only assignment for tw_id 9
        combinedData = [...validAssignmentData];
        break;
      case 10: // Combine assignment and experiment for tw_id 10
        combinedData = [...validAssignmentData, ...validExperimentData];
        break;
      case 11: // Combine assignment, experiment, and mini-project for tw_id 11
        combinedData = [...validAssignmentData, ...validExperimentData, ...validMiniProjectData];
        break;
      case 12: // Only assignment for tw_id 12
        combinedData = [...validAssignmentData];
        break;
      default:
        setStatusMessage("No valid data found for the selected tw_id.");
        setStatusType("error");
        return;
    }
  
    if (combinedData.length === 0) {
      setStatusMessage("No attainment data available.");
      setStatusType("error");
      return;
    }
  
    // Calculate average attainment based on the combined data
    const averageData = calculateAverageAttainment(combinedData, []); // Only the relevant combined data is passed
    const sortedData = averageData.sort(sortByConame);
    setAverageAttainment(sortedData);
  };
  
  return (
    <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
      <h2 className="text-xl font-bold mb-2">Average Attainment by CO Name</h2>

      {statusMessage && (
        <div
          className={`mb-4 p-2 rounded ${
            statusType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <ul>
        {averageAttainment.length > 0 ? (
          averageAttainment.map((item, index) => (
            <li key={index} className="text-gray-700">
              <strong>CO Name:</strong> {item.coname},{" "}
              <strong> Average Attainment:</strong> {item.average},{" "}
              <strong> Classification:</strong> {item.classification}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No attainment data available.</li>
        )}
      </ul>

      <button
        onClick={handleCheckData}
        className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded"
      >
        Check Data
      </button>

      <button
        onClick={saveAttainmentData}
        className="mt-4 ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded"
        disabled={averageAttainment.length === 0}
      >
        Save Attainment Data
      </button>
    </div>
  );
};

export default AttainmentListDisplay;
