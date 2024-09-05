DELIMITER //

CREATE TRIGGER after_insert_ia1
AFTER INSERT ON ia1_attainment
FOR EACH ROW
BEGIN
    CALL calculate_combined_attainment();
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER after_update_ia1
AFTER UPDATE ON ia1_attainment
FOR EACH ROW
BEGIN
    CALL calculate_combined_attainment();
END //

DELIMITER ;
DELIMITER //

CREATE TRIGGER after_insert_ia2
AFTER INSERT ON ia2_attainment
FOR EACH ROW
BEGIN
    CALL calculate_combined_attainment();
END //

DELIMITER ;
DELIMITER //

CREATE TRIGGER after_update_ia2
AFTER UPDATE ON ia2_attainment
FOR EACH ROW
BEGIN
    CALL calculate_combined_attainment();
END //

DELIMITER ;
