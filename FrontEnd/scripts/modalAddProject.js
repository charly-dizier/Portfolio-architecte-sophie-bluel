//On cible le contenue de la modal AddProject
const formAddProject = document.querySelector(".modal__form");

//On cible touts les éléments qui seront afficher/caché en fonction des besoins
const displayImg = document.querySelector(".modal__form__imgBlock--img");
const displayIcon = document.querySelector(".modal__form__imgBlock--icon");
const displayTxt = document.querySelector(".modal__form__imgBlock--txt");
const displayBtnFile = document.querySelector(".modal__form__imgBlock--btnFile");

//On cible touts les élémnts du formulaire d'ajout de projet
const inputFile = document.querySelector(".modal__form__imgBlock--inputFile");
const inputTitle = document.querySelector(".modal__form__titleBlock--input");
const inputCategory = document.querySelector(".modal__form__categoryBlock--select");
const btnSubmit = document.querySelector(".modal__form--btnSubmit");

////////////////////////////
//Fonction d'ajout de projet
async function addProject() {
    //Gestion des erreur
    try {
        //Création d'un objet FormData
        const formData = new FormData();
        //On définit le contenue de l'input file comme étant "image"
        formData.append("image", inputFile.files[0]);
        //On définit la valeur de l'input title comme étant "title"
        formData.append("title", inputTitle.value);
        //On définit la valeur de l'input category comme étant "category"
        formData.append("category", inputCategory.value);

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData,
        });
        
        if (response.ok) {
            closeModal();
            resetGalery();
            resetModalGalery();
        } else {
            console.log("La requête a échoué. Error statut :", response.status);
        }
    //Récupération des erreur
    } catch (error) {
        console.log("Une erreur s'est produite :", error);
    }
}

//////////////////////////////////
//On écoute l'envoie du formulaire
formAddProject.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (validateFields()) {
        if (confirm("Etes vous sur de vouloir ajouter ce projet ?")) {
            await addProject();
        }
    } else {
        alert("Veuillez remplir touts les champs");
    }
});

function validateFields() {
    return inputFile.files.length > 0 && inputTitle.value !== "" && inputCategory.value !== "";
}

/////////////////////////////////////////////////
//Gestion d'affichage de l'image du futur project
//On ecoute le changement de l'input file
inputFile.addEventListener("change", (event) => {
    //On empeche le comportement par défaut
    event.preventDefault();
    //On récupère le fichier selectionner dans l'input file
    const file = event.target.files[0];
    //On vérifie s'il fait plus de 4Mo
    if (file.size > 4194304) {
        //Si oui, message d'erreur
        alert("Fichier trop volumineux: 4mo max");
        //On réinitialise le champ
        inputFile.value = "";
    //Sinon
    } else {
        //On affiche et cache les éléments souhaités
        displayImg.style.display = "block";
        inputFile.style.display = "none";
        displayIcon.style.display = "none";
        displayBtnFile.style.display = "none";
        displayTxt.style.display = "none";
        
        //Création d'un objet FileReader 
        const reader = new FileReader();
        //Une fois le fichier lut, on appele la fonction 
        reader.onload = (readerEvent) => {
            //On assigne le résultat au src de la balise img
            displayImg.src = readerEvent.target.result;
        };
        //Permet la lecture de file en tant qu'URL grace a l'objet reader
        reader.readAsDataURL(file);
    }
});

/////////////////////////////////////
//Création des options de catégorries
//On récupère les données de l'API
fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
        //On lance une boucle pour chaque élément
        data.forEach((category) => {
            //Création des balise option
            const option = document.createElement("option");
            //On leur assigne la valeur id
            option.value = category.id
            //On leurs ajoute la valeur de name comme contenue texte
            option.textContent = category.name;
            //On injecte dans le DOM
            inputCategory.appendChild(option);
        });
    });

/////////////////////////////////////////
//Gestion d'affichage du bouton d'envoie
function activeBtnSubmit() {
    //La variable appelle la fonction
    const isValid = validateFields();
    //Le bouton est désactiver tant que isValid ne renvoie la valeur "true"
    btnSubmit.disabled = !isValid;
    //On ajoute ou enlève la class css en fonction de la valeur de isValid
    btnSubmit.classList.toggle("active", isValid);
}

//On écoute chaque input et on lance la fonction
inputFile.addEventListener("input", activeBtnSubmit);
inputTitle.addEventListener("input", activeBtnSubmit);
inputCategory.addEventListener("input", activeBtnSubmit);