const express = require('express');
/*On définit le router pour les opérations de type GET POST PUT */
const router = express.Router();

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

//On génère avec le process une clé secrète
process.env.SECRET_KEY = "secret";


/*On inscrit un nouvel utilisateur*/
router.post("/register",(req,res)=>{
//On définit les informations reçus
  let userData ={
    nom: req.body.nom,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }
// On vérifie si l'utilisateur existe
  db.utilisateur.findOne({
// en comparant les emails
    where:{email:req.body.email}
  }).then(user=>{
//si l'utilisateur n'existe pas
    if (!user) {
//On crypte le mot de passe en hachant avec 10 salt
      const hash = bcrypt.hashSync(userData.password,10)
/*On remplace le mot de passe en clair par le mot de passe crypté*/
      userData.password = hash
/*Avec les données, on va crée l'utilisateur*/
      db.utilisateur.create(userData).then(user=>{
//On génère un token avec les données de l'utilisateur, la clé secrète et les options
        let token = jwt.sign(userData,process.env.SECRET_KEY,{
//le token expire au bout de 12h
          expiresIn: "12h"
        })
//On renvoie le token en objet JSON
        res.json({token:token})
      }).catch(err=>{
        res.json(err)
      })
    }else {
      res.json('Cet utilisateur existe déjà !')
    }
  }).catch(err=>{
    res.json(err)
  })
})

//Pour que l'utilisateur puisse se connecter
router.post("/login",(req,res)=>{
//On vérifie si l'utilisateur existe avec son email
  db.utilisateur.findOne({
    where:{email:req.body.email}
  }).then(user=>{
//On compare le mot de passe reçu via la requête et le mot de passe crypté stocké lors de l'inscription
      if (bcrypt.compareSync(req.body.password,user.password)) {
//Si c'est bon, on signe le token avec les données, la clé secrète et les options
        let token = jwt.sign(user.dataValues,process.env.SECRET_KEY,{
//Le token expire au bout de 12h
          expiresIn: "12h"
        });
        res.json({token:token})
        // res.redirect()
      }else {
        res.json('Votre mail ou votre mot de passe sont incorrectes')
      }
  }).catch(err=>{
    res.json(err)
  })
})

//Avoir les utilisateurs selon le role
router.get("/:role",(req,res)=>{
//On selectionne tous les utilisateurs qui ont le rôle de la requête
  db.utilisateur.findAll({
    where:{role: req.params.role}
  })
  .then(user=>{
  //On envoie les données
      res.json(user)
  }).catch(err=>{
    console.log(err);
  })
});

//Avoir les utilisateurs
router.get("/all",(req,res)=>{
  //On selectionne tous les utilisateurs
  db.utilisateur.findAll()
  .then(user=>{
//On envoie les données
      res.json(user)
  }).catch(err=>{
    console.log(err);
  })
});


//Trouver un utilisateur via son email
router.get("/:email",(req,res)=>{
//On selectionne l'utilisateur via l'email récupéré dans l'url
  db.utilisateur.findOne({
    where:{email:req.params.email}
  })
  .then(user=>{
//Si l'utilisateur existe ...
    if (user) {
//... je l'envoie en json
      res.json(user)
    }else {
      res.json('Cet utilisateur ne fait pas partie de la liste !')
    }

  }).catch(err=>{
    console.log(err);
  })
});


//On modifie un utilisateur
router.put("/modify/:email",(req,res)=>{
//On vérifie si l'utilisateur existe via le mail inscrit dans l'URL
  db.utilisateur.findOne({
    where: {email:req.params.email}
  }).then((user)=>{
//On compare le mot de passe reçu via la requête et le mot de passe crypté stocké lors de l'inscription
    if (bcrypt.compareSync(user.password,req.body.password)) {
// Si oui, on applique les modification (nom,email)
      db.utilisateur.update(
        {
          nom:req.body.nom,
          sortie:req.body.email
        },
        {
          where:{email:req.params.email},//on vérifie l'email
          returning: true,//retourne le nombre de lignes affectés par la modification
          plain:true// retourne 0 ou 1 si la modification s'est bien déroulé
        }
      )
      .then((user)=>{
        res.json(user)//Envoie l'utilisateur
      })
      .catch(err=>{
        res.json(err)
      })
    }else {
      res.json('Impossible de modifier, veillez entrer votre mot de passe !')
    }
  }).catch(err=>{
    res.json(err);
  })
});


//Supprimer un utilisateur
router.delete("/delete/:id",(req,res)=>{
//on vérifie si l'utilisateur existe via l'id...
  db.utilisateur.findOne({
    where:{id:req.params.id}
  }).then((user)=>{
//... Si oui on détruit l'utilisateur
    if (user) {
      user.destroy()
      .then(()=>{
//on envoie un message confirmant la suppression
        res.json('utilisateur supprimé')
      }).catch(err=>{
        res.json(err)
      })
    }else {
      res.json("Cet utilisateur n'existe pas")
    }

  }).catch(err=>{
    res.json(err)
  })
})

module.exports = router;
