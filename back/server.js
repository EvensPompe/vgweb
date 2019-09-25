//SERVEUR NODEJS DE VGWEB

// Déclaration de modules dans des variables

//ExpressJS est un package permettant d'effectuer les routes, d'utiliser les moteurs de templates,
//utiliser les requêtes HTTP, faire de l'API,...
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`Serveur sur le port ${port}`);
})
