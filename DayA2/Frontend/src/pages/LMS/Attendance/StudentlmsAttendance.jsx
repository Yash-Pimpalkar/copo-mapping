import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import api from '../../../api';
import LoadingButton from '../../../component/Loading/Loading';

const StudentLmsAttendance = ({ uid }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [timeSlot, setTimeSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [existingAttendance, setExistingAttendance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await api.get(`/api/lmsclassroom/show/${uid}`);
        const classroomData = Array.isArray(response.data) ? response.data : [response.data];
        setClassrooms(classroomData);
      } catch (error) {
        toast.error('Error fetching classrooms.');
      }
    };

    if (uid) {
      fetchClassrooms();
    }
  }, [uid]);

  const uniqueAcademicYears = Array.from(new Set(classrooms.map((classroom) => classroom.academic_year)));

  const handleAcademicYearChange = (year) => {
    setExistingAttendance(null);
    setSelectedAcademicYear(year);
    setSelectedClassroom(null);
    setFilteredClassrooms(classrooms.filter((classroom) => classroom.academic_year === year));
  };

  const handleClassroomChange = (classroomId) => {
    setExistingAttendance(null);
    const selected = classrooms.find((classroom) => classroom.classroom_id === parseInt(classroomId, 10));
    setSelectedClassroom(selected);
  };

  const handleDateChange = (date) => {
    setExistingAttendance(null);
    setSelectedDate(date);
  };

  const handleTimeSlotChange = (slot) => {
    setExistingAttendance(null);
    setTimeSlot(slot);
  };

  const handleAttendanceChange = (studentId, status) => {
    setExistingAttendance((prev) =>
      prev.map((student) =>
        student.att_stud_id === studentId ? { ...student, status } : student
      )
    );
  };

  const handleSelectAllPresent = () => {
    const updatedAttendance = existingAttendance.map((student) => ({
      ...student,
      status: 1, // Set all to "Present"
    }));
    setExistingAttendance(updatedAttendance);
  };

  const handleSelectAllAbsent = () => {
    const updatedAttendance = existingAttendance.map((student) => ({
      ...student,
      status: 0, // Set all to "Absent"
    }));
    setExistingAttendance(updatedAttendance);
  };

  const showAttendance = async () => {
    if (!selectedAcademicYear || !selectedClassroom || !selectedDate || !timeSlot) {
      toast.error('Please select all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(`/api/lmsclassroom/attendance/getattendance`, {
        class_id: selectedClassroom.classroom_id,
        attendance_date: selectedDate,
        time_slot: timeSlot,
      });

      if (response.data.exists) {
        setExistingAttendance(response.data.attendanceStudents);
        toast.error('Attendance record already exists for this date and time.');
      } else {
        setExistingAttendance(response.data.attendanceStudents);
        toast.success('Attendance created successfully.');
      }
    } catch (error) {
      toast.error('Failed to create or fetch attendance.');
    } finally {
      setLoading(false);
    }
  };

  const submitAttendanceData = async () => {
    try {
      const response = await api.post(`/api/lmsclassroom/attendance/submitattendance`, existingAttendance);
      if (response.status === 200) {
        alert(response.data.message || 'Attendance updated successfully.');
      } else {
        alert(response.data.message || 'Failed to update attendance.');
      }
    } catch (error) {
      alert('Failed to update attendance.');
    }
  };

  const downloadAttendance = () => {
    let i = 1;

    const headers = [
      { A: `Classroom: ${selectedClassroom ? selectedClassroom.room_name : ''}` },
      { A: `Date: ${selectedDate || ''}` },
      { A: `Time Slot: ${timeSlot || ''}` },
      {}
    ];

    const headerSheet = XLSX.utils.json_to_sheet(headers, { header: ["A"], skipHeader: true });

    XLSX.utils.sheet_add_json(headerSheet,
      existingAttendance.map((student) => ({
        'Sr No': i++,
        'ID No': student.stud_clg_id,
        'Name': student.student_name,
        'Attendance': student.status === 1 ? 'Present' : student.status === 0 ? 'Absent' : 'Not Marked',
      })),
      { origin: -1 }
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, headerSheet, 'Attendance');

    XLSX.writeFile(wb, `${selectedClassroom ? selectedClassroom.room_name : ''}-${selectedDate || ''}attendance.xlsx`);
    toast.success('Attendance downloaded successfully.');
  };

  const isAttendanceReady = selectedAcademicYear && selectedClassroom && selectedDate && timeSlot;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Student Attendance</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Select Academic Year:</label>
        <select
          value={selectedAcademicYear}
          onChange={(e) => handleAcademicYearChange(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled>Select Academic Year</option>
          {uniqueAcademicYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Select Classroom:</label>
        <select
          value={selectedClassroom ? selectedClassroom.classroom_id : ''}
          onChange={(e) => handleClassroomChange(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          disabled={!selectedAcademicYear}
        >
          <option value="" disabled>Select Classroom</option>
          {filteredClassrooms.map((classroom) => (
            <option key={classroom.classroom_id} value={classroom.classroom_id}>
              {classroom.room_name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Select Time Slot:</label>
        <select
          value={timeSlot}
          onChange={(e) => handleTimeSlotChange(e.target.value)}
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

      {isAttendanceReady && (
        <div className="flex justify-center mt-6">
          <button
            onClick={showAttendance}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-500"
          >
            Show Attendance
          </button>
        </div>
      )}

      {loading ? (
        <LoadingButton />
      ) : (
        selectedClassroom && existingAttendance && (
          <div className="overflow-x-auto mt-4">
            <div className="flex justify-between mb-4">
              <button
                onClick={handleSelectAllPresent}
                className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500"
              >
                Select All Present
              </button>
              <button
                onClick={handleSelectAllAbsent}
                className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-500"
              >
                Select All Absent
              </button>
            </div>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sr No</th>
                  <th className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID No</th>
                  <th className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Present</th>
                  <th className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Absent</th>
                </tr>
              </thead>
              <tbody>
                {existingAttendance.map((student, index) => (
                  <tr key={student.att_stud_id}>
                    <td className="px-6 py-4 border-b border-gray-200">{index + 1}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{student.stud_clg_id}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{student.student_name}</td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="checkbox"
                        checked={student.status === 1}
                        onChange={() => handleAttendanceChange(student.att_stud_id, 1)}
                        className="form-checkbox h-4 w-4 text-indigo-600"
                      />
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="checkbox"
                        checked={student.status === 0}
                        onChange={() => handleAttendanceChange(student.att_stud_id, 0)}
                        className="form-checkbox h-4 w-4 text-indigo-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4">
              <button
                onClick={downloadAttendance}
                className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 mr-4"
              >
                Download as Excel
              </button>
              <button
                onClick={submitAttendanceData}
                className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-500"
              >
                Submit Attendance
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default StudentLmsAttendance;
