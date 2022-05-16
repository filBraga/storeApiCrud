const saleServices = require('../services/salesServices');

const create = async (req, res) => {
  // try {
    const [{ productId, quantity }] = req.body;
    const sale = await saleServices.create(productId, quantity);
    return res.status(201).json(sale);
  // } catch (error) {
  //   return res.status(409).json({ message: 'sale already exists' });
  // }
};

module.exports = {
  create,
};