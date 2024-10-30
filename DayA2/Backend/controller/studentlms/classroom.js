import { connection as db } from "../../config/dbConfig.js";
import path from "path";
import multer from "multer";

export const get_all_classroom_by_sid = async (req, res) => {
    const { sid } = req.params; // Destructure sid from req.params
  
    const sql = `
      SELECT 
        classroom.classroom_id,
        classroom.room_name,
        classroom.branch,
        classroom.semester,
        classroom.userid,
        classroom.academic_year,
        classroom.created_at,
        users.teacher_name
      FROM 
        class_student_table
      JOIN 
        classroom ON class_student_table.class_id = classroom.classroom_id
      JOIN 
        users ON classroom.userid = users.userid
      WHERE 
        class_student_table.sid = ?;
    `;
  
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(sql, [sid], (error, results) => {
          if (error) {
            return reject(error); // Reject the promise if there's an error
          }
          resolve(results); // Resolve with results if successful
        });
      });
  
      res.status(200).json(results);
    } catch (error) {
      console.error('SQL Error:', error.message);
      res.status(500).json({ error: 'Failed to retrieve classrooms' });
    }
  };


// Ensure db connection is set up in config/db.js or adjust the path accordingly

// Controller function to get classroom activities
export const getClassroomActivities = (req, res) => {
  const { cid } = req.params; // classroom_id from route parameters
  const { student_id } = req.body;

  const classroomId = cid;
  console.log(student_id, cid);

  if (!student_id) {
    return res.status(400).json({ error: 'Student ID is required' });
  }

  const query = `
    SELECT 
      la.assignment_id,
      la.classroom_id,
      la.teacher_id,
      la.title,
      la.description,
      la.file_type_allowed,
      la.max_file_size,
      la.created_at,
      la.deadline,
      CASE WHEN s.submitted_at IS NOT NULL THEN TRUE ELSE FALSE END AS isSubmitted,
      laf.file_id,
      laf.file_name,
      laf.file_type,
      laf.file_size,
      laf.uploaded_date,
      laf.file_path
    FROM lmsactivities la
    LEFT JOIN submissions s 
      ON la.assignment_id = s.assignment_id 
      AND s.student_id = ?
    LEFT JOIN lms_activities_file laf 
      ON la.assignment_id = laf.assignment_id
    WHERE la.classroom_id = ?
    ORDER BY la.created_at DESC
  `;

  db.query(query, [student_id, classroomId], (error, results) => {
    if (error) {
      console.error('Error fetching activities:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    // Organize the results to prevent duplicate files
    const activities = results.reduce((acc, row) => {
      // Find the existing activity by assignment_id
      let activity = acc.find(a => a.assignment_id === row.assignment_id);

      if (!activity) {
        // If the activity does not exist, create a new one
        activity = {
          assignment_id: row.assignment_id,
          classroom_id: row.classroom_id,
          teacher_id: row.teacher_id,
          title: row.title,
          description: row.description,
          file_type_allowed: row.file_type_allowed,
          max_file_size: row.max_file_size,
          created_at: row.created_at,
          deadline: row.deadline,
          isSubmitted: row.isSubmitted,
          files: []
        };
        acc.push(activity);
      }

      // Check if the file_id is already in the files array for this activity
      const fileExists = activity.files.some(file => file.file_id === row.file_id);
      
      // Only add the file if it does not already exist in the files array
      if (row.file_id && !fileExists) {
        activity.files.push({
          file_id: row.file_id,
          file_name: row.file_name,
          file_type: row.file_type,
          file_size: row.file_size,
          uploaded_date: row.uploaded_date,
          file_path: row.file_path
        });
      }

      return acc;
    }, []);
    
    console.log(activities);
    res.status(200).json({ activities });
  });
};





// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.resolve(), 'uploads/submissions')); // Save files in uploads/submissions folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  }
});

// Multer middleware for handling multiple files
const upload = multer({ storage }).array('files', 10); // Allow up to 10 files


// Controller to handle submission creation
export const createSubmission = (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Multer error while uploading files', error: err });
    } else if (err) {
      return res.status(500).json({ message: 'Server error while uploading files', error: err });
    }

    // Extract form data from the request
    const { student_id, classroom_id, assignment_id} = req.body;

    if (!student_id || !classroom_id || !assignment_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Insert submission metadata into the submissions table
    const insertSubmissionQuery = `
    INSERT INTO submissions (classroom_id, assignment_id, student_id, submitted_at)
    VALUES (?, ?, ?, NOW())
  `;

    db.query(insertSubmissionQuery, [classroom_id, assignment_id, student_id], (err, result) => {
      if (err) {
        console.error('Error inserting submission:', err);
        return res.status(500).json({ message: 'Failed to create submission' });
      }

      const submissionId = result.insertId; // Get the newly created submission's ID

      // Check if files were uploaded
      if (req.files && req.files.length > 0) {
        const files = req.files.map((file) => [
          submissionId,                    // submission_id (foreign key)
          file.originalname,               // file_name
          file.mimetype,                   // file_type
          file.size,                       // file_size
          new Date(),                      // uploaded_date (current timestamp)
          `/uploads/submissions/${file.filename}` // file_path
        ]);

        // Insert file data into the submissions_file table
        const insertFileQuery = `
          INSERT INTO submissions_file (submission_id, file_name, file_type, file_size, uploaded_date, file_path)
          VALUES ?
        `;

        db.query(insertFileQuery, [files], (err, fileResult) => {
          if (err) {
            console.error('Error inserting file details:', err);
            return res.status(500).json({ message: 'Failed to save file details' });
          }

          return res.status(201).json({
            message: 'Submission and files created successfully',
            submissionId
          });
        });
      } else {
        // No files uploaded, return success
        return res.status(201).json({
          message: 'Submission created successfully',
          submissionId
        });
      }
    });
  });
};


// Controller to retrieve submissions based on assignment_id and student_id passed in FormData
export const getSubmissionsByAssignmentAndStudent = (req, res) => {
  const { assignment_id, student_id } = req.body;
  console.log(req.body)

  // Validate inputs
  if (!assignment_id || !student_id) {
    return res.status(400).json({ message: 'Assignment ID and Student ID are required' });
  }

  // Query to retrieve submissions and associated files
  const query = `
    SELECT  sf.file_id, sf.file_name, sf.file_type, sf.file_size, sf.uploaded_date, sf.file_path
    FROM submissions s
    inner join submissions_file sf ON s.submission_id = sf.submission_id
    WHERE s.assignment_id = ? AND s.student_id = ?
  `;

  db.query(query, [assignment_id, student_id], (err, results) => {
    if (err) {
      console.error('Error retrieving submissions:', err);
      return res.status(500).json({ message: 'Failed to retrieve submissions' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No submissions found for the given assignment and student' });
    }

    res.status(200).json({ submissions: results });
  });
};

