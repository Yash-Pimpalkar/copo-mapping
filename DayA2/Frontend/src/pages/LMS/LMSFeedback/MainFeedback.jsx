import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dummyfeedback from './dummyfeedback';

const FeedbackPage = () => {
    const [showDummyFeedback, setShowDummyFeedback] = useState(false);

    // Function to toggle the display of dummyfeedback content
    const handlePreviewClick = () => {
        setShowDummyFeedback(!showDummyFeedback);
    };

    return (
        <>
            <div className="p-4 sm:p-8 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100">
                {/* Header */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-8xl">
                    <h2 className="text-lg sm:text-xl font-semibold">Demo Feedback</h2>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-between sm:justify-start space-y-2 sm:space-y-0 space-x-0 sm:space-x-4 mt-4 border-b border-gray-200">
                        <button className="py-2 px-4 w-full sm:w-auto border-b-0 border-blue-500 text-blue-500 font-medium">Feedback</button>
                        <button className="py-2 px-4 w-full sm:w-auto text-gray-600">Settings</button>
                        <button className="py-2 px-4 w-full sm:w-auto text-gray-600">Templates</button>
                        <button className="py-2 px-4 w-full sm:w-auto text-gray-600">Analysis</button>
                        <button className="py-2 px-4 w-full sm:w-auto text-gray-600">Responses</button>
                        <button className="py-2 px-4 w-full sm:w-auto text-gray-600">More</button>
                    </div>

                    {/* Feedback Box */}
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                        <p className="mt-4 text-gray-700">
                            <span className="font-semibold">Opened:</span> Thursday, 4 July 2024, 1:15 AM<br />
                            <span className="font-semibold">Closes:</span> Friday, 5 July 2024, 1:15 AM
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mt-6">
                        <Link to='/lms/editlmsquestions' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:text-white w-full sm:w-auto text-center'>
                            Edit Questions
                        </Link>
                        <button
                            onClick={handlePreviewClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:text-white w-full sm:w-auto text-center"
                        >
                            Preview questions
                        </button>
                        <Link to="" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:text-white w-full sm:w-auto text-center">
                            Answer the questions
                        </Link>
                    </div>

                    {/* Dummy Feedback Content */}
                    {showDummyFeedback && (
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                            <Dummyfeedback />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FeedbackPage;
