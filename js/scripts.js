function toggleLogin() {
    let popup = document.getElementById("login");

    if (popup.style.display === "none") {
        popup.style.display = "block";
    } else {
        popup.style.display = "none";
        popup.querySelector("input").value = "";
        let items = popup.querySelectorAll("input");
        for (item of items) {
            item.value = "";
        }
    }
}

function createUser() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let re = /\S+@\S+\.\S+/;
    let pwLength = password.length;

    let user = { firstName: firstName, lastName: lastName, email: email, password: password };

    // eslint-disable-next-line max-len
    if (user.firstName === "" || user.lastName === "" || user.email === "" || user.password === "") {
        alert("Bitte alle Felder ausfüllen");
    } else if(re.test(user.email) === false) {
        alert("Bitte eine gültige Email angeben");
    } else if ( pwLength < 7) {
        alert("Passwort zu kurz");
    } else {
        localStorage.setItem("user", JSON.stringify(user));
    }
}

function editUser() {
    let firstName = document.getElementById("editFirstName").value;
    let lastName = document.getElementById("editLastName").value;
    let email = document.getElementById("editEmail").value;
    let password = document.getElementById("editPassword").value;

    let re = /\S+@\S+\.\S+/;
    let pwLength = password.length;

    let user = { firstName: firstName, lastName: lastName, email: email, password: password };

    // eslint-disable-next-line max-len
    if (user.firstName === "" || user.lastName === "" || user.email === "" || user.password === "") {
        alert("Bitte alle Felder ausfüllen");
    } else if (re.test(user.email) === false) {
        alert("Bitte eine gültige Email angeben");
    } else if ( pwLength < 7) {
        alert("Passwort zu kurz");
    } else {
        let loggedInUser = JSON.parse(localStorage.getItem("user"));
        loggedInUser.firstName = firstName;
        loggedInUser.lastName = lastName;
        loggedInUser.email = email;
        loggedInUser.password = password;
        localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
}

document.getElementById("editUser").addEventListener("click", editUser);

document.addEventListener("DOMContentLoaded", function() {
    let loggedInUser = JSON.parse(localStorage.getItem("user"));
    if ( typeof loggedInUser !== "undefined" && loggedInUser) {
        document.getElementById("editFirstName").setAttribute("value", loggedInUser["firstName"]);
        document.getElementById("editLastName").setAttribute("value", loggedInUser["lastName"]);
        document.getElementById("editEmail").setAttribute("value", loggedInUser["email"]);
        document.getElementById("editPassword").setAttribute("value", loggedInUser["password"]);
    }
});

