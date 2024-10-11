import React, { useState } from 'react';

// Navbar Component with Dropdowns for Students
const LMSStudentNavbar = () => {
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
        <div className="text-2xl font-bold">Student LMS</div>
        <ul className="flex space-x-8 relative ml-16">
          {/* Courses Dropdown */}
          <li className="relative">
            <a
              href="#!"
              className="hover:underline"
              onClick={() => handleDropdownToggle('courses')}
            >
              Courses
            </a>
            {activeDropdown === 'courses' && (
              <ul className="absolute top-full left-0 bg-blue-500 mt-2 rounded shadow-md p-2 space-y-2">
                <li><a href="#viewCourses" className="hover:underline block">View All Courses</a></li>
                <li><a href="#enrollCourses" className="hover:underline block">Enroll in Courses</a></li>
              </ul>
            )}
          </li>

          {/* Assignments Dropdown */}
          <li className="relative">
            <a
              href="#!"
              className="hover:underline"
              onClick={() => handleDropdownToggle('assignments')}
            >
              Assignments
            </a>
            {activeDropdown === 'assignments' && (
              <ul className="absolute top-full left-0 bg-blue-500 mt-2 rounded shadow-md p-2 space-y-2">
                <li><a href="#viewAssignments" className="hover:underline block">View Assignments</a></li>
                <li><a href="#submitAssignments" className="hover:underline block">Submit Assignments</a></li>
              </ul>
            )}
          </li>

          {/* Attendance Dropdown */}
          <li className="relative">
            <a
              href="#!"
              className="hover:underline"
              onClick={() => handleDropdownToggle('attendance')}
            >
              Attendance
            </a>
            {activeDropdown === 'attendance' && (
              <ul className="absolute top-full left-0 bg-blue-500 mt-2 rounded shadow-md p-2 space-y-2">
                <li><a href="/lms/studentAttendance" className="hover:underline block">View Attendance</a></li>
              </ul>
            )}
          </li>

          {/* Feedback Dropdown */}
          <li className="relative">
            <a
              href="#!"
              className="hover:underline"
              onClick={() => handleDropdownToggle('feedback')}
            >
              Feedback
            </a>
            {activeDropdown === 'feedback' && (
              <ul className="absolute top-full left-0 bg-blue-500 mt-2 rounded shadow-md p-2 space-y-2">
                <li><a href="#submitFeedback" className="hover:underline block">Submit Feedback</a></li>
                <li><a href="#viewFeedback" className="hover:underline block">View Feedback</a></li>
              </ul>
            )}
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default LMSStudentNavbar;
