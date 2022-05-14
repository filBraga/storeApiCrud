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

module.exports = {
  getAll,
  getProductByName,
  create,
};