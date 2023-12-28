//On cible le conteneur qui va recevoir les projets
const modalGalery = document.querySelector(".modal__card--elementProject")

//////////////////////////////////////////////////////////////////////////////////
//Fonction de création de carte projets et affichage a l'intérieur de la gallerie
async function creationModalProject() {
    //Gestion des erreur
    try {
        //On réinitialise la gallerie
        modalGalery.innerHTML = "";
        //On intéroge l'API et on stock la réponse dans une variable dataProject sous la forme d'objet json
        const response = await fetch(WORKS_API_URL)
        const dataProject = await response.json();

        //On parcour le tableau dataProject et pour chaque éléments...
        for (let i = 0; i < dataProject.length; i++) {
            //Création du conteneur et ajout css
            const figure = document.createElement("figure");
            //Création de l'image et ajout src alt
            const image = document.createElement("img");
            image.src = dataProject[i].imageUrl;
            image.alt = dataProject[i].title;
            //Création de l'icon corbeille, ajout css et nommage data
            const trashIcon = document.createElement("i");
            trashIcon.classList.add("fa-solid", "fa-trash-can");
            //Important! on copie la valeur "id" du tableau dataProjet et on l'assigne a l'élément HTML sous la forme d'un attribut data-projectID
            trashIcon.dataset.projectId = dataProject[i].id;
            //On injecte le tout dans le DOM
            figure.appendChild(image)
            figure.appendChild(trashIcon)
            modalGalery.appendChild(figure)
        }
        //On cible toutes les icons corbeilles
        const deleteIcons = document.querySelectorAll(".fa-trash-can");
        //On parcour le tableau deleteIcon et pour chaque éléments...
        for (let i = 0; i < deleteIcons.length; i++) {
            //On écoute le click et lance la fonction de confirmation
            deleteIcons[i].addEventListener("click", confirDeleteProject);
        }
    //Récupération des erreur
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error );
    }
}

////////////////////////////////////////////////
//Fonction de confirmation qui prend en argument 
async function confirDeleteProject(event) {
    //Gestion des erreur
    try {
        //On assigne l'attribut "data-projectId" de l'élément HTML dans la variable projectId
        const projectId = event.target.dataset.projectId;

        //Condition de réponse du message de confirmation
        if (confirm("Voulez vous vraiment supprimer le projet ?") == true) {
            //On intéroge l'API
            const response = await fetch(`${WORKS_API_URL}/${projectId}`, {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${token}`}, 
            });
            //Si la réponse est positive...
            if (response.ok) {
                //On ferme la modal
                closeModal();
                //On reset la gallerie
                resetGalery();
                //On reset la gallerie de la modal
                resetModalGalery();
            //Sinon message d'erreur
            } else {
                alert("Une erreur s'est produite lors de la suppression du projet")
            } 
        }
    //Récupération des erreur
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression du projet :", error)
    }
}

//On lance la fonction pour l'affichage lors de la première utilisation, elle sera relancer a chaque reset 
creationModalProject();