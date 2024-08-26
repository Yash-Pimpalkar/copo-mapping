import { connection as db } from "../config/dbConfig.js";

export const upload_Ia_questions = async (req, res) => {
    const { formDataWithUserCourseId } = req.body;
  
    console.log('Received data:', formDataWithUserCourseId);
  
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
  
    // Prepare the SQL query and values for batch insertion
    const query = 'INSERT INTO table_ia (qname, coname, usercourseid, marks) VALUES ?';
    const values = dataArray.map(({ qname, coname, usercourseid, marks }) => [qname, coname, usercourseid, marks]);
  
    
      // Perform the batch insert
      db.query(query, [values],(error,result)=>{
        if (error){
            console.log(error);
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({ message: 'Data submitted successfully' });
      });  
  };


 export const insertiastudents = (req,res) =>{
    const sql =`INSERT INTO upload_ia (sid, qid)
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
WHERE uc.usercourse_id IS NOT NULL`

 }






//   export const showiadata = (req,res)=>{
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
  

// Controller function to get IA data
// export const showIaData = async (req, res) => {
//   const userCourseId = req.params.uid;

//   try {
//     // Generate the list of qname columns
//     const [colNamesResult] = await db.promise().query(`
//       SELECT GROUP_CONCAT(DISTINCT CONCAT(
//           'MAX(CASE WHEN ti.qname = \'', qname, '\' THEN ui.marks END) AS \`', qname, '\`'
//       )) AS colNames 
//       FROM table_ia ti
//       JOIN user_course uc ON ti.usercourseid = uc.usercourse_id
//       WHERE uc.usercourse_id = ?
//     `, [userCourseId]);

//     const colNames = colNamesResult[0].colNames;

//     if (!colNames) {
//       return res.status(404).send('No questions found for this course.');
//     }

//     // Construct the final query
//     const sqlQuery = `
//       SELECT
//           csd.sid, csd.student_name, csd.stud_clg_id, ${colNames}
//       FROM upload_ia ui
//       JOIN table_ia ti ON ui.qid = ti.idtable_ia
//       JOIN user_course uc ON ti.usercourseid = uc.usercourse_id
//       JOIN copo_students_details csd ON ui.sid = csd.sid
//       WHERE uc.usercourse_id = ?
//       GROUP BY csd.sid, csd.student_name, csd.stud_clg_id
//     `;

//     // Execute the final query
//     const [results] = await db.promise().query(sqlQuery, [userCourseId]);

//     res.status(200).json(results);
//   } catch (error) {
//     console.error('Error fetching IA data:', error);
//     res.status(500).send('Server error');
//   }
// };

export const showIaData = async (req, res) => {
  const userCourseId = req.params.uid;
 
  const sql='CALL GetStudentMarksByCourseID(?)';
  db.query(sql,userCourseId,(error,results)=>{
    if(error){
      console.error('Error fetching IA data:', error);
      res.status(500).send('Server error');
    }
    res.status(200).json(results[0]);
  })
  
};

export const IaCOsName = (req,res)=> {
  const userCourseId = req.params.uid;
  const sql= `select * from table_ia where usercourseid = ? `;
  db.query(sql,userCourseId,(error,results)=>{
    if(error){
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


export const Ia2COsName = (req,res)=> {
  const userCourseId = req.params.uid;
  const sql= `select * from table_ia2 where usercourseid = ? `;
  db.query(sql,userCourseId,(error,results)=>{
    if(error){
      console.error('Error fetching IA data:', error);
      res.status(500).send('Server error');
    }
    console.log(results)
    res.status(200).json(results);
  })
}

  // Define the userCourseID


  export const showIa2Data = async (req, res) => {
    const userCourseId = req.params.uid;
   
    const sql='CALL GetStudentMarksByCourseID_IA2(?)';
    db.query(sql,userCourseId,(error,results)=>{
      if(error){
        console.error('Error fetching IA data:', error);
        res.status(500).send('Server error');
      }
      res.status(200).json(results[0]);
    })
    
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
  

  export const upload_Ia2_questions = async (req, res) => {
    const { formDataWithUserCourseId } = req.body;
  
    console.log('Received data:', formDataWithUserCourseId);
  
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
  
    // Prepare the SQL query and values for batch insertion
    const query = 'INSERT INTO table_ia2 (qname, coname, usercourseid, marks) VALUES ?';
    const values = dataArray.map(({ qname, coname, usercourseid, marks }) => [qname, coname, usercourseid, marks]);
  
    
      // Perform the batch insert
      db.query(query, [values],(error,result)=>{
        if (error){
            console.log(error);
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({ message: 'Data submitted successfully' });
      });  
  };


