const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAtll();
  return products;
};

module.exports = {
  getAll
};