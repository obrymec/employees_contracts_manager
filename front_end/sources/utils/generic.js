/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com
* @fileoverview The base controller for all others controllers.
* @author Obrymec - obrymecsprinces@gmail.com
* @created 2022-02-03
* @updated 2023-12-22
* @supported DESKTOP
* @file generic.js
* @version 0.0.3
*/

// Attributes.
// var HOST_NAME = "http://localhost:5200";
var is_pressed = false;
let is_low = false;
var HOST_NAME = (
	`${
		window.location
			.href.split (
				".com"
			)[0]
	}.com`
);

/**
 * @description Manages dropdowns values.
 * @param {Object<String, any>} datum The
 * 	option's datum.
 * @function generate_dropdown_values
 * @public
 * @returns {void} void
 */
function generate_dropdown_values (
	datum
) {
	// Adds this value to the target
	// dropdown.
	$ ("select#dropdown").append (`
		<option value = "${datum.id}">
			${
				datum.name.toUpperCase ()
			} ${
				str_capitalize (
					datum.surname
				)
			}
		</option>
	`);
}

/**
 * @description Displays a message
 * 	inside a modal box.
 * @param {String} message The text
 * 	to display.
 * @param {String=} type The message
 * 	type.
 * @param {!Function=} confirm The
 * 	method to call when we click
 * 	on the confirm button.
 * @param {boolean=} showConfirm
 * 	Whether we want to show the
 * 	confirm button.
 * @param {String=} title The popup
 * 	title text.
 * @param {boolean=} outsideClick
 * 	Whether we can click outside
 * 	to close the modal popup.
 * @function sweetAlert
 * @public
 * @returns {void} void
 */
function sweetAlert (
	message,
	type = "error",
	confirm = () => {},
	showConfirm = true,
	title = "Server Message",
	outsideClick = false
) {
	// Displays the target
	// message text inside
	// a popup.
	Swal.fire ({
		allowOutsideClick: outsideClick,
		showConfirmButton: showConfirm,
		confirmButtonText: "OK",
		focusConfirm: false,
		focusCancel: false,
		html: message,
		icon: type,
		title
	}).then (res => {
    // Whether the operation
    // is confirmed.
    if (res.isConfirmed) {
      // Calls the passed
			// callback method.
			confirm ();
    }
  });
}

/**
 * @description Manages employees table data.
 * @param {Object<String, any>} employee_data 
 * @function generate_employee_table_data
 * @public
 * @returns {void} void
 */
function generate_employee_table_data (
	employee_data
) {
	// Creates a new table
	// row for each
	// returned data.
	$ ("table.table-data").append (`
		<tbody
			class = "table-body silver"
		>
			<td>
				<span>${
					employee_data.id
				}</span>
			</td>
			<td>
				<span>${
					employee_data.name
						.toUpperCase ()
				}</span>
			</td>
			<td>
				<span>${
					str_capitalize (
						employee_data.surname
					)
				}</span>
			</td>
		</tbody>
	`);
}

/**
 * @description Checks whether the
 * 	browser is online or not.
 * @function checkNetwork
 * @public
 * @returns {boolean} boolean
 */
function checkNetwork () {
	// Whether the browser
	// is online.
	const isOnLine = (
		window.navigator.onLine
	);
	// Whether the browser
	// is offline.
	if (!isOnLine) {
		// Shows an error message
		// about no internet
		// connection.
		sweetAlert (
			`The browser isn't connected 
				to internet. Check your 
				network and retry.`,
			 "error", () => {}, true,
			 "Network Error"
		);
	// Otherwise.
	} else {
		// Closes the active
		// modal box.
		Swal.close ();
	}
	// Sends the network
	// state.
	return isOnLine;
}

/**
 * @description Checks screen active
 * 	resolution.
 * @function checkScreenResolution
 * @public
 * @returns {void} void
 */
function checkScreenResolution () {
	// Whether the current
	// window size is less
	// than 1024.
	if (window.innerWidth < 1024) {
		// Whether the screen size
		// wasn't low.
		if (!is_low) {
			// Sets the low state.
			is_low = true;
			// Shows a warn message.
			sweetAlert (
				`This application doesn't
				 support low resolution
				 screens. Please resize
				 your screen to a resolution
				 bigger than or equal to
				 (1024 x 768) pixels.`,
				 "info", () => {}, false,
				 "Information"
			);
		}
	// Otherwise.
	} else {
		// Whether the screen
		// size was low.
		if (is_low) {
			// Sets the low state.
			is_low = false;
			// Closes the active
			// modal box.
			Swal.close ();
		}
	}
}

/**
 * @description Manages all basics `GET`
 * 	requests.
 * @param {Object<String, any>} data
 * 	The request's data.
 * @function get_request
 * @public
 * @returns {void} void 
 */
function get_request (data) {
	// Whether the browser
	// is really online.
	if (checkNetwork ()) {
		// Downloads data from
		// server with the
		// passed front-end
		// data.
		ajax_request_nodejs (
			`/${data.operation_link}`,
			"GET", {}, response => {
				// Whether the server
				// status is `500`.
				if (response.status === 500) {
					// Makes a warn.
					sweetAlert (
						response.message,
						"error", () => (
							window.location.reload ()
						)
					);
				// Otherwise.
				} else {
					// Generating the associated
					// html code from server's
					// data.
					response.data.forEach (
						item => data.callback (
							item
						)
					);
				}
			// Request failed.
			}, () => {
				// Makes a warn.
				sweetAlert (
					"Request failed. Try Again !",
					"error", () => (
						window.location.reload ()
					)
				);
			}
		);
	}
}

/**
 * @description Manages contracts table
 * 	data.
 * @param {Object<String, any>} data
 * 	The table's data.
 * @function generate_contract_table_data
 * @public
 * @returns {void} void
 */
function generate_contract_table_data (
	data
) {
	// Gets the start's date.
	data.start_date = (
		data.start_date.split (
			'T'
		)[0].split ('-')
	);
	// Corrects it.
	data.start_date = (
		`${data.start_date[2]}/${
			data.start_date[1]
		}/${data.start_date[0]}`
	);
	// Gets the end's date.
	data.end_date = (
		data.end_date.split (
			'T'
		)[0].split ('-')
	);
	// Corrects it.
	data.end_date = (
		`${data.end_date[2]}/${
			data.end_date[1]
		}/${data.end_date[0]}`
	);
	// Creates a new table
	// row for each returned
	// data.
	$ ("table.table-data").append (`
		<tbody
			class = "table-body silver"
		>
			<td>
				<span>${data.id}</span>
			</td>
			<td>
				<span>${
					data.name.toUpperCase ()
				}</span>
			</td>
			<td>
				<span>${
					str_capitalize (
						data.surname
					)
				}</span>
			</td>
			<td>
				<span>${
					data.start_date
				}</span>
			</td>
			<td>
				<span>${
					data.end_date
				}</span>
			</td>
			<td>
				<span>${
					data.duration
				} month(s)</span>
			</td>
		</tbody>
	`);
}

/**
 * @description Calculates the
 * 	difference between two
 * 	dates.
 * @function date_difference
 * @public
 * @returns {void} void
 */
function date_difference () {
	// Whether all availables
	// dates aren't empty.
	if (
		!is_empty (
			$ ("input#sdate").val ()
		) &&
		!is_empty (
			$ ("input#edate").val ()
		)
	) {
		// The dates data.
		let parts = [
			$ ("input#sdate").val ()
				.split ('-'),
			$ ("input#edate").val ()
				.split ('-')
		];
		// The parts of the
		// left date.
		let left_parts = [
			parseInt (parts [0][2]),
			parseInt (parts [0][1]),
			parseInt (parts [0][0])
		];
		// The parts of the
		// right date.
		let right_parts = [
			parseInt (parts[1][2]),
			parseInt (parts[1][1]),
			parseInt (parts[1][0])
		];
		// Updates parts.
    parts = [
			left_parts,
			right_parts
		];
		// Whether the dates
		// have an order.
		if (
			new Date (
				left_parts[2],
				left_parts[1],
				left_parts[0]
			) < new Date (
				right_parts[2],
				right_parts[1],
				right_parts[0]
			)
		) {
			// Whether both years
			// are the same.
			if (
				parts[0][2] == parts[1][2]
			) {
				$ ("input#time").val (
					parts[1][1] - parts[0][1]
				);
			// Otherwise.
			} else {
				$ ("input#time").val (
					(12 - parts[0][1])
					+ parts[1][1]
				);
			}
		// Otherwise.
    } else {
			// Initializes the time.
			$ ("input#time").val (0);
		}
	// Otherwise.
  } else {
		// Initializes the time.
		$ ("input#time").val (0);
	}
}

/**
 * @description Manages all basics `POST`
 * 	requests.
 * @param {Object<String, any>} data
 * 	The data to send to the back-end. 
 * @param {boolean} is_sign Whether
 * 	the user is connected or not.
 * @function post_request
 * @public
 * @returns {void} void
 */
function post_request (data, is_sign) {
	// Whether the browser
	// is really online.
	if (checkNetwork ()) {
		// Whether the user is
		// already connected.
		if (is_sign) {
			// Whether the user
			// isn't connected.
			if (
				String (
					get_cookie ("user")
				) !== "undefined"
			) {
				// Disables the main
				// button.
				is_pressed = true;
				// Redirecting to
				// stop contract
				// web page.
				window.location.href = (
					`${HOST_NAME}/stop-contract`
				);
			}
		// Otherwise.
		} else if (
			String (
				get_cookie ("user")
			) === "undefined"
		) {
			// Disables the main
			// button.
			is_pressed = true;
			// Redirecting to
			// sign web page.
			window.location.href = (
				HOST_NAME
			);
		}
		// Whether the button
		// is not pressed.
		if (!is_pressed) {
			// Disables it.
			is_pressed = true;
			// Gets his old
			// text value.
			let old_button_text = (
				$ (data.button_id).text ()
			);
			// Changes button
			// text message.
			$ (data.button_id).text (
				data.button_text
			);
			// Sends the given data
			// to server with ajax
			// method.
			ajax_request_nodejs (
				`/${data.operation_link}`,
				"POST", data.server_data,
				response => {
					// Whether the server
					// status is `500`.
					if (
						response.status === 500
					) {
						// Enables button.
						is_pressed = false;
						// Makes a warn.
						sweetAlert (
							response.message,
							"error", () => (
								$ (data.button_id)
									.text (
										old_button_text
									)
							)
						);
					// Otherwise.
					} else {
						// Enables button.
						is_pressed = false;
						// Changes button
						// apprearance.
						$ (data.button_id).text (
							old_button_text
						);
						// Whether no message key
						// is found.
						if (
							response.hasOwnProperty (
								"data"
							)
						) {
							// Calls the passed
							// method callback.
							response.data.forEach (
								item => data.callback (
									item
								)
							);
						// Otherwise.
						} else {
							// Warns the user and calls
							// `loaded` method when
							// this request is done.
							sweetAlert (
								response.message,
								"success", () => {
									// Whether `loaded` event
									// is listening.
									if (
										typeof data.loaded
											=== "function"
									) {
										// Calls it.
										data.loaded (response);
									}
									// Whether the request
									// link is defined.
									if (
										data.hasOwnProperty (
											"page_link"
										) &&
										data.page_link.length > 0
									) {		
										// Go to a web page
										// whether needed.
										window.location.href = (
											`${HOST_NAME}/${
												data.page_link
											}`
										);
									}
								}
							);
						}
					}
				// Request failed.
				}, () => {
					// Enables the button.
					is_pressed = false;
					// Makes a warn.
					sweetAlert (
						"Request failed. Try Again !",
						"error", () => (
							$ (data.button_id).text (
								old_button_text
							)
						)
					);
				}
			);
		}
	}
}

// When the page is fulled loaded.
$ (() => {
	// Checks the current screen
	// resolution.
	checkScreenResolution ();
	// Listens window resizement
	window.addEventListener (
		"resize", checkScreenResolution
	);
	// Listens browser `offline`
  // event.
  window.addEventListener (
    "offline", checkNetwork
  );
	// Listens browser `online`
  // event.
  window.addEventListener (
    "online", checkNetwork
  );
	// Listens `click` event
	// on all detected
	// refresh buttons.
	$ (`
		button#employee-mistakes-btn,
		button#running-contracts-btn,
		button#busy-employees-btn,
		button#bad-employees-btn
	`).click (() => {
		// Whether the button
		// is enabled.
		if (!is_pressed) {
			// Reloads the current
			// web page.
			window.location.reload ();
		}
	});
	// Listens `click` event
	// on stop contract option.
	$ ("div.stop-contract").click (
		() => {
			// Whether the button
			// is enabled.
			if (!is_pressed) {
				// Go to stop
				// contract
				// web page.
				window.location.href = (
					`${
						HOST_NAME
					}/stop-contract`
				);
			}
		}
	);
	// Listens `click` event
	// on running contracts
	// option.
	$ ("div.running-contracts").click (
		() => {
			// Whether the button
			// is enabled.
			if (!is_pressed) {
				// Go to running
				// contracts web
				// page.
				window.location.href = (
					`${
						HOST_NAME
					}/running-contracts`
				);
			}
		}
	);
	// Listens `click` event
	// on expired contracts
	// option.
	$ ("div.expired-contracts").click (
		() => {
			// Whether the button
			// is enabled.
			if (!is_pressed) {
				// Go to exprired
				// contracts web
				// page.
				window.location.href = (
					`${
						HOST_NAME
					}/expired-contracts`
				);
			}
		}
	);
	// Listens `click` event
	// on add contract option.
	$ ("div.add-contract").click (
		() => {
			// Whether the button
			// is enabled.
			if (!is_pressed) {
				// Go to add contract
				// web page.
				window.location.href = (
					`${
						HOST_NAME
					}/add-contract`
				);
			}
		}
	);
	// Listens `click` event
	// on add mistake option.
	$ ("div.add-mistake").click (
		() => {
			// Whether the button
			// is enabled.
			if (!is_pressed) {
				// Go to add mistake
				// web page.
				window.location.href = (
					`${
						HOST_NAME
					}/add-mistake`
				);
			}
		}
	);
	// Listens `click` event
	// on bad employees option.
	$ ("div.bad-employees").click (
		() => {
			// Whether the button
			// is enabled.
			if (!is_pressed) {
				// Go to bad employees
				// web page.
				window.location.href = (
					`${
						HOST_NAME
					}/bad-employees`
				);
			}
		}
	);
	// Listens `click` event
	// on busy employees
	// option.
	$ ("div.busy-employees").click (
		() => {
			// Whether the button
			// is enabled.
			if (!is_pressed) {
				// Go to busy employees
				// web page.
				window.location.href = (
					`${
						HOST_NAME
					}/busy-employees`
				);
			}
		}
	);
	// Listens `click` event on
	// employee mistakes option.
	$ ("div.employee-mistakes").click (
		() => {
			// Whether the button
			// is enabled.
			if (!is_pressed) {
				// Go to employee
				// mistakes web
				// page.
				window.location.href = (
					`${
						HOST_NAME
					}/employee-mistakes`
				);
			}
		}
	);
	// Listens `click` event on
	// override contract option.
	$ ("div.override-contract").click (
		() => {
			// Whether the button
			// is enabled.
			if (!is_pressed) {
				// Go to override
				// contract web
				// page.
				window.location.href = (
					`${
						HOST_NAME
					}/override-contract`
				);
			}
		}
	);
	// Listens `click` event
	// on logout option.
	$ ("div.logout").click (
		() => {
			// Updates cookies about
			// the current user.
			set_cookie (
				"user", "undefined", 0.5
			);
			// Whether the button
			// is enabled.
			if (!is_pressed) {
				// Go to sign in
				// web page.
				window.location.href = (
					HOST_NAME
				);
			}
		}
	);
});
