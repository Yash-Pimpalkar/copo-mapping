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
