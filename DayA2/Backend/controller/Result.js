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

    const sql2 = "SELECT * FROM ia2_attainment WHERE usercourse_id = ?";
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

  export const Tw = async(req, res) => {
    const userCourseId = req.params.uid;
  
    // Check if the userCourseId parameter is provided
    if (!userCourseId) {
      return res.status(400).json({ error: "usercourse id is required" });
    }
  
    const sql = "SELECT * FROM termwork_attainment_table WHERE usercourseid = ? AND attainment IS NOT NULL";
  
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

  export const Oral = async(req, res) => {
    const userCourseId = req.params.uid;
  
    // Check if the userCourseId parameter is provided
    if (!userCourseId) {
      return res.status(400).json({ error: "usercourse id is required" });
    }
  
    const sql = "SELECT * FROM oral_attainment WHERE usercourse_id = ? AND attainment IS NOT NULL";
  
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

  export const indirect  = async (req, res) => {
    const userCourseId = req.params.uid;

    // Check if the userCourseId parameter is provided
    if (!userCourseId) {
        return res.status(400).json({ error: "usercourse id is required" });
    }

    // SQL query to join student_feedback and co_feedback based on usercourseid
    const sql = `
        SELECT attainment, coname
        FROM feedback_attainment
        WHERE usercourseid = ?
    `;

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

        // Extract unique CO names and their corresponding marks from the result
        const uniqueFeedback = result.map(row => ({
            coname: row.coname,
            marks: row.attainment
        }));

        return res.status(200).json(uniqueFeedback);

    } catch (err) {
        console.error("Error fetching feedback data:", err.message);
        return res.status(500).json({ error: "Error fetching feedback data" });
    }
};



  export const Majorpro = async(req, res) => {
    const userCourseId = req.params.uid;
  
    // Check if the userCourseId parameter is provided
    if (!userCourseId) {
      return res.status(400).json({ error: "usercourse id is required" });
    }
  
    const sql = "SELECT * FROM majorpro_attainment WHERE usercourse_id = ? AND attainment IS NOT NULL";
  
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

  export const Minipro = async(req, res) => {
    const userCourseId = req.params.uid;
  
    // Check if the userCourseId parameter is provided
    if (!userCourseId) {
      return res.status(400).json({ error: "usercourse id is required" });
    }
  
    const sql = "SELECT * FROM minipro_attainment WHERE usercourse_id = ? AND attainment IS NOT NULL";
  
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

  export const Popso = async (req, res) => {
    const userCourseId = req.params.uid;

    // Check if the coId parameter is provided
    if (!userCourseId) {
        return res.status(400).json({ error: "Usercourse ID is required" });
    }

    const sql = `
      SELECT co_po.*, cos.usercourse_id 
      FROM co_po 
      JOIN cos ON co_po.co_id = cos.idcos
      WHERE cos.usercourse_id = ? AND 
      (po_1 IS NOT NULL OR po_2 IS NOT NULL OR po_3 IS NOT NULL OR 
       po_4 IS NOT NULL OR po_5 IS NOT NULL OR po_6 IS NOT NULL OR 
       po_7 IS NOT NULL OR po_8 IS NOT NULL OR po_9 IS NOT NULL OR 
       po_10 IS NOT NULL OR po_11 IS NOT NULL OR po_12 IS NOT NULL OR 
       pso_1 IS NOT NULL OR pso_2 IS NOT NULL OR pso_3 IS NOT NULL OR 
       pso_4 IS NOT NULL)
    `;

    try {
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

        // Create the response based on the result from the database
        const response = result.map(row => ({
            co_id: row.co_id, // Return the CO ID directly
            po: [
                row.po_1, row.po_2, row.po_3, row.po_4, row.po_5,
                row.po_6, row.po_7, row.po_8, row.po_9, row.po_10,
                row.po_11, row.po_12
            ],
            pso: [
                row.pso_1, row.pso_2
            ],
            avg: row.avg
        }));

        return res.status(200).json(response);

    } catch (err) {
        console.error("Error fetching COs data:", err.message);
        return res.status(500).json({ error: "Error fetching COs data" });
    }
};

  
  