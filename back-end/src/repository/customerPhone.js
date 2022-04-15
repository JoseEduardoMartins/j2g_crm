'use strict';

const db = require('../connections/j2g-connection');

exports.select = async () =>{
	return new Promise((resolve, reject) => {
			db.query('SELECT * from tb_customer_phone',
			(err, result) => {
					return err ? reject(err) : resolve(result);
			});
	});
};
exports.selectById = async (customer_phone_id) => {
	return new Promise((resolve, reject) => {
			db.query('SELECT * from tb_customer_phone where customer_phone_id = ?',
			[customer_phone_id],
			(err, result) => {
					return err ? reject(err) : resolve(result[0]);
			});
	});
};
exports.insert = async (customer_phone) => {
	return new Promise((resolve, reject) => {
			db.query('INSERT INTO tb_customer_phone (customer_id, customer_phone) VALUES (?, ?)',
			[customer_phone.customer_id, customer_phone.customer_phone],
			(err, result) => {
					return err ? reject(err) : resolve(result.insertId);
			});
	});
};
exports.update = async (customer_phone) => {
	return new Promise((resolve, reject) => {
			db.query('UPDATE tb_customer SET customer_id WHERE customer_phone_id = ?',
			[customer_phone.customer_id, customer_phone.customer_phone_id],
			(err, result) => {
					return err ? reject(err) : resolve(result);
			});
	});
};
exports.delete = async (customer_phone_id) => {
	return new Promise((resolve, reject) => {
			db.query('DELETE FROM tb_customer WHERE customer_phone_id = ?',
			[customer_phone_id],
			(err, result) => {
					return err ? reject(err) : resolve(result);
			});
	});
};
