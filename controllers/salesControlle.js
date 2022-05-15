const saleServices = require('../services/salesServices');

const getAll = async (req, res) => {
  const sale = await saleServices.getAll();
  return res.status(200).json(sale);
};

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const sale = await saleServices.create(name, quantity);
    return res.status(201).json(sale);
  } catch (error) {
    return res.status(409).json({ message: 'sale already exists' });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const sale = await saleServices.edit(id, name, quantity);
    return res.status(200).json(sale);
  } catch (error) {
  return res.status(404).json({ message: 'sale not found' });
  }
};

const deletesale = async (req, res) => {
  try {
    const { id } = req.params;
    await saleServices.deletesale(id);
    return res.status(204).send();
  } catch (error) {
  return res.status(404).json({ message: 'sale not found' });
  }
};

module.exports = {
  getAll,
  create,
  edit,
  deletesale,
};