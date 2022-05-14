const productServices = require('../services/productsServices');

const getAll = async (req, res) => {
  const product = await productServices.getAll();
  return res.status(200).json(product);
};

// const create = async (req, res) => {
//   // const { name, quantity } = req.body;
//   const product = await productServices.getAll();
//   return res.status(200).json(product);
// };
  // const newProduct = await productServices.create(name, quantity);
module.exports = {
  getAll,
  // create,
};