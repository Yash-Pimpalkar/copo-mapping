import { connection as db } from "../config/dbConfig.js";

// export const upload_tw_questions = async (req, res) => {
//     const dataToSubmit = req.body;
//     console.log(dataToSubmit);

//     if (dataToSubmit.formDataForKey === "Experiment") {
//       const { usercourseid, maxMarks, numAssignments, questions } = dataToSubmit;

//       // Begin a transaction
//       db.beginTransaction(async (err) => {
//         if (err) {
//           return res.status(500).json({ error: "Error starting transaction" });
//         }

//         try {
//           // 1. Insert into `upload_exp` table
//           const insertExpQuery = `
//             INSERT INTO upload_exp (usercourseid, noofexps, maxmarks)
//             VALUES (?, ?, ?)
//           `;
//           const [expResult] = await db.promise().query(insertExpQuery, [usercourseid, numAssignments, maxMarks]);

//           // Retrieve the inserted `expid`
//           const expid = expResult.insertId;

//           // 2. Insert each question into `question_exp` and get `exp_idq`
//           for (let questionObj of questions) {
//             const { question, coNames } = questionObj;

//             // Insert into `question_exp` with `expid`
//             const insertQuestionQuery = `
//               INSERT INTO question_exp (expname, exp_id)
//               VALUES (?, ?)
//             `;
//             const [questionResult] = await db.promise().query(insertQuestionQuery, [question, expid]);

//             // Retrieve the inserted `exp_idq`
//             const exp_idq = questionResult.insertId;

//             // 3. Insert each CO name into `co_exp` for the corresponding `exp_idq`
//             for (let coName of coNames) {
//               const insertCoExpQuery = `
//                 INSERT INTO co_exp (coname, co_id)
//                 VALUES (?, ?)
//               `;
//               await db.promise().query(insertCoExpQuery, [coName, exp_idq]);
//             }
//           }

//           // Commit the transaction if all queries were successful
//           db.commit((commitErr) => {
//             if (commitErr) {
//               db.rollback(() => {
//                 return res.status(500).json({ error: "Error committing transaction" });
//               });
//             } else {
//               return res.status(200).json({ message: "Data uploaded successfully!" });
//             }
//           });
//         } catch (error) {
//           // Rollback the transaction in case of an error
//           db.rollback(() => {
//             console.error(error);
//             return res.status(500).json({ error: "An error occurred during the upload process." });
//           });
//         }
//       });
//     } else {
//       return res.status(400).json({ error: "Invalid formDataForKey provided." });
//     }
//   };

export const upload_tw_questions = async (req, res) => {
  const dataToSubmit = req.body;
  console.log(dataToSubmit);

  if (dataToSubmit.formDataForKey === "Experiment") {
    const { usercourseid, maxMarks, numAssignments, questions } = dataToSubmit;

    try {
      // 1. Check if `usercourseid` already exists in `upload_exp`
      const checkQuery = `SELECT * FROM upload_exp WHERE usercourseid = ?`;
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
            INSERT INTO upload_exp (usercourseid, noofexps, maxmarks)
            VALUES (?, ?, ?)
          `;
          const [expResult] = await db
            .promise()
            .query(insertExpQuery, [usercourseid, numAssignments, maxMarks]);

          // Retrieve the inserted `expid`
          const expid = expResult.insertId;

          // 3. Insert each question into `question_exp` and get `exp_idq`
          for (let questionObj of questions) {
            const { question, coNames } = questionObj;

            // Insert into `question_exp` with `expid`
            const insertQuestionQuery = `
              INSERT INTO question_exp (expname, exp_id)
              VALUES (?, ?)
            `;
            const [questionResult] = await db
              .promise()
              .query(insertQuestionQuery, [question, expid]);

            // Retrieve the inserted `exp_idq`
            const exp_idq = questionResult.insertId;

            // 4. Insert each CO name into `co_exp` for the corresponding `exp_idq`
            for (let coName of coNames) {
              const insertCoExpQuery = `
                INSERT INTO co_exp (coname, co_id)
                VALUES (?, ?)
              `;
              await db.promise().query(insertCoExpQuery, [coName, exp_idq]);
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
  } else if (dataToSubmit.formDataForKey === "Assignment") {
    try {
        const { usercourseid, maxMarks, numAssignments, questions } = dataToSubmit;
        // 1. Check if `usercourseid` already exists in `upload_assign`
        const checkQuery = `SELECT * FROM upload_assign WHERE usercourseid = ?`;
        const [checkResult] = await db.promise().query(checkQuery, [usercourseid]);
  
        if (checkResult.length > 0) {
          // If usercourseid exists, return an error message
          return res.status(400).json({ error: "Data already exists for this usercourseid." });
        }
  
        // Begin a transaction
        db.beginTransaction(async (err) => {
          if (err) {
            return res.status(500).json({ error: "Error starting transaction" });
          }
  
          try {
            // 2. Insert into `upload_assign` table
            const insertAssignQuery = `
              INSERT INTO upload_assign (usercourseid, noofassign, maxmarks)
              VALUES (?, ?, ?)
            `;
            const [assignResult] = await db.promise().query(insertAssignQuery, [usercourseid, numAssignments, maxMarks]);
  
            // Retrieve the inserted `assignid`
            const assignid = assignResult.insertId;
  
            // 3. Insert each question into `question_assignment` and get `assign_idq`
            for (let questionObj of questions) {
              const { question, coNames } = questionObj;
  
              // Insert into `question_assignment` with `assignid`
              const insertQuestionQuery = `
                INSERT INTO question_assignment (assignment_name, assign_id)
                VALUES (?, ?)
              `;
              const [questionResult] = await db.promise().query(insertQuestionQuery, [question, assignid]);
  
              // Retrieve the inserted `assign_idq`
              const assign_idq = questionResult.insertId;
  
              // 4. Insert each CO name into `co_ass` for the corresponding `assign_idq`
              for (let coName of coNames) {
                const insertCoAssQuery = `
                  INSERT INTO co_ass (coname, co_id)
                  VALUES (?, ?)
                `;
                await db.promise().query(insertCoAssQuery, [coName, assign_idq]);
              }
            }
  
            // Commit the transaction if all queries were successful
            db.commit((commitErr) => {
              if (commitErr) {
                db.rollback(() => {
                  return res.status(500).json({ error: "Error committing transaction" });
                });
              } else {
                return res.status(200).json({ message: "Data uploaded successfully!" });
              }
            });
          } catch (error) {
            // Rollback the transaction in case of an error
            db.rollback(() => {
              console.error(error);
              return res.status(500).json({ error: "An error occurred during the upload process." });
            });
          }
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while checking usercourseid." });
      }
  } else if (dataToSubmit.formDataForKey === "Attendance") {
    const { usercourseid, maxMarks } = dataToSubmit;

    try {
      // 1. Check if `usercourseid` already exists in `upload_attendance`
      const checkQuery = `SELECT * FROM upload_attendance WHERE usecourseid = ?`;
      const [checkResult] = await db.promise().query(checkQuery, [usercourseid]);

      if (checkResult.length > 0) {
        // If usercourseid exists, return an error message
        return res.status(400).json({ error: "Data already exists for this usercourseid." });
      }

      // Begin a transaction
      db.beginTransaction(async (err) => {
        if (err) {
          return res.status(500).json({ error: "Error starting transaction" });
        }

        try {
          // 2. Insert into `upload_attendance` table
          const insertAttendanceQuery = `
            INSERT INTO upload_attendance (usecourseid, maxmarks)
            VALUES (?, ?)
          `;
          await db.promise().query(insertAttendanceQuery, [usercourseid, maxMarks]);

          // Commit the transaction if the query was successful
          db.commit((commitErr) => {
            if (commitErr) {
              db.rollback(() => {
                return res.status(500).json({ error: "Error committing transaction" });
              });
            } else {
              return res.status(200).json({ message: "Attendance data uploaded successfully!" });
            }
          });
        } catch (error) {
          // Rollback the transaction in case of an error
          db.rollback(() => {
            console.error(error);
            return res.status(500).json({ error: "An error occurred during the upload process." });
          });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while checking usercourseid." });
    }
  } else {
    return res.status(400).json({ error: "Invalid formDataForKey provided." });
  }
};
