const salesModel = require('../models/salesModel');

// const errorHandler = (status, message) => ({
//   status,
//   message,
// });

const create = async (productId, quantity) => {
  // const verifySale = await salesModel.getSaleById(name);
  // if (verifySale) throw errorHandler(409, 'Sale already exists');
  const insertId = await salesModel.createSales();
  await salesModel.createSalesProducts(insertId, productId, quantity);
    
  const objCreated = {
    id: insertId, 
    itemsSold: [{ productId, quantity }], 
  };
  return objCreated;
};

module.exports = {
  create,
};