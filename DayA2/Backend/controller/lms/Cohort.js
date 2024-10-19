import { connection as db } from "../../config/dbConfig.js"

export const getAllCohorts = (req, res) => {
    const sql = 'SELECT * FROM cohort';
    
    db.query(sql, (error, rows) => {
      if (error) {
        console.error('Error fetching cohorts:', error);
        return res.status(500).json({ error: 'Failed to fetch cohorts' });
      }
      res.status(200).json(rows);
    });
  };

  
 
  
  export const getCohortById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM cohort WHERE cohort_id = ?';
    
    db.query(sql, [id], (error, rows) => {
      if (error) {
        console.error('Error fetching cohort:', error);
        return res.status(500).json({ error: 'Failed to fetch cohort' });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Cohort not found' });
      }
      res.status(200).json(rows[0]);
    });
  };
  

  export const createCohort = (req, res) => {
    const { user_id, cohort_name, branch, semester, classname, academic_year } = req.body;
    const sql = 'INSERT INTO cohort (user_id, cohort_name, branch, semester, classname, academic_year) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [user_id, cohort_name, branch, semester, classname, academic_year], (error, result) => {
      if (error) {
        console.error('Error creating cohort:', error);
        return res.status(500).json({ error: 'Failed to create cohort' });
      }
      res.status(201).json({ message: 'Cohort created successfully', cohortId: result.insertId });
    });
  };

  
  export const updateCohort = (req, res) => {
    const { id } = req.params;
    const { user_id, cohort_name, branch, semester, classname, academic_year } = req.body;
    const sql = 'UPDATE cohort SET  cohort_name = ?, branch = ?, semester = ?, classname = ?, academic_year = ? WHERE cohort_id = ?';
    
    db.query(sql, [ cohort_name, branch, semester, classname, academic_year, id], (error, result) => {
      if (error) {
        console.error('Error updating cohort:', error);
        return res.status(500).json({ error: 'Failed to update cohort' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Cohort not found' });
      }
      res.status(200).json({ message: 'Cohort updated successfully' });
    });
  };

  
  export const deleteCohort = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM cohort WHERE cohort_id = ?';
    
    db.query(sql, [id], (error, result) => {
      if (error) {
        console.error('Error deleting cohort:', error);
        return res.status(500).json({ error: 'Failed to delete cohort' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Cohort not found' });
      }
      res.status(200).json({ message: 'Cohort deleted successfully' });
    });
  };
  

  export const ManageStudents = (req, res) => {
    // console.log("Fetching students...");
    const sql = 'SELECT sid, stud_clg_id, student_name, semester, branch, email, academic_year FROM lms_students';
  
    db.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching students:', error);
        return res.status(500).json(  'Internal Server Error' );
      }
      res.status(200).json(results);
    });
  };



//   export const Demo = (req,res) =>{
//     const sql = "select * from lms_students";
//     db.query(sql, (error, results) => {
//         if (error) {
//           console.error('Error fetching students:', error);
//           return res.status(500).json(  'Internal Server Error' );
//         }
//         res.status(200).json(results);
//       });
//   }



export const assignStudentsToCohort = (req, res) => {
    const { cohort_id } = req.params; // Cohort ID from URL
    const cohortIdAsInt = parseInt(cohort_id); // Convert cohortId to an integer
    const { selectedStudents } = req.body; // Array of selected student IDs
  
    // Insert each student into the student_cohort table
    const values = selectedStudents.map(sid => [sid, cohortIdAsInt]);
    const sql = 'INSERT INTO student_cohort (student_id, cohort_id) VALUES ?';
  
    db.query(sql, [values], (error) => {
      if (error) {
        console.error('Error inserting students into cohort:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      res.status(200).json({ message: 'Students assigned to cohort successfully' });
    });
  };
  

// export const insertStudentCohort = (req, res) => {
//     const { cohortId, studentIds } = req.body; // Expecting cohortId and studentIds array from frontend
  
//     // Check if cohortId and studentIds are provided
//     if (!cohortId || !studentIds || !Array.isArray(studentIds)) {
//       return res.status(400).json({
//         error: 'cohortId and studentIds are required',
//       });
//     }
  
//     // Prepare a placeholder for the SQL query
//     const placeholders = studentIds.map(() => '(?, ?)').join(', ');
  
//     // Create a SQL query to check existing student IDs in the cohort
//     const existingStudentsQuery = `
//       SELECT student_id 
//       FROM student_cohort 
//       WHERE cohort_id = ? 
//         AND student_id IN (${studentIds.join(',')})
//     `;
  
//     // Execute the query to find existing students
//     db.query(existingStudentsQuery, [cohortId], (err, existingResults) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({
//           error: 'An error occurred while checking existing students',
//         });
//       }
  
//       // Create an array of existing student IDs
//       const existingStudentIds = existingResults.map(row => row.student_id);
  
//       // Filter out duplicates
//       const newStudentIds = studentIds.filter(id => !existingStudentIds.includes(id));
  
//       if (newStudentIds.length === 0) {
//         return res.status(200).json({
//           message: 'No new students to add to the cohort',
//         });
//       }
  
//       // Prepare the insertion query
//       const insertQuery = `
//         INSERT INTO student_cohort (student_id, cohort_id) 
//         VALUES ${newStudentIds.map(id => `(${id}, ${cohortId})`).join(', ')}
//       `;
  
//       // Execute the insertion query
//       db.query(insertQuery, (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).json({
//             error: 'An error occurred while adding students to the cohort',
//           });
//         }
  
//         res.status(200).json({
//           message: `${newStudentIds.length} students added to cohort successfully`,
//         });
//       });
//     });
//   };



  export const getCohortStudents = (req, res) => {
    const { cohort_id } = req.params;
  
    const sql = `
      SELECT s.sid, s.stud_clg_id, s.student_name, s.semester, s.branch, s.email, s.academic_year 
      FROM lms_students s
      INNER JOIN student_cohort sc ON s.sid = sc.student_id
      WHERE sc.cohort_id = ?
    `;
  
    db.query(sql, [cohort_id], (error, results) => {
      if (error) {
        console.error('Error fetching cohort students:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      res.status(200).json(results);
    });
  };



  // Remove a single student from the cohort
  export const removeStudentFromCohort = (req, res) => {
    const { cohortId, studentId } = req.params;
  
    // Check if cohortId and studentId exist
    if (!cohortId || !studentId) {
      return res.status(400).json({ message: 'Cohort ID and Student ID are required' });
    }
  
    const sql = 'DELETE FROM student_cohort WHERE (student_id = ? AND cohort_id = ?)';
  
    // Reverse the order of studentId and cohortId here
    db.query(sql, [studentId, cohortId], (error, results) => {
      if (error) {
        console.log(error)
        console.error('Error removing student from cohort:', error);
        return res.status(500).json({ message: 'Error removing student from cohort', error });
      }
  
      // Check if any rows were affected by the delete query
      if (results.affectedRows > 0) {
        return res.status(200).json({ message: 'Student removed successfully from the cohort' });
      } else {
        return res.status(404).json({ message: 'Student not found in this cohort' });
      }
    });
  };
  
  
  // Remove all students from a specific cohort
export const removeAllStudentsFromCohort = (req, res) => {
    const { cohortId } = req.params;
  
    const query = 'DELETE FROM student_cohort WHERE cohort_id = ?';
  
    db.query(query, [cohortId], (error, results) => {
      if (error) {
        console.error('Error removing all students from cohort:', error);
        return res.status(500).json({ message: 'Error removing all students from cohort' });
      }
  
      if (results.affectedRows > 0) {
        return res.status(200).json({ message: 'All students removed successfully from the cohort' });
      } else {
        return res.status(404).json({ message: 'No students found in this cohort' });
      }
    });
  };


  export const cohort_name = (req, res) => {
    const { cohort_id } = req.params; // Destructure cohort_id from req.params
    // console.log(cohort_id); // Verify the cohort_id is being received correctly
  
    const sql = "SELECT * FROM cohort WHERE cohort_id = ?";
  
    db.query(sql, [cohort_id], (error, results) => {
      if (error) {
        console.error('Error fetching cohort: ', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: 'Cohort not found' });
      }
    });
  };
  



  