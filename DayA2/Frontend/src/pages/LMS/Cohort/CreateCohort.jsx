import React, { useState, useEffect } from 'react';
import api from '../../../api';

const CreateCohorts = ({ uid }) => {
  const [cohortName, setCohortName] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [classname, setClassname] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [cohorts, setCohorts] = useState([]);
  const [branches, setBranches] = useState([]); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');     
  const [countdown, setCountdown] = useState(0); // State to manage countdown

  const fetchBranches = async () => {
    try {
      const response = await api.get('api/branch/show');
      setBranches(response.data); 
    } catch (error) {
      console.error('Error fetching branches:', error);
      setBranches([]); 
      setErrorMessage('Error fetching branches. Please try again.');
    }
  };

  const getAcademicYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 5; i++) {
      const startYear = currentYear - i;
      const endYear = startYear + 1;
      years.push(`${startYear}-${endYear.toString().slice(-2)}`);
    }
    return years;
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setCountdown(10); // Start countdown at 10 seconds

    try {
      await api.post('/api/cohorts/', {
        user_id: uid,
        cohort_name: cohortName,
        branch,
        semester,
        classname,
        academic_year: academicYear,
      });
      setSuccessMessage('Cohort created successfully!');
      resetForm(); 

      // Start the timer to hide the message and countdown after 10 seconds
      startTimer();
    } catch (error) {
      console.error('Error creating cohort:', error);
      setErrorMessage('Error creating cohort. Please try again.');
      startTimer(); // Start the timer for error as well
    }
  };

  const startTimer = () => {
    // Start the countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval); // Clear the interval when countdown reaches 0
          setSuccessMessage(''); // Clear success message
          setErrorMessage(''); // Clear error message
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetForm = () => {
    setCohortName('');
    setBranch('');
    setSemester('');
    setClassname('');
    setAcademicYear('');
  };

  const academicYears = getAcademicYears();

  return (
    <div className="bg-white shadow-md rounded p-6 mb-8">
      <h2 className="text-center text-4xl font-bold mb-4">Create Cohorts</h2>

      {/* Success/Error Message with Countdown */}
      {successMessage && (
        <div className="bg-green-200 text-green-800 p-2 rounded mb-4">
          {successMessage}
          {/* {countdown > 0 && <p>Disappearing in {countdown} seconds...</p>} */}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-200 text-red-800 p-2 rounded mb-4">
          {errorMessage}
          {/* {countdown > 0 && <p>Disappearing in {countdown} seconds...</p>} */}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="cohortName">
            Cohort Name
          </label>
          <input
            type="text"
            id="cohortName"
            value={cohortName}
            onChange={(e) => setCohortName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="branch">
            Branch
          </label>
          <select
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="" disabled>Select branch</option>
            {branches && branches.length > 0 ? (
              branches.map((b) => (
                <option key={b.idbranch} value={b.idbranch}>
                  {b.branchname}
                </option>
              ))
            ) : (
              <option disabled>No branches available</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="semester">
            Semester
          </label>
          <input
            type="number"
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="classname">
            Class Name
          </label>
          <input
            type="text"
            id="classname"
            value={classname}
            onChange={(e) => setClassname(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="academicYear">
            Academic Year
          </label>
          <select
            id="academicYear"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="" disabled>Select academic year</option>
            {academicYears.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Cohort
        </button>
      </form>

     
    </div>
  );
};

export default CreateCohorts;
