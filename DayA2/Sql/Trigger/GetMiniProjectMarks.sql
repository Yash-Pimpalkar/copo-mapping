CREATE DEFINER=`root`@`localhost` PROCEDURE `GetMiniProjectMarks`(IN p_usercourseid INT)
BEGIN
    DECLARE sql_query LONGTEXT;
    DECLARE final_query LONGTEXT;

    -- Debugging: Check the passed parameter
    -- SELECT p_usercourseid AS 'Passed usercourseid'; -- Remove/comment after debugging

    -- Build dynamic SQL query
    SELECT
        GROUP_CONCAT(
            DISTINCT
            CONCAT(
                'MAX(CASE WHEN qm.miniproname = ''',
                REPLACE(qm.miniproname, '''', ''''''), 
                ''' THEN m.marks END) AS `',
                REPLACE(qm.miniproname, '`', '``'),
                '`'
            )
        ) INTO sql_query
    FROM questions_minipro qm
    JOIN upload_minipro um ON qm.minipro_id = um.miniid
    WHERE um.usercourseid = p_usercourseid;

    -- Debugging: Check if SQL query is generated
    -- SELECT sql_query AS 'Generated SQL query'; -- Remove/comment after debugging

    -- Check if no mini projects found for the usercourseid
    IF sql_query IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No data available for the given usercourseid.';
    END IF;

    -- Combine with base SELECT
    SET final_query = CONCAT(
        'SELECT m.sid, csd.student_name, csd.stud_clg_id, ', sql_query, 
        ' FROM main_minipro m ',
        'JOIN questions_minipro qm ON m.miniid = qm.idquestions_minipro ',
        'JOIN upload_minipro um ON qm.minipro_id = um.miniid ',
        'JOIN copo_students_details csd ON m.sid = csd.sid ',
        'WHERE um.usercourseid = ', p_usercourseid, ' ',
        'GROUP BY m.sid, csd.student_name, csd.stud_clg_id'
    );

    -- Prepare and execute the dynamic query
    SET @final_query = final_query;
    PREPARE stmt FROM @final_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END