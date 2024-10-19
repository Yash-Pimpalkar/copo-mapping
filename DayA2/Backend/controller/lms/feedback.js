import { connection as db } from "../../config/dbConfig.js";

export const create_feedback = (req, res) => {
    const { formDataForCohortClassroom } = req.body;

    console.log('Received data:', formDataForCohortClassroom);

    console.log("Sucessfully submitted data");

    // Validate input
    if (!formDataForCohortClassroom || typeof formDataForCohortClassroom !== 'object') {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Check if the required fields are present in the incoming data
    const { question_name, conames, questions, userid, created_at, noofcos, deadline } = formDataForCohortClassroom;

    if (!question_name || !conames || !questions || !userid || !created_at || !noofcos || !deadline) {
        return res.status(400).json({ error: 'Missing required data fields' });
    }

    // try {
    //     // Check if the userid already exists in the database
    //     const checkQuery = 'SELECT * FROM feedback WHERE usercourse_id = ?';
    //     db.query(checkQuery, [usercourseId], (error, results) => {
    //         if (error) {
    //             console.log('Error checking existing userid:', error);
    //             return res.status(500).json({ error: error.message });
    //         }

    //         if (results.length > 0) {
    //             // If the userid already exists, return an error
    //             return res.status(400).json({ error: 'User ID already exists' });
    //         } else {
    //             // Prepare the SQL query and values for insertion
    //             const insertQuery = 'INSERT INTO feedback (room_name, branch, semester, userid, created_at) VALUES ?;';
    //             const values = [[room_name, branch, semester, userid, created_at]];
    //             console.log("values:", values);

    //             // Perform the data insertion
    //             db.query(insertQuery, [values], (error, result) => {
    //                 if (error) {
    //                     console.error('Error inserting data:', error);
    //                     return res.status(500).json({ error: error.message });
    //                 }

    //                 res.status(201).json({ message: 'Data submitted successfully' });
    //             });
    //         }
    //     });
    // } catch (error) {
    //     console.error('Unexpected error:', error);
    //     return res.status(500).json({ error: 'An unexpected error occurred' });
    // }
}