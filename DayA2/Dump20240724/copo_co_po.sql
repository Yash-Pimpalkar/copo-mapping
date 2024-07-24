-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: copo
-- ------------------------------------------------------
-- Server version	8.0.38

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
-- Table structure for table `co_po`
--

DROP TABLE IF EXISTS `co_po`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_po` (
  `co_po_id` int NOT NULL AUTO_INCREMENT,
  `co_id` int NOT NULL,
  `po_1` int DEFAULT NULL,
  `po_2` int DEFAULT NULL,
  `po_3` int DEFAULT NULL,
  `po_4` int DEFAULT NULL,
  `po_5` int DEFAULT NULL,
  `po_6` int DEFAULT NULL,
  `po_7` int DEFAULT NULL,
  `po_8` int DEFAULT NULL,
  `po_9` int DEFAULT NULL,
  `po_10` int DEFAULT NULL,
  `po_11` int DEFAULT NULL,
  `po_12` int DEFAULT NULL,
  `pso_1` int DEFAULT NULL,
  `pso_2` int DEFAULT NULL,
  `pso_3` int DEFAULT NULL,
  `pso_4` int DEFAULT NULL,
  PRIMARY KEY (`co_po_id`),
  KEY `co_po_idx_idx` (`co_id`),
  CONSTRAINT `co_po_idx` FOREIGN KEY (`co_id`) REFERENCES `cos` (`idcos`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `co_po`
--

LOCK TABLES `co_po` WRITE;
/*!40000 ALTER TABLE `co_po` DISABLE KEYS */;
/*!40000 ALTER TABLE `co_po` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-24 10:51:10
