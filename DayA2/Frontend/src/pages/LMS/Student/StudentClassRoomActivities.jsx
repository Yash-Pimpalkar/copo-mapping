import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { backend_url } from '../../../api';
import { toast } from 'react-toastify';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';

const StudentClassRoomActivities = ({ uid }) => {
  const { classroomId } = useParams(); // Get classroom_id from route parameters
  const [activities, setActivities] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
    const [classroomDetails, setClassroomDetails] = useState(null);
    const [showAttendance, setShowAttendance] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassroomDetails = async () => {
      if (!classroomId) {
        toast.error('Classroom ID is required');
        return;
      }

      setLoading(true);
      try {
        const response = await api.get(`/api/lmsclassroom/classroom/${classroomId}`);
        setClassroomDetails(response.data);
        toast.success('Classroom details fetched successfully');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error('Classroom not found');
        } else {
          toast.error('Failed to fetch classroom details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClassroomDetails();
  }, [classroomId]);
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Fetch activities with the classroom_id and student_id
        const response = await api.post(`/api/studentlms/classroom/getactivities/${classroomId}`, { student_id: uid });
        console.log(response.data)
        const data = response.data;
      
        // Sort activities  by created_at from latest to oldest
        const sortedActivities = data.activities.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setActivities(sortedActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, [classroomId, uid]);

  const handleDownload = (fileId, fileName) => {
    const downloadUrl = `${backend_url}/api/lmsclassroom/activities/download/${fileId}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (event) => {
    setFileUpload(event.target.files[0]);
  };

  const handleFileUpload = async (assignmentId) => {
    if (!fileUpload) return;

    const formData = new FormData();
    formData.append("file", fileUpload);
    formData.append("assignment_id", assignmentId);
    formData.append("student_id", uid);

    try {
      await api.post(`${backend_url}/api/lmsclassroom/activities/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
      setFileUpload(null); // Reset file upload state
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed!");
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await api.get(`/api/lmsclassroom/attendance/percentage/${classroomId}`);
      setAttendanceData(response.data);
    } catch (error) {
      toast.error('Failed to fetch attendance data');
    }
  };

  useEffect(() => {



    const fetchAttendancePercentage = async () => {
      if (!uid || !classroomId) {
        alert('Please enter both Student ID and Classroom ID');
        return;
      }
  
      setLoading(true);
      try {
        const response = await api.get(`/api/lmsclassroom/attendance/percentage/${uid}/${classroomId}`);
        // console.log(response.data)
        setAttendanceData(response.data);
        
      } catch (error) {
        if (error.response && error.response.status === 404) {
          
        } else {
          alert('Failed to fetch attendance percentage');
        }
      } finally {
        setLoading(false);
      }
    };

    if (uid && classroomId) {
      fetchAttendancePercentage();
    }
  }, [uid, classroomId]);
  const handleUserIconClick = () => {
    setShowAttendance(!showAttendance);
    if (!attendanceData) {
      fetchAttendanceData();
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between w-full bg-white shadow-lg p-4 rounded-lg">
        {/* Left section with menu icon and classroom title */}
        <div className="flex items-center space-x-4">
         
          <div className="flex items-center space-x-2">
            <FaChalkboardTeacher className="text-3xl text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-800">Classroom</h2>
            <span className="text-gray-500">{'>'}</span>
            {loading ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              <div className="flex flex-col ">
              <h2 className="text-base font-semibold text-blue-700">
                {classroomDetails?.room_name || 'N/A'}
              </h2>
              <p className="text-xs font-medium text-gray-600 ">
                {classroomDetails?.teacher_name || 'N/A'}
              </p>
            </div>
            )}
          </div>
        </div>

        {/* Right section with more options and user icon */}
        <div className="flex items-center space-x-4">
          {/* <HiOutlineDotsVertical className="text-2xl text-gray-500 cursor-pointer" /> */}
          <AiOutlineUser   onClick={handleUserIconClick} className="text-3xl text-blue-600 cursor-pointer" />
        </div>
      </div>
      {showAttendance && (
        attendanceData ? (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-inner">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-800">
                Attendance Details:
              </h3>
              <div className="flex items-center mt-4 md:mt-0">
                <span className="text-lg font-semibold text-gray-700 mr-2">
                  Attendance Percentage:
                </span>
                <span className="text-xl font-bold text-blue-700">
                  {parseFloat(attendanceData.attendance_percentage).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center text-gray-500">
            <p>No attendance data available for this classroom.</p>
          </div>
        )
      )}
<button
      className="text-blue-500 mb-4 mt-1"
      onClick={() => navigate(-1)}
    >
      &larr; Back to All ClassRoom
    </button>

      <h3 className="text-lg font-semibold text-blue-700 mb-4">Existing Activities</h3>

      <div className="activities-list space-y-4">
        {activities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.assignment_id}
              className="bg-white p-6 rounded-lg shadow-md flex justify-between items-start "
              onClick={() => navigate(`/lms/activity-detail/${activity.assignment_id}`, { state: { activity, uid, classroomId } })}
            >
              <div className="flex flex-col w-3/4"
              >
                <h4 className="text-xl font-semibold text-blue-700 mb-2">{activity.title}</h4>

                <p className="text-gray-500 text-sm mb-4">
                  Created: {new Date(activity.created_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                <p className="text-gray-700 text-base mb-4">{activity.description}</p>

                {/* Submission Status */}
                <p className="text-sm mb-4">
                  Status: {activity.isSubmitted ? (
                    <span className="text-green-500">Submitted</span>
                  ) : (
                    <span className="text-red-500">Pending</span>
                  )}
                </p>

                {/* File Upload Input for Pending Activities */}
              

                {/* Files Section */}
                {Array.isArray(activity.files) && activity.files.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {activity.files.map((file, index) => {
                      const fileExtension = file.file_name.split('.').pop();

                      return (
                        <div
                          key={index}
                          className="border p-3 rounded-md flex flex-col items-center cursor-pointer hover:bg-gray-50 transition"
                          onClick={() => handleDownload(file.file_id, file.file_name)}
                        >
                          <span className="text-blue-500 text-sm truncate w-full text-center mb-2" style={{ maxWidth: '150px' }}>
                            {file.file_name}
                          </span>
                          <p className="text-xs text-gray-500">Extension: {fileExtension}</p>
                          <p className="text-xs text-gray-500">File Size: {(file.file_size / 1024).toFixed(2)} KB</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="text-right w-1/4">
                <p className="text-sm text-red-500">
                  Deadline: {new Date(activity.deadline).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentClassRoomActivities;
