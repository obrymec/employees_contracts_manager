/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com/
* @fileoverview The back-end controller to manage the client requests.
* @author Obrymec - obrymecsprinces@gmail.com
* @file controller.js
* @created 2022-02-03
* @updated 2023-12-22
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
 * @description Returns all expired
 * 	contracts.
 * @param {!Function} result Called
 * 	when the query is done with
 * 	errors or not.
 * @function get_expired_contracts
 * @public
 * @returns {void} void
 */
module.exports.get_expired_contracts = (
	result => pool.query (`
		SELECT *
		FROM \`Contracts\`
		WHERE \`end_date\` <= CURDATE ();
	`, (error, response) => {
		// Whether some error(s)
		// have been detected.
		if (error) {
			// Sends an error
			// message.
			result ({
				status: 500,
				message: `
					Request failed. Unable to
					get expired contracts.
					Try Again !
				`
			});
		// Otherwise.
		} else {
			// Sends the response.
			result ({
				data: response,
				status: 200
			});
		}
	})
);

/**
 * @description Returns all running
 * 	contracts.
 * @param {!Function} result Called
 * 	when the query is done with
 * 	errors or not.
 * @function get_running_contracts
 * @returns {void} void
 */
module.exports.get_running_contracts = (
	result => pool.query (`
		SELECT * FROM \`Contracts\`
		WHERE \`end_date\` > CURDATE ();
	`, (error, response) => {
		// Whether some error(s)
		// have been detected.
		if (error) {
			// Sends an error
			// message.
			result ({
				status: 500,
				message: `
					Request failed. Unable to
					get running contracts.
					Try Again !
				`
			});
		// Otherwise.
		} else {
			// Sends the response.
			result ({
				data: response,
				status: 200
			});
		}
	})
);

/**
 * @description Parses the start
 * 	and end dates.
 * @param {{
 * 	sdate: String,
 * 	edate: String
 * }} data The start and end
 * dates.
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
 * @description Returns all bads
 * 	employees.
 * @param {!Function} result
 * 	Called when the query is
 * 	done with errors or not.
 * @function get_bad_employees
 * @public
 * @returns {void} void 
 */
module.exports.get_bad_employees = (
	result => {
		// The sql request to
		// get bads employees.
		const select = `
			SELECT DISTINCT
				Contracts.id,
				Contracts.name,
				Contracts.surname
			FROM \`Contracts\`
			INNER JOIN \`Mistakes\`
			ON Contracts.id = Mistakes.contract_id;
		`;
		// Loads all bads
		// employees.
		pool.query (select, (
			error, response
		) => {
			// Whether some error(s)
			// have been detected.
			if (error) {
				// Sends an error
				// message.
				result ({
					status: 500,
					message: `
						Request failed. Unable to
						get offending employees.
						Try Again !
					`
				});
			// Otherwise.
			} else {
				// Sends the response.
				result ({
					data: response,
					status: 200
				});
			}
		});
	}
);

/**
 * @description Sends all employee's
 * 	mistakes.
 * @param {{id: int}} data The request
 * 	data.
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
				message: `
					No employees have
					been chosen.
				`
			});
		// Otherwise.
		} else {
			// The sql request to get
			// employee mistakes.
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
						// Sends an error
						// message.
						result ({
							status: 500,
							message: `
								Request failed. Unable to
								get employee's misconducts
								Try Again !
							`
						});
					// Otherwise.
					} else {
						// Sends the response.
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

/**
 * @description Manages user gmail data
 * 	sender.
 * @param {Object<String, any>} data
 * 	The request's data.
 * @param {!Function} result Called
 * 	when the query is done with
 * 	errors or not.
 * @function send_mail
 * @public
 * @returns {void} void
 */
module.exports.send_gmail = (
	data, result
) => {
	// Creates a transporter
	// for Gmail sending.
	mailer.create_transporter (
		mailer.Services.GMAIL,
		data.source,
		"diosine98"
	);
	// checks whether app is
	// correctly connected to
	// the passed transporter.
	mailer.check_transporter (
		() => {
			// Sends the current
			// data to the target
			// user google account.
			mailer.send_mail ({
				from: data.source,
				to: data.address,
				html: data.html,
				subject: `
					List of completed
					contract(s).
				`,
				failed: () => (
					result ({
						status: 500,
						message: `
							Unable to send information
							via Gmail on the account
							located at: ${
								data.address
							}. Please check the
							credentials.
						`
					})
				),
				success: () => (
					result ({
						status: 200,
						message: `
							The completed contract(s)
							have indeed been sent by
							Gmail on the account
							located at: ${
								data.address
							}. Please check your
							Google mailbox to see
							the data(s) sent.
						`
					})
				)
			});
		},
		() => (
			result ({
				status: 500,
				message: `
					The application has difficulty
					sending information via Gmail
					on the account located at: ${
						data.address
					}.
				`
			})
		)
	);
}

/**
 * @description Stops the given
 * 	employee contract.
 * @param {{id: int}} data The
 * 	employee's id.
 * @param {!Function} result
 * 	Called when the query is
 * 	done with errors or not.
 * @function stop_contract
 * @public
 * @returns {void} void
 */
module.exports.stop_contract = (
	data, result
) => {
	// Converts the given id
	// into an integer and
	// checks entry.
	data.id = parseInt (data.id);
	// Whether no employee
	// has been chosen.
	if (data.id <= -1) {
		// Sends an error
		// message.
		result ({
			status: 500,
			message: `
				No employee has
				been chosen.
			`
		});
	// Otherwise.
	} else {
		// Deletes all associated
		// mistakes of the given
		// contract.
		pool.query (`
			DELETE FROM \`Mistakes\`
			WHERE \`contract_id\` = ?;
		`, [data.id], (
			error, _
		) => {
			// Whether some error(s)
			// have been detected.
			if (error) {
				// Sends an error
				// message.
				result ({
					status: 500,
					message: `
						Request failed. Unable
						to stop this contract.
						Try Again !
					`
				});
			// Otherwise.
			} else {
				// Deletes the current
				// employee contract.
				pool.query (`
					DELETE FROM \`Contracts\`
					WHERE \`id\` = ?;
				`,
				[data.id], (error, _) => {
					// Whether some error(s)
					// have been detected.
					if (error) {
						// Sends an error
						// message.
						result ({
							status: 500,
							message: `
								Request failed. Unable
								to stop this contract.
								Try Again !
							`
						});
					// Otherwise.
					} else {
						// Sends a success
						// message.
						result ({
							status: 200,
							message: `
								The contract was
								successfully
								stoped.
							`
						});
					}
				});
			}
		});
	}
}

/**
 * @description Adds an employee mistake.
 * @param {Object<String, any>} data
 * 	The request's data.
 * @param {!Function} result Called
 * 	when the query is done with
 * 	errors or not.
 * @function save_mistake
 * @public
 * @returns {void} void
 */
module.exports.save_mistake = (
	data, result
) => {
	// Whether one of these
	// entries aren't valid.
	if (
		data.contract_id.toLowerCase ()
			.includes ("none") ||
		data.description.length === 0 ||
		data.date.length === 0
	) {
		// Sends an error
		// message.
		result ({
			status: 500,
			message: `
				Some field(s)
				are empty.
			`
		});
	// Otherwise.
	} else {
		// The SQL request for
		// adding a new mistake
		// to an employee.
		const insert = `
			INSERT INTO \`Mistakes\` (
				\`contract_id\`,
				\`type\`,
				\`mdate\`,
				\`description\`
			) VALUES (?, ?, ?, ?);
		`;
		// Adds the current
		// employee mistake
		// into database.
		pool.query (
			insert, [
				parseInt (data.contract_id),
				data.type,
				data.date,
				data.description
			], (err, _) => {
				// Whether some error(s)
				// have been detected.
				if (err) {
					// Sends an error
					// message.
					result ({
						status: 500,
						message: `
							Request failed. Unable
							to save this mistake.
							Try Again !
						`
					});
				// Otherwise.
				} else {
					// Sends a success
					// message.
					result ({
						status: 200,
						message: `
							Fault registration
							completed successfully !
						`
					});
				}
			}
		);
	}
}

/**
 * @description Sign in operation.
 * @param {Object<String, any>} data
 * 	The request's data.
 * @param {!Function} result Called
 * 	when the query is done with
 * 	errors or not.
 * @function sign_in
 * @public
 * @returns {void} void
 */
module.exports.sign_in = (
	data, result
) => {
	// Whether one of these
	// entries aren't valid.
	if (
		data.password.length === 0 ||
		data.id.length === 0
	) {
		// Sends the success
		// message.
		result ({
			status: 500,
			message: `
				Some field(s)
				are empty.
			`
		});
	// Otherwise.
	} else {
		// The sql request for
		// checking an existing
		// administrator into
		// the database.
		const check = `
			SELECT \`email\`, \`password\`
			FROM \`Administrators\`
			WHERE \`password\` = ?
			AND (\`pseudo\` = ? OR \`email\` = ?)
			LIMIT 1;
		`;
		// This given administrator
		// is it already exists on
		// the database ?
		pool.query (
			check, [
				data.password,
				data.id,
				data.id
			], (
				error, response
			) => {
				// whether some error(s)
				// have been detected.
				if (error) {
					// Sends an error
					// message.
					result ({
						status: 500,
						message: `
							Something wrong.
							Try Again !
						`
					});
				// Otherwise.
				} else {
					// Wether the current
					// administrator is
					// already exists.
					if (response.length) {
						// Sends a success
						// message.
						result ({
							server_data: response[0],
							status: 200,
							message: `
								Connection
								successful !
							`
						});
					// Otherwise.
					} else {
						// Sends an error
						// message.
						result ({
							status: 500,
							message: `
								The identifiers
								given are invalid.
							`
						});
					}
				}
			}
		);
	}
}

/**
 * @description Overrides a contract.
 * @param {Object<String, any>} data
 * 	The request's data.
 * @param {!Function} result Called
 * 	when the query is done with
 * 	errors or not.
 * @function override_contract
 * @public
 * @returns {void} void
 */
module.exports.override_contract = (
	data, result
) => {
	// Converts the passed
	// id into an integer.
	data.id = parseInt (data.id);
	// Whether one of these
	// entries aren't valid.
	if (
		data.edate.length === 0 ||
		data.sdate.length === 0 ||
		data.time.length == 0 ||
		data.id <= -1
	) {
		// Sends an error message.
		result ({
			status: 500,
			message: `
				Some field(s)
				are empty.
			`
		});
	// Otherwise.
	} else {
		// Parses the passed dates.
		const dates = parse_dates_ (
			data
		);
		// Whether the start date
		// is bigger than the end
		// date.
		if (dates[0] >= dates[1]) {
			// Sends a warn
			// message.
			result ({
				status: 500,
				message: `
					The start date must
					be less than the
					end date.
				`
			});
		// Otherwise.
		} else {
			// The sql request for
			// updating the target
			// expired contract.
			const update = `
				UPDATE \`Contracts\`
				SET
					\`start_date\` = ?,
					\`end_date\` = ?,
					\`duration\` = ?
				WHERE \`id\` = ?;
			`;
			// Overrides the passed
			// expired contract.
			pool.query (update, [
				data.sdate,
				data.edate,
				data.time,
				parseInt (data.id)
			], (err, _) => {
				// Whether some error(s)
				// have been detected.
				if (err) {
					// Sends an error
					// message.
					result ({
						status: 500,
						message: `
							Request failed. Unable to
							override this contract.
							Try Again !
						`
					});
				// Otherwise.
				} else {
					// Sends a success
					// message.
					result ({
						status: 200,
						message: `
							Contract renewal
							successfully
							completed !
						`
					});
				}
			});
		}
	}
}

/**
 * @description Adds a contract into
 * 	a remote database.
 * @param {Object<String, any>} data
 * 	The request's data.
 * @param {!Function} result Called
 * 	when the query is done with
 * 	errors or not.
 * @function save_contract
 * @public
 * @returns {void} void
 */
module.exports.save_contract = (
	data, result
) => {
	// Whether one of these
	// entries aren't valid.
	if (
		data.surname.length === 0 ||
		data.edate.length === 0 ||
		data.sdate.length === 0 ||
		data.name.length === 0 ||
		data.time.length == 0
	) {
		// Sends an error message.
		result ({
			status: 500,
			message: `
				Some field(s)
				are empty.
			`
		});
	// Otherwise.
	} else {
		// Parses the passed dates.
		const dates = parse_dates_ (
			data
		);
		// Whether the start date
		// is bigger than the end
		// date.
		if (dates[0] >= dates[1]) {
			// Sends an error
			// message.
			result ({
				status: 500,
				message: `
					The start date must
					be less than the
					end date.
				`
			});
		// Otherwise.
		} else {
			// The given contract is
			// it already exists on
			// the database ?
			pool.query (`
				SELECT \`name\`, \`surname\`
				FROM Contracts
				WHERE \`name\` = ? AND \`surname\` = ?
				LIMIT 0, 1;
			`, [
				data.name, data.surname
			], (error, response) => {
				// Whether some error(s)
				// have been detected.
				if (error) {
					// Sends an error
					// message.
					result ({
						status: 500,
						message: `
							Something wrong.
							Try Again !
						`
					});
				// Otherwise.
				} else {
					// Whether the current
					// employee contract
					// is already exists.
					if (response.length) {
						// Sends a warn message.
						result ({
							status: 500,
							message: `
								This employee is
								already under a
								contract.
							`
						});
					// Otherwise.
					} else {
						// The sql request for
						// adding a new contract.
						const insert = `
							INSERT INTO \`Contracts\` (
								\`name\`,
								\`surname\`,
								\`start_date\`,
								\`end_date\`,
								\`duration\`
							) VALUES (?, ?, ?, ?, ?);
						`;
						// Adds the given
						// contract data
						// into database.
						pool.query (insert, [
							data.name,
							data.surname,
							data.sdate,
							data.edate,
							data.time
						], (err, _) => {
							// Whether some error(s)
							// have been detected.
							if (err) {
								// Sends an error
								// message.
								result ({
									status: 500,
									message: `
										Request failed. Unable
										to save this contract.
										Try Again !
									`
								});
							// Otherwise.
							} else {
								// Sends a success
								// message.
								result ({
									status: 200,
									message: `
										Contract registration
										successfully
										completed !
									`
								});
							}
						});
					}
				}
			});
		}
	}
}

/**
 * @description Sign up operation.
 * @param {Object<String, any>} data
 * 	The request's data.
 * @param {!Function} result Called
 * 	when the query is done with
 * 	errors or not.
 * @function sign_up
 * @public
 * @returns {void} void
 */
module.exports.sign_up = (
	data, result
) => {
	// Whether one of these
	// entries aren't valid.
	if (
		data.username.length === 0 ||
		data.password.length === 0 ||
		data.confirm.length === 0 ||
		data.email.length === 0
	) {
		// Sends an error message.
		result ({
			status: 500,
			message: `
				Some field(s)
				are empty.
			`
		});
	// Whether the given
	// username is invalid.
	} else if (
		!/^[a-zA-Z0-9_ïèéêûÊÉÈÏÛÇçæÆŒœ\.\-]*$/
			.test (data.username)
	) {
		// Sends an error message.
		result ({
			status: 500,
			message: `
				The given username
				is invalid.
			`
		});
	// Whether the passed email
	// doesn't respect standard
	// conventions.
	} else if (
		!email_validator.validate (
			data.email
		)
	) {
		// Sends an error message.
		result ({
			status: 500,
			message: `
				Your email address
				is invalid.
			`
		});
	// Whether the password
	// length is less than
	// height (08).
	} else if (
		data.password.length < 8
	) {
		// Sends an error
		// message.
		result ({
			status: 500,
			message: `
				The password must have
				least (08) characters.
			`
		});
	// Whether the passwords
	// aren't a match.
	} else if (
		data.password.length !==
		data.confirm.length
	) {
		// Sends an error
		// message.
		result ({
			status: 500,
			message: `
				You have not correctly
				confirmed your password.
			`
		});
	// Otherwise.
	} else {
		// The SQL request for
		// checking an existing
		// administrator into
		// the database.
		const check = `
			SELECT * FROM \`Administrators\`
			WHERE \`pseudo\` = ? OR \`email\` = ?
			LIMIT 1;
		`;
		// This given administrator
		// is it already exists on
		// the database ?
		pool.query (check, [
			data.username, data.email
		], (error, response) => {
			// Whether some error(s)
			// have been detected.
			if (error) {
				// Sends an error
				// message.
				result ({
					status: 500,
					message: `
						Something wrong.
						Try Again !
					`
				});
			// Otherwise.
			} else {
				// The SQL request for
				// adding a new app
				// administrator.
				const insert = `
					INSERT INTO \`Administrators\` (
						\`pseudo\`,
						\`email\`,
						\`password\`
					) VALUES (?, ?, ?);
				`;
				// Whether the current
				// administrator is
				// already exists.
				if (response.length) {
					// Sends a warn
					// message.
					result ({
						status: 500,
						message: `
							The informed user is
							already registered
							on the platform.
						`
					});
				// Otherwise.
				} else {
					// Tries to sign up the
					// passed employee.
					pool.query (insert, [
						data.username,
						data.email,
						data.password
					], (err, _) => {
						// Whether some error(s)
						// have been detected.
						if (err) {
							// Sends an error
							// message.
							result ({
								status: 500,
								message: `
									Request failed. We have
									some difficulties to
									sign up you. Try Again !
								`
							});
						// Otherwise.
						} else {
							// Sends a success
							// message.
							result ({
								status: 200,
								message: `
									Successful
									registration !
								`
							});
						}
					});
				}
			}
		});
	}
}
