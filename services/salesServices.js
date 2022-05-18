const salesModel = require('../models/salesModel');

const errorHandler = (status, message) => ({
  status,
  message,
});

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getSingle = async (id) => {
  const verifySale = await salesModel.getSaleById(id);
  if (verifySale === undefined) throw errorHandler(404, 'Sale not found');

  const sale = await salesModel.getSaleById(id);
  return sale;
};

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

const edit = async (id, bodyArray) => {
  const verifySale = await salesModel.getSaleById(id);
  if (verifySale === undefined) throw errorHandler(404, 'Sale not found');

  const arrItemUpdated = [];

  await (bodyArray.map((element) => {
    arrItemUpdated.push(element);
    salesModel.editSale(element.quantity, element.productId);
    return true;
  }));

  const returnedObj = {
    saleId: id,
    itemUpdated: arrItemUpdated,
  };

  return returnedObj;
};

const getSaleProductsById = async (id) => {
  const verifySale = await salesModel.getSaleById(id);
  if (verifySale === undefined) throw errorHandler(404, 'Sale not found');

  const sale = await salesModel.getSaleProductsById(id);
  return sale;
};

module.exports = {
  getAll,
  getSingle,
  create,
  edit,
  getSaleProductsById,
};