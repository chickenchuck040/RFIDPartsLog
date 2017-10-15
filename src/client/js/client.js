
var ID_LENGTH = 8;

// Employee
var employee_card = document.getElementById("employee_card");
var employee_card_input = document.getElementById("employee_card_input");

var employee_found_div = document.getElementById("employee_found");
var employee_name = document.getElementById("employee_name");

var employee_not_found_div = document.getElementById("employee_not_found");

// Customer
var employee_login_submit = document.getElementById("log_in_button");
var employee_logout_submit = document.getElementById("log_out_button");
var customer_request_submit = document.getElementById("customer_request_button");

var customer_card = document.getElementById("customer_card");
var customer_card_input = document.getElementById("customer_card_input");

var customer_found_div = document.getElementById("customer_found");
var customer_name = document.getElementById("customer_name");

var customer_not_found_div = document.getElementById("customer_not_found");

var customer_email = document.getElementById("customer_email");
var customer_email_submit = document.getElementById("customer_email_submit");

var customer_email_not_found = document.getElementById("customer_email_not_found");

// Parts request
var parts_request_button = document.getElementById("parts_request_button");

var parts_request = document.getElementById("parts_request");
var parts_request_description = document.getElementById("parts_request_description");

var parts_request_submit = document.getElementById("parts_request_submit");

var parts_request_success = document.getElementById("parts_request_success");

// Equipment loan
var equipment_loan_button = document.getElementById("equipment_loan_button");

var equipment_loan = document.getElementById("equipment_loan");
var equipment_loan_id = document.getElementById("equipment_loan_id");
var equipment_loan_location = document.getElementById("equipment_loan_location");

var equipment_loan_success = document.getElementById("equipment_loan_success");

// Equipment return
var equipment_return = document.getElementById("equipment_success_success");

var equipment_return = document.getElementById("equipment_return");
var equipment_return_id = document.getElementById("equipment_return_id");
var equipment_return_location = document.getElementById("equipment_return_location");
var equipment_return_success = document.getElementById("equipment_return_success");

var equipment_not_found = document.getElementById("equipment_not_found");

employee_card_input.focus();

//var employee_active;
function show_user(user) {
    if (user.type === "employee") {
        // Showing employee
        console.log("Showing Employee: ");
        console.log(user);
        if (user.name) {
            showElements([
                employee_found_div
            ]);
            hideElements([
                employee_not_found_div,
                customer_card,
                customer_found_div,
                customer_not_found_div,
                customer_card
            ]);
            employee_name.innerHTML = user.name;
        } else {
            hideElements([
                employee_found_div,
                customer_found_div,
                customer_not_found_div,
                customer_card
            ]);
            showElements([
                employee_not_found_div,
            ]);
        }
    } else {
        // Showing customer
        console.log("Showing Customer: ");
        console.log(user);
        if (user.name) {
            console.log("Customer name: ", user.name);

            showElements([
                customer_found_div
            ]);

            hideElements([
                customer_not_found_div,
                customer_email_not_found
            ]);

            // Update with customer info
            customer_name.innerHTML = user.name;

        } else {
            if (user.search === "card") {
                showElements([
                    customer_not_found_div
                ]);

                hideElements([
                    customer_found_div
                ]);
            } else {
                showElements([
                    customer_email_not_found
                ]);

                hideElements([
                    customer_found_div
                ]);
            }
        }
    }
}


customer_request_submit.addEventListener('click', function (e) {
    // Show customer card input
    window.setTimeout(function () {
        customer_card_input.focus();
    }, 100);

    showElements([
        customer_card
    ]);

    hideElements([
        customer_not_found_div,
        customer_email_not_found,
        customer_found_div
    ]);

}, false);

// Employee card search
employee_card_input.addEventListener('input', function (e) {
    var id = employee_card_input.value;
    //Hide info when text field is empty
    hideElements([
        employee_found_div,
        employee_not_found_div
    ]);
    if (id.length >= ID_LENGTH) {
        console.log("ID entered");
        google.script.run.withSuccessHandler(show_user).getUserInfo(id, true);
    }
}, false);

//Customer card search
customer_card_input.addEventListener('input', function (e) {
    var id = customer_card_input.value;
    //Hide info when text field is empty
    hideElements([
        customer_found_div,
        customer_not_found_div,
        customer_email_not_found
    ]);
    if (id.length >= ID_LENGTH) {
        console.log("ID entered");
        google.script.run.withSuccessHandler(show_user).getUserInfo(id, false);
    }
}, false);

// Customer email search (New customer)
customer_email_submit.addEventListener('click', function (e) {
    var email = customer_email.value;
    var card_id = customer_card_input.value;
    google.script.run.withSuccessHandler(show_user).new_customer(card_id, email);
}, false);

// Parts request
parts_request_button.addEventListener('click', function (e) {
    console.log("Parts request");
    showElements([
        parts_request
    ]);

    hideElements([
        parts_request_success,
        equipment_loan,
        equipment_loan_success,
        equipment_return,
        equipment_return_success,
        equipment_not_found,
    ]);
}, false);

// Parts request submit
parts_request_submit.addEventListener('click', function (e) {
    google.script.run.parts_request(
        employee_card_input.value,
        customer_card_input.value,
        parts_request_description.value
    );
}, false);

// Employee login
employee_login_submit.addEventListener('click', function (e) {
    // Just need to send request to worker log
}, false);

// Employee logout
employee_logout_submit.addEventListener("click", function (e) {
    // Just need to send request to worker log
}, false);

function hideElements(elements) {
    //console.log("hide elements called");
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        //console.log(element);
        element.style.display = "none";
        element.classList.add("d-none");
        element.classList.remove("d-block");
        //console.log(element);
    }
}

function showElements(elements) {
    //console.log("show elements called");
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.style.display = "visible";
        element.classList.add("d-block");
        element.classList.remove("d-none");
        //console.log(element);
    }
}
