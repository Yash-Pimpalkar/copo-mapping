CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStudentMarksByCourseID_IA2`(IN userCourseID INT)
BEGIN
    DECLARE colNames TEXT;

    -- Generate the list of qname columns for ia2
    SELECT GROUP_CONCAT(DISTINCT CONCAT(
        'MAX(CASE WHEN ti2.qname = ''', qname, ''' THEN ui2.marks END) AS ', qname, ''
    )) INTO colNames
    FROM table_ia2 ti2
    JOIN user_course uc ON ti2.usercourseid = uc.usercourse_id
    WHERE uc.usercourse_id = userCourseID;

    -- Check if colNames is NULL or empty
    IF colNames IS NULL OR colNames = '' THEN
        -- If there are no qname columns, return an empty result set
        SELECT 'No data available for the given course ID' AS message;
    ELSE
        -- Construct the final query for ia2
        SET @sqlQuery = CONCAT(
            'SELECT ',
            'csd.sid, csd.student_name, csd.stud_clg_id, ',
            colNames,
            ' FROM upload_ia2 ui2 ',
            'JOIN table_ia2 ti2 ON ui2.qid = ti2.idtable_ia2 ',
            'JOIN user_course uc ON ti2.usercourseid = uc.usercourse_id ',
            'JOIN copo_students_details csd ON ui2.sid = csd.sid ',
            'WHERE uc.usercourse_id = ', userCourseID,
            ' GROUP BY csd.sid, csd.student_name, csd.stud_clg_id;'
        );

        -- Prepare and execute the dynamic query
        PREPARE stmt FROM @sqlQuery;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END