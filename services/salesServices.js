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

const edit = async (id, bodyArray) => {
  const verifySale = await salesModel.getSaleById(id);
  if (verifySale === undefined) throw errorHandler(404, 'Sale not found');

  const arrItemUpdated = [];

  console.log(`this is bodyarr ${JSON.stringify(bodyArray)}`);

  bodyArray.map((element) => {
    console.log(`this is element ${JSON.stringify(element)}`);
    arrItemUpdated.push(element);
    salesModel.editSale(element.quantity, element.productId);
    return true;
  });
  console.log(`this is arrItemUpdated ${JSON.stringify(arrItemUpdated)}`);

  const returnedObj = {
    saleId: id,
    itemUpdated: arrItemUpdated,
  };
  console.log(`this is returnedObj ${JSON.stringify(returnedObj)}`);

  return returnedObj;
};

const getSaleProductsById = async (id) => {
  const products = await salesModel.getSaleProductsById(id);
  return products;
};

module.exports = {
  create,
  edit,
  getSaleProductsById,
};