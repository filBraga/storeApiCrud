const salesModel = require('../models/salesModel');

// const errorHandler = (status, message) => ({
//   status,
//   message,
// });

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

module.exports = {
  create,
};