'use strict';
//connection
const db = require('../connections/j2g-connection');

exports.selectAll = async () =>{
		return new Promise((resolve, reject) => {
				db.query('SELECT * from tb_customer',
				(err, result) => {
						return err ? reject(err) : resolve(result);
				});
		});
};
exports.selectById = async (customer_id) => {
	return new Promise((resolve, reject) => {
			db.query('SELECT * from tb_customer where customer_id = ?',
			[customer_id],
			(err, result) => {
					return err ? reject(err) : resolve(result[0]);
			});
	});
};
exports.selectByLogin = async (login) => {
	return new Promise((resolve, reject) => {
			db.query('SELECT * from tb_customer where login = ?',
			[login],
			(err, result) => {
					return err ? reject(err) : resolve(result[0]);
			});
	});
};
exports.insert = async (customer) => {
	return new Promise((resolve, reject) => {
			db.query('INSERT INTO tb_customer (customer_name, customer_tax_id, customer_login, customer_password, customer_isActive) VALUES (?, ?, ?, ?, ?)',
			[customer.name, customer.tax_id, customer.login, customer.password, customer.isActive],
			(err, result) => {
					return err ? reject(err) : resolve(result.insertId);
			});
	});
};
exports.update = async (customer) => {
	return new Promise((resolve, reject) => {
			db.query('UPDATE tb_customer SET customer_name = ?, customer_tax_id = ?, customer_login = ?, customer_password = ?, customer_isActive = ? WHERE customer_id = ?',
			[customer.name, customer.tax_id, customer.login, customer.password, customer.isActive, customer.id_customer],
			(err, result) => {
					return err ? reject(err) : resolve(result);
			});
	});
};
exports.delete = async (customer_id) => {
	return new Promise((resolve, reject) => {
			db.query('DELETE FROM tb_customer WHERE customer_id = ?',
			[customer_id],
			(err, result) => {
					return err ? reject(err) : resolve(result);
			});
	});
};
