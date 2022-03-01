'use strict';

const db = require('../connections/j2g-connection');

module.exports = class Company{
    //selects
		static selectAll(){
			return new Promise((resolve, reject) => {
					db.query('SELECT * from email;',
					(err, result) => {
							return err ? reject(err) : resolve(result);
					});
			});
    };
		static selectById(id_email){
			return new Promise((resolve, reject) => {
					db.query('SELECT * from email where id_email = ?;',
					[id_email],
					(err, result) => {
							return err ? reject(err) : resolve(result[0]);
					});
			});
    };
		//inserts
		static insert(email){
			return new Promise((resolve, reject) => {
					db.query('INSERT INTO email (id_company, email) VALUES (?, ?);',
					[email.id_company, email.email],
					(err, result) => {
							return err ? reject(err) : resolve(result.insertId);
					});
			});
    };
		//updates
		static update(email){
			return new Promise((resolve, reject) => {
					db.query('UPDATE email SET id_company = ?, email = ? WHERE id_email = ?;',
					[email.id_company, email.email, email.id_email],
					(err, result) => {
							return err ? reject(err) : resolve(result);
					});
			});
    };
		//deletes
};
