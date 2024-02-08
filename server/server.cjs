/* eslint-disable no-undef */
// En my-electron-app/server/server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3006; // Puedes elegir cualquier puerto que no esté en uso

app.use(cors()); 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'adminmuebles',
});

connection.connect();

// Define las rutas de tu API aquí
app.get('/propietarios', (req, res) => {
  console.log('Antes de la consulta'); // Mensaje de depuración
  const query = 'SELECT * FROM propietario';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener propietarios:', err);
      res.status(500).json({ error: 'Error al obtener propietarios', details: err.message });
    } else {
      console.log('Después de la consulta', results); // Mensaje de depuración
      res.json(results);
    }
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`
  );
});
