/**
* @project: Employees Contracts - https://employees-contracts-manager.onrender.com
* @fileoverview: The sql requests to creates main tables.
* @author: Obrymec - obrymecsprinces@gmail.com
* @created: 2022-02-03
* @updated: 2023-11-19
* @supported: DESKTOP
* @file: tables.sql
* @version: 0.0.2
*/

/* Contracts table creation */
CREATE TABLE Contracts (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	surname VARCHAR (64) NOT NULL,
	name VARCHAR (32) NOT NULL,
	duration INTEGER DEFAULT 0,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL
) Engine = InnoDB;

/* Mistakes table creation */
CREATE TABLE Mistakes (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	description VARCHAR (255) NOT NULL,
	type VARCHAR (8) NOT NULL,
	contract_id INTEGER,
	mdate DATE NOT NULL,
	FOREIGN KEY (contract_id) REFERENCES Contracts (id)
) Engine = InnoDB;

/* Administrators table creation */
CREATE TABLE Administrators (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	password VARCHAR (64) NOT NULL,
	pseudo VARCHAR (32) NOT NULL,
	email VARCHAR (64) NOT NULL
) Engine = InnoDB;
