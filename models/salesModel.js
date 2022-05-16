const connection = require('./connection');

const createSales = async () => {
  const querySales = 'INSERT INTO sales (date) VALUES (NOW())';
  const [insertId] = await connection.execute(querySales);
  return insertId.insertId;
};

const createSalesProducts = async (id, productId, quantity) => {  
  const querySalesProduct = 'INSERT INTO sales_products (sale_id, product_id, quantity)' 
    + 'VALUES (?, ?, ?)';
  const sale = await connection.execute(querySalesProduct, [id, productId, quantity]);
  console.log(` this is sale ${sale}`);
  return sale;
};

module.exports = {
  createSales,
  createSalesProducts,
};