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

// Ruta para registrar un propietario
app.post('/RPropietario', async (req, res) => {
  const {
    numerodocumento,
    nombrepropietario,
    telefono,
    correoelectronico,
    tipocuenta,
    banco,
    direccion
  } = req.body;

  try {

  
  connection.query(
    'INSERT INTO propietario (Nombre_Completo, Documento_Identidad, Direccion, Telefono, Correo, Banco, Tipo_Cuenta, Numero_Cuenta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      nombrepropietario,
      numerodocumento,
      direccion,
      telefono,
      correoelectronico,
      banco,
      tipocuenta,
      telefono
    ],
    (error, results,) => {
      if (error) {
        console.error('Error al añadir propietario:', error);
        res.status(500).json({ error: 'Error al añadir propietario' });
      } else {
        console.log('Propietario agregado:', results);
        res.status(201).json({ message: 'Propietario registrado exitosamente' });
      }
    }
  );

} catch (error) {
  console.error('Error al añadir propietario:', error);
  res.status(500).json({ error: 'Error al añadir propietario' });
}
});


// Ruta para registrar un Inmueble

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
    console.error('Error al añadir propietario:', error);
    res.status(500).json({ error: 'Error al Registrar inmueble' });

  }
});

/*Registro Codeudor */
app.post('/Rcodeudor', async (req, res) => {

  const {
    nombrecompleto,
    documentoidentidad,
    telefono,
    correoelectronico,
    direccion
  } = req.body;

  try{
    connection.query(
      'INSERT INTO codeudor (Nombre_Completo, Documento_Identidad, Telefono, Correo, Direccion) VALUES (?, ?, ?, ?, ?)',
      [nombrecompleto,
        documentoidentidad,
        telefono,
        correoelectronico,
        direccion,
      ]
    );

  }
  catch (error) {
    console.error('Error al añadir codeudor:', error);
    res.status(500).json({ error: 'Error al añadir codeudor' });
  }
}),

/*
Funcion para logear
*/
app.post('/Login_user', (req, res) => {
  const { correousuario, contrausuario } = req.body; // Datos del formulario

  // Consulta SQL para buscar un usuario con el correo electrónico proporcionado
  const sql = `SELECT * FROM trabajador WHERE correo = ?`;

  connection.query(sql, [correousuario], (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ message: 'Error del servidor' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        // Verifica si la contraseña coincide
        if (user.contrasena === contrausuario) {
          // Las credenciales son válidas
          res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
          // La contraseña es incorrecta
          res.status(401).json({ message: 'Contraseña incorrecta' });
        }
      } else {
        // No se encontró un usuario con el correo electrónico proporcionado
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
