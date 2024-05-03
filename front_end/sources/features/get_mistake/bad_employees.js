/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com
* @fileoverview The controller to fetch all employees that are a misconduct.
* @author Obrymec - obrymecsprinces@gmail.com
* @file bad_employees.js
* @created 2022-02-03
* @updated 2023-11-19
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
	// Loads all bad
	// employees.
	get_request ({
		operation_link: (
			"bads-employees"
		),
		callback: datum => (
			generate_employee_table_data (
				datum
			)
		)
	});
});
