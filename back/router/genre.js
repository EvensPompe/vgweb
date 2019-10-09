const express = require('express');
const router = express.Router();

const db = require('../database/db');

//On ajoute un nouveau genre
router.post("/add",(req,res)=>{
//On récupère les informations de la requêtes dans un objet
  let genreData = {
    type:req.body.type
  }
// On vérifie si le genre existe déjà via le nom du genre
  db.genre.findOne({
    where: {type:req.body.type},
    include:[{
      model:db.jeu,
      through: {
        attributes: ['fk_jeu']
      }
    }]
  }).then(genre=>{
//Si c'est pas le cas,...
    if (!genre) {
//... il crée le genre dans la table
      db.genre.create(genreData)
      .then(genre=>{
//et envoie en JSON
        res.json(genre)
      }).catch(err=>{
// On récupère l'erreur
        res.json(err)
      })
    }
//On envoie les informations en JSON
    res.json(genreData)
  }).catch(err=>{
    console.log(err);
  })
});


//On récupère tous les genres
router.get("/all",(req,res) => {
//On selectionne tous les genres
db.genre.findAll()
.then(genre=>{
//On récupère le genre et on l'envoie en JSON
    res.json(genre)
}).catch(err=>{
//Sinon on récupère l'erreur
  res.json(err);
})
// res.send("OK")
});

//On récupère un genre
// router.get("/one/:id",(req,res) => {
// //On selectionne un genre via son type dans l'url
// db.genre.findOne({
//   where:{id:req.params.id},
// })
// .then(genre=>{
//   if (genre) {
//     db.genre.findAll({
//       include: [{
//     association: db.jeu_has_genre,
//     }]
//     }).then(data=>{
//       db.jeu.findAll({
//         where:{id:data.id}
//       }).then(jeu=>{
//         res.json(jeu)
//       }).catch(err=>{
//         res.json(err)
//       })
//     }).catch(err=>{
//       res.json(err)
//     })
//   }else {
//     res.json('')
//   }
// }).catch(err=>{
//   res.json(err)
// })
// });

router.get('/test',(req,res)=>{
  db.genre.findAll({
    include:[{
      model:db.jeu
    }]
  }).then(genre=>{
    genre.addtbl_jeu({})
    .then(data=>{
      res.json(data)
    }).catch(err=>{
      res.json(err);
    })
  }).catch(err=>{
    res.json(err)
  })
});

//modifier un genre en fonction de son // route PUT //
router.put("/modify/:id",(req,res)=>{
//On selectionne un genre dans la table tbl_genre
  db.genre.findOne({
//On filtre selon l'id donnée dans les paramètres de l'url
    where: {id:req.params.id}
  }).then(()=>{
//On écrase les anciennes données, par les nouvelles données
      db.genre.update(
        {
          type:req.body.type,
        },
        {
  //Selon l'id choisis, on retourne les lignes affectés par la modifications et
  //on affiche si le résultat s'est bien déroulé (0 ou 1)
          where:{id:req.params.id},
          returning: true,
          plain:true
        }
      )
//On récupère le genre et on l'affiche en objet JSON
      .then((genre)=>{
        res.json(genre)
      })
//On récupère l'erreur si cela ne s'est pas bien déroulé
      .catch(err=>{
        res.json(err)
      })
//On récupère l'erreur si il ne trouve pas le genre à modifier
  }).catch(err=>{
    res.json(err);
  })
});


//On supprime un genre en fonction de son id
router.delete("/delete/:id",(req,res)=>{
//On selectionne chaque genre
  db.genre.findOne({
    where:{id:req.params.id}
  }).then(genre=>{
//On vérifie si le genre existe
    if (genre) {
//Si oui, il l'enlève de la table (DROP)
      genre.destroy().then(()=>{
//retourne une réponse JSON
        res.json("genre supprimé")
      }).catch(err=>{
//On récupère l'erreur
        res.json(err)
      })
    }else {
//On envoie une réponse si le genre n'existait pas
      res.json("Le genre n'existe pas")
    }
  }).catch(err=>{
    res.json(err)
  })
});


router.get("/one/:id",(req,res)=>{
  db.genre.findOne({
    where:{id:req.params.id}
  }).then(genre=>{
    res.json(genre)
  }).then(data=>{
      res.json(data)
    }).catch(err=>{
      res.json(err)
  }).catch(err=>{
    res.json(err)
  })
});

router.get('/game/:id',(req,res)=>{
db.genre.findOne({
  where:{id:req.params.id},
  include:[{
    model: db.jeu
  }]
}).then(genre=>{
  res.json(genre)
}).catch(err=>{
  res.json(err)
})
});

module.exports = router;
