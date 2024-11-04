import { connection as db } from "../../config/dbConfig.js";
import expressAsyncHandler from "express-async-handler";

// Assuming we're using Express and a SQL database (e.g., MySQL/PostgreSQL)


export const createOrFetchAttendance = expressAsyncHandler(async (req, res) => {
  const { class_id, attendance_date, time_slot } = req.body;

  // Check if attendance already exists
  const checkAttendanceSql = `SELECT attendance_id FROM lms_attendance WHERE class_id = ? AND attendance_date = ? AND time_slot = ?`;
  db.query(checkAttendanceSql, [class_id, attendance_date, time_slot], (error, existingAttendance) => {
    if (error) {
      console.error('Error checking attendance:', error);
      return res.status(500).json({ message: 'Failed to check attendance', error });
    }

    if (existingAttendance.length > 0) {
      // Attendance already exists; fetch related attendance student data
      const attendanceId = existingAttendance[0].attendance_id;
      const fetchAttendanceStudentsSql = `
        SELECT las.att_stud_id, las.sid, las.lms_attendance_id, las.status, 
               ls.student_name, ls.stud_clg_id 
        FROM lms_attendance_students las
        JOIN lms_students ls ON las.sid = ls.sid
        WHERE las.lms_attendance_id = ?`;

      db.query(fetchAttendanceStudentsSql, [attendanceId], (err, attendanceStudents) => {
        if (err) {
          console.error('Error fetching attendance students:', err);
          return res.status(500).json({ message: 'Failed to fetch attendance students', error: err });
        }

        return res.json({ exists: true, attendanceStudents });
      });
    } else {
      // Attendance does not exist; create a new attendance record
      const createAttendanceSql = `INSERT INTO lms_attendance (class_id, attendance_date, time_slot) VALUES (?, ?, ?)`;
      db.query(createAttendanceSql, [class_id, attendance_date, time_slot], (err, result) => {
        if (err) {
          console.error('Error creating attendance:', err);
          return res.status(500).json({ message: 'Failed to create attendance', error: err });
        }

        const newAttendanceId = result.insertId;

        // Delay before fetching students to allow trigger to complete
      
          // Retrieve students from lms_attendance_students
          const fetchAttendanceStudentsSql = `
            SELECT las.att_stud_id, las.sid, las.lms_attendance_id, las.status, 
                   ls.student_name, ls.stud_clg_id 
            FROM lms_attendance_students las
            JOIN lms_students ls ON las.sid = ls.sid
            WHERE las.lms_attendance_id = ?`;

          db.query(fetchAttendanceStudentsSql, [newAttendanceId], (err, attendanceStudents) => {
            if (err) {
              console.error('Error fetching attendance students:', err);
              return res.status(500).json({ message: 'Failed to fetch attendance students', error: err });
            }

            res.json({ exists: false, attendanceStudents });
          });
        }, 2000); // 2-second delay before checking students
   
    }
  });
});



  export const submitAttendance = (req, res) => {
    const attendanceData = req.body;
  
    // Prepare an array of promises for each update operation
    const updatePromises = attendanceData.map((student) => {
      return new Promise((resolve, reject) => {
        db.query(
          `UPDATE lms_attendance_students SET status = ? WHERE att_stud_id = ?`,
          [student.status, student.att_stud_id],
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
    });
  
    // Execute all updates and send the response after all are completed
    Promise.all(updatePromises)
      .then(() => {
        res.status(200).json({ message: 'Attendance updated successfully.' });
      })
      .catch((error) => {
        console.error('Error updating attendance:', error);
        res.status(500).json({ message: 'Failed to update attendance', error });
      });
  };


  export const getStudentAttendancePercentage = expressAsyncHandler(async (req, res) => {
    const { sid, classroom_id } = req.params;
  
    const query = `
      SELECT 
        ls.sid,
        c.room_name AS classroom,
        COUNT(CASE WHEN las.status = 1 THEN 1 END) * 100.0 / COUNT(*) AS attendance_percentage
      FROM 
        lms_attendance la
      JOIN 
        lms_attendance_students las ON la.attendance_id = las.lms_attendance_id
      JOIN 
        classroom c ON la.class_id = c.classroom_id
      JOIN 
        lms_students ls ON las.sid = ls.sid
      WHERE 
        las.sid = ? AND c.classroom_id = ?
      GROUP BY 
        ls.sid, c.room_name;
    `;
  
    db.query(query, [sid, classroom_id], (error, results) => {
      if (error) {
        console.error('Error calculating attendance percentage:', error);
        return res.status(500).json({ message: 'Failed to calculate attendance percentage', error });
      }
  
      if (results.length > 0) {
        res.json({
          sid: results[0].sid,
          classroom: results[0].classroom,
          attendance_percentage: results[0].attendance_percentage
        });
      } else {
        res.status(404).json({ message: 'No attendance records found for the specified student and classroom.' });
      }
    });
  });
  