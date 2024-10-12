import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get cohortId from the URL
import axios from 'axios';
import api from '../../../api.js';
import { FaTrashAlt } from 'react-icons/fa';  // Importing the trash icon for removal

const ManageStudents = () => {
  const { cohortId } = useParams(); // Get cohortId from the URL
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [uniqueBranches, setUniqueBranches] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [filters, setFilters] = useState({
    branch: '',
    academicYear: '',
    semester: '',
  });

  // Fetch cohort students from the backend
  useEffect(() => {
    const fetchCohortStudents = async () => {
      try {
        const response = await api.get(`/api/cohorts/cohortstudents/${cohortId}`);
        setSelectedStudents(response.data); // Set initially selected students
      } catch (error) {
        console.error('Error fetching cohort students:', error);
      }
    };
  
    fetchCohortStudents();
  }, [cohortId]);

  // Fetch all students from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/api/cohorts/managestudents');
        setStudents(response.data);
        setFilteredStudents(response.data);
         // Extract unique branches and academic years
         const branches = [...new Set(response.data.map(student => student.branch))];
         const years = [...new Set(response.data.map(student => student.academic_year))];
         setUniqueBranches(branches);
         setUniqueYears(years); // Initialize filtered students
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search term and filters
  useEffect(() => {
    const filtered = students.filter((student) => {
      const matchesSearchTerm = student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
        || student.stud_clg_id.toLowerCase().includes(searchTerm.toLowerCase())
        || student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBranch = filters.branch ? student.branch === filters.branch : true;
      const matchesAcademicYear = filters.academicYear ? student.academic_year === filters.academicYear : true;
      const matchesSemester = filters.semester ? student.semester === parseInt(filters.semester, 10) : true;

      return matchesSearchTerm && matchesBranch && matchesAcademicYear && matchesSemester;
    });

    setFilteredStudents(filtered);
  }, [searchTerm, filters, students]);

  // Handle selecting/deselecting students
  const handleSelectStudent = (student) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.some(s => s.sid === student.sid)
        ? prevSelected.filter((s) => s.sid !== student.sid)
        : [...prevSelected, student]
    );
  };

  // Handle removing students from the selected list
  const handleRemoveStudent = (student) => {
    setSelectedStudents((prevSelected) => prevSelected.filter((s) => s.sid !== student.sid));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Handle selecting all students
 // Handle selecting all students
const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length && filteredStudents.length > 0) {
      // If all filtered students are already selected, deselect all filtered students
      setSelectedStudents((prevSelected) =>
        prevSelected.filter(
          (s) => !filteredStudents.some((filteredStudent) => filteredStudent.sid === s.sid)
        )
      );
    } else {
      // Add filtered students to the already selected ones, ensuring no duplicates
      setSelectedStudents((prevSelected) => {
        const newSelected = [...prevSelected]; // Copy previous selected students
        filteredStudents.forEach((student) => {
          if (!newSelected.some((s) => s.sid === student.sid)) {
            newSelected.push(student); // Add the filtered student if not already selected
          }
        });
        return newSelected; // Return the merged list
      });
    }
  };
  

  // Handle submitting the selected students
  const handleSubmit = async () => {
    try {
      await api.post(`/api/cohorts/assignstudents/${cohortId}`, {
        selectedStudents: selectedStudents.map(student => student.sid),
      });
      alert('Cohort updated successfully');
    } catch (error) {
      console.error('Error assigning students:', error);
      alert('Error while assigning students');
    }
  };
  

  return (
    <div className="flex container mx-auto p-4">
      {/* Left container for selected students */}
      <div className="w-1/3 p-4 border border-gray-300 rounded-lg mr-4">
        <h2 className="text-xl font-bold mb-4">Selected Students</h2>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
        >
          Submit Selected Students
        </button>

        <ul>
          {selectedStudents.map((student) => (
            <li key={student.sid} className="border-b py-2 flex items-center justify-between">
              <span>{student.student_name}</span>
              <FaTrashAlt
                className="text-red-500 cursor-pointer"
                onClick={() => handleRemoveStudent(student)} // Handle removing the student from the selected list
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Right container for managing students */}
      <div className="w-2/3 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Manage Students</h2>

        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, ID, or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Filters for branch, academic year, and semester */}
      
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Branch</label>
            <select name="branch" onChange={handleFilterChange} className="border border-gray-300 p-2 rounded w-full">
              <option value="">All Branches</option>
              {uniqueBranches.map((branch, index) => (
                <option key={index} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Academic Year</label>
            <select name="academicYear" onChange={handleFilterChange} className="border border-gray-300 p-2 rounded w-full">
              <option value="">All Years</option>
              {uniqueYears.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Semester</label>
            <input
              type="number"
              name="semester"
              onChange={handleFilterChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Select All Checkbox */}
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
              onChange={handleSelectAll}
              className="mr-2"
            />
            Select All Listed Students
          </label>
        </div>

        {/* Table of students */}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Select</th>
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Branch</th>
              <th className="px-4 py-2">Semester</th>
              <th className="px-4 py-2">Academic Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.sid}>
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedStudents.some(s => s.sid === student.sid)}
                    onChange={() => handleSelectStudent(student)}
                  />
                </td>
                <td className="border px-4 py-2">{student.stud_clg_id}</td>
                <td className="border px-4 py-2">{student.student_name}</td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">{student.branch}</td>
                <td className="border px-4 py-2">{student.semester}</td>
                <td className="border px-4 py-2">{student.academic_year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
