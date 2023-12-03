/**
* @project Employees Contracts - https://employees-contracts-manager.onrender.com/
* @fileoverview Defines routes, paths and nodejs server configs with expressjs.
* @author Obrymec - obrymecsprinces@gmail.com
* @created 2022-02-03
* @updated 2023-12-03
* @supported DESKTOP
* @file server.js
* @version 0.0.2
*/

// Plugin dependencies.
const controller = require ("./js/controller.js");
const parser = require ("body-parser");
const express = require ("express");

// Attributes.
const app = express ();
const port = 5000;

// App configurations.
app.use (parser.json ());
app.use (
	parser.urlencoded ({
		extended: true
	})
);
app.use (
	express.static (
		__dirname
	)
);

// App routes.
app.get ('/', (_, res) => (
	res.sendFile (
		"html/sign.html",
		{root: __dirname}
	)
));
// Stops a contract
// web page view.
app.get (
	"/stop-contract", (_, res) => (
		res.sendFile (
			"html/stop_contract.html",
			{root: __dirname}
		)
	)
);
// Running contracts
// web page view.
app.get (
	"/running-contracts", (_, res) => (
		res.sendFile (
			"html/running_contracts.html",
			{root: __dirname}
		)
	)
);
// Expired contracts
// web page view.
app.get (
	"/expired-contracts", (_, res) => (
		res.sendFile (
			"html/expired_contracts.html",
			{root: __dirname}
		)
	)
);
// Add contract web
// page view.
app.get (
	"/add-contract", (_, res) => (
		res.sendFile (
			"html/save_contract.html",
			{root: __dirname}
		)
	)
);
// Add mistake web
// page view.
app.get (
	"/add-mistake", (_, res) => (
		res.sendFile (
			"html/save_mistake.html",
			{root: __dirname}
		)
	)
);
// Bad employees web
// page view.
app.get (
	"/bad-employees", (_, res) => (
		res.sendFile (
			"html/employees_mistake.html",
			{root: __dirname}
		)
	)
);
// Busy employees web
// page view.
app.get (
	"/busy-employees", (_, res) => (
		res.sendFile (
			"html/employees_contract.html",
			{root: __dirname}
		)
	)
);
// Override contract
// web page view.
app.get (
	"/override-contract", (_, res) => (
		res.sendFile (
			"html/override_contract.html",
			{root: __dirname}
		)
	)
);
// Employee mistakes
// web page view.
app.get (
	"/employee-mistakes", (_, res) => (
		res.sendFile (
			"html/employee_mistakes.html",
			{root: __dirname}
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
	"/save-contract", (_, res) => (
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
