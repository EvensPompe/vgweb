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


//On ajoute un nouveau éditeur ou developpeur
router.post("/new",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    where:{randomtoken:authData.randomtoken}
  }).then(user=>{
    if (user.role !== 'admin') {
      res.sendStatus(403)
    }else {
      //On récupère les informations de la requêtes dans un objet
        let editDevData = {
          nom:req.body.nom,
          date:req.body.date,
          siege:req.body.siege,
          pays_local:req.body.pays_local,
          description:req.body.description,
          dev:req.body.dev
        }
      // On recherche l'éditeur ou developpeur via le nom de l'éditeur ou developpeur
        db.editDev.findOne({
          where: {nom:req.body.nom}
        })
      //Si c'est le cas,...
      .then(editDev=>{
      //On vérifie si le existe
        if (!editDev) {
      //Si c'est pas le cas, on crée l'éditeur ou developpeur
          db.editDev.create(editDevData)
          .then(editDev=>{
      //on envoie les informations de l'éditeur ou developpeur en json
            res.json(editDev)
          })
          .catch(err=>{
      //En cas de problème, on envoie l'erreur
            res.json(err)
          })
        }else {
      // Si l'éditeur ou developpeur existe, on envoie un message indiquant que l'éditeur ou developpeur existe déjà
          res.json("L'éditeur ou developpeur existe déjà !")
        }
      })
      //On envoie les informations en JSON
       .catch(err=>{
        console.log(err);
      })
    }
  })
});


//On récupère tous les éditeurs ou développeurs
router.get("/all",verifToken,(req,res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne tous les éditeurs ou développeurs
        db.editDev.findAll({
          attributes:{
            include:[],
            exclude:[]
          }
        })
        .then(editDev=>{
        //On récupère les éditeurs ou développeurs et on l'envoie en JSON
            res.json(editDev)
        }).catch(err=>{
        //Sinon on récupère l'erreur
          res.json(err);
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
        db.editDev.findOne({
          where:{id: req.params.id},
          include:[{
            model:db.jeu,
            attributes:{
              include:[],
              exclude:[]
            }
          }]
        }).then(editDev=>{
          res.json(editDev)
        }).catch(err=>{
          res.json(err)
        })
      }
    })
  })
});


router.get('/one/:id',verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        db.editDev.findOne({
          where:{id: req.params.id},
        }).then(editDev=>{
          res.json(editDev)
        }).catch(err=>{
          res.json(err)
        })
      }
    })
  })
});

//modifier un editeur ou un developpeur en fonction de son // route PUT //
router.put("/modify/:id",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne un editeur ou un developpeur dans la table tbl_editDev
          db.editDev.findOne({
        //On filtre selon l'id donnée dans les paramètres de l'url
            where: {id:req.params.id}
          }).then(()=>{
        //On écrase les anciennes données, par les nouvelles données
              db.editDev.update(
                {
                  nom:req.body.nom,
                  date:req.body.date,
                  siege:req.body.siege,
                  pays_local:req.body.pays_local,
                  description:req.body.description,
                  dev:req.body.dev
                },
                {
          //Selon l'id choisis, on retourne les lignes affectés par la modifications et
          //on affiche si le résultat s'est bien déroulé (0 ou 1)
                  where:{id:req.params.id},
                  returning: true,
                  plain:true
                }
              )
        //On récupère le editDev et on l'affiche en objet JSON
              .then((editDev)=>{
                res.json(editDev)
              })
        //On récupère l'erreur si cela ne s'est pas bien déroulé
              .catch(err=>{
                res.json(err)
              })
        //On récupère l'erreur si il ne trouve pas le editDev à modifier
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
      where: {randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne chaque genre
          db.editDev.findOne({
            where:{id:req.params.id}
          }).then(editDev=>{
        //On vérifie si le genre existe
            if (editDev) {
        //Si oui, il l'enlève de la table (DROP)
              editDev.destroy().then(()=>{
        //retourne une réponse JSON
                res.json("éditeur ou développeur supprimé")
              }).catch(err=>{
        //On récupère l'erreur
                res.json(err)
              })
            }else {
        //On envoie une réponse si le éditeur ou développeur n'existait pas
              res.json("L'éditeur ou développeur n'existe pas")
            }
          }).catch(err=>{
            res.json(err)
        })
      }
    })
  })
});

module.exports = router;
