// When the page is fulled loaded.
$ (() => {
    // Redirecting to sign web page.
    if (String (get_cookie ("user")) === "undefined") window.location.href = HOST_NAME;
    // Loads employees contract.
    get_request (new Object ({operation_link: "run-contracts", callback: datum => generate_employee_table_data (datum)}));
});
