'use strict';
//imports
const md5 = require('md5');
const { cnpj } = require('cpf-cnpj-validator');
//config
const config = require('../config/config');
//repository
const repository = require('../repository/company');
//utils
const ValidationContract = require('../validators/validator');
const authService = require('../services/auth-service');

//METHODS GET
//get all companies
exports.getAll = async (req, res, next) => {
  try {
		const companies = await repository.selectAll();
		res.status(200).send({ companies, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
		console.log(e);
      res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
  }
};
//get company by id
exports.getById = async (req, res, next) => {
  try {
			const { id_company } = req.body;
      const company = await repository.selectById( id_company );

      res.status(200).send({ company, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ message: 'Falha ao processar sua requisição' });
  }
};
//get company * by token validation
exports.getByToken = async (req, res, next) => {
  try {
		const token = req.body.token || req.query.token || req.headers['x-access-token'];
		const data = await authService.decodeToken(token);

		const company = await repository.selectById(data.id_company);

		if(!company) return res.status(400).send({ message: 'Cliente não encontrado' });

    res.status(200).send({
			company,
			message: 'Requisição realizada com sucesso!'
		});
  } catch (e) {
      res.status(400).send({ message: 'Falha ao processar sua requisição' });
  }
};
//METHODS POST
exports.create = async (req, res, next) => {
  try {
      const { company } = req.body;

			console.log(company);
			// data validation
			const contract = new ValidationContract()
			contract.isCnpj(company.cnpj, 'Cnpj invalido!')
			contract.isEqualFields(company.password, company.confirmPassword, 'As senhas estão diferentes!')
			contract.isPassword(company.password, 'A senha deve conter nominimo 8 caracteres, letras(maiusculas e minusculas) e numeros!')

			// if invalid data
			if(!contract.isValid()) return res.status(400).send({  message: contract.errors() }).end()
			if(!cnpj.isValid(company.cnpj)) return res.status(400).send({ message: "Cnpj invalido!" }).end()

      const id_company = await repository.insert({
				name: company.name,
				cnpj: company.cnpj.replaceAll(".","").replaceAll("/", "").replaceAll("-", ""),
				login: company.login,
				password: md5(company.password + global.SALT_KEY),
				isActive: 1
			});

      res.status(200).send({ id_company, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
  }
};
//Authorize company if datas is corrects
exports.authenticateUser = async (req, res, next) => {
	try {
			const {login, password} = req.body;

			const company = await repository.selectByLogin(login);

			if (!company) return res.status(400).send({code: 10, message: 'Usuário ou senha inválidos' });

			if (company.password !== md5(password + global.SALT_KEY)) return res.status(400).send({code: 10, message: 'Usuário ou senha inválidos' });

			const token = await authService.generateToken({
					id_company: company.id_company
			});

			res.status(200).send({code: 30, id_company: company.id_company, token: token, message: 'Autenticação realizada com sucesso!' });
	} catch (e) {
			res.status(400).send({ message: 'Falha ao processar sua requisição' });
	}
};
//METHODS PUT
//Update * company
exports.update = async (req, res, next) => {
  try {
      const { company } = req.body;
			// data validation
			const contract = new ValidationContract()
			contract.isCnpj(company.cnpj, 'Cnpj invalido!')
			contract.isEqualFields(company.password, company.confirmPassword, 'As senhas estão diferentes!')
			contract.isPassword(company.password, 'A senha deve conter nominimo 8 caracteres, letras(maiusculas e minusculas) e numeros!')

			// if invalid data
			if(!contract.isValid()) return res.status(400).send({ message: contract.errors() }).end()
			if(!cnpj.isValid(company.cnpj)) return res.status(400).send({ message: "Cnpj invalido!" }).end()

      await repository.update({
				id_company: company.id_company,
				name: company.name,
				cnpj: company.cnpj.replaceAll(".","").replaceAll("/", "").replaceAll("-", ""),
				login: company.login,
				password: md5(company.password + global.SALT_KEY),
				isActive: 1
			});

      res.status(200).send({ message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
  }
};
