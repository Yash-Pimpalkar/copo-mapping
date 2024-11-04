-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: copo
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `lms_attendance`
--

DROP TABLE IF EXISTS `lms_attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lms_attendance` (
  `attendance_id` int NOT NULL AUTO_INCREMENT,
  `class_id` int DEFAULT NULL,
  `attendance_date` date DEFAULT NULL,
  `time_slot` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `lms_attendance_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classroom` (`classroom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lms_attendance`
--

LOCK TABLES `lms_attendance` WRITE;
/*!40000 ALTER TABLE `lms_attendance` DISABLE KEYS */;
INSERT INTO `lms_attendance` VALUES (1,1,'2024-11-18','10:00 AM - 11:00 AM'),(2,3,'2024-11-04','11:00 AM - 12:00 PM'),(3,3,'2024-11-04','09:00 AM - 10:00 AM'),(4,3,'2024-11-04','09:00 AM - 10:00 AM'),(5,1,'2024-11-04','09:00 AM - 10:00 AM'),(6,3,'2024-11-05','09:00 AM - 10:00 AM'),(7,3,'2024-11-05','01:00 PM - 02:00 PM'),(8,3,'2024-11-04','02:00 PM - 03:00 PM'),(9,3,'2024-11-04','10:00 AM - 11:00 AM'),(10,3,'2024-11-22','09:00 AM - 10:00 AM'),(11,3,'2024-11-04','01:00 PM - 02:00 PM');
/*!40000 ALTER TABLE `lms_attendance` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_lms_attendance_insert` AFTER INSERT ON `lms_attendance` FOR EACH ROW BEGIN
    -- Insert all students of the given class into lms_attendance_students
    INSERT INTO lms_attendance_students (sid, lms_attendance_id)
    SELECT cs.sid, NEW.attendance_id  -- Assuming 0 as default status
    FROM class_student_table cs
    WHERE cs.class_id = NEW.class_id;
END */;;
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

-- Dump completed on 2024-11-04 12:17:14
