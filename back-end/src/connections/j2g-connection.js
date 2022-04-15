'use strict';

const mysql = require('mysql');

const db_j2g = mysql.createPool({
   connectionLimit : 100, //important
   host     : "207.244.254.56",
   user     : "eutequero_userdb",
   password : ",R_rK7&K$GPW",
   database : "eutequero_db",
   debug    :  false
});

module.exports = db_j2g;
