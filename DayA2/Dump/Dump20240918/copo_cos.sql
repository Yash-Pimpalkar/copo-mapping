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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cos`
--

LOCK TABLES `cos` WRITE;
/*!40000 ALTER TABLE `cos` DISABLE KEYS */;
INSERT INTO `cos` VALUES (1,1,'CO1','To acquire fundamental knowledge of developing machine learning models.','2024-07-25 21:38:58'),(2,1,'CO2','To select, apply and evaluate an appropriate machine learning model for the given ','2024-07-25 21:38:58'),(3,1,'CO3','To demonstrate ensemble techniques to combine predictions from different models. ','2024-07-25 21:38:58'),(4,1,'CO4','To demonstrate the dimensionality reduction techniques.','2024-07-25 21:38:58'),(5,3,'CO1','To acquire fundamental knowledge of developing machine learning models.','2024-07-26 16:01:01'),(10,6,'CO1','To acquire fundamental knowledge of developing machine learning models.','2024-08-01 10:51:07'),(11,6,'CO2','To select, apply and evaluate an appropriate machine learning model for the given ','2024-08-01 10:51:07'),(12,6,'CO3','sdvkaj','2024-08-01 10:51:07'),(13,6,'CO4','asfasf','2024-08-01 10:51:07'),(14,8,'CO1','To acquire fundamental knowledge of developing machine learning models.','2024-08-02 14:14:13'),(15,8,'CO2','To select, apply and evaluate an appropriate machine learning model for the given ','2024-08-02 14:14:13'),(16,8,'CO3','5bcnbcc','2024-08-02 14:14:13'),(17,8,'CO4','jhjhc','2024-08-02 14:14:13'),(18,3,'CO2','sdj',NULL),(19,3,'CO3','sddfs',NULL),(20,3,'CO4','sdfsdlka',NULL),(21,9,'CO1','SKHFSKJFH','2024-09-18 00:41:40'),(22,9,'CO2','SKFHSKJD','2024-09-18 00:41:40'),(23,9,'CO3','HFKJSD','2024-09-18 00:41:40'),(24,9,'CO4',',SFHDSKJ','2024-09-18 00:41:40'),(25,9,'CO5','JKFHDSKJ','2024-09-18 00:41:40'),(26,9,'CO6','SDJFHD','2024-09-18 00:41:40');
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-18 19:25:28
