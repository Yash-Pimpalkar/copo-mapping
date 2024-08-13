import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaBook, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import api from '../../api'; // Ensure this imports your API utility

function TeacherDashboard() {
  const [attainmentHistory, setAttainmentHistory] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const fetchAttainmentHistory = async () => {
    try {
      const res = await api.get('/api/attainment/history'); // Adjust the endpoint accordingly
      setAttainmentHistory(res.data);
    } catch (error) {
      console.error("Error fetching attainment history:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate('/'); // Redirect to login page or home page
    window.location.reload(); // Optional: Reload the page to ensure state is reset
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl text-white font-bold">Teacher Dashboard</h1>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="px-4 py-3 hover:bg-blue-700 flex items-center">
              <FaChalkboardTeacher className="mr-3" />
              <Link to="/">Dashboard</Link>
            </li>
            <li className="px-4 py-3 hover:bg-blue-700 flex items-center">
              <FaBook className="mr-3" />
              <Link to="/usercourse">Show Courses</Link>
            </li>
            <li className="px-4 py-3 hover:bg-blue-700 flex items-center">
              <FaChartBar className="mr-3" />
              <Link to="/coposhow">CO PO Attainment</Link>
            </li>
            <li className="px-4 py-3 hover:bg-blue-700 flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-3xl font-bold">Welcome, Teacher</h2>
        </header>

        {/* Dashboard Content */}
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Show Courses Component */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">Show Courses</h3>
              <p className="text-gray-600 text-lg">View and manage your courses.</p>
              <Link to="/usercourse" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                View Courses
              </Link>
            </div>

            {/* History of Attainment Calculated */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">History of Attainment Calculated</h3>
              <p className="text-gray-600 text-lg">View the history of attainment calculations.</p>
              <button
                onClick={fetchAttainmentHistory}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Fetch History
              </button>
              <ul className="mt-4">
                {attainmentHistory.map((item, index) => (
                  <li key={index} className="border-b border-gray-200 py-2">
                    {item.date}: Attainment - {item.attainment}% (Calculated at {item.time})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TeacherDashboard;
