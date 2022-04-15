'use strict';
//imports
const md5 = require('md5');
//config
const config = require('../config/config');
//repository
const repository = require('../repository/customer');
//utils
const ValidationContract = require('../validators/validator');
const authService = require('../services/auth-service');
//METHODS GET
exports.get = async (req, res, next) => {
  try {
			const customers = await repository.selectAll();
			res.status(200).send({ customers });
  } catch (error) {
      res.status(400).send({ error });
  }
};
exports.getById = async (req, res, next) => {
  try {
			const { customer_id } = req.body;
      const customer = await repository.selectById( customer_id );
      res.status(200).send({ customer });
  } catch (error) {
      res.status(400).send({ error });
  }
};
//METHODS POST
exports.set = async (req, res, next) => {
  try {
      const { name, tax_id, login, password, confirmPassword } = req.body;
			// data validation
			const contract = new ValidationContract()
			contract.isCpfOrCnpj(tax_id, 'Tax id invalido!')
			contract.isEqualFields(password, confirmPassword, 'As senhas estão diferentes!')
			contract.isPassword(password, 'A senha deve conter nominimo 8 caracteres, letras(maiusculas e minusculas) e numeros!')
			// if invalid data
			if(!contract.isValid()) return res.status(400).send({  message: contract.errors() }).end()

      const id_customer = await repository.insert({
				name: name,
				tax_id: tax_id.replaceAll(".","").replaceAll("/", "").replaceAll("-", ""),
				login: login,
				password: md5(password + global.SALT_KEY),
				isActive: 1
			});

      res.status(200).send({ id_customer });
  } catch (error) {
      res.status(400).send({ error });
  }
};
exports.authenticate = async (req, res, next) => {
	try {
			const {login, password} = req.body;

			const customer = await repository.selectByLogin(login);

			if (!customer) return res.status(400).send({code: 10, message: 'Usuário ou senha inválidos' });

			if (customer.password !== md5(password + global.SALT_KEY)) return res.status(400).send({code: 10, message: 'Usuário ou senha inválidos' });

			const token = await authService.generateToken({
					id_customer: customer.id_customer
			});

			res.status(200).send({code: 30, id_customer: customer.id_customer, token: token, message: 'Autenticação realizada com sucesso!' });
	} catch (error) {
			res.status(400).send({ error });
	}
};
//METHODS PUT
exports.update = async (req, res, next) => {
  try {
      const { customer_id, name, tax_id, login, password, confirmPassword } = req.body;
			// data validation
			const contract = new ValidationContract()
			contract.isCpfOrCnpj(tax_id, 'Tax id invalido!')
			contract.isEqualFields(password, confirmPassword, 'As senhas estão diferentes!')
			contract.isPassword(password, 'A senha deve conter nominimo 8 caracteres, letras(maiusculas e minusculas) e numeros!')
			// if invalid data
			if(!contract.isValid()) return res.status(400).send({ error: contract.errors() }).end()

      await repository.update({
				customer_id,
				name,
				tax_id: tax_id.replaceAll(".","").replaceAll("/", "").replaceAll("-", ""),
				login,
				password: md5(password + global.SALT_KEY),
				isActive: 1
			});

      res.status(200).send({ message: 'Requisição realizada com sucesso!' });
  } catch (error) {
      res.status(400).send({ error });
  }
};
//METHODS DELETE
exports.delete = async (req, res, next) => {
  try {
		const { customer_id } = req.body;
		await repository.delete(customer_id);

		res.status(200).send({ message: 'Requisição realizada com sucesso!' });
} catch (error) {
		res.status(400).send({ error });
}
};
