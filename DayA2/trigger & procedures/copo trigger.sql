CREATE DEFINER=`root`@`localhost` TRIGGER `after_cos_insert` AFTER INSERT ON `cos` FOR EACH ROW BEGIN
  INSERT INTO co_po (co_id) VALUES (NEW.idcos);
END