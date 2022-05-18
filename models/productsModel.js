const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await connection.execute(query);
  return products;
};

// const getSingle = async () => {
//   const query = 'SELECT * FROM products where id id = ?';
//   const [products] = await connection.execute(query);
//   return products;
// };

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

  const product = {
    id: registeredId.insertId,
    name,
    quantity,
  };

  return product;
};

const edit = async (id, name, quantity) => {
  const query = 'update products set name = ?, quantity = ? where id = ?';
  await connection.execute(query, [name, quantity, id]);
  const product = { id, name, quantity };
  return product;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?;';
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