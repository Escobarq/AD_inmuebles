-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         8.0.32 - MySQL Community Server - GPL
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
  `NombreCompleto` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `TipoDocumento` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `DocumentoIdentidad` int unsigned DEFAULT NULL,
  `Telefono` int unsigned DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `CuotasPagadas` int DEFAULT NULL,
  `SiguienteCuota` date DEFAULT NULL,
  `CuotasPendientes` int DEFAULT NULL,
  `FechaInicioContrato` date DEFAULT NULL,
  `FechaFinContrato` date DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `ValorDeposito` decimal(20,5) DEFAULT NULL,
  `MesesAlquiler` int DEFAULT NULL,
  `booleanos` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`IdArrendatario`) USING BTREE,
  KEY `Id_Codeudor` (`IdCodeudor`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.arrendatario: 3 rows
/*!40000 ALTER TABLE `arrendatario` DISABLE KEYS */;
INSERT INTO `arrendatario` (`IdArrendatario`, `IdCodeudor`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Telefono`, `Correo`, `CuotasPagadas`, `SiguienteCuota`, `CuotasPendientes`, `FechaInicioContrato`, `FechaFinContrato`, `Estado`, `ValorDeposito`, `MesesAlquiler`, `booleanos`) VALUES
	(1, 1, 'Carlos López', 'CC', 111222333, 1112223334, 'carlos@gmail.com', 5, '2024-03-01', 7, '2024-01-01', '2024-12-31', 'Vigente', 30000000.00000, NULL, 'true'),
	(2, 2, 'Ana Rodríguez', 'CE', 444555666, 4294967295, 'ana@gmail.com', 10, '2024-03-15', 5, '2023-12-01', '2024-11-30', 'Vigente', NULL, NULL, 'true'),
	(12, NULL, 'Juan', 'CC', 111211, 313202545, 'Juan@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'true');
/*!40000 ALTER TABLE `arrendatario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.codeudor
CREATE TABLE IF NOT EXISTS `codeudor` (
  `IdCodeudor` int NOT NULL AUTO_INCREMENT,
  `NombreCompleto` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `TipoDocumento` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `DocumentoIdentidad` int unsigned DEFAULT NULL,
  `Telefono` int unsigned DEFAULT NULL,
  `Correo` varchar(250) DEFAULT NULL,
  `Direccion` varchar(150) DEFAULT NULL,
  `booleanos` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT 'true' COMMENT 'Datos booleanos si esta activo mostrar de lo contario no mostrar',
  PRIMARY KEY (`IdCodeudor`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.codeudor: 3 rows
/*!40000 ALTER TABLE `codeudor` DISABLE KEYS */;
INSERT INTO `codeudor` (`IdCodeudor`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Telefono`, `Correo`, `Direccion`, `booleanos`) VALUES
	(1, 'Pedro Ramírez', 'CC', 777888999, 4294967295, 'pedro@gmail.com', 'Calle 789', 'true'),
	(2, 'Laura Martínez', 'CC', 333444555, 3334445556, 'laura@gmail.com', 'Avenida 012', 'true'),
	(3, 'arenas', 'CE', 1123123, 12312312, 'xd@gmail', 'nose', 'false');
/*!40000 ALTER TABLE `codeudor` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.comision_propietario
CREATE TABLE IF NOT EXISTS `comision_propietario` (
  `IdComisionPropietario` int NOT NULL AUTO_INCREMENT,
  `IdPropietario` int unsigned DEFAULT NULL,
  `FechaElaboracion` date DEFAULT NULL,
  `PeriodoPagado` date DEFAULT NULL,
  `ElaboradoPor` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ValorArriendo` int unsigned DEFAULT NULL,
  `FormaPago` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
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
  `ServiciosPublicos` varchar(700) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
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
	(15, NULL, NULL, 896, 'calle #2 cr33', 3, 'palmira', 'dfdfd', 'Apartamento', 2, 9, 'jiisgsdjsdjdjss', NULL, NULL, 1, NULL, '2024-02-12', 2000, 'true', 'vgygg'),
	(16, NULL, NULL, 55, 'kj,k,kj,jk,', 4, 'fgfgfd', 'dfgfgfdg', 'Bodega', NULL, 5, 'gfgfgf', NULL, NULL, NULL, NULL, NULL, 20000, 'false', ',k.kl.jk.'),
	(17, NULL, NULL, 2001, 'carrera 90', 1, 'palmira', 'paraiso', 'Apartamento', 3, 3, 'agua y luz', NULL, NULL, 2, NULL, '2024-02-16', 200000, 'true', 'nada de mascotas');
/*!40000 ALTER TABLE `inmueble` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.pagos_arrendamiento
CREATE TABLE IF NOT EXISTS `pagos_arrendamiento` (
  `IdPagoArrendamiento` int NOT NULL AUTO_INCREMENT,
  `IdArrendatario` int unsigned DEFAULT NULL,
  `FechaPago` date DEFAULT NULL,
  `FechaInicio` date DEFAULT NULL,
  `FechaFin` date DEFAULT NULL,
  `ValorPago` int unsigned DEFAULT NULL,
  `FormaPago` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `DiasDMora` int DEFAULT NULL,
  `booleanos` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`IdPagoArrendamiento`) USING BTREE,
  KEY `Id_Arrendatario` (`IdArrendatario`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.pagos_arrendamiento: 2 rows
/*!40000 ALTER TABLE `pagos_arrendamiento` DISABLE KEYS */;
INSERT INTO `pagos_arrendamiento` (`IdPagoArrendamiento`, `IdArrendatario`, `FechaPago`, `FechaInicio`, `FechaFin`, `ValorPago`, `FormaPago`, `Estado`, `DiasDMora`, `booleanos`) VALUES
	(1, 1, '2024-03-02', '2024-03-01', '2024-03-15', 1500000, 'Transferencia', 'Pagado', 0, 'true'),
	(2, 2, '2024-03-16', '2024-03-16', '2024-03-31', 2000000, 'Efectivo', 'Pendiente', 5, 'true');
/*!40000 ALTER TABLE `pagos_arrendamiento` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.propietario
CREATE TABLE IF NOT EXISTS `propietario` (
  `IdPropietario` int NOT NULL AUTO_INCREMENT,
  `NombreCompleto` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `TipoDocumento` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `DocumentoIdentidad` int unsigned DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Telefono` int unsigned DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `Banco` varchar(100) DEFAULT NULL,
  `TipoCuenta` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `NumeroCuenta` bigint unsigned DEFAULT NULL,
  `booleanos` varchar(50) NOT NULL DEFAULT 'true',
  `FechaIngreso` date DEFAULT NULL,
  PRIMARY KEY (`IdPropietario`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.propietario: 4 rows
/*!40000 ALTER TABLE `propietario` DISABLE KEYS */;
INSERT INTO `propietario` (`IdPropietario`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Direccion`, `Telefono`, `Correo`, `Banco`, `TipoCuenta`, `NumeroCuenta`, `booleanos`, `FechaIngreso`) VALUES
	(1, 'Juan Pérez', 'CC', 123456789, 'Calle 123', 1234567890, 'juan@gmail.com', 'Banco A', 'Cuenta Corriente', 987654321, 'true', '2024-02-23'),
	(2, 'María González', 'CE', 987654321, 'Avenida 456', 4294967295, 'maria@gmail.com', 'Banco B', 'Cuenta Ahorro', 123456789, 'true', '2024-01-10'),
	(4, 'Juan Arenas', NULL, 1114541165, 'crrera 80 #7 e 98', 3132025146, 'jua@gmail.com', 'av', NULL, NULL, 'true', NULL),
	(5, 'sdfds', NULL, 1241, 'dfdf', 20, 'sdfd@gmial-com', 'wefe', NULL, NULL, 'true', NULL);
/*!40000 ALTER TABLE `propietario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `Idrol` int NOT NULL AUTO_INCREMENT,
  `NombreRol` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`Idrol`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.rol: 4 rows
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` (`Idrol`, `NombreRol`) VALUES
	(1, 'Administrador'),
	(2, 'Empleado'),
	(3, 'Asesor Comercial'),
	(4, 'Super usuario');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.trabajador
CREATE TABLE IF NOT EXISTS `trabajador` (
  `IdTrabajador` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Apellido` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Correo` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Contrasena` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Telefono` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Idrol` int DEFAULT NULL,
  `Booleanos` char(50) NOT NULL DEFAULT 'true',
  PRIMARY KEY (`IdTrabajador`) USING BTREE,
  KEY `idrol` (`Idrol`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.trabajador: 4 rows
/*!40000 ALTER TABLE `trabajador` DISABLE KEYS */;
INSERT INTO `trabajador` (`IdTrabajador`, `Nombre`, `Apellido`, `Correo`, `Contrasena`, `Telefono`, `Idrol`, `Booleanos`) VALUES
	(1, 'Juan', 'Pérez', 'juan@example.com', 'contraseña123', '555-1234', 1, 'true'),
	(2, 'María', 'Gómez', 'maria@example.com', 'contraseña456', '555-5678', 2, 'true'),
	(3, 'Carlos', 'Rodríguez', 'carlos@example.com', 'contraseña789', '555-9876', 3, 'true'),
	(4, 'Juan', 'David', 'juandeq15@example.com', 'contraseña111', '555-1133', 4, 'true');
/*!40000 ALTER TABLE `trabajador` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
