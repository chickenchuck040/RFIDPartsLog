
var employee_card = new CardLookup(
    "Employee Card", 
    document.getElementById("employee_card"),
    "employee",
);

var customer_card = new CardLookup(
    "Customer Card", 
    document.getElementById("customer_card"),
    "customer",
);

employee_card.focus();
employee_card.on_success = function(user) {
    customer_card.focus();
}

var search = new Search(
    document.getElementById("search"),
    [
        {
            name: "Parts Request",
            type: "parts_request"
        },
        {
            name: "Parts Loan",
            type: "parts_loan"
        },
        {
            name: "Other",
            type: "other"
        }
    ]
);

search.onadd = function(search) {
    console.log(search);
}
