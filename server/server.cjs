/* eslint-disable no-undef */
// En my-electron-app/server/server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3006; // Puedes elegir cualquier puerto que no esté en uso

app.use(cors()); 
app.use(express.json());

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

app.post('/Reinmueble', async (req,res) => {
  

  const { Nmatricula,
    Direccion,
    Ciudad,
    Barrio,
    Tipo,
    NoNiveles,
    ValorIn,
    Estrato,
    NoHabita,
    Estado,
    NoTerraza,
    AreaM,
    Descripcion,
    Nbanos,
    Spublicos,
    aseguramiento,

   } = req.body;

  try {
    if (Tipo == "Bodega") {
      
      connection.query(
       'INSERT INTO inmueble (No_Matricula, Direccion, Estrato, Ciudad, Barrio, Tipo, No_Banos, Servicios_Publicos, Aseguramiento, Descripcion, Valor_Inmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
       [Nmatricula,
         Direccion,
         Estrato,
         Ciudad,
         Barrio,
         Tipo,
         Nbanos,
         Spublicos,
         aseguramiento,
         Descripcion,
        ValorIn,
      Estado]
     );
    }
    else if(Tipo == "Casa") {
       connection.query(
       'INSERT INTO inmueble (No_Matricula, Direccion, Estrato, Ciudad, Barrio, Tipo, No_Banos, Servicios_Publicos, Aseguramiento, Descripcion, Valor_Inmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
       [Nmatricula,
         Direccion,
         Estrato,
         Ciudad,
         Barrio,
         Tipo,
         Nbanos,
         Spublicos,
         aseguramiento,
         Descripcion,
        ValorIn,
      Estado]
     );
    }

    else if(Tipo == "Apartamento") {
       connection.query(
       'INSERT INTO inmueble (No_Matricula, Direccion, Estrato, Ciudad, Barrio, Tipo, No_Habitaciones, No_Niveles, No_Terraza, No_Banos, Servicios_Publicos, Aseguramiento, Descripcion, Valor_Inmueble, Estado) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
       [Nmatricula,
         Direccion,
         Estrato,
         Ciudad,
         Barrio,
         Tipo,
         NoHabita,
         NoNiveles,
         NoTerraza,
         Nbanos,
         Spublicos,
         aseguramiento,
         Descripcion,
        ValorIn,
      Estado]
     );
    }

    else if(Tipo == "Oficina") {
       connection.query(
       'INSERT INTO inmueble (No_Matricula, Direccion, Estrato, Ciudad, Barrio, Tipo, No_Banos, Servicios_Publicos, Aseguramiento, Descripcion, Valor_Inmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
       [Nmatricula,
         Direccion,
         Estrato,
         Ciudad,
         Barrio,
         Tipo,
         Nbanos,
         Spublicos,
         aseguramiento,
         Descripcion,
        ValorIn,
      Estado]
     );
    }
    
    else if(Tipo == "Local") {
       connection.query(
       'INSERT INTO inmueble (No_Matricula, Direccion, Estrato, Ciudad, Barrio, Tipo, No_Banos, No_Habitaciones, Servicios_Publicos, Aseguramiento, Descripcion, Valor_Inmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
       [Nmatricula,
         Direccion,
         Estrato,
         Ciudad,
         Barrio,
         Tipo,
         Nbanos,
         NoHabita,
         Spublicos,
         aseguramiento,
         Descripcion,
        ValorIn,
      Estado]
     );
    }


    res.status(201).json({ message: 'Inmueble Registrado exitosamente' });
  } catch (error) {
    console.log(Nmatricula)
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Error al añadir el inmueble' });
  }


});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`
  );
});
