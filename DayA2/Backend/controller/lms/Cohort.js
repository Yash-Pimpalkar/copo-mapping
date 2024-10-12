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
    console.log("Fetching students...");
    const sql = 'SELECT sid, stud_clg_id, student_name, semester, branch, email, academic_year FROM lms_students';
  
    db.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching students:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      res.status(200).json(results);
    });
  };
  