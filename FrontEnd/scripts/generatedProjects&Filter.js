//On cible la gallerie
const gallery = document.querySelector(".gallery");

///////////////////////////////////////////////////////////////////
//Fonction de récupération des données API avec gestion des erreurs
async function fetchData(url) {
    //Gestion des erreur
    try {
        //On récupère les données a l'intérieur d'une variable "response"
        const response = await fetch(url);
        //Si la réponse n'est pas positive...
        if (!response.ok) {
            //On renvoie un erreur avec un message
            throw new Error("Une erreur est survenue lors de la récupération des données.");
        }
        //On retourne la réponse
        return await response.json();
    //Récupération des erreur    
    } catch (error) {
        console.error(error.message);
        // Gérer l'erreur ici (afficher un message à l'utilisateur, etc.)
        return null;
    }
}

/////////////////////////////////////////////////////////////////////////////////
//Fonction de création de carte projet qui prend comme paramètre la valeur project
function createCard(project) {
    //Création du conteneur qui va recevoir les éléments
    const container = document.createElement("figure");
    //création de la balise img et injection du contenue
    const imgElement = document.createElement("img");
    imgElement.src = project.imageUrl;
    imgElement.alt = project.title;
    //Création de la balise figcaption et injection du contenue
    const titleElement = document.createElement("figcaption");
    titleElement.innerHTML = project.title;
    //Injection des éléments crée dans le DOM
    gallery.appendChild(container);
    container.appendChild(imgElement);
    container.appendChild(titleElement)
    //Renvoie du conteneur avec tout ses éléments
    return container;
}

///////////////////////////////////////////
//Fonction d'affichage de tous les projets
async function displayAllProjects() {
    //On récupère les données de la section "work" de l'API a l'intérieur de la variable "projects"
    let projects = await fetchData(WORKS_API_URL);
    //Condition de vérification de récupération des données.
    //Si aucune données ou erreur, on sort de la fonction
    if (!projects) return;

    //On vide la gallerie avant d'ajouté de nouveau projet
    gallery.innerHTML = "";
    //Pour chaque élément récupéré de l'API on...
    projects.forEach(project => {
        //Crée une variable card dans laquelle on appel la fonction de création de carte
        const card = createCard(project);
        //Puis on l'inject dans le DOM
        gallery.appendChild(card);
    });
}

/////////////////////////////////////////////////////////////
//Fonction d'affichage des projets d'une catégorie spécifique
async function displayProjectsByCategory(categoryId) {
    //On récupère les données de la section "work" de l'API a l'intérieur de la variable "projects"
    let projects = await fetchData(WORKS_API_URL);
    //Condition de vérification de récupération des données.
    //Si aucune données ou erreur, on sort de la fonction
    if (!projects) return;

    //On Crée un variable "categoryFiltered" qui ne contient que les projets ayant un 
    // ".categodyId" égale au paramètre categodyId de l'appel de la fonction
    const categoryFiltered = projects.filter(project => project.categoryId === categoryId);
    //On vide la gallerie avant d'ajouter de nouveau projet
    gallery.innerHTML = "";

    //On parcour le tableau categoryFiltered et pour chaque éléments...
    categoryFiltered.forEach(project => {
        //Crée une variable card dans laquelle on appel la fonction de création de carte
        const card = createCard(project);
        //Puis on l'inject dans le DOM
        gallery.appendChild(card);
    });
}

////////////////////////////////////////////////////
//Fonction de retrait de la couleur des filtres actif
function removeFilterElementActive() {
    //On cible tous les filtres
    const filters = document.querySelectorAll(".filterElement");
    //Pour chaque filtre on...
    filters.forEach(filter => {
        //Retire la class css quia joute un background vert
        filter.classList.remove("filterElementActive"); 
    });
}


///////////////////////////////////////////////////////////////////
//Fonction principal d'affichage des projets et gestion des filtres
async function displayCardProject() {
    //Affichage de tous les projets au chargement de la page
    displayAllProjects();

    //On cible le bouton "tous"
    const btnAll = document.querySelector(".btnAll");
    //On écoute le bouton et au click...
    btnAll.addEventListener("click", () => {
        //On lance la fonction qui affiche tous les projets
        displayAllProjects();
        //On lance la fonction qui retire la couleur des filtres
        removeFilterElementActive();
        //On ajoute la classe css qui met la couleur (vert) au filtre
        btnAll.classList.add("filterElementActive");
    });

    //On récupère les données de la section "categories" de l'API a l'intérieur de la variable "categories"
    const categories = await fetchData(CATEGORIES_API_URL);
    //Condition de vérification de récupération des données.
    //Si aucune données ou erreur, on sort de la fonction
    if (!categories) return;

    //On cible de conteneur des filtres
    const filterContainer = document.querySelector(".filterContainer");

    //Pour chaque éléments récupéré de l'API on...
    categories.forEach(categorie => {
        //Crée une nouvelle balise "p"
        const newFilter = document.createElement("p");
        //On luit ajoute la classe css 
        newFilter.classList.add("filterElement");
        //On inject la valeur de ".name" comme contenue de la balise
        newFilter.innerHTML = categorie.name;

        //On écoute le filtre et au click...
        newFilter.addEventListener("click", async () => {
            //On lance la fonction avec comme paramètre la valeur de id contenue dans la section "categories" de l'API
            displayProjectsByCategory(categorie.id);
            //On lance la fonction qui retire la couleur des filtres
            removeFilterElementActive();
            //On ajoute la classe css qui met la couleur (vert) au filtre
            newFilter.classList.add("filterElementActive");
        });
        //On inject les filtres dans le conteneur
        filterContainer.appendChild(newFilter);
    });
}

//On lance la fonction principal pour afficher les projets
displayCardProject();