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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-14  1:23:24
