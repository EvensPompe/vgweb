const express = require('express');
const router = express.Router();

const db = require('../database/db');
const Sequelize = require('Sequelize');
let Op = Sequelize.Op;

router.post("/new",(req,res)=>{
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
});


//modifier un jeu en fonction de son // route PUT //
router.put("/modify/:id",(req,res)=>{
//On selectionne un jeu dans la table tbl_note
  db.note.findOne({
//On filtre selon l'id donnée dans les paramètres de l'url
    where: {id:req.params.id}
  }).then(()=>{
//On écrase les anciennes données, par les nouvelles données
      db.note.update(
        {
          note: req.body.note,
          critique: req.body.critique
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
});




module.exports = router;
