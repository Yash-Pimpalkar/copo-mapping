import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentlmsDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [filteredClassrooms, setFilteredClassrooms] = useState([]); // Filtered classrooms
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data for enrolled classrooms
    const enrolledClassrooms = [
      { id: 1, name: 'SE AIDS C', instructor: 'Prof. John Doe' },
      { id: 2, name: 'TE COMPS B', instructor: 'Dr. Jane Smith' },
      { id: 3, name: 'BE IT A', instructor: 'Dr. Albert Taylor' }
    ];
    setClassrooms(enrolledClassrooms);
    setFilteredClassrooms(enrolledClassrooms); // Initialize filtered list
  }, []);

  // Function to handle classroom search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = classrooms.filter(classroom => 
      classroom.name.toLowerCase().includes(value)
    );
    setFilteredClassrooms(filtered);
  };

  // Function to handle navigation to the Classroom detail page
  const handleViewClassroom = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Welcome to Student Dashboard</h1>

        {/* Search Box */}
        <input
          type="text"
          className="border rounded px-4 py-2 w-64"
          placeholder="Search classrooms..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Enrolled Classrooms Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Classrooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClassrooms.length > 0 ? (
            filteredClassrooms.map((classroom) => (
              <div key={classroom.id} className="bg-white shadow-md rounded p-4 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">{classroom.name}</h3>
                <p className="text-gray-600">Instructor: {classroom.instructor}</p>
                <button
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => handleViewClassroom(classroom.id)}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Section */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Recent Notifications</h2>
          <p className="text-gray-600">No new notifications.</p>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Attendance Summary</h2>
          <p className="text-gray-600">You have attended 85% of your classes this semester.</p>
        </div>

      
      </div>
    </div>
  );
};

export default StudentlmsDashboard;
