import { connection as db } from "../config/dbConfig.js";

export const upload_Ia = async (req, res) => {
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
  