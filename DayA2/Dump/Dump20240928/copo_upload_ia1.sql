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
-- Table structure for table `upload_ia1`
--

DROP TABLE IF EXISTS `upload_ia1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_ia1` (
  `idupload_ia1` int NOT NULL AUTO_INCREMENT,
  `user_course_id` int DEFAULT NULL,
  `roll_no` varchar(45) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `q1_a` int DEFAULT NULL,
  `q1_b` int DEFAULT NULL,
  `q1_c` int DEFAULT NULL,
  `q2` int DEFAULT NULL,
  `q3` int DEFAULT NULL,
  `q4` int DEFAULT NULL,
  `q5` int DEFAULT NULL,
  `cos` int DEFAULT NULL,
  PRIMARY KEY (`idupload_ia1`),
  KEY `user_course_idx_idx` (`user_course_id`),
  KEY `cos_foreignkey_idx` (`cos`),
  CONSTRAINT `cos_foreignkey` FOREIGN KEY (`cos`) REFERENCES `co_ia` (`idco_ia`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_course_idx` FOREIGN KEY (`user_course_id`) REFERENCES `user_course` (`usercourse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upload_ia1`
--

LOCK TABLES `upload_ia1` WRITE;
/*!40000 ALTER TABLE `upload_ia1` DISABLE KEYS */;
/*!40000 ALTER TABLE `upload_ia1` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-28  0:59:02
