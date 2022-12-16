// When this web page is fulled loaded.
$ (() => {
    // Redirecting to sign web page.
    if (String (get_cookie ("user")) === "undefined") window.location.href = HOST_NAME;
    // Getting all expired contracts.
    get_request (new Object ({operation_link: "exp-contracts", callback: datum => generate_dropdown_values (datum)}));
    // Fixing "input" event.
	$ ("input#sdate, input#edate").on ("input", () => date_difference ());
    // Fixing "click" event.
    $ ("button#override-contract-btn").click (() => post_request (new Object ({
        button_id: "button#override-contract-btn", button_text: "Vérification...", operation_link: "change-contract",
        page_link: "running-contracts", server_data: new Object ({
            sdate: $ ("input#sdate").val ().trimLeft ().trimRight (),
            edate: $ ("input#edate").val ().trimLeft ().trimRight (),
            time: $ ("input#time").val ().trimLeft ().trimRight (),
            id: $ ("select#dropdown").val ()
        })
    }), false));
});
