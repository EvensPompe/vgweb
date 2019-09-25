//SERVEUR NODEJS DE VGWEB

// Déclaration de modules dans des variables

//ExpressJS est un package permettant d'effectuer les routes, d'utiliser les moteurs de templates,
//utiliser les requêtes HTTP, faire de l'API,...
const express = require('express');

//Cors est un package permettant d'effectuer les autorisations de transfert de données HTTP, entre l'agent utilisateur
// et le serveur.
const cors = require('cors');

//bodyParser est un package permettant de convertir les données dans le contenu de la requête HTTP
const bodyParser = require('body-parser');

let app = express();

//Middlewares
app.use(cors());

//Convertion Application/json
app.use(bodyParser.json());

// Convertion application/x-www-form-urlencoded
// Paramètre '{extended: false}' signifie que la donnée url sera converti avec la librairie querystring
app.use(bodyParser.urlencoded({extended: false}));

// Port du serveur par défaut est 3000, sinon ce sera un port disponible via le process environnant
let port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log(`Serveur sur le port ${port}`);
})
