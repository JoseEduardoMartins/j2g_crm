'use strict';
//repository
const repository = require('../repository/company');

//methods get
exports.create = async (req, res, next) => {
  try {
      const company = req.body;

      await repository.insert(company);

      res.status(200).send({ message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ message: 'Falha ao processar sua requisição' });
  }
};
