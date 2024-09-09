import { connection as db } from "../config/dbConfig.js";


// Fetch termwork data (twbody) from the database
export const fetchTermworkLabels = (req, res) => {
    const userCourseId = req.params.userCourseId;
  
    // Query to get all termwork labels from termworkbase
    const getAllLabelsQuery = "SELECT twid, twbody FROM termworkbase";
    
    // Query to get the selected twid for the given userCourseId from termwork_table
    const getSelectedTwidQuery = "SELECT tw_id FROM termwork_table WHERE usercourseid = ?";
  
    // Execute both queries using Promises
    db.query(getAllLabelsQuery, (error, allLabelsResults) => {
      if (error) {
        return res.status(500).json({ message: "Error fetching termwork data", error });
      }
  
      // Get the selected twid if exists in the termwork_table
      db.query(getSelectedTwidQuery, [userCourseId], (error, selectedTwidResults) => {
        if (error) {
          return res.status(500).json({ message: "Error fetching selected termwork", error });
        }
  
        const selectedTwid = selectedTwidResults.length > 0 ? selectedTwidResults[0].tw_id : null;
  
        // Return both the termwork labels and the selected twid (if any)
        res.status(200).json({ labels: allLabelsResults, selectedTwid });
      });
    });
  };
  

  export const submitTermworkId = (req, res) => {
    const { userCourseId, tw_id } = req.body;
  
    // Check if the userCourseId already exists in the termwork_table
    const checkSql = "SELECT * FROM termwork_table WHERE usercourseid = ?";
    db.query(checkSql, [userCourseId], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Database error", error });
      }
  
      if (results.length > 0) {
        // If it exists, update the tw_id
        const updateSql = "UPDATE termwork_table SET tw_id = ? WHERE usercourseid = ?";
        db.query(updateSql, [tw_id, userCourseId], (updateError) => {
          if (updateError) {
            return res.status(500).json({ message: "Failed to update termwork", error: updateError });
          }
          return res.status(200).json({ updated: true, message: "Termwork updated successfully!" });
        });
      } else {
        // If it doesn't exist, insert a new record
        const insertSql = "INSERT INTO termwork_table (tw_id, usercourseid) VALUES (?, ?)";
        db.query(insertSql, [tw_id, userCourseId], (insertError) => {
          if (insertError) {
            return res.status(500).json({ message: "Failed to insert termwork", error: insertError });
          }
          return res.status(200).json({ success: true, message: "Termwork saved successfully!" });
        });
      }
    });
  };



  export const getTermworkData = (req, res) => {
    const { usercourseid } = req.params;
     console.log(usercourseid)
    // Check if there's a TW ID in the termwork_table for the given usercourse_id
    const sqlTermwork = 'SELECT tw_id FROM termwork_table WHERE usercourseid = ?';
    db.query(sqlTermwork, [usercourseid], (error, termworkResult) => {
      if (error) {
        console.error('Error fetching termwork ID:', error);
        return res.status(500).json({ error: "Internal server error" });
      }
  
      // If no TW ID exists, return an error
      console.log(termworkResult)
      if (!termworkResult.length || !termworkResult[0].tw_id) {
        return res.status(400).json({ error: "Term work not selected" });
      }
  
      const twid = termworkResult[0].tw_id;
      console.log(twid)
      // Fetch the corresponding data from termworkbase_table using the twid
      const sqlTermworkBase = 'SELECT * FROM termworkbase WHERE twid = ?';
      db.query(sqlTermworkBase, twid, (error, termworkBaseResult) => {
        if (error) {
          console.error('Error fetching termwork base data:', error);
          return res.status(500).json({ error: "Internal server error" });
        }
  
        if (!termworkBaseResult.length) {
          return res.status(404).json({ error: "No termwork data found for the given TW ID" });
        }
     console.log(termworkBaseResult)
        // Send the termwo rk base data to the frontend
        res.status(200).json(termworkBaseResult);
      });
    });
  };
  

  