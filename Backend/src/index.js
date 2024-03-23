const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3006;
const { configureDatabase, getDatabaseConfig } = require('./db');
const fs = require('fs'); // Agregar la importación del módulo fs

app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');
app.use('/', routes);

let server;

function startServer() {
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    // Leer el contenido del archivo config.json
    try {
      const configData = fs.readFileSync('./config.json', 'utf8');
      const databaseConfig = JSON.parse(configData);
      console.log('Datos de conexión desde config.json:', databaseConfig);
    } catch (err) {
      console.error('Error al leer el archivo de configuración:', err);
    }

    // Obtener los datos de conexión desde la función getDatabaseConfig
    const databaseConfig = getDatabaseConfig();
    console.log('Datos de conexión desde getDatabaseConfig:', databaseConfig);
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