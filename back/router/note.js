const express = require('express');
const router = express.Router();

const db = require('../database/db');
// On importe l'instance Sequelize
const Sequelize = require('Sequelize');
// On introduit les opérateurs logiques avec la variable Op (Or, and, like, ...)
let Op = Sequelize.Op;
//On génère avec le process une clé secrète
process.env.SECRET_KEY = "secret";
//On utilise Jsonwebtoken pour les authentifications et
//faire des tokens
const jwt = require('jsonwebtoken');

//middlewares
const verifToken = require('./../middlewares/verifToken');

router.post("/new",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{email: authData.email}
    }).then(user=>{
      if (!user) {
        res.sendStatus(403)
      }else {
        let noteData = {
          note: req.body.note,
          critique: req.body.critique,
          fk_jeu: req.body.fk_jeu,
          fk_utilisateur: req.body.fk_utilisateur
        };
        db.note.findOne({
          where:{[Op.and]:[{fk_jeu: req.body.fk_jeu},{fk_utilisateur: req.body.fk_utilisateur}]}
        }).then(note=>{
          if (!note) {
            db.note.create(noteData)
            .then(note=>{
              res.json(note)
            }).catch(err=>{
              res.json(err)
            })
          }else {
            res.json("La note existe déjà")
          }
        }).catch(err=>{
          res.json(err)
        })
      }
    })
  })
});


//modifier une note // route PUT //
router.put("/modify/:id",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (!user) {
        res.sendStatus(403)
      }else {
        //On selectionne une note dans la table tbl_note
          db.note.findOne({
        //On filtre selon l'id donnée dans les paramètres de l'url
            where: {id:req.params.id}
          }).then(()=>{
        //On écrase les anciennes données, par les nouvelles données
              db.note.update(
                {
                  note: req.body.note,
                  critique: req.body.critique,
                  fk_jeu: req.body.fk_jeu,
                  fk_utilisateur: req.body.fk_utilisateur
                },
                {
          //Selon l'id choisis, on retourne les lignes affectés par la modifications et
          //on affiche si le résultat s'est bien déroulé (0 ou 1)
                  where:{id:req.params.id},
                  returning: true,
                  plain:true
                }
              )
        //On récupère la note et on l'affiche en objet JSON
              .then((note)=>{
                res.json(note)
              })
        //On récupère l'erreur si cela ne s'est pas bien déroulé
              .catch(err=>{
                res.json(err)
              })
        //On récupère l'erreur si il ne trouve pas la note à modifier
          }).catch(err=>{
            res.json(err);
        })
      }
    })
  })
});

//On récupère toutes les notes
router.get("/all",verifToken,(req,res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne toutes les notes
        db.note.findAll({
          attributes:{
            include:[],
            exclude:[]
          }
        })
        .then(note=>{
        //On récupère les notes et on l'envoie en JSON
            res.json(note)
        }).catch(err=>{
        //Sinon on récupère l'erreur
          res.json(err);
        })
      }
    })
  })
});

//On supprime une note en fonction de son id
router.delete("/delete/:id",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne chaque note
          db.note.findOne({
            where:{id:req.params.id}
          }).then(note=>{
        //On vérifie si la note existe
            if (note) {
        //Si oui, il l'enlève de la table (DROP)
              note.destroy().then(()=>{
        //retourne une réponse JSON
                res.json("note supprimé")
              }).catch(err=>{
        //On récupère l'erreur
                res.json(err)
              })
            }else {
        //On envoie une réponse si la note n'existait pas
              res.json("Le note n'existe pas")
            }
          }).catch(err=>{
            res.json(err)
        })
      }
    })
  })
})


//On récupère une note en fonction de son id
router.get("/one/:id",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On vérifie dans la table si la note existe via son id
          db.note.findOne({
            where:{id:req.params.id},
            attributes:{
              include:[],
              exclude: []
            }
          })
          .then(note=>{
        //On récupère la note et on l'envoie en JSON
              res.json(note)
          }).catch(err=>{
        //Sinon on récupère l'erreur
            console.log(err);
        })
      }
    })
  })
});


router.get("/top",(req,res)=>{
  db.note.findAll({
    where: {note:{[Op.gte]:3}}
  }).then(note=>{
    res.json(note)
  }).catch(err=>{
    res.json(err)
  })
});

router.get("/bottom",(req,res)=>{
  db.note.findAll({
    where: {note:{[Op.lte]:3}}
  }).then(note=>{
    res.json(note)
  }).catch(err=>{
    res.json(err)
  })
});

router.get('/user/:id',verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        db.note.findOne({
          where:{id: req.params.id},
          include:[{
            model:db.utilisateur,
            attributes:{
              include:[],
              exclude:["password","id"]
            }
          }]
        }).then(note=>{
          res.json(note)
        }).catch(err=>{
          res.json(err)
        })
      }
    })
  })
});

router.get('/all/:id',verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !== 'admin'|| !user.id) {
        res.sendStatus(403)
      }else {
        db.utilisateur.findOne({
          where:{id: req.params.id},
          include:[{
            model:db.note,
            attributes:{
              include:[],
              exclude:[]
            }
          }]
        }).then(note=>{
          res.json(note)
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
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        db.note.findOne({
          where:{id: req.params.id},
          include:[{
            model:db.jeu,
            attributes:{
              include:[],
              exclude:["id","createdAt","updatedAt"]
            }
          }]
        }).then(note=>{
          res.json(note)
        }).catch(err=>{
          res.json(err)
        })
      }
    })
  })
});

module.exports = router;
