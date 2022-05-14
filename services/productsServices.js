const productsModel = require('../models/productsModel');

const errorHandler = (status, message) => ({
  status,
  message,
});

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const create = async (name, quantity) => {
  const verifyProduct = await productsModel.getProductByName(name);
  if (verifyProduct) throw errorHandler(409, 'Product already exists');

  const createdProduct = await productsModel.create(name, quantity);
  return createdProduct;
};

module.exports = {
  getAll,
  create,
};