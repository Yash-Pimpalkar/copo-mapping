import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { backend_url } from '../../../api';

const StudentClassRoomActivities = ({ uid }) => {
  const { classroomId } = useParams(); // Get classroom_id from route parameters
  const [activities, setActivities] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Fetch activities with the classroom_id and student_id
        const response = await api.post(`/api/studentlms/classroom/getactivities/${classroomId}`, { student_id: uid });
        const data = response.data;

        // Sort activities by created_at from latest to oldest
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">Classroom Activities for Classroom {classroomId}</h2>

      <h3 className="text-lg font-semibold text-blue-700 mb-4">Existing Activities</h3>

      <div className="activities-list space-y-4">
        {activities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.assignment_id}
              className="bg-white p-6 rounded-lg shadow-md flex justify-between items-start "
              onClick={() => navigate(`/activity-detail/${activity.assignment_id}`, { state: { activity, uid, classroomId } })}
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
