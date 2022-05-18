const connection = require('./connection');

// const queryDate = 'select * from sales where id = ?';
// const [date] = await connection.execute(queryDate, [id]);

// const saleReturn = [
//   {
//     date,
//     productId: sale.product_id,
//     quantity: sale.quantity,
//   },
// ];

const getAll = async () => {
  const query = `SELECT sa.id AS saleId , sa.date, sa_pro.product_id AS productId, sa_pro.quantity
  FROM sales AS sa
  INNER JOIN sales_products AS sa_pro
  WHERE sa.id = sa_pro.sale_id
  ORDER BY saleId, productId;`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getDate = async (id) => {
  const queryDate = 'select * from sales where id = ?';
  const [date] = await connection.execute(queryDate, [id]);
  return date[0];
};

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
  console.log(sale);
  return sale;
};

const getSaleProductsById = async (id) => {
  const query = `SELECT sa.date, sa_pro.product_id AS productId, sa_pro.quantity
  FROM sales AS sa
  INNER JOIN sales_products AS sa_pro
  ON sa.id = sa_pro.sale_id
  WHERE sa.id = ?
  ORDER BY sa.id, productId;`;
  const [sale] = await connection.execute(query, [id]);

  return sale;
};

const editSale = async (quantity, productId) => {
  const query = 'update sales_products set quantity = ? where product_id = ?';
  await connection.execute(query, [quantity, productId]);
  
  return true;
};

module.exports = {
  getAll,
  getDate,
  createSales,
  createSalesProducts,
  getSaleById,
  editSale,
  getSaleProductsById,
};