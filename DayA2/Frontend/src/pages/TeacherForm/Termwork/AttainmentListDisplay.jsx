import React, { useEffect, useState } from "react";
import api from "../../../api";

const AttainmentListDisplay = ({ attainmentList, experimentList, userCourseId }) => {
  const [averageAttainment, setAverageAttainment] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");  // State to track status messages
  const [statusType, setStatusType] = useState("");  // To distinguish between success and error

  // Utility function to calculate average for each distinct coname
  const calculateAverageAttainment = (list1, list2) => {
    const combinedList = [...list1, ...list2];
    const attainmentMap = {};

    combinedList.forEach((item) => {
      const { coname, attainment } = item;
      const conameArray = coname.split(',').map((name) => name.trim());
      const percentage = parseFloat(attainment.replace('%', ''));

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
        average: average.toFixed(2) + '%',
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
      const response = await api.put('/api/termwork/update-attainment', { data: dataArray });
      setStatusMessage("Data successfully inserted or updated.");
      setStatusType("success");
      console.log('Data successfully saved:', dataArray);
    } catch (error) {
      console.error('Error inserting or updating attainment:', error);
      setStatusMessage("Error inserting or updating attainment data.");
      setStatusType("error");
    }
  };

  const saveAttainmentData = () => {
    // Prepare an array of data for all conames
    const dataArray = averageAttainment.map((item) => ({
      coname: item.coname,
      average_attainment: item.average,
      attainment: item.classification,
      usercourseid: userCourseId,  // Assuming userCourseId is passed as a prop
    }));

    // Make a single API call to insert or update the entire array
    insertOrUpdateAttainment(dataArray);
  };

  useEffect(() => {
    const averageData = calculateAverageAttainment(attainmentList, experimentList);
    const sortedData = averageData.sort(sortByConame);
    setAverageAttainment(sortedData);
  }, [attainmentList, experimentList]);

  return (
    <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
      <h2 className="text-xl font-bold mb-2">Average Attainment by CO Name</h2>
      
      {/* Display status message */}
      {statusMessage && (
        <div
          className={`mb-4 p-2 rounded ${statusType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {statusMessage}
        </div>
      )}
      
      <ul>
        {averageAttainment.length > 0 ? (
          averageAttainment.map((item, index) => (
            <li key={index} className="text-gray-700">
              <strong>CO Name:</strong> {item.coname}, 
              <strong> Average Attainment:</strong> {item.average}, 
              <strong> Classification:</strong> {item.classification}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No attainment data available.</li>
        )}
      </ul>

      {/* Button to trigger insert or update operation */}
      <button
        onClick={saveAttainmentData} // Call saveAttainmentData when clicked
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded"
      >
        Save Attainment Data
      </button>
    </div>
  );
};

export default AttainmentListDisplay;
