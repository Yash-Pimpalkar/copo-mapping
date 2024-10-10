import React from 'react';
import { Link } from 'react-router-dom';
import Example from './Header';

const EditQuestionsPage = () => {
    return (
        <>
            <Example />
            <div className="p-8 bg-gray-100 min-h-screen">
                {/* Header */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Demo Feedback</h2>
                    {/* Breadcrumb Navigation */}
                    <div className="text-gray-600 text-sm mb-4">
                        <span>CP / Demo Feedback / Questions</span>
                    </div>
                    {/* Tabs */}
                    <div className="flex space-x-4 mb-4 border-b border-gray-200">
                        <button className="py-2 px-4 border-b-2 border-blue-500 text-blue-500 font-medium">Feedback</button>
                        <button className="py-2 px-4 text-gray-600">Settings</button>
                        <button className="py-2 px-4 text-gray-600">Templates</button>
                        <button className="py-2 px-4 text-gray-600">Analysis</button>
                        <button className="py-2 px-4 text-gray-600">Responses</button>
                        <button className="py-2 px-4 text-gray-600">More</button>
                    </div>

                    {/* Action Section */}
                    <div className="flex items-center justify-between mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                        {/* Left Action Buttons */}
                        <div className="flex space-x-4">
                            <Link to="/lmsfeedback" className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300">
                                Back
                            </Link>
                            <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Add question</option>
                                <option>Multiple Choice</option>
                                <option>Short Answer</option>
                                <option>Long Answer</option>
                            </select>
                            <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Choose...</option>
                                <option>Template 1</option>
                                <option>Template 2</option>
                            </select>
                        </div>
                        {/* Right Action Buttons */}
                        <div className="flex space-x-4">
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300">
                                Export questions
                            </button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300">
                                Save as new template
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-8 bg-gray-100 min-h-screen">

            </div>
        </>
    );
};

export default EditQuestionsPage;
