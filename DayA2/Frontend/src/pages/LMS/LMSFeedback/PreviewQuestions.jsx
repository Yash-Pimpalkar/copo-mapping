import React, { useState, useEffect } from 'react';
import api from "../../../api";

const PreviewQuestions = ({ uid }) => {
    const [FeedbackData, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        const fetchFeedbackData = async () => {
            if (uid) {
                setErr("");
                setLoading(true);
                try {
                    const res = await api.get(`/api/lmsclassroom/feedback/show/teacher/${uid}`);
                    const fetchedFeedbackData = res.data.feedbackData;
                    setFeedbackData(fetchedFeedbackData);
                    console.log(fetchedFeedbackData);
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
                                <div className="flex flex-col">
                                    <label>
                                        <input type="radio" name={`question-${index}`} value="strongly-agree" />
                                        Strongly agree
                                    </label>
                                    <label>
                                        <input type="radio" name={`question-${index}`} value="agree" />
                                        Agree
                                    </label>
                                    <label>
                                        <input type="radio" name={`question-${index}`} value="neutral" />
                                        Neutral
                                    </label>
                                    <label>
                                        <input type="radio" name={`question-${index}`} value="disagree" />
                                        Disagree
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default PreviewQuestions;
