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
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `idbranch` int NOT NULL AUTO_INCREMENT,
  `branchname` varchar(255) NOT NULL,
  PRIMARY KEY (`idbranch`),
  UNIQUE KEY `branchname_UNIQUE` (`branchname`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_student_table`
--

DROP TABLE IF EXISTS `class_student_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_student_table` (
  `student_class_id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  PRIMARY KEY (`student_class_id`),
  KEY `class_id_idx` (`class_id`),
  CONSTRAINT `class_id` FOREIGN KEY (`class_id`) REFERENCES `classroom` (`classroom_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=571 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `classroom`
--

DROP TABLE IF EXISTS `classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom` (
  `classroom_id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) NOT NULL,
  `branch` int DEFAULT NULL,
  `semester` int DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `academic_year` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`classroom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_ass`
--

DROP TABLE IF EXISTS `co_ass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_ass` (
  `idco_ass` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_ass`),
  KEY `co_id_ass_idx` (`co_id`),
  CONSTRAINT `co_id_ass` FOREIGN KEY (`co_id`) REFERENCES `question_assignment` (`assign_idq`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_exp`
--

DROP TABLE IF EXISTS `co_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_exp` (
  `idco_exp` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_exp`),
  KEY `co_id_exp_idx` (`co_id`),
  CONSTRAINT `co_id_exp` FOREIGN KEY (`co_id`) REFERENCES `question_exp` (`exp_idq`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_feedback`
--

DROP TABLE IF EXISTS `co_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_feedback` (
  `co_id` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(45) DEFAULT NULL,
  `q_id` int DEFAULT NULL,
  PRIMARY KEY (`co_id`),
  KEY `q_idx_idx` (`q_id`),
  CONSTRAINT `q_idx` FOREIGN KEY (`q_id`) REFERENCES `question_feedback` (`qid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_ia`
--

DROP TABLE IF EXISTS `co_ia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_ia` (
  `idco_ia` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int NOT NULL,
  `q1a` varchar(45) DEFAULT NULL,
  `q1b` varchar(45) DEFAULT NULL,
  `q1c` varchar(45) DEFAULT NULL,
  `q2` varchar(45) DEFAULT NULL,
  `q3` varchar(45) DEFAULT NULL,
  `q4` varchar(45) DEFAULT NULL,
  `q5` varchar(45) DEFAULT NULL,
  `ia1` int DEFAULT NULL,
  `ia2` int DEFAULT NULL,
  PRIMARY KEY (`idco_ia`),
  KEY `usercourse_foreignkey_idx` (`usercourseid`),
  CONSTRAINT `usercourse_foreignkey` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_journal`
--

DROP TABLE IF EXISTS `co_journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_journal` (
  `idco_journal` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_journal`),
  KEY `coidkk_idx` (`co_id`),
  CONSTRAINT `coidkk` FOREIGN KEY (`co_id`) REFERENCES `upload_journal` (`journalid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_majorprosem`
--

DROP TABLE IF EXISTS `co_majorprosem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_majorprosem` (
  `idco_majorprosem` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(225) DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_majorprosem`),
  KEY `co_id_idx` (`co_id`),
  CONSTRAINT `co_idx` FOREIGN KEY (`co_id`) REFERENCES `upload_majorprosem` (`majorprosemid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_minipro`
--

DROP TABLE IF EXISTS `co_minipro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_minipro` (
  `idco_minipro` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_minipro`),
  KEY `co_id_minipro_idx` (`co_id`),
  CONSTRAINT `co_id_minipro` FOREIGN KEY (`co_id`) REFERENCES `questions_minipro` (`idquestions_minipro`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_miniproject`
--

DROP TABLE IF EXISTS `co_miniproject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_miniproject` (
  `idco_miniproject` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_miniproject`),
  KEY `co_id_idx` (`co_id`),
  CONSTRAINT `co_id` FOREIGN KEY (`co_id`) REFERENCES `upload_miniproject` (`miniproid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_miniprosem`
--

DROP TABLE IF EXISTS `co_miniprosem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_miniprosem` (
  `idco_miniprosem` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_miniprosem`),
  KEY `co_idy_idx` (`co_id`),
  CONSTRAINT `co_idy` FOREIGN KEY (`co_id`) REFERENCES `upload_miniprosem` (`miniprosemid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_oralpce`
--

DROP TABLE IF EXISTS `co_oralpce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_oralpce` (
  `idco_oralpce` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `usercourse_id` int DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_oralpce`),
  KEY `co_id_oral_idx` (`co_id`),
  KEY `usercourseid_hd_idx` (`usercourse_id`),
  CONSTRAINT `co_id_oral` FOREIGN KEY (`co_id`) REFERENCES `question_oralpce` (`oralpce_idq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usercourseid_hd` FOREIGN KEY (`usercourse_id`) REFERENCES `user_course` (`usercourse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_po`
--

DROP TABLE IF EXISTS `co_po`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_po` (
  `co_po_id` int NOT NULL AUTO_INCREMENT,
  `co_id` int NOT NULL,
  `po_1` float DEFAULT NULL,
  `po_2` float DEFAULT NULL,
  `po_3` float DEFAULT NULL,
  `po_4` float DEFAULT NULL,
  `po_5` float DEFAULT NULL,
  `po_6` float DEFAULT NULL,
  `po_7` float DEFAULT NULL,
  `po_8` float DEFAULT NULL,
  `po_9` float DEFAULT NULL,
  `po_10` float DEFAULT NULL,
  `po_11` float DEFAULT NULL,
  `po_12` float DEFAULT NULL,
  `pso_1` float DEFAULT NULL,
  `pso_2` float DEFAULT NULL,
  `pso_3` float DEFAULT NULL,
  `pso_4` float DEFAULT NULL,
  `avg` float DEFAULT NULL,
  PRIMARY KEY (`co_po_id`),
  KEY `co_po_idx_idx` (`co_id`),
  CONSTRAINT `co_po_idx` FOREIGN KEY (`co_id`) REFERENCES `cos` (`idcos`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_ppt`
--

DROP TABLE IF EXISTS `co_ppt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_ppt` (
  `idco_ppt` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_ppt`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_report`
--

DROP TABLE IF EXISTS `co_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_report` (
  `idco_report` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_report`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_scilab`
--

DROP TABLE IF EXISTS `co_scilab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_scilab` (
  `idco_scilab` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_scilab`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `co_trade`
--

DROP TABLE IF EXISTS `co_trade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_trade` (
  `idco_trade` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `co_id` int DEFAULT NULL,
  PRIMARY KEY (`idco_trade`),
  KEY `co_id_idx` (`co_id`),
  CONSTRAINT `coidm` FOREIGN KEY (`co_id`) REFERENCES `question_trade` (`trade_idq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cohort`
--

DROP TABLE IF EXISTS `cohort`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cohort` (
  `cohort_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `cohort_name` varchar(255) NOT NULL,
  `branch` int NOT NULL,
  `semester` int NOT NULL,
  `classname` varchar(255) NOT NULL,
  `academic_year` varchar(255) NOT NULL,
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cohort_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `col_oralpce`
--

DROP TABLE IF EXISTS `col_oralpce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `col_oralpce` (
  `idcol_oralpce` int NOT NULL AUTO_INCREMENT,
  `colnames` varchar(255) DEFAULT NULL,
  `usercourseid` int DEFAULT NULL,
  PRIMARY KEY (`idcol_oralpce`),
  KEY `usercourse_iduuu_idx` (`usercourseid`),
  CONSTRAINT `usercourse_iduuu` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `combined_attainment`
--

DROP TABLE IF EXISTS `combined_attainment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combined_attainment` (
  `id_combined_attainment` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `average_attainment` float DEFAULT NULL,
  `attainment` int DEFAULT NULL,
  `usercourse_id` int DEFAULT NULL,
  PRIMARY KEY (`id_combined_attainment`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `copo_students_details`
--

DROP TABLE IF EXISTS `copo_students_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `copo_students_details` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `stud_clg_id` varchar(20) NOT NULL,
  `programm_id` int DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cos`
--

DROP TABLE IF EXISTS `cos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cos` (
  `idcos` int NOT NULL AUTO_INCREMENT,
  `usercourse_id` int DEFAULT NULL,
  `co_name` varchar(255) DEFAULT NULL,
  `co_body` varchar(255) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  PRIMARY KEY (`idcos`),
  KEY `usercourse_idx_idx` (`usercourse_id`),
  CONSTRAINT `usercourse_idx` FOREIGN KEY (`usercourse_id`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_cos_insert` AFTER INSERT ON `cos` FOR EACH ROW BEGIN
  INSERT INTO co_po (co_id) VALUES (NEW.idcos);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `courseid` int NOT NULL AUTO_INCREMENT,
  `coursecode` varchar(255) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `created_time` varchar(255) NOT NULL,
  PRIMARY KEY (`courseid`),
  UNIQUE KEY `coursecode_UNIQUE` (`coursecode`),
  UNIQUE KEY `course_name_UNIQUE` (`course_name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `usercourse_id` int DEFAULT NULL,
  `feedback_name` varchar(45) DEFAULT NULL,
  `noofques` int DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `usercourse_idyyyy_idx` (`usercourse_id`),
  CONSTRAINT `usercourse_idyyyy` FOREIGN KEY (`usercourse_id`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feedback_attainment`
--

DROP TABLE IF EXISTS `feedback_attainment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback_attainment` (
  `idfeedback_attainment` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `coaverage` float DEFAULT NULL,
  `attainment` int DEFAULT NULL,
  `usercourseid` int DEFAULT NULL,
  PRIMARY KEY (`idfeedback_attainment`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ia1_attainment`
--

DROP TABLE IF EXISTS `ia1_attainment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ia1_attainment` (
  `id_attainment` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `attainment` float DEFAULT NULL,
  `ia1_attainment` int DEFAULT NULL,
  `usercourse_id` int DEFAULT NULL,
  PRIMARY KEY (`id_attainment`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_ia1` AFTER UPDATE ON `ia1_attainment` FOR EACH ROW BEGIN
    call calculate_combined_attainment();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `ia2_attainment`
--

DROP TABLE IF EXISTS `ia2_attainment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ia2_attainment` (
  `id_attainment` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `attainment` float DEFAULT NULL,
  `ia2_attainment` int DEFAULT NULL,
  `usercourse_id` int DEFAULT NULL,
  PRIMARY KEY (`id_attainment`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_ia2` AFTER INSERT ON `ia2_attainment` FOR EACH ROW BEGIN
     call calculate_combined_attainment();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_ia2` AFTER UPDATE ON `ia2_attainment` FOR EACH ROW BEGIN
    CALL calculate_combined_attainment();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `lms_activities_file`
--

DROP TABLE IF EXISTS `lms_activities_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lms_activities_file` (
  `file_id` int NOT NULL AUTO_INCREMENT,
  `assignment_id` int DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_type` varchar(255) NOT NULL,
  `file_size` bigint NOT NULL,
  `uploaded_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `file_path` varchar(255) NOT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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

--
-- Table structure for table `lms_attendance_students`
--

DROP TABLE IF EXISTS `lms_attendance_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lms_attendance_students` (
  `att_stud_id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `lms_attendance_id` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`att_stud_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2326 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lms_students`
--

DROP TABLE IF EXISTS `lms_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lms_students` (
  `sid` int NOT NULL,
  `stud_clg_id` varchar(255) DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `semester` int DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `academic_year` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lmsactivities`
--

DROP TABLE IF EXISTS `lmsactivities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lmsactivities` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `classroom_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `file_type_allowed` varchar(255) DEFAULT NULL,
  `max_file_size` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deadline` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`assignment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_activity_insert` AFTER INSERT ON `lmsactivities` FOR EACH ROW BEGIN
    -- Insert a submission record for each student in the specified class
    INSERT INTO submissions (classroom_id, assignment_id, student_id, submitted_at, is_late, marks, message_to_teacher)
    SELECT 
        NEW.classroom_id,        -- Classroom ID from the new activity
        NEW.assignment_id,       -- Assignment ID from the new activity
        cst.sid,                 -- Student ID from the class_student_table
        NULL,                    -- Submitted at (initially NULL as students haven't submitted yet)
        0,                       -- is_late (initially set to 0, assuming not late as they haven't submitted)
        NULL,                    -- Marks (initially NULL, to be updated after submission)
        NULL                     -- Message to teacher (initially NULL)
    FROM 
        class_student_table cst
    WHERE 
        cst.class_id = NEW.classroom_id; -- Match the classroom ID
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `logbook`
--

DROP TABLE IF EXISTS `logbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logbook` (
  `logbookid` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  `miniprojectid` int DEFAULT NULL,
  PRIMARY KEY (`logbookid`),
  KEY `sidk_idx` (`sid`),
  KEY `miniprojectidmm_idx` (`miniprojectid`),
  CONSTRAINT `miniprojectidmm` FOREIGN KEY (`miniprojectid`) REFERENCES `upload_miniproject` (`miniproid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sidk` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_atten`
--

DROP TABLE IF EXISTS `main_atten`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_atten` (
  `att_id` int NOT NULL AUTO_INCREMENT,
  `attend_id` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`att_id`),
  KEY `attendid_idx` (`attend_id`),
  KEY `sida_idx` (`sid`),
  CONSTRAINT `attendid` FOREIGN KEY (`attend_id`) REFERENCES `upload_attendance` (`attid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sida` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1175 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_gd`
--

DROP TABLE IF EXISTS `main_gd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_gd` (
  `Gd_id` int NOT NULL AUTO_INCREMENT,
  `gdd_id` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`Gd_id`),
  KEY `gdid_idx` (`gdd_id`),
  KEY `sidb_idx` (`sid`),
  CONSTRAINT `gdid` FOREIGN KEY (`gdd_id`) REFERENCES `upload_gd` (`gdid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sidb` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_journal`
--

DROP TABLE IF EXISTS `main_journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_journal` (
  `journalid` int NOT NULL AUTO_INCREMENT,
  `journal1_id` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`journalid`),
  KEY `sidlll_idx` (`sid`),
  KEY `journalid_idx` (`journal1_id`),
  CONSTRAINT `journalid` FOREIGN KEY (`journal1_id`) REFERENCES `upload_journal` (`journalid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sidlll` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_majorpro`
--

DROP TABLE IF EXISTS `main_majorpro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_majorpro` (
  `majorpro_id` int NOT NULL AUTO_INCREMENT,
  `majorid` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`majorpro_id`),
  KEY `majorid_idx` (`majorid`),
  KEY `sid_idx` (`sid`),
  CONSTRAINT `majorid` FOREIGN KEY (`majorid`) REFERENCES `upload_majorpro` (`majorid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sid` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_majorprosem`
--

DROP TABLE IF EXISTS `main_majorprosem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_majorprosem` (
  `mainmajorprosemid` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `logbookmarks` int DEFAULT NULL,
  `review1marks` int DEFAULT NULL,
  `review2marks` int DEFAULT NULL,
  `proreportmarks` int DEFAULT NULL,
  `majorprosemid` int DEFAULT NULL,
  PRIMARY KEY (`mainmajorprosemid`),
  KEY `sidxxxxx_idx` (`sid`),
  KEY `majorprosemidd_idx` (`majorprosemid`),
  CONSTRAINT `majorprosemidd` FOREIGN KEY (`majorprosemid`) REFERENCES `upload_majorprosem` (`majorprosemid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sidxxxxx` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_minipro`
--

DROP TABLE IF EXISTS `main_minipro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_minipro` (
  `miniproid` int NOT NULL AUTO_INCREMENT,
  `miniid` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`miniproid`),
  KEY `miniid_idx` (`miniid`),
  KEY `sidd_idx` (`sid`),
  CONSTRAINT `miniid` FOREIGN KEY (`miniid`) REFERENCES `questions_minipro` (`idquestions_minipro`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sidd` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_miniprosem`
--

DROP TABLE IF EXISTS `main_miniprosem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_miniprosem` (
  `mainminiprosemid` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `logbookmarks` int DEFAULT NULL,
  `review1marks` int DEFAULT NULL,
  `review2marks` int DEFAULT NULL,
  `proreportmarks` int DEFAULT NULL,
  `miniproid` int DEFAULT NULL,
  PRIMARY KEY (`mainminiprosemid`),
  KEY `siddxxx_idx` (`sid`),
  KEY `miniprosemidd_idx` (`miniproid`),
  CONSTRAINT `miniprosemidd` FOREIGN KEY (`miniproid`) REFERENCES `upload_miniprosem` (`miniprosemid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `siddxxx` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_oralpce`
--

DROP TABLE IF EXISTS `main_oralpce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_oralpce` (
  `idmain_oralpce` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `qid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`idmain_oralpce`),
  KEY `sid_uuu_idx` (`sid`),
  KEY `qid_uuu_idx` (`qid`),
  CONSTRAINT `qid_uuu` FOREIGN KEY (`qid`) REFERENCES `col_oralpce` (`idcol_oralpce`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sid_uuu` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=922 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_ppt`
--

DROP TABLE IF EXISTS `main_ppt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_ppt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  `ppt_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ppt_id_idx` (`ppt_id`),
  CONSTRAINT `ppt_id` FOREIGN KEY (`ppt_id`) REFERENCES `upload_ppt` (`ppt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_report`
--

DROP TABLE IF EXISTS `main_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `report_id` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `report_id_idx` (`report_id`),
  CONSTRAINT `report_id` FOREIGN KEY (`report_id`) REFERENCES `upload_report` (`report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=307 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_scipract`
--

DROP TABLE IF EXISTS `main_scipract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_scipract` (
  `sciid` int NOT NULL AUTO_INCREMENT,
  `scipract_id` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`sciid`),
  KEY `scipractid_idx` (`scipract_id`),
  KEY `sid_idx` (`sid`),
  CONSTRAINT `scipract_id` FOREIGN KEY (`scipract_id`) REFERENCES `uploadscilabpract` (`scipractid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `side` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=715 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_trade`
--

DROP TABLE IF EXISTS `main_trade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_trade` (
  `tradeid` int NOT NULL AUTO_INCREMENT,
  `trade_id` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`tradeid`),
  KEY `sidz_idx` (`sid`),
  KEY `tradeidd_idx` (`trade_id`),
  CONSTRAINT `sidzzz` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tradeidd` FOREIGN KEY (`trade_id`) REFERENCES `question_trade` (`trade_idq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=307 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mainassign`
--

DROP TABLE IF EXISTS `mainassign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mainassign` (
  `id` int NOT NULL AUTO_INCREMENT,
  `assignid` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assignnid_idx` (`assignid`),
  KEY `sid_idx` (`sid`),
  CONSTRAINT `assignnid` FOREIGN KEY (`assignid`) REFERENCES `question_assignment` (`assign_idq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sidddd` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3748 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mainexp`
--

DROP TABLE IF EXISTS `mainexp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mainexp` (
  `exid` int NOT NULL AUTO_INCREMENT,
  `expid` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`exid`),
  KEY `sid_idx` (`sid`),
  KEY `expidd_idx` (`expid`),
  CONSTRAINT `expidd` FOREIGN KEY (`expid`) REFERENCES `question_exp` (`exp_idq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `siddd` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1531 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oral`
--

DROP TABLE IF EXISTS `oral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oral` (
  `oral_id` int NOT NULL AUTO_INCREMENT,
  `sid` int NOT NULL,
  `oral` int NOT NULL,
  PRIMARY KEY (`oral_id`),
  KEY `sid_idyy_idx` (`sid`),
  CONSTRAINT `sid_idyy` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oral_attainment`
--

DROP TABLE IF EXISTS `oral_attainment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oral_attainment` (
  `idOral_attainment` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `Oral_attainment` float DEFAULT NULL,
  `attainment` int DEFAULT NULL,
  `usercourse_id` int DEFAULT NULL,
  PRIMARY KEY (`idOral_attainment`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oral_marks`
--

DROP TABLE IF EXISTS `oral_marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oral_marks` (
  `oralid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `max_marks` int DEFAULT NULL,
  `co_count` int DEFAULT NULL,
  PRIMARY KEY (`oralid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oralpce_attainment`
--

DROP TABLE IF EXISTS `oralpce_attainment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oralpce_attainment` (
  `idoralpce_attainment` int NOT NULL AUTO_INCREMENT,
  `conames` varchar(255) DEFAULT NULL,
  `oralpce_attainment` float DEFAULT NULL,
  `attainment` int DEFAULT NULL,
  `usercourseid` int DEFAULT NULL,
  PRIMARY KEY (`idoralpce_attainment`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pos`
--

DROP TABLE IF EXISTS `pos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pos` (
  `idpos` int NOT NULL AUTO_INCREMENT,
  `po_id` int NOT NULL,
  `po_name` varchar(255) NOT NULL,
  `po_body` varchar(255) NOT NULL,
  `created_time` datetime NOT NULL,
  `branch_id` int NOT NULL,
  PRIMARY KEY (`idpos`),
  KEY `branch_idx_idx` (`branch_id`),
  CONSTRAINT `branch_idx` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`idbranch`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proreport`
--

DROP TABLE IF EXISTS `proreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proreport` (
  `proreportid` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  `miniprojectid` int DEFAULT NULL,
  PRIMARY KEY (`proreportid`),
  KEY `sidx_idx` (`sid`),
  KEY `miniprojectidf_idx` (`miniprojectid`),
  CONSTRAINT `miniprojectidf` FOREIGN KEY (`miniprojectid`) REFERENCES `upload_miniproject` (`miniproid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sidx` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question_assignment`
--

DROP TABLE IF EXISTS `question_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_assignment` (
  `assign_idq` int NOT NULL AUTO_INCREMENT,
  `assignment_name` varchar(255) DEFAULT NULL,
  `assign_id` int DEFAULT NULL,
  PRIMARY KEY (`assign_idq`),
  KEY `assign_id_idx` (`assign_id`),
  CONSTRAINT `assign_id` FOREIGN KEY (`assign_id`) REFERENCES `upload_assign` (`assignid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question_exp`
--

DROP TABLE IF EXISTS `question_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_exp` (
  `exp_idq` int NOT NULL AUTO_INCREMENT,
  `expname` varchar(255) DEFAULT NULL,
  `exp_id` int DEFAULT NULL,
  PRIMARY KEY (`exp_idq`),
  KEY `exp_idxxx_idx` (`exp_id`),
  CONSTRAINT `exp_idxxx` FOREIGN KEY (`exp_id`) REFERENCES `upload_exp` (`expid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question_feedback`
--

DROP TABLE IF EXISTS `question_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_feedback` (
  `qid` int NOT NULL AUTO_INCREMENT,
  `question_name` varchar(45) DEFAULT NULL,
  `questionno_id` int DEFAULT NULL,
  PRIMARY KEY (`qid`),
  KEY `questionno_xx_idx` (`questionno_id`),
  CONSTRAINT `question_noxx` FOREIGN KEY (`questionno_id`) REFERENCES `feedback` (`feedback_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question_oralpce`
--

DROP TABLE IF EXISTS `question_oralpce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_oralpce` (
  `oralpce_idq` int NOT NULL AUTO_INCREMENT,
  `colname` varchar(255) DEFAULT NULL,
  `conames` varchar(255) DEFAULT NULL,
  `marks` int DEFAULT NULL,
  `pce_id` int DEFAULT NULL,
  `usercourse_id` int DEFAULT NULL,
  PRIMARY KEY (`oralpce_idq`),
  KEY `pce_id_idx` (`pce_id`),
  KEY `usercourse_idxxxx_idx` (`usercourse_id`),
  CONSTRAINT `pce_id` FOREIGN KEY (`pce_id`) REFERENCES `upload_oralpce` (`oralpce_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usercourse_idxxxx` FOREIGN KEY (`usercourse_id`) REFERENCES `user_course` (`usercourse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question_trade`
--

DROP TABLE IF EXISTS `question_trade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_trade` (
  `trade_idq` int NOT NULL AUTO_INCREMENT,
  `tradename` varchar(255) DEFAULT NULL,
  `tradeid` int DEFAULT NULL,
  PRIMARY KEY (`trade_idq`),
  KEY `tradeid_idx` (`tradeid`),
  CONSTRAINT `tradeid` FOREIGN KEY (`tradeid`) REFERENCES `upload_trade` (`tradeid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questions_minipro`
--

DROP TABLE IF EXISTS `questions_minipro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions_minipro` (
  `idquestions_minipro` int NOT NULL AUTO_INCREMENT,
  `miniproname` varchar(255) DEFAULT NULL,
  `minipro_id` int DEFAULT NULL,
  PRIMARY KEY (`idquestions_minipro`),
  KEY `miniproidxx_idx` (`minipro_id`),
  CONSTRAINT `miniproidxx` FOREIGN KEY (`minipro_id`) REFERENCES `upload_minipro` (`miniid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review1`
--

DROP TABLE IF EXISTS `review1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review1` (
  `review1id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  `miniprojectid` int DEFAULT NULL,
  PRIMARY KEY (`review1id`),
  KEY `sid_idx` (`sid`),
  KEY `miniprojectids_idx` (`miniprojectid`),
  CONSTRAINT `miniprojectids` FOREIGN KEY (`miniprojectid`) REFERENCES `upload_miniproject` (`miniproid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sidm` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review2`
--

DROP TABLE IF EXISTS `review2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review2` (
  `review2id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  `miniprojectid` int DEFAULT NULL,
  PRIMARY KEY (`review2id`),
  KEY `sid_idx` (`sid`),
  KEY `miniprojectidd_idx` (`miniprojectid`),
  CONSTRAINT `miniprojectidd` FOREIGN KEY (`miniprojectid`) REFERENCES `upload_miniproject` (`miniproid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sidz` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `semester`
--

DROP TABLE IF EXISTS `semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester` (
  `sem_id` int NOT NULL AUTO_INCREMENT,
  `sid` int NOT NULL,
  `sem` int NOT NULL,
  PRIMARY KEY (`sem_id`),
  KEY `sid_idx_idx` (`sid`),
  CONSTRAINT `sid_idxx` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=541 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `semester_attainment`
--

DROP TABLE IF EXISTS `semester_attainment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester_attainment` (
  `idSemester_attainment` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) DEFAULT NULL,
  `Semester_attainment` float DEFAULT NULL,
  `attainment` int DEFAULT NULL,
  `usercourse_id` int DEFAULT NULL,
  PRIMARY KEY (`idSemester_attainment`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `semester_marks`
--

DROP TABLE IF EXISTS `semester_marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester_marks` (
  `semid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `max_marks` int DEFAULT NULL,
  `co_count` int DEFAULT NULL,
  PRIMARY KEY (`semid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student_cohort`
--

DROP TABLE IF EXISTS `student_cohort`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_cohort` (
  `student_id` int NOT NULL,
  `cohort_id` int NOT NULL,
  PRIMARY KEY (`student_id`,`cohort_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student_feedback`
--

DROP TABLE IF EXISTS `student_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_feedback` (
  `std_fid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `qid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  `submitted_at` date DEFAULT NULL,
  PRIMARY KEY (`std_fid`),
  KEY `sidtttt_idx` (`sid`),
  KEY `qidy_idx` (`qid`),
  KEY `usercourseidffff_idx` (`usercourseid`),
  CONSTRAINT `qidy` FOREIGN KEY (`qid`) REFERENCES `question_feedback` (`qid`),
  CONSTRAINT `sidtttt` FOREIGN KEY (`sid`) REFERENCES `lms_students` (`sid`),
  CONSTRAINT `usercourseidffff` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=621 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissions` (
  `submission_id` int NOT NULL AUTO_INCREMENT,
  `classroom_id` int DEFAULT NULL,
  `assignment_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT NULL,
  `is_late` tinyint(1) DEFAULT NULL,
  `marks` int DEFAULT NULL,
  `message_to_teacher` text,
  PRIMARY KEY (`submission_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `lms_students` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `submissions_file`
--

DROP TABLE IF EXISTS `submissions_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissions_file` (
  `file_id` int NOT NULL AUTO_INCREMENT,
  `submission_id` int DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `file_size` bigint DEFAULT NULL,
  `uploaded_date` timestamp NULL DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `table_ia`
--

DROP TABLE IF EXISTS `table_ia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_ia` (
  `idtable_ia` int NOT NULL AUTO_INCREMENT,
  `qname` varchar(45) NOT NULL,
  `coname` varchar(45) NOT NULL,
  `usercourseid` int NOT NULL,
  `marks` int NOT NULL,
  PRIMARY KEY (`idtable_ia`),
  KEY `usercourseid_IA1_idx` (`usercourseid`),
  CONSTRAINT `usercourseid_IA1` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `table_ia2`
--

DROP TABLE IF EXISTS `table_ia2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_ia2` (
  `idtable_ia2` int NOT NULL AUTO_INCREMENT,
  `qname` varchar(45) NOT NULL,
  `coname` varchar(45) NOT NULL,
  `usercourseid` int NOT NULL,
  `marks` int NOT NULL,
  PRIMARY KEY (`idtable_ia2`),
  KEY `usercourseid2_idx` (`usercourseid`),
  CONSTRAINT `usercourseid2` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `table_oral`
--

DROP TABLE IF EXISTS `table_oral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_oral` (
  `oral_id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `oralid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`oral_id`),
  KEY `oralid_idx` (`oralid`),
  CONSTRAINT `oralid` FOREIGN KEY (`oralid`) REFERENCES `oral_marks` (`oralid`)
) ENGINE=InnoDB AUTO_INCREMENT=461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `table_sem`
--

DROP TABLE IF EXISTS `table_sem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_sem` (
  `sem_id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `semid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`sem_id`),
  KEY `sem_id_idx` (`semid`),
  CONSTRAINT `sem_id` FOREIGN KEY (`semid`) REFERENCES `semester_marks` (`semid`)
) ENGINE=InnoDB AUTO_INCREMENT=819 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `termwork_attainment_table`
--

DROP TABLE IF EXISTS `termwork_attainment_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `termwork_attainment_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coname` varchar(255) NOT NULL,
  `average_attainment` decimal(5,2) NOT NULL,
  `attainment` int NOT NULL,
  `usercourseid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usercourseid` (`usercourseid`,`coname`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `termwork_table`
--

DROP TABLE IF EXISTS `termwork_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `termwork_table` (
  `tid` int NOT NULL AUTO_INCREMENT,
  `tw_id` int DEFAULT NULL,
  `usercourseid` int DEFAULT NULL,
  PRIMARY KEY (`tid`),
  KEY `_dx3_idx` (`usercourseid`),
  CONSTRAINT `_dx3` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `termworkbase`
--

DROP TABLE IF EXISTS `termworkbase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `termworkbase` (
  `twid` int NOT NULL AUTO_INCREMENT,
  `twbody` varchar(60) DEFAULT NULL,
  `th_only_id` int DEFAULT NULL,
  `exid` int DEFAULT NULL,
  `assignid` int DEFAULT NULL,
  `attid` int DEFAULT NULL,
  `gdid` int DEFAULT NULL,
  `mini_id` int DEFAULT NULL,
  `scprid` int DEFAULT NULL,
  `ppt_id` int DEFAULT NULL,
  `report_id` int DEFAULT NULL,
  `miniproid` int DEFAULT NULL,
  `tradeid` int DEFAULT NULL,
  `journalid` int DEFAULT NULL,
  `miniproject` int DEFAULT NULL,
  `majorproject` int DEFAULT NULL,
  PRIMARY KEY (`twid`),
  KEY `miniprojectupload_idx` (`miniproject`),
  KEY `majorprojectupload_idx` (`majorproject`),
  CONSTRAINT `majorprojectupload` FOREIGN KEY (`majorproject`) REFERENCES `upload_majorprosem` (`majorprosemid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `miniprojectupload` FOREIGN KEY (`miniproject`) REFERENCES `upload_miniprosem` (`miniprosemid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_assign`
--

DROP TABLE IF EXISTS `upload_assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_assign` (
  `assignid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `noofassign` int DEFAULT NULL,
  `maxmarks` int DEFAULT NULL,
  PRIMARY KEY (`assignid`),
  KEY `usercourse_id_idx` (`usercourseid`),
  CONSTRAINT `usercourserid` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_attendance`
--

DROP TABLE IF EXISTS `upload_attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_attendance` (
  `attid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `maxmarks` int DEFAULT NULL,
  PRIMARY KEY (`attid`),
  KEY `usercourseid_idx` (`usercourseid`),
  CONSTRAINT `usercourseid` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_exp`
--

DROP TABLE IF EXISTS `upload_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_exp` (
  `expid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `noofexps` int DEFAULT NULL,
  `maxmarks` int DEFAULT NULL,
  PRIMARY KEY (`expid`),
  UNIQUE KEY `idupexp_UNIQUE` (`expid`),
  KEY `usercourseid_idx` (`usercourseid`),
  CONSTRAINT `usercourseidy` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_gd`
--

DROP TABLE IF EXISTS `upload_gd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_gd` (
  `gdid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`gdid`),
  KEY `usercourseidz_idx` (`usercourseid`),
  CONSTRAINT `usercourseidz` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_gdynamic`
--

DROP TABLE IF EXISTS `upload_gdynamic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_gdynamic` (
  `gdynamic_id` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `maxmarks` int DEFAULT NULL,
  PRIMARY KEY (`gdynamic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_ia`
--

DROP TABLE IF EXISTS `upload_ia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_ia` (
  `idupload_ia` int NOT NULL AUTO_INCREMENT,
  `sid` int NOT NULL,
  `qid` int NOT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`idupload_ia`),
  KEY `sid_idx_idx` (`sid`),
  KEY `qid_idx` (`qid`),
  CONSTRAINT `qid` FOREIGN KEY (`qid`) REFERENCES `table_ia` (`idtable_ia`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sid_idx` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10322 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_ia2`
--

DROP TABLE IF EXISTS `upload_ia2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_ia2` (
  `iduploadia2` int NOT NULL AUTO_INCREMENT,
  `sid` int NOT NULL,
  `qid` int NOT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`iduploadia2`),
  KEY `qid_idx2_idx` (`qid`),
  KEY `student_idx2_idx` (`sid`),
  CONSTRAINT `qid_idx2` FOREIGN KEY (`qid`) REFERENCES `table_ia2` (`idtable_ia2`),
  CONSTRAINT `student_idx2` FOREIGN KEY (`sid`) REFERENCES `copo_students_details` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=5891 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_journal`
--

DROP TABLE IF EXISTS `upload_journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_journal` (
  `journalid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `maxmarks` int DEFAULT NULL,
  PRIMARY KEY (`journalid`),
  KEY `usercourseidkk_idx` (`usercourseid`),
  CONSTRAINT `usercourseidkk` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_majorpro`
--

DROP TABLE IF EXISTS `upload_majorpro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_majorpro` (
  `majorid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`majorid`),
  KEY `usercourseida_idx` (`usercourseid`),
  CONSTRAINT `usercourseida` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_majorprosem`
--

DROP TABLE IF EXISTS `upload_majorprosem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_majorprosem` (
  `majorprosemid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `logbookmarks` int DEFAULT NULL,
  `review1marks` int DEFAULT NULL,
  `review2marks` int DEFAULT NULL,
  `proreportmarks` int DEFAULT NULL,
  PRIMARY KEY (`majorprosemid`),
  KEY `usercoursidyyyyy_idx` (`usercourseid`),
  CONSTRAINT `usercoursidyyyyy` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_minipro`
--

DROP TABLE IF EXISTS `upload_minipro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_minipro` (
  `miniid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `noofminipro` varchar(255) DEFAULT NULL,
  `maxmarks` int DEFAULT NULL,
  PRIMARY KEY (`miniid`),
  KEY `usercourseidb_idx` (`usercourseid`),
  CONSTRAINT `usercourseidb` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_miniproject`
--

DROP TABLE IF EXISTS `upload_miniproject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_miniproject` (
  `miniproid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `logbookmarks` int DEFAULT NULL,
  `review1marks` int DEFAULT NULL,
  `review2marks` int DEFAULT NULL,
  `proreportmarks` int DEFAULT NULL,
  PRIMARY KEY (`miniproid`),
  KEY `usercourseidxxxxx_idx` (`usercourseid`),
  CONSTRAINT `usercourseidxxxxx` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_miniprosem`
--

DROP TABLE IF EXISTS `upload_miniprosem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_miniprosem` (
  `miniprosemid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `logbookmarks` int DEFAULT NULL,
  `review1marks` int DEFAULT NULL,
  `review2marks` int DEFAULT NULL,
  `proreportmarks` int DEFAULT NULL,
  PRIMARY KEY (`miniprosemid`),
  KEY `usercourseidkkkk_idx` (`usercourseid`),
  CONSTRAINT `usercourseidkkkk` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_oralpce`
--

DROP TABLE IF EXISTS `upload_oralpce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_oralpce` (
  `oralpce_id` int NOT NULL AUTO_INCREMENT,
  `usercourseidpce` int DEFAULT NULL,
  `col_count` int DEFAULT NULL,
  PRIMARY KEY (`oralpce_id`),
  KEY `usercourseidpce_idx` (`usercourseidpce`),
  CONSTRAINT `usercourseidpce` FOREIGN KEY (`usercourseidpce`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_ppt`
--

DROP TABLE IF EXISTS `upload_ppt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_ppt` (
  `ppt_id` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `maxmarks` int DEFAULT NULL,
  PRIMARY KEY (`ppt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_presentation`
--

DROP TABLE IF EXISTS `upload_presentation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_presentation` (
  `presentation_id` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `maxmarks` int DEFAULT NULL,
  PRIMARY KEY (`presentation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_report`
--

DROP TABLE IF EXISTS `upload_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `maxmarks` int DEFAULT NULL,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_trade`
--

DROP TABLE IF EXISTS `upload_trade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_trade` (
  `tradeid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `nooftrade` int DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`tradeid`),
  KEY `usercourseidl_idx` (`usercourseid`),
  CONSTRAINT `usercourseidl` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `uploadscilabpract`
--

DROP TABLE IF EXISTS `uploadscilabpract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uploadscilabpract` (
  `scipractid` int NOT NULL AUTO_INCREMENT,
  `usercourseid` int DEFAULT NULL,
  `maxmarks` int DEFAULT NULL,
  PRIMARY KEY (`scipractid`),
  KEY `usercourseidc_idx` (`usercourseid`),
  CONSTRAINT `usercourseidc` FOREIGN KEY (`usercourseid`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_course`
--

DROP TABLE IF EXISTS `user_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_course` (
  `usercourse_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `semester` int DEFAULT NULL,
  `academic_year` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `co_count` int DEFAULT NULL,
  PRIMARY KEY (`usercourse_id`),
  KEY `user_idx_idx` (`user_id`),
  KEY `course_idx_idx` (`course_id`),
  CONSTRAINT `course_idx` FOREIGN KEY (`course_id`) REFERENCES `course` (`courseid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_idx` FOREIGN KEY (`user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `emailid` varchar(255) NOT NULL,
  `teacher_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `depart` varchar(255) DEFAULT NULL,
  `isuser` int DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetExperimentMarks` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
            'JOIN lms_students csd ON ui.sid = csd.sid ',
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
            'JOIN lms_students csd ON ui.sid = csd.sid ',
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
/*!50003 DROP PROCEDURE IF EXISTS `GetStudentOralPceMarksByCourseID_OralPCE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTradeMarks` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
        'JOIN lms_students csd ON mt.sid = csd.sid ',
        'WHERE ut.usercourseid = ', p_usercourseid, ' ',
        'GROUP BY mt.sid, csd.student_name, csd.stud_clg_id'
    );

    -- Prepare and execute the dynamic query
    SET @final_query = final_query;
    PREPARE stmt FROM @final_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
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

-- Dump completed on 2024-11-06 17:28:11
