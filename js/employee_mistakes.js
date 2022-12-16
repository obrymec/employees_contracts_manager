// When this web page is fulled loaded.
$ (() => {
    // Redirecting to sign web page.
    if (String (get_cookie ("user")) === "undefined") window.location.href = HOST_NAME;
    // Getting all running contracts.
    get_request (new Object ({operation_link: "bads-employees", callback: datum => generate_dropdown_values (datum)}));
    // Fixing "click" event on the target button.
    $ ("button#show-mistakes-btn").click (() => {
        // Destroys the preview data.
        $ ("tbody").remove ();
        // Loads all employee mistakes.
        post_request (new Object ({
            button_id: "button#show-mistakes-btn", button_text: "Chargement...", operation_link: "emp-mistakes",
            server_data: new Object ({id: $ ("select#dropdown").val ()}), callback: data => {
                // Corrects the date.
                data.mdate = data.mdate.split ('T') [0].split ('-'); data.mdate = (data.mdate [2] + '/' + data.mdate [1] + '/' + data.mdate [0]);
                // Creates a new table row for each returned data.
                $ ("table.table-data").append ("<tbody class = 'table-body silver'>\
                    <td><label>" + data.id + "</label></td><td><label>" + data.type + "</label></td>\
                    <td><label>" + data.mdate + "</label></td><td><label>" + str_skrink (data.description, 64) + "</label></td>\
                <tbody>");
            }
        }), false);
    });
});
