import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../../api';

const EditCohort = () => {
  const { cohortId } = useParams(); // Get cohort ID from URL
  const navigate = useNavigate();
  
  const [cohortName, setCohortName] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [classname, setClassname] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [branches, setBranches] = useState([]); // For branch dropdown

  // Branch mapping object
  const branchMapping = {
    1: 'COMPUTER',
    2: 'IT',
    3: 'AIDS',
    4: 'AIML',
    5: 'MECATRONICS',
  };

  // Fetch cohort details by ID
  const fetchCohortDetails = async () => {
    try {
      const response = await api.get(`/api/cohorts/${cohortId}`);
      const cohort = response.data;
      console.log(cohort.branch);
      setCohortName(cohort.cohort_name);
      setBranch(cohort.branch);  // This is the branch ID
      setSemester(cohort.semester);
      setClassname(cohort.classname);
      setAcademicYear(cohort.academic_year);
    } catch (error) {
      console.error('Error fetching cohort details:', error);
    }
  };

  // Fetch branches for dropdown
  const fetchBranches = async () => {
    try {
      const response = await axios.get('/api/branch/show');
      setBranches(response.data); // Assume this API returns a list of branches
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  useEffect(() => {
    fetchCohortDetails();
    fetchBranches();
  }, [cohortId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/cohorts/${cohortId}`, {
        cohort_name: cohortName,
        branch,
        semester,
        classname,
        academic_year: academicYear,
      });
      navigate('/lms/ManageCohorts'); // Redirect to Manage Cohorts page
    } catch (error) {
      console.error('Error updating cohort:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Cohort</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Cohort Name</label>
          <input
            type="text"
            value={cohortName}
            onChange={(e) => setCohortName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Branch</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="" disabled>Select Branch</option>
            {/* Map over the branchMapping object */}
            {Object.keys(branchMapping).map((key) => (
              <option key={key} value={key}>
                {branchMapping[key]}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Semester</label>
          <input
            type="number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Class Name</label>
          <input
            type="text"
            value={classname}
            onChange={(e) => setClassname(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Academic Year</label>
          <input
            type="text"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Cohort
        </button>
      </form>
    </div>
  );
};

export default EditCohort;
