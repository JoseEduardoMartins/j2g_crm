'use strict';

const mysql = require('mysql');

const db_j2g = mysql.createPool({
   connectionLimit : 100, //important
   host     : "localhost",
   user     : "root",
   password : "root",
   database : "db_j2g",
   debug    :  false
});

module.exports = db_j2g;