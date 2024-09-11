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
  `majorid` int DEFAULT NULL,
  `scprid` int DEFAULT NULL,
  PRIMARY KEY (`twid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `termworkbase`
--

LOCK TABLES `termworkbase` WRITE;
/*!40000 ALTER TABLE `termworkbase` DISABLE KEYS */;
INSERT INTO `termworkbase` VALUES (1,'Theory only',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'Theory + Assignment - Maths',1,NULL,1,NULL,NULL,NULL,NULL,NULL),(3,'PR Internal (TW ONLY)',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'Practical having Mini Project',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Practical (10 + 10 + 5)',NULL,1,1,1,NULL,NULL,NULL,NULL),(6,'Practical (10 + 10 (Mini)+5)',NULL,1,NULL,1,NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `termworkbase` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-11 11:10:40
