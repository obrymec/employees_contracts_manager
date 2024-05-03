/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com
* @fileoverview The controller to fetch all running contracts.
* @author Obrymec - obrymecsprinces@gmail.com
* @file running_contracts.js
* @created 2022-02-03
* @updated 2023-11-26
* @supported DESKTOP
* @version 0.0.2
*/

// When the page is
// fulled loaded.
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
	// Loads running
	// contracts.
	get_request ({
		operation_link: "run-contracts",
		callback: datum => (
			generate_contract_table_data (
				datum
			)
		)
	});
});
