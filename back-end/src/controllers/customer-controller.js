'use strict';
//imports
const md5 = require('md5');
const { cnpj } = require('cpf-cnpj-validator');
//config
const config = require('../config/config');
//repository
const repository = require('../repository/customer');
//utils
const ValidationContract = require('../validators/validator');
const authService = require('../services/auth-service');

//METHODS GET
//get all customers
exports.getAll = async (req, res, next) => {
  try {
		const customers = await repository.selectAll();
		res.status(200).send({ customers, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
		console.log(e);
      res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
  }
};
//get customer by id
exports.getById = async (req, res, next) => {
  try {
			const { id_customer } = req.body;
      const customer = await repository.selectById( id_customer );

      res.status(200).send({ customer, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ message: 'Falha ao processar sua requisição' });
  }
};
//get customer * by token validation
exports.getByToken = async (req, res, next) => {
  try {
		const token = req.body.token || req.query.token || req.headers['x-access-token'];
		const data = await authService.decodeToken(token);

		const customer = await repository.selectById(data.id_customer);

		if(!customer) return res.status(400).send({ message: 'Cliente não encontrado' });

    res.status(200).send({
			customer,
			message: 'Requisição realizada com sucesso!'
		});
  } catch (e) {
      res.status(400).send({ message: 'Falha ao processar sua requisição' });
  }
};
//METHODS POST
exports.create = async (req, res, next) => {
  try {
      const { customer } = req.body;

			console.log(customer);
			// data validation
			const contract = new ValidationContract()
			contract.isCnpj(customer.cnpj, 'Cnpj invalido!')
			contract.isEqualFields(customer.password, customer.confirmPassword, 'As senhas estão diferentes!')
			contract.isPassword(customer.password, 'A senha deve conter nominimo 8 caracteres, letras(maiusculas e minusculas) e numeros!')

			// if invalid data
			if(!contract.isValid()) return res.status(400).send({  message: contract.errors() }).end()
			if(!cnpj.isValid(customer.cnpj)) return res.status(400).send({ message: "Cnpj invalido!" }).end()

      const id_customer = await repository.insert({
				name: customer.name,
				cnpj: customer.cnpj.replaceAll(".","").replaceAll("/", "").replaceAll("-", ""),
				login: customer.login,
				password: md5(customer.password + global.SALT_KEY),
				isActive: 1
			});

      res.status(200).send({ id_customer, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
  }
};
//Authorize customer if datas is corrects
exports.authenticateUser = async (req, res, next) => {
	try {
			const {login, password} = req.body;

			const customer = await repository.selectByLogin(login);

			if (!customer) return res.status(400).send({code: 10, message: 'Usuário ou senha inválidos' });

			if (customer.password !== md5(password + global.SALT_KEY)) return res.status(400).send({code: 10, message: 'Usuário ou senha inválidos' });

			const token = await authService.generateToken({
					id_customer: customer.id_customer
			});

			res.status(200).send({code: 30, id_customer: customer.id_customer, token: token, message: 'Autenticação realizada com sucesso!' });
	} catch (e) {
			res.status(400).send({ message: 'Falha ao processar sua requisição' });
	}
};
//METHODS PUT
//Update * customer
exports.update = async (req, res, next) => {
  try {
      const { customer } = req.body;
			// data validation
			const contract = new ValidationContract()
			contract.isCnpj(customer.cnpj, 'Cnpj invalido!')
			contract.isEqualFields(customer.password, customer.confirmPassword, 'As senhas estão diferentes!')
			contract.isPassword(customer.password, 'A senha deve conter nominimo 8 caracteres, letras(maiusculas e minusculas) e numeros!')

			// if invalid data
			if(!contract.isValid()) return res.status(400).send({ message: contract.errors() }).end()
			if(!cnpj.isValid(customer.cnpj)) return res.status(400).send({ message: "Cnpj invalido!" }).end()

      await repository.update({
				id_customer: customer.id_customer,
				name: customer.name,
				cnpj: customer.cnpj.replaceAll(".","").replaceAll("/", "").replaceAll("-", ""),
				login: customer.login,
				password: md5(customer.password + global.SALT_KEY),
				isActive: 1
			});

      res.status(200).send({ message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
  }
};
