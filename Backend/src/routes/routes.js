// src/routes/routes.js

const express = require("express");
const router = express.Router();
const connection = require("../db");

//Metodos Get
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

router.get("/Vpropietarios", (req, res) => {
  const { Cedula, FechaIngresoMIN, FechaIngresoMAX } = req.query;
  try {
    let query = "SELECT * FROM propietario  WHERE 1 = 1 "; // Inicializa la consulta con una condición verdadera

    const queryParams = []; // Almacena los valores de los parámetros

    if (FechaIngresoMAX) {
      query += " AND FechaIngreso <= ?";
      queryParams.push(FechaIngresoMAX);
    }
    if (Cedula) {
      query += " AND DocumentoIdentidad = ?";
      queryParams.push(Cedula);
    }

    if (FechaIngresoMIN) {
      query += " AND FechaIngreso >= ?";
      queryParams.push(FechaIngresoMIN);
    }

    query += "ORDER BY IdPropietario ASC";
    connection.query(
      query,
      queryParams,

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
    res(error);
  }
});

router.get("/Varrendatario", (req, res) => {
  const { Cedula, Estado } = req.query;
  try {
    let query = "SELECT * FROM arrendatario  WHERE 1 = 1 "; // Inicializa la consulta con una condición verdadera

    const queryParams = []; // Almacena los valores de los parámetros

    if (Cedula) {
      query += " AND DocumentoIdentidad = ?";
      queryParams.push(Cedula);
    }

    if (Estado) {
      query += " AND Estado = ?";
      queryParams.push(Estado);
    }

    query += "ORDER BY IdArrendatario ASC";
    connection.query(
      query,
      queryParams,

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
    res(error);
  }
});

router.get("/Vinmueble", (req, res) => {
  const { tipo, estrato, estado } = req.query;

  try {
    let query = "SELECT * FROM inmueble WHERE 1 = 1 "; // Inicializa la consulta con una condición verdadera

    const queryParams = []; // Almacena los valores de los parámetros

    if (estado) {
      query += " AND Estado = ?";
      queryParams.push(estado);
    }
    if (tipo) {
      query += " AND Tipo = ?";
      queryParams.push(tipo);
    }

    if (estrato) {
      query += " AND Estrato = ?";
      queryParams.push(estrato);
    }

    query += "ORDER BY IdInmueble ASC";

    connection.query(
      query,
      queryParams,

      (error, results) => {
        if (error) {
          console.error("Error al obtener datos de la base de datos:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          res.status(200).json(results);
        }
      }
    );
  } catch (error) {}
});
//traer propietarios con el id del inmueble
router.get("/propietarios-inmuebles", (req, res) => {
  try {
    const query = `
      SELECT 
        p.*, 
        i.IdInmueble,
        i.Direccion AS DireccionInmueble,
        i.Ciudad,
        i.Barrio,
        i.Tipo AS TipoInmueble
      FROM 
        propietario p
      LEFT JOIN 
        inmueble i ON p.IdPropietario = i.IdPropietario
      ORDER BY 
        p.IdPropietario ASC`;
    
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al obtener datos de la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
//traer Arrendatarios con id del codeudor:
router.get("/arrendatarios-codeudores", (req, res) => {
  try {
    const query = `
      SELECT 
        a.IdArrendatario,
        c.IdCodeudor,
        a.NombreCompleto AS NombreArrendatario,
        c.NombreCompleto AS NombreCodeudor,
        a.TipoDocumento AS TipoDocumentoArrendatario,
        c.TipoDocumento AS TipoDocumentoCodeudor,
        a.DocumentoIdentidad AS DocumentoIdentidadArrendatario,
        c.DocumentoIdentidad AS DocumentoIdentidadCodeudor,
        a.Telefono AS TelefonoArrendatario,
        c.Telefono AS TelefonoCodeudor,
        a.Correo AS CorreoArrendatario,
        c.Correo AS CorreoCodeudor,
        a.Estado,
        a.booleanos
      FROM 
        arrendatario a
      LEFT JOIN 
        codeudor c ON a.IdCodeudor = c.IdCodeudor
      ORDER BY 
        a.IdArrendatario ASC`;
    
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al obtener datos de la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/VinmuArren", (req, res) => {
  const { IdInmueble } = req.query;

  connection.query(
    "SELECT * FROM inmueble INNER JOIN arrendatario USING(IdArrendatario) WHERE IdInmueble = ?",
    [IdInmueble],
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
  const { Cedula } = req.query;
  try {
    let query = "SELECT * FROM codeudor  WHERE 1 = 1 "; // Inicializa la consulta con una condición verdadera

    const queryParams = []; // Almacena los valores de los parámetros

    if (Cedula) {
      query += " AND DocumentoIdentidad = ?";
      queryParams.push(Cedula);
    }

    query += "ORDER BY IdCodeudor ASC";
    connection.query(
      query,
      queryParams,

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
    res(error);
  }
});

router.get("/VPagoArren", (req, res) => {
  const { FechaPagoIni, FechaPagoFin, FormaPago, estado } = req.query;

  try {
    let query = "SELECT * FROM pagos_arrendamiento WHERE 1 = 1 "; // Inicializa la consulta con una condición verdadera

    const queryParams = []; // Almacena los valores de los parámetros

    if (FechaPagoIni) {
      query += " AND FechaPago >= ?";
      queryParams.push(FechaPagoIni);
    }
    if (FechaPagoFin) {
      query += " AND FechaPago <= ?";
      queryParams.push(FechaPagoFin);
    }

    if (estado) {
      query += " AND Estado = ?";
      queryParams.push(estado);
    }
    if (FormaPago) {
      query += " AND FormaPago = ?";
      queryParams.push(FormaPago);
    }

    query += "ORDER BY IdPagoArrendamiento ASC";

    connection.query(
      query,
      queryParams,

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
    res(error);
  }
});

router.get("/VComisionPropie", (req, res) => {
  connection.query(
    "SELECT * FROM comision_propietario INNER JOIN propietario USING(IdPropietario)",
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

//Metodos Post

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
    numerocuenta,
    fechaingreso,
    TipoDocumento,
  } = req.body;

  try {
    connection.query(
      "INSERT INTO propietario (NombreCompleto, TipoDocumento, DocumentoIdentidad, Direccion,  Correo, Banco, TipoCuenta, Telefono, NumeroCuenta, FechaIngreso) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?,?)",
      [
        nombrepropietario,
        TipoDocumento,
        numerodocumento,
        direccion,
        correoelectronico,
        banco,
        tipocuenta,
        telefono,
        numerocuenta,
        fechaingreso,
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
    Id_Propietario,
  } = req.body;

  try {
    if (Tipo == "Bodega") {
      connection.query(
        "INSERT INTO inmueble (NoMatricula,Direccion, Estrato, Ciudad, Barrio, Tipo, NoBanos, ServiciosPublicos, Aseguramiento, Descripcion, ValorInmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        "INSERT INTO inmueble (NoMatricula, Direccion, Estrato, Ciudad, Barrio, Tipo, NoBanos, ServiciosPublicos, Aseguramiento, Descripcion, ValorInmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        "INSERT INTO inmueble (NoMatricula, IdPropietario,Direccion, Estrato, Ciudad, Barrio, Tipo, NoHabitaciones, NoNiveles, NoTerraza, NoBanos, ServiciosPublicos, Aseguramiento, Descripcion, ValorInmueble, Estado) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
        [
          Nmatricula,
          Id_Propietario,
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
        "INSERT INTO inmueble (NoMatricula, Direccion, Estrato, Ciudad, Barrio, Tipo, NoBanos, ServiciosPublicos, Aseguramiento, Descripcion, ValorInmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        "INSERT INTO inmueble (NoMatricula, Direccion, Estrato, Ciudad, Barrio, Tipo, NoBanos, NoHabitaciones, ServiciosPublicos, Aseguramiento, Descripcion, ValorInmueble, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

// Ruta para la creación de un nuevo codeudor
router.post("/Rcodeudor", async (req, res) => {
  const {
    nombrecompleto,
    documentoidentidad,
    telefono,
    correoelectronico,
    direccion,
  } = req.body;

  try {
    await connection.query(
      "INSERT INTO codeudor (NombreCompleto, DocumentoIdentidad, Telefono, Correo, Direccion) VALUES (?, ?, ?, ?, ?)",
      [
        nombrecompleto,
        documentoidentidad,
        telefono,
        correoelectronico,
        direccion,
      ]
    );
    res.status(200).json({ message: "Codeudor registrado correctamente" });
  } catch (error) {
    console.error("Error al añadir codeudor:", error);
    res.status(500).json({ error: "Error al añadir codeudor" });
  }
});

/*
  Funcion para logear
  */
router.post("/Login_user", (req, res) => {
  const { correousuario, contrausuario } = req.body; // Datos del formulario

  // Consulta SQL para buscar un usuario con el correo electrónico proporcionado y Boolenos en 'true'
  const sql = `SELECT * FROM trabajador WHERE Correo = ? AND Booleanos = 'true'`;

  connection.query(sql, [correousuario], (error, results) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
      res.status(500).json({ message: "Error del servidor" });
    } else {
      if (results.length > 0) {
        const user = results[0];
        // Verifica si la contraseña coincide
        if (user.Contrasena === contrausuario) {
          // Las credenciales son válidas
          res.status(200).json({ message: "Inicio de sesión exitoso" });
        } else {
          // La contraseña es incorrecta
          res.status(401).json({ message: "Contraseña incorrecta" });
        }
      } else {
        // No se encontró un usuario con el correo electrónico proporcionado o Boolenos en 'false'
        res.status(404).json({
          message: "Usuario no encontrado o no autorizado para iniciar sesión",
        });
      }
    }
  });
});

// Registrar Usuario
router.post("/RegistrarUsuario", async (req, res) => {
  const { nombre, apellido, correo, contrasena, telefono } = req.body;

  // Validación básica de entrada
  if (!nombre || !apellido || !correo || !contrasena || !telefono) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el correo electrónico ya existe en la base de datos
    const existingUser = await connection.query(
      "SELECT * FROM trabajador WHERE correo = ?",
      [correo]
    );

    if (existingUser.length > 0) {
      // Si se encuentra un usuario con el mismo correo electrónico, responder con un error
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está en uso" });
    }

    // Insertar usuario en la base de datos
    await connection.query(
      "INSERT INTO trabajador (nombre, apellido, correo, contrasena, telefono) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, correo, contrasena, telefono]
    );

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    if (error.code === "ERDUPENTRY") {
      return res
        .status(409)
        .json({ message: "Ya existe un usuario con ese correo electrónico" });
    }

    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

// Ruta para registrar un arrendatario
router.post("/Rarrendatario", async (req, res) => {
  const {
    tipodocumento,
    numerodocumento,
    nombrearrendatario,
    telefono,
    correo,
    estado = "Libre",
  } = req.body;

  try {
    connection.query(
      "INSERT INTO arrendatario (NombreCompleto, TipoDocumento, DocumentoIdentidad, Telefono,  Correo, Estado) VALUES (?, ?, ?, ?, ?, ?)",
      [
        nombrearrendatario,
        tipodocumento,
        numerodocumento,
        telefono,        
        correo,
        estado
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
// Ruta para registrar un contratoarrendatario
router.post("/RConArrendamiento", async (req, res) => {
  const {
    IdArrendatario,
    fechainicio,
    fechafinal,
    valordeposito,
    estadocontrato = "vigente",
  } = req.body;

  try {
    connection.query(
      "INSERT INTO contratoarrendamiento (IdArrendatario, FechaInicioContrato, FechaFinContrato, ValorDeporito) VALUES (?, ?, ?, ?)",
      [
    IdArrendatario,
    fechainicio,
    fechafinal,
    valordeposito,
    estadocontrato,
      ],
      (error, results) => {
        if (error) {
          console.error("Error al añadir arrendatario:", error);
          res.status(500).json({ error: "Error al añadir contrato" });
        } else {
          console.log("arrendatario agregado:", results);
          res
            .status(201)
            .json({ message: "contrato registrado exitosamente" });
        }
      }
    );
  } catch (error) {
    console.error("Error al añadir propietario:", error);
    res.status(500).json({ error: "Error al añadir propietario" });
  }
});

    //Registro de Comision de gastos
router.post("/RComision", async (req, res) => {
  const {
    IdPropietario,
    FechaPago,
    ElaboradoPor,
    FormaPago,
    Observaciones,
  } = req.body;

  try {
    connection.query(
      "INSERT INTO comision_propietario (IdPropietario, PeriodoPagado, ElaboradoPor, FormaPago, Observaciones) VALUES (?, ?, ?, ?,?)",
      [
    IdPropietario,
    FechaPago,
    ElaboradoPor,
    FormaPago,
    Observaciones,
      ],
      (error, results) => {
        if (error) {
          console.error("Error al añadir arrendatario:", error);
          res.status(500).json({ error: "Error al añadir La comision" });
        } else {
          console.log("arrendatario agregado:", results);
          res
            .status(201)
            .json({ message: "contrato registrado exitosamente" });
        }
      }
    );
  } catch (error) {
    console.error("Error al añadir propietario:", error);
    res.status(500).json({ error: "Error al añadir propietario" });
  }
});

//Metodos Put

// Ruta para actualizar un arrendatario existente
router.put("/Rarrendatarios/:id", async (req, res) => {
  const { id } = req.params;
  const {
    tipodocumento,
    numerodocumento,
    nombrearrendatario,
    telefono,
    correo,
    estadocontrato,
  } = req.body;

  try {
    const updates = [];
    if (tipodocumento) updates.push("TipoDocumento = ?");
    if (numerodocumento) updates.push("DocumentoIdentidad = ?");
    if (nombrearrendatario) updates.push("NombreCompleto = ?");
    if (telefono) updates.push("Telefono = ?");
    if (correo) updates.push("Correo = ?");
    if (estadocontrato) updates.push("Estado = ?");

    if (updates.length === 0) {
      return res.status(400).json({ error: "Nada que actualizar" });
    }

    const sql = `UPDATE arrendatario SET ${updates.join(
      ", "
    )} WHERE IdArrendatario = ?`;

    connection.query(
      sql,
      [...updates.map((val) => req.body[val.split(" ")[0]]), id],
      (error, results) => {
        if (error) {
          console.error("Error al actualizar arrendatario:", error);
          res.status(500).json({ error: "Error al actualizar arrendatario" });
        } else {
          console.log("Arrendatario actualizado exitosamente");
          res
            .status(200)
            .json({ message: "Arrendatario actualizado exitosamente" });
        }
      }
    );
  } catch (error) {
    console.error("Error al actualizar arrendatario:", error);
    res.status(500).json({ error: "Error al actualizar arrendatario" });
  }
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
    "UPDATE codeudor SET booleanos = ? WHERE IdCodeudor = ?",
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

// Ruta para la actualización de un codeudor existente
router.put("/Rcodeudor/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const {
      NombreCompleto,
      TipoDocumento,
      DocumentoIdentidad,
      Telefono,
      Correo,
      Direccion,
    } = req.body;
    const updatedFields = {
      NombreCompleto: NombreCompleto,
      TipoDocumento: TipoDocumento,
      DocumentoIdentidad: DocumentoIdentidad,
      Telefono: Telefono,
      Correo: Correo,
      Direccion: Direccion,
    };

    // Verificar si se proporcionaron campos para actualizar
    if (Object.keys(updatedFields).length === 0) {
      return res
        .status(400)
        .json({ error: "No se proporcionaron campos para actualizar" });
    }

    const updateQuery = "UPDATE codeudor SET ? WHERE IdCodeudor = ?";
    await connection.query(updateQuery, [updatedFields, id]);

    res.status(200).json({ message: "Codeudor actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar codeudor:", error);
    res.status(500).json({ error: "Error al actualizar codeudor" });
  }
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
    "UPDATE arrendatario SET booleanos = ? WHERE IdArrendatario = ?",
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
    "UPDATE propietario SET booleanos = ? WHERE IdPropietario = ?",
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
    "UPDATE inmueble SET booleanos = ? WHERE IdInmueble = ?",
    [nuevoEstado, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el estado del inmueble:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res
          .status(200)
          .json({ message: "Estado del inmueble actualizado exitosamente" });
      }
    }
  );
});
//Aactualizar inmueble
router.put("/actualizarInmueble", (req, res) => {
  const { IdInmueble } = req.query; // Datos del formulario
  const { IdArrendatario, Estado } = req.body; // Datos del formulario
  const sql = `UPDATE inmueble SET IdArrendatario = ?, Estado = ?  WHERE IdInmueble = ?`;

  connection.query(
    sql,
    [IdArrendatario, Estado, IdInmueble],
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
//Ruta actualizar rol empleado
const fields = [
  "Nombre",
  "Apellido",
  "DocumentoIdentidad",
  "Correo",
  "Contrasena",
  "Telefono",
  "Idrol",
];

router.put("/empleados/:id", (req, res) => {
  const id = req.params.id; // ID del empleado a actualizar

  // Construimos el array de valores a actualizar
  const updateValues = [];
  const updateFields = [];

  fields.forEach((field) => {
    if (req.body[field]) {
      updateValues.push(req.body[field]);
      updateFields.push(`${field} = ?`);
    }
  });

  // Si no hay campos para actualizar, respondemos con un error
  if (updateValues.length === 0) {
    return res
      .status(400)
      .json({ error: "No se han proporcionado campos para actualizar" });
  }

  // Realiza la actualización en la base de datos
  connection.query(
    `UPDATE trabajador SET ${updateFields.join(", ")} WHERE IdTrabajador = ?`,
    [...updateValues, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el empleado:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json({ message: "Empleado actualizado exitosamente" });
      }
    }
  );
});

// Ruta para actualizar un propietario existente
router.put("/RPropietario/:id", async (req, res) => {
  const { id } = req.params;
  const {
    numerodocumento,
    nombrepropietario,
    telefono,
    correoelectronico,
    tipocuenta,
    banco,
    direccion,
    numerocuenta,
    fechaingreso,
    TipoDocumento,
  } = req.body;

  try {
    const updates = [];
    const values = [];

    if (nombrepropietario) {
      updates.push("NombreCompleto = ?");
      values.push(nombrepropietario);
    }
    if (TipoDocumento) {
      updates.push("TipoDocumento = ?");
      values.push(TipoDocumento);
    }
    if (numerodocumento) {
      updates.push("DocumentoIdentidad = ?");
      values.push(numerodocumento);
    }
    if (direccion) {
      updates.push("Direccion = ?");
      values.push(direccion);
    }
    if (correoelectronico) {
      updates.push("Correo = ?");
      values.push(correoelectronico);
    }
    if (banco) {
      updates.push("Banco = ?");
      values.push(banco);
    }
    if (tipocuenta !== undefined) {
      updates.push("TipoCuenta = ?");
      values.push(tipocuenta);
    }
    if (numerocuenta !== undefined && numerocuenta !== '') {
      updates.push("NumeroCuenta = ?");
      values.push(numerocuenta);
    }
    
    if (telefono) {
      updates.push("Telefono = ?");
      values.push(telefono);
    }
    if (fechaingreso) {
      updates.push("FechaIngreso = ?");
      values.push(fechaingreso);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "Nada que actualizar" });
    }

    values.push(id); // Agregamos el id al final de los valores

    const sql = `UPDATE propietario SET ${updates.join(", ")} WHERE IdPropietario = ?`;

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error al actualizar propietario:", error);
        res.status(500).json({ error: "Error al actualizar propietario" });
      } else {
        console.log("Propietario actualizado exitosamente");
        res.status(200).json({ message: "Propietario actualizado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar propietario:", error);
    res.status(500).json({ error: "Error al actualizar propietario" });
  }
});


module.exports = router;
