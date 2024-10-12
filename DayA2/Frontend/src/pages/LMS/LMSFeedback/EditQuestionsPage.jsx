import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseSelector from '../../../component/CourseSelector/CourseSelector';
// Import your components here

const EditQuestionsPage = ({ uid }) => {

    const [checkedStates, setCheckedStates] = useState([]); // Track individual checkbox states
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [numCOs, setNumCOs] = useState(0);
    const [coNames, setCoNames] = useState([]);
    const [numQuestions, setNumQuestions] = useState(0);
    const [questionsCOData, setQuestionsCOData] = useState([]);
    const [userCourseId, setUserCourseId] = useState(null);

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

        // Initialize questionsCOData with unique objects for each question
        const initialQuestionsCOData = Array.from({ length: value }, () => ({
            numCOs: 0,
            coNames: [],
        }));

        setQuestionsCOData(initialQuestionsCOData);
    };

    const handleNumCOsChange = (questionIndex, value) => {
        const updatedQuestionsCOData = [...questionsCOData];

        // Ensure the object for the specific question exists before updating
        if (!updatedQuestionsCOData[questionIndex]) {
            updatedQuestionsCOData[questionIndex] = { numCOs: 0, coNames: [] };
        }

        updatedQuestionsCOData[questionIndex].numCOs = value;
        updatedQuestionsCOData[questionIndex].coNames = Array.from({ length: value }, () => ''); // Reset CO names to match the number of COs

        setQuestionsCOData(updatedQuestionsCOData);
    };

    const handleCONameChange = (questionIndex, coIndex, value) => {
        const updatedQuestionsCOData = [...questionsCOData];

        // Ensure the object for the specific question and CO exists before updating
        if (!updatedQuestionsCOData[questionIndex]) {
            updatedQuestionsCOData[questionIndex] = { numCOs: 0, coNames: [] };
        }

        updatedQuestionsCOData[questionIndex].coNames[coIndex] = value.toUpperCase();
        setQuestionsCOData(updatedQuestionsCOData);
    };

    return (
        <>
            <div className="p-12 bg-gray-100 min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                    <h2 className="text-xl font-semibold">Demo Feedback</h2>
                    <div className="text-gray-600 text-sm mb-4">
                        <span>CP / Demo Feedback / Questions</span>
                    </div>
                    <div className="flex space-x-4 mb-4 border-b border-gray-200">
                        <button className="py-2 px-4 border-b-0 border-blue-500 text-blue-500 font-medium">Feedback</button>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between md:max-w-4xl lg:max-w-5xl mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                            <Link
                                to="/lms/StudentFeedback"
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 text-center"
                            >
                                Back
                            </Link>
                            <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto">
                                <option>Choose...</option>
                                <option>Template 1</option>
                                <option>Template 2</option>
                            </select>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 text-center">
                                Export questions
                            </button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 text-center">
                                Save as new template
                            </button>
                        </div>
                    </div>
                    {/* Course Selector Card */}
                    <div className="w-full max-w-4xl md:max-w-4xl lg:max-w-5xl mb-6 mt-6">
                        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                            <CourseSelector uid={uid} onUserCourseIdChange={setUserCourseId} />
                        </div>
                    </div>
                    {userCourseId && (
                        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg md:max-w-2xl lg:max-w-5xl border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Course and Academic Year Selected
                            </h2>
                            <p className="text-gray-700">
                                Course ID: {userCourseId} {/* Display selected course and academic year */}
                            </p>
                        </div>
                    )}
                </div>
                {userCourseId && (
                    <div className="bg-white shadow-lg rounded-xl flex flex-col md:flex-row items-center justify-center px-4 md:px-8 py-8 mt-8 w-full max-w-4xl border border-gray-200">
                        <div className="w-full max-w-lg">
                            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="label">
                                Label:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="label"
                                type="text"
                                placeholder="Enter label"
                            />
                            <div className="px-4 py-6 sm:px-0">
                                <dt className="block text-gray-700 text-lg font-bold mb-2">Enter the number of questions:</dt>
                                <input
                                    type="number"
                                    min="0"
                                    className="bg-white border border-gray-300 text-gray-700 w-full py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleNumQuestionsChange}
                                />
                            </div>

                            {numQuestions > 0 && (
                                <div className="p-4 sm:p-6 rounded-lg">
                                    <div className="border-t border-gray-300 flex flex-content w-full max-w-4xl">
                                        <dl className="divide-y divide-gray-300">
                                            {Array.from({ length: numQuestions }).map((_, index) => (
                                                <div key={index} className="bg-white p-4 sm:p-6 mb-6 shadow-md w-full max-w-4xl">
                                                    <div className="flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-6 py-3">
                                                        <input
                                                            type="checkbox"
                                                            id={`required-checkbox-${index}`}
                                                            checked={checkedStates[index] || false}
                                                            onChange={() => handleCheckboxChange(index)}
                                                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                        />
                                                        <label
                                                            htmlFor={`required-checkbox-${index}`}
                                                            className="text-gray-900 text-lg font-medium"
                                                        >
                                                            Required
                                                        </label>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200">
                                                        <dt className="text-gray-900 text-lg sm:text-xl font-semibold">Question {index + 1}</dt>
                                                        <input
                                                            type="text"
                                                            className="mt-3 sm:mt-0 w-full sm:w-2/3 border border-gray-400 text-gray-900 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                                            placeholder={`Enter Question ${index + 1}`}
                                                        />
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200">
                                                        <dt className="text-gray-900 text-lg sm:text-xl font-semibold">Multiple Choice Values</dt>
                                                        <textarea
                                                            className="mt-3 sm:mt-0 w-full sm:w-2/3 h-24 sm:h-36 border border-gray-400 text-gray-900 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
                                                            placeholder="Enter multiple choice values here..."
                                                        />
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200">
                                                        <label
                                                            htmlFor={`numCOs-${index}`}
                                                            className="text-gray-900 text-lg sm:text-xl font-semibold"
                                                        >
                                                            How many COs for Question {index + 1}?
                                                        </label>
                                                        <input
                                                            id={`numCOs-${index}`}
                                                            name={`numCOs-${index}`}
                                                            type="number"
                                                            value={questionsCOData[index]?.numCOs || 0}
                                                            onChange={(e) => handleNumCOsChange(index, parseInt(e.target.value, 10) || 0)}
                                                            className="mt-3 sm:mt-0 w-full sm:w-1/4 border border-gray-400 bg-white text-gray-900 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                                            required
                                                        />
                                                    </div>

                                                    {questionsCOData[index]?.numCOs > 0 && (
                                                        <div className="py-4">
                                                            <label className="text-gray-900 text-lg sm:text-xl font-semibold">
                                                                Enter the CO Names for Question {index + 1}
                                                            </label>
                                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                                                                {Array.from({ length: questionsCOData[index].numCOs }).map((_, coIndex) => (
                                                                    <input
                                                                        key={coIndex}
                                                                        type="text"
                                                                        value={questionsCOData[index]?.coNames[coIndex] || ''}
                                                                        onChange={(e) => handleCONameChange(index, coIndex, e.target.value)}
                                                                        className="border border-gray-400 bg-white text-gray-900 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                                                        placeholder={`CO Name ${coIndex + 1}`}
                                                                        required
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Save Changes
                                </button>
                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default EditQuestionsPage;
