const sequelize = require('sequelize');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host:'localhost',
  user:"root",
  database:"dbvgweb"
})
