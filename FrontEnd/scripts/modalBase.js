//On cible l'ensemble de la section modal
const modalMod = document.querySelector(".modal__main");
//On cible le mode Galery
const modalGalery = document.getElementById("modalGalery");
//On cible le mode Ajout d'image
const modalAddPicture = document.getElementById("modalAddPicture");


//////////////////////////////////////
//Gestion de l'affichage du mode modal
//On cible le bouton "modifier" les projets
const btnEditProject = document.querySelector(".editProject");
//On écoute le bouton, et au click on affiche le mode modal
btnEditProject.addEventListener("click", () => {
    modalMod.style.display = "block"
});


//////////////////////////////////////////////////////////////
//Gestion du switch entre le mode Galery et le mode AddPicture
//Passage au mode ajout d'image par click sur bouton
const btnAddPicture = document.getElementById("btnAddPicture");
btnAddPicture.addEventListener("click", () => {
    modalGalery.style.display = "none";
    modalAddPicture.style.display = "block";
});
//Retour au mode galery par click sur fleche précédente
const addPictureLeftArrow = document.querySelector(".modal__card--iconArrow");
addPictureLeftArrow.addEventListener("click", () => {
    modalAddPicture.style.display = "none";
    modalGalery.style.display = "block";
});


////////////////////////////////////////////////////////////////////////////////////
//Gestion de la fermeture modal par les icon "X" et réinitialisation au mode galery 
const iconCloseModalMod = document.querySelectorAll(".modal__card--iconCross");
iconCloseModalMod.forEach((icon) => {
    icon.addEventListener("click", () => {
        modalMod.style.display = "none";
        modalAddPicture.style.display = "none";
        modalGalery.style.display = "block";
    });
});
//Gestion de la fermeture modal par l'overlay et réinitialisation au mode galery  
const overlayModalMod = document.querySelector(".modal__overlay");
overlayModalMod.addEventListener("click", () => {
    modalMod.style.display = "none";
    modalAddPicture.style.display = "none";
    modalGalery.style.display = "block";
});