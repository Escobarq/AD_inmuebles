const mysql = require('mysql');
const fs = require('fs');

let connection;
let databaseConfig;

function configureDatabase({ host, user, password, database }) {
  databaseConfig = { host, user, password, database };

  const configData = JSON.stringify(databaseConfig, null, 2);
  fs.writeFileSync('./config.json', configData);
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
  try {
    // Leer los datos de conexión desde el archivo config.json
    const configData = fs.readFileSync('./config.json');
    databaseConfig = JSON.parse(configData);
  } catch (err) {
    console.error('Error al leer el archivo de configuración:', err);
  }

  if (!databaseConfig) {
    console.error('Error: No se encontraron datos de conexión');
    return null;
  }

  if (!connection) {
    connection = mysql.createConnection(databaseConfig);

    connection.connect((error) => {
      if (error) {
        console.error('Error connecting to database:', error);
      } else {
        console.log('Connected to MySQL database');
      }
    });
  }

  return connection;
}
function getDatabaseConfig() {
  return databaseConfig;
}

module.exports = { configureDatabase, getConnection, getDatabaseConfig };
