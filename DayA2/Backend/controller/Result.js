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
  
  export const ia1 = async (req, res) => {
    const userCourseId = req.params.uid;
    const sql = "SELECT * FROM ia1_attainment WHERE usercourse_id = ? AND ia1_attainment IS NOT NULL";
    if (!userCourseId) {
      return res.status(400).json({ error: "usercourse id is required" });
    }
    
    try {
      db.query(sql, [userCourseId] ,(error,result) => {
          if (error) {
              console.error('Error executing the stored procedure:', error);
              return res.status(500).json({ error: 'Internal server error' });
            }
            const uniqueConames = Array.from(new Set(result.map(row => row.coname)));
  
        // Create a map of coname -> attainment for the results from the database
        const attainmentMap = {};
        result.forEach(row => {
          attainmentMap[row.coname] = row.ia1_attainment;
        });
  
        // Dynamically generate the response based on the CO names
        const response = uniqueConames.map(co => ({
          coname: co,
          ia1_attainment: attainmentMap[co] || '' // If attainment doesn't exist, leave it blank
        }));
            res.status(200).json(result);
      });
    } catch (err) {
      res.status(500).json({ error: "Error fetching COS data" });
    }
  
  };

  export const ia2 = async (req, res) => {
    const userCourseId = req.params.uid;
    
    // Query to get COs and their IA2 attainment data for the given usercourse_id
    const sql = "SELECT * FROM ia2_attainment WHERE usercourse_id = ? AND ia2_attainment IS NOT NULL";
    
    if (!userCourseId) {
      return res.status(400).json({ error: "usercourse id is required" });
    }
  
    try {
      db.query(sql, [userCourseId], (error, result) => {
        if (error) {
          console.error('Error executing the query:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        // Extract distinct CO names that have data in ia2_attainment
        const uniqueConames = Array.from(new Set(result.map(row => row.coname)));
  
        // Create a map of coname -> attainment for the results from the database
        const attainmentMap = {};
        result.forEach(row => {
          attainmentMap[row.coname] = row.ia2_attainment;
        });
  
        // Dynamically generate the response based on the CO names
        const response = uniqueConames.map(co => ({
          coname: co,
          ia2_attainment: attainmentMap[co] || '' // If attainment doesn't exist, leave it blank
        }));
  
        res.status(200).json(response);
      });
    } catch (err) {
      res.status(500).json({ error: "Error fetching COs data" });
    }  
  };

  export const Inta = async (req, res) => {
    const userCourseId = req.params.uid;
  
    // Check if the userCourseId parameter is provided
    if (!userCourseId) {
      return res.status(400).json({ error: "usercourse id is required" });
    }
  
    const sql = "SELECT * FROM combined_attainment WHERE usercourse_id = ? AND attainment IS NOT NULL";
  
    try {
      // Wrap the query in a promise for async/await usage
      const result = await new Promise((resolve, reject) => {
        db.query(sql, [userCourseId], (error, result) => {
          if (error) {
            console.error('Error executing the query:', error);
            reject(new Error('Internal server error'));
          } else {
            resolve(result);
          }
        });
      });
  
      // Extract distinct CO names that have data in attainment
      const uniqueConames = Array.from(new Set(result.map(row => row.coname)));
  
      // Create a map of coname -> attainment for the results from the database
      const attainmentMap = {};
      result.forEach(row => {
        attainmentMap[row.coname] = row.attainment;
      });
  
      // Dynamically generate the response based on the CO names
      const response = uniqueConames.map(co => ({
        coname: co,
        attainment: attainmentMap[co] || null // Return null if attainment doesn't exist
      }));
  
      return res.status(200).json(response);
  
    } catch (err) {
      console.error("Error fetching COs data:", err.message);
      return res.status(500).json({ error: "Error fetching COs data" });
    }
  };

  export const Univ = async(req, res) => {
    const userCourseId = req.params.uid;
  
    // Check if the userCourseId parameter is provided
    if (!userCourseId) {
      return res.status(400).json({ error: "usercourse id is required" });
    }
  
    const sql = "SELECT * FROM semester_attainment WHERE usercourse_id = ? AND attainment IS NOT NULL";
  
    try {
      // Wrap the query in a promise for async/await usage
      const result = await new Promise((resolve, reject) => {
        db.query(sql, [userCourseId], (error, result) => {
          if (error) {
            console.error('Error executing the query:', error);
            reject(new Error('Internal server error'));
          } else {
            resolve(result);
          }
        });
      });
  
      // Extract distinct CO names that have data in attainment
      const uniqueConames = Array.from(new Set(result.map(row => row.coname)));
  
      // Create a map of coname -> attainment for the results from the database
      const attainmentMap = {};
      result.forEach(row => {
        attainmentMap[row.coname] = row.attainment;
      });
  
      // Dynamically generate the response based on the CO names
      const response = uniqueConames.map(co => ({
        coname: co,
        attainment: attainmentMap[co] || null // Return null if attainment doesn't exist
      }));
  
      return res.status(200).json(response);
  
    } catch (err) {
      console.error("Error fetching COs data:", err.message);
      return res.status(500).json({ error: "Error fetching COs data" });
    }
  };
  