const productServices = require('../services/productsServices');

const getAll = async (req, res) => {
  const product = await productServices.getAll();
  return res.status(200).json(product);
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const product = await productServices.create(name, quantity);
    return res.status(201).json(product);
  } catch (error) {
    console.log('create product:', error.message);
    next(error);
  }
};

module.exports = {
  getAll,
  create,
};