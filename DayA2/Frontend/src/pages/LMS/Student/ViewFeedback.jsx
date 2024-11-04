import React, { useState, useEffect } from 'react';
import api from "../../../api";
import { useNavigate } from 'react-router-dom';

const ViewFeedback = ({ uid, usertype }) => {
    const [FeedbackData, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [responses, setResponses] = useState([]);
    const [error, setError] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false); // New state to track submission
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFeedbackData = async () => {
            if (uid) {
                setErr("");
                setLoading(true);
                try {
                    const res = await api.get(`/api/lmsclassroom/feedback/show/student/${uid}`);
                    const fetchedFeedbackData = res.data.feedbackData;
                   
                    setFeedbackData(fetchedFeedbackData);
              

                    const initialResponses = fetchedFeedbackData[0].questions.map(() => "");
                    setResponses(initialResponses);

                    // Check if feedback has already been submitted (for students only)
                    if (usertype === 1) {
                        const submissionStatus = await api.get(`/api/lmsclassroom/feedback/status/${uid}`);
                        setHasSubmitted(submissionStatus.data.hasSubmitted);
                    }
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

    const handleSubmit = async () => {
        if (usertype === 1 && hasSubmitted) return; // Prevent submission if already submitted (students only)

        const currentTime = new Date().toISOString();

        const formattedCreatedAt = new Date(currentTime).toISOString().replace("T", " ").substring(0, 19);

        try {
            setLoading(true);

            const dataToSubmit = {
                userid: FeedbackData[0].usercourse_id,
                sid: uid,
                questions: FeedbackData[0].questions.map((q, index) => ({
                    qid: q.qid,
                    marks: responses[index],
                })),
                submitted_at: formattedCreatedAt,
            };
             console.log(dataToSubmit)
            await api.post(`/api/lmsclassroom/feedback/submit/${uid}/${FeedbackData[0].usercourse_id}`, {
                formDataForStudentSubmit: dataToSubmit
            });

            setHasSubmitted(true);
            alert('Data submitted successfully');
            setError(null);
            navigate("/feedback-student")
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
        <div className="flex justify-center">
        <div className="max-w-full w-full bg-white p-6 shadow-lg rounded-lg" style={{ marginLeft: "20px", marginRight: "20px" }}>
            {FeedbackData && FeedbackData.length > 0 && (
                <>
                    <h1 className="text-3xl font-bold text-center mb-4">
                        {FeedbackData[0].feedback_name} Feedback
                    </h1>
                    <p className="text-sm text-center mb-4 text-gray-600">* Indicates required question</p>
                    {FeedbackData[0].questions.map((question, index) => (
                        <div key={question.qid} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
                            <h2 className="font-semibold text-lg mb-2">
                                {index + 1}. {question.question_name} <span className="text-red-500">*</span>
                            </h2>
                            <div className="ml-4">
                                <div className="flex flex-col gap-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value="3"
                                            checked={responses[index] === "3"}
                                            onChange={() => handleResponseChange(index, "3")}
                                            disabled={usertype === 1 && hasSubmitted}
                                            className="mr-2"
                                        />
                                        Strongly agree
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value="2"
                                            checked={responses[index] === "2"}
                                            onChange={() => handleResponseChange(index, "2")}
                                            disabled={usertype === 1 && hasSubmitted}
                                            className="mr-2"
                                        />
                                        Agree
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value="1"
                                            checked={responses[index] === "1"}
                                            onChange={() => handleResponseChange(index, "1")}
                                            disabled={usertype === 1 && hasSubmitted}
                                            className="mr-2"
                                        />
                                        Neutral
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value="0"
                                            checked={responses[index] === "0"}
                                            onChange={() => handleResponseChange(index, "0")}
                                            disabled={usertype === 1 && hasSubmitted}
                                            className="mr-2"
                                        />
                                        Disagree
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
    
                    <div className="flex items-center justify-center mt-8">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSubmit}
                            disabled={usertype === 1 && hasSubmitted}
                        >
                            Submit
                        </button>
                    </div>
                </>
            )}
        </div>
    </div>
    
    
    );
};

export default ViewFeedback;
