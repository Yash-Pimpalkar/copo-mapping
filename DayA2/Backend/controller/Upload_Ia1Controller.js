import { connection as db } from "../config/dbConfig.js";

export const upload_Ia_questions = async (req, res) => {
  const { formDataWithUserCourseId } = req.body;

  // console.log('Received data:', formDataWithUserCourseId);

  // Validate input
  if (!formDataWithUserCourseId || typeof formDataWithUserCourseId !== 'object') {
    return res.status(400).json({ error: 'Invalid data' });
  }

  // Extract data and ensure it's in array format
  const dataArray = Object.values(formDataWithUserCourseId);

  // Check if dataArray is empty
  if (dataArray.length === 0) {
    return res.status(400).json({ error: 'No data to insert' });
  }

  const { usercourseid } = dataArray[0];

  // Prepare the SQL query and values for batch insertion

  try {
    // Check if usercourseid already exists
    const checkQuery = 'SELECT * FROM table_ia WHERE usercourseid = ?';
    db.query(checkQuery, [usercourseid], (error, results) => {
      if (error) {
        console.log('Error checking existing usercourseid:', error);
        return res.status(500).json({ error: error.message });
      }

      if (results.length > 0) {
        // If usercourseid already exists, return an error
        return res.status(400).json({ error: 'UserCourse ID already exists' });
      } else {
        // Prepare the SQL query and values for batch insertion
        const query = 'INSERT INTO table_ia (qname, coname, usercourseid, marks) VALUES ?';
        const values = dataArray.map(({ qname, coname, usercourseid, marks }) => [qname, coname, usercourseid, marks]);
        // Perform the batch insert
        db.query(query, [values], (error, result) => {
          if (error) {
            console.log(error);
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


export const insertiastudents = (req, res) => {
  const sql = `INSERT INTO upload_ia (sid, qid)
SELECT DISTINCT csd.sid, ia.idtable_ia AS qid
FROM copo_students_details csd
JOIN semester s ON csd.sid = s.sid
JOIN user_course uc ON csd.branch = uc.branch AND s.sem = uc.semester
JOIN table_ia ia ON uc.usercourse_id = ia.usercourseid
WHERE uc.usercourse_id IS NOT NULL;
INSERT INTO upload_ia2 (sid, qid)
SELECT DISTINCT csd.sid, ia.idtable_ia2 AS qid
FROM copo_students_details csd
JOIN semester s ON csd.sid = s.sid
JOIN user_course uc ON csd.branch = uc.branch AND s.sem = uc.semester
JOIN table_ia2 ia ON uc.usercourse_id = ia.usercourseid
WHERE uc.usercourse_id IS NOT NULL;
INSERT INTO table_sem (sid, semid)
SELECT DISTINCT csd.sid, ia.semid AS marks
FROM copo_students_details csd
JOIN semester s ON csd.sid = s.sid
JOIN user_course uc ON csd.branch = uc.branch AND s.sem = uc.semester
JOIN semester_marks ia ON uc.usercourse_id = ia.usercourseid
WHERE uc.usercourse_id IS NOT NULL

INSERT INTO table_oral (sid, oralid)
SELECT DISTINCT csd.sid, ia.oralid
FROM copo_students_details csd
JOIN semester s ON csd.sid = s.sid
JOIN user_course uc ON csd.branch = uc.branch AND s.sem = uc.semester
JOIN oral_marks ia ON uc.usercourse_id = ia.usercourseid
WHERE uc.usercourse_id IS NOT NULL;
`

}

// export const showiadata = (req,res)=>{
//    const id=req.params.uid;
//   const sql=`SELECT
//     ui.qid,
//     ui.sid,
//     ui.marks,
//     ti.qname,
//     ti.idtable_ia,
//     ti.coname,
//     csd.student_name,
//     csd.stud_clg_id
// FROM
//     upload_ia ui
// JOIN
//     table_ia ti ON ui.qid = ti.idtable_ia
// JOIN
//     user_course uc ON ti.usercourseid = uc.usercourse_id
// JOIN
//     copo_students_details csd ON ui.sid = csd.sid
// WHERE
//     uc.usercourse_id = ?`;
//     db.query(sql,id,(error,result)=>{
//       if (error){
//         console.log(error);
//         return res.status(500).json({ error: error.message });
//     }
//     res.status(200).json(result)
//     })
//   }

export const showIaData = async (req, res) => {
  const userCourseId = req.params.uid;
  console.log(userCourseId);
  
  if (!userCourseId) {
    return res.status(400).send('Invalid userCourseId');
  }

  const sql = 'CALL GetStudentMarksByCourseID(?)';
  db.query(sql, [userCourseId], (error, results) => {
    if (error) {
      console.log('Error fetching IA data:', error);
      return res.status(500).send('Server error');
    }

    // Check if results is a valid array and has the expected structure
    if (!results || results.length === 0 || !results[0] || results[0].length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }

    // Now safely check for the 'message' field if it exists
    if (results[0][0].message) {
      return res.status(404).json({ error: results[0][0].message });
    }

    return res.status(200).json(results[0]);
  });
};

  

export const IaCOsName = (req, res) => {
  const userCourseId = req.params.uid;
  const sql = `select * from table_ia where usercourseid = ? `;
  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching IA data:', error);
      res.status(500).send('Server error');
    }
    console.log(results)
    res.status(200).json(results);
  })
}



export const IaUpload = async (req, res) => {
  const updates = req.body; // Expecting an array of update objects
  console.log('Received updates:', updates);

  // Validate input format
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the query and values
  const sql = 'UPDATE upload_ia SET marks = ? WHERE sid = ? AND qid = ?';
  const queryValues = updates.map(update => [
    update.marks === null ? null : parseInt(update.marks, 10), // Use null if marks is null, otherwise parse the integer
    update.sid,
    update.qid
  ]);

  // Log the queryValues for debugging
  console.log('Query Values:', queryValues);

  try {
    // Use Promise.all to handle multiple queries in parallel
    await Promise.all(queryValues.map(values => {
      return new Promise((resolve, reject) => {
        console.log(`Executing query: ${sql} with values: ${values}`);
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error('Database query error:', error); // More detailed error logging
            return reject(error);
          }
          console.log('Query result:', results); // Log results of the query
          resolve(results);
        });
      });
    }));

    // Send success response after all updates are complete
    res.status(200).json('Marks updated successfully');
  } catch (error) {
    console.error('Error updating marks:', error);
    res.status(500).json('Server error');
  }
};


export const Ia2COsName = (req, res) => {
  const userCourseId = req.params.uid;
  const sql = `select * from table_ia2 where usercourseid = ? `;
  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching IA data:', error);
      res.status(500).send('Server error');
    }
    console.log(results)
    res.status(200).json(results);
  })
}

// Define the userCourseID

// export const showia2data = (req,res)=>{
//   const id=req.params.uid;
//  const sql=`SELECT
//    ui.qid,
//    ui.sid,
//    ui.marks,
//    ti.qname,
//    ti.idtable_ia,
//    ti.coname,
//    csd.student_name,
//    csd.stud_clg_id
// FROM
//    upload_ia ui
// JOIN
//    table_ia ti ON ui.qid = ti.idtable_ia
// JOIN
//    user_course uc ON ti.usercourseid = uc.usercourse_id
// JOIN
//    copo_students_details csd ON ui.sid = csd.sid
// WHERE
//    uc.usercourse_id = ?`;
//    db.query(sql,id,(error,result)=>{
//      if (error){
//        console.log(error);
//        return res.status(500).json({ error: error.message });
//    }
//    res.status(200).json(result)
//    })
//  }



export const showIa2Data = async (req, res) => {
  const userCourseId = req.params.uid;
  console.log(userCourseId);

  if (!userCourseId) {
    return res.status(400).send('Invalid userCourseId');
  }

  const sql = 'CALL GetStudentMarksByCourseID_IA2(?)';
  db.query(sql, [userCourseId], (error, results) => {
    if (error) {
      console.error('Error fetching IA data:', error);
      return res.status(500).send('Server error');
    }

    console.log('Results:', results);  // Print results to inspect its structure

    // Check if results exist and contain expected data
    if (!results || results.length === 0 || !Array.isArray(results[0]) || results[0].length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }

    // Check if results[0][0] has a message property
    if (results[0][0].message) {
      return res.status(404).json({ error: results[0][0].message });
    }

    res.status(200).json(results[0]);
  });
};






export const Ia2Upload = async (req, res) => {
  const updates = req.body; // Expecting an array of update objects
  console.log('Received updates:', updates);

  // Validate input format
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the query and values
  const sql = 'UPDATE upload_ia2 SET marks = ? WHERE sid = ? AND qid = ?';
  const queryValues = updates.map(update => [
    update.marks === null ? null : parseInt(update.marks, 10), // Use null if marks is null, otherwise parse the integer
    update.sid,
    update.qid
  ]);

  // Log the queryValues for debugging
  console.log('Query Values:', queryValues);

  try {
    // Use Promise.all to handle multiple queries in parallel
    await Promise.all(queryValues.map(values => {
      return new Promise((resolve, reject) => {
        console.log(`Executing query: ${sql} with values: ${values}`);
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error('Database query error:', error); // More detailed error logging
            return reject(error);
          }
          console.log('Query result:', results); // Log results of the query
          resolve(results);
        });
      });
    }));

    // Send success response after all updates are complete
    res.status(200).json('Marks updated successfully');
  } catch (error) {
    console.error('Error updating marks:', error);
    res.status(500).json('Server error');
  }
};


// export const upload_Ia2_questions = async (req, res) => {
//   const { formDataWithUserCourseId } = req.body;

//   console.log('Received data:', formDataWithUserCourseId);

//   // Validate input
//   if (!formDataWithUserCourseId || typeof formDataWithUserCourseId !== 'object') {
//     return res.status(400).json({ error: 'Invalid data' });
//   }

//   // Extract data and ensure it's in array format
//   const dataArray = Object.values(formDataWithUserCourseId);

//   // Check if dataArray is empty
//   if (dataArray.length === 0) {
//     return res.status(400).json({ error: 'No data to insert' });
//   }

//   // Prepare the SQL query and values for batch insertion
//   const query = 'INSERT INTO table_ia2 (qname, coname, usercourseid, marks) VALUES ?';
//   const values = dataArray.map(({ qname, coname, usercourseid, marks }) => [qname, coname, usercourseid, marks]);


//   // Perform the batch insert
//   db.query(query, [values], (error, result) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({ error: error.message });
//     }

//     res.status(201).json({ message: 'Data submitted successfully' });
//   });
// };


export const upload_Ia2_questions = async (req, res) => {
  const { formDataWithUserCourseId } = req.body;

  // console.log('Received data:', formDataWithUserCourseId);

  // Validate input
  if (!formDataWithUserCourseId || typeof formDataWithUserCourseId !== 'object') {
    return res.status(400).json({ error: 'Invalid data' });
  }

  // Extract data and ensure it's in array format
  const dataArray = Object.values(formDataWithUserCourseId);

  // Check if dataArray is empty
  if (dataArray.length === 0) {
    return res.status(400).json({ error: 'No data to insert' });
  }

  const { usercourseid } = dataArray[0];

  // Prepare the SQL query and values for batch insertion

  try {
    // Check if usercourseid already exists
    const checkQuery = 'SELECT * FROM table_ia2 WHERE usercourseid = ?';
    db.query(checkQuery, [usercourseid], (error, results) => {
      if (error) {
        console.log('Error checking existing usercourseid:', error);
        return res.status(500).json({ error: error.message });
      }

      if (results.length > 0) {
        // If usercourseid already exists, return an error
        return res.status(400).json({ error: 'UserCourse ID already exists' });
      } else {
        // Prepare the SQL query and values for batch insertion
        const query = 'INSERT INTO table_ia2 (qname, coname, usercourseid, marks) VALUES ?';
        const values = dataArray.map(({ qname, coname, usercourseid, marks }) => [qname, coname, usercourseid, marks]);
        // Perform the batch insert
        db.query(query, [values], (error, result) => {
          if (error) {
            console.log(error);
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




export const Ia1_Attainment = async (req, res) => {
  const { coAverages, categorization, userCourseId } = req.body;

  console.log(coAverages, categorization, userCourseId);

  try {
    for (let i = 0; i < coAverages.length; i++) {
      const { coName, coAverage } = coAverages[i];
      const category = categorization[i]; // Get corresponding categorization

      // Check if the coname and usercourse_id combination already exists
      const sql = "SELECT id_attainment FROM ia1_attainment WHERE coname = ? AND usercourse_id = ?";
      db.query(sql, [coName, userCourseId], (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: error.message });
        }

        if (results.length > 0) {
          // If exists, update the attainment value and ia1_attainment (categorization)
          const sql1 = "UPDATE ia1_attainment SET attainment = ?, ia1_attainment = ? WHERE id_attainment = ?";
          db.query(sql1, [parseFloat(coAverage), category, results[0].id_attainment], (error, result) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Updated attainment and categorization for ${coName}`);
          });
        } else {
          // If doesn't exist, insert a new record
          const sql2 = "INSERT INTO ia1_attainment (coname, attainment, ia1_attainment, usercourse_id) VALUES (?, ?, ?, ?)";
          db.query(sql2, [coName, parseFloat(coAverage), category, userCourseId], (error, results1) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Inserted new attainment and categorization for ${coName}`);
          });
        }
      });
    }

    console.log('CO averages and categorizations inserted/updated successfully');
    res.status(200).json({ message: 'CO averages and categorizations inserted/updated successfully' });
  } catch (error) {
    console.error('Error inserting/updating CO averages and categorizations:', error);
    res.status(500).json({ error: 'Error inserting/updating CO averages and categorizations' });
  }
};



export const Ia2_Attainment = async (req, res) => {
  const { coAverages, categorization, userCourseId } = req.body;

  console.log(coAverages, categorization, userCourseId);

  try {
    for (let i = 0; i < coAverages.length; i++) {
      const { coName, coAverage } = coAverages[i];
      const category = categorization[i]; // Get corresponding categorization

      // Check if the coname and usercourse_id combination already exists
      const sql = "SELECT id_attainment FROM ia2_attainment WHERE coname = ? AND usercourse_id = ?";
      db.query(sql, [coName, userCourseId], (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: error.message });
        }
        if (results.length > 0) {
       
          // If exists, update the attainment value and ia2_attainment (categorization)
          const sql1 = "UPDATE ia2_attainment SET attainment = ?, ia2_attainment = ? WHERE id_attainment = ?";
          db.query(sql1, [parseFloat(coAverage), category, results[0].id_attainment], (error, result) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Updated attainment and categorization for ${coName}`);
          });
        } else {
          // If doesn't exist, insert a new record
          const sql2 = "INSERT INTO ia2_attainment (coname, attainment, ia2_attainment, usercourse_id) VALUES (?, ?, ?, ?)";
          db.query(sql2, [coName, parseFloat(coAverage), category, userCourseId], (error, results1) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Inserted new attainment and categorization for ${coName}`);
          });
        }
      });
    }

    console.log('CO averages and categorizations inserted/updated successfully');
    res.status(200).json({ message: 'CO averages and categorizations inserted/updated successfully' });
  } catch (error) {
    console.error('Error inserting/updating CO averages and categorizations:', error);
    res.status(500).json({ error: 'Error inserting/updating CO averages and categorizations' });
  }
};


//important for addstudent point of view 

export const addStudentsToClass = async (req, res) => {
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



export const deleteAllStudentsFromClass = (req, res) => {

  try {
      // const { classId } = req.params;

      const query = `DELETE FROM upload_ia WHERE sid = ?`;

      // Execute the query
      db.query(query, (error, result) => {
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
  const {  sid } = req.params;
  // const classIdAsInt = parseInt(classId); // Convert cohortId to an integer
  const sidAsInt = parseInt(sid); // Convert cohortId to an integer
  console.log( "sid:", sid);  // Log the parameters

  const query = `DELETE FROM upload_ia  WHERE sid = ?`;
  
  try {
      // Execute the query
      db.query(query, [ sidAsInt], (error, result) => {
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


export const get_Usercourse_Students = (req, res) => {
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
