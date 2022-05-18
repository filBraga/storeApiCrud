const productServices = require('../services/productsServices');
// const productsModel = require('../services/productsModel');

const getAll = async (req, res) => {
  const product = await productServices.getAll();
  return res.status(200).json(product);
};

const create = async (req, res, next) => {
  console.log(next);
  try {
    const { name, quantity } = req.body;
    const product = await productServices.create(name, quantity);
    return res.status(201).json(product);
  } catch (error) {
    console.log('chegou até aquiiiii');
    next(error);
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productServices.edit(id, name, quantity);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productServices.deleteProduct(id);
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(error.status).json({ message: error.message });
  }
};

// const productsModel = async (req, res) => {
//   if (verifyProduct === undefined) throw errorHandler(404, 'Product not found');
// };

module.exports = {
  getAll,
  create,
  edit,
  deleteProduct,
};