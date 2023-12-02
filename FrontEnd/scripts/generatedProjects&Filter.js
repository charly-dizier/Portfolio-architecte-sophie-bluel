const gallery = document.querySelector(".gallery");

////////////////////////////////////////////////////////////////////////////////////////////
// Fonction de création des cartes, utilisé a l'intérieur de la fonction displayCardProject()
function creationCardProject(projects) {
    //On vide le contenue de la gallery avant d'afficher le nouveau
    gallery.innerHTML = ""; 

    //On parcour le tableau "projects" récupéré via L'API 
    for (let i = 0; i < projects.length; i++) {
        //Création du conteneur qui va recevoir les éléments
        const container = document.createElement("figure");
        //création de la balise img et injection du contenue
        const imgElement = document.createElement("img");
        imgElement.src = projects[i].imageUrl;
        imgElement.alt = projects[i].title;
        //Création de la balise figcaption et injection du contenue
        const titleElement = document.createElement("figcaption");
        titleElement.innerHTML = projects[i].title;
        //Injection des éléments crée dans le DOM
        gallery.appendChild(container);
        container.appendChild(imgElement);
        container.appendChild(titleElement);  
    };
};

/////////////////////////////////////////////////////////
//function d'affichage des cartes en fonction des filtres
async function displayCardProject(projects) {
    //récupération des data(works) via l'API pour crée les cartes via (projects)
    const dataResponse = await fetch('http://localhost:5678/api/works');
    //On converti le retour en tableau d'objets json
    projects = await dataResponse.json();

    //Appel de la fonction pour afficher toutes les cartes au chargement de la page
    creationCardProject(projects);

    //On cible le bouton "Tous" 
    let btn1 = document.querySelector(".btn-1")
    //On écoute l'évenement "click"
    btn1.addEventListener("click", () => {
        //On appel la fonction de création des cartes
        creationCardProject(projects);
        //On appel la fonction qui retire la couleurs de touts les filtre actif
        removeFilterElementActive();
        //On ajoute la couleur active au filtre
        btn1.classList.add("filterElementActive");
    });

    //Récupération des data(categories) via l'API pour création et gestion des autres filtres
    const dataCategories = await fetch('http://localhost:5678/api/categories');
    //On converti le retour en tableau d'objets json
    const categories = await dataCategories.json();

    //Pour chaque nom de categories, on crée un filtre
    categories.forEach(filter => {
        //On cible le conteneur qui va recevoir les élément
        const filterContainer = document.querySelector(".filterContainer");
        //Création d'un balise p
        const newFilter = document.createElement("p")
        //Ajout de la class CSS
        newFilter.classList.add("filterElement");
        //Modification du contenue 
        newFilter.innerHTML = filter.name;
        //Injection dans le DOM
        filterContainer.appendChild(newFilter);

        //On écoute le bouton
        newFilter.addEventListener("click", async () => {
            //On filtre le contenue projetcs en comparant les "catégoryID" contenue dans l'API "works" avec les "id" contenue dans l'API "categories"
            const categoryFiltered = projects.filter(project => project.categoryId === filter.id);
            //On affiche uniquement les projets filtrés
            creationCardProject(categoryFiltered);
            //On appel la fonction qui retire la couleurs de touts les filtre actif
            removeFilterElementActive();
            //On ajoute la couleur sur l el filtre actif
            newFilter.classList.add("filterElementActive");
        });
    });

    ///////////////////////////////////////////////////////////
    //Function de retrait de la class CSS pour les filtres actif
    function removeFilterElementActive() {
        //On cible tout les filtres
        const filters = document.querySelectorAll(".filterElement");
        //Pour chacun d'entre eux on retire la class CSS
        filters.forEach(filter => {
            filter.classList.remove("filterElementActive");
        });
    };
};

//On appel la fonction initial sans filtre
displayCardProject();