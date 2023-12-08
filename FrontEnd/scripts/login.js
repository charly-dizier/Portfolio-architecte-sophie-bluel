//On cible le formulaire de connection
const formConnection = document.getElementById("formConnection");

//On écoute l'évennement "submit" via click sur bouton ou "enter" quand un input de saisi est actif
formConnection.addEventListener("submit", (event) => {
    //On empèche le comportement par défaut de "submit"
    event.preventDefault();
    //On cible le contenue de l'input "email"
    const loginEmail = document.getElementById("email").value;
    //On cible le contenue de l'input "password"
    const loginPassword = document.getElementById("password").value;

    //On intéroge l'API ../users/login avec la méthode "post"
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        //On détermine le format de la charge utile
        headers: {"Content-Type": "application/json"},
        //On détermine la charge utile, qui sera le contenue de l'input email et le contenue de l'input password
        body: JSON.stringify({email: loginEmail, password: loginPassword}),
    })

    //On récupère la réponse et on la transforme en objet json
    .then(response => response.json())
    //On démarre une boucle de condition sur le résultat de l'object
    .then(result => {
        //Si l'objet renvoie "error" ou un message
        if (result.error || result.message) {
            //Message pop-up d'erreur
            alert("Erreur dans l’identifiant ou le mot de passe");
        //Sinon on stock le token dans le localStorage et on renvoie à la page d'acceuil
        } else {
            localStorage.setItem("token", result.token);
            window.location = "index.html"
        }
    })
});