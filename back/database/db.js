const Sequelize = require('sequelize');
// const mysql = require('mysql2');

const sequelize = new Sequelize("dbvgweb","root","",{
  host:'localhost',
  dialect:"mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const db = {};

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

module.exports = db;
