/**
* @project: Employees Contracts - https://employees-contracts-manager.onrender.com/
* @fileoverview: The sql requests to handle records into the created tables.
* @author: Obrymec - obrymecsprinces@gmail.com
* @created: 2022-02-03
* @updated: 2023-11-19
* @supported: DESKTOP
* @file: features.sql
* @version: 0.0.2
*/

/* Expired contracts */
SELECT *
FROM `Contracts`
WHERE `end_date` <= CURDATE ();

/* Running contracts */
SELECT *
FROM `Contracts`
WHERE `end_date` > CURDATE ();

/* Stop a contract */
DELETE
FROM `Contracts`
WHERE `id` = ?;

/* Sign in */
SELECT `email`, `password`
FROM `Administrators`
WHERE `password` = ? AND
	(`pseudo` = ? OR `email` = ?);

/* Sign up */
INSERT INTO `Administrators` (
	`password`,
	`pseudo`,
	`email`
) VALUES (?, ?, ?);

/* Override contract */
UPDATE `Contracts`
SET `start_date` = ?,
	`end_date` = ?,
	`duration` = ?
WHERE `id` = ?;

/* Save a mistake */
INSERT INTO `Mistakes` (
	`description`,
	`contract_id`,
	`mdate`,
	`type`
) VALUES (?, ?, ?, ?);

/* Bad employees */
SELECT DISTINCT Contracts.id,
	Contracts.surname,
	Contracts.name
FROM `Contracts`
INNER JOIN `Mistakes`
ON Contracts.id = Mistakes.contract_id;

/* Save a contract */
INSERT INTO `Contracts` (
	`start_date`,
	`end_date`,
	`duration`,
	`surname`,
	`name`
) VALUES (?, ?, ?, ?, ?);

/* Employee mistakes */
SELECT Mistakes.description,
	Mistakes.mdate,
	Mistakes.type,
	Mistakes.id
FROM `Mistakes`
INNER JOIN `Contracts`
ON Contracts.id = Mistakes.contract_id
WHERE Mistakes.contract_id = ?;
