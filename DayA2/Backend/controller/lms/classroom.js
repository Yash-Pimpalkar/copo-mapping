import { connection as db } from "../../config/dbConfig.js";
import expressAsyncHandler from "express-async-handler";
export const upload_classroom = (req, res) => {
    const { formDataForCohortClassroom } = req.body;

    console.log('Received data:', formDataForCohortClassroom);

    // Validate input
    if (!formDataForCohortClassroom || typeof formDataForCohortClassroom !== 'object') {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Check if the required fields are present in the incoming data
    const { room_name, branch, semester, userid, created_at ,academic_year} = formDataForCohortClassroom;

    if (!room_name || !branch || !semester || !userid || !created_at || !academic_year) {
        return res.status(400).json({ error: 'Missing required data fields' });
    }

    try {
        // Check if the userid already exists in the database
        const checkQuery = 'SELECT * FROM classroom WHERE room_name = ? and academic_year = ?';
        db.query(checkQuery, [room_name,academic_year], (error, results) => {
            if (error) {
                console.log('Error checking existing userid:', error);
                return res.status(500).json({ error: error.message });
            }

            if (results.length > 0) {
                // If the userid already exists, return an error
                return res.status(400).json({ error: 'User ID already exists' });
            } else {
                // Prepare the SQL query and values for insertion
                const insertQuery = 'INSERT INTO classroom (room_name, branch, semester, userid, created_at ,academic_year) VALUES ?;';
                const values = [[room_name, branch, semester, userid, created_at,academic_year]];
                console.log("values:", values);

                // Perform the data insertion
                db.query(insertQuery, [values], (error, result) => {
                    if (error) {
                        console.error('Error inserting data:', error);
                        return res.status(500).json({ error: error.message });
                    }

                    res.status(201).json({ message: 'Data submitted successfully' });
                });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

export const show_classroom = (req, res) => {
    const { uid } = req.params;
    const sql = `
        SELECT 
            c.classroom_id,
            c.room_name,
            c.branch,
            c.semester,
            c.userid,
            c.academic_year,
            c.created_at,
            u.teacher_name
        FROM 
            classroom c
        JOIN 
            users u ON c.userid = u.userid
        WHERE 
            c.userid = ?;
    `;

    db.query(sql, [uid], (error, rows) => {
        if (error) {
            console.error('Error fetching classroom:', error);
            return res.status(500).json({ error: 'Failed to fetch classroom' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Classroom not found' });
        }
        res.status(200).json(rows);
    });
};


export const delete_classroom = (req, res) => {
    const { id } = req.params;

    console.log(id);

    // Validate input
    if (!id) {
        return res.status(400).json({ error: 'Missing userid' });
    }

    try {
        // Check if the userid exists in the database
        const checkQuery = 'SELECT * FROM classroom WHERE classroom_id = ?';
        db.query(checkQuery, [id], (error, results) => {
            if (error) {
                console.log('Error checking existing userid:', error);
                return res.status(500).json({ error: error.message });
            }

            if (results.length === 0) {
                // If the userid does not exist, return an error
                return res.status(404).json({ error: 'User ID not found' });
            } else {
                // Prepare the SQL query for deletion
                const deleteQuery = 'DELETE FROM classroom WHERE classroom_id = ?';

                // Perform the data deletion
                db.query(deleteQuery, [id], (error, result) => {
                    if (error) {
                        console.error('Error deleting data:', error);
                        return res.status(500).json({ error: error.message });
                    }

                    res.status(200).json({ message: 'Classroom deleted successfully' });
                });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};




export const fetch_cohorts_byuser = (req, res) => {
    const { uid } = req.params;
    // Adjust the SQL query to fetch all cohorts ordered from latest to oldest
    const sql = "SELECT * FROM cohort WHERE user_id = ? ORDER BY created_time DESC"; // Change 'created_at' to your actual timestamp column name
    try {
        db.query(sql, uid, (error, results) => {
            if (error) {
                console.error('Error fetching cohorts:', error);
                return res.status(500).json({ error: error.message });
            }
            res.json(results);
        });
    } catch (err) {
        console.error('Error fetching cohorts:', err);
        res.status(500).json({ error: 'Error fetching cohorts' });
    }
};





// Add Students to Class
export const addStudentsToClass = (req, res) => {
    const { classId } = req.params;
    const { selectedStudents } = req.body;

    // Validate input
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    // Prepare values for insertion
    const values = selectedStudents.map(sid => `(${sid}, ${classId})`).join(',');

    const query = `INSERT INTO class_student_table (sid, class_id) VALUES ${values} 
                   ON DUPLICATE KEY UPDATE student_class_id = LAST_INSERT_ID(student_class_id)`;

    // Execute the query
    db.query(query, (error, result) => {
        if (error) {
            console.error('Error adding students:', error);
            return res.status(500).json({ message: 'Error adding students' });
        }
        res.status(201).json({ message: 'Students added successfully' });
    });
};

// Delete All Students from Class
// Delete All Students from Class
// Delete All Students from Class
export const deleteAllStudentsFromClass = (req, res) => {

    try {
        const { classId } = req.params;

        const query = `DELETE FROM class_student_table WHERE class_id = ?`;

        // Execute the query
        db.query(query, [classId], (error, result) => {
            if (error) {
                console.error('Error deleting students:', error);
                return res.status(500).json({ message: 'Error deleting students' });
            }

            // Check if any rows were affected
            if (result.affectedRows === 0) {
                return res.status(200).json({ message: 'No students found in the class' });
            }

            res.status(200).json({ message: 'All students removed from the class successfully', affectedRows: result.affectedRows });
        });

    } catch (error) {
        console.log(error)
    }
};



// Delete One Student from Class
// Delete a Student from Class
export const deleteStudentFromClass = async (req, res) => {
    const { classId, sid } = req.params;
    const classIdAsInt = parseInt(classId); // Convert cohortId to an integer
    const sidAsInt = parseInt(sid); // Convert cohortId to an integer
    console.log("classId:", classId, "sid:", sid);  // Log the parameters

    const query = `DELETE FROM class_student_table WHERE class_id = ? AND sid = ?`;
    console.log(typeof classIdAsInt);
    try {
        // Execute the query
        db.query(query, [classIdAsInt, sidAsInt], (error, result) => {
            if (error) {
                console.error('Error deleting students:', error);
                return res.status(500).json({ message: 'Error deleting students' });
            }

            // Log the query result for debugging
            console.log('Query Result:', result);

            // Check if any rows were affected (i.e., student was found and deleted)
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Student not found in the class' });
            }

            res.status(200).json({ message: 'Student removed from the class successfully', affectedRows: result.affectedRows });
        });

    } catch (error) {
        console.error('Error deleting student:', error.message);  // Log the error
        res.status(500).json({ message: 'Error deleting student' });
    }
};



export const getClassroomStudents = (req, res) => {
    const { classId } = req.params; // Assuming classId is passed as a parameter

    const sql = `
      SELECT s.sid, s.stud_clg_id, s.student_name, s.semester, s.branch, s.email, s.academic_year 
      FROM lms_students s
      INNER JOIN class_student_table cs ON s.sid = cs.sid
      WHERE cs.class_id = ?
    `;

    db.query(sql, [classId], (error, results) => {
        if (error) {
            console.error('Error fetching classroom students:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        res.status(200).json(results);
    });
};


export const getClassroomDetails = expressAsyncHandler(async (req, res) => {
    const { classroom_id } = req.params;
  
    const query = `
      SELECT 
        c.classroom_id,
        c.room_name,
        c.branch,
        c.semester,
        c.userid,
        c.academic_year,
        c.created_at,
        u.teacher_name
      FROM 
        classroom c
      JOIN 
        users u ON c.userid = u.userid
      WHERE 
        c.classroom_id = ?;
    `;
  
    db.query(query, [classroom_id], (error, results) => {
      if (error) {
        console.error('Error fetching classroom details:', error);
        return res.status(500).json({ message: 'Failed to retrieve classroom details', error });
      }
  
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Classroom not found' });
      }
    });
  });






