/*Running contracts feature*/
SELECT * FROM `Contracts` WHERE `end_date` > CURDATE ();

/*Expired contracts feature*/
SELECT * FROM `Contracts` WHERE `end_date` <= CURDATE ();

/*Stop a contract feature*/
DELETE FROM `Contracts` WHERE `id` = ?;

/*Save a contract feature*/
INSERT INTO `Contracts` (`name`, `surname`, `start_date`, `end_date`, `duration`) VALUES (?, ?, ?, ?, ?);

/*Save a mistake feature*/
INSERT INTO `Mistakes` (`contract_id`, `type`, `mdate`, `description`) VALUES (?, ?, ?, ?);

/*Bad employees feature*/
SELECT DISTINCT Contracts.id, Contracts.name, Contracts.surname FROM `Contracts` INNER JOIN `Mistakes` ON Contracts.id = Mistakes.contract_id;

/*Employee mistakes feature*/
SELECT Mistakes.id, Mistakes.type, Mistakes.mdate, Mistakes.description FROM `Mistakes` INNER JOIN `Contracts` ON Contracts.id = Mistakes.contract_id
    WHERE Mistakes.contract_id = ?;

/*Override contract feature*/
UPDATE `Contracts` SET `start_date` = ?, `end_date` = ?, `duration` = ? WHERE `id` = ?;

/*Sign up feature*/
INSERT INTO `Administrators` (`pseudo`, `email`, `password`) VALUES (?, ?, ?);

/*Sign in feature*/
SELECT `email`, `password` FROM `Administrators` WHERE `password` = ? AND (`pseudo` = ? OR `email` = ?);
