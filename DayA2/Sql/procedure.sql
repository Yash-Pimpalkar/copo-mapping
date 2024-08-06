DELIMITER //

CREATE PROCEDURE GetStudentMarksByCourseID(IN userCourseID INT)
BEGIN
    DECLARE colNames TEXT;
    
    -- Generate the list of qname columns
    SELECT GROUP_CONCAT(DISTINCT CONCAT(
        'MAX(CASE WHEN ti.qname = ''', qname, ''' THEN ui.marks END) AS `', qname, '`'
    )) INTO colNames
    FROM table_ia ti
    JOIN user_course uc ON ti.usercourseid = uc.usercourse_id
    WHERE uc.usercourse_id = userCourseID;

    -- Construct the final query
    SET @sqlQuery = CONCAT(
        'SELECT ',
        'csd.sid, csd.student_name, csd.stud_clg_id, ',
        colNames,
        ' FROM upload_ia ui ',
        'JOIN table_ia ti ON ui.qid = ti.idtable_ia ',
        'JOIN user_course uc ON ti.usercourseid = uc.usercourse_id ',
        'JOIN copo_students_details csd ON ui.sid = csd.sid ',
        'WHERE uc.usercourse_id = ', userCourseID,
        ' GROUP BY csd.sid, csd.student_name, csd.stud_clg_id;'
    );

    -- Prepare and execute the dynamic query
    PREPARE stmt FROM @sqlQuery;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END //

DELIMITER ;

CALL GetStudentMarksByCourseID(3)