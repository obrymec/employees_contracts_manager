// When this web page is fulled loaded.
$ (() => {
    // Redirecting to sign web page.
    if (String (get_cookie ("user")) === "undefined") window.location.href = HOST_NAME;
    // Getting all running contracts.
    get_request (new Object ({operation_link: "run-contracts", callback: datum => generate_dropdown_values (datum)}));
    // Fixing "click" event on the target button.
    $ ("button#stop-contract-btn").click (() => post_request (new Object ({
        button_id: "button#stop-contract-btn", button_text: "Validation...", operation_link: "stp-contract",
        page_link: "running-contracts", server_data: new Object ({id: $ ("select#dropdown").val ()})
    }), false));
});
