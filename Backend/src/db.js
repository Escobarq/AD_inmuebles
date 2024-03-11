const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'adminmuebles',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    throw error; // Lanzar error en caso de falla en la conexión
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
