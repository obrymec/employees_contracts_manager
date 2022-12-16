// Attributes.
let contracts_list = [];

// Generates text data from a list.
function generate_text_data (card_list) {
	// Contains the final result.
	let text_data = String (''); card_list.forEach (card => {
		// Gets all availables keys.
		for (let key of Object.keys (card)) text_data += `${key}: ${card [key]}\n`; text_data += `\n`;
	// Returns the final result.
	}); return text_data;
}

// Generates html form as string format.
function generate_html_data () {
	// Contains the final result as string format.
	let final_result = "<body><br/><div align = 'center'><h3><label><u>Liste de(s) contrat(s) terminé(s)</u></label></h3></div>\
		<div class = 'list-container' style = 'border-bottom: 1px solid silver; font-family: verdana;'></div>\
	</body>";
	// Converts the current html string format into a real virtual dom.
	final_result = new DOMParser ().parseFromString (final_result, "text/html");
	contracts_list.forEach (card => {
		// Creating a div element to contains all cards data structure.
		let div = document.createElement ("div");
		div.style.borderTop = "1px solid silver";
		div.innerHTML = "<div class = 'card-content' style = 'display: flex; align-items: center; padding: 15px 15px 0 15px; gap: 15px;'>\
			<div class = 'card-attributes'></div><div class = 'card-data'></div>\
		</div>";
		// Sets the body style.
		final_result.body.backgroundColor = "#fff";
		final_result.body.style.padding = 0;
		final_result.body.style.margin = 0;
		// Appending the current card root.
		final_result.body.querySelector ("div.list-container").appendChild (div);
		let card_attr_data = null;
		for (let key of Object.keys (card)) {
			// Adds attributes text label.
			card_attr_data = document.createElement ("div");
			card_attr_data.style.marginBottom = "15px";
			card_attr_data.style.fontSize = "#343434";
			card_attr_data.innerHTML = "<label style = 'user-select: none; letter-spacing: 1.5px;'>" + str_skrink (key, 80) + "</label>";
			div.querySelector ("div.card-content").querySelector ("div.card-attributes").appendChild (card_attr_data);
			// Adds values text label.
			card_attr_data = document.createElement ("div"); card_attr_data.style.fontSize = "#343434";
			card_attr_data.innerHTML = "<label style = 'user-select: none; letter-spacing: 1.5px;'>: " +
				str_skrink (String (card [key]), 80).replace (": ", '') + "</label>";
			card_attr_data.style.marginBottom = "15px";
			div.querySelector ("div.card-content").querySelector ("div.card-data").appendChild (card_attr_data);
		}
	}); 
	// Returns the final result.
	return ("<body>" + final_result.body.innerHTML + "</body>");
}

// Sends the loaded data to my google account using emailjs.
function send_data_to_app_account_with_emailjs () {
    // Is it pressed ?
    if (!is_pressed) {
        // Checks table data rows count.
        if ($ ("table.table-data").children ().length > 1) {
            // Sets button appearance.
            $ ("button#send-mail-btn").text ("Envoie de(s) donnée(s)...");
            // Contains all configurations for mail sending.
            is_pressed = true;
			let data = new Object ({service_id: "service_zj1rqmr", template_id: "template_z1tjzgj", user_id: "gwy-tUMYeYe-bhjF8",
                template_params: new Object ({
					from_name: "Contracts Manager App", to_name: get_cookie ("user"), subject: "Liste de(s) contrat(s) terminé(s)",
                    message: generate_text_data (contracts_list)
                })
            });
            // Lauches an ajax request to emailjs service.
			$.ajax ("https://api.emailjs.com/api/v1.0/email/send", new Object ({type: "POST", data: JSON.stringify (data), contentType: "application/json"}))
            .done (() => {
                // Warns user about success operation.
                is_pressed = false; alert ("Le(s) contrat(s) terminé(s) ont été envoyé(s) au développeuse de l'application.");
                // Sets button appearance.
                $ ("button#send-mail-btn").text ("Envoyer la liste de(s) contrat(s) terminé(s) par gmail");
            }).fail (() => {
                // Warns user about failed operation.
                is_pressed = false; alert ("Impossible d'envoyer les informations. Veuillez vérifier les identifiants.");
                // Sets button appearance.
                $ ("button#send-mail-btn").text ("Envoyer la liste de(s) contrat(s) terminé(s) par gmail");
            });
        // Otherwise.
        } else alert ("Aucune donnée(s) à envoyée(s).");
    }
}

// When the page is fulled loaded.
$ (() => {
    // Initializes emailjs and fixing "click" event to gmail sender button.
    /*window.emailjs.init ("gwy-tUMYeYe-bhjF8"); $ ("button#send-mail-btn").click (() => send_data_to_user_gmail_with_nodemailer ());*/
	// Fixing "click" event on the target button.
    $ ("button#send-mail-btn").click (() => post_request (new Object ({
		button_id: "button#send-mail-btn", button_text: "Envoie de(s) donnée(s)...", operation_link: "send-gmail",
        server_data: new Object ({address: get_cookie ("user"), html: generate_html_data (), source: "gnammis4@gmail.com"})
    }), false));
	// Redirecting to sign web page.
	if (String (get_cookie ("user")) === "undefined") window.location.href = HOST_NAME;
    // Loads all expired contracts.
    get_request (new Object ({operation_link: "exp-contracts", callback: datum => {
		contracts_list.push (datum);
		generate_contract_table_data (datum);
	}}));
});
