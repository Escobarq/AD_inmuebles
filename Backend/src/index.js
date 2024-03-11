const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3006; // Puedes elegir cualquier puerto que no esté en uso

app.use(cors());
app.use(express.json());

const connection = require('./db');

const routes = require('./routes/routes');
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Cierre de la conexión a la base de datos cuando se detiene la aplicación
process.on('exit', () => {
  connection.end();
});
