import React, { useEffect, useState } from 'react';
import api from '../../../api';
import LoadingButton from '../../../component/Loading/Loading';
import Pagination from '../../../component/Pagination/Pagination'; // Assuming you place the Pagination component here

const TheoryAssignment = ({ userCourseId }) => {
  const [TwAssignMentData, setTwAssignmentData] = useState(null);
  const [questiondata, SetQuestionData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10); // Set how many students to display per page

  useEffect(() => {
    const fetch_Termwork_Assignment_data = async () => {
      try {
        const response = await api.get(
          `/api/termwork/gettwassignmentdata/${userCourseId}`
        );
        const response1 = await api.get(
          `/api/termwork/getassignments/${userCourseId}`
        );
        setTwAssignmentData(response.data.data);
        SetQuestionData(response1.data);
      } catch (error) {
        console.error('Error fetching termwork labels:', error);
      }
    };

    if (userCourseId) {
      fetch_Termwork_Assignment_data();
    }
  }, [userCourseId]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedData({ ...TwAssignMentData[index] });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedData({});
  };

  const handleChange = (key, value, maxMarks) => {
    if (value === '' || value === null) {
      return;
    }

    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > maxMarks) {
      alert(`Value should be between 0 and ${maxMarks}`);
      return;
    }

    setEditedData((prev) => ({ ...prev, [key]: parsedValue }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        sid: editedData.sid,
        usercourseid: userCourseId,
        assignments: []
      };

      questiondata.forEach((question) => {
        const assignmentKey = `ASSIGNMENT_${question.question_id}`;
        if (editedData[assignmentKey]) {
          payload.assignments.push({
            question_id: question.question_id,
            value: parseInt(editedData[assignmentKey], 10) || 0
          });
        }
      });
      console.log(payload)
      await api.put(`/api/termwork/assignment/update`, payload);

      const updatedData = [...TwAssignMentData];
      updatedData[editingIndex] = editedData;
      setTwAssignmentData(updatedData);
      handleCancel();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!TwAssignMentData || TwAssignMentData.length === 0 || !questiondata) {
    return <LoadingButton />;
  }

  const calculateTotal = (student) => {
    return questiondata.reduce(
      (total, question) => total + (student[`ASSIGNMENT_${question.question_id}`] || 0),
      0
    );
  };

  // Pagination logic: Calculate total number of pages and slice data for the current page
  const totalPages = Math.ceil(TwAssignMentData.length / dataPerPage);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = TwAssignMentData.slice(indexOfFirstData, indexOfLastData);

  return (
    <div>
      <table className="table-auto w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2" rowSpan="2">Sr. No</th>
            <th className="border px-4 py-2" rowSpan="2">ID</th>
            <th className="border px-4 py-2" rowSpan="2">Name of Student</th>
            <th className="text-center border px-4 py-2" colSpan={questiondata.length}>
              Assignments
            </th>
            <th className="border px-4 py-2" rowSpan="2">Total</th>
            <th className="border px-4 py-2" rowSpan="2">Actions</th>
          </tr>
          <tr>
            {questiondata.map((question, qIndex) => (
              <th key={qIndex} className="text-center border px-4 py-2">
                {question.question_name.replace("ASSIGNMENT", "").trim()} <br />
                {question.conames.join(', ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((student, index) => (
            <tr key={student.sid}>
              <td className="border px-4 py-2">{indexOfFirstData + index + 1}</td>
              <td className="border px-4 py-2">{student.stud_clg_id}</td>
              <td className="border px-4 py-2">{student.student_name}</td>
              {questiondata.map((question, qIndex) => (
               <td key={qIndex} className="border px-4 py-2">
               {editingIndex === index ? (
                 <input
                   type="text"
                   value={editedData[`ASSIGNMENT_${question.question_id}`] || ''}
                   onChange={(e) =>
                     handleChange(`ASSIGNMENT_${question.question_id}`, e.target.value, question.maxmarks)
                   }
                   className="border border-gray-300 px-2 py-1 w-full max-w-[50px] truncate"
                 />
               ) : (
                 student[`ASSIGNMENT_${question.question_id}`] !== null
                   ? student[`ASSIGNMENT_${question.question_id}`]
                   : ''
               )}
             </td>
              ))}
              <td className="border px-4 py-2">{calculateTotal(student)}</td>
              <td className="border px-4 py-2">
                {editingIndex === index ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TheoryAssignment;
