import React, { useState } from 'react';

const LMSTeacherNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">LMS Dashboard</div>
        
        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              // Close icon when menu is open
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-8 relative ml-16">
          <DropdownMenu
            title="Classroom"
            isActive={activeDropdown === 'classroom'}
            toggle={() => handleDropdownToggle('classroom')}
            links={[
              { href: '/lms/CreateClassroom', label: 'Create Classroom' },
              { href: '/lms/viewclassroom', label: 'View All Classrooms' },
              { href: '/lms/manageclassroom/:classroomId', label: 'Manage Classrooms' }
            ]}
          />
          <DropdownMenu
            title="Cohorts"
            isActive={activeDropdown === 'cohorts'}
            toggle={() => handleDropdownToggle('cohorts')}
            links={[
              { href: '/lms/CreateCohorts', label: 'Create Cohorts' },
              { href: '/lms/ManageCohorts', label: 'Manage Cohorts' }
            ]}
          />
          <DropdownMenu
            title="Students"
            isActive={activeDropdown === 'students'}
            toggle={() => handleDropdownToggle('students')}
            links={[
              // { href: '#studentCohorts', label: 'Student Cohorts' },
              { href: '/lms/StudentlmsAttendance', label: 'Student Attendance' },
              { href: '/lms/StudentFeedback', label: 'Student Feedback' }
            ]}
          />
        </ul>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <ul className="lg:hidden space-y-4 mt-1 bg-blue-500 p-4 rounded shadow-md w-full absolute left-0 top-full z-10">
            <DropdownMenu
              title="Classroom"
              isActive={activeDropdown === 'classroom'}
              toggle={() => handleDropdownToggle('classroom')}
              links={[
                { href: '/lms/CreateClassroom', label: 'Create Classroom' },
                { href: '/lms/viewclassroom', label: 'View All Classrooms' },
                { href: '/lms/manageclassroom/:classroomId', label: 'Manage Classrooms' }
              ]}
            />
            <DropdownMenu
              title="Cohorts"
              isActive={activeDropdown === 'cohorts'}
              toggle={() => handleDropdownToggle('cohorts')}
              links={[
                { href: '/lms/CreateCohorts', label: 'Create Cohorts' },
                { href: '/lms/ManageCohorts', label: 'Manage Cohorts' }
              ]}
            />
            <DropdownMenu
              title="Students"
              isActive={activeDropdown === 'students'}
              toggle={() => handleDropdownToggle('students')}
              links={[
                { href: '#studentCohorts', label: 'Student Cohorts' },
                { href: '/lms/StudentlmsAttendance', label: 'Student Attendance' },
                { href: '/lms/StudentFeedback', label: 'Student Feedback' }
              ]}
            />
          </ul>
        )}
      </div>
    </nav>
  );
};

const DropdownMenu = ({ title, isActive, toggle, links }) => (
  <li className="relative">
    <a
      href="#!"
      className="hover:underline flex items-center space-x-1"
      onClick={(e) => {
        e.preventDefault();
        toggle();
      }}
    >
      <span>{title}</span>
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </a>
    {isActive && (
      <ul className="absolute lg:absolute top-full left-0 bg-blue-500 mt-2 rounded shadow-md p-2 space-y-2 z-10">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="hover:underline block">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    )}
  </li>
);

export default LMSTeacherNavbar;
