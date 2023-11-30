let project;

// Fonction de génération des cartes projet
async function generatProjects(project) {
    //récupérartion du tableau des projet via API
    const dataResponse = await fetch('http://localhost:5678/api/works');
    project = await dataResponse.json();
    console.log(project);

    //Création des cartes
    for (let i = 0; i < project.length; i++) {
        const gallery = document.querySelector(".gallery");
        const container = document.createElement("figure");

        //création image
        const imgElement = document.createElement("img");
        imgElement.src = project[i].imageUrl;
        imgElement.alt = project[i].title;

        //Création texte
        const titleElement = document.createElement("figcaption");
        titleElement.innerHTML = project[i].title;

        //Injection dans le DOM
        gallery.appendChild(container);
        container.appendChild(imgElement);
        container.appendChild(titleElement);
    };
};
generatProjects(project);