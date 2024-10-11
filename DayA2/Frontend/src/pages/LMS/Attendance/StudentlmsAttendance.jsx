import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx'; // For Excel download

  
const StudentLmsAttendance = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeSlot, setTimeSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchClassrooms = async () => {
      const data = ['Classroom A', 'Classroom B', 'Classroom C'];
      setClassrooms(data);
    };
    fetchClassrooms();
  }, []);

  const handleClassroomChange = (classroom) => {
    setSelectedClassroom(classroom);
    fetchStudents(classroom);
  };

  const fetchStudents = async (classroom) => {
    setLoading(true);
    const data = [
      { id: 1, srNo: 1, name: 'John Doe' },
      { id: 2, srNo: 2, name: 'Jane Smith' },
      { id: 3, srNo: 3, name: 'Mark Johnson' },
    ];
    setStudents(data);
    setFilteredStudents(data);
    setAttendance({});
    setLoading(false);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredStudents(
        students.filter((student) =>
          student.name.toLowerCase().includes(query.toLowerCase()) ||
          student.id.toString().includes(query)
        )
      );
    } else {
      setFilteredStudents(students);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const newAttendance = {};
    filteredStudents.forEach((student) => {
      newAttendance[student.id] = selectAll ? '' : 'Present';
    });
    setAttendance(newAttendance);
  };

  const submitAttendance = () => {
    if (Object.keys(attendance).length !== filteredStudents.length || !timeSlot || !selectedDate) {
      toast.error('Please mark attendance, select a time slot, and a date.');
      return;
    }
    console.log('Attendance submitted:', attendance, timeSlot, selectedDate);
    toast.success('Attendance submitted successfully.');
  };

  const downloadAttendance = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredStudents.map((student) => ({
        'Sr No': student.srNo,
        'ID No': student.id,
        'Name': student.name,
        'Attendance': attendance[student.id] || 'Not Marked',
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, 'attendance.xlsx');
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Student Attendance</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Select Classroom:</label>
        <select
          value={selectedClassroom}
          onChange={(e) => handleClassroomChange(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled>Select Classroom</option>
          {classrooms.map((classroom, index) => (
            <option key={index} value={classroom}>
              {classroom}
            </option>
          ))}
        </select>
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Time Slot Picker */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Select Time Slot:</label>
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled>Select Time Slot</option>
          <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
          <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
          <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
          <option value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM</option>
          <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
        </select>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name or ID"
          className="p-2 bg-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleSelectAll}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-500"
        >
          {selectAll ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading students...</div>
      ) : (
        selectedClassroom && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-white-700 uppercase tracking-wider">Sr No</th>
                  <th className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-white-700 uppercase tracking-wider">ID No</th>
                  <th className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-white-700 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-white-700 uppercase tracking-wider">Present</th>
                  <th className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-white-700 uppercase tracking-wider">Absent</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 border-b border-gray-200">{student.srNo}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{student.id}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{student.name}</td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="checkbox"
                        onChange={() => handleAttendanceChange(student.id, 'Present')}
                        checked={attendance[student.id] === 'Present'}
                        className="form-checkbox h-4 w-4 text-indigo-600"
                      />
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="checkbox"
                        onChange={() => handleAttendanceChange(student.id, 'Absent')}
                        checked={attendance[student.id] === 'Absent'}
                        className="form-checkbox h-4 w-4 text-indigo-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4">
              <button
                onClick={submitAttendance}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-500 mr-2"
              >
                Submit Attendance
              </button>
              <button
                onClick={downloadAttendance}
                className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500"
              >
                Download as Excel
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default StudentLmsAttendance;
