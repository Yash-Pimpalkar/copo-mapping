import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaFolder } from 'react-icons/fa';
import api from '../../../api';
import 'tailwindcss/tailwind.css';

const ViewAllClassroom = ({ uid }) => {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await api.get(`/api/lmsclassroom/show/${uid}`);
        const classroomData = Array.isArray(response.data) ? response.data : [response.data];
        setClassrooms(classroomData);
      } catch (error) {
        console.error('Error fetching classroom:', error);
      }
    };

    if (uid) {
      fetchClassroom();
    }
  }, [uid]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
    <div className="w-full max-w-7xl px-2 sm:px-4 py-2 sm:py-4">
      <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-2 sm:mb-4 text-center">Classrooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {classrooms.length > 0 ? (
          classrooms.map((classroom) => (
            <div
              key={classroom.classroom_id}
              className="relative bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              {/* Top section with gradient and course details */}
              <div className="h-24 sm:h-32 bg-gradient-to-r from-teal-500 to-blue-600 rounded-t-lg p-4 flex items-start justify-between">
                <div>
                  <h3 className="text-white text-lg sm:text-xl font-semibold">{classroom.room_name}</h3>
                  <p className="text-white text-xs sm:text-sm">Semester: {classroom.semester}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                  {classroom.room_name.charAt(0).toUpperCase()}
                </div>
              </div>
  
              {/* Middle section with instructor info */}
              <div className="p-4">
                <p className="text-gray-700 text-sm sm:text-base">Academic Year: {classroom.academic_year}</p>
                <p className="text-gray-500 text-xs sm:text-sm">Instructor: {classroom.teacher_name}</p>
              </div>
  
              {/* Bottom icons */}
              <div className="flex justify-around px-4 pb-4 mt-auto">
                {/* <FaCamera className="text-gray-600 hover:text-gray-800 cursor-pointer transition-transform transform hover:scale-125" size={20} />
                <FaFolder className="text-gray-600 hover:text-gray-800 cursor-pointer transition-transform transform hover:scale-125" size={20} /> */}
              </div>
  
              {/* View Classroom Button */}
              <Link
                to={`/lms/viewclassroom/${classroom.classroom_id}`}
                className="absolute top-24 right-2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors transform -translate-y-1/2"
                style={{ zIndex: 10 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No classrooms available.</p>
        )}
      </div>
    </div>
  </div>
  
  );
};

export default ViewAllClassroom;
