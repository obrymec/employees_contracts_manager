/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com
* @fileoverview The controller to override an employee's contract.
* @author Obrymec - obrymecsprinces@gmail.com
* @file override_contract.js
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
	// Listens `input` event.
	$ ("input#sdate, input#edate")
		.on ("input", date_difference);
	// Gets expired
	// contracts.
	get_request ({
		operation_link: (
			"exp-contracts"
		),
		callback: datum => (
			generate_dropdown_values (
				datum
			)
		)
	});
	// Listens `click` event.
	$ ("button#override-contract-btn")
		.click (
			() => post_request ({
				button_text: "Checking...",
				button_id: (
					"button#override-contract-btn"
				),
				page_link: (
					"running-contracts"
				),
				operation_link: (
					"change-contract"
				),
				server_data: {
					sdate: (
						$ ("input#sdate")
							.val ().trim ()
					),
					edate: (
						$ ("input#edate")
							.val ().trim ()
					),
					time: (
						$ ("input#time")
							.val ().trim ()
					),
					id: $ (
						"select#dropdown"
					).val ()
				}
			}, false)
		);
});
