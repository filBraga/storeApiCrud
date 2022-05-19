const saleServices = require('../services/salesServices');

const getAll = async (req, res) => {
  const sales = await saleServices.getAll();
  return res.status(200).json(sales);
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await saleServices.getSingle(id);
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const reqBodyArray = req.body;
    const sale = await saleServices.create(reqBodyArray);
    return res.status(201).json(sale);
  } catch (error) {
    return res.status(409).json({ message: 'sale already exists' });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const bodyArray = req.body;
    const sale = await saleServices.edit(id, bodyArray);

    return res.status(200).json(sale);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getSaleProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await saleServices.getSaleProductsById(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  edit,
  getSaleProductsById,
};