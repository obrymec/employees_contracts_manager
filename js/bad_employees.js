// When the page is fulled loaded.
$ (() => {
    // Redirecting to sign web page.
    if (String (get_cookie ("user")) === "undefined") window.location.href = HOST_NAME;
    // Loads all bad employees.
    get_request (new Object ({operation_link: "bads-employees", callback: datum => generate_employee_table_data (datum)}));
});
