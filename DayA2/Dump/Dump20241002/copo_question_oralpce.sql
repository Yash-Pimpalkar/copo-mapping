-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: copo
-- ------------------------------------------------------
-- Server version	8.4.1

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
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_oralpce`
--

LOCK TABLES `question_oralpce` WRITE;
/*!40000 ALTER TABLE `question_oralpce` DISABLE KEYS */;
INSERT INTO `question_oralpce` VALUES (107,'GROUP DISCUSSION','CO1',10,41,3),(108,'GROUP DISCUSSION','CO3',10,41,3),(109,'GROUP DISCUSSION','CO5',10,41,3),(110,'PRESENTATION','CO2',10,41,3),(111,'PRESENTATION','CO4',10,41,3),(112,'GROUP DYNAMIC','CO3',5,41,3),(113,'GROUP DYNAMIC','CO5',5,41,3);
/*!40000 ALTER TABLE `question_oralpce` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-02  0:33:37
