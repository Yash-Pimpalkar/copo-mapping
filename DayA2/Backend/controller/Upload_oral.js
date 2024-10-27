import { connection as db } from "../config/dbConfig.js";

export const upload_Oral_Questions = async (req, res) => {
  const { formDataWithUserCourseId } = req.body;

  console.log('Received data:', formDataWithUserCourseId);

  // Validate input
  if (!formDataWithUserCourseId || typeof formDataWithUserCourseId !== 'object') {
    return res.status(400).json({ error: 'Invalid data' });
  }


  // Extract data and ensure it's in array format
  const dataArray = Object.values(formDataWithUserCourseId);

  console.log(dataArray.length)
  // Check if dataArray is empty
  if (dataArray.length == 0) {
    return res.status(400).json({ error: 'No data to insert' });
  }

  // Extract usercourseid from the first entry (assuming all entries have the same usercourseid)
  const { usercourseid } = dataArray[0];
  //   console.log(usercourseid)

  try {
    // Check if usercourseid already exists
    const checkQuery = 'SELECT * FROM oral_marks WHERE usercourseid = ?';
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
        const insertQuery = 'INSERT INTO oral_marks (usercourseid, max_marks, co_count) VALUES ?';
        const values = dataArray.map(({ usercourseid, marks, cocount }) => [usercourseid, marks, cocount]);

        // Perform the batch insert
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


export const showOralData = async (req, res) => {
  const userCourseId = req.params.uid;

  const sql = `SELECT 
    o.oral_id,
    o.oralid,
    o.sid,
    o.marks,
    c.student_name,
    c.stud_clg_id
FROM 
    table_oral AS o
INNER JOIN 
    oral_marks AS m ON o.oralid = m.oralid
INNER JOIN 
    copo_students_details AS c ON o.sid = c.sid
WHERE 
    m.usercourseid = ?;
`;
  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching Oral data:', error);
      res.status(500).send('Server error');
    }
    res.status(200).json(results);
  })

};




export const OralUpload = async (req, res) => {
  let updates = req.body;
  console.log('Received updates:', updates);
  console.log(typeof updates);

  // Convert to an array if updates is an object
  if (typeof updates === 'object' && !Array.isArray(updates)) {
    updates = [updates];
  }

  // Validate input format
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the query and values
  const sql = 'UPDATE table_oral SET marks = ? WHERE oral_id = ?';
  const queryValues = updates.map(update => {
    const Marks = parseInt(update.Marks, 10);

    return [
      isNaN(Marks) ? null : Marks,  // Use null or a default value if marks is NaN
      update.oral_id
    ];
  });



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


export const limit = (req, res) => {
  const userCourseId = req.params.uid;
  const checkQuery = 'SELECT * FROM oral_marks WHERE usercourseid = ?';
  db.query(checkQuery, userCourseId, (Err, result) => {
    if (Err) {
      console.log(Err)
    }
    res.status(200).json(result)
  })
}


export const Oral_Attainment = async (req, res) => {
  const { coAverages, userCourseId } = req.body;  // Now includes userCourseId

  console.log(coAverages, userCourseId);

  try {
    for (const { coName, coAverage } of coAverages) {
      const parsedCoAverage = parseFloat(coAverage);

      // Determine attainment based on coAverage
      let attainment;
      if (parsedCoAverage <= 40) {
        attainment = 0;
      } else if (parsedCoAverage > 40 && parsedCoAverage <= 60) {
        attainment = 1;
      } else if (parsedCoAverage > 60 && parsedCoAverage <= 70) {
        attainment = 2;
      } else {
        attainment = 3;
      }

      // Check if the coname and usercourse_id combination already exists
      const sql = "SELECT idOral_attainment FROM oral_attainment WHERE coname = ? AND usercourse_id = ?";
      db.query(sql, [coName, userCourseId], (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: error.message });
        }

        if (results.length > 0) {
          // If exists, update both Oral_attainment and attainment
          const sql1 = "UPDATE oral_attainment SET Oral_attainment = ?, attainment = ? WHERE idOral_attainment = ?";
          db.query(sql1, [parsedCoAverage, attainment, results[0].idOral_attainment], (error, result) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Updated Oral attainment and attainment for ${coName}`);
          });
        } else {
          // If doesn't exist, insert a new record with coname, Oral_attainment, attainment, and usercourse_id
          const sql2 = "INSERT INTO oral_attainment (coname, Oral_attainment, attainment, usercourse_id) VALUES (?, ?, ?, ?)";
          db.query(sql2, [coName, parsedCoAverage, attainment, userCourseId], (error, results1) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Inserted new Oral attainment and attainment for ${coName}`);
          });
        }
      });
    }

    console.log('Oral attainment and attainment inserted/updated successfully');
    res.status(200).json({ message: 'Oral attainment and attainment inserted/updated successfully' });
  } catch (error) {
    console.error('Error inserting/updating Oral attainment and attainment:', error);
    res.status(500).json({ error: 'Error inserting/updating Oral attainment and attainment' });
  }
};


export const upload_OralPce_Questions = async (req, res) => {
  const dataToSubmit = req.body;
  console.log(dataToSubmit);
  const { usercourseid, numAssignments, questions } = dataToSubmit;

  try {
    // 1. Check if `usercourseid` already exists in `upload_exp`
    const checkQuery = `SELECT * FROM upload_oralpce WHERE usercourseidpce = ?`;
    const [checkResult] = await db
      .promise()
      .query(checkQuery, [usercourseid]);

    if (checkResult.length > 0) {
      // If usercourseid exists, return an error message
      return res
        .status(400)
        .json({ error: "Data already exists for this usercourseid." });
    }

    // Begin a transaction
    db.beginTransaction(async (err) => {
      if (err) {
        return res.status(500).json({ error: "Error starting transaction" });
      }

      try {
        // 2. Insert into `upload_exp` table
        const insertExpQuery = `
            INSERT INTO upload_oralpce (usercourseidpce, col_count)
            VALUES (?, ?)
          `;
        const [expResult] = await db
          .promise()
          .query(insertExpQuery, [usercourseid, numAssignments]);

        // Retrieve the inserted `expid`
        const pceid = expResult.insertId;
        const exp_ids = []; // Initialize an array to store exp_idq values
        const usercourse_id = usercourseid;

        // 3. Insert each question into `question_exp` and get `exp_idq`
        for (let questionObj of questions) {
          const { question, questionforcol, maxMarks, coNames } = questionObj;
          console.log("questionforcol", questionforcol);

          // Loop through each question item
          for (let i = 0; i < question.length; i++) {
            let questionResult; // Define questionResult outside the inner loop
            let columnResult;

            const insertColQuery = `
                INSERT INTO col_oralpce (colnames, usercourseid)
                VALUES (?, ?)
              `;
            columnResult = await db
              .promise()
              .query(insertColQuery, [
                question[i], // colname
                usercourse_id
              ]);

            // Insert into `question_oralpce` with `pceid`
            for (let coName of questionforcol[i]) {
              const insertQuestionQuery = `
                INSERT INTO question_oralpce (colname, conames, marks, pce_id, usercourse_id)
                VALUES (?, ?, ?, ?, ?)
              `;
              questionResult = await db
                .promise()
                .query(insertQuestionQuery, [
                  question[i], // colname
                  coName,     // conames (individual CO name)
                  maxMarks[i], // marks
                  pceid,       // pce_id
                  usercourse_id
                ]);
            }

            // Retrieve the inserted `exp_idq`
            const exp_idq = questionResult[0].insertId;

            // Store the exp_idq in the array
            exp_ids.push(exp_idq);
          }


          console.log(exp_ids);
          console.log(usercourse_id);

          // 4. Insert each CO name into `co_oralpce` for the corresponding `exp_idq`
          for (let i = 0; i < coNames.length; i++) {
            const insertCoExpQuery = `
              INSERT INTO co_oralpce (coname, usercourse_id, co_id)
              VALUES (?, ?, ?)
            `;
            // Using exp_ids[i] directly assuming exp_ids length matches coNames length
            await db.promise().query(insertCoExpQuery, [coNames[i], usercourse_id, exp_ids[i]]);
          }
        }


        // Commit the transaction if all queries were successful
        db.commit((commitErr) => {
          if (commitErr) {
            db.rollback(() => {
              return res
                .status(500)
                .json({ error: "Error committing transaction" });
            });
          } else {
            return res
              .status(200)
              .json({ message: "Data uploaded successfully!" });
          }
        });
      } catch (error) {
        // Rollback the transaction in case of an error
        db.rollback(() => {
          console.error(error);
          return res
            .status(500)
            .json({ error: "An error occurred during the upload process." });
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while checking usercourseid." });
  }

};


export const showOralPCEData = async (req, res) => {
  const userCourseId = req.params.uid;
  console.log(userCourseId)
  console.log("We are reaching here")
  if (!userCourseId) {
    return res.status(400).send('Invalid userCourseId');
  }

  const sql = 'CALL GetStudentOralPceMarksByCourseID_OralPCE(?)';

  db.query(sql, [userCourseId], (error, results) => {
    if (error) {
      console.log('Error fetching IA data:', error);
      return res.status(500).send('Server error');
    }
    if (!results || results.length == 0 || results[0][0].message) {
      return res.status(404).json({ error: 'No data found' });
    }
    console.log(results);
    return res.status(200).json(results[0]);
  });

};

export const OralPCECOsName = (req, res) => {
  const userCourseId = req.params.uid;
  console.log("cos table:", userCourseId);
  const sql = `select * from question_oralpce where usercourse_id = ? `;
  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching Oral PCE data:', error);
      res.status(500).send('Server error');
    }
    console.log(results)
    res.status(200).json(results);
  })
}

export const OralPCEActualCOsName = (req, res) => {
  const userCourseId = req.params.uid;
  console.log("actual cos table:", userCourseId);
  const sql = `select * from co_oralpce where usercourse_id = ? `;
  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching Oral PCE data:', error);
      res.status(500).send('Server error');
    }
    res.status(200).json(results);
  })
}



export const OralPCEUpload = async (req, res) => {
  let updates = req.body;
  console.log('Received updates:', updates);
  console.log(typeof updates);

  // Convert to an array if updates is an object
  if (typeof updates === 'object' && !Array.isArray(updates)) {
    updates = [updates];
  }

  // Validate input format
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the query and values
  const sql = 'UPDATE main_oralpce SET marks = ? WHERE idmain_oralpce = ?';
  const queryValues = updates.map(update => {
    const marks = parseInt(update.Marks, 10);

    return [
      isNaN(marks) ? null : marks,  // Use null or a default value if marks is NaN
      update.oral_id
    ];
  });



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


export const limitPCE = (req, res) => {
  const userCourseId = req.params.uid;
  const checkQuery = 'SELECT * FROM oral_marks WHERE usercourseid = ?';
  db.query(checkQuery, userCourseId, (Err, result) => {
    if (Err) {
      console.log(Err)
    }
    res.status(200).json(result)
  })
}


export const OralPCE_Attainment = async (req, res) => {
  const { coAverages, userCourseId } = req.body; // Now includes userCourseId

  console.log("userCourseId:", coAverages, userCourseId);

  try {
    for (const { coName, attainmentPercentage } of coAverages) {
      const parsedCoAverage = parseFloat(attainmentPercentage);

      // If parsedCoAverage is NaN, skip this record
      if (isNaN(parsedCoAverage)) {
        console.error(`Invalid attainmentPercentage for ${coName}`);
        continue; // Skip the rest of the loop and move to the next record
      }

      // Determine attainment based on coAverage
      let attainment;
      if (parsedCoAverage <= 40) {
        attainment = 0;
      } else if (parsedCoAverage > 40 && parsedCoAverage <= 60) {
        attainment = 1;
      } else if (parsedCoAverage > 60 && parsedCoAverage <= 70) {
        attainment = 2;
      } else {
        attainment = 3;
      }

      console.log(parsedCoAverage);

      // Check if the coname and usercourse_id combination already exists
      const sql = "SELECT idoralpce_attainment FROM oralpce_attainment WHERE conames = ? AND usercourseid = ?";
      db.query(sql, [coName, userCourseId], (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: error.message });
        }

        if (results.length > 0) {
          // If exists, update both Oral_attainment and attainment
          const sql1 = "UPDATE oralpce_attainment SET oralpce_attainment = ?, attainment = ? WHERE idoralpce_attainment = ?";
          db.query(sql1, [parsedCoAverage, attainment, results[0].idoralpce_attainment], (error, result) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Updated Oral PCE attainment and attainment for ${coName}`);
          });
        } else {
          // If doesn't exist, insert a new record with coname, Oral_attainment, attainment, and usercourse_id
          const sql2 = "INSERT INTO oralpce_attainment (conames, oralpce_attainment, attainment, usercourseid) VALUES (?, ?, ?, ?)";
          db.query(sql2, [coName, parsedCoAverage, attainment, userCourseId], (error, results1) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Inserted new Oral PCE attainment and attainment for ${coName}`);
          });
        }
      });
    }

    console.log('Oral PCE attainment and attainment inserted/updated successfully');
    res.status(200).json({ message: 'Oral PCE attainment and attainment inserted/updated successfully' });
  } catch (error) {
    console.error('Error inserting/updating Oral PCE attainment and attainment:', error);
    res.status(500).json({ error: 'Error inserting/updating Oral PCE attainment and attainment' });
  }
};
