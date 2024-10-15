import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import CourseSelector from '../../../component/CourseSelector/CourseSelector';

const EditQuestionsPage = ({ uid }) => {
    const [courses, setCourses] = useState([]);
    const [distinctCourses, setDistinctCourses] = useState([]);
    const [checkedStates, setCheckedStates] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [numQuestions, setNumQuestions] = useState(0);
    const [questionsCOData, setQuestionsCOData] = useState([]);
    const [userCourseId, setUserCourseId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [numCOs, setCOs] = useState();

    // Fetch courses on mount
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/api/copo/${uid}`);
                setCourses(res.data);
                console.log(res.data);

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

    // Fetch classrooms from API
    useEffect(() => {
        const fetchClassroom = async () => {
            try {
                const response = await api.get(`/api/lmsclassroom/show/${uid}`);
                console.log(response);

                const classroomData = Array.isArray(response.data) ? response.data : [response.data];
                setCOs(classroomData);
            } catch (error) {
                console.error('Error fetching classroom:', error);
            }
        };

        if (uid) {
            fetchClassroom();
        }
    }, [uid]);

    const handleSubmit = () => {
        // Handle form submission logic here
    };

    const handleSelectChange = (value) => {
        setSelectedComponent(value);
    };

    const handleCheckboxChange = (index) => {
        const updatedCheckedStates = [...checkedStates];
        updatedCheckedStates[index] = !updatedCheckedStates[index];
        setCheckedStates(updatedCheckedStates);
    };

    const handleNumQuestionsChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setNumQuestions(value > 0 ? value : 0);

        const initialQuestionsCOData = Array.from({ length: value }, () => ({
            numCOs: 0,
            coNames: [],
        }));

        setQuestionsCOData(initialQuestionsCOData);
    };

    const handleNumCOsChange = (questionIndex, value) => {
        const updatedQuestionsCOData = [...questionsCOData];
        if (!updatedQuestionsCOData[questionIndex]) {
            updatedQuestionsCOData[questionIndex] = { numCOs: 0, coNames: [] };
        }

        updatedQuestionsCOData[questionIndex].numCOs = value;
        updatedQuestionsCOData[questionIndex].coNames = Array.from({ length: value }, () => '');
        setQuestionsCOData(updatedQuestionsCOData);
    };

    const handleCONameChange = (questionIndex, coIndex, value) => {
        const updatedQuestionsCOData = [...questionsCOData];
        if (!updatedQuestionsCOData[questionIndex]) {
            updatedQuestionsCOData[questionIndex] = { numCOs: 0, coNames: [] };
        }

        updatedQuestionsCOData[questionIndex].coNames[coIndex] = value.toUpperCase();
        setQuestionsCOData(updatedQuestionsCOData);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-8xl">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Demo Feedback</h2>
                <div className="text-gray-600 text-sm mb-4">
                    <span>CP / Demo Feedback / Questions</span>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                        <Link to="/lms/StudentFeedback" className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 text-center w-full md:w-auto">
                            Back
                        </Link>
                        <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto">
                            <option>Choose...</option>
                            <option>Template 1</option>
                            <option>Template 2</option>
                        </select>
                    </div>

                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 text-center w-full md:w-auto">
                            Export questions
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 text-center w-full md:w-auto">
                            Save as new template
                        </button>
                    </div>
                </div>

                {/* Course Selector */}
                <div className="w-full mt-6">
                    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200">
                        <CourseSelector uid={uid} onUserCourseIdChange={setUserCourseId} />
                    </div>
                </div>

                <div className='w-full flex flex-col justify-between items-center max-w-8xl'>
                    {userCourseId && (
                        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 mt-8 w-full max-w-lg md:max-w-2xl lg:max-w-5xl border border-gray-200">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                                Course and Academic Year Selected
                            </h2>
                            <p className="text-gray-700">Course ID: {userCourseId}</p>
                        </div>
                    )}
                </div>
            </div>

            {userCourseId && (
                <div className="bg-white shadow-lg rounded-xl flex flex-col px-4 sm:px-6 md:px-8 py-6 mt-8 w-full max-w-8xl border border-gray-200">
                    <div className="w-full">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="label">
                            Label:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="label"
                            type="text"
                            placeholder="Enter label"
                        />

                        <div className="mt-6">
                            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="numQuestions">
                                Enter the number of questions:
                            </label>
                            <input
                                id="numQuestions"
                                type="number"
                                min="0"
                                className="bg-white border border-gray-300 text-gray-700 w-full py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleNumQuestionsChange}
                            />
                        </div>

                        {numQuestions > 0 && (
                            <div className="mt-6">
                                {Array.from({ length: numQuestions }).map((_, index) => (
                                    <div key={index} className="bg-white p-4 sm:p-6 mb-6 shadow-md w-full max-w-8xl rounded-lg border border-gray-300">
                                        <div className="flex items-center gap-4 mb-4">
                                            <input
                                                type="checkbox"
                                                id={`required-checkbox-${index}`}
                                                checked={checkedStates[index] || false}
                                                onChange={() => handleCheckboxChange(index)}
                                                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <label htmlFor={`required-checkbox-${index}`} className="text-gray-900 text-lg font-bold">
                                                Required
                                            </label>
                                        </div>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="label"
                                            type="text"
                                            placeholder="Enter label"
                                        />

                                        <div className="px-4 py-6 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0">
                                            <dt className="text-xl font-medium leading-6 text-gray-900">Multiple Choice Values</dt>
                                            <textarea
                                                className="bg-white border border-gray-300 text-gray-700 py-3 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows="6" // Adjust this value to change the height of the text box
                                                cols="50" // Adjust this value to change the width of the text box
                                            />
                                        </div>

                                        <div className="flex flex-col mt-6">
                                            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="numberofCOs">
                                                Number of COs:
                                            </label>
                                            <input
                                                id={`numCOs-${index}`}
                                                type="number"
                                                min="0"
                                                className="bg-white border border-gray-300 text-gray-700 w-full py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={(e) => handleNumCOsChange(index, e.target.value)}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                            {questionsCOData[index]?.coNames.map((_, coIndex) => (
                                                <div key={coIndex} className="flex items-center space-x-2">
                                                    <label className="block text-gray-700 text-lg font-bold" htmlFor={`coName-${index}-${coIndex}`}>
                                                        CO Name:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={`coName-${index}-${coIndex}`}
                                                        placeholder="Enter CO name"
                                                        value={questionsCOData[index].coNames[coIndex]}
                                                        onChange={(e) => handleCONameChange(index, coIndex, e.target.value)}
                                                        className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6 w-full md:w-auto"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditQuestionsPage;
