const express = require('express');
/*On définit le router pour les opérations de type GET POST PUT */
const router = express.Router();

const randomToken = require('random-token');

//On uilise bcrypt pour crypter les mots de passe
/*bcrypt est une fonction de hachage créée par Niels Provos et David Mazières.
Elle est basée sur l'algorithme de chiffrement Blowfish et a été présentée lors de USENIX en 19991.
En plus de l'utilisation d'un sel pour se protéger des attaques par table arc-en-ciel (rainbow table),
bcrypt est une fonction adaptative, c'est-à-dire que l'on peut augmenter le nombre d'itérations pour la rendre plus lente.
Ainsi elle continue à être résistante aux attaques par force brute malgré l'augmentation de la puissance de calcul.*/
const bcrypt = require('bcrypt');
//On utilise cors pour les autorisations http
const cors = require('cors');
//On utilise Jsonwebtoken pour les authentifications et
//faire des tokens
const jwt = require('jsonwebtoken');
// On importe la base de donnée pour les tables
const db = require('../database/db');

const Sequelize = require('Sequelize');
// On introduit les opérateurs logiques avec la variable Op (Or, and, like, ...)
let Op = Sequelize.Op;

//On génère avec le process une clé secrète
process.env.SECRET_KEY = "secret";


//middlewares
const verifToken = require('./../middlewares/verifToken');


/*On inscrit un nouvel utilisateur*/
router.post("/register", (req, res) => {
  //On définit les informations reçus
  let userData = {
    nom: req.body.nom,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    isactive: true,
    randomtoken: ''
  }
  // On vérifie si l'utilisateur existe
  db.utilisateur.findOne({
    // en comparant les emails
    where: {
      email: req.body.email
    }
  }).then(user => {
    //si l'utilisateur n'existe pas
    if (!user) {
      //On crypte le mot de passe en hachant avec 10 salt
      const hash = bcrypt.hashSync(userData.password, 10)
      /*On remplace le mot de passe en clair par le mot de passe crypté*/
      userData.password = hash

      let randomT = randomToken(16)
      userData.randomtoken = randomT;
      console.log(userData.randomtoken);
      /*Avec les données, on va crée l'utilisateur*/
      db.utilisateur.create(userData).then(user => {
        //On génère un token avec les données de l'utilisateur, la clé secrète et les options

        let token = jwt.sign({
          randomtoken: randomT
        }, process.env.SECRET_KEY, {
          //le token expire au bout de 5 minutes
          expiresIn: 3000
        })
        console.log(token);
        userData.isactive = true;
        //On renvoie le token en objet JSON
        res.json({
          token: token
        })
      }).catch(err => {
        res.json(err)
      })
    } else {
      res.json('Cet utilisateur existe déjà !')
    }
  }).catch(err => {
    res.json(err)
  })
})

//Pour que l'utilisateur puisse se connecter
router.post("/login",verifToken, (req, res) => {
  let tokendecoded = jwt.decode(req.token)
  console.log(req.token);
  if (tokendecoded === 'null') {
    db.utilisateur.findOne({
      where:{randomtoken: tokendecoded.randomtoken}
    }).then(user=>{
      let randomToken = jwt.sign({randomtoken: randomT},"secret", {
       //Le token expire au bout de 12h
       expiresIn: "12h"
      })
      let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
        //Le token expire au bout de 12h
        expiresIn: "12h"
      });
      res.json({randomToken : randomToken, token:token})
    }).catch(err=>{
      res.json(err)
    })
  } else {
    db.utilisateur.findOne({
      where:{email: req.body.email}
    }).then(user=>{
      if (!user || user.isactive === false) {
        res.sendStatus(401)
      }else {
        let randomT = randomToken(16)
        user.update({
          randomtoken: randomT,
          isactive: true
        }, {
          returning: true,
          plain: true
        }).then(()=>{
          // Si c'est bon, on signe le token avec les données, la clé secrète et les options
          db.utilisateur.findOne({
            where:{randomtoken: randomT}
          }).then(user=>{
            let randomToken = jwt.sign({randomtoken: randomT},"secret", {
             //Le token expire au bout de 12h
             expiresIn: "12h"
            })
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              //Le token expire au bout de 12h
              expiresIn: "12h"
            });
            res.json({randomToken : randomToken, token:token})
          }).catch(err=>{
            res.json(err)
          })
        }).catch(err =>{
          res.json(err)
        })
      }
    }).catch(err=>{
      res.json(err)
    })
  }
});

//Avoir l' utilisateur selon le role
router.get("/role/:role",verifToken, (req, res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    if (err) {
      res.sendStatus(403)
    }
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      console.log(user.role);
      if (user.role !== "admin") {
        res.sendStatus(403)
      }else {
        //On selectionne tous les utilisateurs qui ont le rôle de la requête
        db.utilisateur.findAll({
            where: {
              role: req.params.role
            }
          })
          .then(user => {
            //On envoie les données
            res.json(user)
          }).catch(err => {
            console.log(err);
          })
      }
    })
  })
});

//Avoir l' utilisateur selon l'id
router.get("/id/:id",verifToken, (req, res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    if (err) {
      res.sendStatus(403)
    }
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !=="admin") {
        res.sendStatus(403)
      }else {
        //On selectionne tous les utilisateurs qui ont l'id' de la requête
        db.utilisateur.findOne({
            where: {
              id: req.params.id
            }
          })
          .then(user => {
            //On envoie les données
            res.json(user)
          }).catch(err => {
            console.log(err);
        })
      }
    })
  })
});

//Avoir les utilisateurs
router.get("/all",verifToken, (req, res) => {
  jwt.verify(req.token,"secret",(err,authData)=>{
    if (err) {
      res.sendStatus(403)
    }
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //On selectionne tous les utilisateurs
        db.utilisateur.findAll()
          .then(user => {
            //On envoie les données
            res.json(user)
          }).catch(err => {
            console.log(err);
          })
      }
    })
  })
});


//Trouver un utilisateur via son email
router.get("/user/:email",verifToken, (req, res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    if (err) {
      res.sendStatus(403)
    }
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !== "admin") {
        res.sendStatus(403)
      } else {
        //On selectionne l'utilisateur via l'email récupéré dans l'url
        db.utilisateur.findOne({
            where: {
              email: req.params.email
            }
          })
          .then(user => {
            //Si l'utilisateur existe ...
            if (user) {
              //... je l'envoie en json
              res.json(user)
            } else {
              res.json('Cet utilisateur ne fait pas partie de la liste !')
            }
          }).catch(err => {
            console.log(err);
        })
      }
    })
  })
});


//On modifie un utilisateur
router.put("/modify/:email",verifToken, (req, res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    if (err) {
      res.sendStatus(403)
    }
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (!user.email) {
        res.sendStatus(403)
      }else {
        //On vérifie si l'utilisateur existe via le mail inscrit dans l'URL
        db.utilisateur.findOne({
          where: {
            email: req.params.email
          }
        }).then((user) => {
          if (bcrypt.compareSync(req.body.oldPassword, req.body.newOldP)) {
            //On compare le mot de passe reçu via la requête et le mot de passe crypté stocké lors de l'inscription
              let randomT = randomToken(16)
              // Si oui, on applique les modification (nom,email)
              const hash = bcrypt.hashSync(req.body.newPassword, 10)
              db.utilisateur.update({
                  email: req.body.email,
                  password: hash,
                  randomtoken : randomT
                }, {
                  where: {
                    email: req.params.email
                  }, //on vérifie l'email
                  returning: true, //retourne le nombre de lignes affectés par la modification
                  plain: true // retourne 0 ou 1 si la modification s'est bien déroulé
                })
                .then((user) => {
                  db.utilisateur.findOne({
                    where:{email: req.params.email}
                  }).then(user=>{
                    //Si c'est bon, on signe le token avec les données, la clé secrète et les options
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                      //Le token expire au bout de 12h
                      expiresIn: "12h"
                    });
                    res.json({
                      message: "modification effectué avec succès",
                      token: token
                    })
                  }).catch(err=>{
                    res.json(err)
                  })
                })
                .catch(err => {
                  res.json(err)
                })
          } else {
           res.json('Impossible de modifier, veillez correctement entrer votre mot de passe !')
          }
        }).catch(err => {
          res.json(err);
        })
      }
    })
  })
});

//Supprimer un utilisateur
router.delete("/delete/:id",verifToken, (req, res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    if (err) {
      res.sendStatus(403)
    }
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !== 'admin') {
        res.sendStatus(403)
      }else {
        //on vérifie si l'utilisateur existe via l'id...
        db.utilisateur.findOne({
          where: {
            id: req.params.id
          }
        }).then((user) => {
          //... Si oui on détruit l'utilisateur
          if (user) {
            user.destroy()
              .then(() => {
                //on envoie un message confirmant la suppression
                res.json('utilisateur supprimé')
              }).catch(err => {
                res.json(err)
              })
          } else {
            res.json("Cet utilisateur n'existe pas")
          }

        }).catch(err => {
          res.json(err)
        })
      }
    })
  })
});

//débannir un utilisateur
router.put("/debannir/:id",verifToken, (req, res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !=='admin') {
        res.sendStatus(403)
      }else {
        //on vérifie si l'utilisateur existe via l'id...
        db.utilisateur.findOne({
          where: {
            id: req.params.id
          }
        }).then((user) => {
          //... Si oui on détruit l'utilisateur
          console.log(user.role);
          if (user && user.role !== 'admin') {
            user.update(
              {
                isactive: true
              },
              {
                returning: true,
                plain:true
              }
            )
              .then(() => {
                //on envoie un message confirmant le débannissement
                res.json('utilisateur est débanni')
              }).catch(err => {
                res.json(err)
              })
          } else {
            res.json("Cet utilisateur n'existe pas")
          }
        }).catch(err => {
          res.json(err)
        })
      }
    })
  })
});

//débannir un utilisateur
router.put("/bannir/:id",verifToken, (req, res) => {
  jwt.verify(req.token,'secret',(err,authData)=>{
    db.utilisateur.findOne({
      where:{email:authData.email}
    }).then(user=>{
      if (user.role !=='admin') {
        res.sendStatus(403)
      }else {
        //on vérifie si l'utilisateur existe via l'id...
        db.utilisateur.findOne({
          where: {
            id: req.params.id
          }
        }).then((user) => {
          //... Si oui on détruit l'utilisateur
          console.log(user.role);
          if (user && user.role !== 'admin') {
            user.update(
              {
                isactive: false
              },
              {
                returning: true,
                plain:true
              }
            )
              .then(() => {
                //on envoie un message confirmant le bannissement
                res.json('utilisateur est banni')
              }).catch(err => {
                res.json(err)
              })
          } else {
            res.json("Cet utilisateur n'existe pas")
          }
        }).catch(err => {
          res.json(err)
        })
      }
    })
  })
});

module.exports = router;
