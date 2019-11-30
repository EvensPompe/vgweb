const express = require('express');
const router = express.Router();

const db = require('../database/db');

//On génère avec le process une clé secrète
process.env.SECRET_KEY = "secret";
//On utilise Jsonwebtoken pour les authentifications et
//faire des tokens
const jwt = require('jsonwebtoken');

const Sequelize = require('sequelize');
let Op = Sequelize.Op

//middlewares
const verifToken = require('./../middlewares/verifToken');

//On ajoute une nouvelle plateforme
router.post("/add",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    console.log(authData.randomtoken);
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On récupère les informations de la requêtes dans un objet
          let plateformeData = {
            nom:req.body.nom,
            prix:req.body.prix,
            lancement:req.body.lancement,
            type:req.body.type,
          }
        // On vérifie si la plateforme existe déjà via le nom de la plateforme
          db.plateforme.findOne({
            where: {nom:req.body.nom}
          }).then(plateforme=>{
        //Si c'est pas le cas,...
            if (!plateforme) {
        //... il crée la plateforme dans la table
              db.plateforme.create(plateformeData)
              .then(plateforme=>{
              db.editDev.findOne({
                where:{[Op.and]:[{nom:req.body.edit},{dev:false}]}
              }).then(edit=>{
                if (!edit) {
                  db.editDev.create({nom:req.body.edit,dev:false})
                  .then(editCreated=>{
                    //On ajoute l'éditeur et/ou développeur et le jeu dans la table intermédiaire jeu_has_editDev
                        db.plateforme_has_editDev.create({nombre_de_plateforme:req.body.nombre,status:true,fk_editDev:editCreated.id,fk_plateforme:plateforme.id})
                        .then(plateforme_has_editDev=>{
                          res.json(plateforme_has_editDev)
                        }).catch(err=>{
                          res.json(err)
                        })
                  }).catch(err=>{
                    res.json(err)
                  })
                }else {
                  //On ajoute l'éditeur et/ou développeur et le jeu dans la table intermédiaire jeu_has_editDev
                      db.plateforme_has_editDev.create({nombre_de_plateforme:req.body.nombre,status:true,fk_editDev:edit.id,fk_plateforme:plateforme.id})
                      .then(plateforme_has_editDev=>{
                        res.json(plateforme_has_editDev)
                      }).catch(err=>{
                        res.json(err)
                      })
                }
              })
        //On ajoute l'éditeur et/ou développeur et le jeu dans la table intermédiaire jeu_has_editDev
            db.plateforme_has_editDev.create({nombre_de_plateforme:req.body.nombre,status:true,fk_editDev:req.body.fk_editDev,fk_plateforme:plateforme.id})
            .then(plateforme_has_editDev=>{
              res.json(plateforme_has_editDev)
            }).catch(err=>{
              res.json(err)
            })
                // res.json(plateforme)
              }).catch(err=>{
        // On récupère l'erreur
                res.json(err)
              })
            }else {
              //On selectionne une plateforme dans la table tbl_plateforme
                db.plateforme.findOne({
              //On filtre selon l'id donnée
                  where: {id:plateforme.id}
                }).then(()=>{
              //On écrase les anciennes données, par les nouvelles données
                    db.plateforme.update(
                      {
                        nom:req.body.nom,
                        prix:req.body.prix,
                        lancement:req.body.lancement,
                        type:req.body.type,
                      },
                      {
                //on retourne les lignes affectés par la modifications et
                //on affiche si le résultat s'est bien déroulé (0 ou 1)
                        where:{id:plateforme.id},
                        returning: true,
                        plain:true
                      }
                    )
              //On récupère la plateforme et on l'affiche en objet JSON
                    .then((plat)=>{
                      db.plateforme.findOne({
                        where: {id:plateforme.id}
                      }).then(plat=>{
                        db.editDev.findOne({
                          where:{[Op.and]:[{nom:req.body.edit},{dev:false}]}
                        }).then(edit=>{
                          if (!edit) {
                            db.editDev.create({nom:req.body.edit,dev:false})
                            .then(editCreated=>{
                              console.log(editCreated.id);
                              db.plateforme_has_editDev.create(
                                {
                                  nombre_de_plateforme:req.body.nombre,
                                  status:true,
                                  fk_editDev:editCreated.id,
                                  fk_plateforme:plateforme.id
                                }
                              ).then(plateforme_has_editDev=>{
                                res.json(plateforme_has_editDev)
                              }).catch(err=>{
                                res.json(err)
                              })
                            }).catch(err=>{
                              res.json(err)
                            })
                          }else {
                            db.plateforme_has_editDev.create(
                              {
                                nombre_de_plateforme:req.body.nombre,
                                status:true,
                                fk_editDev:edit.id,
                                fk_plateforme:plateforme.id
                              }
                            ).then(plateforme_has_editDev=>{
                              res.json(plateforme_has_editDev)
                            }).catch(err=>{
                              res.json(err)
                            })
                          }
                        }).catch(err=>{
                          res.json(err)
                        })
                      }).catch(err=>{
                        res.json(err)
                      })
                      res.json(plateforme)
                    })
              //On récupère l'erreur si cela ne s'est pas bien déroulé
                    .catch(err=>{
                      res.json(err)
                    })
              //On récupère l'erreur si il ne trouve pas le plateforme à modifier
                }).catch(err=>{
                  res.json(err);
              })
              // res.json('La plateforme existe déjà !')
            }
        //On envoie les informations en JSON
            res.json(plateformeData)
          }).catch(err=>{
            res.json(err);
          })
      }
    })
  })
});

//On récupère tous les plateformes
router.get("/all",verifToken,(req,res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne tous les plateformes
        db.plateforme.findAll({
          attributes:{
            include:[],
            exclude:[]
          }
        })
        .then(plateforme=>{
        //On récupère les plateformes et on l'envoie en JSON
            res.json(plateforme)
        }).catch(err=>{
        //Sinon on récupère l'erreur
          res.json(err);
        })
      }
    })
  })
});

//On récupère tous les plateformes
router.get("/one/:id",verifToken,(req,res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne tous les plateformes
        db.plateforme.findOne({
          where:{id:req.params.id},
          attributes:{
            include:[],
            exclude:[]
          }
        })
        .then(plateforme=>{
        //On récupère les plateformes et on l'envoie en JSON
            res.json(plateforme)
        }).catch(err=>{
        //Sinon on récupère l'erreur
          res.json(err);
        })
      }
    })
  })
});

//On supprime une plateforme en fonction de son id
router.delete("/delete/:id",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne chaque plateforme
          db.plateforme.findOne({
            where:{id:req.params.id}
          }).then(plateforme=>{
        //On vérifie si la plateforme existe
            if (plateforme) {
        //Si oui, il l'enlève de la table (DROP)
              plateforme.destroy().then(()=>{
        //retourne une réponse JSON
                res.json("plateforme supprimé")
              }).catch(err=>{
        //On récupère l'erreur
                res.json(err)
              })
            }else {
        //On envoie une réponse si la plateforme n'existait pas
              res.json("La plateforme n'existe pas")
            }
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
        db.plateforme.findOne({
          where:{id:req.params.id},
          include:[{
            model: db.jeu,
          }]
        }).then(plat=>{
          res.json(plat)
        }).catch(err=>{
          res.json(err)
        })
      }
    })
  })
});

//On récupère tous les plateformes selon le type
router.get("/plat/:type",verifToken,(req,res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne tous les plateformes
        db.plateforme.findAll({
          where:{type:req.params.type},
          attributes:{
            include:[],
            exclude:[]
          }
        })
        .then(plateforme=>{
        //On récupère les plateformes et on l'envoie en JSON
            res.json(plateforme)
        }).catch(err=>{
        //Sinon on récupère l'erreur
          res.json(err);
        })
      }
    })
  })
});

//modifier une plateforme en fonction de son // route PUT //
router.put("/modify/:id",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne une plateforme dans la table tbl_plateforme
          db.plateforme.findOne({
        //On filtre selon l'id donnée dans les paramètres de l'url
            where: {id:req.params.id}
          }).then(()=>{
        //On écrase les anciennes données, par les nouvelles données
              db.plateforme.update(
                {
                  nom:req.body.nom,
                  prix:req.body.prix,
                  lancement:req.body.lancement,
                  type:req.body.type,
                },
                {
          //on retourne les lignes affectés par la modifications et
          //on affiche si le résultat s'est bien déroulé (0 ou 1)
                  where:{id:req.params.id},
                  returning: true,
                  plain:true
                }
              )
        //On récupère la plateforme et on l'affiche en objet JSON
              .then((plateforme)=>{
                db.plateforme.findOne({
                  where: {id:req.params.id}
                }).then(plat=>{
                  db.plateforme_has_editDev.update(
                    {
                      nombre_de_plateforme:req.body.nombre,
                      status:true,
                      fk_editDev:req.body.fk_editDev,
                      fk_plateforme:req.params.id
                    },
                    {
                      where:{fk_plateforme:req.params.id},
                      returning:true,
                      plain:true
                    }
                  ).then(plateforme_has_editDev=>{
                    res.json(plateforme_has_editDev)
                  }).catch(err=>{
                    res.json(err)
                  })
                }).catch(err=>{
                  res.json(err)
                })
                res.json(plateforme)
              })
        //On récupère l'erreur si cela ne s'est pas bien déroulé
              .catch(err=>{
                res.json(err)
              })
        //On récupère l'erreur si il ne trouve pas le plateforme à modifier
          }).catch(err=>{
            res.json(err);
        })
      }
    })
  })
});

module.exports = router;
