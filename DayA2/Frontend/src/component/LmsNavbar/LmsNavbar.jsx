import React, { useState } from 'react';

// Navbar Component with Dropdowns
const LMSTeacherNavbar = () => {
  // State to handle the active dropdown
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Function to handle click for dropdowns
  const handleDropdownToggle = (dropdown) => {
    // If the same dropdown is clicked, close it; otherwise, open the new one
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-center items-center">
        <div className="text-2xl font-bold">LMS Dashboard</div>
        <ul className="flex space-x-8 relative ml-16">
          {/* Classroom Dropdown */}
          <li className="relative">
            <a
              href="#!"
              className="hover:underline"
              onClick={() => handleDropdownToggle('classroom')}
            >
              Classroom
            </a>
            {activeDropdown === 'classroom' && (
              <ul className="absolute top-full left-0 bg-blue-500 mt-2 rounded shadow-md p-2 space-y-2">
                <li><a href="/lms/CreateClassroom" className="hover:underline block">Create Classroom</a></li>
                <li><a href="#viewClassrooms" className="hover:underline block">View All Classrooms</a></li>
                <li><a href="#manageClassrooms" className="hover:underline block">Manage Classrooms</a></li>
              </ul>
            )}
          </li>

          {/* Cohorts Dropdown */}
          <li className="relative">
            <a
              href="#!"
              className="hover:underline"
              onClick={() => handleDropdownToggle('cohorts')}
            >
              Cohorts
            </a>
            {activeDropdown === 'cohorts' && (
              <ul className="absolute top-full left-0 bg-blue-500 mt-2 rounded shadow-md p-2 space-y-2">
                <li><a href="#createCohorts" className="hover:underline block">Create Cohorts</a></li>
                <li><a href="#manageCohorts" className="hover:underline block">Manage Cohorts</a></li>
              </ul>
            )}
          </li>

          {/* Students Dropdown */}
          <li className="relative">
            <a
              href="#!"
              className="hover:underline"
              onClick={() => handleDropdownToggle('students')}
            >
              Students
            </a>
            {activeDropdown === 'students' && (
              <ul className="absolute top-full left-0 bg-blue-500 mt-2 rounded shadow-md p-2 space-y-2">
                <li><a href="#studentCohorts" className="hover:underline block">Student Cohorts</a></li>
                <li><a href="/lms/StudentlmsAttendance" className="hover:underline block">Student Attendance</a></li>
                <li><a href="/lms/lmsfeedback" className="hover:underline block">Student Feedback</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LMSTeacherNavbar;
