const productServices = require('../services/productServices');

const getAll = async (req, res) => {
  const product = await productServices.getAll();
  return res.status(200).json(product);
};

module.exports = {
  getAll
};