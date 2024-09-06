import React, { useEffect, useState } from 'react';
import api from '../../api';
import LoadingButton from "../../component/Loading/Loading";

const Uploadpurepract = ({ uid }) => {
  const [courses, setCourses] = useState([]);
  const [distinctCourses, setDistinctCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [numExperiments, setNumExperiments] = useState(0);
  const [numAssignments, setNumAssignments] = useState(0);
  const [experiments, setExperiments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({});
  const [userCourseId, setUserCourseId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    setSelectedYear('');
    setExperiments([]);
    setAssignments([]);
    setFormData({});
    setUserCourseId(
      courses.find(course => course.course_name === selectedCourse)?.usercourse_id || null
    );
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    setExperiments([]);
    setAssignments([]);
    setFormData({});
  };

  const handleNumExperimentsChange = (event) => {
    const num = Math.min(parseInt(event.target.value, 10) || 0, 15); // Limit to max 15 experiments
    setNumExperiments(num);
    setExperiments(Array.from({ length: num }, (_, index) => ({
      qid: index + 1,
      expname: '',
      coname: '',
      marks: 0
    })));
  };

  const handleNumAssignmentsChange = (event) => {
    const num = Math.min(parseInt(event.target.value, 10) || 0, 10); // Limit to max 10 assignments
    setNumAssignments(num);
    setAssignments(Array.from({ length: num }, (_, index) => ({
      qid: index + 1,
      assignname: '',
      coname: '',
      marks: 0
    })));
  };

  const handleFormChange = (index, field, value, type) => {
    const dataKey = type === 'experiment' ? 'experiments' : 'assignments';
    const updateData = type === 'experiment' ? experiments : assignments;
    const updated = [...updateData];
    updated[index] = { ...updated[index], [field]: value.toUpperCase() };

    if (type === 'experiment') {
      setExperiments(updated);
    } else {
      setAssignments(updated);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userCourseId) {
      alert('Please select a valid course and academic year.');
      return;
    }

    const formattedData = {
      experiments: experiments.map(exp => ({
        expname: exp.expname || '',
        coname: exp.coname || '',
        marks: parseInt(exp.marks, 10) || 0,
        usercourseid: userCourseId,
      })),
      assignments: assignments.map(assign => ({
        assignname: assign.assignname || '',
        coname: assign.coname || '',
        marks: parseInt(assign.marks, 10) || 0,
        usercourseid: userCourseId,
      })),
      attendanceMarks: parseInt(formData.attendanceMarks, 10) || 0,  // Submit miniMarks correctly
    };

    try {
      setLoading(true);
      await api.post("/api/ia/create", formattedData);
      alert("Data submitted successfully");
      setError(null);
    } catch (error) {
      console.error('Error submitting data:', error);
      setError(error.response?.data?.error || "Failed to submit data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Pure Practical</h1>

      <div className="mb-4">
        <label htmlFor="course-select" className="block text-sm font-medium text-gray-700">
          Select a Course
        </label>
        <select
          id="course-select"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="">Select a course</option>
          {distinctCourses.map((course, index) => (
            <option key={index} value={course.course_name}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="mb-4">
          <label htmlFor="year-select" className="block text-sm font-medium text-gray-700">
            Select Academic Year
          </label>
          <select
            id="year-select"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Select an academic year</option>
            {courses
              .filter((course) => course.course_name === selectedCourse)
              .map((course) => (
                <option key={course.usercourse_id} value={course.academic_year}>
                  {course.academic_year}
                </option>
              ))}
          </select>
        </div>
      )}
      <br></br>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Experiments Section */}
<div>
  <label
    htmlFor="num-experiments"
    className="block text-sm font-medium text-gray-700"
  >
    Number of Experiments (Max 15)
  </label>
  <input
    id="num-experiments"
    type="text"
    value={numExperiments}
    onChange={handleNumExperimentsChange}
    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  />

  {experiments.length > 0 && (
    <div className="space-y-4 mt-4">
      {experiments.map((experiment, index) => (
        <div key={experiment.qid} className="p-4 border rounded-md shadow-sm">
          {/* Responsive grid for mobile compatibility */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 uppercase">
                Index
              </label>
              <input
                type="text"
                value={experiment.qid}
                readOnly
                className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 uppercase">
                Experiment Number
              </label>
              <input
                type="text"
                value={experiment.expname || ""}
                onChange={(e) =>
                  handleFormChange(index, "expname", e.target.value, "experiment")
                }
                className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 uppercase">
                CO Name
              </label>
              <input
                type="text"
                value={experiment.coname || ""}
                onChange={(e) =>
                  handleFormChange(index, "coname", e.target.value, "experiment")
                }
                className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 uppercase">
                Marks
              </label>
              <input
                type="number"
                value={experiment.marks || ""}
                onChange={(e) =>
                  handleFormChange(index, "marks", e.target.value, "experiment")
                }
                className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

{/* Assignments Section */}
<div>
  <label
    htmlFor="num-assignments"
    className="block text-sm font-medium text-gray-700"
  >
    Number of Assignments (Max 10)
  </label>
  <input
    id="num-assignments"
    type="text"
    value={numAssignments}
    onChange={handleNumAssignmentsChange}
    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  />

  {assignments.length > 0 && (
    <div className="space-y-4 mt-4">
      {assignments.map((assignment, index) => (
        <div key={assignment.qid} className="p-4 border rounded-md shadow-sm">
          {/* Responsive grid for mobile compatibility */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 uppercase">
                Index
              </label>
              <input
                type="text"
                value={assignment.qid}
                readOnly
                className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 uppercase">
                Assignment Number
              </label>
              <input
                type="text"
                value={assignment.assignname || ""}
                onChange={(e) =>
                  handleFormChange(index, "assignname", e.target.value, "assignment")
                }
                className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 uppercase">
                CO Name
              </label>
              <input
                type="text"
                value={assignment.coname || ""}
                onChange={(e) =>
                  handleFormChange(index, "coname", e.target.value, "assignment")
                }
                className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 uppercase">
                Marks
              </label>
              <input
                type="number"
                value={assignment.marks || ""}
                onChange={(e) =>
                  handleFormChange(index, "marks", e.target.value, "assignment")
                }
                className="px-4 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
</div>
      
      {/* attendance section */}
      <div className="mt-6">
            <label htmlFor="num-questions" className="block text-sm font-medium text-gray-700">
              Attendance(Max 5)
            </label>
            <div className="p-4 border rounded-md shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 uppercase">Index</label>
                  <input
                    type="text"
                    value="1"
                    readOnly
                    className="px-4 py-1 mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 uppercase">Max Marks</label>
                  <input
                    type="number"
                    value={formData.attendanceMarks || ''}
                    onChange={(e) => handleFormChange(null, 'attendanceMarks', e.target.value,'attendance')} // Pass null to avoid indexing with experiments
                    className="px-4 py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-red-600 text-center font-medium">
              {error}
            </div>
          )}
      <button
            type="submit"
            className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
          >
           Submit
          </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Uploadpurepract;
