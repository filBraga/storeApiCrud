const productsModel = require('../models/productsModels');

const errorHandler = (status, message) => ({
  status,
  message,
});

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getSingle = async (id) => {
  const verifyProduct = await productsModel.getProductById(id);
  if (verifyProduct === undefined) throw errorHandler(404, 'Product not found');

  const products = await productsModel.getProductById(id);
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

const deleteProduct = async (id) => {
  const verifyProduct = await productsModel.getProductById(id);
  if (verifyProduct === undefined) {
    throw errorHandler(404, 'Product not found');
  }

  await productsModel.deleteProduct(id);
  // return product;
};

module.exports = {
  getAll,
  getSingle,
  create,
  edit,
  deleteProduct,
};