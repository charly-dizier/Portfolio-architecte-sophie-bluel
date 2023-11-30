//recupération via api
const reponse = get('http://localhost:5678/api/works');
const allWork = reponse.json();


function generatWork(allWok) {
    for (let i = 0; i < allWok.length; i++) {
        
        const work = allWork[i];
        //On cible l'élémént qui va recevoir l'objet crée
        const gallery = document.querySelector(".gallery");

        //Création du conteneur
        const container = document.createElement("figure");

        //Création des éléments
        const imgElement = document.createElement("img");
        imgElement = work.imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement = work.title;


        //Injection dans le DOM
        gallery.appendChild(container)
        container.appendChild(imgElement)
        container.appendChild(titleElement)
    }
}


generatWork(allWork);