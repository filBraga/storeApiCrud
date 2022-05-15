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

const edit = async (id, name, quantity) => {
  const verifyProduct = await productsModel.getProductById(id);
  if (verifyProduct === undefined) throw errorHandler(404, 'Product not found');

  const product = await productsModel.edit(id, name, quantity);
  return product;
};

module.exports = {
  getAll,
  create,
  edit,
};