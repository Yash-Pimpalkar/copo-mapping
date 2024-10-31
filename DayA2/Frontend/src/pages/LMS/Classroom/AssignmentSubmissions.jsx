import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api, { backend_url } from '../../../api';

const AssignmentSubmissions = ({ uid }) => {
  const { classroomId, assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await api.get(`/api/lmsclassroom/activities/submissions/${assignmentId}`);
        setSubmissions(response.data);
        setFilteredSubmissions(response.data);
      } catch (err) {
        console.error('Error fetching submissions:', err);
        setError('Failed to load submissions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [assignmentId]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchTermLower = e.target.value.toLowerCase();
    const filtered = submissions.filter((submission) =>
      submission.student_name.toLowerCase().includes(searchTermLower) ||
      submission.stud_clg_id.toLowerCase().includes(searchTermLower)
    );
    setFilteredSubmissions(filtered);
  };

  const handleDownload = (fileId, fileName) => {
    const downloadUrl = `${backend_url}/api/studentlms/submissions/download/${fileId}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenFile = (fileId) => {
    const fileUrl = `${backend_url}/api/studentlms/submissions/download/${fileId}`;
    window.open(fileUrl, '_blank');
  };

  

  const handleMarksChange = (submissionId, marksText) => {
    // Convert the text input to an integer, or set to null if invalid
    const marks = parseInt(marksText, 10);
    setFilteredSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission.submission_id === submissionId ? { ...submission, marks: isNaN(marks) ? null : marks } : submission
      )
    );
  };

  const saveMarks = async (submissionId, marks) => {
    if (isNaN(marks)) {
      alert('Please enter a valid integer for marks');
      return;
    }

    try {
      await api.post(`/api/studentlms/submissions/marks/${submissionId}`, { marks });
      alert('Marks updated successfully');
    } catch (err) {
      console.error('Error updating marks:', err);
      alert('Failed to update marks');
    }
  };

  if (loading) return <p>Loading submissions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Submissions for Assignment {assignmentId}</h2>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search by student name or college ID"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />

      <ul>
        {filteredSubmissions.map((submission) => (
          <li key={submission.submission_id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col mb-2">
              <p><strong>Student Name:</strong> {submission.student_name}</p>
              <p><strong>College ID:</strong> {submission.stud_clg_id}</p>
              <p>
                <strong>Submitted At:</strong>{' '}
                {submission.submitted_at ? new Date(submission.submitted_at).toLocaleString() : 'Not Uploaded'}
              </p>
              <p><strong>Is Late:</strong> {submission.is_late ? 'Yes' : 'No'}</p>
              <div className="flex items-center mb-2">
                <label className="mr-2"><strong>Marks:</strong></label>
                <input
                  type="text"
                  value={submission.marks !== null ? submission.marks : ''}
                  onChange={(e) => handleMarksChange(submission.submission_id, e.target.value)}
                  className="w-16 p-1 border border-gray-300 rounded"
                />
                <button
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => saveMarks(submission.submission_id, submission.marks)}
                >
                  Save
                </button>
              </div>
              <p><strong>Message to Teacher:</strong> {submission.message_to_teacher}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {submission.files.length > 0 ? (
                submission.files.map((file) => (
                  <div key={file.file_id} className="border p-2 rounded-md">
                    <p><strong>File Name:</strong> {file.file_name}</p>
                    <p><strong>File Type:</strong> {file.file_type}</p>
                    <p><strong>File Size:</strong> {(file.file_size / 1024).toFixed(2)} KB</p>
                    <button
                      className="bg-blue-500 text-white p-2 rounded mt-2"
                      onClick={() => handleDownload(file.file_id, file.file_name)}
                    >
                      Download
                    </button>
                  </div>
                ))
              ) : (
                <p>No files uploaded</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentSubmissions;
