/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com/
* @fileoverview The base module for all features in front-end.
* @author Obrymec - obrymecsprinces@gmail.com
* @file basics_tools.js
* @created 2022-02-03
* @updated 2023-12-03
* @supported DESKTOP
* @version 0.0.2
*/

/**
 * @description Checks whether
 * 	a variable is undefined or
 * 	`null`.
 * @param {any} attr The input
 * 	value.
 * @function is_empty
 * @public
 * @returns {boolean} boolean
 */
function is_empty (attr) {
	// Returns the final result.
	return (
		String (attr).trim ().length === 0 ||
		attr === "undefined" ||
		attr === undefined ||
		attr === null ||
		attr === NaN
	);
}

/**
 * @description Returns only string
 * 	not empty.
 * @param {String} string The
 * 	target string.
 * @function str_check
 * @public
 * @returns {?String} ?String
 */
function str_check (string) {
	// Corrects the passed
	// string definition.
	string = (
		(typeof string === "string") ?
		string.trim () : null
	);
	// Adjusts the corrected
	// shape of the given
	// string definition.
	return (
		(
			string != null &&
			string.length
		) ? string : null
	);
}

/**
 * @description Creates or
 * 	changes a cookie.
 * @param {String} cname The
 * 	cookie's name.
 * @param {any} cvalue The
 * 	cookie's value
 * @param {int} exdays The
 * 	expiration's data. 
 * @function set_cookie
 * @public
 * @returns {void} void
 */
function set_cookie (
	cname, cvalue, exdays
) {
	// Creating a new date.
	const date = new Date ();
	// Converts the given
	// expires date into
	// day format.
	date.setTime (
		date.getTime () + (
			exdays * 24 * 60
			* 60 * 1000
		)
	);
	// Calculates the UTC
	// date format.
	let expires = (
		`expires=${
			date.toUTCString ()
		}`
	);
	// Updates the target
	// cookie.
	document.cookie = (
		`${cname}=${cvalue};${
			expires
		};path=/`
	);
}

/**
 * @description Returns the
 * 	target cookie value.
 * @param {String} cname The
 * 	target cookie's name.
 * @function get_cookie
 * @public
 * @returns {any} any
 */
function get_cookie (cname) {
	// Generates the cookie
	// name for future uses.
	let name = `${cname}=`;
	// Separates elements.
	let ca = (
		document.cookie.split (
			';'
		)
	);
	// Searching the
	// target cookie.
	for (
		let i = 0;
		i < ca.length;
		i++
	) {
		// Gets the current
		// cookie.
		let c = ca[i];
		// Searching the
		// cookie value.
		while (
			c.charAt (0) === ' '
		) {
			// Takes a slice.
			c = c.substring (1);
		}
		// Whether a value
		// has been found.
		if (
			c.indexOf (name) === 0
		) {
			// Sends the cookie's
			// value.
			return c.substring (
				name.length,
				c.length
			);
		}
	}
	// Returns a undefined
	// value.
	return undefined;
}

/**
 * @description Makes some ajax request
 * 	with a link and his data.
 * @param {String} link The req url.
 * @param {String} method The http
 * 	method to use.
 * @param {Object<String, any>} data
 * 	The data to send to back-end.
 * @param {?Function} success Called
 * 	when the request is done with
 * 	no errors.
 * @param {?Function} failed Called
 * 	when the request failed.
 * @fires ajax_request_nodejs#success
 * @fires ajax_request_nodejs#failed
 * @function ajax_request_nodejs
 * @public
 * @returns {void} void
 */
function ajax_request_nodejs (
	link,
	method,
	data,
	success = null,
	failed = null
) {
	// Creates a new xml http request.
	let xhr = new XMLHttpRequest ();
	// Opens it with the passed params.
	xhr.open (method, link, true);
	// Changes the default header.
	xhr.setRequestHeader (
		"Content-type",
		"application/json;charset=UTF-8"
	);
	// Sends the passed data.
	xhr.send (
		JSON.stringify (data)
	);
	// Listens the request
	// feedback.
	xhr.onload = () => {
		// Whether a 200 status
		// has been returned.
		if (xhr.status === 200) {
			// Whether `success`
			// event is listening.
			if (!is_empty (success)) {
				// Calls `success`
				// method callback.
				success (
					JSON.parse (
						xhr.responseText
					), xhr.status
				);
			}
		// Whether `failed`
		// event is listening.
		} else if (
			!is_empty (failed)
		) {
			// Calls `failed`
			// method callback.
			failed (xhr.status);
		}
	}
}

/**
 * @description Parses and
 * 	returns a tiny string
 * 	from the limit worth.
 * @param {String} text
 * 	The text to skrink. 
 * @param {String} limit
 * 	The characters limit.
 * @function str_skrink
 * @public
 * @returns {?String} ?String
 */
function str_skrink (
	text, limit = -1
) {
	// Corrects the passed
	// text string.
	text = str_check (text);
	// Whether the given
	// text is really a
	// string.
	if (text != null) {
		// Whether there are
		// no limit found
		// and negative
		// limit.
		if (limit === 0) {
			// Sends `null`.
			return null;
		// Whether the limit
		// is out of range.
		} else if (
			limit >= text.length
			|| limit < 0
		) {
			// Don't touch
			// the text.
			return text;
		// Otherwise.
		} else {
			// Takes slice of
			// the text and
			// leaves the
			// rest.
			return (
				`${text.slice (
					0, (limit + 1)
				)}...`
			);
		}
	// Otherwise.
	} else {
		// Sends `null`.
		return null;
	}
}

/**
 * @description Returns a capitalized
 * 	shape of a string.
 * @param {String} text The string
 * 	to capitalize.
 * @function str_capitalize
 * @public
 * @returns {?String} ?String
 */
function str_capitalize (text) {
	// Whether the given
	// text is defined.
	if (!is_empty (text)) {
		// Splits the passed text.
		text = text.split (' ');
		// Initializes the final
		// result
		let result = '';
		// Capitalizing the text.
		text.forEach (
			(string, index) => {
				// Whether the first
				// character exists.
				if (
					!is_empty (string[0])
				) {
					// Generates a capitalized
					// form of the current
					// string.
					string = (
						string[0].toUpperCase ()
						+ string.replace (
							string[0], ''
						).toLowerCase ()
					);
					// Generates the result
					// for each string.
					result = (
						(index === 0) ? string :
						`${result} ${string}`
					);
				}
			}
		);
		// Returns the
		// final result.
		return result;
	// Otherwise.
	} else {
		// Returns a `null`
		// value for other
		// cases of use.
		return null;
	}
}
