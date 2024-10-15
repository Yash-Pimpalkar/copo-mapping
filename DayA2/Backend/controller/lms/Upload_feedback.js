import { connection as db } from "../../config/dbConfig";

export const upload_feedback_questions = () => {
    const { formDataForStudentFeedback } = req.body;

    console.log('Received data:', formDataForStudentFeedback);

    // Validate input
    if (!formDataForStudentFeedback || typeof formDataForStudentFeedback !== 'object') {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Extract data and ensure it's in array format
    const dataArray = Object.values(formDataForStudentFeedback);

    console.log(dataArray.length)
    // Check if dataArray is empty
    if (dataArray.length == 0) {
        return res.status(400).json({ error: 'No data to insert' });
    }

    // Extract usercourseid from the first entry (assuming all entries have the same usercourseid)
    const { userid } = dataArray[0];
    //   console.log(usercourseid)

    try {
        // Check if usercourseid already exists
        const checkQuery = 'SELECT * FROM feedback WHERE userid = ?';
        db.query(checkQuery, [userid], (error, results) => {
            if (error) {
                console.log('Error checking existing usercourseid:', error);
                return res.status(500).json({ error: error.message });
            }

            if (results.length > 0) {
                // If usercourseid already exists, return an error
                return res.status(400).json({ error: 'UserCourse ID already exists' });
            } else {
                // Prepare the SQL query and values for batch insertion
                const insertQuery = 'INSERT INTO feedback (room_name, branch, semester, userid, class_student_id, created_at) VALUES ?';
                const values = dataArray.map(({ classroomName, selectedDepartment, selectedSemester, userid, marks, created_at }) => [classroomName, selectedDepartment, selectedSemester, userid, marks, created_at]);

                // Perform the batch insert
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
}

export const getCourseCount = (req, res) => {
    const { uid } = req.params;

    const sql = 'SELECT co_count FROM user_course WHERE usercourseid=?';

    db.query(sql, [uid], (error, rows) => {
        if (error) {
            console.error('Error fetching cohort:', error);
            return res.status(500).json({ error: 'Failed to fetch cohort' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Cohort not found' });
        }
        res.status(200).json(rows[0]);
    });
}