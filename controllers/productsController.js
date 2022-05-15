const productServices = require('../services/productsServices');

const getAll = async (req, res) => {
  const product = await productServices.getAll();
  return res.status(200).json(product);
};

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await productServices.create(name, quantity);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(409).json({ message: 'Product already exists' });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productServices.edit(id, name, quantity);
    return res.status(200).json(product);
  } catch (error) {
  return res.status(404).json({ message: 'Product not found' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productServices.deleteProduct(id);
    return res.status(204).send();
  } catch (error) {
  return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  getAll,
  create,
  edit,
  deleteProduct,
};