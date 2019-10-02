const express = require('express');
const router = express.Router();

const db = require('../database/db');

//On ajoute un nouveau genre
router.post("/add",(req,res)=>{
//On récupère les informations de la requêtes dans un objet
  let genreData = {
    type:req.body.type
  }
// On vérifie si le genre existe déjà via le nom du genre
  db.genre.findOne({
    where: {type:req.body.type}
  }).then(genre=>{
//Si c'est pas le cas,...
    if (!genre) {
//... il crée le genre dans la table
      db.genre.create(genreData)
      .then(genre=>{
//et envoie en JSON
        res.json(genre)
      }).catch(err=>{
// On récupère l'erreur
        res.json(err)
      })
    }
//On envoie les informations en JSON
    res.json(genreData)
  }).catch(err=>{
    console.log(err);
  })
});


//On récupère tous les genres
router.get("/all",(req,res) => {
//On selectionne tous les genres
db.genre.findAll()
.then(genre=>{
//On récupère le genre et on l'envoie en JSON
    res.json(genre)
}).catch(err=>{
//Sinon on récupère l'erreur
  res.json(err);
})
// res.send("OK")
});

//On récupère un genre
router.get("/one/:type",(req,res) => {
//On selectionne un genre via son type dans l'url
db.genre.findOne({
  where:{type:req.params.type}
})
.then(genre=>{
//On récupère le genre et on l'envoie en JSON
    res.json(genre)
}).catch(err=>{
//Sinon on récupère l'erreur
  res.json(err);
})
// res.send("OK")
});

module.exports = router;
