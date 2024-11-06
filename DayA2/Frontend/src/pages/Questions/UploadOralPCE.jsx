import React, { useEffect, useState } from 'react';
import api from '../../api';
import LoadingButton from "../../component/Loading/Loading";

const UploadOralPCE = ({ uid }) => {
    const [courses, setCourses] = useState([]);
    const [distinctCourses, setDistinctCourses] = useState([]);
    const [coData, setCoData] = useState({});
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const [formData, setFormData] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [userCourseId, setUserCourseId] = useState(null);
    const [submittingKey, setSubmittingKey] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [numCOs, setNumCOs] = useState({});
    const [coNames, setCoNames] = useState([]);
    const [numAssignments, setNumAssignments] = useState({});
    const formNames = { oralpceid: "Oral Pce" };

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
        setQuestions([]);
        setFormData({});
        setUserCourseId(
            courses.find(course => course.course_name === selectedCourse)?.usercourse_id || null
        );
    };

    const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        setSelectedYear(selectedYear);
        setQuestions([]);
        setFormData({});
    };

    console.log(typeof formData);

    const handleNumAssignmentsChange = (key, value) => {
        setNumAssignments((prev) => ({
            ...prev,
            [key]: parseInt(value, 10) || 0,
        }));
    };

    const handleNumQuestionsChange = (event) => {
        const num = Math.min(parseInt(event.target.value, 10) || 0, 10); // Limit to max 10 questions
        setNumQuestions(num);
        setQuestions(Array.from({ length: num }, (_, index) => ({
            qid: index + 1,
            colname: '',
            conames: '',
            marks: 0
        })));
    };

    const handleFormChange = (index, field, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [index]: {
                ...prevFormData[index],
                [field]: value
            }
        }));
    };

    const handleCOColNameChange = (questionIndex, coIndex, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [questionIndex]: {
                ...prevFormData[questionIndex],
                coNames: {
                    ...(prevFormData[questionIndex]?.coNames || []),
                    [coIndex]: value
                }
            }
        }));
    };





    // const handleNumCOsChange = (key, index, value) => {
    //     setNumCOs((prev) => ({
    //         ...prev,
    //         [key]: {
    //             ...(prev[key] || {}),
    //             [index]: parseInt(value, 10) || 0,
    //         },
    //     }));
    // };

    Object.values(formData).forEach((item, index) => {
        console.log(`Marks for item ${index}:`, item.marks);
    });

    Object.values(formData).forEach((item, index) => {
        if (item.coNames) {
            console.log(`COs for item ${index}:`, Object.values(item.coNames));
        } else {
            console.log(`COs for item ${index}: No CO names available`);
        }
    });

    console.log(formData);

    const handleFormSubmit = async (key) => {
        if (!userCourseId) {
            alert("Please select a valid course and academic year.");
            return;
        }

        console.log(formData);

        // Prepare question-related data (formData) and COs (coData)
        const coDataForKey = coData[key] || {};
        const numAssignmentsForKey = numQuestions || 0;



        // Check for missing marks
        const marks = Object.values(formData).map((item) => Number(item.marks) || 0);

        console.log("Marks Array:", marks);

        // Collecting all the colnames in an array
        const colnamesArray = Object.values(formData).map((item) => item.colname);

        console.log("Colnames Array:", colnamesArray);

        if (!marks) {
            alert('Please complete the "Max Marks" field');
            return;
        }

        // Prepare CO names
        const coNames = Object.values(coDataForKey).filter(Boolean);
        if (coNames.length === 0) {
            alert('Please complete the CO Names');
            return;
        }

        // Prepare CO names for each question
        const coNamesArray = Object.values(formData).map((item) =>
            item.coNames ? Object.values(item.coNames) : []
        );

        console.log("COarrs:", coNamesArray);

        console.log("COs:", coNames);

        // Prepare data to submit
        const dataToSubmit = {
            usercourseid: userCourseId,
            numAssignments: numAssignmentsForKey,
            questions: [
                {
                    question: colnamesArray,
                    questionforcol: coNamesArray,
                    maxMarks: marks,
                    coNames: coNames
                }
            ]
        };

        // Submit via API
        try {
            setLoading(true);
            await api.post("/api/oral/create/pce", dataToSubmit);
            alert("Data submitted successfully!");
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Failed to submit data.");
        } finally {
            setLoading(false);
        }
    };

    const handleNumCOsChange = (event) => {
        const value = parseInt(event.target.value, 10) || 0;
        setNumCOs(value);
        setCoNames(Array(value).fill('')); // Reset CO names to match the number of COs
    };

    const handleCOCountChange = (key, value) => {
        setNumCOs(prevCOs => ({
            ...prevCOs,
            [key]: value
        }));
    };

    const handleCONameChange = (key, coIndex, value) => {
        setCoData(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                [`coName_${coIndex}`]: value
            }
        }));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Upload Oral (PCE)</h1>

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
                    <option value="">-- Select a Course --</option>
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
                        <option value="">-- Select Academic Year --</option>
                        {courses
                            .filter(course => course.course_name === selectedCourse)
                            .map((course, index) => (
                                <option key={index} value={course.academic_year}>
                                    {course.academic_year}
                                </option>
                            ))}
                    </select>
                </div>
            )}

            {selectedCourse && selectedYear && (
                <>
                    <div className="mb-4">
                        <label htmlFor="num-questions" className="block text-sm font-medium text-gray-700">
                            Number of Questions
                        </label>
                        <input
                            id="num-questions"
                            type="text"
                            min="0"
                            max="10"
                            value={numQuestions}
                            onChange={handleNumQuestionsChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {questions.map((question, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Question {index + 1}
                            </label>
                            <input
                                type="text"
                                placeholder="Column Name"
                                value={formData[index]?.colname || ''}
                                onChange={(e) => handleFormChange(index, 'colname', e.target.value)}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <label>How many COs for this column?</label>
                            <input
                                id="numCOs"
                                name="numCOs"
                                type="number"
                                min="0"
                                max="10"
                                value={formData[index]?.numCOs || 0}
                                onChange={(e) => handleFormChange(index, 'numCOs', parseInt(e.target.value))}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
                                required
                            />
                            {/* <label className="block text-sm font-medium text-gray-700 uppercase">
                                Enter the CO Names
                            </label> */}
                            <div className="grid grid-cols-3 gap-2 mt-1">
                                {Array.from({ length: formData[index]?.numCOs || 0 }).map((_, coIndex) => (
                                    <input
                                        key={coIndex}
                                        type="text"
                                        value={formData[index]?.coNames?.[coIndex] || ''}
                                        onChange={(e) => handleCOColNameChange(index, coIndex, e.target.value.toUpperCase())}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
                                        required
                                    />
                                ))}
                            </div>
                            <label className="block text-sm font-medium text-gray-700 uppercase">
                                Enter the Marks
                            </label>
                            <input
                                type="text"
                                placeholder="Marks"
                                value={formData[index]?.marks || 0}
                                onChange={(e) => handleFormChange(index, 'marks', e.target.value)}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    ))}


                    <div className="mb-4">
                        <label htmlFor="num-cos" className="block text-sm font-medium text-gray-700">
                            Number of COs
                        </label>
                        <input
                            id="num-cos"
                            type="text"
                            value={numCOs["oralpce_id"] || 0}
                            onChange={(e) => handleCOCountChange("oralpce_id", e.target.value)}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {Array.from({ length: numCOs["oralpce_id"] || 0 }).map((_, coIndex) => (
                        <div key={coIndex} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                CO Name {coIndex + 1}
                            </label>
                            <input
                                type="text"
                                value={coData["oralpce_id"]?.[`coName_${coIndex}`] || ""}
                                onChange={(e) => handleCONameChange("oralpce_id", coIndex, e.target.value)}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    ))}

                    <button
                        onClick={() => handleFormSubmit("oralpce_id")}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 w-full"
                        disabled={loading || submittingKey === "oralpce_id"}
                    >
                        {submittingKey === "oralpce_id" ? <LoadingButton /> : "Submit"}
                    </button>
                </>
            )}
        </div>
    );
};

export default UploadOralPCE;
