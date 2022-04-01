'use strict';
//connection
const db = require('../connections/j2g-connection');
//class
module.exports = class Customer{
    //selects
		static selectAll(){
			return new Promise((resolve, reject) => {
					db.query('SELECT * from tb_customer;',
					(err, result) => {
							return err ? reject(err) : resolve(result);
					});
			});
    };
		static selectById(customer_id){
			return new Promise((resolve, reject) => {
					db.query('SELECT * from tb_customer where customer_id = ?;',
					[customer_id],
					(err, result) => {
							return err ? reject(err) : resolve(result[0]);
					});
			});
    };
		static selectByLogin(login){
			return new Promise((resolve, reject) => {
					db.query('SELECT * from tb_customer where login = ?;',
					[login],
					(err, result) => {
							return err ? reject(err) : resolve(result[0]);
					});
			});
    };
		//inserts
		static insert(customer){
			return new Promise((resolve, reject) => {
					db.query('INSERT INTO tb_customer (customer_name, customer_tax_id, customer_login, customer_password, customer_isActive) VALUES (?, ?, ?, ?, ?);',
					[customer.name, customer.cnpj, customer.login, customer.password, customer.isActive],
					(err, result) => {
							return err ? reject(err) : resolve(result.insertId);
					});
			});
    };
		//updates
		static update(customer){
			return new Promise((resolve, reject) => {
					db.query('UPDATE tb_customer SET customer_name = ?, customer_tax_id = ?, customer_login = ?, customer_password = ?, customer_isActive = ? WHERE id_customer = ?;',
					[customer.name, customer.cnpj, customer.login, customer.password, customer.isActive, customer.id_customer],
					(err, result) => {
							return err ? reject(err) : resolve(result);
					});
			});
    };
		//deletes
};
