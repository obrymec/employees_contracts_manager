/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com/
* @fileoverview Defines routes, paths and nodejs server configs with expressjs.
* @author Obrymec - obrymecsprinces@gmail.com
* @created 2022-02-03
* @updated 2023-12-21
* @supported DESKTOP
* @file server.js
* @version 0.0.2
*/

// Plugin dependencies.
const controller = require ("./back_end/sources/api.js");
const parser = require ("body-parser");
const express = require ("express");

// Attributes.
const app = express ();
const port = 5200;
const options = {
	root: (
		`${__dirname}/front_end`
	)
};

// App configurations.
app.use (parser.json ());
app.use (
	parser.urlencoded ({
		extended: true
	})
);
app.use (
	express.static (
		options.root
	)
);

// App routes.
app.get ('/', (_, res) => (
	res.sendFile (
		"./sources/features/sign_in_up/sign.html",
		options
	)
));
// Stops a contract
// web page view.
app.get (
	"/stop-contract", (_, res) => (
		res.sendFile (
			"./sources/features/off_contract/stop_contract.html",
			options
		)
	)
);
// Running contracts
// web page view.
app.get (
	"/running-contracts", (_, res) => (
		res.sendFile (
			"./sources/features/get_running/running_contracts.html",
			options
		)
	)
);
// Expired contracts
// web page view.
app.get (
	"/expired-contracts", (_, res) => (
		res.sendFile (
			"./sources/features/get_expired/expired_contracts.html",
			options
		)
	)
);
// Add contract web
// page view.
app.get (
	"/add-contract", (_, res) => (
		res.sendFile (
			"./sources/features/put_contract/save_contract.html",
			options
		)
	)
);
// Add mistake web
// page view.
app.get (
	"/add-mistake", (_, res) => (
		res.sendFile (
			"./sources/features/put_mistake/save_mistake.html",
			options
		)
	)
);
// Bad employees web
// page view.
app.get (
	"/bad-employees", (_, res) => (
		res.sendFile (
			"./sources/features/get_mistake/employees_mistake.html",
			options
		)
	)
);
// Busy employees web
// page view.
app.get (
	"/busy-employees", (_, res) => (
		res.sendFile (
			"./sources/features/get_contract/employees_contract.html",
			options
		)
	)
);
// Override contract
// web page view.
app.get (
	"/override-contract", (_, res) => (
		res.sendFile (
			"./sources/features/set_contract/override_contract.html",
			options
		)
	)
);
// Employee mistakes
// web page view.
app.get (
	"/employee-mistakes", (_, res) => (
		res.sendFile (
			"./sources/features/get_mistakes/employee_mistakes.html",
			options
		)
	)
);
// Running contracts
// operation.
app.get (
	"/run-contracts", (_, res) => (
		controller.get_running_contracts (
			result => res.send (result)
		)
	)
);
// Expired contracts
// operation.
app.get (
	"/exp-contracts", (_, res) => (
		controller.get_expired_contracts (
			result => res.send (result)
		)
	)
);
// Bad employees
// operation.
app.get (
	"/bads-employees", (_, res) => (
		controller.get_bad_employees (
			result => res.send (result)
		)
	)
);
// Save contract
// operation.
app.post (
	"/save-contract", (req, res) => (
		controller.save_contract (
			req.body, result => res.send (
				result
			)
		)
	)
);
// Stop contract
// operation.
app.post (
	"/stp-contract", (req, res) => (
		controller.stop_contract (
			req.body, result => res.send (
				result
			)
		)
	)
);
// Save mistake
// operation.
app.post (
	"/save-mistake", (req, res) => (
		controller.save_mistake (
			req.body, result => res.send (
				result
			)
		)
	)
);
// Change contract
// operation.
app.post (
	"/change-contract", (req, res) => (
		controller.override_contract (
			req.body, result => res.send (
				result
			)
		)
	)
);
// Employee mistakes
// operation.
app.post (
	"/emp-mistakes", (req, res) => (
		controller.get_employee_mistakes (
			req.body, result => res.send (
				result
			)
		)
	)
);
// Sign up operation.
app.post (
	"/sign-up", (req, res) => (
		controller.sign_up (
			req.body, result => res.send (
				result
			)
		)
	)
);
// Sign in operation.
app.post (
	"/sign-in", (req, res) => (
		controller.sign_in (
			req.body, result => res.send (
				result
			)
		)
	)
);
// For mail sender
// operation.
app.post (
	"/send-gmail", (req, res) => (
		controller.send_gmail (
			req.body, result => res.send (
				result
			)
		)
	)
);

// Starts the server.
app.listen (port, err => {
	// Whether an error
  // is thrown.
	if (err) {
		// Displays this
    // error message.
		console.error (
			"Server Error: ", err
		);
	// Otherwise.
	} else {
		// Makes a warn
    // about server
    // starting.
		console.log (
			"Server started at port: ",
			port
		);
	}
});
