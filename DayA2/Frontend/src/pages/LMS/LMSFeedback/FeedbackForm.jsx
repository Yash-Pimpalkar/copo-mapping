import React, { useState, useEffect } from 'react';
import api from "../../../api";

const FeedbackForm = ({ uid }) => {
    const [FeedbackData, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [responses, setResponses] = useState([]); // State to hold responses for each question
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedbackData = async () => {
            if (uid) {
                setErr("");
                setLoading(true);
                try {
                    const res = await api.get(`/api/lmsclassroom/feedback/show/${uid}`);
                    const fetchedFeedbackData = res.data.feedbackData;
                    setFeedbackData(fetchedFeedbackData);
                    console.log(fetchedFeedbackData);

                    // Initialize responses state based on the number of questions
                    const initialResponses = fetchedFeedbackData[0].questions.map(() => "");
                    setResponses(initialResponses);
                } catch (error) {
                    console.error("Error fetching feedback data:", error);
                    setErr(error.response?.data?.error || "An unexpected error occurred");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchFeedbackData();
    }, [uid]);

    const handleResponseChange = (questionIndex, value) => {
        const updatedResponses = [...responses];
        updatedResponses[questionIndex] = value;
        setResponses(updatedResponses);
    };

    console.log(responses);

    const handleSubmit = async () => {
        const currentTime = new Date().toISOString();
        const sid = 2;

        const formatDateForDatabase = (isoDate) => {
            const date = new Date(isoDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        const formattedCreatedAt = formatDateForDatabase(currentTime);

        try {
            setLoading(true);

            // Prepare data to submit
            const dataToSubmit = {
                userid: uid,
                sid: sid,
                questions: FeedbackData[0].questions.map((q, index) => ({
                    qid: q.qid,
                    marks: responses[index],
                })),
                submitted_at: formattedCreatedAt,
            };

            console.log("dataToSubmit", dataToSubmit);

            // Send data to the server
            await api.post(`/api/lmsclassroom/feedback/submit/${sid}/${uid}`, {
                formDataForStudentSubmit: dataToSubmit
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


    if (loading) {
        return <div>Loading...</div>;
    }

    if (err) {
        return <div>{err}</div>;
    }

    return (
        <div className="p-4">
            {FeedbackData && FeedbackData.length > 0 && (
                <>
                    <h1 className="text-2xl font-bold text-center mb-6">
                        {FeedbackData[0].feedback_name} Feedback
                    </h1>
                    {FeedbackData[0].questions.map((question, index) => (
                        <div key={question.qid} className="mb-6 p-4 border rounded shadow-sm">
                            <h2 className="font-semibold text-lg mb-2">
                                {index + 1}. {question.question_name}
                            </h2>
                            <div className="ml-4">
                                <div className="flex flex-col gap-2">
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value="3"
                                            checked={responses[index] === "3"}
                                            onChange={() => handleResponseChange(index, "3")}
                                        />
                                        Strongly agree
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value="2"
                                            checked={responses[index] === "2"}
                                            onChange={() => handleResponseChange(index, "2")}
                                        />
                                        Agree
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value="1"
                                            checked={responses[index] === "1"}
                                            onChange={() => handleResponseChange(index, "1")}
                                        />
                                        Neutral
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value="0"
                                            checked={responses[index] === "0"}
                                            onChange={() => handleResponseChange(index, "0")}
                                        />
                                        Disagree
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-col sm:flex-row items-center justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FeedbackForm;
