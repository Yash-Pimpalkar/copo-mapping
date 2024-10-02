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
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `co_oralpce`
--

LOCK TABLES `co_oralpce` WRITE;
/*!40000 ALTER TABLE `co_oralpce` DISABLE KEYS */;
INSERT INTO `co_oralpce` VALUES (163,'CO1',3,109),(164,'CO2',3,111),(165,'CO3',3,113),(166,'CO4',3,NULL),(167,'CO5',3,NULL),(168,'CO6',3,NULL);
/*!40000 ALTER TABLE `co_oralpce` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-02  0:33:35
