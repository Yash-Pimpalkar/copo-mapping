import React, { useEffect, useState } from 'react';
import api from '../../../api';
import Pagination from '../../../component/Pagination/Pagination';
import * as XLSX from 'xlsx'; // For Excel download and upload
import LoadingButton from '../../../component/Loading/Loading';

const Experiment = ({ userCourseId }) => {
  const [experimentData, setExperimentData] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10); // Number of rows per page
  const [editMode, setEditMode] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // Search term for students
  const [loading, setLoading] = useState(false);


  
  useEffect(() => {
    const fetchExperimentData = async () => {
      try {
        const response = await api.get(`/api/termwork/getexperimentdata/${userCourseId}`);
        const response1 = await api.get(`/api/termwork/getexperiment/${userCourseId}`);
        setExperimentData(response.data.data);
        setQuestionData(response1.data);
      } catch (error) {
        console.error('Error fetching experiment data:', error);
      }
    };

    if (userCourseId) {
      fetchExperimentData();
    }
  }, [userCourseId]);
  const fetchExperimentData = async () => {
    try {
      const response = await api.get(`/api/experiment/getExperimentData/${userCourseId}`);
      const response1 = await api.get(`/api/experiment/getQuestions/${userCourseId}`);
      setExperimentData(response.data.data);
      setQuestionData(response1.data);
    } catch (error) {
      console.error('Error fetching experiment data:', error);
    }
  };

  // Get experiment keys dynamically (e.g., EXPERIMENT1, EXPERIMENT2, etc.)
  const getExperimentKeys = () => {
    if (experimentData && experimentData.length > 0) {
      return Object.keys(experimentData[0]).filter((key) =>
        key.startsWith('EXPERIMENT')
      );
    }
    return [];
  };

  const experimentKeys = getExperimentKeys();
 
  // Find the corresponding `conames` for each `experimentKey` from `questionData`
  const getCOName = (experimentKey) => {
    const question = questionData.find(q => q.question_name === experimentKey);
    return question ? question.conames.join(', ') : '';
  };

  // Get the maximum marks for an experiment
  const getMaxMarks = (experimentKey) => {
    const question = questionData.find(q => q.question_name === experimentKey);
    return question ? question.maxmarks : 100;
  };

  // Calculate total pages based on data length
  const totalPages = Math.ceil(experimentData.length / dataPerPage);

  // Get current data based on the current page
  const filteredData = experimentData.filter(
    (student) =>
      student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.stud_clg_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    const updatedExperiments = experimentKeys.map((key) => {
      const value = editedValues[key];
      return {
        question_id: questionData.find(q => q.question_name === key)?.question_id,
        value: value === null ? null : parseInt(value, 10),
      };
    });

    const formattedData = {
      sid, // Include sid here
      experiments: updatedExperiments,
    };

    try {
      await api.put('/api/experiment/update', formattedData);
      const response = await api.get(`/api/termwork/getExperimentData/${userCourseId}`);
      setExperimentData(response.data.data);
    } catch (error) {
      console.error('Error saving experiment data:', error);
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
    const worksheet = XLSX.utils.json_to_sheet(experimentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Experiments');
    XLSX.writeFile(workbook, 'ExperimentsData.xlsx');
  };

  // Import from Excel and upload to the backend
  const importFromExcel = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);

      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const headers = jsonData[0];
        const rows = jsonData.slice(1);

        const formattedData = rows.map((row) => {
          const student = {};
          headers.forEach((header, index) => {
            student[header] = row[index];
          });
          return student;
        }).map((student) => ({
          sid: student.sid,
          experiments: Object.keys(student)
            .filter(key => key.startsWith('EXPERIMENT'))
            .map(key => ({
              question_id: getQuestionIdFromExperimentKey(key),
              value: student[key] === '' ? null : parseInt(student[key], 10),
            })),
        }));

        try {
          await api.put('/api/experiment/update', { experiments: formattedData });
          setLoading(false);
          fetchExperimentData();
          alert('Excel data imported and experiments updated successfully.');
        } catch (error) {
          setLoading(false);
          console.error('Error uploading experiment data:', error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  // Helper function to map experiment key (e.g., EXPERIMENT1) to question_id
  const getQuestionIdFromExperimentKey = (experimentKey) => {
    const question = questionData.find(q => q.question_name === experimentKey);
    return question ? question.question_id : null;
  };

  return (
    <div className="overflow-x-auto">
      {/* Container for Export, Import and Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        {/* File Upload */}
        <input type="file" accept=".xlsx, .xls" onChange={importFromExcel} className="border px-4 py-2 rounded-md" />

        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by student name or ID"
          className="px-4 py-2 border rounded-md"
        />

        {/* Download Excel Button */}
        <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Download Excel
        </button>
      </div>
      {loading && (
        <div className="flex justify-center mb-4">
          <LoadingButton loading={loading} />
        </div>
      )}
      {/* Table */}
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2" rowSpan="2">Index</th>
            <th className="border border-gray-300 px-4 py-2" rowSpan="2">Student ID</th>
            <th className="border border-gray-300 px-4 py-2" rowSpan="2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2" colSpan={experimentKeys.length}>Experiments</th>
            <th className="border border-gray-300 px-4 py-2" rowSpan="2">Total</th>
            <th className="border border-gray-300 px-4 py-2" rowSpan="2">Action</th>
          </tr>
          <tr>
            {experimentKeys.map((experimentKey, index) => (
              <th key={experimentKey} className="border border-gray-300 px-4 py-2">
                {index + 1}
                <br />
                <span className="text-sm text-white">{getCOName(experimentKey)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((student, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{student.stud_clg_id}</td>
              <td className="border border-gray-300 px-4 py-2">{student.student_name}</td>
              {experimentKeys.map((experimentKey) => (
                <td key={experimentKey} className="border border-gray-300 px-4 py-2">
                  {editMode === student.sid ? (
                    <input
                      type="text"
                      value={
                        editedValues[experimentKey] !== undefined
                          ? editedValues[experimentKey]
                          : student[experimentKey]
                      }
                      onChange={(event) => handleInputChange(event, experimentKey)}
                      className="w-24 border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  ) : (
                    student[experimentKey] !== null ? student[experimentKey] : ''
                  )}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2">{calculateTotal(student)}</td>
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

      {/* Pagination Component */}
      {filteredData.length > dataPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Experiment;
