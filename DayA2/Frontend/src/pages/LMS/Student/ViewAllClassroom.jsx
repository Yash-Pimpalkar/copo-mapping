import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

const ViewClassroom = ({ uid }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await api.get(`/api/studentlms/getclassroom/${uid}`);
        console.log(response.data)
        const sortedClassrooms = response.data.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setClassrooms(sortedClassrooms);
        setFilteredClassrooms(sortedClassrooms);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };
    fetchClassrooms();
  }, [uid]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);


  
    const filtered = classrooms.filter((classroom) =>
      classroom.room_name.toLowerCase().includes(value) ||
      classroom.teacher_name.toLowerCase().includes(value) ||
      classroom.academic_year.toLowerCase().includes(value)
    );

    setFilteredClassrooms(filtered);
  };
  const handleViewClassroom = (classroomId) => {
    navigate(`/viewclassroom/${classroomId}`);
  };


  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Classrooms</h1>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Search classrooms..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClassrooms.length > 0 ? (
          filteredClassrooms.map((classroom) => (
            <div
              key={classroom.classroom_id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {classroom.room_name}
              </h3>
              <p className="text-gray-600 mb-4">
                Instructor: {classroom.teacher_name}
              </p>
              <p className="text-gray-600 mb-4">
                Academic Year: {classroom.academic_year}
              </p>
              {/* <p className="text-gray-600 mb-4">
                Created At: {new Date(classroom.created_at).toLocaleDateString()}
              </p> */}
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={() => handleViewClassroom(classroom.classroom_id)}
                
              >
                View Classroom
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No classrooms found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewClassroom;
