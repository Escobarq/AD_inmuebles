// src/routes/routes.js

const express = require("express");
const router = express.Router();
const connection = require("../db");

router.get("/Vpropietarios", (req, res) => {
  connection.query(
    "SELECT * FROM propietario ORDER BY Id_Propietario ASC",
    (error, results) => {
      if (error) {
        console.error("Error al obtener datos de la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});



router.get("/Varrendatario", (req, res) => {
  connection.query(
    "SELECT * FROM arrendatario ORDER BY Id_Arrendatario ASC",
    (error, results) => {
      if (error) {
        console.error("Error al obtener datos de la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});
router.get("/Vinmueble", (req, res) => {
  const { tipo, estrato, estado } = req.query; 

  try {
    let query = 'SELECT * FROM inmueble WHERE 1 = 1'; // Inicializa la consulta con una condición verdadera

    const queryParams = []; // Almacena los valores de los parámetros

    if (estado) {
      query += " AND Estado = ?"
      queryParams.push(estado ); 
    }
    if (tipo) {
      
      query += " AND Tipo = ?"
      queryParams.push(tipo ); 
    }
    
    if (estrato) {
      query += " AND Estrato = ?"
      queryParams.push(estrato ); 
     
    }
    
    connection.query(
      query,queryParams,
  
      (error, results) => {
        if (error) {
          console.error("Error al obtener datos de la base de datos:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          res.status(200).json(results);
          
        }
      }
    );
  } catch (error) {
    
  }



});

router.get("/Vinmu_Arren", (req, res) => {
  const { Id_Inmueble } = req.query;

  connection.query(
    "SELECT * FROM inmueble INNER JOIN arrendatario USING(Id_Arrendatario) WHERE Id_Inmueble = ?",
    [Id_Inmueble],
    (error, results) => {
      if (error) {
        console.error("Error al obtener datos de la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json(results);
        
      }
    }
  );
});

router.get("/Vcodeudor", (req, res) => {
  // Consulta SQL sin filtrar por booleanos
  connection.query("SELECT * FROM codeudor", (error, results) => {
    if (error) {
      console.error("Error al obtener datos de la base de datos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.status(200).json(results);
    }
  });
});

//actualizar Estado Codeudor
router.put("/Vcodeudor/:id", (req, res) => {
  const id = req.params.id;
  const nuevoEstado = req.body.estado;

  // Verificar si el estado es 'true' o 'false'
  if (nuevoEstado !== "true" && nuevoEstado !== "false") {
    res.status(400).json({ error: 'El estado debe ser "true" o "false"' });
    return;
  }
  connection.query(
    "UPDATE codeudor SET booleanos = ? WHERE Id_Codeudor = ?",
    [nuevoEstado, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el estado del codeudor:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res
          .status(200)
          .json({ message: "Estado del codeudor actualizado exitosamente" });
      }
    }
  );
});

//actualizar Estado Arrendatario
router.put("/Varrendatario/:id", (req, res) => {
  const id = req.params.id;
  const nuevoEstado = req.body.estado;

  // Verificar si el estado es 'true' o 'false'
  if (nuevoEstado !== "true" && nuevoEstado !== "false") {
    res.status(400).json({ error: 'El estado debe ser "true" o "false"' });
    return;
  }
  connection.query(
    "UPDATE arrendatario SET booleanos = ? WHERE Id_Arrendatario = ?",
    [nuevoEstado, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el estado del codeudor:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res
          .status(200)
          .json({ message: "Estado del codeudor actualizado exitosamente" });
      }
    }
  );
});
//actualizar Estado Arrendatario
router.put("/Vpropetarios/:id", (req, res) => {
  const id = req.params.id;
  const nuevoEstado = req.body.estado;

  // Verificar si el estado es 'true' o 'false'
  if (nuevoEstado !== "true" && nuevoEstado !== "false") {
    res.status(400).json({ error: 'El estado debe ser "true" o "false"' });
    return;
  }
  connection.query(
    "UPDATE propietario SET booleanos = ? WHERE Id_Propietario = ?",
    [nuevoEstado, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el estado del codeudor:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res
          .status(200)
          .json({ message: "Estado del codeudor actualizado exitosamente" });
      }
    }
  );
});
//Actualizar Estado Inmueble
router.put("/VINmuebles/:id", (req, res) => {
  const id = req.params.id;
  const nuevoEstado = req.body.estado;

  // Verificar si el estado es 'true' o 'false'
  if (nuevoEstado !== "true" && nuevoEstado !== "false") {
    res.status(400).json({ error: 'El estado debe ser "true" o "false"' });
    return;
  }

  // Consulta SQL para actualizar el estado del inmueble
  connection.query(
    "UPDATE inmueble SET booleanos = ? WHERE Id_Inmueble = ?",
    [nuevoEstado, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el estado del inmueble:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json({ message: "Estado del inmueble actualizado exitosamente" });
      }
    }
  );
});


router.get("/VPagoArren", (req, res) => {
  connection.query(
    "SELECT * FROM pagos_arrendamiento ORDER BY Id_Pago_Arrendamiento ASC",
    (error, results) => {
      if (error) {
        console.error("Error al obtener datos de la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get("/VComisionPropie", (req, res) => {
  connection.query(
    "SELECT * FROM comision_propietario ORDER BY Id_comision_Propietario ASC",
    (error, results) => {
      if (error) {
        console.error("Error al obtener datos de la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// Ruta para registrar un propietario
router.post("/RPropietario", async (req, res) => {
  const {
    numerodocumento,
    nombrepropietario,
    telefono,
    correoelectronico,
    tipocuenta,
    banco,
    direccion,
    numero_cuenta,
    
  } = req.body;

  try {
    connection.query(
      "INSERT INTO propietario (Nombre_Completo, Documento_Identidad, Direccion,  Correo, Banco, Tipo_Cuenta,Telefono, Numero_Cuenta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombrepropietario,
        numerodocumento,
        direccion,
        correoelectronico,
        banco,
        tipocuenta,
        telefono,
        numero_cuenta,
      ],
      (error, results) => {
        if (error) {
          console.error("Error al añadir propietario:", error);
          res.status(500).json({ error: "Error al añadir propietario" });
        } else {
          console.log("Propietario agregado:", results);
          res
            .status(201)
            .json({ message: "Propietario registrado exitosamente" });
        }
      }
    );
  } catch (error) {
    console.error("Error al añadir propietario:", error);
    res.status(500).json({ error: "Error al añadir propietario" });
  }
});

// Ruta para registrar un Inmueble
router.post("/Reinmueble", async (req, res) => {
  const {
    Nmatricula,
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
        "INSERT INTO inmueble (No_Matricula, Direccion, Estrato, Ciudad, Barrio, Tipo, No_Banos, Servicios_Publicos, Aseguramiento, Descripcion, Valor_Inmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          Nmatricula,
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
          Estado,
        ]
      );
    } else if (Tipo == "Casa") {
      connection.query(
        "INSERT INTO inmueble (No_Matricula, Direccion, Estrato, Ciudad, Barrio, Tipo, No_Banos, Servicios_Publicos, Aseguramiento, Descripcion, Valor_Inmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          Nmatricula,
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
          Estado,
        ]
      );
    } else if (Tipo == "Apartamento") {
      connection.query(
        "INSERT INTO inmueble (No_Matricula, Direccion, Estrato, Ciudad, Barrio, Tipo, No_Habitaciones, No_Niveles, No_Terraza, No_Banos, Servicios_Publicos, Aseguramiento, Descripcion, Valor_Inmueble, Estado) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          Nmatricula,
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
          Estado,
        ]
      );
    } else if (Tipo == "Oficina") {
      connection.query(
        "INSERT INTO inmueble (No_Matricula, Direccion, Estrato, Ciudad, Barrio, Tipo, No_Banos, Servicios_Publicos, Aseguramiento, Descripcion, Valor_Inmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          Nmatricula,
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
          Estado,
        ]
      );
    } else if (Tipo == "Local") {
      connection.query(
        "INSERT INTO inmueble (No_Matricula, Direccion, Estrato, Ciudad, Barrio, Tipo, No_Banos, No_Habitaciones, Servicios_Publicos, Aseguramiento, Descripcion, Valor_Inmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          Nmatricula,
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
          Estado,
        ]
      );
    }

    res.status(201).json({ message: "Inmueble Registrado exitosamente" });
  } catch (error) {
    console.error("Error al añadir propietario:", error);
    res.status(500).json({ error: "Error al Registrar inmueble" });
  }
});

/*Registro Codeudor */
router.post("/Rcodeudor", async (req, res) => {
  const {
    nombrecompleto,
    documentoidentidad,
    telefono,
    correoelectronico,
    direccion,
  } = req.body;

  try {
    connection.query(
      "INSERT INTO codeudor (Nombre_Completo, Documento_Identidad, Telefono, Correo, Direccion) VALUES (?, ?, ?, ?, ?)",
      [
        nombrecompleto,
        documentoidentidad,
        telefono,
        correoelectronico,
        direccion,
      ]
    );
  } catch (error) {
    console.error("Error al añadir codeudor:", error);
    res.status(500).json({ error: "Error al añadir codeudor" });
  }
}),
  /*
  Funcion para logear
  */
  router.post("/Login_user", (req, res) => {
    const { correousuario, contrausuario } = req.body; // Datos del formulario

    // Consulta SQL para buscar un usuario con el correo electrónico proporcionado
    const sql = `SELECT * FROM trabajador WHERE correo = ?`;

    connection.query(sql, [correousuario], (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error del servidor" });
      } else {
        if (results.length > 0) {
          const user = results[0];
          // Verifica si la contraseña coincide
          if (user.contrasena === contrausuario) {
            // Las credenciales son válidas
            res.status(200).json({ message: "Inicio de sesión exitoso" });
          } else {
            // La contraseña es incorrecta
            res.status(401).json({ message: "Contraseña incorrecta" });
          }
        } else {
          // No se encontró un usuario con el correo electrónico proporcionado
          res.status(404).json({ message: "Usuario no encontrado" });
        }
      }
    });
  });
  
// Registrar Usuario
router.post("/RegistrarUsuario", async (req, res) => {
  const { nombre, apellido, correo, contrasena, telefono } = req.body;

  // Validación básica de entrada
  if (!nombre || !apellido || !correo || !contrasena || !telefono) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el correo electrónico ya existe en la base de datos
    const existingUser = await connection.query(
      "SELECT * FROM trabajador WHERE correo = ?",
      [correo]
    );

    if (existingUser.length > 0) {
      // Si se encuentra un usuario con el mismo correo electrónico, responder con un error
      return res.status(409).json({ message: "El correo electrónico ya está en uso" });
    }

    // Insertar usuario en la base de datos
    await connection.query(
      "INSERT INTO trabajador (nombre, apellido, correo, contrasena, telefono) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, correo, contrasena, telefono]
    );

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Ya existe un usuario con ese correo electrónico" });
    }

    res.status(500).json({ message: "Error al registrar usuario" });
  }
});




//Funcion para traer su información
router.get("/Infouser", (req, res) => {
  const { correousuario } = req.query; // Datos del formulario
  // Consulta SQL para buscar un usuario con el correo electrónico proporcionado
  const sql = `SELECT * FROM trabajador WHERE correo = ?`;

  connection.query(sql, [correousuario], (error, results) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
      res.status(500).json({ message: "Error del servidor" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta para registrar un arrendatario
router.post("/Rarrendatario", async (req, res) => {
  const {
    tipodocumento,
    numerodocumento,
    nombrearrendatario,
    telefono,
    correo,
    estado_contrato,
    meses_alquiler,
    fecha_inicio,
    fecha_final,
    valor_deposito,
  } = req.body;

  try {
    connection.query(
      "INSERT INTO arrendatario (Nombre_Completo, Tipo_Documento, Documento_Identidad, Telefono, Meses_Alquiler, Correo, Fecha_Inicio_Contrato, Fecha_Fin_Contrato, Estado,Valor_Deposito) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?,?)",
      [
        nombrearrendatario,
        tipodocumento,
        numerodocumento,
        telefono,
        meses_alquiler,
        correo,
        fecha_inicio,
        fecha_final,
        estado_contrato,
        valor_deposito,
      ],
      (error, results) => {
        if (error) {
          console.error("Error al añadir arrendatario:", error);
          res.status(500).json({ error: "Error al añadir arrendatario" });
        } else {
          console.log("arrendatario agregado:", results);
          res
            .status(201)
            .json({ message: "Arrendatario registrado exitosamente" });
        }
      }
    );
  } catch (error) {
    console.error("Error al añadir propietario:", error);
    res.status(500).json({ error: "Error al añadir propietario" });
  }
});

//Ruta para Traer Empleados
router.get("/Vroles", (req, res) => {
  connection.query("SELECT * FROM trabajador", (error, results) => {
    if (error) {
      console.error("Error al obtener datos de la base de datos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.status(200).json(results);
    }
  });
});

//Aactualizar inmueble
router.put("/actualizarInmueble", (req, res) => {
  const { Id_Inmueble } = req.query; // Datos del formulario
  const { Id_Arrendatario, Estado } = req.body; // Datos del formulario
  const sql = `UPDATE inmueble SET Id_Arrendatario = ?, Estado = ?  WHERE Id_Inmueble = ?`;

  connection.query(
    sql,
    [Id_Arrendatario, Estado, Id_Inmueble],
    (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error del servidor" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});
//Actualizar Estado Historial Gastos
router.put("/Vhgastos/:id", (req, res) => {
  const id = req.params.id;
  const nuevoEstado = req.body.estado;

  // Verificar si el estado es 'true' o 'false'
  if (nuevoEstado !== "true" && nuevoEstado !== "false") {
    res.status(400).json({ error: 'El estado debe ser "true" o "false"' });
    return;
  }

  // Consulta SQL para actualizar el estado del inmueble
  connection.query(
    "UPDATE comision_propietario SET booleanos = ? WHERE Id_comision_Propietario = ?",
    [nuevoEstado, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el estado ", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json({ message: "Estado actualizado exitosamente" });
      }
    }
  );
});
//Actualizar Estado Historial Arrendamiento
router.put("/Vharrendamiento/:id", (req, res) => {
  const id = req.params.id;
  const nuevoEstado = req.body.estado;

  // Verificar si el estado es 'true' o 'false'
  if (nuevoEstado !== "true" && nuevoEstado !== "false") {
    res.status(400).json({ error: 'El estado debe ser "true" o "false"' });
    return;
  }

  // Consulta SQL para actualizar el estado del inmueble
  connection.query(
    "UPDATE pagos_arrendamiento SET booleanos = ? WHERE Id_Pago_Arrendamiento = ?",
    [nuevoEstado, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el estado ", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json({ message: "Estado actualizado exitosamente" });
      }
    }
  );
});
//Actualizar Estado Historial Arrendamiento
router.put("/Vempleados/:id", (req, res) => {
  const id = req.params.id;
  const nuevoEstado = req.body.estado;

  // Verificar si el estado es 'true' o 'false'
  if (nuevoEstado !== "true" && nuevoEstado !== "false") {
    res.status(400).json({ error: 'El estado debe ser "true" o "false"' });
    return;
  }

  // Consulta SQL para actualizar el estado del inmueble
  connection.query(
    "UPDATE trabajador SET booleanos = ? WHERE idtrabajador = ?",
    [nuevoEstado, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el estado ", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json({ message: "Estado actualizado exitosamente" });
      }
    }
  );
});

module.exports = router;
