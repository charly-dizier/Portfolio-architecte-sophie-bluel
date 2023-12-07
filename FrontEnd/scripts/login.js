const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const formConnection = document.getElementById("formConnection");


formConnection.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log(loginEmail.value);
    console.log(loginPassword.value);

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: loginEmail.value,
            password: loginPassword.value,
        }),
    }).then((response) => {
        if (response.status !== 200) {
            console.log("message d'erreur de connection");
        } else {
            console.log("recupération token et renvoie page acceuil");
        }
    });
});
