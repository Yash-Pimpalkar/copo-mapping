import { connection as db } from "../config/dbConfig.js";

export const user_course_registration = (req,res) => {
    const { user_id, course_code, sem, academic_year, branch, co_count } = req.body;
    console.log(user_id, course_code, sem, academic_year, branch, co_count)
    // Validate the data (additional validation logic can be added as needed)
    if (!user_id || !course_code || !sem || !academic_year || !branch || !co_count) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Simulate saving to a database (this is just an example, replace with actual DB logic)
   
  


    const q = `SELECT courseid FROM course WHERE coursecode = ?`;
    db.query(q, course_code, (err, result) => {
    if (err) {
    console.error('Error querying the database:', err);
    return res.status(500).json({ error: 'Database error' });
  }
  
  
  const courseid=result[0].courseid;
  
  
  const values = [
    user_id,
    courseid,
    sem,
    academic_year,
    branch,
    co_count
  ];
  console.log(values)// Log the result after query is completed
  const query = `
  INSERT INTO user_course (user_id, course_id, semester, academic_year, branch, co_count)
  VALUES (?,?,?,?,?,?)`;
  db.query(query, values, (err, result) => {
  if (err) {
    console.error('Error saving to database:', err);
    return res.status(500).json({ error: 'Database error' });
  }
  console.log('New registration:', result);
  res.status(201).json({ message: 'Registration successful'});
  });
  // Optionally send the result back to the clien
});
}



export const show_user_course = (req,res) => {

}





   


 
