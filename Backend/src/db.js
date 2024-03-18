const mysql = require('mysql');

let connection;
let databaseConfig;

function configureDatabase({ host, user, password, database }) {
  databaseConfig = { host, user, password, database };

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

function getDatabaseConfig() {
  return databaseConfig;
}

module.exports = { configureDatabase, getConnection, getDatabaseConfig };
