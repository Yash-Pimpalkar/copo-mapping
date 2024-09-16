import React, { useEffect, useState } from 'react';
import api from '../../../api';
import LoadingButton from '../../../component/Loading/Loading';
const TheoryAssignment = ({ userCourseId }) => {
  const [TwAssignMentData, setTwAssignmentData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [questiondata,SetQuestionData]= useState(null)
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
        SetQuestionData(response1.data)
      } catch (error) {
        console.error('Error fetching termwork labels:', error);
      }
    };

    if (userCourseId) {
      fetch_Termwork_Assignment_data();
    }
  }, [userCourseId]);
 console.log(questiondata)
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedData({ ...TwAssignMentData[index] });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedData({});
  };

  const handleChange = (key, value) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      await api.put(`/api/termwork/update/${editedData.sid}`, editedData);
      const updatedData = [...TwAssignMentData];
      updatedData[editingIndex] = editedData;
      setTwAssignmentData(updatedData);
      handleCancel();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (!TwAssignMentData || TwAssignMentData.length === 0) {
    return <LoadingButton /> // Show loading or fallback content
  }

  // Extract assignment keys dynamically from the first student object
  const assignmentKeys = Object.keys(TwAssignMentData[0]).filter((key) =>
    key.startsWith('ASSIGNMENT')
  );

  const assignmentCOs = ['CO1', 'CO1', 'CO2', 'CO2', 'CO3', 'CO4'];

  const calculateTotal = (student) => {
    return assignmentKeys.reduce((total, key) => total + (student[key] || 0), 0);
  };

  return (
    <table className="table-auto w-full text-left border-collapse border border-gray-300">
      <thead>
        {/* First row with "Assignments" header spanning all assignments */}
        <tr>
          <th className="border px-4 py-2" rowSpan="2">
            Sr. No
          </th>
          <th className="border px-4 py-2" rowSpan="2">
            ID
          </th>
          <th className="border px-4 py-2" rowSpan="2">
            Name of Student
          </th>
          <th className="text-center border px-4 py-2" colSpan={assignmentKeys.length}>
            Assignments
          </th>
          <th className="border px-4 py-2" rowSpan="2">
            Total
          </th>
          <th className="border px-4 py-2" rowSpan="2">
            Actions
          </th>
        </tr>
        {/* Second row with assignment numbers and CO values */}
        <tr>
          {assignmentKeys.map((_, index) => (
            <th key={index} className="text-center border px-4 py-2">
              {index + 1} <br /> {assignmentCOs[index] || ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TwAssignMentData.map((student, index) => (
          <tr key={student.sid}>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{student.stud_clg_id}</td>
            <td className="border px-4 py-2">{student.student_name}</td>
            {assignmentKeys.map((key, idx) => (
              <td key={idx} className="border px-4 py-2">
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={editedData[key] || ''}
                    onChange={(e) => handleChange(key, Number(e.target.value))}
                    className="border border-gray-300 px-2 py-1"
                  />
                ) : (
                  student[key] !== null ? student[key] : ''
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
  );
};

export default TheoryAssignment;
