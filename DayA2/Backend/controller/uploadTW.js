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
  } else if (dataToSubmit.formDataForKey === "Report") {
    try {
      const { usercourseid, maxMarks, numReports, reportDetails } = dataToSubmit;
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
                  INSERT INTO upload_report (usercourseid, maxmarks, noofreports)
                  VALUES (?, ?, ?)
                `;
          const [reportResult] = await db.promise().query(insertReportQuery, [usercourseid, maxMarks, numReports]);

          // Retrieve the inserted `report_id`
          const report_id = reportResult.insertId;

          // 3. Insert each detail into `report_details` and get `report_idq`
          for (let reportDetail of reportDetails) {
            const { title, coNames } = reportDetail;

            // Insert into `report_details` with `report_id`
            const insertReportDetailQuery = `
                      INSERT INTO report_details (report_title, report_id)
                      VALUES (?, ?)
                    `;
            const [reportDetailResult] = await db.promise().query(insertReportDetailQuery, [title, report_id]);

            // Retrieve the inserted `report_idq`
            const report_idq = reportDetailResult.insertId;

            // 4. Insert each CO name into `co_report` for the corresponding `report_idq`
            for (let coName of coNames) {
              const insertCoReportQuery = `
                          INSERT INTO co_report (coname, co_id)
                          VALUES (?, ?)
                        `;
              await db.promise().query(insertCoReportQuery, [coName, report_idq]);
            }
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
      const { usercourseid, maxMarks, numPPTs, pptDetails } = dataToSubmit;
      // Assuming `pptDetails` contains details similar to `questions` in the original code.

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
                  INSERT INTO upload_ppt (usercourseid, maxmarks, noofppts)
                  VALUES (?, ?, ?)
                `;
          const [pptResult] = await db.promise().query(insertPPTQuery, [usercourseid, maxMarks, numPPTs]);

          // Retrieve the inserted `ppt_id`
          const ppt_id = pptResult.insertId;

          // 3. Insert each detail into `ppt_details` and get `ppt_idq`
          for (let pptDetail of pptDetails) {
            const { title, coNames } = pptDetail;

            // Insert into `ppt_details` with `ppt_id`
            const insertPPTDetailQuery = `
                      INSERT INTO ppt_details (ppt_title, ppt_id)
                      VALUES (?, ?)
                    `;
            const [pptDetailResult] = await db.promise().query(insertPPTDetailQuery, [title, ppt_id]);

            // Retrieve the inserted `ppt_idq`
            const ppt_idq = pptDetailResult.insertId;

            // 4. Insert each CO name into `co_ppt` for the corresponding `ppt_idq`
            for (let coName of coNames) {
              const insertCoPPTQuery = `
                          INSERT INTO co_ppt (coname, co_id)
                          VALUES (?, ?)
                        `;
              await db.promise().query(insertCoPPTQuery, [coName, ppt_idq]);
            }
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

  //logbook//
  } else if (dataToSubmit.formDataForKey === "Logbook") {
    try {
      const { usercourseid, maxMarks, numlogbook, logbookDetails } = dataToSubmit;                             //dicey
      // Assuming `logbookDetails` contains details similar to `questions` in the original code.

      // 1. Check if `usercourseid` already exists in `upload_ppt`
      const checkQuery = `SELECT * FROM upload_logbook WHERE usercourseid = ?`;
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
          // 2. Insert into `logbook` table
          const insertlogbookQuery = `
                  INSERT INTO logbook (usercourseid, maxmarks, nooflogbook)
                  VALUES (?, ?, ?)
                `;
          const [logbookResult] = await db.promise().query(insertlogbookQuery, [usercourseid, maxMarks, numlogbook]);

          // Retrieve the inserted `ppt_id`
          const logbookid = logbookResult.insertId;

          // 3. Insert each detail into `ppt_details` and get `ppt_idq`
          for (let logbookDetail of logbookDetails) {
            const { title, coNames } = logbookDetail;

            // Insert into `ppt_details` with `ppt_id`
            const insertlogbookDetailQuery = `
                      INSERT INTO logbookdetails (logbooktitle, logbookid)
                      VALUES (?, ?)
                    `;
            const [logbookDetailResult] = await db.promise().query(insertlogbookDetailQuery, [title, logbookid]);

            // Retrieve the inserted `logbookidq`
            const logbookidq = logbookDetailResult.insertId;

            // 4. Insert each CO name into `co_ppt` for the corresponding `logbookidq`
            for (let coName of coNames) {
              const insertCologbookQuery = `
                          INSERT INTO co_logbook (coname, co_id)
                          VALUES (?, ?)
                        `;
              await db.promise().query(insertCologbookQuery, [coName, logbookidq]);
            }
          }

          // Commit the transaction if all queries were successful
          db.commit((commitErr) => {
            if (commitErr) {
              db.rollback(() => {
                return res.status(500).json({ error: "Error committing transaction" });
              });
            } else {
              return res.status(200).json({ message: "Logbook data uploaded successfully!" });
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

  //Review 1
  } else if (dataToSubmit.formDataForKey === "Review 1") {
  try {
    const { usercourseid, maxMarks, numreview1, review1Details } = dataToSubmit;                             //dicey
    // Assuming `reviewDetails` contains details similar to `questions` in the original code.

    // 1. Check if `usercourseid` already exists in `upload_ppt`
    const checkQuery = `SELECT * FROM review1 WHERE usercourseid = ?`;
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
        // 2. Insert into `logbook` table
        const insertreview1Query = `
                INSERT INTO review1 (usercourseid, maxmarks, noofreview1)
                VALUES (?, ?, ?)
              `;
        const [review1Result] = await db.promise().query(insertreview1Query, [usercourseid, maxMarks, numreview1]);

        // Retrieve the inserted `review1id`
        const review1id = review1Result.insertId;

        // 3. Insert each detail into `review1details` and get `review1idq`
        for (let review1Detail of review1Details) {
          const { title, coNames } = review1Detail;

          // Insert into `review1details` with `review1id`
          const insertreview1DetailQuery = `
                    INSERT INTO review1details (review1title, review1id)
                    VALUES (?, ?)
                  `;
          const [review1DetailResult] = await db.promise().query(insertreview1DetailQuery, [title, review1id]);

          // Retrieve the inserted `review1idq`
          const review1idq = review1DetailResult.insertId;

          // 4. Insert each CO name into `co_review1` for the corresponding `review1idq`
          for (let coName of coNames) {
            const insertCoreview1Query = `
                        INSERT INTO co_review1 (coname, co_id)
                        VALUES (?, ?)
                      `;
            await db.promise().query(insertCoreview1Query, [coName, review1idq]);
          }
        }

        // Commit the transaction if all queries were successful
        db.commit((commitErr) => {
          if (commitErr) {
            db.rollback(() => {
              return res.status(500).json({ error: "Error committing transaction" });
            });
          } else {
            return res.status(200).json({ message: "Review1 data uploaded successfully!" });
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

//Review2
} else if (dataToSubmit.formDataForKey === "Review 2") {
  try {
    const { usercourseid, maxMarks, numreview2, review2Details } = dataToSubmit;                             //dicey
    // Assuming `review2Details` contains details similar to `questions` in the original code.

    // 1. Check if `usercourseid` already exists in `upload_ppt`
    const checkQuery = `SELECT * FROM review2 WHERE usercourseid = ?`;
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
        // 2. Insert into `Review 2` table
        const insertreview2Query = `
                INSERT INTO review2 (usercourseid, maxmarks, noofreview2)
                VALUES (?, ?, ?)
              `;
        const [review2Result] = await db.promise().query(insertreview2Query, [usercourseid, maxMarks, numreview2]);

        // Retrieve the inserted `review1id`
        const review2id = review2Result.insertId;

        // 3. Insert each detail into `review2details` and get `review2idq`
        for (let review2Detail of review2Details) {
          const { title, coNames } = review2Detail;

          // Insert into `review2details` with `review2id`
          const insertreview2DetailQuery = `
                    INSERT INTO review2details (review2title, review2id)
                    VALUES (?, ?)
                  `;
          const [review2DetailResult] = await db.promise().query(insertreview2DetailQuery, [title, review2id]);

          // Retrieve the inserted `review2idq`
          const review2idq = review2DetailResult.insertId;

          // 4. Insert each CO name into `co_review2` for the corresponding `review2idq`
          for (let coName of coNames) {
            const insertCoreview2Query = `
                        INSERT INTO co_review2 (coname, co_id)
                        VALUES (?, ?)
                      `;
            await db.promise().query(insertCoreview2Query, [coName, review2idq]);
          }
        }

        // Commit the transaction if all queries were successful
        db.commit((commitErr) => {
          if (commitErr) {
            db.rollback(() => {
              return res.status(500).json({ error: "Error committing transaction" });
            });
          } else {
            return res.status(200).json({ message: "Review2 data uploaded successfully!" });
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

//Project Report 
} else if (dataToSubmit.formDataForKey === "Project Report") {
  try {
    const { usercourseid, maxMarks, numproreport, proreportDetails } = dataToSubmit;                             //dicey
    // Assuming `proreportDetails` contains details similar to `questions` in the original code.

    // 1. Check if `usercourseid` already exists in `proreport`
    const checkQuery = `SELECT * FROM proreport WHERE usercourseid = ?`;
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
        // 2. Insert into `proreport` table
        const insertproreportQuery = `
                INSERT INTO proreport (usercourseid, maxmarks, noofproreport)
                VALUES (?, ?, ?)
              `;
        const [proreportResult] = await db.promise().query(insertproreportQuery, [usercourseid, maxMarks, numproreport]);

        // Retrieve the inserted `proreport`
        const proreportid = proreportResult.insertId;

        // 3. Insert each detail into `proreportdetails` and get `proreportidq`
        for (let proreportDetail of proreportDetails) {
          const { title, coNames } = proreportDetail;

          // Insert into `proreportdetails` with `proreportid`
          const insertproreportDetailQuery = `
                    INSERT INTO proreportdetails (proreporttitle, proreportid)
                    VALUES (?, ?)
                  `;
          const [proreportDetailResult] = await db.promise().query(insertproreportDetailQuery, [title, proreportid]);

          // Retrieve the inserted `proreportidq`
          const proreportidq = proreportDetailResult.insertId;

          // 4. Insert each CO name into `co_review2` for the corresponding `review2idq`
          for (let coName of coNames) {
            const insertCoproreportQuery = `
                        INSERT INTO co_proreport (coname, co_id)
                        VALUES (?, ?)
                      `;
            await db.promise().query(insertCoproreportQuery, [coName, proreportidq]);
          }
        }

        // Commit the transaction if all queries were successful
        db.commit((commitErr) => {
          if (commitErr) {
            db.rollback(() => {
              return res.status(500).json({ error: "Error committing transaction" });
            });
          } else {
            return res.status(200).json({ message: "Project Report data uploaded successfully!" });
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
}
  
  
  
  
  
  else {
    return res.status(400).json({ error: "Invalid formDataForKey provided." });
  }
};
