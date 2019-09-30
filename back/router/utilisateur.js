const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

process.env.SECRET_KEY = "secret";

router.post("/register",(req,res)=>{
  let userData ={
    nom: req.body.nom,
    email: req.body.email,
    password: req.body.password,
    presse: req.body.presse,
    admin: req.body.admin,
  }
  db.utilisateur.findOne({
    where:{email:req.body.email}
  }).then(user=>{
    if (!user) {
      const hash = bcrypt.hashSync(userData.password,10)
      userData.password = hash
      db.utilisateur.create(userData).then(user=>{
        let token = jwt.sign(userData,process.env.SECRET_KEY,{
          expiresIn: "12h"
        })
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


router.post("/login",(req,res)=>{
  db.utilisateur.findOne({
    where:{email:req.body.email}
  }).then(user=>{
      if (bcrypt.compareSync(req.body.password,user.password)) {
        let token = jwt.sign(user.dataValues,process.env.SECRET_KEY,{
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


router.get("/presses",(req,res)=>{
  db.utilisateur.findAll({
    where:{presse: true}
  })
  .then(user=>{
      res.json(user)
  }).catch(err=>{
    console.log(err);
  })
});


router.get("/all",(req,res)=>{
  db.utilisateur.findAll()
  .then(user=>{
      res.json(user)
  }).catch(err=>{
    console.log(err);
  })
});

router.get("/admins",(req,res)=>{
  db.utilisateur.findAll({
    where:{admin: true}
  })
  .then(user=>{
      res.json(user)
  }).catch(err=>{
    console.log(err);
  })
});


router.get("/:email",(req,res)=>{
  db.utilisateur.findOne({
    where:{email:req.params.email}
  })
  .then(user=>{
    if (user) {
      res.json(user)
    }else {
      res.json('Cet utilisateur ne fait pas partie de la liste !')
    }

  }).catch(err=>{
    console.log(err);
  })
});

router.put("/modify/:email",(req,res)=>{

  db.utilisateur.findOne({
    where: {email:req.params.email}
  }).then((user)=>{
    if (bcrypt.compareSync(user.password,req.body.password)) {
      db.utilisateur.update(
        {
          nom:req.body.nom,
          sortie:req.body.email
        },
        {
          where:{email:req.params.email},
          returning: true,
          plain:true
        }
      )
      .then((user)=>{
        res.json(user)
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

module.exports = router;
