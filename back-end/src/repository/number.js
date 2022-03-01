'use strict';

const db = require('../connections/j2g-connection');

module.exports = class Company{
    //selects
		static selectAll(){
			return new Promise((resolve, reject) => {
					db.query('SELECT * from number;',
					(err, result) => {
							return err ? reject(err) : resolve(result);
					});
			});
    };
		static selectById(id_number){
			return new Promise((resolve, reject) => {
					db.query('SELECT * from number where id_number = ?;',
					[id_number],
					(err, result) => {
							return err ? reject(err) : resolve(result[0]);
					});
			});
    };
		//inserts
		static insert(number){
			return new Promise((resolve, reject) => {
					db.query('INSERT INTO number (id_company, number) VALUES (?, ?);',
					[number.id_company, number.number],
					(err, result) => {
							return err ? reject(err) : resolve(result.insertId);
					});
			});
    };
		//updates
		static update(number){
			return new Promise((resolve, reject) => {
					db.query('UPDATE number SET id_company = ?, number = ? WHERE id_number = ?;',
					[number.id_company, number.number, number.id_number],
					(err, result) => {
							return err ? reject(err) : resolve(result);
					});
			});
    };
		//deletes
};
