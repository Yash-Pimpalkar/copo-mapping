import React from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

function TeacherDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold">Teacher Dashboard</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link to="/usercourse">Courses</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link to="/coposhow">CO PO Attainment</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link to="/students">Students</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between bg-white shadow-lg p-4">
          <h2 className="text-2xl font-bold">Welcome, Teacher</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Logout</button>
        </header>
        <section className="mt-8">
          {/* Add your main content here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold">Course 1</h3>
              <p>Details about Course 1</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold">Course 2</h3>
              <p>Details about Course 2</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold">Course 3</h3>
              <p>Details about Course 3</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TeacherDashboard;
