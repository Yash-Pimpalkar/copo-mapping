CREATE DEFINER=`root`@`localhost` TRIGGER `after_activity_insert` AFTER INSERT ON `lmsactivities` FOR EACH ROW BEGIN
    -- Insert a submission record for each student in the specified class
    INSERT INTO submissions (classroom_id, assignment_id, student_id, submitted_at, is_late, marks, message_to_teacher)
    SELECT 
        NEW.classroom_id,        -- Classroom ID from the new activity
        NEW.assignment_id,       -- Assignment ID from the new activity
        cst.sid,                 -- Student ID from the class_student_table
        NULL,                    -- Submitted at (initially NULL as students haven't submitted yet)
        0,                       -- is_late (initially set to 0, assuming not late as they haven't submitted)
        NULL,                    -- Marks (initially NULL, to be updated after submission)
        NULL                     -- Message to teacher (initially NULL)
    FROM 
        class_student_table cst
    WHERE 
        cst.class_id = NEW.classroom_id; -- Match the classroom ID
END