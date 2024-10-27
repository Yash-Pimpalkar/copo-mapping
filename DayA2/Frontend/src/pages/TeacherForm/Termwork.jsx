import React, { useState, useEffect } from "react";
import CourseSelector from "../../component/CourseSelector/CourseSelector";
import api from "../../api";

const Termwork = ({ uid }) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null); // to store the index of selected checkbox
  const [userCourseId, setUserCourseId] = useState(null);
  const [checkboxLabels, setCheckboxLabels] = useState([]);

  // Fetch termwork labels and selected tw_id once the userCourseId is selected
  useEffect(() => {
    if (userCourseId) {
      const fetchTermworkLabels = async () => {
        try {
          const response = await api.get(`/api/termwork/checkboxlabels/${userCourseId}`);
          const { labels, selectedTwid } = response.data;
          
          // Find the index of the selected checkbox based on selectedTwid
          const selectedIndex = labels.findIndex(label => label.twid === selectedTwid);
          setCheckboxLabels(labels);
          setSelectedCheckbox(selectedIndex !== -1 ? selectedIndex : null); // Set to selected index or null if not found
        } catch (error) {
          console.error("Error fetching termwork labels:", error);
        }
      };

      fetchTermworkLabels();
    }
  }, [userCourseId]);

  const handleCheckboxChange = (index) => {
    setSelectedCheckbox(index);
  };

  const handleSubmit = async () => {
    if (!userCourseId || selectedCheckbox === null) {
      alert("Please select a course and a termwork option.");
      return;
    }

    const selectedTermwork = checkboxLabels[selectedCheckbox];
    try {
      // Check if userCourseId exists in termwork_table
      const response = await api.post("/api/termwork/submit", {
        userCourseId,
        tw_id: selectedTermwork.twid,
      });

      if (response.data.success) {
        alert("Termwork saved successfully!");
      } else if (response.data.updated) {
        alert("Termwork updated successfully!");
      } else {
        alert("Failed to save or update termwork.");
      }
    } catch (error) {
      console.error("Error submitting termwork:", error);
      alert("Error submitting termwork.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
        Select Termwork
      </h1>

      {/* Course Selector Card */}
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl mb-6">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <CourseSelector uid={uid} onUserCourseIdChange={setUserCourseId} />
        </div>
      </div>

      {/* Display checkbox labels only if userCourseId is selected and labels are available */}
      {userCourseId && checkboxLabels.length > 0 && (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg md:max-w-2xl lg:max-w-3xl space-y-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Select Termwork
          </h2>
          <div className="space-y-2">
            {checkboxLabels.map((labelData, index) => (
              <label
                key={labelData.twid} // Using twid as key
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                  selectedCheckbox === index
                    ? "bg-blue-100 border border-blue-500 shadow-sm"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCheckbox === index}
                  onChange={() => handleCheckboxChange(index)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded-md border-gray-300 focus:ring-0"
                />
                <span className="ml-2 text-sm text-gray-800">
                  {labelData.twbody} {/* Display the label from the database */}
                </span>
              </label>
            ))}
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Termwork;
