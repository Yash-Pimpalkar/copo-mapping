import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api.js';

const ManageClassroom = ({ uid }) => {
    const [classrooms, setClassRoom] = useState([]);
    const [loading, setLoading] = useState(false);
    const branchMapping = {
        1: 'COMPUTER',
        2: 'IT',
        3: 'AIDS',
        4: 'AIML',
        5: 'MECATRONICS'
    };

    // Fetch classrooms from API
    useEffect(() => {
        const fetchClassroom = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/lmsclassroom/show/${uid}`);

                const classroomData = Array.isArray(response.data) ? response.data : [response.data];
                setClassRoom(classroomData);
            } catch (error) {
                console.error('Error fetching classroom:', error);
            } finally {
                setLoading(false);
            }
        };

        if (uid) {
            fetchClassroom();
        }
    }, [uid]);

    // Handle delete classroom
    const handleDelete = async (classroomId) => {
        try {
            await api.delete(`/api/lmsclassroom/delete/${classroomId}`);
            setClassRoom(classrooms.filter((classroom) => classroom.classroom_id !== classroomId));
        } catch (error) {
            console.error('Error deleting classroom:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-center">Manage Classroom</h2>

            {loading ? (
                <div className="flex justify-center items-center">
                    <p className="text-xl font-semibold text-gray-500">Loading...</p>
                </div>
            ) : (
                // Wrap table in a div with horizontal scrolling
                <div className="overflow-x-auto">
                    <table className="table-auto min-w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Classroom Name</th>
                                <th className="px-4 py-2 text-left">Branch</th>
                                <th className="px-4 py-2 text-left">Semester</th>
                                <th className="px-4 py-2 text-left">Created Time</th>
                                <th className="px-4 py-2 text-left">Add Students</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classrooms.map((classroom) => (
                                classroom && classroom.room_name ? (
                                    <tr key={classroom.classroom_id} className="border-t">
                                        <td className="border px-4 py-2">{classroom.room_name}</td>
                                        <td className="border px-4 py-2">
                                            {branchMapping[classroom.branch] || 'Unknown Branch'}
                                        </td>
                                        <td className="border px-4 py-2">{classroom.semester}</td>
                                        <td className="border px-4 py-2">{new Date(classroom.created_at).toLocaleString()}</td>
                                        <td className="border px-4 py-2">
                                            <Link
                                                to={`/lms/Manageclassstudents/${classroom.classroom_id}`}
                                                className="text-green-500 hover:underline"
                                            >
                                                Manage Class Students
                                            </Link>
                                        </td>
                                        <td className="border px-4 py-2">
                                            <Link
                                                to={`/lms/EditCohort/${classroom.classroom_id}`}
                                                className="text-blue-500 hover:underline mr-4"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(classroom.classroom_id)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ) : null
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && classrooms.length === 0 && (
                <div className="flex justify-center items-center">
                    <p className="text-xl font-semibold text-gray-500">No classrooms found.</p>
                </div>
            )}
        </div>
    );
};

export default ManageClassroom;
