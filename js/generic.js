// Attributes.
const HOST_NAME = (window.location.href.split (".com") [0] + ".com");
//const HOST_NAME = "http://localhost:5000";
let is_pressed = false;

// Manages all basics "POST" requests.
function post_request (data, is_sign) {
    // Redirecting to stop contract web page.
    if (is_sign) {
        if (String (get_cookie ("user")) !== "undefined") {
            window.location.href = (HOST_NAME + "/stop-contract");
            is_pressed = true;
        }
    // Otherwise.
    } else if (String (get_cookie ("user")) === "undefined") {
        window.location.href = HOST_NAME;
        is_pressed = true;
    }
    if (!is_pressed) {
        // Changes button apprearance after getting his old text value.
        let old_button_text = $ (data.button_id).text ();
        $ (data.button_id).text (data.button_text);
        is_pressed = true;
        // Sends the given data to server with ajax method.
        ajax_request_nodejs (('/' + data.operation_link), "POST", data.server_data, response => {
            // The server status is 500.
            if (response.status === 500) {
                $ (data.button_id).text (old_button_text);
                alert (response.message);
                is_pressed = false;
            // Otherwise.
            } else {
                // Changes button apprearance.
                $ (data.button_id).text (old_button_text);
                is_pressed = false;
                // No message key found.
                if (response.hasOwnProperty ("data")) response.data.forEach (item => data.callback (item));
                // Otherwise.
                else {
                    // Warns the user and calls "loaded" method when this request is done.
                    alert (response.message);
                    if (typeof data.loaded === "function") data.loaded (response);
                    // Go to a web page whether needed.
                    if (data.hasOwnProperty ("page_link") && data.page_link.length) window.location.href = (HOST_NAME + '/' + data.page_link);
                }
            }
        // Request failed.
        }, () => {
            alert ("Requête échouée. Veuillez reéssayer !");
            $ (data.button_id).text (old_button_text);
            is_pressed = false;
        });
    }
}

// Manages all basics "GET" requests.
function get_request (data) {
    // Downloads data from server with the passed frontend data.
    ajax_request_nodejs (('/' + data.operation_link), "GET", new Object ({}), response => {
        // The server status is 500.
        if (response.status === 500) {
            alert (response.message);
            window.location.reload ();
        // Otherwise, generating the associated html code from server's data.
        } else response.data.forEach (item => data.callback (item));
    // Request failed.
    }, () => {
        alert ("Requête échouée. Veuillez reéssayer !");
        window.location.reload ();
    });
}

// Manages employees table data.
function generate_employee_table_data (employee_data) {
    // Creates a new table row for each returned data.
    $ ("table.table-data").append ("<tbody class = 'table-body silver'>\
        <td><label>" + employee_data.id + "</label></td><td><label>" + employee_data.name.toUpperCase () + "</label></td>\
        <td><label>" + str_capitalize (employee_data.surname) + "</label></td>\
    </tbody>");
}

// Manages dropdowns values.
function generate_dropdown_values (datum) {
    // Adds this value to the target dropdown.
    $ ("select#dropdown").append ("<option value = '" + datum.id + "'>" + datum.name.toUpperCase () + ' ' + str_capitalize (datum.surname) + "</option>");
}

// Manages contracts table data.
function generate_contract_table_data (data) {
    // Corrects the start's date.
    data.start_date = data.start_date.split ('T') [0].split ('-'); data.start_date = (data.start_date [2] + '/' + data.start_date [1] + '/' + data.start_date [0]);
    // Corrects the end's date.
    data.end_date = data.end_date.split ('T') [0].split ('-'); data.end_date = (data.end_date [2] + '/' + data.end_date [1] + '/' + data.end_date [0]);
    // Creates a new table row for each returned data.
    $ ("table.table-data").append ("<tbody class = 'table-body silver'>\
        <td><label>" + data.id + "</label></td><td><label>" + data.name.toUpperCase () + "</label></td>\
        <td><label>" + str_capitalize (data.surname) + "</label></td><td><label>" + data.start_date + "</label></td>\
        <td><label>" + data.end_date + "</label></td><td><label>" + data.duration + " mois</label></td>\
    </tbody>");
}

// Calculates the difference between two dates.
function date_difference () {
	// All availables dates aren't empty.
	if (!is_empty ($ ("input#sdate").val ()) && !is_empty ($ ("input#edate").val ())) {
		// Contains dates data.
		let parts = [$ ("input#sdate").val ().split ('-'), $ ("input#edate").val ().split ('-')];
		// Contains the parts of the left date.
		let left_parts = [parseInt (parts [0] [2]), parseInt (parts [0] [1]), parseInt (parts [0] [0])];
		// Contains the parts of the right date.
		let right_parts = [parseInt (parts [1] [2]), parseInt (parts [1] [1]), parseInt (parts [1] [0])];
        parts = [left_parts, right_parts];
		// Checks the dates order.
		if (new Date (left_parts [2], left_parts [1], left_parts [0]) < new Date (right_parts [2], right_parts [1], right_parts [0])) {
			// The both years are the same.
			if (parts [0] [2] == parts [1] [2]) $ ("input#time").val (parts [1] [1] - parts [0] [1]);
			// Otherwise.
			else $ ("input#time").val ((12 - parts [0] [1]) + parts [1] [1]);
		// Otherwise.
        } else $ ("input#time").val (0);
	// Otherwise.
    } else $ ("input#time").val (0);
}

// When the page is fulled loaded.
$ (() => {
    // Fixing "click" event on all detected refresh buttons.
    $ ("button#employee-mistakes-btn, button#busy-employees-btn, button#bad-employees-btn, button#running-contracts-btn").click (() => {
        // Reloads the current web page.
        if (!is_pressed) window.location.reload ();
    });
    // Fixing "click" event on stop contract option.
    $ ("div.stop-contract").click (() => {
        if (!is_pressed) window.location.href = (HOST_NAME + "/stop-contract");
    });
    // Fixing "click" event on running contracts option.
    $ ("div.running-contracts").click (() => {
        if (!is_pressed) window.location.href = (HOST_NAME + "/running-contracts");
    });
    // Fixing "click" event on expired contracts option.
    $ ("div.expired-contracts").click (() => {
        if (!is_pressed) window.location.href = (HOST_NAME + "/expired-contracts");
    });
    // Fixing "click" event on add contract option.
    $ ("div.add-contract").click (() => {
        if (!is_pressed) window.location.href = (HOST_NAME + "/add-contract");
    });
    // Fixing "click" event on add mistake option.
    $ ("div.add-mistake").click (() => {
        if (!is_pressed) window.location.href = (HOST_NAME + "/add-mistake");
    });
    // Fixing "click" event on bad employees option.
    $ ("div.bad-employees").click (() => {
        if (!is_pressed) window.location.href = (HOST_NAME + "/bad-employees");
    });
    // Fixing "click" event on busy employees option.
    $ ("div.busy-employees").click (() => {
        if (!is_pressed) window.location.href = (HOST_NAME + "/busy-employees");
    });
    // Fixing "click" event on employee mistakes option.
    $ ("div.employee-mistakes").click (() => {
        if (!is_pressed) window.location.href = (HOST_NAME + "/employee-mistakes");
    });
    // Fixing "click" event on override contract option.
    $ ("div.override-contract").click (() => {
        if (!is_pressed) window.location.href = (HOST_NAME + "/override-contract");
    });
    // Fixing "click" event on logout option.
    $ ("div.logout").click (() => {
        set_cookie ("user", "undefined", 0.5);
        if (!is_pressed) window.location.href = HOST_NAME;
    });
});
