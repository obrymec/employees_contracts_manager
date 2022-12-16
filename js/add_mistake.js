// When this web page is fulled loaded.
$ (() => {
    // Redirecting to sign web page.
    if (String (get_cookie ("user")) === "undefined") window.location.href = HOST_NAME;
    // Getting all running contracts.
    get_request (new Object ({operation_link: "run-contracts", callback: datum => generate_dropdown_values (datum)}));
    // Fixing "click" event on the target button.
    $ ("button#save-mistake-btn").click (() => post_request (new Object ({
        button_id: "button#save-mistake-btn", button_text: "Vérification...", operation_link: "save-mistake",
        page_link: "bad-employees", server_data: new Object ({
            description: $ ("textarea#description").val ().trimLeft ().trimRight (), contract_id: $ ("select#dropdown").val (),
            type: $ ("select#type").val (), date: $ ("input#date").val ()
        })
    }), false));
});
