/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com/
* @fileoverview The back-end controller to manage the client requests.
* @author Obrymec - obrymecsprinces@gmail.com
* @file controller.js
* @created 2022-02-03
* @updated 2023-11-26
* @supported DESKTOP
* @version 0.0.2
*/

// Attributes.
const mysql = require ("mysql");
const email_validator = (
	require ("email-validator")
);
const mailer = (
	require ("./mail_sender.js")
);
const pool = mysql.createPool ({
	database: "emp_contracts006",
	multipleStatements: true,
	password: "root1234",
  host: "db4free.net",
	user: "emp_root006",
	port: 3306
});

/**
 * @description Parses the
 * 	start and end dates.
 * @param {{
 * 	sdate: String,
 * 	edate: String
 * }} data The start
 * 	and end dates.
 * @function parse_dates_
 * @private {Function}
 * @returns {Array<Date>} Array
 */
function parse_dates_ (data) {
	// Gets the start date.
	let sdate = (
		data.sdate.split ('-')
	);
	// Gets the end date.
	let edate = (
		data.edate.split ('-')
	);
	// Gets start date object.
	sdate = new Date (
		parseInt (sdate[0]),
		parseInt (sdate[1]),
		parseInt (sdate[2])
	);
	// Gets end date object.
	edate = new Date (
		parseInt (edate[0]),
		parseInt (edate[1]),
		parseInt (edate[2])
	);
	// Returns the final
	// resultss.
	return [sdate, edate];
}

/**
 * @description Sends all
 * 	employee's mistakes.
 * @param {{
 * 	id: int
 * }} data The request data.
 * @param {{
 * 	message?: String,
 * 	response?: any, 
 * 	status: int
 * }} result The response results.
 * @function get_employee_mistakes
 * @public
 * @returns {void} void
 */
module.exports.get_employee_mistakes = (
	(data, result) => {
		// Converts the given
		// id into an integer.
		data.id = parseInt (
			data.id
		);
		// Whether the given
		// id is invalid.
		if (data.id <= -1) {
			// No chosen employee.
			result ({
				status: 500,
				message: (
					"No employees have been chosen."
				)
			});
		// Otherwise.
		} else {
			// Contains a sql request
			// to get employee mistakes.
			let select = `
				SELECT
					Mistakes.id,
					Mistakes.type,
					Mistakes.mdate,
					Mistakes.description
				FROM \`Mistakes\`
				INNER JOIN \`Contracts\`
				ON Contracts.id = Mistakes.contract_id
				WHERE Mistakes.contract_id = ?;
			`;
			// Loads employee's
			// mistakes.
			pool.query (
				select, [data.id],
				(error, response) => {
					// Whether there are
					// some errors.
					if (error) {
						// Request failed.
						result ({
							status: 500,
							message: (
								"Request failed. Try Again !"
							)
						});
					// Otherwise.
					} else {
						// Request success.
						result ({
							data: response,
							status: 200
						});
					}
				}
			);
		}
	}
);

// Returns all bads employees.
/**
 * 
 * @param {*} result 
 */
module.exports.get_bad_employees = result => {
    // Contains a sql request to get bads employees.
    let select = "SELECT DISTINCT Contracts.id, Contracts.name, Contracts.surname FROM `Contracts` INNER JOIN `Mistakes` ON Contracts.id = Mistakes.contract_id;";
    // Loads all bads employees.
    pool.query (select, (error, response) => {
        // Some error(s) have been detected.
        if (error) result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));
        // Otherwise.
        else result (new Object ({status: 200, data: response}));
    });
}

// Returns all expired contracts.
module.exports.get_expired_contracts = result => pool.query ("SELECT * FROM `Contracts` WHERE `end_date` <= CURDATE ();", (error, response) => {
    // Some error(s) have been detected.
    if (error) result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));
    // Otherwise.
    else result (new Object ({status: 200, data: response}));
});

// Returns all running contracts.
module.exports.get_running_contracts = result => pool.query ("SELECT * FROM `Contracts` WHERE `end_date` > CURDATE ();", (error, response) => {
    // Some error(s) have been detected.
    if (error) result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));
    // Otherwise.
    else result (new Object ({status: 200, data: response}));
});

// Stops the given employee contract.
module.exports.stop_contract = (data, result) => {
    // Converts the given id into an integer and checks entry.
    data.id = parseInt (data.id); if (data.id <= -1) result (new Object ({message: "Aucun employé n'a été choisi.", status: 500}));
    // Otherwise.
    else {
        // Deletes all associated mistakes of the given contract.
        pool.query ("DELETE FROM `Mistakes` WHERE `contract_id` = ?;", [data.id], (error, response) => {
            // Some error(s) have been detected.
            if (error) {console.log (error); result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));}
            // Deletes the current employee contract.
            else pool.query ("DELETE FROM `Contracts` WHERE `id` = ?;", [data.id], (error, response) => {
                // Some error(s) have been detected.
                if (error) {console.log (error); result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));}
                // Otherwise.
                else result (new Object ({status: 200, message: "Le contrat a été arrêté avec succès."}));
            });
        });
    }
}

// Adds an employee mistake.
module.exports.save_mistake = (data, result) => {
    // Checks inputs.
    if (data.contract_id.toLowerCase ().includes ("aucun") || data.description.length === 0 || data.date.length === 0) {
        // Sends an error message.
        result (new Object ({message: "De(s) champ(s) sont vide.", status: 500}));
    // Otherwise.
    } else {
        // Contains a sql request for adding a new mistake to an employee.
        let insert = "INSERT INTO `Mistakes` (`contract_id`, `type`, `mdate`, `description`) VALUES (?, ?, ?, ?);";
        // Adds the current employee mistake into database.
        pool.query (insert, [parseInt (data.contract_id), data.type, data.date, data.description], (err, res) => {
            // Some error(s) have been detected.
            if (err) result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));
            // Otherwise.
            else result (new Object ({status: 200, message: "Enregistrement de la faute effectuée avec succès !"}));
        });
    }
}

// Adds a contract into a remote database.
module.exports.save_contract = (data, result) => {
    // Checks entries.
    if (data.name.length === 0 || data.surname.length === 0 || data.edate.length === 0 || data.sdate.length === 0 || data.time.length == 0) {
        // Sends an error message.
        result (new Object ({message: "De(s) champ(s) sont vide.", status: 500}));
    // Otherwise.
    } else {
        // Parses the passed dates and checks the given dates references.
        let dates = _parse_dates (data); if (dates [0] >= dates [1]) result (new Object ({message: "La date d'embauche doit être inférieure à celle de fin.", status: 500}));
        // The given contract is it already exists on the database ?
        else pool.query ("SELECT `name`, `surname` FROM Contracts WHERE `name` = ? AND `surname` = ? LIMIT 0, 1;", [data.name, data.surname], (error, response) => {
            // Some error(s) have been detected.
            if (error) result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));
            // Otherwise.
            else {
                // The current employee contract is already exists.
                if (response.length) result (new Object ({status: 500, message: "Ce employé est déjà sous contrat."}));
                // Otherwise.
                else {
                    // Contains a sql request for adding a new contract.
                    let insert = "INSERT INTO `Contracts` (`name`, `surname`, `start_date`, `end_date`, `duration`) VALUES (?, ?, ?, ?, ?);";
                    // Adds the given contract data into database.
                    pool.query (insert, [data.name, data.surname, data.sdate, data.edate, data.time], (err, res) => {
                        // Some error(s) have been detected.
                        if (err) result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));
                        // Otherwise.
                        else result (new Object ({status: 200, message: "Enregistrement du contrat effectué avec succès !"}));
                    });
                }
            }
        });
    }
}

// Overrides a contract.
module.exports.override_contract = (data, result) => {
    // Checks entries.
    data.id = parseInt (data.id); if (data.id <= -1 || data.edate.length === 0 || data.sdate.length === 0 || data.time.length == 0) {
        // Sends an error message.
        result (new Object ({message: "De(s) champ(s) sont vide.", status: 500}));
    // Otherwise.
    } else {
        // Parses the passed dates and checks the given dates references.
        let dates = _parse_dates (data); if (dates [0] >= dates [1]) result (new Object ({message: "La date d'embauche doit être inférieure à celle de fin.", status: 500}));
        // Otherwise.
        else {
            // Contains a sql request for updating the target expired contract.
            let update = "UPDATE `Contracts` SET `start_date` = ?, `end_date` = ?, `duration` = ? WHERE `id` = ?;";
            // Overrides the passed expired contract.
            pool.query (update, [data.sdate, data.edate, data.time, parseInt (data.id)], (err, res) => {
                // Some error(s) have been detected.
                if (err) result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));
                // Otherwise.
                else result (new Object ({status: 200, message: "Renouvellement du contrat effectué avec succès !"}));
            });
        }
    }
}

// Sign up operation.
module.exports.sign_up = (data, result) => {
    // Checks inputs entry.
    if (data.username.length === 0 || data.email.length === 0 || data.password.length === 0 || data.confirm.length === 0) {
        // Sends an error message.
        result (new Object ({message: "De(s) champ(s) sont vide.", status: 500}));
    // The passed email doesn't respect standard conventions.
    } else if (!email_validator.validate (data.email)) result (new Object ({status: 500, message: "Votre adresse email est invalide."}));
    // Checks password confirmation.
    else if (data.password.length !== data.confirm.length) result (new Object ({status: 500, message: "Vous n'avez pas correctement confirmer votre mot de passe."}));
    // Otherwise.
    else {
        // Contains a sql request for checking an existing administrator into the database.
        let check = "SELECT * FROM `Administrators` WHERE `pseudo` = ? OR `email` = ? LIMIT 1;";
        // This given administrator is it already exists on the database ?
        pool.query (check, [data.username, data.email], (error, response) => {
            // Some error(s) have been detected.
            if (error) result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));
            // Otherwise.
            else {
                // Contains a sql request for adding a new app administrator.
                let insert = "INSERT INTO `Administrators` (`pseudo`, `email`, `password`) VALUES (?, ?, ?);";
                // The current administrator is already exists.
                if (response.length) result (new Object ({status: 500, message: "L'utilisateur renseigné est déjà inscrit sur la platforme."}));
                // Otherwise.
                else pool.query (insert, [data.username, data.email, data.password], (err, res) => {
                    // Some error(s) have been detected.
                    if (err) result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));
                    // Otherwise.
                    else result (new Object ({status: 200, message: "Inscription réussi !"}));
                });
            }
        });
    }
}

// Sign in operation.
module.exports.sign_in = (data, result) => {
    // Checks inputs entry.
    if (data.id.length === 0 || data.password.length === 0) result (new Object ({message: "De(s) champ(s) sont vide.", status: 500}));
    // Otherwise.
    else {
        // Contains a sql request for checking an existing administrator into the database.
        let check = "SELECT `email`, `password` FROM `Administrators` WHERE `password` = ? AND (`pseudo` = ? OR `email` = ?) LIMIT 1;";
        // This given administrator is it already exists on the database ?
        pool.query (check, [data.password, data.id, data.id], (error, response) => {
            // Some error(s) have been detected.
            if (error) result (new Object ({status: 500, message: "Requête échouée. Veuillez reéssayer !"}));
            // Otherwise.
            else {
                // The current administrator is already exists.
                if (response.length) result (new Object ({status: 200, message: "Connexion réussi !", server_data: response [0]}));
                // Otherwise.
                else result (new Object ({status: 500, message: "Les identifiants donnés sont invalide."}));
            }
        });
    }
}

// Manages user gmail data sender.
module.exports.send_gmail = function send_gmail (data, result) {
	// Creates a transporter for Gmail sending and checks whether application is correctly connected to the passed transporter.
	mailer.create_transporter (mailer.Services.GMAIL, data.source, "diosine98"); mailer.check_transporter (() => {
		// Sends the current data to the target user google account.
		mailer.send_mail (new Object ({from: data.source, to: data.address, subject: "Liste de(s) contrat(s) terminé(s).", html: data.html,
			success: () => result (new Object ({status: 200, message: ("Le(s) contrat(s) terminé(s) ont bel et bien été envoyé(s) par Gmail" +
				" sur le compte se trouvant à l'adresse: " + data.address + ". Veuillez consulter votre boîte de méssagerie Google pour voire le(s) donnée(s) envoyée(s).")
			})), failed: () => result (new Object ({status: 500, message: ("Impossible d'envoyer les informations par Gmail" +
				" sur le compte se trouvant à l'adresse: " + data.address + ". Veuillez vérifier les identifiants.")
			}))
		}));
	}, () => result (new Object ({status: 500, message: ("L'application a des difficultées à envoyé les informations par Gmail" +
		" sur le compte se trouvant à l'adresse: " + data.address)
	})));
}
