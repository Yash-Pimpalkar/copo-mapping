import React, { useState } from "react";

const CreateClassroom = () => {
  const [classroomName, setClassroomName] = useState("");
  const [selectedCohorts, setSelectedCohorts] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const cohorts = ["Cohort A", "Cohort B", "Cohort C"]; // Example cohorts
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]; // Example years
  const departments = ["Computer", "AIDS", "IT", "Mechatronics"]; // Example departments
  const semesters = [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6",
    "Semester 7",
    "Semester 8",
  ]; // Example semesters

  const handleCohortChange = (cohort) => {
    if (selectedCohorts.includes(cohort)) {
      setSelectedCohorts(selectedCohorts.filter((c) => c !== cohort));
    } else {
      setSelectedCohorts([...selectedCohorts, cohort]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the creation of the classroom here
    console.log(
      "Classroom Created:",
      classroomName,
      "Cohorts:",
      selectedCohorts,
      "Year:",
      selectedYear,
      "Department:",
      selectedDepartment,
      "Semester:",
      selectedSemester
    );
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
              <option key={dept} value={dept}>
                {dept}
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
              <option key={semester} value={semester}>
                {semester}
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
