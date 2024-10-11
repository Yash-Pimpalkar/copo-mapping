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
  console.log(dataToSubmit.formDataForKey)
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

  // MiniProject for 10 + 10(mini) +5
  } else if (dataToSubmit.formDataForKey === "MiniProject") {
    const { usercourseid, maxMarks, numAssignments, questions } = dataToSubmit;

    try {
      // 1. Check if `usercourseid` already exists in `upload_exp`
      const checkQuery = `SELECT * FROM upload_minipro WHERE usercourseid = ?`;
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
          // 2. Insert into `upload_minipro` table
          const insertminiProQuery = `
            INSERT INTO upload_minipro (usercourseid, noofminipro, maxmarks)
            VALUES (?, ?, ?)
          `;
          const [miniProResult] = await db
            .promise()
            .query(insertminiProQuery, [usercourseid, numAssignments, maxMarks]);

          // Retrieve the inserted `miniproid`
          const miniProid = miniProResult.insertId;

          // 3. Insert each question into `questions_minipro` and get `minipro_id`
          for (let questionObj of questions) {
            const { question, coNames } = questionObj;

            // Insert into `question_exp` with `expid`
            const insertQuestionQuery = `
              INSERT INTO questions_minipro (miniproname, minipro_id)
              VALUES (?, ?)
            `;
            const [questionResult] = await db
              .promise()
              .query(insertQuestionQuery, [question, miniProid]);

            // Retrieve the inserted `exp_idq`
            const miniPro_idq = questionResult.insertId;

            // 4. Insert each CO name into `co_exp` for the corresponding `exp_idq`
            for (let coName of coNames) {
              const insertCominiProQuery = `
                INSERT INTO co_minipro (coname, co_id)
                VALUES (?, ?)
              `;
              await db.promise().query(insertCominiProQuery, [coName, miniPro_idq]);
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
  } else if (dataToSubmit.formDataForKey === "Report") {
    try {
      const { usercourseid, maxMarks,  coNames } = dataToSubmit;
      // Assuming `reportDetails` contains details similar to `questions` in the original code.

      // 1. Check if `usercourseid` already exists in `upload_report`
      const checkQuery = `SELECT * FROM upload_report WHERE usercourseid = ?`;
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
          // 2. Insert into `upload_report` table
          const insertReportQuery = `
                  INSERT INTO upload_report (usercourseid, maxmarks)
                  VALUES (?, ?)
                `;
          const [reportResult] = await db.promise().query(insertReportQuery, [usercourseid, maxMarks]);

          // Retrieve the inserted `report_id`
          const report_id = reportResult.insertId;

          // // 3. Insert each detail into `report_details` and get `report_idq`
          // for (let reportDetail of reportDetails) {
          //   const { title, coNames } = reportDetail;

          //   // Insert into `report_details` with `report_id`
          //   const insertReportDetailQuery = `
          //             INSERT INTO report_details (report_title, report_id)
          //             VALUES (?, ?)
          //           `;
          //   const [reportDetailResult] = await db.promise().query(insertReportDetailQuery, [title, report_id]);

          //   // Retrieve the inserted `report_idq`
          //   const report_idq = reportDetailResult.insertId;

            // 4. Insert each CO name into `co_report` for the corresponding `report_idq`
            for (let coName of coNames) {
              const insertCoReportQuery = `
                          INSERT INTO co_report (coname, co_id)
                          VALUES (?, ?)
                        `;
              await db.promise().query(insertCoReportQuery, [coName, report_id]);
            }
          

          // Commit the transaction if all queries were successful
          db.commit((commitErr) => {
            if (commitErr) {
              db.rollback(() => {
                return res.status(500).json({ error: "Error committing transaction" });
              });
            } else {
              return res.status(200).json({ message: "Report data uploaded successfully!" });
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
  } else if (dataToSubmit.formDataForKey === "PPT") {
    try {
      const { usercourseid, maxMarks, coNames } = dataToSubmit; // Ensure coNames is included in the request
  
      // Check if coNames exists and is an array
      if (!Array.isArray(coNames)) {
        return res.status(400).json({ error: "Invalid CO names format. Expected an array of CO names." });
      }
  
      // 1. Check if `usercourseid` already exists in `upload_ppt`
      const checkQuery = `SELECT * FROM upload_ppt WHERE usercourseid = ?`;
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
          // 2. Insert into `upload_ppt` table
          const insertPPTQuery = `
            INSERT INTO upload_ppt (usercourseid, maxmarks)
            VALUES (?, ?)
          `;
          const [pptResult] = await db.promise().query(insertPPTQuery, [usercourseid, maxMarks]);
  
          // Retrieve the inserted `ppt_id`
          const ppt_id = pptResult.insertId;
  
          // 3. Insert each CO name into `co_ppt` for the corresponding `ppt_id`
          for (let coName of coNames) {
            const insertCoPPTQuery = `
              INSERT INTO co_ppt (coname, co_id)
              VALUES (?, ?)
            `;
            await db.promise().query(insertCoPPTQuery, [coName, ppt_id]); // Insert the coName and corresponding ppt_id as co_id
          }
  
          // Commit the transaction if all queries were successful
          db.commit((commitErr) => {
            if (commitErr) {
              db.rollback(() => {
                return res.status(500).json({ error: "Error committing transaction" });
              });
            } else {
              return res.status(200).json({ message: "PPT data uploaded successfully!" });
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

}  else if (dataToSubmit.formDataForKey === "Attendance") {
  const { usercourseid, maxMarks } = dataToSubmit;

  try {
    // 1. Check if `usercourseid` already exists in `upload_attendance`
    const checkQuery = `SELECT * FROM upload_attendance WHERE usercourseid = ?`;
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
          INSERT INTO upload_attendance (usercourseid, maxmarks)
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

//scilab
} else if (dataToSubmit.formDataForKey === "SCILab / Mini Project") {
  const { usercourseid, maxMarks, coNames } = dataToSubmit;

  try {
    // 1. Check if `usercourseid` already exists in `uploadscilabpract`
    const checkQuery = `SELECT * FROM uploadscilabpract WHERE usercourseid = ?`;
    const [checkResult] = await db.promise().query(checkQuery, [usercourseid]);

    if (checkResult.length > 0) {
      // If usercourseid exists, return an error message
      return res.status(400).json({ error: "Data already exists for this usercourseid." });
    }

    // Begin a transaction
    db.beginTransaction(async (err) => {
      if (err) {
        console.error("Error starting transaction:", err);
        return res.status(500).json({ error: "Error starting transaction" });
      }

      try {
        // 2. Insert into `uploadscilabpract` table
        const insertAttendanceQuery = `
          INSERT INTO uploadscilabpract (usercourseid, maxmarks)
          VALUES (?, ?)
        `;
        console.log("Running query:", insertAttendanceQuery, [usercourseid, maxMarks]);
        const [scilabresult] = await db.promise().query(insertAttendanceQuery, [usercourseid, maxMarks]);

        // Retrieve the inserted `sci_id`
        const sci_id = scilabresult.insertId;
        console.log("Inserted sci_id:", sci_id);

        for (let coName of coNames) {
          const insertCoPPTQuery = `
            INSERT INTO co_scilab (coname, co_id)
            VALUES (?, ?)
          `;
          console.log("Running query:", insertCoPPTQuery, [coName, sci_id]);
          await db.promise().query(insertCoPPTQuery, [coName, sci_id]);
        }

        // Commit the transaction if successful
        db.commit((commitErr) => {
          if (commitErr) {
            db.rollback(() => {
              console.error("Error committing transaction:", commitErr);
              return res.status(500).json({ error: "Error committing transaction" });
            });
          } else {
            console.log("Transaction committed successfully");
            return res.status(200).json({ message: "Scilab/Mini Project data uploaded successfully!" });
          }
        });
      } catch (error) {
        // Rollback the transaction in case of an error
        db.rollback(() => {
          console.error("Error during upload process:", error);
          return res.status(500).json({ error: "An error occurred during the upload process." });
        });
      }
    });
  } catch (error) {
    console.error("Error while checking usercourseid:", error);
    return res.status(500).json({ error: "An error occurred while checking usercourseid." });
  }

  
} else if (dataToSubmit.formDataForKey === "Mini Project") {
  const { usercourseid, logbookMaxMarks, review1MaxMarks, review2MaxMarks, projectReportMaxMarks, coNames } = dataToSubmit;

try {
  // 1. Check if `usercourseid` already exists in `upload_miniproject`
  const checkQuery = `SELECT * FROM upload_miniproject WHERE usercourseid = ?`;
  const [checkResult] = await db.promise().query(checkQuery, [usercourseid]);

  if (checkResult.length > 0) {
    return res.status(400).json({ error: "Data already exists for this usercourseid." });
  }

  // Begin a transaction
  await db.promise().beginTransaction();

  try {
    // 2. Insert into `upload_miniproject`
    const insertminiprojectQuery = `
      INSERT INTO upload_miniproject (usercourseid, logbookmarks, review1marks, review2marks, proreportmarks)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [insertResult] = await db.promise().query(insertminiprojectQuery, [usercourseid,  logbookMaxMarks, review1MaxMarks, review2MaxMarks, projectReportMaxMarks]);

    // 3. Get the last inserted ID (`miniproid`)
    const miniproid = insertResult.insertId;

    // 4. Insert into `co_miniproject` for each CO name
    const insertCOQuery = `INSERT INTO co_miniproject (coname, co_id) VALUES (?, ?)`;

    for (const coname of coNames) {
      await db.promise().query(insertCOQuery, [coname, miniproid]);
    }

    // Commit the transaction
    await db.promise().commit();

    return res.status(200).json({ message: "Mini Project data and COs uploaded successfully!" });
  } catch (error) {
    // Rollback the transaction if something goes wrong
    await db.promise().rollback();
    console.error(error);
    return res.status(500).json({ error: "An error occurred during the upload process." });
  }
} catch (error) {
  console.error(error);
  return res.status(500).json({ error: "An error occurred while checking usercourseid." });
}

//trade 
} else if (dataToSubmit.formDataForKey === "Trade") {
  const { usercourseid, maxMarks, numAssignments, questions, coNames } = dataToSubmit;

  try {
    // 1. Check if `usercourseid` already exists in `upload_trade`
    const checkQuery = `SELECT * FROM upload_trade WHERE usercourseid = ?`;
    const [checkResult] = await db.promise().query(checkQuery, [usercourseid]);

    if (checkResult.length > 0) {
      // If usercourseid exists, return an error message
      return res
        .status(400)
        .json({ error: "Data already exists for this usercourseid." });
    }

    // Begin a transaction
    await db.promise().beginTransaction();

    try {
      // 2. Insert into `upload_trade` table
      const insertTradeQuery = `
        INSERT INTO upload_trade (usercourseid, nooftrade, marks)
        VALUES (?, ?, ?)
      `;
      const [tradeResult] = await db.promise().query(insertTradeQuery, [usercourseid, numAssignments, maxMarks]);

      // Retrieve the inserted `tradeid`
      const tradeid = tradeResult.insertId;

      // 3. Insert each question into `question_trade` and get `trade_idq`
      for (let questionObj of questions) {
        const { question, coNames } = questionObj;

        // Insert into `question_trade` with `tradeid`
        const insertQuestionQuery = `
          INSERT INTO question_trade (tradename, tradeid)
          VALUES (?, ?)
        `;
        const [questionResult] = await db.promise().query(insertQuestionQuery, [question, tradeid]);

        // Retrieve the inserted `trade_idq`
        const trade_idq = questionResult.insertId;

        // 4. Insert each CO name into `co_trade` for the corresponding `trade_idq`
        for (let coName of coNames) {
          const insertCoTradeQuery = `
            INSERT INTO co_trade (coname, co_id)
            VALUES (?, ?)
          `;
          await db.promise().query(insertCoTradeQuery, [coName, trade_idq]);
        }
      }

      // Commit the transaction if all queries were successful
      await db.promise().commit();
      return res
        .status(200)
        .json({ message: "Data uploaded successfully!" });
    } catch (error) {
      // Rollback the transaction in case of an error
      await db.promise().rollback();
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred during the upload process." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while checking usercourseid." });
  }

  //journal
 } else if (dataToSubmit.formDataForKey === "Journal") {
  const { usercourseid, maxMarks, coNames } = dataToSubmit;
  console.log(usercourseid,maxMarks,coNames)
  try {
    // 1. Check if `usercourseid` already exists in `upload_journal`
    const checkQuery = `SELECT * FROM upload_journal WHERE usercourseid = ?`;
    const [checkResult] = await db.promise().query(checkQuery, [usercourseid]);

    if (checkResult.length > 0) {
      // If usercourseid exists, return an error message
      return res
        .status(400)
        .json({ error: "Data already exists for this usercourseid." });
    }

    // Begin a transaction
    await db.promise().beginTransaction();

    try {
      // 2. Insert into `upload_journal` table
      const insertJournalQuery = `
        INSERT INTO upload_journal (usercourseid, maxmarks)
        VALUES (?, ?)
      `;
      const [journalResult] = await db.promise().query(insertJournalQuery, [usercourseid, maxMarks]);

      // Retrieve the inserted `journalid`
      const journalid = journalResult.insertId;

      // 3. Insert each CO name into `co_journal` for the corresponding `journalid`
      for (let coName of coNames) {
        const insertCoJournalQuery = `
          INSERT INTO co_journal (coname, co_id)
          VALUES (?, ?)
        `;
        await db.promise().query(insertCoJournalQuery, [coName, journalid]);
      }

      // Commit the transaction if all queries were successful
      await db.promise().commit();
      return res
        .status(200)
        .json({ message: "Data uploaded successfully!" });

    } catch (error) {
      // Rollback the transaction in case of an error
      await db.promise().rollback();
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred during the upload process." });
    }

  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while checking usercourseid." });
  }

  
 } else {
    return res.status(400).json({ error: "Invalid formDataForKey provided." });
  }
};
