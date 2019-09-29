const express = require('express');
/* On définit un router pour les opérations de type 'GET','POST',PUT ou 'DELETE'*/
const router = express.Router();
const db = require('../database/db');
// const axios = require('axios');

// let apiKey = 'fa6c2e9ee960263ba0aee33a8b21707e5535e816';
// let urlApi = 'https://www.giantbomb.com/api/';
// let urlJson = '&format=json';
// for (var i = 1; i < 20; i++) {
  // axios.get(`${urlApi}games/?api_key=${apiKey}${urlJson}`)
  // .then(res=>{
  //   for (var game in res.data) {
  //     console.log(game.name);
        // db.jeu.build ({
        //   nom_jeu:game.name,
        //   date_de_sortie: game.original_release_date,
        //   synopsis: game.description
       //   images: game.image
      //    videos: game.video
        // }).save()
  //   }
  // })
  // .catch(err=>{
  //   console.log(err);
  // })
// }

router.put("/modify/:id",(req,res)=>{

  db.jeu.findOne({
    where: {id:req.params.id}
  }).then(()=>{
      db.jeu.update(
        {
          nom:req.body.nom,
          sortie:req.body.sortie,
          synopsis:req.body.synopsis,
          images:req.body.img,
          videos:req.body.video,
        },
        {
          where:{id:req.params.id},
          returning: true,
          plain:true
        }
      )
      .then((game)=>{
        res.json(game)
      })
      .catch(err=>{
        res.json(err)
      })
  }).catch(err=>{
    res.json(err);
  })
});

router.post("/add",(req,res)=>{

  let gameData = {
    nom:req.body.nom,
    sortie:req.body.sortie,
    synopsis:req.body.synopsis,
    images:req.body.img,
    videos:req.body.video,
  }
  db.jeu.findOne({
    where: {nom:req.body.nom}
  }).then(game=>{
    if (!game) {
      db.jeu.create(gameData)
      .then(game=>{
        res.json(game)
      })
    }
    res.json(gameData)
  }).catch(err=>{
    console.log(err);
  })
});
//
router.get("/one/:id",function (req,res) {
  db.jeu.findOne({
    where:{id:req.params.id},
    attributes:{
      include:[],
      exclude: ["createdAt","updatedAt"]
    }
  })
  .then(game=>{
      res.json(game)
  }).catch(err=>{
    console.log(err);
  })
});

router.get("/all",(req,res) => {

db.jeu.findAll({
  attributes:{
    include:[],
    exclude: ["createdAt","updatedAt"]
  }
})
.then(game=>{
    res.json(game)
}).catch(err=>{
  console.log(err);
})
// res.send("OK")
});

router.delete("/delete/:id",(req,res)=>{
  db.jeu.findOne({
    where:{id:req.params.id}
  }).then(game=>{
    if (game) {
      game.destroy().then(()=>{
        res.json("jeu supprimé")
      }).catch(err=>{
        res.json(err)
      })
    }else {
      res.json("Le jeu n'existe pas")
    }
  }).catch(err=>{
    res.json(err)
  })
})


module.exports = router;
