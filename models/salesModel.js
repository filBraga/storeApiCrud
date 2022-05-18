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
  return sale;
};

const getSaleById = async (id) => {
  const query = 'select * from sales where id = ?';
  const [sale] = await connection.execute(query, [id]);
  return sale[0];
};

const getSaleProductsById = async (id) => {
  const query = 'select * from sales_products where sale_id = ?';
  const [sale] = await connection.execute(query, [id]);

  return sale;
};

const editSale = async (quantity, productId) => {
  const query = 'update sales_products set quantity = ? where product_id = ?';
  await connection.execute(query, [quantity, productId]);
  
  return true;
};

module.exports = {
  createSales,
  createSalesProducts,
  getSaleById,
  editSale,
  getSaleProductsById,
};