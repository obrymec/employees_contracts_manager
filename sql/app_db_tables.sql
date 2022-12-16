/*Contracts table creation*/
CREATE TABLE Contracts (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (32) NOT NULL,
    surname VARCHAR (64) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration INTEGER DEFAULT 0
) Engine = InnoDB;

/*Mistakes table creation*/
CREATE TABLE Mistakes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    contract_id INTEGER,
    type VARCHAR (8) NOT NULL,
    mdate DATE NOT NULL,
    description VARCHAR (255) NOT NULL,
    FOREIGN KEY (contract_id) REFERENCES Contracts (id)
) Engine = InnoDB;

/*Administrators table creation*/
CREATE TABLE Administrators (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    pseudo VARCHAR (32) NOT NULL,
    email VARCHAR (64) NOT NULL,
    password VARCHAR (64) NOT NULL
) Engine = InnoDB;
