const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM producs';

  const [product] = await connection.execute(query);

  return product;
};

module.exports = {
  getAll
};