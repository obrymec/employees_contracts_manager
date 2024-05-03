/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com
* @fileoverview The controller to create a misconduct.
* @author Obrymec - obrymecsprinces@gmail.com
* @file add_mistake.js
* @created 2022-02-03
* @updated 2023-11-19
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
	// Gets all running
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
	$ ("button#save-mistake-btn")
		.click (
			() => post_request ({
				button_text: "Checking...",
				page_link: "bad-employees",
				button_id: (
					"button#save-mistake-btn"
				),
				operation_link: (
					"save-mistake"
				),
				server_data: {
					type: (
						$ ("select#type").val ()
					),
					date: (
						$ ("input#date").val ()
					),
					description: (
						$ ("textarea#description")
							.val ().trim ()
					),
					contract_id: (
						$ ("select#dropdown")
							.val ()
					)
				}
			}, false)
		);
});
