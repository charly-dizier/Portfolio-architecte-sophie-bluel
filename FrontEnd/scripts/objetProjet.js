let work;

// Fonction de génération des modal
async function generatWork(work) {
    //récupérartion du tableau des projet via API
    const dataResponse = await fetch('http://localhost:5678/api/works');
    work = await dataResponse.json();
    console.log(work);

    //Création des modal
    for (let i = 0; i < work.length; i++) {
        const gallery = document.querySelector(".gallery");
        const container = document.createElement("figure");

        //création image
        const imgElement = document.createElement("img");
        imgElement.src = work[i].imageUrl;
        imgElement.alt = work[i].title;

        //Création texte
        const titleElement = document.createElement("figcaption");
        titleElement.innerHTML = work[i].title;

        //Injection dans le DOM
        gallery.appendChild(container);
        container.appendChild(imgElement);
        container.appendChild(titleElement);
    };
};
generatWork(work);