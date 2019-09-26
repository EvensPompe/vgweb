/*
Sequelize est un ORM qui se place en interface entre le front
et une base de données relationnelle pour simuler une base de données orientée objet.
*/
const Sequelize = require('sequelize');
// const mysql = require('mysql2');

/*
On crée une nouvelle instance Sequelize, qui crée un connection avec la
base de donnée mySQL "dbvgweb".
On définit une taille de la pool de connection(minimum :0, maximum : 5),
idle : temps qu'une connection peut être inative avant d'être enlever
acquire : temps max que la pool essaye de lancer une connection avant de mettre une erreure !
*/
const sequelize = new Sequelize("dbvgweb","root","",{
  host:'localhost',
  dialect:"mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000
  }
})

//On vérifie si la connection entre la base de donnée et le serveur
//s'est bien déroulé !
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const db = {};

//import des models à la base de donnée
db.jeu = require('../models/jeu')(sequelize,Sequelize);
db.genre = require('../models/genre')(sequelize,Sequelize);
db.editDev = require('../models/editDev')(sequelize,Sequelize);
db.note = require('../models/note')(sequelize,Sequelize);
db.jeu_has_plateforme = require('../models/jeu_has_plateforme')(sequelize,Sequelize);
db.plateforme = require('../models/plateforme')(sequelize,Sequelize);
db.utilisateur = require('../models/utilisateur')(sequelize,Sequelize);
db.plateforme_has_editDev = require('../models/plateforme_has_editDev')(sequelize,Sequelize);


//relations entre les tables

// 1N jeu 0N genre
db.jeu.belongsToMany(db.genre,{through:"jeu_has_genre",foreignKey:"fk_genre"});
db.genre.belongsToMany(db.jeu,{through:"jeu_has_genre",foreignKey:"fk_jeu"});

// 1N jeu 1N plateforme

db.jeu.belongsToMany(db.plateforme,{through:"jeu_has_plateforme",foreignKey:"fk_plateforme"});
db.plateforme.belongsToMany(db.jeu,{through:"jeu_has_plateforme",foreignKey:"fk_jeu"});

// 1N plateforme 1N editDev

db.editDev.belongsToMany(db.plateforme,{through:"plateforme_has_editDev",foreignKey:"fk_plateforme"});
db.plateforme.belongsToMany(db.editDev,{through:"plateforme_has_editDev",foreignKey:"fk_editDev"});

// 1N editDev 11 jeu
db.editDev.hasMany(db.jeu,{foreignKey:'fk_editDev'});
db.jeu.belongsTo(db.editDev,{foreignKey:'fk_editDev'})


  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

module.exports = db;
