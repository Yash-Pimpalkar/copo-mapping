import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { backend_url } from '../../../api';

const ClassroomActivities = ({ uid }) => {
  const { classroomId } = useParams(); // Get classroom_id from the URL
  console.log(classroomId)
  const navigate = useNavigate()
  // Predefined list of allowed file types
  const fileTypes = ['None', 'pdf', 'docx', 'zip', 'png', 'jpg', 'pptx', 'txt'];

  // State to manage activities and form inputs
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    file_type_allowed: ['pdf'], // Set default to include 'pdf'
    max_file_size: '1024', // Default value for max file size
    deadline: '',
    file: null, // State to manage uploaded file
  });
  const [selectAll, setSelectAll] = useState(false); // State to manage "Select All" checkbox
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  // Fetch existing activities for the classroom
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get(`/api/lmsclassroom/activities/show/${classroomId}`);
        setActivities(response.data);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Failed to load activities.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [classroomId]);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p>{error}</p>;
  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  // Handle file upload
//   const handleFileChange = (e) => {
//     setNewActivity({ ...newActivity, file: e.target.files[0] }); // Store the first file
//   };

  // Handle file type selection
  const handleFileTypeChange = (type) => {
    const updatedFileTypes = newActivity.file_type_allowed.includes(type)
      ? newActivity.file_type_allowed.filter((fileType) => fileType !== type)
      : [...newActivity.file_type_allowed, type];

    // If "None" is checked, reset the allowed types to include only "None"
    if (type === 'None') {
      setNewActivity({ ...newActivity, file_type_allowed: ['None'] });
    } else {
      setNewActivity({ ...newActivity, file_type_allowed: updatedFileTypes.filter((fileType) => fileType !== 'None') });
    }
  };

  // Handle "Select All" logic
  const handleSelectAllChange = () => {
    if (selectAll) {
      setNewActivity({ ...newActivity, file_type_allowed: [] }); // Reset to no file types
    } else {
      setNewActivity({ ...newActivity, file_type_allowed: fileTypes.filter((type) => type !== 'None') }); // Select all file types
    }
    setSelectAll(!selectAll);
  };

  // Handle form submission (create new activity)
 // Modify handleFileChange to handle multiple files
const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setNewActivity({ ...newActivity, files }); // Store multiple files in the state
  };
  
  // Modify handleSubmit to append multiple files to formData
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(); // Create a new FormData object
    
    // Append form data fields
    formData.append('title', newActivity.title);
    formData.append('description', newActivity.description);
    formData.append('max_file_size', newActivity.max_file_size);
    formData.append('deadline', newActivity.deadline);
    formData.append('file_type_allowed', JSON.stringify(newActivity.file_type_allowed));
    formData.append('teacher_id', uid); // Append teacher ID
  
    // Append multiple files to FormData
    if (newActivity.files && newActivity.files.length > 0) {
        newActivity.files.forEach((file) => {
          formData.append('files', file); // Use 'files' as the key for all files
        });
      }
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
    try {
      const response = await api.post(`/api/lmsclassroom/activities/create/${classroomId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      console.log(response.data);
  
      const newCreatedActivity = response.data;
  
      // Append the new activity to the list of activities
      setActivities([newCreatedActivity, ...activities]);
  
      // Reset the form after successful submission
      setNewActivity({
        title: '',
        description: '',
        file_type_allowed: ['pdf'],
        max_file_size: '1024',
        deadline: '',
        files: [], // Reset the files array
      });
      setSelectAll(false);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };
  console.log(activities)


    const handleDownload = (fileId, fileName) => {
      // Construct the URL for downloading the file
    
      const downloadUrl = `${backend_url}/api/lmsclassroom/activities/download/${fileId}`;
  
      // Create an anchor element for downloading
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName); // Set the name of the file to be downloaded
  
      // Append the link to the document and trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up after the download
    };

    const handleOpenFile = (fileId) => {
        const fileUrl = `${backend_url}/api/lmsclassroom/activities/download/${fileId}`;
        
        // Open the file in a new tab
        window.open(fileUrl, '_blank');
      };

      const handleViewSubmissions = (assignmentId) => {
        navigate(`/lms/viewclassroom/${classroomId}/submissions/${assignmentId}`);
      };
    
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Classroom Activities for Classroom {classroomId}</h2>

      {/* Button to Show Form */}
      {!showForm ? (
        <button 
          onClick={() => setShowForm(true)} 
          className="bg-blue-500 text-white p-2 rounded-lg mb-4"
        >
          Create New Activity
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Create New Activity</h3>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Activity Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newActivity.title}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newActivity.description}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
  <label className="block text-gray-700 mb-2" htmlFor="file">
    Upload Files
  </label>
  <input
    type="file"
    id="file"
    name="file"
    multiple // Allow multiple file uploads
    onChange={handleFileChange}
    className="w-full border p-2 rounded-lg"
    accept={newActivity.file_type_allowed.join(',')} // Allow only selected file types
  />
</div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Student Allowed File Types</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
                Select All
              </label>
            </div>
            
            {/* Grid Layout for Checkboxes */}
            <div className="grid grid-cols-3 gap-4">
              {fileTypes.map((type) => (
                <div key={type} className="mb-2">
                  <label>
                    <input
                      type="checkbox"
                      checked={newActivity.file_type_allowed.includes(type)}
                      onChange={() => handleFileTypeChange(type)}
                    />
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Conditionally render max file size only if "None" is not selected */}
          {!newActivity.file_type_allowed.includes('None') && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Max File Size</label>
              <select
                id="max_file_size"
                name="max_file_size"
                value={newActivity.max_file_size}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-lg"
                required
              >
                <option value="256">256 KB</option>
                <option value="1024">1 MB</option>
                <option value="10240">10 MB</option>
                <option value="102400">100 MB</option>
                <option value="1048576">1 GB</option>
                <option value="10485760">10 GB</option>
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="deadline">
              Deadline
            </label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={newActivity.deadline}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">
            Submit
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)} // Cancel form
            className="ml-2 bg-red-500 text-white p-2 rounded-lg"
          >
            Cancel
          </button>
        </form>
      )}

      {/* List of Activities */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Existing Activities</h3>
    {activities.length === 0 ? (
  <p>No activities found.</p>
) : (
  <ul>
    {activities
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort activities by created_at in descending order
      .map((activity) => (
        <li 
          key={activity.assignment_id} 
          className="mb-4 p-4 bg-white rounded-lg shadow-md flex justify-between"
          onClick={() => handleViewSubmissions(activity.assignment_id)} //
        >
          <div className="flex flex-col w-3/4">
            {/* Title with responsive font sizes */}
            <h4 className="text-xl sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2">
              {activity.title}
            </h4>
            
            {/* Created time with smaller font size */}
            <p className="text-xs sm:text-sm md:text-xs lg:text-sm text-gray-500 mb-2">
              Created: {new Date(activity.created_at).toLocaleDateString('en-US', {
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
              })}
            </p>

            {/* Description with responsive text sizes */}
            <p className="text-sm sm:text-xs md:text-sm lg:text-base mb-2">
              {activity.description}
            </p>

            {/* Files grid with responsive font sizes */}
            <div className="grid grid-cols-2 gap-4">
              {Array.isArray(activity.files) && activity.files.length > 0 ? (
                activity.files.map((file, index) => {
                  // Extract the file extension
                  const fileExtension = file.file_name.split('.').pop(); // Get the last part after the dot

                  return (
                    <div
                        key={index}
                        className="border p-2 rounded-md flex flex-col items-center h-20 cursor-pointer"
                        onClick={() => handleDownload(file.file_id,file.file_name)}  // Call download function on click
                      >
                  
                        {/* File name with smaller responsive text size */}
                        <span className="text-s sm:text-xs md:text-sm lg:text-base truncate w-full text-center text-blue-500 overflow-hidden" style={{ maxWidth: '150px' }}>
                        {file.file_name}
                      </span>

                        {/* File extension with smaller font */}
                        <p className="text-xs sm:text-xs md:text-sm lg:text-sm text-gray-500 flex-grow">
                          Extension: {fileExtension}
                        </p>

                        {/* File size with smaller font */}
                        <p className="text-xs sm:text-xs md:text-sm lg:text-sm text-gray-500 flex-grow">
                          File Size: {(file.file_size / 1024).toFixed(2)} KB
                        </p>
                     
                    </div>
                  );
                })
              ) : (
                <p>No files uploaded</p>
              )}
            </div>
          </div>

          {/* Deadline with responsive font sizes */}
          <div className="text-right w-1/4">
            <p className="text-sm sm:text-xs md:text-sm lg:text-base text-red-500">
              Deadline: {new Date(activity.deadline).toLocaleString('en-US', { 
                day: 'numeric', 
                month: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric' 
              })}
            </p>
          </div>
        </li>
      ))}
  </ul>
)}






      </div>
    </div>
  );
};

export default ClassroomActivities;
