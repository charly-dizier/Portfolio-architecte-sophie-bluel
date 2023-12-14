///////////////////////////////////
//Récupération des données de l'API
fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(data => {

    //On cible le conteneur de la gallerie
    const galery = document.querySelector(".modal__card--elementProject")
    //On démarre une boucle pour chaque élément de la réponse fetch
    data.forEach(project => {
        //Création du conteneur et ajout css
        const figure = document.createElement("figure");
        figure.classList.add("test");

        //Création de l'image et ajout src alt
        const image = document.createElement("img");
        image.src = project.imageUrl;
        image.alt = project.title;

        //Création de l'icon corbeille, ajout css et nommage data
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can", "modal__card--elementProject-icon");
        //Important on définit l'attribut "data-projectId" à l'élément HTML et on lui assigne la valeur project.id'
        trashIcon.dataset.projectId = project.id;

        //On injecte le tout dans le DOM
        figure.appendChild(image)
        figure.appendChild(trashIcon)
        galery.appendChild(figure)
    });

    ///////////////////////////////////
    //On cible toutes les icon corbeille
    const deleteIcons = document.querySelectorAll('.modal__card--elementProject-icon');
    //On démarre une boucle pour chaque icon
	deleteIcons.forEach(deleteIcon => {
        //On écoute l'evenement click
		deleteIcon.addEventListener('click', () => {
            //Message de confirmation de suppression
            if (confirm("Voulez vous vraiment supprimer le projet ?") == true) {
                //On récupère la valeur de l'attribut "data-projectId" contenue dans l'élément HTML
                const projectId = deleteIcon.dataset.projectId;
                //On communique avec l'API pour supprimer le projet lié à l'icon écouté
                fetch(`http://localhost:5678/api/works/${projectId}`, {
                    method: "DELETE",
                    headers: {'Authorization': `Bearer ${token}`}, 
                })
            }
		})
	})
})