CREATE DEFINER=`root`@`localhost` TRIGGER `after_lms_attendance_insert` AFTER INSERT ON `lms_attendance` FOR EACH ROW BEGIN
    -- Insert all students of the given class into lms_attendance_students
    INSERT INTO lms_attendance_students (sid, lms_attendance_id)
    SELECT cs.sid, NEW.attendance_id  -- Assuming 0 as default status
    FROM class_student_table cs
    WHERE cs.class_id = NEW.class_id;
END