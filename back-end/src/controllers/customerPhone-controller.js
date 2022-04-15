'use strict';
//repository
const repository = require('../repository/customerPhone');
//METHODS GET
exports.get = async (req, res, next) => {
		try {
				const customer_phones = await repository.select();
				res.status(200).send({ customer_phones });
		} catch (error) {
				res.status(400).send({ error });
		}
};
exports.getById = async (req, res, next) => {
  try {
			const { customer_phone_id } = req.body;
      const customer_phone = await repository.selectById( customer_phone_id );
      res.status(200).send({ customer_phone });
  } catch (error) {
      res.status(400).send({ error });
  }
};
//METHODS POST
exports.set = async (req, res, next) => {
  try {
      const { customer_id, customer_phone } = req.body;

      const id_number = await repository.insert({
				customer_id,
				customer_phone: customer_phone.replaceAll("+","").replaceAll(" ", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", ""),
			});

      res.status(200).send({ id_number });
  } catch (error) {
      res.status(400).send({ error });
  }
};
//METHODS PUT
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
//METHODS DELETE
