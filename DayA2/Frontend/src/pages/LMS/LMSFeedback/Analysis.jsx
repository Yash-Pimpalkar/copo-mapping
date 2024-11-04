import React, { useEffect, useState } from 'react';
import api from '../../../api';

const AnalysisDetails = ({ usercourseid }) => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [attainmentThreshold, setAttainmentThreshold] = useState(50); // Default threshold
    const [attainmentData, setAttainmentData] = useState([]);
    const [coAttainmentData, setCoAttainmentData] = useState([]); // State for CO average attainment

    useEffect(() => {
        if (!usercourseid) return;

        const fetchFeedbackDetails = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/lmsclassroom/feedback/attainment/teacher/${usercourseid}`);
                setFeedbackData(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching feedback details:", err);
                setError("Failed to load feedback details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbackDetails();
    }, [usercourseid]);

    useEffect(() => {
        if (feedbackData.length === 0) return;

        const calculateAttainment = () => {
            const questionData = {};
            const coData = {}; // For calculating CO-wise average attainment based on each qid's attainment

            // Step 1: Calculate attainment for each qid
            feedbackData.forEach(entry => {
                const { qid, conames, marks, sid } = entry;
                
                // Only consider entries where marks are not null
                if (marks !== null) {
                    const marksPercentage = (marks / 3) * 100; // Calculate percentage based on marks out of 3
                    
                    if (!questionData[qid]) {
                        questionData[qid] = { conames, totalStudents: 0, passedStudents: 0 };
                    }
                    
                    questionData[qid].totalStudents += 1;

                    // Count as passed if marks percentage is >= attainment threshold
                    if (marksPercentage >= attainmentThreshold) {
                        questionData[qid].passedStudents += 1;
                    }
                }
            });

            // Step 2: Calculate attainment percentage for each question and store it per CO
            Object.keys(questionData).forEach(qid => {
                const data = questionData[qid];
                const attainment = (data.passedStudents / data.totalStudents) * 100;

                // Split conames by comma and accumulate attainment percentages for each CO
                data.conames.split(', ').forEach(co => {
                    if (!coData[co]) {
                        coData[co] = { totalAttainment: 0, count: 0 };
                    }
                    coData[co].totalAttainment += attainment; // Accumulate the attainment for this CO
                    coData[co].count += 1; // Count the occurrences for averaging
                });
            });

            // Step 3: Calculate average attainment for each CO and ensure distinct conames
            const calculatedCoAttainment = Object.keys(coData).map(co => {
                const coInfo = coData[co];
                const averageAttainment = (coInfo.totalAttainment / coInfo.count).toFixed(2);

                // Categorize based on the average attainment
                let categorization = 0;
                if (averageAttainment > 70) categorization = 3;
                else if (averageAttainment >= 50) categorization = 2;
                else if (averageAttainment >= 40) categorization = 1;

                return {
                    coName: co,
                    coAverage: averageAttainment,
                    categorization
                };
            });

            setAttainmentData(Object.keys(questionData).map(qid => ({
                qid,
                conames: questionData[qid].conames,
                attainment: ((questionData[qid].passedStudents / questionData[qid].totalStudents) * 100).toFixed(2),
                totalStudents: questionData[qid].totalStudents,
                passedStudents: questionData[qid].passedStudents
            })));

            setCoAttainmentData(calculatedCoAttainment);
        };

        calculateAttainment();
    }, [feedbackData, attainmentThreshold]);

    const handleThresholdChange = (e) => {
        const value = e.target.value;
        const numericValue = parseFloat(value); // Convert text input to a number
    
        if (!isNaN(numericValue)) { // Only update if the input is a valid number
            setAttainmentThreshold(numericValue);
        } else {
            setAttainmentThreshold(0); // Set to 0 or some default if the input is not a number
        }
    };

    const handleUpdateAttainment = async () => {
        try {
            console.log(coAttainmentData)
            await api.post(`/api/lmsclassroom/feedback/attainment/update`, {
                usercourseid,
                coAttainmentData,
            });
            alert("Attainment data updated successfully!");
        } catch (error) {
            console.error("Error updating attainment data:", error);
            alert("Failed to update attainment data.");
        }
    };
    // const calculatedCoAttainment = Object.keys(coData).map(co => {
    //     const coInfo = coData[co];
    //     const averageAttainment = (coInfo.totalAttainment / coInfo.count).toFixed(2);
    
    //     // Categorize based on the average attainment
    //     let categorization = 0;
    //     if (averageAttainment > 70) categorization = 3;
    //     else if (averageAttainment >= 50) categorization = 2;
    //     else if (averageAttainment >= 40) categorization = 1;
    
    //     return {
    //         coName: co,
    //         coAverage: averageAttainment,
    //         categorization // This includes the categorization in the coAttainmentData array
    //     };
    // });
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Total Students Passed Each Question</h2>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Total Students Passed with = PERCENTAGE %</label>
                <input
                    type="text"
                    value={attainmentThreshold}
                    onChange={handleThresholdChange}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                />
            </div>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-2 border border-blue-700">TYPE</th>
                        {attainmentData.map((data, index) => (
                            <th key={index} className="p-2 border border-blue-700">Q{data.qid}</th>
                        ))}
                    </tr>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-2 border border-blue-700"></th>
                        {attainmentData.map((data, index) => (
                            <th key={index} className="p-2 border">{data.conames}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2 border">Total students passed with = {attainmentThreshold} %</td>
                        {attainmentData.map((data, index) => (
                            <td key={index} className="p-2 border text-center">{data.passedStudents}</td>
                        ))}
                    </tr>
                    <tr>
                        <td className="p-2 border">Students Attempted Per Question</td>
                        {attainmentData.map((data, index) => (
                            <td key={index} className="p-2 border text-center">{data.totalStudents}</td>
                        ))}
                    </tr>
                    <tr>
                        <td className="p-2 border">CO Attainment</td>
                        {attainmentData.map((data, index) => (
                            <td key={index} className="p-2 border text-center">{data.attainment} %</td>
                        ))}
                    </tr>
                </tbody>
            </table>

            <h3 className="text-xl font-bold mt-8 mb-4">CO NAME AVERAGE ATTAINMENT</h3>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-2 border border-blue-700">CO NAME</th>
                        <th className="p-2 border border-blue-700">CO AVERAGE</th>
                        <th className="p-2 border border-blue-700">CATEGORIZATION</th>
                    </tr>
                </thead>
                <tbody>
                    {coAttainmentData.map((data, index) => (
                        <tr key={index}>
                            <td className="p-2 border">{data.coName}</td>
                            <td className="p-2 border text-center">{data.coAverage} %</td>
                            <td className="p-2 border text-center">{data.categorization}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-8">
                <button
                    onClick={handleUpdateAttainment}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                    Update Attainment
                </button>
            </div>
        </div>
    );
};

export default AnalysisDetails;
