const express = require('express');
/* On définit un router pour les opérations de type 'GET','POST',PUT ou 'DELETE'*/
const router = express.Router();
// On importe la base de donnée pour les tables
const db = require('../database/db');
// const axios = require('axios');
const Sequelize = require('Sequelize');
//On génère avec le process une clé secrète
process.env.SECRET_KEY = "secret";
//On utilise Jsonwebtoken pour les authentifications et
//faire des tokens
const jwt = require('jsonwebtoken');

const Op = Sequelize.Op;

//middlewares
const verifToken = require('./../middlewares/verifToken');


//modifier un jeu en fonction de son // route PUT //
router.put("/modify/:id",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne un jeu dans la table tbl_jeu
          db.jeu.findOne({
        //On filtre selon l'id donnée dans les paramètres de l'url
            where: {id:req.params.id}
          }).then(()=>{
        //On écrase les anciennes données, par les nouvelles données
              db.jeu.update(
                {
                  nom:req.body.nom,
                  sortie:req.body.sortie,
                  synopsis:req.body.synopsis,
                  images:req.body.img,
                  videos:req.body.video,
                  articles:req.body.article
                },
                {
          //Selon l'id choisis, on retourne les lignes affectés par la modifications et
          //on affiche si le résultat s'est bien déroulé (0 ou 1)
                  where:{id:req.params.id},
                  returning: true,
                  plain:true
                }
              )
        //On récupère le jeu et on l'affiche en objet JSON
              .then((game)=>{
                // res.json(game)
                // On modifie le jeu et le genre dans la table intermédiaire jeu_has_genre

                db.jeu.findOne({
              //On filtre selon l'id donnée dans les paramètres de l'url
                  where: {id:req.params.id}
                }).then(jeu=>{
                  db.jeu_has_genre.update({
                    status:true,
                    fk_genre: req.body.fk_genre,
                    fk_jeu:req.params.id
                  },
                  {
            //Selon l'id choisis, on retourne les lignes affectés par la modifications et
            //on affiche si le résultat s'est bien déroulé (0 ou 1)
                    where:{fk_jeu:req.params.id},
                    returning: true,
                    plain:true
                  })
                  .then(jeu_has_genre=>{
                    res.json(jeu_has_genre)
                  }).catch(err=>{
                    res.json(err)
                  })

                  db.jeu_has_plateforme.update(
                  {
                    nombre_de_jeux:req.body.nombre,
                    status:true,fk_jeu:req.params.id,
                    fk_plateforme:req.body.fk_plateforme
                  },
                  {
            //Selon l'id choisis, on retourne les lignes affectés par la modifications et
            //on affiche si le résultat s'est bien déroulé (0 ou 1)
                    where:{fk_jeu:req.params.id},
                    returning: true,
                    plain:true
                  })
                  .then(jeu_has_plateforme=>{
                    res.json(jeu_has_plateforme)
                  }).catch(err=>{
                    res.json(err)
                  })

                  db.jeu_has_editDev.update(
                    {
                      status:true,
                      fk_editDev:req.body.fk_editDev,
                      fk_jeu:req.params.id
                    },
                  {
            //Selon l'id choisis, on retourne les lignes affectés par la modifications et
            //on affiche si le résultat s'est bien déroulé (0 ou 1)
                    where:{fk_jeu:req.params.id},
                    returning: true,
                    plain:true
                  })
                  .then(jeu_has_plateforme=>{
                    res.json(jeu_has_plateforme)
                  }).catch(err=>{
                    res.json(err)
                  })

                }).catch(err=>{
                  console.log(err);
                })
                //On ajoute le jeu et la plateforme dans la table intermédiaire jeu_has_plateforme
                //On ajoute l'éditeur et/ou développeur et le jeu dans la table intermédiaire jeu_has_editDev
              })
        //On récupère l'erreur si cela ne s'est pas bien déroulé
              .catch(err=>{
                res.json(err)
              })
        //On récupère l'erreur si il ne trouve pas le jeu à modifier
          }).catch(err=>{
            res.json(err);
          })
      }
    })
  })
});


//On ajoute un nouveau jeu
router.post("/add",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On récupère les informations de la requêtes dans un objet
          let gameData = {
            nom:req.body.nom,
            sortie:req.body.sortie,
            synopsis:req.body.synopsis,
            images:req.body.img,
            videos:req.body.video,
            articles:req.body.article,
          }
        // On recherche le jeu via le nom du jeu
          db.jeu.findOne({
            where: {nom:req.body.nom}
          })
        //Si c'est le cas,...
        .then(jeu=>{
        //On vérifie si le existe
          if (!jeu) {
        //Si c'est pas le cas, on crée le jeu
            db.jeu.create(gameData)
            .then(gameCreated=>{
            db.genre.findOne({
              where: {type:req.body.genre}
            }).then(genre=>{
              if (!genre) {
                db.genre.create({type:req.body.genre})
                .then(genre=>{
                  console.log(genre.id);
                  db.jeu_has_genre.create({status:true,fk_genre:genre.id,fk_jeu:gameCreated.id})
                  .then(jeu_has_genre=>{
                    res.json(jeu_has_genre)
                  }).catch(err=>{
                    res.json(err)
                  })
                }).catch(err=>{
                  res.json(err)
                })
              }else {
                db.jeu_has_genre.create({status:true,fk_genre:genre.id,fk_jeu:gameCreated.id})
                .then(jeu_has_genre=>{
                  res.json(jeu_has_genre)
                }).catch(err=>{
                  res.json(err)
                })
              }
            }).catch(err=>{
              res.json(err)
            })

            db.plateforme.findOne({
              where:{nom:req.body.plateforme}
            }).then(plat=>{
              if (!plat) {
                db.plateforme.create({nom:req.body.plateforme})
                .then(plateformeCreated=>{
                  //On ajoute le jeu et la plateforme dans la table intermédiaire jeu_has_plateforme
                      db.jeu_has_plateforme.create({nombre_de_jeux:req.body.nombre,status:true,fk_plateforme:plateformeCreated.id,fk_jeu:gameCreated.id})
                      .then(jeu_has_plateforme=>{
                        res.json(jeu_has_plateforme)
                      }).catch(err=>{
                        res.json(err)
                  })
                })
              }else {
                //On ajoute le jeu et la plateforme dans la table intermédiaire jeu_has_plateforme
                    db.jeu_has_plateforme.create({nombre_de_jeux:req.body.nombre,status:true,fk_plateforme:plat.id,fk_jeu:gameCreated.id})
                    .then(jeu_has_plateforme=>{
                      res.json(jeu_has_plateforme)
                    }).catch(err=>{
                      res.json(err)
                })
              }
            }).catch(err=>{
              res.json(err)
            })

            db.editDev.findOne({
              where:{nom:req.body.editeur}
            }).then(editeur=>{
              if (!editeur) {
                db.editDev.create({nom:req.body.editeur,dev:false})
                .then(editeur=>{
                  //On ajoute l'éditeur et/ou développeur et le jeu dans la table intermédiaire jeu_has_editDev
                      db.jeu_has_editDev.create({status:true,fk_editDev:editeur.id,fk_jeu:gameCreated.id})
                      .then(jeu_has_plateforme=>{
                        res.json(jeu_has_plateforme)
                      }).catch(err=>{
                        res.json(err)
                   })
                })
              }else {
                //On ajoute l'éditeur et/ou développeur et le jeu dans la table intermédiaire jeu_has_editDev
                    db.jeu_has_editDev.create({status:true,fk_editDev:editeur.id,fk_jeu:gameCreated.id})
                    .then(jeu_has_plateforme=>{
                      res.json(jeu_has_plateforme)
                    }).catch(err=>{
                      res.json(err)
                 })
              }
            }).catch(err=>{
              res.json(err)
            })


            db.editDev.findOne({
              where:{[Op.and]:[{nom:req.body.developpeur},{dev:true}]}
            }).then(developpeur=>{
              if (!developpeur) {
                db.editDev.create({nom:req.body.developpeur,dev:true})
                .then(developpeur=>{
                  //On ajoute l'éditeur et/ou développeur et le jeu dans la table intermédiaire jeu_has_editDev
                      db.jeu_has_editDev.create({status:true,fk_editDev:developpeur.id,fk_jeu:gameCreated.id})
                      .then(jeu_has_plateforme=>{
                        res.json(jeu_has_plateforme)
                      }).catch(err=>{
                        res.json(err)
                   })
                })
              }else {
                //On ajoute l'éditeur et/ou développeur et le jeu dans la table intermédiaire jeu_has_editDev
                    db.jeu_has_editDev.create({status:true,fk_editDev:developpeur.id,fk_jeu:gameCreated.id})
                    .then(jeu_has_plateforme=>{
                      res.json(jeu_has_plateforme)
                    }).catch(err=>{
                      res.json(err)
                 })
              }
            }).catch(err=>{
              res.json(err)
            })
            }).catch(err=>{
        //En cas de problème, on envoie l'erreur
              res.json(err)
            })
          }else {
        // Si le jeu existe, on envoie un message indiquant que le jeu existe déjà
        jeu.update(gameData,{returning:true,plain:true})
        .then(game=>{
         // console.log(game);
            // console.log(gameSelected);
            db.genre.findOne({where:{type:req.body.genre}})
            .then(genre=>{
              if (!genre) {
                db.genre.create({type:req.body.genre})
                .then(genreCreated=>{
                  db.jeu_has_genre.create({status:true,fk_genre:genreCreated.id,fk_jeu:game.id})
                  .then(jeu_has_genre=>{
                    res.json(jeu_has_genre)
                  }).catch(err=>{
                    res.json(err)
                  })
                }).catch(err=>{
                  res.json(err)
                })
              }else {
                db.jeu_has_genre.create({status:true,fk_genre:genre.id,fk_jeu:game.id})
                .then(jeu_has_genre=>{
                  res.json(jeu_has_genre)
                }).catch(err=>{
                  res.json(err)
                })
              }
            }).catch(err=>{
              res.json(err)
            })

             db.plateforme.findOne({where:{nom:req.body.plateforme}})
             .then(plat=>{
               if (!plat) {
                 db.plateforme.create({nom:req.body.plateforme})
                 .then(platCreated=>{
                   //On ajoute le jeu et la plateforme dans la table intermédiaire jeu_has_plateforme
                       db.jeu_has_plateforme.create({nombre_de_jeux:req.body.nombre,status:true,fk_plateforme:platCreated.id,fk_jeu:game.id})
                       .then(jeu_has_plateforme=>{
                         res.json(jeu_has_plateforme)
                       }).catch(err=>{
                         res.json(err)
                   })
                 }).catch(err=>{
                   res.json(err)
                 })
               }else {
                 //On ajoute le jeu et la plateforme dans la table intermédiaire jeu_has_plateforme
                     db.jeu_has_plateforme.create({nombre_de_jeux:req.body.nombre,status:true,fk_plateforme:plat.id,fk_jeu:game.id})
                     .then(jeu_has_plateforme=>{
                       res.json(jeu_has_plateforme)
                     }).catch(err=>{
                       res.json(err)
                 })
               }
             }).catch(err=>{
               res.json(err)
             })
             db.editDev.findOne({where:{nom:req.body.editeur}})
             .then(edit=>{
               if (!edit) {
                 db.editDev.create({nom:req.body.editeur})
                 .then(editCreated=>{
                   //On ajoute l'éditeur et/ou développeur et le jeu dans la table intermédiaire jeu_has_editDev
                       db.jeu_has_editDev.create({status:true,fk_editDev:editCreated.id,fk_jeu:game.id})
                       .then(jeu_has_editDev=>{
                         res.json(jeu_has_editDev)
                       }).catch(err=>{
                         res.json(err)
                    })
                 }).catch(err=>{
                   res.json(err)
                 })
               }else {
                 //On ajoute l'éditeur et/ou développeur et le jeu dans la table intermédiaire jeu_has_editDev
                     db.jeu_has_editDev.create({status:true,fk_editDev:edit.id,fk_jeu:game.id})
                     .then(jeu_has_editDev=>{
                       res.json(jeu_has_editDev)
                     }).catch(err=>{
                       res.json(err)
                  })
               }
             })
        }).catch(err=>{
          res.json(err)
        })
          }
        })
        //On envoie les informations en JSON
         .catch(err=>{
          console.log(err);
        })
      }
    })
  })
});
//
//On récupère un jeu en fonction de son id
router.get("/one/:id",verifToken,function (req,res) {
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      console.log(user.role);
      if (user.role != 'admin') {
        res.sendStatus(403)
      }else {
        //On vérifie dans la table si le jeu existe via son id
          db.jeu.findOne({
            where:{id:req.params.id},
            attributes:{
              include:[],
        //On exclus les champs "createdAt","updatedAt"
              exclude: []
            },
            include:[{
              all: true, nested: true
            }]
          })
          .then(game=>{
        //On récupère le jeu et on l'envoie en JSON
              res.json(game)
          }).catch(err=>{
        //Sinon on récupère l'erreur
            console.log(err);
          })
      }
    })
  })
});

//On récupère un jeu,son éditeur ou son développeur en fonction du resultat
router.get("/result/",function (req,res) {
//On vérifie dans la table si le jeu existe via son nom récupéré dans le body de la requête
  db.jeu.findOne({
    where:{nom:req.query.result},
    attributes:{
      include:[],
      exclude:[]
    },
    include:[{
      all: true, nested: true
    }]
  })
  .then(game=>{
//On récupère le jeu et on l'envoie en JSON
      res.json(game)
  }).catch(err=>{
//Sinon on récupère l'erreur
    console.log(err);
  })
});

//On récupère tous les jeux
router.get("/allname",(req,res) => {
        //On selectionne tous les jeux
        db.jeu.findAll({
          attributes:{
            include:["nom"],
            exclude:["sortie","synopsis","images","videos","articles"]
          }
        })
        .then(game=>{
        //On récupère le jeu et on l'envoie en JSON
            res.json(game)
        }).catch(err=>{
        //Sinon on récupère l'erreur
          res.json(err);
    })
});

//On récupère tous les jeux
router.get("/all",verifToken,(req,res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne tous les jeux
        db.jeu.findAll({
          attributes:{
            include:[],
            exclude:[]
          }
        })
        .then(game=>{
        //On récupère le jeu et on l'envoie en JSON
            res.json(game)
        }).catch(err=>{
        //Sinon on récupère l'erreur
          res.json(err);
        })
      }
    }).catch(err=>{
      res.json(err)
    })
  })
});

//On supprime un jeu en fonction de son id
router.delete("/delete/:id",verifToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{randomtoken:authData.randomtoken}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne chaque jeu
          db.jeu.findOne({
            where:{id:req.params.id}
          }).then(game=>{
        //On vérifie si le jeu existe
            if (game) {
        //Si oui, il l'enlève de la table (DROP)
              game.destroy().then(()=>{
        //retourne une réponse JSON
                res.json("jeu supprimé")
              }).catch(err=>{
        //On récupère l'erreur
                res.json(err)
              })
            }else {
        //On envoie une réponse si le jeu n'existait pas
              res.json("Le jeu n'existe pas")
            }
          }).catch(err=>{
            res.json(err)
          })
      }
    }).catch(err=>{
      res.json(err)
    })
  })
})



module.exports = router;
