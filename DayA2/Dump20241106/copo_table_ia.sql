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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-06 16:23:29
