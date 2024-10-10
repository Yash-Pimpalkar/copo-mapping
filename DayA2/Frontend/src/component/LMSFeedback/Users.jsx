import React from 'react';

const Users = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Demo Feedback</h2>
                {/* Tabs */}
                <div className="flex space-x-4 mt-4 border-b border-gray-200">
                    <button className="py-2 px-4 border-b-2 border-blue-500 text-blue-500 font-medium">Feedback</button>
                    <button className="py-2 px-4 text-gray-600">Settings</button>
                    <button className="py-2 px-4 text-gray-600">Templates</button>
                    <button className="py-2 px-4 text-gray-600">Analysis</button>
                    <button className="py-2 px-4 text-gray-600">Responses</button>
                    <button className="py-2 px-4 text-gray-600">More</button>
                </div>

                {/* Feedback Box */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                    <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded border border-gray-300 hover:bg-gray-300">
                        Mark as done
                    </button>
                    <p className="mt-4 text-gray-700">
                        <span className="font-semibold">Opened:</span> Thursday, 4 July 2024, 1:15 AM<br />
                        <span className="font-semibold">Closes:</span> Friday, 5 July 2024, 1:15 AM
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-6">
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300">
                        Edit questions
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300">
                        Preview questions
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Answer the questions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Users;
