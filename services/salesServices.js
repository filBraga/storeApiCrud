const salesModel = require('../models/salesModel');

const errorHandler = (status, message) => ({
  status,
  message,
});

const create = async (reqBodyArray) => {
  const insertId = await salesModel.createSales();

  await (reqBodyArray.forEach((element) => {
    const { productId, quantity } = element;
    salesModel.createSalesProducts(insertId, productId, quantity);
  }));
    
  return {
    id: insertId, 
    itemsSold: reqBodyArray, 
  };
};

const edit = async (id, quantity, productId) => {
  const verifySale = await salesModel.getSaleById(id);
  if (verifySale === undefined) throw errorHandler(404, 'Sale not found');

  await salesModel.editSale(quantity, productId);
  return {
    saleId: id, 
    itemUpdated: [{ productId, quantity }], 
  };
};

module.exports = {
  create,
  edit,
};