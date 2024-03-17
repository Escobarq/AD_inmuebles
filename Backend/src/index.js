const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3006;
const { configureDatabase, getDatabaseConfig } = require('./db');

app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');
app.use('/', routes);

let server;

function startServer() {
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');

  // Reiniciar el servidor si hay un error relacionado con la base de datos
  if (server && err instanceof Error && err.message === 'Database connection has not been configured') {
    console.log('Reiniciando el servidor...');
    server.close(() => {
      const databaseConfig = getDatabaseConfig();
      if (databaseConfig) {
        const { host, user, password, database } = databaseConfig;
        configureDatabase({ host, user, password, database });
        startServer();
      } else {
        console.error('Database configuration is undefined. Unable to restart server.');
      }
    });
  }
});

// Cierre de la conexión a la base de datos cuando se detiene la aplicación
process.on('exit', () => {
  const connection = require('./db').getConnection();
  if (connection) {
    connection.end();
  }
});
