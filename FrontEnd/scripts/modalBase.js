//On cible l'ensemble de la section modal
const modalMod = document.querySelector(".modal__main");
//On cible le mode Galery
const modalGalery = document.getElementById("modalGalery");
//On cible le mode Ajout d'image
const modalAddProject = document.getElementById("modalAddProject");


//////////////////////////////////////
//Gestion de l'affichage du mode modal
//On cible le bouton "modifier" les projets
const btnEditProject = document.querySelector(".editProject");
//On écoute le bouton, et au click on affiche le mode modal
btnEditProject.addEventListener("click", () => {
    modalMod.style.display = "block"
});


//////////////////////////////////////////////////////////////
//Gestion du switch entre le mode Galery et le mode AddProject
//Passage au mode ajout d'image par click sur bouton
const btnAddProject = document.getElementById("btnAddProject");
btnAddProject.addEventListener("click", () => { 
    modalGalery.style.display = "none";
    modalAddProject.style.display = "block";
    //réinitialisation du formulaire et l'affichage 
    inputFile.value = "";
    inputTitle.value = "";
    inputCategory.value = "";
    btnSubmit.setAttribute('disabled', '');
    btnSubmit.classList.remove("active")
    displayImg.src = "";
    displayIcon.style.display = "block";
    displayBtnFile.style.display = "flex";
    displayTxt.style.display = "block";
    displayImg.alt = "";

});
//Retour au mode galery par click sur fleche précédente
const AddProjectLeftArrow = document.querySelector(".modal__card--iconArrow");
AddProjectLeftArrow.addEventListener("click", () => {
    modalAddProject.style.display = "none";
    modalGalery.style.display = "block";
});


////////////////////////////////////////////////////////////////////////////////////
//Gestion de la fermeture modal par les icon "X" et réinitialisation au mode galery 
const iconCloseModalMod = document.querySelectorAll(".modal__card--iconCross");
iconCloseModalMod.forEach((icon) => {
    icon.addEventListener("click", () => {
        modalMod.style.display = "none";
        modalAddProject.style.display = "none";
        modalGalery.style.display = "block";
    });
});
//Gestion de la fermeture modal par l'overlay et réinitialisation au mode galery  
const overlayModalMod = document.querySelector(".modal__overlay");
overlayModalMod.addEventListener("click", () => {
    modalMod.style.display = "none";
    modalAddProject.style.display = "none";
    modalGalery.style.display = "block";
});