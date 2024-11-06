CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStudentOralPceMarksByCourseID_OralPCE`(IN userCourseID INT)
BEGIN
    DECLARE colOralNames TEXT;

    -- Generate the list of colnames columns
    SELECT GROUP_CONCAT(DISTINCT CONCAT(
        'MAX(CASE WHEN co.colnames = ''', colnames, ''' THEN mo.marks END) AS `', colnames, '`'
    )) INTO colOralNames
    FROM col_oralpce co
    JOIN user_course uc ON co.usercourseid = uc.usercourse_id
    WHERE uc.usercourse_id = userCourseID;

    -- Check if colNames is NULL or empty
    IF colOralNames IS NULL OR colOralNames = '' THEN
        -- If there are no colnames columns, return an empty result set
        SELECT 'No data available for the given course ID' AS message;
    ELSE
        -- Construct the final query
        SET @sqlQuery = CONCAT(
            'SELECT ',
            'csd.sid, csd.student_name, csd.stud_clg_id, ',
            colOralNames,
            ' FROM main_oralpce mo ',
            'JOIN col_oralpce co ON mo.qid = co.idcol_oralpce ',
            'JOIN user_course uc ON co.usercourseid = uc.usercourse_id ',
            'JOIN lms_students csd ON mo.sid = csd.sid ',
            'WHERE uc.usercourse_id = ', userCourseID,
            ' GROUP BY csd.sid, csd.student_name, csd.stud_clg_id;'
        );

        -- Prepare and execute the dynamic query
        PREPARE stmt FROM @sqlQuery;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END