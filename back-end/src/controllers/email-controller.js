'use strict';
//repository
const repository = require('../repository/email');
//utils
const ValidationContract = require('../validators/validator');
//methods get
exports.getAll = async (req, res, next) => {
  try {
		const emails = await repository.selectAll();
		res.status(200).send({ emails, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
		console.log(e);
      res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
  }
};
exports.getById = async (req, res, next) => {
  try {
			const { id_email } = req.body;
      const email = await repository.selectById( id_email );
      res.status(200).send({ email, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ message: 'Falha ao processar sua requisição' });
  }
};
//methods post
exports.create = async (req, res, next) => {
  try {
      const { email } = req.body;
			// data validation
			const contract = new ValidationContract()
			contract.isEmail(email.email, 'Email invalido!')
			if(!contract.isValid()) return res.status(400).send({ message: contract.errors() }).end()

      const id_email = await repository.insert(email);

      res.status(200).send({ id_email, message: 'Requisição realizada com sucesso!' });
  } catch (e) {
      res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
  }
};
//methods put
exports.update = async (req, res, next) => {
  try {
		const { email } = req.body;
		// data validation
		const contract = new ValidationContract()
		contract.isEmail(email.email, 'Email invalido!')
		if(!contract.isValid()) return res.status(400).send({ message: contract.errors() }).end()

		await repository.update(email);

		res.status(200).send({ message: 'Requisição realizada com sucesso!' });
} catch (e) {
		res.status(400).send({ e, message: 'Falha ao processar sua requisição' });
}
};
