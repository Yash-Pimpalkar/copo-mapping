import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../../api.js';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    branch: '',
    academicYear: '',
    semester: '',
  });

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/api/cohorts/managestudents'); // Adjust the API endpoint as needed
        setStudents(response.data);
        setFilteredStudents(response.data); // Initialize filtered students
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search and selected filters
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

  // Handle checkbox selection for students
  const handleSelectStudent = (student) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(student)
        ? prevSelected.filter((s) => s !== student)
        : [...prevSelected, student]
    );
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="flex container mx-auto p-4">
      <div className="w-1/3 p-4 border border-gray-300 rounded-lg mr-4">
        <h2 className="text-xl font-bold mb-4">Selected Students</h2>
        <ul>
          {selectedStudents.map((student) => (
            <li key={student.sid} className="border-b py-2">
              {student.student_name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Manage Students</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, ID, or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Branch</label>
          <select name="branch" onChange={handleFilterChange} className="border border-gray-300 p-2 rounded w-full">
            <option value="">All Branches</option>
            <option value="COMPUTER">COMPUTER</option>
            <option value="IT">IT</option>
            <option value="AIDS">AIDS</option>
            <option value="AIML">AIML</option>
            <option value="MECATRONICS">MECATRONICS</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Academic Year</label>
          <input
            type="text"
            name="academicYear"
            onChange={handleFilterChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Semester</label>
          <input
            type="number"
            name="semester"
            onChange={handleFilterChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

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
                    checked={selectedStudents.includes(student)}
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
