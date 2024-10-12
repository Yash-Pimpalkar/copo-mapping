import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get cohortId from the URL
import api from '../../../api.js';
import { FaTrashAlt } from 'react-icons/fa';  // Importing the trash icon for removal

const ManageStudents = () => {
  const { cohortId } = useParams(); // Get cohortId from the URL
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [initialCohortStudents, setInitialCohortStudents] = useState([]); // To track the original students already in the cohort
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
        setInitialCohortStudents(response.data); // Set initial students
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
        setUniqueYears(years); 
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

  // Handle removing students from the selected list and deleting from the database
  const handleRemoveStudent = async (student) => {
    try {
      // Delete the student from the database for this cohort
      await api.delete(`/api/cohorts/removestudent/${cohortId}/${student.sid}`);
      // Remove the student from the selected list
      setSelectedStudents((prevSelected) => prevSelected.filter((s) => s.sid !== student.sid));
    } catch (error) {
      console.error('Error removing student:', error);
      alert('Error while removing the student');
    }
  };

  // Identify newly selected students that are not part of the initial cohort
  const getNewlySelectedStudents = () => {
    return selectedStudents.filter(
      (student) => !initialCohortStudents.some((initial) => initial.sid === student.sid)
    );
  };

  // Handle submitting the newly selected students
  const handleAddNewStudents = async () => {
    const newStudents = getNewlySelectedStudents(); // Get newly selected students
    if (newStudents.length === 0) {
      alert('No new students to add');
      return;
    }

    try {
      await api.post(`/api/cohorts/assignstudents/${cohortId}`, {
        selectedStudents: newStudents.map(student => student.sid),
      });
      alert('New students added successfully');
      // Optionally, update the cohort students to reflect the new additions
      setInitialCohortStudents((prev) => [...prev, ...newStudents]);
    } catch (error) {
      console.error('Error assigning new students:', error);
      alert('Error while adding new students');
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Handle selecting all students
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length && filteredStudents.length > 0) {
      setSelectedStudents((prevSelected) =>
        prevSelected.filter(
          (s) => !filteredStudents.some((filteredStudent) => filteredStudent.sid === s.sid)
        )
      );
    } else {
      setSelectedStudents((prevSelected) => {
        const newSelected = [...prevSelected];
        filteredStudents.forEach((student) => {
          if (!newSelected.some((s) => s.sid === student.sid)) {
            newSelected.push(student);
          }
        });
        return newSelected;
      });
    }
  };

  // Handle deleting all students from the cohort
  const handleDeleteAll = async () => {
    try {
      await api.delete(`/api/cohorts/deletestudents/${cohortId}`);
      setSelectedStudents([]); // Clear the selected students list
      alert('All students removed from the cohort successfully');
    } catch (error) {
      console.error('Error deleting all students:', error);
      alert('Error while deleting students');
    }
  };
  const handleSubmit = async () => {
    try {
      await api.post(`/api/cohorts/assignstudents/${cohortId}`, {
        selectedStudents: selectedStudents.map(student => student.sid),
      });
      alert('All selected students submitted successfully');
    } catch (error) {
      console.error('Error submitting students:', error);
      alert('Error while submitting students');
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
          Submit All Selected Students
        </button>

        {/* New button for adding newly selected students */}
        <button
          onClick={handleAddNewStudents}
          className="bg-green-500 text-white px-4 py-2 mb-4 rounded"
        >
          Add Newly Selected Students
        </button>

        {/* New button for deleting all students */}
        <button
          onClick={handleDeleteAll}
          className="bg-red-500 text-white px-4 py-2 mb-4 rounded"
        >
          Delete All Students
        </button>

        <ul>
          {selectedStudents.map((student) => (
            <li key={student.sid} className="border-b py-2 flex items-center justify-between">
              <span>{student.student_name}</span>
              <FaTrashAlt
                className="text-red-500 cursor-pointer"
                onClick={() => handleRemoveStudent(student)} // Handle removing the student from the cohort
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
