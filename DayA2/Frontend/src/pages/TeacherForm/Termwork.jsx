import React, { useState } from "react";
import api from "../../api";
import LoadingButton from "../../component/Loading/Loading";

const Termwork = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(0);
  const [courses, setCourses] = useState([]);
  const [distinctCourses, setDistinctCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [userCourseId, setUserCourseId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    setSelectedYear("");
    setQuestions([]);
    setFormData({});
    setUserCourseId(
      courses.find((course) => course.course_name === selectedCourse)
        ?.usercourse_id || null
    );
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    setQuestions([]);
    setFormData({});
  };

  const handleNumQuestionsChange = (event) => {
    const num = Math.min(parseInt(event.target.value, 10) || 0, 10); // Limit to max 10 questions
    setNumQuestions(num);
    setQuestions(
      Array.from({ length: num }, (_, index) => ({
        qid: index + 1,
        qname: "",
        coname: "",
        marks: 0,
      }))
    );
  };

  const handleCheckboxChange = (index) => {
    setSelectedCheckbox(index); // Set the selected checkbox index
  };

  const checkboxLabels = [
    "Theory only",
    "Theory + Assignment -Maths",
    "PR Internal (TW ONLY)",
    "Practical having Mini Project",
    "Practical (10 + 10 + 5)",
    "Practical (10 + 10 (Mini)+5)",
  ];

  return (
    <>
      <h1 className="pt-4 text-3xl md:text-4xl lg:text-5xl mb-6 text-blue-700 text-center font-bold">
        Termwork
      </h1>
      <div className="mb-4 px-4">
        <label
          htmlFor="course-select"
          className="block text-sm font-medium text-gray-700 p-2"
        >
          Select a Course
        </label>
        <select
          id="course-select"
          className="block w-full p-8 py-3 px-4 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <div className="mb-4 px-4">
          <label
            htmlFor="year-select"
            className="block text-sm font-medium text-gray-700 p-2"
          >
            Select Academic Year
          </label>
          <select
            id="year-select"
            className="block w-full p-8 py-3 px-4 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

      {selectedCourse && selectedYear && (
        <>
          

          <div className="flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
              <div className="flex flex-col space-y-4">
                {checkboxLabels.map((label, index) => (
                  <label key={index} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedCheckbox === index} // Only one checkbox can be selected
                      onChange={() => handleCheckboxChange(index)}
                      className="form-checkbox h-5 w-5 accent-blue-600"
                    />
                    <span className="text-xl text-black-700">{label}</span>
                  </label>
                ))}
              </div>
              <div className="z flex justify-center mt-4">
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Termwork;
