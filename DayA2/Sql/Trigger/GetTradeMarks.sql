CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTradeMarks`(IN p_usercourseid INT)
BEGIN
    DECLARE sql_query LONGTEXT;
    DECLARE final_query LONGTEXT;

    -- Build dynamic SQL query
    SELECT
        GROUP_CONCAT(
            DISTINCT
            CONCAT(
                'MAX(CASE WHEN qt.tradename = ''',
                REPLACE(qt.tradename, '''', ''''''), 
                ''' THEN mt.marks END) AS `',
                REPLACE(qt.tradename, '`', '``'),
                '`'
            )
        ) INTO sql_query
    FROM question_trade qt
    JOIN upload_trade ut ON qt.tradeid = ut.tradeid
    WHERE ut.usercourseid = p_usercourseid;

    -- Check if no trades found for the usercourseid
    IF sql_query IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No data available for the given usercourseid.';
    END IF;

    -- Combine with base SELECT
    SET final_query = CONCAT(
        'SELECT mt.sid, csd.student_name, csd.stud_clg_id, ', sql_query, 
        ' FROM main_trade mt ',
        'JOIN question_trade qt ON mt.trade_id = qt.trade_idq ',
        'JOIN upload_trade ut ON qt.tradeid = ut.tradeid ',
        'JOIN copo_students_details csd ON mt.sid = csd.sid ',
        'WHERE ut.usercourseid = ', p_usercourseid, ' ',
        'GROUP BY mt.sid, csd.student_name, csd.stud_clg_id'
    );

    -- Prepare and execute the dynamic query
    SET @final_query = final_query;
    PREPARE stmt FROM @final_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END