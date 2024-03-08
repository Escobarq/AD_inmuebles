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
  `DocumentoIdentidad` varchar(10) DEFAULT NULL,
  `Telefono` varchar(10) DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `booleanos` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`IdArrendatario`) USING BTREE,
  KEY `Id_Codeudor` (`IdCodeudor`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.arrendatario: 4 rows
/*!40000 ALTER TABLE `arrendatario` DISABLE KEYS */;
INSERT INTO `arrendatario` (`IdArrendatario`, `IdCodeudor`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Telefono`, `Correo`, `Estado`, `booleanos`) VALUES
	(1, 1, 'Carlos López', 'CC', '111222333', '1112223334', 'carlos@gmail.com', 'Vigente', 'true'),
	(2, 2, 'Ana Rodríguez', 'CE', '444555666', '4294967295', 'ana@gmail.com', 'Vigente', 'true'),
	(21, NULL, 'HptsPorfin', 'CC', '1192', '4294967295', 'q@q.cos', 'Vigente', 'true'),
	(26, NULL, 'Juanda', 'CC', '1234567890', '1234567890', 'nose@gmail.com', 'Libre', 'true');
/*!40000 ALTER TABLE `arrendatario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.codeudor
CREATE TABLE IF NOT EXISTS `codeudor` (
  `IdCodeudor` int NOT NULL AUTO_INCREMENT,
  `NombreCompleto` varchar(100) DEFAULT NULL,
  `TipoDocumento` varchar(50) DEFAULT NULL,
  `DocumentoIdentidad` varchar(10) DEFAULT NULL,
  `Telefono` varchar(10) DEFAULT NULL,
  `Correo` varchar(250) DEFAULT NULL,
  `Direccion` varchar(150) DEFAULT NULL,
  `booleanos` varchar(10) DEFAULT 'true' COMMENT 'Datos booleanos si esta activo mostrar de lo contario no mostrar',
  PRIMARY KEY (`IdCodeudor`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.codeudor: 3 rows
/*!40000 ALTER TABLE `codeudor` DISABLE KEYS */;
INSERT INTO `codeudor` (`IdCodeudor`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Telefono`, `Correo`, `Direccion`, `booleanos`) VALUES
	(1, 'Pedro Ramíre', 'CC', '777888999', '4294967295', 'pedro@gmail.com', 'Calle 789', 'true'),
	(2, 'Laura Martínez', 'CC', '333444555', '3334445556', 'laura@gmail.com', 'Avenida 012', 'true'),
	(3, 'arenas', 'CE', '1123123', '12312312', 'xd@gmail', 'nose', 'false');
/*!40000 ALTER TABLE `codeudor` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.comision_propietario
CREATE TABLE IF NOT EXISTS `comision_propietario` (
  `IdComisionPropietario` int NOT NULL AUTO_INCREMENT,
  `IdPropietario` int unsigned DEFAULT NULL,
  `IdInmueble` int unsigned DEFAULT NULL,
  `FechaElaboracion` date DEFAULT NULL,
  `ElaboradoPor` varchar(100) DEFAULT NULL,
  `FormaPago` varchar(50) DEFAULT NULL,
  `PagoArriendo` int unsigned DEFAULT NULL,
  `AdmInmobi` int unsigned DEFAULT NULL,
  `AseoEntrega` int unsigned DEFAULT NULL,
  `Mantenimiento` int unsigned DEFAULT NULL,
  PRIMARY KEY (`IdComisionPropietario`) USING BTREE,
  KEY `IdPropietario` (`IdPropietario`) USING BTREE,
  KEY `IdInmueble` (`IdInmueble`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.comision_propietario: 10 rows
/*!40000 ALTER TABLE `comision_propietario` DISABLE KEYS */;
INSERT INTO `comision_propietario` (`IdComisionPropietario`, `IdPropietario`, `IdInmueble`, `FechaElaboracion`, `ElaboradoPor`, `FormaPago`, `PagoArriendo`, `AdmInmobi`, `AseoEntrega`, `Mantenimiento`) VALUES
	(3, 11, 25, '2024-03-04', 'Juan Pérez', 'Efectivo', 250000, 120, 300, 5000),
	(4, 11, 20, '2024-03-04', 'Juan Pérez', 'Transferencia', 50000000, 30, 20, 3000),
	(5, 12, 26, '2024-03-04', 'Juan Pérez', 'Efectivo', 2000, 400, 20, 0),
	(6, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333),
	(7, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333),
	(8, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333),
	(9, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333),
	(10, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333),
	(11, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333),
	(12, 2, 2, '2024-03-02', 'Juan Pérez', '', 3333333333, 3333333333, 0, 0),
	(13, 4, 28, '2024-03-02', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 0, 0);
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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.contratoarrendamiento: 3 rows
/*!40000 ALTER TABLE `contratoarrendamiento` DISABLE KEYS */;
INSERT INTO `contratoarrendamiento` (`IdContrato`, `IdArrendatario`, `IdInmueble`, `FechaInicioContrato`, `FechaFinContrato`, `EstadoContrato`, `ValorDeposito`, `MesesAlquiler`, `CuotasPendientes`) VALUES
	(2, 1, 2, '2023-11-02', '2025-05-02', 'Vigente', 1200000.00000, 18, 18),
	(3, 2, 9, '2023-12-02', '2024-03-02', 'Finalizado', 25000.00000, 3, 3),
	(4, 2, 18, '2023-12-03', '2024-11-03', 'Vigente', 2500000.00000, 11, 11);
/*!40000 ALTER TABLE `contratoarrendamiento` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.inmueble
CREATE TABLE IF NOT EXISTS `inmueble` (
  `IdInmueble` int NOT NULL AUTO_INCREMENT,
  `IdPropietario` int unsigned DEFAULT NULL,
  `NoMatricula` int unsigned DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Estrato` varchar(1) DEFAULT NULL,
  `Ciudad` varchar(100) DEFAULT NULL,
  `Barrio` varchar(100) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `NoNiveles` varchar(50) DEFAULT NULL,
  `NoBanos` varchar(50) DEFAULT NULL,
  `ServiciosPublicos` varchar(700) DEFAULT NULL,
  `NoHabitaciones` varchar(50) DEFAULT NULL,
  `Estado` varchar(100) DEFAULT NULL,
  `NoTerraza` varchar(50) DEFAULT NULL,
  `AreaConstruidaM2` varchar(50) DEFAULT NULL,
  `Aseguramiento` date DEFAULT NULL,
  `ValorInmueble` int unsigned DEFAULT NULL,
  `booleanos` varchar(50) NOT NULL DEFAULT 'true',
  `Descripcion` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`IdInmueble`) USING BTREE,
  KEY `Id_Propietario` (`IdPropietario`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.inmueble: 22 rows
/*!40000 ALTER TABLE `inmueble` DISABLE KEYS */;
INSERT INTO `inmueble` (`IdInmueble`, `IdPropietario`, `NoMatricula`, `Direccion`, `Estrato`, `Ciudad`, `Barrio`, `Tipo`, `NoNiveles`, `NoBanos`, `ServiciosPublicos`, `NoHabitaciones`, `Estado`, `NoTerraza`, `AreaConstruidaM2`, `Aseguramiento`, `ValorInmueble`, `booleanos`, `Descripcion`) VALUES
	(11, NULL, 2, 'Holas', '3', 'jhkjhjh', 'si soy', 'Apartamento', '1', '1', 'jhkjhkjhk', NULL, 'Ocupado', '2', NULL, '2024-02-12', 2000, 'true', 'trdfgjkjfdgfgf'),
	(10, NULL, 2, '+ñp', '1', '´l+p´+', 'pkk', 'Bodega', NULL, '2', 'p´´pp', NULL, 'Ocupado', NULL, NULL, NULL, 2000, 'true', 'lhjkljkhhj'),
	(1, 1, 12345, 'Calle 456', '5', 'Ciudad A', 'Barrio X', 'Casa', '2', '2', 'Agua, EnergÃ­a', '3', 'Ocupado', '1', '120.5', '2024-03-01', 1500000, 'true', 'Casa de dos pisos'),
	(9, NULL, 1, 'kjlkjl', '1', 'kkjl', 'jhkjhk', 'Oficina', NULL, '2', 'cgkjkj', NULL, 'Ocupado', NULL, NULL, '2024-03-01', 2000, 'true', 'uiuku'),
	(2, 2, 67890, 'Avenida 789', '5', 'Ciudad B', 'Barrio Y', 'Apartamento', '1', '1', 'Agua, EnergÃ­a, Gas', '2', 'Disponible', '0', '80.5', '2024-06-01', 2000000, 'true', 'Apartamento con vista al mar'),
	(12, NULL, 900, 'fgff', '1', 'fdgfdg', 'dfgfdg', 'Apartamento', '9', '3', 'fgfgfdgfdfdfgfdg', NULL, 'Ocupado', '9', NULL, '2024-02-12', 8000, 'true', 'dfgfgfgf'),
	(13, NULL, 900, 'fgff', '8', 'fgfg', 'fhfh', 'Apartamento', '9', '2', 'sd', NULL, 'Ocupado', '6', NULL, '2024-02-12', 700, 'true', 'dfdfdf'),
	(14, NULL, 2, 'fdfd', '1', 'palmira', 'fhfh', 'Apartamento', '2', '2', 'fgffgf', NULL, 'Ocupado', '1', NULL, '2024-02-12', 1000000, 'true', '  n n n nvbvbbvbvvb'),
	(15, NULL, 896, 'calle #2 cr33', '3', 'palmira', 'dfdfd', 'Apartamento', '2', '9', 'jiisgsdjsdjdjss', NULL, 'Ocupado', '1', NULL, '2024-02-12', 2000, 'true', 'vgygg'),
	(16, NULL, 55, 'kj,k,kj,jk,', '4', 'fgfgfd', 'dfgfgfdg', 'Bodega', NULL, '5', 'gfgfgf', NULL, NULL, NULL, NULL, NULL, 20000, 'false', ',k.kl.jk.'),
	(17, NULL, 2001, 'carrera 90', '1', 'palmira', 'paraiso', 'Apartamento', '3', '3', 'agua y luz', NULL, NULL, '2', NULL, '2024-02-16', 200000, 'true', 'nada de mascotas'),
	(18, 17, 200089, 'carrera 10 no 3 # 5e98', '4', 'villa hermosda', 'paraiso papa', 'Apartamento', '5', '7', '', NULL, 'Disponible', '2', NULL, '2024-04-05', 3000000, 'true', 'no se permite perros'),
	(19, 15, 564545, 'carrera nose', '4', 'hila', 'manuel', 'Apartamento', '6', '7', 'gua NOMAS', NULL, 'Disponible', '2', NULL, '2004-05-12', 12000, 'true', 'jnsjdkdffds'),
	(20, 11, 22555, 'carrera nose', '3', 'hila', 'manuel', 'Bodega', NULL, '3', 'gua NOMAS', NULL, 'Disponible', NULL, NULL, NULL, 2500, 'true', 'ggfgfdffdd'),
	(21, NULL, 22555, 'carrera nose', '3', 'hila', 'manuel', 'Bodega', NULL, '3', 'gua NOMAS', NULL, 'Disponible', NULL, NULL, NULL, 2500, 'true', 'ggfgfdffdd'),
	(22, NULL, 22555, 'carrera nose', '3', 'hila', 'manuel', 'Bodega', NULL, '3', 'gua NOMAS', NULL, 'Disponible', NULL, NULL, NULL, 2500, 'true', 'ggfgfdffdd'),
	(23, NULL, 22555, 'carrera nose', '3', 'hila', 'manuel', 'Bodega', NULL, '3', 'gua NOMAS', NULL, 'Disponible', NULL, NULL, NULL, 2500, 'true', 'ggfgfdffdd'),
	(24, 11, 45, 'nose por palmira', '', 'hila', 'manuel', 'Bodega', NULL, '3', 'gua NOMAS', NULL, 'Disponible', NULL, NULL, NULL, 5536, 'true', 'dfdsfddssd'),
	(25, 11, 4546, 'Calle 123', '6', 'hila', 'manueldfd', 'Bodega', NULL, '3', 'sdfs', NULL, 'Disponible', NULL, NULL, NULL, 20000, 'true', 'dfdsfsdfds'),
	(26, 12, 456, 'nose por palmira', '4', 'gfdgfdgf', 'manuel', 'Casa', NULL, '4', 'sgfdgmg', NULL, 'Disponible', NULL, NULL, '2024-04-02', 20000, 'true', 'dfgifhdgifdgfg'),
	(27, 17, 56465, 'carrera alcancela', '1', 'hila', 'encuentrela', 'Oficina', NULL, '7', 'gua NOMAS', NULL, 'Disponible', NULL, NULL, '2024-03-30', 30000, 'true', 'dfdgfd'),
	(28, 4, 455645646, 'carrera enbusca', '3', 'encuntrela', 'aqui en mi casa', 'Local', NULL, '8', 'lfjkvklfjg', NULL, 'Disponible', NULL, NULL, '2024-04-05', 20000, 'true', 'no kgatos gucataela');
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
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.pagos_arrendamiento: 13 rows
/*!40000 ALTER TABLE `pagos_arrendamiento` DISABLE KEYS */;
INSERT INTO `pagos_arrendamiento` (`IdPagoArrendamiento`, `IdArrendatario`, `IdContrato`, `FechaPago`, `FechaInicio`, `FechaFin`, `ValorPago`, `FormaPago`, `Estado`, `DiasDMora`, `booleanos`) VALUES
	(1, 1, 1, '2024-03-02', '2024-03-01', '2024-03-15', 1500000, 'Transferencia', 'Pagado', 0, 'true'),
	(2, 2, NULL, '2024-03-16', '2024-03-16', '2024-03-31', 2000000, 'Efectivo', 'Pendiente', 5, 'true'),
	(3, NULL, NULL, '2024-03-02', '2024-02-27', '2024-03-29', 500000, 'Transferencia', NULL, NULL, 'true'),
	(4, NULL, NULL, '2024-03-02', '2024-03-08', '2024-03-29', 30000, 'Transferencia', 'Pagado', NULL, 'true'),
	(5, NULL, NULL, '2024-03-02', '2024-02-29', '2024-03-28', 5000000, 'Efectivo', 'Pagado', NULL, 'true'),
	(6, NULL, NULL, '2024-03-02', '2024-03-05', '2024-03-30', 20000, 'Efectivo', 'Pagado', NULL, 'true'),
	(7, NULL, NULL, '2024-03-02', '2024-02-28', '2024-04-03', 20000, 'Efectivo', 'Pagado', NULL, 'true'),
	(8, 2, 4, '2024-03-03', '2024-03-03', '2024-03-21', 20000, 'Efectivo', 'Pagado', NULL, 'true'),
	(9, 1, 2, '2024-03-03', '2024-03-03', '2024-04-01', 1200000, 'Efectivo', 'Pagado', NULL, 'true'),
	(10, 2, 4, '2024-03-03', '2024-02-26', '2024-04-06', 1200000, 'Efectivo', 'Pagado', NULL, 'true'),
	(11, 2, 4, '2024-03-03', '2024-02-26', '2024-04-06', 50000, 'Efectivo', 'Pagado', NULL, 'true'),
	(12, 2, 4, '2024-03-03', '0005-04-05', '0189-04-05', 2000, 'Efectivo', 'Pagado', NULL, 'true'),
	(13, 2, 4, '2024-03-03', '2546-04-15', '2546-04-05', 2000, 'Efectivo', 'Pagado', NULL, 'true'),
	(14, 1, 2, '2024-03-04', '2024-03-02', '2024-03-30', 1123456789, 'Efectivo', 'Pagado', NULL, 'true'),
	(15, 2, 4, '2024-03-04', '2024-03-02', '2024-03-03', 123, 'Efectivo', 'Pagado', NULL, 'true');
/*!40000 ALTER TABLE `pagos_arrendamiento` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.propietario
CREATE TABLE IF NOT EXISTS `propietario` (
  `IdPropietario` int NOT NULL AUTO_INCREMENT,
  `NombreCompleto` varchar(100) DEFAULT NULL,
  `TipoDocumento` varchar(50) DEFAULT NULL,
  `DocumentoIdentidad` varchar(10) DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Telefono` varchar(10) DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `Banco` varchar(100) DEFAULT NULL,
  `TipoCuenta` varchar(50) DEFAULT NULL,
  `NumeroCuenta` varchar(20) DEFAULT NULL,
  `booleanos` varchar(50) NOT NULL DEFAULT 'true',
  `FechaIngreso` date DEFAULT NULL,
  PRIMARY KEY (`IdPropietario`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.propietario: 17 rows
/*!40000 ALTER TABLE `propietario` DISABLE KEYS */;
INSERT INTO `propietario` (`IdPropietario`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Direccion`, `Telefono`, `Correo`, `Banco`, `TipoCuenta`, `NumeroCuenta`, `booleanos`, `FechaIngreso`) VALUES
	(1, 'David Hernandez', 'Cedula Ciudadania', '123456789', 'Calle 123', '1234567890', 'juan@gmail.com', 'Banco A', 'Cuenta Ahorros', '987654321', 'true', '2024-02-23'),
	(2, 'María González', 'CE', '987654321', 'Avenida 456', '4294967295', 'maria@gmail.com', 'Banco B', 'Cuenta Ahorro', '123456789', 'true', '2024-01-10'),
	(4, 'Juan Arenas', 'Cedula Ciudadania', '1114541165', 'crrera 80 #7 e 98', '3132025146', 'jua@gmail.com', 'aveces', 'Cuenta Ahorros', '1234567890', 'true', '2024-02-28'),
	(5, 'funciona malparido', 'Cedula Ciudadania', '213456789', 'sapo', '123455', 'pedro@gmail.coms', 'Wers', 'Cuenta Ahorros', '1234567890', 'true', '2024-02-28'),
	(6, 'putoos', 'Cedula Ciudadania', '1234567890', 'cra16 -16-22', '4294967295', 'juandeq16@gmail.com', 'We', 'Cuenta Corriente', '1234567890', 'true', '2024-02-28'),
	(7, 'pachos', 'Cedula Ciudadania', '36098', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(8, 'pachoss', 'Cedula Ciudadania', '360984', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(9, 'pachosss', 'Cedula Ciudadania', '360989', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(11, 'pancho', 'Cedula Ciudadania', '951357', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(12, 'ricardo', 'Cedula Extranjera', '1016713467', 'villa de las palmas', '3215064879', 'richardforever@gmail.com', 'Banco bogota', 'Cuenta Corriente', '2564258697', 'true', '2024-03-02'),
	(13, 'quijontes', 'Cedula Ciudadania', '456321547', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(14, 'quijontes richi', 'Cedula Ciudadania', '1114578965', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(15, 'flin david', 'Cedula Ciudadania', '1233212', 'nose por palmira', '32150412', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(16, '12', 'Cedula Ciudadania', '45685123', 'fsfsfdsd', '32150412', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(17, 'emiliano', 'Cedula Extranjera', '145415487', 'carrera 10 no 3 # 5e98', '321654759', 'juan@gmail.com', 'av villa', 'Cuenta Corriente', '2022254416356', 'true', NULL),
	(21, NULL, '', NULL, NULL, '3225445717', '', 'Nequi', NULL, '112233', 'true', NULL),
	(22, 'intentoo', 'Cedula Ciudadania', '1234567', 'noseque poner', '12345678', 'descobarquezada@gmailcom', 'Wers', 'Cuenta Ahorros', '23456789', 'true', NULL),
	(23, 'intentoooo', 'Cedula Ciudadania', '', 'cra16 -16-22', '12345678', 'juandeq16@gmail.com', '', 'Cuenta Ahorros', '12345678', 'true', NULL),
	(24, 'putoos', 'Cedula Ciudadania', '1234567890', 'xxxcddee', '123456789', 'sdfd@gmial-com', 'avecesss', 'Cuenta Ahorros', '123456789011', 'true', '2024-03-04');
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
