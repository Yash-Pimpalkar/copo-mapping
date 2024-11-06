CREATE DEFINER=`root`@`localhost` PROCEDURE `calculate_combined_attainment`()
BEGIN
    -- Drop the temporary table if it already exists
    DROP TEMPORARY TABLE IF EXISTS temp_combined_attainment;

    -- Create a temporary table to store the combined attainment data
    CREATE TEMPORARY TABLE temp_combined_attainment AS
    SELECT coname, usercourse_id, AVG(attainment) AS average_attainment
    FROM (
        SELECT coname, usercourse_id, attainment
        FROM ia1_attainment
        UNION ALL
        SELECT coname, usercourse_id, attainment
        FROM ia2_attainment
    ) AS combined_attainment_data
    GROUP BY coname, usercourse_id;
    
    -- Update existing records in the combined_attainment table
    UPDATE combined_attainment ca
    JOIN temp_combined_attainment tca
    ON ca.coname = tca.coname AND ca.usercourse_id = tca.usercourse_id
    SET ca.average_attainment = tca.average_attainment,
        ca.attainment = CASE
            WHEN tca.average_attainment BETWEEN 0 AND 40 THEN 0
            WHEN tca.average_attainment BETWEEN 40 AND 60 THEN 1
            WHEN tca.average_attainment BETWEEN 60 AND 70 THEN 2
            WHEN tca.average_attainment > 70 THEN 3
            ELSE NULL
        END;
    
    -- Insert new records into combined_attainment where they do not already exist
    INSERT INTO combined_attainment (coname, usercourse_id, average_attainment, attainment)
    SELECT tca.coname, tca.usercourse_id, tca.average_attainment,
           CASE
               WHEN tca.average_attainment BETWEEN 0 AND 40 THEN 0
               WHEN tca.average_attainment BETWEEN 40 AND 60 THEN 1
               WHEN tca.average_attainment BETWEEN 60 AND 70 THEN 2
               WHEN tca.average_attainment > 70 THEN 3
               ELSE NULL
           END
    FROM temp_combined_attainment tca
    LEFT JOIN combined_attainment ca
    ON tca.coname = ca.coname AND tca.usercourse_id = ca.usercourse_id
    WHERE ca.coname IS NULL;
    
    -- Drop the temporary table
    DROP TEMPORARY TABLE temp_combined_attainment;
END