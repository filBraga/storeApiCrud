const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const create = async (name, quantity) => {
  const createdProduct = await productsModel.create(name, quantity);
  return createdProduct;
};

module.exports = {
  getAll,
  create,
};