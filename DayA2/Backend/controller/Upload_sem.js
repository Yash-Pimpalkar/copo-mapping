import { connection as db } from "../config/dbConfig.js";

export const upload_Sem_Questions = async (req, res) => {
  const { formDataWithUserCourseId } = req.body;

//   console.log('Received data:', formDataWithUserCourseId);

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
    const checkQuery = 'SELECT * FROM semester_marks WHERE usercourseid = ?';
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
        const insertQuery = 'INSERT INTO semester_marks (co_count, usercourseid, max_marks) VALUES ?';
        const values = dataArray.map(({ cocount, usercourseid, marks }) => [cocount, usercourseid, marks]);

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


export const showSemData = async (req, res) => {
    const userCourseId = req.params.uid;
   
    const sql=`SELECT 
    s.sem_id,
    s.semid,
    s.sid,
    s.marks,
    c.student_name,
    c.stud_clg_id
FROM 
    table_sem AS s
INNER JOIN 
    semester_marks AS m ON s.semid = m.semid
INNER JOIN 
    copo_students_details AS c ON s.sid = c.sid
WHERE 
    m.usercourseid = ?;
`;
    db.query(sql,userCourseId,(error,results)=>{
      if(error){
        console.error('Error fetching IA data:', error);
        res.status(500).send('Server error');
      }
      res.status(200).json(results);
    })
    
  };



  
  export const SemUpload = async (req, res) => {
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
    const sql = 'UPDATE table_sem SET marks = ? WHERE sem_id = ?';
    const queryValues = updates.map(update => {
        const marks = parseInt(update.Marks, 10);
    
        return [
            isNaN(marks) ? null : marks,  // Use null or a default value if marks is NaN
            update.sem_id
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
