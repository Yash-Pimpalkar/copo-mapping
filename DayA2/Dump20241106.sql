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
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (3,'AIDS'),(4,'AIML'),(1,'COMPUTER'),(2,'IT'),(5,'MECATRONICS');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `class_student_table`
--

LOCK TABLES `class_student_table` WRITE;
/*!40000 ALTER TABLE `class_student_table` DISABLE KEYS */;
INSERT INTO `class_student_table` VALUES (102,3,1),(103,4,1),(104,3,1),(105,157,1),(106,162,1),(107,163,1),(108,154,1),(109,160,1),(110,1,1),(111,2,1),(112,1,4),(113,2,4),(114,3,4),(115,4,4),(116,5,4),(117,6,4),(118,7,4),(119,8,4),(120,9,4),(121,10,4),(122,11,4),(123,12,4),(124,13,4),(125,14,4),(126,15,4),(127,16,4),(128,17,4),(129,18,4),(130,19,4),(131,20,4),(132,21,4),(133,22,4),(134,23,4),(135,24,4),(136,25,4),(137,26,4),(138,27,4),(139,28,4),(140,29,4),(141,30,4),(142,31,4),(143,32,4),(144,33,4),(145,34,4),(146,35,4),(147,36,4),(148,37,4),(149,38,4),(150,39,4),(151,40,4),(152,41,4),(153,42,4),(154,43,4),(155,44,4),(156,45,4),(157,46,4),(158,47,4),(159,48,4),(160,49,4),(161,50,4),(162,51,4),(163,52,4),(164,53,4),(165,54,4),(166,55,4),(167,56,4),(168,57,4),(169,58,4),(170,59,4),(171,60,4),(172,61,4),(173,62,4),(174,63,4),(175,64,4),(176,65,4),(177,66,4),(178,67,4),(179,68,4),(180,69,4),(181,70,4),(182,71,4),(183,72,4),(184,73,4),(185,74,4),(186,75,4),(187,76,4),(188,77,4),(189,78,4),(190,79,4),(191,80,4),(192,81,4),(193,82,4),(194,83,4),(195,84,4),(196,85,4),(197,86,4),(198,87,4),(199,88,4),(200,89,4),(201,90,4),(202,91,4),(203,92,4),(204,93,4),(205,94,4),(206,95,4),(207,96,4),(208,97,4),(209,98,4),(210,99,4),(211,100,4),(212,101,4),(213,102,4),(214,103,4),(215,104,4),(216,105,4),(217,106,4),(218,107,4),(219,108,4),(220,109,4),(221,110,4),(222,111,4),(223,112,4),(224,113,4),(225,114,4),(226,115,4),(227,116,4),(228,117,4),(229,118,4),(230,119,4),(231,120,4),(232,121,4),(233,122,4),(234,123,4),(235,124,4),(236,125,4),(237,126,4),(238,127,4),(239,128,4),(240,129,4),(241,130,4),(242,131,4),(243,132,4),(244,133,4),(245,134,4),(246,135,4),(247,136,4),(248,137,4),(249,138,4),(250,139,4),(251,140,4),(252,141,4),(253,142,4),(254,143,4),(255,144,4),(256,145,4),(257,146,4),(258,147,4),(259,148,4),(260,149,4),(261,150,4),(262,151,4),(263,152,4),(264,153,4),(265,1,5),(266,2,5),(267,3,5),(268,4,5),(269,5,5),(270,6,5),(271,7,5),(272,8,5),(273,9,5),(274,10,5),(275,11,5),(276,12,5),(277,13,5),(278,14,5),(279,15,5),(280,16,5),(281,17,5),(282,18,5),(283,19,5),(284,20,5),(285,21,5),(286,22,5),(287,23,5),(288,24,5),(289,25,5),(290,26,5),(291,27,5),(292,28,5),(293,29,5),(294,30,5),(295,31,5),(296,32,5),(297,33,5),(298,34,5),(299,35,5),(300,36,5),(301,37,5),(302,38,5),(303,39,5),(304,40,5),(305,41,5),(306,42,5),(307,43,5),(308,44,5),(309,45,5),(310,46,5),(311,47,5),(312,48,5),(313,49,5),(314,50,5),(315,51,5),(316,52,5),(317,53,5),(318,54,5),(319,55,5),(320,56,5),(321,57,5),(322,58,5),(323,59,5),(324,60,5),(325,61,5),(326,62,5),(327,63,5),(328,64,5),(329,65,5),(330,66,5),(331,67,5),(332,68,5),(333,69,5),(334,70,5),(335,71,5),(336,72,5),(337,73,5),(338,74,5),(339,75,5),(340,76,5),(341,77,5),(342,78,5),(343,79,5),(344,80,5),(345,81,5),(346,82,5),(347,83,5),(348,84,5),(349,85,5),(350,86,5),(351,87,5),(352,88,5),(353,89,5),(354,90,5),(355,91,5),(356,92,5),(357,93,5),(358,94,5),(359,95,5),(360,96,5),(361,97,5),(362,98,5),(363,99,5),(364,100,5),(365,101,5),(366,102,5),(367,103,5),(368,104,5),(369,105,5),(370,106,5),(371,107,5),(372,108,5),(373,109,5),(374,110,5),(375,111,5),(376,112,5),(377,113,5),(378,114,5),(379,115,5),(380,116,5),(381,117,5),(382,118,5),(383,119,5),(384,120,5),(385,121,5),(386,122,5),(387,123,5),(388,124,5),(389,125,5),(390,126,5),(391,127,5),(392,128,5),(393,129,5),(394,130,5),(395,131,5),(396,132,5),(397,133,5),(398,134,5),(399,135,5),(400,136,5),(401,137,5),(402,138,5),(403,139,5),(404,140,5),(405,141,5),(406,142,5),(407,143,5),(408,144,5),(409,145,5),(410,146,5),(411,147,5),(412,148,5),(413,149,5),(414,150,5),(415,151,5),(416,152,5),(417,153,5),(418,1,3),(419,2,3),(420,3,3),(421,4,3),(422,5,3),(423,6,3),(424,7,3),(425,8,3),(426,9,3),(427,10,3),(428,11,3),(429,12,3),(430,13,3),(431,14,3),(432,15,3),(433,16,3),(434,17,3),(435,18,3),(436,19,3),(437,20,3),(438,21,3),(439,22,3),(440,23,3),(441,24,3),(442,25,3),(443,26,3),(444,27,3),(445,28,3),(446,29,3),(447,30,3),(448,31,3),(449,32,3),(450,33,3),(451,34,3),(452,35,3),(453,36,3),(454,37,3),(455,38,3),(456,39,3),(457,40,3),(458,41,3),(459,42,3),(460,43,3),(461,44,3),(462,45,3),(463,46,3),(464,47,3),(465,48,3),(466,49,3),(467,50,3),(468,51,3),(469,52,3),(470,53,3),(471,54,3),(472,55,3),(473,56,3),(474,57,3),(475,58,3),(476,59,3),(477,60,3),(478,61,3),(479,62,3),(480,63,3),(481,64,3),(482,65,3),(483,66,3),(484,67,3),(485,68,3),(486,69,3),(487,70,3),(488,71,3),(489,72,3),(490,73,3),(491,74,3),(492,75,3),(493,76,3),(494,77,3),(495,78,3),(496,79,3),(497,80,3),(498,81,3),(499,82,3),(500,83,3),(501,84,3),(502,85,3),(503,86,3),(504,87,3),(505,88,3),(506,89,3),(507,90,3),(508,91,3),(509,92,3),(510,93,3),(511,94,3),(512,95,3),(513,96,3),(514,97,3),(515,98,3),(516,99,3),(517,100,3),(518,101,3),(519,102,3),(520,103,3),(521,104,3),(522,105,3),(523,106,3),(524,107,3),(525,108,3),(526,109,3),(527,110,3),(528,111,3),(529,112,3),(530,113,3),(531,114,3),(532,115,3),(533,116,3),(534,117,3),(535,118,3),(536,119,3),(537,120,3),(538,121,3),(539,122,3),(540,123,3),(541,124,3),(542,125,3),(543,126,3),(544,127,3),(545,128,3),(546,129,3),(547,130,3),(548,131,3),(549,132,3),(550,133,3),(551,134,3),(552,135,3),(553,136,3),(554,137,3),(555,138,3),(556,139,3),(557,140,3),(558,141,3),(559,142,3),(560,143,3),(561,144,3),(562,145,3),(563,146,3),(564,147,3),(565,148,3),(566,149,3),(567,150,3),(568,151,3),(569,152,3),(570,153,3);
/*!40000 ALTER TABLE `class_student_table` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (1,'Software Engineering',1,5,5,'2022-2023','2024-10-15 19:28:31'),(3,'Software Training',4,5,5,'2023-2024','2024-10-16 15:32:26'),(4,'DATA ANALYTICS',1,6,7,'2024-2025','2024-10-30 19:02:30'),(5,'TCS',1,5,7,'2023-2024','2024-10-30 23:32:13');
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_ass`
--

LOCK TABLES `co_ass` WRITE;
/*!40000 ALTER TABLE `co_ass` DISABLE KEYS */;
INSERT INTO `co_ass` VALUES (1,'CO1',12),(2,'CO1',13),(3,'CO2',14),(4,'CO2',15),(5,'CO3',16),(6,'CO4',17),(7,'CO2',12),(8,'CO1',18),(9,'CO2',19),(10,'CO1',20),(11,'CO2',20),(12,'CO1',21),(13,'CO1',21),(14,'CO1',22),(15,'CO2',22),(16,'CO2',22),(17,'CO1',23),(18,'CO2',23),(19,'CO3',24),(20,'CO2',24),(21,'CO4',25),(22,'CO1',25),(23,'CO1',26),(24,'CO1',27),(25,'CO2',28),(26,'CO3',29),(27,'CO4',30);
/*!40000 ALTER TABLE `co_ass` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_exp`
--

LOCK TABLES `co_exp` WRITE;
/*!40000 ALTER TABLE `co_exp` DISABLE KEYS */;
INSERT INTO `co_exp` VALUES (1,'CO3',1),(2,'CO3',1),(3,'CO1',2),(4,'CO3',2),(5,'CO3',2),(6,'CO2',3),(7,'CO1',4),(8,'CO2',5),(9,'CO1',5),(10,'CO1',6),(11,'CO2',7),(12,'CO1',7),(13,'CO3',7),(14,'CO1',8),(15,'CO2',8);
/*!40000 ALTER TABLE `co_exp` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_feedback`
--

LOCK TABLES `co_feedback` WRITE;
/*!40000 ALTER TABLE `co_feedback` DISABLE KEYS */;
INSERT INTO `co_feedback` VALUES (17,'CO1',14),(18,'CO2',14),(19,'CO3',15),(20,'CO4',15),(21,'CO1',16),(22,'CO2',16),(23,'CO3',17),(24,'CO4',17),(25,'CO1',18),(26,'CO1',19),(27,'CO3',19);
/*!40000 ALTER TABLE `co_feedback` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_ia`
--

LOCK TABLES `co_ia` WRITE;
/*!40000 ALTER TABLE `co_ia` DISABLE KEYS */;
/*!40000 ALTER TABLE `co_ia` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_journal`
--

LOCK TABLES `co_journal` WRITE;
/*!40000 ALTER TABLE `co_journal` DISABLE KEYS */;
INSERT INTO `co_journal` VALUES (1,'CO1',1),(2,'CO2',1),(3,'CO4',2),(4,'CO3',2),(5,'CO1',3),(6,'CO2',3);
/*!40000 ALTER TABLE `co_journal` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_majorprosem`
--

LOCK TABLES `co_majorprosem` WRITE;
/*!40000 ALTER TABLE `co_majorprosem` DISABLE KEYS */;
INSERT INTO `co_majorprosem` VALUES (4,'CO1',1),(5,'CO2',1),(6,'CO3',1);
/*!40000 ALTER TABLE `co_majorprosem` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_minipro`
--

LOCK TABLES `co_minipro` WRITE;
/*!40000 ALTER TABLE `co_minipro` DISABLE KEYS */;
INSERT INTO `co_minipro` VALUES (1,'CO1',1);
/*!40000 ALTER TABLE `co_minipro` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_miniproject`
--

LOCK TABLES `co_miniproject` WRITE;
/*!40000 ALTER TABLE `co_miniproject` DISABLE KEYS */;
INSERT INTO `co_miniproject` VALUES (1,'CO1',6),(2,'CO2',6),(3,'CO1',7),(4,'CO1',7),(5,'CO1',7),(6,'CO2',7);
/*!40000 ALTER TABLE `co_miniproject` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_miniprosem`
--

LOCK TABLES `co_miniprosem` WRITE;
/*!40000 ALTER TABLE `co_miniprosem` DISABLE KEYS */;
INSERT INTO `co_miniprosem` VALUES (1,'CO1',1),(2,'CO2',1),(3,'CO1',3),(4,'CO2',3),(5,'CO3',3);
/*!40000 ALTER TABLE `co_miniprosem` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_oralpce`
--

LOCK TABLES `co_oralpce` WRITE;
/*!40000 ALTER TABLE `co_oralpce` DISABLE KEYS */;
INSERT INTO `co_oralpce` VALUES (163,'CO1',3,109),(164,'CO2',3,111),(165,'CO3',3,113),(166,'CO4',3,NULL),(167,'CO5',3,NULL),(168,'CO6',3,NULL),(169,'co1',2,119),(170,'co2',2,121);
/*!40000 ALTER TABLE `co_oralpce` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_po`
--

LOCK TABLES `co_po` WRITE;
/*!40000 ALTER TABLE `co_po` DISABLE KEYS */;
INSERT INTO `co_po` VALUES (1,1,3,NULL,2,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,2,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,14,3,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,15,1,NULL,1,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,16,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,18,2,2,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,19,NULL,NULL,2,NULL,NULL,3,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,20,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,21,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,22,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,23,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,24,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,26,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,5,2,2,3,NULL,NULL,NULL,NULL,2,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,27,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,28,3,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,29,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,30,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `co_po` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_ppt`
--

LOCK TABLES `co_ppt` WRITE;
/*!40000 ALTER TABLE `co_ppt` DISABLE KEYS */;
INSERT INTO `co_ppt` VALUES (7,'CO1',9),(8,'CO2',9),(9,'CO3',9),(10,'CO1',10),(11,'CO2',10),(12,'CO3',10),(13,'CO1',2),(14,'CO2',2),(15,'CO3',2),(16,'CO4',2);
/*!40000 ALTER TABLE `co_ppt` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_report`
--

LOCK TABLES `co_report` WRITE;
/*!40000 ALTER TABLE `co_report` DISABLE KEYS */;
INSERT INTO `co_report` VALUES (9,'CO1',5),(10,'CO2',5),(11,'CO4',5),(12,'CO5',5),(13,'CO1',6),(14,'CO4',6),(15,'CO6',6),(16,'CO1',3),(17,'CO2',3),(18,'CO3',3),(19,'CO4',3);
/*!40000 ALTER TABLE `co_report` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_scilab`
--

LOCK TABLES `co_scilab` WRITE;
/*!40000 ALTER TABLE `co_scilab` DISABLE KEYS */;
INSERT INTO `co_scilab` VALUES (1,'CO1',4),(2,'CO2',4),(3,'CO3',4),(4,'CO1',5),(5,'CO2',5),(6,'CO3',5);
/*!40000 ALTER TABLE `co_scilab` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `co_trade`
--

LOCK TABLES `co_trade` WRITE;
/*!40000 ALTER TABLE `co_trade` DISABLE KEYS */;
INSERT INTO `co_trade` VALUES (1,'CO2',3),(2,'CO3',3),(3,'CO4',4),(4,'CO5',4),(5,'CO1',5),(6,'CO2',5),(7,'CO1',6),(8,'CO2',6),(9,'CO1',7),(10,'CO2',7),(11,'CO1',8),(12,'CO2',8);
/*!40000 ALTER TABLE `co_trade` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `cohort`
--

LOCK TABLES `cohort` WRITE;
/*!40000 ALTER TABLE `cohort` DISABLE KEYS */;
INSERT INTO `cohort` VALUES (1,5,'BE-A',1,7,'Third Year','2023-24','2024-10-12 04:14:49'),(2,5,'TE-A',1,7,'Third Year','2024-25','2024-10-12 04:20:15'),(3,5,'TE-C',1,7,'Third Year','2023-24','2024-10-12 07:22:39'),(4,5,'BE-A',1,7,'Third Year','2023-24','2024-10-12 07:26:10'),(5,5,'TE-Y',4,7,'Third Year','2023-24','2024-10-12 07:31:45'),(7,5,'sdbksfb',1,7,'BE-D','2023-24','2024-10-18 16:27:48');
/*!40000 ALTER TABLE `cohort` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `col_oralpce`
--

LOCK TABLES `col_oralpce` WRITE;
/*!40000 ALTER TABLE `col_oralpce` DISABLE KEYS */;
INSERT INTO `col_oralpce` VALUES (1,'GROUP DISCUSSION',3),(2,'PRESENTATION',3),(3,'GROUP DYNAMIC',3),(7,'kjbkjb',2),(8,'asignment',2),(9,'hchxgxg',2);
/*!40000 ALTER TABLE `col_oralpce` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `combined_attainment`
--

LOCK TABLES `combined_attainment` WRITE;
/*!40000 ALTER TABLE `combined_attainment` DISABLE KEYS */;
INSERT INTO `combined_attainment` VALUES (1,'CO1',76.76,3,3),(2,'CO2',53.25,1,3),(3,'CO4',34,0,4),(4,'CO3',79.34,3,3),(5,'CO4',89.39,3,3),(8,'CO1',55,1,4),(9,'CO1',93.334,3,11),(10,'CO2',95,3,11),(11,'CO3',95,3,11),(12,'CO4',50,1,11);
/*!40000 ALTER TABLE `combined_attainment` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `copo_students_details`
--

LOCK TABLES `copo_students_details` WRITE;
/*!40000 ALTER TABLE `copo_students_details` DISABLE KEYS */;
INSERT INTO `copo_students_details` VALUES (1,'MHATRE JAY H','VU1F2021001',3,'Comps','2023-2024'),(2,'RUPANWAR ROHAN N','VU1F2021002',3,'Comps','2023-2024'),(3,'KSHIRSAGAR VAISHNAVI A','VU1F2021003',3,'Comps','2023-2024'),(4,'TAYARE PRASANNA S','VU1F2021004',3,'Comps','2023-2024'),(5,'SHENOY ADITHYA R','VU1F2021005',3,'Comps','2023-2024'),(6,'KAMAT H*RISHIKESH D,','VU1F2021006',3,'Comps','2023-2024'),(7,'CHORGHE ANURAG B','VU1F2021007',3,'Comps','2023-2024'),(8,'SHARMA SANJEEVKUMAR P','VU1F2021008',3,'Comps','2023-2024'),(9,'TEMKAR PRATHAM K','VU1F2021009',3,'Comps','2023-2024'),(10,'AJMERKAR HRITIK D','VU1F2021010',3,'Comps','2023-2024'),(11,'MONDAL ASHIF Wp','VU1F2021011',3,'Comps','2023-2024'),(12,'LANDE ROHAN R','VU1F2021012',3,'Comps','2023-2024'),(13,'DWIVEDI GAURI V','VU1F2021014',3,'Comps','2023-2024'),(14,'SHAIKH MOHD. SAIF K','VU1F2021015',3,'Comps','2023-2024'),(15,'LOKHANDE HIMANSHU S','VU1F2021016',3,'Comps','2023-2024'),(16,'GHOSALKAR PRATHAM V','VU1F2021017',3,'Comps','2023-2024'),(17,'KHARAT SONALI P','VU1F2021018',3,'Comps','2023-2024'),(18,'WALAWALKAR MUGDHA H','VU1F2021019',3,'Comps','2023-2024'),(19,'VISHE TANAY T','VU1F2021020',3,'Comps','2023-2024'),(20,'MAURYA AKHILESH A','VU1F2021021',3,'Comps','2023-2024'),(21,'ZANJURE SALONI S','VU1F2021022',3,'Comps','2023-2024'),(22,'MAURYA ANURAG O','VU1F2021023',3,'Comps','2023-2024'),(23,'INGALE SAHIL R','VU1F2021024',3,'Comps','2023-2024'),(24,'NAIR KAVYA S','VU1F2021025',3,'Comps','2023-2024'),(25,'SINGH AYUSH M','VU1F2021027',3,'Comps','2023-2024'),(26,'MOLLICK PINKYHATOON I','VU1F2021028',3,'Comps','2023-2024'),(27,'SHAIKH RUKSARBEE Z','VU1F2021029',3,'Comps','2023-2024'),(28,'PATEL AYUSH H','VU1F2021030',3,'Comps','2023-2024'),(29,'KUNTI SHANKENDU S','VU1F2021031',3,'Comps','2023-2024'),(30,'WALUNJ NIKHIL V','VU1F2021032',3,'Comps','2023-2024'),(31,'YADAV SAKSHI S','VU1F2021033',3,'Comps','2023-2024'),(32,'DOMALE NIKITA S','VU1F2021034',3,'Comps','2023-2024'),(33,'KOTIAN MRUNAL J','VU1F2021035',3,'Comps','2023-2024'),(34,'GADE SNEHA V','VU1F2021036',3,'Comps','2023-2024'),(35,'SABLE RAJ U','VU1F2021037',3,'Comps','2023-2024'),(36,'MODI DIVYA D','VU1F2021038',3,'Comps','2023-2024'),(37,'DUBAL RAJ D','VU1F2021039',3,'Comps','2023-2024'),(38,'WAGH PRATHAMESH J','VU1F2021040',3,'Comps','2023-2024'),(39,'YERAM SHUBHAM J','VU1F2021041',3,'Comps','2023-2024'),(40,'THAKUR SAHIL A','VU1F2021042',3,'Comps','2023-2024'),(41,'RAUT TEJAS M','VU1F2021043',3,'Comps','2023-2024'),(42,'KANSE ROHAN S','VU1F2021044',3,'Comps','2023-2024'),(43,'KADGE YASH N','VU1F2021045',3,'Comps','2023-2024'),(44,'SHUKLA ADITYA J','VU1F2021046',3,'Comps','2023-2024'),(45,'PATIL SHRUTI Y','VU1F2021047',3,'Comps','2023-2024'),(46,'MALVIA PRATHAM D','VU1F2021048',3,'Comps','2023-2024'),(47,'KHANVILKAR SANIKA P','VU1F2021049',3,'Comps','2023-2024'),(48,'GAWDE OMKAR A','VU1F2021050',3,'Comps','2023-2024'),(49,'DESHPANDE TUSHAR V','VU1F2021051',3,'Comps','2023-2024'),(50,'MHATRE NABHANGI B','VU1F2021052',3,'Comps','2023-2024'),(51,'DHAVALE SHRINATH S','VU1F2021053',3,'Comps','2023-2024'),(52,'GANJI GIRISH S','VU1F2021054',3,'Comps','2023-2024'),(53,'KATKAR YASH A','VU1F2021055',3,'Comps','2023-2024'),(54,'RAUT NIRAJ Y','VU1F2021056',3,'Comps','2023-2024'),(55,'BHATKAR ANIKET S','VU1F2021057',3,'Comps','2023-2024'),(56,'PILLAMARI PRATHAMESH R','VU1F2021058',3,'Comps','2023-2024'),(57,'MAHAMUNKAR KUNAL H','VU1F2021059',3,'Comps','2023-2024'),(58,'MALKAR YASH P','VU1F2021060',3,'Comps','2023-2024'),(59,'BHUIMBAR RUTIKA R','VU1F2021061',3,'Comps','2023-2024'),(60,'SHINDE ISHWAR S','VU1F2021062',3,'Comps','2023-2024'),(61,'WAYAKOLE VARUN V','VU1F2021063',3,'Comps','2023-2024'),(62,'JADHAV HEENA M','VU1F2021064',3,'Comps','2023-2024'),(63,'SATPUTE SAMARTH V','VU1F2021065',3,'Comps','2023-2024'),(64,'MADANE SHIVPRASAD P','VU1F2021066',3,'Comps','2023-2024'),(65,'PATEL KRUPA G','VU1F2021067',3,'Comps','2023-2024'),(66,'KULE MANASI S','VU1F2021068',3,'Comps','2023-2024'),(67,'CHACHAD HRUDAY P','VU1F2021069',3,'Comps','2023-2024'),(68,'LOKHANDE BHUSHAN P','VU1F2021070',3,'Comps','2023-2024'),(69,'SURYAWANSHI NIKHIL S','VU1F2021071',3,'Comps','2023-2024'),(70,'BHIDE SIKANDAR S','VU1F2021072',3,'Comps','2023-2024'),(71,'ZORE MAKRAND B','VU1F2021073',3,'Comps','2023-2024'),(72,'SAWANT RIYA H','VU1F2021074',3,'Comps','2023-2024'),(73,'KARLE ADITYA R','VU1F2021075',3,'Comps','2023-2024'),(74,'GOVEKAR SHARDUL G','VU1F2021076',3,'Comps','2023-2024'),(75,'GUPTE ARCHIT A','VU1F2021077',3,'Comps','2023-2024'),(76,'YADAV VAIBHAV L','VU1F2021078',3,'Comps','2023-2024'),(77,'SHINDE SURAJ L','VU1F2021079',3,'Comps','2023-2024'),(78,'KUMAVAT CHIRAG M','VU1F2021081',3,'Comps','2023-2024'),(79,'SAWANT ISHAN S','VU1F2021082',3,'Comps','2023-2024'),(80,'Kishanlal Kanojia','VU1F2021083',3,'Comps','2023-2024'),(81,'Rahul Pandit Wagh','VU1F2021084',3,'Comps','2023-2024'),(82,'Saloni Maheshwari','VU1F2021085',3,'Comps','2023-2024'),(83,'Neha Suresh Chaudhari','VU1F2021086',3,'Comps','2023-2024'),(84,'Manoj Uday Sutar','VU1F2021087',3,'Comps','2023-2024'),(85,'Sarvesh Nilwarna','VU1F2021091',3,'Comps','2023-2024'),(86,'Amitabh Howal','VU1F2021092',3,'Comps','2023-2024'),(87,'Aditya Mane','VU1F2021093',3,'Comps','2023-2024'),(88,'Pratik Jadhav','VU1F2021094',3,'Comps','2023-2024'),(89,'Vikas Santosh Mishra','VU1F2021095',3,'Comps','2023-2024'),(90,'Onkar Nitin Kengale','VU1F2021096',3,'Comps','2023-2024'),(91,'Avdhoot Hadke','VU1F2021097',3,'Comps','2023-2024'),(92,'Kaustubh Baban Desai','VU1F2021098',3,'Comps','2023-2024'),(93,'Sonal Ravindra Badapure','VU1F2021099',3,'Comps','2023-2024'),(94,'Suyash Sudam Jadhav','VU1F2021100',3,'Comps','2023-2024'),(95,'Shreya Rajan Gawde','VU1F2021101',3,'Comps','2023-2024'),(96,'Rugved Mahesh Khatu','VU1F2021102',3,'Comps','2023-2024'),(97,'Singh Vansh Sanjeev Kumar','VU1F2021103',3,'Comps','2023-2024'),(98,'Swayam Jilla','VU1F2021104',3,'Comps','2023-2024'),(99,'Dipti Jadhav','VU1F2021105',3,'Comps','2023-2024'),(100,'Arsalan Yar Mohammed Khan','VU1F2021106',3,'Comps','2023-2024'),(101,'Kuldeep Jha','VU1F2021107',3,'Comps','2023-2024'),(102,'Neepun Sunil Patil','VU1F2021108',3,'Comps','2023-2024'),(103,'Shukla Shivam Girijashankar','VU1F2021109',3,'Comps','2023-2024'),(104,'Rohan Haresh Bhatia','VU1F2021110',3,'Comps','2023-2024'),(105,'Kanak Verma','VU1F2021111',3,'Comps','2023-2024'),(106,'Shravankumar Keraram Sirvi','VU1F2021112',3,'Comps','2023-2024'),(107,'Harsh Laxman Navle','VU1F2021113',3,'Comps','2023-2024'),(108,'Adwait Kulkarni','VU1F2021114',3,'Comps','2023-2024'),(109,'Mohd Azharuddin Chaudhary','VU1F2021115',3,'Comps','2023-2024'),(110,'Jagdish Mishra','VU1F2021116',3,'Comps','2023-2024'),(111,'Sakshi Prakash Matkar','VU1F2021118',3,'Comps','2023-2024'),(112,'Harsh Malviya','VU1F2021119',3,'Comps','2023-2024'),(113,'Anurag Waghamare','VU1F2021120',3,'Comps','2023-2024'),(114,'Sayli Balkrishna Shinde','VU1F2021121',3,'Comps','2023-2024'),(115,'Shruti Ramesh Singh','VU1F2021122',3,'Comps','2023-2024'),(116,'Patel Mohd Salman Farooq','VU1F2021123',3,'Comps','2023-2024'),(117,'Yash Shivhare','VU1F2021124',3,'Comps','2023-2024'),(118,'Abhishek Gopale','VU1F2021125',3,'Comps','2023-2024'),(119,'Tanisha Sheth','VU1F2021126',3,'Comps','2023-2024'),(120,'Prathamesh Pandurang Malekar','VU1F2021127',3,'Comps','2023-2024'),(121,'Sakshi Sandeep Manchekar','VU1F2021128',3,'Comps','2023-2024'),(122,'Sahil Dhuri','VU1F2021129',3,'Comps','2023-2024'),(123,'Mayuresh Sachin Ovhal','VU1F2021130',3,'Comps','2023-2024'),(124,'Saransh Yadav','VU1F2021131',3,'Comps','2023-2024'),(125,'Roshan John','VU1F2021132',3,'Comps','2023-2024'),(126,'Vedant Chavan','VU1F2021133',3,'Comps','2023-2024'),(127,'Meghraj Pedsangi','VU1F2021134',3,'Comps','2023-2024'),(128,'Sahil Hemant Khobrekar','VU1F2021135',3,'Comps','2023-2024'),(129,'Kinjal Kumar Dhumal','VU1F2021136',3,'Comps','2023-2024'),(130,'Sahil Kshirsagar','VU1F2021137',3,'Comps','2023-2024'),(131,'Sumeet Sudarshan Patil','VU1F2021138',3,'Comps','2023-2024'),(132,'Aayush Devidas Palande','VU1F2021139',3,'Comps','2023-2024'),(133,'Mohit Natwar Parmar','VU1F2021140',3,'Comps','2023-2024'),(134,'Shreyash Rawate','VU1F2021141',3,'Comps','2023-2024'),(135,'Samant Aman','VU1F1718044',3,'Comps','2023-2024'),(136,'Pal Priya','VU3T1S2021032',3,'Comps','2023-2024'),(137,'Khandagale Kirti Ishwar Chanda','VU1S2122001',3,'Comps','2023-2024'),(138,'Patil Swarup Abhay Medha','VU1S2122002',3,'Comps','2023-2024'),(139,'Nikharge Raj Pranay Pallavi','VU1S2122003',3,'Comps','2023-2024'),(140,'Sheikh Saima Uzair Rehana','VU1S2122004',3,'Comps','2023-2024'),(141,'Kunchal Sejal Rajesh Roja','VU1S2122005',3,'Comps','2023-2024'),(142,'Bidoo Vaishnavi Prakash Prajyoti','VU1S2122006',3,'Comps','2023-2024'),(143,'Mandekar Prathamesh Jitendra Vaishali','VU1S2122007',3,'Comps','2023-2024'),(144,'Sayed Ummerumaan Nasirhusain Ghazala','VU1S2122008',3,'Comps','2023-2024'),(145,'Shaikh Zeib Arif Shaheen','VU1S2122009',3,'Comps','2023-2024'),(146,'Keluskar Nirmitee Giridhar Gayatri','VU1S2122010',3,'Comps','2023-2024'),(147,'Siddiqui Alkasha Tauseef Bilquis','VU1S2122011',3,'Comps','2023-2024'),(148,'Pituk Sakshi Tanaji Anita','VU1S2122012',3,'Comps','2023-2024'),(149,'Badekar Omckar Kiran Sharmila','VU1S2122013',3,'Comps','2023-2024'),(150,'Shinde Janvi  Ravindra Rutuja','VU1S2122014',3,'Comps','2023-2024'),(151,'Shaikh Insha Begum Khaleel Ahmed Hana Banu','VU1S2122015',3,'Comps','2023-2024'),(152,'Raisidam Mahesh Asaram Bharti','VU1S2122016',3,'Comps','2023-2024'),(153,'Jadhav Vanshita Uday Prajakta','VU1S2122017',3,'Comps','2023-2024'),(154,'PATIL AKSHAY S','VU1F2324001',1,'Comps','2023-2024'),(155,'NAIK SNEHAL D','VU1F2324002',1,'Comps','2023-2024'),(156,'PAWAR RAHUL K','VU1F2223003',1,'Comps','2022-2023'),(157,'DESHMUKH PRIYA L','VU1F2223004',1,'Comps','2022-2023'),(158,'RAUT ANAND P','VU1F2122005',1,'Comps','2021-2022'),(159,'KULKARNI ANKIT M','VU1F2122006',1,'Comps','2021-2022'),(160,'JADHAV POOJA S','VU1F2324007',1,'Comps','2023-2024'),(161,'SHAH RISHI A','VU1F2324008',1,'Comps','2023-2024'),(162,'BHOSALE TEJAS R','VU1F2223009',1,'Comps','2022-2023'),(163,'GADGIL VIVEK S','VU1F2223010',1,'Comps','2022-2023'),(164,'GHODKE RUTUJA P','VU1S2324001',2,'IT','2023-2024'),(165,'KALE VIKAS R','VU1S2324002',2,'IT','2023-2024'),(166,'SURYAWANSHI VAIBHAV K','VU1S2223003',2,'IT','2022-2023'),(167,'JOSHI PRANAV S','VU1S2223004',2,'IT','2022-2023'),(168,'MORE MANSI A','VU1S2122005',2,'IT','2021-2022'),(169,'SALUNKHE ARPIT A','VU1A2324001',3,'Aids','2023-2024'),(170,'GAIKWAD NEHA R','VU1A2324002',3,'Aids','2023-2024'),(171,'KAMBLE SHUBHAM P','VU1A2223003',3,'Aids','2022-2023'),(172,'SHINDE SACHIN M','VU1A2223004',3,'Aids','2022-2023'),(173,'NIMBALKAR ROHAN S','VU1A2122005',3,'Aids','2021-2022');
/*!40000 ALTER TABLE `copo_students_details` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `cos`
--

LOCK TABLES `cos` WRITE;
/*!40000 ALTER TABLE `cos` DISABLE KEYS */;
INSERT INTO `cos` VALUES (1,1,'CO1','To acquire fundamental knowledge of developing machine learning models.','2024-07-25 21:38:58'),(2,1,'CO2','To select, apply and evaluate an appropriate machine learning model for the given ','2024-07-25 21:38:58'),(3,1,'CO3','To demonstrate ensemble techniques to combine predictions from different models. ','2024-07-25 21:38:58'),(4,1,'CO4','To demonstrate the dimensionality reduction techniques.','2024-07-25 21:38:58'),(5,3,'CO1','To acquire fundamental knowledge of developing machine learning models.','2024-07-26 16:01:01'),(10,6,'CO1','To acquire fundamental knowledge of developing machine learning models.','2024-08-01 10:51:07'),(11,6,'CO2','To select, apply and evaluate an appropriate machine learning model for the given ','2024-08-01 10:51:07'),(12,6,'CO3','sdvkaj','2024-08-01 10:51:07'),(13,6,'CO4','asfasf','2024-08-01 10:51:07'),(14,8,'CO1','To acquire fundamental knowledge of developing machine learning models.','2024-08-02 14:14:13'),(15,8,'CO2','To select, apply and evaluate an appropriate machine learning model for the given ','2024-08-02 14:14:13'),(16,8,'CO3','5bcnbcc','2024-08-02 14:14:13'),(17,8,'CO4','jhjhc','2024-08-02 14:14:13'),(18,3,'CO2','sdj',NULL),(19,3,'CO3','sddfs',NULL),(20,3,'CO4','sdfsdlka',NULL),(21,9,'CO1','SKHFSKJFH','2024-09-18 00:41:40'),(22,9,'CO2','SKFHSKJD','2024-09-18 00:41:40'),(23,9,'CO3','HFKJSD','2024-09-18 00:41:40'),(24,9,'CO4',',SFHDSKJ','2024-09-18 00:41:40'),(25,9,'CO5','JKFHDSKJ','2024-09-18 00:41:40'),(26,9,'CO6','SDJFHD','2024-09-18 00:41:40'),(27,11,'CO1','To acquire fundamental knowledge of developing machine learning models.','2024-11-05 12:17:42'),(28,11,'CO2','To select, apply and evaluate an appropriate machine learning model for the given ','2024-11-05 12:17:42'),(29,11,'CO3','sdvkaj','2024-11-05 12:17:42'),(30,11,'CO4','sdvkaj','2024-11-05 12:17:42');
/*!40000 ALTER TABLE `cos` ENABLE KEYS */;
UNLOCK TABLES;
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
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'CSC701','Machine Leaning','2024-07-23 16:21:53.442'),(2,'CSC702','Big data Anylytics','2024-07-23 16:21:53.442'),(3,'CSDC7011','Machine Vision','2024-07-23 16:32:08.758'),(4,'CSDC7012','Quantum Computing','2024-07-23 16:32:08.758'),(5,'CSC501','tcs','2024-07-26 16:00:09.693'),(8,'CSC708','demo2','2024-08-01 10:50:23.631'),(9,'CSC705','demo1','2024-08-02 14:13:27.986'),(10,'CSC706','demo','2024-08-02 14:13:27.986'),(11,'ITM601','MiniProject','2024-09-18 00:40:46.263'),(12,'ITP 801','Major project ','2024-09-18 00:42:35.809'),(13,'CSC7012','ML','2024-11-05 12:16:53.349');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (8,3,'Software Engineer',2,'2024-10-27','2024-10-13'),(9,1,'Software Engineer',2,'2024-10-28','2040-08-14'),(10,8,'DBMS',2,'2024-10-28','2025-04-14');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `feedback_attainment`
--

LOCK TABLES `feedback_attainment` WRITE;
/*!40000 ALTER TABLE `feedback_attainment` DISABLE KEYS */;
INSERT INTO `feedback_attainment` VALUES (1,'CO1',100,3,3),(2,'CO2',100,3,3),(3,'CO3',100,3,3),(4,'CO4',100,3,3),(5,'CO1',100,3,3);
/*!40000 ALTER TABLE `feedback_attainment` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `ia1_attainment`
--

LOCK TABLES `ia1_attainment` WRITE;
/*!40000 ALTER TABLE `ia1_attainment` DISABLE KEYS */;
INSERT INTO `ia1_attainment` VALUES (1,'CO1',76.76,3,3),(2,'CO2',20.33,0,3),(3,'CO4',34,NULL,4),(4,'CO1',55,NULL,4),(5,'CO3',79.34,NULL,3),(6,'CO4',89.39,NULL,3),(7,'CO1',66.67,2,11),(8,'CO2',75,3,11),(9,'CO3',75,3,11);
/*!40000 ALTER TABLE `ia1_attainment` ENABLE KEYS */;
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

--
-- Dumping data for table `ia2_attainment`
--

LOCK TABLES `ia2_attainment` WRITE;
/*!40000 ALTER TABLE `ia2_attainment` DISABLE KEYS */;
INSERT INTO `ia2_attainment` VALUES (1,'CO2',86.17,NULL,3),(2,'CO3',79.34,NULL,3),(3,'CO4',89.39,NULL,3),(4,'CO3',100,3,11),(5,'CO4',50,1,11),(6,'CO2',100,3,11),(7,'CO1',100,3,11),(8,'CO3',100,3,11),(9,'CO4',50,1,11),(10,'CO2',100,3,11),(11,'CO1',100,3,11),(12,'CO3',100,3,11),(13,'CO4',50,1,11),(14,'CO2',100,3,11),(15,'CO1',100,3,11),(16,'CO3',100,3,11),(17,'CO4',50,1,11),(18,'CO2',100,3,11),(19,'CO1',100,3,11);
/*!40000 ALTER TABLE `ia2_attainment` ENABLE KEYS */;
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
-- Dumping data for table `lms_activities_file`
--

LOCK TABLES `lms_activities_file` WRITE;
/*!40000 ALTER TABLE `lms_activities_file` DISABLE KEYS */;
INSERT INTO `lms_activities_file` VALUES (1,1,'mysql cmds.docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document',45815,'2024-11-04 07:53:46','/uploads/activities/files-1730706826892-905659478-mysql cmds.docx');
/*!40000 ALTER TABLE `lms_activities_file` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `lms_attendance_students`
--

LOCK TABLES `lms_attendance_students` WRITE;
/*!40000 ALTER TABLE `lms_attendance_students` DISABLE KEYS */;
INSERT INTO `lms_attendance_students` VALUES (1,3,1,NULL),(2,4,1,NULL),(3,3,1,NULL),(4,157,1,NULL),(5,162,1,NULL),(6,163,1,NULL),(7,154,1,NULL),(8,160,1,NULL),(9,1,1,NULL),(10,2,1,NULL),(16,1,2,1),(17,2,2,1),(18,3,2,1),(19,4,2,1),(20,5,2,1),(21,6,2,1),(22,7,2,1),(23,8,2,1),(24,9,2,1),(25,10,2,1),(26,11,2,1),(27,12,2,1),(28,13,2,1),(29,14,2,1),(30,15,2,1),(31,16,2,1),(32,17,2,1),(33,18,2,1),(34,19,2,1),(35,20,2,1),(36,21,2,1),(37,22,2,1),(38,23,2,1),(39,24,2,1),(40,25,2,1),(41,26,2,1),(42,27,2,1),(43,28,2,1),(44,29,2,1),(45,30,2,1),(46,31,2,1),(47,32,2,1),(48,33,2,1),(49,34,2,1),(50,35,2,1),(51,36,2,1),(52,37,2,1),(53,38,2,1),(54,39,2,1),(55,40,2,1),(56,41,2,1),(57,42,2,1),(58,43,2,1),(59,44,2,1),(60,45,2,1),(61,46,2,1),(62,47,2,1),(63,48,2,1),(64,49,2,1),(65,50,2,1),(66,51,2,1),(67,52,2,1),(68,53,2,1),(69,54,2,1),(70,55,2,1),(71,56,2,1),(72,57,2,1),(73,58,2,1),(74,59,2,1),(75,60,2,1),(76,61,2,1),(77,62,2,1),(78,63,2,1),(79,64,2,1),(80,65,2,1),(81,66,2,1),(82,67,2,1),(83,68,2,1),(84,69,2,1),(85,70,2,1),(86,71,2,1),(87,72,2,1),(88,73,2,1),(89,74,2,1),(90,75,2,1),(91,76,2,1),(92,77,2,1),(93,78,2,1),(94,79,2,1),(95,80,2,1),(96,81,2,1),(97,82,2,1),(98,83,2,1),(99,84,2,1),(100,85,2,1),(101,86,2,1),(102,87,2,1),(103,88,2,1),(104,89,2,1),(105,90,2,1),(106,91,2,1),(107,92,2,1),(108,93,2,1),(109,94,2,1),(110,95,2,1),(111,96,2,1),(112,97,2,1),(113,98,2,1),(114,99,2,1),(115,100,2,1),(116,101,2,1),(117,102,2,1),(118,103,2,1),(119,104,2,1),(120,105,2,1),(121,106,2,1),(122,107,2,1),(123,108,2,1),(124,109,2,1),(125,110,2,1),(126,111,2,1),(127,112,2,1),(128,113,2,1),(129,114,2,1),(130,115,2,1),(131,116,2,1),(132,117,2,1),(133,118,2,1),(134,119,2,1),(135,120,2,1),(136,121,2,1),(137,122,2,1),(138,123,2,1),(139,124,2,1),(140,125,2,1),(141,126,2,1),(142,127,2,1),(143,128,2,1),(144,129,2,1),(145,130,2,1),(146,131,2,1),(147,132,2,1),(148,133,2,1),(149,134,2,1),(150,135,2,1),(151,136,2,1),(152,137,2,1),(153,138,2,1),(154,139,2,1),(155,140,2,1),(156,141,2,1),(157,142,2,1),(158,143,2,1),(159,144,2,1),(160,145,2,1),(161,146,2,1),(162,147,2,1),(163,148,2,1),(164,149,2,1),(165,150,2,1),(166,151,2,1),(167,152,2,1),(168,153,2,0),(271,1,3,NULL),(272,2,3,NULL),(273,3,3,NULL),(274,4,3,NULL),(275,5,3,NULL),(276,6,3,NULL),(277,7,3,NULL),(278,8,3,NULL),(279,9,3,NULL),(280,10,3,NULL),(281,11,3,NULL),(282,12,3,NULL),(283,13,3,NULL),(284,14,3,NULL),(285,15,3,NULL),(286,16,3,NULL),(287,17,3,NULL),(288,18,3,NULL),(289,19,3,NULL),(290,20,3,NULL),(291,21,3,NULL),(292,22,3,NULL),(293,23,3,NULL),(294,24,3,NULL),(295,25,3,NULL),(296,26,3,NULL),(297,27,3,NULL),(298,28,3,NULL),(299,29,3,NULL),(300,30,3,NULL),(301,31,3,NULL),(302,32,3,NULL),(303,33,3,NULL),(304,34,3,NULL),(305,35,3,NULL),(306,36,3,NULL),(307,37,3,NULL),(308,38,3,NULL),(309,39,3,NULL),(310,40,3,NULL),(311,41,3,NULL),(312,42,3,NULL),(313,43,3,NULL),(314,44,3,NULL),(315,45,3,NULL),(316,46,3,NULL),(317,47,3,NULL),(318,48,3,NULL),(319,49,3,NULL),(320,50,3,NULL),(321,51,3,NULL),(322,52,3,NULL),(323,53,3,NULL),(324,54,3,NULL),(325,55,3,NULL),(326,56,3,NULL),(327,57,3,NULL),(328,58,3,NULL),(329,59,3,NULL),(330,60,3,NULL),(331,61,3,NULL),(332,62,3,NULL),(333,63,3,NULL),(334,64,3,NULL),(335,65,3,NULL),(336,66,3,NULL),(337,67,3,NULL),(338,68,3,NULL),(339,69,3,NULL),(340,70,3,NULL),(341,71,3,NULL),(342,72,3,NULL),(343,73,3,NULL),(344,74,3,NULL),(345,75,3,NULL),(346,76,3,NULL),(347,77,3,NULL),(348,78,3,NULL),(349,79,3,NULL),(350,80,3,NULL),(351,81,3,NULL),(352,82,3,NULL),(353,83,3,NULL),(354,84,3,NULL),(355,85,3,NULL),(356,86,3,NULL),(357,87,3,NULL),(358,88,3,NULL),(359,89,3,NULL),(360,90,3,NULL),(361,91,3,NULL),(362,92,3,NULL),(363,93,3,NULL),(364,94,3,NULL),(365,95,3,NULL),(366,96,3,NULL),(367,97,3,NULL),(368,98,3,NULL),(369,99,3,NULL),(370,100,3,NULL),(371,101,3,NULL),(372,102,3,NULL),(373,103,3,NULL),(374,104,3,NULL),(375,105,3,NULL),(376,106,3,NULL),(377,107,3,NULL),(378,108,3,NULL),(379,109,3,NULL),(380,110,3,NULL),(381,111,3,NULL),(382,112,3,NULL),(383,113,3,NULL),(384,114,3,NULL),(385,115,3,NULL),(386,116,3,NULL),(387,117,3,NULL),(388,118,3,NULL),(389,119,3,NULL),(390,120,3,NULL),(391,121,3,NULL),(392,122,3,NULL),(393,123,3,NULL),(394,124,3,NULL),(395,125,3,NULL),(396,126,3,NULL),(397,127,3,NULL),(398,128,3,NULL),(399,129,3,NULL),(400,130,3,NULL),(401,131,3,NULL),(402,132,3,NULL),(403,133,3,NULL),(404,134,3,NULL),(405,135,3,NULL),(406,136,3,NULL),(407,137,3,NULL),(408,138,3,NULL),(409,139,3,NULL),(410,140,3,NULL),(411,141,3,NULL),(412,142,3,NULL),(413,143,3,NULL),(414,144,3,NULL),(415,145,3,NULL),(416,146,3,NULL),(417,147,3,NULL),(418,148,3,NULL),(419,149,3,NULL),(420,150,3,NULL),(421,151,3,NULL),(422,152,3,NULL),(423,153,3,NULL),(526,1,4,NULL),(527,2,4,NULL),(528,3,4,NULL),(529,4,4,NULL),(530,5,4,NULL),(531,6,4,NULL),(532,7,4,NULL),(533,8,4,NULL),(534,9,4,NULL),(535,10,4,NULL),(536,11,4,NULL),(537,12,4,NULL),(538,13,4,NULL),(539,14,4,NULL),(540,15,4,NULL),(541,16,4,NULL),(542,17,4,NULL),(543,18,4,NULL),(544,19,4,NULL),(545,20,4,NULL),(546,21,4,NULL),(547,22,4,NULL),(548,23,4,NULL),(549,24,4,NULL),(550,25,4,NULL),(551,26,4,NULL),(552,27,4,NULL),(553,28,4,NULL),(554,29,4,NULL),(555,30,4,NULL),(556,31,4,NULL),(557,32,4,NULL),(558,33,4,NULL),(559,34,4,NULL),(560,35,4,NULL),(561,36,4,NULL),(562,37,4,NULL),(563,38,4,NULL),(564,39,4,NULL),(565,40,4,NULL),(566,41,4,NULL),(567,42,4,NULL),(568,43,4,NULL),(569,44,4,NULL),(570,45,4,NULL),(571,46,4,NULL),(572,47,4,NULL),(573,48,4,NULL),(574,49,4,NULL),(575,50,4,NULL),(576,51,4,NULL),(577,52,4,NULL),(578,53,4,NULL),(579,54,4,NULL),(580,55,4,NULL),(581,56,4,NULL),(582,57,4,NULL),(583,58,4,NULL),(584,59,4,NULL),(585,60,4,NULL),(586,61,4,NULL),(587,62,4,NULL),(588,63,4,NULL),(589,64,4,NULL),(590,65,4,NULL),(591,66,4,NULL),(592,67,4,NULL),(593,68,4,NULL),(594,69,4,NULL),(595,70,4,NULL),(596,71,4,NULL),(597,72,4,NULL),(598,73,4,NULL),(599,74,4,NULL),(600,75,4,NULL),(601,76,4,NULL),(602,77,4,NULL),(603,78,4,NULL),(604,79,4,NULL),(605,80,4,NULL),(606,81,4,NULL),(607,82,4,NULL),(608,83,4,NULL),(609,84,4,NULL),(610,85,4,NULL),(611,86,4,NULL),(612,87,4,NULL),(613,88,4,NULL),(614,89,4,NULL),(615,90,4,NULL),(616,91,4,NULL),(617,92,4,NULL),(618,93,4,NULL),(619,94,4,NULL),(620,95,4,NULL),(621,96,4,NULL),(622,97,4,NULL),(623,98,4,NULL),(624,99,4,NULL),(625,100,4,NULL),(626,101,4,NULL),(627,102,4,NULL),(628,103,4,NULL),(629,104,4,NULL),(630,105,4,NULL),(631,106,4,NULL),(632,107,4,NULL),(633,108,4,NULL),(634,109,4,NULL),(635,110,4,NULL),(636,111,4,NULL),(637,112,4,NULL),(638,113,4,NULL),(639,114,4,NULL),(640,115,4,NULL),(641,116,4,NULL),(642,117,4,NULL),(643,118,4,NULL),(644,119,4,NULL),(645,120,4,NULL),(646,121,4,NULL),(647,122,4,NULL),(648,123,4,NULL),(649,124,4,NULL),(650,125,4,NULL),(651,126,4,NULL),(652,127,4,NULL),(653,128,4,NULL),(654,129,4,NULL),(655,130,4,NULL),(656,131,4,NULL),(657,132,4,NULL),(658,133,4,NULL),(659,134,4,NULL),(660,135,4,NULL),(661,136,4,NULL),(662,137,4,NULL),(663,138,4,NULL),(664,139,4,NULL),(665,140,4,NULL),(666,141,4,NULL),(667,142,4,NULL),(668,143,4,NULL),(669,144,4,NULL),(670,145,4,NULL),(671,146,4,NULL),(672,147,4,NULL),(673,148,4,NULL),(674,149,4,NULL),(675,150,4,NULL),(676,151,4,NULL),(677,152,4,NULL),(678,153,4,NULL),(781,3,5,1),(782,4,5,1),(783,3,5,1),(784,157,5,1),(785,162,5,1),(786,163,5,1),(787,154,5,1),(788,160,5,1),(789,1,5,1),(790,2,5,1),(796,1,6,1),(797,2,6,1),(798,3,6,1),(799,4,6,1),(800,5,6,1),(801,6,6,1),(802,7,6,1),(803,8,6,1),(804,9,6,1),(805,10,6,1),(806,11,6,1),(807,12,6,1),(808,13,6,1),(809,14,6,1),(810,15,6,1),(811,16,6,1),(812,17,6,1),(813,18,6,1),(814,19,6,1),(815,20,6,1),(816,21,6,1),(817,22,6,1),(818,23,6,1),(819,24,6,1),(820,25,6,1),(821,26,6,1),(822,27,6,1),(823,28,6,1),(824,29,6,1),(825,30,6,1),(826,31,6,1),(827,32,6,1),(828,33,6,1),(829,34,6,1),(830,35,6,1),(831,36,6,1),(832,37,6,1),(833,38,6,1),(834,39,6,1),(835,40,6,1),(836,41,6,1),(837,42,6,1),(838,43,6,1),(839,44,6,1),(840,45,6,1),(841,46,6,1),(842,47,6,1),(843,48,6,1),(844,49,6,1),(845,50,6,1),(846,51,6,1),(847,52,6,1),(848,53,6,1),(849,54,6,1),(850,55,6,1),(851,56,6,1),(852,57,6,1),(853,58,6,1),(854,59,6,1),(855,60,6,1),(856,61,6,1),(857,62,6,1),(858,63,6,1),(859,64,6,1),(860,65,6,1),(861,66,6,1),(862,67,6,1),(863,68,6,1),(864,69,6,1),(865,70,6,1),(866,71,6,1),(867,72,6,1),(868,73,6,1),(869,74,6,1),(870,75,6,1),(871,76,6,1),(872,77,6,1),(873,78,6,1),(874,79,6,1),(875,80,6,1),(876,81,6,1),(877,82,6,1),(878,83,6,1),(879,84,6,1),(880,85,6,1),(881,86,6,1),(882,87,6,1),(883,88,6,1),(884,89,6,1),(885,90,6,1),(886,91,6,1),(887,92,6,1),(888,93,6,1),(889,94,6,1),(890,95,6,1),(891,96,6,1),(892,97,6,1),(893,98,6,1),(894,99,6,1),(895,100,6,1),(896,101,6,1),(897,102,6,1),(898,103,6,1),(899,104,6,1),(900,105,6,1),(901,106,6,1),(902,107,6,1),(903,108,6,1),(904,109,6,1),(905,110,6,1),(906,111,6,1),(907,112,6,1),(908,113,6,1),(909,114,6,1),(910,115,6,1),(911,116,6,1),(912,117,6,1),(913,118,6,1),(914,119,6,1),(915,120,6,1),(916,121,6,1),(917,122,6,1),(918,123,6,1),(919,124,6,1),(920,125,6,1),(921,126,6,1),(922,127,6,1),(923,128,6,1),(924,129,6,1),(925,130,6,1),(926,131,6,1),(927,132,6,1),(928,133,6,1),(929,134,6,1),(930,135,6,1),(931,136,6,1),(932,137,6,1),(933,138,6,1),(934,139,6,1),(935,140,6,1),(936,141,6,1),(937,142,6,1),(938,143,6,1),(939,144,6,1),(940,145,6,1),(941,146,6,1),(942,147,6,1),(943,148,6,1),(944,149,6,1),(945,150,6,1),(946,151,6,1),(947,152,6,1),(948,153,6,0),(1051,1,7,NULL),(1052,2,7,NULL),(1053,3,7,NULL),(1054,4,7,NULL),(1055,5,7,NULL),(1056,6,7,NULL),(1057,7,7,NULL),(1058,8,7,NULL),(1059,9,7,NULL),(1060,10,7,NULL),(1061,11,7,NULL),(1062,12,7,NULL),(1063,13,7,NULL),(1064,14,7,NULL),(1065,15,7,NULL),(1066,16,7,NULL),(1067,17,7,NULL),(1068,18,7,NULL),(1069,19,7,NULL),(1070,20,7,NULL),(1071,21,7,NULL),(1072,22,7,NULL),(1073,23,7,NULL),(1074,24,7,NULL),(1075,25,7,NULL),(1076,26,7,NULL),(1077,27,7,NULL),(1078,28,7,NULL),(1079,29,7,NULL),(1080,30,7,NULL),(1081,31,7,NULL),(1082,32,7,NULL),(1083,33,7,NULL),(1084,34,7,NULL),(1085,35,7,NULL),(1086,36,7,NULL),(1087,37,7,NULL),(1088,38,7,NULL),(1089,39,7,NULL),(1090,40,7,NULL),(1091,41,7,NULL),(1092,42,7,NULL),(1093,43,7,NULL),(1094,44,7,NULL),(1095,45,7,NULL),(1096,46,7,NULL),(1097,47,7,NULL),(1098,48,7,NULL),(1099,49,7,NULL),(1100,50,7,NULL),(1101,51,7,NULL),(1102,52,7,NULL),(1103,53,7,NULL),(1104,54,7,NULL),(1105,55,7,NULL),(1106,56,7,NULL),(1107,57,7,NULL),(1108,58,7,NULL),(1109,59,7,NULL),(1110,60,7,NULL),(1111,61,7,NULL),(1112,62,7,NULL),(1113,63,7,NULL),(1114,64,7,NULL),(1115,65,7,NULL),(1116,66,7,NULL),(1117,67,7,NULL),(1118,68,7,NULL),(1119,69,7,NULL),(1120,70,7,NULL),(1121,71,7,NULL),(1122,72,7,NULL),(1123,73,7,NULL),(1124,74,7,NULL),(1125,75,7,NULL),(1126,76,7,NULL),(1127,77,7,NULL),(1128,78,7,NULL),(1129,79,7,NULL),(1130,80,7,NULL),(1131,81,7,NULL),(1132,82,7,NULL),(1133,83,7,NULL),(1134,84,7,NULL),(1135,85,7,NULL),(1136,86,7,NULL),(1137,87,7,NULL),(1138,88,7,NULL),(1139,89,7,NULL),(1140,90,7,NULL),(1141,91,7,NULL),(1142,92,7,NULL),(1143,93,7,NULL),(1144,94,7,NULL),(1145,95,7,NULL),(1146,96,7,NULL),(1147,97,7,NULL),(1148,98,7,NULL),(1149,99,7,NULL),(1150,100,7,NULL),(1151,101,7,NULL),(1152,102,7,NULL),(1153,103,7,NULL),(1154,104,7,NULL),(1155,105,7,NULL),(1156,106,7,NULL),(1157,107,7,NULL),(1158,108,7,NULL),(1159,109,7,NULL),(1160,110,7,NULL),(1161,111,7,NULL),(1162,112,7,NULL),(1163,113,7,NULL),(1164,114,7,NULL),(1165,115,7,NULL),(1166,116,7,NULL),(1167,117,7,NULL),(1168,118,7,NULL),(1169,119,7,NULL),(1170,120,7,NULL),(1171,121,7,NULL),(1172,122,7,NULL),(1173,123,7,NULL),(1174,124,7,NULL),(1175,125,7,NULL),(1176,126,7,NULL),(1177,127,7,NULL),(1178,128,7,NULL),(1179,129,7,NULL),(1180,130,7,NULL),(1181,131,7,NULL),(1182,132,7,NULL),(1183,133,7,NULL),(1184,134,7,NULL),(1185,135,7,NULL),(1186,136,7,NULL),(1187,137,7,NULL),(1188,138,7,NULL),(1189,139,7,NULL),(1190,140,7,NULL),(1191,141,7,NULL),(1192,142,7,NULL),(1193,143,7,NULL),(1194,144,7,NULL),(1195,145,7,NULL),(1196,146,7,NULL),(1197,147,7,NULL),(1198,148,7,NULL),(1199,149,7,NULL),(1200,150,7,NULL),(1201,151,7,NULL),(1202,152,7,NULL),(1203,153,7,NULL),(1306,1,8,NULL),(1307,2,8,NULL),(1308,3,8,NULL),(1309,4,8,NULL),(1310,5,8,NULL),(1311,6,8,NULL),(1312,7,8,NULL),(1313,8,8,NULL),(1314,9,8,NULL),(1315,10,8,NULL),(1316,11,8,NULL),(1317,12,8,NULL),(1318,13,8,NULL),(1319,14,8,NULL),(1320,15,8,NULL),(1321,16,8,NULL),(1322,17,8,NULL),(1323,18,8,NULL),(1324,19,8,NULL),(1325,20,8,NULL),(1326,21,8,NULL),(1327,22,8,NULL),(1328,23,8,NULL),(1329,24,8,NULL),(1330,25,8,NULL),(1331,26,8,NULL),(1332,27,8,NULL),(1333,28,8,NULL),(1334,29,8,NULL),(1335,30,8,NULL),(1336,31,8,NULL),(1337,32,8,NULL),(1338,33,8,NULL),(1339,34,8,NULL),(1340,35,8,NULL),(1341,36,8,NULL),(1342,37,8,NULL),(1343,38,8,NULL),(1344,39,8,NULL),(1345,40,8,NULL),(1346,41,8,NULL),(1347,42,8,NULL),(1348,43,8,NULL),(1349,44,8,NULL),(1350,45,8,NULL),(1351,46,8,NULL),(1352,47,8,NULL),(1353,48,8,NULL),(1354,49,8,NULL),(1355,50,8,NULL),(1356,51,8,NULL),(1357,52,8,NULL),(1358,53,8,NULL),(1359,54,8,NULL),(1360,55,8,NULL),(1361,56,8,NULL),(1362,57,8,NULL),(1363,58,8,NULL),(1364,59,8,NULL),(1365,60,8,NULL),(1366,61,8,NULL),(1367,62,8,NULL),(1368,63,8,NULL),(1369,64,8,NULL),(1370,65,8,NULL),(1371,66,8,NULL),(1372,67,8,NULL),(1373,68,8,NULL),(1374,69,8,NULL),(1375,70,8,NULL),(1376,71,8,NULL),(1377,72,8,NULL),(1378,73,8,NULL),(1379,74,8,NULL),(1380,75,8,NULL),(1381,76,8,NULL),(1382,77,8,NULL),(1383,78,8,NULL),(1384,79,8,NULL),(1385,80,8,NULL),(1386,81,8,NULL),(1387,82,8,NULL),(1388,83,8,NULL),(1389,84,8,NULL),(1390,85,8,NULL),(1391,86,8,NULL),(1392,87,8,NULL),(1393,88,8,NULL),(1394,89,8,NULL),(1395,90,8,NULL),(1396,91,8,NULL),(1397,92,8,NULL),(1398,93,8,NULL),(1399,94,8,NULL),(1400,95,8,NULL),(1401,96,8,NULL),(1402,97,8,NULL),(1403,98,8,NULL),(1404,99,8,NULL),(1405,100,8,NULL),(1406,101,8,NULL),(1407,102,8,NULL),(1408,103,8,NULL),(1409,104,8,NULL),(1410,105,8,NULL),(1411,106,8,NULL),(1412,107,8,NULL),(1413,108,8,NULL),(1414,109,8,NULL),(1415,110,8,NULL),(1416,111,8,NULL),(1417,112,8,NULL),(1418,113,8,NULL),(1419,114,8,NULL),(1420,115,8,NULL),(1421,116,8,NULL),(1422,117,8,NULL),(1423,118,8,NULL),(1424,119,8,NULL),(1425,120,8,NULL),(1426,121,8,NULL),(1427,122,8,NULL),(1428,123,8,NULL),(1429,124,8,NULL),(1430,125,8,NULL),(1431,126,8,NULL),(1432,127,8,NULL),(1433,128,8,NULL),(1434,129,8,NULL),(1435,130,8,NULL),(1436,131,8,NULL),(1437,132,8,NULL),(1438,133,8,NULL),(1439,134,8,NULL),(1440,135,8,NULL),(1441,136,8,NULL),(1442,137,8,NULL),(1443,138,8,NULL),(1444,139,8,NULL),(1445,140,8,NULL),(1446,141,8,NULL),(1447,142,8,NULL),(1448,143,8,NULL),(1449,144,8,NULL),(1450,145,8,NULL),(1451,146,8,NULL),(1452,147,8,NULL),(1453,148,8,NULL),(1454,149,8,NULL),(1455,150,8,NULL),(1456,151,8,NULL),(1457,152,8,NULL),(1458,153,8,NULL),(1561,1,9,NULL),(1562,2,9,NULL),(1563,3,9,NULL),(1564,4,9,NULL),(1565,5,9,NULL),(1566,6,9,NULL),(1567,7,9,NULL),(1568,8,9,NULL),(1569,9,9,NULL),(1570,10,9,NULL),(1571,11,9,NULL),(1572,12,9,NULL),(1573,13,9,NULL),(1574,14,9,NULL),(1575,15,9,NULL),(1576,16,9,NULL),(1577,17,9,NULL),(1578,18,9,NULL),(1579,19,9,NULL),(1580,20,9,NULL),(1581,21,9,NULL),(1582,22,9,NULL),(1583,23,9,NULL),(1584,24,9,NULL),(1585,25,9,NULL),(1586,26,9,NULL),(1587,27,9,NULL),(1588,28,9,NULL),(1589,29,9,NULL),(1590,30,9,NULL),(1591,31,9,NULL),(1592,32,9,NULL),(1593,33,9,NULL),(1594,34,9,NULL),(1595,35,9,NULL),(1596,36,9,NULL),(1597,37,9,NULL),(1598,38,9,NULL),(1599,39,9,NULL),(1600,40,9,NULL),(1601,41,9,NULL),(1602,42,9,NULL),(1603,43,9,NULL),(1604,44,9,NULL),(1605,45,9,NULL),(1606,46,9,NULL),(1607,47,9,NULL),(1608,48,9,NULL),(1609,49,9,NULL),(1610,50,9,NULL),(1611,51,9,NULL),(1612,52,9,NULL),(1613,53,9,NULL),(1614,54,9,NULL),(1615,55,9,NULL),(1616,56,9,NULL),(1617,57,9,NULL),(1618,58,9,NULL),(1619,59,9,NULL),(1620,60,9,NULL),(1621,61,9,NULL),(1622,62,9,NULL),(1623,63,9,NULL),(1624,64,9,NULL),(1625,65,9,NULL),(1626,66,9,NULL),(1627,67,9,NULL),(1628,68,9,NULL),(1629,69,9,NULL),(1630,70,9,NULL),(1631,71,9,NULL),(1632,72,9,NULL),(1633,73,9,NULL),(1634,74,9,NULL),(1635,75,9,NULL),(1636,76,9,NULL),(1637,77,9,NULL),(1638,78,9,NULL),(1639,79,9,NULL),(1640,80,9,NULL),(1641,81,9,NULL),(1642,82,9,NULL),(1643,83,9,NULL),(1644,84,9,NULL),(1645,85,9,NULL),(1646,86,9,NULL),(1647,87,9,NULL),(1648,88,9,NULL),(1649,89,9,NULL),(1650,90,9,NULL),(1651,91,9,NULL),(1652,92,9,NULL),(1653,93,9,NULL),(1654,94,9,NULL),(1655,95,9,NULL),(1656,96,9,NULL),(1657,97,9,NULL),(1658,98,9,NULL),(1659,99,9,NULL),(1660,100,9,NULL),(1661,101,9,NULL),(1662,102,9,NULL),(1663,103,9,NULL),(1664,104,9,NULL),(1665,105,9,NULL),(1666,106,9,NULL),(1667,107,9,NULL),(1668,108,9,NULL),(1669,109,9,NULL),(1670,110,9,NULL),(1671,111,9,NULL),(1672,112,9,NULL),(1673,113,9,NULL),(1674,114,9,NULL),(1675,115,9,NULL),(1676,116,9,NULL),(1677,117,9,NULL),(1678,118,9,NULL),(1679,119,9,NULL),(1680,120,9,NULL),(1681,121,9,NULL),(1682,122,9,NULL),(1683,123,9,NULL),(1684,124,9,NULL),(1685,125,9,NULL),(1686,126,9,NULL),(1687,127,9,NULL),(1688,128,9,NULL),(1689,129,9,NULL),(1690,130,9,NULL),(1691,131,9,NULL),(1692,132,9,NULL),(1693,133,9,NULL),(1694,134,9,NULL),(1695,135,9,NULL),(1696,136,9,NULL),(1697,137,9,NULL),(1698,138,9,NULL),(1699,139,9,NULL),(1700,140,9,NULL),(1701,141,9,NULL),(1702,142,9,NULL),(1703,143,9,NULL),(1704,144,9,NULL),(1705,145,9,NULL),(1706,146,9,NULL),(1707,147,9,NULL),(1708,148,9,NULL),(1709,149,9,NULL),(1710,150,9,NULL),(1711,151,9,NULL),(1712,152,9,NULL),(1713,153,9,NULL),(1816,1,10,NULL),(1817,2,10,NULL),(1818,3,10,NULL),(1819,4,10,NULL),(1820,5,10,NULL),(1821,6,10,NULL),(1822,7,10,NULL),(1823,8,10,NULL),(1824,9,10,NULL),(1825,10,10,NULL),(1826,11,10,NULL),(1827,12,10,NULL),(1828,13,10,NULL),(1829,14,10,NULL),(1830,15,10,NULL),(1831,16,10,NULL),(1832,17,10,NULL),(1833,18,10,NULL),(1834,19,10,NULL),(1835,20,10,NULL),(1836,21,10,NULL),(1837,22,10,NULL),(1838,23,10,NULL),(1839,24,10,NULL),(1840,25,10,NULL),(1841,26,10,NULL),(1842,27,10,NULL),(1843,28,10,NULL),(1844,29,10,NULL),(1845,30,10,NULL),(1846,31,10,NULL),(1847,32,10,NULL),(1848,33,10,NULL),(1849,34,10,NULL),(1850,35,10,NULL),(1851,36,10,NULL),(1852,37,10,NULL),(1853,38,10,NULL),(1854,39,10,NULL),(1855,40,10,NULL),(1856,41,10,NULL),(1857,42,10,NULL),(1858,43,10,NULL),(1859,44,10,NULL),(1860,45,10,NULL),(1861,46,10,NULL),(1862,47,10,NULL),(1863,48,10,NULL),(1864,49,10,NULL),(1865,50,10,NULL),(1866,51,10,NULL),(1867,52,10,NULL),(1868,53,10,NULL),(1869,54,10,NULL),(1870,55,10,NULL),(1871,56,10,NULL),(1872,57,10,NULL),(1873,58,10,NULL),(1874,59,10,NULL),(1875,60,10,NULL),(1876,61,10,NULL),(1877,62,10,NULL),(1878,63,10,NULL),(1879,64,10,NULL),(1880,65,10,NULL),(1881,66,10,NULL),(1882,67,10,NULL),(1883,68,10,NULL),(1884,69,10,NULL),(1885,70,10,NULL),(1886,71,10,NULL),(1887,72,10,NULL),(1888,73,10,NULL),(1889,74,10,NULL),(1890,75,10,NULL),(1891,76,10,NULL),(1892,77,10,NULL),(1893,78,10,NULL),(1894,79,10,NULL),(1895,80,10,NULL),(1896,81,10,NULL),(1897,82,10,NULL),(1898,83,10,NULL),(1899,84,10,NULL),(1900,85,10,NULL),(1901,86,10,NULL),(1902,87,10,NULL),(1903,88,10,NULL),(1904,89,10,NULL),(1905,90,10,NULL),(1906,91,10,NULL),(1907,92,10,NULL),(1908,93,10,NULL),(1909,94,10,NULL),(1910,95,10,NULL),(1911,96,10,NULL),(1912,97,10,NULL),(1913,98,10,NULL),(1914,99,10,NULL),(1915,100,10,NULL),(1916,101,10,NULL),(1917,102,10,NULL),(1918,103,10,NULL),(1919,104,10,NULL),(1920,105,10,NULL),(1921,106,10,NULL),(1922,107,10,NULL),(1923,108,10,NULL),(1924,109,10,NULL),(1925,110,10,NULL),(1926,111,10,NULL),(1927,112,10,NULL),(1928,113,10,NULL),(1929,114,10,NULL),(1930,115,10,NULL),(1931,116,10,NULL),(1932,117,10,NULL),(1933,118,10,NULL),(1934,119,10,NULL),(1935,120,10,NULL),(1936,121,10,NULL),(1937,122,10,NULL),(1938,123,10,NULL),(1939,124,10,NULL),(1940,125,10,NULL),(1941,126,10,NULL),(1942,127,10,NULL),(1943,128,10,NULL),(1944,129,10,NULL),(1945,130,10,NULL),(1946,131,10,NULL),(1947,132,10,NULL),(1948,133,10,NULL),(1949,134,10,NULL),(1950,135,10,NULL),(1951,136,10,NULL),(1952,137,10,NULL),(1953,138,10,NULL),(1954,139,10,NULL),(1955,140,10,NULL),(1956,141,10,NULL),(1957,142,10,NULL),(1958,143,10,NULL),(1959,144,10,NULL),(1960,145,10,NULL),(1961,146,10,NULL),(1962,147,10,NULL),(1963,148,10,NULL),(1964,149,10,NULL),(1965,150,10,NULL),(1966,151,10,NULL),(1967,152,10,NULL),(1968,153,10,NULL),(2071,1,11,NULL),(2072,2,11,NULL),(2073,3,11,NULL),(2074,4,11,NULL),(2075,5,11,NULL),(2076,6,11,NULL),(2077,7,11,NULL),(2078,8,11,NULL),(2079,9,11,NULL),(2080,10,11,NULL),(2081,11,11,NULL),(2082,12,11,NULL),(2083,13,11,NULL),(2084,14,11,NULL),(2085,15,11,NULL),(2086,16,11,NULL),(2087,17,11,NULL),(2088,18,11,NULL),(2089,19,11,NULL),(2090,20,11,NULL),(2091,21,11,NULL),(2092,22,11,NULL),(2093,23,11,NULL),(2094,24,11,NULL),(2095,25,11,NULL),(2096,26,11,NULL),(2097,27,11,NULL),(2098,28,11,NULL),(2099,29,11,NULL),(2100,30,11,NULL),(2101,31,11,NULL),(2102,32,11,NULL),(2103,33,11,NULL),(2104,34,11,NULL),(2105,35,11,NULL),(2106,36,11,NULL),(2107,37,11,NULL),(2108,38,11,NULL),(2109,39,11,NULL),(2110,40,11,NULL),(2111,41,11,NULL),(2112,42,11,NULL),(2113,43,11,NULL),(2114,44,11,NULL),(2115,45,11,NULL),(2116,46,11,NULL),(2117,47,11,NULL),(2118,48,11,NULL),(2119,49,11,NULL),(2120,50,11,NULL),(2121,51,11,NULL),(2122,52,11,NULL),(2123,53,11,NULL),(2124,54,11,NULL),(2125,55,11,NULL),(2126,56,11,NULL),(2127,57,11,NULL),(2128,58,11,NULL),(2129,59,11,NULL),(2130,60,11,NULL),(2131,61,11,NULL),(2132,62,11,NULL),(2133,63,11,NULL),(2134,64,11,NULL),(2135,65,11,NULL),(2136,66,11,NULL),(2137,67,11,NULL),(2138,68,11,NULL),(2139,69,11,NULL),(2140,70,11,NULL),(2141,71,11,NULL),(2142,72,11,NULL),(2143,73,11,NULL),(2144,74,11,NULL),(2145,75,11,NULL),(2146,76,11,NULL),(2147,77,11,NULL),(2148,78,11,NULL),(2149,79,11,NULL),(2150,80,11,NULL),(2151,81,11,NULL),(2152,82,11,NULL),(2153,83,11,NULL),(2154,84,11,NULL),(2155,85,11,NULL),(2156,86,11,NULL),(2157,87,11,NULL),(2158,88,11,NULL),(2159,89,11,NULL),(2160,90,11,NULL),(2161,91,11,NULL),(2162,92,11,NULL),(2163,93,11,NULL),(2164,94,11,NULL),(2165,95,11,NULL),(2166,96,11,NULL),(2167,97,11,NULL),(2168,98,11,NULL),(2169,99,11,NULL),(2170,100,11,NULL),(2171,101,11,NULL),(2172,102,11,NULL),(2173,103,11,NULL),(2174,104,11,NULL),(2175,105,11,NULL),(2176,106,11,NULL),(2177,107,11,NULL),(2178,108,11,NULL),(2179,109,11,NULL),(2180,110,11,NULL),(2181,111,11,NULL),(2182,112,11,NULL),(2183,113,11,NULL),(2184,114,11,NULL),(2185,115,11,NULL),(2186,116,11,NULL),(2187,117,11,NULL),(2188,118,11,NULL),(2189,119,11,NULL),(2190,120,11,NULL),(2191,121,11,NULL),(2192,122,11,NULL),(2193,123,11,NULL),(2194,124,11,NULL),(2195,125,11,NULL),(2196,126,11,NULL),(2197,127,11,NULL),(2198,128,11,NULL),(2199,129,11,NULL),(2200,130,11,NULL),(2201,131,11,NULL),(2202,132,11,NULL),(2203,133,11,NULL),(2204,134,11,NULL),(2205,135,11,NULL),(2206,136,11,NULL),(2207,137,11,NULL),(2208,138,11,NULL),(2209,139,11,NULL),(2210,140,11,NULL),(2211,141,11,NULL),(2212,142,11,NULL),(2213,143,11,NULL),(2214,144,11,NULL),(2215,145,11,NULL),(2216,146,11,NULL),(2217,147,11,NULL),(2218,148,11,NULL),(2219,149,11,NULL),(2220,150,11,NULL),(2221,151,11,NULL),(2222,152,11,NULL),(2223,153,11,NULL);
/*!40000 ALTER TABLE `lms_attendance_students` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `lms_students`
--

LOCK TABLES `lms_students` WRITE;
/*!40000 ALTER TABLE `lms_students` DISABLE KEYS */;
INSERT INTO `lms_students` VALUES (1,'VU1F2021001','MHATRE JAY H',5,'Comps','vu1f2021001@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(2,'VU1F2021002','RUPANWAR ROHAN N',5,'Comps','vu1f2021002@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(3,'VU1F2021003','KSHIRSAGAR VAISHNAVI A',5,'Comps','vu1f2021003@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(4,'VU1F2021004','TAYARE PRASANNA S',5,'Comps','vu1f2021004@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(5,'VU1F2021005','SHENOY ADITHYA R',5,'Comps','vu1f2021005@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(6,'VU1F2021006','KAMAT H*RISHIKESH D,',5,'Comps','vu1f2021006@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(7,'VU1F2021007','CHORGHE ANURAG B',5,'Comps','vu1f2021007@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(8,'VU1F2021008','SHARMA SANJEEVKUMAR P',5,'Comps','vu1f2021008@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(9,'VU1F2021009','TEMKAR PRATHAM K',5,'Comps','vu1f2021009@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(10,'VU1F2021010','AJMERKAR HRITIK D',5,'Comps','vu1f2021010@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(11,'VU1F2021011','MONDAL ASHIF Wp',5,'Comps','vu1f2021011@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(12,'VU1F2021012','LANDE ROHAN R',5,'Comps','vu1f2021012@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(13,'VU1F2021014','DWIVEDI GAURI V',5,'Comps','vu1f2021014@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(14,'VU1F2021015','SHAIKH MOHD. SAIF K',5,'Comps','vu1f2021015@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(15,'VU1F2021016','LOKHANDE HIMANSHU S',5,'Comps','vu1f2021016@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(16,'VU1F2021017','GHOSALKAR PRATHAM V',5,'Comps','vu1f2021017@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(17,'VU1F2021018','KHARAT SONALI P',5,'Comps','vu1f2021018@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(18,'VU1F2021019','WALAWALKAR MUGDHA H',5,'Comps','vu1f2021019@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(19,'VU1F2021020','VISHE TANAY T',5,'Comps','vu1f2021020@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(20,'VU1F2021021','MAURYA AKHILESH A',5,'Comps','vu1f2021021@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(21,'VU1F2021022','ZANJURE SALONI S',5,'Comps','vu1f2021022@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(22,'VU1F2021023','MAURYA ANURAG O',5,'Comps','vu1f2021023@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(23,'VU1F2021024','INGALE SAHIL R',5,'Comps','vu1f2021024@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(24,'VU1F2021025','NAIR KAVYA S',5,'Comps','vu1f2021025@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(25,'VU1F2021027','SINGH AYUSH M',5,'Comps','vu1f2021027@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(26,'VU1F2021028','MOLLICK PINKYHATOON I',5,'Comps','vu1f2021028@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(27,'VU1F2021029','SHAIKH RUKSARBEE Z',5,'Comps','vu1f2021029@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(28,'VU1F2021030','PATEL AYUSH H',5,'Comps','vu1f2021030@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(29,'VU1F2021031','KUNTI SHANKENDU S',5,'Comps','vu1f2021031@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(30,'VU1F2021032','WALUNJ NIKHIL V',5,'Comps','vu1f2021032@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(31,'VU1F2021033','YADAV SAKSHI S',5,'Comps','vu1f2021033@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(32,'VU1F2021034','DOMALE NIKITA S',5,'Comps','vu1f2021034@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(33,'VU1F2021035','KOTIAN MRUNAL J',5,'Comps','vu1f2021035@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(34,'VU1F2021036','GADE SNEHA V',5,'Comps','vu1f2021036@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(35,'VU1F2021037','SABLE RAJ U',5,'Comps','vu1f2021037@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(36,'VU1F2021038','MODI DIVYA D',5,'Comps','vu1f2021038@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(37,'VU1F2021039','DUBAL RAJ D',5,'Comps','vu1f2021039@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(38,'VU1F2021040','WAGH PRATHAMESH J',5,'Comps','vu1f2021040@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(39,'VU1F2021041','YERAM SHUBHAM J',5,'Comps','vu1f2021041@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(40,'VU1F2021042','THAKUR SAHIL A',5,'Comps','vu1f2021042@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(41,'VU1F2021043','RAUT TEJAS M',5,'Comps','vu1f2021043@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(42,'VU1F2021044','KANSE ROHAN S',5,'Comps','vu1f2021044@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(43,'VU1F2021045','KADGE YASH N',5,'Comps','vu1f2021045@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(44,'VU1F2021046','SHUKLA ADITYA J',5,'Comps','vu1f2021046@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(45,'VU1F2021047','PATIL SHRUTI Y',5,'Comps','vu1f2021047@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(46,'VU1F2021048','MALVIA PRATHAM D',5,'Comps','vu1f2021048@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(47,'VU1F2021049','KHANVILKAR SANIKA P',5,'Comps','vu1f2021049@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(48,'VU1F2021050','GAWDE OMKAR A',5,'Comps','vu1f2021050@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(49,'VU1F2021051','DESHPANDE TUSHAR V',5,'Comps','vu1f2021051@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(50,'VU1F2021052','MHATRE NABHANGI B',5,'Comps','vu1f2021052@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(51,'VU1F2021053','DHAVALE SHRINATH S',5,'Comps','vu1f2021053@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(52,'VU1F2021054','GANJI GIRISH S',5,'Comps','vu1f2021054@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(53,'VU1F2021055','KATKAR YASH A',5,'Comps','vu1f2021055@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(54,'VU1F2021056','RAUT NIRAJ Y',5,'Comps','vu1f2021056@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(55,'VU1F2021057','BHATKAR ANIKET S',5,'Comps','vu1f2021057@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(56,'VU1F2021058','PILLAMARI PRATHAMESH R',5,'Comps','vu1f2021058@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(57,'VU1F2021059','MAHAMUNKAR KUNAL H',5,'Comps','vu1f2021059@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(58,'VU1F2021060','MALKAR YASH P',5,'Comps','vu1f2021060@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(59,'VU1F2021061','BHUIMBAR RUTIKA R',5,'Comps','vu1f2021061@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(60,'VU1F2021062','SHINDE ISHWAR S',5,'Comps','vu1f2021062@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(61,'VU1F2021063','WAYAKOLE VARUN V',5,'Comps','vu1f2021063@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(62,'VU1F2021064','JADHAV HEENA M',5,'Comps','vu1f2021064@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(63,'VU1F2021065','SATPUTE SAMARTH V',5,'Comps','vu1f2021065@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(64,'VU1F2021066','MADANE SHIVPRASAD P',5,'Comps','vu1f2021066@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(65,'VU1F2021067','PATEL KRUPA G',5,'Comps','vu1f2021067@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(66,'VU1F2021068','KULE MANASI S',5,'Comps','vu1f2021068@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(67,'VU1F2021069','CHACHAD HRUDAY P',5,'Comps','vu1f2021069@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(68,'VU1F2021070','LOKHANDE BHUSHAN P',5,'Comps','vu1f2021070@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(69,'VU1F2021071','SURYAWANSHI NIKHIL S',5,'Comps','vu1f2021071@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(70,'VU1F2021072','BHIDE SIKANDAR S',5,'Comps','vu1f2021072@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(71,'VU1F2021073','ZORE MAKRAND B',5,'Comps','vu1f2021073@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(72,'VU1F2021074','SAWANT RIYA H',5,'Comps','vu1f2021074@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(73,'VU1F2021075','KARLE ADITYA R',5,'Comps','vu1f2021075@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(74,'VU1F2021076','GOVEKAR SHARDUL G',5,'Comps','vu1f2021076@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(75,'VU1F2021077','GUPTE ARCHIT A',5,'Comps','vu1f2021077@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(76,'VU1F2021078','YADAV VAIBHAV L',5,'Comps','vu1f2021078@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(77,'VU1F2021079','SHINDE SURAJ L',5,'Comps','vu1f2021079@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(78,'VU1F2021081','KUMAVAT CHIRAG M',5,'Comps','vu1f2021081@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(79,'VU1F2021082','SAWANT ISHAN S',5,'Comps','vu1f2021082@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(80,'VU1F2021083','Kishanlal Kanojia',5,'Comps','vu1f2021083@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(81,'VU1F2021084','Rahul Pandit Wagh',5,'Comps','vu1f2021084@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(82,'VU1F2021085','Saloni Maheshwari',5,'Comps','vu1f2021085@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(83,'VU1F2021086','Neha Suresh Chaudhari',5,'Comps','vu1f2021086@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(84,'VU1F2021087','Manoj Uday Sutar',5,'Comps','vu1f2021087@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(85,'VU1F2021091','Sarvesh Nilwarna',5,'Comps','vu1f2021091@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(86,'VU1F2021092','Amitabh Howal',5,'Comps','vu1f2021092@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(87,'VU1F2021093','Aditya Mane',5,'Comps','vu1f2021093@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(88,'VU1F2021094','Pratik Jadhav',5,'Comps','vu1f2021094@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(89,'VU1F2021095','Vikas Santosh Mishra',5,'Comps','vu1f2021095@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(90,'VU1F2021096','Onkar Nitin Kengale',5,'Comps','vu1f2021096@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(91,'VU1F2021097','Avdhoot Hadke',5,'Comps','vu1f2021097@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(92,'VU1F2021098','Kaustubh Baban Desai',5,'Comps','vu1f2021098@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(93,'VU1F2021099','Sonal Ravindra Badapure',5,'Comps','vu1f2021099@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(94,'VU1F2021100','Suyash Sudam Jadhav',5,'Comps','vu1f2021100@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(95,'VU1F2021101','Shreya Rajan Gawde',5,'Comps','vu1f2021101@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(96,'VU1F2021102','Rugved Mahesh Khatu',5,'Comps','vu1f2021102@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(97,'VU1F2021103','Singh Vansh Sanjeev Kumar',5,'Comps','vu1f2021103@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(98,'VU1F2021104','Swayam Jilla',5,'Comps','vu1f2021104@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(99,'VU1F2021105','Dipti Jadhav',5,'Comps','vu1f2021105@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(100,'VU1F2021106','Arsalan Yar Mohammed Khan',5,'Comps','vu1f2021106@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(101,'VU1F2021107','Kuldeep Jha',5,'Comps','vu1f2021107@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(102,'VU1F2021108','Neepun Sunil Patil',5,'Comps','vu1f2021108@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(103,'VU1F2021109','Shukla Shivam Girijashankar',5,'Comps','vu1f2021109@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(104,'VU1F2021110','Rohan Haresh Bhatia',5,'Comps','vu1f2021110@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(105,'VU1F2021111','Kanak Verma',5,'Comps','vu1f2021111@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(106,'VU1F2021112','Shravankumar Keraram Sirvi',5,'Comps','vu1f2021112@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(107,'VU1F2021113','Harsh Laxman Navle',5,'Comps','vu1f2021113@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(108,'VU1F2021114','Adwait Kulkarni',5,'Comps','vu1f2021114@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(109,'VU1F2021115','Mohd Azharuddin Chaudhary',5,'Comps','vu1f2021115@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(110,'VU1F2021116','Jagdish Mishra',5,'Comps','vu1f2021116@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(111,'VU1F2021118','Sakshi Prakash Matkar',5,'Comps','vu1f2021118@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(112,'VU1F2021119','Harsh Malviya',5,'Comps','vu1f2021119@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(113,'VU1F2021120','Anurag Waghamare',5,'Comps','vu1f2021120@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(114,'VU1F2021121','Sayli Balkrishna Shinde',5,'Comps','vu1f2021121@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(115,'VU1F2021122','Shruti Ramesh Singh',5,'Comps','vu1f2021122@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(116,'VU1F2021123','Patel Mohd Salman Farooq',5,'Comps','vu1f2021123@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(117,'VU1F2021124','Yash Shivhare',5,'Comps','vu1f2021124@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(118,'VU1F2021125','Abhishek Gopale',5,'Comps','vu1f2021125@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(119,'VU1F2021126','Tanisha Sheth',5,'Comps','vu1f2021126@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(120,'VU1F2021127','Prathamesh Pandurang Malekar',5,'Comps','vu1f2021127@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(121,'VU1F2021128','Sakshi Sandeep Manchekar',5,'Comps','vu1f2021128@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(122,'VU1F2021129','Sahil Dhuri',5,'Comps','vu1f2021129@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(123,'VU1F2021130','Mayuresh Sachin Ovhal',5,'Comps','vu1f2021130@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(124,'VU1F2021131','Saransh Yadav',5,'Comps','vu1f2021131@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(125,'VU1F2021132','Roshan John',5,'Comps','vu1f2021132@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(126,'VU1F2021133','Vedant Chavan',5,'Comps','vu1f2021133@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(127,'VU1F2021134','Meghraj Pedsangi',5,'Comps','vu1f2021134@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(128,'VU1F2021135','Sahil Hemant Khobrekar',5,'Comps','vu1f2021135@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(129,'VU1F2021136','Kinjal Kumar Dhumal',5,'Comps','vu1f2021136@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(130,'VU1F2021137','Sahil Kshirsagar',5,'Comps','vu1f2021137@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(131,'VU1F2021138','Sumeet Sudarshan Patil',5,'Comps','vu1f2021138@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(132,'VU1F2021139','Aayush Devidas Palande',5,'Comps','vu1f2021139@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(133,'VU1F2021140','Mohit Natwar Parmar',5,'Comps','vu1f2021140@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(134,'VU1F2021141','Shreyash Rawate',5,'Comps','vu1f2021141@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(135,'VU1F1718044','Samant Aman',5,'Comps','vu1f1718044@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(136,'VU3T1S2021032','Pal Priya',5,'Comps','vu3t1s2021032@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(137,'VU1S2122001','Khandagale Kirti Ishwar Chanda',5,'Comps','vu1s2122001@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(138,'VU1S2122002','Patil Swarup Abhay Medha',5,'Comps','vu1s2122002@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(139,'VU1S2122003','Nikharge Raj Pranay Pallavi',5,'Comps','vu1s2122003@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(140,'VU1S2122004','Sheikh Saima Uzair Rehana',5,'Comps','vu1s2122004@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(141,'VU1S2122005','Kunchal Sejal Rajesh Roja',5,'Comps','vu1s2122005@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(142,'VU1S2122006','Bidoo Vaishnavi Prakash Prajyoti',5,'Comps','vu1s2122006@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(143,'VU1S2122007','Mandekar Prathamesh Jitendra Vaishali',5,'Comps','vu1s2122007@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(144,'VU1S2122008','Sayed Ummerumaan Nasirhusain Ghazala',5,'Comps','vu1s2122008@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(145,'VU1S2122009','Shaikh Zeib Arif Shaheen',5,'Comps','vu1s2122009@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(146,'VU1S2122010','Keluskar Nirmitee Giridhar Gayatri',5,'Comps','vu1s2122010@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(147,'VU1S2122011','Siddiqui Alkasha Tauseef Bilquis',5,'Comps','vu1s2122011@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(148,'VU1S2122012','Pituk Sakshi Tanaji Anita',5,'Comps','vu1s2122012@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(149,'VU1S2122013','Badekar Omckar Kiran Sharmila',5,'Comps','vu1s2122013@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(150,'VU1S2122014','Shinde Janvi  Ravindra Rutuja',5,'Comps','vu1s2122014@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(151,'VU1S2122015','Shaikh Insha Begum Khaleel Ahmed Hana Banu',5,'Comps','vu1s2122015@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(152,'VU1S2122016','Raisidam Mahesh Asaram Bharti',5,'Comps','vu1s2122016@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(153,'VU1S2122017','Jadhav Vanshita Uday Prajakta',5,'Comps','vu1s2122017@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(154,'VU1F2324001','PATIL AKSHAY S',7,'Comps','vu1f2324001@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(155,'VU1F2324002','NAIK SNEHAL D',8,'Comps','vu1f2324002@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(156,'VU1F2223003','PAWAR RAHUL K',7,'Comps','vu1f2223003@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2022-2023'),(157,'VU1F2223004','DESHMUKH PRIYA L',8,'Comps','vu1f2223004@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2022-2023'),(158,'VU1F2122005','RAUT ANAND P',7,'Comps','vu1f2122005@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2021-2022'),(159,'VU1F2122006','KULKARNI ANKIT M',8,'Comps','vu1f2122006@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2021-2022'),(160,'VU1F2324007','JADHAV POOJA S',7,'Comps','vu1f2324007@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(161,'VU1F2324008','SHAH RISHI A',8,'Comps','vu1f2324008@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(162,'VU1F2223009','BHOSALE TEJAS R',7,'Comps','vu1f2223009@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2022-2023'),(163,'VU1F2223010','GADGIL VIVEK S',8,'Comps','vu1f2223010@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2022-2023'),(164,'VU1S2324001','GHODKE RUTUJA P',7,'IT','vu1s2324001@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(165,'VU1S2324002','KALE VIKAS R',8,'IT','vu1s2324002@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(166,'VU1S2223003','SURYAWANSHI VAIBHAV K',7,'IT','vu1s2223003@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2022-2023'),(167,'VU1S2223004','JOSHI PRANAV S',8,'IT','vu1s2223004@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2022-2023'),(168,'VU1S2122005','MORE MANSI A',7,'IT','vu1s2122005@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2021-2022'),(169,'VU1A2324001','SALUNKHE ARPIT A',8,'Aids','vu1a2324001@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(170,'VU1A2324002','GAIKWAD NEHA R',7,'Aids','vu1a2324002@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2023-2024'),(171,'VU1A2223003','KAMBLE SHUBHAM P',8,'Aids','vu1a2223003@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2022-2023'),(172,'VU1A2223004','SHINDE SACHIN M',7,'Aids','vu1a2223004@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2022-2023'),(173,'VU1A2122005','NIMBALKAR ROHAN S',8,'Aids','vu1a2122005@pvppcoe.ac.in','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K','2021-2022');
/*!40000 ALTER TABLE `lms_students` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `lmsactivities`
--

LOCK TABLES `lmsactivities` WRITE;
/*!40000 ALTER TABLE `lmsactivities` DISABLE KEYS */;
INSERT INTO `lmsactivities` VALUES (1,3,5,'zkdvbalskdfa','asfknalskfnal','pdf,docx,zip,png,jpg,pptx,txt',10240,'2024-11-04 07:53:46','2024-11-04 13:59:00');
/*!40000 ALTER TABLE `lmsactivities` ENABLE KEYS */;
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
-- Dumping data for table `logbook`
--

LOCK TABLES `logbook` WRITE;
/*!40000 ALTER TABLE `logbook` DISABLE KEYS */;
/*!40000 ALTER TABLE `logbook` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_atten`
--

LOCK TABLES `main_atten` WRITE;
/*!40000 ALTER TABLE `main_atten` DISABLE KEYS */;
INSERT INTO `main_atten` VALUES (256,3,1,2),(257,3,2,2),(258,3,3,2),(259,3,4,2),(260,3,5,2),(261,3,6,2),(262,3,7,2),(263,3,8,2),(264,3,9,2),(265,3,10,2),(266,3,11,2),(267,3,12,2),(268,3,13,2),(269,3,14,2),(270,3,15,2),(271,3,16,2),(272,3,17,2),(273,3,18,2),(274,3,19,2),(275,3,20,2),(276,3,21,2),(277,3,22,2),(278,3,23,2),(279,3,24,2),(280,3,25,2),(281,3,26,2),(282,3,27,2),(283,3,28,2),(284,3,29,2),(285,3,30,2),(286,3,31,2),(287,3,32,2),(288,3,33,2),(289,3,34,2),(290,3,35,2),(291,3,36,2),(292,3,37,2),(293,3,38,2),(294,3,39,2),(295,3,40,2),(296,3,41,2),(297,3,42,2),(298,3,43,2),(299,3,44,2),(300,3,45,2),(301,3,46,2),(302,3,47,2),(303,3,48,2),(304,3,49,2),(305,3,50,2),(306,3,51,2),(307,3,52,2),(308,3,53,2),(309,3,54,2),(310,3,55,2),(311,3,56,2),(312,3,57,2),(313,3,58,2),(314,3,59,2),(315,3,60,2),(316,3,61,2),(317,3,62,2),(318,3,63,2),(319,3,64,2),(320,3,65,2),(321,3,66,2),(322,3,67,2),(323,3,68,2),(324,3,69,2),(325,3,70,2),(326,3,71,2),(327,3,72,2),(328,3,73,2),(329,3,74,2),(330,3,75,2),(331,3,76,2),(332,3,77,2),(333,3,78,2),(334,3,79,2),(335,3,80,2),(336,3,81,2),(337,3,82,2),(338,3,83,2),(339,3,84,2),(340,3,85,2),(341,3,86,2),(342,3,87,2),(343,3,88,2),(344,3,89,2),(345,3,90,2),(346,3,91,2),(347,3,92,2),(348,3,93,2),(349,3,94,2),(350,3,95,2),(351,3,96,2),(352,3,97,2),(353,3,98,2),(354,3,99,2),(355,3,100,2),(356,3,101,2),(357,3,102,2),(358,3,103,2),(359,3,104,2),(360,3,105,2),(361,3,106,2),(362,3,107,2),(363,3,108,2),(364,3,109,2),(365,3,110,2),(366,3,111,2),(367,3,112,2),(368,3,113,2),(369,3,114,2),(370,3,115,2),(371,3,116,2),(372,3,117,2),(373,3,118,2),(374,3,119,2),(375,3,120,2),(376,3,121,2),(377,3,122,2),(378,3,123,2),(379,3,124,2),(380,3,125,2),(381,3,126,2),(382,3,127,2),(383,3,128,2),(384,3,129,2),(385,3,130,2),(386,3,131,2),(387,3,132,2),(388,3,133,2),(389,3,134,2),(390,3,135,2),(391,3,136,2),(392,3,137,2),(393,3,138,2),(394,3,139,2),(395,3,140,2),(396,3,141,2),(397,3,142,2),(398,3,143,2),(399,3,144,2),(400,3,145,2),(401,3,146,2),(402,3,147,2),(403,3,148,2),(404,3,149,2),(405,3,150,2),(406,3,151,2),(407,3,152,2),(408,3,153,2),(409,3,1,NULL),(410,3,2,NULL),(411,3,3,NULL),(412,3,4,NULL),(413,3,5,NULL),(414,3,6,NULL),(415,3,7,NULL),(416,3,8,NULL),(417,3,9,NULL),(418,3,10,NULL),(419,3,11,NULL),(420,3,12,NULL),(421,3,13,NULL),(422,3,14,NULL),(423,3,15,NULL),(424,3,16,NULL),(425,3,17,NULL),(426,3,18,NULL),(427,3,19,NULL),(428,3,20,NULL),(429,3,21,NULL),(430,3,22,NULL),(431,3,23,NULL),(432,3,24,NULL),(433,3,25,NULL),(434,3,26,NULL),(435,3,27,NULL),(436,3,28,NULL),(437,3,29,NULL),(438,3,30,NULL),(439,3,31,NULL),(440,3,32,NULL),(441,3,33,NULL),(442,3,34,NULL),(443,3,35,NULL),(444,3,36,NULL),(445,3,37,NULL),(446,3,38,NULL),(447,3,39,NULL),(448,3,40,NULL),(449,3,41,NULL),(450,3,42,NULL),(451,3,43,NULL),(452,3,44,NULL),(453,3,45,NULL),(454,3,46,NULL),(455,3,47,NULL),(456,3,48,NULL),(457,3,49,NULL),(458,3,50,NULL),(459,3,51,NULL),(460,3,52,NULL),(461,3,53,NULL),(462,3,54,NULL),(463,3,55,NULL),(464,3,56,NULL),(465,3,57,NULL),(466,3,58,NULL),(467,3,59,NULL),(468,3,60,NULL),(469,3,61,NULL),(470,3,62,NULL),(471,3,63,NULL),(472,3,64,NULL),(473,3,65,NULL),(474,3,66,NULL),(475,3,67,NULL),(476,3,68,NULL),(477,3,69,NULL),(478,3,70,NULL),(479,3,71,NULL),(480,3,72,NULL),(481,3,73,NULL),(482,3,74,NULL),(483,3,75,NULL),(484,3,76,NULL),(485,3,77,NULL),(486,3,78,NULL),(487,3,79,NULL),(488,3,80,NULL),(489,3,81,NULL),(490,3,82,NULL),(491,3,83,NULL),(492,3,84,NULL),(493,3,85,NULL),(494,3,86,NULL),(495,3,87,NULL),(496,3,88,NULL),(497,3,89,NULL),(498,3,90,NULL),(499,3,91,NULL),(500,3,92,NULL),(501,3,93,NULL),(502,3,94,NULL),(503,3,95,NULL),(504,3,96,NULL),(505,3,97,NULL),(506,3,98,NULL),(507,3,99,NULL),(508,3,100,NULL),(509,3,101,NULL),(510,3,102,NULL),(511,3,103,NULL),(512,3,104,NULL),(513,3,105,NULL),(514,3,106,NULL),(515,3,107,NULL),(516,3,108,NULL),(517,3,109,NULL),(518,3,110,NULL),(519,3,111,NULL),(520,3,112,NULL),(521,3,113,NULL),(522,3,114,NULL),(523,3,115,NULL),(524,3,116,NULL),(525,3,117,NULL),(526,3,118,NULL),(527,3,119,NULL),(528,3,120,NULL),(529,3,121,NULL),(530,3,122,NULL),(531,3,123,NULL),(532,3,124,NULL),(533,3,125,NULL),(534,3,126,NULL),(535,3,127,NULL),(536,3,128,NULL),(537,3,129,NULL),(538,3,130,NULL),(539,3,131,NULL),(540,3,132,NULL),(541,3,133,NULL),(542,3,134,NULL),(543,3,135,NULL),(544,3,136,NULL),(545,3,137,NULL),(546,3,138,NULL),(547,3,139,NULL),(548,3,140,NULL),(549,3,141,NULL),(550,3,142,NULL),(551,3,143,NULL),(552,3,144,NULL),(553,3,145,NULL),(554,3,146,NULL),(555,3,147,NULL),(556,3,148,NULL),(557,3,149,NULL),(558,3,150,NULL),(559,3,151,NULL),(560,3,152,NULL),(561,3,153,NULL),(562,3,1,NULL),(563,3,2,NULL),(564,3,3,NULL),(565,3,4,NULL),(566,3,5,NULL),(567,3,6,NULL),(568,3,7,NULL),(569,3,8,NULL),(570,3,9,NULL),(571,3,10,NULL),(572,3,11,NULL),(573,3,12,NULL),(574,3,13,NULL),(575,3,14,NULL),(576,3,15,NULL),(577,3,16,NULL),(578,3,17,NULL),(579,3,18,NULL),(580,3,19,NULL),(581,3,20,NULL),(582,3,21,NULL),(583,3,22,NULL),(584,3,23,NULL),(585,3,24,NULL),(586,3,25,NULL),(587,3,26,NULL),(588,3,27,NULL),(589,3,28,NULL),(590,3,29,NULL),(591,3,30,NULL),(592,3,31,NULL),(593,3,32,NULL),(594,3,33,NULL),(595,3,34,NULL),(596,3,35,NULL),(597,3,36,NULL),(598,3,37,NULL),(599,3,38,NULL),(600,3,39,NULL),(601,3,40,NULL),(602,3,41,NULL),(603,3,42,NULL),(604,3,43,NULL),(605,3,44,NULL),(606,3,45,NULL),(607,3,46,NULL),(608,3,47,NULL),(609,3,48,NULL),(610,3,49,NULL),(611,3,50,NULL),(612,3,51,NULL),(613,3,52,NULL),(614,3,53,NULL),(615,3,54,NULL),(616,3,55,NULL),(617,3,56,NULL),(618,3,57,NULL),(619,3,58,NULL),(620,3,59,NULL),(621,3,60,NULL),(622,3,61,NULL),(623,3,62,NULL),(624,3,63,NULL),(625,3,64,NULL),(626,3,65,NULL),(627,3,66,NULL),(628,3,67,NULL),(629,3,68,NULL),(630,3,69,NULL),(631,3,70,NULL),(632,3,71,NULL),(633,3,72,NULL),(634,3,73,NULL),(635,3,74,NULL),(636,3,75,NULL),(637,3,76,NULL),(638,3,77,NULL),(639,3,78,NULL),(640,3,79,NULL),(641,3,80,NULL),(642,3,81,NULL),(643,3,82,NULL),(644,3,83,NULL),(645,3,84,NULL),(646,3,85,NULL),(647,3,86,NULL),(648,3,87,NULL),(649,3,88,NULL),(650,3,89,NULL),(651,3,90,NULL),(652,3,91,NULL),(653,3,92,NULL),(654,3,93,NULL),(655,3,94,NULL),(656,3,95,NULL),(657,3,96,NULL),(658,3,97,NULL),(659,3,98,NULL),(660,3,99,NULL),(661,3,100,NULL),(662,3,101,NULL),(663,3,102,NULL),(664,3,103,NULL),(665,3,104,NULL),(666,3,105,NULL),(667,3,106,NULL),(668,3,107,NULL),(669,3,108,NULL),(670,3,109,NULL),(671,3,110,NULL),(672,3,111,NULL),(673,3,112,NULL),(674,3,113,NULL),(675,3,114,NULL),(676,3,115,NULL),(677,3,116,NULL),(678,3,117,NULL),(679,3,118,NULL),(680,3,119,NULL),(681,3,120,NULL),(682,3,121,NULL),(683,3,122,NULL),(684,3,123,NULL),(685,3,124,NULL),(686,3,125,NULL),(687,3,126,NULL),(688,3,127,NULL),(689,3,128,NULL),(690,3,129,NULL),(691,3,130,NULL),(692,3,131,NULL),(693,3,132,NULL),(694,3,133,NULL),(695,3,134,NULL),(696,3,135,NULL),(697,3,136,NULL),(698,3,137,NULL),(699,3,138,NULL),(700,3,139,NULL),(701,3,140,NULL),(702,3,141,NULL),(703,3,142,NULL),(704,3,143,NULL),(705,3,144,NULL),(706,3,145,NULL),(707,3,146,NULL),(708,3,147,NULL),(709,3,148,NULL),(710,3,149,NULL),(711,3,150,NULL),(712,3,151,NULL),(713,3,152,NULL),(714,3,153,NULL),(715,3,1,NULL),(716,3,1,NULL),(717,3,2,NULL),(718,3,3,NULL),(719,3,4,NULL),(720,3,5,NULL),(721,3,6,NULL),(722,3,7,NULL),(723,3,8,NULL),(724,3,9,NULL),(725,3,10,NULL),(726,3,11,NULL),(727,3,12,NULL),(728,3,13,NULL),(729,3,14,NULL),(730,3,15,NULL),(731,3,16,NULL),(732,3,17,NULL),(733,3,18,NULL),(734,3,19,NULL),(735,3,20,NULL),(736,3,21,NULL),(737,3,22,NULL),(738,3,23,NULL),(739,3,24,NULL),(740,3,25,NULL),(741,3,26,NULL),(742,3,27,NULL),(743,3,28,NULL),(744,3,29,NULL),(745,3,30,NULL),(746,3,31,NULL),(747,3,32,NULL),(748,3,33,NULL),(749,3,34,NULL),(750,3,35,NULL),(751,3,36,NULL),(752,3,37,NULL),(753,3,38,NULL),(754,3,39,NULL),(755,3,40,NULL),(756,3,41,NULL),(757,3,42,NULL),(758,3,43,NULL),(759,3,44,NULL),(760,3,45,NULL),(761,3,46,NULL),(762,3,47,NULL),(763,3,48,NULL),(764,3,49,NULL),(765,3,50,NULL),(766,3,51,NULL),(767,3,52,NULL),(768,3,53,NULL),(769,3,54,NULL),(770,3,55,NULL),(771,3,56,NULL),(772,3,57,NULL),(773,3,58,NULL),(774,3,59,NULL),(775,3,60,NULL),(776,3,61,NULL),(777,3,62,NULL),(778,3,63,NULL),(779,3,64,NULL),(780,3,65,NULL),(781,3,66,NULL),(782,3,67,NULL),(783,3,68,NULL),(784,3,69,NULL),(785,3,70,NULL),(786,3,71,NULL),(787,3,72,NULL),(788,3,73,NULL),(789,3,74,NULL),(790,3,75,NULL),(791,3,76,NULL),(792,3,77,NULL),(793,3,78,NULL),(794,3,79,NULL),(795,3,80,NULL),(796,3,81,NULL),(797,3,82,NULL),(798,3,83,NULL),(799,3,84,NULL),(800,3,85,NULL),(801,3,86,NULL),(802,3,87,NULL),(803,3,88,NULL),(804,3,89,NULL),(805,3,90,NULL),(806,3,91,NULL),(807,3,92,NULL),(808,3,93,NULL),(809,3,94,NULL),(810,3,95,NULL),(811,3,96,NULL),(812,3,97,NULL),(813,3,98,NULL),(814,3,99,NULL),(815,3,100,NULL),(816,3,101,NULL),(817,3,102,NULL),(818,3,103,NULL),(819,3,104,NULL),(820,3,105,NULL),(821,3,106,NULL),(822,3,107,NULL),(823,3,108,NULL),(824,3,109,NULL),(825,3,110,NULL),(826,3,111,NULL),(827,3,112,NULL),(828,3,113,NULL),(829,3,114,NULL),(830,3,115,NULL),(831,3,116,NULL),(832,3,117,NULL),(833,3,118,NULL),(834,3,119,NULL),(835,3,120,NULL),(836,3,121,NULL),(837,3,122,NULL),(838,3,123,NULL),(839,3,124,NULL),(840,3,125,NULL),(841,3,126,NULL),(842,3,127,NULL),(843,3,128,NULL),(844,3,129,NULL),(845,3,130,NULL),(846,3,131,NULL),(847,3,132,NULL),(848,3,133,NULL),(849,3,134,NULL),(850,3,135,NULL),(851,3,136,NULL),(852,3,137,NULL),(853,3,138,NULL),(854,3,139,NULL),(855,3,140,NULL),(856,3,141,NULL),(857,3,142,NULL),(858,3,143,NULL),(859,3,144,NULL),(860,3,145,NULL),(861,3,146,NULL),(862,3,147,NULL),(863,3,148,NULL),(864,3,149,NULL),(865,3,150,NULL),(866,3,151,NULL),(867,3,152,NULL),(868,3,153,NULL),(1022,1,1,9),(1023,1,2,9),(1024,1,3,9),(1025,1,4,9),(1026,1,5,9),(1027,1,6,9),(1028,1,7,9),(1029,1,8,9),(1030,1,9,9),(1031,1,10,9),(1032,1,11,9),(1033,1,12,9),(1034,1,13,9),(1035,1,14,9),(1036,1,15,9),(1037,1,16,9),(1038,1,17,9),(1039,1,18,9),(1040,1,19,9),(1041,1,20,9),(1042,1,21,9),(1043,1,22,9),(1044,1,23,9),(1045,1,24,9),(1046,1,25,9),(1047,1,26,9),(1048,1,27,9),(1049,1,28,9),(1050,1,29,9),(1051,1,30,9),(1052,1,31,9),(1053,1,32,9),(1054,1,33,9),(1055,1,34,9),(1056,1,35,9),(1057,1,36,9),(1058,1,37,9),(1059,1,38,9),(1060,1,39,9),(1061,1,40,9),(1062,1,41,9),(1063,1,42,9),(1064,1,43,9),(1065,1,44,9),(1066,1,45,9),(1067,1,46,9),(1068,1,47,9),(1069,1,48,9),(1070,1,49,9),(1071,1,50,9),(1072,1,51,9),(1073,1,52,9),(1074,1,53,9),(1075,1,54,9),(1076,1,55,9),(1077,1,56,9),(1078,1,57,9),(1079,1,58,9),(1080,1,59,9),(1081,1,60,9),(1082,1,61,9),(1083,1,62,9),(1084,1,63,9),(1085,1,64,9),(1086,1,65,9),(1087,1,66,9),(1088,1,67,9),(1089,1,68,9),(1090,1,69,9),(1091,1,70,9),(1092,1,71,9),(1093,1,72,9),(1094,1,73,9),(1095,1,74,9),(1096,1,75,9),(1097,1,76,9),(1098,1,77,9),(1099,1,78,9),(1100,1,79,9),(1101,1,80,9),(1102,1,81,9),(1103,1,82,9),(1104,1,83,9),(1105,1,84,9),(1106,1,85,9),(1107,1,86,9),(1108,1,87,9),(1109,1,88,9),(1110,1,89,9),(1111,1,90,9),(1112,1,91,9),(1113,1,92,9),(1114,1,93,9),(1115,1,94,9),(1116,1,95,9),(1117,1,96,9),(1118,1,97,9),(1119,1,98,9),(1120,1,99,9),(1121,1,100,9),(1122,1,101,9),(1123,1,102,9),(1124,1,103,9),(1125,1,104,9),(1126,1,105,9),(1127,1,106,9),(1128,1,107,9),(1129,1,108,9),(1130,1,109,9),(1131,1,110,9),(1132,1,111,9),(1133,1,112,9),(1134,1,113,9),(1135,1,114,9),(1136,1,115,9),(1137,1,116,9),(1138,1,117,9),(1139,1,118,9),(1140,1,119,9),(1141,1,120,9),(1142,1,121,9),(1143,1,122,9),(1144,1,123,9),(1145,1,124,9),(1146,1,125,9),(1147,1,126,9),(1148,1,127,9),(1149,1,128,9),(1150,1,129,9),(1151,1,130,9),(1152,1,131,9),(1153,1,132,9),(1154,1,133,9),(1155,1,134,9),(1156,1,135,9),(1157,1,136,9),(1158,1,137,9),(1159,1,138,9),(1160,1,139,9),(1161,1,140,9),(1162,1,141,9),(1163,1,142,9),(1164,1,143,9),(1165,1,144,9),(1166,1,145,9),(1167,1,146,9),(1168,1,147,9),(1169,1,148,9),(1170,1,149,9),(1171,1,150,9),(1172,1,151,9),(1173,1,152,9),(1174,1,153,9);
/*!40000 ALTER TABLE `main_atten` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_gd`
--

LOCK TABLES `main_gd` WRITE;
/*!40000 ALTER TABLE `main_gd` DISABLE KEYS */;
/*!40000 ALTER TABLE `main_gd` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_journal`
--

LOCK TABLES `main_journal` WRITE;
/*!40000 ALTER TABLE `main_journal` DISABLE KEYS */;
INSERT INTO `main_journal` VALUES (1,3,1,23),(2,3,2,23),(3,3,3,23),(4,3,4,23),(5,3,5,23),(6,3,6,23),(7,3,7,23),(8,3,8,23),(9,3,9,23),(10,3,10,23),(11,3,11,23),(12,3,12,23),(13,3,13,23),(14,3,14,23),(15,3,15,23),(16,3,16,23),(17,3,17,23),(18,3,18,23),(19,3,19,23),(20,3,20,23),(21,3,21,23),(22,3,22,23),(23,3,23,23),(24,3,24,23),(25,3,25,23),(26,3,26,23),(27,3,27,23),(28,3,28,23),(29,3,29,23),(30,3,30,23),(31,3,31,23),(32,3,32,23),(33,3,33,23),(34,3,34,23),(35,3,35,23),(36,3,36,23),(37,3,37,23),(38,3,38,23),(39,3,39,23),(40,3,40,23),(41,3,41,23),(42,3,42,23),(43,3,43,23),(44,3,44,23),(45,3,45,23),(46,3,46,23),(47,3,47,23),(48,3,48,23),(49,3,49,23),(50,3,50,23),(51,3,51,23),(52,3,52,23),(53,3,53,23),(54,3,54,23),(55,3,55,23),(56,3,56,23),(57,3,57,23),(58,3,58,23),(59,3,59,23),(60,3,60,23),(61,3,61,23),(62,3,62,23),(63,3,63,23),(64,3,64,23),(65,3,65,23),(66,3,66,23),(67,3,67,23),(68,3,68,23),(69,3,69,23),(70,3,70,23),(71,3,71,23),(72,3,72,23),(73,3,73,23),(74,3,74,23),(75,3,75,23),(76,3,76,23),(77,3,77,23),(78,3,78,23),(79,3,79,23),(80,3,80,23),(81,3,81,23),(82,3,82,23),(83,3,83,23),(84,3,84,23),(85,3,85,23),(86,3,86,23),(87,3,87,23),(88,3,88,23),(89,3,89,23),(90,3,90,23),(91,3,91,23),(92,3,92,23),(93,3,93,23),(94,3,94,23),(95,3,95,23),(96,3,96,23),(97,3,97,23),(98,3,98,23),(99,3,99,23),(100,3,100,23),(101,3,101,23),(102,3,102,23),(103,3,103,23),(104,3,104,23),(105,3,105,23),(106,3,106,23),(107,3,107,23),(108,3,108,23),(109,3,109,23),(110,3,110,23),(111,3,111,23),(112,3,112,23),(113,3,113,23),(114,3,114,23),(115,3,115,23),(116,3,116,23),(117,3,117,23),(118,3,118,23),(119,3,119,23),(120,3,120,23),(121,3,121,23),(122,3,122,23),(123,3,123,23),(124,3,124,23),(125,3,125,23),(126,3,126,23),(127,3,127,23),(128,3,128,23),(129,3,129,23),(130,3,130,23),(131,3,131,23),(132,3,132,23),(133,3,133,23),(134,3,134,23),(135,3,135,23),(136,3,136,23),(137,3,137,23),(138,3,138,23),(139,3,139,23),(140,3,140,23),(141,3,141,23),(142,3,142,23),(143,3,143,23),(144,3,144,23),(145,3,145,23),(146,3,146,23),(147,3,147,23),(148,3,148,23),(149,3,149,23),(150,3,150,23),(151,3,151,23),(152,3,152,23),(153,3,153,23);
/*!40000 ALTER TABLE `main_journal` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_majorpro`
--

LOCK TABLES `main_majorpro` WRITE;
/*!40000 ALTER TABLE `main_majorpro` DISABLE KEYS */;
/*!40000 ALTER TABLE `main_majorpro` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_majorprosem`
--

LOCK TABLES `main_majorprosem` WRITE;
/*!40000 ALTER TABLE `main_majorprosem` DISABLE KEYS */;
INSERT INTO `main_majorprosem` VALUES (1,1,NULL,NULL,NULL,NULL,1),(2,2,NULL,NULL,NULL,NULL,1),(3,3,NULL,NULL,NULL,NULL,1),(4,4,NULL,NULL,NULL,NULL,1),(5,5,NULL,NULL,NULL,NULL,1),(6,6,NULL,NULL,NULL,NULL,1),(7,7,NULL,NULL,NULL,NULL,1),(8,8,NULL,NULL,NULL,NULL,1),(9,9,NULL,NULL,NULL,NULL,1),(10,10,NULL,NULL,NULL,NULL,1),(11,11,NULL,NULL,NULL,NULL,1),(12,12,NULL,NULL,NULL,NULL,1),(13,13,NULL,NULL,NULL,NULL,1),(14,14,NULL,NULL,NULL,NULL,1),(15,15,NULL,NULL,NULL,NULL,1),(16,16,NULL,NULL,NULL,NULL,1),(17,17,NULL,NULL,NULL,NULL,1),(18,18,NULL,NULL,NULL,NULL,1),(19,19,NULL,NULL,NULL,NULL,1),(20,20,NULL,NULL,NULL,NULL,1),(21,21,NULL,NULL,NULL,NULL,1),(22,22,NULL,NULL,NULL,NULL,1),(23,23,NULL,NULL,NULL,NULL,1),(24,24,NULL,NULL,NULL,NULL,1),(25,25,NULL,NULL,NULL,NULL,1),(26,26,NULL,NULL,NULL,NULL,1),(27,27,NULL,NULL,NULL,NULL,1),(28,28,NULL,NULL,NULL,NULL,1),(29,29,NULL,NULL,NULL,NULL,1),(30,30,NULL,NULL,NULL,NULL,1),(31,31,NULL,NULL,NULL,NULL,1),(32,32,NULL,NULL,NULL,NULL,1),(33,33,NULL,NULL,NULL,NULL,1),(34,34,NULL,NULL,NULL,NULL,1),(35,35,NULL,NULL,NULL,NULL,1),(36,36,NULL,NULL,NULL,NULL,1),(37,37,NULL,NULL,NULL,NULL,1),(38,38,NULL,NULL,NULL,NULL,1),(39,39,NULL,NULL,NULL,NULL,1),(40,40,NULL,NULL,NULL,NULL,1),(41,41,NULL,NULL,NULL,NULL,1),(42,42,NULL,NULL,NULL,NULL,1),(43,43,NULL,NULL,NULL,NULL,1),(44,44,NULL,NULL,NULL,NULL,1),(45,45,NULL,NULL,NULL,NULL,1),(46,46,NULL,NULL,NULL,NULL,1),(47,47,NULL,NULL,NULL,NULL,1),(48,48,NULL,NULL,NULL,NULL,1),(49,49,NULL,NULL,NULL,NULL,1),(50,50,NULL,NULL,NULL,NULL,1),(51,51,NULL,NULL,NULL,NULL,1),(52,52,NULL,NULL,NULL,NULL,1),(53,53,NULL,NULL,NULL,NULL,1),(54,54,NULL,NULL,NULL,NULL,1),(55,55,NULL,NULL,NULL,NULL,1),(56,56,NULL,NULL,NULL,NULL,1),(57,57,NULL,NULL,NULL,NULL,1),(58,58,NULL,NULL,NULL,NULL,1),(59,59,NULL,NULL,NULL,NULL,1),(60,60,NULL,NULL,NULL,NULL,1),(61,61,NULL,NULL,NULL,NULL,1),(62,62,NULL,NULL,NULL,NULL,1),(63,63,NULL,NULL,NULL,NULL,1),(64,64,NULL,NULL,NULL,NULL,1),(65,65,NULL,NULL,NULL,NULL,1),(66,66,NULL,NULL,NULL,NULL,1),(67,67,NULL,NULL,NULL,NULL,1),(68,68,NULL,NULL,NULL,NULL,1),(69,69,NULL,NULL,NULL,NULL,1),(70,70,NULL,NULL,NULL,NULL,1),(71,71,NULL,NULL,NULL,NULL,1),(72,72,NULL,NULL,NULL,NULL,1),(73,73,NULL,NULL,NULL,NULL,1),(74,74,NULL,NULL,NULL,NULL,1),(75,75,NULL,NULL,NULL,NULL,1),(76,76,NULL,NULL,NULL,NULL,1),(77,77,NULL,NULL,NULL,NULL,1),(78,78,NULL,NULL,NULL,NULL,1),(79,79,NULL,NULL,NULL,NULL,1),(80,80,NULL,NULL,NULL,NULL,1),(81,81,NULL,NULL,NULL,NULL,1),(82,82,NULL,NULL,NULL,NULL,1),(83,83,NULL,NULL,NULL,NULL,1),(84,84,NULL,NULL,NULL,NULL,1),(85,85,NULL,NULL,NULL,NULL,1),(86,86,NULL,NULL,NULL,NULL,1),(87,87,NULL,NULL,NULL,NULL,1),(88,88,NULL,NULL,NULL,NULL,1),(89,89,NULL,NULL,NULL,NULL,1),(90,90,NULL,NULL,NULL,NULL,1),(91,91,NULL,NULL,NULL,NULL,1),(92,92,NULL,NULL,NULL,NULL,1),(93,93,NULL,NULL,NULL,NULL,1),(94,94,NULL,NULL,NULL,NULL,1),(95,95,NULL,NULL,NULL,NULL,1),(96,96,NULL,NULL,NULL,NULL,1),(97,97,NULL,NULL,NULL,NULL,1),(98,98,NULL,NULL,NULL,NULL,1),(99,99,NULL,NULL,NULL,NULL,1),(100,100,NULL,NULL,NULL,NULL,1),(101,101,NULL,NULL,NULL,NULL,1),(102,102,NULL,NULL,NULL,NULL,1),(103,103,NULL,NULL,NULL,NULL,1),(104,104,NULL,NULL,NULL,NULL,1),(105,105,NULL,NULL,NULL,NULL,1),(106,106,NULL,NULL,NULL,NULL,1),(107,107,NULL,NULL,NULL,NULL,1),(108,108,NULL,NULL,NULL,NULL,1),(109,109,NULL,NULL,NULL,NULL,1),(110,110,NULL,NULL,NULL,NULL,1),(111,111,NULL,NULL,NULL,NULL,1),(112,112,NULL,NULL,NULL,NULL,1),(113,113,NULL,NULL,NULL,NULL,1),(114,114,NULL,NULL,NULL,NULL,1),(115,115,NULL,NULL,NULL,NULL,1),(116,116,NULL,NULL,NULL,NULL,1),(117,117,NULL,NULL,NULL,NULL,1),(118,118,NULL,NULL,NULL,NULL,1),(119,119,NULL,NULL,NULL,NULL,1),(120,120,NULL,NULL,NULL,NULL,1),(121,121,NULL,NULL,NULL,NULL,1),(122,122,NULL,NULL,NULL,NULL,1),(123,123,NULL,NULL,NULL,NULL,1),(124,124,NULL,NULL,NULL,NULL,1),(125,125,NULL,NULL,NULL,NULL,1),(126,126,NULL,NULL,NULL,NULL,1),(127,127,NULL,NULL,NULL,NULL,1),(128,128,NULL,NULL,NULL,NULL,1),(129,129,NULL,NULL,NULL,NULL,1),(130,130,NULL,NULL,NULL,NULL,1),(131,131,NULL,NULL,NULL,NULL,1),(132,132,NULL,NULL,NULL,NULL,1),(133,133,NULL,NULL,NULL,NULL,1),(134,134,NULL,NULL,NULL,NULL,1),(135,135,NULL,NULL,NULL,NULL,1),(136,136,NULL,NULL,NULL,NULL,1),(137,137,NULL,NULL,NULL,NULL,1),(138,138,NULL,NULL,NULL,NULL,1),(139,139,NULL,NULL,NULL,NULL,1),(140,140,NULL,NULL,NULL,NULL,1),(141,141,NULL,NULL,NULL,NULL,1),(142,142,NULL,NULL,NULL,NULL,1),(143,143,NULL,NULL,NULL,NULL,1),(144,144,NULL,NULL,NULL,NULL,1),(145,145,NULL,NULL,NULL,NULL,1),(146,146,NULL,NULL,NULL,NULL,1),(147,147,NULL,NULL,NULL,NULL,1),(148,148,NULL,NULL,NULL,NULL,1),(149,149,NULL,NULL,NULL,NULL,1),(150,150,NULL,NULL,NULL,NULL,1),(151,151,NULL,NULL,NULL,NULL,1),(152,152,NULL,NULL,NULL,NULL,1),(153,153,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `main_majorprosem` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_minipro`
--

LOCK TABLES `main_minipro` WRITE;
/*!40000 ALTER TABLE `main_minipro` DISABLE KEYS */;
/*!40000 ALTER TABLE `main_minipro` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_miniprosem`
--

LOCK TABLES `main_miniprosem` WRITE;
/*!40000 ALTER TABLE `main_miniprosem` DISABLE KEYS */;
INSERT INTO `main_miniprosem` VALUES (1,1,7,7,8,5,1),(2,2,6,5,2,5,1),(3,3,3,1,8,5,1),(4,4,9,4,8,5,1),(5,5,10,10,6,5,1),(6,6,6,7,7,5,1);
/*!40000 ALTER TABLE `main_miniprosem` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_oralpce`
--

LOCK TABLES `main_oralpce` WRITE;
/*!40000 ALTER TABLE `main_oralpce` DISABLE KEYS */;
INSERT INTO `main_oralpce` VALUES (1,1,3,0),(2,1,2,5),(3,1,1,4),(4,2,3,10),(5,2,2,5),(6,2,1,1),(7,3,3,4),(8,3,2,5),(9,3,1,2),(10,4,3,10),(11,4,2,5),(12,4,1,3),(13,5,3,6),(14,5,2,5),(15,5,1,3),(16,6,3,8),(17,6,2,5),(18,6,1,0),(19,7,3,5),(20,7,2,5),(21,7,1,0),(22,8,3,9),(23,8,2,5),(24,8,1,5),(25,9,3,1),(26,9,2,5),(27,9,1,4),(28,10,3,6),(29,10,2,5),(30,10,1,3),(31,11,3,3),(32,11,2,5),(33,11,1,4),(34,12,3,5),(35,12,2,5),(36,12,1,3),(37,13,3,0),(38,13,2,5),(39,13,1,2),(40,14,3,4),(41,14,2,5),(42,14,1,4),(43,15,3,3),(44,15,2,5),(45,15,1,3),(46,16,3,9),(47,16,2,5),(48,16,1,4),(49,17,3,10),(50,17,2,5),(51,17,1,3),(52,18,3,8),(53,18,2,5),(54,18,1,1),(55,19,3,2),(56,19,2,5),(57,19,1,1),(58,20,3,9),(59,20,2,5),(60,20,1,1),(61,21,3,4),(62,21,2,5),(63,21,1,2),(64,22,3,8),(65,22,2,5),(66,22,1,3),(67,23,3,4),(68,23,2,5),(69,23,1,3),(70,24,3,9),(71,24,2,5),(72,24,1,1),(73,25,3,10),(74,25,2,5),(75,25,1,4),(76,26,3,2),(77,26,2,5),(78,26,1,5),(79,27,3,7),(80,27,2,5),(81,27,1,4),(82,28,3,4),(83,28,2,5),(84,28,1,4),(85,29,3,0),(86,29,2,5),(87,29,1,3),(88,30,3,1),(89,30,2,5),(90,30,1,3),(91,31,3,7),(92,31,2,5),(93,31,1,3),(94,32,3,1),(95,32,2,5),(96,32,1,3),(97,33,3,9),(98,33,2,5),(99,33,1,2),(100,34,3,3),(101,34,2,5),(102,34,1,3),(103,35,3,6),(104,35,2,5),(105,35,1,2),(106,36,3,1),(107,36,2,5),(108,36,1,2),(109,37,3,7),(110,37,2,5),(111,37,1,2),(112,38,3,8),(113,38,2,5),(114,38,1,5),(115,39,3,8),(116,39,2,5),(117,39,1,2),(118,40,3,0),(119,40,2,5),(120,40,1,5),(121,41,3,1),(122,41,2,5),(123,41,1,0),(124,42,3,1),(125,42,2,5),(126,42,1,2),(127,43,3,8),(128,43,2,5),(129,43,1,2),(130,44,3,7),(131,44,2,5),(132,44,1,0),(133,45,3,4),(134,45,2,5),(135,45,1,5),(136,46,3,5),(137,46,2,5),(138,46,1,3),(139,47,3,1),(140,47,2,5),(141,47,1,1),(142,48,3,8),(143,48,2,5),(144,48,1,0),(145,49,3,8),(146,49,2,5),(147,49,1,0),(148,50,3,6),(149,50,2,5),(150,50,1,0),(151,51,3,8),(152,51,2,5),(153,51,1,2),(154,52,3,0),(155,52,2,5),(156,52,1,3),(157,53,3,1),(158,53,2,5),(159,53,1,5),(160,54,3,2),(161,54,2,5),(162,54,1,2),(163,55,3,4),(164,55,2,5),(165,55,1,4),(166,56,3,3),(167,56,2,5),(168,56,1,2),(169,57,3,3),(170,57,2,5),(171,57,1,0),(172,58,3,5),(173,58,2,5),(174,58,1,2),(175,59,3,6),(176,59,2,5),(177,59,1,3),(178,60,3,3),(179,60,2,5),(180,60,1,5),(181,61,3,4),(182,61,2,5),(183,61,1,1),(184,62,3,0),(185,62,2,5),(186,62,1,3),(187,63,3,8),(188,63,2,5),(189,63,1,0),(190,64,3,8),(191,64,2,5),(192,64,1,5),(193,65,3,2),(194,65,2,5),(195,65,1,3),(196,66,3,8),(197,66,2,5),(198,66,1,2),(199,67,3,10),(200,67,2,5),(201,67,1,1),(202,68,3,5),(203,68,2,5),(204,68,1,3),(205,69,3,7),(206,69,2,5),(207,69,1,4),(208,70,3,2),(209,70,2,5),(210,70,1,0),(211,71,3,5),(212,71,2,5),(213,71,1,3),(214,72,3,3),(215,72,2,5),(216,72,1,5),(217,73,3,9),(218,73,2,5),(219,73,1,1),(220,74,3,4),(221,74,2,5),(222,74,1,3),(223,75,3,9),(224,75,2,5),(225,75,1,3),(226,76,3,10),(227,76,2,5),(228,76,1,1),(229,77,3,5),(230,77,2,5),(231,77,1,3),(232,78,3,3),(233,78,2,5),(234,78,1,5),(235,79,3,3),(236,79,2,5),(237,79,1,0),(238,80,3,6),(239,80,2,5),(240,80,1,4),(241,81,3,7),(242,81,2,5),(243,81,1,1),(244,82,3,5),(245,82,2,5),(246,82,1,4),(247,83,3,9),(248,83,2,5),(249,83,1,1),(250,84,3,5),(251,84,2,5),(252,84,1,5),(253,85,3,3),(254,85,2,5),(255,85,1,5),(256,86,3,0),(257,86,2,5),(258,86,1,5),(259,87,3,5),(260,87,2,5),(261,87,1,3),(262,88,3,2),(263,88,2,5),(264,88,1,2),(265,89,3,6),(266,89,2,5),(267,89,1,4),(268,90,3,7),(269,90,2,5),(270,90,1,1),(271,91,3,3),(272,91,2,5),(273,91,1,5),(274,92,3,8),(275,92,2,5),(276,92,1,4),(277,93,3,9),(278,93,2,5),(279,93,1,4),(280,94,3,5),(281,94,2,5),(282,94,1,5),(283,95,3,5),(284,95,2,5),(285,95,1,2),(286,96,3,8),(287,96,2,5),(288,96,1,3),(289,97,3,9),(290,97,2,5),(291,97,1,2),(292,98,3,6),(293,98,2,5),(294,98,1,4),(295,99,3,7),(296,99,2,5),(297,99,1,1),(298,100,3,1),(299,100,2,5),(300,100,1,0),(301,101,3,3),(302,101,2,5),(303,101,1,5),(304,102,3,10),(305,102,2,5),(306,102,1,5),(307,103,3,9),(308,103,2,5),(309,103,1,2),(310,104,3,6),(311,104,2,5),(312,104,1,3),(313,105,3,10),(314,105,2,5),(315,105,1,0),(316,106,3,10),(317,106,2,5),(318,106,1,1),(319,107,3,5),(320,107,2,5),(321,107,1,4),(322,108,3,9),(323,108,2,5),(324,108,1,2),(325,109,3,0),(326,109,2,5),(327,109,1,2),(328,110,3,5),(329,110,2,5),(330,110,1,2),(331,111,3,10),(332,111,2,5),(333,111,1,1),(334,112,3,2),(335,112,2,5),(336,112,1,3),(337,113,3,2),(338,113,2,5),(339,113,1,1),(340,114,3,8),(341,114,2,5),(342,114,1,1),(343,115,3,6),(344,115,2,5),(345,115,1,2),(346,116,3,0),(347,116,2,5),(348,116,1,0),(349,117,3,6),(350,117,2,5),(351,117,1,2),(352,118,3,1),(353,118,2,5),(354,118,1,2),(355,119,3,9),(356,119,2,5),(357,119,1,5),(358,120,3,9),(359,120,2,5),(360,120,1,5),(361,121,3,6),(362,121,2,5),(363,121,1,2),(364,122,3,4),(365,122,2,5),(366,122,1,4),(367,123,3,3),(368,123,2,5),(369,123,1,2),(370,124,3,5),(371,124,2,5),(372,124,1,5),(373,125,3,1),(374,125,2,5),(375,125,1,5),(376,126,3,0),(377,126,2,5),(378,126,1,2),(379,127,3,1),(380,127,2,5),(381,127,1,2),(382,128,3,5),(383,128,2,5),(384,128,1,2),(385,129,3,8),(386,129,2,5),(387,129,1,2),(388,130,3,1),(389,130,2,5),(390,130,1,0),(391,131,3,4),(392,131,2,5),(393,131,1,3),(394,132,3,0),(395,132,2,5),(396,132,1,0),(397,133,3,4),(398,133,2,5),(399,133,1,4),(400,134,3,4),(401,134,2,5),(402,134,1,5),(403,135,3,7),(404,135,2,5),(405,135,1,1),(406,136,3,4),(407,136,2,5),(408,136,1,0),(409,137,3,3),(410,137,2,5),(411,137,1,2),(412,138,3,2),(413,138,2,5),(414,138,1,4),(415,139,3,4),(416,139,2,5),(417,139,1,2),(418,140,3,8),(419,140,2,5),(420,140,1,5),(421,141,3,0),(422,141,2,5),(423,141,1,3),(424,142,3,7),(425,142,2,5),(426,142,1,4),(427,143,3,9),(428,143,2,5),(429,143,1,4),(430,144,3,5),(431,144,2,5),(432,144,1,1),(433,145,3,8),(434,145,2,5),(435,145,1,5),(436,146,3,6),(437,146,2,5),(438,146,1,5),(439,147,3,6),(440,147,2,5),(441,147,1,2),(442,148,3,1),(443,148,2,5),(444,148,1,2),(445,149,3,9),(446,149,2,5),(447,149,1,0),(448,150,3,8),(449,150,2,5),(450,150,1,4),(451,151,3,1),(452,151,2,5),(453,151,1,3),(454,152,3,6),(455,152,2,5),(456,152,1,5),(457,153,3,1),(458,153,2,5),(459,153,1,3),(463,2,7,NULL),(464,2,8,NULL),(465,2,9,NULL),(466,3,7,NULL),(467,3,8,NULL),(468,3,9,NULL),(469,4,7,NULL),(470,4,8,NULL),(471,4,9,NULL),(472,5,7,NULL),(473,5,8,NULL),(474,5,9,NULL),(475,6,7,NULL),(476,6,8,NULL),(477,6,9,NULL),(478,7,7,NULL),(479,7,8,NULL),(480,7,9,NULL),(481,8,7,NULL),(482,8,8,NULL),(483,8,9,NULL),(484,9,7,NULL),(485,9,8,NULL),(486,9,9,NULL),(487,10,7,NULL),(488,10,8,NULL),(489,10,9,NULL),(490,11,7,NULL),(491,11,8,NULL),(492,11,9,NULL),(493,12,7,NULL),(494,12,8,NULL),(495,12,9,NULL),(496,13,7,NULL),(497,13,8,NULL),(498,13,9,NULL),(499,14,7,NULL),(500,14,8,NULL),(501,14,9,NULL),(502,15,7,NULL),(503,15,8,NULL),(504,15,9,NULL),(505,16,7,NULL),(506,16,8,NULL),(507,16,9,NULL),(508,17,7,NULL),(509,17,8,NULL),(510,17,9,NULL),(511,18,7,NULL),(512,18,8,NULL),(513,18,9,NULL),(514,19,7,NULL),(515,19,8,NULL),(516,19,9,NULL),(517,20,7,NULL),(518,20,8,NULL),(519,20,9,NULL),(520,21,7,NULL),(521,21,8,NULL),(522,21,9,NULL),(523,22,7,NULL),(524,22,8,NULL),(525,22,9,NULL),(526,23,7,NULL),(527,23,8,NULL),(528,23,9,NULL),(529,24,7,NULL),(530,24,8,NULL),(531,24,9,NULL),(532,25,7,NULL),(533,25,8,NULL),(534,25,9,NULL),(535,26,7,NULL),(536,26,8,NULL),(537,26,9,NULL),(538,27,7,NULL),(539,27,8,NULL),(540,27,9,NULL),(541,28,7,NULL),(542,28,8,NULL),(543,28,9,NULL),(544,29,7,NULL),(545,29,8,NULL),(546,29,9,NULL),(547,30,7,NULL),(548,30,8,NULL),(549,30,9,NULL),(550,31,7,NULL),(551,31,8,NULL),(552,31,9,NULL),(553,32,7,NULL),(554,32,8,NULL),(555,32,9,NULL),(556,33,7,NULL),(557,33,8,NULL),(558,33,9,NULL),(559,34,7,NULL),(560,34,8,NULL),(561,34,9,NULL),(562,35,7,NULL),(563,35,8,NULL),(564,35,9,NULL),(565,36,7,NULL),(566,36,8,NULL),(567,36,9,NULL),(568,37,7,NULL),(569,37,8,NULL),(570,37,9,NULL),(571,38,7,NULL),(572,38,8,NULL),(573,38,9,NULL),(574,39,7,NULL),(575,39,8,NULL),(576,39,9,NULL),(577,40,7,NULL),(578,40,8,NULL),(579,40,9,NULL),(580,41,7,NULL),(581,41,8,NULL),(582,41,9,NULL),(583,42,7,NULL),(584,42,8,NULL),(585,42,9,NULL),(586,43,7,NULL),(587,43,8,NULL),(588,43,9,NULL),(589,44,7,NULL),(590,44,8,NULL),(591,44,9,NULL),(592,45,7,NULL),(593,45,8,NULL),(594,45,9,NULL),(595,46,7,NULL),(596,46,8,NULL),(597,46,9,NULL),(598,47,7,NULL),(599,47,8,NULL),(600,47,9,NULL),(601,48,7,NULL),(602,48,8,NULL),(603,48,9,NULL),(604,49,7,NULL),(605,49,8,NULL),(606,49,9,NULL),(607,50,7,NULL),(608,50,8,NULL),(609,50,9,NULL),(610,51,7,NULL),(611,51,8,NULL),(612,51,9,NULL),(613,52,7,NULL),(614,52,8,NULL),(615,52,9,NULL),(616,53,7,NULL),(617,53,8,NULL),(618,53,9,NULL),(619,54,7,NULL),(620,54,8,NULL),(621,54,9,NULL),(622,55,7,NULL),(623,55,8,NULL),(624,55,9,NULL),(625,56,7,NULL),(626,56,8,NULL),(627,56,9,NULL),(628,57,7,NULL),(629,57,8,NULL),(630,57,9,NULL),(631,58,7,NULL),(632,58,8,NULL),(633,58,9,NULL),(634,59,7,NULL),(635,59,8,NULL),(636,59,9,NULL),(637,60,7,NULL),(638,60,8,NULL),(639,60,9,NULL),(640,61,7,NULL),(641,61,8,NULL),(642,61,9,NULL),(643,62,7,NULL),(644,62,8,NULL),(645,62,9,NULL),(646,63,7,NULL),(647,63,8,NULL),(648,63,9,NULL),(649,64,7,NULL),(650,64,8,NULL),(651,64,9,NULL),(652,65,7,NULL),(653,65,8,NULL),(654,65,9,NULL),(655,66,7,NULL),(656,66,8,NULL),(657,66,9,NULL),(658,67,7,NULL),(659,67,8,NULL),(660,67,9,NULL),(661,68,7,NULL),(662,68,8,NULL),(663,68,9,NULL),(664,69,7,NULL),(665,69,8,NULL),(666,69,9,NULL),(667,70,7,NULL),(668,70,8,NULL),(669,70,9,NULL),(670,71,7,NULL),(671,71,8,NULL),(672,71,9,NULL),(673,72,7,NULL),(674,72,8,NULL),(675,72,9,NULL),(676,73,7,NULL),(677,73,8,NULL),(678,73,9,NULL),(679,74,7,NULL),(680,74,8,NULL),(681,74,9,NULL),(682,75,7,NULL),(683,75,8,NULL),(684,75,9,NULL),(685,76,7,NULL),(686,76,8,NULL),(687,76,9,NULL),(688,77,7,NULL),(689,77,8,NULL),(690,77,9,NULL),(691,78,7,NULL),(692,78,8,NULL),(693,78,9,NULL),(694,79,7,NULL),(695,79,8,NULL),(696,79,9,NULL),(697,80,7,NULL),(698,80,8,NULL),(699,80,9,NULL),(700,81,7,NULL),(701,81,8,NULL),(702,81,9,NULL),(703,82,7,NULL),(704,82,8,NULL),(705,82,9,NULL),(706,83,7,NULL),(707,83,8,NULL),(708,83,9,NULL),(709,84,7,NULL),(710,84,8,NULL),(711,84,9,NULL),(712,85,7,NULL),(713,85,8,NULL),(714,85,9,NULL),(715,86,7,NULL),(716,86,8,NULL),(717,86,9,NULL),(718,87,7,NULL),(719,87,8,NULL),(720,87,9,NULL),(721,88,7,NULL),(722,88,8,NULL),(723,88,9,NULL),(724,89,7,NULL),(725,89,8,NULL),(726,89,9,NULL),(727,90,7,NULL),(728,90,8,NULL),(729,90,9,NULL),(730,91,7,NULL),(731,91,8,NULL),(732,91,9,NULL),(733,92,7,NULL),(734,92,8,NULL),(735,92,9,NULL),(736,93,7,NULL),(737,93,8,NULL),(738,93,9,NULL),(739,94,7,NULL),(740,94,8,NULL),(741,94,9,NULL),(742,95,7,NULL),(743,95,8,NULL),(744,95,9,NULL),(745,96,7,NULL),(746,96,8,NULL),(747,96,9,NULL),(748,97,7,NULL),(749,97,8,NULL),(750,97,9,NULL),(751,98,7,NULL),(752,98,8,NULL),(753,98,9,NULL),(754,99,7,NULL),(755,99,8,NULL),(756,99,9,NULL),(757,100,7,NULL),(758,100,8,NULL),(759,100,9,NULL),(760,101,7,NULL),(761,101,8,NULL),(762,101,9,NULL),(763,102,7,NULL),(764,102,8,NULL),(765,102,9,NULL),(766,103,7,NULL),(767,103,8,NULL),(768,103,9,NULL),(769,104,7,NULL),(770,104,8,NULL),(771,104,9,NULL),(772,105,7,NULL),(773,105,8,NULL),(774,105,9,NULL),(775,106,7,NULL),(776,106,8,NULL),(777,106,9,NULL),(778,107,7,NULL),(779,107,8,NULL),(780,107,9,NULL),(781,108,7,NULL),(782,108,8,NULL),(783,108,9,NULL),(784,109,7,NULL),(785,109,8,NULL),(786,109,9,NULL),(787,110,7,NULL),(788,110,8,NULL),(789,110,9,NULL),(790,111,7,NULL),(791,111,8,NULL),(792,111,9,NULL),(793,112,7,NULL),(794,112,8,NULL),(795,112,9,NULL),(796,113,7,NULL),(797,113,8,NULL),(798,113,9,NULL),(799,114,7,NULL),(800,114,8,NULL),(801,114,9,NULL),(802,115,7,NULL),(803,115,8,NULL),(804,115,9,NULL),(805,116,7,NULL),(806,116,8,NULL),(807,116,9,NULL),(808,117,7,NULL),(809,117,8,NULL),(810,117,9,NULL),(811,118,7,NULL),(812,118,8,NULL),(813,118,9,NULL),(814,119,7,NULL),(815,119,8,NULL),(816,119,9,NULL),(817,120,7,NULL),(818,120,8,NULL),(819,120,9,NULL),(820,121,7,NULL),(821,121,8,NULL),(822,121,9,NULL),(823,122,7,NULL),(824,122,8,NULL),(825,122,9,NULL),(826,123,7,NULL),(827,123,8,NULL),(828,123,9,NULL),(829,124,7,NULL),(830,124,8,NULL),(831,124,9,NULL),(832,125,7,NULL),(833,125,8,NULL),(834,125,9,NULL),(835,126,7,NULL),(836,126,8,NULL),(837,126,9,NULL),(838,127,7,NULL),(839,127,8,NULL),(840,127,9,NULL),(841,128,7,NULL),(842,128,8,NULL),(843,128,9,NULL),(844,129,7,NULL),(845,129,8,NULL),(846,129,9,NULL),(847,130,7,NULL),(848,130,8,NULL),(849,130,9,NULL),(850,131,7,NULL),(851,131,8,NULL),(852,131,9,NULL),(853,132,7,NULL),(854,132,8,NULL),(855,132,9,NULL),(856,133,7,NULL),(857,133,8,NULL),(858,133,9,NULL),(859,134,7,NULL),(860,134,8,NULL),(861,134,9,NULL),(862,135,7,NULL),(863,135,8,NULL),(864,135,9,NULL),(865,136,7,NULL),(866,136,8,NULL),(867,136,9,NULL),(868,137,7,NULL),(869,137,8,NULL),(870,137,9,NULL),(871,138,7,NULL),(872,138,8,NULL),(873,138,9,NULL),(874,139,7,NULL),(875,139,8,NULL),(876,139,9,NULL),(877,140,7,NULL),(878,140,8,NULL),(879,140,9,NULL),(880,141,7,NULL),(881,141,8,NULL),(882,141,9,NULL),(883,142,7,NULL),(884,142,8,NULL),(885,142,9,NULL),(886,143,7,NULL),(887,143,8,NULL),(888,143,9,NULL),(889,144,7,NULL),(890,144,8,NULL),(891,144,9,NULL),(892,145,7,NULL),(893,145,8,NULL),(894,145,9,NULL),(895,146,7,NULL),(896,146,8,NULL),(897,146,9,NULL),(898,147,7,NULL),(899,147,8,NULL),(900,147,9,NULL),(901,148,7,NULL),(902,148,8,NULL),(903,148,9,NULL),(904,149,7,NULL),(905,149,8,NULL),(906,149,9,NULL),(907,150,7,NULL),(908,150,8,NULL),(909,150,9,NULL),(910,151,7,NULL),(911,151,8,NULL),(912,151,9,NULL),(913,152,7,NULL),(914,152,8,NULL),(915,152,9,NULL),(916,153,7,NULL),(917,153,8,NULL),(918,153,9,NULL),(919,1,7,NULL),(920,1,8,NULL),(921,1,9,NULL);
/*!40000 ALTER TABLE `main_oralpce` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_ppt`
--

LOCK TABLES `main_ppt` WRITE;
/*!40000 ALTER TABLE `main_ppt` DISABLE KEYS */;
INSERT INTO `main_ppt` VALUES (1,1,6,2),(2,2,24,2),(3,3,24,2),(4,4,24,2),(5,5,24,2),(6,6,24,2),(7,7,24,2),(8,8,24,2),(9,9,24,2),(10,10,24,2),(11,11,24,2),(12,12,24,2),(13,13,24,2),(14,14,24,2),(15,15,24,2),(16,16,24,2),(17,17,24,2),(18,18,24,2),(19,19,24,2),(20,20,24,2),(21,21,24,2),(22,22,24,2),(23,23,24,2),(24,24,24,2),(25,25,24,2),(26,26,24,2),(27,27,24,2),(28,28,24,2),(29,29,24,2),(30,30,24,2),(31,31,24,2),(32,32,24,2),(33,33,24,2),(34,34,24,2),(35,35,24,2),(36,36,24,2),(37,37,24,2),(38,38,24,2),(39,39,24,2),(40,40,24,2),(41,41,24,2),(42,42,24,2),(43,43,24,2),(44,44,24,2),(45,45,24,2),(46,46,24,2),(47,47,24,2),(48,48,24,2),(49,49,24,2),(50,50,24,2),(51,51,24,2),(52,52,24,2),(53,53,24,2),(54,54,24,2),(55,55,24,2),(56,56,24,2),(57,57,24,2),(58,58,24,2),(59,59,24,2),(60,60,24,2),(61,61,24,2),(62,62,24,2),(63,63,24,2),(64,64,24,2),(65,65,24,2),(66,66,24,2),(67,67,24,2),(68,68,24,2),(69,69,24,2),(70,70,24,2),(71,71,24,2),(72,72,24,2),(73,73,24,2),(74,74,24,2),(75,75,24,2),(76,76,24,2),(77,77,24,2),(78,78,24,2),(79,79,24,2),(80,80,24,2),(81,81,24,2),(82,82,24,2),(83,83,24,2),(84,84,24,2),(85,85,24,2),(86,86,24,2),(87,87,24,2),(88,88,24,2),(89,89,24,2),(90,90,24,2),(91,91,24,2),(92,92,24,2),(93,93,24,2),(94,94,24,2),(95,95,24,2),(96,96,24,2),(97,97,24,2),(98,98,24,2),(99,99,24,2),(100,100,24,2),(101,101,24,2),(102,102,24,2),(103,103,24,2),(104,104,24,2),(105,105,24,2),(106,106,24,2),(107,107,24,2),(108,108,24,2),(109,109,24,2),(110,110,24,2),(111,111,24,2),(112,112,24,2),(113,113,24,2),(114,114,24,2),(115,115,24,2),(116,116,24,2),(117,117,24,2),(118,118,24,2),(119,119,24,2),(120,120,24,2),(121,121,24,2),(122,122,24,2),(123,123,24,2),(124,124,24,2),(125,125,24,2),(126,126,24,2),(127,127,24,2),(128,128,24,2),(129,129,24,2),(130,130,24,2),(131,131,24,2),(132,132,24,2),(133,133,24,2),(134,134,24,2),(135,135,24,2),(136,136,24,2),(137,137,24,2),(138,138,24,2),(139,139,24,2),(140,140,24,2),(141,141,24,2),(142,142,24,2),(143,143,24,2),(144,144,24,2),(145,145,24,2),(146,146,24,2),(147,147,24,2),(148,148,24,2),(149,149,24,2),(150,150,24,2),(151,151,24,2),(152,152,24,2),(153,153,24,2);
/*!40000 ALTER TABLE `main_ppt` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_report`
--

LOCK TABLES `main_report` WRITE;
/*!40000 ALTER TABLE `main_report` DISABLE KEYS */;
INSERT INTO `main_report` VALUES (154,3,1,6),(155,3,2,6),(156,3,3,6),(157,3,4,6),(158,3,5,6),(159,3,6,6),(160,3,7,6),(161,3,8,6),(162,3,9,6),(163,3,10,6),(164,3,11,6),(165,3,12,6),(166,3,13,6),(167,3,14,6),(168,3,15,6),(169,3,16,6),(170,3,17,6),(171,3,18,6),(172,3,19,6),(173,3,20,6),(174,3,21,6),(175,3,22,6),(176,3,23,6),(177,3,24,6),(178,3,25,6),(179,3,26,6),(180,3,27,6),(181,3,28,6),(182,3,29,6),(183,3,30,6),(184,3,31,6),(185,3,32,6),(186,3,33,6),(187,3,34,6),(188,3,35,6),(189,3,36,6),(190,3,37,6),(191,3,38,6),(192,3,39,6),(193,3,40,6),(194,3,41,6),(195,3,42,6),(196,3,43,6),(197,3,44,6),(198,3,45,6),(199,3,46,6),(200,3,47,6),(201,3,48,6),(202,3,49,6),(203,3,50,6),(204,3,51,6),(205,3,52,6),(206,3,53,6),(207,3,54,6),(208,3,55,6),(209,3,56,6),(210,3,57,6),(211,3,58,6),(212,3,59,6),(213,3,60,6),(214,3,61,6),(215,3,62,6),(216,3,63,6),(217,3,64,6),(218,3,65,6),(219,3,66,6),(220,3,67,6),(221,3,68,6),(222,3,69,6),(223,3,70,6),(224,3,71,6),(225,3,72,6),(226,3,73,6),(227,3,74,6),(228,3,75,6),(229,3,76,6),(230,3,77,6),(231,3,78,6),(232,3,79,6),(233,3,80,6),(234,3,81,6),(235,3,82,6),(236,3,83,6),(237,3,84,6),(238,3,85,6),(239,3,86,6),(240,3,87,6),(241,3,88,6),(242,3,89,6),(243,3,90,6),(244,3,91,6),(245,3,92,6),(246,3,93,6),(247,3,94,6),(248,3,95,6),(249,3,96,6),(250,3,97,6),(251,3,98,6),(252,3,99,6),(253,3,100,6),(254,3,101,6),(255,3,102,6),(256,3,103,6),(257,3,104,6),(258,3,105,6),(259,3,106,6),(260,3,107,6),(261,3,108,6),(262,3,109,6),(263,3,110,6),(264,3,111,6),(265,3,112,6),(266,3,113,6),(267,3,114,6),(268,3,115,6),(269,3,116,6),(270,3,117,6),(271,3,118,6),(272,3,119,6),(273,3,120,6),(274,3,121,6),(275,3,122,6),(276,3,123,6),(277,3,124,6),(278,3,125,6),(279,3,126,6),(280,3,127,6),(281,3,128,6),(282,3,129,6),(283,3,130,6),(284,3,131,6),(285,3,132,6),(286,3,133,6),(287,3,134,6),(288,3,135,6),(289,3,136,6),(290,3,137,6),(291,3,138,6),(292,3,139,6),(293,3,140,6),(294,3,141,6),(295,3,142,6),(296,3,143,6),(297,3,144,6),(298,3,145,6),(299,3,146,6),(300,3,147,6),(301,3,148,6),(302,3,149,6),(303,3,150,6),(304,3,151,7),(305,3,152,6),(306,3,153,6);
/*!40000 ALTER TABLE `main_report` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_scipract`
--

LOCK TABLES `main_scipract` WRITE;
/*!40000 ALTER TABLE `main_scipract` DISABLE KEYS */;
INSERT INTO `main_scipract` VALUES (562,2,1,2),(563,2,2,5),(564,2,3,3),(565,2,4,5),(566,2,5,5),(567,2,6,5),(568,2,7,5),(569,2,8,5),(570,2,9,5),(571,2,10,5),(572,2,11,5),(573,2,12,5),(574,2,13,5),(575,2,14,5),(576,2,15,5),(577,2,16,5),(578,2,17,5),(579,2,18,5),(580,2,19,5),(581,2,20,5),(582,2,21,5),(583,2,22,5),(584,2,23,5),(585,2,24,5),(586,2,25,5),(587,2,26,5),(588,2,27,5),(589,2,28,5),(590,2,29,5),(591,2,30,5),(592,2,31,5),(593,2,32,5),(594,2,33,5),(595,2,34,5),(596,2,35,5),(597,2,36,5),(598,2,37,5),(599,2,38,5),(600,2,39,5),(601,2,40,5),(602,2,41,5),(603,2,42,5),(604,2,43,5),(605,2,44,5),(606,2,45,5),(607,2,46,5),(608,2,47,5),(609,2,48,5),(610,2,49,5),(611,2,50,5),(612,2,51,5),(613,2,52,5),(614,2,53,5),(615,2,54,5),(616,2,55,5),(617,2,56,5),(618,2,57,5),(619,2,58,5),(620,2,59,5),(621,2,60,5),(622,2,61,5),(623,2,62,5),(624,2,63,5),(625,2,64,5),(626,2,65,5),(627,2,66,5),(628,2,67,5),(629,2,68,5),(630,2,69,5),(631,2,70,5),(632,2,71,5),(633,2,72,5),(634,2,73,5),(635,2,74,5),(636,2,75,5),(637,2,76,5),(638,2,77,5),(639,2,78,5),(640,2,79,5),(641,2,80,5),(642,2,81,5),(643,2,82,5),(644,2,83,5),(645,2,84,5),(646,2,85,5),(647,2,86,5),(648,2,87,5),(649,2,88,5),(650,2,89,5),(651,2,90,5),(652,2,91,5),(653,2,92,5),(654,2,93,5),(655,2,94,5),(656,2,95,5),(657,2,96,5),(658,2,97,5),(659,2,98,5),(660,2,99,5),(661,2,100,5),(662,2,101,5),(663,2,102,5),(664,2,103,5),(665,2,104,5),(666,2,105,5),(667,2,106,5),(668,2,107,5),(669,2,108,5),(670,2,109,5),(671,2,110,5),(672,2,111,5),(673,2,112,5),(674,2,113,5),(675,2,114,5),(676,2,115,5),(677,2,116,5),(678,2,117,5),(679,2,118,5),(680,2,119,5),(681,2,120,5),(682,2,121,5),(683,2,122,5),(684,2,123,5),(685,2,124,5),(686,2,125,5),(687,2,126,5),(688,2,127,5),(689,2,128,5),(690,2,129,5),(691,2,130,5),(692,2,131,5),(693,2,132,5),(694,2,133,5),(695,2,134,5),(696,2,135,5),(697,2,136,5),(698,2,137,5),(699,2,138,5),(700,2,139,5),(701,2,140,5),(702,2,141,5),(703,2,142,5),(704,2,143,5),(705,2,144,5),(706,2,145,5),(707,2,146,5),(708,2,147,5),(709,2,148,5),(710,2,149,5),(711,2,150,5),(712,2,151,5),(713,2,152,3),(714,2,153,5);
/*!40000 ALTER TABLE `main_scipract` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `main_trade`
--

LOCK TABLES `main_trade` WRITE;
/*!40000 ALTER TABLE `main_trade` DISABLE KEYS */;
INSERT INTO `main_trade` VALUES (1,7,1,6),(2,8,1,5),(3,7,2,23),(4,8,2,23),(5,7,3,22),(6,8,3,22),(7,7,4,22),(8,8,4,22),(9,7,5,22),(10,8,5,22),(11,7,6,22),(12,8,6,22),(13,7,7,22),(14,8,7,22),(15,7,8,22),(16,8,8,22),(17,7,9,22),(18,8,9,22),(19,7,10,22),(20,8,10,22),(21,7,11,22),(22,8,11,22),(23,7,12,22),(24,8,12,22),(25,7,13,22),(26,8,13,22),(27,7,14,22),(28,8,14,22),(29,7,15,22),(30,8,15,22),(31,7,16,22),(32,8,16,22),(33,7,17,22),(34,8,17,22),(35,7,18,22),(36,8,18,22),(37,7,19,22),(38,8,19,22),(39,7,20,22),(40,8,20,22),(41,7,21,22),(42,8,21,22),(43,7,22,22),(44,8,22,22),(45,7,23,22),(46,8,23,22),(47,7,24,22),(48,8,24,22),(49,7,25,22),(50,8,25,22),(51,7,26,22),(52,8,26,22),(53,7,27,22),(54,8,27,22),(55,7,28,22),(56,8,28,22),(57,7,29,22),(58,8,29,22),(59,7,30,22),(60,8,30,22),(61,7,31,22),(62,8,31,22),(63,7,32,22),(64,8,32,22),(65,7,33,22),(66,8,33,22),(67,7,34,22),(68,8,34,22),(69,7,35,22),(70,8,35,22),(71,7,36,22),(72,8,36,22),(73,7,37,22),(74,8,37,22),(75,7,38,22),(76,8,38,22),(77,7,39,22),(78,8,39,22),(79,7,40,22),(80,8,40,22),(81,7,41,22),(82,8,41,22),(83,7,42,22),(84,8,42,22),(85,7,43,22),(86,8,43,22),(87,7,44,22),(88,8,44,22),(89,7,45,22),(90,8,45,22),(91,7,46,22),(92,8,46,22),(93,7,47,22),(94,8,47,22),(95,7,48,22),(96,8,48,22),(97,7,49,22),(98,8,49,22),(99,7,50,22),(100,8,50,22),(101,7,51,22),(102,8,51,22),(103,7,52,22),(104,8,52,22),(105,7,53,22),(106,8,53,22),(107,7,54,22),(108,8,54,22),(109,7,55,22),(110,8,55,22),(111,7,56,22),(112,8,56,22),(113,7,57,22),(114,8,57,22),(115,7,58,22),(116,8,58,22),(117,7,59,22),(118,8,59,22),(119,7,60,22),(120,8,60,22),(121,7,61,22),(122,8,61,22),(123,7,62,22),(124,8,62,22),(125,7,63,22),(126,8,63,22),(127,7,64,22),(128,8,64,22),(129,7,65,22),(130,8,65,22),(131,7,66,22),(132,8,66,22),(133,7,67,22),(134,8,67,22),(135,7,68,22),(136,8,68,22),(137,7,69,22),(138,8,69,22),(139,7,70,22),(140,8,70,22),(141,7,71,22),(142,8,71,22),(143,7,72,22),(144,8,72,22),(145,7,73,22),(146,8,73,22),(147,7,74,22),(148,8,74,22),(149,7,75,22),(150,8,75,22),(151,7,76,22),(152,8,76,22),(153,7,77,22),(154,8,77,22),(155,7,78,22),(156,8,78,22),(157,7,79,22),(158,8,79,22),(159,7,80,22),(160,8,80,22),(161,7,81,22),(162,8,81,22),(163,7,82,22),(164,8,82,22),(165,7,83,22),(166,8,83,22),(167,7,84,22),(168,8,84,22),(169,7,85,22),(170,8,85,22),(171,7,86,22),(172,8,86,22),(173,7,87,22),(174,8,87,22),(175,7,88,22),(176,8,88,22),(177,7,89,22),(178,8,89,22),(179,7,90,22),(180,8,90,22),(181,7,91,22),(182,8,91,22),(183,7,92,22),(184,8,92,22),(185,7,93,22),(186,8,93,22),(187,7,94,22),(188,8,94,22),(189,7,95,22),(190,8,95,22),(191,7,96,22),(192,8,96,22),(193,7,97,22),(194,8,97,22),(195,7,98,22),(196,8,98,22),(197,7,99,22),(198,8,99,22),(199,7,100,22),(200,8,100,22),(201,7,101,22),(202,8,101,22),(203,7,102,22),(204,8,102,22),(205,7,103,22),(206,8,103,22),(207,7,104,22),(208,8,104,22),(209,7,105,22),(210,8,105,22),(211,7,106,22),(212,8,106,22),(213,7,107,22),(214,8,107,22),(215,7,108,22),(216,8,108,22),(217,7,109,22),(218,8,109,22),(219,7,110,22),(220,8,110,22),(221,7,111,22),(222,8,111,22),(223,7,112,22),(224,8,112,22),(225,7,113,22),(226,8,113,22),(227,7,114,22),(228,8,114,22),(229,7,115,22),(230,8,115,22),(231,7,116,22),(232,8,116,22),(233,7,117,22),(234,8,117,22),(235,7,118,22),(236,8,118,22),(237,7,119,22),(238,8,119,22),(239,7,120,22),(240,8,120,22),(241,7,121,22),(242,8,121,22),(243,7,122,22),(244,8,122,22),(245,7,123,22),(246,8,123,22),(247,7,124,22),(248,8,124,22),(249,7,125,22),(250,8,125,22),(251,7,126,22),(252,8,126,22),(253,7,127,22),(254,8,127,22),(255,7,128,22),(256,8,128,22),(257,7,129,22),(258,8,129,22),(259,7,130,22),(260,8,130,22),(261,7,131,22),(262,8,131,22),(263,7,132,22),(264,8,132,22),(265,7,133,22),(266,8,133,22),(267,7,134,22),(268,8,134,22),(269,7,135,22),(270,8,135,22),(271,7,136,22),(272,8,136,22),(273,7,137,22),(274,8,137,22),(275,7,138,22),(276,8,138,22),(277,7,139,22),(278,8,139,22),(279,7,140,22),(280,8,140,22),(281,7,141,22),(282,8,141,22),(283,7,142,22),(284,8,142,22),(285,7,143,22),(286,8,143,22),(287,7,144,22),(288,8,144,22),(289,7,145,22),(290,8,145,22),(291,7,146,22),(292,8,146,22),(293,7,147,22),(294,8,147,22),(295,7,148,22),(296,8,148,22),(297,7,149,22),(298,8,149,22),(299,7,150,22),(300,8,150,22),(301,7,151,22),(302,8,151,22),(303,7,152,22),(304,8,152,24),(305,7,153,22),(306,8,153,22);
/*!40000 ALTER TABLE `main_trade` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `mainassign`
--

LOCK TABLES `mainassign` WRITE;
/*!40000 ALTER TABLE `mainassign` DISABLE KEYS */;
INSERT INTO `mainassign` VALUES (1,17,1,NULL),(2,16,1,NULL),(3,15,1,NULL),(4,14,1,NULL),(5,13,1,NULL),(6,12,1,NULL),(7,17,2,NULL),(8,16,2,NULL),(9,15,2,NULL),(10,14,2,NULL),(11,13,2,NULL),(12,12,2,NULL),(13,17,3,NULL),(14,16,3,NULL),(15,15,3,NULL),(16,14,3,NULL),(17,13,3,NULL),(18,12,3,NULL),(19,17,4,NULL),(20,16,4,NULL),(21,15,4,NULL),(22,14,4,NULL),(23,13,4,NULL),(24,12,4,NULL),(25,17,5,NULL),(26,16,5,NULL),(27,15,5,NULL),(28,14,5,NULL),(29,13,5,NULL),(30,12,5,NULL),(31,17,6,NULL),(32,16,6,NULL),(33,15,6,NULL),(34,14,6,NULL),(35,13,6,NULL),(36,12,6,NULL),(37,17,7,NULL),(38,16,7,NULL),(39,15,7,NULL),(40,14,7,NULL),(41,13,7,NULL),(42,12,7,NULL),(43,17,8,NULL),(44,16,8,NULL),(45,15,8,NULL),(46,14,8,NULL),(47,13,8,NULL),(48,12,8,NULL),(49,17,9,NULL),(50,16,9,NULL),(51,15,9,NULL),(52,14,9,NULL),(53,13,9,NULL),(54,12,9,NULL),(55,17,10,NULL),(56,16,10,NULL),(57,15,10,NULL),(58,14,10,NULL),(59,13,10,NULL),(60,12,10,NULL),(61,17,11,NULL),(62,16,11,NULL),(63,15,11,NULL),(64,14,11,NULL),(65,13,11,NULL),(66,12,11,NULL),(67,17,12,NULL),(68,16,12,NULL),(69,15,12,NULL),(70,14,12,NULL),(71,13,12,NULL),(72,12,12,NULL),(73,17,13,NULL),(74,16,13,NULL),(75,15,13,NULL),(76,14,13,NULL),(77,13,13,NULL),(78,12,13,NULL),(79,17,14,NULL),(80,16,14,NULL),(81,15,14,NULL),(82,14,14,NULL),(83,13,14,NULL),(84,12,14,NULL),(85,17,15,NULL),(86,16,15,NULL),(87,15,15,NULL),(88,14,15,NULL),(89,13,15,NULL),(90,12,15,NULL),(91,17,16,NULL),(92,16,16,NULL),(93,15,16,NULL),(94,14,16,NULL),(95,13,16,NULL),(96,12,16,NULL),(97,17,17,NULL),(98,16,17,NULL),(99,15,17,NULL),(100,14,17,NULL),(101,13,17,NULL),(102,12,17,NULL),(103,17,18,NULL),(104,16,18,NULL),(105,15,18,NULL),(106,14,18,NULL),(107,13,18,NULL),(108,12,18,NULL),(109,17,19,NULL),(110,16,19,NULL),(111,15,19,NULL),(112,14,19,NULL),(113,13,19,NULL),(114,12,19,NULL),(115,17,20,NULL),(116,16,20,NULL),(117,15,20,NULL),(118,14,20,NULL),(119,13,20,NULL),(120,12,20,NULL),(121,17,21,NULL),(122,16,21,NULL),(123,15,21,NULL),(124,14,21,NULL),(125,13,21,NULL),(126,12,21,NULL),(127,17,22,NULL),(128,16,22,NULL),(129,15,22,NULL),(130,14,22,NULL),(131,13,22,NULL),(132,12,22,NULL),(133,17,23,NULL),(134,16,23,NULL),(135,15,23,NULL),(136,14,23,NULL),(137,13,23,NULL),(138,12,23,NULL),(139,17,24,NULL),(140,16,24,NULL),(141,15,24,NULL),(142,14,24,NULL),(143,13,24,NULL),(144,12,24,NULL),(145,17,25,NULL),(146,16,25,NULL),(147,15,25,NULL),(148,14,25,NULL),(149,13,25,NULL),(150,12,25,NULL),(151,17,26,NULL),(152,16,26,NULL),(153,15,26,NULL),(154,14,26,NULL),(155,13,26,NULL),(156,12,26,NULL),(157,17,27,NULL),(158,16,27,NULL),(159,15,27,NULL),(160,14,27,NULL),(161,13,27,NULL),(162,12,27,NULL),(163,17,28,NULL),(164,16,28,NULL),(165,15,28,NULL),(166,14,28,NULL),(167,13,28,NULL),(168,12,28,NULL),(169,17,29,NULL),(170,16,29,NULL),(171,15,29,NULL),(172,14,29,NULL),(173,13,29,NULL),(174,12,29,NULL),(175,17,30,NULL),(176,16,30,NULL),(177,15,30,NULL),(178,14,30,NULL),(179,13,30,NULL),(180,12,30,NULL),(181,17,31,NULL),(182,16,31,NULL),(183,15,31,NULL),(184,14,31,NULL),(185,13,31,NULL),(186,12,31,NULL),(187,17,32,NULL),(188,16,32,NULL),(189,15,32,NULL),(190,14,32,NULL),(191,13,32,NULL),(192,12,32,NULL),(193,17,33,NULL),(194,16,33,NULL),(195,15,33,NULL),(196,14,33,NULL),(197,13,33,NULL),(198,12,33,NULL),(199,17,34,NULL),(200,16,34,NULL),(201,15,34,NULL),(202,14,34,NULL),(203,13,34,NULL),(204,12,34,NULL),(205,17,35,NULL),(206,16,35,NULL),(207,15,35,NULL),(208,14,35,NULL),(209,13,35,NULL),(210,12,35,NULL),(211,17,36,NULL),(212,16,36,NULL),(213,15,36,NULL),(214,14,36,NULL),(215,13,36,NULL),(216,12,36,NULL),(217,17,37,NULL),(218,16,37,NULL),(219,15,37,NULL),(220,14,37,NULL),(221,13,37,NULL),(222,12,37,NULL),(223,17,38,NULL),(224,16,38,NULL),(225,15,38,NULL),(226,14,38,NULL),(227,13,38,NULL),(228,12,38,NULL),(229,17,39,NULL),(230,16,39,NULL),(231,15,39,NULL),(232,14,39,NULL),(233,13,39,NULL),(234,12,39,NULL),(235,17,40,NULL),(236,16,40,NULL),(237,15,40,NULL),(238,14,40,NULL),(239,13,40,NULL),(240,12,40,NULL),(241,17,41,NULL),(242,16,41,NULL),(243,15,41,NULL),(244,14,41,NULL),(245,13,41,NULL),(246,12,41,NULL),(247,17,42,NULL),(248,16,42,NULL),(249,15,42,NULL),(250,14,42,NULL),(251,13,42,NULL),(252,12,42,NULL),(253,17,43,NULL),(254,16,43,NULL),(255,15,43,NULL),(256,14,43,NULL),(257,13,43,NULL),(258,12,43,NULL),(259,17,44,NULL),(260,16,44,NULL),(261,15,44,NULL),(262,14,44,NULL),(263,13,44,NULL),(264,12,44,NULL),(265,17,45,NULL),(266,16,45,NULL),(267,15,45,NULL),(268,14,45,NULL),(269,13,45,NULL),(270,12,45,NULL),(271,17,46,NULL),(272,16,46,NULL),(273,15,46,NULL),(274,14,46,NULL),(275,13,46,NULL),(276,12,46,NULL),(277,17,47,NULL),(278,16,47,NULL),(279,15,47,NULL),(280,14,47,NULL),(281,13,47,NULL),(282,12,47,NULL),(283,17,48,NULL),(284,16,48,NULL),(285,15,48,NULL),(286,14,48,NULL),(287,13,48,NULL),(288,12,48,NULL),(289,17,49,NULL),(290,16,49,NULL),(291,15,49,NULL),(292,14,49,NULL),(293,13,49,NULL),(294,12,49,NULL),(295,17,50,NULL),(296,16,50,NULL),(297,15,50,NULL),(298,14,50,NULL),(299,13,50,NULL),(300,12,50,NULL),(301,17,51,NULL),(302,16,51,NULL),(303,15,51,NULL),(304,14,51,NULL),(305,13,51,NULL),(306,12,51,NULL),(307,17,52,NULL),(308,16,52,NULL),(309,15,52,NULL),(310,14,52,NULL),(311,13,52,NULL),(312,12,52,NULL),(313,17,53,NULL),(314,16,53,NULL),(315,15,53,NULL),(316,14,53,NULL),(317,13,53,NULL),(318,12,53,NULL),(319,17,54,NULL),(320,16,54,NULL),(321,15,54,NULL),(322,14,54,NULL),(323,13,54,NULL),(324,12,54,NULL),(325,17,55,NULL),(326,16,55,NULL),(327,15,55,NULL),(328,14,55,NULL),(329,13,55,NULL),(330,12,55,NULL),(331,17,56,NULL),(332,16,56,NULL),(333,15,56,NULL),(334,14,56,NULL),(335,13,56,NULL),(336,12,56,NULL),(337,17,57,NULL),(338,16,57,NULL),(339,15,57,NULL),(340,14,57,NULL),(341,13,57,NULL),(342,12,57,NULL),(343,17,58,NULL),(344,16,58,NULL),(345,15,58,NULL),(346,14,58,NULL),(347,13,58,NULL),(348,12,58,NULL),(349,17,59,NULL),(350,16,59,NULL),(351,15,59,NULL),(352,14,59,NULL),(353,13,59,NULL),(354,12,59,NULL),(355,17,60,NULL),(356,16,60,NULL),(357,15,60,NULL),(358,14,60,NULL),(359,13,60,NULL),(360,12,60,NULL),(361,17,61,NULL),(362,16,61,NULL),(363,15,61,NULL),(364,14,61,NULL),(365,13,61,NULL),(366,12,61,NULL),(367,17,62,NULL),(368,16,62,NULL),(369,15,62,NULL),(370,14,62,NULL),(371,13,62,NULL),(372,12,62,NULL),(373,17,63,NULL),(374,16,63,NULL),(375,15,63,NULL),(376,14,63,NULL),(377,13,63,NULL),(378,12,63,NULL),(379,17,64,NULL),(380,16,64,NULL),(381,15,64,NULL),(382,14,64,NULL),(383,13,64,NULL),(384,12,64,NULL),(385,17,65,NULL),(386,16,65,NULL),(387,15,65,NULL),(388,14,65,NULL),(389,13,65,NULL),(390,12,65,NULL),(391,17,66,NULL),(392,16,66,NULL),(393,15,66,NULL),(394,14,66,NULL),(395,13,66,NULL),(396,12,66,NULL),(397,17,67,NULL),(398,16,67,NULL),(399,15,67,NULL),(400,14,67,NULL),(401,13,67,NULL),(402,12,67,NULL),(403,17,68,NULL),(404,16,68,NULL),(405,15,68,NULL),(406,14,68,NULL),(407,13,68,NULL),(408,12,68,NULL),(409,17,69,NULL),(410,16,69,NULL),(411,15,69,NULL),(412,14,69,NULL),(413,13,69,NULL),(414,12,69,NULL),(415,17,70,NULL),(416,16,70,NULL),(417,15,70,NULL),(418,14,70,NULL),(419,13,70,NULL),(420,12,70,NULL),(421,17,71,NULL),(422,16,71,NULL),(423,15,71,NULL),(424,14,71,NULL),(425,13,71,NULL),(426,12,71,NULL),(427,17,72,NULL),(428,16,72,NULL),(429,15,72,NULL),(430,14,72,NULL),(431,13,72,NULL),(432,12,72,NULL),(433,17,73,NULL),(434,16,73,NULL),(435,15,73,NULL),(436,14,73,NULL),(437,13,73,NULL),(438,12,73,NULL),(439,17,74,NULL),(440,16,74,NULL),(441,15,74,NULL),(442,14,74,NULL),(443,13,74,NULL),(444,12,74,NULL),(445,17,75,NULL),(446,16,75,NULL),(447,15,75,NULL),(448,14,75,NULL),(449,13,75,NULL),(450,12,75,NULL),(451,17,76,NULL),(452,16,76,NULL),(453,15,76,NULL),(454,14,76,NULL),(455,13,76,NULL),(456,12,76,NULL),(457,17,77,NULL),(458,16,77,NULL),(459,15,77,NULL),(460,14,77,NULL),(461,13,77,NULL),(462,12,77,NULL),(463,17,78,NULL),(464,16,78,NULL),(465,15,78,NULL),(466,14,78,NULL),(467,13,78,NULL),(468,12,78,NULL),(469,17,79,NULL),(470,16,79,NULL),(471,15,79,NULL),(472,14,79,NULL),(473,13,79,NULL),(474,12,79,NULL),(475,17,80,NULL),(476,16,80,NULL),(477,15,80,NULL),(478,14,80,NULL),(479,13,80,NULL),(480,12,80,NULL),(481,17,81,NULL),(482,16,81,NULL),(483,15,81,NULL),(484,14,81,NULL),(485,13,81,NULL),(486,12,81,NULL),(487,17,82,NULL),(488,16,82,NULL),(489,15,82,NULL),(490,14,82,NULL),(491,13,82,NULL),(492,12,82,NULL),(493,17,83,NULL),(494,16,83,NULL),(495,15,83,NULL),(496,14,83,NULL),(497,13,83,NULL),(498,12,83,NULL),(499,17,84,NULL),(500,16,84,NULL),(501,15,84,NULL),(502,14,84,NULL),(503,13,84,NULL),(504,12,84,NULL),(505,17,85,NULL),(506,16,85,NULL),(507,15,85,NULL),(508,14,85,NULL),(509,13,85,NULL),(510,12,85,NULL),(511,17,86,NULL),(512,16,86,NULL),(513,15,86,NULL),(514,14,86,NULL),(515,13,86,NULL),(516,12,86,NULL),(517,17,87,NULL),(518,16,87,NULL),(519,15,87,NULL),(520,14,87,NULL),(521,13,87,NULL),(522,12,87,NULL),(523,17,88,NULL),(524,16,88,NULL),(525,15,88,NULL),(526,14,88,NULL),(527,13,88,NULL),(528,12,88,NULL),(529,17,89,NULL),(530,16,89,NULL),(531,15,89,NULL),(532,14,89,NULL),(533,13,89,NULL),(534,12,89,NULL),(535,17,90,NULL),(536,16,90,NULL),(537,15,90,NULL),(538,14,90,NULL),(539,13,90,NULL),(540,12,90,NULL),(541,17,91,NULL),(542,16,91,NULL),(543,15,91,NULL),(544,14,91,NULL),(545,13,91,NULL),(546,12,91,NULL),(547,17,92,NULL),(548,16,92,NULL),(549,15,92,NULL),(550,14,92,NULL),(551,13,92,NULL),(552,12,92,NULL),(553,17,93,NULL),(554,16,93,NULL),(555,15,93,NULL),(556,14,93,NULL),(557,13,93,NULL),(558,12,93,NULL),(559,17,94,NULL),(560,16,94,NULL),(561,15,94,NULL),(562,14,94,NULL),(563,13,94,NULL),(564,12,94,NULL),(565,17,95,NULL),(566,16,95,NULL),(567,15,95,NULL),(568,14,95,NULL),(569,13,95,NULL),(570,12,95,NULL),(571,17,96,NULL),(572,16,96,NULL),(573,15,96,NULL),(574,14,96,NULL),(575,13,96,NULL),(576,12,96,NULL),(577,17,97,NULL),(578,16,97,NULL),(579,15,97,NULL),(580,14,97,NULL),(581,13,97,NULL),(582,12,97,NULL),(583,17,98,NULL),(584,16,98,NULL),(585,15,98,NULL),(586,14,98,NULL),(587,13,98,NULL),(588,12,98,NULL),(589,17,99,NULL),(590,16,99,NULL),(591,15,99,NULL),(592,14,99,NULL),(593,13,99,NULL),(594,12,99,NULL),(595,17,100,NULL),(596,16,100,NULL),(597,15,100,NULL),(598,14,100,NULL),(599,13,100,NULL),(600,12,100,NULL),(601,17,101,NULL),(602,16,101,NULL),(603,15,101,NULL),(604,14,101,NULL),(605,13,101,NULL),(606,12,101,NULL),(607,17,102,NULL),(608,16,102,NULL),(609,15,102,NULL),(610,14,102,NULL),(611,13,102,NULL),(612,12,102,NULL),(613,17,103,NULL),(614,16,103,NULL),(615,15,103,NULL),(616,14,103,NULL),(617,13,103,NULL),(618,12,103,NULL),(619,17,104,NULL),(620,16,104,NULL),(621,15,104,NULL),(622,14,104,NULL),(623,13,104,NULL),(624,12,104,NULL),(625,17,105,NULL),(626,16,105,NULL),(627,15,105,NULL),(628,14,105,NULL),(629,13,105,NULL),(630,12,105,NULL),(631,17,106,NULL),(632,16,106,NULL),(633,15,106,NULL),(634,14,106,NULL),(635,13,106,NULL),(636,12,106,NULL),(637,17,107,NULL),(638,16,107,NULL),(639,15,107,NULL),(640,14,107,NULL),(641,13,107,NULL),(642,12,107,NULL),(643,17,108,NULL),(644,16,108,NULL),(645,15,108,NULL),(646,14,108,NULL),(647,13,108,NULL),(648,12,108,NULL),(649,17,109,NULL),(650,16,109,NULL),(651,15,109,NULL),(652,14,109,NULL),(653,13,109,NULL),(654,12,109,NULL),(655,17,110,NULL),(656,16,110,NULL),(657,15,110,NULL),(658,14,110,NULL),(659,13,110,NULL),(660,12,110,NULL),(661,17,111,NULL),(662,16,111,NULL),(663,15,111,NULL),(664,14,111,NULL),(665,13,111,NULL),(666,12,111,NULL),(667,17,112,NULL),(668,16,112,NULL),(669,15,112,NULL),(670,14,112,NULL),(671,13,112,NULL),(672,12,112,NULL),(673,17,113,NULL),(674,16,113,NULL),(675,15,113,NULL),(676,14,113,NULL),(677,13,113,NULL),(678,12,113,NULL),(679,17,114,NULL),(680,16,114,NULL),(681,15,114,NULL),(682,14,114,NULL),(683,13,114,NULL),(684,12,114,NULL),(685,17,115,NULL),(686,16,115,NULL),(687,15,115,NULL),(688,14,115,NULL),(689,13,115,NULL),(690,12,115,NULL),(691,17,116,NULL),(692,16,116,NULL),(693,15,116,NULL),(694,14,116,NULL),(695,13,116,NULL),(696,12,116,NULL),(697,17,117,NULL),(698,16,117,NULL),(699,15,117,NULL),(700,14,117,NULL),(701,13,117,NULL),(702,12,117,NULL),(703,17,118,NULL),(704,16,118,NULL),(705,15,118,NULL),(706,14,118,NULL),(707,13,118,NULL),(708,12,118,NULL),(709,17,119,NULL),(710,16,119,NULL),(711,15,119,NULL),(712,14,119,NULL),(713,13,119,NULL),(714,12,119,NULL),(715,17,120,NULL),(716,16,120,NULL),(717,15,120,NULL),(718,14,120,NULL),(719,13,120,NULL),(720,12,120,NULL),(721,17,121,NULL),(722,16,121,NULL),(723,15,121,NULL),(724,14,121,NULL),(725,13,121,NULL),(726,12,121,NULL),(727,17,122,NULL),(728,16,122,NULL),(729,15,122,NULL),(730,14,122,NULL),(731,13,122,NULL),(732,12,122,NULL),(733,17,123,NULL),(734,16,123,NULL),(735,15,123,NULL),(736,14,123,NULL),(737,13,123,NULL),(738,12,123,NULL),(739,17,124,NULL),(740,16,124,NULL),(741,15,124,NULL),(742,14,124,NULL),(743,13,124,NULL),(744,12,124,NULL),(745,17,125,NULL),(746,16,125,NULL),(747,15,125,NULL),(748,14,125,NULL),(749,13,125,NULL),(750,12,125,NULL),(751,17,126,NULL),(752,16,126,NULL),(753,15,126,NULL),(754,14,126,NULL),(755,13,126,NULL),(756,12,126,NULL),(757,17,127,NULL),(758,16,127,NULL),(759,15,127,NULL),(760,14,127,NULL),(761,13,127,NULL),(762,12,127,NULL),(763,17,128,NULL),(764,16,128,NULL),(765,15,128,NULL),(766,14,128,NULL),(767,13,128,NULL),(768,12,128,NULL),(769,17,129,NULL),(770,16,129,NULL),(771,15,129,NULL),(772,14,129,NULL),(773,13,129,NULL),(774,12,129,NULL),(775,17,130,NULL),(776,16,130,NULL),(777,15,130,NULL),(778,14,130,NULL),(779,13,130,NULL),(780,12,130,NULL),(781,17,131,NULL),(782,16,131,NULL),(783,15,131,NULL),(784,14,131,NULL),(785,13,131,NULL),(786,12,131,NULL),(787,17,132,NULL),(788,16,132,NULL),(789,15,132,NULL),(790,14,132,NULL),(791,13,132,NULL),(792,12,132,NULL),(793,17,133,NULL),(794,16,133,NULL),(795,15,133,NULL),(796,14,133,NULL),(797,13,133,NULL),(798,12,133,NULL),(799,17,134,NULL),(800,16,134,NULL),(801,15,134,NULL),(802,14,134,NULL),(803,13,134,NULL),(804,12,134,NULL),(805,17,135,NULL),(806,16,135,NULL),(807,15,135,NULL),(808,14,135,NULL),(809,13,135,NULL),(810,12,135,NULL),(811,17,136,NULL),(812,16,136,NULL),(813,15,136,NULL),(814,14,136,NULL),(815,13,136,NULL),(816,12,136,NULL),(817,17,137,NULL),(818,16,137,NULL),(819,15,137,NULL),(820,14,137,NULL),(821,13,137,NULL),(822,12,137,NULL),(823,17,138,NULL),(824,16,138,NULL),(825,15,138,NULL),(826,14,138,NULL),(827,13,138,NULL),(828,12,138,NULL),(829,17,139,NULL),(830,16,139,NULL),(831,15,139,NULL),(832,14,139,NULL),(833,13,139,NULL),(834,12,139,NULL),(835,17,140,NULL),(836,16,140,NULL),(837,15,140,NULL),(838,14,140,NULL),(839,13,140,NULL),(840,12,140,NULL),(841,17,141,NULL),(842,16,141,NULL),(843,15,141,NULL),(844,14,141,NULL),(845,13,141,NULL),(846,12,141,NULL),(847,17,142,NULL),(848,16,142,NULL),(849,15,142,NULL),(850,14,142,NULL),(851,13,142,NULL),(852,12,142,NULL),(853,17,143,NULL),(854,16,143,NULL),(855,15,143,NULL),(856,14,143,NULL),(857,13,143,NULL),(858,12,143,NULL),(859,17,144,NULL),(860,16,144,NULL),(861,15,144,NULL),(862,14,144,NULL),(863,13,144,NULL),(864,12,144,NULL),(865,17,145,NULL),(866,16,145,NULL),(867,15,145,NULL),(868,14,145,NULL),(869,13,145,NULL),(870,12,145,NULL),(871,17,146,NULL),(872,16,146,NULL),(873,15,146,NULL),(874,14,146,NULL),(875,13,146,NULL),(876,12,146,NULL),(877,17,147,NULL),(878,16,147,NULL),(879,15,147,NULL),(880,14,147,NULL),(881,13,147,NULL),(882,12,147,NULL),(883,17,148,NULL),(884,16,148,NULL),(885,15,148,NULL),(886,14,148,NULL),(887,13,148,NULL),(888,12,148,NULL),(889,17,149,NULL),(890,16,149,NULL),(891,15,149,NULL),(892,14,149,NULL),(893,13,149,NULL),(894,12,149,NULL),(895,17,150,NULL),(896,16,150,NULL),(897,15,150,NULL),(898,14,150,NULL),(899,13,150,NULL),(900,12,150,NULL),(901,17,151,NULL),(902,16,151,NULL),(903,15,151,NULL),(904,14,151,NULL),(905,13,151,NULL),(906,12,151,NULL),(907,17,152,NULL),(908,16,152,NULL),(909,15,152,NULL),(910,14,152,NULL),(911,13,152,NULL),(912,12,152,NULL),(913,17,153,NULL),(914,16,153,NULL),(915,15,153,NULL),(916,14,153,NULL),(917,13,153,NULL),(918,12,153,NULL),(2047,30,1,4),(2048,29,1,8),(2049,28,1,7),(2050,27,1,3),(2051,26,1,3),(2052,30,2,9),(2053,29,2,8),(2054,28,2,7),(2055,27,2,3),(2056,26,2,3),(2057,30,3,9),(2058,29,3,8),(2059,28,3,7),(2060,27,3,3),(2061,26,3,3),(2062,30,4,9),(2063,29,4,8),(2064,28,4,7),(2065,27,4,3),(2066,26,4,3),(2067,30,5,9),(2068,29,5,8),(2069,28,5,7),(2070,27,5,3),(2071,26,5,3),(2072,30,6,9),(2073,29,6,8),(2074,28,6,7),(2075,27,6,3),(2076,26,6,3),(2077,30,7,9),(2078,29,7,8),(2079,28,7,7),(2080,27,7,3),(2081,26,7,3),(2082,30,8,9),(2083,29,8,8),(2084,28,8,7),(2085,27,8,3),(2086,26,8,3),(2087,30,9,9),(2088,29,9,8),(2089,28,9,7),(2090,27,9,3),(2091,26,9,3),(2092,30,10,9),(2093,29,10,8),(2094,28,10,7),(2095,27,10,3),(2096,26,10,3),(2097,30,11,9),(2098,29,11,8),(2099,28,11,7),(2100,27,11,3),(2101,26,11,3),(2102,30,12,9),(2103,29,12,8),(2104,28,12,7),(2105,27,12,3),(2106,26,12,3),(2107,30,13,9),(2108,29,13,8),(2109,28,13,7),(2110,27,13,3),(2111,26,13,3),(2112,30,14,9),(2113,29,14,8),(2114,28,14,7),(2115,27,14,3),(2116,26,14,3),(2117,30,15,9),(2118,29,15,8),(2119,28,15,7),(2120,27,15,3),(2121,26,15,3),(2122,30,16,9),(2123,29,16,8),(2124,28,16,7),(2125,27,16,3),(2126,26,16,3),(2127,30,17,9),(2128,29,17,8),(2129,28,17,7),(2130,27,17,3),(2131,26,17,3),(2132,30,18,9),(2133,29,18,8),(2134,28,18,7),(2135,27,18,3),(2136,26,18,3),(2137,30,19,9),(2138,29,19,8),(2139,28,19,7),(2140,27,19,3),(2141,26,19,3),(2142,30,20,9),(2143,29,20,8),(2144,28,20,7),(2145,27,20,3),(2146,26,20,3),(2147,30,21,9),(2148,29,21,8),(2149,28,21,7),(2150,27,21,3),(2151,26,21,3),(2152,30,22,9),(2153,29,22,8),(2154,28,22,7),(2155,27,22,3),(2156,26,22,3),(2157,30,23,9),(2158,29,23,8),(2159,28,23,7),(2160,27,23,3),(2161,26,23,3),(2162,30,24,9),(2163,29,24,8),(2164,28,24,7),(2165,27,24,3),(2166,26,24,3),(2167,30,25,9),(2168,29,25,8),(2169,28,25,7),(2170,27,25,3),(2171,26,25,3),(2172,30,26,9),(2173,29,26,8),(2174,28,26,7),(2175,27,26,3),(2176,26,26,3),(2177,30,27,9),(2178,29,27,8),(2179,28,27,7),(2180,27,27,3),(2181,26,27,3),(2182,30,28,9),(2183,29,28,8),(2184,28,28,7),(2185,27,28,3),(2186,26,28,3),(2187,30,29,9),(2188,29,29,8),(2189,28,29,7),(2190,27,29,3),(2191,26,29,3),(2192,30,30,9),(2193,29,30,8),(2194,28,30,7),(2195,27,30,3),(2196,26,30,3),(2197,30,31,9),(2198,29,31,8),(2199,28,31,7),(2200,27,31,3),(2201,26,31,3),(2202,30,32,9),(2203,29,32,8),(2204,28,32,7),(2205,27,32,3),(2206,26,32,3),(2207,30,33,9),(2208,29,33,8),(2209,28,33,7),(2210,27,33,3),(2211,26,33,3),(2212,30,34,9),(2213,29,34,8),(2214,28,34,7),(2215,27,34,3),(2216,26,34,3),(2217,30,35,9),(2218,29,35,8),(2219,28,35,7),(2220,27,35,3),(2221,26,35,3),(2222,30,36,9),(2223,29,36,8),(2224,28,36,7),(2225,27,36,3),(2226,26,36,3),(2227,30,37,9),(2228,29,37,8),(2229,28,37,7),(2230,27,37,3),(2231,26,37,3),(2232,30,38,9),(2233,29,38,8),(2234,28,38,7),(2235,27,38,3),(2236,26,38,3),(2237,30,39,9),(2238,29,39,8),(2239,28,39,7),(2240,27,39,3),(2241,26,39,3),(2242,30,40,9),(2243,29,40,8),(2244,28,40,7),(2245,27,40,3),(2246,26,40,3),(2247,30,41,9),(2248,29,41,8),(2249,28,41,7),(2250,27,41,3),(2251,26,41,3),(2252,30,42,9),(2253,29,42,8),(2254,28,42,7),(2255,27,42,3),(2256,26,42,3),(2257,30,43,9),(2258,29,43,8),(2259,28,43,7),(2260,27,43,3),(2261,26,43,3),(2262,30,44,9),(2263,29,44,8),(2264,28,44,7),(2265,27,44,3),(2266,26,44,3),(2267,30,45,9),(2268,29,45,8),(2269,28,45,7),(2270,27,45,3),(2271,26,45,3),(2272,30,46,9),(2273,29,46,8),(2274,28,46,7),(2275,27,46,3),(2276,26,46,3),(2277,30,47,9),(2278,29,47,8),(2279,28,47,7),(2280,27,47,3),(2281,26,47,3),(2282,30,48,9),(2283,29,48,8),(2284,28,48,7),(2285,27,48,3),(2286,26,48,3),(2287,30,49,9),(2288,29,49,8),(2289,28,49,7),(2290,27,49,3),(2291,26,49,3),(2292,30,50,9),(2293,29,50,8),(2294,28,50,7),(2295,27,50,3),(2296,26,50,3),(2297,30,51,9),(2298,29,51,8),(2299,28,51,7),(2300,27,51,3),(2301,26,51,3),(2302,30,52,9),(2303,29,52,8),(2304,28,52,7),(2305,27,52,3),(2306,26,52,3),(2307,30,53,9),(2308,29,53,8),(2309,28,53,7),(2310,27,53,3),(2311,26,53,3),(2312,30,54,9),(2313,29,54,8),(2314,28,54,7),(2315,27,54,3),(2316,26,54,3),(2317,30,55,9),(2318,29,55,8),(2319,28,55,7),(2320,27,55,3),(2321,26,55,3),(2322,30,56,9),(2323,29,56,8),(2324,28,56,7),(2325,27,56,3),(2326,26,56,3),(2327,30,57,9),(2328,29,57,8),(2329,28,57,7),(2330,27,57,3),(2331,26,57,3),(2332,30,58,9),(2333,29,58,8),(2334,28,58,7),(2335,27,58,3),(2336,26,58,3),(2337,30,59,9),(2338,29,59,8),(2339,28,59,7),(2340,27,59,3),(2341,26,59,3),(2342,30,60,9),(2343,29,60,8),(2344,28,60,7),(2345,27,60,3),(2346,26,60,3),(2347,30,61,9),(2348,29,61,8),(2349,28,61,7),(2350,27,61,3),(2351,26,61,3),(2352,30,62,9),(2353,29,62,8),(2354,28,62,7),(2355,27,62,3),(2356,26,62,3),(2357,30,63,9),(2358,29,63,8),(2359,28,63,7),(2360,27,63,3),(2361,26,63,3),(2362,30,64,9),(2363,29,64,8),(2364,28,64,7),(2365,27,64,3),(2366,26,64,3),(2367,30,65,9),(2368,29,65,8),(2369,28,65,7),(2370,27,65,3),(2371,26,65,3),(2372,30,66,9),(2373,29,66,8),(2374,28,66,7),(2375,27,66,3),(2376,26,66,3),(2377,30,67,9),(2378,29,67,8),(2379,28,67,7),(2380,27,67,3),(2381,26,67,3),(2382,30,68,9),(2383,29,68,8),(2384,28,68,7),(2385,27,68,3),(2386,26,68,3),(2387,30,69,9),(2388,29,69,8),(2389,28,69,7),(2390,27,69,3),(2391,26,69,3),(2392,30,70,9),(2393,29,70,8),(2394,28,70,7),(2395,27,70,3),(2396,26,70,3),(2397,30,71,9),(2398,29,71,8),(2399,28,71,7),(2400,27,71,3),(2401,26,71,3),(2402,30,72,9),(2403,29,72,8),(2404,28,72,7),(2405,27,72,3),(2406,26,72,3),(2407,30,73,9),(2408,29,73,8),(2409,28,73,7),(2410,27,73,3),(2411,26,73,3),(2412,30,74,9),(2413,29,74,8),(2414,28,74,7),(2415,27,74,3),(2416,26,74,3),(2417,30,75,9),(2418,29,75,8),(2419,28,75,7),(2420,27,75,3),(2421,26,75,3),(2422,30,76,9),(2423,29,76,8),(2424,28,76,7),(2425,27,76,3),(2426,26,76,3),(2427,30,77,9),(2428,29,77,8),(2429,28,77,7),(2430,27,77,3),(2431,26,77,3),(2432,30,78,9),(2433,29,78,8),(2434,28,78,7),(2435,27,78,3),(2436,26,78,3),(2437,30,79,9),(2438,29,79,8),(2439,28,79,7),(2440,27,79,3),(2441,26,79,3),(2442,30,80,9),(2443,29,80,8),(2444,28,80,7),(2445,27,80,3),(2446,26,80,3),(2447,30,81,9),(2448,29,81,8),(2449,28,81,7),(2450,27,81,3),(2451,26,81,3),(2452,30,82,9),(2453,29,82,8),(2454,28,82,7),(2455,27,82,3),(2456,26,82,3),(2457,30,83,9),(2458,29,83,8),(2459,28,83,7),(2460,27,83,3),(2461,26,83,3),(2462,30,84,9),(2463,29,84,8),(2464,28,84,7),(2465,27,84,3),(2466,26,84,3),(2467,30,85,9),(2468,29,85,8),(2469,28,85,7),(2470,27,85,3),(2471,26,85,3),(2472,30,86,9),(2473,29,86,8),(2474,28,86,7),(2475,27,86,3),(2476,26,86,3),(2477,30,87,9),(2478,29,87,8),(2479,28,87,7),(2480,27,87,3),(2481,26,87,3),(2482,30,88,9),(2483,29,88,8),(2484,28,88,7),(2485,27,88,3),(2486,26,88,3),(2487,30,89,9),(2488,29,89,8),(2489,28,89,7),(2490,27,89,3),(2491,26,89,3),(2492,30,90,9),(2493,29,90,8),(2494,28,90,7),(2495,27,90,3),(2496,26,90,3),(2497,30,91,9),(2498,29,91,8),(2499,28,91,7),(2500,27,91,3),(2501,26,91,3),(2502,30,92,9),(2503,29,92,8),(2504,28,92,7),(2505,27,92,3),(2506,26,92,3),(2507,30,93,9),(2508,29,93,8),(2509,28,93,7),(2510,27,93,3),(2511,26,93,3),(2512,30,94,9),(2513,29,94,8),(2514,28,94,7),(2515,27,94,3),(2516,26,94,3),(2517,30,95,9),(2518,29,95,8),(2519,28,95,7),(2520,27,95,3),(2521,26,95,3),(2522,30,96,9),(2523,29,96,8),(2524,28,96,7),(2525,27,96,3),(2526,26,96,3),(2527,30,97,9),(2528,29,97,8),(2529,28,97,7),(2530,27,97,3),(2531,26,97,3),(2532,30,98,9),(2533,29,98,8),(2534,28,98,7),(2535,27,98,3),(2536,26,98,3),(2537,30,99,9),(2538,29,99,8),(2539,28,99,7),(2540,27,99,3),(2541,26,99,3),(2542,30,100,9),(2543,29,100,8),(2544,28,100,7),(2545,27,100,3),(2546,26,100,3),(2547,30,101,9),(2548,29,101,8),(2549,28,101,7),(2550,27,101,3),(2551,26,101,3),(2552,30,102,9),(2553,29,102,8),(2554,28,102,7),(2555,27,102,3),(2556,26,102,3),(2557,30,103,9),(2558,29,103,8),(2559,28,103,7),(2560,27,103,3),(2561,26,103,3),(2562,30,104,9),(2563,29,104,8),(2564,28,104,7),(2565,27,104,3),(2566,26,104,3),(2567,30,105,9),(2568,29,105,8),(2569,28,105,7),(2570,27,105,3),(2571,26,105,3),(2572,30,106,9),(2573,29,106,8),(2574,28,106,7),(2575,27,106,3),(2576,26,106,3),(2577,30,107,9),(2578,29,107,8),(2579,28,107,7),(2580,27,107,3),(2581,26,107,3),(2582,30,108,9),(2583,29,108,8),(2584,28,108,7),(2585,27,108,3),(2586,26,108,3),(2587,30,109,9),(2588,29,109,8),(2589,28,109,7),(2590,27,109,3),(2591,26,109,3),(2592,30,110,9),(2593,29,110,8),(2594,28,110,7),(2595,27,110,3),(2596,26,110,3),(2597,30,111,9),(2598,29,111,8),(2599,28,111,7),(2600,27,111,3),(2601,26,111,3),(2602,30,112,9),(2603,29,112,8),(2604,28,112,7),(2605,27,112,3),(2606,26,112,3),(2607,30,113,9),(2608,29,113,8),(2609,28,113,7),(2610,27,113,3),(2611,26,113,3),(2612,30,114,9),(2613,29,114,8),(2614,28,114,7),(2615,27,114,3),(2616,26,114,3),(2617,30,115,9),(2618,29,115,8),(2619,28,115,7),(2620,27,115,3),(2621,26,115,3),(2622,30,116,9),(2623,29,116,8),(2624,28,116,7),(2625,27,116,3),(2626,26,116,3),(2627,30,117,9),(2628,29,117,8),(2629,28,117,7),(2630,27,117,3),(2631,26,117,3),(2632,30,118,9),(2633,29,118,8),(2634,28,118,7),(2635,27,118,3),(2636,26,118,3),(2637,30,119,9),(2638,29,119,8),(2639,28,119,7),(2640,27,119,3),(2641,26,119,3),(2642,30,120,9),(2643,29,120,8),(2644,28,120,7),(2645,27,120,3),(2646,26,120,3),(2647,30,121,9),(2648,29,121,8),(2649,28,121,7),(2650,27,121,3),(2651,26,121,3),(2652,30,122,9),(2653,29,122,8),(2654,28,122,7),(2655,27,122,3),(2656,26,122,3),(2657,30,123,9),(2658,29,123,8),(2659,28,123,7),(2660,27,123,3),(2661,26,123,3),(2662,30,124,9),(2663,29,124,8),(2664,28,124,7),(2665,27,124,3),(2666,26,124,3),(2667,30,125,9),(2668,29,125,8),(2669,28,125,7),(2670,27,125,3),(2671,26,125,3),(2672,30,126,9),(2673,29,126,8),(2674,28,126,7),(2675,27,126,3),(2676,26,126,3),(2677,30,127,9),(2678,29,127,8),(2679,28,127,7),(2680,27,127,3),(2681,26,127,3),(2682,30,128,9),(2683,29,128,8),(2684,28,128,7),(2685,27,128,3),(2686,26,128,3),(2687,30,129,9),(2688,29,129,8),(2689,28,129,7),(2690,27,129,3),(2691,26,129,3),(2692,30,130,9),(2693,29,130,8),(2694,28,130,7),(2695,27,130,3),(2696,26,130,3),(2697,30,131,9),(2698,29,131,8),(2699,28,131,7),(2700,27,131,3),(2701,26,131,3),(2702,30,132,9),(2703,29,132,8),(2704,28,132,7),(2705,27,132,3),(2706,26,132,3),(2707,30,133,9),(2708,29,133,8),(2709,28,133,7),(2710,27,133,3),(2711,26,133,3),(2712,30,134,9),(2713,29,134,8),(2714,28,134,7),(2715,27,134,3),(2716,26,134,3),(2717,30,135,9),(2718,29,135,8),(2719,28,135,7),(2720,27,135,3),(2721,26,135,3),(2722,30,136,9),(2723,29,136,8),(2724,28,136,7),(2725,27,136,3),(2726,26,136,3),(2727,30,137,9),(2728,29,137,8),(2729,28,137,7),(2730,27,137,3),(2731,26,137,3),(2732,30,138,9),(2733,29,138,8),(2734,28,138,7),(2735,27,138,3),(2736,26,138,3),(2737,30,139,9),(2738,29,139,8),(2739,28,139,7),(2740,27,139,3),(2741,26,139,3),(2742,30,140,9),(2743,29,140,8),(2744,28,140,7),(2745,27,140,3),(2746,26,140,3),(2747,30,141,9),(2748,29,141,8),(2749,28,141,7),(2750,27,141,3),(2751,26,141,3),(2752,30,142,9),(2753,29,142,8),(2754,28,142,7),(2755,27,142,3),(2756,26,142,3),(2757,30,143,9),(2758,29,143,8),(2759,28,143,7),(2760,27,143,3),(2761,26,143,3),(2762,30,144,9),(2763,29,144,8),(2764,28,144,7),(2765,27,144,3),(2766,26,144,3),(2767,30,145,9),(2768,29,145,8),(2769,28,145,7),(2770,27,145,3),(2771,26,145,3),(2772,30,146,9),(2773,29,146,8),(2774,28,146,7),(2775,27,146,3),(2776,26,146,3),(2777,30,147,9),(2778,29,147,8),(2779,28,147,7),(2780,27,147,3),(2781,26,147,3),(2782,30,148,9),(2783,29,148,8),(2784,28,148,7),(2785,27,148,3),(2786,26,148,3),(2787,30,149,9),(2788,29,149,8),(2789,28,149,7),(2790,27,149,3),(2791,26,149,3),(2792,30,150,9),(2793,29,150,8),(2794,28,150,7),(2795,27,150,3),(2796,26,150,3),(2797,30,151,9),(2798,29,151,8),(2799,28,151,7),(2800,27,151,3),(2801,26,151,3),(2802,30,152,9),(2803,29,152,8),(2804,28,152,7),(2805,27,152,3),(2806,26,152,3),(2807,30,153,9),(2808,29,153,8),(2809,28,153,7),(2810,27,153,3),(2811,26,153,3),(2830,20,2,8),(2831,21,2,8),(2832,22,2,9),(2833,23,2,10),(2834,24,2,9),(2835,25,2,9),(2836,20,3,7),(2837,21,3,8),(2838,22,3,9),(2839,23,3,10),(2840,24,3,9),(2841,25,3,7),(2842,20,4,7),(2843,21,4,7),(2844,22,4,9),(2845,23,4,10),(2846,24,4,9),(2847,25,4,7),(2848,20,5,7),(2849,21,5,8),(2850,22,5,9),(2851,23,5,10),(2852,24,5,9),(2853,25,5,7),(2854,20,6,7),(2855,21,6,8),(2856,22,6,9),(2857,23,6,10),(2858,24,6,9),(2859,25,6,7),(2860,20,7,7),(2861,21,7,8),(2862,22,7,9),(2863,23,7,10),(2864,24,7,9),(2865,25,7,7),(2866,20,8,10),(2867,21,8,8),(2868,22,8,9),(2869,23,8,10),(2870,24,8,9),(2871,25,8,7),(2872,20,9,7),(2873,21,9,8),(2874,22,9,9),(2875,23,9,10),(2876,24,9,9),(2877,25,9,7),(2878,20,10,7),(2879,21,10,8),(2880,22,10,9),(2881,23,10,10),(2882,24,10,9),(2883,25,10,7),(2884,20,11,7),(2885,21,11,8),(2886,22,11,9),(2887,23,11,10),(2888,24,11,9),(2889,25,11,7),(2890,20,12,7),(2891,21,12,8),(2892,22,12,9),(2893,23,12,10),(2894,24,12,9),(2895,25,12,7),(2896,20,13,7),(2897,21,13,8),(2898,22,13,9),(2899,23,13,10),(2900,24,13,9),(2901,25,13,7),(2902,20,14,7),(2903,21,14,8),(2904,22,14,9),(2905,23,14,10),(2906,24,14,9),(2907,25,14,7),(2908,20,15,7),(2909,21,15,8),(2910,22,15,9),(2911,23,15,10),(2912,24,15,9),(2913,25,15,7),(2914,20,16,7),(2915,21,16,8),(2916,22,16,9),(2917,23,16,10),(2918,24,16,9),(2919,25,16,7),(2920,20,17,7),(2921,21,17,8),(2922,22,17,9),(2923,23,17,10),(2924,24,17,9),(2925,25,17,7),(2926,20,18,7),(2927,21,18,8),(2928,22,18,9),(2929,23,18,10),(2930,24,18,9),(2931,25,18,7),(2932,20,19,7),(2933,21,19,8),(2934,22,19,9),(2935,23,19,10),(2936,24,19,9),(2937,25,19,7),(2938,20,20,7),(2939,21,20,8),(2940,22,20,9),(2941,23,20,10),(2942,24,20,9),(2943,25,20,7),(2944,20,21,7),(2945,21,21,8),(2946,22,21,9),(2947,23,21,10),(2948,24,21,9),(2949,25,21,7),(2950,20,22,7),(2951,21,22,8),(2952,22,22,9),(2953,23,22,10),(2954,24,22,9),(2955,25,22,7),(2956,20,23,7),(2957,21,23,8),(2958,22,23,9),(2959,23,23,10),(2960,24,23,9),(2961,25,23,7),(2962,20,24,7),(2963,21,24,8),(2964,22,24,9),(2965,23,24,10),(2966,24,24,9),(2967,25,24,7),(2968,20,25,7),(2969,21,25,8),(2970,22,25,9),(2971,23,25,10),(2972,24,25,9),(2973,25,25,7),(2974,20,26,7),(2975,21,26,8),(2976,22,26,9),(2977,23,26,10),(2978,24,26,9),(2979,25,26,7),(2980,20,27,7),(2981,21,27,8),(2982,22,27,9),(2983,23,27,10),(2984,24,27,9),(2985,25,27,7),(2986,20,28,7),(2987,21,28,8),(2988,22,28,9),(2989,23,28,10),(2990,24,28,9),(2991,25,28,7),(2992,20,29,7),(2993,21,29,8),(2994,22,29,9),(2995,23,29,10),(2996,24,29,9),(2997,25,29,7),(2998,20,30,7),(2999,21,30,8),(3000,22,30,9),(3001,23,30,10),(3002,24,30,9),(3003,25,30,7),(3004,20,31,7),(3005,21,31,8),(3006,22,31,9),(3007,23,31,10),(3008,24,31,9),(3009,25,31,7),(3010,20,32,7),(3011,21,32,8),(3012,22,32,9),(3013,23,32,10),(3014,24,32,9),(3015,25,32,7),(3016,20,33,7),(3017,21,33,8),(3018,22,33,9),(3019,23,33,10),(3020,24,33,9),(3021,25,33,7),(3022,20,34,7),(3023,21,34,8),(3024,22,34,9),(3025,23,34,10),(3026,24,34,9),(3027,25,34,7),(3028,20,35,7),(3029,21,35,8),(3030,22,35,9),(3031,23,35,10),(3032,24,35,9),(3033,25,35,7),(3034,20,36,7),(3035,21,36,8),(3036,22,36,9),(3037,23,36,10),(3038,24,36,9),(3039,25,36,7),(3040,20,37,7),(3041,21,37,8),(3042,22,37,9),(3043,23,37,10),(3044,24,37,9),(3045,25,37,7),(3046,20,38,7),(3047,21,38,8),(3048,22,38,9),(3049,23,38,10),(3050,24,38,9),(3051,25,38,7),(3052,20,39,7),(3053,21,39,8),(3054,22,39,9),(3055,23,39,10),(3056,24,39,9),(3057,25,39,7),(3058,20,40,7),(3059,21,40,8),(3060,22,40,9),(3061,23,40,10),(3062,24,40,9),(3063,25,40,7),(3064,20,41,7),(3065,21,41,8),(3066,22,41,9),(3067,23,41,10),(3068,24,41,9),(3069,25,41,7),(3070,20,42,7),(3071,21,42,8),(3072,22,42,9),(3073,23,42,10),(3074,24,42,9),(3075,25,42,7),(3076,20,43,7),(3077,21,43,8),(3078,22,43,9),(3079,23,43,10),(3080,24,43,9),(3081,25,43,7),(3082,20,44,7),(3083,21,44,8),(3084,22,44,9),(3085,23,44,10),(3086,24,44,9),(3087,25,44,7),(3088,20,45,7),(3089,21,45,8),(3090,22,45,9),(3091,23,45,10),(3092,24,45,9),(3093,25,45,7),(3094,20,46,7),(3095,21,46,8),(3096,22,46,9),(3097,23,46,10),(3098,24,46,9),(3099,25,46,7),(3100,20,47,7),(3101,21,47,8),(3102,22,47,9),(3103,23,47,10),(3104,24,47,9),(3105,25,47,7),(3106,20,48,7),(3107,21,48,8),(3108,22,48,9),(3109,23,48,10),(3110,24,48,9),(3111,25,48,7),(3112,20,49,7),(3113,21,49,8),(3114,22,49,9),(3115,23,49,10),(3116,24,49,9),(3117,25,49,7),(3118,20,50,7),(3119,21,50,8),(3120,22,50,9),(3121,23,50,10),(3122,24,50,9),(3123,25,50,7),(3124,20,51,7),(3125,21,51,8),(3126,22,51,9),(3127,23,51,10),(3128,24,51,9),(3129,25,51,7),(3130,20,52,7),(3131,21,52,8),(3132,22,52,9),(3133,23,52,10),(3134,24,52,9),(3135,25,52,7),(3136,20,53,7),(3137,21,53,8),(3138,22,53,9),(3139,23,53,10),(3140,24,53,9),(3141,25,53,7),(3142,20,54,7),(3143,21,54,8),(3144,22,54,9),(3145,23,54,10),(3146,24,54,9),(3147,25,54,7),(3148,20,55,7),(3149,21,55,8),(3150,22,55,9),(3151,23,55,10),(3152,24,55,9),(3153,25,55,7),(3154,20,56,7),(3155,21,56,8),(3156,22,56,9),(3157,23,56,9),(3158,24,56,9),(3159,25,56,7),(3160,20,57,7),(3161,21,57,8),(3162,22,57,9),(3163,23,57,10),(3164,24,57,9),(3165,25,57,7),(3166,20,58,7),(3167,21,58,8),(3168,22,58,9),(3169,23,58,10),(3170,24,58,9),(3171,25,58,7),(3172,20,59,7),(3173,21,59,8),(3174,22,59,9),(3175,23,59,10),(3176,24,59,9),(3177,25,59,7),(3178,20,60,7),(3179,21,60,8),(3180,22,60,9),(3181,23,60,10),(3182,24,60,9),(3183,25,60,7),(3184,20,61,7),(3185,21,61,8),(3186,22,61,9),(3187,23,61,10),(3188,24,61,9),(3189,25,61,7),(3190,20,62,7),(3191,21,62,8),(3192,22,62,9),(3193,23,62,10),(3194,24,62,9),(3195,25,62,7),(3196,20,63,7),(3197,21,63,8),(3198,22,63,9),(3199,23,63,10),(3200,24,63,9),(3201,25,63,7),(3202,20,64,7),(3203,21,64,8),(3204,22,64,9),(3205,23,64,10),(3206,24,64,9),(3207,25,64,7),(3208,20,65,7),(3209,21,65,8),(3210,22,65,9),(3211,23,65,10),(3212,24,65,9),(3213,25,65,7),(3214,20,66,7),(3215,21,66,8),(3216,22,66,9),(3217,23,66,10),(3218,24,66,9),(3219,25,66,7),(3220,20,67,7),(3221,21,67,8),(3222,22,67,9),(3223,23,67,10),(3224,24,67,9),(3225,25,67,7),(3226,20,68,7),(3227,21,68,8),(3228,22,68,9),(3229,23,68,10),(3230,24,68,9),(3231,25,68,7),(3232,20,69,7),(3233,21,69,8),(3234,22,69,9),(3235,23,69,10),(3236,24,69,9),(3237,25,69,7),(3238,20,70,7),(3239,21,70,8),(3240,22,70,9),(3241,23,70,10),(3242,24,70,9),(3243,25,70,7),(3244,20,71,7),(3245,21,71,8),(3246,22,71,9),(3247,23,71,10),(3248,24,71,9),(3249,25,71,7),(3250,20,72,7),(3251,21,72,8),(3252,22,72,9),(3253,23,72,10),(3254,24,72,9),(3255,25,72,7),(3256,20,73,7),(3257,21,73,8),(3258,22,73,9),(3259,23,73,10),(3260,24,73,9),(3261,25,73,7),(3262,20,74,7),(3263,21,74,8),(3264,22,74,9),(3265,23,74,10),(3266,24,74,9),(3267,25,74,7),(3268,20,75,7),(3269,21,75,8),(3270,22,75,9),(3271,23,75,10),(3272,24,75,9),(3273,25,75,7),(3274,20,76,7),(3275,21,76,8),(3276,22,76,9),(3277,23,76,10),(3278,24,76,9),(3279,25,76,7),(3280,20,77,7),(3281,21,77,8),(3282,22,77,9),(3283,23,77,10),(3284,24,77,9),(3285,25,77,7),(3286,20,78,7),(3287,21,78,8),(3288,22,78,9),(3289,23,78,10),(3290,24,78,9),(3291,25,78,7),(3292,20,79,7),(3293,21,79,8),(3294,22,79,9),(3295,23,79,10),(3296,24,79,9),(3297,25,79,7),(3298,20,80,7),(3299,21,80,8),(3300,22,80,9),(3301,23,80,10),(3302,24,80,9),(3303,25,80,7),(3304,20,81,7),(3305,21,81,8),(3306,22,81,9),(3307,23,81,10),(3308,24,81,9),(3309,25,81,7),(3310,20,82,7),(3311,21,82,8),(3312,22,82,9),(3313,23,82,10),(3314,24,82,9),(3315,25,82,7),(3316,20,83,7),(3317,21,83,8),(3318,22,83,9),(3319,23,83,10),(3320,24,83,9),(3321,25,83,7),(3322,20,84,7),(3323,21,84,8),(3324,22,84,9),(3325,23,84,10),(3326,24,84,9),(3327,25,84,7),(3328,20,85,7),(3329,21,85,8),(3330,22,85,9),(3331,23,85,10),(3332,24,85,9),(3333,25,85,7),(3334,20,86,7),(3335,21,86,8),(3336,22,86,9),(3337,23,86,10),(3338,24,86,9),(3339,25,86,7),(3340,20,87,7),(3341,21,87,8),(3342,22,87,9),(3343,23,87,10),(3344,24,87,9),(3345,25,87,7),(3346,20,88,7),(3347,21,88,8),(3348,22,88,9),(3349,23,88,10),(3350,24,88,9),(3351,25,88,7),(3352,20,89,7),(3353,21,89,8),(3354,22,89,9),(3355,23,89,10),(3356,24,89,9),(3357,25,89,7),(3358,20,90,7),(3359,21,90,8),(3360,22,90,9),(3361,23,90,10),(3362,24,90,9),(3363,25,90,7),(3364,20,91,7),(3365,21,91,8),(3366,22,91,9),(3367,23,91,10),(3368,24,91,9),(3369,25,91,7),(3370,20,92,7),(3371,21,92,8),(3372,22,92,9),(3373,23,92,10),(3374,24,92,9),(3375,25,92,7),(3376,20,93,7),(3377,21,93,8),(3378,22,93,9),(3379,23,93,10),(3380,24,93,9),(3381,25,93,7),(3382,20,94,7),(3383,21,94,8),(3384,22,94,9),(3385,23,94,10),(3386,24,94,9),(3387,25,94,7),(3388,20,95,7),(3389,21,95,8),(3390,22,95,9),(3391,23,95,10),(3392,24,95,9),(3393,25,95,7),(3394,20,96,7),(3395,21,96,8),(3396,22,96,9),(3397,23,96,10),(3398,24,96,9),(3399,25,96,7),(3400,20,97,7),(3401,21,97,8),(3402,22,97,9),(3403,23,97,10),(3404,24,97,9),(3405,25,97,7),(3406,20,98,7),(3407,21,98,8),(3408,22,98,9),(3409,23,98,10),(3410,24,98,9),(3411,25,98,7),(3412,20,99,7),(3413,21,99,8),(3414,22,99,9),(3415,23,99,10),(3416,24,99,9),(3417,25,99,7),(3418,20,100,7),(3419,21,100,8),(3420,22,100,9),(3421,23,100,10),(3422,24,100,9),(3423,25,100,7),(3424,20,101,7),(3425,21,101,8),(3426,22,101,9),(3427,23,101,10),(3428,24,101,9),(3429,25,101,7),(3430,20,102,7),(3431,21,102,8),(3432,22,102,9),(3433,23,102,10),(3434,24,102,9),(3435,25,102,7),(3436,20,103,7),(3437,21,103,8),(3438,22,103,9),(3439,23,103,10),(3440,24,103,9),(3441,25,103,7),(3442,20,104,7),(3443,21,104,8),(3444,22,104,9),(3445,23,104,10),(3446,24,104,9),(3447,25,104,7),(3448,20,105,7),(3449,21,105,8),(3450,22,105,9),(3451,23,105,10),(3452,24,105,9),(3453,25,105,7),(3454,20,106,7),(3455,21,106,8),(3456,22,106,9),(3457,23,106,10),(3458,24,106,9),(3459,25,106,7),(3460,20,107,7),(3461,21,107,8),(3462,22,107,9),(3463,23,107,10),(3464,24,107,9),(3465,25,107,7),(3466,20,108,7),(3467,21,108,8),(3468,22,108,9),(3469,23,108,10),(3470,24,108,9),(3471,25,108,7),(3472,20,109,7),(3473,21,109,8),(3474,22,109,9),(3475,23,109,10),(3476,24,109,9),(3477,25,109,7),(3478,20,110,7),(3479,21,110,8),(3480,22,110,9),(3481,23,110,10),(3482,24,110,9),(3483,25,110,7),(3484,20,111,7),(3485,21,111,8),(3486,22,111,9),(3487,23,111,10),(3488,24,111,9),(3489,25,111,7),(3490,20,112,7),(3491,21,112,8),(3492,22,112,9),(3493,23,112,10),(3494,24,112,9),(3495,25,112,7),(3496,20,113,7),(3497,21,113,8),(3498,22,113,9),(3499,23,113,10),(3500,24,113,9),(3501,25,113,7),(3502,20,114,7),(3503,21,114,8),(3504,22,114,9),(3505,23,114,10),(3506,24,114,9),(3507,25,114,7),(3508,20,115,7),(3509,21,115,8),(3510,22,115,9),(3511,23,115,10),(3512,24,115,9),(3513,25,115,7),(3514,20,116,7),(3515,21,116,8),(3516,22,116,9),(3517,23,116,10),(3518,24,116,9),(3519,25,116,7),(3520,20,117,7),(3521,21,117,8),(3522,22,117,9),(3523,23,117,10),(3524,24,117,9),(3525,25,117,7),(3526,20,118,7),(3527,21,118,8),(3528,22,118,9),(3529,23,118,10),(3530,24,118,9),(3531,25,118,7),(3532,20,119,7),(3533,21,119,8),(3534,22,119,9),(3535,23,119,10),(3536,24,119,9),(3537,25,119,7),(3538,20,120,7),(3539,21,120,8),(3540,22,120,9),(3541,23,120,10),(3542,24,120,9),(3543,25,120,7),(3544,20,121,7),(3545,21,121,8),(3546,22,121,9),(3547,23,121,10),(3548,24,121,9),(3549,25,121,7),(3550,20,122,7),(3551,21,122,8),(3552,22,122,9),(3553,23,122,10),(3554,24,122,9),(3555,25,122,7),(3556,20,123,7),(3557,21,123,8),(3558,22,123,9),(3559,23,123,10),(3560,24,123,9),(3561,25,123,7),(3562,20,124,7),(3563,21,124,8),(3564,22,124,9),(3565,23,124,10),(3566,24,124,9),(3567,25,124,7),(3568,20,125,7),(3569,21,125,8),(3570,22,125,9),(3571,23,125,10),(3572,24,125,9),(3573,25,125,7),(3574,20,126,7),(3575,21,126,8),(3576,22,126,9),(3577,23,126,10),(3578,24,126,9),(3579,25,126,7),(3580,20,127,7),(3581,21,127,8),(3582,22,127,9),(3583,23,127,10),(3584,24,127,9),(3585,25,127,7),(3586,20,128,7),(3587,21,128,8),(3588,22,128,9),(3589,23,128,10),(3590,24,128,9),(3591,25,128,7),(3592,20,129,7),(3593,21,129,8),(3594,22,129,9),(3595,23,129,10),(3596,24,129,9),(3597,25,129,7),(3598,20,130,7),(3599,21,130,8),(3600,22,130,9),(3601,23,130,10),(3602,24,130,9),(3603,25,130,7),(3604,20,131,7),(3605,21,131,8),(3606,22,131,9),(3607,23,131,10),(3608,24,131,9),(3609,25,131,7),(3610,20,132,7),(3611,21,132,8),(3612,22,132,9),(3613,23,132,10),(3614,24,132,9),(3615,25,132,7),(3616,20,133,7),(3617,21,133,8),(3618,22,133,9),(3619,23,133,10),(3620,24,133,9),(3621,25,133,7),(3622,20,134,7),(3623,21,134,8),(3624,22,134,9),(3625,23,134,10),(3626,24,134,9),(3627,25,134,7),(3628,20,135,7),(3629,21,135,8),(3630,22,135,9),(3631,23,135,10),(3632,24,135,9),(3633,25,135,7),(3634,20,136,7),(3635,21,136,8),(3636,22,136,9),(3637,23,136,10),(3638,24,136,9),(3639,25,136,7),(3640,20,137,7),(3641,21,137,8),(3642,22,137,9),(3643,23,137,10),(3644,24,137,9),(3645,25,137,7),(3646,20,138,7),(3647,21,138,8),(3648,22,138,9),(3649,23,138,10),(3650,24,138,9),(3651,25,138,7),(3652,20,139,7),(3653,21,139,8),(3654,22,139,9),(3655,23,139,10),(3656,24,139,9),(3657,25,139,7),(3658,20,140,7),(3659,21,140,8),(3660,22,140,9),(3661,23,140,10),(3662,24,140,9),(3663,25,140,7),(3664,20,141,7),(3665,21,141,8),(3666,22,141,9),(3667,23,141,10),(3668,24,141,9),(3669,25,141,7),(3670,20,142,7),(3671,21,142,8),(3672,22,142,9),(3673,23,142,10),(3674,24,142,9),(3675,25,142,7),(3676,20,143,7),(3677,21,143,8),(3678,22,143,9),(3679,23,143,10),(3680,24,143,9),(3681,25,143,7),(3682,20,144,7),(3683,21,144,8),(3684,22,144,9),(3685,23,144,10),(3686,24,144,9),(3687,25,144,7),(3688,20,145,7),(3689,21,145,8),(3690,22,145,9),(3691,23,145,10),(3692,24,145,9),(3693,25,145,7),(3694,20,146,7),(3695,21,146,8),(3696,22,146,9),(3697,23,146,10),(3698,24,146,9),(3699,25,146,7),(3700,20,147,7),(3701,21,147,8),(3702,22,147,9),(3703,23,147,10),(3704,24,147,9),(3705,25,147,7),(3706,20,148,7),(3707,21,148,8),(3708,22,148,9),(3709,23,148,10),(3710,24,148,9),(3711,25,148,7),(3712,20,149,7),(3713,21,149,8),(3714,22,149,9),(3715,23,149,10),(3716,24,149,9),(3717,25,149,7),(3718,20,150,7),(3719,21,150,8),(3720,22,150,9),(3721,23,150,10),(3722,24,150,9),(3723,25,150,7),(3724,20,151,7),(3725,21,151,8),(3726,22,151,9),(3727,23,151,10),(3728,24,151,9),(3729,25,151,7),(3730,20,152,7),(3731,21,152,8),(3732,22,152,9),(3733,23,152,9),(3734,24,152,9),(3735,25,152,7),(3736,20,153,7),(3737,21,153,8),(3738,22,153,9),(3739,23,153,10),(3740,24,153,9),(3741,25,153,7),(3742,20,1,7),(3743,21,1,8),(3744,22,1,9),(3745,23,1,10),(3746,24,1,9),(3747,25,1,7);
/*!40000 ALTER TABLE `mainassign` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `mainexp`
--

LOCK TABLES `mainexp` WRITE;
/*!40000 ALTER TABLE `mainexp` DISABLE KEYS */;
INSERT INTO `mainexp` VALUES (766,4,1,0),(767,5,1,0),(768,6,1,0),(769,7,1,0),(770,8,1,0),(771,4,2,0),(772,5,2,0),(773,6,2,0),(774,7,2,0),(775,8,2,0),(776,4,3,0),(777,5,3,0),(778,6,3,0),(779,7,3,0),(780,8,3,0),(781,4,4,0),(782,5,4,0),(783,6,4,0),(784,7,4,0),(785,8,4,0),(786,4,5,0),(787,5,5,0),(788,6,5,0),(789,7,5,0),(790,8,5,0),(791,4,6,0),(792,5,6,0),(793,6,6,0),(794,7,6,0),(795,8,6,0),(796,4,7,0),(797,5,7,0),(798,6,7,0),(799,7,7,0),(800,8,7,0),(801,4,8,0),(802,5,8,0),(803,6,8,0),(804,7,8,0),(805,8,8,0),(806,4,9,0),(807,5,9,0),(808,6,9,0),(809,7,9,0),(810,8,9,0),(811,4,10,0),(812,5,10,0),(813,6,10,0),(814,7,10,0),(815,8,10,0),(816,4,11,0),(817,5,11,0),(818,6,11,0),(819,7,11,0),(820,8,11,0),(821,4,12,0),(822,5,12,0),(823,6,12,0),(824,7,12,0),(825,8,12,0),(826,4,13,0),(827,5,13,0),(828,6,13,0),(829,7,13,0),(830,8,13,0),(831,4,14,0),(832,5,14,0),(833,6,14,0),(834,7,14,0),(835,8,14,0),(836,4,15,0),(837,5,15,0),(838,6,15,0),(839,7,15,0),(840,8,15,0),(841,4,16,0),(842,5,16,0),(843,6,16,0),(844,7,16,0),(845,8,16,0),(846,4,17,0),(847,5,17,0),(848,6,17,0),(849,7,17,0),(850,8,17,0),(851,4,18,0),(852,5,18,0),(853,6,18,0),(854,7,18,0),(855,8,18,0),(856,4,19,0),(857,5,19,0),(858,6,19,0),(859,7,19,0),(860,8,19,0),(861,4,20,0),(862,5,20,0),(863,6,20,0),(864,7,20,0),(865,8,20,0),(866,4,21,0),(867,5,21,0),(868,6,21,0),(869,7,21,0),(870,8,21,0),(871,4,22,0),(872,5,22,0),(873,6,22,0),(874,7,22,0),(875,8,22,0),(876,4,23,0),(877,5,23,0),(878,6,23,0),(879,7,23,0),(880,8,23,0),(881,4,24,0),(882,5,24,0),(883,6,24,0),(884,7,24,0),(885,8,24,0),(886,4,25,0),(887,5,25,0),(888,6,25,0),(889,7,25,0),(890,8,25,0),(891,4,26,0),(892,5,26,0),(893,6,26,0),(894,7,26,0),(895,8,26,0),(896,4,27,0),(897,5,27,0),(898,6,27,0),(899,7,27,0),(900,8,27,0),(901,4,28,0),(902,5,28,0),(903,6,28,0),(904,7,28,0),(905,8,28,0),(906,4,29,0),(907,5,29,0),(908,6,29,0),(909,7,29,0),(910,8,29,0),(911,4,30,0),(912,5,30,0),(913,6,30,0),(914,7,30,0),(915,8,30,0),(916,4,31,0),(917,5,31,0),(918,6,31,0),(919,7,31,0),(920,8,31,0),(921,4,32,0),(922,5,32,0),(923,6,32,0),(924,7,32,0),(925,8,32,0),(926,4,33,0),(927,5,33,0),(928,6,33,0),(929,7,33,0),(930,8,33,0),(931,4,34,0),(932,5,34,0),(933,6,34,0),(934,7,34,0),(935,8,34,0),(936,4,35,0),(937,5,35,0),(938,6,35,0),(939,7,35,0),(940,8,35,0),(941,4,36,0),(942,5,36,0),(943,6,36,0),(944,7,36,0),(945,8,36,0),(946,4,37,0),(947,5,37,0),(948,6,37,0),(949,7,37,0),(950,8,37,0),(951,4,38,0),(952,5,38,0),(953,6,38,0),(954,7,38,0),(955,8,38,0),(956,4,39,0),(957,5,39,0),(958,6,39,0),(959,7,39,0),(960,8,39,0),(961,4,40,0),(962,5,40,0),(963,6,40,0),(964,7,40,0),(965,8,40,0),(966,4,41,0),(967,5,41,0),(968,6,41,0),(969,7,41,0),(970,8,41,0),(971,4,42,0),(972,5,42,0),(973,6,42,0),(974,7,42,0),(975,8,42,0),(976,4,43,0),(977,5,43,0),(978,6,43,0),(979,7,43,0),(980,8,43,0),(981,4,44,0),(982,5,44,0),(983,6,44,0),(984,7,44,0),(985,8,44,0),(986,4,45,0),(987,5,45,0),(988,6,45,0),(989,7,45,0),(990,8,45,0),(991,4,46,0),(992,5,46,0),(993,6,46,0),(994,7,46,0),(995,8,46,0),(996,4,47,0),(997,5,47,0),(998,6,47,0),(999,7,47,0),(1000,8,47,0),(1001,4,48,0),(1002,5,48,0),(1003,6,48,0),(1004,7,48,0),(1005,8,48,0),(1006,4,49,0),(1007,5,49,0),(1008,6,49,0),(1009,7,49,0),(1010,8,49,0),(1011,4,50,0),(1012,5,50,0),(1013,6,50,0),(1014,7,50,0),(1015,8,50,0),(1016,4,51,0),(1017,5,51,0),(1018,6,51,0),(1019,7,51,0),(1020,8,51,0),(1021,4,52,0),(1022,5,52,0),(1023,6,52,0),(1024,7,52,0),(1025,8,52,0),(1026,4,53,0),(1027,5,53,0),(1028,6,53,0),(1029,7,53,0),(1030,8,53,0),(1031,4,54,0),(1032,5,54,0),(1033,6,54,0),(1034,7,54,0),(1035,8,54,0),(1036,4,55,0),(1037,5,55,0),(1038,6,55,0),(1039,7,55,0),(1040,8,55,0),(1041,4,56,0),(1042,5,56,0),(1043,6,56,0),(1044,7,56,0),(1045,8,56,0),(1046,4,57,0),(1047,5,57,0),(1048,6,57,0),(1049,7,57,0),(1050,8,57,0),(1051,4,58,0),(1052,5,58,0),(1053,6,58,0),(1054,7,58,0),(1055,8,58,0),(1056,4,59,0),(1057,5,59,0),(1058,6,59,0),(1059,7,59,0),(1060,8,59,0),(1061,4,60,0),(1062,5,60,0),(1063,6,60,0),(1064,7,60,0),(1065,8,60,0),(1066,4,61,0),(1067,5,61,0),(1068,6,61,0),(1069,7,61,0),(1070,8,61,0),(1071,4,62,0),(1072,5,62,0),(1073,6,62,0),(1074,7,62,0),(1075,8,62,0),(1076,4,63,0),(1077,5,63,0),(1078,6,63,0),(1079,7,63,0),(1080,8,63,0),(1081,4,64,0),(1082,5,64,0),(1083,6,64,0),(1084,7,64,0),(1085,8,64,0),(1086,4,65,0),(1087,5,65,0),(1088,6,65,0),(1089,7,65,0),(1090,8,65,0),(1091,4,66,0),(1092,5,66,0),(1093,6,66,0),(1094,7,66,0),(1095,8,66,0),(1096,4,67,0),(1097,5,67,0),(1098,6,67,0),(1099,7,67,0),(1100,8,67,0),(1101,4,68,0),(1102,5,68,0),(1103,6,68,0),(1104,7,68,0),(1105,8,68,0),(1106,4,69,0),(1107,5,69,0),(1108,6,69,0),(1109,7,69,0),(1110,8,69,0),(1111,4,70,0),(1112,5,70,0),(1113,6,70,0),(1114,7,70,0),(1115,8,70,0),(1116,4,71,0),(1117,5,71,0),(1118,6,71,0),(1119,7,71,0),(1120,8,71,0),(1121,4,72,0),(1122,5,72,0),(1123,6,72,0),(1124,7,72,0),(1125,8,72,0),(1126,4,73,0),(1127,5,73,0),(1128,6,73,0),(1129,7,73,0),(1130,8,73,0),(1131,4,74,0),(1132,5,74,0),(1133,6,74,0),(1134,7,74,0),(1135,8,74,0),(1136,4,75,0),(1137,5,75,0),(1138,6,75,0),(1139,7,75,0),(1140,8,75,0),(1141,4,76,0),(1142,5,76,0),(1143,6,76,0),(1144,7,76,0),(1145,8,76,0),(1146,4,77,0),(1147,5,77,0),(1148,6,77,0),(1149,7,77,0),(1150,8,77,0),(1151,4,78,0),(1152,5,78,0),(1153,6,78,0),(1154,7,78,0),(1155,8,78,0),(1156,4,79,0),(1157,5,79,0),(1158,6,79,0),(1159,7,79,0),(1160,8,79,0),(1161,4,80,0),(1162,5,80,0),(1163,6,80,0),(1164,7,80,0),(1165,8,80,0),(1166,4,81,0),(1167,5,81,0),(1168,6,81,0),(1169,7,81,0),(1170,8,81,0),(1171,4,82,0),(1172,5,82,0),(1173,6,82,0),(1174,7,82,0),(1175,8,82,0),(1176,4,83,0),(1177,5,83,0),(1178,6,83,0),(1179,7,83,0),(1180,8,83,0),(1181,4,84,0),(1182,5,84,0),(1183,6,84,0),(1184,7,84,0),(1185,8,84,0),(1186,4,85,0),(1187,5,85,0),(1188,6,85,0),(1189,7,85,0),(1190,8,85,0),(1191,4,86,0),(1192,5,86,0),(1193,6,86,0),(1194,7,86,0),(1195,8,86,0),(1196,4,87,0),(1197,5,87,0),(1198,6,87,0),(1199,7,87,0),(1200,8,87,0),(1201,4,88,0),(1202,5,88,0),(1203,6,88,0),(1204,7,88,0),(1205,8,88,0),(1206,4,89,0),(1207,5,89,0),(1208,6,89,0),(1209,7,89,0),(1210,8,89,0),(1211,4,90,0),(1212,5,90,0),(1213,6,90,0),(1214,7,90,0),(1215,8,90,0),(1216,4,91,0),(1217,5,91,0),(1218,6,91,0),(1219,7,91,0),(1220,8,91,0),(1221,4,92,0),(1222,5,92,0),(1223,6,92,0),(1224,7,92,0),(1225,8,92,0),(1226,4,93,0),(1227,5,93,0),(1228,6,93,0),(1229,7,93,0),(1230,8,93,0),(1231,4,94,0),(1232,5,94,0),(1233,6,94,0),(1234,7,94,0),(1235,8,94,0),(1236,4,95,0),(1237,5,95,0),(1238,6,95,0),(1239,7,95,0),(1240,8,95,0),(1241,4,96,0),(1242,5,96,0),(1243,6,96,0),(1244,7,96,0),(1245,8,96,0),(1246,4,97,0),(1247,5,97,0),(1248,6,97,0),(1249,7,97,0),(1250,8,97,0),(1251,4,98,0),(1252,5,98,0),(1253,6,98,0),(1254,7,98,0),(1255,8,98,0),(1256,4,99,0),(1257,5,99,0),(1258,6,99,0),(1259,7,99,0),(1260,8,99,0),(1261,4,100,0),(1262,5,100,0),(1263,6,100,0),(1264,7,100,0),(1265,8,100,0),(1266,4,101,0),(1267,5,101,0),(1268,6,101,0),(1269,7,101,0),(1270,8,101,0),(1271,4,102,0),(1272,5,102,0),(1273,6,102,0),(1274,7,102,0),(1275,8,102,0),(1276,4,103,0),(1277,5,103,0),(1278,6,103,0),(1279,7,103,0),(1280,8,103,0),(1281,4,104,0),(1282,5,104,0),(1283,6,104,0),(1284,7,104,0),(1285,8,104,0),(1286,4,105,0),(1287,5,105,0),(1288,6,105,0),(1289,7,105,0),(1290,8,105,0),(1291,4,106,0),(1292,5,106,0),(1293,6,106,0),(1294,7,106,0),(1295,8,106,0),(1296,4,107,0),(1297,5,107,0),(1298,6,107,0),(1299,7,107,0),(1300,8,107,0),(1301,4,108,0),(1302,5,108,0),(1303,6,108,0),(1304,7,108,0),(1305,8,108,0),(1306,4,109,0),(1307,5,109,0),(1308,6,109,0),(1309,7,109,0),(1310,8,109,0),(1311,4,110,0),(1312,5,110,0),(1313,6,110,0),(1314,7,110,0),(1315,8,110,0),(1316,4,111,0),(1317,5,111,0),(1318,6,111,0),(1319,7,111,0),(1320,8,111,0),(1321,4,112,0),(1322,5,112,0),(1323,6,112,0),(1324,7,112,0),(1325,8,112,0),(1326,4,113,0),(1327,5,113,0),(1328,6,113,0),(1329,7,113,0),(1330,8,113,0),(1331,4,114,0),(1332,5,114,0),(1333,6,114,0),(1334,7,114,0),(1335,8,114,0),(1336,4,115,0),(1337,5,115,0),(1338,6,115,0),(1339,7,115,0),(1340,8,115,0),(1341,4,116,0),(1342,5,116,0),(1343,6,116,0),(1344,7,116,0),(1345,8,116,0),(1346,4,117,0),(1347,5,117,0),(1348,6,117,0),(1349,7,117,0),(1350,8,117,0),(1351,4,118,0),(1352,5,118,0),(1353,6,118,0),(1354,7,118,0),(1355,8,118,0),(1356,4,119,0),(1357,5,119,0),(1358,6,119,0),(1359,7,119,0),(1360,8,119,0),(1361,4,120,0),(1362,5,120,0),(1363,6,120,0),(1364,7,120,0),(1365,8,120,0),(1366,4,121,0),(1367,5,121,0),(1368,6,121,0),(1369,7,121,0),(1370,8,121,0),(1371,4,122,0),(1372,5,122,0),(1373,6,122,0),(1374,7,122,0),(1375,8,122,0),(1376,4,123,0),(1377,5,123,0),(1378,6,123,0),(1379,7,123,0),(1380,8,123,0),(1381,4,124,0),(1382,5,124,0),(1383,6,124,0),(1384,7,124,0),(1385,8,124,0),(1386,4,125,0),(1387,5,125,0),(1388,6,125,0),(1389,7,125,0),(1390,8,125,0),(1391,4,126,0),(1392,5,126,0),(1393,6,126,0),(1394,7,126,0),(1395,8,126,0),(1396,4,127,0),(1397,5,127,0),(1398,6,127,0),(1399,7,127,0),(1400,8,127,0),(1401,4,128,0),(1402,5,128,0),(1403,6,128,0),(1404,7,128,0),(1405,8,128,0),(1406,4,129,0),(1407,5,129,0),(1408,6,129,0),(1409,7,129,0),(1410,8,129,0),(1411,4,130,0),(1412,5,130,0),(1413,6,130,0),(1414,7,130,0),(1415,8,130,0),(1416,4,131,0),(1417,5,131,0),(1418,6,131,0),(1419,7,131,0),(1420,8,131,0),(1421,4,132,0),(1422,5,132,0),(1423,6,132,0),(1424,7,132,0),(1425,8,132,0),(1426,4,133,0),(1427,5,133,0),(1428,6,133,0),(1429,7,133,0),(1430,8,133,0),(1431,4,134,0),(1432,5,134,0),(1433,6,134,0),(1434,7,134,0),(1435,8,134,0),(1436,4,135,0),(1437,5,135,0),(1438,6,135,0),(1439,7,135,0),(1440,8,135,0),(1441,4,136,0),(1442,5,136,0),(1443,6,136,0),(1444,7,136,0),(1445,8,136,0),(1446,4,137,0),(1447,5,137,0),(1448,6,137,0),(1449,7,137,0),(1450,8,137,0),(1451,4,138,0),(1452,5,138,0),(1453,6,138,0),(1454,7,138,0),(1455,8,138,0),(1456,4,139,0),(1457,5,139,0),(1458,6,139,0),(1459,7,139,0),(1460,8,139,0),(1461,4,140,0),(1462,5,140,0),(1463,6,140,0),(1464,7,140,0),(1465,8,140,0),(1466,4,141,0),(1467,5,141,0),(1468,6,141,0),(1469,7,141,0),(1470,8,141,0),(1471,4,142,0),(1472,5,142,0),(1473,6,142,0),(1474,7,142,0),(1475,8,142,0),(1476,4,143,0),(1477,5,143,0),(1478,6,143,0),(1479,7,143,0),(1480,8,143,0),(1481,4,144,0),(1482,5,144,0),(1483,6,144,0),(1484,7,144,0),(1485,8,144,0),(1486,4,145,0),(1487,5,145,0),(1488,6,145,0),(1489,7,145,0),(1490,8,145,0),(1491,4,146,0),(1492,5,146,0),(1493,6,146,0),(1494,7,146,0),(1495,8,146,0),(1496,4,147,0),(1497,5,147,0),(1498,6,147,0),(1499,7,147,0),(1500,8,147,0),(1501,4,148,0),(1502,5,148,0),(1503,6,148,0),(1504,7,148,0),(1505,8,148,0),(1506,4,149,0),(1507,5,149,0),(1508,6,149,0),(1509,7,149,0),(1510,8,149,0),(1511,4,150,0),(1512,5,150,0),(1513,6,150,0),(1514,7,150,0),(1515,8,150,0),(1516,4,151,0),(1517,5,151,0),(1518,6,151,0),(1519,7,151,0),(1520,8,151,0),(1521,4,152,0),(1522,5,152,0),(1523,6,152,0),(1524,7,152,0),(1525,8,152,0),(1526,4,153,0),(1527,5,153,0),(1528,6,153,0),(1529,7,153,0),(1530,8,153,0);
/*!40000 ALTER TABLE `mainexp` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `oral`
--

LOCK TABLES `oral` WRITE;
/*!40000 ALTER TABLE `oral` DISABLE KEYS */;
/*!40000 ALTER TABLE `oral` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `oral_attainment`
--

LOCK TABLES `oral_attainment` WRITE;
/*!40000 ALTER TABLE `oral_attainment` DISABLE KEYS */;
INSERT INTO `oral_attainment` VALUES (1,'CO1',99.35,3,3),(2,'CO2',99.35,3,3),(3,'CO3',99.35,3,3),(4,'CO4',99.35,3,3);
/*!40000 ALTER TABLE `oral_attainment` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `oral_marks`
--

LOCK TABLES `oral_marks` WRITE;
/*!40000 ALTER TABLE `oral_marks` DISABLE KEYS */;
INSERT INTO `oral_marks` VALUES (1,2,25,4),(2,3,23,4);
/*!40000 ALTER TABLE `oral_marks` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `oralpce_attainment`
--

LOCK TABLES `oralpce_attainment` WRITE;
/*!40000 ALTER TABLE `oralpce_attainment` DISABLE KEYS */;
INSERT INTO `oralpce_attainment` VALUES (1,'CO1',0,0,3),(2,'CO2',0,0,3),(3,'CO3',0,0,3),(4,'CO4',0,0,3),(5,'CO5',0,0,3),(6,'CO6',0,0,3);
/*!40000 ALTER TABLE `oralpce_attainment` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `pos`
--

LOCK TABLES `pos` WRITE;
/*!40000 ALTER TABLE `pos` DISABLE KEYS */;
INSERT INTO `pos` VALUES (1,1,'PO1','Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.','2024-07-29 14:15:49',1),(2,2,'PO2','Problem analysis: Identify, formulate complex engineering problems reaching substantiated conclusions using principles of Computer Engineering.','2024-07-29 14:20:21',1),(3,3,'PO3','Design / development of solutions: Design / develop solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the society.','2024-07-29 14:20:21',1),(4,4,'PO4','Conduct investigations of complex problems: Use knowledge for the design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.','2024-07-29 14:20:21',1),(5,5,'PO5','Modern tool usage: Create, select and apply appropriate techniques and modern engineering tools, including predictions and modelling to complex engineering activities with an understanding of the limitations.','2024-07-29 14:20:21',1),(6,6,'PO6','The engineer and society: Apply the knowledge to assess social issues and the responsibilities relevant to engineering practices. ','2024-07-29 14:20:21',1),(7,7,'PO7','Environment and sustainability: Understand the impact of the professional engineering solutions in social and environmental contexts, and demonstrate the knowledge for sustainable development.','2024-07-29 14:20:21',1),(8,8,'PO8','Ethics: Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.','2024-07-29 14:20:21',1),(9,9,'PO9','Individual and team work: Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings. ','2024-07-29 14:20:21',1),(10,10,'PO10','Communication: Communicate effectively such as, being able to comprehend and write effective reports and design documentation, make effective presentations.','2024-07-29 14:20:21',1),(11,11,'PO11','Project management and finance: Demonstrate knowledge and understanding of the engineering and management skills and apply these skills to manage projects effectively.','2024-07-29 14:20:21',1),(12,12,'PO12','Life-long learning: Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.','2024-07-29 14:20:21',1),(13,13,'PSO1','Graduates of programme will be able to provide effective and efficient real time solutions using practical knowledge in Computer Engineering domain.','2024-07-29 14:22:45',1),(14,14,'PSO2','Graduates of programme will be able to use engineering practices, strategies and tactics for the development, operation and maintenance of software systems.','2024-07-29 14:22:45',1),(15,1,'PO1','Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.','2024-08-28 11:48:30',2),(16,2,'PO2','Problem analysis: Identity, formulate complex engineering problems reaching substantiated conclusions using principles of Computer Engineering.','2024-08-28 11:48:30',2),(17,3,'PO3','Design/development of solutions: Design / develop solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the society.','2024-08-28 11:48:30',2),(18,4,'PO4','Conduct investigations of complex problems: Use knowledge for the design of experiments, analysis, interpretation of data, and synthesis of the information to provide valid conclusions.','2024-08-28 11:48:30',2),(19,5,'PO5','Modern tool usage: Create, select and apply appropriate techniques and modern engineering tools, including predictions and modeling to complex engineering activities with an understanding of the limitations.','2024-08-28 11:48:30',2),(20,6,'PO6','The engineer and society: Apply the knowledge to assess social issues and the responsibilities relevant to engineering practices.','2024-08-28 11:48:30',2),(21,7,'PO7','Environment and Sustainability: Understand the impact of the professional engineering solutions in social and environmental contexts, and demonstrate the knowledge for sustainable development.','2024-08-28 11:48:30',2),(22,8,'PO8','Ethics: Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.','2024-08-28 11:48:30',2),(23,9,'PO9','Individual and teamwork: Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.','2024-08-28 11:48:30',2),(24,10,'PO10','Communication: Communicate effectively such as being able to comprehend and write effective reports and design documentation, make effective presentations.','2024-08-28 11:48:30',2),(25,11,'PO11','Project management and finance: Demonstrate knowledge and understanding of the engineering and management skills and apply the skills to manage projects effectively.','2024-08-28 11:48:30',2),(26,12,'PO12','Life-long learning: Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.','2024-08-28 11:48:30',2),(27,13,'PSO1','Develop efficient IT based solutions by applying and integrating various domains like Artificial Intelligence, IoT, Computer Networks and Security to solve real time problems.','2024-08-29 14:58:49',2),(28,14,'PSO2','Apply technical knowledge in the field of Information Technology to achieve successful career and to pursue higher studies for future endeavors.','2024-08-29 14:58:49',2),(29,1,'PO1','Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.','2024-08-29 15:00:22',3),(30,2,'PO2','Problem analysis: Identity, formulate complex engineering problems reaching substantiated conclusions using principles of Computer Engineering.','2024-08-29 15:00:22',3),(31,3,'PO3','Design/development of solutions: Design / develop solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the society.','2024-08-29 15:00:22',3),(32,4,'PO4','Conduct investigations of complex problems: Use knowledge for the design of experiments, analysis, interpretation of data, and synthesis of the information to provide valid conclusions.','2024-08-29 15:00:22',3),(33,5,'PO5','Modern tool usage: Create, select and apply appropriate techniques and modern engineering tools, including predictions and modeling to complex engineering activities with an understanding of the limitations.','2024-08-29 15:00:22',3),(34,6,'PO6','The engineer and society: Apply the knowledge to assess social issues and the responsibilities relevant to engineering practices.','2024-08-29 15:00:22',3),(35,7,'PO7','Environment and Sustainability: Understand the impact of the professional engineering solutions in social and environmental contexts, and demonstrate the knowledge for sustainable development.','2024-08-29 15:00:22',3),(36,8,'PO8','Ethics: Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.','2024-08-29 15:00:22',3),(37,9,'PO9','Individual and teamwork: Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.','2024-08-29 15:00:22',3),(38,10,'PO10','Communication: Communicate effectively such as being able to comprehend and write effective reports and design documentation, make effective presentations.','2024-08-29 15:00:22',3),(39,11,'PO11','Project management and finance: Demonstrate knowledge and understanding of the engineering and management skills and apply the skills to manage projects effectively.','2024-08-29 15:00:22',3),(40,12,'PO12','Life-long learning: Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.','2024-08-29 15:00:22',3);
/*!40000 ALTER TABLE `pos` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `proreport`
--

LOCK TABLES `proreport` WRITE;
/*!40000 ALTER TABLE `proreport` DISABLE KEYS */;
/*!40000 ALTER TABLE `proreport` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `question_assignment`
--

LOCK TABLES `question_assignment` WRITE;
/*!40000 ALTER TABLE `question_assignment` DISABLE KEYS */;
INSERT INTO `question_assignment` VALUES (12,'ASSIGNMENT 1',2),(13,'ASSIGNMENT 2',2),(14,'ASSIGNMENT 3',2),(15,'ASSIGNMENT 4',2),(16,'ASSIGNMENT 5',2),(17,'ASSIGNMENT 6',2),(18,'ASSIGNMENT 1',3),(19,'ASSIGNMENT 2',3),(20,'ASSIGNMENT1',4),(21,'ASSIGNMENT2',4),(22,'ASSIGNMENT3',4),(23,'ASSIGNMENT4',4),(24,'ASSIGNMENT5',4),(25,'ASSIGNMENT6',4),(26,'ASSIGNMENT1',5),(27,'ASSIGNMENT2',5),(28,'ASSIGNMENT3',5),(29,'ASSIGNMENT4',5),(30,'ASSIGNMENT5',5);
/*!40000 ALTER TABLE `question_assignment` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `question_exp`
--

LOCK TABLES `question_exp` WRITE;
/*!40000 ALTER TABLE `question_exp` DISABLE KEYS */;
INSERT INTO `question_exp` VALUES (1,'EXPERIMENT1',1),(2,'EXPERIMENT2',1),(3,'EXPERIMENT3',1),(4,'EXPERIMENT 1',2),(5,'EXPERIMENT 2',2),(6,'EXPERIMENT 3',2),(7,'EXPERIMENT 4',2),(8,'EXPERIMENT 5',2);
/*!40000 ALTER TABLE `question_exp` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `question_feedback`
--

LOCK TABLES `question_feedback` WRITE;
/*!40000 ALTER TABLE `question_feedback` DISABLE KEYS */;
INSERT INTO `question_feedback` VALUES (14,'Understanding',8),(15,'Developed',8),(16,'Undertsnading',9),(17,'Developed',9),(18,'hello',10),(19,'world',10);
/*!40000 ALTER TABLE `question_feedback` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `question_oralpce`
--

LOCK TABLES `question_oralpce` WRITE;
/*!40000 ALTER TABLE `question_oralpce` DISABLE KEYS */;
INSERT INTO `question_oralpce` VALUES (107,'GROUP DISCUSSION','CO1',10,41,3),(108,'GROUP DISCUSSION','CO3',10,41,3),(109,'GROUP DISCUSSION','CO5',10,41,3),(110,'PRESENTATION','CO2',10,41,3),(111,'PRESENTATION','CO4',10,41,3),(112,'GROUP DYNAMIC','CO3',5,41,3),(113,'GROUP DYNAMIC','CO5',5,41,3),(119,'kjbkjb','CO1',15,43,2),(120,'asignment','CO1',0,43,2),(121,'asignment','CO2',0,43,2),(122,'hchxgxg','CO1',20,43,2),(123,'hchxgxg','CO2',20,43,2);
/*!40000 ALTER TABLE `question_oralpce` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `question_trade`
--

LOCK TABLES `question_trade` WRITE;
/*!40000 ALTER TABLE `question_trade` DISABLE KEYS */;
INSERT INTO `question_trade` VALUES (3,'TRADE 1',3),(4,'TRADE 2',3),(5,'TRADE 3',3),(6,'TRADE 4',3),(7,'TRADE1',4),(8,'TRADE2',4);
/*!40000 ALTER TABLE `question_trade` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `questions_minipro`
--

LOCK TABLES `questions_minipro` WRITE;
/*!40000 ALTER TABLE `questions_minipro` DISABLE KEYS */;
INSERT INTO `questions_minipro` VALUES (1,'MINIPROJECT 1',2);
/*!40000 ALTER TABLE `questions_minipro` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `review1`
--

LOCK TABLES `review1` WRITE;
/*!40000 ALTER TABLE `review1` DISABLE KEYS */;
/*!40000 ALTER TABLE `review1` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `review2`
--

LOCK TABLES `review2` WRITE;
/*!40000 ALTER TABLE `review2` DISABLE KEYS */;
/*!40000 ALTER TABLE `review2` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `semester`
--

LOCK TABLES `semester` WRITE;
/*!40000 ALTER TABLE `semester` DISABLE KEYS */;
INSERT INTO `semester` VALUES (1,1,5),(2,2,5),(3,3,5),(4,4,5),(5,5,5),(6,6,5),(7,7,5),(8,8,5),(9,9,5),(10,10,5),(11,11,5),(12,12,5),(13,13,5),(14,14,5),(15,15,5),(16,16,5),(17,17,5),(18,18,5),(19,19,5),(20,20,5),(21,21,5),(22,22,5),(23,23,5),(24,24,5),(25,25,5),(26,26,5),(27,27,5),(28,28,5),(29,29,5),(30,30,5),(31,31,5),(32,32,5),(33,33,5),(34,34,5),(35,35,5),(36,36,5),(37,37,5),(38,38,5),(39,39,5),(40,40,5),(41,41,5),(42,42,5),(43,43,5),(44,44,5),(45,45,5),(46,46,5),(47,47,5),(48,48,5),(49,49,5),(50,50,5),(51,51,5),(52,52,5),(53,53,5),(54,54,5),(55,55,5),(56,56,5),(57,57,5),(58,58,5),(59,59,5),(60,60,5),(61,61,5),(62,62,5),(63,63,5),(64,64,5),(65,65,5),(66,66,5),(67,67,5),(68,68,5),(69,69,5),(70,70,5),(71,71,5),(72,72,5),(73,73,5),(74,74,5),(75,75,5),(76,76,5),(77,77,5),(78,78,5),(79,79,5),(80,80,5),(81,81,5),(82,82,5),(83,83,5),(84,84,5),(85,85,5),(86,86,5),(87,87,5),(88,88,5),(89,89,5),(90,90,5),(91,91,5),(92,92,5),(93,93,5),(94,94,5),(95,95,5),(96,96,5),(97,97,5),(98,98,5),(99,99,5),(100,100,5),(101,101,5),(102,102,5),(103,103,5),(104,104,5),(105,105,5),(106,106,5),(107,107,5),(108,108,5),(109,109,5),(110,110,5),(111,111,5),(112,112,5),(113,113,5),(114,114,5),(115,115,5),(116,116,5),(117,117,5),(118,118,5),(119,119,5),(120,120,5),(121,121,5),(122,122,5),(123,123,5),(124,124,5),(125,125,5),(126,126,5),(127,127,5),(128,128,5),(129,129,5),(130,130,5),(131,131,5),(132,132,5),(133,133,5),(134,134,5),(135,135,5),(136,136,5),(137,137,5),(138,138,5),(139,139,5),(140,140,5),(141,141,5),(142,142,5),(143,143,5),(144,144,5),(145,145,5),(146,146,5),(147,147,5),(148,148,5),(149,149,5),(150,150,5),(151,151,5),(152,152,5),(153,153,5),(520,153,8),(521,154,7),(522,155,8),(523,156,7),(524,157,8),(525,158,7),(526,159,8),(527,160,7),(528,161,8),(529,162,7),(530,163,8),(531,164,7),(532,165,8),(533,166,7),(534,167,8),(535,168,7),(536,169,8),(537,170,7),(538,171,8),(539,172,7),(540,173,8);
/*!40000 ALTER TABLE `semester` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `semester_attainment`
--

LOCK TABLES `semester_attainment` WRITE;
/*!40000 ALTER TABLE `semester_attainment` DISABLE KEYS */;
INSERT INTO `semester_attainment` VALUES (1,'CO1',68.63,2,3),(2,'CO2',68.63,2,3),(3,'CO3',68.63,2,3),(4,'CO4',68.63,2,3),(5,'CO1',100,3,11),(6,'CO2',100,3,11),(7,'CO3',100,3,11),(8,'CO4',100,3,11);
/*!40000 ALTER TABLE `semester_attainment` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `semester_marks`
--

LOCK TABLES `semester_marks` WRITE;
/*!40000 ALTER TABLE `semester_marks` DISABLE KEYS */;
INSERT INTO `semester_marks` VALUES (1,3,80,4),(2,2,80,4),(3,11,80,4);
/*!40000 ALTER TABLE `semester_marks` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `student_cohort`
--

LOCK TABLES `student_cohort` WRITE;
/*!40000 ALTER TABLE `student_cohort` DISABLE KEYS */;
INSERT INTO `student_cohort` VALUES (1,1),(1,2),(2,1),(2,2),(3,1),(3,2),(4,1),(4,2),(5,1),(5,2),(6,1),(6,2),(7,1),(7,2),(8,1),(8,2),(9,1),(9,2),(10,1),(10,2),(11,1),(11,2),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),(31,1),(32,1),(33,1),(34,1),(35,1),(36,1),(37,1),(38,1),(39,1),(40,1),(41,1),(42,1),(43,1),(44,1),(45,1),(46,1),(47,1),(48,1),(49,1),(50,1),(51,1),(52,1),(53,1),(54,1),(55,1),(56,1),(57,1),(58,1),(59,1),(60,1),(61,1),(62,1),(63,1),(64,1),(65,1),(66,1),(67,1),(68,1),(69,1),(70,1),(71,1),(72,1),(73,1),(74,1),(75,1),(76,1),(77,1),(78,1),(79,1),(80,1),(81,1),(82,1),(83,1),(84,1),(85,1),(86,1),(87,1),(88,1),(89,1),(90,1),(91,1),(92,1),(93,1),(94,1),(95,1),(96,1),(97,1),(98,1),(99,1),(100,1),(101,1),(102,1),(103,1),(104,1),(105,1),(106,1),(107,1),(108,1),(109,1),(110,1),(111,1),(112,1),(113,1),(114,1),(115,1),(116,1),(117,1),(118,1),(119,1),(120,1),(121,1),(122,1),(123,1),(124,1),(125,1),(126,1),(127,1),(128,1),(129,1),(130,1),(131,1),(132,1),(133,1),(134,1),(135,1),(136,1),(137,1),(138,1),(139,1),(140,1),(141,1),(142,1),(143,1),(144,1),(145,1),(146,1),(147,1),(148,1),(149,1),(150,1),(151,1),(152,1),(153,1);
/*!40000 ALTER TABLE `student_cohort` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `student_feedback`
--

LOCK TABLES `student_feedback` WRITE;
/*!40000 ALTER TABLE `student_feedback` DISABLE KEYS */;
INSERT INTO `student_feedback` VALUES (307,3,1,14,2,'2024-11-04'),(308,3,1,15,2,'2024-11-04'),(309,3,2,14,2,'2024-11-04'),(310,3,2,15,2,'2024-11-04'),(311,3,3,14,2,'2024-11-04'),(312,3,3,15,2,'2024-11-04'),(313,3,4,14,2,'2024-11-04'),(314,3,4,15,2,'2024-11-04'),(315,3,5,14,2,'2024-11-04'),(316,3,5,15,2,'2024-11-04'),(317,3,6,14,2,'2024-11-04'),(318,3,6,15,2,'2024-11-04'),(319,3,7,14,2,'2024-11-04'),(320,3,7,15,2,'2024-11-04'),(321,3,8,14,2,'2024-11-04'),(322,3,8,15,2,'2024-11-04'),(323,3,9,14,2,'2024-11-04'),(324,3,9,15,2,'2024-11-04'),(325,3,10,14,2,'2024-11-04'),(326,3,10,15,2,'2024-11-04'),(327,3,11,14,2,'2024-11-04'),(328,3,11,15,2,'2024-11-04'),(329,3,12,14,2,'2024-11-04'),(330,3,12,15,2,'2024-11-04'),(331,3,13,14,2,'2024-11-04'),(332,3,13,15,2,'2024-11-04'),(333,3,14,14,2,'2024-11-04'),(334,3,14,15,2,'2024-11-04'),(335,3,15,14,2,'2024-11-04'),(336,3,15,15,2,'2024-11-04'),(337,3,16,14,2,'2024-11-04'),(338,3,16,15,2,'2024-11-04'),(339,3,17,14,2,'2024-11-04'),(340,3,17,15,2,'2024-11-04'),(341,3,18,14,2,'2024-11-04'),(342,3,18,15,2,'2024-11-04'),(343,3,19,14,2,'2024-11-04'),(344,3,19,15,2,'2024-11-04'),(345,3,20,14,2,'2024-11-04'),(346,3,20,15,2,'2024-11-04'),(347,3,21,14,2,'2024-11-04'),(348,3,21,15,2,'2024-11-04'),(349,3,22,14,2,'2024-11-04'),(350,3,22,15,2,'2024-11-04'),(351,3,23,14,2,'2024-11-04'),(352,3,23,15,2,'2024-11-04'),(353,3,24,14,2,'2024-11-04'),(354,3,24,15,2,'2024-11-04'),(355,3,25,14,2,'2024-11-04'),(356,3,25,15,2,'2024-11-04'),(357,3,26,14,2,'2024-11-04'),(358,3,26,15,2,'2024-11-04'),(359,3,27,14,2,'2024-11-04'),(360,3,27,15,2,'2024-11-04'),(361,3,28,14,2,'2024-11-04'),(362,3,28,15,2,'2024-11-04'),(363,3,29,14,2,'2024-11-04'),(364,3,29,15,2,'2024-11-04'),(365,3,30,14,2,'2024-11-04'),(366,3,30,15,2,'2024-11-04'),(367,3,31,14,2,'2024-11-04'),(368,3,31,15,2,'2024-11-04'),(369,3,32,14,2,'2024-11-04'),(370,3,32,15,2,'2024-11-04'),(371,3,33,14,2,'2024-11-04'),(372,3,33,15,2,'2024-11-04'),(373,3,34,14,2,'2024-11-04'),(374,3,34,15,2,'2024-11-04'),(375,3,35,14,2,'2024-11-04'),(376,3,35,15,2,'2024-11-04'),(377,3,36,14,2,'2024-11-04'),(378,3,36,15,2,'2024-11-04'),(379,3,37,14,2,'2024-11-04'),(380,3,37,15,2,'2024-11-04'),(381,3,38,14,2,'2024-11-04'),(382,3,38,15,2,'2024-11-04'),(383,3,39,14,2,'2024-11-04'),(384,3,39,15,2,'2024-11-04'),(385,3,40,14,2,'2024-11-04'),(386,3,40,15,2,'2024-11-04'),(387,3,41,14,2,'2024-11-04'),(388,3,41,15,2,'2024-11-04'),(389,3,42,14,2,'2024-11-04'),(390,3,42,15,2,'2024-11-04'),(391,3,43,14,2,'2024-11-04'),(392,3,43,15,2,'2024-11-04'),(393,3,44,14,2,'2024-11-04'),(394,3,44,15,2,'2024-11-04'),(395,3,45,14,2,'2024-11-04'),(396,3,45,15,2,'2024-11-04'),(397,3,46,14,2,'2024-11-04'),(398,3,46,15,2,'2024-11-04'),(399,3,47,14,2,'2024-11-04'),(400,3,47,15,2,'2024-11-04'),(401,3,48,14,2,'2024-11-04'),(402,3,48,15,2,'2024-11-04'),(403,3,49,14,2,'2024-11-04'),(404,3,49,15,2,'2024-11-04'),(405,3,50,14,NULL,NULL),(406,3,50,15,NULL,NULL),(407,3,51,14,NULL,NULL),(408,3,51,15,NULL,NULL),(409,3,52,14,NULL,NULL),(410,3,52,15,NULL,NULL),(411,3,53,14,NULL,NULL),(412,3,53,15,NULL,NULL),(413,3,54,14,NULL,NULL),(414,3,54,15,NULL,NULL),(415,3,55,14,NULL,NULL),(416,3,55,15,NULL,NULL),(417,3,56,14,NULL,NULL),(418,3,56,15,NULL,NULL),(419,3,57,14,NULL,NULL),(420,3,57,15,NULL,NULL),(421,3,58,14,NULL,NULL),(422,3,58,15,NULL,NULL),(423,3,59,14,NULL,NULL),(424,3,59,15,NULL,NULL),(425,3,60,14,NULL,NULL),(426,3,60,15,NULL,NULL),(427,3,61,14,NULL,NULL),(428,3,61,15,NULL,NULL),(429,3,62,14,NULL,NULL),(430,3,62,15,NULL,NULL),(431,3,63,14,NULL,NULL),(432,3,63,15,NULL,NULL),(433,3,64,14,NULL,NULL),(434,3,64,15,NULL,NULL),(435,3,65,14,NULL,NULL),(436,3,65,15,NULL,NULL),(437,3,66,14,NULL,NULL),(438,3,66,15,NULL,NULL),(439,3,67,14,NULL,NULL),(440,3,67,15,NULL,NULL),(441,3,68,14,NULL,NULL),(442,3,68,15,NULL,NULL),(443,3,69,14,NULL,NULL),(444,3,69,15,NULL,NULL),(445,3,70,14,NULL,NULL),(446,3,70,15,NULL,NULL),(447,3,71,14,NULL,NULL),(448,3,71,15,NULL,NULL),(449,3,72,14,NULL,NULL),(450,3,72,15,NULL,NULL),(451,3,73,14,NULL,NULL),(452,3,73,15,NULL,NULL),(453,3,74,14,NULL,NULL),(454,3,74,15,NULL,NULL),(455,3,75,14,NULL,NULL),(456,3,75,15,NULL,NULL),(457,3,76,14,NULL,NULL),(458,3,76,15,NULL,NULL),(459,3,77,14,NULL,NULL),(460,3,77,15,NULL,NULL),(461,3,78,14,NULL,NULL),(462,3,78,15,NULL,NULL),(463,3,79,14,NULL,NULL),(464,3,79,15,NULL,NULL),(465,3,80,14,NULL,NULL),(466,3,80,15,NULL,NULL),(467,3,81,14,NULL,NULL),(468,3,81,15,NULL,NULL),(469,3,82,14,NULL,NULL),(470,3,82,15,NULL,NULL),(471,3,83,14,NULL,NULL),(472,3,83,15,NULL,NULL),(473,3,84,14,NULL,NULL),(474,3,84,15,NULL,NULL),(475,3,85,14,NULL,NULL),(476,3,85,15,NULL,NULL),(477,3,86,14,NULL,NULL),(478,3,86,15,NULL,NULL),(479,3,87,14,NULL,NULL),(480,3,87,15,NULL,NULL),(481,3,88,14,NULL,NULL),(482,3,88,15,NULL,NULL),(483,3,89,14,NULL,NULL),(484,3,89,15,NULL,NULL),(485,3,90,14,NULL,NULL),(486,3,90,15,NULL,NULL),(487,3,91,14,NULL,NULL),(488,3,91,15,NULL,NULL),(489,3,92,14,NULL,NULL),(490,3,92,15,NULL,NULL),(491,3,93,14,NULL,NULL),(492,3,93,15,NULL,NULL),(493,3,94,14,NULL,NULL),(494,3,94,15,NULL,NULL),(495,3,95,14,NULL,NULL),(496,3,95,15,NULL,NULL),(497,3,96,14,NULL,NULL),(498,3,96,15,NULL,NULL),(499,3,97,14,NULL,NULL),(500,3,97,15,NULL,NULL),(501,3,98,14,NULL,NULL),(502,3,98,15,NULL,NULL),(503,3,99,14,NULL,NULL),(504,3,99,15,NULL,NULL),(505,3,100,14,NULL,NULL),(506,3,100,15,NULL,NULL),(507,3,101,14,2,'2024-11-04'),(508,3,101,15,2,'2024-11-04'),(509,3,102,14,2,'2024-11-04'),(510,3,102,15,2,'2024-11-04'),(511,3,103,14,2,'2024-11-04'),(512,3,103,15,2,'2024-11-04'),(513,3,104,14,2,'2024-11-04'),(514,3,104,15,2,'2024-11-04'),(515,3,105,14,2,'2024-11-04'),(516,3,105,15,2,'2024-11-04'),(517,3,106,14,2,'2024-11-04'),(518,3,106,15,2,'2024-11-04'),(519,3,107,14,2,'2024-11-04'),(520,3,107,15,2,'2024-11-04'),(521,3,108,14,2,'2024-11-04'),(522,3,108,15,2,'2024-11-04'),(523,3,109,14,2,'2024-11-04'),(524,3,109,15,2,'2024-11-04'),(525,3,110,14,2,'2024-11-04'),(526,3,110,15,2,'2024-11-04'),(527,3,111,14,2,'2024-11-04'),(528,3,111,15,2,'2024-11-04'),(529,3,112,14,2,'2024-11-04'),(530,3,112,15,2,'2024-11-04'),(531,3,113,14,2,'2024-11-04'),(532,3,113,15,2,'2024-11-04'),(533,3,114,14,2,'2024-11-04'),(534,3,114,15,2,'2024-11-04'),(535,3,115,14,2,'2024-11-04'),(536,3,115,15,2,'2024-11-04'),(537,3,116,14,2,'2024-11-04'),(538,3,116,15,2,'2024-11-04'),(539,3,117,14,2,'2024-11-04'),(540,3,117,15,2,'2024-11-04'),(541,3,118,14,2,'2024-11-04'),(542,3,118,15,2,'2024-11-04'),(543,3,119,14,2,'2024-11-04'),(544,3,119,15,2,'2024-11-04'),(545,3,120,14,2,'2024-11-04'),(546,3,120,15,2,'2024-11-04'),(547,3,121,14,2,'2024-11-04'),(548,3,121,15,2,'2024-11-04'),(549,3,122,14,2,'2024-11-04'),(550,3,122,15,2,'2024-11-04'),(551,3,123,14,2,'2024-11-04'),(552,3,123,15,2,'2024-11-04'),(553,3,124,14,2,'2024-11-04'),(554,3,124,15,2,'2024-11-04'),(555,3,125,14,2,'2024-11-04'),(556,3,125,15,2,'2024-11-04'),(557,3,126,14,2,'2024-11-04'),(558,3,126,15,2,'2024-11-04'),(559,3,127,14,2,'2024-11-04'),(560,3,127,15,2,'2024-11-04'),(561,3,128,14,2,'2024-11-04'),(562,3,128,15,2,'2024-11-04'),(563,3,129,14,2,'2024-11-04'),(564,3,129,15,2,'2024-11-04'),(565,3,130,14,2,'2024-11-04'),(566,3,130,15,2,'2024-11-04'),(567,3,131,14,2,'2024-11-04'),(568,3,131,15,2,'2024-11-04'),(569,3,132,14,2,'2024-11-04'),(570,3,132,15,2,'2024-11-04'),(571,3,133,14,2,'2024-11-04'),(572,3,133,15,2,'2024-11-04'),(573,3,134,14,2,'2024-11-04'),(574,3,134,15,2,'2024-11-04'),(575,3,135,14,2,'2024-11-04'),(576,3,135,15,2,'2024-11-04'),(577,3,136,14,2,'2024-11-04'),(578,3,136,15,2,'2024-11-04'),(579,3,137,14,2,'2024-11-04'),(580,3,137,15,2,'2024-11-04'),(581,3,138,14,2,'2024-11-04'),(582,3,138,15,2,'2024-11-04'),(583,3,139,14,2,'2024-11-04'),(584,3,139,15,2,'2024-11-04'),(585,3,140,14,2,'2024-11-04'),(586,3,140,15,2,'2024-11-04'),(587,3,141,14,2,'2024-11-04'),(588,3,141,15,2,'2024-11-04'),(589,3,142,14,2,'2024-11-04'),(590,3,142,15,2,'2024-11-04'),(591,3,143,14,2,'2024-11-04'),(592,3,143,15,2,'2024-11-04'),(593,3,144,14,2,'2024-11-04'),(594,3,144,15,2,'2024-11-04'),(595,3,145,14,2,'2024-11-04'),(596,3,145,15,2,'2024-11-04'),(597,3,146,14,2,'2024-11-04'),(598,3,146,15,2,'2024-11-04'),(599,3,147,14,2,'2024-11-04'),(600,3,147,15,2,'2024-11-04'),(601,3,148,14,2,'2024-11-04'),(602,3,148,15,2,'2024-11-04'),(603,3,149,14,2,'2024-11-04'),(604,3,149,15,2,'2024-11-04'),(605,3,150,14,2,'2024-11-04'),(606,3,150,15,2,'2024-11-04'),(607,3,151,14,2,'2024-11-04'),(608,3,151,15,2,'2024-11-04'),(609,3,152,14,2,'2024-11-04'),(610,3,152,15,2,'2024-11-04'),(611,3,153,14,2,'2024-11-04'),(612,3,153,15,2,'2024-11-04');
/*!40000 ALTER TABLE `student_feedback` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
INSERT INTO `submissions` VALUES (1,3,1,1,'2024-11-04 12:54:11',0,10,NULL),(2,3,1,2,NULL,0,NULL,NULL),(3,3,1,3,NULL,0,NULL,NULL),(4,3,1,4,NULL,0,NULL,NULL),(5,3,1,5,NULL,0,NULL,NULL),(6,3,1,6,NULL,0,NULL,NULL),(7,3,1,7,NULL,0,NULL,NULL),(8,3,1,8,NULL,0,NULL,NULL),(9,3,1,9,NULL,0,NULL,NULL),(10,3,1,10,NULL,0,NULL,NULL),(11,3,1,11,NULL,0,NULL,NULL),(12,3,1,12,NULL,0,NULL,NULL),(13,3,1,13,NULL,0,NULL,NULL),(14,3,1,14,NULL,0,NULL,NULL),(15,3,1,15,NULL,0,NULL,NULL),(16,3,1,16,NULL,0,NULL,NULL),(17,3,1,17,NULL,0,NULL,NULL),(18,3,1,18,NULL,0,NULL,NULL),(19,3,1,19,NULL,0,NULL,NULL),(20,3,1,20,NULL,0,NULL,NULL),(21,3,1,21,NULL,0,NULL,NULL),(22,3,1,22,NULL,0,NULL,NULL),(23,3,1,23,NULL,0,NULL,NULL),(24,3,1,24,NULL,0,NULL,NULL),(25,3,1,25,NULL,0,NULL,NULL),(26,3,1,26,NULL,0,NULL,NULL),(27,3,1,27,NULL,0,NULL,NULL),(28,3,1,28,NULL,0,NULL,NULL),(29,3,1,29,NULL,0,NULL,NULL),(30,3,1,30,NULL,0,NULL,NULL),(31,3,1,31,NULL,0,NULL,NULL),(32,3,1,32,NULL,0,NULL,NULL),(33,3,1,33,NULL,0,NULL,NULL),(34,3,1,34,NULL,0,NULL,NULL),(35,3,1,35,NULL,0,NULL,NULL),(36,3,1,36,NULL,0,NULL,NULL),(37,3,1,37,NULL,0,NULL,NULL),(38,3,1,38,NULL,0,NULL,NULL),(39,3,1,39,NULL,0,NULL,NULL),(40,3,1,40,NULL,0,NULL,NULL),(41,3,1,41,NULL,0,NULL,NULL),(42,3,1,42,NULL,0,NULL,NULL),(43,3,1,43,NULL,0,NULL,NULL),(44,3,1,44,NULL,0,NULL,NULL),(45,3,1,45,NULL,0,NULL,NULL),(46,3,1,46,NULL,0,NULL,NULL),(47,3,1,47,NULL,0,NULL,NULL),(48,3,1,48,NULL,0,NULL,NULL),(49,3,1,49,NULL,0,NULL,NULL),(50,3,1,50,NULL,0,NULL,NULL),(51,3,1,51,NULL,0,NULL,NULL),(52,3,1,52,NULL,0,NULL,NULL),(53,3,1,53,NULL,0,NULL,NULL),(54,3,1,54,NULL,0,NULL,NULL),(55,3,1,55,NULL,0,NULL,NULL),(56,3,1,56,NULL,0,NULL,NULL),(57,3,1,57,NULL,0,NULL,NULL),(58,3,1,58,NULL,0,NULL,NULL),(59,3,1,59,NULL,0,NULL,NULL),(60,3,1,60,NULL,0,NULL,NULL),(61,3,1,61,NULL,0,NULL,NULL),(62,3,1,62,NULL,0,NULL,NULL),(63,3,1,63,NULL,0,NULL,NULL),(64,3,1,64,NULL,0,NULL,NULL),(65,3,1,65,NULL,0,NULL,NULL),(66,3,1,66,NULL,0,NULL,NULL),(67,3,1,67,NULL,0,NULL,NULL),(68,3,1,68,NULL,0,NULL,NULL),(69,3,1,69,NULL,0,NULL,NULL),(70,3,1,70,NULL,0,NULL,NULL),(71,3,1,71,NULL,0,NULL,NULL),(72,3,1,72,NULL,0,NULL,NULL),(73,3,1,73,NULL,0,NULL,NULL),(74,3,1,74,NULL,0,NULL,NULL),(75,3,1,75,NULL,0,NULL,NULL),(76,3,1,76,NULL,0,NULL,NULL),(77,3,1,77,NULL,0,NULL,NULL),(78,3,1,78,NULL,0,NULL,NULL),(79,3,1,79,NULL,0,NULL,NULL),(80,3,1,80,NULL,0,NULL,NULL),(81,3,1,81,NULL,0,NULL,NULL),(82,3,1,82,NULL,0,NULL,NULL),(83,3,1,83,NULL,0,NULL,NULL),(84,3,1,84,NULL,0,NULL,NULL),(85,3,1,85,NULL,0,NULL,NULL),(86,3,1,86,NULL,0,NULL,NULL),(87,3,1,87,NULL,0,NULL,NULL),(88,3,1,88,NULL,0,NULL,NULL),(89,3,1,89,NULL,0,NULL,NULL),(90,3,1,90,NULL,0,NULL,NULL),(91,3,1,91,NULL,0,NULL,NULL),(92,3,1,92,NULL,0,NULL,NULL),(93,3,1,93,NULL,0,NULL,NULL),(94,3,1,94,NULL,0,NULL,NULL),(95,3,1,95,NULL,0,NULL,NULL),(96,3,1,96,NULL,0,NULL,NULL),(97,3,1,97,NULL,0,NULL,NULL),(98,3,1,98,NULL,0,NULL,NULL),(99,3,1,99,NULL,0,NULL,NULL),(100,3,1,100,NULL,0,NULL,NULL),(101,3,1,101,NULL,0,NULL,NULL),(102,3,1,102,NULL,0,NULL,NULL),(103,3,1,103,NULL,0,NULL,NULL),(104,3,1,104,NULL,0,NULL,NULL),(105,3,1,105,NULL,0,NULL,NULL),(106,3,1,106,NULL,0,NULL,NULL),(107,3,1,107,NULL,0,NULL,NULL),(108,3,1,108,NULL,0,NULL,NULL),(109,3,1,109,NULL,0,NULL,NULL),(110,3,1,110,NULL,0,NULL,NULL),(111,3,1,111,NULL,0,NULL,NULL),(112,3,1,112,NULL,0,NULL,NULL),(113,3,1,113,NULL,0,NULL,NULL),(114,3,1,114,NULL,0,NULL,NULL),(115,3,1,115,NULL,0,NULL,NULL),(116,3,1,116,NULL,0,NULL,NULL),(117,3,1,117,NULL,0,NULL,NULL),(118,3,1,118,NULL,0,NULL,NULL),(119,3,1,119,NULL,0,NULL,NULL),(120,3,1,120,NULL,0,NULL,NULL),(121,3,1,121,NULL,0,NULL,NULL),(122,3,1,122,NULL,0,NULL,NULL),(123,3,1,123,NULL,0,NULL,NULL),(124,3,1,124,NULL,0,NULL,NULL),(125,3,1,125,NULL,0,NULL,NULL),(126,3,1,126,NULL,0,NULL,NULL),(127,3,1,127,NULL,0,NULL,NULL),(128,3,1,128,NULL,0,NULL,NULL),(129,3,1,129,NULL,0,NULL,NULL),(130,3,1,130,NULL,0,NULL,NULL),(131,3,1,131,NULL,0,NULL,NULL),(132,3,1,132,NULL,0,NULL,NULL),(133,3,1,133,NULL,0,NULL,NULL),(134,3,1,134,NULL,0,NULL,NULL),(135,3,1,135,NULL,0,NULL,NULL),(136,3,1,136,NULL,0,NULL,NULL),(137,3,1,137,NULL,0,NULL,NULL),(138,3,1,138,NULL,0,NULL,NULL),(139,3,1,139,NULL,0,NULL,NULL),(140,3,1,140,NULL,0,NULL,NULL),(141,3,1,141,NULL,0,NULL,NULL),(142,3,1,142,NULL,0,NULL,NULL),(143,3,1,143,NULL,0,NULL,NULL),(144,3,1,144,NULL,0,NULL,NULL),(145,3,1,145,NULL,0,NULL,NULL),(146,3,1,146,NULL,0,NULL,NULL),(147,3,1,147,NULL,0,NULL,NULL),(148,3,1,148,NULL,0,NULL,NULL),(149,3,1,149,NULL,0,NULL,NULL),(150,3,1,150,NULL,0,NULL,NULL),(151,3,1,151,NULL,0,NULL,NULL),(152,3,1,152,NULL,0,NULL,NULL),(153,3,1,153,NULL,0,NULL,NULL),(256,3,1,1,'2024-11-04 12:01:33',NULL,20,NULL);
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `submissions_file`
--

LOCK TABLES `submissions_file` WRITE;
/*!40000 ALTER TABLE `submissions_file` DISABLE KEYS */;
INSERT INTO `submissions_file` VALUES (1,256,'My Resume.pdf','application/pdf',44656,'2024-11-04 12:01:34','/uploads/submissions/files-1730721693796-294562193-My Resume.pdf');
/*!40000 ALTER TABLE `submissions_file` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `table_ia`
--

LOCK TABLES `table_ia` WRITE;
/*!40000 ALTER TABLE `table_ia` DISABLE KEYS */;
INSERT INTO `table_ia` VALUES (8,'Q1A','CO1',3,2),(9,'Q1B','CO1',3,2),(10,'Q1C','CO1',3,1),(11,'Q2','CO1',3,5),(12,'Q3','CO2',3,5),(13,'Q4','CO1',3,5),(14,'Q5','CO2',3,5),(15,'Q1A','CO1',2,2),(16,'Q1B','CO3',2,2),(17,'Q1C','CO2',2,1),(18,'Q2','CO2',2,5),(19,'Q3','CO1',2,5),(20,'Q4','CO3',2,5),(21,'Q5','CO2',2,5),(22,'Q1A','CO1',1,2),(23,'Q1B','CO2',1,2),(24,'Q1C','CO3',1,1),(25,'Q2','CO1',1,5),(26,'Q3','CO2',1,5),(27,'Q4','CO3',1,5),(28,'Q5','CO1',1,5),(29,'Q1A','CO1',11,2),(30,'Q1B','CO2',11,2),(31,'Q1C','CO3',11,1),(32,'Q2','CO3',11,5),(33,'Q3','CO2',11,5),(34,'Q4','CO1',11,5),(35,'Q5','CO1',11,5);
/*!40000 ALTER TABLE `table_ia` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `table_ia2`
--

LOCK TABLES `table_ia2` WRITE;
/*!40000 ALTER TABLE `table_ia2` DISABLE KEYS */;
INSERT INTO `table_ia2` VALUES (1,'Q1A','CO2',3,2),(2,'Q1B','CO3',3,2),(3,'Q1C','CO4',3,1),(4,'Q2','CO4',3,5),(5,'Q3','CO2',3,5),(6,'Q4','CO2',3,5),(7,'Q5','CO3',3,5),(11,'Q1A','CO1',2,2),(12,'Q1B','CO2',2,2),(13,'Q1C','CO2',2,1),(14,'Q2','CO1',2,5),(15,'Q3','CO3',2,5),(16,'Q4','CO2',2,5),(17,'Q5','CO1',2,5),(18,'QA1','CO3',11,2),(19,'QA2','CO4',11,2),(20,'QA3','CO2',11,1),(21,'Q2','CO3',11,5),(22,'Q3','CO3',11,5),(23,'Q4','CO4',11,5),(24,'Q5','CO1',11,5);
/*!40000 ALTER TABLE `table_ia2` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `table_oral`
--

LOCK TABLES `table_oral` WRITE;
/*!40000 ALTER TABLE `table_oral` DISABLE KEYS */;
INSERT INTO `table_oral` VALUES (1,1,2,22),(3,2,2,23),(5,3,2,23),(7,4,2,19),(9,5,2,19),(11,6,2,19),(13,7,2,18),(15,8,2,16),(17,9,2,21),(19,10,2,19),(21,11,2,17),(23,12,2,21),(25,13,2,19),(27,14,2,23),(29,15,2,17),(31,16,2,23),(33,17,2,20),(35,18,2,16),(37,19,2,16),(39,20,2,17),(41,21,2,18),(43,22,2,5),(45,23,2,18),(47,24,2,22),(49,25,2,22),(51,26,2,18),(53,27,2,22),(55,28,2,21),(57,29,2,22),(59,30,2,16),(61,31,2,20),(63,32,2,23),(65,33,2,23),(67,34,2,22),(69,35,2,23),(71,36,2,23),(73,37,2,17),(75,38,2,16),(77,39,2,17),(79,40,2,20),(81,41,2,17),(83,42,2,19),(85,43,2,20),(87,44,2,19),(89,45,2,19),(91,46,2,22),(93,47,2,19),(95,48,2,22),(97,49,2,20),(99,50,2,19),(101,51,2,16),(103,52,2,21),(105,53,2,21),(107,54,2,18),(109,55,2,17),(111,56,2,17),(113,57,2,22),(115,58,2,21),(117,59,2,18),(119,60,2,21),(121,61,2,21),(123,62,2,19),(125,63,2,22),(127,64,2,21),(129,65,2,18),(131,66,2,18),(133,67,2,22),(135,68,2,16),(137,69,2,22),(139,70,2,18),(141,71,2,16),(143,72,2,18),(145,73,2,20),(147,74,2,20),(149,75,2,16),(151,76,2,22),(153,77,2,19),(155,78,2,19),(157,79,2,22),(159,80,2,23),(161,81,2,17),(163,82,2,19),(165,83,2,21),(167,84,2,22),(169,85,2,20),(171,86,2,19),(173,87,2,17),(175,88,2,16),(177,89,2,18),(179,90,2,18),(181,91,2,16),(183,92,2,21),(185,93,2,17),(187,94,2,18),(189,95,2,19),(191,96,2,23),(193,97,2,17),(195,98,2,17),(197,99,2,18),(199,100,2,22),(201,101,2,23),(203,102,2,19),(205,103,2,18),(207,104,2,20),(209,105,2,17),(211,106,2,16),(213,107,2,20),(215,108,2,23),(217,109,2,23),(219,110,2,18),(221,111,2,16),(223,112,2,16),(225,113,2,20),(227,114,2,23),(229,115,2,19),(231,116,2,17),(233,117,2,22),(235,118,2,20),(237,119,2,17),(239,120,2,20),(241,121,2,19),(243,122,2,21),(245,123,2,21),(247,124,2,16),(249,125,2,23),(251,126,2,23),(253,127,2,23),(255,128,2,20),(257,129,2,19),(259,130,2,21),(261,131,2,19),(263,132,2,23),(265,133,2,22),(267,134,2,22),(269,135,2,17),(271,136,2,22),(273,137,2,21),(275,138,2,18),(277,139,2,19),(279,140,2,19),(281,141,2,22),(283,142,2,19),(285,143,2,19),(287,144,2,18),(289,145,2,23),(291,146,2,19),(293,147,2,22),(295,148,2,23),(297,149,2,21),(299,150,2,22),(301,151,2,17),(303,152,2,23),(305,153,2,22),(308,2,1,NULL),(309,3,1,NULL),(310,4,1,NULL),(311,5,1,NULL),(312,6,1,NULL),(313,7,1,NULL),(314,8,1,NULL),(315,9,1,NULL),(316,10,1,NULL),(317,11,1,NULL),(318,12,1,NULL),(319,13,1,NULL),(320,14,1,NULL),(321,15,1,NULL),(322,16,1,NULL),(323,17,1,NULL),(324,18,1,NULL),(325,19,1,NULL),(326,20,1,NULL),(327,21,1,NULL),(328,22,1,NULL),(329,23,1,NULL),(330,24,1,NULL),(331,25,1,NULL),(332,26,1,NULL),(333,27,1,NULL),(334,28,1,NULL),(335,29,1,NULL),(336,30,1,NULL),(337,31,1,NULL),(338,32,1,NULL),(339,33,1,NULL),(340,34,1,NULL),(341,35,1,NULL),(342,36,1,NULL),(343,37,1,NULL),(344,38,1,NULL),(345,39,1,NULL),(346,40,1,NULL),(347,41,1,NULL),(348,42,1,NULL),(349,43,1,NULL),(350,44,1,NULL),(351,45,1,NULL),(352,46,1,NULL),(353,47,1,NULL),(354,48,1,NULL),(355,49,1,NULL),(356,50,1,NULL),(357,51,1,NULL),(358,52,1,NULL),(359,53,1,NULL),(360,54,1,NULL),(361,55,1,NULL),(362,56,1,NULL),(363,57,1,NULL),(364,58,1,NULL),(365,59,1,NULL),(366,60,1,NULL),(367,61,1,NULL),(368,62,1,NULL),(369,63,1,NULL),(370,64,1,NULL),(371,65,1,NULL),(372,66,1,NULL),(373,67,1,NULL),(374,68,1,NULL),(375,69,1,NULL),(376,70,1,NULL),(377,71,1,NULL),(378,72,1,NULL),(379,73,1,NULL),(380,74,1,NULL),(381,75,1,NULL),(382,76,1,NULL),(383,77,1,NULL),(384,78,1,NULL),(385,79,1,NULL),(386,80,1,NULL),(387,81,1,NULL),(388,82,1,NULL),(389,83,1,NULL),(390,84,1,NULL),(391,85,1,NULL),(392,86,1,NULL),(393,87,1,NULL),(394,88,1,NULL),(395,89,1,NULL),(396,90,1,NULL),(397,91,1,NULL),(398,92,1,NULL),(399,93,1,NULL),(400,94,1,NULL),(401,95,1,NULL),(402,96,1,NULL),(403,97,1,NULL),(404,98,1,NULL),(405,99,1,NULL),(406,100,1,NULL),(407,101,1,NULL),(408,102,1,NULL),(409,103,1,NULL),(410,104,1,NULL),(411,105,1,NULL),(412,106,1,NULL),(413,107,1,NULL),(414,108,1,NULL),(415,109,1,NULL),(416,110,1,NULL),(417,111,1,NULL),(418,112,1,NULL),(419,113,1,NULL),(420,114,1,NULL),(421,115,1,NULL),(422,116,1,NULL),(423,117,1,NULL),(424,118,1,NULL),(425,119,1,NULL),(426,120,1,NULL),(427,121,1,NULL),(428,122,1,NULL),(429,123,1,NULL),(430,124,1,NULL),(431,125,1,NULL),(432,126,1,NULL),(433,127,1,NULL),(434,128,1,NULL),(435,129,1,NULL),(436,130,1,NULL),(437,131,1,NULL),(438,132,1,NULL),(439,133,1,NULL),(440,134,1,NULL),(441,135,1,NULL),(442,136,1,NULL),(443,137,1,NULL),(444,138,1,NULL),(445,139,1,NULL),(446,140,1,NULL),(447,141,1,NULL),(448,142,1,NULL),(449,143,1,NULL),(450,144,1,NULL),(451,145,1,NULL),(452,146,1,NULL),(453,147,1,NULL),(454,148,1,NULL),(455,149,1,NULL),(456,150,1,NULL),(457,151,1,NULL),(458,152,1,NULL),(459,153,1,NULL),(460,1,1,NULL);
/*!40000 ALTER TABLE `table_oral` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `table_sem`
--

LOCK TABLES `table_sem` WRITE;
/*!40000 ALTER TABLE `table_sem` DISABLE KEYS */;
INSERT INTO `table_sem` VALUES (2,1,1,35),(3,2,2,70),(4,2,1,70),(5,3,2,NULL),(6,3,1,44),(7,4,2,NULL),(8,4,1,38),(9,5,2,NULL),(10,5,1,46),(11,6,2,NULL),(12,6,1,43),(13,7,2,NULL),(14,7,1,52),(15,8,2,NULL),(16,8,1,49),(17,9,2,NULL),(18,9,1,35),(19,10,2,NULL),(20,10,1,48),(21,11,2,NULL),(22,11,1,34),(23,12,2,NULL),(24,12,1,45),(25,13,2,NULL),(26,13,1,46),(27,14,2,NULL),(28,14,1,41),(29,15,2,NULL),(30,15,1,32),(31,16,2,NULL),(32,16,1,7),(33,17,2,NULL),(34,17,1,45),(35,18,2,NULL),(36,18,1,42),(37,19,2,NULL),(38,19,1,33),(39,20,2,NULL),(40,20,1,39),(41,21,2,NULL),(42,21,1,48),(43,22,2,NULL),(44,22,1,40),(45,23,2,NULL),(46,23,1,37),(47,24,2,NULL),(48,24,1,50),(49,25,2,NULL),(50,25,1,42),(51,26,2,NULL),(52,26,1,38),(53,27,2,NULL),(54,27,1,37),(55,28,2,NULL),(56,28,1,32),(57,29,2,NULL),(58,29,1,47),(59,30,2,NULL),(60,30,1,43),(61,31,2,NULL),(62,31,1,42),(63,32,2,NULL),(64,32,1,38),(65,33,2,NULL),(66,33,1,44),(67,34,2,NULL),(68,34,1,49),(69,35,2,NULL),(70,35,1,33),(71,36,2,NULL),(72,36,1,35),(73,37,2,NULL),(74,37,1,40),(75,38,2,NULL),(76,38,1,34),(77,39,2,NULL),(78,39,1,38),(79,40,2,NULL),(80,40,1,32),(81,41,2,NULL),(82,41,1,35),(83,42,2,NULL),(84,42,1,46),(85,43,2,NULL),(86,43,1,50),(87,44,2,NULL),(88,44,1,49),(89,45,2,NULL),(90,45,1,45),(91,46,2,NULL),(92,46,1,48),(93,47,2,NULL),(94,47,1,53),(95,48,2,NULL),(96,48,1,27),(97,49,2,NULL),(98,49,1,43),(99,50,2,NULL),(100,50,1,33),(101,51,2,NULL),(102,51,1,41),(103,52,2,NULL),(104,52,1,48),(105,53,2,NULL),(106,53,1,41),(107,54,2,NULL),(108,54,1,35),(109,55,2,NULL),(110,55,1,52),(111,56,2,NULL),(112,56,1,45),(113,57,2,NULL),(114,57,1,34),(115,58,2,NULL),(116,58,1,51),(117,59,2,NULL),(118,59,1,34),(119,60,2,NULL),(120,60,1,34),(121,61,2,NULL),(122,61,1,53),(123,62,2,NULL),(124,62,1,39),(125,63,2,NULL),(126,63,1,36),(127,64,2,NULL),(128,64,1,29),(129,65,2,NULL),(130,65,1,39),(131,66,2,NULL),(132,66,1,44),(133,67,2,NULL),(134,67,1,32),(135,68,2,NULL),(136,68,1,51),(137,69,2,NULL),(138,69,1,33),(139,70,2,NULL),(140,70,1,58),(141,71,2,NULL),(142,71,1,61),(143,72,2,NULL),(144,72,1,74),(145,73,2,NULL),(146,73,1,48),(147,74,2,NULL),(148,74,1,41),(149,75,2,NULL),(150,75,1,46),(151,76,2,NULL),(152,76,1,73),(153,77,2,NULL),(154,77,1,45),(155,78,2,NULL),(156,78,1,59),(157,79,2,NULL),(158,79,1,47),(159,80,2,NULL),(160,80,1,77),(161,81,2,NULL),(162,81,1,53),(163,82,2,NULL),(164,82,1,43),(165,83,2,NULL),(166,83,1,55),(167,84,2,NULL),(168,84,1,79),(169,85,2,NULL),(170,85,1,45),(171,86,2,NULL),(172,86,1,70),(173,87,2,NULL),(174,87,1,50),(175,88,2,NULL),(176,88,1,42),(177,89,2,NULL),(178,89,1,34),(179,90,2,NULL),(180,90,1,60),(181,91,2,NULL),(182,91,1,32),(183,92,2,NULL),(184,92,1,46),(185,93,2,NULL),(186,93,1,35),(187,94,2,NULL),(188,94,1,51),(189,95,2,NULL),(190,95,1,42),(191,96,2,NULL),(192,96,1,47),(193,97,2,NULL),(194,97,1,48),(195,98,2,NULL),(196,98,1,54),(197,99,2,NULL),(198,99,1,39),(199,100,2,NULL),(200,100,1,35),(201,101,2,NULL),(202,101,1,42),(203,102,2,NULL),(204,102,1,71),(205,103,2,NULL),(206,103,1,4),(207,104,2,NULL),(208,104,1,74),(209,105,2,NULL),(210,105,1,59),(211,106,2,NULL),(212,106,1,47),(213,107,2,NULL),(214,107,1,32),(215,108,2,NULL),(216,108,1,48),(217,109,2,NULL),(218,109,1,44),(219,110,2,NULL),(220,110,1,25),(221,111,2,NULL),(222,111,1,NULL),(223,112,2,NULL),(224,112,1,51),(225,113,2,NULL),(226,113,1,58),(227,114,2,NULL),(228,114,1,63),(229,115,2,NULL),(230,115,1,68),(231,116,2,NULL),(232,116,1,52),(233,117,2,NULL),(234,117,1,73),(235,118,2,NULL),(236,118,1,69),(237,119,2,NULL),(238,119,1,37),(239,120,2,NULL),(240,120,1,69),(241,121,2,NULL),(242,121,1,57),(243,122,2,NULL),(244,122,1,59),(245,123,2,NULL),(246,123,1,50),(247,124,2,NULL),(248,124,1,44),(249,125,2,NULL),(250,125,1,49),(251,126,2,NULL),(252,126,1,32),(253,127,2,NULL),(254,127,1,34),(255,128,2,NULL),(256,128,1,62),(257,129,2,NULL),(258,129,1,48),(259,130,2,NULL),(260,130,1,51),(261,131,2,NULL),(262,131,1,42),(263,132,2,NULL),(264,132,1,50),(265,133,2,NULL),(266,133,1,32),(267,134,2,NULL),(268,134,1,60),(269,135,2,NULL),(270,135,1,37),(271,136,2,NULL),(272,136,1,43),(273,137,2,NULL),(274,137,1,48),(275,138,2,NULL),(276,138,1,39),(277,139,2,NULL),(278,139,1,40),(279,140,2,NULL),(280,140,1,34),(281,141,2,NULL),(282,141,1,41),(283,142,2,NULL),(284,142,1,46),(285,143,2,NULL),(286,143,1,59),(287,144,2,NULL),(288,144,1,32),(289,145,2,NULL),(290,145,1,46),(291,146,2,NULL),(292,146,1,75),(293,147,2,NULL),(294,147,1,43),(295,148,2,NULL),(296,148,1,65),(297,149,2,NULL),(298,149,1,40),(299,150,2,NULL),(300,150,1,57),(301,151,2,NULL),(302,151,1,70),(303,152,2,NULL),(304,152,1,62),(305,153,2,NULL),(306,153,1,30),(513,2,2,NULL),(514,3,2,NULL),(515,4,2,NULL),(516,5,2,NULL),(517,6,2,NULL),(518,7,2,NULL),(519,8,2,NULL),(520,9,2,NULL),(521,10,2,NULL),(522,11,2,NULL),(523,12,2,NULL),(524,13,2,NULL),(525,14,2,NULL),(526,15,2,NULL),(527,16,2,NULL),(528,17,2,NULL),(529,18,2,NULL),(530,19,2,NULL),(531,20,2,NULL),(532,21,2,NULL),(533,22,2,NULL),(534,23,2,NULL),(535,24,2,NULL),(536,25,2,NULL),(537,26,2,NULL),(538,27,2,NULL),(539,28,2,NULL),(540,29,2,NULL),(541,30,2,NULL),(542,31,2,NULL),(543,32,2,NULL),(544,33,2,NULL),(545,34,2,NULL),(546,35,2,NULL),(547,36,2,NULL),(548,37,2,NULL),(549,38,2,NULL),(550,39,2,NULL),(551,40,2,NULL),(552,41,2,NULL),(553,42,2,NULL),(554,43,2,NULL),(555,44,2,NULL),(556,45,2,NULL),(557,46,2,NULL),(558,47,2,NULL),(559,48,2,NULL),(560,49,2,NULL),(561,50,2,NULL),(562,51,2,NULL),(563,52,2,NULL),(564,53,2,NULL),(565,54,2,NULL),(566,55,2,NULL),(567,56,2,NULL),(568,57,2,NULL),(569,58,2,NULL),(570,59,2,NULL),(571,60,2,NULL),(572,61,2,NULL),(573,62,2,NULL),(574,63,2,NULL),(575,64,2,NULL),(576,65,2,NULL),(577,66,2,NULL),(578,67,2,NULL),(579,68,2,NULL),(580,69,2,NULL),(581,70,2,NULL),(582,71,2,NULL),(583,72,2,NULL),(584,73,2,NULL),(585,74,2,NULL),(586,75,2,NULL),(587,76,2,NULL),(588,77,2,NULL),(589,78,2,NULL),(590,79,2,NULL),(591,80,2,NULL),(592,81,2,NULL),(593,82,2,NULL),(594,83,2,NULL),(595,84,2,NULL),(596,85,2,NULL),(597,86,2,NULL),(598,87,2,NULL),(599,88,2,NULL),(600,89,2,NULL),(601,90,2,NULL),(602,91,2,NULL),(603,92,2,NULL),(604,93,2,NULL),(605,94,2,NULL),(606,95,2,NULL),(607,96,2,NULL),(608,97,2,NULL),(609,98,2,NULL),(610,99,2,NULL),(611,100,2,NULL),(612,101,2,NULL),(613,102,2,NULL),(614,103,2,NULL),(615,104,2,NULL),(616,105,2,NULL),(617,106,2,NULL),(618,107,2,NULL),(619,108,2,NULL),(620,109,2,NULL),(621,110,2,NULL),(622,111,2,NULL),(623,112,2,NULL),(624,113,2,NULL),(625,114,2,NULL),(626,115,2,NULL),(627,116,2,NULL),(628,117,2,NULL),(629,118,2,NULL),(630,119,2,NULL),(631,120,2,NULL),(632,121,2,NULL),(633,122,2,NULL),(634,123,2,NULL),(635,124,2,NULL),(636,125,2,NULL),(637,126,2,NULL),(638,127,2,NULL),(639,128,2,NULL),(640,129,2,NULL),(641,130,2,NULL),(642,131,2,NULL),(643,132,2,NULL),(644,133,2,NULL),(645,134,2,NULL),(646,135,2,NULL),(647,136,2,NULL),(648,137,2,NULL),(649,138,2,NULL),(650,139,2,NULL),(651,140,2,NULL),(652,141,2,NULL),(653,142,2,NULL),(654,143,2,NULL),(655,144,2,NULL),(656,145,2,NULL),(657,146,2,NULL),(658,147,2,NULL),(659,148,2,NULL),(660,149,2,NULL),(661,150,2,NULL),(662,151,2,NULL),(663,152,2,NULL),(664,153,2,NULL),(665,1,2,NULL),(666,1,3,56),(667,2,3,67),(668,3,3,56),(669,4,3,56),(670,5,3,56),(671,6,3,56),(672,7,3,56),(673,8,3,56),(674,9,3,56),(675,10,3,56),(676,11,3,56),(677,12,3,56),(678,13,3,56),(679,14,3,56),(680,15,3,56),(681,16,3,56),(682,17,3,56),(683,18,3,56),(684,19,3,56),(685,20,3,56),(686,21,3,56),(687,22,3,56),(688,23,3,56),(689,24,3,56),(690,25,3,56),(691,26,3,56),(692,27,3,56),(693,28,3,56),(694,29,3,56),(695,30,3,56),(696,31,3,56),(697,32,3,56),(698,33,3,56),(699,34,3,56),(700,35,3,56),(701,36,3,56),(702,37,3,56),(703,38,3,56),(704,39,3,56),(705,40,3,56),(706,41,3,56),(707,42,3,56),(708,43,3,56),(709,44,3,56),(710,45,3,56),(711,46,3,56),(712,47,3,56),(713,48,3,56),(714,49,3,56),(715,50,3,56),(716,51,3,56),(717,52,3,56),(718,53,3,56),(719,54,3,56),(720,55,3,56),(721,56,3,56),(722,57,3,56),(723,58,3,56),(724,59,3,56),(725,60,3,56),(726,61,3,56),(727,62,3,56),(728,63,3,56),(729,64,3,56),(730,65,3,56),(731,66,3,56),(732,67,3,56),(733,68,3,56),(734,69,3,56),(735,70,3,56),(736,71,3,56),(737,72,3,56),(738,73,3,56),(739,74,3,56),(740,75,3,56),(741,76,3,56),(742,77,3,56),(743,78,3,56),(744,79,3,56),(745,80,3,56),(746,81,3,56),(747,82,3,56),(748,83,3,56),(749,84,3,56),(750,85,3,56),(751,86,3,56),(752,87,3,56),(753,88,3,56),(754,89,3,56),(755,90,3,56),(756,91,3,56),(757,92,3,56),(758,93,3,56),(759,94,3,56),(760,95,3,56),(761,96,3,56),(762,97,3,56),(763,98,3,56),(764,99,3,56),(765,100,3,56),(766,101,3,56),(767,102,3,56),(768,103,3,56),(769,104,3,56),(770,105,3,56),(771,106,3,56),(772,107,3,56),(773,108,3,56),(774,109,3,56),(775,110,3,56),(776,111,3,56),(777,112,3,56),(778,113,3,56),(779,114,3,56),(780,115,3,56),(781,116,3,56),(782,117,3,56),(783,118,3,56),(784,119,3,56),(785,120,3,56),(786,121,3,56),(787,122,3,56),(788,123,3,56),(789,124,3,56),(790,125,3,56),(791,126,3,56),(792,127,3,56),(793,128,3,56),(794,129,3,56),(795,130,3,56),(796,131,3,56),(797,132,3,56),(798,133,3,56),(799,134,3,56),(800,135,3,56),(801,136,3,56),(802,137,3,56),(803,138,3,56),(804,139,3,56),(805,140,3,56),(806,141,3,56),(807,142,3,56),(808,143,3,56),(809,144,3,56),(810,145,3,56),(811,146,3,56),(812,147,3,56),(813,148,3,56),(814,149,3,56),(815,150,3,56),(816,151,3,56),(817,152,3,56),(818,153,3,56);
/*!40000 ALTER TABLE `table_sem` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `termwork_attainment_table`
--

LOCK TABLES `termwork_attainment_table` WRITE;
/*!40000 ALTER TABLE `termwork_attainment_table` DISABLE KEYS */;
INSERT INTO `termwork_attainment_table` VALUES (1,'CO1',46.38,1,3),(2,'CO2',74.08,3,3),(3,'CO3',92.76,3,3),(4,'CO4',93.42,3,3),(96,'CO1',14.29,0,8),(97,'CO2',25.00,0,8),(98,'CO3',50.00,1,8),(99,'CO4',100.00,3,8);
/*!40000 ALTER TABLE `termwork_attainment_table` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `termwork_table`
--

LOCK TABLES `termwork_table` WRITE;
/*!40000 ALTER TABLE `termwork_table` DISABLE KEYS */;
INSERT INTO `termwork_table` VALUES (1,9,3),(2,2,2),(3,4,1),(4,4,7),(5,2,8),(6,1,11);
/*!40000 ALTER TABLE `termwork_table` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `termworkbase`
--

LOCK TABLES `termworkbase` WRITE;
/*!40000 ALTER TABLE `termworkbase` DISABLE KEYS */;
INSERT INTO `termworkbase` VALUES (1,'Theory only (No TW)',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'Theory + Assignment - Maths',1,NULL,1,1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'PR Internal (TW ONLY) phy',NULL,1,NULL,1,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'Practical having Mini Project',NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL),(5,'Practical (10 + 10 + 5)',NULL,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'Practical (10 + 10 (Mini)+5)',NULL,1,1,1,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'PCE 2',NULL,NULL,1,1,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL),(8,'Workshop',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,1,1,NULL,NULL),(9,'Assignment+Attendance',NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'Practical (10+10+5) including oral for result',NULL,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'Practical(10+10(mini)+5) including oral for result',NULL,1,1,1,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'PCE 1',NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'Mini Project Semester',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(14,'Major Project Semester',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `termworkbase` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_assign`
--

LOCK TABLES `upload_assign` WRITE;
/*!40000 ALTER TABLE `upload_assign` DISABLE KEYS */;
INSERT INTO `upload_assign` VALUES (2,7,6,10),(3,7,2,10),(4,3,6,10),(5,8,5,10);
/*!40000 ALTER TABLE `upload_assign` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_attendance`
--

LOCK TABLES `upload_attendance` WRITE;
/*!40000 ALTER TABLE `upload_attendance` DISABLE KEYS */;
INSERT INTO `upload_attendance` VALUES (1,3,20),(2,7,5),(3,8,5),(4,9,5);
/*!40000 ALTER TABLE `upload_attendance` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_exp`
--

LOCK TABLES `upload_exp` WRITE;
/*!40000 ALTER TABLE `upload_exp` DISABLE KEYS */;
INSERT INTO `upload_exp` VALUES (1,3,3,34),(2,8,5,10);
/*!40000 ALTER TABLE `upload_exp` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_gd`
--

LOCK TABLES `upload_gd` WRITE;
/*!40000 ALTER TABLE `upload_gd` DISABLE KEYS */;
/*!40000 ALTER TABLE `upload_gd` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_gdynamic`
--

LOCK TABLES `upload_gdynamic` WRITE;
/*!40000 ALTER TABLE `upload_gdynamic` DISABLE KEYS */;
/*!40000 ALTER TABLE `upload_gdynamic` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_ia`
--

LOCK TABLES `upload_ia` WRITE;
/*!40000 ALTER TABLE `upload_ia` DISABLE KEYS */;
INSERT INTO `upload_ia` VALUES (6038,1,15,NULL),(6039,1,16,NULL),(6040,1,17,NULL),(6041,1,18,NULL),(6042,1,19,NULL),(6043,1,20,NULL),(6044,1,21,NULL),(6045,2,15,NULL),(6046,2,16,NULL),(6047,2,17,NULL),(6048,2,18,NULL),(6049,2,19,NULL),(6050,2,20,NULL),(6051,2,21,NULL),(6052,3,15,NULL),(6053,3,16,NULL),(6054,3,17,NULL),(6055,3,18,NULL),(6056,3,19,NULL),(6057,3,20,NULL),(6058,3,21,NULL),(6059,4,15,NULL),(6060,4,16,NULL),(6061,4,17,NULL),(6062,4,18,NULL),(6063,4,19,NULL),(6064,4,20,NULL),(6065,4,21,NULL),(6066,5,15,NULL),(6067,5,16,NULL),(6068,5,17,NULL),(6069,5,18,NULL),(6070,5,19,NULL),(6071,5,20,NULL),(6072,5,21,NULL),(6073,6,15,NULL),(6074,6,16,NULL),(6075,6,17,NULL),(6076,6,18,NULL),(6077,6,19,NULL),(6078,6,20,NULL),(6079,6,21,NULL),(6080,7,15,NULL),(6081,7,16,NULL),(6082,7,17,NULL),(6083,7,18,NULL),(6084,7,19,NULL),(6085,7,20,NULL),(6086,7,21,NULL),(6087,8,15,NULL),(6088,8,16,NULL),(6089,8,17,NULL),(6090,8,18,NULL),(6091,8,19,NULL),(6092,8,20,NULL),(6093,8,21,NULL),(6094,9,15,NULL),(6095,9,16,NULL),(6096,9,17,NULL),(6097,9,18,NULL),(6098,9,19,NULL),(6099,9,20,NULL),(6100,9,21,NULL),(6101,10,15,NULL),(6102,10,16,NULL),(6103,10,17,NULL),(6104,10,18,NULL),(6105,10,19,NULL),(6106,10,20,NULL),(6107,10,21,NULL),(6108,11,15,NULL),(6109,11,16,NULL),(6110,11,17,NULL),(6111,11,18,NULL),(6112,11,19,NULL),(6113,11,20,NULL),(6114,11,21,NULL),(6115,12,15,NULL),(6116,12,16,NULL),(6117,12,17,NULL),(6118,12,18,NULL),(6119,12,19,NULL),(6120,12,20,NULL),(6121,12,21,NULL),(6122,13,15,NULL),(6123,13,16,NULL),(6124,13,17,NULL),(6125,13,18,NULL),(6126,13,19,NULL),(6127,13,20,NULL),(6128,13,21,NULL),(6129,14,15,NULL),(6130,14,16,NULL),(6131,14,17,NULL),(6132,14,18,NULL),(6133,14,19,NULL),(6134,14,20,NULL),(6135,14,21,NULL),(6136,15,15,NULL),(6137,15,16,NULL),(6138,15,17,NULL),(6139,15,18,NULL),(6140,15,19,NULL),(6141,15,20,NULL),(6142,15,21,NULL),(6143,16,15,NULL),(6144,16,16,NULL),(6145,16,17,NULL),(6146,16,18,NULL),(6147,16,19,NULL),(6148,16,20,NULL),(6149,16,21,NULL),(6150,17,15,NULL),(6151,17,16,NULL),(6152,17,17,NULL),(6153,17,18,NULL),(6154,17,19,NULL),(6155,17,20,NULL),(6156,17,21,NULL),(6157,18,15,NULL),(6158,18,16,NULL),(6159,18,17,NULL),(6160,18,18,NULL),(6161,18,19,NULL),(6162,18,20,NULL),(6163,18,21,NULL),(6164,19,15,NULL),(6165,19,16,NULL),(6166,19,17,NULL),(6167,19,18,NULL),(6168,19,19,NULL),(6169,19,20,NULL),(6170,19,21,NULL),(6171,20,15,NULL),(6172,20,16,NULL),(6173,20,17,NULL),(6174,20,18,NULL),(6175,20,19,NULL),(6176,20,20,NULL),(6177,20,21,NULL),(6178,21,15,NULL),(6179,21,16,NULL),(6180,21,17,NULL),(6181,21,18,NULL),(6182,21,19,NULL),(6183,21,20,NULL),(6184,21,21,NULL),(6185,22,15,NULL),(6186,22,16,NULL),(6187,22,17,NULL),(6188,22,18,NULL),(6189,22,19,NULL),(6190,22,20,NULL),(6191,22,21,NULL),(6192,23,15,NULL),(6193,23,16,NULL),(6194,23,17,NULL),(6195,23,18,NULL),(6196,23,19,NULL),(6197,23,20,NULL),(6198,23,21,NULL),(6199,24,15,NULL),(6200,24,16,NULL),(6201,24,17,NULL),(6202,24,18,NULL),(6203,24,19,NULL),(6204,24,20,NULL),(6205,24,21,NULL),(6206,25,15,NULL),(6207,25,16,NULL),(6208,25,17,NULL),(6209,25,18,NULL),(6210,25,19,NULL),(6211,25,20,NULL),(6212,25,21,NULL),(6213,26,15,NULL),(6214,26,16,NULL),(6215,26,17,NULL),(6216,26,18,NULL),(6217,26,19,NULL),(6218,26,20,NULL),(6219,26,21,NULL),(6220,27,15,NULL),(6221,27,16,NULL),(6222,27,17,NULL),(6223,27,18,NULL),(6224,27,19,NULL),(6225,27,20,NULL),(6226,27,21,NULL),(6227,28,15,NULL),(6228,28,16,NULL),(6229,28,17,NULL),(6230,28,18,NULL),(6231,28,19,NULL),(6232,28,20,NULL),(6233,28,21,NULL),(6234,29,15,NULL),(6235,29,16,NULL),(6236,29,17,NULL),(6237,29,18,NULL),(6238,29,19,NULL),(6239,29,20,NULL),(6240,29,21,NULL),(6241,30,15,NULL),(6242,30,16,NULL),(6243,30,17,NULL),(6244,30,18,NULL),(6245,30,19,NULL),(6246,30,20,NULL),(6247,30,21,NULL),(6248,31,15,NULL),(6249,31,16,NULL),(6250,31,17,NULL),(6251,31,18,NULL),(6252,31,19,NULL),(6253,31,20,NULL),(6254,31,21,NULL),(6255,32,15,NULL),(6256,32,16,NULL),(6257,32,17,NULL),(6258,32,18,NULL),(6259,32,19,NULL),(6260,32,20,NULL),(6261,32,21,NULL),(6262,33,15,NULL),(6263,33,16,NULL),(6264,33,17,NULL),(6265,33,18,NULL),(6266,33,19,NULL),(6267,33,20,NULL),(6268,33,21,NULL),(6269,34,15,NULL),(6270,34,16,NULL),(6271,34,17,NULL),(6272,34,18,NULL),(6273,34,19,NULL),(6274,34,20,NULL),(6275,34,21,NULL),(6276,35,15,NULL),(6277,35,16,NULL),(6278,35,17,NULL),(6279,35,18,NULL),(6280,35,19,NULL),(6281,35,20,NULL),(6282,35,21,NULL),(6283,36,15,NULL),(6284,36,16,NULL),(6285,36,17,NULL),(6286,36,18,NULL),(6287,36,19,NULL),(6288,36,20,NULL),(6289,36,21,NULL),(6290,37,15,NULL),(6291,37,16,NULL),(6292,37,17,NULL),(6293,37,18,NULL),(6294,37,19,NULL),(6295,37,20,NULL),(6296,37,21,NULL),(6297,38,15,NULL),(6298,38,16,NULL),(6299,38,17,NULL),(6300,38,18,NULL),(6301,38,19,NULL),(6302,38,20,NULL),(6303,38,21,NULL),(6304,39,15,NULL),(6305,39,16,NULL),(6306,39,17,NULL),(6307,39,18,NULL),(6308,39,19,NULL),(6309,39,20,NULL),(6310,39,21,NULL),(6311,40,15,NULL),(6312,40,16,NULL),(6313,40,17,NULL),(6314,40,18,NULL),(6315,40,19,NULL),(6316,40,20,NULL),(6317,40,21,NULL),(6318,41,15,NULL),(6319,41,16,NULL),(6320,41,17,NULL),(6321,41,18,NULL),(6322,41,19,NULL),(6323,41,20,NULL),(6324,41,21,NULL),(6325,42,15,NULL),(6326,42,16,NULL),(6327,42,17,NULL),(6328,42,18,NULL),(6329,42,19,NULL),(6330,42,20,NULL),(6331,42,21,NULL),(6332,43,15,NULL),(6333,43,16,NULL),(6334,43,17,NULL),(6335,43,18,NULL),(6336,43,19,NULL),(6337,43,20,NULL),(6338,43,21,NULL),(6339,44,15,NULL),(6340,44,16,NULL),(6341,44,17,NULL),(6342,44,18,NULL),(6343,44,19,NULL),(6344,44,20,NULL),(6345,44,21,NULL),(6346,45,15,NULL),(6347,45,16,NULL),(6348,45,17,NULL),(6349,45,18,NULL),(6350,45,19,NULL),(6351,45,20,NULL),(6352,45,21,NULL),(6353,46,15,NULL),(6354,46,16,NULL),(6355,46,17,NULL),(6356,46,18,NULL),(6357,46,19,NULL),(6358,46,20,NULL),(6359,46,21,NULL),(6360,47,15,NULL),(6361,47,16,NULL),(6362,47,17,NULL),(6363,47,18,NULL),(6364,47,19,NULL),(6365,47,20,NULL),(6366,47,21,NULL),(6367,48,15,NULL),(6368,48,16,NULL),(6369,48,17,NULL),(6370,48,18,NULL),(6371,48,19,NULL),(6372,48,20,NULL),(6373,48,21,NULL),(6374,49,15,NULL),(6375,49,16,NULL),(6376,49,17,NULL),(6377,49,18,NULL),(6378,49,19,NULL),(6379,49,20,NULL),(6380,49,21,NULL),(6381,50,15,NULL),(6382,50,16,NULL),(6383,50,17,NULL),(6384,50,18,NULL),(6385,50,19,NULL),(6386,50,20,NULL),(6387,50,21,NULL),(6388,51,15,NULL),(6389,51,16,NULL),(6390,51,17,NULL),(6391,51,18,NULL),(6392,51,19,NULL),(6393,51,20,NULL),(6394,51,21,NULL),(6395,52,15,NULL),(6396,52,16,NULL),(6397,52,17,NULL),(6398,52,18,NULL),(6399,52,19,NULL),(6400,52,20,NULL),(6401,52,21,NULL),(6402,53,15,NULL),(6403,53,16,NULL),(6404,53,17,NULL),(6405,53,18,NULL),(6406,53,19,NULL),(6407,53,20,NULL),(6408,53,21,NULL),(6409,54,15,NULL),(6410,54,16,NULL),(6411,54,17,NULL),(6412,54,18,NULL),(6413,54,19,NULL),(6414,54,20,NULL),(6415,54,21,NULL),(6416,55,15,NULL),(6417,55,16,NULL),(6418,55,17,NULL),(6419,55,18,NULL),(6420,55,19,NULL),(6421,55,20,NULL),(6422,55,21,NULL),(6423,56,15,NULL),(6424,56,16,NULL),(6425,56,17,NULL),(6426,56,18,NULL),(6427,56,19,NULL),(6428,56,20,NULL),(6429,56,21,NULL),(6430,57,15,NULL),(6431,57,16,NULL),(6432,57,17,NULL),(6433,57,18,NULL),(6434,57,19,NULL),(6435,57,20,NULL),(6436,57,21,NULL),(6437,58,15,NULL),(6438,58,16,NULL),(6439,58,17,NULL),(6440,58,18,NULL),(6441,58,19,NULL),(6442,58,20,NULL),(6443,58,21,NULL),(6444,59,15,NULL),(6445,59,16,NULL),(6446,59,17,NULL),(6447,59,18,NULL),(6448,59,19,NULL),(6449,59,20,NULL),(6450,59,21,NULL),(6451,60,15,NULL),(6452,60,16,NULL),(6453,60,17,NULL),(6454,60,18,NULL),(6455,60,19,NULL),(6456,60,20,NULL),(6457,60,21,NULL),(6458,61,15,NULL),(6459,61,16,NULL),(6460,61,17,NULL),(6461,61,18,NULL),(6462,61,19,NULL),(6463,61,20,NULL),(6464,61,21,NULL),(6465,62,15,NULL),(6466,62,16,NULL),(6467,62,17,NULL),(6468,62,18,NULL),(6469,62,19,NULL),(6470,62,20,NULL),(6471,62,21,NULL),(6472,63,15,NULL),(6473,63,16,NULL),(6474,63,17,NULL),(6475,63,18,NULL),(6476,63,19,NULL),(6477,63,20,NULL),(6478,63,21,NULL),(6479,64,15,NULL),(6480,64,16,NULL),(6481,64,17,NULL),(6482,64,18,NULL),(6483,64,19,NULL),(6484,64,20,NULL),(6485,64,21,NULL),(6486,65,15,NULL),(6487,65,16,NULL),(6488,65,17,NULL),(6489,65,18,NULL),(6490,65,19,NULL),(6491,65,20,NULL),(6492,65,21,NULL),(6493,66,15,NULL),(6494,66,16,NULL),(6495,66,17,NULL),(6496,66,18,NULL),(6497,66,19,NULL),(6498,66,20,NULL),(6499,66,21,NULL),(6500,67,15,NULL),(6501,67,16,NULL),(6502,67,17,NULL),(6503,67,18,NULL),(6504,67,19,NULL),(6505,67,20,NULL),(6506,67,21,NULL),(6507,68,15,NULL),(6508,68,16,NULL),(6509,68,17,NULL),(6510,68,18,NULL),(6511,68,19,NULL),(6512,68,20,NULL),(6513,68,21,NULL),(6514,69,15,NULL),(6515,69,16,NULL),(6516,69,17,NULL),(6517,69,18,NULL),(6518,69,19,NULL),(6519,69,20,NULL),(6520,69,21,NULL),(6521,70,15,NULL),(6522,70,16,NULL),(6523,70,17,NULL),(6524,70,18,NULL),(6525,70,19,NULL),(6526,70,20,NULL),(6527,70,21,NULL),(6528,71,15,NULL),(6529,71,16,NULL),(6530,71,17,NULL),(6531,71,18,NULL),(6532,71,19,NULL),(6533,71,20,NULL),(6534,71,21,NULL),(6535,72,15,NULL),(6536,72,16,NULL),(6537,72,17,NULL),(6538,72,18,NULL),(6539,72,19,NULL),(6540,72,20,NULL),(6541,72,21,NULL),(6542,73,15,NULL),(6543,73,16,NULL),(6544,73,17,NULL),(6545,73,18,NULL),(6546,73,19,NULL),(6547,73,20,NULL),(6548,73,21,NULL),(6549,74,15,NULL),(6550,74,16,NULL),(6551,74,17,NULL),(6552,74,18,NULL),(6553,74,19,NULL),(6554,74,20,NULL),(6555,74,21,NULL),(6556,75,15,NULL),(6557,75,16,NULL),(6558,75,17,NULL),(6559,75,18,NULL),(6560,75,19,NULL),(6561,75,20,NULL),(6562,75,21,NULL),(6563,76,15,NULL),(6564,76,16,NULL),(6565,76,17,NULL),(6566,76,18,NULL),(6567,76,19,NULL),(6568,76,20,NULL),(6569,76,21,NULL),(6570,77,15,NULL),(6571,77,16,NULL),(6572,77,17,NULL),(6573,77,18,NULL),(6574,77,19,NULL),(6575,77,20,NULL),(6576,77,21,NULL),(6577,78,15,NULL),(6578,78,16,NULL),(6579,78,17,NULL),(6580,78,18,NULL),(6581,78,19,NULL),(6582,78,20,NULL),(6583,78,21,NULL),(6584,79,15,NULL),(6585,79,16,NULL),(6586,79,17,NULL),(6587,79,18,NULL),(6588,79,19,NULL),(6589,79,20,NULL),(6590,79,21,NULL),(6591,80,15,NULL),(6592,80,16,NULL),(6593,80,17,NULL),(6594,80,18,NULL),(6595,80,19,NULL),(6596,80,20,NULL),(6597,80,21,NULL),(6598,81,15,NULL),(6599,81,16,NULL),(6600,81,17,NULL),(6601,81,18,NULL),(6602,81,19,NULL),(6603,81,20,NULL),(6604,81,21,NULL),(6605,82,15,NULL),(6606,82,16,NULL),(6607,82,17,NULL),(6608,82,18,NULL),(6609,82,19,NULL),(6610,82,20,NULL),(6611,82,21,NULL),(6612,83,15,NULL),(6613,83,16,NULL),(6614,83,17,NULL),(6615,83,18,NULL),(6616,83,19,NULL),(6617,83,20,NULL),(6618,83,21,NULL),(6619,84,15,NULL),(6620,84,16,NULL),(6621,84,17,NULL),(6622,84,18,NULL),(6623,84,19,NULL),(6624,84,20,NULL),(6625,84,21,NULL),(6626,85,15,NULL),(6627,85,16,NULL),(6628,85,17,NULL),(6629,85,18,NULL),(6630,85,19,NULL),(6631,85,20,NULL),(6632,85,21,NULL),(6633,86,15,NULL),(6634,86,16,NULL),(6635,86,17,NULL),(6636,86,18,NULL),(6637,86,19,NULL),(6638,86,20,NULL),(6639,86,21,NULL),(6640,87,15,NULL),(6641,87,16,NULL),(6642,87,17,NULL),(6643,87,18,NULL),(6644,87,19,NULL),(6645,87,20,NULL),(6646,87,21,NULL),(6647,88,15,NULL),(6648,88,16,NULL),(6649,88,17,NULL),(6650,88,18,NULL),(6651,88,19,NULL),(6652,88,20,NULL),(6653,88,21,NULL),(6654,89,15,NULL),(6655,89,16,NULL),(6656,89,17,NULL),(6657,89,18,NULL),(6658,89,19,NULL),(6659,89,20,NULL),(6660,89,21,NULL),(6661,90,15,NULL),(6662,90,16,NULL),(6663,90,17,NULL),(6664,90,18,NULL),(6665,90,19,NULL),(6666,90,20,NULL),(6667,90,21,NULL),(6668,91,15,NULL),(6669,91,16,NULL),(6670,91,17,NULL),(6671,91,18,NULL),(6672,91,19,NULL),(6673,91,20,NULL),(6674,91,21,NULL),(6675,92,15,NULL),(6676,92,16,NULL),(6677,92,17,NULL),(6678,92,18,NULL),(6679,92,19,NULL),(6680,92,20,NULL),(6681,92,21,NULL),(6682,93,15,NULL),(6683,93,16,NULL),(6684,93,17,NULL),(6685,93,18,NULL),(6686,93,19,NULL),(6687,93,20,NULL),(6688,93,21,NULL),(6689,94,15,NULL),(6690,94,16,NULL),(6691,94,17,NULL),(6692,94,18,NULL),(6693,94,19,NULL),(6694,94,20,NULL),(6695,94,21,NULL),(6696,95,15,NULL),(6697,95,16,NULL),(6698,95,17,NULL),(6699,95,18,NULL),(6700,95,19,NULL),(6701,95,20,NULL),(6702,95,21,NULL),(6703,96,15,NULL),(6704,96,16,NULL),(6705,96,17,NULL),(6706,96,18,NULL),(6707,96,19,NULL),(6708,96,20,NULL),(6709,96,21,NULL),(6710,97,15,NULL),(6711,97,16,NULL),(6712,97,17,NULL),(6713,97,18,NULL),(6714,97,19,NULL),(6715,97,20,NULL),(6716,97,21,NULL),(6717,98,15,NULL),(6718,98,16,NULL),(6719,98,17,NULL),(6720,98,18,NULL),(6721,98,19,NULL),(6722,98,20,NULL),(6723,98,21,NULL),(6724,99,15,NULL),(6725,99,16,NULL),(6726,99,17,NULL),(6727,99,18,NULL),(6728,99,19,NULL),(6729,99,20,NULL),(6730,99,21,NULL),(6731,100,15,NULL),(6732,100,16,NULL),(6733,100,17,NULL),(6734,100,18,NULL),(6735,100,19,NULL),(6736,100,20,NULL),(6737,100,21,NULL),(6738,101,15,NULL),(6739,101,16,NULL),(6740,101,17,NULL),(6741,101,18,NULL),(6742,101,19,NULL),(6743,101,20,NULL),(6744,101,21,NULL),(6745,102,15,NULL),(6746,102,16,NULL),(6747,102,17,NULL),(6748,102,18,NULL),(6749,102,19,NULL),(6750,102,20,NULL),(6751,102,21,NULL),(6752,103,15,NULL),(6753,103,16,NULL),(6754,103,17,NULL),(6755,103,18,NULL),(6756,103,19,NULL),(6757,103,20,NULL),(6758,103,21,NULL),(6759,104,15,NULL),(6760,104,16,NULL),(6761,104,17,NULL),(6762,104,18,NULL),(6763,104,19,NULL),(6764,104,20,NULL),(6765,104,21,NULL),(6766,105,15,NULL),(6767,105,16,NULL),(6768,105,17,NULL),(6769,105,18,NULL),(6770,105,19,NULL),(6771,105,20,NULL),(6772,105,21,NULL),(6773,106,15,NULL),(6774,106,16,NULL),(6775,106,17,NULL),(6776,106,18,NULL),(6777,106,19,NULL),(6778,106,20,NULL),(6779,106,21,NULL),(6780,107,15,NULL),(6781,107,16,NULL),(6782,107,17,NULL),(6783,107,18,NULL),(6784,107,19,NULL),(6785,107,20,NULL),(6786,107,21,NULL),(6787,108,15,NULL),(6788,108,16,NULL),(6789,108,17,NULL),(6790,108,18,NULL),(6791,108,19,NULL),(6792,108,20,NULL),(6793,108,21,NULL),(6794,109,15,NULL),(6795,109,16,NULL),(6796,109,17,NULL),(6797,109,18,NULL),(6798,109,19,NULL),(6799,109,20,NULL),(6800,109,21,NULL),(6801,110,15,NULL),(6802,110,16,NULL),(6803,110,17,NULL),(6804,110,18,NULL),(6805,110,19,NULL),(6806,110,20,NULL),(6807,110,21,NULL),(6808,111,15,NULL),(6809,111,16,NULL),(6810,111,17,NULL),(6811,111,18,NULL),(6812,111,19,NULL),(6813,111,20,NULL),(6814,111,21,NULL),(6815,112,15,NULL),(6816,112,16,NULL),(6817,112,17,NULL),(6818,112,18,NULL),(6819,112,19,NULL),(6820,112,20,NULL),(6821,112,21,NULL),(6822,113,15,NULL),(6823,113,16,NULL),(6824,113,17,NULL),(6825,113,18,NULL),(6826,113,19,NULL),(6827,113,20,NULL),(6828,113,21,NULL),(6829,114,15,NULL),(6830,114,16,NULL),(6831,114,17,NULL),(6832,114,18,NULL),(6833,114,19,NULL),(6834,114,20,NULL),(6835,114,21,NULL),(6836,115,15,NULL),(6837,115,16,NULL),(6838,115,17,NULL),(6839,115,18,NULL),(6840,115,19,NULL),(6841,115,20,NULL),(6842,115,21,NULL),(6843,116,15,NULL),(6844,116,16,NULL),(6845,116,17,NULL),(6846,116,18,NULL),(6847,116,19,NULL),(6848,116,20,NULL),(6849,116,21,NULL),(6850,117,15,NULL),(6851,117,16,NULL),(6852,117,17,NULL),(6853,117,18,NULL),(6854,117,19,NULL),(6855,117,20,NULL),(6856,117,21,NULL),(6857,118,15,NULL),(6858,118,16,NULL),(6859,118,17,NULL),(6860,118,18,NULL),(6861,118,19,NULL),(6862,118,20,NULL),(6863,118,21,NULL),(6864,119,15,NULL),(6865,119,16,NULL),(6866,119,17,NULL),(6867,119,18,NULL),(6868,119,19,NULL),(6869,119,20,NULL),(6870,119,21,NULL),(6871,120,15,NULL),(6872,120,16,NULL),(6873,120,17,NULL),(6874,120,18,NULL),(6875,120,19,NULL),(6876,120,20,NULL),(6877,120,21,NULL),(6878,121,15,NULL),(6879,121,16,NULL),(6880,121,17,NULL),(6881,121,18,NULL),(6882,121,19,NULL),(6883,121,20,NULL),(6884,121,21,NULL),(6885,122,15,NULL),(6886,122,16,NULL),(6887,122,17,NULL),(6888,122,18,NULL),(6889,122,19,NULL),(6890,122,20,NULL),(6891,122,21,NULL),(6892,123,15,NULL),(6893,123,16,NULL),(6894,123,17,NULL),(6895,123,18,NULL),(6896,123,19,NULL),(6897,123,20,NULL),(6898,123,21,NULL),(6899,124,15,NULL),(6900,124,16,NULL),(6901,124,17,NULL),(6902,124,18,NULL),(6903,124,19,NULL),(6904,124,20,NULL),(6905,124,21,NULL),(6906,125,15,NULL),(6907,125,16,NULL),(6908,125,17,NULL),(6909,125,18,NULL),(6910,125,19,NULL),(6911,125,20,NULL),(6912,125,21,NULL),(6913,126,15,NULL),(6914,126,16,NULL),(6915,126,17,NULL),(6916,126,18,NULL),(6917,126,19,NULL),(6918,126,20,NULL),(6919,126,21,NULL),(6920,127,15,NULL),(6921,127,16,NULL),(6922,127,17,NULL),(6923,127,18,NULL),(6924,127,19,NULL),(6925,127,20,NULL),(6926,127,21,NULL),(6927,128,15,NULL),(6928,128,16,NULL),(6929,128,17,NULL),(6930,128,18,NULL),(6931,128,19,NULL),(6932,128,20,NULL),(6933,128,21,NULL),(6934,129,15,NULL),(6935,129,16,NULL),(6936,129,17,NULL),(6937,129,18,NULL),(6938,129,19,NULL),(6939,129,20,NULL),(6940,129,21,NULL),(6941,130,15,NULL),(6942,130,16,NULL),(6943,130,17,NULL),(6944,130,18,NULL),(6945,130,19,NULL),(6946,130,20,NULL),(6947,130,21,NULL),(6948,131,15,NULL),(6949,131,16,NULL),(6950,131,17,NULL),(6951,131,18,NULL),(6952,131,19,NULL),(6953,131,20,NULL),(6954,131,21,NULL),(6955,132,15,NULL),(6956,132,16,NULL),(6957,132,17,NULL),(6958,132,18,NULL),(6959,132,19,NULL),(6960,132,20,NULL),(6961,132,21,NULL),(6962,133,15,NULL),(6963,133,16,NULL),(6964,133,17,NULL),(6965,133,18,NULL),(6966,133,19,NULL),(6967,133,20,NULL),(6968,133,21,NULL),(6969,134,15,NULL),(6970,134,16,NULL),(6971,134,17,NULL),(6972,134,18,NULL),(6973,134,19,NULL),(6974,134,20,NULL),(6975,134,21,NULL),(6976,135,15,NULL),(6977,135,16,NULL),(6978,135,17,NULL),(6979,135,18,NULL),(6980,135,19,NULL),(6981,135,20,NULL),(6982,135,21,NULL),(6983,136,15,NULL),(6984,136,16,NULL),(6985,136,17,NULL),(6986,136,18,NULL),(6987,136,19,NULL),(6988,136,20,NULL),(6989,136,21,NULL),(6990,137,15,NULL),(6991,137,16,NULL),(6992,137,17,NULL),(6993,137,18,NULL),(6994,137,19,NULL),(6995,137,20,NULL),(6996,137,21,NULL),(6997,138,15,NULL),(6998,138,16,NULL),(6999,138,17,NULL),(7000,138,18,NULL),(7001,138,19,NULL),(7002,138,20,NULL),(7003,138,21,NULL),(7004,139,15,NULL),(7005,139,16,NULL),(7006,139,17,NULL),(7007,139,18,NULL),(7008,139,19,NULL),(7009,139,20,NULL),(7010,139,21,NULL),(7011,140,15,NULL),(7012,140,16,NULL),(7013,140,17,NULL),(7014,140,18,NULL),(7015,140,19,NULL),(7016,140,20,NULL),(7017,140,21,NULL),(7018,141,15,NULL),(7019,141,16,NULL),(7020,141,17,NULL),(7021,141,18,NULL),(7022,141,19,NULL),(7023,141,20,NULL),(7024,141,21,NULL),(7025,142,15,NULL),(7026,142,16,NULL),(7027,142,17,NULL),(7028,142,18,NULL),(7029,142,19,NULL),(7030,142,20,NULL),(7031,142,21,NULL),(7032,143,15,NULL),(7033,143,16,NULL),(7034,143,17,NULL),(7035,143,18,NULL),(7036,143,19,NULL),(7037,143,20,NULL),(7038,143,21,NULL),(7039,144,15,NULL),(7040,144,16,NULL),(7041,144,17,NULL),(7042,144,18,NULL),(7043,144,19,NULL),(7044,144,20,NULL),(7045,144,21,NULL),(7046,145,15,NULL),(7047,145,16,NULL),(7048,145,17,NULL),(7049,145,18,NULL),(7050,145,19,NULL),(7051,145,20,NULL),(7052,145,21,NULL),(7053,146,15,NULL),(7054,146,16,NULL),(7055,146,17,NULL),(7056,146,18,NULL),(7057,146,19,NULL),(7058,146,20,NULL),(7059,146,21,NULL),(7060,147,15,NULL),(7061,147,16,NULL),(7062,147,17,NULL),(7063,147,18,NULL),(7064,147,19,NULL),(7065,147,20,NULL),(7066,147,21,NULL),(7067,148,15,NULL),(7068,148,16,NULL),(7069,148,17,NULL),(7070,148,18,NULL),(7071,148,19,NULL),(7072,148,20,NULL),(7073,148,21,NULL),(7074,149,15,NULL),(7075,149,16,NULL),(7076,149,17,NULL),(7077,149,18,NULL),(7078,149,19,NULL),(7079,149,20,NULL),(7080,149,21,NULL),(7081,150,15,NULL),(7082,150,16,NULL),(7083,150,17,NULL),(7084,150,18,NULL),(7085,150,19,NULL),(7086,150,20,NULL),(7087,150,21,NULL),(7088,151,15,NULL),(7089,151,16,NULL),(7090,151,17,NULL),(7091,151,18,NULL),(7092,151,19,NULL),(7093,151,20,NULL),(7094,151,21,NULL),(7095,152,15,NULL),(7096,152,16,NULL),(7097,152,17,NULL),(7098,152,18,NULL),(7099,152,19,NULL),(7100,152,20,NULL),(7101,152,21,NULL),(7102,153,15,NULL),(7103,153,16,NULL),(7104,153,17,NULL),(7105,153,18,NULL),(7106,153,19,NULL),(7107,153,20,NULL),(7108,153,21,NULL),(9251,1,29,1),(9252,1,30,1),(9253,1,31,1),(9254,1,32,4),(9255,1,33,3),(9256,1,34,3),(9257,1,35,5),(9258,2,29,2),(9259,2,30,2),(9260,2,31,1),(9261,2,32,1),(9262,2,33,3),(9263,2,34,2),(9264,2,35,3),(9265,3,29,NULL),(9266,3,30,NULL),(9267,3,31,NULL),(9268,3,32,NULL),(9269,3,33,NULL),(9270,3,34,NULL),(9271,3,35,NULL),(9272,4,29,NULL),(9273,4,30,NULL),(9274,4,31,NULL),(9275,4,32,NULL),(9276,4,33,NULL),(9277,4,34,NULL),(9278,4,35,NULL),(9279,5,29,NULL),(9280,5,30,NULL),(9281,5,31,NULL),(9282,5,32,NULL),(9283,5,33,NULL),(9284,5,34,NULL),(9285,5,35,NULL),(9286,6,29,NULL),(9287,6,30,NULL),(9288,6,31,NULL),(9289,6,32,NULL),(9290,6,33,NULL),(9291,6,34,NULL),(9292,6,35,NULL),(9293,7,29,NULL),(9294,7,30,NULL),(9295,7,31,NULL),(9296,7,32,NULL),(9297,7,33,NULL),(9298,7,34,NULL),(9299,7,35,NULL),(9300,8,29,NULL),(9301,8,30,NULL),(9302,8,31,NULL),(9303,8,32,NULL),(9304,8,33,NULL),(9305,8,34,NULL),(9306,8,35,NULL),(9307,9,29,NULL),(9308,9,30,NULL),(9309,9,31,NULL),(9310,9,32,NULL),(9311,9,33,NULL),(9312,9,34,NULL),(9313,9,35,NULL),(9314,10,29,NULL),(9315,10,30,NULL),(9316,10,31,NULL),(9317,10,32,NULL),(9318,10,33,NULL),(9319,10,34,NULL),(9320,10,35,NULL),(9321,11,29,NULL),(9322,11,30,NULL),(9323,11,31,NULL),(9324,11,32,NULL),(9325,11,33,NULL),(9326,11,34,NULL),(9327,11,35,NULL),(9328,12,29,NULL),(9329,12,30,NULL),(9330,12,31,NULL),(9331,12,32,NULL),(9332,12,33,NULL),(9333,12,34,NULL),(9334,12,35,NULL),(9335,13,29,NULL),(9336,13,30,NULL),(9337,13,31,NULL),(9338,13,32,NULL),(9339,13,33,NULL),(9340,13,34,NULL),(9341,13,35,NULL),(9342,14,29,NULL),(9343,14,30,NULL),(9344,14,31,NULL),(9345,14,32,NULL),(9346,14,33,NULL),(9347,14,34,NULL),(9348,14,35,NULL),(9349,15,29,NULL),(9350,15,30,NULL),(9351,15,31,NULL),(9352,15,32,NULL),(9353,15,33,NULL),(9354,15,34,NULL),(9355,15,35,NULL),(9356,16,29,NULL),(9357,16,30,NULL),(9358,16,31,NULL),(9359,16,32,NULL),(9360,16,33,NULL),(9361,16,34,NULL),(9362,16,35,NULL),(9363,17,29,NULL),(9364,17,30,NULL),(9365,17,31,NULL),(9366,17,32,NULL),(9367,17,33,NULL),(9368,17,34,NULL),(9369,17,35,NULL),(9370,18,29,NULL),(9371,18,30,NULL),(9372,18,31,NULL),(9373,18,32,NULL),(9374,18,33,NULL),(9375,18,34,NULL),(9376,18,35,NULL),(9377,19,29,NULL),(9378,19,30,NULL),(9379,19,31,NULL),(9380,19,32,NULL),(9381,19,33,NULL),(9382,19,34,NULL),(9383,19,35,NULL),(9384,20,29,NULL),(9385,20,30,NULL),(9386,20,31,NULL),(9387,20,32,NULL),(9388,20,33,NULL),(9389,20,34,NULL),(9390,20,35,NULL),(9391,21,29,NULL),(9392,21,30,NULL),(9393,21,31,NULL),(9394,21,32,NULL),(9395,21,33,NULL),(9396,21,34,NULL),(9397,21,35,NULL),(9398,22,29,NULL),(9399,22,30,NULL),(9400,22,31,NULL),(9401,22,32,NULL),(9402,22,33,NULL),(9403,22,34,NULL),(9404,22,35,NULL),(9405,23,29,NULL),(9406,23,30,NULL),(9407,23,31,NULL),(9408,23,32,NULL),(9409,23,33,NULL),(9410,23,34,NULL),(9411,23,35,NULL),(9412,24,29,NULL),(9413,24,30,NULL),(9414,24,31,NULL),(9415,24,32,NULL),(9416,24,33,NULL),(9417,24,34,NULL),(9418,24,35,NULL),(9419,25,29,NULL),(9420,25,30,NULL),(9421,25,31,NULL),(9422,25,32,NULL),(9423,25,33,NULL),(9424,25,34,NULL),(9425,25,35,NULL),(9426,26,29,NULL),(9427,26,30,NULL),(9428,26,31,NULL),(9429,26,32,NULL),(9430,26,33,NULL),(9431,26,34,NULL),(9432,26,35,NULL),(9433,27,29,NULL),(9434,27,30,NULL),(9435,27,31,NULL),(9436,27,32,NULL),(9437,27,33,NULL),(9438,27,34,NULL),(9439,27,35,NULL),(9440,28,29,NULL),(9441,28,30,NULL),(9442,28,31,NULL),(9443,28,32,NULL),(9444,28,33,NULL),(9445,28,34,NULL),(9446,28,35,NULL),(9447,29,29,NULL),(9448,29,30,NULL),(9449,29,31,NULL),(9450,29,32,NULL),(9451,29,33,NULL),(9452,29,34,NULL),(9453,29,35,NULL),(9454,30,29,NULL),(9455,30,30,NULL),(9456,30,31,NULL),(9457,30,32,NULL),(9458,30,33,NULL),(9459,30,34,NULL),(9460,30,35,NULL),(9461,31,29,NULL),(9462,31,30,NULL),(9463,31,31,NULL),(9464,31,32,NULL),(9465,31,33,NULL),(9466,31,34,NULL),(9467,31,35,NULL),(9468,32,29,NULL),(9469,32,30,NULL),(9470,32,31,NULL),(9471,32,32,NULL),(9472,32,33,NULL),(9473,32,34,NULL),(9474,32,35,NULL),(9475,33,29,NULL),(9476,33,30,NULL),(9477,33,31,NULL),(9478,33,32,NULL),(9479,33,33,NULL),(9480,33,34,NULL),(9481,33,35,NULL),(9482,34,29,NULL),(9483,34,30,NULL),(9484,34,31,NULL),(9485,34,32,NULL),(9486,34,33,NULL),(9487,34,34,NULL),(9488,34,35,NULL),(9489,35,29,NULL),(9490,35,30,NULL),(9491,35,31,NULL),(9492,35,32,NULL),(9493,35,33,NULL),(9494,35,34,NULL),(9495,35,35,NULL),(9496,36,29,NULL),(9497,36,30,NULL),(9498,36,31,NULL),(9499,36,32,NULL),(9500,36,33,NULL),(9501,36,34,NULL),(9502,36,35,NULL),(9503,37,29,NULL),(9504,37,30,NULL),(9505,37,31,NULL),(9506,37,32,NULL),(9507,37,33,NULL),(9508,37,34,NULL),(9509,37,35,NULL),(9510,38,29,NULL),(9511,38,30,NULL),(9512,38,31,NULL),(9513,38,32,NULL),(9514,38,33,NULL),(9515,38,34,NULL),(9516,38,35,NULL),(9517,39,29,NULL),(9518,39,30,NULL),(9519,39,31,NULL),(9520,39,32,NULL),(9521,39,33,NULL),(9522,39,34,NULL),(9523,39,35,NULL),(9524,40,29,NULL),(9525,40,30,NULL),(9526,40,31,NULL),(9527,40,32,NULL),(9528,40,33,NULL),(9529,40,34,NULL),(9530,40,35,NULL),(9531,41,29,NULL),(9532,41,30,NULL),(9533,41,31,NULL),(9534,41,32,NULL),(9535,41,33,NULL),(9536,41,34,NULL),(9537,41,35,NULL),(9538,42,29,NULL),(9539,42,30,NULL),(9540,42,31,NULL),(9541,42,32,NULL),(9542,42,33,NULL),(9543,42,34,NULL),(9544,42,35,NULL),(9545,43,29,NULL),(9546,43,30,NULL),(9547,43,31,NULL),(9548,43,32,NULL),(9549,43,33,NULL),(9550,43,34,NULL),(9551,43,35,NULL),(9552,44,29,NULL),(9553,44,30,NULL),(9554,44,31,NULL),(9555,44,32,NULL),(9556,44,33,NULL),(9557,44,34,NULL),(9558,44,35,NULL),(9559,45,29,NULL),(9560,45,30,NULL),(9561,45,31,NULL),(9562,45,32,NULL),(9563,45,33,NULL),(9564,45,34,NULL),(9565,45,35,NULL),(9566,46,29,NULL),(9567,46,30,NULL),(9568,46,31,NULL),(9569,46,32,NULL),(9570,46,33,NULL),(9571,46,34,NULL),(9572,46,35,NULL),(9573,47,29,NULL),(9574,47,30,NULL),(9575,47,31,NULL),(9576,47,32,NULL),(9577,47,33,NULL),(9578,47,34,NULL),(9579,47,35,NULL),(9580,48,29,NULL),(9581,48,30,NULL),(9582,48,31,NULL),(9583,48,32,NULL),(9584,48,33,NULL),(9585,48,34,NULL),(9586,48,35,NULL),(9587,49,29,NULL),(9588,49,30,NULL),(9589,49,31,NULL),(9590,49,32,NULL),(9591,49,33,NULL),(9592,49,34,NULL),(9593,49,35,NULL),(9594,50,29,NULL),(9595,50,30,NULL),(9596,50,31,NULL),(9597,50,32,NULL),(9598,50,33,NULL),(9599,50,34,NULL),(9600,50,35,NULL),(9601,51,29,NULL),(9602,51,30,NULL),(9603,51,31,NULL),(9604,51,32,NULL),(9605,51,33,NULL),(9606,51,34,NULL),(9607,51,35,NULL),(9608,52,29,NULL),(9609,52,30,NULL),(9610,52,31,NULL),(9611,52,32,NULL),(9612,52,33,NULL),(9613,52,34,NULL),(9614,52,35,NULL),(9615,53,29,NULL),(9616,53,30,NULL),(9617,53,31,NULL),(9618,53,32,NULL),(9619,53,33,NULL),(9620,53,34,NULL),(9621,53,35,NULL),(9622,54,29,NULL),(9623,54,30,NULL),(9624,54,31,NULL),(9625,54,32,NULL),(9626,54,33,NULL),(9627,54,34,NULL),(9628,54,35,NULL),(9629,55,29,NULL),(9630,55,30,NULL),(9631,55,31,NULL),(9632,55,32,NULL),(9633,55,33,NULL),(9634,55,34,NULL),(9635,55,35,NULL),(9636,56,29,NULL),(9637,56,30,NULL),(9638,56,31,NULL),(9639,56,32,NULL),(9640,56,33,NULL),(9641,56,34,NULL),(9642,56,35,NULL),(9643,57,29,NULL),(9644,57,30,NULL),(9645,57,31,NULL),(9646,57,32,NULL),(9647,57,33,NULL),(9648,57,34,NULL),(9649,57,35,NULL),(9650,58,29,NULL),(9651,58,30,NULL),(9652,58,31,NULL),(9653,58,32,NULL),(9654,58,33,NULL),(9655,58,34,NULL),(9656,58,35,NULL),(9657,59,29,NULL),(9658,59,30,NULL),(9659,59,31,NULL),(9660,59,32,NULL),(9661,59,33,NULL),(9662,59,34,NULL),(9663,59,35,NULL),(9664,60,29,NULL),(9665,60,30,NULL),(9666,60,31,NULL),(9667,60,32,NULL),(9668,60,33,NULL),(9669,60,34,NULL),(9670,60,35,NULL),(9671,61,29,NULL),(9672,61,30,NULL),(9673,61,31,NULL),(9674,61,32,NULL),(9675,61,33,NULL),(9676,61,34,NULL),(9677,61,35,NULL),(9678,62,29,NULL),(9679,62,30,NULL),(9680,62,31,NULL),(9681,62,32,NULL),(9682,62,33,NULL),(9683,62,34,NULL),(9684,62,35,NULL),(9685,63,29,NULL),(9686,63,30,NULL),(9687,63,31,NULL),(9688,63,32,NULL),(9689,63,33,NULL),(9690,63,34,NULL),(9691,63,35,NULL),(9692,64,29,NULL),(9693,64,30,NULL),(9694,64,31,NULL),(9695,64,32,NULL),(9696,64,33,NULL),(9697,64,34,NULL),(9698,64,35,NULL),(9699,65,29,NULL),(9700,65,30,NULL),(9701,65,31,NULL),(9702,65,32,NULL),(9703,65,33,NULL),(9704,65,34,NULL),(9705,65,35,NULL),(9706,66,29,NULL),(9707,66,30,NULL),(9708,66,31,NULL),(9709,66,32,NULL),(9710,66,33,NULL),(9711,66,34,NULL),(9712,66,35,NULL),(9713,67,29,NULL),(9714,67,30,NULL),(9715,67,31,NULL),(9716,67,32,NULL),(9717,67,33,NULL),(9718,67,34,NULL),(9719,67,35,NULL),(9720,68,29,NULL),(9721,68,30,NULL),(9722,68,31,NULL),(9723,68,32,NULL),(9724,68,33,NULL),(9725,68,34,NULL),(9726,68,35,NULL),(9727,69,29,NULL),(9728,69,30,NULL),(9729,69,31,NULL),(9730,69,32,NULL),(9731,69,33,NULL),(9732,69,34,NULL),(9733,69,35,NULL),(9734,70,29,NULL),(9735,70,30,NULL),(9736,70,31,NULL),(9737,70,32,NULL),(9738,70,33,NULL),(9739,70,34,NULL),(9740,70,35,NULL),(9741,71,29,NULL),(9742,71,30,NULL),(9743,71,31,NULL),(9744,71,32,NULL),(9745,71,33,NULL),(9746,71,34,NULL),(9747,71,35,NULL),(9748,72,29,NULL),(9749,72,30,NULL),(9750,72,31,NULL),(9751,72,32,NULL),(9752,72,33,NULL),(9753,72,34,NULL),(9754,72,35,NULL),(9755,73,29,NULL),(9756,73,30,NULL),(9757,73,31,NULL),(9758,73,32,NULL),(9759,73,33,NULL),(9760,73,34,NULL),(9761,73,35,NULL),(9762,74,29,NULL),(9763,74,30,NULL),(9764,74,31,NULL),(9765,74,32,NULL),(9766,74,33,NULL),(9767,74,34,NULL),(9768,74,35,NULL),(9769,75,29,NULL),(9770,75,30,NULL),(9771,75,31,NULL),(9772,75,32,NULL),(9773,75,33,NULL),(9774,75,34,NULL),(9775,75,35,NULL),(9776,76,29,NULL),(9777,76,30,NULL),(9778,76,31,NULL),(9779,76,32,NULL),(9780,76,33,NULL),(9781,76,34,NULL),(9782,76,35,NULL),(9783,77,29,NULL),(9784,77,30,NULL),(9785,77,31,NULL),(9786,77,32,NULL),(9787,77,33,NULL),(9788,77,34,NULL),(9789,77,35,NULL),(9790,78,29,NULL),(9791,78,30,NULL),(9792,78,31,NULL),(9793,78,32,NULL),(9794,78,33,NULL),(9795,78,34,NULL),(9796,78,35,NULL),(9797,79,29,NULL),(9798,79,30,NULL),(9799,79,31,NULL),(9800,79,32,NULL),(9801,79,33,NULL),(9802,79,34,NULL),(9803,79,35,NULL),(9804,80,29,NULL),(9805,80,30,NULL),(9806,80,31,NULL),(9807,80,32,NULL),(9808,80,33,NULL),(9809,80,34,NULL),(9810,80,35,NULL),(9811,81,29,NULL),(9812,81,30,NULL),(9813,81,31,NULL),(9814,81,32,NULL),(9815,81,33,NULL),(9816,81,34,NULL),(9817,81,35,NULL),(9818,82,29,NULL),(9819,82,30,NULL),(9820,82,31,NULL),(9821,82,32,NULL),(9822,82,33,NULL),(9823,82,34,NULL),(9824,82,35,NULL),(9825,83,29,NULL),(9826,83,30,NULL),(9827,83,31,NULL),(9828,83,32,NULL),(9829,83,33,NULL),(9830,83,34,NULL),(9831,83,35,NULL),(9832,84,29,NULL),(9833,84,30,NULL),(9834,84,31,NULL),(9835,84,32,NULL),(9836,84,33,NULL),(9837,84,34,NULL),(9838,84,35,NULL),(9839,85,29,NULL),(9840,85,30,NULL),(9841,85,31,NULL),(9842,85,32,NULL),(9843,85,33,NULL),(9844,85,34,NULL),(9845,85,35,NULL),(9846,86,29,NULL),(9847,86,30,NULL),(9848,86,31,NULL),(9849,86,32,NULL),(9850,86,33,NULL),(9851,86,34,NULL),(9852,86,35,NULL),(9853,87,29,NULL),(9854,87,30,NULL),(9855,87,31,NULL),(9856,87,32,NULL),(9857,87,33,NULL),(9858,87,34,NULL),(9859,87,35,NULL),(9860,88,29,NULL),(9861,88,30,NULL),(9862,88,31,NULL),(9863,88,32,NULL),(9864,88,33,NULL),(9865,88,34,NULL),(9866,88,35,NULL),(9867,89,29,NULL),(9868,89,30,NULL),(9869,89,31,NULL),(9870,89,32,NULL),(9871,89,33,NULL),(9872,89,34,NULL),(9873,89,35,NULL),(9874,90,29,NULL),(9875,90,30,NULL),(9876,90,31,NULL),(9877,90,32,NULL),(9878,90,33,NULL),(9879,90,34,NULL),(9880,90,35,NULL),(9881,91,29,NULL),(9882,91,30,NULL),(9883,91,31,NULL),(9884,91,32,NULL),(9885,91,33,NULL),(9886,91,34,NULL),(9887,91,35,NULL),(9888,92,29,NULL),(9889,92,30,NULL),(9890,92,31,NULL),(9891,92,32,NULL),(9892,92,33,NULL),(9893,92,34,NULL),(9894,92,35,NULL),(9895,93,29,NULL),(9896,93,30,NULL),(9897,93,31,NULL),(9898,93,32,NULL),(9899,93,33,NULL),(9900,93,34,NULL),(9901,93,35,NULL),(9902,94,29,NULL),(9903,94,30,NULL),(9904,94,31,NULL),(9905,94,32,NULL),(9906,94,33,NULL),(9907,94,34,NULL),(9908,94,35,NULL),(9909,95,29,NULL),(9910,95,30,NULL),(9911,95,31,NULL),(9912,95,32,NULL),(9913,95,33,NULL),(9914,95,34,NULL),(9915,95,35,NULL),(9916,96,29,NULL),(9917,96,30,NULL),(9918,96,31,NULL),(9919,96,32,NULL),(9920,96,33,NULL),(9921,96,34,NULL),(9922,96,35,NULL),(9923,97,29,NULL),(9924,97,30,NULL),(9925,97,31,NULL),(9926,97,32,NULL),(9927,97,33,NULL),(9928,97,34,NULL),(9929,97,35,NULL),(9930,98,29,NULL),(9931,98,30,NULL),(9932,98,31,NULL),(9933,98,32,NULL),(9934,98,33,NULL),(9935,98,34,NULL),(9936,98,35,NULL),(9937,99,29,NULL),(9938,99,30,NULL),(9939,99,31,NULL),(9940,99,32,NULL),(9941,99,33,NULL),(9942,99,34,NULL),(9943,99,35,NULL),(9944,100,29,NULL),(9945,100,30,NULL),(9946,100,31,NULL),(9947,100,32,NULL),(9948,100,33,NULL),(9949,100,34,NULL),(9950,100,35,NULL),(9951,101,29,NULL),(9952,101,30,NULL),(9953,101,31,NULL),(9954,101,32,NULL),(9955,101,33,NULL),(9956,101,34,NULL),(9957,101,35,NULL),(9958,102,29,NULL),(9959,102,30,NULL),(9960,102,31,NULL),(9961,102,32,NULL),(9962,102,33,NULL),(9963,102,34,NULL),(9964,102,35,NULL),(9965,103,29,NULL),(9966,103,30,NULL),(9967,103,31,NULL),(9968,103,32,NULL),(9969,103,33,NULL),(9970,103,34,NULL),(9971,103,35,NULL),(9972,104,29,NULL),(9973,104,30,NULL),(9974,104,31,NULL),(9975,104,32,NULL),(9976,104,33,NULL),(9977,104,34,NULL),(9978,104,35,NULL),(9979,105,29,NULL),(9980,105,30,NULL),(9981,105,31,NULL),(9982,105,32,NULL),(9983,105,33,NULL),(9984,105,34,NULL),(9985,105,35,NULL),(9986,106,29,NULL),(9987,106,30,NULL),(9988,106,31,NULL),(9989,106,32,NULL),(9990,106,33,NULL),(9991,106,34,NULL),(9992,106,35,NULL),(9993,107,29,NULL),(9994,107,30,NULL),(9995,107,31,NULL),(9996,107,32,NULL),(9997,107,33,NULL),(9998,107,34,NULL),(9999,107,35,NULL),(10000,108,29,NULL),(10001,108,30,NULL),(10002,108,31,NULL),(10003,108,32,NULL),(10004,108,33,NULL),(10005,108,34,NULL),(10006,108,35,NULL),(10007,109,29,NULL),(10008,109,30,NULL),(10009,109,31,NULL),(10010,109,32,NULL),(10011,109,33,NULL),(10012,109,34,NULL),(10013,109,35,NULL),(10014,110,29,NULL),(10015,110,30,NULL),(10016,110,31,NULL),(10017,110,32,NULL),(10018,110,33,NULL),(10019,110,34,NULL),(10020,110,35,NULL),(10021,111,29,NULL),(10022,111,30,NULL),(10023,111,31,NULL),(10024,111,32,NULL),(10025,111,33,NULL),(10026,111,34,NULL),(10027,111,35,NULL),(10028,112,29,NULL),(10029,112,30,NULL),(10030,112,31,NULL),(10031,112,32,NULL),(10032,112,33,NULL),(10033,112,34,NULL),(10034,112,35,NULL),(10035,113,29,NULL),(10036,113,30,NULL),(10037,113,31,NULL),(10038,113,32,NULL),(10039,113,33,NULL),(10040,113,34,NULL),(10041,113,35,NULL),(10042,114,29,NULL),(10043,114,30,NULL),(10044,114,31,NULL),(10045,114,32,NULL),(10046,114,33,NULL),(10047,114,34,NULL),(10048,114,35,NULL),(10049,115,29,NULL),(10050,115,30,NULL),(10051,115,31,NULL),(10052,115,32,NULL),(10053,115,33,NULL),(10054,115,34,NULL),(10055,115,35,NULL),(10056,116,29,NULL),(10057,116,30,NULL),(10058,116,31,NULL),(10059,116,32,NULL),(10060,116,33,NULL),(10061,116,34,NULL),(10062,116,35,NULL),(10063,117,29,NULL),(10064,117,30,NULL),(10065,117,31,NULL),(10066,117,32,NULL),(10067,117,33,NULL),(10068,117,34,NULL),(10069,117,35,NULL),(10070,118,29,NULL),(10071,118,30,NULL),(10072,118,31,NULL),(10073,118,32,NULL),(10074,118,33,NULL),(10075,118,34,NULL),(10076,118,35,NULL),(10077,119,29,NULL),(10078,119,30,NULL),(10079,119,31,NULL),(10080,119,32,NULL),(10081,119,33,NULL),(10082,119,34,NULL),(10083,119,35,NULL),(10084,120,29,NULL),(10085,120,30,NULL),(10086,120,31,NULL),(10087,120,32,NULL),(10088,120,33,NULL),(10089,120,34,NULL),(10090,120,35,NULL),(10091,121,29,NULL),(10092,121,30,NULL),(10093,121,31,NULL),(10094,121,32,NULL),(10095,121,33,NULL),(10096,121,34,NULL),(10097,121,35,NULL),(10098,122,29,NULL),(10099,122,30,NULL),(10100,122,31,NULL),(10101,122,32,NULL),(10102,122,33,NULL),(10103,122,34,NULL),(10104,122,35,NULL),(10105,123,29,NULL),(10106,123,30,NULL),(10107,123,31,NULL),(10108,123,32,NULL),(10109,123,33,NULL),(10110,123,34,NULL),(10111,123,35,NULL),(10112,124,29,NULL),(10113,124,30,NULL),(10114,124,31,NULL),(10115,124,32,NULL),(10116,124,33,NULL),(10117,124,34,NULL),(10118,124,35,NULL),(10119,125,29,NULL),(10120,125,30,NULL),(10121,125,31,NULL),(10122,125,32,NULL),(10123,125,33,NULL),(10124,125,34,NULL),(10125,125,35,NULL),(10126,126,29,NULL),(10127,126,30,NULL),(10128,126,31,NULL),(10129,126,32,NULL),(10130,126,33,NULL),(10131,126,34,NULL),(10132,126,35,NULL),(10133,127,29,NULL),(10134,127,30,NULL),(10135,127,31,NULL),(10136,127,32,NULL),(10137,127,33,NULL),(10138,127,34,NULL),(10139,127,35,NULL),(10140,128,29,NULL),(10141,128,30,NULL),(10142,128,31,NULL),(10143,128,32,NULL),(10144,128,33,NULL),(10145,128,34,NULL),(10146,128,35,NULL),(10147,129,29,NULL),(10148,129,30,NULL),(10149,129,31,NULL),(10150,129,32,NULL),(10151,129,33,NULL),(10152,129,34,NULL),(10153,129,35,NULL),(10154,130,29,NULL),(10155,130,30,NULL),(10156,130,31,NULL),(10157,130,32,NULL),(10158,130,33,NULL),(10159,130,34,NULL),(10160,130,35,NULL),(10161,131,29,NULL),(10162,131,30,NULL),(10163,131,31,NULL),(10164,131,32,NULL),(10165,131,33,NULL),(10166,131,34,NULL),(10167,131,35,NULL),(10168,132,29,NULL),(10169,132,30,NULL),(10170,132,31,NULL),(10171,132,32,NULL),(10172,132,33,NULL),(10173,132,34,NULL),(10174,132,35,NULL),(10175,133,29,NULL),(10176,133,30,NULL),(10177,133,31,NULL),(10178,133,32,NULL),(10179,133,33,NULL),(10180,133,34,NULL),(10181,133,35,NULL),(10182,134,29,NULL),(10183,134,30,NULL),(10184,134,31,NULL),(10185,134,32,NULL),(10186,134,33,NULL),(10187,134,34,NULL),(10188,134,35,NULL),(10189,135,29,NULL),(10190,135,30,NULL),(10191,135,31,NULL),(10192,135,32,NULL),(10193,135,33,NULL),(10194,135,34,NULL),(10195,135,35,NULL),(10196,136,29,NULL),(10197,136,30,NULL),(10198,136,31,NULL),(10199,136,32,NULL),(10200,136,33,NULL),(10201,136,34,NULL),(10202,136,35,NULL),(10203,137,29,NULL),(10204,137,30,NULL),(10205,137,31,NULL),(10206,137,32,NULL),(10207,137,33,NULL),(10208,137,34,NULL),(10209,137,35,NULL),(10210,138,29,NULL),(10211,138,30,NULL),(10212,138,31,NULL),(10213,138,32,NULL),(10214,138,33,NULL),(10215,138,34,NULL),(10216,138,35,NULL),(10217,139,29,NULL),(10218,139,30,NULL),(10219,139,31,NULL),(10220,139,32,NULL),(10221,139,33,NULL),(10222,139,34,NULL),(10223,139,35,NULL),(10224,140,29,NULL),(10225,140,30,NULL),(10226,140,31,NULL),(10227,140,32,NULL),(10228,140,33,NULL),(10229,140,34,NULL),(10230,140,35,NULL),(10231,141,29,NULL),(10232,141,30,NULL),(10233,141,31,NULL),(10234,141,32,NULL),(10235,141,33,NULL),(10236,141,34,NULL),(10237,141,35,NULL),(10238,142,29,NULL),(10239,142,30,NULL),(10240,142,31,NULL),(10241,142,32,NULL),(10242,142,33,NULL),(10243,142,34,NULL),(10244,142,35,NULL),(10245,143,29,NULL),(10246,143,30,NULL),(10247,143,31,NULL),(10248,143,32,NULL),(10249,143,33,NULL),(10250,143,34,NULL),(10251,143,35,NULL),(10252,144,29,NULL),(10253,144,30,NULL),(10254,144,31,NULL),(10255,144,32,NULL),(10256,144,33,NULL),(10257,144,34,NULL),(10258,144,35,NULL),(10259,145,29,NULL),(10260,145,30,NULL),(10261,145,31,NULL),(10262,145,32,NULL),(10263,145,33,NULL),(10264,145,34,NULL),(10265,145,35,NULL),(10266,146,29,NULL),(10267,146,30,NULL),(10268,146,31,NULL),(10269,146,32,NULL),(10270,146,33,NULL),(10271,146,34,NULL),(10272,146,35,NULL),(10273,147,29,NULL),(10274,147,30,NULL),(10275,147,31,NULL),(10276,147,32,NULL),(10277,147,33,NULL),(10278,147,34,NULL),(10279,147,35,NULL),(10280,148,29,NULL),(10281,148,30,NULL),(10282,148,31,NULL),(10283,148,32,NULL),(10284,148,33,NULL),(10285,148,34,NULL),(10286,148,35,NULL),(10287,149,29,NULL),(10288,149,30,NULL),(10289,149,31,NULL),(10290,149,32,NULL),(10291,149,33,NULL),(10292,149,34,NULL),(10293,149,35,NULL),(10294,150,29,NULL),(10295,150,30,NULL),(10296,150,31,NULL),(10297,150,32,NULL),(10298,150,33,NULL),(10299,150,34,NULL),(10300,150,35,NULL),(10301,151,29,NULL),(10302,151,30,NULL),(10303,151,31,NULL),(10304,151,32,NULL),(10305,151,33,NULL),(10306,151,34,NULL),(10307,151,35,NULL),(10308,152,29,NULL),(10309,152,30,NULL),(10310,152,31,NULL),(10311,152,32,NULL),(10312,152,33,NULL),(10313,152,34,NULL),(10314,152,35,NULL),(10315,153,29,NULL),(10316,153,30,NULL),(10317,153,31,NULL),(10318,153,32,NULL),(10319,153,33,NULL),(10320,153,34,NULL),(10321,153,35,NULL);
/*!40000 ALTER TABLE `upload_ia` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_ia2`
--

LOCK TABLES `upload_ia2` WRITE;
/*!40000 ALTER TABLE `upload_ia2` DISABLE KEYS */;
INSERT INTO `upload_ia2` VALUES (1702,1,7,4),(1703,1,6,5),(1704,1,5,4),(1705,1,4,5),(1706,1,3,NULL),(1707,1,2,1),(1708,1,1,2),(1709,2,7,NULL),(1710,2,6,2),(1711,2,5,NULL),(1712,2,4,3),(1713,2,3,1),(1714,2,2,1),(1715,2,1,1),(1716,3,7,5),(1717,3,6,3),(1718,3,5,5),(1719,3,4,5),(1720,3,3,1),(1721,3,2,1),(1722,3,1,1),(1723,4,7,5),(1724,4,6,3),(1725,4,5,4),(1726,4,4,NULL),(1727,4,3,1),(1728,4,2,1),(1729,4,1,1),(1730,5,7,NULL),(1731,5,6,5),(1732,5,5,5),(1733,5,4,5),(1734,5,3,1),(1735,5,2,1),(1736,5,1,1),(1737,6,7,4),(1738,6,6,0),(1739,6,5,4),(1740,6,4,4),(1741,6,3,1),(1742,6,2,0),(1743,6,1,1),(1744,7,7,5),(1745,7,6,4),(1746,7,5,4),(1747,7,4,4),(1748,7,3,1),(1749,7,2,1),(1750,7,1,1),(1751,8,7,NULL),(1752,8,6,4),(1753,8,5,5),(1754,8,4,NULL),(1755,8,3,1),(1756,8,2,1),(1757,8,1,1),(1758,9,7,NULL),(1759,9,6,1),(1760,9,5,5),(1761,9,4,3),(1762,9,3,1),(1763,9,2,1),(1764,9,1,1),(1765,10,7,NULL),(1766,10,6,4),(1767,10,5,5),(1768,10,4,5),(1769,10,3,NULL),(1770,10,2,1),(1771,10,1,1),(1772,11,7,5),(1773,11,6,5),(1774,11,5,5),(1775,11,4,NULL),(1776,11,3,1),(1777,11,2,1),(1778,11,1,2),(1779,12,7,NULL),(1780,12,6,3),(1781,12,5,5),(1782,12,4,0),(1783,12,3,0),(1784,12,2,0),(1785,12,1,1),(1786,13,7,3),(1787,13,6,2),(1788,13,5,4),(1789,13,4,5),(1790,13,3,1),(1791,13,2,2),(1792,13,1,1),(1793,14,7,3),(1794,14,6,5),(1795,14,5,5),(1796,14,4,5),(1797,14,3,1),(1798,14,2,2),(1799,14,1,1),(1800,15,7,NULL),(1801,15,6,NULL),(1802,15,5,5),(1803,15,4,5),(1804,15,3,1),(1805,15,2,0),(1806,15,1,0),(1807,16,7,5),(1808,16,6,5),(1809,16,5,4),(1810,16,4,5),(1811,16,3,1),(1812,16,2,2),(1813,16,1,0),(1814,17,7,4),(1815,17,6,5),(1816,17,5,5),(1817,17,4,5),(1818,17,3,1),(1819,17,2,1),(1820,17,1,1),(1821,18,7,NULL),(1822,18,6,NULL),(1823,18,5,4),(1824,18,4,4),(1825,18,3,1),(1826,18,2,1),(1827,18,1,1),(1828,19,7,2),(1829,19,6,NULL),(1830,19,5,5),(1831,19,4,4),(1832,19,3,NULL),(1833,19,2,1),(1834,19,1,2),(1835,20,7,5),(1836,20,6,5),(1837,20,5,NULL),(1838,20,4,5),(1839,20,3,1),(1840,20,2,2),(1841,20,1,2),(1842,21,7,3),(1843,21,6,NULL),(1844,21,5,5),(1845,21,4,4),(1846,21,3,1),(1847,21,2,0),(1848,21,1,2),(1849,22,7,3),(1850,22,6,5),(1851,22,5,5),(1852,22,4,NULL),(1853,22,3,0),(1854,22,2,1),(1855,22,1,1),(1856,23,7,1),(1857,23,6,NULL),(1858,23,5,5),(1859,23,4,2),(1860,23,3,0),(1861,23,2,NULL),(1862,23,1,2),(1863,24,7,5),(1864,24,6,4),(1865,24,5,5),(1866,24,4,5),(1867,24,3,NULL),(1868,24,2,2),(1869,24,1,2),(1870,25,7,2),(1871,25,6,NULL),(1872,25,5,5),(1873,25,4,3),(1874,25,3,1),(1875,25,2,1),(1876,25,1,2),(1877,26,7,5),(1878,26,6,2),(1879,26,5,5),(1880,26,4,5),(1881,26,3,1),(1882,26,2,1),(1883,26,1,2),(1884,27,7,5),(1885,27,6,5),(1886,27,5,NULL),(1887,27,4,5),(1888,27,3,1),(1889,27,2,2),(1890,27,1,2),(1891,28,7,3),(1892,28,6,5),(1893,28,5,NULL),(1894,28,4,5),(1895,28,3,1),(1896,28,2,2),(1897,28,1,2),(1898,29,7,3),(1899,29,6,5),(1900,29,5,NULL),(1901,29,4,5),(1902,29,3,NULL),(1903,29,2,2),(1904,29,1,2),(1905,30,7,NULL),(1906,30,6,5),(1907,30,5,5),(1908,30,4,5),(1909,30,3,1),(1910,30,2,1),(1911,30,1,2),(1912,31,7,5),(1913,31,6,5),(1914,31,5,1),(1915,31,4,5),(1916,31,3,1),(1917,31,2,1),(1918,31,1,2),(1919,32,7,3),(1920,32,6,0),(1921,32,5,5),(1922,32,4,1),(1923,32,3,1),(1924,32,2,1),(1925,32,1,1),(1926,33,7,NULL),(1927,33,6,5),(1928,33,5,4),(1929,33,4,5),(1930,33,3,1),(1931,33,2,2),(1932,33,1,1),(1933,34,7,NULL),(1934,34,6,NULL),(1935,34,5,3),(1936,34,4,3),(1937,34,3,1),(1938,34,2,0),(1939,34,1,1),(1940,35,7,3),(1941,35,6,5),(1942,35,5,5),(1943,35,4,5),(1944,35,3,1),(1945,35,2,2),(1946,35,1,2),(1947,36,7,NULL),(1948,36,6,NULL),(1949,36,5,4),(1950,36,4,5),(1951,36,3,1),(1952,36,2,1),(1953,36,1,1),(1954,37,7,NULL),(1955,37,6,3),(1956,37,5,5),(1957,37,4,5),(1958,37,3,0),(1959,37,2,1),(1960,37,1,1),(1961,38,7,NULL),(1962,38,6,NULL),(1963,38,5,2),(1964,38,4,5),(1965,38,3,NULL),(1966,38,2,1),(1967,38,1,NULL),(1968,39,7,5),(1969,39,6,5),(1970,39,5,NULL),(1971,39,4,5),(1972,39,3,1),(1973,39,2,2),(1974,39,1,0),(1975,40,7,3),(1976,40,6,5),(1977,40,5,NULL),(1978,40,4,3),(1979,40,3,NULL),(1980,40,2,2),(1981,40,1,NULL),(1982,41,7,5),(1983,41,6,5),(1984,41,5,5),(1985,41,4,NULL),(1986,41,3,1),(1987,41,2,2),(1988,41,1,2),(1989,42,7,2),(1990,42,6,5),(1991,42,5,4),(1992,42,4,NULL),(1993,42,3,1),(1994,42,2,1),(1995,42,1,2),(1996,43,7,NULL),(1997,43,6,5),(1998,43,5,4),(1999,43,4,5),(2000,43,3,1),(2001,43,2,1),(2002,43,1,1),(2003,44,7,NULL),(2004,44,6,3),(2005,44,5,5),(2006,44,4,5),(2007,44,3,1),(2008,44,2,1),(2009,44,1,1),(2010,45,7,NULL),(2011,45,6,3),(2012,45,5,5),(2013,45,4,3),(2014,45,3,1),(2015,45,2,1),(2016,45,1,1),(2017,46,7,5),(2018,46,6,5),(2019,46,5,3),(2020,46,4,5),(2021,46,3,1),(2022,46,2,1),(2023,46,1,1),(2024,47,7,NULL),(2025,47,6,3),(2026,47,5,4),(2027,47,4,4),(2028,47,3,1),(2029,47,2,1),(2030,47,1,1),(2031,48,7,5),(2032,48,6,5),(2033,48,5,5),(2034,48,4,NULL),(2035,48,3,1),(2036,48,2,2),(2037,48,1,0),(2038,49,7,NULL),(2039,49,6,NULL),(2040,49,5,2),(2041,49,4,5),(2042,49,3,NULL),(2043,49,2,1),(2044,49,1,1),(2045,50,7,NULL),(2046,50,6,5),(2047,50,5,5),(2048,50,4,2),(2049,50,3,NULL),(2050,50,2,1),(2051,50,1,1),(2052,51,7,NULL),(2053,51,6,NULL),(2054,51,5,NULL),(2055,51,4,NULL),(2056,51,3,NULL),(2057,51,2,1),(2058,51,1,1),(2059,52,7,NULL),(2060,52,6,5),(2061,52,5,5),(2062,52,4,5),(2063,52,3,1),(2064,52,2,1),(2065,52,1,1),(2066,53,7,2),(2067,53,6,5),(2068,53,5,5),(2069,53,4,5),(2070,53,3,1),(2071,53,2,1),(2072,53,1,1),(2073,54,7,5),(2074,54,6,5),(2075,54,5,5),(2076,54,4,NULL),(2077,54,3,1),(2078,54,2,2),(2079,54,1,1),(2080,55,7,NULL),(2081,55,6,5),(2082,55,5,3),(2083,55,4,5),(2084,55,3,NULL),(2085,55,2,1),(2086,55,1,NULL),(2087,56,7,NULL),(2088,56,6,5),(2089,56,5,4),(2090,56,4,5),(2091,56,3,NULL),(2092,56,2,0),(2093,56,1,0),(2094,57,7,NULL),(2095,57,6,NULL),(2096,57,5,3),(2097,57,4,1),(2098,57,3,NULL),(2099,57,2,0),(2100,57,1,NULL),(2101,58,7,5),(2102,58,6,5),(2103,58,5,2),(2104,58,4,2),(2105,58,3,0),(2106,58,2,1),(2107,58,1,1),(2108,59,7,5),(2109,59,6,5),(2110,59,5,NULL),(2111,59,4,5),(2112,59,3,1),(2113,59,2,1),(2114,59,1,NULL),(2115,60,7,NULL),(2116,60,6,NULL),(2117,60,5,5),(2118,60,4,5),(2119,60,3,1),(2120,60,2,2),(2121,60,1,1),(2122,61,7,2),(2123,61,6,5),(2124,61,5,3),(2125,61,4,5),(2126,61,3,0),(2127,61,2,1),(2128,61,1,0),(2129,62,7,4),(2130,62,6,5),(2131,62,5,4),(2132,62,4,5),(2133,62,3,NULL),(2134,62,2,NULL),(2135,62,1,NULL),(2136,63,7,NULL),(2137,63,6,3),(2138,63,5,3),(2139,63,4,5),(2140,63,3,1),(2141,63,2,1),(2142,63,1,0),(2143,64,7,NULL),(2144,64,6,3),(2145,64,5,2),(2146,64,4,5),(2147,64,3,1),(2148,64,2,1),(2149,64,1,1),(2150,65,7,3),(2151,65,6,5),(2152,65,5,0),(2153,65,4,5),(2154,65,3,1),(2155,65,2,2),(2156,65,1,1),(2157,66,7,5),(2158,66,6,5),(2159,66,5,NULL),(2160,66,4,5),(2161,66,3,1),(2162,66,2,1),(2163,66,1,1),(2164,67,7,NULL),(2165,67,6,2),(2166,67,5,5),(2167,67,4,3),(2168,67,3,1),(2169,67,2,1),(2170,67,1,1),(2171,68,7,1),(2172,68,6,0),(2173,68,5,2),(2174,68,4,2),(2175,68,3,1),(2176,68,2,1),(2177,68,1,1),(2178,69,7,0),(2179,69,6,NULL),(2180,69,5,5),(2181,69,4,5),(2182,69,3,1),(2183,69,2,1),(2184,69,1,NULL),(2185,70,7,NULL),(2186,70,6,5),(2187,70,5,5),(2188,70,4,5),(2189,70,3,1),(2190,70,2,2),(2191,70,1,NULL),(2192,71,7,0),(2193,71,6,0),(2194,71,5,3),(2195,71,4,5),(2196,71,3,1),(2197,71,2,NULL),(2198,71,1,NULL),(2199,72,7,5),(2200,72,6,5),(2201,72,5,4),(2202,72,4,5),(2203,72,3,1),(2204,72,2,2),(2205,72,1,1),(2206,73,7,5),(2207,73,6,5),(2208,73,5,5),(2209,73,4,2),(2210,73,3,NULL),(2211,73,2,1),(2212,73,1,1),(2213,74,7,NULL),(2214,74,6,5),(2215,74,5,5),(2216,74,4,5),(2217,74,3,NULL),(2218,74,2,NULL),(2219,74,1,1),(2220,75,7,4),(2221,75,6,5),(2222,75,5,0),(2223,75,4,4),(2224,75,3,1),(2225,75,2,1),(2226,75,1,1),(2227,76,7,NULL),(2228,76,6,5),(2229,76,5,5),(2230,76,4,3),(2231,76,3,1),(2232,76,2,2),(2233,76,1,0),(2234,77,7,NULL),(2235,77,6,NULL),(2236,77,5,5),(2237,77,4,5),(2238,77,3,1),(2239,77,2,1),(2240,77,1,1),(2241,78,7,4),(2242,78,6,4),(2243,78,5,5),(2244,78,4,NULL),(2245,78,3,0),(2246,78,2,0),(2247,78,1,0),(2248,79,7,NULL),(2249,79,6,5),(2250,79,5,5),(2251,79,4,NULL),(2252,79,3,1),(2253,79,2,1),(2254,79,1,1),(2255,80,7,1),(2256,80,6,5),(2257,80,5,5),(2258,80,4,3),(2259,80,3,1),(2260,80,2,0),(2261,80,1,1),(2262,81,7,3),(2263,81,6,2),(2264,81,5,5),(2265,81,4,0),(2266,81,3,1),(2267,81,2,1),(2268,81,1,1),(2269,82,7,NULL),(2270,82,6,4),(2271,82,5,5),(2272,82,4,5),(2273,82,3,1),(2274,82,2,1),(2275,82,1,1),(2276,83,7,0),(2277,83,6,0),(2278,83,5,5),(2279,83,4,5),(2280,83,3,NULL),(2281,83,2,NULL),(2282,83,1,1),(2283,84,7,4),(2284,84,6,1),(2285,84,5,5),(2286,84,4,3),(2287,84,3,1),(2288,84,2,2),(2289,84,1,1),(2290,85,7,NULL),(2291,85,6,4),(2292,85,5,4),(2293,85,4,5),(2294,85,3,NULL),(2295,85,2,1),(2296,85,1,1),(2297,86,7,NULL),(2298,86,6,4),(2299,86,5,5),(2300,86,4,5),(2301,86,3,NULL),(2302,86,2,2),(2303,86,1,1),(2304,87,7,NULL),(2305,87,6,NULL),(2306,87,5,NULL),(2307,87,4,NULL),(2308,87,3,NULL),(2309,87,2,NULL),(2310,87,1,NULL),(2311,88,7,NULL),(2312,88,6,0),(2313,88,5,5),(2314,88,4,2),(2315,88,3,1),(2316,88,2,1),(2317,88,1,0),(2318,89,7,NULL),(2319,89,6,0),(2320,89,5,4),(2321,89,4,5),(2322,89,3,1),(2323,89,2,1),(2324,89,1,0),(2325,90,7,NULL),(2326,90,6,2),(2327,90,5,3),(2328,90,4,2),(2329,90,3,1),(2330,90,2,1),(2331,90,1,1),(2332,91,7,3),(2333,91,6,5),(2334,91,5,5),(2335,91,4,5),(2336,91,3,1),(2337,91,2,2),(2338,91,1,1),(2339,92,7,5),(2340,92,6,3),(2341,92,5,5),(2342,92,4,NULL),(2343,92,3,1),(2344,92,2,1),(2345,92,1,1),(2346,93,7,5),(2347,93,6,3),(2348,93,5,5),(2349,93,4,5),(2350,93,3,1),(2351,93,2,1),(2352,93,1,1),(2353,94,7,NULL),(2354,94,6,2),(2355,94,5,5),(2356,94,4,5),(2357,94,3,NULL),(2358,94,2,1),(2359,94,1,1),(2360,95,7,5),(2361,95,6,NULL),(2362,95,5,5),(2363,95,4,5),(2364,95,3,1),(2365,95,2,1),(2366,95,1,1),(2367,96,7,1),(2368,96,6,NULL),(2369,96,5,5),(2370,96,4,5),(2371,96,3,1),(2372,96,2,1),(2373,96,1,1),(2374,97,7,0),(2375,97,6,NULL),(2376,97,5,4),(2377,97,4,3),(2378,97,3,NULL),(2379,97,2,1),(2380,97,1,1),(2381,98,7,NULL),(2382,98,6,1),(2383,98,5,4),(2384,98,4,5),(2385,98,3,1),(2386,98,2,1),(2387,98,1,1),(2388,99,7,NULL),(2389,99,6,5),(2390,99,5,5),(2391,99,4,4),(2392,99,3,NULL),(2393,99,2,2),(2394,99,1,1),(2395,100,7,2),(2396,100,6,3),(2397,100,5,NULL),(2398,100,4,4),(2399,100,3,1),(2400,100,2,2),(2401,100,1,2),(2402,101,7,2),(2403,101,6,3),(2404,101,5,2),(2405,101,4,1),(2406,101,3,1),(2407,101,2,1),(2408,101,1,2),(2409,102,7,4),(2410,102,6,5),(2411,102,5,5),(2412,102,4,5),(2413,102,3,1),(2414,102,2,1),(2415,102,1,1),(2416,103,7,2),(2417,103,6,5),(2418,103,5,5),(2419,103,4,3),(2420,103,3,1),(2421,103,2,1),(2422,103,1,1),(2423,104,7,4),(2424,104,6,4),(2425,104,5,4),(2426,104,4,4),(2427,104,3,1),(2428,104,2,1),(2429,104,1,1),(2430,105,7,2),(2431,105,6,NULL),(2432,105,5,4),(2433,105,4,3),(2434,105,3,NULL),(2435,105,2,0),(2436,105,1,0),(2437,106,7,3),(2438,106,6,5),(2439,106,5,NULL),(2440,106,4,4),(2441,106,3,1),(2442,106,2,2),(2443,106,1,1),(2444,107,7,5),(2445,107,6,5),(2446,107,5,5),(2447,107,4,4),(2448,107,3,1),(2449,107,2,1),(2450,107,1,1),(2451,108,7,NULL),(2452,108,6,NULL),(2453,108,5,5),(2454,108,4,2),(2455,108,3,1),(2456,108,2,1),(2457,108,1,1),(2458,109,7,0),(2459,109,6,NULL),(2460,109,5,5),(2461,109,4,4),(2462,109,3,1),(2463,109,2,0),(2464,109,1,1),(2465,110,7,NULL),(2466,110,6,5),(2467,110,5,5),(2468,110,4,4),(2469,110,3,1),(2470,110,2,2),(2471,110,1,1),(2472,111,7,NULL),(2473,111,6,5),(2474,111,5,5),(2475,111,4,5),(2476,111,3,1),(2477,111,2,1),(2478,111,1,1),(2479,112,7,3),(2480,112,6,3),(2481,112,5,5),(2482,112,4,NULL),(2483,112,3,1),(2484,112,2,2),(2485,112,1,1),(2486,113,7,4),(2487,113,6,3),(2488,113,5,NULL),(2489,113,4,NULL),(2490,113,3,1),(2491,113,2,1),(2492,113,1,1),(2493,114,7,NULL),(2494,114,6,5),(2495,114,5,5),(2496,114,4,5),(2497,114,3,1),(2498,114,2,1),(2499,114,1,1),(2500,115,7,4),(2501,115,6,NULL),(2502,115,5,5),(2503,115,4,5),(2504,115,3,1),(2505,115,2,1),(2506,115,1,1),(2507,116,7,NULL),(2508,116,6,NULL),(2509,116,5,2),(2510,116,4,4),(2511,116,3,1),(2512,116,2,1),(2513,116,1,1),(2514,117,7,NULL),(2515,117,6,5),(2516,117,5,3),(2517,117,4,4),(2518,117,3,1),(2519,117,2,1),(2520,117,1,0),(2521,118,7,NULL),(2522,118,6,2),(2523,118,5,5),(2524,118,4,2),(2525,118,3,1),(2526,118,2,2),(2527,118,1,NULL),(2528,119,7,NULL),(2529,119,6,5),(2530,119,5,5),(2531,119,4,5),(2532,119,3,1),(2533,119,2,2),(2534,119,1,1),(2535,120,7,NULL),(2536,120,6,5),(2537,120,5,4),(2538,120,4,1),(2539,120,3,NULL),(2540,120,2,NULL),(2541,120,1,NULL),(2542,121,7,NULL),(2543,121,6,4),(2544,121,5,4),(2545,121,4,5),(2546,121,3,NULL),(2547,121,2,1),(2548,121,1,2),(2549,122,7,2),(2550,122,6,NULL),(2551,122,5,5),(2552,122,4,3),(2553,122,3,1),(2554,122,2,1),(2555,122,1,1),(2556,123,7,NULL),(2557,123,6,5),(2558,123,5,4),(2559,123,4,3),(2560,123,3,NULL),(2561,123,2,NULL),(2562,123,1,2),(2563,124,7,NULL),(2564,124,6,3),(2565,124,5,4),(2566,124,4,2),(2567,124,3,NULL),(2568,124,2,1),(2569,124,1,NULL),(2570,125,7,NULL),(2571,125,6,4),(2572,125,5,3),(2573,125,4,3),(2574,125,3,1),(2575,125,2,1),(2576,125,1,1),(2577,126,7,2),(2578,126,6,5),(2579,126,5,5),(2580,126,4,3),(2581,126,3,1),(2582,126,2,1),(2583,126,1,1),(2584,127,7,NULL),(2585,127,6,4),(2586,127,5,5),(2587,127,4,3),(2588,127,3,0),(2589,127,2,0),(2590,127,1,NULL),(2591,128,7,NULL),(2592,128,6,4),(2593,128,5,5),(2594,128,4,3),(2595,128,3,1),(2596,128,2,0),(2597,128,1,1),(2598,129,7,NULL),(2599,129,6,NULL),(2600,129,5,5),(2601,129,4,4),(2602,129,3,1),(2603,129,2,1),(2604,129,1,1),(2605,130,7,NULL),(2606,130,6,NULL),(2607,130,5,5),(2608,130,4,5),(2609,130,3,1),(2610,130,2,2),(2611,130,1,1),(2612,131,7,NULL),(2613,131,6,2),(2614,131,5,5),(2615,131,4,2),(2616,131,3,1),(2617,131,2,2),(2618,131,1,0),(2619,132,7,NULL),(2620,132,6,NULL),(2621,132,5,4),(2622,132,4,0),(2623,132,3,1),(2624,132,2,0),(2625,132,1,NULL),(2626,133,7,NULL),(2627,133,6,NULL),(2628,133,5,5),(2629,133,4,2),(2630,133,3,1),(2631,133,2,1),(2632,133,1,1),(2633,134,7,NULL),(2634,134,6,NULL),(2635,134,5,5),(2636,134,4,5),(2637,134,3,1),(2638,134,2,1),(2639,134,1,1),(2640,135,7,NULL),(2641,135,6,NULL),(2642,135,5,NULL),(2643,135,4,NULL),(2644,135,3,NULL),(2645,135,2,NULL),(2646,135,1,NULL),(2647,136,7,NULL),(2648,136,6,5),(2649,136,5,5),(2650,136,4,5),(2651,136,3,1),(2652,136,2,1),(2653,136,1,1),(2654,137,7,0),(2655,137,6,NULL),(2656,137,5,4),(2657,137,4,1),(2658,137,3,1),(2659,137,2,1),(2660,137,1,1),(2661,138,7,NULL),(2662,138,6,NULL),(2663,138,5,5),(2664,138,4,5),(2665,138,3,NULL),(2666,138,2,1),(2667,138,1,NULL),(2668,139,7,NULL),(2669,139,6,4),(2670,139,5,5),(2671,139,4,5),(2672,139,3,1),(2673,139,2,1),(2674,139,1,1),(2675,140,7,NULL),(2676,140,6,3),(2677,140,5,5),(2678,140,4,5),(2679,140,3,1),(2680,140,2,1),(2681,140,1,1),(2682,141,7,NULL),(2683,141,6,5),(2684,141,5,5),(2685,141,4,4),(2686,141,3,NULL),(2687,141,2,1),(2688,141,1,1),(2689,142,7,NULL),(2690,142,6,4),(2691,142,5,5),(2692,142,4,5),(2693,142,3,1),(2694,142,2,1),(2695,142,1,2),(2696,143,7,NULL),(2697,143,6,2),(2698,143,5,3),(2699,143,4,5),(2700,143,3,1),(2701,143,2,0),(2702,143,1,1),(2703,144,7,NULL),(2704,144,6,4),(2705,144,5,5),(2706,144,4,4),(2707,144,3,1),(2708,144,2,1),(2709,144,1,0),(2710,145,7,NULL),(2711,145,6,5),(2712,145,5,5),(2713,145,4,5),(2714,145,3,1),(2715,145,2,1),(2716,145,1,0),(2717,146,7,NULL),(2718,146,6,5),(2719,146,5,5),(2720,146,4,5),(2721,146,3,1),(2722,146,2,1),(2723,146,1,0),(2724,147,7,3),(2725,147,6,5),(2726,147,5,5),(2727,147,4,5),(2728,147,3,1),(2729,147,2,2),(2730,147,1,1),(2731,148,7,4),(2732,148,6,NULL),(2733,148,5,5),(2734,148,4,5),(2735,148,3,1),(2736,148,2,1),(2737,148,1,0),(2738,149,7,1),(2739,149,6,0),(2740,149,5,5),(2741,149,4,5),(2742,149,3,1),(2743,149,2,1),(2744,149,1,1),(2745,150,7,NULL),(2746,150,6,2),(2747,150,5,5),(2748,150,4,5),(2749,150,3,1),(2750,150,2,0),(2751,150,1,0),(2752,151,7,NULL),(2753,151,6,5),(2754,151,5,5),(2755,151,4,4),(2756,151,3,1),(2757,151,2,1),(2758,151,1,1),(2759,152,7,NULL),(2760,152,6,NULL),(2761,152,5,0),(2762,152,4,3),(2763,152,3,NULL),(2764,152,2,NULL),(2765,152,1,1),(2766,153,7,NULL),(2767,153,6,NULL),(2768,153,5,5),(2769,153,4,5),(2770,153,3,1),(2771,153,2,1),(2772,153,1,0),(3749,1,11,NULL),(3750,1,12,0),(3751,1,13,NULL),(3752,1,14,NULL),(3753,1,15,NULL),(3754,1,16,NULL),(3755,1,17,NULL),(3756,2,11,NULL),(3757,2,12,NULL),(3758,2,13,NULL),(3759,2,14,NULL),(3760,2,15,NULL),(3761,2,16,NULL),(3762,2,17,NULL),(3763,3,11,NULL),(3764,3,12,NULL),(3765,3,13,NULL),(3766,3,14,NULL),(3767,3,15,NULL),(3768,3,16,NULL),(3769,3,17,NULL),(3770,4,11,NULL),(3771,4,12,NULL),(3772,4,13,NULL),(3773,4,14,NULL),(3774,4,15,NULL),(3775,4,16,NULL),(3776,4,17,NULL),(3777,5,11,NULL),(3778,5,12,NULL),(3779,5,13,NULL),(3780,5,14,NULL),(3781,5,15,NULL),(3782,5,16,NULL),(3783,5,17,NULL),(3784,6,11,NULL),(3785,6,12,NULL),(3786,6,13,NULL),(3787,6,14,NULL),(3788,6,15,NULL),(3789,6,16,NULL),(3790,6,17,NULL),(3791,7,11,NULL),(3792,7,12,NULL),(3793,7,13,NULL),(3794,7,14,NULL),(3795,7,15,NULL),(3796,7,16,NULL),(3797,7,17,NULL),(3798,8,11,NULL),(3799,8,12,NULL),(3800,8,13,NULL),(3801,8,14,NULL),(3802,8,15,NULL),(3803,8,16,NULL),(3804,8,17,NULL),(3805,9,11,NULL),(3806,9,12,NULL),(3807,9,13,NULL),(3808,9,14,NULL),(3809,9,15,NULL),(3810,9,16,NULL),(3811,9,17,NULL),(3812,10,11,NULL),(3813,10,12,NULL),(3814,10,13,NULL),(3815,10,14,NULL),(3816,10,15,NULL),(3817,10,16,NULL),(3818,10,17,NULL),(3819,11,11,NULL),(3820,11,12,NULL),(3821,11,13,NULL),(3822,11,14,NULL),(3823,11,15,NULL),(3824,11,16,NULL),(3825,11,17,NULL),(3826,12,11,NULL),(3827,12,12,NULL),(3828,12,13,NULL),(3829,12,14,NULL),(3830,12,15,NULL),(3831,12,16,NULL),(3832,12,17,NULL),(3833,13,11,NULL),(3834,13,12,NULL),(3835,13,13,NULL),(3836,13,14,NULL),(3837,13,15,NULL),(3838,13,16,NULL),(3839,13,17,NULL),(3840,14,11,NULL),(3841,14,12,NULL),(3842,14,13,NULL),(3843,14,14,NULL),(3844,14,15,NULL),(3845,14,16,NULL),(3846,14,17,NULL),(3847,15,11,NULL),(3848,15,12,NULL),(3849,15,13,NULL),(3850,15,14,NULL),(3851,15,15,NULL),(3852,15,16,NULL),(3853,15,17,NULL),(3854,16,11,NULL),(3855,16,12,NULL),(3856,16,13,NULL),(3857,16,14,NULL),(3858,16,15,NULL),(3859,16,16,NULL),(3860,16,17,NULL),(3861,17,11,NULL),(3862,17,12,NULL),(3863,17,13,NULL),(3864,17,14,NULL),(3865,17,15,NULL),(3866,17,16,NULL),(3867,17,17,NULL),(3868,18,11,NULL),(3869,18,12,NULL),(3870,18,13,NULL),(3871,18,14,NULL),(3872,18,15,NULL),(3873,18,16,NULL),(3874,18,17,NULL),(3875,19,11,NULL),(3876,19,12,NULL),(3877,19,13,NULL),(3878,19,14,NULL),(3879,19,15,NULL),(3880,19,16,NULL),(3881,19,17,NULL),(3882,20,11,NULL),(3883,20,12,NULL),(3884,20,13,NULL),(3885,20,14,NULL),(3886,20,15,NULL),(3887,20,16,NULL),(3888,20,17,NULL),(3889,21,11,NULL),(3890,21,12,NULL),(3891,21,13,NULL),(3892,21,14,NULL),(3893,21,15,NULL),(3894,21,16,NULL),(3895,21,17,NULL),(3896,22,11,NULL),(3897,22,12,NULL),(3898,22,13,NULL),(3899,22,14,NULL),(3900,22,15,NULL),(3901,22,16,NULL),(3902,22,17,NULL),(3903,23,11,NULL),(3904,23,12,NULL),(3905,23,13,NULL),(3906,23,14,NULL),(3907,23,15,NULL),(3908,23,16,NULL),(3909,23,17,NULL),(3910,24,11,NULL),(3911,24,12,NULL),(3912,24,13,NULL),(3913,24,14,NULL),(3914,24,15,NULL),(3915,24,16,NULL),(3916,24,17,NULL),(3917,25,11,NULL),(3918,25,12,NULL),(3919,25,13,NULL),(3920,25,14,NULL),(3921,25,15,NULL),(3922,25,16,NULL),(3923,25,17,NULL),(3924,26,11,NULL),(3925,26,12,NULL),(3926,26,13,NULL),(3927,26,14,NULL),(3928,26,15,NULL),(3929,26,16,NULL),(3930,26,17,NULL),(3931,27,11,NULL),(3932,27,12,NULL),(3933,27,13,NULL),(3934,27,14,NULL),(3935,27,15,NULL),(3936,27,16,NULL),(3937,27,17,NULL),(3938,28,11,NULL),(3939,28,12,NULL),(3940,28,13,NULL),(3941,28,14,NULL),(3942,28,15,NULL),(3943,28,16,NULL),(3944,28,17,NULL),(3945,29,11,NULL),(3946,29,12,NULL),(3947,29,13,NULL),(3948,29,14,NULL),(3949,29,15,NULL),(3950,29,16,NULL),(3951,29,17,NULL),(3952,30,11,NULL),(3953,30,12,NULL),(3954,30,13,NULL),(3955,30,14,NULL),(3956,30,15,NULL),(3957,30,16,NULL),(3958,30,17,NULL),(3959,31,11,NULL),(3960,31,12,NULL),(3961,31,13,NULL),(3962,31,14,NULL),(3963,31,15,NULL),(3964,31,16,NULL),(3965,31,17,NULL),(3966,32,11,NULL),(3967,32,12,NULL),(3968,32,13,NULL),(3969,32,14,NULL),(3970,32,15,NULL),(3971,32,16,NULL),(3972,32,17,NULL),(3973,33,11,NULL),(3974,33,12,NULL),(3975,33,13,NULL),(3976,33,14,NULL),(3977,33,15,NULL),(3978,33,16,NULL),(3979,33,17,NULL),(3980,34,11,NULL),(3981,34,12,NULL),(3982,34,13,NULL),(3983,34,14,NULL),(3984,34,15,NULL),(3985,34,16,NULL),(3986,34,17,NULL),(3987,35,11,NULL),(3988,35,12,NULL),(3989,35,13,NULL),(3990,35,14,NULL),(3991,35,15,NULL),(3992,35,16,NULL),(3993,35,17,NULL),(3994,36,11,NULL),(3995,36,12,NULL),(3996,36,13,NULL),(3997,36,14,NULL),(3998,36,15,NULL),(3999,36,16,NULL),(4000,36,17,NULL),(4001,37,11,NULL),(4002,37,12,NULL),(4003,37,13,NULL),(4004,37,14,NULL),(4005,37,15,NULL),(4006,37,16,NULL),(4007,37,17,NULL),(4008,38,11,NULL),(4009,38,12,NULL),(4010,38,13,NULL),(4011,38,14,NULL),(4012,38,15,NULL),(4013,38,16,NULL),(4014,38,17,NULL),(4015,39,11,NULL),(4016,39,12,NULL),(4017,39,13,NULL),(4018,39,14,NULL),(4019,39,15,NULL),(4020,39,16,NULL),(4021,39,17,NULL),(4022,40,11,NULL),(4023,40,12,NULL),(4024,40,13,NULL),(4025,40,14,NULL),(4026,40,15,NULL),(4027,40,16,NULL),(4028,40,17,NULL),(4029,41,11,NULL),(4030,41,12,NULL),(4031,41,13,NULL),(4032,41,14,NULL),(4033,41,15,NULL),(4034,41,16,NULL),(4035,41,17,NULL),(4036,42,11,NULL),(4037,42,12,NULL),(4038,42,13,NULL),(4039,42,14,NULL),(4040,42,15,NULL),(4041,42,16,NULL),(4042,42,17,NULL),(4043,43,11,NULL),(4044,43,12,NULL),(4045,43,13,NULL),(4046,43,14,NULL),(4047,43,15,NULL),(4048,43,16,NULL),(4049,43,17,NULL),(4050,44,11,NULL),(4051,44,12,NULL),(4052,44,13,NULL),(4053,44,14,NULL),(4054,44,15,NULL),(4055,44,16,NULL),(4056,44,17,NULL),(4057,45,11,NULL),(4058,45,12,NULL),(4059,45,13,NULL),(4060,45,14,NULL),(4061,45,15,NULL),(4062,45,16,NULL),(4063,45,17,NULL),(4064,46,11,NULL),(4065,46,12,NULL),(4066,46,13,NULL),(4067,46,14,NULL),(4068,46,15,NULL),(4069,46,16,NULL),(4070,46,17,NULL),(4071,47,11,NULL),(4072,47,12,NULL),(4073,47,13,NULL),(4074,47,14,NULL),(4075,47,15,NULL),(4076,47,16,NULL),(4077,47,17,NULL),(4078,48,11,NULL),(4079,48,12,NULL),(4080,48,13,NULL),(4081,48,14,NULL),(4082,48,15,NULL),(4083,48,16,NULL),(4084,48,17,NULL),(4085,49,11,NULL),(4086,49,12,NULL),(4087,49,13,NULL),(4088,49,14,NULL),(4089,49,15,NULL),(4090,49,16,NULL),(4091,49,17,NULL),(4092,50,11,NULL),(4093,50,12,NULL),(4094,50,13,NULL),(4095,50,14,NULL),(4096,50,15,NULL),(4097,50,16,NULL),(4098,50,17,NULL),(4099,51,11,NULL),(4100,51,12,NULL),(4101,51,13,NULL),(4102,51,14,NULL),(4103,51,15,NULL),(4104,51,16,NULL),(4105,51,17,NULL),(4106,52,11,NULL),(4107,52,12,NULL),(4108,52,13,NULL),(4109,52,14,NULL),(4110,52,15,NULL),(4111,52,16,NULL),(4112,52,17,NULL),(4113,53,11,NULL),(4114,53,12,NULL),(4115,53,13,NULL),(4116,53,14,NULL),(4117,53,15,NULL),(4118,53,16,NULL),(4119,53,17,NULL),(4120,54,11,NULL),(4121,54,12,NULL),(4122,54,13,NULL),(4123,54,14,NULL),(4124,54,15,NULL),(4125,54,16,NULL),(4126,54,17,NULL),(4127,55,11,NULL),(4128,55,12,NULL),(4129,55,13,NULL),(4130,55,14,NULL),(4131,55,15,NULL),(4132,55,16,NULL),(4133,55,17,NULL),(4134,56,11,NULL),(4135,56,12,NULL),(4136,56,13,NULL),(4137,56,14,NULL),(4138,56,15,NULL),(4139,56,16,NULL),(4140,56,17,NULL),(4141,57,11,NULL),(4142,57,12,NULL),(4143,57,13,NULL),(4144,57,14,NULL),(4145,57,15,NULL),(4146,57,16,NULL),(4147,57,17,NULL),(4148,58,11,NULL),(4149,58,12,NULL),(4150,58,13,NULL),(4151,58,14,NULL),(4152,58,15,NULL),(4153,58,16,NULL),(4154,58,17,NULL),(4155,59,11,NULL),(4156,59,12,NULL),(4157,59,13,NULL),(4158,59,14,NULL),(4159,59,15,NULL),(4160,59,16,NULL),(4161,59,17,NULL),(4162,60,11,NULL),(4163,60,12,NULL),(4164,60,13,NULL),(4165,60,14,NULL),(4166,60,15,NULL),(4167,60,16,NULL),(4168,60,17,NULL),(4169,61,11,NULL),(4170,61,12,NULL),(4171,61,13,NULL),(4172,61,14,NULL),(4173,61,15,NULL),(4174,61,16,NULL),(4175,61,17,NULL),(4176,62,11,NULL),(4177,62,12,NULL),(4178,62,13,NULL),(4179,62,14,NULL),(4180,62,15,NULL),(4181,62,16,NULL),(4182,62,17,NULL),(4183,63,11,NULL),(4184,63,12,NULL),(4185,63,13,NULL),(4186,63,14,NULL),(4187,63,15,NULL),(4188,63,16,NULL),(4189,63,17,NULL),(4190,64,11,NULL),(4191,64,12,NULL),(4192,64,13,NULL),(4193,64,14,NULL),(4194,64,15,NULL),(4195,64,16,NULL),(4196,64,17,NULL),(4197,65,11,NULL),(4198,65,12,NULL),(4199,65,13,NULL),(4200,65,14,NULL),(4201,65,15,NULL),(4202,65,16,NULL),(4203,65,17,NULL),(4204,66,11,NULL),(4205,66,12,NULL),(4206,66,13,NULL),(4207,66,14,NULL),(4208,66,15,NULL),(4209,66,16,NULL),(4210,66,17,NULL),(4211,67,11,NULL),(4212,67,12,NULL),(4213,67,13,NULL),(4214,67,14,NULL),(4215,67,15,NULL),(4216,67,16,NULL),(4217,67,17,NULL),(4218,68,11,NULL),(4219,68,12,NULL),(4220,68,13,NULL),(4221,68,14,NULL),(4222,68,15,NULL),(4223,68,16,NULL),(4224,68,17,NULL),(4225,69,11,NULL),(4226,69,12,NULL),(4227,69,13,NULL),(4228,69,14,NULL),(4229,69,15,NULL),(4230,69,16,NULL),(4231,69,17,NULL),(4232,70,11,NULL),(4233,70,12,NULL),(4234,70,13,NULL),(4235,70,14,NULL),(4236,70,15,NULL),(4237,70,16,NULL),(4238,70,17,NULL),(4239,71,11,NULL),(4240,71,12,NULL),(4241,71,13,NULL),(4242,71,14,NULL),(4243,71,15,NULL),(4244,71,16,NULL),(4245,71,17,NULL),(4246,72,11,NULL),(4247,72,12,NULL),(4248,72,13,NULL),(4249,72,14,NULL),(4250,72,15,NULL),(4251,72,16,NULL),(4252,72,17,NULL),(4253,73,11,NULL),(4254,73,12,NULL),(4255,73,13,NULL),(4256,73,14,NULL),(4257,73,15,NULL),(4258,73,16,NULL),(4259,73,17,NULL),(4260,74,11,NULL),(4261,74,12,NULL),(4262,74,13,NULL),(4263,74,14,NULL),(4264,74,15,NULL),(4265,74,16,NULL),(4266,74,17,NULL),(4267,75,11,NULL),(4268,75,12,NULL),(4269,75,13,NULL),(4270,75,14,NULL),(4271,75,15,NULL),(4272,75,16,NULL),(4273,75,17,NULL),(4274,76,11,NULL),(4275,76,12,NULL),(4276,76,13,NULL),(4277,76,14,NULL),(4278,76,15,NULL),(4279,76,16,NULL),(4280,76,17,NULL),(4281,77,11,NULL),(4282,77,12,NULL),(4283,77,13,NULL),(4284,77,14,NULL),(4285,77,15,NULL),(4286,77,16,NULL),(4287,77,17,NULL),(4288,78,11,NULL),(4289,78,12,NULL),(4290,78,13,NULL),(4291,78,14,NULL),(4292,78,15,NULL),(4293,78,16,NULL),(4294,78,17,NULL),(4295,79,11,NULL),(4296,79,12,NULL),(4297,79,13,NULL),(4298,79,14,NULL),(4299,79,15,NULL),(4300,79,16,NULL),(4301,79,17,NULL),(4302,80,11,NULL),(4303,80,12,NULL),(4304,80,13,NULL),(4305,80,14,NULL),(4306,80,15,NULL),(4307,80,16,NULL),(4308,80,17,NULL),(4309,81,11,NULL),(4310,81,12,NULL),(4311,81,13,NULL),(4312,81,14,NULL),(4313,81,15,NULL),(4314,81,16,NULL),(4315,81,17,NULL),(4316,82,11,NULL),(4317,82,12,NULL),(4318,82,13,NULL),(4319,82,14,NULL),(4320,82,15,NULL),(4321,82,16,NULL),(4322,82,17,NULL),(4323,83,11,NULL),(4324,83,12,NULL),(4325,83,13,NULL),(4326,83,14,NULL),(4327,83,15,NULL),(4328,83,16,NULL),(4329,83,17,NULL),(4330,84,11,NULL),(4331,84,12,NULL),(4332,84,13,NULL),(4333,84,14,NULL),(4334,84,15,NULL),(4335,84,16,NULL),(4336,84,17,NULL),(4337,85,11,NULL),(4338,85,12,NULL),(4339,85,13,NULL),(4340,85,14,NULL),(4341,85,15,NULL),(4342,85,16,NULL),(4343,85,17,NULL),(4344,86,11,NULL),(4345,86,12,NULL),(4346,86,13,NULL),(4347,86,14,NULL),(4348,86,15,NULL),(4349,86,16,NULL),(4350,86,17,NULL),(4351,87,11,NULL),(4352,87,12,NULL),(4353,87,13,NULL),(4354,87,14,NULL),(4355,87,15,NULL),(4356,87,16,NULL),(4357,87,17,NULL),(4358,88,11,NULL),(4359,88,12,NULL),(4360,88,13,NULL),(4361,88,14,NULL),(4362,88,15,NULL),(4363,88,16,NULL),(4364,88,17,NULL),(4365,89,11,NULL),(4366,89,12,NULL),(4367,89,13,NULL),(4368,89,14,NULL),(4369,89,15,NULL),(4370,89,16,NULL),(4371,89,17,NULL),(4372,90,11,NULL),(4373,90,12,NULL),(4374,90,13,NULL),(4375,90,14,NULL),(4376,90,15,NULL),(4377,90,16,NULL),(4378,90,17,NULL),(4379,91,11,NULL),(4380,91,12,NULL),(4381,91,13,NULL),(4382,91,14,NULL),(4383,91,15,NULL),(4384,91,16,NULL),(4385,91,17,NULL),(4386,92,11,NULL),(4387,92,12,NULL),(4388,92,13,NULL),(4389,92,14,NULL),(4390,92,15,NULL),(4391,92,16,NULL),(4392,92,17,NULL),(4393,93,11,NULL),(4394,93,12,NULL),(4395,93,13,NULL),(4396,93,14,NULL),(4397,93,15,NULL),(4398,93,16,NULL),(4399,93,17,NULL),(4400,94,11,NULL),(4401,94,12,NULL),(4402,94,13,NULL),(4403,94,14,NULL),(4404,94,15,NULL),(4405,94,16,NULL),(4406,94,17,NULL),(4407,95,11,NULL),(4408,95,12,NULL),(4409,95,13,NULL),(4410,95,14,NULL),(4411,95,15,NULL),(4412,95,16,NULL),(4413,95,17,NULL),(4414,96,11,NULL),(4415,96,12,NULL),(4416,96,13,NULL),(4417,96,14,NULL),(4418,96,15,NULL),(4419,96,16,NULL),(4420,96,17,NULL),(4421,97,11,NULL),(4422,97,12,NULL),(4423,97,13,NULL),(4424,97,14,NULL),(4425,97,15,NULL),(4426,97,16,NULL),(4427,97,17,NULL),(4428,98,11,NULL),(4429,98,12,NULL),(4430,98,13,NULL),(4431,98,14,NULL),(4432,98,15,NULL),(4433,98,16,NULL),(4434,98,17,NULL),(4435,99,11,NULL),(4436,99,12,NULL),(4437,99,13,NULL),(4438,99,14,NULL),(4439,99,15,NULL),(4440,99,16,NULL),(4441,99,17,NULL),(4442,100,11,NULL),(4443,100,12,NULL),(4444,100,13,NULL),(4445,100,14,NULL),(4446,100,15,NULL),(4447,100,16,NULL),(4448,100,17,NULL),(4449,101,11,NULL),(4450,101,12,NULL),(4451,101,13,NULL),(4452,101,14,NULL),(4453,101,15,NULL),(4454,101,16,NULL),(4455,101,17,NULL),(4456,102,11,NULL),(4457,102,12,NULL),(4458,102,13,NULL),(4459,102,14,NULL),(4460,102,15,NULL),(4461,102,16,NULL),(4462,102,17,NULL),(4463,103,11,NULL),(4464,103,12,NULL),(4465,103,13,NULL),(4466,103,14,NULL),(4467,103,15,NULL),(4468,103,16,NULL),(4469,103,17,NULL),(4470,104,11,NULL),(4471,104,12,NULL),(4472,104,13,NULL),(4473,104,14,NULL),(4474,104,15,NULL),(4475,104,16,NULL),(4476,104,17,NULL),(4477,105,11,NULL),(4478,105,12,NULL),(4479,105,13,NULL),(4480,105,14,NULL),(4481,105,15,NULL),(4482,105,16,NULL),(4483,105,17,NULL),(4484,106,11,NULL),(4485,106,12,NULL),(4486,106,13,NULL),(4487,106,14,NULL),(4488,106,15,NULL),(4489,106,16,NULL),(4490,106,17,NULL),(4491,107,11,NULL),(4492,107,12,NULL),(4493,107,13,NULL),(4494,107,14,NULL),(4495,107,15,NULL),(4496,107,16,NULL),(4497,107,17,NULL),(4498,108,11,NULL),(4499,108,12,NULL),(4500,108,13,NULL),(4501,108,14,NULL),(4502,108,15,NULL),(4503,108,16,NULL),(4504,108,17,NULL),(4505,109,11,NULL),(4506,109,12,NULL),(4507,109,13,NULL),(4508,109,14,NULL),(4509,109,15,NULL),(4510,109,16,NULL),(4511,109,17,NULL),(4512,110,11,NULL),(4513,110,12,NULL),(4514,110,13,NULL),(4515,110,14,NULL),(4516,110,15,NULL),(4517,110,16,NULL),(4518,110,17,NULL),(4519,111,11,NULL),(4520,111,12,NULL),(4521,111,13,NULL),(4522,111,14,NULL),(4523,111,15,NULL),(4524,111,16,NULL),(4525,111,17,NULL),(4526,112,11,NULL),(4527,112,12,NULL),(4528,112,13,NULL),(4529,112,14,NULL),(4530,112,15,NULL),(4531,112,16,NULL),(4532,112,17,NULL),(4533,113,11,NULL),(4534,113,12,NULL),(4535,113,13,NULL),(4536,113,14,NULL),(4537,113,15,NULL),(4538,113,16,NULL),(4539,113,17,NULL),(4540,114,11,NULL),(4541,114,12,NULL),(4542,114,13,NULL),(4543,114,14,NULL),(4544,114,15,NULL),(4545,114,16,NULL),(4546,114,17,NULL),(4547,115,11,NULL),(4548,115,12,NULL),(4549,115,13,NULL),(4550,115,14,NULL),(4551,115,15,NULL),(4552,115,16,NULL),(4553,115,17,NULL),(4554,116,11,NULL),(4555,116,12,NULL),(4556,116,13,NULL),(4557,116,14,NULL),(4558,116,15,NULL),(4559,116,16,NULL),(4560,116,17,NULL),(4561,117,11,NULL),(4562,117,12,NULL),(4563,117,13,NULL),(4564,117,14,NULL),(4565,117,15,NULL),(4566,117,16,NULL),(4567,117,17,NULL),(4568,118,11,NULL),(4569,118,12,NULL),(4570,118,13,NULL),(4571,118,14,NULL),(4572,118,15,NULL),(4573,118,16,NULL),(4574,118,17,NULL),(4575,119,11,NULL),(4576,119,12,NULL),(4577,119,13,NULL),(4578,119,14,NULL),(4579,119,15,NULL),(4580,119,16,NULL),(4581,119,17,NULL),(4582,120,11,NULL),(4583,120,12,NULL),(4584,120,13,NULL),(4585,120,14,NULL),(4586,120,15,NULL),(4587,120,16,NULL),(4588,120,17,NULL),(4589,121,11,NULL),(4590,121,12,NULL),(4591,121,13,NULL),(4592,121,14,NULL),(4593,121,15,NULL),(4594,121,16,NULL),(4595,121,17,NULL),(4596,122,11,NULL),(4597,122,12,NULL),(4598,122,13,NULL),(4599,122,14,NULL),(4600,122,15,NULL),(4601,122,16,NULL),(4602,122,17,NULL),(4603,123,11,NULL),(4604,123,12,NULL),(4605,123,13,NULL),(4606,123,14,NULL),(4607,123,15,NULL),(4608,123,16,NULL),(4609,123,17,NULL),(4610,124,11,NULL),(4611,124,12,NULL),(4612,124,13,NULL),(4613,124,14,NULL),(4614,124,15,NULL),(4615,124,16,NULL),(4616,124,17,NULL),(4617,125,11,NULL),(4618,125,12,NULL),(4619,125,13,NULL),(4620,125,14,NULL),(4621,125,15,NULL),(4622,125,16,NULL),(4623,125,17,NULL),(4624,126,11,NULL),(4625,126,12,NULL),(4626,126,13,NULL),(4627,126,14,NULL),(4628,126,15,NULL),(4629,126,16,NULL),(4630,126,17,NULL),(4631,127,11,NULL),(4632,127,12,NULL),(4633,127,13,NULL),(4634,127,14,NULL),(4635,127,15,NULL),(4636,127,16,NULL),(4637,127,17,NULL),(4638,128,11,NULL),(4639,128,12,NULL),(4640,128,13,NULL),(4641,128,14,NULL),(4642,128,15,NULL),(4643,128,16,NULL),(4644,128,17,NULL),(4645,129,11,NULL),(4646,129,12,NULL),(4647,129,13,NULL),(4648,129,14,NULL),(4649,129,15,NULL),(4650,129,16,NULL),(4651,129,17,NULL),(4652,130,11,NULL),(4653,130,12,NULL),(4654,130,13,NULL),(4655,130,14,NULL),(4656,130,15,NULL),(4657,130,16,NULL),(4658,130,17,NULL),(4659,131,11,NULL),(4660,131,12,NULL),(4661,131,13,NULL),(4662,131,14,NULL),(4663,131,15,NULL),(4664,131,16,NULL),(4665,131,17,NULL),(4666,132,11,NULL),(4667,132,12,NULL),(4668,132,13,NULL),(4669,132,14,NULL),(4670,132,15,NULL),(4671,132,16,NULL),(4672,132,17,NULL),(4673,133,11,NULL),(4674,133,12,NULL),(4675,133,13,NULL),(4676,133,14,NULL),(4677,133,15,NULL),(4678,133,16,NULL),(4679,133,17,NULL),(4680,134,11,NULL),(4681,134,12,NULL),(4682,134,13,NULL),(4683,134,14,NULL),(4684,134,15,NULL),(4685,134,16,NULL),(4686,134,17,NULL),(4687,135,11,NULL),(4688,135,12,NULL),(4689,135,13,NULL),(4690,135,14,NULL),(4691,135,15,NULL),(4692,135,16,NULL),(4693,135,17,NULL),(4694,136,11,NULL),(4695,136,12,NULL),(4696,136,13,NULL),(4697,136,14,NULL),(4698,136,15,NULL),(4699,136,16,NULL),(4700,136,17,NULL),(4701,137,11,NULL),(4702,137,12,NULL),(4703,137,13,NULL),(4704,137,14,NULL),(4705,137,15,NULL),(4706,137,16,NULL),(4707,137,17,NULL),(4708,138,11,NULL),(4709,138,12,NULL),(4710,138,13,NULL),(4711,138,14,NULL),(4712,138,15,NULL),(4713,138,16,NULL),(4714,138,17,NULL),(4715,139,11,NULL),(4716,139,12,NULL),(4717,139,13,NULL),(4718,139,14,NULL),(4719,139,15,NULL),(4720,139,16,NULL),(4721,139,17,NULL),(4722,140,11,NULL),(4723,140,12,NULL),(4724,140,13,NULL),(4725,140,14,NULL),(4726,140,15,NULL),(4727,140,16,NULL),(4728,140,17,NULL),(4729,141,11,NULL),(4730,141,12,NULL),(4731,141,13,NULL),(4732,141,14,NULL),(4733,141,15,NULL),(4734,141,16,NULL),(4735,141,17,NULL),(4736,142,11,NULL),(4737,142,12,NULL),(4738,142,13,NULL),(4739,142,14,NULL),(4740,142,15,NULL),(4741,142,16,NULL),(4742,142,17,NULL),(4743,143,11,NULL),(4744,143,12,NULL),(4745,143,13,NULL),(4746,143,14,NULL),(4747,143,15,NULL),(4748,143,16,NULL),(4749,143,17,NULL),(4750,144,11,NULL),(4751,144,12,NULL),(4752,144,13,NULL),(4753,144,14,NULL),(4754,144,15,NULL),(4755,144,16,NULL),(4756,144,17,NULL),(4757,145,11,NULL),(4758,145,12,NULL),(4759,145,13,NULL),(4760,145,14,NULL),(4761,145,15,NULL),(4762,145,16,NULL),(4763,145,17,NULL),(4764,146,11,NULL),(4765,146,12,NULL),(4766,146,13,NULL),(4767,146,14,NULL),(4768,146,15,NULL),(4769,146,16,NULL),(4770,146,17,NULL),(4771,147,11,NULL),(4772,147,12,NULL),(4773,147,13,NULL),(4774,147,14,NULL),(4775,147,15,NULL),(4776,147,16,NULL),(4777,147,17,NULL),(4778,148,11,NULL),(4779,148,12,NULL),(4780,148,13,NULL),(4781,148,14,NULL),(4782,148,15,NULL),(4783,148,16,NULL),(4784,148,17,NULL),(4785,149,11,NULL),(4786,149,12,NULL),(4787,149,13,NULL),(4788,149,14,NULL),(4789,149,15,NULL),(4790,149,16,NULL),(4791,149,17,NULL),(4792,150,11,NULL),(4793,150,12,NULL),(4794,150,13,NULL),(4795,150,14,NULL),(4796,150,15,NULL),(4797,150,16,NULL),(4798,150,17,NULL),(4799,151,11,NULL),(4800,151,12,NULL),(4801,151,13,NULL),(4802,151,14,NULL),(4803,151,15,NULL),(4804,151,16,NULL),(4805,151,17,NULL),(4806,152,11,NULL),(4807,152,12,NULL),(4808,152,13,NULL),(4809,152,14,NULL),(4810,152,15,NULL),(4811,152,16,NULL),(4812,152,17,NULL),(4813,153,11,NULL),(4814,153,12,NULL),(4815,153,13,NULL),(4816,153,14,NULL),(4817,153,15,NULL),(4818,153,16,NULL),(4819,153,17,NULL),(4820,1,18,2),(4821,1,19,2),(4822,1,20,1),(4823,1,21,3),(4824,1,22,2),(4825,1,23,1),(4826,1,24,2),(4827,2,18,2),(4828,2,19,2),(4829,2,20,1),(4830,2,21,3),(4831,2,22,2),(4832,2,23,1),(4833,2,24,2),(4834,3,18,2),(4835,3,19,2),(4836,3,20,1),(4837,3,21,3),(4838,3,22,2),(4839,3,23,1),(4840,3,24,2),(4841,4,18,2),(4842,4,19,2),(4843,4,20,1),(4844,4,21,3),(4845,4,22,2),(4846,4,23,1),(4847,4,24,2),(4848,5,18,2),(4849,5,19,2),(4850,5,20,1),(4851,5,21,3),(4852,5,22,2),(4853,5,23,1),(4854,5,24,2),(4855,6,18,2),(4856,6,19,2),(4857,6,20,1),(4858,6,21,3),(4859,6,22,2),(4860,6,23,1),(4861,6,24,2),(4862,7,18,2),(4863,7,19,2),(4864,7,20,1),(4865,7,21,3),(4866,7,22,2),(4867,7,23,1),(4868,7,24,2),(4869,8,18,2),(4870,8,19,2),(4871,8,20,1),(4872,8,21,3),(4873,8,22,2),(4874,8,23,1),(4875,8,24,2),(4876,9,18,2),(4877,9,19,2),(4878,9,20,1),(4879,9,21,3),(4880,9,22,2),(4881,9,23,1),(4882,9,24,2),(4883,10,18,2),(4884,10,19,2),(4885,10,20,1),(4886,10,21,3),(4887,10,22,2),(4888,10,23,1),(4889,10,24,2),(4890,11,18,2),(4891,11,19,2),(4892,11,20,1),(4893,11,21,3),(4894,11,22,2),(4895,11,23,1),(4896,11,24,2),(4897,12,18,2),(4898,12,19,2),(4899,12,20,1),(4900,12,21,3),(4901,12,22,2),(4902,12,23,1),(4903,12,24,2),(4904,13,18,2),(4905,13,19,2),(4906,13,20,1),(4907,13,21,3),(4908,13,22,2),(4909,13,23,1),(4910,13,24,2),(4911,14,18,2),(4912,14,19,2),(4913,14,20,1),(4914,14,21,3),(4915,14,22,2),(4916,14,23,1),(4917,14,24,2),(4918,15,18,2),(4919,15,19,2),(4920,15,20,1),(4921,15,21,3),(4922,15,22,2),(4923,15,23,1),(4924,15,24,2),(4925,16,18,2),(4926,16,19,2),(4927,16,20,1),(4928,16,21,3),(4929,16,22,2),(4930,16,23,1),(4931,16,24,2),(4932,17,18,2),(4933,17,19,2),(4934,17,20,1),(4935,17,21,3),(4936,17,22,2),(4937,17,23,1),(4938,17,24,2),(4939,18,18,2),(4940,18,19,2),(4941,18,20,1),(4942,18,21,3),(4943,18,22,2),(4944,18,23,1),(4945,18,24,2),(4946,19,18,2),(4947,19,19,2),(4948,19,20,1),(4949,19,21,3),(4950,19,22,2),(4951,19,23,1),(4952,19,24,2),(4953,20,18,2),(4954,20,19,2),(4955,20,20,1),(4956,20,21,3),(4957,20,22,2),(4958,20,23,1),(4959,20,24,2),(4960,21,18,2),(4961,21,19,2),(4962,21,20,1),(4963,21,21,3),(4964,21,22,2),(4965,21,23,1),(4966,21,24,2),(4967,22,18,2),(4968,22,19,2),(4969,22,20,1),(4970,22,21,3),(4971,22,22,2),(4972,22,23,1),(4973,22,24,2),(4974,23,18,2),(4975,23,19,2),(4976,23,20,1),(4977,23,21,3),(4978,23,22,2),(4979,23,23,1),(4980,23,24,2),(4981,24,18,2),(4982,24,19,2),(4983,24,20,1),(4984,24,21,3),(4985,24,22,2),(4986,24,23,1),(4987,24,24,2),(4988,25,18,2),(4989,25,19,2),(4990,25,20,1),(4991,25,21,3),(4992,25,22,2),(4993,25,23,1),(4994,25,24,2),(4995,26,18,2),(4996,26,19,2),(4997,26,20,1),(4998,26,21,3),(4999,26,22,2),(5000,26,23,1),(5001,26,24,2),(5002,27,18,2),(5003,27,19,2),(5004,27,20,1),(5005,27,21,3),(5006,27,22,2),(5007,27,23,1),(5008,27,24,2),(5009,28,18,2),(5010,28,19,2),(5011,28,20,1),(5012,28,21,3),(5013,28,22,2),(5014,28,23,1),(5015,28,24,2),(5016,29,18,2),(5017,29,19,2),(5018,29,20,1),(5019,29,21,3),(5020,29,22,2),(5021,29,23,1),(5022,29,24,2),(5023,30,18,2),(5024,30,19,2),(5025,30,20,1),(5026,30,21,3),(5027,30,22,2),(5028,30,23,1),(5029,30,24,2),(5030,31,18,2),(5031,31,19,2),(5032,31,20,1),(5033,31,21,3),(5034,31,22,2),(5035,31,23,1),(5036,31,24,2),(5037,32,18,2),(5038,32,19,2),(5039,32,20,1),(5040,32,21,3),(5041,32,22,2),(5042,32,23,1),(5043,32,24,2),(5044,33,18,2),(5045,33,19,2),(5046,33,20,1),(5047,33,21,3),(5048,33,22,2),(5049,33,23,1),(5050,33,24,2),(5051,34,18,2),(5052,34,19,2),(5053,34,20,1),(5054,34,21,3),(5055,34,22,2),(5056,34,23,1),(5057,34,24,2),(5058,35,18,2),(5059,35,19,2),(5060,35,20,1),(5061,35,21,3),(5062,35,22,2),(5063,35,23,1),(5064,35,24,2),(5065,36,18,2),(5066,36,19,2),(5067,36,20,1),(5068,36,21,3),(5069,36,22,2),(5070,36,23,1),(5071,36,24,2),(5072,37,18,2),(5073,37,19,2),(5074,37,20,1),(5075,37,21,3),(5076,37,22,2),(5077,37,23,1),(5078,37,24,2),(5079,38,18,2),(5080,38,19,2),(5081,38,20,1),(5082,38,21,3),(5083,38,22,2),(5084,38,23,1),(5085,38,24,2),(5086,39,18,2),(5087,39,19,2),(5088,39,20,1),(5089,39,21,3),(5090,39,22,2),(5091,39,23,1),(5092,39,24,2),(5093,40,18,2),(5094,40,19,2),(5095,40,20,1),(5096,40,21,3),(5097,40,22,2),(5098,40,23,1),(5099,40,24,2),(5100,41,18,2),(5101,41,19,2),(5102,41,20,1),(5103,41,21,3),(5104,41,22,2),(5105,41,23,1),(5106,41,24,2),(5107,42,18,2),(5108,42,19,2),(5109,42,20,1),(5110,42,21,3),(5111,42,22,2),(5112,42,23,1),(5113,42,24,2),(5114,43,18,2),(5115,43,19,2),(5116,43,20,1),(5117,43,21,3),(5118,43,22,2),(5119,43,23,1),(5120,43,24,2),(5121,44,18,2),(5122,44,19,2),(5123,44,20,1),(5124,44,21,3),(5125,44,22,2),(5126,44,23,1),(5127,44,24,2),(5128,45,18,2),(5129,45,19,2),(5130,45,20,1),(5131,45,21,3),(5132,45,22,2),(5133,45,23,1),(5134,45,24,2),(5135,46,18,2),(5136,46,19,2),(5137,46,20,1),(5138,46,21,3),(5139,46,22,2),(5140,46,23,1),(5141,46,24,2),(5142,47,18,2),(5143,47,19,2),(5144,47,20,1),(5145,47,21,3),(5146,47,22,2),(5147,47,23,1),(5148,47,24,2),(5149,48,18,2),(5150,48,19,2),(5151,48,20,1),(5152,48,21,3),(5153,48,22,2),(5154,48,23,1),(5155,48,24,2),(5156,49,18,2),(5157,49,19,2),(5158,49,20,1),(5159,49,21,3),(5160,49,22,2),(5161,49,23,1),(5162,49,24,2),(5163,50,18,2),(5164,50,19,2),(5165,50,20,1),(5166,50,21,3),(5167,50,22,2),(5168,50,23,1),(5169,50,24,2),(5170,51,18,2),(5171,51,19,2),(5172,51,20,1),(5173,51,21,3),(5174,51,22,2),(5175,51,23,1),(5176,51,24,2),(5177,52,18,2),(5178,52,19,2),(5179,52,20,1),(5180,52,21,3),(5181,52,22,2),(5182,52,23,1),(5183,52,24,2),(5184,53,18,2),(5185,53,19,2),(5186,53,20,1),(5187,53,21,3),(5188,53,22,2),(5189,53,23,1),(5190,53,24,2),(5191,54,18,2),(5192,54,19,2),(5193,54,20,1),(5194,54,21,3),(5195,54,22,2),(5196,54,23,1),(5197,54,24,2),(5198,55,18,2),(5199,55,19,2),(5200,55,20,1),(5201,55,21,3),(5202,55,22,2),(5203,55,23,1),(5204,55,24,2),(5205,56,18,2),(5206,56,19,2),(5207,56,20,1),(5208,56,21,3),(5209,56,22,2),(5210,56,23,1),(5211,56,24,2),(5212,57,18,2),(5213,57,19,2),(5214,57,20,1),(5215,57,21,3),(5216,57,22,2),(5217,57,23,1),(5218,57,24,2),(5219,58,18,2),(5220,58,19,2),(5221,58,20,1),(5222,58,21,3),(5223,58,22,2),(5224,58,23,1),(5225,58,24,2),(5226,59,18,2),(5227,59,19,2),(5228,59,20,1),(5229,59,21,3),(5230,59,22,2),(5231,59,23,1),(5232,59,24,2),(5233,60,18,2),(5234,60,19,2),(5235,60,20,1),(5236,60,21,3),(5237,60,22,2),(5238,60,23,1),(5239,60,24,2),(5240,61,18,2),(5241,61,19,2),(5242,61,20,1),(5243,61,21,3),(5244,61,22,2),(5245,61,23,1),(5246,61,24,2),(5247,62,18,2),(5248,62,19,2),(5249,62,20,1),(5250,62,21,3),(5251,62,22,2),(5252,62,23,1),(5253,62,24,2),(5254,63,18,2),(5255,63,19,2),(5256,63,20,1),(5257,63,21,3),(5258,63,22,2),(5259,63,23,1),(5260,63,24,2),(5261,64,18,2),(5262,64,19,2),(5263,64,20,1),(5264,64,21,3),(5265,64,22,2),(5266,64,23,1),(5267,64,24,2),(5268,65,18,2),(5269,65,19,2),(5270,65,20,1),(5271,65,21,3),(5272,65,22,2),(5273,65,23,1),(5274,65,24,2),(5275,66,18,2),(5276,66,19,2),(5277,66,20,1),(5278,66,21,3),(5279,66,22,2),(5280,66,23,1),(5281,66,24,2),(5282,67,18,2),(5283,67,19,2),(5284,67,20,1),(5285,67,21,3),(5286,67,22,2),(5287,67,23,1),(5288,67,24,2),(5289,68,18,2),(5290,68,19,2),(5291,68,20,1),(5292,68,21,3),(5293,68,22,2),(5294,68,23,1),(5295,68,24,2),(5296,69,18,2),(5297,69,19,2),(5298,69,20,1),(5299,69,21,3),(5300,69,22,2),(5301,69,23,1),(5302,69,24,2),(5303,70,18,2),(5304,70,19,2),(5305,70,20,1),(5306,70,21,3),(5307,70,22,2),(5308,70,23,1),(5309,70,24,2),(5310,71,18,2),(5311,71,19,2),(5312,71,20,1),(5313,71,21,3),(5314,71,22,2),(5315,71,23,1),(5316,71,24,2),(5317,72,18,2),(5318,72,19,2),(5319,72,20,1),(5320,72,21,3),(5321,72,22,2),(5322,72,23,1),(5323,72,24,2),(5324,73,18,2),(5325,73,19,2),(5326,73,20,1),(5327,73,21,3),(5328,73,22,2),(5329,73,23,1),(5330,73,24,2),(5331,74,18,2),(5332,74,19,2),(5333,74,20,1),(5334,74,21,3),(5335,74,22,2),(5336,74,23,1),(5337,74,24,2),(5338,75,18,2),(5339,75,19,2),(5340,75,20,1),(5341,75,21,3),(5342,75,22,2),(5343,75,23,1),(5344,75,24,2),(5345,76,18,2),(5346,76,19,2),(5347,76,20,1),(5348,76,21,3),(5349,76,22,2),(5350,76,23,1),(5351,76,24,2),(5352,77,18,2),(5353,77,19,2),(5354,77,20,1),(5355,77,21,3),(5356,77,22,2),(5357,77,23,1),(5358,77,24,2),(5359,78,18,2),(5360,78,19,2),(5361,78,20,1),(5362,78,21,3),(5363,78,22,2),(5364,78,23,1),(5365,78,24,2),(5366,79,18,2),(5367,79,19,2),(5368,79,20,1),(5369,79,21,3),(5370,79,22,2),(5371,79,23,1),(5372,79,24,2),(5373,80,18,2),(5374,80,19,2),(5375,80,20,1),(5376,80,21,3),(5377,80,22,2),(5378,80,23,1),(5379,80,24,2),(5380,81,18,2),(5381,81,19,2),(5382,81,20,1),(5383,81,21,3),(5384,81,22,2),(5385,81,23,1),(5386,81,24,2),(5387,82,18,2),(5388,82,19,2),(5389,82,20,1),(5390,82,21,3),(5391,82,22,2),(5392,82,23,1),(5393,82,24,2),(5394,83,18,2),(5395,83,19,2),(5396,83,20,1),(5397,83,21,3),(5398,83,22,2),(5399,83,23,1),(5400,83,24,2),(5401,84,18,2),(5402,84,19,2),(5403,84,20,1),(5404,84,21,3),(5405,84,22,2),(5406,84,23,1),(5407,84,24,2),(5408,85,18,2),(5409,85,19,2),(5410,85,20,1),(5411,85,21,3),(5412,85,22,2),(5413,85,23,1),(5414,85,24,2),(5415,86,18,2),(5416,86,19,2),(5417,86,20,1),(5418,86,21,3),(5419,86,22,2),(5420,86,23,1),(5421,86,24,2),(5422,87,18,2),(5423,87,19,2),(5424,87,20,1),(5425,87,21,3),(5426,87,22,2),(5427,87,23,1),(5428,87,24,2),(5429,88,18,2),(5430,88,19,2),(5431,88,20,1),(5432,88,21,3),(5433,88,22,2),(5434,88,23,1),(5435,88,24,2),(5436,89,18,2),(5437,89,19,2),(5438,89,20,1),(5439,89,21,3),(5440,89,22,2),(5441,89,23,1),(5442,89,24,2),(5443,90,18,2),(5444,90,19,2),(5445,90,20,1),(5446,90,21,3),(5447,90,22,2),(5448,90,23,1),(5449,90,24,2),(5450,91,18,2),(5451,91,19,2),(5452,91,20,1),(5453,91,21,3),(5454,91,22,2),(5455,91,23,1),(5456,91,24,2),(5457,92,18,2),(5458,92,19,2),(5459,92,20,1),(5460,92,21,3),(5461,92,22,2),(5462,92,23,1),(5463,92,24,2),(5464,93,18,2),(5465,93,19,2),(5466,93,20,1),(5467,93,21,3),(5468,93,22,2),(5469,93,23,1),(5470,93,24,2),(5471,94,18,2),(5472,94,19,2),(5473,94,20,1),(5474,94,21,3),(5475,94,22,2),(5476,94,23,1),(5477,94,24,2),(5478,95,18,2),(5479,95,19,2),(5480,95,20,1),(5481,95,21,3),(5482,95,22,2),(5483,95,23,1),(5484,95,24,2),(5485,96,18,2),(5486,96,19,2),(5487,96,20,1),(5488,96,21,3),(5489,96,22,2),(5490,96,23,1),(5491,96,24,2),(5492,97,18,2),(5493,97,19,2),(5494,97,20,1),(5495,97,21,3),(5496,97,22,2),(5497,97,23,1),(5498,97,24,2),(5499,98,18,2),(5500,98,19,2),(5501,98,20,1),(5502,98,21,3),(5503,98,22,2),(5504,98,23,1),(5505,98,24,2),(5506,99,18,2),(5507,99,19,2),(5508,99,20,1),(5509,99,21,3),(5510,99,22,2),(5511,99,23,1),(5512,99,24,2),(5513,100,18,2),(5514,100,19,2),(5515,100,20,1),(5516,100,21,3),(5517,100,22,2),(5518,100,23,1),(5519,100,24,2),(5520,101,18,2),(5521,101,19,2),(5522,101,20,1),(5523,101,21,3),(5524,101,22,2),(5525,101,23,1),(5526,101,24,2),(5527,102,18,2),(5528,102,19,2),(5529,102,20,1),(5530,102,21,3),(5531,102,22,2),(5532,102,23,1),(5533,102,24,2),(5534,103,18,2),(5535,103,19,2),(5536,103,20,1),(5537,103,21,3),(5538,103,22,2),(5539,103,23,1),(5540,103,24,2),(5541,104,18,2),(5542,104,19,2),(5543,104,20,1),(5544,104,21,3),(5545,104,22,2),(5546,104,23,1),(5547,104,24,2),(5548,105,18,2),(5549,105,19,2),(5550,105,20,1),(5551,105,21,3),(5552,105,22,2),(5553,105,23,1),(5554,105,24,2),(5555,106,18,2),(5556,106,19,2),(5557,106,20,1),(5558,106,21,3),(5559,106,22,2),(5560,106,23,1),(5561,106,24,2),(5562,107,18,2),(5563,107,19,2),(5564,107,20,1),(5565,107,21,3),(5566,107,22,2),(5567,107,23,1),(5568,107,24,2),(5569,108,18,2),(5570,108,19,2),(5571,108,20,1),(5572,108,21,3),(5573,108,22,2),(5574,108,23,1),(5575,108,24,2),(5576,109,18,2),(5577,109,19,2),(5578,109,20,1),(5579,109,21,3),(5580,109,22,2),(5581,109,23,1),(5582,109,24,2),(5583,110,18,2),(5584,110,19,2),(5585,110,20,1),(5586,110,21,3),(5587,110,22,2),(5588,110,23,1),(5589,110,24,2),(5590,111,18,2),(5591,111,19,2),(5592,111,20,1),(5593,111,21,3),(5594,111,22,2),(5595,111,23,1),(5596,111,24,2),(5597,112,18,2),(5598,112,19,2),(5599,112,20,1),(5600,112,21,3),(5601,112,22,2),(5602,112,23,1),(5603,112,24,2),(5604,113,18,2),(5605,113,19,2),(5606,113,20,1),(5607,113,21,3),(5608,113,22,2),(5609,113,23,1),(5610,113,24,2),(5611,114,18,2),(5612,114,19,2),(5613,114,20,1),(5614,114,21,3),(5615,114,22,2),(5616,114,23,1),(5617,114,24,2),(5618,115,18,2),(5619,115,19,2),(5620,115,20,1),(5621,115,21,3),(5622,115,22,2),(5623,115,23,1),(5624,115,24,2),(5625,116,18,2),(5626,116,19,2),(5627,116,20,1),(5628,116,21,3),(5629,116,22,2),(5630,116,23,1),(5631,116,24,2),(5632,117,18,2),(5633,117,19,2),(5634,117,20,1),(5635,117,21,3),(5636,117,22,2),(5637,117,23,1),(5638,117,24,2),(5639,118,18,2),(5640,118,19,2),(5641,118,20,1),(5642,118,21,3),(5643,118,22,2),(5644,118,23,1),(5645,118,24,2),(5646,119,18,2),(5647,119,19,2),(5648,119,20,1),(5649,119,21,3),(5650,119,22,2),(5651,119,23,1),(5652,119,24,2),(5653,120,18,2),(5654,120,19,2),(5655,120,20,1),(5656,120,21,3),(5657,120,22,2),(5658,120,23,1),(5659,120,24,2),(5660,121,18,2),(5661,121,19,2),(5662,121,20,1),(5663,121,21,3),(5664,121,22,2),(5665,121,23,1),(5666,121,24,2),(5667,122,18,2),(5668,122,19,2),(5669,122,20,1),(5670,122,21,3),(5671,122,22,2),(5672,122,23,1),(5673,122,24,2),(5674,123,18,2),(5675,123,19,2),(5676,123,20,1),(5677,123,21,3),(5678,123,22,2),(5679,123,23,1),(5680,123,24,2),(5681,124,18,2),(5682,124,19,2),(5683,124,20,1),(5684,124,21,3),(5685,124,22,2),(5686,124,23,1),(5687,124,24,2),(5688,125,18,2),(5689,125,19,2),(5690,125,20,1),(5691,125,21,3),(5692,125,22,2),(5693,125,23,1),(5694,125,24,2),(5695,126,18,2),(5696,126,19,2),(5697,126,20,1),(5698,126,21,3),(5699,126,22,2),(5700,126,23,1),(5701,126,24,2),(5702,127,18,2),(5703,127,19,2),(5704,127,20,1),(5705,127,21,3),(5706,127,22,2),(5707,127,23,1),(5708,127,24,2),(5709,128,18,2),(5710,128,19,2),(5711,128,20,1),(5712,128,21,3),(5713,128,22,2),(5714,128,23,1),(5715,128,24,2),(5716,129,18,2),(5717,129,19,2),(5718,129,20,1),(5719,129,21,3),(5720,129,22,2),(5721,129,23,1),(5722,129,24,2),(5723,130,18,2),(5724,130,19,2),(5725,130,20,1),(5726,130,21,3),(5727,130,22,2),(5728,130,23,1),(5729,130,24,2),(5730,131,18,2),(5731,131,19,2),(5732,131,20,1),(5733,131,21,3),(5734,131,22,2),(5735,131,23,1),(5736,131,24,2),(5737,132,18,2),(5738,132,19,2),(5739,132,20,1),(5740,132,21,3),(5741,132,22,2),(5742,132,23,1),(5743,132,24,2),(5744,133,18,2),(5745,133,19,2),(5746,133,20,1),(5747,133,21,3),(5748,133,22,2),(5749,133,23,1),(5750,133,24,2),(5751,134,18,2),(5752,134,19,2),(5753,134,20,1),(5754,134,21,3),(5755,134,22,2),(5756,134,23,1),(5757,134,24,2),(5758,135,18,2),(5759,135,19,2),(5760,135,20,1),(5761,135,21,3),(5762,135,22,2),(5763,135,23,1),(5764,135,24,2),(5765,136,18,2),(5766,136,19,2),(5767,136,20,1),(5768,136,21,3),(5769,136,22,2),(5770,136,23,1),(5771,136,24,2),(5772,137,18,2),(5773,137,19,2),(5774,137,20,1),(5775,137,21,3),(5776,137,22,2),(5777,137,23,1),(5778,137,24,2),(5779,138,18,2),(5780,138,19,2),(5781,138,20,1),(5782,138,21,3),(5783,138,22,2),(5784,138,23,1),(5785,138,24,2),(5786,139,18,2),(5787,139,19,2),(5788,139,20,1),(5789,139,21,3),(5790,139,22,2),(5791,139,23,1),(5792,139,24,2),(5793,140,18,2),(5794,140,19,2),(5795,140,20,1),(5796,140,21,3),(5797,140,22,2),(5798,140,23,1),(5799,140,24,2),(5800,141,18,2),(5801,141,19,2),(5802,141,20,1),(5803,141,21,3),(5804,141,22,2),(5805,141,23,1),(5806,141,24,2),(5807,142,18,2),(5808,142,19,2),(5809,142,20,1),(5810,142,21,3),(5811,142,22,2),(5812,142,23,1),(5813,142,24,2),(5814,143,18,2),(5815,143,19,2),(5816,143,20,1),(5817,143,21,3),(5818,143,22,2),(5819,143,23,1),(5820,143,24,2),(5821,144,18,2),(5822,144,19,2),(5823,144,20,1),(5824,144,21,3),(5825,144,22,2),(5826,144,23,1),(5827,144,24,2),(5828,145,18,2),(5829,145,19,2),(5830,145,20,1),(5831,145,21,3),(5832,145,22,2),(5833,145,23,1),(5834,145,24,2),(5835,146,18,2),(5836,146,19,2),(5837,146,20,1),(5838,146,21,3),(5839,146,22,2),(5840,146,23,1),(5841,146,24,2),(5842,147,18,2),(5843,147,19,2),(5844,147,20,1),(5845,147,21,3),(5846,147,22,2),(5847,147,23,1),(5848,147,24,2),(5849,148,18,2),(5850,148,19,2),(5851,148,20,1),(5852,148,21,3),(5853,148,22,2),(5854,148,23,1),(5855,148,24,2),(5856,149,18,2),(5857,149,19,2),(5858,149,20,1),(5859,149,21,3),(5860,149,22,2),(5861,149,23,1),(5862,149,24,2),(5863,150,18,2),(5864,150,19,2),(5865,150,20,1),(5866,150,21,3),(5867,150,22,2),(5868,150,23,1),(5869,150,24,2),(5870,151,18,2),(5871,151,19,2),(5872,151,20,1),(5873,151,21,3),(5874,151,22,2),(5875,151,23,1),(5876,151,24,2),(5877,152,18,2),(5878,152,19,2),(5879,152,20,1),(5880,152,21,3),(5881,152,22,2),(5882,152,23,1),(5883,152,24,2),(5884,153,18,2),(5885,153,19,2),(5886,153,20,1),(5887,153,21,3),(5888,153,22,2),(5889,153,23,1),(5890,153,24,2);
/*!40000 ALTER TABLE `upload_ia2` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_journal`
--

LOCK TABLES `upload_journal` WRITE;
/*!40000 ALTER TABLE `upload_journal` DISABLE KEYS */;
INSERT INTO `upload_journal` VALUES (1,NULL,10),(2,2,10),(3,8,25);
/*!40000 ALTER TABLE `upload_journal` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_majorpro`
--

LOCK TABLES `upload_majorpro` WRITE;
/*!40000 ALTER TABLE `upload_majorpro` DISABLE KEYS */;
/*!40000 ALTER TABLE `upload_majorpro` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_majorprosem`
--

LOCK TABLES `upload_majorprosem` WRITE;
/*!40000 ALTER TABLE `upload_majorprosem` DISABLE KEYS */;
INSERT INTO `upload_majorprosem` VALUES (1,10,12,12,12,12);
/*!40000 ALTER TABLE `upload_majorprosem` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_minipro`
--

LOCK TABLES `upload_minipro` WRITE;
/*!40000 ALTER TABLE `upload_minipro` DISABLE KEYS */;
INSERT INTO `upload_minipro` VALUES (2,3,'1',10);
/*!40000 ALTER TABLE `upload_minipro` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_miniproject`
--

LOCK TABLES `upload_miniproject` WRITE;
/*!40000 ALTER TABLE `upload_miniproject` DISABLE KEYS */;
INSERT INTO `upload_miniproject` VALUES (6,7,15,15,15,15),(7,3,5,5,5,5);
/*!40000 ALTER TABLE `upload_miniproject` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_miniprosem`
--

LOCK TABLES `upload_miniprosem` WRITE;
/*!40000 ALTER TABLE `upload_miniprosem` DISABLE KEYS */;
INSERT INTO `upload_miniprosem` VALUES (1,10,10,10,10,5),(2,10,25,25,25,50),(3,9,10,10,10,5);
/*!40000 ALTER TABLE `upload_miniprosem` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_oralpce`
--

LOCK TABLES `upload_oralpce` WRITE;
/*!40000 ALTER TABLE `upload_oralpce` DISABLE KEYS */;
INSERT INTO `upload_oralpce` VALUES (41,3,3),(43,2,3);
/*!40000 ALTER TABLE `upload_oralpce` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_ppt`
--

LOCK TABLES `upload_ppt` WRITE;
/*!40000 ALTER TABLE `upload_ppt` DISABLE KEYS */;
INSERT INTO `upload_ppt` VALUES (2,8,25);
/*!40000 ALTER TABLE `upload_ppt` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_presentation`
--

LOCK TABLES `upload_presentation` WRITE;
/*!40000 ALTER TABLE `upload_presentation` DISABLE KEYS */;
/*!40000 ALTER TABLE `upload_presentation` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_report`
--

LOCK TABLES `upload_report` WRITE;
/*!40000 ALTER TABLE `upload_report` DISABLE KEYS */;
INSERT INTO `upload_report` VALUES (3,8,25);
/*!40000 ALTER TABLE `upload_report` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `upload_trade`
--

LOCK TABLES `upload_trade` WRITE;
/*!40000 ALTER TABLE `upload_trade` DISABLE KEYS */;
INSERT INTO `upload_trade` VALUES (3,2,4,5),(4,8,2,25);
/*!40000 ALTER TABLE `upload_trade` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `uploadscilabpract`
--

LOCK TABLES `uploadscilabpract` WRITE;
/*!40000 ALTER TABLE `uploadscilabpract` DISABLE KEYS */;
INSERT INTO `uploadscilabpract` VALUES (1,2,10),(2,8,5);
/*!40000 ALTER TABLE `uploadscilabpract` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `user_course`
--

LOCK TABLES `user_course` WRITE;
/*!40000 ALTER TABLE `user_course` DISABLE KEYS */;
INSERT INTO `user_course` VALUES (1,5,1,7,'2023-2024','Comps',4),(2,5,2,5,'2023-2024','Comps',4),(3,5,5,5,'2023-2024','Comps',4),(6,6,8,6,'2023-2024','Comps',4),(7,5,1,7,'2024-2025','Comps',4),(8,5,9,5,'2024-2025','Comps',4),(9,5,11,6,'2023-2024','IT',6),(10,5,12,7,'2024-2025','IT',6),(11,5,13,7,'2023-2024','Comps',4);
/*!40000 ALTER TABLE `user_course` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vu1f2122110@pvppcoe.ac.in','ABCD','$2b$10$FrqL5JD5MJrkTMIkY0EW8e2O4Hyp0ANQNHepjSBQD.zXyS5FRb7mG',NULL,1,'2024-07-22 13:18:17'),(2,'shantanuvedante3@gmail.com','asjbkasjb','$2b$10$YenfvbdRmSO8lI3qKiWyfeURp4y3EJeFxIUA1Cjd2Zqc0e013IMX2',NULL,3,'2024-07-22 14:23:18'),(3,'vu1f2122042@pvppcoe.ac.in','a;lsnkdlfakn','$2b$10$vXcRCI8hqjcPlZHcLXnU6u/rnGj7mlr6zp5X0FUAprUxzbEhQk4Gi',NULL,2,'2024-07-22 15:46:17'),(5,'vu1s2223002@pvppcoe.ac.in','kjabskcj ','$2b$10$innOo3EMUMqm8wSKfDijDe7osw3K9BNaeQP6nBGT2gBe3FhiJ6V9K',NULL,2,'2024-07-26 15:59:29'),(6,'yashpimpalkar214@gmail.com','XYZ','$2b$10$.N9.wlQ/CXhRDV3dQVUDtun7jGP6jjPIRGB87KW7NcJy25Da5GT02',NULL,1,'2024-07-31 12:25:23'),(7,'yashpimpalkar@gmail.com','Yash Pimpalkar','$2b$10$uL6bjS4wdgn3dzBE3Yk.DeZUGd3YCwQUDzoo0zkloFDt.43ZMxUi6',NULL,2,'2024-10-30 18:02:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2024-11-06 17:04:03
