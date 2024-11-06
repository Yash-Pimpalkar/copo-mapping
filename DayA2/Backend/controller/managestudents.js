import { connection as db } from "../config/dbConfig.js";
import ExpressAsyncHandler from "express-async-handler"

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


  

export const  sem_addStudentsToClass = async(req,res)=>{
   
        const { selectedStudents, usercourseid } = req.body;
      
        // Validate input
        if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
            return res.status(400).json({ message: 'No students provided' });
        }
      
        console.log(selectedStudents);
        console.log(usercourseid);
      
        if (!usercourseid) {
            return res.status(400).json({ message: 'No usercourseid provided' });
        }
      
        try {
            // Query to fetch semid values from semester_marks based on usercourseid
            const fetchSemidQuery = `SELECT semid FROM semester_marks WHERE usercourseid = ?`;
            const [semidResults] = await db.promise().query(fetchSemidQuery, [usercourseid]);
      
            if (semidResults.length === 0) {
                return res.status(404).json({ message: 'No records found for this course' });
            }
      
            // Extract semid values
            const semidValues = semidResults.map(row => row.semid);
      
            // Prepare insertion values for table_sem
            const values = [];
            selectedStudents.forEach(sid => {
                semidValues.forEach(semid => {
                    values.push(`(${sid}, ${semid})`);
                });
            });
      
            // Query to insert multiple rows into table_sem without marks
            const insertQuery = `INSERT INTO table_sem (sid, semid) VALUES ${values.join(', ')} 
                                 ON DUPLICATE KEY UPDATE semid = VALUES(semid)`;
      
            // Execute the insert query
            await db.promise().query(insertQuery);
      
            // Send success response
            res.status(201).json({ message: 'Students and semid values added successfully' });
      
        } catch (error) {
            console.error('Error occurred:', error);
            res.status(500).json({ message: 'An error occurred while processing the request.' });
        }
  
    
}


// Delete all students from a specific user course in table_sem
export const sem_deleteAllStudentsFromClass = (req, res) => {
    const { uid } = req.params;
    console.log("Usercourse ID:", uid);
  
    try {
        // Delete all rows from table_sem based on usercourseid in semester_marks
        const query = `
        DELETE table_sem 
        FROM table_sem 
        JOIN semester_marks ON table_sem.semid = semester_marks.semid 
        WHERE semester_marks.usercourseid = ?;
        `;
  
        db.query(query, [uid], (error, result) => {
            if (error) {
                console.error('Error deleting students:', error);
                return res.status(500).json({ message: 'Error deleting students' });
            }
  
            if (result.affectedRows === 0) {
                return res.status(200).json({ message: 'No students found in the class' });
            }
  
            res.status(200).json({ message: 'All students removed from the class successfully', affectedRows: result.affectedRows });
        });
  
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while deleting students' });
    }
};

// Delete a specific student from a specific user course in table_sem
export const sem_deleteStudentFromClass = (req, res) => {
    const { sid } = req.params;
    const { userCourseId } = req.body;
    const sidAsInt = parseInt(sid);
    console.log("Student ID:", sidAsInt, "User Course ID:", userCourseId);
  
    const query = `
    DELETE table_sem 
    FROM table_sem 
    JOIN semester_marks ON table_sem.semid = semester_marks.semid 
    WHERE table_sem.sid = ? 
    AND semester_marks.usercourseid = ?;
    `;
  
    try {
        db.query(query, [sidAsInt, userCourseId], (error, result) => {
            if (error) {
                console.error('Error deleting student:', error);
                return res.status(500).json({ message: 'Error deleting student' });
            }
  
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Student not found in the class' });
            }
  
            res.status(200).json({ message: 'Student removed from the class successfully', affectedRows: result.affectedRows });
        });
  
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while deleting the student' });
    }
};

// Get all students for a specific user course
export const sem_get_Usercourse_Students = (req, res) => {
    const { uid } = req.params;
    console.log("User Course ID:", uid);
  
    const sql = `
    SELECT DISTINCT
        s.sid, 
        s.stud_clg_id, 
        s.student_name
    FROM 
        lms_students s
    JOIN 
        table_sem ts ON s.sid = ts.sid
    JOIN 
        semester_marks sm ON ts.semid = sm.semid
    WHERE 
        sm.usercourseid = ?;
    `;
  
    db.query(sql, [uid], (error, results) => {
        if (error) {
            console.error('Error fetching classroom students:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        res.status(200).json(results);
    });
};

// Add students to class in table_oral
export const oral_addStudentsToClass = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;
  
    // Validate input
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }
  
    console.log(selectedStudents);
    console.log(usercourseid);
  
    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }
  
    try {
        // Query to fetch oralid values from oral_marks based on usercourseid
        const fetchOralidQuery = `SELECT oralid FROM oral_marks WHERE usercourseid = ?`;
        const [oralidResults] = await db.promise().query(fetchOralidQuery, [usercourseid]);
  
        if (oralidResults.length === 0) {
            return res.status(404).json({ message: 'No records found for this course' });
        }
  
        // Extract oralid values
        const oralidValues = oralidResults.map(row => row.oralid);
  
        // Prepare insertion values for table_oral
        const values = [];
        selectedStudents.forEach(sid => {
            oralidValues.forEach(oralid => {
                values.push(`(${sid}, ${oralid})`);
            });
        });
  
        // Query to insert multiple rows into table_oral without marks
        const insertQuery = `INSERT INTO table_oral (sid, oralid) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE oralid = VALUES(oralid)`;
  
        // Execute the insert query
        await db.promise().query(insertQuery);
  
        // Send success response
        res.status(201).json({ message: 'Students and oralid values added successfully' });
  
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};

// Delete all students from a specific user course in table_oral
export const oral_deleteAllStudentsFromClass = (req, res) => {
    const { uid } = req.params;
    console.log("Usercourse ID:", uid);
  
    try {
        // Delete all rows from table_oral based on usercourseid in oral_marks
        const query = `
        DELETE table_oral 
        FROM table_oral 
        JOIN oral_marks ON table_oral.oralid = oral_marks.oralid 
        WHERE oral_marks.usercourseid = ?;
        `;
  
        db.query(query, [uid], (error, result) => {
            if (error) {
                console.error('Error deleting students:', error);
                return res.status(500).json({ message: 'Error deleting students' });
            }
  
            if (result.affectedRows === 0) {
                return res.status(200).json({ message: 'No students found in the class' });
            }
  
            res.status(200).json({ message: 'All students removed from the class successfully', affectedRows: result.affectedRows });
        });
  
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while deleting students' });
    }
};

// Delete a specific student from a specific user course in table_oral
export const oral_deleteStudentFromClass = (req, res) => {
    const { sid } = req.params;
    const { userCourseId } = req.body;
    const sidAsInt = parseInt(sid);
    console.log("Student ID:", sidAsInt, "User Course ID:", userCourseId);
  
    const query = `
    DELETE table_oral 
    FROM table_oral 
    JOIN oral_marks ON table_oral.oralid = oral_marks.oralid 
    WHERE table_oral.sid = ? 
    AND oral_marks.usercourseid = ?;
    `;
  
    try {
        db.query(query, [sidAsInt, userCourseId], (error, result) => {
            if (error) {
                console.error('Error deleting student:', error);
                return res.status(500).json({ message: 'Error deleting student' });
            }
  
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Student not found in the class' });
            }
  
            res.status(200).json({ message: 'Student removed from the class successfully', affectedRows: result.affectedRows });
        });
  
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while deleting the student' });
    }
};

// Get all students for a specific user course in table_oral
export const oral_get_Usercourse_Students = (req, res) => {
    const { uid } = req.params;
    console.log("User Course ID:", uid);
  
    const sql = `
    SELECT DISTINCT
    s.sid, 
    s.stud_clg_id, 
    s.student_name
FROM 
    lms_students s
JOIN 
    table_oral tbo ON s.sid = tbo.sid
JOIN 
    oral_marks om ON tbo.oralid = om.oralid
WHERE 
    om.usercourseid = ?;

    `;
  
    db.query(sql, [uid], (error, results) => {
        if (error) {
            console.error('Error fetching classroom students:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        res.status(200).json(results);
    });
};



export const oralpce_addStudentsToClass = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;
  
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }
  
    try {
        const fetchQidQuery = `SELECT idcol_oralpce AS qid FROM col_oralpce WHERE usercourseid = ?`;
        const [qidResults] = await db.promise().query(fetchQidQuery, [usercourseid]);
  
        if (qidResults.length === 0) {
            return res.status(404).json({ message: 'No records found for this course' });
        }
  
        const qidValues = qidResults.map(row => row.qid);
  
        const values = [];
        selectedStudents.forEach(sid => {
            qidValues.forEach(qid => {
                values.push(`(${sid}, ${qid})`);
            });
        });
  
        const insertQuery = `INSERT INTO main_oralpce (sid, qid) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE qid = VALUES(qid)`;
  
        await db.promise().query(insertQuery);
        res.status(201).json({ message: 'Students and qid values added successfully' });
  
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};

export const oralpce_deleteAllStudentsFromClass = (req, res) => {
    const { uid } = req.params;

    try {
        const query = `
        DELETE main_oralpce 
        FROM main_oralpce 
        JOIN col_oralpce ON main_oralpce.qid = col_oralpce.idcol_oralpce 
        WHERE col_oralpce.usercourseid = ?;
        `;

        db.query(query, [uid], (error, result) => {
            if (error) {
                console.error('Error deleting students:', error);
                return res.status(500).json({ message: 'Error deleting students' });
            }

            if (result.affectedRows === 0) {
                return res.status(200).json({ message: 'No students found in the class' });
            }

            res.status(200).json({ message: 'All students removed from the class successfully', affectedRows: result.affectedRows });
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while deleting students' });
    }
};

export const oralpce_deleteStudentFromClass = (req, res) => {
    const { sid } = req.params;
    const { userCourseId } = req.body;
    const sidAsInt = parseInt(sid);

    const query = `
    DELETE main_oralpce 
    FROM main_oralpce 
    JOIN col_oralpce ON main_oralpce.qid = col_oralpce.idcol_oralpce 
    WHERE main_oralpce.sid = ? 
    AND col_oralpce.usercourseid = ?;
    `;

    try {
        db.query(query, [sidAsInt, userCourseId], (error, result) => {
            if (error) {
                console.error('Error deleting student:', error);
                return res.status(500).json({ message: 'Error deleting student' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Student not found in the class' });
            }

            res.status(200).json({ message: 'Student removed from the class successfully', affectedRows: result.affectedRows });
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while deleting the student' });
    }
};

export const oralpce_get_Usercourse_Students = (req, res) => {
    const { uid } = req.params;

    const sql = `
    SELECT DISTINCT
        s.sid, 
        s.stud_clg_id, 
        s.student_name
    FROM 
        lms_students s
    JOIN 
        main_oralpce mto ON s.sid = mto.sid
    JOIN 
        col_oralpce col ON mto.qid = col.idcol_oralpce
    WHERE 
        col.usercourseid = ?;
    `;

    db.query(sql, [uid], (error, results) => {
        if (error) {
            console.error('Error fetching classroom students:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        res.status(200).json(results);
    });
};




// Add students with related questions to assignment in mainassign
export const assignment_addStudentsWithQuestions = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;

    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Fetch assignid from upload_assign based on usercourseid
        const fetchAssignIdQuery = `SELECT assignid FROM upload_assign WHERE usercourseid = ?`;
        const [assignResults] = await db.promise().query(fetchAssignIdQuery, [usercourseid]);

        if (assignResults.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this course' });
        }

        const assignIds = assignResults.map(row => row.assignid);

        // Fetch question IDs related to each assignid in question_assignment
        const fetchQuestionIdsQuery = `
            SELECT assign_idq 
            FROM question_assignment 
            WHERE assign_id IN (${assignIds.join(', ')})
        `;
        const [questionResults] = await db.promise().query(fetchQuestionIdsQuery);

        if (questionResults.length === 0) {
            return res.status(404).json({ message: 'No questions found for the assignments' });
        }

        // Prepare values for bulk insert into mainassign table
        const values = [];
        selectedStudents.forEach(sid => {
            questionResults.forEach(question => {
                values.push(`(${sid}, ${question.assign_idq})`);
            });
        });

        const insertQuery = `INSERT INTO mainassign (sid, assignid) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE assignid = VALUES(assignid)`;

        await db.promise().query(insertQuery);
        res.status(201).json({ message: 'Students and question IDs added to assignments successfully' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};


// Delete a specific student's questions from an assignment in mainassign
// Delete a specific student from a specific assignment based on usercourseid
export const assignment_deleteStudentFromAssignment = async (req, res) => {
    const { sid } = req.params;  // Student ID from the request parameters
    const { userCourseId } = req.body;  // User Course ID from the request body

    if (!sid || !userCourseId) {
        return res.status(400).json({ message: 'Student ID and User Course ID are required' });
    }

    try {
        // Step 1: Retrieve the assignment IDs linked to the given usercourseid
        const getAssignmentIdsQuery = `
            SELECT ua.assignid 
            FROM upload_assign ua 
            WHERE ua.usercourseid = ?;
        `;
        
        const [assignmentIds] = await db.promise().query(getAssignmentIdsQuery, [userCourseId]);

        if (assignmentIds.length === 0) {
            return res.status(404).json({ message: 'No assignments found for the specified user course' });
        }

        // Extract assignid values
        const assignIds = assignmentIds.map(row => row.assignid);

        // Step 2: Retrieve the question IDs linked to the found assignment IDs
        const getQuestionIdsQuery = `
            SELECT qa.assign_idq 
            FROM question_assignment qa
            WHERE qa.assign_id IN (${assignIds.join(', ')});
        `;

        const [questionIds] = await db.promise().query(getQuestionIdsQuery);

        if (questionIds.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified assignments' });
        }

        // Extract assign_idq values
        const assignIdqValues = questionIds.map(row => row.assign_idq);

        // Step 3: Delete entries in mainassign for the found question IDs and the specific student
        const deleteQuery = `
            DELETE FROM mainassign 
            WHERE sid = ? AND assignid IN (${assignIdqValues.join(', ')});
        `;

        const [result] = await db.promise().query(deleteQuery, [sid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found in the assignment questions' });
        }

        res.status(200).json({ message: 'Student removed from assignment questions successfully' });
    } catch (error) {
        console.error('Error deleting student from assignment questions:', error);
        res.status(500).json({ message: 'An error occurred while deleting student from assignment questions' });
    }
};



// Get all students assigned to questions in a specific assignment
// Get all students for a specific assignment based on usercourseid
export const assignment_getStudentsForAssignment = async (req, res) => {
    const { uid  } = req.params;
    const usercourseid = uid
    if (!usercourseid ) {
        return res.status(400).json({ message: 'User Course ID are required' });
    }

    try {
        // Step 1: Retrieve question IDs linked to the given assignid and usercourseid
        const getQuestionIdsQuery = `
            SELECT qa.assign_idq 
            FROM question_assignment qa
            JOIN upload_assign ua ON qa.assign_id = ua.assignid
            WHERE ua.usercourseid = ? ;
        `;
        
        const [questionIds] = await db.promise().query(getQuestionIdsQuery, [usercourseid]);

        if (questionIds.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified assignment and user course' });
        }

        // Extract assign_idq values
        const assignIds = questionIds.map(row => row.assign_idq);

        // Step 2: Find all students linked to these assign_idq values
        const getStudentsQuery = `
            SELECT DISTINCT
                s.sid, 
                s.stud_clg_id, 
                s.student_name
            FROM 
                lms_students s
            JOIN 
                mainassign ma ON s.sid = ma.sid
            WHERE 
                ma.assignid IN (${assignIds.join(', ')});
        `;

        const [students] = await db.promise().query(getStudentsQuery);

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found for the specified assignment' });
        }

        // Send success response with the list of students
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students for assignment:', error);
        res.status(500).json({ message: 'An error occurred while fetching students for the assignment' });
    }
};


// Delete all students for a specific assignment based on usercourseid
export const assignment_deleteAllStudentsForAssignment = async (req, res) => {
    const { uid} = req.params;
    const usercourseid =uid
    if (!usercourseid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Step 1: Retrieve question IDs linked to the usercourseid
        const getQuestionIdsQuery = `
            SELECT qa.assign_idq 
            FROM question_assignment qa
            JOIN upload_assign ua ON qa.assign_id = ua.assignid
            WHERE ua.usercourseid = ?;
        `;
        
        const [questionIds] = await db.promise().query(getQuestionIdsQuery, [usercourseid]);

        if (questionIds.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified user course' });
        }

        // Extract assign_idq values
        const assignIds = questionIds.map(row => row.assign_idq);

        // Step 2: Delete all students linked to these assign_idq values
        const deleteStudentsQuery = `
            DELETE FROM mainassign 
            WHERE assignid IN (${assignIds.join(', ')});
        `;

        const deleteResult = await db.promise().query(deleteStudentsQuery);

        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ message: 'No students found to delete for the specified assignment' });
        }

        // Send success response indicating deletion
        res.status(200).json({ message: 'All students removed from the assignment successfully', affectedRows: deleteResult.affectedRows });
    } catch (error) {
        console.error('Error deleting students for assignment:', error);
        res.status(500).json({ message: 'An error occurred while deleting students for the assignment' });
    }
};


export const addStudentsToAttendance = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;

    // Validate input
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Query to fetch attend_id values from upload_attendance based on usercourseid
        const fetchAttendIdQuery = `SELECT attid FROM upload_attendance WHERE usercourseid = ?`;
        const [attendIdResults] = await db.promise().query(fetchAttendIdQuery, [usercourseid]);

        if (attendIdResults.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for this course' });
        }

        // Extract attend_id values
        const attendIdValues = attendIdResults.map(row => row.attid);

        // Prepare insertion values for main_atten
        const values = [];
        selectedStudents.forEach(sid => {
            attendIdValues.forEach(attend_id => {
                values.push(`(${attend_id}, ${sid})`); // Adjust the value order based on your table structure
            });
        });

        // Query to insert multiple rows into main_atten
        const insertQuery = `INSERT INTO main_atten (attend_id, sid) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE marks = VALUES(marks)`; // Assuming you want to update marks if there's a duplicate

        // Execute the insert query
        await db.promise().query(insertQuery);

        // Send success response
        res.status(201).json({ message: 'Students added to attendance successfully' });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};


export const deleteAllAttendanceRecords = (req, res) => {
    const { uid } = req.params; // usercourseid
    console.log("Usercourse ID:", uid);

    try {
        // Delete all rows from main_atten based on usercourseid in upload_attendance
        const query = `
        DELETE main_atten 
        FROM main_atten 
        JOIN upload_attendance ON main_atten.attend_id = upload_attendance.attid 
        WHERE upload_attendance.usercourseid = ?;
        `;

        db.query(query, [uid], (error, result) => {
            if (error) {
                console.error('Error deleting attendance records:', error);
                return res.status(500).json({ message: 'Error deleting attendance records' });
            }

            if (result.affectedRows === 0) {
                return res.status(200).json({ message: 'No attendance records found for the course' });
            }

            res.status(200).json({ message: 'All attendance records removed successfully', affectedRows: result.affectedRows });
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while deleting attendance records' });
    }
};


export const deleteStudentAttendanceRecord = (req, res) => {
    const { sid } = req.params; // student ID
    const { userCourseId } = req.body; // course ID
    const sidAsInt = parseInt(sid);
    console.log("Student ID:", sidAsInt, "User Course ID:", userCourseId);

    const query = `
    DELETE main_atten 
    FROM main_atten 
    JOIN upload_attendance ON main_atten.attend_id = upload_attendance.attid 
    WHERE main_atten.sid = ? 
    AND upload_attendance.usercourseid = ?;
    `;

    try {
        db.query(query, [sidAsInt, userCourseId], (error, result) => {
            if (error) {
                console.error('Error deleting student attendance record:', error);
                return res.status(500).json({ message: 'Error deleting student attendance record' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Student attendance record not found' });
            }

            res.status(200).json({ message: 'Student attendance record removed successfully', affectedRows: result.affectedRows });
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while deleting the attendance record' });
    }
};


export const getUserCourseAttendanceRecords = (req, res) => {
    const { uid } = req.params; // usercourseid
    console.log("User Course ID:", uid);

    const sql = `
    SELECT DISTINCT
    s.sid, 
    s.stud_clg_id, 
    s.student_name
FROM 
    lms_students s
JOIN 
    main_atten ma ON s.sid = ma.sid
JOIN 
    upload_attendance ua ON ma.attend_id = ua.attid
WHERE 
    ua.usercourseid = ?;
    `;

  

    db.query(sql, [uid], (error, results) => {
        if (error) {
            console.error('Error fetching attendance records:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        res.status(200).json(results);
    });
};


// Add students with related questions to an experiment in mainexp
export const experiment_addStudentsWithQuestions = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;

    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Fetch expid from upload_exp based on usercourseid
        const fetchExpIdQuery = `SELECT expid FROM upload_exp WHERE usercourseid = ?`;
        const [expResults] = await db.promise().query(fetchExpIdQuery, [usercourseid]);

        if (expResults.length === 0) {
            return res.status(404).json({ message: 'No experiments found for this course' });
        }

        const expIds = expResults.map(row => row.expid);

        // Fetch question IDs related to each expid in question_exp
        const fetchQuestionIdsQuery = `
            SELECT exp_idq 
            FROM question_exp 
            WHERE exp_id IN (${expIds.join(', ')})
        `;
        const [questionResults] = await db.promise().query(fetchQuestionIdsQuery);

        if (questionResults.length === 0) {
            return res.status(404).json({ message: 'No questions found for the experiments' });
        }

        // Prepare values for bulk insert into mainexp table
        const values = [];
        selectedStudents.forEach(sid => {
            questionResults.forEach(question => {
                values.push(`(${question.exp_idq}, ${sid}, 0)`); // Assuming initial marks is 0
            });
        });

        const insertQuery = `INSERT INTO mainexp (expid, sid, marks) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE marks = VALUES(marks)`;

        await db.promise().query(insertQuery);
        res.status(201).json({ message: 'Students and question IDs added to experiments successfully' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};


// Delete a specific student from a specific experiment in mainexp
export const experiment_deleteStudentFromExperiment = async (req, res) => {
    const { sid } = req.params; // Student ID from the request parameters
    const { userCourseId } = req.body; // User Course ID from the request body

    if (!sid || !userCourseId) {
        return res.status(400).json({ message: 'Student ID and User Course ID are required' });
    }

    try {
        // Step 1: Retrieve the experiment IDs linked to the given usercourseid
        const getExperimentIdsQuery = `
            SELECT ue.expid 
            FROM upload_exp ue 
            WHERE ue.usercourseid = ?;
        `;
        
        const [experimentIds] = await db.promise().query(getExperimentIdsQuery, [userCourseId]);

        if (experimentIds.length === 0) {
            return res.status(404).json({ message: 'No experiments found for the specified user course' });
        }

        // Extract expid values
        const expIds = experimentIds.map(row => row.expid);

        // Step 2: Delete entries in mainexp for the specific student
        const deleteQuery = `
            DELETE FROM mainexp 
            WHERE sid = ? AND expid IN (${expIds.join(', ')});
        `;

        const [result] = await db.promise().query(deleteQuery, [sid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found in the experiment' });
        }

        res.status(200).json({ message: 'Student removed from experiment successfully' });
    } catch (error) {
        console.error('Error deleting student from experiment:', error);
        res.status(500).json({ message: 'An error occurred while deleting student from experiment' });
    }
};


// Get all students assigned to an experiment based on usercourseid
export const experiment_getStudentsForExperiment = async (req, res) => {
    const { uid } = req.params;
    const usercourseid = uid;
    if (!usercourseid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Step 1: Retrieve question IDs linked to the given expid and usercourseid
        const getQuestionIdsQuery = `
            SELECT qe.exp_idq 
            FROM question_exp qe
            JOIN upload_exp ue ON qe.exp_id = ue.expid
            WHERE ue.usercourseid = ?;
        `;
        
        const [questionIds] = await db.promise().query(getQuestionIdsQuery, [usercourseid]);

        if (questionIds.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified experiment and user course' });
        }

        // Extract exp_idq values
        const expIds = questionIds.map(row => row.exp_idq);

        // Step 2: Find all students linked to these exp_idq values
        const getStudentsQuery = `
            SELECT DISTINCT
                s.sid, 
                s.stud_clg_id, 
                s.student_name
            FROM 
                lms_students s
            JOIN 
                mainexp me ON s.sid = me.sid
            WHERE 
                me.expid IN (${expIds.join(', ')});
        `;

        const [students] = await db.promise().query(getStudentsQuery);

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found for the specified experiment' });
        }

        // Send success response with the list of students
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students for experiment:', error);
        res.status(500).json({ message: 'An error occurred while fetching students for the experiment' });
    }
};


// Delete all students for a specific experiment based on usercourseid
export const experiment_deleteAllStudentsForExperiment = async (req, res) => {
    const { uid } = req.params;
    const usercourseid = uid;
    if (!usercourseid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Step 1: Retrieve question IDs linked to the usercourseid
        const getQuestionIdsQuery = `
            SELECT qe.exp_idq 
            FROM question_exp qe
            JOIN upload_exp ue ON qe.exp_id = ue.expid
            WHERE ue.usercourseid = ?;
        `;
        
        const [questionIds] = await db.promise().query(getQuestionIdsQuery, [usercourseid]);

        if (questionIds.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified user course' });
        }

        // Extract exp_idq values
        const expIds = questionIds.map(row => row.exp_idq);

        // Step 2: Delete all students linked to these exp_idq values
        const deleteStudentsQuery = `
            DELETE FROM mainexp 
            WHERE expid IN (${expIds.join(', ')});
        `;

        const deleteResult = await db.promise().query(deleteStudentsQuery);

        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ message: 'No students found to delete for the specified experiment' });
        }

        // Send success response indicating deletion
        res.status(200).json({ message: 'All students removed from the experiment successfully', affectedRows: deleteResult.affectedRows });
    } catch (error) {
        console.error('Error deleting students for experiment:', error);
        res.status(500).json({ message: 'An error occurred while deleting students for the experiment' });
    }
};


// Add students to Scilab practicals
export const scilab_addStudentsToPracticals = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;

    // Validate input
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Query to fetch scipractid values from uploadscilabpract based on usercourseid
        const fetchScipractIdQuery = `SELECT scipractid FROM uploadscilabpract WHERE usercourseid = ?`;
        const [scipractResults] = await db.promise().query(fetchScipractIdQuery, [usercourseid]);

        if (scipractResults.length === 0) {
            return res.status(404).json({ message: 'No records found for this course' });
        }

        // Extract scipractid values
        const scipractIdValues = scipractResults.map(row => row.scipractid);

        // Prepare insertion values for main_scipract
        const values = [];
        selectedStudents.forEach(sid => {
            scipractIdValues.forEach(scipractid => {
                values.push(`(${scipractid}, ${sid})`); // Assuming initial marks as 0
            });
        });

        // Query to insert multiple rows into main_scipract
        const insertQuery = `INSERT INTO main_scipract (scipract_id, sid) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE sid = VALUES(sid)`;

        // Execute the insert query
        await db.promise().query(insertQuery);

        // Send success response
        res.status(201).json({ message: 'Students and scipractid values added successfully' });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};

// Delete all students from a specific user course in main_scipract
export const scilab_deleteAllStudentsFromPracticals = (req, res) => {
    const { uid } = req.params;
    console.log("User Course ID:", uid);

    try {
        // Delete all rows from main_scipract based on usercourseid in uploadscilabpract
        const query = `
        DELETE main_scipract 
        FROM main_scipract 
        JOIN uploadscilabpract ON main_scipract.scipract_id = uploadscilabpract.scipractid 
        WHERE uploadscilabpract.usercourseid = ?;
        `;

        db.query(query, [uid], (error, result) => {
            if (error) {
                console.error('Error deleting students:', error);
                return res.status(500).json({ message: 'Error deleting students' });
            }

            if (result.affectedRows === 0) {
                return res.status(200).json({ message: 'No students found in the practicals' });
            }

            res.status(200).json({ message: 'All students removed from the practicals successfully', affectedRows: result.affectedRows });
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while deleting students' });
    }
};

// Delete a specific student from a specific user course in main_scipract
export const scilab_deleteStudentFromPracticals = (req, res) => {
    const { sid } = req.params;
    const { userCourseId } = req.body;
    const sidAsInt = parseInt(sid);
    console.log("Student ID:", sidAsInt, "User Course ID:", userCourseId);

    const query = `
    DELETE main_scipract 
    FROM main_scipract 
    JOIN uploadscilabpract ON main_scipract.scipract_id = uploadscilabpract.scipractid 
    WHERE main_scipract.sid = ? 
    AND uploadscilabpract.usercourseid = ?;
    `;

    try {
        db.query(query, [sidAsInt, userCourseId], (error, result) => {
            if (error) {
                console.error('Error deleting student:', error);
                return res.status(500).json({ message: 'Error deleting student' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Student not found in the practicals' });
            }

            res.status(200).json({ message: 'Student removed from the practicals successfully', affectedRows: result.affectedRows });
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while deleting the student' });
    }
};

// Get all students for a specific user course in Scilab practicals
export const scilab_get_Usercourse_Students = (req, res) => {
    const { uid } = req.params;
    console.log("User Course ID:", uid);

    const sql = `
    SELECT DISTINCT
        s.sid, 
        s.stud_clg_id, 
        s.student_name
    FROM 
        lms_students s
    JOIN 
        main_scipract ms ON s.sid = ms.sid
    JOIN 
        uploadscilabpract up ON ms.scipract_id = up.scipractid
    WHERE 
        up.usercourseid = ?;
    `;

    db.query(sql, [uid], (error, results) => {
        if (error) {
            console.error('Error fetching practical students:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        res.status(200).json(results);
    });
};
// Delete a specific student from a specific user course in main_gd
export const gd_deleteStudentFromGroupDiscussion = async (req, res) => {
    const { sid } = req.params; // Student ID from the request parameters
    const { usercourseid } = req.body; // User Course ID from the request body

    if (!sid || !usercourseid) {
        return res.status(400).json({ message: 'Student ID and User Course ID are required' });
    }

    try {
        // Query to delete the student from main_gd based on usercourseid
        const deleteQuery = `
            DELETE mg 
            FROM main_gd mg 
            JOIN upload_gd ug ON mg.gdd_id = ug.gdid 
            WHERE mg.sid = ? AND ug.usercourseid = ?;
        `;

        const result = await db.promise().query(deleteQuery, [sid, usercourseid]);

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found in the Group Discussion' });
        }

        res.status(200).json({ message: 'Student removed from Group Discussion successfully', affectedRows: result[0].affectedRows });
    } catch (error) {
        console.error('Error deleting student from Group Discussion:', error);
        res.status(500).json({ message: 'An error occurred while deleting the student' });
    }
};
// Delete all students from a specific user course in main_gd
export const gd_deleteAllStudentsFromGroupDiscussion = async (req, res) => {
    const { uid } = req.params; // User Course ID from the request parameters

    if (!uid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Query to delete all rows from main_gd based on usercourseid in upload_gd
        const deleteQuery = `
            DELETE mg 
            FROM main_gd mg 
            JOIN upload_gd ug ON mg.gdd_id = ug.gdid 
            WHERE ug.usercourseid = ?;
        `;

        const result = await db.promise().query(deleteQuery, [uid]);

        if (result[0].affectedRows === 0) {
            return res.status(200).json({ message: 'No students found in the Group Discussion' });
        }

        res.status(200).json({ message: 'All students removed from Group Discussion successfully', affectedRows: result[0].affectedRows });
    } catch (error) {
        console.error('Error deleting students from Group Discussion:', error);
        res.status(500).json({ message: 'An error occurred while deleting students' });
    }
};
// Get all students for a specific user course
export const gd_get_Usercourse_Students = async (req, res) => {
    const { uid } = req.params; // User Course ID from the request parameters

    if (!uid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        const sql = `
            SELECT DISTINCT
                s.sid, 
                s.stud_clg_id, 
                s.student_name
            FROM 
                lms_students s
            JOIN 
                main_gd mg ON s.sid = mg.sid
            JOIN 
                upload_gd ug ON mg.gdd_id = ug.gdid
            WHERE 
                ug.usercourseid = ?;
        `;

        const [results] = await db.promise().query(sql, [uid]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No students found for the specified user course' });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching students for Group Discussion:', error);
        res.status(500).json({ message: 'An error occurred while fetching students' });
    }
};
// Example of controller functions in gdController.js

// Add students to Group Discussion
export const gd_addStudentsToGroupDiscussion = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;

    // Validate input
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Fetch gdid values from upload_gd based on usercourseid
        const fetchGdIdQuery = `SELECT gdid FROM upload_gd WHERE usercourseid = ?`;
        const [gdIdResults] = await db.promise().query(fetchGdIdQuery, [usercourseid]);

        if (gdIdResults.length === 0) {
            return res.status(404).json({ message: 'No records found for this course' });
        }

        // Extract gdid values
        const gdIdValues = gdIdResults.map(row => row.gdid);

        // Prepare insertion values for main_gd
        const values = [];
        selectedStudents.forEach(sid => {
            gdIdValues.forEach(gdid => {
                values.push(`(${gdid}, ${sid})`);
            });
        });

        // Query to insert multiple rows into main_gd without marks
        const insertQuery = `INSERT INTO main_gd (gdd_id, sid) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE sid = VALUES(sid)`;

        // Execute the insert query
        await db.promise().query(insertQuery);

        // Send success response
        res.status(201).json({ message: 'Students added to Group Discussion successfully' });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};

// Implement the other functions (deleteAll, deleteStudent, fetchStudents) similarly
// Add students to the journal without marks
export const journal_addStudents = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body; // Extract data from request body

    // Validate input
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Query to fetch journalid values from upload_journal based on usercourseid
        const fetchJournalIdQuery = `SELECT journalid FROM upload_journal WHERE usercourseid = ?`;
        const [journalIdResults] = await db.promise().query(fetchJournalIdQuery, [usercourseid]);

        if (journalIdResults.length === 0) {
            return res.status(404).json({ message: 'No records found for this course' });
        }

        // Extract journalid values
        const journalIdValues = journalIdResults.map(row => row.journalid);

        // Prepare insertion values for main_journal
        const values = [];
        selectedStudents.forEach(sid => {
            journalIdValues.forEach(journalid => {
                values.push(`(${journalid}, ${sid})`); // No marks included
            });
        });

        // Query to insert multiple rows into main_journal
        const insertQuery = `INSERT INTO main_journal (journal1_id, sid) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE journal1_id = VALUES(journal1_id)`;

        // Execute the insert query
        await db.promise().query(insertQuery);

        // Send success response
        res.status(201).json({ message: 'Students added to the Journal successfully' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};
// Delete a specific student from a specific user course in main_journal
export const deleteStudentFromJournal = async (req, res) => {
    const { sid } = req.params; // Student ID from the request parameters
    const { usercourseid } = req.body; // User Course ID from the request body

    if (!sid || !usercourseid) {
        return res.status(400).json({ message: 'Student ID and User Course ID are required' });
    }

    try {
        // Query to delete the student from main_journal based on usercourseid
        const deleteQuery = `
            DELETE mj 
            FROM main_journal mj 
            JOIN upload_journal uj ON mj.journal1_id = uj.journalid 
            WHERE mj.sid = ? AND uj.usercourseid = ?;
        `;

        const result = await db.promise().query(deleteQuery, [sid, usercourseid]);

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found in the Journal' });
        }

        res.status(200).json({ message: 'Student removed from Journal successfully', affectedRows: result[0].affectedRows });
    } catch (error) {
        console.error('Error deleting student from Journal:', error);
        res.status(500).json({ message: 'An error occurred while deleting the student' });
    }
};
// Delete all students from a specific user course in main_journal
export const deleteAllStudentsFromJournal = async (req, res) => {
    const { uid } = req.params; // User Course ID from the request parameters

    if (!uid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Query to delete all rows from main_journal based on usercourseid in upload_journal
        const deleteQuery = `
            DELETE mj 
            FROM main_journal mj 
            JOIN upload_journal uj ON mj.journal1_id = uj.journalid 
            WHERE uj.usercourseid = ?;
        `;

        const result = await db.promise().query(deleteQuery, [uid]);

        if (result[0].affectedRows === 0) {
            return res.status(200).json({ message: 'No students found in the Journal' });
        }

        res.status(200).json({ message: 'All students removed from Journal successfully', affectedRows: result[0].affectedRows });
    } catch (error) {
        console.error('Error deleting students from Journal:', error);
        res.status(500).json({ message: 'An error occurred while deleting students' });
    }
};
// Get all students for a specific user course
export const get_Usercourse_Students = async (req, res) => {
    const { uid } = req.params; // User Course ID from the request parameters

    if (!uid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        const sql = `
            SELECT DISTINCT
                s.sid, 
                s.stud_clg_id, 
                s.student_name
            FROM 
                lms_students s
            JOIN 
                main_journal mj ON s.sid = mj.sid
            JOIN 
                upload_journal uj ON mj.journal1_id = uj.journalid
            WHERE 
                uj.usercourseid = ?;
        `;

        const [results] = await db.promise().query(sql, [uid]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No students found for the specified user course' });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching students for Journal:', error);
        res.status(500).json({ message: 'An error occurred while fetching students' });
    }
};


// Add students to the PPT without marks
export const ppt_addStudents = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body; // Extract data from request body

    // Validate input
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Query to fetch ppt_id values from upload_ppt based on usercourseid
        const fetchPptIdQuery = `SELECT ppt_id FROM upload_ppt WHERE usercourseid = ?`;
        const [pptIdResults] = await db.promise().query(fetchPptIdQuery, [usercourseid]);

        if (pptIdResults.length === 0) {
            return res.status(404).json({ message: 'No records found for this course' });
        }

        // Extract ppt_id values
        const pptIdValues = pptIdResults.map(row => row.ppt_id);

        // Prepare insertion values for main_ppt
        const values = [];
        selectedStudents.forEach(sid => {
            pptIdValues.forEach(ppt_id => {
                values.push(`(${sid}, ${ppt_id})`); // No marks included
            });
        });

        // Query to insert multiple rows into main_ppt
        const insertQuery = `INSERT INTO main_ppt (sid, ppt_id) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE ppt_id = VALUES(ppt_id)`;

        // Execute the insert query
        await db.promise().query(insertQuery);

        // Send success response
        res.status(201).json({ message: 'Students added to the PPT successfully' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};


// Delete a specific student from a specific user course in main_ppt
export const deleteStudentFromPPT = async (req, res) => {
    const { sid } = req.params; // Student ID from the request parameters
    const { usercourseid } = req.body; // User Course ID from the request body

    if (!sid || !usercourseid) {
        return res.status(400).json({ message: 'Student ID and User Course ID are required' });
    }

    try {
        // Query to delete the student from main_ppt based on usercourseid
        const deleteQuery = `
            DELETE mp 
            FROM main_ppt mp 
            JOIN upload_ppt up ON mp.ppt_id = up.ppt_id 
            WHERE mp.sid = ? AND up.usercourseid = ?;
        `;

        const result = await db.promise().query(deleteQuery, [sid, usercourseid]);

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found in the PPT' });
        }

        res.status(200).json({ message: 'Student removed from PPT successfully', affectedRows: result[0].affectedRows });
    } catch (error) {
        console.error('Error deleting student from PPT:', error);
        res.status(500).json({ message: 'An error occurred while deleting the student' });
    }
};
// Delete all students from a specific user course in main_ppt
export const deleteAllStudentsFromPPT = async (req, res) => {
    const { uid } = req.params; // User Course ID from the request parameters

    if (!uid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Query to delete all rows from main_ppt based on usercourseid in upload_ppt
        const deleteQuery = `
            DELETE mp 
            FROM main_ppt mp 
            JOIN upload_ppt up ON mp.ppt_id = up.ppt_id 
            WHERE up.usercourseid = ?;
        `;

        const result = await db.promise().query(deleteQuery, [uid]);

        if (result[0].affectedRows === 0) {
            return res.status(200).json({ message: 'No students found in the PPT' });
        }

        res.status(200).json({ message: 'All students removed from PPT successfully', affectedRows: result[0].affectedRows });
    } catch (error) {
        console.error('Error deleting students from PPT:', error);
        res.status(500).json({ message: 'An error occurred while deleting students' });
    }
};
// Get all students for a specific user course
export const ppt_get_Usercourse_Students = async (req, res) => {
    const { uid } = req.params; // User Course ID from the request parameters

    if (!uid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        const sql = `
            SELECT DISTINCT
                s.sid, 
                s.stud_clg_id, 
                s.student_name
            FROM 
                lms_students s
            JOIN 
                main_ppt mp ON s.sid = mp.sid
            JOIN 
                upload_ppt up ON mp.ppt_id = up.ppt_id
            WHERE 
                up.usercourseid = ?;
        `;

        const [results] = await db.promise().query(sql, [uid]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No students found for the specified user course' });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching students for PPT:', error);
        res.status(500).json({ message: 'An error occurred while fetching students' });
    }
};

// Add students with related questions to a trade in main_trade without marks
export const trade_addStudentsWithQuestions = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;

    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Fetch tradeid from upload_trade based on usercourseid
        const fetchTradeIdQuery = `SELECT tradeid FROM upload_trade WHERE usercourseid = ?`;
        const [tradeResults] = await db.promise().query(fetchTradeIdQuery, [usercourseid]);

        if (tradeResults.length === 0) {
            return res.status(404).json({ message: 'No trades found for this course' });
        }

        const tradeIds = tradeResults.map(row => row.tradeid);

        // Fetch question IDs related to each tradeid in question_trade
        const fetchQuestionIdsQuery = `SELECT trade_idq FROM question_trade WHERE tradeid IN (${tradeIds.join(', ')})`;
        const [questionResults] = await db.promise().query(fetchQuestionIdsQuery);

        if (questionResults.length === 0) {
            return res.status(404).json({ message: 'No questions found for the trades' });
        }

        // Prepare values for bulk insert into main_trade table without marks
        const values = [];
        selectedStudents.forEach(sid => {
            questionResults.forEach(question => {
                values.push(`(${question.trade_idq}, ${sid})`); // No initial marks included
            });
        });

        const insertQuery = `INSERT INTO main_trade (trade_id, sid) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE trade_id = VALUES(trade_id)`;

        await db.promise().query(insertQuery);
        res.status(201).json({ message: 'Students and question IDs added to trades successfully' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};
// Delete a specific student from a specific trade in main_trade without marks
export const trade_deleteStudentFromTrade = async (req, res) => {
    const { sid } = req.params; // Student ID from the request parameters
    const { userCourseId } = req.body; // User Course ID from the request body

    if (!sid || !userCourseId) {
        return res.status(400).json({ message: 'Student ID and User Course ID are required' });
    }

    try {
        // Step 1: Retrieve the trade IDs linked to the given usercourseid
        const getTradeIdsQuery = `SELECT ut.tradeid FROM upload_trade ut WHERE ut.usercourseid = ?;`;
        
        const [tradeIds] = await db.promise().query(getTradeIdsQuery, [userCourseId]);

        if (tradeIds.length === 0) {
            return res.status(404).json({ message: 'No trades found for the specified user course' });
        }

        // Extract tradeid values
        const tradeIdValues = tradeIds.map(row => row.tradeid);

        // Step 2: Delete entries in main_trade for the specific student
        const deleteQuery = `DELETE FROM main_trade WHERE sid = ? AND trade_id IN (${tradeIdValues.join(', ')});`;

        const [result] = await db.promise().query(deleteQuery, [sid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found in the trade' });
        }

        res.status(200).json({ message: 'Student removed from trade successfully' });
    } catch (error) {
        console.error('Error deleting student from trade:', error);
        res.status(500).json({ message: 'An error occurred while deleting student from trade' });
    }
};
// Delete all students for a specific trade based on usercourseid without marks
export const trade_deleteAllStudentsForTrade = async (req, res) => {
    const { uid } = req.params; // User Course ID from the request parameters
    const usercourseid = uid;

    if (!usercourseid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Step 1: Retrieve trade IDs linked to the usercourseid
        const getTradeIdsQuery = `SELECT tradeid FROM upload_trade WHERE usercourseid = ?;`;
        
        const [tradeIds] = await db.promise().query(getTradeIdsQuery, [usercourseid]);

        if (tradeIds.length === 0) {
            return res.status(404).json({ message: 'No trades found for the specified user course' });
        }

        // Extract tradeid values
        const tradeIdValues = tradeIds.map(row => row.tradeid);

        // Step 2: Delete all students linked to these tradeid values
        const deleteStudentsQuery = `DELETE FROM main_trade WHERE trade_id IN (${tradeIdValues.join(', ')});`;

        const deleteResult = await db.promise().query(deleteStudentsQuery);

        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ message: 'No students found to delete for the specified trade' });
        }

        // Send success response indicating deletion
        res.status(200).json({ message: 'All students removed from the trade successfully', affectedRows: deleteResult.affectedRows });
    } catch (error) {
        console.error('Error deleting students for trade:', error);
        res.status(500).json({ message: 'An error occurred while deleting students for the trade' });
    }
};
// Get all students assigned to a trade based on usercourseid without marks
export const trade_getStudentsForTrade = async (req, res) => {
    const { uid } = req.params; // User Course ID from the request parameters
    const usercourseid = uid;

    if (!usercourseid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Step 1: Retrieve question IDs linked to the given tradeid and usercourseid
        const getQuestionIdsQuery = `
            SELECT qt.trade_idq 
            FROM question_trade qt
            JOIN upload_trade ut ON qt.tradeid = ut.tradeid
            WHERE ut.usercourseid = ?;
        `;
        
        const [questionIds] = await db.promise().query(getQuestionIdsQuery, [usercourseid]);

        if (questionIds.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified trade and user course' });
        }

        // Extract trade_idq values
        const tradeIds = questionIds.map(row => row.trade_idq);

        // Step 2: Find all students linked to these trade_idq values
        const getStudentsQuery = `
             SELECT DISTINCT
                s.sid, 
                s.stud_clg_id, 
                s.student_name
            FROM 
                lms_students s
            JOIN 
                main_trade mt ON s.sid = mt.sid
            WHERE 
                mt.trade_id IN (${tradeIds.join(', ')});
        `;

        const [students] = await db.promise().query(getStudentsQuery);

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found for the specified trade' });
        }

        // Send success response with the list of students
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students for trade:', error);
        res.status(500).json({ message: 'An error occurred while fetching students for the trade' });
    }
};



// Add students with related questions to a mini project in main_minipro without marks
export const minipro_addStudentsWithQuestions = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;

    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Fetch miniid from upload_minipro based on usercourseid
        const fetchMiniIdQuery = `SELECT miniid FROM upload_minipro WHERE usercourseid = ?`;
        const [miniResults] = await db.promise().query(fetchMiniIdQuery, [usercourseid]);

        if (miniResults.length === 0) {
            return res.status(404).json({ message: 'No mini projects found for this course' });
        }

        const miniIds = miniResults.map(row => row.miniid);

        // Fetch question IDs related to each miniid in questions_minipro
        const fetchQuestionIdsQuery = `SELECT idquestions_minipro FROM questions_minipro WHERE minipro_id IN (${miniIds.join(', ')})`;
        const [questionResults] = await db.promise().query(fetchQuestionIdsQuery);

        if (questionResults.length === 0) {
            return res.status(404).json({ message: 'No questions found for the mini projects' });
        }

        // Prepare values for bulk insert into main_minipro table without marks
        const values = [];
        selectedStudents.forEach(sid => {
            questionResults.forEach(question => {
                values.push(`(${question.idquestions_minipro}, ${sid})`); // No initial marks included
            });
        });

        const insertQuery = `INSERT INTO main_minipro (miniid, sid) VALUES ${values.join(', ')} 
                             ON DUPLICATE KEY UPDATE miniid = VALUES(miniid)`;

        await db.promise().query(insertQuery);
        res.status(201).json({ message: 'Students and question IDs added to mini projects successfully' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};


// Delete a specific student from a specific mini project in main_minipro without marks
export const minipro_deleteStudentFromMiniProject = async (req, res) => {
    const { sid } = req.params; // Student ID from the request parameters
    const { userCourseId } = req.body; // User Course ID from the request body

    if (!sid || !userCourseId) {
        return res.status(400).json({ message: 'Student ID and User Course ID are required' });
    }

    try {
        // Step 1: Retrieve the mini project IDs linked to the given usercourseid
        const getMiniIdsQuery = `SELECT um.miniid FROM upload_minipro um WHERE um.usercourseid = ?;`;
        
        const [miniIds] = await db.promise().query(getMiniIdsQuery, [userCourseId]);

        if (miniIds.length === 0) {
            return res.status(404).json({ message: 'No mini projects found for the specified user course' });
        }

        // Extract miniid values
        const miniIdValues = miniIds.map(row => row.miniid);

        // Step 2: Delete entries in main_minipro for the specific student
        const deleteQuery = `DELETE FROM main_minipro WHERE sid = ? AND miniid IN (${miniIdValues.join(', ')});`;

        const [result] = await db.promise().query(deleteQuery, [sid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found in the mini project' });
        }

        res.status(200).json({ message: 'Student removed from mini project successfully' });
    } catch (error) {
        console.error('Error deleting student from mini project:', error);
        res.status(500).json({ message: 'An error occurred while deleting student from mini project' });
    }
};


// Delete all students for a specific mini project based on usercourseid without marks
export const minipro_deleteAllStudentsForMiniProject = async (req, res) => {
    const { uid } = req.params; // User Course ID from the request parameters
    const usercourseid = uid;

    if (!usercourseid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Step 1: Retrieve mini project IDs linked to the usercourseid
        const getMiniIdsQuery = `SELECT miniid FROM upload_minipro WHERE usercourseid = ?;`;
        
        const [miniIds] = await db.promise().query(getMiniIdsQuery, [usercourseid]);

        if (miniIds.length === 0) {
            return res.status(404).json({ message: 'No mini projects found for the specified user course' });
        }

        // Extract miniid values
        const miniIdValues = miniIds.map(row => row.miniid);

        // Step 2: Delete all students linked to these miniid values
        const deleteStudentsQuery = `DELETE FROM main_minipro WHERE miniid IN (${miniIdValues.join(', ')});`;

        const deleteResult = await db.promise().query(deleteStudentsQuery);

        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ message: 'No students found to delete for the specified mini project' });
        }

        // Send success response indicating deletion
        res.status(200).json({ message: 'All students removed from the mini project successfully', affectedRows: deleteResult.affectedRows });
    } catch (error) {
        console.error('Error deleting students for mini project:', error);
        res.status(500).json({ message: 'An error occurred while deleting students for the mini project' });
    }
};

// Get all students assigned to a mini project based on usercourseid without marks
export const minipro_getStudentsForMiniProject = async (req, res) => {
    const { uid } = req.params; // User Course ID from the request parameters
    const usercourseid = uid;

    if (!usercourseid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Step 1: Retrieve question IDs linked to the given miniid and usercourseid
        const getQuestionIdsQuery = `
            SELECT qm.idquestions_minipro 
            FROM questions_minipro qm
            JOIN upload_minipro um ON qm.minipro_id = um.miniid
            WHERE um.usercourseid = ?;
        `;
        
        const [questionIds] = await db.promise().query(getQuestionIdsQuery, [usercourseid]);

        if (questionIds.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified mini project and user course' });
        }

        // Extract idquestions_minipro values
        const miniIds = questionIds.map(row => row.idquestions_minipro);

        // Step 2: Find all students linked to these idquestions_minipro values
        const getStudentsQuery = `
            SELECT DISTINCT
                s.sid ,
                s.stud_clg_id, 
                s.student_name
            FROM 
                lms_students s
            JOIN 
                main_minipro mm ON s.sid = mm.sid
            WHERE 
                mm.miniid IN (${miniIds.join(', ')});
        `;

        const [students] = await db.promise().query(getStudentsQuery);

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found for the specified mini project' });
        }

        // Send success response with the list of students
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students for mini project:', error);
        res.status(500).json({ message: 'An error occurred while fetching students for the mini project' });
    }
};



//miniprosem
export const minisem_addStudentsToClass = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;

    // Validate input
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    console.log(selectedStudents);
    console.log(usercourseid);

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Query to fetch miniprosemid from upload_miniprosem based on usercourseid
        const fetchQidQuery = `SELECT miniprosemid FROM upload_miniprosem WHERE usercourseid = ?`;
        const [qidResults] = await db.promise().query(fetchQidQuery, [usercourseid]);

        if (qidResults.length === 0) {
            return res.status(404).json({ message: 'No questions found for this course' });
        }

        // Extract miniprosemid values
        const miniproid = qidResults[0].miniprosemid; // Use the first result or adjust based on your logic

        // Prepare insertion values for main_miniprosem
        const insertValues = selectedStudents.map(sid => `(${sid}, ${miniproid})`).join(', ');

        // Query to insert multiple rows into main_miniprosem (insert both sid and miniproid)
        const insertQuery = `INSERT INTO main_miniprosem (sid, miniproid) VALUES ${insertValues}`;

        // Execute the insert query
        await db.promise().query(insertQuery);

        // Send success response
        res.status(201).json({ message: 'Students added successfully' });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};

  
  
  
  export const minisem_deleteAllStudentsFromClass = (req, res) => {
  
    
    const {uid} = req.params;
    console.log(uid)
    try {
        // const { classId } = req.params;
  
        const query = `DELETE main_miniprosem 
FROM main_miniprosem 
JOIN upload_miniprosem ON main_miniprosem.miniproid = upload_miniprosem.miniprosemid 
WHERE upload_miniprosem.usercourseid = ?
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
  export const minisem_deleteStudentFromClass = async (req, res) => {
    const {  sid } = req.params;
    const {userCourseId} = req.body;
    console.log(userCourseId)
    // const classIdAsInt = parseInt(classId); // Convert cohortId to an integer
    const sidAsInt = parseInt(sid); // Convert cohortId to an integer
    console.log( "sid:", sid);  // Log the parameter
  
    const query = `DELETE main_miniprosem 
FROM main_miniprosem 
JOIN upload_miniprosem ON main_miniprosem.miniproid = upload_miniprosem.miniprosemid 
WHERE  main_miniprosem.sid = ? 
    AND upload_miniprosem.usercourseid = ?
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
  
  
  export const minisem_get_Usercourse_Students = (req, res) => {
    const { uid } = req.params; // Assuming classId is passed as a parameter
    const usercourseid = uid;

    if (!usercourseid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }
    const sql = `
SELECT DISTINCT
    s.sid, 
    s.stud_clg_id, 
    s.student_name,
    ua.logbookmarks, 
    ua.review1marks, 
    ua.review2marks, 
    ua.proreportmarks,
    ua.miniproid  -- Ensure this is included to retrieve the miniproid
FROM 
    lms_students AS s
JOIN 
    main_miniprosem AS ua ON s.sid = ua.sid
JOIN 
    upload_miniprosem AS ti ON ua.miniproid = ti.miniprosemid
WHERE 
    ti.usercourseid = ?

    `;
  
    db.query(sql, [usercourseid], (error, results) => {
        if (error) {
            console.error('Error fetching classroom students:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        res.status(200).json(results);
    });
  };

  //majorprosem
  export const majorsem_addStudentsToClass = async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;

    // Validate input
    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    console.log(selectedStudents);
    console.log(usercourseid);

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Query to fetch miniprosemid from upload_miniprosem based on usercourseid
        const fetchQidQuery = `SELECT majorprosemid FROM upload_majorprosem WHERE usercourseid = ?`;
        const [qidResults] = await db.promise().query(fetchQidQuery, [usercourseid]);

        if (qidResults.length === 0) {
            return res.status(404).json({ message: 'No questions found for this course' });
        }

        // Extract miniprosemid values
        const majorprosemid = qidResults[0].majorprosemid; // Use the first result or adjust based on your logic

        // Prepare insertion values for main_miniprosem
        const insertValues = selectedStudents.map(sid => `(${sid}, ${majorprosemid})`).join(', ');

        // Query to insert multiple rows into main_miniprosem (insert both sid and miniproid)
        const insertQuery = `INSERT INTO main_majorprosem (sid, majorprosemid) VALUES ${insertValues}`;

        // Execute the insert query
        await db.promise().query(insertQuery);

        // Send success response
        res.status(201).json({ message: 'Students added successfully' });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};

  
  
  
  export const majorsem_deleteAllStudentsFromClass = (req, res) => {
  
    
    const {uid} = req.params;
    console.log(uid)
    try {
        // const { classId } = req.params;
  
        const query = `DELETE main_majorprosem 
FROM main_majorprosem 
JOIN upload_majorprosem ON main_majorprosem.majorprosemid = upload_majorprosem.majorprosemid 
WHERE upload_majorprosem.usercourseid = ?
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
  export const majorsem_deleteStudentFromClass = async (req, res) => {
    const {  sid } = req.params;
    const {userCourseId} = req.body;
    console.log(userCourseId)
    // const classIdAsInt = parseInt(classId); // Convert cohortId to an integer
    const sidAsInt = parseInt(sid); // Convert cohortId to an integer
    console.log( "sid:", sid);  // Log the parameter
  
    const query = `DELETE main_majorprosem 
FROM main_majorprosem 
JOIN upload_majorprosem ON main_majorprosem.majorprosemid = upload_majorprosem.majorprosemid 
WHERE  main_majorprosem.sid = ? 
    AND upload_majorprosem.usercourseid = ?
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
  
  
  export const majorsem_get_Usercourse_Students = (req, res) => {
    const { uid } = req.params; // Assuming classId is passed as a parameter
    const usercourseid = uid;

    if (!usercourseid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }
    const sql = `
SELECT DISTINCT
    s.sid, 
    s.stud_clg_id, 
    s.student_name,
    ua.logbookmarks, 
    ua.review1marks, 
    ua.review2marks, 
    ua.proreportmarks,
    ua.majorprosemid  
FROM 
    lms_students AS s
JOIN 
    main_majorprosem AS ua ON s.sid = ua.sid
JOIN 
    upload_majorprosem AS ti ON ua.majorprosemid = ti.majorprosemid
WHERE 
    ti.usercourseid = ?

    `;
  
    db.query(sql, [usercourseid], (error, results) => {
        if (error) {
            console.error('Error fetching classroom students:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        res.status(200).json(results);
    });
  };





export const addStudentsWithFeedbackQuestions =ExpressAsyncHandler( async (req, res) => {
    const { selectedStudents, usercourseid } = req.body;

    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
    }

    if (!usercourseid) {
        return res.status(400).json({ message: 'No usercourseid provided' });
    }

    try {
        // Fetch question IDs related to the usercourse_id in question_feedback
        const fetchQuestionIdsQuery = `
            SELECT qid 
            FROM question_feedback 
            WHERE questionno_id = (
                SELECT feedback_id 
                FROM feedback 
                WHERE usercourse_id = ?
            )
        `;
        const [questionResults] = await db.promise().query(fetchQuestionIdsQuery, [usercourseid]);

        if (questionResults.length === 0) {
            return res.status(404).json({ message: 'No questions found for this course' });
        }

        // Prepare values for bulk insert into student_feedback table
        const values = [];
        selectedStudents.forEach(sid => {
            questionResults.forEach(question => {
                values.push([usercourseid, sid, question.qid]); // Insert usercourseid, sid, qid only
            });
        });

        const insertQuery = `
            INSERT INTO student_feedback (usercourseid, sid, qid) 
            VALUES ?
            ON DUPLICATE KEY UPDATE 
                usercourseid = VALUES(usercourseid), 
                sid = VALUES(sid), 
                qid = VALUES(qid)
        `;

        await db.promise().query(insertQuery, [values]);
        res.status(201).json({ message: 'Students and question IDs added to feedback successfully' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
});

export const deleteAllStudentFeedbackForCourse = ExpressAsyncHandler(async (req, res) => {
    const { uid } = req.params; // `usercourseid` from the request parameters
    const usercourseid = uid;

    if (!usercourseid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Step 1: Retrieve all qid values linked to the usercourseid in question_feedback
        const getQuestionIdsQuery = `
            SELECT qid 
            FROM question_feedback 
            WHERE questionno_id = (
                SELECT feedback_id 
                FROM feedback 
                WHERE usercourse_id = ?
            )
        `;

        const [questionIds] = await db.promise().query(getQuestionIdsQuery, [usercourseid]);

        if (questionIds.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified user course' });
        }

        // Extract qid values from the result
        const questionIdValues = questionIds.map(row => row.qid);

        // Step 2: Delete all student feedback linked to these qid values and the specified usercourseid
        const deleteFeedbackQuery = `
            DELETE FROM student_feedback 
            WHERE usercourseid = ? 
            AND qid IN (${questionIdValues.join(', ')})
        `;

        const [deleteResult] = await db.promise().query(deleteFeedbackQuery, [usercourseid]);

        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ message: 'No student feedback found to delete for the specified course' });
        }

        // Send success response indicating deletion
        res.status(200).json({ message: 'All student feedback removed for the specified course successfully', affectedRows: deleteResult.affectedRows });
    } catch (error) {
        console.error('Error deleting student feedback for course:', error);
        res.status(500).json({ message: 'An error occurred while deleting student feedback for the course' });
    }
});


export const deleteStudentFeedbackForCourse = async (req, res) => {
    const { sid } = req.params; // Student ID from request parameters
    const { usercourseid } = req.body; // User Course ID from request body

    if (!sid || !usercourseid) {
        return res.status(400).json({ message: 'Student ID and User Course ID are required' });
    }

    try {
        // Step 1: Retrieve question IDs (qid) linked to the given usercourseid
        const getQuestionIdsQuery = `
            SELECT qid 
            FROM question_feedback 
            WHERE questionno_id = (
                SELECT feedback_id 
                FROM feedback 
                WHERE usercourse_id = ?
            )
        `;

        const [questionIds] = await db.promise().query(getQuestionIdsQuery, [usercourseid]);

        if (questionIds.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified user course' });
        }

        // Extract qid values from the result
        const questionIdValues = questionIds.map(row => row.qid);

        // Step 2: Delete entries in student_feedback for the specific student
        const deleteQuery = `
            DELETE FROM student_feedback 
            WHERE sid = ? 
            AND usercourseid = ? 
            AND qid IN (${questionIdValues.join(', ')})
        `;

        const [result] = await db.promise().query(deleteQuery, [sid, usercourseid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No feedback records found for the specified student and course' });
        }

        res.status(200).json({ message: 'Student feedback records removed successfully' });
    } catch (error) {
        console.error('Error deleting student feedback records:', error);
        res.status(500).json({ message: 'An error occurred while deleting student feedback records' });
    }
};


export const getStudentsForFeedbackCourse = async (req, res) => {
    const { uid } = req.params; // `usercourseid` from request parameters
    const usercourseid = uid;

    if (!usercourseid) {
        return res.status(400).json({ message: 'User Course ID is required' });
    }

    try {
        // Step 1: Find all students linked to the usercourseid in student_feedback
        const getStudentsQuery = `
            SELECT DISTINCT 
                s.sid, 
                s.stud_clg_id, 
                s.student_name
            FROM 
                lms_students s
            JOIN 
                student_feedback sf ON s.sid = sf.sid
            WHERE 
                sf.usercourseid = ?
        `;

        const [students] = await db.promise().query(getStudentsQuery, [usercourseid]);

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found for the specified course' });
        }

        // Send success response with the list of students
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students for feedback course:', error);
        res.status(500).json({ message: 'An error occurred while fetching students for the course' });
    }
};




export const addReportsWithStudents = async (req, res) => {
    const { report_id, students } = req.body;
  
    // Validate inputs
    if (!report_id || !students || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }
  
    try {
      // Prepare query for adding students to the report
      const values = students.map((student) => `(${report_id}, ${student.sid})`);
      const sql = `
        INSERT INTO main_report (report_id, sid) 
        VALUES ${values.join(", ")} 
        ON DUPLICATE KEY UPDATE sid = VALUES(sid);
      `;
  
      // Execute query
      await db.promise().query(sql);
  
      res.status(201).json({ message: "Reports and students added successfully" });
    } catch (error) {
      console.error("Error adding reports:", error);
      res.status(500).json({ message: "Error adding reports and students" });
    }
  };
  

  export const addStudentsToReports = (req, res) => {
    const { usercourseid, selectedStudents } = req.body;
  
    // Validate inputs
    if (!usercourseid || !selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }
  
    // Fetch report IDs associated with the usercourseid
    const fetchReportsQuery = `
      SELECT report_id 
      FROM upload_report 
      WHERE usercourseid = ?;
    `;
  
    db.query(fetchReportsQuery, [usercourseid], (fetchError, reportResults) => {
      if (fetchError) {
        console.error("Error fetching reports:", fetchError);
        return res.status(500).json({ message: "Error fetching reports" });
      }
  
      if (reportResults.length === 0) {
        return res.status(404).json({ message: "No reports found for the specified user course" });
      }
  
      // Prepare values for inserting students into main_report
      const values = [];
      reportResults.forEach(({ report_id }) => {
        selectedStudents.forEach((sid) => {
          values.push([report_id, sid]);
        });
      });
  
      // Prepare query for inserting into main_report
      const insertQuery = `
        INSERT INTO main_report (report_id, sid) 
        VALUES ? 
        ON DUPLICATE KEY UPDATE sid = VALUES(sid);
      `;
  
      db.query(insertQuery, [values], (insertError, insertResult) => {
        if (insertError) {
          console.error("Error inserting students into reports:", insertError);
          return res.status(500).json({ message: "Error adding students to reports" });
        }
  
        res.status(201).json({ message: "Students added to reports successfully", affectedRows: insertResult.affectedRows });
      });
    });
  };
  

  export const report_get_Usercourse_Students = (req, res) => {
    const { uid } = req.params;
    console.log("User Course ID:", uid);
  
    const sql = `
      SELECT DISTINCT
        s.sid, 
        s.stud_clg_id, 
        s.student_name
      FROM 
        lms_students s
      JOIN 
        main_report mr ON s.sid = mr.sid
      JOIN 
        upload_report ur ON mr.report_id = ur.report_id
      WHERE 
        ur.usercourseid = ?;
    `;
  
    db.query(sql, [uid], (error, results) => {
      if (error) {
        console.error('Error fetching report students:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      res.status(200).json(results);
    });
  };



  export const report_deleteStudentFromClass = (req, res) => {
    const { sid } = req.params; // Student ID from URL params
    const { userCourseId } = req.body; // User Course ID from request body
    const sidAsInt = parseInt(sid);
  
    const query = `
      DELETE main_report
      FROM main_report
      JOIN upload_report ON main_report.report_id = upload_report.report_id
      WHERE main_report.sid = ?
      AND upload_report.usercourseid = ?;
    `;
  
    try {
      db.query(query, [sidAsInt, userCourseId], (error, result) => {
        if (error) {
          console.error('Error deleting student from report:', error);
          return res.status(500).json({ message: 'Error deleting student from report' });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Student not found in the report' });
        }
  
        res.status(200).json({
          message: 'Student removed from the report successfully',
          affectedRows: result.affectedRows,
        });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while deleting the student' });
    }
  };
  

  export const report_deleteAllStudentsFromClass = (req, res) => {
    const { uid } = req.params; // `uid` is the usercourseid
    console.log("Usercourse ID:", uid);
  
    try {
      // Delete all rows from main_report based on usercourseid in upload_report
      const query = `
        DELETE main_report
        FROM main_report
        JOIN upload_report ON main_report.report_id = upload_report.report_id
        WHERE upload_report.usercourseid = ?;
      `;
  
      db.query(query, [uid], (error, result) => {
        if (error) {
          console.error('Error deleting students from reports:', error);
          return res.status(500).json({ message: 'Error deleting students from reports' });
        }
  
        if (result.affectedRows === 0) {
          return res.status(200).json({ message: 'No students found in the reports for this class' });
        }
  
        res.status(200).json({
          message: 'All students removed from reports successfully',
          affectedRows: result.affectedRows,
        });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while deleting students from reports' });
    }
  };
  
  
