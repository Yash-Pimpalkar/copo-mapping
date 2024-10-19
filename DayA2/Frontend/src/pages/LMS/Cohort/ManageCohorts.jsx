import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../../../api.js';

const ManageCohorts = () => {
  const [cohorts, setCohorts] = useState([]);
  const branchMapping = {
    1: 'COMPUTER',
    2: 'IT',
    3: 'AIDS',
    4: 'AIML',
    5: 'MECATRONICS',
  };

  // Fetch cohorts from API
  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await api.get('/api/cohorts/show');
        console.log(response); // API to get all cohorts
        setCohorts(response.data);
      } catch (error) {
        console.error('Error fetching cohorts:', error);
      }
    };

    fetchCohorts();
  }, []);

  console.log(cohorts);

  // Handle delete cohort
  const handleDelete = async (cohortId) => {
    try {
      await api.delete(`/api/cohorts/${cohortId}`); // API to delete cohort
      setCohorts(cohorts.filter((cohort) => cohort.cohort_id !== cohortId)); // Remove from state
    } catch (error) {
      console.error('Error deleting cohort:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Cohorts</h2>
      
      {/* Add horizontal scrollbar */}
      <div style={{ overflowX: 'auto' }}>
        <table className="table-auto w-full min-w-[500px] md:min-w-[700px] lg:min-w-[900px] xl:min-w-[1200px] border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2">Cohort Name</th>
              <th className="px-4 py-2">Branch</th>
              <th className="px-4 py-2">Semester</th>
              <th className="px-4 py-2">Class Name</th>
              <th className="px-4 py-2">Academic Year</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map((cohort) => (
              <tr key={cohort.cohort_id}>
                <td className="border px-4 py-2">{cohort.cohort_name}</td>
                <td className="border px-4 py-2">
                  {branchMapping[cohort.branch] || 'Unknown Branch'}
                </td>
                <td className="border px-4 py-2">{cohort.semester}</td>
                <td className="border px-4 py-2">{cohort.classname}</td>
                <td className="border px-4 py-2">{cohort.academic_year}</td>
                <td className="border px-4 py-2">
                  {/* Edit, Delete, and Manage Students buttons */}
                  <Link
                    to={`/lms/EditCohort/${cohort.cohort_id}`}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/lms/ManageStudents/${cohort.cohort_id}`}
                    className="text-green-500 hover:underline mr-4"
                  >
                    Manage Students
                  </Link>
                  <button
                    onClick={() => handleDelete(cohort.cohort_id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCohorts;
