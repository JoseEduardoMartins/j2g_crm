'use strict';
//repository
const repository = require('../repository/number');
//utils
const ValidationContract = require('../validators/validator');
//methods get
exports.getAll = async (req, res, next) => {
  try {
		const numbers = await repository.selectAll();
		res.status(200).send({ numbers, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
		console.log(e);
      res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
  }
};
exports.getById = async (req, res, next) => {
  try {
			const { id_number } = req.body;
      const number = await repository.selectById( id_number );
      res.status(200).send({ number, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ message: 'Falha ao processar sua requisição' });
  }
};
//methods post
exports.create = async (req, res, next) => {
  try {
      const { number } = req.body;

			// data validation
			const contract = new ValidationContract()
			contract.isPhoneNumber(number.number, 'Number invalido!')
			if(!contract.isValid()) return res.status(400).send({ message: contract.errors() }).end()

      const id_number = await repository.insert({
				id_company: number.id_company,
				number: number.number.replaceAll("+","").replaceAll(" ", "").replaceAll("-", ""),
			});

      res.status(200).send({ id_number, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
  }
};
//methods put
exports.update = async (req, res, next) => {
  try {
		const { number } = req.body;
		// data validation
		const contract = new ValidationContract()
		contract.isPhoneNumber(number.number, 'Number invalido!')
		if(!contract.isValid()) return res.status(400).send({ message: contract.errors() }).end()

		await repository.update({
			id_number: number.id_number,
			id_company: number.id_company,
			number: number.number.replaceAll(" ", "").replaceAll("-", ""),
		});

		res.status(200).send({ message: 'Requisição realizada com sucesso!' });
	} catch (e) {
		res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
	}
};
