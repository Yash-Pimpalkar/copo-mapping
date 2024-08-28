import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api";
import LoadingButton from "../../component/Loading/Loading";


const User_course = ({ uid }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.post(`/api/usercourse/${uid}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchData();
    }
  }, [uid]);

  const handleGoToCourse = (usercourse_id, co_count) => {
    navigate(`/coform`, { state: { usercourse_id, co_count } });
  };

  const handleShowCos = (usercourse_id) => {
    navigate(`/cos`, { state: { usercourse_id } });
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditFormData({
      semester: data[index].semester,
      academic_year: data[index].academic_year,
      co_count: data[index].co_count
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSaveClick = async (index, usercourse_id) => {
    try {
      setLoading(true);
      const response = await api.put(`/api/usercourse/${usercourse_id}`, editFormData);
      if (response.status === 200) {
        const updatedData = [...data];
        updatedData[index] = { ...updatedData[index], ...editFormData };
        setData(updatedData);
        setEditIndex(null);
      } else {
        console.error("Failed to update data, status:", response.status);
      }
    } catch (err) {
      console.error("Error saving data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setEditIndex(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-8 text-blue-600 text-center font-bold">
        User Courses
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-500">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Index</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User Course ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Course Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Semester</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Academic Year</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Branch</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">CO Count</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.usercourse_id}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.user_id}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.course_name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="semester"
                      value={editFormData.semester}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-1 rounded"
                    />
                  ) : (
                    item.semester
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="academic_year"
                      value={editFormData.academic_year}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-1 rounded"
                    />
                  ) : (
                    item.academic_year
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.branch}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="co_count"
                      value={editFormData.co_count}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-1 rounded"
                    />
                  ) : (
                    item.co_count
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {editIndex === index ? (
                    <div className="flex space-x-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => handleSaveClick(index, item.usercourse_id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => handleGoToCourse(item.usercourse_id, item.co_count)}
                      >
                        Add CO's
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-teal-500 text-white px-4 py-2 rounded"
                        onClick={() => handleShowCos(item.usercourse_id)}
                      >
                        Show COS
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-1">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default User_course;
