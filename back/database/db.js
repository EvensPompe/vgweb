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

module.exports = db;
