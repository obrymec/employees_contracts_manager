/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com/
* @fileoverview The controller to create a contract.
* @author Obrymec - obrymecsprinces@gmail.com
* @file add_contract.js
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
		.on (
			"input", date_difference
		);
	// Listens `click` event.
	$ ("button#save-contract-btn")
		.click (
			() => post_request ({
				button_text: "Checking...",
				button_id: (
					"button#save-contract-btn"
				),
				page_link: (
					"running-contracts"
				),
				operation_link: (
					"save-contract"
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
					surname: (
						$ ("input#surname")
							.val ()
							.toLowerCase ()
							.trim ()
					),
					name: (
						$ ("input#name")
							.val ()
							.toLowerCase ()
							.trim ()
					)
				}
			}, false)
		);
});
