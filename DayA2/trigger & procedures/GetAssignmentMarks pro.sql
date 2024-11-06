CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAssignmentMarks`(IN p_usercourseid INT)
BEGIN
    DECLARE sql_query LONGTEXT;
    DECLARE final_query LONGTEXT;
    DECLARE result_count INT DEFAULT 0;

    -- Build the dynamic SQL with assignment_name instead of assignid
    SET sql_query = NULL;

    -- Check if the tables and required columns exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'upload_assign') OR
       NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'question_assignment') OR
       NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'mainassign') OR
       NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'copo_students_details') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Required tables do not exist.';
    END IF;

    -- Build dynamic SQL for the assignment marks
    SELECT
        GROUP_CONCAT(
            DISTINCT
            CONCAT(
                'MAX(CASE WHEN qa.assignment_name = ''',
                REPLACE(qa.assignment_name, '''', ''''''), -- Handle single quotes
                ''' THEN m.marks END) AS `',
                REPLACE(qa.assignment_name, '`', '``'), -- Handle backticks
                '`'
            )
        ) INTO sql_query
    FROM upload_assign ua
    JOIN question_assignment qa ON ua.assignid = qa.assign_id
    WHERE ua.usercourseid = p_usercourseid;

    -- Check if no assignments found for the usercourseid
    IF sql_query IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No data available for the given usercourseid.';
    END IF;

    -- Combine with the base SELECT statement to include student_name, stud_clg_id and group by student (sid)
    SET final_query = CONCAT(
        'SELECT m.sid, csd.student_name, csd.stud_clg_id, ', sql_query, 
        ' FROM mainassign m ',
        'JOIN question_assignment qa ON m.assignid = qa.assign_idq ',
        'JOIN upload_assign ua ON qa.assign_id = ua.assignid ',
        'JOIN lms_students csd ON m.sid = csd.sid ',
        'WHERE ua.usercourseid = ', p_usercourseid, ' ',
        'GROUP BY m.sid'
    );

    -- Debug: Check the dynamically generated SQL
    SELECT final_query;  -- Optional: To see the generated SQL query

    -- Prepare and execute the dynamic query
    SET @final_query = final_query;
    PREPARE stmt FROM @final_query;

    -- Check if the query returns any results
    SET result_count = (SELECT COUNT(*) FROM mainassign m 
                        JOIN question_assignment qa ON m.assignid = qa.assign_idq 
                        JOIN upload_assign ua ON qa.assign_id = ua.assignid 
                        JOIN lms_students csd ON m.sid = csd.sid
                        WHERE ua.usercourseid = p_usercourseid);

    IF result_count = 0 THEN
        DEALLOCATE PREPARE stmt;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No data available for the given usercourseid.';
    ELSE
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END