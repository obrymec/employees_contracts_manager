// When the page is fulled loaded.
$ (() => {
    // Redirecting to sign web page.
    if (String (get_cookie ("user")) === "undefined") window.location.href = HOST_NAME;
    // Loads all running contracts.
    get_request (new Object ({operation_link: "run-contracts", callback: datum => generate_contract_table_data (datum)}));
});
