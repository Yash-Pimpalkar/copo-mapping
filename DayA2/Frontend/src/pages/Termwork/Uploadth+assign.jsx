import React, { useState, useEffect } from "react";
import api from "../../api";
import LoadingButton from "../../component/Loading/Loading";
import CourseSelector from "../../component/CourseSelector/CourseSelector";

const Uploadthassign = ({ uid }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [termworkData, setTermworkData] = useState([]);
  const [keysWithValueOne, setKeysWithValueOne] = useState([]);
  const [formData, setFormData] = useState({});
  const [numAssignments, setNumAssignments] = useState({});
  const [numCOs, setNumCOs] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submittingKey, setSubmittingKey] = useState(null);
  const [multipleCOs, setMultipleCOs] = useState({});

  // Map of key names to human-readable form types
  const formNames = {
    exid: "Experiment",
    assignid: "Assignment",
    attid: "Attendance",
    gd: "Group Discussion",
    mini: "Mini Project",
    major: "Major Project",
    scpid: "Science Lab",
  };

  useEffect(() => {
    const fetchTermworkData = async () => {
      if (!selectedCourseId) return;

      try {
        setLoading(true);
        const res = await api.get(
          `/api/termwork/gettermworkdata/${selectedCourseId}`
        );
        setTermworkData(res.data);

        const newKeysWithValueOne = res.data.flatMap((item) =>
          Object.entries(item)
            .filter(([key, value]) => value === 1 && key !== "th_only_id")
            .map(([key]) => key)
        );

        setKeysWithValueOne(newKeysWithValueOne);
      } catch (error) {
        console.error("Error fetching termwork data:", error);
        setError("Failed to fetch termwork data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTermworkData();
  }, [selectedCourseId]);

  const handleCourseSelect = (usercourse_id) => {
    setSelectedCourseId(usercourse_id);
    setTermworkData([]);
    setKeysWithValueOne([]);
    setFormData({});
  };

  const handleNumAssignmentsChange = (key, value) => {
    setNumAssignments((prev) => ({
      ...prev,
      [key]: parseInt(value, 10) || 0,
    }));
  };

  const handleFormChange = (key, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [index]: {
          ...(prev[key]?.[index] || {}),
          [field]: value.toUpperCase(), // Convert to uppercase
        },
      },
    }));
  };

  const handleMultipleCOChange = (key, value) => {
    setMultipleCOs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNumCOsChange = (key, index, value) => {
    setNumCOs((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [index]: parseInt(value, 10) || 0,
      },
    }));
  };
  const handleFormSubmit = async (key) => {
    // Check if a course is selected
    if (!selectedCourseId) {
      alert("Please select a valid course and academic year.");
      return;
    }
  
    // Find the relevant term work entry by key
    const termworkEntry = termworkData.find((item) => item[key] === 1);
    if (!termworkEntry) {
      alert("No matching term work entry found.");
      return;
    }
  
    // Validate form data for this particular form
    const formDataForKey = formData[key] || [];
    const numAssignmentsForKey = numAssignments[key] || 0;
    let isFormValid = true;
  
    // Check if all required fields are filled
    if (!formDataForKey.maxMarks || numAssignmentsForKey <= 0) {
      isFormValid = false;
    } else {
      for (let index = 0; index < numAssignmentsForKey; index++) {
        const data = formDataForKey[index] || {};
        
        if (!data.assignname || (multipleCOs[key] === 'no' && !data.coName)) {
          isFormValid = false;
          break;
        }
  
        if (multipleCOs[key] === 'yes') {
          const numCOsForIndex = numCOs[key]?.[index] || 0;
          for (let coIndex = 0; coIndex < numCOsForIndex; coIndex++) {
            if (!data[`coName_${coIndex}`]) {
              isFormValid = false;
              break;
            }
          }
        }
      }
    }
  
    if (!isFormValid) {
      alert("Please fill in all required fields for this form before submitting.");
      return;
    }
  
    // Prepare data to submit
    const dataToSubmit = {
      usercourseid: selectedCourseId,
      twid: termworkEntry.twid, // Include twid
      twbody: termworkEntry.twbody, // Include twbody
      maxMarks: formDataForKey.maxMarks,
      numAssignments: numAssignmentsForKey,
      multipleCOs: multipleCOs[key],
      ...Object.entries(formDataForKey).reduce((acc, [index, data]) => ({
        ...acc,
        [`${formNames[key].toLowerCase()}_${index}`]: {
          ...data,
          coNames: multipleCOs[key] === 'yes' ? Object.keys(data).filter(key => key.startsWith('coName_')).map(key => data[key]) : undefined
        },
      }), {}),
    };
  
    // Log the data array with the formNames key, twid, and twbody
    console.log(`Data to be submitted for ${formNames[key]}:`, dataToSubmit);
  
    try {
      setLoading(true);
      setSubmittingKey(key);
  
      await api.post("/api/ia/create", dataToSubmit);
  
      alert("Data submitted successfully for " + formNames[key]);
      setError(null);
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(error.response?.data?.error || "Failed to submit data");
    } finally {
      setLoading(false);
      setSubmittingKey(null);
    }
  };
  

  const handleMaxMarksChange = (key, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [field]: value.toUpperCase(), // Convert to uppercase
      },
    }));
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Upload Term Work</h1>
  
    <CourseSelector uid={uid} onUserCourseIdChange={handleCourseSelect} />
  
    {termworkData.length > 0 && (
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Term Work Data:</h2>
        <ul>
          {termworkData.map((item) => (
            <li key={item.twid} className="mt-2">
              {item.twbody}
            </li>
          ))}
        </ul>
      </div>
    )}
  
    {keysWithValueOne.length > 0 && (
      <div className="mt-4">
        {keysWithValueOne.map((key) => (
          <div key={key} className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              {formNames[key]} Form
            </h3>
  
            <label
              htmlFor={`num-assignments-${key}`}
              className="block text-sm font-medium text-gray-700"
            >
              Number of {formNames[key]} (Max 10)
            </label>
            <input
              id={`num-assignments-${key}`}
              type="text"
              value={numAssignments[key] || ""}
              onChange={(e) =>
                handleNumAssignmentsChange(key, e.target.value)
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ textTransform: "uppercase" }} // Apply uppercase transformation
            />
            <label
              htmlFor={`max-marks-${key}`}
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Max Marks for {formNames[key]}
            </label>
            <input
              id={`max-marks-${key}`}
              type="text"
              value={formData[key]?.maxMarks || ""}
              onChange={(e) =>
                handleMaxMarksChange(key, "maxMarks", e.target.value)
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ textTransform: "uppercase" }} // Apply uppercase transformation
            />
  
            <fieldset className="mt-4">
              <legend className="block text-sm font-medium text-gray-700">
                Is there multiple COs for each question?
              </legend>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`multipleCOs-${key}`}
                    value="yes"
                    checked={multipleCOs[key] === "yes"}
                    onChange={(e) =>
                      handleMultipleCOChange(key, e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`multipleCOs-${key}`}
                    value="no"
                    checked={multipleCOs[key] === "no"}
                    onChange={(e) =>
                      handleMultipleCOChange(key, e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </fieldset>
  
            {/* Conditional Rendering of Assignment Section */}
            {numAssignments[key] > 0 && formData[key]?.maxMarks ? (
              <div className="mt-4 space-y-4">
                {Array.from({ length: numAssignments[key] }).map((_, index) => (
                  <div key={index} className="p-4 border rounded-md shadow-sm">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-1">
                        <label className="block text-sm text-center font-medium text-gray-700 uppercase">
                          Index
                        </label>
                        <div className="text-center">{index + 1}</div>
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 uppercase">
                          {formNames[key]} Question Name
                        </label>
                        <input
                              type="text"
                              value={formData[key]?.[index]?.assignname || `${formNames[key]} ${index + 1}`}
                              onChange={(e) =>
                                handleFormChange(key, index, "assignname", e.target.value)
                              }
                              className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                              style={{ textTransform: "uppercase" }} // Apply uppercase transformation
                            />
                      </div>
                      {multipleCOs[key] === "yes" ? (
                        <>
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 uppercase">
                              How many COs for this question?
                            </label>
                            <input
                              type="text"
                              value={numCOs[key]?.[index] || ""}
                              onChange={(e) =>
                                handleNumCOsChange(
                                  key,
                                  index,
                                  e.target.value
                                )
                              }
                              className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                              style={{ textTransform: "uppercase" }} // Apply uppercase transformation
                            />
                          </div>
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 uppercase">
                              Enter the CO Names
                            </label>
                            <div className="grid grid-cols-3 gap-2 mt-1">
                              {Array.from({
                                length: numCOs[key]?.[index] || 1,
                              }).map((_, coIndex) => (
                                <input
                                  key={coIndex}
                                  type="text"
                                  value={
                                    formData[key]?.[index]?.[`coName_${coIndex}`] ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleFormChange(
                                      key,
                                      index,
                                      `coName_${coIndex}`,
                                      e.target.value
                                    )
                                  }
                                  className="px-2 py-2  w-full border border-gray-300 rounded-md shadow-sm"
                                  style={{ textTransform: "uppercase" }} // Apply uppercase transformation
                                />
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 uppercase">
                            CO Name
                          </label>
                          <input
                            type="text"
                            value={formData[key]?.[index]?.coName || ""}
                            onChange={(e) =>
                              handleFormChange(
                                key,
                                index,
                                "coName",
                                e.target.value
                              )
                            }
                            className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            style={{ textTransform: "uppercase" }} // Apply uppercase transformation
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
  
            <button
              onClick={() => handleFormSubmit(key)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={loading || submittingKey === key}
            >
              {submittingKey === key ? <LoadingButton /> : "Submit"}
            </button>
  
            {error && <p className="text-red-600">{error}</p>}
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
};

export default Uploadthassign;
