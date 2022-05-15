const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM sales';
  const [sales] = await connection.execute(query);
  return sales;
};

const getProductByName = async (name) => {
  const query = 'select * from sales where name = ?';
  const [product] = await connection.execute(query, [name]);
  return product[0];
};

const getProductById = async (id) => {
  const query = 'select * from sales where id = ?';
  const [product] = await connection.execute(query, [id]);
  return product[0];
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO sales (name, quantity) VALUES (?, ?)';

  // [{insertId: 2332}]
  const [registeredId] = await connection.execute(query, [name, quantity]);

  const user = {
    id: registeredId.insertId,
    name,
    quantity,
  };

  return user;
};

const edit = async (id, name, quantity) => {
  const query = 'update sales set name = ?, quantity = ? where id = ?';
  await connection.execute(query, [name, quantity, id]);
  const product = { id, name, quantity };
  return product;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?;';
  await connection.execute(query, [id]);
  // return true;
};

module.exports = {
  getAll,
  getProductByName,
  getProductById,
  create,
  edit,
  deleteProduct,
};