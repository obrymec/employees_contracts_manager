// Shows sign in section.
function show_sign_in () {
    // Destroys sign up focus and put it to sign in.
    $ ("div.sign-up-option").removeClass ("active-section");
    $ ("div.sign-in-option").addClass ("active-section");
    // Hides sign up body and shows sign in body.
    $ ("div.sign-in-body").removeClass ("hide");
    $ ("div.sign-up-body").addClass ("hide");
    $ ("input").val ('');
}

// Shows sign up section.
function show_sign_up () {
    // Destroys sign in focus and put it to sign up.
    $ ("div.sign-in-option").removeClass ("active-section");
    $ ("div.sign-up-option").addClass ("active-section");
    // Hides sign in body and shows sign up body.
    $ ("div.sign-up-body").removeClass ("hide");
    $ ("div.sign-in-body").addClass ("hide");
    $ ("input").val ('');
}

// Called when this page is fulled loaded.
$ (() => {
    // Fixing click event on sign in and sign up sections.
    $ ("div.sign-in-option").click (() => show_sign_in ());
    $ ("div.sign-up-option").click (() => show_sign_up ());
    // Redirecting to stop contract web page.
    if (String (get_cookie ("user")) !== "undefined") window.location.href = (HOST_NAME + "/stop-contract");
    // Fixing "click" event on sign up button.
    $ ("button#sign-up-btn").click (() => post_request (new Object ({
        button_id: "button#sign-up-btn", button_text: "Vérification...", loaded: () => show_sign_in (),
        operation_link: "sign-up", server_data: new Object ({
            username: $ ("input#pseudo").val ().toLowerCase ().trimLeft ().trimRight (),
            email: $ ("input#email").val ().toLowerCase ().trimLeft ().trimRight (),
            password: $ ("input#password").val ().trimLeft ().trimRight (),
            confirm: $ ("input#confirm").val ().trimLeft ().trimRight ()
        })
    }), true));
    // Fixing "click" event on sign in button.
    $ ("button#sign-in-btn").click (() => post_request (new Object ({
        button_id: "button#sign-in-btn", button_text: "Vérification...", operation_link: "sign-in", page_link: "stop-contract",
        loaded: response => set_cookie ("user", response.server_data.email, 1),
        server_data: new Object ({
            id: $ ("input#user-id").val ().toLowerCase ().trimLeft ().trimRight (),
            password: $ ("input#cpassword").val ().trimLeft ().trimRight ()
        })
    }), true));
});
