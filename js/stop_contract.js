/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com/
* @fileoverview The controller to stop a specific employee's contract.
* @author Obrymec - obrymecsprinces@gmail.com
* @file stop_contracts.js
* @created 2022-02-03
* @updated 2023-11-26
* @supported DESKTOP
* @version 0.0.2
*/

// When this web page
// is fulled loaded.
$ (() => {
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
	// Gets running
	// contracts.
	get_request ({
		operation_link: (
			"run-contracts"
		),
		callback: datum => (
			generate_dropdown_values (
				datum
			)
		)
	});
	// Listens `click` event
	// on the target button.
	$ ("button#stop-contract-btn")
		.click (
			() => post_request ({
				button_id: (
					"button#stop-contract-btn"
				),
				page_link: (
					"running-contracts"
				),
				button_text: (
					"Validation..."
				),
				operation_link: (
					"stp-contract"
				),
				server_data: {
					id: $ (
						"select#dropdown"
					).val ()
				}
			}, false)
		);
});
