CREATE DEFINER=`root`@`localhost` TRIGGER `after_update_ia2` AFTER UPDATE ON `ia2_attainment` FOR EACH ROW BEGIN
    CALL calculate_combined_attainment();
END