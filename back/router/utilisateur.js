const express = require('express');
const router = express.Router();

const db = require('../database/db');

router.post("/add",(req,res)=>{
  let userData ={
    nom_uti: req.body.nom,
    email_uti: req.body.email,
    password_uti: req.body.password,
    presse: req.body.presse,
    admin: req.body.admin,
  }
  db.utilisateur.findOne({
    where:{email_uti:req.body.email}
  }).then(user=>{
    if (!user) {
      db.utilisateur.create()
    }
  })
})

module.exports = router;
