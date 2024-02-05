// En my-electron-app/server/server.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3006; // Puedes elegir cualquier puerto que no esté en uso

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '123',
  database: 'adminmuebles',
});

connection.connect();

// Define las rutas de tu API aquí
app.get('/propietarios', (req, res) => {
  console.log('Antes de la consulta'); // Mensaje de depuración
  const query = 'SELECT * FROM propietarios';
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
  console.log('conexion exitosa 2');
});
