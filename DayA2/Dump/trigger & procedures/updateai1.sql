CREATE DEFINER=`root`@`localhost` TRIGGER `after_update_ia1` AFTER UPDATE ON `ia1_attainment` FOR EACH ROW BEGIN
    call calculate_combined_attainment();
END