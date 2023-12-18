const formAddProject = document.querySelector(".modal__form");

const displayImg = document.querySelector(".modal__form__imgBlock--img");
const displayIcon = document.querySelector(".modal__form__imgBlock--icon");
const displayTxt = document.querySelector(".modal__form__imgBlock--txt");
const displayBtnFile = document.querySelector(".modal__form__imgBlock--btnFile");

const inputFile = document.querySelector(".modal__form__imgBlock--inputFile");
const inputTitle = document.querySelector(".modal__form__titleBlock--input");
const inputCategory = document.querySelector(".modal__form__categoryBlock--select");
const btnSubmit = document.querySelector(".modal__form--btnSubmit");

//Fonction d'ajout de projet
async function addProject() {

    //On définit l'objet formData
    const formData = new FormData();
    formData.append("image", inputFile.files[0]);
    formData.append("title", inputTitle.value);
    formData.append("category", inputCategory.value);

    try {
        //On intéroge l'API
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData,
        });
        const responseData = await response.json();

    } catch (error) {
        console.log("Une erreur est survenue lors de l'ajout du projet", error);
    }
}

formAddProject.addEventListener("submit", (event) => {
    event.preventDefault();

    const confirmation = confirm("Etes vous sur de vouloir ajouter ce projet ?");

    if (confirmation) {
        addProject(event);
    }
})


//Gestion d'affichage de l'image du futur project
inputFile.addEventListener("change", (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file.size > 4194304) {
        alert("Fichier trop volumineux: 4mo max");
        inputFile.value = "";
    } else {
        displayImg.style.display = "block";
        inputFile.style.display = "none";
        displayIcon.style.display = "none";
        displayBtnFile.style.display = "none";
        displayTxt.style.display = "none";
        
        //On déclare l'objet FileReader
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
            displayImg.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    }
});


/////////////////////////////////////
//Création des options de catégorries
fetch("http://localhost:5678/api/categories")
.then((response) => response.json())
.then((data) => {
    data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id
        option.textContent = category.name;
        inputCategory.appendChild(option);
    });
});


//Gestion bouton envoie
function activeBtnSubmit() {
    if (
        inputFile.files.length > 0 &&
        inputTitle.value !== "" &&
        inputCategory.value !== ""
    ) {
        console.log("btn actif");
        btnSubmit.removeAttribute("disabled");
        btnSubmit.classList.add("active");
    } else {
        console.log("btn inactif");
    }
}
inputFile.addEventListener("input", activeBtnSubmit);
inputTitle.addEventListener("input", activeBtnSubmit);
inputCategory.addEventListener("input", activeBtnSubmit);