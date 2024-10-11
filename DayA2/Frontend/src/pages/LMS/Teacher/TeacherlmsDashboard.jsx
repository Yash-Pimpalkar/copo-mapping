import React, { useState } from 'react';

// Navbar Component with Dropdowns
const TeacherNavbar = () => {
  // State to handle dropdown visibility
  const [classroomDropdown, setClassroomDropdown] = useState(false);
  const [cohortsDropdown, setCohortsDropdown] = useState(false);
  const [studentsDropdown, setStudentsDropdown] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-center items-center">
        <div className="text-2xl font-bold">LMS Dashboard</div>
        <ul className="flex space-x-8 relative ml-16">
          {/* Classroom Dropdown */}
          <li 
            className="relative group"
          >
            <a href="#!" className="hover:underline">Classroom</a>
            <ul className="absolute top-full left-0 bg-blue-500 mt-2 rounded shadow-md p-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <li><a href="/lms/CreateClassroom" className="hover:underline block">Create Classroom</a></li>
              <li><a href="#viewClassrooms" className="hover:underline block">View All Classrooms</a></li>
              <li><a href="#manageClassrooms" className="hover:underline block">Manage Classrooms</a></li>
            </ul>
          </li>

          {/* Cohorts Dropdown */}
          <li 
            className="relative group"
          >
            <a href="#!" className="hover:underline">Cohorts</a>
            <ul className="absolute top-full left-0 bg-blue-500 mt-2 rounded shadow-md p-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <li><a href="#createCohorts" className="hover:underline block">Create Cohorts</a></li>
              <li><a href="#manageCohorts" className="hover:underline block">Manage Cohorts</a></li>
            </ul>
          </li>

          {/* Students Dropdown */}
          <li 
            className="relative group"
          >
            <a href="#!" className="hover:underline">Students</a>
            <ul className="absolute top-full left-0 bg-blue-500 mt-2 rounded shadow-md p-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <li><a href="#studentCohorts" className="hover:underline block">Student Cohorts</a></li>
              <li><a href="/lms/StudentlmsAttendance" className="hover:underline block">Student Attendance</a></li>
              <li><a href="#studentFeedback" className="hover:underline block">Student Feedback</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Placeholder Component for Classroom Section
const Classroom = () => (
  <div id="classroom" className="bg-white shadow-md rounded p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Classroom Section</h2>
    <p>Create, view, and manage your classrooms here.</p>
  </div>
);

// Placeholder Component for Cohorts Section
const Cohorts = () => (
  <div id="cohorts" className="bg-white shadow-md rounded p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Cohorts Section</h2>
    <p>Create and manage your cohorts here.</p>
  </div>
);

// Placeholder Component for Students Section
const Students = () => (
  <div id="students" className="bg-white shadow-md rounded p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Students Section</h2>
    <p>Manage student cohorts, attendance, and feedback here.</p>
  </div>
);

// Main Dashboard Component
const TeacherlmsDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Include the Navbar */}
      <TeacherNavbar />

      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to Teacher's Dashboard</h1>

        <p className="text-lg mb-6">
          This is your dashboard where you can manage classrooms, cohorts, students, and more.
        </p>

        {/* Sections */}
        <Classroom />
        <Cohorts />
        <Students />
      </div>
    </div>
  );
};

export default TeacherlmsDashboard;
