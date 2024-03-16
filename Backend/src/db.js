const mysql = require('mysql');

let connection;

function configureDatabase({ host, user, password, database }) {
  connection = mysql.createConnection({
    host,
    user,
    password,
    database,
  });

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to database:', error);
    } else {
      console.log('Connected to MySQL database');
    }
  });
}

function getConnection() {
  if (!connection) {
    throw new Error('Database connection has not been configured');
  }
  return connection;
}

module.exports = { configureDatabase, getConnection };
