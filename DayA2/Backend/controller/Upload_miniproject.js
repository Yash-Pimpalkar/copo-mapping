import { connection as db } from "../config/dbConfig.js";


export const upload_MiniProject_Questions = async (req, res) => {
  const { formDataWithUserCourseId, coData } = req.body;

  console.log("Received formDataWithUserCourseId:", formDataWithUserCourseId);

  if (!formDataWithUserCourseId || typeof formDataWithUserCourseId !== 'object') {
    return res.status(400).json({ error: 'Invalid form data' });
  }

  if (!coData || !Array.isArray(coData)) {
    return res.status(400).json({ error: 'Invalid CO data' });
  }

  const { usercourseid, logbookmarks, review1marks, review2marks, proreportmarks } = formDataWithUserCourseId;

  try {
    const checkQuery = 'SELECT * FROM upload_miniprosem WHERE usercourseid = ?';
    db.query(checkQuery, [usercourseid], (error, results) => {
      if (error) {
        console.error('Error checking existing usercourseid:', error.message);
        return res.status(500).json({ error: error.message });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'UserCourse ID already exists' });
      }

      const insertQuery = `
        INSERT INTO upload_miniprosem (usercourseid, logbookmarks, review1marks, review2marks, proreportmarks) 
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(insertQuery, [usercourseid, parseInt(logbookmarks, 10), parseInt(review1marks, 10), parseInt(review2marks, 10), parseInt(proreportmarks, 10)], (error, result) => {
        if (error) {
          console.error('Error inserting data into upload_miniprosem:', error.message);
          return res.status(500).json({ error: error.message });
        }

        const miniprosemid = result.insertId;

        const coInsertQuery = `
          INSERT INTO co_miniprosem (coname, co_id) 
          VALUES ?
        `;
        const coValues = coData.map(co => [co.coname, miniprosemid]);

        db.query(coInsertQuery, [coValues], (error, coResult) => {
          if (error) {
            console.error('Error inserting data into co_miniprosem:', error.message);
            return res.status(500).json({ error: error.message });
          }

          res.status(201).json({ message: 'Data submitted successfully' });
        });
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};



  


export const showMiniProjectData = async (req, res) => {
  const userCourseId = req.params.uid;

  const sql = `SELECT 
    mp.mainminiprosemid,
    mp.sid,
    mp.logbookmarks,
    mp.review1marks,
    mp.review2marks,
    mp.proreportmarks,
    mp.miniproid,
    l.student_name,
    l.stud_clg_id
FROM 
    main_miniprosem AS mp
INNER JOIN 
    upload_miniprosem AS um ON mp.miniproid = um.miniprosemid
INNER JOIN 
    lms_students AS l ON mp.sid = l.sid
WHERE 
    um.usercourseid = ?`;


  db.query(sql, userCourseId, (error, results) => {
      if (error) {
          console.error('Error fetching Miniproject data:', error);
          res.status(500).send('Server error');
      }
      res.status(200).json(results);
  });
};

export const MiniProjectUpload = async (req, res) => {
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

  // Prepare the query
  const sql = 'UPDATE main_miniprosem SET logbookmarks = ?, review1marks = ?, review2marks = ?, proreportmarks = ? WHERE mainminiprosemid = ?';

  // Map the values for each update and handle NaN/invalid cases
  const queryValues = updates.map(update => {
      return [
          isNaN(parseInt(update.logbookmarks, 10)) ? null : parseInt(update.logbookmarks, 10),    // Handle NaN as null
          isNaN(parseInt(update.review1marks, 10)) ? null : parseInt(update.review1marks, 10),    // Handle NaN as null
          isNaN(parseInt(update.review2marks, 10)) ? null : parseInt(update.review2marks, 10),    // Handle NaN as null
          isNaN(parseInt(update.proreportmarks, 10)) ? null : parseInt(update.proreportmarks, 10),  // Handle NaN as null
          update.mainminiprosemid ? parseInt(update.mainminiprosemid, 10) : null // Ensure mainminiprosemid is not null/NaN
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
                  console.log(`Rows affected: ${results.affectedRows}`);
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



export const limit =(req,res)=>{
  const userCourseId = req.params.uid;
  const sql = 'SELECT logbookmarks, review1marks, review2marks, proreportmarks FROM upload_miniprosem WHERE usercourseid = ?;';
  db.query(sql, [userCourseId], (err, results) => {
    if (err) {
      console.error('Error fetching limits:', err);
      return res.status(500).json({ message: 'Error fetching data from database' });
    }
    console.log(userCourseId);
    console.log('Query results:', results); 
    if (results.length === 0) {
      return res.status(404).json({ message: 'No limits found for the provided userCourseId' });
    }
    res.status(200).json(results);
  });
}


// export const MiniProject_Attainment = async (req, res) => {
//   const { coAverages, userCourseId } = req.body;  // Now includes userCourseId

//   console.log(coAverages, userCourseId);

//   try {
//     for (const { coName, coAverage } of coAverages) {
//       const parsedCoAverage = parseFloat(coAverage);

//       // Determine attainment based on coAverage
//       let attainment;
//       if (parsedCoAverage <= 40) {
//         attainment = 0;
//       } else if (parsedCoAverage > 40 && parsedCoAverage <= 60) {
//         attainment = 1;
//       } else if (parsedCoAverage > 60 && parsedCoAverage <= 70) {
//         attainment = 2;
//       } else {
//         attainment = 3;
//       }

//       // Check if the coname and usercourse_id combination already exists
//       const sql = "SELECT idSemester_attainment FROM semester_attainment WHERE coname = ? AND usercourse_id = ?";
//       db.query(sql, [coName, userCourseId], (error, results) => {
//         if (error) {
//           console.log(error);
//           return res.status(500).json({ error: error.message });
//         }

//         if (results.length > 0) {
//           // If exists, update both Semester_attainment and attainment
//           const sql1 = "UPDATE semester_attainment SET Semester_attainment = ?, attainment = ? WHERE idSemester_attainment = ?";
//           db.query(sql1, [parsedCoAverage, attainment, results[0].idSemester_attainment], (error, result) => {
//             if (error) {
//               console.log(error);
//               return res.status(500).json({ error: error.message });
//             }
//             console.log(`Updated MiniProject Attainment and attainment for ${coName}`);
//           });
//         } else {
//           // If doesn't exist, insert a new record with coname, Semester_attainment, attainment, and usercourse_id
//           const sql2 = "INSERT INTO semester_attainment (coname, Semester_attainment, attainment, usercourse_id) VALUES (?, ?, ?, ?)";
//           db.query(sql2, [coName, parsedCoAverage, attainment, userCourseId], (error, results1) => {
//             if (error) {
//               console.log(error);
//               return res.status(500).json({ error: error.message });
//             }
//             console.log(`Inserted new Semester attainment and attainment for ${coName}`);
//           });
//         }
//       });
//     }

//     console.log('Semester attainment and attainment inserted/updated successfully');
//     res.status(200).json({ message: 'Semester attainment and attainment inserted/updated successfully' });
//   } catch (error) {
//     console.error('Error inserting/updating Semester attainment and attainment:', error);
//     res.status(500).json({ error: 'Error inserting/updating Semester attainment and attainment' });
//   }
// };

export const MiniProject_Attainment = async (req, res) => {
  const { coAverages, userCourseId } = req.body;  // Now includes userCourseId

  console.log("Coaverage: ",coAverages);

  try {
    for (const { coName, coAverage } of coAverages) {
      const parsedCoAverage = coAverage;

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
      const sql = "SELECT idminipro_attainment FROM minipro_attainment WHERE coname = ? AND usercourse_id = ?";
      db.query(sql, [coName, userCourseId], (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: error.message });
        }

        if (results.length > 0) {
          // If exists, update both Minipro_attainment and attainment
          const sql1 = "UPDATE minipro_attainment SET Minipro_attainment = ?, attainment = ? WHERE idminipro_attainment = ?";
          db.query(sql1, [parsedCoAverage, attainment, results[0].idminipro_attainment], (error, result) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Updated Miniproject Attainment and attainment for ${coName}`);
          });
        } else {
          // If doesn't exist, insert a new record with coname, Semester_attainment, attainment, and usercourse_id
          const sql2 = "INSERT INTO minipro_attainment (coname, Minipro_attainment, attainment, usercourse_id) VALUES (?, ?, ?, ?)";
          db.query(sql2, [coName, parsedCoAverage, attainment, userCourseId], (error, results1) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Inserted new Mini Project attainment and attainment for ${coName}`);
          });
        }
      });
    }

    console.log('Mini Project attainment and attainment inserted/updated successfully');
    res.status(200).json({ message: 'Mini Project attainment and attainment inserted/updated successfully' });
  } catch (error) {
    console.error('Error inserting/updating Mini Project attainment and attainment:', error);
    res.status(500).json({ error: 'Error inserting/updating Mini Project attainment and attainment' });
  }
};


export const Co_miniprosem = async (req, res) => {
  const { uid } = req.params;

  try{
    const sql = "SELECT s.idco_miniprosem, s.coname FROM co_miniprosem AS s INNER JOIN upload_miniprosem AS u ON s.co_id = u.miniprosemid WHERE usercourseid = ?";

    db.query(sql, uid, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }

      res.status(200).json(results);
    })
  }catch (error) {
    console.error('Error inserting/updating Mini Project attainment and attainment:', error);
    res.status(500).json({ error: 'Error inserting/updating Mini Project attainment and attainment' });
  }
};




