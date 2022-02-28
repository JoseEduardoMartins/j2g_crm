'use strict';
//repository
const repository = require('../repository/company');

//methods get
exports.getAll = async (req, res, next) => {
  try {
		console.log('sdfsdfs');
      const companies = await repository.selectAll(company);

      res.status(200).send({ companies, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
		console.log(e);
      res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
  }
};
exports.getById = async (req, res, next) => {
  try {
			const { id_company } = req.body;
      const company = await repository.selectAll( id_company );

      res.status(200).send({ company, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ message: 'Falha ao processar sua requisição' });
  }
};
//methods post
exports.create = async (req, res, next) => {
  try {
      const company = req.body;

      await repository.insert(company);

      res.status(200).send({ message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ message: 'Falha ao processar sua requisição' });
  }
};
