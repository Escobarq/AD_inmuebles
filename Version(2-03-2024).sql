-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla adminmuebles.arrendatario
CREATE TABLE IF NOT EXISTS `arrendatario` (
  `IdArrendatario` int NOT NULL AUTO_INCREMENT,
  `IdCodeudor` int unsigned DEFAULT NULL,
  `NombreCompleto` varchar(100) DEFAULT NULL,
  `TipoDocumento` varchar(50) DEFAULT NULL,
  `DocumentoIdentidad` int unsigned DEFAULT NULL,
  `Telefono` int unsigned DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `booleanos` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`IdArrendatario`) USING BTREE,
  KEY `Id_Codeudor` (`IdCodeudor`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.arrendatario: 3 rows
/*!40000 ALTER TABLE `arrendatario` DISABLE KEYS */;
INSERT INTO `arrendatario` (`IdArrendatario`, `IdCodeudor`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Telefono`, `Correo`, `Estado`, `booleanos`) VALUES
	(1, 1, 'Carlos López', 'CC', 111222333, 1112223334, 'carlos@gmail.com', 'Vigente', 'true'),
	(2, 2, 'Ana Rodríguez', 'CE', 444555666, 4294967295, 'ana@gmail.com', 'Vigente', 'true'),
	(21, NULL, 'HptsPorfin', 'CC', 1192, 4294967295, 'q@q.cos', 'Vigente', 'true'),
	(26, NULL, 'Juanda', 'CC', 1234567890, 1234567890, 'nose@gmail.com', 'Libre', 'true');
/*!40000 ALTER TABLE `arrendatario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.codeudor
CREATE TABLE IF NOT EXISTS `codeudor` (
  `IdCodeudor` int NOT NULL AUTO_INCREMENT,
  `NombreCompleto` varchar(100) DEFAULT NULL,
  `TipoDocumento` varchar(50) DEFAULT NULL,
  `DocumentoIdentidad` int unsigned DEFAULT NULL,
  `Telefono` int unsigned DEFAULT NULL,
  `Correo` varchar(250) DEFAULT NULL,
  `Direccion` varchar(150) DEFAULT NULL,
  `booleanos` varchar(10) DEFAULT 'true' COMMENT 'Datos booleanos si esta activo mostrar de lo contario no mostrar',
  PRIMARY KEY (`IdCodeudor`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.codeudor: 3 rows
/*!40000 ALTER TABLE `codeudor` DISABLE KEYS */;
INSERT INTO `codeudor` (`IdCodeudor`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Telefono`, `Correo`, `Direccion`, `booleanos`) VALUES
	(1, 'Pedro Ramíre', 'CC', 777888999, 4294967295, 'pedro@gmail.com', 'Calle 789', 'true'),
	(2, 'Laura Martínez', 'CC', 333444555, 3334445556, 'laura@gmail.com', 'Avenida 012', 'true'),
	(3, 'arenas', 'CE', 1123123, 12312312, 'xd@gmail', 'nose', 'false');
/*!40000 ALTER TABLE `codeudor` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.comision_propietario
CREATE TABLE IF NOT EXISTS `comision_propietario` (
  `IdComisionPropietario` int NOT NULL AUTO_INCREMENT,
  `IdPropietario` int unsigned DEFAULT NULL,
  `FechaElaboracion` date DEFAULT NULL,
  `PeriodoPagado` date DEFAULT NULL,
  `ElaboradoPor` varchar(100) DEFAULT NULL,
  `ValorArriendo` int unsigned DEFAULT NULL,
  `FormaPago` varchar(50) DEFAULT NULL,
  `Observaciones` varchar(500) DEFAULT NULL,
  `booleanos` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`IdComisionPropietario`) USING BTREE,
  KEY `Id_Propietario` (`IdPropietario`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.comision_propietario: 2 rows
/*!40000 ALTER TABLE `comision_propietario` DISABLE KEYS */;
INSERT INTO `comision_propietario` (`IdComisionPropietario`, `IdPropietario`, `FechaElaboracion`, `PeriodoPagado`, `ElaboradoPor`, `ValorArriendo`, `FormaPago`, `Observaciones`, `booleanos`) VALUES
	(2, 2, '2024-03-01', '2024-03-01', 'Usuario Y', 2000000, 'Efectivo', 'Pendiente de pago', 'true'),
	(1, 1, '2024-03-01', '2024-03-01', 'Usuario X', 1500000, 'Transferencia', 'Pago recibido', 'true');
/*!40000 ALTER TABLE `comision_propietario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.contratoarrendamiento
CREATE TABLE IF NOT EXISTS `contratoarrendamiento` (
  `IdContrato` int NOT NULL AUTO_INCREMENT,
  `IdArrendatario` int DEFAULT NULL,
  `IdInmueble` int DEFAULT NULL,
  `FechaInicioContrato` date NOT NULL,
  `FechaFinContrato` date NOT NULL,
  `EstadoContrato` varchar(50) DEFAULT NULL,
  `ValorDeposito` decimal(20,5) DEFAULT NULL,
  `MesesAlquiler` int DEFAULT NULL,
  `CuotasPendientes` int DEFAULT NULL,
  PRIMARY KEY (`IdContrato`),
  KEY `IdArrendatario` (`IdArrendatario`),
  KEY `IdInmueble` (`IdInmueble`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.contratoarrendamiento: 2 rows
/*!40000 ALTER TABLE `contratoarrendamiento` DISABLE KEYS */;
INSERT INTO `contratoarrendamiento` (`IdContrato`, `IdArrendatario`, `IdInmueble`, `FechaInicioContrato`, `FechaFinContrato`, `EstadoContrato`, `ValorDeposito`, `MesesAlquiler`, `CuotasPendientes`) VALUES
	(2, 1, 2, '2023-11-02', '2025-05-02', 'Vigente', 1200000.00000, 18, 18),
	(3, 2, 9, '2023-12-02', '2024-03-02', 'Finalizado', 25000.00000, 3, 3);
/*!40000 ALTER TABLE `contratoarrendamiento` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.inmueble
CREATE TABLE IF NOT EXISTS `inmueble` (
  `IdInmueble` int NOT NULL AUTO_INCREMENT,
  `IdArrendatario` int unsigned DEFAULT NULL,
  `IdPropietario` int unsigned DEFAULT NULL,
  `NoMatricula` int unsigned DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Estrato` int DEFAULT NULL,
  `Ciudad` varchar(100) DEFAULT NULL,
  `Barrio` varchar(100) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `NoNiveles` int DEFAULT NULL,
  `NoBanos` int DEFAULT NULL,
  `ServiciosPublicos` varchar(700) DEFAULT NULL,
  `NoHabitaciones` int DEFAULT NULL,
  `Estado` varchar(100) DEFAULT NULL,
  `NoTerraza` int DEFAULT NULL,
  `AreaConstruidaM2` float DEFAULT NULL,
  `Aseguramiento` date DEFAULT NULL,
  `ValorInmueble` int unsigned DEFAULT NULL,
  `booleanos` varchar(50) NOT NULL DEFAULT 'true',
  `Descripcion` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`IdInmueble`) USING BTREE,
  KEY `Id_Arrendatario` (`IdArrendatario`) USING BTREE,
  KEY `Id_Propietario` (`IdPropietario`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.inmueble: 11 rows
/*!40000 ALTER TABLE `inmueble` DISABLE KEYS */;
INSERT INTO `inmueble` (`IdInmueble`, `IdArrendatario`, `IdPropietario`, `NoMatricula`, `Direccion`, `Estrato`, `Ciudad`, `Barrio`, `Tipo`, `NoNiveles`, `NoBanos`, `ServiciosPublicos`, `NoHabitaciones`, `Estado`, `NoTerraza`, `AreaConstruidaM2`, `Aseguramiento`, `ValorInmueble`, `booleanos`, `Descripcion`) VALUES
	(11, 2, NULL, 2, 'Holas', 3, 'jhkjhjh', 'si soy', 'Apartamento', 1, 1, 'jhkjhkjhk', NULL, 'Ocupado', 2, NULL, '2024-02-12', 2000, 'true', 'trdfgjkjfdgfgf'),
	(10, 2, NULL, 2, '+ñp', 1, '´l+p´+', 'pkk', 'Bodega', NULL, 2, 'p´´pp', NULL, 'Ocupado', NULL, NULL, NULL, 2000, 'true', 'lhjkljkhhj'),
	(1, 1, 1, 12345, 'Calle 456', 4, 'Ciudad A', 'Barrio X', 'Casa', 2, 2, 'Agua, EnergÃ­a', 3, 'Ocupado', 1, 120.5, '2024-03-01', 1500000, 'true', 'Casa de dos pisos'),
	(9, 3, NULL, 1, 'kjlkjl', 1, 'kkjl', 'jhkjhk', 'Oficina', NULL, 2, 'cgkjkj', NULL, 'Ocupado', NULL, NULL, '2024-03-01', 2000, 'true', 'uiuku'),
	(2, 2, 2, 67890, 'Avenida 789', 5, 'Ciudad B', 'Barrio Y', 'Apartamento', 1, 1, 'Agua, EnergÃ­a, Gas', 2, 'Ocupado', 0, 80.5, '2024-06-01', 2000000, 'true', 'Apartamento con vista al mar'),
	(12, 2, NULL, 900, 'fgff', 1, 'fdgfdg', 'dfgfdg', 'Apartamento', 9, 3, 'fgfgfdgfdfdfgfdg', NULL, 'Ocupado', 9, NULL, '2024-02-12', 8000, 'true', 'dfgfgfgf'),
	(13, 3, NULL, 900, 'fgff', 8, 'fgfg', 'fhfh', 'Apartamento', 9, 2, 'sd', NULL, 'Ocupado', 6, NULL, '2024-02-12', 700, 'true', 'dfdfdf'),
	(14, 2, NULL, 2, 'fdfd', 1, 'palmira', 'fhfh', 'Apartamento', 2, 2, 'fgffgf', NULL, 'Ocupado', 1, NULL, '2024-02-12', 1000000, 'true', '  n n n nvbvbbvbvvb'),
	(15, 12, NULL, 896, 'calle #2 cr33', 3, 'palmira', 'dfdfd', 'Apartamento', 2, 9, 'jiisgsdjsdjdjss', NULL, 'Ocupado', 1, NULL, '2024-02-12', 2000, 'true', 'vgygg'),
	(16, NULL, NULL, 55, 'kj,k,kj,jk,', 4, 'fgfgfd', 'dfgfgfdg', 'Bodega', NULL, 5, 'gfgfgf', NULL, NULL, NULL, NULL, NULL, 20000, 'false', ',k.kl.jk.'),
	(17, NULL, NULL, 2001, 'carrera 90', 1, 'palmira', 'paraiso', 'Apartamento', 3, 3, 'agua y luz', NULL, NULL, 2, NULL, '2024-02-16', 200000, 'true', 'nada de mascotas');
/*!40000 ALTER TABLE `inmueble` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.pagos_arrendamiento
CREATE TABLE IF NOT EXISTS `pagos_arrendamiento` (
  `IdPagoArrendamiento` int NOT NULL AUTO_INCREMENT,
  `IdArrendatario` int unsigned DEFAULT NULL,
  `IdContrato` int DEFAULT NULL,
  `FechaPago` date DEFAULT NULL,
  `FechaInicio` date DEFAULT NULL,
  `FechaFin` date DEFAULT NULL,
  `ValorPago` int unsigned DEFAULT NULL,
  `FormaPago` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `DiasDMora` int DEFAULT NULL,
  `booleanos` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`IdPagoArrendamiento`) USING BTREE,
  KEY `Id_Arrendatario` (`IdArrendatario`) USING BTREE,
  KEY `IdContrato` (`IdContrato`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.pagos_arrendamiento: 5 rows
/*!40000 ALTER TABLE `pagos_arrendamiento` DISABLE KEYS */;
INSERT INTO `pagos_arrendamiento` (`IdPagoArrendamiento`, `IdArrendatario`, `IdContrato`, `FechaPago`, `FechaInicio`, `FechaFin`, `ValorPago`, `FormaPago`, `Estado`, `DiasDMora`, `booleanos`) VALUES
	(1, 1, 1, '2024-03-02', '2024-03-01', '2024-03-15', 1500000, 'Transferencia', 'Pagado', 0, 'true'),
	(2, 2, NULL, '2024-03-16', '2024-03-16', '2024-03-31', 2000000, 'Efectivo', 'Pendiente', 5, 'true'),
	(3, NULL, NULL, '2024-03-02', '2024-02-27', '2024-03-29', 500000, 'Transferencia', NULL, NULL, 'true'),
	(4, NULL, NULL, '2024-03-02', '2024-03-08', '2024-03-29', 30000, 'Transferencia', 'Pagado', NULL, 'true'),
	(5, NULL, NULL, '2024-03-02', '2024-02-29', '2024-03-28', 5000000, 'Efectivo', 'Pagado', NULL, 'true'),
	(6, NULL, NULL, '2024-03-02', '2024-03-05', '2024-03-30', 20000, 'Efectivo', 'Pagado', NULL, 'true'),
	(7, NULL, NULL, '2024-03-02', '2024-02-28', '2024-04-03', 20000, 'Efectivo', 'Pagado', NULL, 'true');
/*!40000 ALTER TABLE `pagos_arrendamiento` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.propietario
CREATE TABLE IF NOT EXISTS `propietario` (
  `IdPropietario` int NOT NULL AUTO_INCREMENT,
  `NombreCompleto` varchar(100) DEFAULT NULL,
  `TipoDocumento` varchar(50) DEFAULT NULL,
  `DocumentoIdentidad` int unsigned DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Telefono` int unsigned DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `Banco` varchar(100) DEFAULT NULL,
  `TipoCuenta` varchar(50) DEFAULT NULL,
  `NumeroCuenta` bigint unsigned DEFAULT NULL,
  `booleanos` varchar(50) NOT NULL DEFAULT 'true',
  `FechaIngreso` date DEFAULT NULL,
  PRIMARY KEY (`IdPropietario`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.propietario: 5 rows
/*!40000 ALTER TABLE `propietario` DISABLE KEYS */;
INSERT INTO `propietario` (`IdPropietario`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Direccion`, `Telefono`, `Correo`, `Banco`, `TipoCuenta`, `NumeroCuenta`, `booleanos`, `FechaIngreso`) VALUES
	(1, 'Juan Pérez', 'CC', 123456789, 'Calle 123', 1234567890, 'juan@gmail.com', 'Banco A', 'Cuenta Corriente', 987654321, 'true', '2024-02-23'),
	(2, 'María González', 'CE', 987654321, 'Avenida 456', 4294967295, 'maria@gmail.com', 'Banco B', 'Cuenta Ahorro', 123456789, 'true', '2024-01-10'),
	(4, 'Juan Arenas', 'Cedula Ciudadania', 1114541165, 'crrera 80 #7 e 98', 3132025146, 'jua@gmail.com', 'aveces', 'Cuenta Ahorros', 1234567890, 'true', '2024-02-28'),
	(5, 'funciona malparido', 'Cedula Ciudadania', 213456789, 'sapo', 123455, 'pedro@gmail.coms', 'Wers', 'Cuenta Ahorros', 1234567890, 'true', '2024-02-28'),
	(6, 'putoos', 'Cedula Ciudadania', 1234567890, 'cra16 -16-22', 4294967295, 'juandeq16@gmail.com', 'We', 'Cuenta Corriente', 1234567890, 'true', '2024-02-28'),
	(7, 'pachos', 'Cedula Ciudadania', 36098, 'nose por palmira', 3132025146, 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', 20000, 'true', '2024-03-02'),
	(8, 'pachoss', 'Cedula Ciudadania', 360984, 'nose por palmira', 3132025146, 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', 20000, 'true', '2024-03-02'),
	(9, 'pachosss', 'Cedula Ciudadania', 360989, 'nose por palmira', 3132025146, 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', 20000, 'true', '2024-03-02'),
	(11, 'pancho', 'Cedula Ciudadania', 951357, 'nose por palmira', 3132025146, 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', 20000, 'true', '2024-03-02'),
	(12, 'ricardo', 'Cedula Extranjera', 1016713467, 'villa de las palmas', 3215064879, 'richardforever@gmail.com', 'Banco bogota', 'Cuenta Corriente', 2564258697, 'true', '2024-03-02'),
	(13, 'quijontes', 'Cedula Ciudadania', 456321547, 'nose por palmira', 3132025146, 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', 20000, 'true', '2024-03-02'),
	(14, 'quijontes richi', 'Cedula Ciudadania', 1114578965, 'nose por palmira', 3132025146, 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', 20000, 'true', '2024-03-02'),
	(15, 'flin david', 'Cedula Ciudadania', 1233212, 'nose por palmira', 32150412, 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', 20000, 'true', '2024-03-02'),
	(16, '12', 'Cedula Ciudadania', 45685123, 'fsfsfdsd', 32150412, 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', 20000, 'true', '2024-03-02');
/*!40000 ALTER TABLE `propietario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `Idrol` int NOT NULL AUTO_INCREMENT,
  `NombreRol` varchar(50) NOT NULL,
  PRIMARY KEY (`Idrol`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.rol: 2 rows
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` (`Idrol`, `NombreRol`) VALUES
	(1, 'Administrador'),
	(2, 'Empleado');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.trabajador
CREATE TABLE IF NOT EXISTS `trabajador` (
  `IdTrabajador` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Idrol` int DEFAULT NULL,
  `Booleanos` char(50) NOT NULL DEFAULT 'true',
  PRIMARY KEY (`IdTrabajador`) USING BTREE,
  KEY `idrol` (`Idrol`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.trabajador: 2 rows
/*!40000 ALTER TABLE `trabajador` DISABLE KEYS */;
INSERT INTO `trabajador` (`IdTrabajador`, `Nombre`, `Apellido`, `Correo`, `Contrasena`, `Telefono`, `Idrol`, `Booleanos`) VALUES
	(1, 'Juan', 'Pérez', 'juan@example.com', 'contraseña123', '555-1234', 1, 'true'),
	(2, 'María Sambrano', 'Gómez    ', 'maria@example.com    ', 'contraseña456    ', '555-5678', 2, 'true');
/*!40000 ALTER TABLE `trabajador` ENABLE KEYS */;

-- Volcando estructura para disparador adminmuebles.Before_Insert_ContratoArrendamiento
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='';
DELIMITER //
CREATE TRIGGER `Before_Insert_ContratoArrendamiento` BEFORE INSERT ON `contratoarrendamiento` FOR EACH ROW BEGIN
    SET NEW.MesesAlquiler = TIMESTAMPDIFF(MONTH, NEW.FechaInicioContrato, NEW.FechaFinContrato);
    SET NEW.CuotasPendientes = NEW.MesesAlquiler - (
        SELECT COUNT(*) FROM pagos_Arrendamiento
        WHERE IdContrato = NEW.IdContrato
    );
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
