const saleServices = require('../services/salesServices');

const create = async (req, res) => {
  // try {
    const reqBodyArray = req.body;
    const sale = await saleServices.create(reqBodyArray);
    return res.status(201).json(sale);
  // } catch (error) {
  //   return res.status(409).json({ message: 'sale already exists' });
  // }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const [{ productId, quantity }] = req.body;
    const sale = await saleServices.edit(id, quantity, productId);
    console.log(sale);
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getSaleProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await saleServices.getSaleProductsById(id);
  return res.status(200).json(product);
};

module.exports = {
  create,
  edit,
  getSaleProductsById,
};