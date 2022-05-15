const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await connection.execute(query);
  return products;
};

const getProductByName = async (name) => {
  const query = 'select * from products where name = ?';
  const [product] = await connection.execute(query, [name]);
  return product[0];
};

const getProductById = async (id) => {
  const query = 'select * from products where id = ?';
  const [product] = await connection.execute(query, [id]);
  return product[0];
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';

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
  const query = 'update products set name = ?, quantity = ? where id = ?';
  await connection.execute(query, [name, quantity, id]);
  const product = { id, name, quantity };
  return product;
};

module.exports = {
  getAll,
  getProductByName,
  getProductById,
  create,
  edit,
};