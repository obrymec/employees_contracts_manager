// When this web page is fulled loaded.
$ (() => {
	// Redirecting to sign web page.
    if (String (get_cookie ("user")) === "undefined") window.location.href = HOST_NAME;
    // Fixing "input" event.
	$ ("input#sdate, input#edate").on ("input", () => date_difference ());
    // Fixing "click" event.
    $ ("button#save-contract-btn").click (() => post_request (new Object ({
        button_id: "button#save-contract-btn", button_text: "Vérification...", operation_link: "save-contract",
        page_link: "running-contracts", server_data: new Object ({
            surname: $ ("input#surname").val ().toLowerCase ().trimLeft ().trimRight (),
            name: $ ("input#name").val ().toLowerCase ().trimLeft ().trimRight (),
            sdate: $ ("input#sdate").val ().trimLeft ().trimRight (),
            edate: $ ("input#edate").val ().trimLeft ().trimRight (),
            time: $ ("input#time").val ().trimLeft ().trimRight ()
        })
    }), false));
});
