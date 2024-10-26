import { connection as db } from "../config/dbConfig.js";


//ia1
export const ia1_addStudentsToClass = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;
  
    // Validate input
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }
  
    console.log(selectedStudents)
    console.log(usercourseid)
  
    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }
  
    try {
        // Query to fetch qid values from table_ia based on usercourseid
        const fetchQidQuery = `SELECT idtable_ia FROM table_ia WHERE usercourseid = ?`;
        const [qidResults] = await db.promise().query(fetchQidQuery, [usercourseid]);
  
        if (qidResults.length === 0) {
            return res.status(404).json({ message: 'No questions found for this course' });
        }
  
        // Extract qid values
        const qidValues = qidResults.map(row => row.idtable_ia);
  
        // Prepare insertion values for upload_ia
        const values = [];
        selectedStudents.forEach(sid => {
            qidValues.forEach(qid => {
                values.push(`(${sid}, ${qid})`);
            });
        });
  
        // Query to insert multiple rows into upload_ia
        const insertQuery = `INSERT INTO upload_ia (sid, qid) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE marks = VALUES(marks)`;
  
        // Execute the insert query
        await db.promise().query(insertQuery);
  
        // Send success response
        res.status(201).json({ message: 'Students and qid values added successfully' });
  
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
  };
  
  
  
  export const ia1_deleteAllStudentsFromClass = (req, res) => {
  
    
    const {uid} = req.params;
    console.log(uid)
    try {
        // const { classId } = req.params;
  
        const query = `DELETE upload_ia 
        FROM upload_ia 
        JOIN table_ia ON upload_ia.qid = table_ia.idtable_ia 
        WHERE 
        table_ia.usercourseid = ?;
`;
  
        // Execute the query
        db.query(query,[uid], (error, result) => {
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
  export const ia1_deleteStudentFromClass = async (req, res) => {
    const {  sid } = req.params;
    const {userCourseId} = req.body;
    console.log(userCourseId)
    // const classIdAsInt = parseInt(classId); // Convert cohortId to an integer
    const sidAsInt = parseInt(sid); // Convert cohortId to an integer
    console.log( "sid:", sid);  // Log the parameters
  
    const query = `DELETE upload_ia 
    FROM upload_ia 
    JOIN table_ia ON upload_ia.qid = table_ia.idtable_ia 
    WHERE upload_ia.sid = ? 
    AND table_ia.usercourseid = ?;
`;
    
    try {
        // Execute the query
        db.query(query, [ sidAsInt, userCourseId], (error, result) => {
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
  
  
  export const ia1_get_Usercourse_Students = (req, res) => {
    const { uid } = req.params; // Assuming classId is passed as a parameter
  
    const sql = `
  SELECT DISTINCT
      s.sid, 
      s.stud_clg_id, 
      s.student_name
  FROM 
      lms_students s
  JOIN 
      upload_ia ua ON s.sid = ua.sid
  JOIN 
      table_ia ti ON ua.qid = ti.idtable_ia
  WHERE 
      ti.usercourseid = ?;
    `;
  
    db.query(sql, [uid], (error, results) => {
        if (error) {
            console.error('Error fetching classroom students:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        res.status(200).json(results);
    });
  };
  


//ia2
export const ia2_addStudentsToClass = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;
  
    // Validate input
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }
  
    console.log(selectedStudents)
    console.log(usercourseid)
  
    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }
  
    try {
        // Query to fetch qid values from table_ia based on usercourseid
        const fetchQidQuery = `SELECT idtable_ia2 FROM table_ia2 WHERE usercourseid = ?`;
        const [qidResults] = await db.promise().query(fetchQidQuery, [usercourseid]);
  
        if (qidResults.length === 0) {
            return res.status(404).json({ message: 'No questions found for this course' });
        }
  
        // Extract qid values
        const qidValues = qidResults.map(row => row.idtable_ia2);

        // Prepare insertion values for upload_ia
        const values = [];
        selectedStudents.forEach(sid => {
            qidValues.forEach(qid => {
                values.push(`(${sid}, ${qid})`);
            });
        });
  
        // Query to insert multiple rows into upload_ia
        const insertQuery = `INSERT INTO upload_ia2 (sid, qid) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE marks = VALUES(marks)`;
  
        // Execute the insert query
        await db.promise().query(insertQuery);
  
        // Send success response
        res.status(201).json({ message: 'Students and qid values added successfully' });
  
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
  };
  
  
  
  export const ia2_deleteAllStudentsFromClass = (req, res) => {
  
    
    const {uid} = req.params;
    console.log(uid)
    try {
        // const { classId } = req.params;
  
        const query = `DELETE upload_ia2 
        FROM upload_ia2
        JOIN table_ia2 ON upload_ia2.qid = table_ia2.idtable_ia2 
        WHERE 
        table_ia2.usercourseid = ?;
`;
  
        // Execute the query
        db.query(query,[uid], (error, result) => {
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
  export const ia2_deleteStudentFromClass = async (req, res) => {
    const {  sid } = req.params;
    const {userCourseId} = req.body;
    console.log(userCourseId)
    // const classIdAsInt = parseInt(classId); // Convert cohortId to an integer
    const sidAsInt = parseInt(sid); // Convert cohortId to an integer
    console.log( "sid:", sid);  // Log the parameters
  
    const query = `DELETE upload_ia2 
    FROM upload_ia2
    JOIN table_ia2 ON upload_ia2.qid = table_ia2.idtable_ia2 
    WHERE upload_ia2.sid = ? 
    AND table_ia2.usercourseid = ?;
`;
    
    try {
        // Execute the query
        db.query(query, [ sidAsInt, userCourseId], (error, result) => {
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
  
  
  export const ia2_get_Usercourse_Students = (req, res) => {
    const { uid } = req.params; // Assuming classId is passed as a parameter
    console.log("Received curriculum:", req.params.curriculum);
console.log("Received userCourseId:", req.params.uid);

    const sql = `
  SELECT DISTINCT
      s.sid, 
      s.stud_clg_id, 
      s.student_name
  FROM 
      lms_students s
  JOIN 
      upload_ia2 ua ON s.sid = ua.sid
  JOIN 
      table_ia2 ti ON ua.qid = ti.idtable_ia2
  WHERE 
      ti.usercourseid = ?;
    `;

    console.log(sql.data)
  
    db.query(sql, [uid], (error, results) => {
        if (error) {
            console.error('Error fetching classroom students:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        res.status(200).json(results);
    });
  };