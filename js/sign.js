/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com/
* @fileoverview The controller to handle user sign in/up.
* @author Obrymec - obrymecsprinces@gmail.com
* @created 2022-02-03
* @updated 2023-12-15
* @supported DESKTOP
* @version 0.0.2
* @file sign.js
*/

/**
 * @description Shows sign
 * 	in section.
 * @function show_sign_in_
 * @private {Function}
 * @returns {void} void
 */
function show_sign_in_ () {
	// Destroys sign up
	// focus.
	$ ("div.sign-up-option")
		.removeClass (
			"active-section"
		);
	// Puts it to sign in.
	$ ("div.sign-in-option")
		.addClass (
			"active-section"
		);
	// Hides sign up body.
	$ ("div.sign-in-body")
		.removeClass ("hide");
	// Shows sign in body.
	$ ("div.sign-up-body")
		.addClass ("hide");
	// Clears input value.
	$ ("input").val ('');
}

/**
 * @description Shows sign
 * 	up section.
 * @function show_sign_up_
 * @private {Function}
 * @returns {void} void
 */
function show_sign_up_ () {
	// Destroys sign in
	// focus.
	$ ("div.sign-in-option")
		.removeClass (
			"active-section"
		);
	// Puts it to sign up.
	$ ("div.sign-up-option")
		.addClass (
			"active-section"
		);
	// Hides sign in body.
	$ ("div.sign-up-body")
		.removeClass ("hide");
	// Shows sign up body.
	$ ("div.sign-in-body")
		.addClass ("hide");
	// Clears input value.
	$ ("input").val ('');
}

// Called when this
// page is fulled
// loaded.
$ (() => {
	// Listens `click` event
	// on sign in section.
	$ ("div.sign-in-option")
		.click (show_sign_in_);
	// Listens `click` event
	// on sign up section.
	$ ("div.sign-up-option")
		.click (show_sign_up_);
	// Listens `click` event
	// on sign in button.
	$ ("button#sign-in-btn").click (
		() => post_request ({
			button_id: "button#sign-in-btn",
			button_text: "Checking...",
			page_link: "stop-contract",
			operation_link: "sign-in",
			loaded: response => (
				set_cookie (
					"user",
					response.server_data.email,
					1
				)
			),
			server_data: {
				id: (
					$ ("input#user-id").val ()
						.toLowerCase ()
						.trim ()
				),
				password: (
					$ ("input#cpassword")
						.val ().trim ()
				)
			}
		}, true)
	);
	// Listens `click` event
	// on sign up button.
	$ ("button#sign-up-btn").click (
		() => post_request ({
			button_text: "Checking...",
			loaded: show_sign_in_,
			button_id: (
				"button#sign-up-btn"
			),
			operation_link: (
				"sign-up"
			),
			server_data: {
				password: (
					$ ("input#password")
						.val ().trim ()
				),
				confirm: (
					$ ("input#confirm")
						.val ().trim ()
				),
				username: (
					$ ("input#pseudo")
						.val ().trim ()
				),
				email: (
					$ ("input#email")
						.val ().trim ()
				)
			}
		}, true)
	);
});
