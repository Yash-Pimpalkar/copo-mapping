import { connection as db } from "../config/dbConfig.js";

export const user_course_registration = (req, res) => {
  const courses = req.body.formData; // Access the array of course objects
  console.log("Received courses:", courses);

  if (!Array.isArray(courses) || courses.length === 0) {
    return res.status(400).json({ error: 'No courses provided' });
  }

  // Validate each course object in the array
  for (const course of courses) {
    const { user_id, course_code, sem, academic_year, branch, co_count } = course;
    if (!user_id || !course_code || !sem || !academic_year || !branch || !co_count) {
      return res.status(400).json({ error: 'All fields are required for each course' });
    }
  }

  // Simulate saving to a database (this is just an example, replace with actual DB logic)
  const saveCourse = (course, callback) => {
    const { user_id, course_code, sem, academic_year, branch, co_count } = course;

    const q = `SELECT courseid FROM course WHERE coursecode = ?`;
    db.query(q, course_code, (err, result) => {
      if (err) {
        console.error('Error querying the database:', err);
        return callback(err);
      }

      const courseid = result[0]?.courseid;

      if (!courseid) {
        return callback(new Error('Course ID not found for the given course code'));
      }

      const values = [user_id, courseid, sem, academic_year, branch, co_count];
      // console.log(values); // Log the values

      const query = `
        INSERT INTO user_course (user_id, course_id, semester, academic_year, branch, co_count)
        VALUES (?,?,?,?,?,?)`;

      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error saving to database:', err);
          return callback(err);
        }
        // console.log('New registration:', result);
        callback(null, result);
      });
    });
  };

  // Process all courses
  let errorOccurred = false;
  const results = [];

  const processCourse = (index) => {
    if (index >= courses.length) {
      if (errorOccurred) {
        return res.status(500).json({ error: 'Database error occurred while processing courses' });
      }
      return res.status(201).json({ message: 'All registrations successful', results });
    }

    saveCourse(courses[index], (err, result) => {
      if (err) {
        errorOccurred = true;
        return processCourse(index + 1);
      }
      results.push(result);
      processCourse(index + 1);
    });
  };

  processCourse(0);
};

export const show_user_course = (req, res) => {
  const id = req.params.uid;
  const sql = `select u.usercourse_id,u.user_id,c.coursecode,c.course_name,u.semester,u.academic_year,u.branch,u.co_count from user_course as u inner join course as c on u.course_id = c.courseid where user_id=? `;
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error saving to database:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json(result);
  })
}

export const show_specific_user_course = (req, res) => {
  const id = req.params.uid;
  const sql = `select u.usercourse_id,u.user_id,c.coursecode,c.course_name,u.semester,u.academic_year,u.branch,u.co_count from user_course as u inner join course as c on u.course_id = c.courseid where u.usercourse_id=? `;
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error saving to database:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json(result);
  })
};

export const edit_specific_course = () => {
  const { usercourse_id } = req.params;
  const { course_name, branch, semester, cocount, academic_year } = req.body;

  // SQL query to update the course based on usercourse_id
  const query = `
    UPDATE user_course 
    SET 
      branch = ?, 
      semester = ?, 
      co_count = ?, 
      academic_year = ? 
    WHERE 
      usercourse_id = ?`;

  // Execute the query with the values from the request body
  db.query(query, [branch, semester, cocount, academic_year], (err, result) => {
    if (err) {
      console.error('Error updating the course:', err);
      res.status(500).json({ error: 'An error occurred while updating the course.' });
    } else {
      res.status(200).json({ message: 'Course updated successfully!' });
    }
    res.status(201).json(result);
  });
}

export const show_CoCount = (req, res) => {
  const id = req.params.uid;
  // console.log(id)
  const sql = `select * from user_course where usercourse_id=? `;
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error saving to database:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json(result);
  })
}


export const coname = (req, res) => {
  const userCourseId = req.params.uid;
  console.log(userCourseId)
  const sql = 'select * from cos where usercourse_id = ?'
  db.query(sql, userCourseId, (Err, result) => {
    if (Err) {
      console.log(Err)
    }
    res.status(200).json(result)
  })
}










