import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaBook, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import api from '../../api'; // Ensure this imports your API utility

function TeacherDashboard() {
  const [attainmentHistory, setAttainmentHistory] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate('/'); // Redirect to login page or home page
    window.location.reload(); // Optional: Reload the page to ensure state is reset
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-blue-900 text-white shadow-lg">
        <div className="p-4 md:p-6">
          <h1 className="text-xl md:text-2xl text-white font-bold">Teacher Dashboard</h1>
        </div>
        <nav className="mt-4 md:mt-10">
          <ul>
            <li className="px-4 py-2 md:py-3 hover:bg-blue-700 flex items-center justify-center md:justify-start">
              <FaChalkboardTeacher className="mr-2" />
              <Link to="/" className="text-sm md:text-base">Dashboard</Link>
            </li>
            <li className="px-4 py-2 md:py-3 hover:bg-blue-700 flex items-center justify-center md:justify-start">
              <FaBook className="mr-2" />
              <Link to="/usercourse" className="text-sm md:text-base">Show Courses</Link>
            </li>
            <li className="px-4 py-2 md:py-3 hover:bg-blue-700 flex items-center justify-center md:justify-start">
              <FaChartBar className="mr-2" />
              <Link to="/coposhow" className="text-sm md:text-base">CO PO Attainment</Link>
            </li>
            <li className="px-4 py-2 md:py-3 hover:bg-blue-700 flex items-center justify-center md:justify-start">
              <button onClick={handleLogout} className="flex items-center">
                <FaSignOutAlt className="mr-2" />
                <span className="text-sm md:text-base">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <header className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg p-4 md:p-6 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold">Welcome, Teacher</h2>
        </header>

        {/* Dashboard Content */}
        <section className="mt-4 md:mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Show Courses Component */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Show Courses</h3>
              <p className="text-gray-600 text-sm md:text-lg">View and manage your courses.</p>
              <Link to="/usercourse" className="mt-2 md:mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm md:text-base">
                View Courses
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TeacherDashboard;
