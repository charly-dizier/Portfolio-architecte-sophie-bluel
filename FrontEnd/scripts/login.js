//On cible le formulaire de connection
const formConnection = document.getElementById("formConnection");

//On écoute l'évennement "submit" via click sur bouton ou "enter" quand un input de saisi est actif
formConnection.addEventListener("submit", async (event) => {
    //On empèche le comportement par défaut de "submit"
    event.preventDefault();

    //On cible le contenu de l'input "email"
    const loginEmail = document.getElementById("email").value;
    //On cible le contenue de l'input "password"
    const loginPassword = document.getElementById("password").value;

    //Condition de vérification des champs de saisi
    if (!loginEmail || !loginPassword) {
        //Si les champs sont vide, message / alert et on sort 
        alert("Veuillez remplir tous les champs.");
        //On sort de la fonction
        return;
    }

    //Gestion des erreur
    try {
        //On intéroge l'API avec une requête POST pour l'anthentification
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            //On détermine le format de la charge utile
            headers: {"Content-Type": "application/json"},
            //On détermine la charge utile, qui sera le contenue de l'input email et le contenue de l'input password
            body: JSON.stringify({email: loginEmail, password: loginPassword}),
        });

        //Vérificvation de la réussite de la requête
        if (!response.ok) {
            //Si la réponse n'est pas positive (status autre que 200), gestion de l'erreur avec message
            throw new Error("Erreur dans l’identifiant ou le mot de passe.")
        }

        //On récupère les données a l'intérieur d'une variable "result"
        const result = await response.json();
        //On stock le token dans le localStorage 
        localStorage.setItem("token", result.token);
        //On renvoie à la page d'acceuil
        window.location = "index.html"

    //Récupération des erreur
    } catch (error) {
        alert(error.message || "Une erreur s'est produite lors de la connexion.")
    }
});