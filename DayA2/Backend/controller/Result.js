import { connection as db } from "../config/dbConfig.js";

export const fetchTermwork = (req, res) => {
    const usercourseid = req.params.uid;
  
    const sql = "SELECT * FROM termwork_table WHERE usercourseid = ?";
    db.query(sql, [usercourseid], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
  
      if (results.length > 0) {
        return res.status(200).json(results);
      } else {
        return res.status(200).json({ message: "No data available" });
      }
    });
  };
  
  export const tcstyperesult = async (req, res) => {
    const userCourseId = req.params.uid;
    const sql = "SELECT * FROM ia1_attainment WHERE usercourse_id = ?";
    if (!userCourseId) {
      return res.status(400).json({ error: "usercourse id is required" });
    }
  
  
    try {
      db.query(sql, [userCourseId] ,(error,result) => {
          if (error) {
              console.error('Error executing the stored procedure:', error);
              return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json(result);
      });
    } catch (err) {
      res.status(500).json({ error: "Error fetching COS data" });
    }
  
  };
  