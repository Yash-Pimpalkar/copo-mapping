import { connection as db } from "../config/dbConfig.js";

export const addcos = (req, res) => {
  const formData = req.body.formData;
  const user_course_id = req.body.usercourse_id;

  if (!formData || !user_course_id) {
    return res.status(400).json({ error: "Invalid data" });
  }

  // Check for existing records
  const checkSql = `
    SELECT co_name, co_body
    FROM cos
    WHERE usercourse_id = ?
    AND (co_name, co_body) IN (?)
  `;
  
  // Prepare values for the check query
  const checkValues = formData.map(cos => [cos.cos_name, cos.cos_body]);

  db.query(checkSql, [user_course_id, checkValues], (err, existingRecords) => {
    if (err) {
      console.error("Error checking existing COS records:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Create a set of existing records for easy lookup
    const existingSet = new Set(existingRecords.map(record => `${record.co_name}|${record.co_body}`));
    
    // Check for duplicates in the formData
    const duplicates = formData.filter(cos => existingSet.has(`${cos.cos_name}|${cos.cos_body}`));
    
    if (duplicates.length > 0) {
      return res.status(400).json({ error: "Some COS records already exist", duplicates });
    }
    
    // Proceed with insertion if no duplicates
    const sql = "INSERT INTO cos (usercourse_id, co_name, co_body, created_time) VALUES ?";
    const values = formData.map(cos => [user_course_id, cos.cos_name, cos.cos_body, new Date()]);

    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error inserting COS records:", err);
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(200).json({ message: "COS records added successfully", result });
    });
  });
};


export const show_cos = (req, res) => {
    const user_course_id = req.params.uid; 
    // console.log(user_course_id)// Use req.query for GET requests
    const sql = "SELECT * FROM cos WHERE usercourse_id=?";
    db.query(sql, user_course_id, (err, result) => {
        if (err) {
            console.error("Error fetching COS records:", err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json(result);
    });
};