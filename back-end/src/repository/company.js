'use strict';

const db = require('../connections/j2g-connection');

module.exports = class Company{
    //selects
		//inserts
		static insert(user_id){
			return new Promise((resolve, reject) => {
					db.query('INSERT INTO company (name, cnpj, email, password) VALUES (?, ?, ?, ?) ',
					[user_id],
					(err, result) => {
							return err ? reject(err) : resolve(result[0]);
					});
			});
    };
		//updates
		//deletes
};
