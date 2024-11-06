CREATE DEFINER=`root`@`localhost` TRIGGER `after_insert_ia2` AFTER INSERT ON `ia2_attainment` FOR EACH ROW BEGIN
     call calculate_combined_attainment();
END