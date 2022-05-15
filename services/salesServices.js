const salesModel = require('../models/salesModel');

const errorHandler = (status, message) => ({
  status,
  message,
});

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const create = async (name, quantity) => {
  const verifysale = await salesModel.getsaleByName(name);
  if (verifysale) throw errorHandler(409, 'sale already exists');

  const createdsale = await salesModel.create(name, quantity);
  return createdsale;
};

const edit = async (id, name, quantity) => {
  const verifysale = await salesModel.getsaleById(id);
  if (verifysale === undefined) throw errorHandler(404, 'sale not found');

  const sale = await salesModel.edit(id, name, quantity);
  return sale;
};

const deletesale = async (id) => {
  const verifysale = await salesModel.getsaleById(id);
  if (verifysale === undefined) throw errorHandler(404, 'sale not found');

  await salesModel.deletesale(id);
  // return sale;
};

module.exports = {
  getAll,
  create,
  edit,
  deletesale,
};