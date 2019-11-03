const express = require('express');
const router = express.Router();

const db = require('../database/db');
//On génère avec le process une clé secrète
process.env.SECRET_KEY = "secret";
//On utilise Jsonwebtoken pour les authentifications et
//faire des tokens
const jwt = require('jsonwebtoken');

//middlewares
const verifToken = require('./../middlewares/verifToken');

//On ajoute un nouveau genre
router.post("/add",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On récupère les informations de la requêtes dans un objet
          let genreData = {
            type:req.body.type
          }
        // On vérifie si le genre existe déjà via le nom du genre
          db.genre.findOne({
            where: {type:req.body.type},
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
      }
    })
  })
});


//On récupère tous les genres
router.get("/all",verifToken,(req,res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne tous les genres
        db.genre.findAll()
        .then(genre=>{
        //On récupère le genre et on l'envoie en JSON
            res.json(genre)
        }).catch(err=>{
        //Sinon on récupère l'erreur
          res.json(err);
        })
      }
    })
  })
});

//modifier un genre en fonction de son // route PUT //
router.put("/modify/:id",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne un genre dans la table tbl_genre
          db.genre.findOne({
        //On filtre selon l'id donnée dans les paramètres de l'url
            where: {id:req.params.id}
          }).then(()=>{
        //On écrase les anciennes données, par les nouvelles données
              db.genre.update(
                {
                  type:req.body.type,
                },
                {
          //Selon l'id choisis, on retourne les lignes affectés par la modifications et
          //on affiche si le résultat s'est bien déroulé (0 ou 1)
                  where:{id:req.params.id},
                  returning: true,
                  plain:true
                }
              )
        //On récupère le genre et on l'affiche en objet JSON
              .then((genre)=>{
                res.json(genre)
              })
        //On récupère l'erreur si cela ne s'est pas bien déroulé
              .catch(err=>{
                res.json(err)
              })
        //On récupère l'erreur si il ne trouve pas le genre à modifier
          }).catch(err=>{
            res.json(err);
        })
      }
    })
  })
});


//On supprime un genre en fonction de son id
router.delete("/delete/:id",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne chaque genre
          db.genre.findOne({
            where:{id:req.params.id}
          }).then(genre=>{
        //On vérifie si le genre existe
            if (genre) {
        //Si oui, il l'enlève de la table (DROP)
              genre.destroy().then(()=>{
        //retourne une réponse JSON
                res.json("genre supprimé")
              }).catch(err=>{
        //On récupère l'erreur
                res.json(err)
              })
            }else {
        //On envoie une réponse si le genre n'existait pas
              res.json("Le genre n'existe pas")
            }
          }).catch(err=>{
            res.json(err)
        })
      }
    })
  })
});


router.get("/one/:id",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        db.genre.findOne({
          where:{id:req.params.id}
        }).then(genre=>{
          res.json(genre)
        }).then(data=>{
            res.json(data)
          }).catch(err=>{
            res.json(err)
        }).catch(err=>{
          res.json(err)
        })
      }
    })
  })
});

router.get('/game/:id',verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        db.genre.findOne({
          where:{id:req.params.id},
          include:[{
            model: db.jeu,
          }]
        }).then(genre=>{
          res.json(genre)
        }).catch(err=>{
          res.json(err)
        })
      }
    })
  })
});

router.post('/hazardGames',(req,res)=>{
    db.genre.findAll({
      where:{type:req.body.genres},
      include:[{
        model:db.jeu,
        attributes:["nom","images"]
      }]
    }).then(games=>{
      console.log(games);
      res.json(games)
    })
});

module.exports = router;
