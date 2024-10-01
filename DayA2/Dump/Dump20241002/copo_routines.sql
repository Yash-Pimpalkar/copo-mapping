-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: copo
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping events for database 'copo'
--

--
-- Dumping routines for database 'copo'
--
/*!50003 DROP PROCEDURE IF EXISTS `calculate_combined_attainment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `calculate_combined_attainment`()
BEGIN

    -- Drop the temporary table if it already exists
    DROP TEMPORARY TABLE IF EXISTS temp_combined_attainment;

    -- Create a temporary table to store the combined attainment data
    CREATE TEMPORARY TABLE temp_combined_attainment AS
    SELECT coname, usercourse_id, AVG(attainment) AS average_attainment
    FROM (
        SELECT coname, usercourse_id, attainment
        FROM ia1_attainment
        UNION ALL
        SELECT coname, usercourse_id, attainment
        FROM ia2_attainment
    ) AS combined_attainment_data
    GROUP BY coname, usercourse_id;
    
    -- Update existing records in the combined_attainment table
    UPDATE combined_attainment ca
    JOIN temp_combined_attainment tca
    ON ca.coname = tca.coname AND ca.usercourse_id = tca.usercourse_id
    SET ca.average_attainment = tca.average_attainment,
        ca.attainment = CASE
            WHEN tca.average_attainment BETWEEN 0 AND 40 THEN 0
            WHEN tca.average_attainment BETWEEN 40 AND 60 THEN 1
            WHEN tca.average_attainment BETWEEN 60 AND 70 THEN 2
            WHEN tca.average_attainment > 70 THEN 3
            ELSE NULL
        END;
    
    -- Insert new records into combined_attainment where they do not already exist
    INSERT INTO combined_attainment (coname, usercourse_id, average_attainment, attainment)
    SELECT tca.coname, tca.usercourse_id, tca.average_attainment,
           CASE
               WHEN tca.average_attainment BETWEEN 0 AND 40 THEN 0
               WHEN tca.average_attainment BETWEEN 40 AND 60 THEN 1
               WHEN tca.average_attainment BETWEEN 60 AND 70 THEN 2
               WHEN tca.average_attainment > 70 THEN 3
               ELSE NULL
           END
    FROM temp_combined_attainment tca
    LEFT JOIN combined_attainment ca
    ON tca.coname = ca.coname AND tca.usercourse_id = ca.usercourse_id
    WHERE ca.coname IS NULL;
    
    -- Drop the temporary table
    DROP TEMPORARY TABLE temp_combined_attainment;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAssignmentMarks` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
        'JOIN copo_students_details csd ON m.sid = csd.sid ',
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
                        JOIN copo_students_details csd ON m.sid = csd.sid
                        WHERE ua.usercourseid = p_usercourseid);

    IF result_count = 0 THEN
        DEALLOCATE PREPARE stmt;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No data available for the given usercourseid.';
    ELSE
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetStudentMarksByCourseID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStudentMarksByCourseID`(IN userCourseID INT)
BEGIN

    DECLARE colNames TEXT;

    -- Generate the list of qname columns
    SELECT GROUP_CONCAT(DISTINCT CONCAT(
        'MAX(CASE WHEN ti.qname = ''', qname, ''' THEN ui.marks END) AS `', qname, '`'
    )) INTO colNames
    FROM table_ia ti
    JOIN user_course uc ON ti.usercourseid = uc.usercourse_id
    WHERE uc.usercourse_id = userCourseID;

    -- Check if colNames is NULL or empty
    IF colNames IS NULL OR colNames = '' THEN
        -- If there are no qname columns, return an empty result set
        SELECT 'No data available for the given course ID' AS message;
    ELSE
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
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetStudentMarksByCourseID_IA2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStudentMarksByCourseID_IA2`(IN userCourseID INT)
BEGIN
DECLARE colNames TEXT;

    -- Generate the list of qname columns
    SELECT GROUP_CONCAT(DISTINCT CONCAT(
        'MAX(CASE WHEN ti.qname = ''', qname, ''' THEN ui.marks END) AS `', qname, '`'
    )) INTO colNames
    FROM table_ia2 ti
    JOIN user_course uc ON ti.usercourseid = uc.usercourse_id
    WHERE uc.usercourse_id = userCourseID;

    -- Check if colNames is NULL or empty
    IF colNames IS NULL OR colNames = '' THEN
        -- If there are no qname columns, return an empty result set
        SELECT 'No data available for the given course ID' AS message;
    ELSE
        -- Construct the final query
        SET @sqlQuery = CONCAT(
            'SELECT ',
            'csd.sid, csd.student_name, csd.stud_clg_id, ',
            colNames,
            ' FROM upload_ia2 ui ',
            'JOIN table_ia2 ti ON ui.qid = ti.idtable_ia2 ',
            'JOIN user_course uc ON ti.usercourseid = uc.usercourse_id ',
            'JOIN copo_students_details csd ON ui.sid = csd.sid ',
            'WHERE uc.usercourse_id = ', userCourseID,
            ' GROUP BY csd.sid, csd.student_name, csd.stud_clg_id;'
        );

        -- Prepare and execute the dynamic query
        PREPARE stmt FROM @sqlQuery;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-02  0:23:13
