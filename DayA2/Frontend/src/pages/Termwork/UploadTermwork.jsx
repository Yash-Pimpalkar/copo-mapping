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
    mini_id: "Mini Project",
    scprid: "SCILab / Mini Project",
    ppt_id : "PPT" ,
    report_id: "Report",
    logbookid: "Logbook",
    review1id: "Review 1",
    review2id: "Review 2",
    proreportid: "Project Report",
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

    // Prepare data to submit
    const formDataForKey = formData[key] || [];
    const numAssignmentsForKey = numAssignments[key] || 0;

    // Validation logic for Attendance Form
    if (key === "attid" || key === 'report_id' || key === 'ppt_id' || key === 'sciprid' || key === 'logbookid' || key === 'review1id' || key === 'review2id'|| key === 'proreportid') {
      // Only validate maxMarks for Attendance
      if (!formDataForKey.maxMarks) {
        alert(`Please enter Max Marks for ${formNames[key]}`);
        return;
      }
    } else {
      // Validation logic for other forms (non-attendance)
      if (!formDataForKey.maxMarks || numAssignmentsForKey === 0) {
        alert(`Please complete all required fields for ${formNames[key]}`);
        return;
      }
    }

    // Construct dataToSubmit for each question with coName arrays
    const dataToSubmit = {
      usercourseid: selectedCourseId,
      formDataForKey: formNames[key],
      twid: termworkEntry.twid, // Include twid
      twbody: termworkEntry.twbody, // Include twbody
      maxMarks: formDataForKey.maxMarks,
      numAssignments: key === "attid" ? undefined : numAssignmentsForKey, // Don't include assignments for attendance
      questions: key !== "attid" ? Object.entries(formDataForKey).reduce((acc, [index, data]) => {
        // Collect valid coNames into the array for each question row
        const coNames = Object.keys(data)
          .filter((key) => key.startsWith(`coName_`)) // Collect coName_X fields
          .map((key) => data[key]) // Map them to their values
          .filter((coName) => coName); // Only include valid coNames

        // Only push the question row if it has valid coNames
        if (coNames.length > 0) {
          acc.push({
            question: `${formNames[key].toUpperCase()} ${parseInt(index) + 1}`,// Question identifier
            coNames, // Array of coNames for this question
          });
        }

        return acc;
      }, []) : undefined, // Skip questions for attendance
    };

    // Log the cleaned-up data to console
    console.log(`Data to be submitted for ${formNames[key]}:`, dataToSubmit);

    try {
      setLoading(true);
      setSubmittingKey(key);

      // API call to submit data
      await api.post("/api/tw/upload/", dataToSubmit);

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
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Term Work</h1>
    
        <div className="mb-6">
          <CourseSelector uid={uid} onUserCourseIdChange={handleCourseSelect} />
        </div>
    
        {termworkData.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-2">Term Work Data:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {termworkData.map((item) => (
                <li key={item.twid} className="text-gray-700">
                  {item.twbody}
                </li>
              ))}
            </ul>
          </div>
        )}
    
        {keysWithValueOne.length > 0 && (
          <div className="space-y-6">
            {keysWithValueOne.map((key) => (
              <div key={key} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  {formNames[key]} Form
                </h3>
    
                {key === 'attid' || key === 'scprid' || key === 'ppt_id' || key === 'report_id' || key === 'logbookid' || key === 'review1id' || key === 'review2id' || key === 'proreportid' ? (
                  <>
                    <label
                      htmlFor={`max-marks-${key}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Max Marks for {formNames[key]}
                    </label>
                    <input
                      id={`max-marks-${key}`}
                      type="text"
                      value={formData[key]?.maxMarks || ""}
                      onChange={(e) => handleMaxMarksChange(key, "maxMarks", e.target.value)}
                      className="block w-full py-2 px-3 mb-4 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm uppercase"
                    />
    
                    <button
                      onClick={() => handleFormSubmit(key)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 w-full"
                      disabled={loading || submittingKey === key}
                    >
                      {submittingKey === key ? <LoadingButton /> : "Submit"}
                    </button>
                  </>
                ) : (
                  <>
                    <label
                      htmlFor={`num-assignments-${key}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Number of {formNames[key]} (Max 10)
                    </label>
                    <input
                      id={`num-assignments-${key}`}
                      type="text"
                      value={numAssignments[key] || ""}
                      onChange={(e) => handleNumAssignmentsChange(key, e.target.value)}
                      className="block w-full py-2 px-3 mb-4 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm uppercase"
                    />
    
                    <label
                      htmlFor={`max-marks-${key}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Max Marks for {formNames[key]}
                    </label>
                    <input
                      id={`max-marks-${key}`}
                      type="text"
                      value={formData[key]?.maxMarks || ""}
                      onChange={(e) => handleMaxMarksChange(key, "maxMarks", e.target.value)}
                      className="block w-full py-2 px-3 mb-4 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm uppercase"
                    />
    
                    {numAssignments[key] > 0 && formData[key]?.maxMarks && (
                      <div className="mt-4 space-y-4">
                        {Array.from({ length: numAssignments[key] }).map((_, index) => (
                          <div
                            key={index}
                            className="p-4 border rounded-md shadow-sm bg-gray-50"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                              <div>
                                <label className="block text-sm text-center font-medium text-gray-700 uppercase">
                                  Index
                                </label>
                                <div className="text-center">{index + 1}</div>
                              </div>
    
                              <div>
                                <label className="block text-sm font-medium text-gray-700 uppercase">
                                  {formNames[key]} Question Name
                                </label>
                                <input
                                  type="text"
                                  value={formData[key]?.[index]?.assignname || `${formNames[key]} ${index + 1}`}
                                  onChange={(e) => handleFormChange(key, index, "assignname", e.target.value)}
                                  className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm uppercase"
                                />
                              </div>
    
                              <div>
                                <label className="block text-sm font-medium text-gray-700 uppercase">
                                  How many COs for this question?
                                </label>
                                <input
                                  type="text"
                                  value={numCOs[key]?.[index] || ""}
                                  onChange={(e) => handleNumCOsChange(key, index, e.target.value)}
                                  className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm uppercase"
                                />
                              </div>
    
                              <div>
                                <label className="block text-sm font-medium text-gray-700 uppercase">
                                  Enter the CO Names
                                </label>
                                {numCOs[key]?.[index] > 0 && (
                                  <div className="grid grid-cols-3 gap-2 mt-1">
                                    {Array.from({ length: numCOs[key]?.[index] || 1 }).map((_, coIndex) => (
                                      <input
                                        key={coIndex}
                                        type="text"
                                        value={formData[key]?.[index]?.[`coName_${coIndex}`] || ""}
                                        onChange={(e) => handleFormChange(key, index, `coName_${coIndex}`, e.target.value)}
                                        className="px-2 py-2 w-full border border-gray-300 rounded-md shadow-sm uppercase"
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {error && <p className="text-red-600">{error}</p>}
                      </div>
                    )}
    
                    <button
                      onClick={() => handleFormSubmit(key)}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 w-full"
                      disabled={loading || submittingKey === key}
                    >
                      {submittingKey === key ? <LoadingButton /> : "Submit"}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default Uploadthassign;
