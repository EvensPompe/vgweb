const express = require('express');
/* On définit un router pour les opérations de type 'GET','POST',PUT ou 'DELETE'*/
const router = express.Router();
const db = require('../database/db');
const axios = require('axios');

let apiKey = 'fa6c2e9ee960263ba0aee33a8b21707e5535e816';
let urlApi = 'https://www.giantbomb.com/api/';
let urlJson = '&format=json';
let apiGames = 'games';
// router.get('/recherche',(req,res) => {
  axios.get(urlApi + apiGames +'/?api_key='+ apiKey + urlJson)
  .then(res=>{
    for (var game of res.data.results) {
     console.log(game.name);
    }
  })
  .catch(err=>{
    console.log(err);
  })
// })





module.exports = router;
