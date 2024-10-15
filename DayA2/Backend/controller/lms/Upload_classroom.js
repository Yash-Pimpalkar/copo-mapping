import { connection as db } from "../../config/dbConfig.js";

export const upload_classroom = (req, res) => {
    const { formDataForCohortClassroom } = req.body;

    console.log('Received data:', formDataForCohortClassroom);

    // Validate input
    if (!formDataForCohortClassroom || typeof formDataForCohortClassroom !== 'object') {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Check if the required fields are present in the incoming data
    const { room_name, branch, semester, userid, created_at } = formDataForCohortClassroom;

    if (!room_name || !branch || !semester || !userid || !created_at) {
        return res.status(400).json({ error: 'Missing required data fields' });
    }

    try {
        // Check if the userid already exists in the database
        const checkQuery = 'SELECT * FROM classroom WHERE room_name = ?';
        db.query(checkQuery, [room_name], (error, results) => {
            if (error) {
                console.log('Error checking existing userid:', error);
                return res.status(500).json({ error: error.message });
            }

            if (results.length > 0) {
                // If the userid already exists, return an error
                return res.status(400).json({ error: 'User ID already exists' });
            } else {
                // Prepare the SQL query and values for insertion
                const insertQuery = 'INSERT INTO classroom (room_name, branch, semester, userid, created_at) VALUES ?;';
                const values = [[room_name, branch, semester, userid, created_at]];
                console.log("values:", values);

                // Perform the data insertion
                db.query(insertQuery, [values], (error, result) => {
                    if (error) {
                        console.error('Error inserting data:', error);
                        return res.status(500).json({ error: error.message });
                    }

                    res.status(201).json({ message: 'Data submitted successfully' });
                });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

export const show_classroom = (req, res) => {
    const { uid } = req.params;
    const sql = 'SELECT * FROM classroom WHERE userid = ?;';

    db.query(sql, [uid], (error, rows) => {
        if (error) {
            console.error('Error fetching classroom:', error);
            return res.status(500).json({ error: 'Failed to fetch classroom' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Classroom not found' });
        }
        res.status(200).json(rows);
    });
}

export const delete_classroom = (req, res) => {
    const { id } = req.params;

    console.log(id);

    // Validate input
    if (!id) {
        return res.status(400).json({ error: 'Missing userid' });
    }

    try {
        // Check if the userid exists in the database
        const checkQuery = 'SELECT * FROM classroom WHERE classroom_id = ?';
        db.query(checkQuery, [id], (error, results) => {
            if (error) {
                console.log('Error checking existing userid:', error);
                return res.status(500).json({ error: error.message });
            }

            if (results.length === 0) {
                // If the userid does not exist, return an error
                return res.status(404).json({ error: 'User ID not found' });
            } else {
                // Prepare the SQL query for deletion
                const deleteQuery = 'DELETE FROM classroom WHERE classroom_id = ?';

                // Perform the data deletion
                db.query(deleteQuery, [id], (error, result) => {
                    if (error) {
                        console.error('Error deleting data:', error);
                        return res.status(500).json({ error: error.message });
                    }

                    res.status(200).json({ message: 'Classroom deleted successfully' });
                });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

