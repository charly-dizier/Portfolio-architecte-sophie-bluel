//On cible le token contenue dans le localStorage
const token = localStorage.getItem("token");

//On cible les boutons de login et logout
const btnLogin = document.getElementById("nav__login");
const btnLogout = document.getElementById("nav__logout");

//On cible touts les éléments qui doivent être modifié
const displayEditBanner = document.querySelector(".editBanner");
const displayEditProject = document.querySelector(".editProject");
const displayFilter = document.querySelector(".filterContainer");

//////////////////////////////////////////////////////////////////
//Fonction pour afficher et cache les éléments liés à la connexion
function showLoggedInElements() {
    btnLogin.style.display = "none";
    btnLogout.style.display = "block";
    displayEditBanner.style.display = "flex";
    displayEditProject.style.display = "flex";
    displayFilter.style.display = "none";
}
/////////////////////////////////////////////////////////////////////
//Fonction pour afficher et cache les éléments liés à la déconnexion
function showLoggedOutElements() {
    btnLogin.style.display = "block";
    btnLogout.style.display = "none";
    displayEditBanner.style.display = "none";
    displayEditProject.style.display = "none";
    displayFilter.style.display = "flex";
}

/////////////////////////////////////////////////
//Si le token est présent dans le localStorage...
if (token !== null) {
    //On lance la fonction liés à la connexion
    showLoggedInElements();
//Sinon...
} else {
    //On lance la fonction liés a la déconnexion
    showLoggedOutElements();
}

//On écoute le bouton et au click...
btnLogout.addEventListener("click", () => {
    //On retire le token du local storage
    localStorage.removeItem("token");
    //On lance la fonction liés a la déconnexion
    showLoggedOutElements();
});