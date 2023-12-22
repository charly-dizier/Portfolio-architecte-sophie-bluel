//On cible l'ensemble de la section modal
const modalMod = document.querySelector(".modal__main");
//On cible le mode Galery
const modalGaleryMod = document.getElementById("modalGalery");
//On cible le mode Ajout d'image
const modalAddProjectMod = document.getElementById("modalAddProject");

//On cible le bouton "modifier" les projets
const btnEditProject = document.querySelector(".editProject");
//On cible le bouton "ajout d'image"
const btnAddProject = document.getElementById("btnAddProject");
//On cible la flèche page précédente
const AddProjectLeftArrow = document.querySelector(".modal__card--iconArrow");
//On cible toutes les icons "X" de fermeture
const iconCloseModalMod = document.querySelectorAll(".modal__card--iconCross");
//On cible l'overlay (autour de la modal)
const overlayModalMod = document.querySelector(".modal__overlay");


//////////////////////////////////////
//Ecoute des différents évenements
//Ouverture générale modal
btnEditProject.addEventListener("click", showModal);
//Switch vers modal ajout d'image
btnAddProject.addEventListener("click", () => { 
    openModaAddProject();
    resetForm();
});
//Retour modal gallerie
AddProjectLeftArrow.addEventListener("click", openModalGalery);
//Fermeture par icon
iconCloseModalMod.forEach((icon) => {
    icon.addEventListener("click", closeModal);
});
//Fermeture par click sur l'overlay autour de la modal
overlayModalMod.addEventListener("click", closeModal);


///////////////////////////////////////////////
//Fonction outils ouverture, fermeture et reset
function showModal() {
    modalMod.style.display = "block";
}
function openModalGalery() {
    modalAddProjectMod.style.display = "none";
    modalGaleryMod.style.display = "block";
}
function openModaAddProject() {
    modalGaleryMod.style.display = "none";
    modalAddProjectMod.style.display = "block";
}
function closeModal() {
    modalMod.style.display = "none";
    modalAddProjectMod.style.display = "none";
    modalGaleryMod.style.display = "block";
}
function resetForm() {
    inputFile.value = "";
    inputTitle.value = "";
    inputCategory.value = "";
    btnSubmit.setAttribute('disabled', '');
    btnSubmit.classList.remove("active")
    displayImg.src = "";
    displayImg.alt = "";
    displayIcon.style.display = "block";
    displayBtnFile.style.display = "flex";
    displayTxt.style.display = "block";
}
function resetGalery() {
    gallery.innerHTML = ""; 
    displayCardProject();
}
function resetModalGalery() {
    modalGalery.innerHTML = "";
    creationModalProject()
}