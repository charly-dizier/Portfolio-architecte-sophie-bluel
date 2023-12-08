//On cible le token contenue dans le localStorage
const token = localStorage.getItem("token");

//On cible les boutons de login et logout
const btnLogin = document.getElementById("nav__login");
const btnLogout = document.getElementById("nav__logout");

//On cible touts les éléments qui doivent être modifié
const displayEditBanner = document.querySelector(".editBanner");
const displayEditProject = document.querySelector(".editProject");
const displayFilter = document.querySelector(".filterContainer");

//Si le token est présent dans le localStorage. On affiche ou cache les éléments
if (token !== null) {
    btnLogin.style.display = "none";
    btnLogout.style.display = "block";

    displayEditBanner.style.display = "flex";
    displayEditProject.style.display = "flex";
    displayFilter.style.display = "none";

//Si le token n'est pas présent dans le localStorage. On affiche ou cache les éléments
} else {
    btnLogin.style.display = "block";
    btnLogout.style.display = "none";
}

//Au click sur le logout, on enlève le token du localStorage
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
});