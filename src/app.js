const express = require("express");

// import du fichier JSON
const datas = require("./products.json");
// import d'une fonction utilitaire en commonJS
const randomNumber = require("./utils/index.js");

const app = express();
const PORT = 9000;

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    // création d'une constante avec le contenu du fichier JSON
    const randomDatas = [...datas];
    // nombre d'éléments à afficher
    const datasToDisplay = 3;
    // une boucle for, controlé par la valeur ci-dessus
    // qui va supprimer par itération un élément des produits copiés dans la constante randomDatas
    for (let i = 0; i < datas.length - datasToDisplay ; i++) {
        // à chaque itération on génère un index aléatoire entre 0 (le début d'un tableau) et le dernier index du tableau qui sera lui mis à jour à chaque itération
        const index = randomNumber(0, randomDatas.length -1);
        // la méthode splice qui modifie un tableau ou ajoute un élément, ici on décide de supprimer un élément du tableau pour arriver au nombre d'élément à afficher
        // splice("début", nmobre d'élément à supprimer)
        // ici index correspond à au nombre random généré, et 1 sera le nombre d'élément à supprimer dans cette itération
        randomDatas.splice(index, 1 );

        // à la fin de la boucle for on se retrouve avec un tableau "modifié", il se sera fait amputé d'autant d'élément passer à la constante datasToDisplay
    }

    // rappel : dans un objet, en raccourci on peut écrire la variable directement ce qui va créer une clé à son nom, et les valeur de cette propriété seront celles de la variable
    res.status(200).render("home", { randomDatas });
});

app.get("/shop", (req, res) => {      
    res.status(200).render("shop", { datas });
});

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));