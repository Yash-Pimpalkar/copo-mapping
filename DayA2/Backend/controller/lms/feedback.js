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
            cf.coname
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
    if (!userid || !sid || !questions || questions.length === 0 || !submitted_at) {
        return res.status(400).json({ error: 'Missing required data fields' });
    }

    // SQL query to check if the student exists with provided sid
    const checkSql = 'SELECT * FROM student_feedback WHERE sid = ? AND usercourseid = ?';
    db.query(checkSql, [sid, userid], (checkError, checkResults) => {
        if (checkError) {
            console.error("Error checking student existence:", checkError);
            return res.status(500).json({ error: checkError.message });
        }

        // Proceed if student exists or add logic for a condition check if needed
        const insertSql = 'INSERT INTO student_feedback (usercourseid, sid, qid, marks, submitted_at) VALUES (?, ?, ?, ?, ?)';

        // Insert each question’s data sequentially without using Promises
        for (let i = 0; i < questions.length; i++) {
            const { qid, marks } = questions[i];

            db.query(insertSql, [userid, sid, qid, marks, submitted_at], (error, results) => {
                if (error) {
                    console.error("Error inserting feedback data:", error);
                    return res.status(500).json({ error: error.message });
                }

                // If it’s the last question, send the response
                if (i === questions.length - 1) {
                    res.status(201).json({ message: 'Data submitted successfully' });
                }
            });
        }
    });
};

