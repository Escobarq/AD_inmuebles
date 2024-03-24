// src/routes/routes.js
const express = require("express");
const router = express.Router();
const { configureDatabase, getConnection } = require('../db'); // Importar la función configureDatabase y getConnection desde db.js

//Configurando Servidor
router.post('/api/config', async (req, res) => {
  const { host, user, password, database } = req.body;

  try {
    // Configurar la conexión a la base de datos
    configureDatabase({ host, user, password, database });

    console.log('Configuración de conexión actualizada correctamente');
    res.status(200).json({ message: 'Conexión actualizada con éxito' });
  } catch (error) {
    console.error('Error al configurar la conexión a la base de datos:', error);
    res.status(500).json({ message: 'Error al configurar la conexión a la base de datos' });
  }
});


//Funcion para traer su información

router.get('/fechas', (req, res) => {
  const connection = getConnection(); // Obtiene la conexión a la base de datos
  try {
    const query = `
      SELECT inmueble.VAseguramiento AS fechaAseguramiento, NULL AS fechaFinContrato
      FROM inmueble
      UNION ALL
      SELECT NULL AS fechaAseguramiento, contratoarrendamiento.FechaFinContrato AS fechaFinContrato
      FROM contratoarrendamiento
    `;
    
    // Ejecutar la consulta y esperar los resultados
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      // Enviar las fechas al cliente
      res.json(results);
    });
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


router.get("/Infouser", (req, res) => {
  const { correousuario } = req.query;
  const connection = getConnection(); 

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
  const connection = getConnection(); 
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
  const connection = getConnection(); 
  const { Cedula, Estado } = req.query;
  try {
    let query = ` SELECT 
    arrendatario.*,
    codeudor.NombreCompleto AS NombreCodeudor
FROM arrendatario
JOIN codeudor ON arrendatario.IdCodeudor = codeudor.IdCodeudor `; // Inicializa la consulta con una condición verdadera

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
  const connection = getConnection(); 
  const { tipo, estrato, estado, IdPropietario } = req.query;

  try {
    let query = "SELECT  i.*, p.NombreCompleto AS NombrePropietario  FROM propietario p LEFT JOIN inmueble i ON p.IdPropietario = i.IdPropietario WHERE 1 = 1 "; // Inicializa la consulta con una condición verdadera

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
    if (IdPropietario) {
      query += " AND i.IdPropietario = ?";
      queryParams.push(IdPropietario);
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

router.get("/propietarios-inmuebles", (req, res) => {
  const connection = getConnection(); 
  try {
    const query = `
    SELECT 
    p.*, 
    i.IdInmueble,
    i.Direccion AS DireccionInmueble,
    i.Ciudad,
    i.Barrio,
    i.Tipo AS TipoInmueble,
    i.NoMatricula
FROM 
    propietario p
LEFT JOIN 
    inmueble i ON p.IdPropietario = i.IdPropietario
WHERE 
    i.IdInmueble IS NOT NULL
    AND i.Direccion IS NOT NULL
    AND i.Ciudad IS NOT NULL
    AND i.Barrio IS NOT NULL
    AND i.Tipo IS NOT NULL
    AND i.NoMatricula IS NOT NULL
    AND i.Estado <> 'Ocupado'
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

router.get("/propietarios-inmuebles/:idInmueble", (req, res) => {
  const connection = getConnection(); 
  try {
    const { idInmueble } = req.params;
    const query = `
      SELECT 
        p.*, 
        i.IdInmueble,
        i.Direccion AS DireccionInmueble,
        i.Ciudad,
        i.Barrio,
        i.Tipo AS TipoInmueble,
        i.NoMatricula
      FROM 
        propietario p
      LEFT JOIN 
        inmueble i ON p.IdPropietario = i.IdPropietario
      WHERE
        i.NoMatricula = ?
      ORDER BY 
        p.IdPropietario ASC`;

    connection.query(query, [idInmueble], (error, results) => {
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
  const connection = getConnection(); 
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
WHERE
    a.Estado = 'Libre'
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
  const connection = getConnection(); 
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
  const connection = getConnection(); 
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
  const connection = getConnection(); 
  const { FechaPagoIni, IdContrato, FechaPagoFin, FormaPago, estado } = req.query;

  try {
    let query = "SELECT * FROM pagos_arrendamiento WHERE 1 = 1 "; // Inicializa la consulta con una condición verdadera

    const queryParams = []; // Almacena los valores de los parámetros

    if (FechaPagoIni) {
      query += " AND FechaPago >= ?";
      queryParams.push(FechaPagoIni);
    }
    if (IdContrato) {
      query += " AND IdContrato = ?";
      queryParams.push(IdContrato);
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
  const connection = getConnection(); 
  const{Propietario, FechaElaboracionMin, FechaElaboracionMax,FormaPago} =req.query


  try {
    let query = "SELECT * FROM comision_propietario INNER JOIN propietario USING(IdPropietario) WHERE 1 = 1 "; // Inicializa la consulta con una condición verdadera

    const queryParams = []; // Almacena los valores de los parámetros

    if (Propietario) {
      query += " AND IdPropietario = ?";
      queryParams.push(Propietario);
    }
    if (FechaElaboracionMin) {
      query += " AND FechaElaboracion >= ?";
      queryParams.push(FechaElaboracionMin);
    }

    if (FechaElaboracionMax) {
      query += " AND FechaElaboracion <= ?";
      queryParams.push(FechaElaboracionMax);
    }
    if (FormaPago) {
      query += " AND FormaPago = ?";
      queryParams.push(FormaPago);
    }

    query += "ORDER BY IdComisionPropietario ASC";

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

router.get("/contratoFiltro", (req, res) => {
  const connection = getConnection(); 
  // Obtén los parámetros de consulta
  const { FechaFinMIN, FechaFinMAX, NContrato, Estado } = req.query;
  // Construye la consulta SQL base
  let query = `
    SELECT 
      contratoarrendamiento.*,
      arrendatario.DocumentoIdentidad,
      arrendatario.Nombrecompleto AS NombreArrendatario,
      inmueble.NoMatricula
    FROM contratoarrendamiento
    JOIN arrendatario ON contratoarrendamiento.IdArrendatario = arrendatario.IdArrendatario
    JOIN inmueble ON contratoarrendamiento.idInmueble = inmueble.IdInmueble
  `;

  // Construye la parte de la consulta para aplicar los filtros
  const filtroConditions = [];

  if (FechaFinMIN) {
    filtroConditions.push(
      `contratoarrendamiento.FechaFinContrato >= '${FechaFinMIN}'`
    );
  }

  if (FechaFinMAX) {
    filtroConditions.push(
      `contratoarrendamiento.FechaFinContrato <= '${FechaFinMAX}'`
    );
  }

  if (NContrato) {
    filtroConditions.push(`contratoarrendamiento.IdContrato = '${NContrato}'`);
  }

  if (Estado) {
    filtroConditions.push(`contratoarrendamiento.EstadoContrato = '${Estado}'`);
  }

  // Agrega los filtros a la consulta si hay alguno
  if (filtroConditions.length > 0) {
    query += " WHERE " + filtroConditions.join(" AND ");
  }
  query += " ORDER BY contratoarrendamiento.IdContrato";

  // Ejecuta la consulta SQL
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta:", error);
      res.status(500).send("Error interno del servidor");
    } else {      
      res.json(results);
    }
  });
});

router.get("/contrato-arren-inmue", (req, res) => {
  const connection = getConnection(); 
  const query = `
  SELECT 
  contratoarrendamiento.IdContrato,
  contratoarrendamiento.EstadoContrato,
  contratoarrendamiento.ValorDeposito,
  arrendatario.IdArrendatario,
  arrendatario.DocumentoIdentidad,
  arrendatario.Nombrecompleto AS NombreArrendatario,
  inmueble.IdInmueble,
  inmueble.NoMatricula,
  inmueble.Tipo AS TipoInmueble,
  inmueble.ValorInmueble AS ValorPago
FROM contratoarrendamiento
JOIN arrendatario ON contratoarrendamiento.IdArrendatario = arrendatario.IdArrendatario
JOIN inmueble ON contratoarrendamiento.idInmueble = inmueble.IdInmueble
WHERE contratoarrendamiento.EstadoContrato = 'Vigente', contratoarrendamiento.;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      res.json(results);
    }
  });
});

//Funcion para traer su información
router.get("/Infouser", (req, res) => {
  const connection = getConnection(); 
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
  const connection = getConnection(); 
  const { VRol, } = req.query;

  
  try {
    let query = "SELECT * FROM trabajador  WHERE 1 = 1 "; // Inicializa la consulta con una condición verdadera

    const queryParams = []; // Almacena los valores de los parámetros

    if (VRol) {
      query += " AND Idrol = ?";
      queryParams.push(VRol);
    }

    query += "ORDER BY IdTrabajador ASC";
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

//Metodos Post
// Ruta para manejar la solicitud de creación de un nuevo contrato de arrendamiento
router.post("/contratoarrendamiento", (req, res) => {
  const connection = getConnection(); 
  const {
    IdArrendatario,
    IdInmueble,
    FechaInicioContrato,
    FechaFinContrato,
    FechaPagoFija,
    EstadoContrato,
    ValorDeposito,
  } = req.body;

  const contrato = {
    IdArrendatario,
    IdInmueble,
    FechaInicioContrato,
    FechaFinContrato,
    FechaPagoFija,
    EstadoContrato,
    ValorDeposito,
  };

  const sql = "INSERT INTO contratoarrendamiento SET ?";

  connection.query(sql, contrato, (err, result) => {
    if (err) {
      console.error("Error al insertar el nuevo contrato:", err);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }
    console.log("Nuevo contrato insertado correctamente");
    res.status(201).json({
      message: "Contrato de arrendamiento creado correctamente",
      contratoId: result.insertId,
    });
  });
});

// Ruta para registrar un propietario
router.post("/RPropietario", async (req, res) => {
  const connection = getConnection(); 
  const {
    NombreCompleto,
    TipoDocumento,
    DocumentoIdentidad,
    Telefono,
    Correo,
    TipoCuenta,
    NumeroCuenta,
    FechaIngreso,
    direccion,
    Banco,
  } = req.body;

  try {
    connection.query(
      "INSERT INTO propietario (NombreCompleto, TipoDocumento, DocumentoIdentidad, Direccion, Correo, Banco, TipoCuenta, Telefono, NumeroCuenta, FechaIngreso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        NombreCompleto,
        TipoDocumento,
        DocumentoIdentidad,
        direccion,
        Correo,
        Banco,
        TipoCuenta,
        Telefono,
        NumeroCuenta,
        FechaIngreso,
      ],
      (error, results) => {
        if (error) {
          console.error("Error al añadir propietario:", error);
          res.status(500).json({ error: "Error al añadir propietario" });
          console.log(FechaIngreso, "aaaaaaaaaaa");
        } else {
          console.log("Propietario agregado:", results);
          res
            .status(201)
            .json({ message: "Propietario registrado exitosamente" });
        }
      }
    );
  } catch (error) {
    console.error("Error al añadir propietario:", error,);
    res.status(500).json({ error: "Error al añadir propietario" });
  }
});
// Ruta para cambiar la contraseña del trabajador y actualizar otros datos
router.post("/api/changePassword", (req, res) => {
  const connection = getConnection(); 
  const { correo, newPassword, nombre, apellido } = req.body;

  // Consulta SQL para buscar el trabajador por su correo electrónico y actualizar sus datos
  const sql = `UPDATE trabajador SET Contrasena = ?, Nombre = ?, Apellido = ? WHERE Correo = ?`;

  // Ejecutar la consulta SQL
  connection.query(sql, [newPassword, nombre, apellido, correo], (err, result) => {
    if (err) {
      console.error("Error al cambiar la contraseña:", err);
      res.status(500).json({ error: "Error al cambiar la contraseña" });
    } else {
      console.log("Datos actualizados exitosamente");
      res.status(200).json({ message: "Datos actualizados exitosamente" });
    }
  });
});

// Ruta para registrar un Inmueble
router.post("/Reinmueble", async (req, res) => {
  const connection = getConnection(); 
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
    vaseguramiento,
    Id_Propietario,
  } = req.body;

  try {

    connection.query("SELECT * FROM inmueble WHERE NoMatricula = ?",
    [Nmatricula], (error, results) => {
      if (results == "") {
      if (Tipo == "Bodega") {
        connection.query(
          "INSERT INTO inmueble (NoMatricula, IdPropietario,Direccion, Estrato, Ciudad, Barrio, Tipo, NoBanos, ServiciosPublicos, Aseguramiento, VAseguramiento, Descripcion, ValorInmueble, Estado, AreaConstruidaM2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            Nmatricula,
            Id_Propietario,
            Direccion,
            Estrato,
            Ciudad,
            Barrio,
            Tipo,
            Nbanos,
            Spublicos,
            aseguramiento,
            vaseguramiento,
            Descripcion,
            ValorIn,
            Estado,
            AreaM,
          ]
        );
      } else if (Tipo == "Casa") {
        connection.query(
          "INSERT INTO inmueble (NoMatricula, IdPropietario, Direccion, Estrato, Ciudad, Barrio, Tipo, NoBanos, ServiciosPublicos, Aseguramiento, VAseguramiento, Descripcion, ValorInmueble, Estado, AreaConstruidaM2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            Nmatricula,
            Id_Propietario,
            Direccion,
            Estrato,
            Ciudad,
            Barrio,
            Tipo,
            Nbanos,
            Spublicos,
            aseguramiento,
            vaseguramiento,
            Descripcion,
            ValorIn,
            Estado,
            AreaM,
          ]
        );
      } else if (Tipo == "Apartamento") {
        connection.query(
          "INSERT INTO inmueble (NoMatricula, IdPropietario,Direccion, Estrato, Ciudad, Barrio, Tipo, NoHabitaciones, NoNiveles, NoTerraza, NoBanos, ServiciosPublicos, Aseguramiento, VAseguramiento, Descripcion, ValorInmueble, Estado) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)",
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
            vaseguramiento,
            Descripcion,
            ValorIn,
            Estado,
          ]
        );
      } else if (Tipo == "Oficina") {
        connection.query(
          "INSERT INTO inmueble (NoMatricula, IdPropietario, Direccion, Estrato, Ciudad, Barrio, Tipo, NoBanos, ServiciosPublicos, Aseguramiento, VAseguramiento, Descripcion, ValorInmueble, Estado, AreaConstruidaM2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            Nmatricula,
            Id_Propietario,
            Direccion,
            Estrato,
            Ciudad,
            Barrio,
            Tipo,
            Nbanos,
            Spublicos,
            aseguramiento,
            vaseguramiento,
            Descripcion,
            ValorIn,
            Estado,
            AreaM,
          ]
        );
      } else if (Tipo == "Local") {
        connection.query(
          "INSERT INTO inmueble (NoMatricula, IdPropietario, Direccion, Estrato, Ciudad, Barrio, Tipo, NoBanos, NoHabitaciones, ServiciosPublicos, Aseguramiento, VAseguramiento, Descripcion, ValorInmueble, Estado, AreaConstruidaM2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            Nmatricula,
            Id_Propietario,
            Direccion,
            Estrato,
            Ciudad,
            Barrio,
            Tipo,
            Nbanos,
            NoHabita,
            Spublicos,
            aseguramiento,
            vaseguramiento,
            Descripcion,
            ValorIn,
            Estado,
            AreaM,
          ]
        );
      }
      res.status(201).json({ message: "Inmueble Registrado exitosamente" });
      } else {
        res.status(400).json({ error: "Numero de Matricula duplicado" }); 
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error al Registrar inmueble" });
  }
});


// Ruta para la creación de un nuevo codeudor
router.post("/Rcodeudor", async (req, res) => {
  const connection = getConnection(); 
  const {
    NombreCompleto,
    TipoDocumento,
    DocumentoIdentidad,
    Telefono,
    Correo,
    Direccion,
  } = req.body;

  try {
    
    connection.query("SELECT * FROM codeudor WHERE DocumentoIdentidad = ?",
    [DocumentoIdentidad], (error, results) => {
      if (results == "") {
         connection.query(
          "INSERT INTO codeudor (NombreCompleto, TipoDocumento, DocumentoIdentidad, Telefono, Correo, Direccion) VALUES (?, ?, ?, ?, ?, ?)",
          [
            NombreCompleto,
            TipoDocumento,
            DocumentoIdentidad,
            Telefono,
            Correo,
            Direccion,
          ]
        );
        res.status(200).json({ message: "Codeudor registrado correctamente" });

      } else {
        res.status(400).json({ error: "Numero de Documento de codeudor duplicado" }); 
      }
    });
    
   
  } catch (error) {
    console.error("Error al añadir codeudor:", error);
    res.status(500).json({ error: "Error al añadir codeudor" });
  }
});

/*
  Funcion para logear
  */
  router.post("/Login_user", (req, res) => {
    const connection = getConnection(); 
    const { correousuario, contrausuario } = req.body; // Datos del formulario
  
    const sql = `SELECT * FROM trabajador WHERE Correo = ? AND Booleanos = 'true'`;
  
    connection.query(sql, [correousuario], (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        return res.status(500).json({ message: "Error del servidor" });
      }
  
      if (results.length > 0) {
        const user = results[0];
        if (user.Contrasena === contrausuario) {
          return res.status(200).json({ message: "Inicio de sesión exitoso" });
        } else {
          return res.status(401).json({ message: "Contraseña incorrecta" });
        }
      } else {
        return res.status(404).json({ message: "Usuario no encontrado o no autorizado para iniciar sesión" });
      }
    });
  });
  

// Registrar Usuario
router.post("/RegistrarUsuario", async (req, res) => {
  const connection = getConnection();
  const { nombre, apellido, correo, contrasena, telefono, rol } = req.body;

  // Validación básica de entrada
  if (!nombre || !apellido || !correo || !contrasena || !telefono || !rol) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    connection.query(
      "SELECT * FROM trabajador WHERE Correo = ?",
      [correo],
      (error, results) => {
        if (results.length === 0) {
          // Insertar el nuevo usuario en la base de datos
          connection.query(
            "INSERT INTO trabajador (nombre, apellido, correo, contrasena, telefono, Idrol) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, apellido, correo, contrasena, telefono, rol]
          );
          res.status(201).json({ message: "Usuario registrado exitosamente" });
        } else {
          res.status(400).json({ error: "Correo Duplicado" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});


// Ruta para registrar un arrendatario
router.post("/Rarrendatario", async (req, res) => {
  const connection = getConnection(); 
  const {
    IdCodeudor,
    TipoDocumento,
    DocumentoIdentidad,
    NombreCompleto,
    Telefono,
    Correo,
    Estado= "Libre",
  } = req.body;

  try {
    connection.query(
      "INSERT INTO arrendatario (NombreCompleto, IdCodeudor, TipoDocumento, DocumentoIdentidad, Telefono,  Correo, Estado) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        NombreCompleto,
        IdCodeudor,
        TipoDocumento,
        DocumentoIdentidad,
        Telefono,
        Correo,
        Estado,
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
  const connection = getConnection(); 
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
      [IdArrendatario, fechainicio, fechafinal, valordeposito, estadocontrato],
      (error, results) => {
        if (error) {
          console.error("Error al añadir arrendatario:", error);
          res.status(500).json({ error: "Error al añadir contrato" });
        } else {
          console.log("arrendatario agregado:", results);
          res.status(201).json({ message: "contrato registrado exitosamente" });
        }
      }
    );
  } catch (error) {
    console.error("Error al añadir propietario:", error);
    res.status(500).json({ error: "Error al añadir propietario" });
  }
});

// Ruta para registar Pago de Arrendamiento --------------------------------------------------



router.put("/RPagoArrendamiento", async (req, res) => {
  const connection = getConnection(); 
  const {
    IdPagosSeleccionados,
    FechaPago,
    ValorPago,
    FormaPago,
    Estado,
  } = req.body;

  try {
    // Itera sobre la lista de IDs y actualiza cada registro
    for (const id of IdPagosSeleccionados) {
      connection.query(
        "UPDATE pagos_arrendamiento SET FechaPago = ?, ValorPago = ?, FormaPago = ?, Estado = ? WHERE IdPagoArrendamiento = ?",
        [
          FechaPago, 
          ValorPago,
          FormaPago,
          Estado,
          id,
        ],
        (error, results) => {
          if (error) {
            console.error("Error al actualizar el pago de arrendamiento con ID:", id, error);
          } else {
            console.log("Pago de arrendamiento actualizado con ID:", id);
          }
        }
      );
    }

    // Envía una respuesta exitosa al finalizar la actualización
    res.status(200).json({ message: "Pagos de arrendamiento actualizados exitosamente" });
  } catch (error) {
    console.error("Error al añadir Pago Arrenmiento: ", error);
    res.status(500).json({ error: "Error al Pago Arrenmiento" });
  }
});

router.post("/RComision", async (req, res) => {
  const connection = getConnection(); 
  const {
    IdPropietario,
    IdInmueble,
    FechaPago,
    ElaboradoPor,
    FormaPago,
    PagoArriendo,
    AdminInmobiliaria,
    AseoEntrega,
    Mantenimiento,
    CuotaExtra,
    PagoRecibo,
    ValorTotal,
    Descripcion,
  } = req.body;

  try {
    // Validación de valores
    if (!IdPropietario || !IdInmueble || !FechaPago || !ElaboradoPor) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Valores predeterminados


    connection.query(
      "INSERT INTO comision_propietario (IdPropietario, IdInmueble, FechaElaboracion, ElaboradoPor, FormaPago, PagoArriendo, AdmInmobi, AseoEntrega, Mantenimiento, ValorTotal, CuotaExtra,PagoRecibos, Descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)",
      [
        IdPropietario,
        IdInmueble,
        FechaPago,
        ElaboradoPor,
        FormaPago,
        PagoArriendo,   
        AdminInmobiliaria,
        AseoEntrega,
        Mantenimiento,
        ValorTotal,
        CuotaExtra,
        PagoRecibo,
        Descripcion,
      ],
      (error, results) => {
        if (error) {
          console.error("Error al añadir la comisión:", error);
          res.status(500).json({ error: "Error al añadir la comisión" });
        } else {
          console.log("Comisión agregada:", results);
          res.status(201).json({ message: "Contrato registrado exitosamente" });
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
  const connection = getConnection(); 
  const { id } = req.params;
  const {
    NombreCompleto,
        TipoDocumento,
        DocumentoIdentidad,
        Telefono,
        Correo,
  } = req.body;
  try {


    const updatedFields = {};
    if (NombreCompleto){
      updatedFields["NombreCompleto"] = NombreCompleto;
    }
    if (TipoDocumento){
      updatedFields["TipoDocumento"] = TipoDocumento;
    }
    if (DocumentoIdentidad){
      updatedFields["DocumentoIdentidad"] = DocumentoIdentidad;
    }
    if (Telefono){
      updatedFields["Telefono"] = Telefono;
    }
    if (Correo){
      updatedFields["Correo"] = Correo;      
    }

    // Verificar si se proporcionaron campos para actualizar
    if (Object.keys(updatedFields).length === 0) {
      return res
        .status(400)
        .json({ error: "No se proporcionaron campos para actualizar" });
    }

    const updateQuery = "UPDATE arrendatario SET ? WHERE IdArrendatario = ?";
        
    await connection.query(updateQuery, [updatedFields, id], (error, results) => {
      if (error) {
        console.error("Error al actualizar arrendatario:", error);
        res.status(500).json({ error: "Error al actualizar arrendatario" });
      } else {
        console.log("Arrendatario actualizado exitosamente");
        res.status(200).json({ message: "Arrendatario actualizado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar arrendatario:", error);
    res.status(500).json({ error: "Error al actualizar arrendatario" });
  }
});



//actualizar Estado Codeudor
router.put("/Vcodeudor/:id", (req, res) => {
  const connection = getConnection(); 
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
  const connection = getConnection(); 
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
  const connection = getConnection(); 
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
  const connection = getConnection(); 
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
  const connection = getConnection(); 
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
  const connection = getConnection(); 
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
  const connection = getConnection(); 
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
  const connection = getConnection(); 
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

router.put("/RPropietario/:id", async (req, res) => {
  const connection = getConnection(); 
  const { id } = req.params;
  const {
    DocumentoIdentidad,
    NombreCompleto,
    Telefono,
    Correo,
    TipoCuenta,
    Banco,
    direccion,
    NumeroCuenta,
    TipoDocumento,
    FechaIngreso
  } = req.body;

  try {
    const updates = [];
    const values = [];

    // Definir el orden de los campos y valores
    const fieldOrder = [
      { field: "NombreCompleto", value: NombreCompleto },
      { field: "TipoDocumento", value: TipoDocumento },
      { field: "DocumentoIdentidad", value: DocumentoIdentidad },
      { field: "Direccion", value: direccion },
      { field: "Correo", value: Correo },
      { field: "Banco", value: Banco },
      { field: "TipoCuenta", value: TipoCuenta },
      { field: "NumeroCuenta", value: NumeroCuenta },
      { field: "Telefono", value: Telefono },
      { field: "FechaIngreso", value: FechaIngreso }
    ];

    // Construir la lista de actualizaciones y valores en el orden correcto
    fieldOrder.forEach(({ field, value }) => {
      if (value !== undefined && value !== "") {
        updates.push(`${field} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      return res.status(400).json({ error: "Nada que actualizar" });
    }

    values.push(Number(id)); // Convertir el id a número antes de agregarlo a values

    // Construir la consulta SQL con las actualizaciones en el orden correcto
    const sql = `UPDATE propietario SET ${updates.join(", ")} WHERE IdPropietario = ?`;

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error al actualizar propietario:", error);
        return res.status(500).json({ error: "Error al actualizar propietario" });
      } else {
        console.log("Propietario actualizado exitosamente");
        res
          .status(200)
          .json({ message: "Propietario actualizado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar propietario:", error);
    return res.status(500).json({ error: "Error al actualizar propietario" });
  }
});


// Ruta para actualizar un Inmueble
router.put("/Reinmueble/:id", async (req, res) => {
  const connection = getConnection(); 
  const IdInmueble = req.params.id;

  const {
    NoMatricula,
    Direccion,
    Ciudad,
    Barrio,
    Tipo,
    NoNiveles,
    ValorInmueble,
    Estrato,
    NoHabitaciones,
    Estado,
    NoTerraza,
    AreaConstruidaM2,
    Descripcion,
    NoBanos,
    ServiciosPublicos,
    Aseguramiento,
    Id_Propietario,
  } = req.body;

  try {
    // Construir el objeto de actualización
    const updateFields = {};
    if (NoMatricula) updateFields.NoMatricula = NoMatricula;
    if (Direccion) updateFields.Direccion = Direccion;
    if (Ciudad) updateFields.Ciudad = Ciudad;
    if (Barrio) updateFields.Barrio = Barrio;
    if (Tipo) updateFields.Tipo = Tipo;
    if (NoNiveles) updateFields.NoNiveles = NoNiveles;
    if (ValorInmueble) updateFields.ValorInmueble = ValorInmueble;
    if (Estrato) updateFields.Estrato = Estrato;
    if (NoHabitaciones) updateFields.NoHabitaciones = NoHabitaciones;
    if (Estado) updateFields.Estado = Estado;
    if (NoTerraza) updateFields.NoTerraza = NoTerraza;
    if (AreaConstruidaM2) updateFields.AreaConstruidaM2 = AreaConstruidaM2;
    if (Descripcion) updateFields.Descripcion = Descripcion;
    if (NoBanos) updateFields.NoBanos = NoBanos;
    if (ServiciosPublicos) updateFields.ServiciosPublicos = ServiciosPublicos;
    if (Aseguramiento) updateFields.Aseguramiento = Aseguramiento;
    if (Id_Propietario) updateFields.Id_Propietario = Id_Propietario;

    // Verificar si hay al menos un campo para actualizar
    const camposActualizar = Object.keys(updateFields);
    if (camposActualizar.length > 0) {
      // Hay campos para actualizar, proceder con la consulta de actualización
      await connection.query("UPDATE inmueble SET ? WHERE IdInmueble = ?", [
        updateFields,
        IdInmueble,
      ]);
      res.status(200).json({ message: "Inmueble actualizado exitosamente" });
    } else {
      // No hay campos para actualizar, enviar una respuesta con un mensaje de error
      res
        .status(400)
        .json({ error: "No se proporcionaron campos para actualizar" });
    }
  } catch (error) {
    console.error("Error al actualizar inmueble:", error);
    res.status(500).json({ error: "Error al actualizar inmueble" });
  }
});

module.exports = router;
