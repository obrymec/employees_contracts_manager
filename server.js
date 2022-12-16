// Dependencies.
const controller = require ("./js/controller.js");
const parser = require ("body-parser");
const port = process.env.PORT || 5000;
const express = require ("express");
const app = express ();

// App configurations.
app.use (parser.urlencoded (new Object ({extended: true})));
app.use (express.static (__dirname));
app.use (parser.json ());

// App routes.
app.get ('/', (req, res) => res.sendFile ("html/sign.html", new Object ({root: __dirname})));
// Stops a contract web page view.
app.get ("/stop-contract", (req, res) => res.sendFile ("html/stop_contract.html", new Object ({root: __dirname})));
// Running contracts web page view.
app.get ("/running-contracts", (req, res) => res.sendFile ("html/running_contracts.html", new Object ({root: __dirname})));
// Expired contracts web page view.
app.get ("/expired-contracts", (req, res) => res.sendFile ("html/expired_contracts.html", new Object ({root: __dirname})));
// Add contract web page view.
app.get ("/add-contract", (req, res) => res.sendFile ("html/save_contract.html", new Object ({root: __dirname})));
// Add mistake web page view.
app.get ("/add-mistake", (req, res) => res.sendFile ("html/save_mistake.html", new Object ({root: __dirname})));
// Bad employees web page view.
app.get ("/bad-employees", (req, res) => res.sendFile ("html/employees_mistake.html", new Object ({root: __dirname})));
// Busy employees web page view.
app.get ("/busy-employees", (req, res) => res.sendFile ("html/employees_contract.html", new Object ({root: __dirname})));
// Override contract web page view.
app.get ("/override-contract", (req, res) => res.sendFile ("html/override_contract.html", new Object ({root: __dirname})));
// Employee mistakes web page view.
app.get ("/employee-mistakes", (req, res) => res.sendFile ("html/employee_mistakes.html", new Object ({root: __dirname})));
// Running contracts operation.
app.get ("/run-contracts", (req, res) => controller.get_running_contracts (result => res.send (result)));
// Expired contracts operation.
app.get ("/exp-contracts", (req, res) => controller.get_expired_contracts (result => res.send (result)));
// Bad employees operation.
app.get ("/bads-employees", (req, res) => controller.get_bad_employees (result => res.send (result)));
// Save contract operation.
app.post ("/save-contract", (req, res) => controller.save_contract (req.body, result => res.send (result)));
// Stop contract operation.
app.post ("/stp-contract", (req, res) => controller.stop_contract (req.body, result => res.send (result)));
// Save mistake operation.
app.post ("/save-mistake", (req, res) => controller.save_mistake (req.body, result => res.send (result)));
// Change contract operation.
app.post ("/change-contract", (req, res) => controller.override_contract (req.body, result => res.send (result)));
// Employee mistakes operation.
app.post ("/emp-mistakes", (req, res) => controller.get_employee_mistakes (req.body, result => res.send (result)));
// Sign up operation.
app.post ("/sign-up", (req, res) => controller.sign_up (req.body, result => res.send (result)));
// Sign in operation.
app.post ("/sign-in", (req, res) => controller.sign_in (req.body, result => res.send (result)));
// For mail sender operation.
app.post ("/send-gmail", (req, res) => controller.send_gmail (req.body, result => res.send (result)));

// Server port configuration.
app.listen (port, err => {
    if (err) console.error ("Failed to start server error code: ", err);
    else console.log ("Server start at port:", port);
});
