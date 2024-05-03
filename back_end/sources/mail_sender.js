/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com
* @fileoverview The back-end module to send a gmail.
* @author Obrymec - obrymecsprinces@gmail.com
* @file mail_sender.js
* @created 2022-02-03
* @updated 2023-12-03
* @supported DESKTOP
* @version 0.0.3
*/

/////////////////////////[Attributes and dependences]///////////////////////////
// The transporter reference.
let transporter = null;
// Loads nodemailer module
// from node modules.
const nodemailer = (
	require ("nodemailer")
);
// All availables supported
// mail service into
// nodemailer.
const availables_services = {
	GODADDY_EUROPE: "GodaddyEurope",
	ONE_HUNDRED_SIXTY_THREE: "163",
	SES_US_EAST_1: "SES-US-EAST-1",
	SES_US_WEST_2: "SES-US-WEST-2",
	SES_EU_WEST_1: "SES-EU-WEST-1",
	ONE_HUNDRED_TWENTY_SIX: "126",
	OPEN_MAIL_BOX: "OpenMailBox",
	DYNECT_EMAIL: "DynectEmail",
	GODADDY_ASIA: "GodaddyAsia",
	QIYE_ALIYUN: "qiye.aliyun",
	OUTLOOK_365: "Outlook365",
	SENDIN_BLUE: "SendinBlue",
	DEBUG_MAIL: "DebugMail",
	GANDI_MAIL: "GandiMail",
	SEND_CLOUD: "SendCloud",
	SEND_PULSE: "SendPulse",
	MAILOSAUR: "Mailosaur",
	SPARKPOST: "Sparkpost",
	SEND_GRID: "SendGrid",
	FAST_MAIL: "FastMail",
	MANDRILL: "Mandrill",
	POSTMARK: "Postmark",
	HOTMAIL: "Hotmail",
	MAIL_EE: "mail.ee",
	MAIL_RU: "Mail.ru",
	MAILDEV: "Maildev",
	MAILGUN: "Mailgun",
	MAILJET: "Mailjet",
	GODADDY: "Godaddy",
	ONE_UND1: "1und1",
	HOT_EE: "hot.ee",
	ICLOUD: "iCloud",
	YANDEX: "Yandex",
	GMAIL: "Gmail",
	NAVER: "Naver",
	YAHOO: "Yahoo",
	QQEX: "QQex",
	ZOHO: "Zoho",
	AOL: "AOL",
	SES: "SES",
	QQ: "QQ"
};

//////////////////////////////[Private methods]/////////////////////////////////
/**
 * @description Checks whether
 * 	the given service name is
 * 	supported into nodemailer
 * 	module.
 * @param {String} service The
 * 	kind of the service.
 * @function is_service_supported_
 * @private {Function}
 * @returns {boolean} boolean
 */
function is_service_supported_ (
	service
) {
	// Corrects the passed
	// service whether it's
	// a string format.
	service = (
		(typeof service === "string")
		? service.replace (/ /g, '')
		: null
	);
	// A service name has
	// been refered.
	if (service != null) {
		// Checking whether the
		// given service name
		// is supported into
		// nodemailer.
		for (
			let key of Object.keys (
				availables_services
			)
		) {
			// Whether the current
			// service is supported
			// by the module.
			if (
				service === (
					availables_services[
						key
					]
				) || service === key
			) return true;
		}
	}
	// No service found.
	console.error (
		`The given service {${
			service
		}} isn't supported in nodemailer.`
	);
	// Returns a falsy
	// value.
	return false;
}

////////////////////////////[Availables features]///////////////////////////////
// All availables services
// as a single object.
module.exports.Services = (
	availables_services
);

/**
 * @description Initializes a
 * 	transporter value.
 * @param {String} service The
 * 	service's name.
 * @param {String} user The
 * 	target user mail address.
 * @param {String} password
 * 	What is the password of
 * 	the given associated
 * 	user ?
 * @function create_transporter
 * @public
 * @returns {void} void
 */
module.exports.create_transporter = (
	function create_transporter (
		service, user, password
	) {
		// Whether the service
		// is supported.
		if (
			typeof password === "string" &&
			typeof user === "string" &&
			is_service_supported_ (
				service
			)
		) {
			// The configurations
			// for creating a
			// transporter.
			let transporter_data = {
				service: service,
				auth: {
					pass: password,
					user: user
				}
			};
			// Whether a transporter
			// is already defined.
			if (transporter == null) {
				// Creates a transporter.
				transporter = (
					nodemailer.createTransport (
						transporter_data
					)
				);
			}
		// Otherwise.
		} else {
			// Invalid entries.
			console.error (
				"Some entry(ies) are invalid."
			);
		}
	}
);

/**
 * @description Verifies whether
 * 	the passed transporter is ok
 * 	or not.
 * @param {?Function} success
 * 	Called the transporter
 * 	verification is done.
 * @param {?Function} failed
 * 	Called when the transporter
 * 	verification is failed.
 * @fires check_transporter#success
 * @fires check_transporter#failed
 * @function check_transporter
 * @public
 * @returns {void} void
 */
module.exports.check_transporter = (
	function check_transporter (
		success, failed
	) {
		// Whether a transporter
		// has been specified.
		if (transporter != null) {
			// Launches verification.
			transporter.verify ().then (
				info => {
					// Whether `success`
					// event is listening.
					if (
						typeof success ===
							"function"
					) {
						// Throws `success`
						// event.
						success (
							info, transporter
						);
					}
				}
			).catch (info => {
				// Whether `failed`
				// event is listening.
				if (
					typeof failed ===
						"function"
				) {
					// Throws `failed`
					// event.
					failed (info);
				}
			});
		// Otherwise.
		} else if (
			typeof failed ===
				"function"
		) {
			// Throws `failed`
			// event.
			failed (null);
		}
	}
);

/**
 * @description Sends a mail to
 * 	any mail address with the
 * 	given service.
 * @param {{
 * 	success?: ?Function,
 * 	failed?: ?Function,
 * 	subject: String,
 * 	from: String,
 * 	html: String,
 * 	text: String,
 * 	to: String
 * }} data The configurations
 * 	about a mail sending. This
 * 	object supports the
 * 	following keys:
 *
 * 	- String from: The sender
 * 		address.
 *
 *	- String to: The receiver(s)
 *		addresse(s).
 *
 *	- String subject: What is
 * 		the mail subject ?
 *
 *	- String html: Do you want
 *		to send a html structure ?
 *
 *	- String text: Do you want
 *		to send a simple plain
 * 		text ?
 *
 *	- Function success: Called
 *		when the mail has been
 *		sent to their(s) receiver(s)
 *		correctly.
 *
 *	- Function failed: Called
 *		when some errors have
 *		been thrown on sending
 * 		mail.
 * @fires send_mail#success
 * @fires send_mail#failed
 * @function send_mail
 * @returns {void} void
 */
module.exports.send_mail = (
	function send_mail (data) {
		// Whether the given data
		// is an objet and not
		// an array.
		if (
			!Array.isArray (data) &&
			typeof data === "object"
		) {
			// Corrects the given
			// subject.
			data.subject = (
				(
					data.hasOwnProperty (
						"subject"
					) &&
					typeof data.subject
						=== "string"
				)
				? data.subject.trim ()
				: null
			);
			// Corrects the given
			// html value.
			data.html = (
				(
					data.hasOwnProperty (
						"html"
					) &&
					typeof data.html
						=== "string"
				)
				? data.html.trim ()
				: null
			);
			// Corrects the given
			// text value.
			data.text = (
				(
					data.hasOwnProperty (
						"text"
					) &&
					typeof data.text
						=== "string"
				)
				? data.text.trim ()
				: null
			);
			// Corrects the initial
			// point.
			data.from = (
				(
					data.hasOwnProperty (
						"from"
					) &&
					typeof data.from
						=== "string"
				)
				? data.from.replace (
					/ /g, ''
				) : null
			);
			// Corrects the final
			// point(s).
			data.to = (
				(
					data.hasOwnProperty (
						"to"
					) &&
					typeof data.to
						=== "string"
				)
				? data.to.replace (
					/ /g, ''
				) : null
			);
			// Whether mail emitter
			// is really defined.
			if (
				data.from != null &&
				data.from.length
			) {
				// Whether mail recipient
				// is really defined.
				if (
					data.to != null &&
					data.to.length
				) {
					// Whether the subject
					// is really defined.
					if (
						data.subject != null &&
						data.subject.length
					) {
						// Whether the message to
						// send is really defined.
						if (
							(
								data.text != null &&
								data.text.length
							) || 
							(
								data.html != null &&
								data.html.length
							)
						) {
							// Whether the transporter
							// value is really exists.
							if (transporter != null) {
								// Sends the mail to
								// the target user.
								transporter.sendMail (
									data, function (
										error, info
									) {
										// Whether an error
										// has been detected.
										if (error) {
											// Whether `failed`
											// event is now
											// listening.
											if (
												data.hasOwnProperty (
													"failed"
												) &&
												typeof data.failed
													=== "function"
											) {
												// Throws `failed`
												// event.
												data.failed (error);
											}
										// No errors found.
										} else if (
											data.hasOwnProperty (
												"success"
											) &&
											typeof data.success
												=== "function"
										) {
											// Throws `success`
											// event.
											data.success ({
												subject: data.subject,
												text: data.text,
												from: data.from,
												html: data.html,
												details: info,
												to: data.to
											});
										}
									}
								);
							// Failed to send the
							// given message.
							} else if (
								typeof data.failed
									=== "function"
								) {
									// Throws `failed`
									// event.
									data.failed ({
										message: (
											"The mail transporter isn't defined."
										)
									});
								}
						// Otherwise.
						} else {
							// Makes a warn.
							console.error (
								"No message detected to sent."
							);
						}
					// Otherwise.
					} else {
						// Makes a warn.
						console.error (
							"The message's subject is not defined."
						);
					}
				// Otherwise.
				} else {
					// Makes a warn.
					console.error (
						"The recipient(s) addresse(s) aren't defined."
					);
				}
			// Otherwise.
			} else {
				// Makes a warn.
				console.error (
					"The emitter address is not defined."
				);
			}
		// Error message.
		} else {
			// Makes a warn.
			console.error (
				"You must use an object to configure mail sender."
			);
		}
	}
);
