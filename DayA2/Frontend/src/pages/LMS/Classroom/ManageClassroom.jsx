import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api.js';

const ManageClassroom = ({ uid }) => {
    const [classrooms, setClassRoom] = useState({});
    const [courses, setCourses] = useState([]);
    const [distinctCourses, setDistinctCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const branchMapping = {
        1: 'COMPUTER',
        2: 'IT',
        3: 'AIDS',
        4: 'AIML',
        5: 'MECATRONICS'
    };

    // Fetch courses on mount
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

    // Fetch classrooms from API
    useEffect(() => {
        const fetchClassroom = async () => {
            try {
                console.log("uid", uid);
                const response = await api.get(`/api/lmsclassroom/show/${uid}`);
                console.log(response); // API to get all classrooms

                // Check if the response data is an object; if so, wrap it into an array
                const classroomData = Array.isArray(response.data) ? response.data : [response.data];

                setClassRoom(classroomData); // Set the state with the properly formatted array
            } catch (error) {
                console.error('Error fetching classroom:', error);
            }
        };

        if (uid) { // Only fetch if uid is available
            fetchClassroom();
        }
    }, [uid]);

    console.log(classrooms);


    // Handle delete cohort
    const handleDelete = async (classroomId) => {
        try {
            await api.delete(`/api/lmsclassroom/delete/${classroomId}`); // API to delete cohort
            setClassRoom(classrooms.filter((classroom) => classroom.classroom_id !== classroomId)); // Remove from state
        } catch (error) {
            console.error('Error deleting classroom:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Classroom</h2>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Classroom Name</th>
                        <th className="px-4 py-2">Branch</th>
                        <th className="px-4 py-2">Semester</th>
                        <th className="px-4 py-2">Created Time</th>
                        <th className="px-4 py-2">Add Students</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(classrooms).map((classroom, i) => (
                        classroom && classroom.room_name ? ( // Check if classroom and room_name are valid
                            <tr key={classroom.classroom_id}>
                                <td className="border px-4 py-2">{classroom.room_name}</td>
                                <td className="border px-4 py-2">
                                    {branchMapping[classroom.branch] || 'Unknown Branch'}
                                </td>
                                <td className="border px-4 py-2">{classroom.semester}</td>
                                <td className="border px-4 py-2">{new Date(classroom.created_at).toLocaleString()}</td>
                                <td className="border px-4 py-2"> </td>
                                <td className="border px-4 py-2">
                                    {/* Edit, Delete, and Manage Students buttons */}
                                    <Link
                                        to={`/lms/EditCohort/${classroom.classroom_id}`}
                                        className="text-blue-500 hover:underline mr-4"
                                    >
                                        Edit
                                    </Link>
                                    {/* <Link
                                        to={`/lms/ManageStudents/${classroom.classroom_id}`}
                                        className="text-green-500 hover:underline mr-4"
                                    >
                                        Manage Students
                                    </Link> */}
                                    <button
                                        onClick={() => handleDelete(classroom.classroom_id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ) : null // If classroom is null or room_name is missing, render nothing
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageClassroom;
