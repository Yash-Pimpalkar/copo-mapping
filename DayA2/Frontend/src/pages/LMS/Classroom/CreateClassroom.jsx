import React, { useState, useEffect } from "react";
import api from '../../../api';

const CreateClassroom = ({ uid }) => {
  const [courses, setCourses] = useState([]);
  const [distinctCourses, setDistinctCourses] = useState([]);
  const [classroomName, setClassroomName] = useState("");
  const [selectedCohorts, setSelectedCohorts] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate academic years
  useEffect(() => {
    const generateAcademicYears = () => {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear - 3; i <= currentYear + 1; i++) {
        years.push(`${i}-${i + 1}`);
      }
      setAcademicYears(years);
    };
    generateAcademicYears();
  }, []);

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/copo/${uid}`);
        setCourses(res.data);

        const distinct = Array.from(new Set(res.data.map(course => course.course_name)))
          .map(course_name => ({
            course_name,
            academic_year: res.data.find(course => course.course_name === course_name).academic_year
          }));

        setDistinctCourses(distinct);
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchCourseData();
    }
  }, [uid]);

  const cohorts = ["Cohort A", "Cohort B", "Cohort C"]; // Example cohorts
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]; // Example years
  const departments = [
    { name: "Computer", value: 1 },
    { name: "AIDS", value: 2 },
    { name: "IT", value: 3 },
    { name: "EXTC", value: 4 },
  ]; // Example departments  
  const semesters = [
    { name: "Semester 1", value: 1 },
    { name: "Semester 2", value: 2 },
    { name: "Semester 3", value: 3 },
    { name: "Semester 4", value: 4 },
    { name: "Semester 5", value: 5 },
    { name: "Semester 6", value: 6 },
    { name: "Semester 7", value: 7 },
    { name: "Semester 8", value: 8 },
  ]; // Example semesters

  const handleCohortChange = (cohort) => {
    if (selectedCohorts.includes(cohort)) {
      setSelectedCohorts(selectedCohorts.filter((c) => c !== cohort));
    } else {
      setSelectedCohorts([...selectedCohorts, cohort]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format current time for database
    const currentTime = new Date().toISOString();
    const formatDateForDatabase = (isoDate) => {
      const date = new Date(isoDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    const formattedCreatedAt = formatDateForDatabase(currentTime);

    const selectedDepartmentObj = departments.find(dep => dep.name === selectedDepartment);
    const selectedSemesterObj = semesters.find(sem => sem.name === selectedSemester);

    // Check for missing fields
    if (!classroomName || !selectedCohorts || !selectedYear || !selectedDepartment || !selectedSemester || !selectedAcademicYear) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);

      // Prepare data to submit
      const dataToSubmit = {
        userid: uid,
        room_name: classroomName,
        selectedYear: parseInt(selectedYear, 10),
        branch: selectedDepartmentObj ? selectedDepartmentObj.value : null,
        semester: selectedSemesterObj ? selectedSemesterObj.value : null,
        created_at: formattedCreatedAt,
        academic_year: selectedAcademicYear,
      };

      console.log("dataToSubmit", dataToSubmit);

      // Send data to the server
      await api.post("/api/lmsclassroom/create", {
        formDataForCohortClassroom: dataToSubmit
      });

      alert('Data submitted successfully');
      setError(null);
    } catch (error) {
      console.error('Error submitting data:', error);
      setError(error.response?.data?.error || 'Failed to submit data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6 mb-8">
      <h2 className="text-center text-4xl font-bold mb-4">Create Classroom</h2>
      <form onSubmit={handleSubmit}>
        {/* Classroom Name */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="classroomName">
            Classroom Name
          </label>
          <input
            type="text"
            id="classroomName"
            value={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        {/* Year Selection */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="year">
            Select Year
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="" disabled>
              Select Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Academic Year Selection */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="academicYear">
            Select Academic Year
          </label>
          <select
            id="academicYear"
            value={selectedAcademicYear}
            onChange={(e) => setSelectedAcademicYear(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="" disabled>
              Select Academic Year
            </option>
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Department Selection */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="department">
            Select Department
          </label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((dept) => (
              <option key={dept.value} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Selection */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="semester">
            Select Semester
          </label>
          <select
            id="semester"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="" disabled>
              Select Semester
            </option>
            {semesters.map((semester) => (
              <option key={semester.value} value={semester.name}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cohorts Selection */}
        <div className="mb-4">
          <label className="block mb-2">Select Cohorts</label>
          {cohorts.map((cohort) => (
            <div key={cohort} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={cohort}
                checked={selectedCohorts.includes(cohort)}
                onChange={() => handleCohortChange(cohort)}
                className="mr-2"
              />
              <label htmlFor={cohort} className="cursor-pointer">
                {cohort}
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Classroom
        </button>
      </form>
    </div>
  );
};

export default CreateClassroom;
