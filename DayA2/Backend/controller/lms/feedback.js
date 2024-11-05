import expressAsyncHandler from "express-async-handler";
import { connection as db } from "../../config/dbConfig.js";

export const create_feedback = (req, res) => {
    const { formDataForStudentFeedback } = req.body;

    console.log('Received data:', formDataForStudentFeedback);

    // Validate input
    if (!formDataForStudentFeedback || typeof formDataForStudentFeedback !== 'object') {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Destructure the required fields from the incoming data
    const { userid, question_name, questions, created_at, deadline } = formDataForStudentFeedback;

    // Check if the required fields are present
    if (!userid || !question_name || !questions || !created_at || !deadline) {
        return res.status(400).json({ error: 'Missing required data fields' });
    }

    try {
        // Check if the userid already exists in the feedback table
        const checkQuery = 'SELECT * FROM feedback WHERE usercourse_id = ?';
        db.query(checkQuery, [userid], (error, results) => {
            if (error) {
                console.log('Error checking existing userid:', error);
                return res.status(500).json({ error: error.message });
            }

            if (results.length > 0) {
                // If the userid already exists, return an error
                return res.status(400).json({ error: 'User ID already exists' });
            } else {
                // Insert data into the feedback table
                const insertFeedbackQuery = 'INSERT INTO feedback (usercourse_id, feedback_name, noofques, created_at, deadline) VALUES (?, ?, ?, ?, ?)';
                db.query(insertFeedbackQuery, [userid, question_name, questions.length, created_at, deadline], (error, feedbackResult) => {
                    if (error) {
                        console.error('Error inserting feedback data:', error);
                        return res.status(500).json({ error: error.message });
                    }

                    const feedbackId = feedbackResult.insertId; // feedback_id from the feedback table

                    // Prepare question data for insertion
                    const questionValues = questions.map((question) => [question.questionName, feedbackId]);
                    const insertQuestionQuery = 'INSERT INTO question_feedback (question_name, questionno_id) VALUES ?';

                    db.query(insertQuestionQuery, [questionValues], (error, questionResult) => {
                        if (error) {
                            console.error('Error inserting question data:', error);
                            return res.status(500).json({ error: error.message });
                        }

                        const questionFeedbackIds = questionResult.insertId; // First qid from question_feedback table

                        // Prepare CO data for insertion
                        let coValues = [];
                        questions.forEach((question, questionIndex) => {
                            question.coNames.forEach((coname) => {
                                coValues.push([coname, questionFeedbackIds + questionIndex]);
                            });
                        });

                        const insertCoQuery = 'INSERT INTO co_feedback (coname, q_id) VALUES ?';

                        db.query(insertCoQuery, [coValues], (error, coResult) => {
                            if (error) {
                                console.error('Error inserting CO data:', error);
                                return res.status(500).json({ error: error.message });
                            }

                            res.status(201).json({ message: 'Data submitted successfully' });
                        });
                    });
                });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

export const show_feedback = (req, res) => {
    const { uid } = req.params;

    const query = `
        SELECT 
            f.feedback_id,
            f.usercourse_id,
            f.feedback_name,
            f.noofques,
            f.created_at,
            f.deadline,
            qf.qid,
            qf.question_name,
            cf.co_id,
            cf.coname,
            f.usercourse_id
        FROM 
            feedback f
        LEFT JOIN 
            question_feedback qf ON f.feedback_id = qf.questionno_id
        LEFT JOIN 
            co_feedback cf ON qf.qid = cf.q_id
        WHERE 
            usercourse_id = ?
        ORDER BY 
            f.feedback_id, qf.qid, cf.co_id;
    `;

    db.query(query, [uid], (error, results) => {
        if (error) {
            console.error("Error fetching feedback data:", error);
            return res.status(500).json({ error: error.message });
        }

        // Transform the data into a structured format
        const feedbackData = [];
        const feedbackMap = {};

        results.forEach((row) => {
            if (!feedbackMap[row.feedback_id]) {
                feedbackMap[row.feedback_id] = {
                    feedback_id: row.feedback_id,
                    usercourse_id: row.usercourse_id,
                    feedback_name: row.feedback_name,
                    noofques: row.noofques,
                    created_at: row.created_at,
                    deadline: row.deadline,
                    questions: [],
                };
                feedbackData.push(feedbackMap[row.feedback_id]);
            }

            const feedbackItem = feedbackMap[row.feedback_id];
            const questionIndex = feedbackItem.questions.findIndex(
                (q) => q.qid === row.qid
            );

            if (questionIndex === -1) {
                feedbackItem.questions.push({
                    qid: row.qid,
                    question_name: row.question_name,
                    coNames: row.co_id ? [{ co_id: row.co_id, coname: row.coname }] : [],
                });
            } else {
                if (row.co_id) {
                    feedbackItem.questions[questionIndex].coNames.push({
                        co_id: row.co_id,
                        coname: row.coname,
                    });
                }
            }
        });

        res.status(200).json({ feedbackData });
    });
};

export const student_submit_feedback = (req, res) => {
    const { formDataForStudentSubmit } = req.body;

    console.log('Received data:', formDataForStudentSubmit);

    // Validate input
    if (!formDataForStudentSubmit || typeof formDataForStudentSubmit !== 'object') {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Destructure required fields from incoming data
    const { userid, sid, questions, submitted_at } = formDataForStudentSubmit;

    // Check if required fields are present
    if (!userid || !sid || !questions || questions.length === 0) {
        return res.status(400).json({ error: 'Missing required data fields' });
    }

    // Set the submitted_at timestamp to the current date if not provided
    const submissionDate = submitted_at || new Date().toISOString().slice(0, 19).replace('T', ' ');

    // SQL query to check if the student exists with provided sid and usercourseid in `student_feedback`
    const checkSql = 'SELECT * FROM student_feedback WHERE sid = ? AND usercourseid = ?';
    db.query(checkSql, [sid, userid], (checkError, checkResults) => {
        if (checkError) {
            console.error("Error checking student existence:", checkError);
            return res.status(500).json({ error: checkError.message });
        }

        // If the student feedback records exist, update each question's feedback
        const updateSql = 'UPDATE student_feedback SET marks = ?, submitted_at = ? WHERE usercourseid = ? AND sid = ? AND qid = ?';

        // Update each question's data sequentially
        for (let i = 0; i < questions.length; i++) {
            const { qid, marks } = questions[i];

            db.query(updateSql, [marks, submissionDate, userid, sid, qid], (error, results) => {
                if (error) {
                    console.error("Error updating feedback data:", error);
                    return res.status(500).json({ error: error.message });
                }

                // If it’s the last question, send the response
                if (i === questions.length - 1) {
                    res.status(200).json({ message: 'Feedback updated successfully' });
                }
            });
        }
    });
};


export const show_student_side_feedback = (req, res) => {
    const { sid } = req.params;

    const query = `

    SELECT 
    f.feedback_id,
    f.feedback_name,
    f.noofques,
    qf.qid,
    qf.question_name,
    f.created_at AS question_created_at,
    f.deadline AS question_deadline,
    cf.co_id,
    cf.coname,
    sf.marks,
    sf.submitted_at,
    f.usercourse_id
FROM 
    student_feedback sf
JOIN 
    question_feedback qf ON sf.qid = qf.qid
JOIN 
    feedback f ON f.feedback_id = qf.questionno_id
LEFT JOIN 
    co_feedback cf ON cf.q_id = qf.qid
WHERE 
    sf.sid = ? 
    AND sf.submitted_at IS NULL;

    `;

    db.query(query, [sid], (error, results) => {
        if (error) {
            console.error("Error fetching feedback data:", error);
            return res.status(500).json({ error: error.message });
        }

        // Transform the data into a structured format
        const feedbackData = [];
        const feedbackMap = {};

        results.forEach((row) => {
            if (!feedbackMap[row.feedback_id]) {
                feedbackMap[row.feedback_id] = {
                    feedback_id: row.feedback_id,
                    usercourse_id: row.usercourse_id,
                    feedback_name: row.feedback_name,
                    noofques: row.noofques,
                    created_at: row.created_at,
                    deadline: row.deadline,
                    questions: [],
                };
                feedbackData.push(feedbackMap[row.feedback_id]);
            }

            const feedbackItem = feedbackMap[row.feedback_id];
            const questionIndex = feedbackItem.questions.findIndex(
                (q) => q.qid === row.qid
            );

            if (questionIndex === -1) {
                feedbackItem.questions.push({
                    qid: row.qid,
                    question_name: row.question_name,
                    coNames: row.co_id ? [{ co_id: row.co_id, coname: row.coname }] : [],
                });
            } else {
                if (row.co_id) {
                    feedbackItem.questions[questionIndex].coNames.push({
                        co_id: row.co_id,
                        coname: row.coname,
                    });
                }
            }
        });

        res.status(200).json({ feedbackData });
    });
};



export const getStudentFeedbackDetails = async (req, res) => {
    const { usercourseid } = req.params;

    if (!usercourseid) {
        return res.status(400).json({ error: "User Course ID is required" });
    }

    try {
        const query = `
            SELECT 
                f.feedback_id,
                f.feedback_name,
                sf.sid,
                sf.qid,
                GROUP_CONCAT(cf.coname ORDER BY cf.coname SEPARATOR ', ') AS conames,
                sf.marks,
                sf.submitted_at
            FROM 
                student_feedback sf
            JOIN 
                question_feedback qf ON sf.qid = qf.qid
            JOIN 
                feedback f ON f.feedback_id = qf.questionno_id
            LEFT JOIN 
                co_feedback cf ON cf.q_id = qf.qid
            WHERE 
                sf.usercourseid = ?
            GROUP BY 
                sf.sid, sf.qid, f.feedback_id, f.feedback_name, sf.marks, sf.submitted_at
            ORDER BY 
                sf.sid, sf.qid;
        `;

        const [results] = await db.promise().query(query, [usercourseid]);

        if (results.length === 0) {
            return res.status(404).json({ message: "No feedback records found for the specified user course ID" });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching feedback details:", error);
        res.status(500).json({ error: "An error occurred while retrieving feedback details" });
    }
};


export const updateFeedbackAttainment = expressAsyncHandler(async (req, res) => {
    const { usercourseid, coAttainmentData } = req.body;

    if (!usercourseid || !coAttainmentData || coAttainmentData.length === 0) {
        return res.status(400).json({ error: "Invalid data provided." });
    }

    try {
        const checkQuery = `
            SELECT idfeedback_attainment FROM feedback_attainment 
            WHERE coname = ? AND usercourseid = ?
        `;
        
        const insertQuery = `
            INSERT INTO feedback_attainment (coname, coaverage, attainment, usercourseid) 
            VALUES (?, ?, ?, ?)
        `;

        const updateQuery = `
            UPDATE feedback_attainment 
            SET coaverage = ?, attainment = ? 
            WHERE coname = ? AND usercourseid = ?
        `;

        // Loop through the coAttainmentData array
        for (const entry of coAttainmentData) {
            const { coName, coAverage, categorization } = entry;

            // Check if record exists
            const [existingRecords] = await db.promise().query(checkQuery, [coName, usercourseid]);

            if (existingRecords.length > 0) {
                // Update if record exists
                await db.promise().query(updateQuery, [coAverage, categorization, coName, usercourseid]);
            } else {
                // Insert new record if not found
                await db.promise().query(insertQuery, [coName, coAverage, categorization, usercourseid]);
            }
        }

        res.status(201).json({ message: "Attainment data updated successfully." });
    } catch (error) {
        console.error("Error updating feedback attainment:", error);
        res.status(500).json({ error: "Failed to update attainment data." });
    }
});
