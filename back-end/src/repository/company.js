'use strict';

const db = require('../connections/j2g-connection');

module.exports = class Company{
    //selects
		static selectAll(){
			return new Promise((resolve, reject) => {
					db.query('SELECT * from company;',
					(err, result) => {
							return err ? reject(err) : resolve(result);
					});
			});
    };
		static selectById(id_company){
			return new Promise((resolve, reject) => {
					db.query('SELECT * from company where id_company = ?;',
					[id_company],
					(err, result) => {
							return err ? reject(err) : resolve(result);
					});
			});
    };
		//inserts
		static insert(company){
			return new Promise((resolve, reject) => {
					db.query('INSERT INTO company (name, cnpj, login, password, isActive) VALUES (?, ?, ?, ?, ?);',
					[company.name, company.cnpj, company.login, company.password, company.isActive],
					(err, result) => {
							return err ? reject(err) : resolve(result);
					});
			});
    };
		//updates
		//deletes
};
