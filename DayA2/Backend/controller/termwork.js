import { connection as db } from "../config/dbConfig.js";


// Fetch termwork data (twbody) from the database
export const fetchTermworkLabels = (req, res) => {
    const userCourseId = req.params.userCourseId;
  
    // Query to get all termwork labels from termworkbase
    const getAllLabelsQuery = "SELECT twid, twbody FROM termworkbase";
    
    // Query to get the selected twid for the given userCourseId from termwork_table
    const getSelectedTwidQuery = "SELECT tw_id FROM termwork_table WHERE usercourseid = ?";
  
    // Execute both queries using Promises
    db.query(getAllLabelsQuery, (error, allLabelsResults) => {
      if (error) {
        return res.status(500).json({ message: "Error fetching termwork data", error });
      }
  
      // Get the selected twid if exists in the termwork_table
      db.query(getSelectedTwidQuery, [userCourseId], (error, selectedTwidResults) => {
        if (error) {
          return res.status(500).json({ message: "Error fetching selected termwork", error });
        }
  
        const selectedTwid = selectedTwidResults.length > 0 ? selectedTwidResults[0].tw_id : null;
  
        // Return both the termwork labels and the selected twid (if any)
        res.status(200).json({ labels: allLabelsResults, selectedTwid });
      });
    });
  };
  

  export const submitTermworkId = (req, res) => {
    const { userCourseId, tw_id } = req.body;
  
    // Check if the userCourseId already exists in the termwork_table
    const checkSql = "SELECT * FROM termwork_table WHERE usercourseid = ?";
    db.query(checkSql, [userCourseId], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Database error", error });
      }
  
      if (results.length > 0) {
        // If it exists, update the tw_id
        const updateSql = "UPDATE termwork_table SET tw_id = ? WHERE usercourseid = ?";
        db.query(updateSql, [tw_id, userCourseId], (updateError) => {
          if (updateError) {
            return res.status(500).json({ message: "Failed to update termwork", error: updateError });
          }
          return res.status(200).json({ updated: true, message: "Termwork updated successfully!" });
        });
      } else {
        // If it doesn't exist, insert a new record
        const insertSql = "INSERT INTO termwork_table (tw_id, usercourseid) VALUES (?, ?)";
        db.query(insertSql, [tw_id, userCourseId], (insertError) => {
          if (insertError) {
            return res.status(500).json({ message: "Failed to insert termwork", error: insertError });
          }
          return res.status(200).json({ success: true, message: "Termwork saved successfully!" });
        });
      }
    });
  };



  export const getTermworkData = (req, res) => {
    const { usercourseid } = req.params;
     console.log(usercourseid)
    // Check if there's a TW ID in the termwork_table for the given usercourse_id
    const sqlTermwork = 'SELECT tw_id FROM termwork_table WHERE usercourseid = ?';
    db.query(sqlTermwork, [usercourseid], (error, termworkResult) => {
      if (error) {
        console.error('Error fetching termwork ID:', error);
        return res.status(500).json({ error: "Internal server error" });
      }
  
      // If no TW ID exists, return an error
      console.log(termworkResult)
      if (!termworkResult.length || !termworkResult[0].tw_id) {
        return res.status(400).json({ error: "Term work not selected" });
      }
  
      const twid = termworkResult[0].tw_id;
      console.log(twid)
      // Fetch the corresponding data from termworkbase_table using the twid
      const sqlTermworkBase = 'SELECT * FROM termworkbase WHERE twid = ?';
      db.query(sqlTermworkBase, twid, (error, termworkBaseResult) => {
        if (error) {
          console.error('Error fetching termwork base data:', error);
          return res.status(500).json({ error: "Internal server error" });
        }
  
        if (!termworkBaseResult.length) {
          return res.status(404).json({ error: "No termwork data found for the given TW ID" });
        }
     console.log(termworkBaseResult)
        // Send the termwo rk base data to the frontend
        res.status(200).json(termworkBaseResult);
      });
    });
  };



  
  export const getTermworkAssignment = (req, res) => {
    const { usercourseid } = req.params;
    
    const uc=parseInt(usercourseid);
    // Execute the stored procedure
    const sql = `CALL GetAssignmentMarks(?)`
    db.query(sql, uc, (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      // console.log(results)
      // Handle the results of the stored procedure
      res.status(200).json({
        message: 'Assignment marks retrieved successfully',
        data: results[1] // assuming the results are returned in the first index
      });
    });
  };


  export const getAssignmentsAndCOs = async (req, res) => {
    const { usercourseid } = req.params;
  
    if (!usercourseid) {
      return res.status(400).json({ error: 'usercourseid is required' });
    }
  
    try {
      const sql = `
        SELECT
          ua.usercourseid,
          ua.maxmarks,
          qa.assign_id AS assign_id,
          qa.assignment_name AS question_name,
          qa.assign_idq AS question_id,   -- Ensure this is 'question_id'
          GROUP_CONCAT(ca.coname ORDER BY ca.co_id) AS conames
        FROM
          upload_assign ua
        JOIN
          question_assignment qa ON ua.assignid = qa.assign_id
        LEFT JOIN
          co_ass ca ON qa.assign_idq = ca.co_id
        WHERE
          ua.usercourseid = ?
        GROUP BY
          ua.usercourseid, ua.maxmarks, qa.assign_id, qa.assign_idq, qa.assignment_name;
      `;
  
      // Execute the query
      db.query(sql, [usercourseid], (error, results) => {
        if (error) {
          console.error('Error executing the query:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        // Log the raw results to ensure the query works correctly
        console.log('Raw results from SQL query:', results);
  
        // Format the results, making sure to map 'assign_idq' to 'question_id'
        const formattedResults = results.map(row => ({
          usercourseid: row.usercourseid,
          maxmarks: row.maxmarks,
          assign_id: row.assign_id,
          question_name: row.question_name,
          question_id: row.question_id,  // Make sure this is being mapped correctly
          conames: row.conames ? row.conames.split(',') : []
        }));
  
        // Log the formatted results to verify the transformation
        console.log('Formatted results:', formattedResults);
  
        // Return the formatted results as JSON
        res.status(200).json(formattedResults);
      });
    } catch (error) {
      console.error('Error fetching assignments and COs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


// assuming you have a database config file for MySQL

// Update Assignments
export const updateAssignments = async (req, res) => {
  const { sid, assignments } = req.body;

  // Check if the input is for a single student or multiple students
  let studentAssignmentsData = [];

  if (sid && Array.isArray(assignments)) {
    // Single student case
    studentAssignmentsData = [{ sid, assignments }];
    console.log("Single student case:", JSON.stringify(studentAssignmentsData[0].assignments, null, 2));
  } else if (Array.isArray(assignments) && assignments.length > 0 && assignments[0].sid) {
    // Multiple students case
    studentAssignmentsData = assignments;
    console.log("Multiple students case:", JSON.stringify(studentAssignmentsData, null, 2));
  } else {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    // Array to store promises for database queries
    const updatePromises = [];

    // Loop through each student's assignment data
    for (const studentData of studentAssignmentsData) {
      const { sid, assignments: studentAssignments } = studentData;

      // Validate student ID
      if (!sid || typeof sid !== 'number') {
        return res.status(400).json({ message: 'Invalid or missing student ID (sid)' });
      }

      // Loop through each assignment and prepare the query promises
      for (const assignment of studentAssignments) {
        const { question_id, value } = assignment;

        if (!question_id) {
          return res.status(400).json({ message: `Invalid assignment data for student ID: ${sid}` });
        }

        console.log(`Preparing query for student ${sid}, question_id ${question_id}, value ${value}`);

        // Create a promise for each query
        const updatePromise = new Promise((resolve, reject) => {
          const updateQuery = `
            UPDATE mainassign 
            SET marks = ? 
            WHERE assignid = ? 
              AND sid = ?
          `;

          // Handle `null` values for the marks field in SQL
          const queryValue = value === null ? null : value;

          // Execute the query
          db.query(updateQuery, [queryValue, question_id, sid], (error, results) => {
            if (error) {
              console.error(`Error executing query for sid ${sid}, question_id ${question_id}:`, error);
              reject(error);  // Reject the promise if there is an error
            } else {
              console.log(`Query successful for sid ${sid}, question_id ${question_id}, value ${queryValue}`);
              resolve(results);  // Resolve the promise if the query succeeds
            }
          });
        });

        // Add the promise to the array
        updatePromises.push(updatePromise);
      }
    }

    // Wait for all promises to complete
    await Promise.all(updatePromises);

    // If all updates succeed, send a success response
    res.status(200).json({ message: 'Assignments updated successfully' });
  } catch (error) {
    console.error('Error updating assignments:', error);
    return res.status(500).json({ message: 'An error occurred while updating assignments' });
  }
};


export const getExperimentData = (req, res) => {
  const { usercourseid } = req.params;
  
  const uc = parseInt(usercourseid);
  // Execute the stored procedure for experiment marks
  const sql = `CALL GetExperimentMarks(?)`; // Replace with your actual stored procedure name
  db.query(sql, uc, (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    // Handle the results of the stored procedure
    res.status(200).json({
      message: 'Experiment marks retrieved successfully',
      data: results[1] // assuming the results are returned in the first index
    });
  });
};




// export const updateAssignments = async (req, res) => {
//   const { assignments } = req.body; // Extract the assignments from the request body

//   // Validate if assignments are provided
//   if (!assignments || !Array.isArray(assignments)) {
//     return res.status(400).json({ message: 'Invalid assignments data' });
//   }

//   try {
//     let completedUpdates = 0; // Counter for completed updates
//     const totalAssignments = assignments.length; // Total number of assignments to update

//     // Iterate through each student's assignment data
//     for (const studentData of assignments) {
//       const { sid, assignments: studentAssignments } = studentData;

//       // Validate student ID
//       if (!sid || typeof sid !== 'number') {
//         return res.status(400).json({ message: 'Invalid or missing student ID (sid)' });
//       }

//       // Validate if studentAssignments is an array
//       if (!studentAssignments || !Array.isArray(studentAssignments)) {
//         return res.status(400).json({ message: 'Invalid assignments data for student ID: ' + sid });
//       }

//       // Clean and format each student's assignments
//       const cleanAssignments = studentAssignments.map(({ question_id, value }) => ({
//         question_id,
//         value: isNaN(value) ? null : value, // Convert NaN to null
//       }));

//       // Loop through each assignment for the current student and update the database
//       for (const assignment of cleanAssignments) {
//         const { question_id, value } = assignment;

//         // Validate if question_id is provided for each assignment
//         if (!question_id) {
//           return res.status(400).json({ message: `Invalid assignment data, missing question_id for student ID: ${sid}` });
//         }

//         // SQL query to update the assignment for the student
//         const updateQuery = `
//           UPDATE mainassign 
//           SET marks = ? 
//           WHERE assignid = ? 
//             AND sid = ?
//         `;

//         // Execute the update query
//         db.query(updateQuery, [value, question_id, sid], (error, results) => {
//           if (error) {
//             console.error('Error executing the query:', error);
//             return res.status(500).json({ error: 'Internal server error' });
//           }

//           completedUpdates++; // Increment the completed updates count

//           // Check if all updates have been completed
//           if (completedUpdates === totalAssignments) {
//             res.status(200).json({ message: 'Assignments updated successfully' });
//           }
//         });
//       }
//     }
//   } catch (error) {
//     console.error('Error updating assignments:', error);
//     return res.status(500).json({ message: 'An error occurred while updating assignments' });
//   }
// };


// Update Experiments
export const updateExperiments = async (req, res) => {
  const { sid, experiments } = req.body;
  console.log(sid,experiments)
  // Check if the input is for a single student or multiple students
  let studentExperimentsData = [];

  if (sid && Array.isArray(experiments)) {
    // Single student case
    studentExperimentsData = [{ sid, experiments }];
    console.log("Single student case:", JSON.stringify(studentExperimentsData[0].experiments, null, 2));
  } else if (Array.isArray(experiments) && experiments.length > 0 && experiments[0].sid) {
    // Multiple students case
    studentExperimentsData = experiments;
    console.log("Multiple students case:", JSON.stringify(studentExperimentsData, null, 2));
  } else {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    // Array to store promises for database queries
    const updatePromises = [];

    // Loop through each student's experiment data
    for (const studentData of studentExperimentsData) {
      const { sid, experiments: studentExperiments } = studentData;

      // Validate student ID
      if (!sid || typeof sid !== 'number') {
        return res.status(400).json({ message: 'Invalid or missing student ID (sid)' });
      }

      // Loop through each experiment and prepare the query promises
      for (const experiment of studentExperiments) {
        const { question_id, value } = experiment;

        if (!question_id) {
          return res.status(400).json({ message: `Invalid Experiment data for student ID: ${sid}` });
        }

        console.log(`Preparing query for student ${sid}, question_id ${question_id}, value ${value}`);


        // Create a promise for each query
        const updatePromise = new Promise((resolve, reject) => {
          const updateQuery = `
            UPDATE mainexp 
            SET marks = ? 
            WHERE expid = ? 
              AND sid = ?
          `;

          // Handle `null` values for the marks field in SQL
          const queryValue = value === null ? null : value;

          // Execute the query
          db.query(updateQuery, [queryValue, question_id, sid], (error, results) => {
            if (error) {
              console.error(`Error executing query for sid ${sid}, question_id ${question_id}:`, error);
              reject(error);  // Reject the promise if there is an error
            } else {
              console.log(`Query successful for sid ${sid}, question_id ${question_id}, value ${queryValue}`);
              resolve(results);  // Resolve the promise if the query succeeds
            }
          });
        });


        // Add the promise to the array
        updatePromises.push(updatePromise);
      }
    }

    // Wait for all promises to complete
    await Promise.all(updatePromises);

    // If all updates succeed, send a success response
    res.status(200).json({ message: 'Experiments updated successfully' });
  } catch (error) {
    console.error('Error updating experiments:', error);
    return res.status(500).json({ message: 'An error occurred while updating experiments' });
  }
};



export const getExperimentAndCOs = async (req, res) => {
  const { usercourseid } = req.params;

  if (!usercourseid) {
    return res.status(400).json({ error: 'usercourseid is required' });
  }

  try {
    const sql = `
      SELECT
        ue.usercourseid,
        ue.maxmarks,
        qe.exp_id AS exp_id,
        qe.expname AS question_name,
        qe.exp_idq AS question_id,  -- Ensure this is 'question_id'
        GROUP_CONCAT(co.coname ORDER BY co.co_id) AS conames
      FROM
        upload_exp ue
      JOIN
        question_exp qe ON ue.expid = qe.exp_id
      LEFT JOIN
        co_exp co ON qe.exp_idq = co.co_id
      WHERE
        ue.usercourseid = ?
      GROUP BY
        ue.usercourseid, ue.maxmarks, qe.exp_id, qe.exp_idq, qe.expname;
    `;

    // Execute the query
    db.query(sql, [usercourseid], (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Log the raw results to ensure the query works correctly
      console.log('Raw results from SQL query:', results);

      // Format the results
      const formattedResults = results.map(row => ({
        usercourseid: row.usercourseid,
        maxmarks: row.maxmarks,
        exp_id: row.exp_id,
        question_name: row.question_name,
        question_id: row.question_id,  // Make sure this is being mapped correctly
        conames: row.conames ? row.conames.split(',') : []
      }));

      // Log the formatted results to verify the transformation
      console.log('Formatted results:', formattedResults);

      // Return the formatted results as JSON
      res.status(200).json(formattedResults);
    });
  } catch (error) {
    console.error('Error fetching experiments and COs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




export const showAttendanceData = async (req, res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
    SELECT 
      a.att_id,
      a.attend_id,
      a.sid,
      a.marks,
      c.student_name,
      c.stud_clg_id
    FROM 
      main_atten AS a
    INNER JOIN 
      upload_attendance AS u ON a.attend_id = u.attid
    INNER JOIN 
      copo_students_details AS c ON a.sid = c.sid
    WHERE 
      u.usercourseid = ?;
  `;

  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching attendance data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};

export const AttendanceUpload = async (req, res) => {
  let updates = req.body;
  console.log('Received updates:', updates);

  // Convert to an array if updates is an object
  if (typeof updates === 'object' && !Array.isArray(updates)) {
    updates = [updates];
  }

  // Validate input format
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the query and values
  const sql = 'UPDATE main_atten SET marks = ? WHERE att_id = ?';
  const queryValues = updates.map(update => {
    const marks = parseInt(update.Marks, 10);  // Change 'Marks' to 'marks'
    return [
      isNaN(marks) ? null : marks,  // Use null if marks is NaN
      update.att_id
    ];
  });

  // Log queryValues for debugging
  console.log('Query Values:', queryValues);

  try {
    // Handle multiple queries in parallel
    await Promise.all(queryValues.map(values => {
      return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error('Database query error:', error);
            return reject(error);
          }
          resolve(results);
        });
      });
    }));

    res.status(200).json('Attendance marks updated successfully');
  } catch (error) {
    console.error('Error updating attendance marks:', error);
    res.status(500).json('Server error');
  }
};



export const AttendanceLimit = (req, res) => {
  const userCourseId = req.params.uid;
  const checkQuery = 'SELECT * FROM upload_attendance WHERE usercourseid = ?';

  db.query(checkQuery, userCourseId, (Err, result) => {
    if (Err) {
      console.log(Err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(result);
    }
  });
};



export const showGdData = async (req, res) => {
  const userCourseId = req.params.uid;

  const sql = `
    SELECT 
      m.Gd_id,
      m.gdd_id,
      m.sid,
      m.marks,
      c.student_name,
      c.stud_clg_id
    FROM 
      main_gd AS m
    INNER JOIN 
      upload_gd AS u ON m.gdd_id = u.gdid
    INNER JOIN 
      copo_students_details AS c ON m.sid = c.sid
    WHERE 
      u.usercourseid = ?;
  `;

  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching GD data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};
export const GdUpload = async (req, res) => {
  let updates = req.body;
  console.log('Received updates:', updates);

  // Convert to an array if updates is an object
  if (typeof updates === 'object' && !Array.isArray(updates)) {
    updates = [updates];
  }

  // Validate input format
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the query and values
  const sql = 'UPDATE main_gd SET marks = ? WHERE Gd_id = ?';
  const queryValues = updates.map(update => {
    const marks = parseInt(update.marks, 10);
    return [
      isNaN(marks) ? null : marks,  // Use null if marks is NaN
      update.Gd_id
    ];
  });

  // Log queryValues for debugging
  console.log('Query Values:', queryValues);

  try {
    // Handle multiple queries in parallel
    await Promise.all(queryValues.map(values => {
      return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error('Database query error:', error);
            return reject(error);
          }
          resolve(results);
        });
      });
    }));

    res.status(200).json('GD marks updated successfully');
  } catch (error) {
    console.error('Error updating GD marks:', error);
    res.status(500).json('Server error');
  }
};
export const GdLimit = (req, res) => {
  const userCourseId = req.params.uid;
  const checkQuery = 'SELECT * FROM upload_gd WHERE usercourseid = ?';

  db.query(checkQuery, userCourseId, (Err, result) => {
    if (Err) {
      console.log(Err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(result);
    }
  });
};


export const showSciLabData = async (req, res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
    SELECT 
      m.sciid,
      m.scipract_id,
      m.sid,
      m.marks,
      c.student_name,
      c.stud_clg_id
    FROM 
      main_scipract AS m
    INNER JOIN 
      uploadscilabpract AS u ON m.scipract_id = u.scipractid
    INNER JOIN 
      copo_students_details AS c ON m.sid = c.sid
    WHERE 
      u.usercourseid = ?;
  `;

  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching Scilab practical data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};

export const showSciLabcoData = async (req, res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
    SELECT 
      co.coname, 
      co.co_id
    FROM 
      co_scilab AS co
    INNER JOIN 
      uploadscilabpract  AS u ON co.co_id = u.scipractid
    WHERE 
      u.usercourseid = ?;
  `;
  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching Scilab practical data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};

export const SciLabUpload = async (req, res) => {
  let updates = req.body;
  console.log('Received updates:', updates);

  // Convert to an array if updates is an object
  if (typeof updates === 'object' && !Array.isArray(updates)) {
    updates = [updates];
  }

  // Validate input format
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the query and values
  const sql = 'UPDATE main_scipract SET marks = ? WHERE sciid = ? ';
  const queryValues = updates.map(update => {
    const Marks = parseInt(update.Marks, 10);
    return [
      isNaN(Marks) ? null : Marks,  // Use null if marks is NaN
      update.scipract_id,
    ];
  });

  // Log queryValues for debugging
  console.log('Query Values:', queryValues);

  try {
    // Handle multiple queries in parallel
    await Promise.all(queryValues.map(values => {
      return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error('Database query error:', error);
            return reject(error);
          }
          resolve(results);
        });
      });
    }));

    res.status(200).json('Scilab practical marks updated successfully');
  } catch (error) {
    console.error('Error updating Scilab practical marks:', error);
    res.status(500).json('Server error');
  }
};
export const SciLabLimit = (req, res) => {
  const userCourseId = req.params.uid;
  const checkQuery = 'SELECT * FROM uploadscilabpract WHERE usercourseid = ?';

  db.query(checkQuery, userCourseId, (Err, result) => {
    if (Err) {
      console.log(Err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(result);
    }
  });
};


export const showJournalData = async (req, res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
    SELECT 
      j.journalid,
      j.journal1_id,
      j.sid,
      j.marks,
      c.student_name,
      c.stud_clg_id
    FROM 
      main_journal AS j
    INNER JOIN 
      upload_journal AS u ON j.journal1_id = u.journalid
    INNER JOIN 
      copo_students_details AS c ON j.sid = c.sid
    WHERE 
      u.usercourseid = ?;
  `;

  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching journal data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};

export const showjournalcodata = async(req,res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
   SELECT 
      co.coname, 
      co.co_id
    FROM 
      co_journal AS co
    INNER JOIN 
      upload_journal AS u ON co.co_id = u.journalid
    WHERE 
      u.usercourseid = ?;
  `;

  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching journal data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
}
export const JournalUpload = async (req, res) => {
  let updates = req.body;
  console.log('Received updates:', updates);

  // Convert to an array if updates is an object
  if (typeof updates === 'object' && !Array.isArray(updates)) {
    updates = [updates];
  }

  // Validate input format
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the query and values
  const sql = 'UPDATE main_journal SET marks = ? WHERE journalid = ?';
  const queryValues = updates.map(update => {
    const Marks = parseInt(update.Marks, 10);
    return [
      isNaN(Marks) ? null : Marks,  // Use null if marks is NaN
      update.journalid, // Ensure sid is included here
    ];
  });

  // Log queryValues for debugging
  console.log('Query Values:', queryValues);

  try {
    // Handle multiple queries in parallel
    await Promise.all(queryValues.map(values => {
      return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error('Database query error:', error);
            return reject(error);
          }
          resolve(results);
        });
      });
    }));

    res.status(200).json('Journal marks updated successfully');
  } catch (error) {
    console.error('Error updating journal marks:', error);
    res.status(500).json('Server error');
  }
};

export const JournalLimit = (req, res) => {
  const userCourseId = req.params.uid;
  const checkQuery = 'SELECT * FROM upload_journal WHERE usercourseid = ?';

  db.query(checkQuery, userCourseId, (Err, result) => {
    if (Err) {
      console.log(Err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(result);
    }
  });
};


export const showMajorProjectData = async (req, res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
    SELECT 
      m.majorpro_id,
      m.majorid,
      m.sid,
      m.marks,
      c.student_name,
      c.stud_clg_id
    FROM 
      main_majorpro AS m
    INNER JOIN 
      upload_majorpro AS u ON m.majorid = u.majorid
    INNER JOIN 
      copo_students_details AS c ON m.sid = c.sid
    WHERE 
      u.usercourseid = ?;
  `;

  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching major project data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};
export const MajorProjectUpload = async (req, res) => {
  let updates = req.body;
  console.log('Received updates:', updates);

  // Convert to an array if updates is an object
  if (typeof updates === 'object' && !Array.isArray(updates)) {
    updates = [updates];
  }

  // Validate input format
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the query and values
  const sql = 'UPDATE main_majorpro SET marks = ? WHERE majorpro_id = ?';
  const queryValues = updates.map(update => {
    const Marks = parseInt(update.Marks, 10);
    return [
      isNaN(Marks) ? null : Marks,  // Use null if marks is NaN
      update.majorpro_id
    ];
  });

  // Log queryValues for debugging
  console.log('Query Values:', queryValues);

  try {
    // Handle multiple queries in parallel
    await Promise.all(queryValues.map(values => {
      return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error('Database query error:', error);
            return reject(error);
          }
          resolve(results);
        });
      });
    }));

    res.status(200).json('Major project marks updated successfully');
  } catch (error) {
    console.error('Error updating major project marks:', error);
    res.status(500).json('Server error');
  }
};
export const MajorProjectLimit = (req, res) => {
  const userCourseId = req.params.uid;
  const checkQuery = 'SELECT * FROM upload_majorpro WHERE usercourseid = ?';

  db.query(checkQuery, userCourseId, (Err, result) => {
    if (Err) {
      console.log(Err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(result);
    }
  });
};

// export const showMiniProjectData = async (req, res) => {
//   const userCourseId = req.params.uid;
  
//   const sql = `
//     CALL GetMiniProjectMarks(?);
//   `;

//   db.query(sql, userCourseId, (error, results) => {
//     if (error) {
//       console.error('Error fetching mini project data:', error);
//       res.status(500).send('Server error');
//     } else {
//       res.status(200).json(results);
//     }
//   });
// };
// export const MiniProjectUpload = async (req, res) => {
//   let updates = req.body;
//   console.log('Received updates:', updates);

//   // Convert to an array if updates is an object
//   if (typeof updates === 'object' && !Array.isArray(updates)) {
//     updates = [updates];
//   }

//   // Validate input format
//   if (!Array.isArray(updates) || updates.length === 0) {
//     return res.status(400).send('Invalid input');
//   }

//   // Prepare the query and values
//   const sql = 'UPDATE main_minipro SET marks = ? WHERE miniproid = ?';
//   const queryValues = updates.map(update => {
//     const Marks = parseInt(update.Marks, 10);
//     return [
//       isNaN(Marks) ? null : Marks,  // Use null if marks is NaN
//       update.miniproid
//     ];
//   });

//   // Log queryValues for debugging
//   console.log('Query Values:', queryValues);

//   try {
//     // Handle multiple queries in parallel
//     await Promise.all(queryValues.map(values => {
//       return new Promise((resolve, reject) => {
//         db.query(sql, values, (error, results) => {
//           if (error) {
//             console.error('Database query error:', error);
//             return reject(error);
//           }
//           resolve(results);
//         });
//       });
//     }));

//     res.status(200).json('Mini project marks updated successfully');
//   } catch (error) {
//     console.error('Error updating mini project marks:', error);
//     res.status(500).json('Server error');
//   }
// };
// export const MiniProjectLimit = (req, res) => {
//   const userCourseId = req.params.uid;
//   const checkQuery = 'SELECT * FROM upload_minipro WHERE usercourseid = ?';

//   db.query(checkQuery, userCourseId, (Err, result) => {
//     if (Err) {
//       console.log(Err);
//       res.status(500).send('Server error');
//     } else {
//       res.status(200).json(result);
//     }
//   });
// };

export const GetMiniProject = (req, res) => {
  const { usercourseid } = req.params;
  
  const uc=parseInt(usercourseid);
  // Execute the stored procedure
  const sql = `CALL GetMiniProjectMarks(?)`
  db.query(sql, uc, (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    // console.log(results)
    // Handle the results of the stored procedure
    res.status(200).json({
      message: 'Miniproject marks retrieved successfully',
      data: results[0] || [], // assuming the results are returned in the first index
    });
  });
};


export const getMiniProjectAndCOs = async (req, res) => {
  const { usercourseid } = req.params;

  if (!usercourseid) {
    return res.status(400).json({ error: 'usercourseid is required' });
  }

  try {
    const sql = `
      SELECT
        ua.usercourseid,
        ua.maxmarks,
        qa.minipro_id AS minipro_id,
        qa.miniproname AS question_name,
        qa.idquestions_minipro AS question_id,   -- Ensure this is 'question_id'
        GROUP_CONCAT(ca.coname ORDER BY ca.co_id) AS conames
      FROM
        upload_minipro ua
      JOIN
        questions_minipro qa ON ua.miniid = qa.minipro_id
      LEFT JOIN
        co_minipro ca ON qa.idquestions_minipro = ca.co_id
      WHERE
        ua.usercourseid = ?
      GROUP BY
        ua.usercourseid, ua.maxmarks, qa.minipro_id, qa.idquestions_minipro, qa.miniproname;
    `;

    // Execute the query
    db.query(sql, [usercourseid], (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Log the raw results to ensure the query works correctly
      console.log('Raw results from SQL query:', results);

      // Format the results, making sure to map 'assign_idq' to 'question_id'
      const formattedResults = results.map(row => ({
        usercourseid: row.usercourseid,
        maxmarks: row.maxmarks,
        minipro_id: row.minipro_id,
        question_name: row.question_name,
        question_id: row.question_id,  // Make sure this is being mapped correctly
        conames: row.conames ? row.conames.split(',') : []
      }));

      // Log the formatted results to verify the transformation
      console.log('Formatted results:', formattedResults);

      // Return the formatted results as JSON
      res.status(200).json(formattedResults);
    });
  } catch (error) {
    console.error('Error fetching assignments and COs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// assuming you have a database config file for MySQL

// Update Assignments
export const updateMiniProject = async (req, res) => {
const { sid, MiniProject } = req.body;

// Check if the input is for a single student or multiple students
let studentAssignmentsData = [];

if (sid && Array.isArray(MiniProject)) {
  // Single student case
  studentAssignmentsData = [{ sid, MiniProject }];
  console.log("Single student case:", JSON.stringify(studentAssignmentsData[0].MiniProject, null, 2));
} else if (Array.isArray(MiniProject) && MiniProject.length > 0 && MiniProject[0].sid) {
  // Multiple students case
  studentAssignmentsData = MiniProject;
  console.log("Multiple students case:", JSON.stringify(studentAssignmentsData, null, 2));
} else {
  return res.status(400).json({ message: 'Invalid input data' });
}

try {
  // Array to store promises for database queries
  const updatePromises = [];

  // Loop through each student's assignment data
  for (const studentData of studentAssignmentsData) {
    const { sid, MiniProject: studentAssignments } = studentData;

    // Validate student ID
    if (!sid || typeof sid !== 'number') {
      return res.status(400).json({ message: 'Invalid or missing student ID (sid)' });
    }

    // Loop through each assignment and prepare the query promises
    for (const MiniProject of studentAssignments) {
      const { question_id, value } = MiniProject;

      if (!question_id) {
        return res.status(400).json({ message: `Invalid assignment data for student ID: ${sid}` });
      }

      console.log(`Preparing query for student ${sid}, question_id ${question_id}, value ${value}`);

      // Create a promise for each query
      const updatePromise = new Promise((resolve, reject) => {
        const updateQuery = `
          UPDATE main_minipro
          SET marks = ? 
          WHERE miniid = ? 
            AND sid = ?
        `;

        // Handle `null` values for the marks field in SQL
        const queryValue = value === null ? null : value;

        // Execute the query
        db.query(updateQuery, [queryValue, question_id, sid], (error, results) => {
          if (error) {
            console.error(`Error executing query for sid ${sid}, question_id ${question_id}:`, error);
            reject(error);  // Reject the promise if there is an error
          } else {
            console.log(`Query successful for sid ${sid}, question_id ${question_id}, value ${queryValue}`);
            resolve(results);  // Resolve the promise if the query succeeds
          }
        });
      });

      // Add the promise to the array
      updatePromises.push(updatePromise);
    }
  }

  // Wait for all promises to complete
  await Promise.all(updatePromises);

  // If all updates succeed, send a success response
  res.status(200).json({ message: 'MiniProject updated successfully' });
} catch (error) {
  console.error('Error updating MiniProject:', error);
  return res.status(500).json({ message: 'An error occurred while updating MiniProject' });
}
};

export const showPPTData = async (req, res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
    SELECT 
      m.id,
      m.ppt_id,
      m.sid,
      m.marks,
      c.student_name,
      c.stud_clg_id
    FROM 
      main_ppt AS m
    INNER JOIN 
      upload_ppt AS u ON m.ppt_id = u.ppt_id
    INNER JOIN 
      copo_students_details AS c ON m.sid = c.sid
    WHERE 
      u.usercourseid = ?;
  `;

  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching PPT data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};

export const showcoPptData = async (req, res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
   SELECT 
      co.idco_ppt,
      co.coname,
      co.co_id
    FROM 
      co_ppt AS co
    INNER JOIN 
      upload_ppt AS u ON co.co_id = u.ppt_id
    WHERE 
      u.usercourseid = ?;
  `;
  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching PPT data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};

export const PPTUpload = async (req, res) => {
  let updates = req.body;
  console.log('Received updates:', updates);

  // Convert to an array if updates is an object
  if (typeof updates === 'object' && !Array.isArray(updates)) {
    updates = [updates];
  }

  // Validate input format
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the query and values
  const sql = 'UPDATE main_ppt SET marks = ? WHERE id = ?';
  const queryValues = updates.map(update => {
    const Marks = parseInt(update.Marks, 10);
    return [
      isNaN(Marks) ? null : Marks,  // Use null if marks is NaN
      update.id,
    ];
  });

  // Log queryValues for debugging
  console.log('Query Values:', queryValues);

  try {
    // Handle multiple queries in parallel
    await Promise.all(queryValues.map(values => {
      return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error('Database query error:', error);
            return reject(error);
          }
          resolve(results);
        });
      });
    }));

    res.status(200).json('PPT marks updated successfully');
  } catch (error) {
    console.error('Error updating PPT marks:', error);
    res.status(500).json('Server error');
  }
};
export const PPTLimit = (req, res) => {
  const userCourseId = req.params.uid;
  const checkQuery = 'SELECT * FROM upload_ppt WHERE usercourseid = ?';

  db.query(checkQuery, userCourseId, (Err, result) => {
    if (Err) {
      console.log(Err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(result);
    }
  });
};
export const showReportData = async (req, res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
    SELECT 
      m.id,
      m.report_id,
      m.sid,
      m.marks,
      c.student_name,
      c.stud_clg_id
    FROM 
      main_report AS m
    INNER JOIN 
      upload_report AS u ON m.report_id = u.report_id
    INNER JOIN 
      copo_students_details AS c ON m.sid = c.sid
    WHERE 
      u.usercourseid = ?;
  `;

  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching report data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};
export const ReportUpload = async (req, res) => {
  let updates = req.body;
  console.log('Received updates:', updates);

  // Convert to an array if updates is an object
  if (typeof updates === 'object' && !Array.isArray(updates)) {
    updates = [updates];
  }

  // Validate input format
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the query and values
  const sql = 'UPDATE main_report SET marks = ? WHERE id = ? ';
  const queryValues = updates.map(update => {
    const Marks = parseInt(update.Marks, 10);
    return [
      isNaN(Marks) ? null : Marks,  // Use null if marks is NaN
      update.id,
    ];
  });

  // Log queryValues for debugging
  console.log('Query Values:', queryValues);

  try {
    // Handle multiple queries in parallel
    await Promise.all(queryValues.map(values => {
      return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error('Database query error:', error);
            return reject(error);
          }
          resolve(results);
        });
      });
    }));

    res.status(200).json('Report marks updated successfully');
  } catch (error) {
    console.error('Error updating report marks:', error);
    res.status(500).json('Server error');
  }
};

export const showReportcoData  = async (req, res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
   SELECT 
      co.idco_report,
      co.coname,
      co.co_id
    FROM 
      co_report AS co
    INNER JOIN 
      upload_report AS u ON co.co_id = u.report_id
    WHERE 
      u.usercourseid = ?;

  `;
  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching report data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};
export const ReportLimit = (req, res) => {
  const userCourseId = req.params.uid;
  const checkQuery = 'SELECT * FROM upload_report WHERE usercourseid = ?';

  db.query(checkQuery, userCourseId, (Err, result) => {
    if (Err) {
      console.log(Err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(result);
    }
  });
};
export const showTradeData = async (req, res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
    call GetTradeMarks(?);
  `;

  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching trade data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};


export const showReportTradeCoData = async (req, res) => {
  const userCourseId = req.params.uid;
  
  const sql = `
    SELECT 
      ct.idco_trade,
      ct.coname,
      ct.co_id,
      qt.tradename,
      ut.nooftrade,
      ut.marks,
      qt.trade_idq
    FROM 
      co_trade AS ct
    INNER JOIN 
      question_trade AS qt ON ct.co_id = qt.tradeid
    INNER JOIN 
      upload_trade AS ut ON qt.tradeid = ut.tradeid
    WHERE 
      ut.usercourseid = ?;
  `;

  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching trade report data:', error);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
};
export const TradeUpload = async (req, res) => {
  const { sid, experiments } = req.body;
  console.log(sid, experiments);

  let studentExperimentsData = [];

  if (sid && Array.isArray(experiments)) {
    studentExperimentsData = [{ sid, experiments }];
    console.log("Single student case:", JSON.stringify(studentExperimentsData[0].experiments, null, 2));
  } else if (Array.isArray(experiments) && experiments.length > 0 && experiments[0].sid) {
    studentExperimentsData = experiments;
    console.log("Multiple students case:", JSON.stringify(studentExperimentsData, null, 2));
  } else {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const updatePromises = [];

    for (const studentData of studentExperimentsData) {
      const { sid, experiments: studentExperiments } = studentData;

      if (!sid || typeof sid !== 'number') {
        return res.status(400).json({ message: 'Invalid or missing student ID (sid)' });
      }

      for (const experiment of studentExperiments) {
        const { question_id, value } = experiment; // Destructure question_id

        if (!question_id) {
          return res.status(400).json({ message: `Invalid Experiment data for student ID: ${sid}` });
        }

        console.log(`Preparing query for student ${sid}, question_id ${question_id}, value ${value}`);

        const updatePromise = new Promise((resolve, reject) => {
          const updateQuery = `
            UPDATE main_trade
            SET marks = ? 
            WHERE trade_id = ? 
              AND sid = ?
          `;

          const queryValue = value === null ? null : value;

          db.query(updateQuery, [queryValue, question_id, sid], (error, results) => {
            if (error) {
              console.error(`Error executing query for sid ${sid}, question_id ${question_id}:`, error);
              reject(error);
            } else {
              console.log(`Query successful for sid ${sid}, question_id ${question_id}, value ${queryValue}`);
              resolve(results);
            }
          });
        });

        updatePromises.push(updatePromise);
      }
    }

    await Promise.all(updatePromises);
    res.status(200).json({ message: 'Experiments updated successfully' });
  } catch (error) {
    console.error('Error updating experiments:', error);
    return res.status(500).json({ message: 'An error occurred while updating experiments' });
  }
};



export const TradeLimit = (req, res) => {
  const userCourseId = req.params.uid;
  const checkQuery = 'SELECT * FROM upload_trade WHERE usercourseid = ?';

  db.query(checkQuery, userCourseId, (Err, result) => {
    if (Err) {
      console.log(Err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(result);
    }
  });
};

export const Termwork_Attainment = async (req, res) => {
  const dataArray = req.body.data;

  // Check if the dataArray exists and is an array
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    return res.status(400).json({ message: "Invalid data format or empty array." });
  }

  try {
    // Prepare the SQL query for bulk insert/update
    const query = `
      INSERT INTO termwork_attainment_table (coname, average_attainment, attainment, usercourseid)
      VALUES ? 
      ON DUPLICATE KEY UPDATE
        average_attainment = VALUES(average_attainment),
        attainment = VALUES(attainment);
    `;

    // Prepare values array for bulk insert
    const values = dataArray.map(item => [
      item.coname, 
      parseFloat(item.average_attainment.replace('%', '')), 
      item.attainment, 
      item.usercourseid
    ]);

    // Use await with promise-based query method for bulk insertion
    db.query(query, [values], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Server error');
      }
      return res.status(200).json({ message: 'Attainment data successfully inserted or updated.' });
    });

  } catch (error) {
    console.error('Error inserting or updating attainment data:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



