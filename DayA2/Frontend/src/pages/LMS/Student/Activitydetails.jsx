import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api, { backend_url } from '../../../api';
import { toast } from 'react-toastify';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';

const ActivityDetail = () => {
  const location = useLocation();
  const { activity, uid } = location.state; // Get the activity data and user id from the state
  const [fileUpload, setFileUpload] = useState(null);
  const [fileError, setFileError] = useState(null); // State for error message
  const [uploading, setUploading] = useState(false);
  
  const [ classroomId ,setClassroomId] =useState(activity.classroom_id);
  const [submissions, setSubmissions] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);

    const [classroomDetails, setClassroomDetails] = useState(null);
    const [showAttendance, setShowAttendance] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);

  const [error, setError] = useState(null);


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



  const handleDownload = (fileId, fileName) => {
    const downloadUrl = `${backend_url}/api/lmsclassroom/activities/download/${fileId}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        setLoading(true);
        // Fetch data from the API endpoint
        const response = await api.get(`/api/studentlms/submissions/${activity.assignment_id}`);
        setSubmission(response.data); // Assuming the data is in `data.data`
        setLoading(false);
      } catch (error) {
        setError('Error fetching submission details');
        setLoading(false);
      }
    };

    if (activity.assignment_id) {
      fetchSubmissionDetails();
    }
  }, [activity.assignment_id]);
  console.log(submission)
  useEffect(() => {
    const fetchSubmissions = async () => {
      console.log('Activity:', activity); // Log activity to confirm contents
  
      try {
        const formData = new FormData();
        formData.append('assignment_id', activity.assignment_id);
        formData.append('student_id', uid);
  
        // Log the contents of FormData
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
  
        const response = await api.post('/api/studentlms/getsubmissions', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setSubmissions(response.data.submissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSubmissions();
  }, [activity.assignment_id, uid]); // Use only necessary dependencies

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
  const fetchSubmissions = async () => {
    console.log('Activity:', activity); // Log activity to confirm contents

    try {
      const formData = new FormData();
      formData.append('assignment_id', activity.assignment_id);
      formData.append('student_id', uid);

      // Log the contents of FormData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await api.post('/api/studentlms/getsubmissions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSubmissions(response.data.submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };
  
 console.log(submissions)
 const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    const maxFileSize = activity.max_file_size * 1024; // Convert KB to bytes
    const allowedTypes = activity.file_type_allowed.split(',').map(type => type.trim().toLowerCase().replace('.', ''));
    
    const validFiles = [];
    
    // Validate each file
    for (let file of files) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (!allowedTypes.includes(fileType)) {
        setFileError(`File type "${fileType}" not allowed. Allowed types: ${activity.file_type_allowed}`);
        setFileUpload(null);
        return;
      } else if (file.size > maxFileSize) {
        setFileError(`File size of "${file.name}" should not exceed ${activity.max_file_size} KB`);
        setFileUpload(null);
        return;
      } else {
        validFiles.push(file); // Add valid file to the array
      }
    }
    
    // Proceed if all files are valid
    if (validFiles.length === 0) return;
    
    setFileError(null);
    setFileUpload(validFiles); // Store the valid files
    const formData = new FormData();
  
    // Append each valid file to FormData
    validFiles.forEach(file => formData.append("files", file));
    formData.append("student_id", uid);
    formData.append("classroom_id", activity.classroom_id);
    formData.append("assignment_id", activity.assignment_id);
  
    setUploading(true);
  
    try {
      await api.post(`/api/studentlms/submission/${activity.assignment_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Files uploaded successfully!");
      setFileUpload(null);
      fetchSubmissions();
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("File upload failed!");
    } finally {
      setUploading(false);
    }
  };
  
 

 console.log(activity.isSubmitted)

 const handleDelete=()=>{

  }


  const handleSubmission = async () => {
    console.log("Button clicked!"); // Debugging log
    setUploading(true); // Start loading
    try {
      // Make POST request to update the submission timestamp
      const response = await api.post(`/api/studentlms/markasdone/${submission.submission_id}`);

      if (response.status === 200) {
        alert("Submission marked successfully!");
        // Optionally, update the activity state to reflect the new submission status
        // setActivity(prev => ({ ...prev, isSubmitted: true }));
      } else {
        console.error("Error updating submission:", response.data.error);
        alert("Failed to mark submission.");
      }
    } catch (error) {
      console.error("Error updating submission:", error);
      alert("Failed to mark submission due to a network error.");
    } finally {
      setUploading(false); // Stop loading
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
      &larr; Back to Activities
    </button>
  
    {/* Container for responsive layout */}
    <div className="flex flex-col lg:flex-row"> {/* Stack on small screens, side-by-side on large */}
      
      {/* Left Section: Activity Info */}
      <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-md lg:mr-4 mb-4 lg:mb-0">
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">{activity.title}</h3>
        <p className="text-gray-500 text-sm mb-2">
          {activity.teacher_name} • {new Date(activity.created_at).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className="text-gray-600 text-green-500 text-sm mb-4">{submission?.marks || "N|A"} points</p>
        <p className="text-gray-700 mb-4">{activity.description}</p>
  
        <p className="text-sm text-red-500 mb-4">
          Due: {new Date(activity.deadline).toLocaleString('en-US', {
            day: 'numeric',
            month: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </p>
  
        {/* Files associated with the activity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {Array.isArray(activity.files) && activity.files.length > 0 ? (
            activity.files.map((file, index) => {
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
            })
          ) : (
            <p className="text-gray-500">No files uploaded</p>
          )}
        </div>
  
        {/* Class Comments */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Class comments</h4>
          <p className="text-blue-500 text-sm cursor-pointer">Add a class comment</p>
        </div>
      </div>
  
      {/* Right Section: Your Work */}
      <div className="lg:w-1/4 bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">Your work</h4>
        <p className={`text-sm mb-2 ${activity.isSubmitted ? "text-green-500" : "text-red-500"}`}>
          {activity.isSubmitted ? "Submitted" : "Missing"}
        </p>
  
        {/* Submissions display */}
        <div className="mb-4">
          {submissions.map((file) => {
            const fileExtension = file.file_name.split('.').pop().toUpperCase();
            return (
              <div key={file.file_id} className="flex items-center justify-between border p-2 rounded mb-2">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 truncate" style={{ maxWidth: '150px' }} title={file.file_name}>
                    {file.file_name}
                  </span>
                  <span className="ml-2 text-xs text-gray-500" style={{ maxWidth: '50px' }}>
                    ({fileExtension})
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(file.file_id, file.file_name)}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            );
          })}
        </div>
  
        {/* File upload section with file type and size restriction */}
        {activity.file_type_allowed && activity.file_type_allowed.toLowerCase() !== 'none' && (
          <div className="mb-4">
            <label className="flex items-center justify-center cursor-pointer border border-gray-300 rounded-lg p-2 mb-4 text-blue-600 hover:bg-gray-100 transition">
              <input
                type="file"
                multiple
                onChange={handleFileUpload} // Combined function
                className="hidden"
                accept={activity.file_type_allowed}
              />
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add or create
              </span>
            </label>
  
            {/* Display error message if file type or size is invalid */}
            {fileError && <p className="text-xs text-red-500 mb-2">{fileError}</p>}
  
            <button
              onClick={handleSubmission}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
              
            >
              {uploading ? "Uploading..." : activity.isSubmitted ? "Re-submit" : "Mark as done"}
            </button>
          </div>
        )}
  
        {/* Private comments section */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">Private comments</h4>
          <p className="text-blue-500 text-sm cursor-pointer">Add comment to {activity.teacher_name}</p>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ActivityDetail;
