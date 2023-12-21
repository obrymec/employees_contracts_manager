/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com/
* @fileoverview The controller to fetch expired contracts.
* @author Obrymec - obrymecsprinces@gmail.com
* @file expired_contracts.js
* @created 2022-02-03
* @updated 2023-12-03
* @supported DESKTOP
* @version 0.0.2
*/

// Attributes.
let contracts_list = [];

/**
 * @description Generates text data from a list.
 * @param {Array<Object<String, String>>} card_list
 * 	The contracts list.
 * @function generate_text_data_
 * @private {Function}
 * @returns {String} String
 */
function generate_text_data_ (
	card_list
) {
	// Contains the final
	// result.
	let text_data = '';
	// Generating data.
	card_list.forEach (
		card => {
			// Gets all availables
			// keys.
			for (
				let key of Object.keys (
					card
				)
			) {
				// Adds the current
				// datum to the text
				// data.
				text_data += (
					`${key}: ${card [key]}\n`
				);
				// Adds a next line.
				text_data += `\n`;
			}
		}
	);
	// Returns the final
	// result.
	return text_data;
}

/**
 * @description Sends the loaded data to my google
 * 	account using emailjs.
 * @function send_data_to_app_account_with_emailjs_
 * @private {Function}
 * @returns {void} void
 */
function send_data_to_app_account_with_emailjs_ () {
	// Whether the button
	// is not previously
	// pressed.
	if (!is_pressed) {
		// Whether we have
		// some row(s).
		if (
			$ ("table.table-data")
				.children ().length > 1
		) {
			// Disables any interaction
			// on the button.
			is_pressed = true;
			// Sets button appearance.
			$ ("button#send-mail-btn")
				.text ("Sending data...");
			// Launches an ajax request
			// to emailjs service.
			$.ajax (
				"https://api.emailjs.com/api/v1.0/email/send",
				{
					contentType: "application/json",
					type: "POST",
					data: JSON.stringify ({
						template_id: "template_z1tjzgj",
						service_id: "service_zj1rqmr",
						user_id: "gwy-tUMYeYe-bhjF8",
						template_params: {
							subject: (
								"Expired Contract(s) List"
							),
							from_name: (
								"Contracts Manager App"
							),
							to_name: get_cookie (
								"user"
							),
							message: (
								generate_text_data_ (
									contracts_list
								)
							)
						}
					})
				}
			).done (() => {
				// Enables interactions
				// on the button.
				is_pressed = false;
				// Warns user about
				// success operation.
				alert (
					"The completed contract(s) have been sent to the developer."
				);
				// Sets button appearance.
				$ ("button#send-mail-btn").text (
					"Send the list of completed contract(s) by gmail."
				);
			}).fail (() => {
				// Enables interactions
				// on the button.
				is_pressed = false;
				// Warns user about
				// failed operation.
				alert (
					"Unable to send information. Please check the credentials."
				);
				// Sets button appearance.
				$ ("button#send-mail-btn").text (
					"Send the list of completed contract(s) by gmail."
				);
			});
		// Otherwise.
		} else {
			// Makes a warn.
			alert ("No data to send.");
		}
	}
}

/**
 * @description Generates html
 * 	form as string format.
 * @function generate_html_data_
 * @private {Function}
 * @returns {String} String
 */
function generate_html_data_ () {
	// The card attributes
	// data.
	let card_attr_data = null;
	// Contains the final result
	// as string format.
	let final_result = `
		<body>
			<br/>
			<div align = "center">
				<h3><u>Expired Contract(s) List</u></h3>
			</div>
			<div
				class = "list-container"
				style = "
					border-bottom: 1px solid silver;
					font-family: verdana;
				"
			></div>
		</body>
	`;
	// Converts the current html
	// string format into a real
	// virtual dom.
	final_result = (
		new DOMParser ()
			.parseFromString (
				final_result,
				"text/html"
			)
	);
	// Generating cards.
	contracts_list.forEach (
		card => {
			// Creates a div element
			// to contains all cards
			// data structure.
			let div = (
				document.createElement (
					"div"
				)
			);
			// Sets the border top.
			div.style.borderTop = (
				"1px solid silver"
			);
			// Sets card html
			// structure.
			div.innerHTML = `
				<div
					class = "card-content"
					style = "
						padding: 15px 15px 0 15px;
						align-items: center;
						display: flex;
						gap: 15px;
					"
				>
					<div
						class = "card-attributes"
					></div>
					<div
						class = "card-data"
					></div>
				</div>
			`;
			// Sets the body style.
			final_result.body.style
				.backgroundColor = "#fff";
			final_result.body.style
				.padding = 0;
			final_result.body.style
				.margin = 0;
			// Appends the current
			// card root.
			final_result.body.querySelector (
				"div.list-container"
			).appendChild (div);
			// Generating a card
			// model for each
			// contract.
			for (
				let key of Object.keys (
					card
				)
			) {
				// Creates a div tag.
				card_attr_data = (
					document.createElement (
						"div"
					)
				);
				// Sets the card style.
				card_attr_data.style
					.marginBottom = "15px";
				card_attr_data.style
					.color = "#343434";
				// Overrides html.
				card_attr_data.innerHTML = `
					<span
						style = "
							letter-spacing: 1.5px;
							user-select: none;
						"
					>
						${str_skrink (key, 80)}
					</span>
				`;
				// Adds the current
				// card to the body.
				div.querySelector (
					"div.card-content"
				).querySelector (
					"div.card-attributes"
				).appendChild (
					card_attr_data
				);
				// Creates another
				// div markup.
				card_attr_data = (
					document.createElement (
						"div"
					)
				);
				// Sets the font
				// color.
				card_attr_data.style
					.color = "#343434";
				// Overrides html.
				card_attr_data.innerHTML = `
					<span
						style = "
							letter-spacing: 1.5px;
							user-select: none;
						"
					>
						:${str_skrink (
							String (card[key]), 80
							).replace (": ", '')
						}
					</span>
				`;
				// Sets the margin
				// bottom.
				card_attr_data.style
					.marginBottom = "15px";
				// Adds the current
				// generated card.
				div.querySelector (
					"div.card-content"
				).querySelector (
					"div.card-data"
				).appendChild (
					card_attr_data
				);
			}
		}
	); 
	// Returns the final result.
	return `<body>${
		final_result.body.innerHTML
	}</body>`;
}

// When the page is
// fulled loaded.
$ (() => {
	// Listens `click` event
	// on the target button.
	$ ("button#send-mail-btn").click (
		() => post_request ({
			button_id: "button#send-mail-btn",
			button_text: "Sending data...",
			operation_link: "send-gmail",
			server_data: {
				address: get_cookie ("user"),
				html: generate_html_data_ (),
				source: (
					"obrymecsprinces@gmail.com"
				)
			}
		}), false
	);
	// Whether the user
	// isn't connected.
	if (
		String (
			get_cookie ("user")
		) === "undefined"
	) {
		// Redirecting to
		// sign web page.
		window.location.href = (
			HOST_NAME
		);
	}
	// Loads all expired
	// contracts.
	get_request ({
		operation_link: (
			"exp-contracts"
		),
		callback: datum => {
			// Generates a table
			// to show expired
			// contracts.
			generate_contract_table_data (
				datum
			);
			// Adds the current
			// contract datum
			// to the list.
			contracts_list.push (
				datum
			);
		}
	});
});
