//SERVEUR NODEJS DE VGWEB

// Déclaration de modules dans des variables

//ExpressJS est un framework permettant de faire des applications web avec NodeJS, il permet d'effectuer les routes,
// d'utiliser les moteurs de templates,
//utiliser les requêtes HTTP,...
const express = require('express');

//Cors est un package permettant d'effectuer les autorisations de transfert de données HTTP, entre l'agent utilisateur
// et le serveur.
const cors = require('cors');

//bodyParser est un package permettant de convertir les données du contenu de la requête HTTP
const bodyParser = require('body-parser');

// Port du serveur par défaut est 3000, sinon ce sera un port disponible via le process environnant
let port = process.env.PORT;

/*On définit l'application avec la variable app */
let app = express();

//Convertion Application/json
app.use(bodyParser.json());

// Convertion application/x-www-form-urlencoded
// Paramètre '{extended: false}' signifie que la donnée url sera converti avec la librairie querystring
app.use(bodyParser.urlencoded({extended: false}));

//routes
const jeu = require('../router/jeu');
const genre = require('../router/genre');
const note = require('../router/note');
const utilisateur = require('../router/utilisateur');
const editDev = require('../router/editDev');
const plateforme = require('../router/plateforme');

//Middlewares
app.use(cors());

app.use('/jeu',jeu);
app.use('/genre',genre);
app.use('/note',note);
app.use('/utilisateur',utilisateur);
app.use('/editDev',editDev);
app.use('/plateforme',plateforme);


app.listen(port,()=>{
  console.log(`Serveur sur le port ${port}`);
})
