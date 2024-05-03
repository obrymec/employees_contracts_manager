/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com
* @fileoverview The controller to fetch faults of an employee.
* @author Obrymec - obrymecsprinces@gmail.com
* @file employee_mistakes.js
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
	// Gets all bad
	// employees.
	get_request ({
		operation_link: (
			"bads-employees"
		),
		callback: datum => (
			generate_dropdown_values (
				datum
			)
		)
	});
	// Listens `click` event
	// on the target button.
	$ ("button#show-mistakes-btn")
		.click (() => {
			// Destroys the
			// previous data.
			$ ("tbody").remove ();
			// Loads employee's
			// mistakes.
			post_request ({
				button_text: "Loading...",
				button_id: (
					"button#show-mistakes-btn"
				),
				operation_link: (
					"emp-mistakes"
				),
				server_data: {
					id: (
						$ ("select#dropdown")
							.val ()
					)
				},
				callback: data => {
					// Removes `T` character.
					data.mdate = (
						data.mdate.split (
							'T'
						)[0].split ('-')
					);
					// Corrects the date.
					data.mdate = (
						`${data.mdate[2]}/${
							data.mdate[1]
						}/${data.mdate[0]}`
					);
					// Creates a new table
					// row for each fetched
					// data.
					$ ("table.table-data")
						.append (`
							<tbody
								class = "table-body silver"
							>
								<td>
									<span>
										${data.id}
									</span>
								</td>
								<td>
									<span>
										${data.type}
									</span>
								</td>
								<td>
									<span>
										${data.mdate}
									</span>
								</td>
								<td>
									<span>${
										str_skrink (
											data.description,
											64
										)
									}</span>
								</td>
							</tbody>
						`);
				}
			}, false);
		});
});
