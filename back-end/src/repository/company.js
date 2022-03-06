'use strict';
//connection
const db = require('../connections/j2g-connection');
//class
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
							return err ? reject(err) : resolve(result[0]);
					});
			});
    };
		static selectByLogin(login){
			return new Promise((resolve, reject) => {
					db.query('SELECT * from company where login = ?;',
					[login],
					(err, result) => {
							return err ? reject(err) : resolve(result[0]);
					});
			});
    };
		//inserts
		static insert(company){
			return new Promise((resolve, reject) => {
					db.query('INSERT INTO company (name, cnpj, login, password, isActive) VALUES (?, ?, ?, ?, ?);',
					[company.name, company.cnpj, company.login, company.password, company.isActive],
					(err, result) => {
							return err ? reject(err) : resolve(result.insertId);
					});
			});
    };
		//updates
		static update(company){
			return new Promise((resolve, reject) => {
					db.query('UPDATE company SET name = ?, cnpj = ?, login = ?, password = ?, isActive = ? WHERE id_company = ?;',
					[company.name, company.cnpj, company.login, company.password, company.isActive, company.id_company],
					(err, result) => {
							return err ? reject(err) : resolve(result);
					});
			});
    };
		//deletes
};
