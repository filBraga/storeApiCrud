const mysql = require('mysql2/promise');
    
const connection = mysql.createPool({ 
  host: 'localhost', 
  user: 'root', 
  password: 'docker', 
  database: 'insert_your_database_here', 
});

module.exports = connection;
