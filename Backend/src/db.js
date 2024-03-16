const mysql = require('mysql');

function configureDatabase({ host, user, password, database }) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    connection.connect((error) => {
      if (error) {
        console.error('Error connecting to database:', error);
        reject(error);
      } else {
        console.log('Connected to MySQL database');
        resolve(connection); // Resolver la promesa con la conexión establecida
      }
    });
  });
}

module.exports = { configureDatabase };