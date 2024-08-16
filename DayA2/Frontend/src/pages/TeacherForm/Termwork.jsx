import React, { useState } from "react";
import api from '../../api';

const Termwork = () => {
    // State to manage checkbox selections
    const [checkboxes, setCheckboxes] = useState(Array(7).fill(false));
    const [formData, setFormData] = useState({});
    const [questions, setQuestions] = useState([]);
    const [numQuestions, setNumQuestions] = useState(0);
    const [courses, setCourses] = useState([]);
    const [distinctCourses, setDistinctCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [userCourseId, setUserCourseId] = useState(null);

    const handleCourseChange = (event) => {
        const selectedCourse = event.target.value;
        setSelectedCourse(selectedCourse);
        setSelectedYear('');
        setQuestions([]);
        setFormData({});
        setUserCourseId(
          courses.find(course => course.course_name === selectedCourse)?.usercourse_id || null
        );
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!userCourseId) {
          alert('Please select a valid course and academic year.');
          return;
        }
      }

      const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        setSelectedYear(selectedYear);
        setQuestions([]);
        setFormData({});
      };
    
      const handleNumQuestionsChange = (event) => {
        const num = Math.min(parseInt(event.target.value, 10) || 0, 10); // Limit to max 10 questions
        setNumQuestions(num);
        setQuestions(Array.from({ length: num }, (_, index) => ({
          qid: index + 1,
          qname: '',
          coname: '',
          marks: 0
        })));
      };
    
      const handleFormChange = (index, field, value) => {
        setFormData(prev => ({
          ...prev,
          [index]: {
            ...prev[index],
            [field]: value.toUpperCase() // Convert input to uppercase
          }
        }));
      };


    // Checkbox names
    const checkboxLabels = [
        "Practical",
        "Assignment",
        "Attendance",
        "Mini Project",
        "Group Discussion",
        "Presentation",
        "Extra"
    ];

    // Handle checkbox changes
    const handleCheckboxChange = (index) => {
        setCheckboxes(prev => {
            const newCheckboxes = [...prev];
            newCheckboxes[index] = !newCheckboxes[index];
            return newCheckboxes;
        });
    };
    

    return (
        <>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-blue-700 text-center font-bold mb-6">Termwork</h1>



            <div className="mb-4 pl-80 pr-80">
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
                            .filter(course => course.course_name === selectedCourse)
                            .map(course => (
                                <option key={course.usercourse_id} value={course.academic_year}>
                                    {course.academic_year}
                                </option>
                            ))}
                    </select>
                </div>
            )}

            {selectedCourse && selectedYear && (
                <div className="mb-4">
                    <label htmlFor="num-questions" className="block text-sm font-medium text-gray-700">
                        Number of Questions (Max 10)
                    </label>
                    <input
                        id="num-questions"
                        type="number"
                        value={numQuestions}
                        onChange={handleNumQuestionsChange}
                        min="0"
                        max="10"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            )}

            {questions.length > 0 && (
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {questions.map((question, index) => (
                            <div key={question.qid} className="p-4 border rounded-md shadow-sm">
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 uppercase">Index</label>
                                        <input
                                            type="text"
                                            value={question.qid}
                                            readOnly
                                            className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 uppercase">Question Name</label>
                                        <input
                                            type="text"
                                            value={formData[index]?.qname || question.qname || ''}
                                            onChange={(e) => handleFormChange(index, 'qname', e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 uppercase">CO Name</label>
                                        <input
                                            type="text"
                                            value={formData[index]?.coname || question.coname || ''}
                                            onChange={(e) => handleFormChange(index, 'coname', e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 uppercase">Max Marks</label>
                                        <input
                                            type="number"
                                            value={formData[index]?.marks || question.marks || ''}
                                            onChange={(e) => handleFormChange(index, 'marks', e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
                    >
                        Submit
                    </button>
                    <div className="flex items-center justify-center bg-gray-100">
                        <div className="bg-white p-4 rounded shadow-md w-full max-w-sm">
                            <div className="flex flex-col">
                                {checkboxLabels.map((label, index) => (
                                    <label key={index} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={checkboxes[index]}
                                            onChange={() => handleCheckboxChange(index)}
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span>{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default Termwork;
