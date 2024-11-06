CREATE DEFINER=`root`@`localhost` PROCEDURE `GetExperimentMarks`(IN p_usercourseid INT)
BEGIN
    DECLARE sql_query LONGTEXT;
    DECLARE final_query LONGTEXT;
    DECLARE result_count INT DEFAULT 0;

    -- Step 1: Check if the required tables exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'upload_exp') OR
       NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'question_exp') OR
       NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'mainexp') OR
       NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'copo_students_details') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Required tables do not exist.';
    END IF;

    -- Step 2: Build dynamic SQL for the experiment marks using expname instead of expid
    SET sql_query = NULL;

    SELECT
        GROUP_CONCAT(
            DISTINCT
            CONCAT(
                'MAX(CASE WHEN qe.expname = ''',
                REPLACE(qe.expname, '''', ''''''), -- Handle single quotes
                ''' THEN me.marks END) AS `',
                REPLACE(qe.expname, '`', '``'), -- Handle backticks
                '`'
            )
        ) INTO sql_query
    FROM upload_exp ue
    JOIN question_exp qe ON ue.expid = qe.exp_id
    WHERE ue.usercourseid = p_usercourseid;

    -- Step 3: Check if no experiments found for the usercourseid
    IF sql_query IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No data available for the given usercourseid.';
    END IF;

    -- Step 4: Construct the final query
    SET final_query = CONCAT(
        'SELECT me.sid, csd.student_name, csd.stud_clg_id, ', sql_query, 
        ' FROM mainexp me ',
        'JOIN question_exp qe ON me.expid = qe.exp_idq ',
        'JOIN upload_exp ue ON qe.exp_id = ue.expid ',
        'JOIN lms_students csd ON me.sid = csd.sid ',
        'WHERE ue.usercourseid = ', p_usercourseid, ' ',
        'GROUP BY me.sid'
    );

    -- Debug: Check the dynamically generated SQL
    SELECT final_query;  -- Optional: To see the generated SQL query

    -- Step 5: Prepare and execute the dynamic query
    SET @final_query = final_query;
    PREPARE stmt FROM @final_query;

    -- Check if the query returns any results
    SET result_count = (SELECT COUNT(*) FROM mainexp me 
                        JOIN question_exp qe ON me.expid = qe.exp_idq 
                        JOIN upload_exp ue ON qe.exp_id = ue.expid 
                        JOIN lms_students csd ON me.sid = csd.sid
                        WHERE ue.usercourseid = p_usercourseid);

    IF result_count = 0 THEN
        DEALLOCATE PREPARE stmt;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No data available for the given usercourseid.';
    ELSE
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END