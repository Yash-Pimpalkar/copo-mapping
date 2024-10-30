import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

const StudentlmsDashboard = ({ uid }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await api.get(`/api/studentlms/getclassroom/${uid}`);
        const sortedClassrooms = response.data.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        );
        const latestClassrooms = sortedClassrooms.slice(0, 9);
        setClassrooms(latestClassrooms);
        setFilteredClassrooms(latestClassrooms);
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
      {/* Dashboard Content */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Student Dashboard
        </h1>

        {/* College Vision and Mission Section */}
        <div className="mb-14 grid grid-cols-1 p-6 md:grid-cols-2 gap-4 text-center">
          {/* Vision Section */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              College Vision
            </h2>
            <p className="text-gray-700 text-base">
              To provide an environment to educate, encourage, and explore
              students by facilitating innovative research, entrepreneurship,
              opportunities, and employability to achieve social and
              professional goals.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              College Mission
            </h2>
            <ul className="list-disc text-left mx-auto text-gray-700 text-base">
              <li className="mb-2">
                Foster entrepreneurship & strengthen industry-institute
                interaction for better employability.
              </li>
              <li className="mb-2">
                Encourage collaborations with industries and academic institutes
                for projects & internships.
              </li>
              <li>
                Promote holistic development through academic, social, and
                cultural activities.
              </li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Notifications
          </h2>
          <p className="text-gray-600">No new notifications.</p>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Attendance Summary
          </h2>
          <p className="text-gray-600">
            You have attended 85% of your classes this semester.
          </p>
        </div>
        </div>
      </div>
      

      {/* Enrolled Classrooms Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Classrooms
          </h2>
          {/* Search Box */}
          <div className="flex justify-end">
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2 w-64 shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Search classrooms..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
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

      {/* Additional Interactive Sections */}
     
    </div>
  );
};

export default StudentlmsDashboard;
