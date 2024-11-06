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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-06 16:23:33
