import React, { useEffect, useState } from 'react';
import api from '../../../api';
import LoadingButton from "../../../component/Loading/Loading";

const UploadMajorproSem = ({ uid }) => {
  const [courses, setCourses] = useState([]);
  const [distinctCourses, setDistinctCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [numCOs, setNumCOs] = useState(0);
  const [coNames, setCoNames] = useState([]);
  const [formData, setFormData] = useState({
    logbookmarks: '',
    review1marks: '',
    review2marks: '',
    proreportmarks: '',
  });
  const [userCourseId, setUserCourseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    setSelectedYear('');
    setFormData({});
    setUserCourseId(
      courses.find(course => course.course_name === selectedCourse)?.usercourse_id || null
    );
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    setFormData({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumCOsChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setNumCOs(value);
    setCoNames(Array(value).fill('')); // Reset CO names to match the number of COs
  };

  const handleCONameChange = (index, value) => {
    const updatedCOs = [...coNames];
    updatedCOs[index] = value;
    setCoNames(updatedCOs);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { logbookmarks, review1marks, review2marks, proreportmarks } = formData;
    console.log("User Course ID:", userCourseId);
    console.log("Selected Year:", selectedYear);
    console.log("Logbook Marks:", logbookmarks);
    console.log("Review 1 Marks:", review1marks);
    console.log("Review 2 Marks:", review2marks);
    console.log("Project Report Marks:", proreportmarks);
    console.log("Number of COs:", numCOs);
    console.log("CO Names:", coNames);

    // Check if all required fields are filled
    if (!userCourseId || !selectedYear || !logbookmarks || !review1marks || !review2marks || !proreportmarks || numCOs === 0 || coNames.some(co => !co)) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);

      // Prepare data to submit
      const dataToSubmit = {
        usercourseid: userCourseId,
        logbookmarks: parseInt(logbookmarks, 10),
        review1marks: parseInt(review1marks, 10),
        review2marks: parseInt(review2marks, 10),
        proreportmarks: parseInt(proreportmarks, 10),
        numCOs,
        coNames,
        // usercourseid: userCourseId,
        // academicYear: selectedYear,
      };

      // Prepare coData as an array of objects
      const coData = coNames.map((name) => ({ coname: name }));

      // Send the data to the API
      console.log(userCourseId)
      console.log(logbookmarks)
      console.log(review1marks)
      console.log(review2marks)
      console.log(proreportmarks)
      console.log(coNames)
      await api.post("/api/uploadmajorprosem/create", 
        { formDataWithUserCourseId: dataToSubmit, coData }
      );
      console.error('Error submitting data:', error);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Major Project</h1>

      {/* Select Course */}
      <div className="mb-4">
        <label htmlFor="course-select" className="block text-sm font-medium text-gray-700">
          Select a Course
        </label>
        <select
          id="course-select"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
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

      {/* Select Academic Year */}
      {selectedCourse && (
        <div className="mb-4">
          <label htmlFor="year-select" className="block text-sm font-medium text-gray-700">
            Select Academic Year
          </label>
          <select
            id="year-select"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Select an academic year</option>
            {courses
              .filter(course => course.course_name === selectedCourse)
              .map(course => (
                <option key={course.usercourse_id} value={course.academic_year}>
                  {course.academic_year}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Form for Miniproject */}
      {selectedCourse && selectedYear && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="logbookmarks" className="block text-sm font-medium text-gray-700">
              Max Marks for Logbook
            </label>
            <input
              id="logbookmarks"
              name="logbookmarks"
              type="text"
              value={formData.logbookmarks}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="review1marks" className="block text-sm font-medium text-gray-700">
              Max Marks for Review 1
            </label>
            <input
              id="review1marks"
              name="review1marks"
              type="text"
              value={formData.review1marks}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="review2marks" className="block text-sm font-medium text-gray-700">
              Max Marks for Review 2
            </label>
            <input
              id="review2marks"
              name="review2marks"
              type="text"
              value={formData.review2marks}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="proreportmarks" className="block text-sm font-medium text-gray-700">
              Max Marks for Project Report
            </label>
            <input
              id="proreportmarks"
              name="proreportmarks"
              type="text"
              value={formData.proreportmarks}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="numCOs" className="block text-sm font-medium text-gray-700">
              How many COs for this project?
            </label>
            <input
              id="numCOs"
              name="numCOs"
              type="text"
              value={numCOs}
              onChange={handleNumCOsChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 uppercase">Enter the CO Names</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
            {Array.from({ length: numCOs }).map((_, index) => (
              <input
                key={index}
                type="text"
                value={coNames[index] || ''}
                onChange={(e) => handleCONameChange(index, e.target.value.toUpperCase())}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
                // placeholder={`CO ${index + 1} Name`}
                required
              />
            ))}
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
        </form>
      )}
    </div>
  );
};

export default UploadMajorproSem;
