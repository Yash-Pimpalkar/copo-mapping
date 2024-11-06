import { connection as db } from "../config/dbConfig.js";


export const upload_MajorProject_Questions = async (req, res) => {
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
    const checkQuery = 'SELECT * FROM upload_majorprosem WHERE usercourseid = ?';
    db.query(checkQuery, [usercourseid], (error, results) => {
      if (error) {
        console.error('Error checking existing usercourseid:', error.message);
        return res.status(500).json({ error: error.message });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'UserCourse ID already exists' });
      }

      const insertQuery = `
        INSERT INTO upload_majorprosem (usercourseid, logbookmarks, review1marks, review2marks, proreportmarks) 
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(insertQuery, [usercourseid, parseInt(logbookmarks, 10), parseInt(review1marks, 10), parseInt(review2marks, 10), parseInt(proreportmarks, 10)], (error, result) => {
        if (error) {
          console.error('Error inserting data into upload_majorprosem:', error.message);
          return res.status(500).json({ error: error.message });
        }

        const majorprosemid = result.insertId;

        const coInsertQuery = `
          INSERT INTO co_majorprosem (coname, co_id) 
          VALUES ?
        `;
        const coValues = coData.map(co => [co.coname, majorprosemid]);

        db.query(coInsertQuery, [coValues], (error, coResult) => {
          if (error) {
            console.error('Error inserting data into co_majorprosem:', error.message);
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






export const showMajorProjectData = async (req, res) => {
  const userCourseId = req.params.uid;

  const sql = `SELECT 
    mp.mainmajorprosemid,
    mp.sid,
    mp.logbookmarks,
    mp.review1marks,
    mp.review2marks,
    mp.proreportmarks,
    mp.majorprosemid,
    c.student_name,
    c.stud_clg_id
FROM 
    main_majorprosem AS mp
INNER JOIN 
    upload_majorprosem AS m ON mp.majorprosemid = m.majorprosemid
INNER JOIN 
    copo_students_details AS c ON mp.sid = c.sid
WHERE 
    m.usercourseid = ?;
    `;
  db.query(sql, userCourseId, (error, results) => {
    if (error) {
      console.error('Error fetching Major Project data:', error);
      res.status(500).send('Server error');
    }
    res.status(200).json(results);
  })

};

export const MajorProjectUpload = async (req, res) => {
  let updates = req.body;
  console.log('Received updates:', updates);
  
  
  if (typeof updates === 'object' && !Array.isArray(updates)) {
    updates = [updates];
  }

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send('Invalid input');
  }

  // Prepare the select query to fetch existing values
  const selectSql = 'SELECT * FROM main_majorprosem WHERE mainmajorprosemid = ?';
  const updateSql = 'UPDATE main_majorprosem SET logbookmarks = ?, review1marks = ?, review2marks = ?, proreportmarks = ? WHERE mainmajorprosemid = ?';

  const queryValues = await Promise.all(
    updates.map(async (update) => {
      const mainmajorprosemid = update.mainmajorprosemid;

      if (!mainmajorprosemid) {
        console.error('Error: mainmajorprosemid is missing.');
        return;
      }

      // Fetch the current values from the database
      const currentData = await new Promise((resolve, reject) => {
        db.query(selectSql, [mainmajorprosemid], (error, results) => {
          if (error) {
            console.error('Database fetch error:', error);
            return reject(error);
          }
          resolve(results[0]);
        });
      });

      if (!currentData) {
        console.error(`No record found with mainmajorprosemid: ${mainmajorprosemid}`);
        return;
      }

      // Map the received properties to match the expected names
      const logbookmarks = update.logbook_marks !== undefined ? parseInt(update.logbook_marks, 10) : currentData.logbookmarks;
      const review1marks = update.review1_marks !== undefined ? parseInt(update.review1_marks, 10) : currentData.review1marks;
      const review2marks = update.review2_marks !== undefined ? parseInt(update.review2_marks, 10) : currentData.review2marks;
      const proreportmarks = update.proreportmarks !== undefined ? parseInt(update.proreportmarks, 10) : currentData.proreportmarks;
      console.log(logbookmarks, review1marks, review2marks, proreportmarks);

      return [
        logbookmarks,
        review1marks,
        review2marks,
        proreportmarks,
        mainmajorprosemid
      ];
    })
  );

  try {
    await Promise.all(queryValues.map((values) => {
      return new Promise((resolve, reject) => {
        console.log(`Executing query: ${updateSql} with values: ${values}`);
        db.query(updateSql, values, (error, results) => {
          if (error) {
            console.error('Database query error:', error);
            return reject(error);
          }
          // console.log('Query result:', results);
          resolve(results);
        });
      });
    }));

    res.status(200).json('Marks updated successfully');
  } catch (error) {
    console.error('Error updating marks:', error);
    res.status(500).json('Server error');
  }
};



export const limit = (req, res) => {
  const userCourseId = req.params.uid;
  const sql = 'SELECT logbookmarks, review1marks, review2marks, proreportmarks FROM upload_majorprosem WHERE usercourseid = ?;';
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
};



export const MajorProject_Attainment = async (req, res) => {
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
      const sql = "SELECT idmajorpro_attainment FROM majorpro_attainment WHERE coname = ? AND usercourse_id = ?";
      db.query(sql, [coName, userCourseId], (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: error.message });
        }

        if (results.length > 0) {
          // If exists, update both Majorpro_attainment and attainment
          const sql1 = "UPDATE majorpro_attainment SET Majorpro_attainment = ?, attainment = ? WHERE idmajorpro_attainment = ?";
          db.query(sql1, [parsedCoAverage, attainment, results[0].idmajorpro_attainment], (error, result) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Updated MajorProject Attainment and attainment for ${coName}`);
          });
        } else {
          // If doesn't exist, insert a new record with coname, Semester_attainment, attainment, and usercourse_id
          const sql2 = "INSERT INTO majorpro_attainment (coname, Majorpro_attainment, attainment, usercourse_id) VALUES (?, ?, ?, ?)";
          db.query(sql2, [coName, parsedCoAverage, attainment, userCourseId], (error, results1) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
            console.log(`Inserted new Major Project attainment and attainment for ${coName}`);
          });
        }
      });
    }

    console.log('Major Project attainment and attainment inserted/updated successfully');
    res.status(200).json({ message: 'Major Project attainment and attainment inserted/updated successfully' });
  } catch (error) {
    console.error('Error inserting/updating Major Project attainment and attainment:', error);
    res.status(500).json({ error: 'Error inserting/updating Major Project attainment and attainment' });
  }
};


export const Co_majorprosem = async (req, res) => {
  const { uid } = req.params;

  try{
    const sql = "SELECT s.idco_majorprosem, s.coname FROM co_majorprosem AS s INNER JOIN upload_majorprosem AS u ON s.co_id = u.majorprosemid WHERE usercourseid = ?";

    db.query(sql, uid, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }

      res.status(200).json(results);
    })
  }catch (error) {
    console.error('Error inserting/updating Major Project attainment and attainment:', error);
    res.status(500).json({ error: 'Error inserting/updating Major Project attainment and attainment' });
  }
}

