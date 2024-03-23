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
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.arrendatario: 8 rows
/*!40000 ALTER TABLE `arrendatario` DISABLE KEYS */;
INSERT INTO `arrendatario` (`IdArrendatario`, `IdCodeudor`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Telefono`, `Correo`, `Estado`, `booleanos`) VALUES
	(1, 1, 'Emanuel Nandez', 'Cedula Ciudadania', '111222333', '1112223334', 'carlos@gmail.com', 'Libre', 'true'),
	(2, 2, 'Ana Rodríguez', 'Cedula Ciudadania', '444555666', '4294967295', 'ana@gmail.com', 'Libre', 'true'),
	(21, 4, 'Mariano ', 'Cedula Ciudadania', '1192', '4294967295', 'q@q.cos', 'Libre', 'true'),
	(26, 5, 'Juanda', 'Cedula Ciudadania', '1234567890', '1234567890', 'nose@gmail.com', 'Libre', 'true'),
	(27, 3, 'jeison', 'Cedula Ciudadania', '323232', '1234567890', 'jeison@gmail.com', 'Libre', 'true'),
	(28, 3, 'juan', 'Cedula Ciudadania', '25689711', '3132025146', 'hola@gmail.com', 'Libre', 'true'),
	(29, 1, 'Manuel', 'Cedula Ciudadania', '3256444', '1234567890', 'carlos@gmail.com', 'Libre', 'true'),
	(30, 3, 'ingryd', 'Cedula Extranjeria', '65998899', '6565466', 'ingri@gmail.com', 'Libre', 'true');
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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.codeudor: 4 rows
/*!40000 ALTER TABLE `codeudor` DISABLE KEYS */;
INSERT INTO `codeudor` (`IdCodeudor`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Telefono`, `Correo`, `Direccion`, `booleanos`) VALUES
	(1, 'Pedro Ramíre', 'Cedula Extranjeria', '777888999', '4294967295', 'pedro@gmail.com', 'Calle 789', 'true'),
	(2, 'Laura Martínez', 'Cedula Extranjeria', '333444555', '3334445556', 'laura@gmail.com', 'Avenida 012', 'true'),
	(3, 'arenas', 'Cedula Extranjeria', '1123123', '12312312', 'xd@gmail', 'nose', 'false'),
	(4, 'Pedro Ramíre', 'Cedula Extranjeria', '9899566', '6597456', 'pedro@gmail.com', 'avenida 69', 'true');
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
  `ValorTotal` int DEFAULT NULL,
  PRIMARY KEY (`IdComisionPropietario`) USING BTREE,
  KEY `IdPropietario` (`IdPropietario`) USING BTREE,
  KEY `IdInmueble` (`IdInmueble`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.comision_propietario: 37 rows
/*!40000 ALTER TABLE `comision_propietario` DISABLE KEYS */;
INSERT INTO `comision_propietario` (`IdComisionPropietario`, `IdPropietario`, `IdInmueble`, `FechaElaboracion`, `ElaboradoPor`, `FormaPago`, `PagoArriendo`, `AdmInmobi`, `AseoEntrega`, `Mantenimiento`, `ValorTotal`) VALUES
	(3, 11, 25, '2024-03-04', 'Juan Pérez', 'Efectivo', 250000, 120, 300, 5000, NULL),
	(4, 11, 20, '2024-03-04', 'Juan Pérez', 'Transferencia', 50000000, 30, 20, 3000, NULL),
	(5, 12, 26, '2024-03-04', 'Juan Pérez', 'Efectivo', 2000, 400, 20, 0, NULL),
	(6, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333, NULL),
	(7, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333, NULL),
	(8, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333, NULL),
	(9, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333, NULL),
	(10, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333, NULL),
	(11, 1, 1, '2024-03-04', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 33333, 33333, NULL),
	(12, 2, 2, '2024-03-02', 'Juan Pérez', '', 3333333333, 3333333333, 0, 0, NULL),
	(13, 4, 28, '2024-03-02', 'Juan Pérez', 'Efectivo', 3333333333, 3333333333, 0, 0, NULL),
	(14, 17, 18, '2024-03-06', 'Juan Pérez', 'Transferencia', 25000, 1500, 0, 0, NULL),
	(15, 1, 1, '2024-03-06', 'Juan Pérez', 'Efectivo', 25000, 1500, 0, 0, NULL),
	(16, 1, 1, '2024-03-06', 'Juan Pérez', 'Efectivo', 25000, 1500, 0, 0, NULL),
	(17, 1, 1, '2024-03-06', 'Juan Pérez', 'Efectivo', 350, 1500, 0, 0, NULL),
	(18, 1, 1, '2024-03-06', 'Juan Pérez', 'Efectivo', 350, 56, 0, 0, NULL),
	(19, 1, 1, '2024-03-06', 'Juan Pérez', 'Efectivo', 350, 56, 0, 0, NULL),
	(20, 15, 19, '2024-03-28', 'Juan Pérez', 'Efectivo', 350, 56, 0, 0, NULL),
	(21, 4, 28, '2024-03-07', 'Juan Pérez', 'Efectivo', 9000, 20, 10, 200, 8770),
	(22, 4, 28, '2024-03-08', 'Juan Pérez', '', 0, 0, 0, 0, NULL),
	(23, 4, 28, '2024-03-08', 'Juan Pérez', 'Efectivo', 0, 0, 0, 0, NULL),
	(24, 4, 28, '2024-03-08', 'Juan Pérez', 'Efectivo', 0, 0, 0, 0, NULL),
	(25, 4, 28, '2024-03-08', 'Juan Pérez', 'Efectivo', 0, 0, 0, 0, NULL),
	(26, 4, 28, '2024-03-08', 'Juan Pérez', 'Efectivo', 0, 0, 0, 0, NULL),
	(27, 4, 28, '2024-03-08', 'Juan Pérez', 'Efectivo', 0, 0, 0, 0, NULL),
	(28, 4, 28, '2024-03-08', 'Juan Pérez', 'Efectivo', 0, 0, 0, 0, NULL),
	(29, 1, 34, '2024-03-13', 'Juan Pérez', '', 3000, 80, 90, 0, NULL),
	(30, 1, 33, '2024-03-13', 'Juan Pérez', 'Efectivo', 4444, 44, 44, 44, 4312),
	(31, 1, 33, '2024-03-13', 'Juan Pérez', 'Efectivo', 60000, 77, 77, 77, 59769),
	(32, 1, 33, '2024-03-13', 'Juan Pérez', 'Efectivo', 555, 5, 5, 5, 540),
	(33, 1, 34, '2024-03-13', 'Juan Pérez', 'Transferencia', 6666, 55, 44, 33, 6534),
	(34, 4, 28, '2024-03-13', 'Juan Pérez', 'Transferencia', 90000, 80, 700, NULL, NULL),
	(35, 4, 28, '2024-03-13', 'Juan Pérez', '', 6000, 40, 55, 7, 5898),
	(36, 1, 34, '2024-03-13', 'Juan Pérez', 'Transferencia', 777, 77, 77, 77, 546),
	(37, 4, 28, '2024-03-13', 'Juan Pérez', 'Efectivo', 5000, 300, 10, 20, 4670),
	(38, 4, 28, '2024-03-13', 'Juan Pérez', '', 6000, 20, 10, 2, 5968),
	(39, 4, 28, '2024-03-14', 'Juan Pérez', 'Efectivo', 50000, 300, 100, 200, 49400);
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
  `FechaPagoFija` date DEFAULT NULL,
  PRIMARY KEY (`IdContrato`),
  KEY `IdArrendatario` (`IdArrendatario`),
  KEY `IdInmueble` (`IdInmueble`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.contratoarrendamiento: 19 rows
/*!40000 ALTER TABLE `contratoarrendamiento` DISABLE KEYS */;
INSERT INTO `contratoarrendamiento` (`IdContrato`, `IdArrendatario`, `IdInmueble`, `FechaInicioContrato`, `FechaFinContrato`, `EstadoContrato`, `ValorDeposito`, `MesesAlquiler`, `CuotasPendientes`, `FechaPagoFija`) VALUES
	(2, 1, 2, '2023-11-02', '2025-05-02', 'Vigente', 1200000.00000, 18, 18, NULL),
	(3, 2, 9, '2023-12-02', '2024-03-02', 'Finalizado', 25000.00000, 3, 0, NULL),
	(4, 2, 18, '2023-12-03', '2024-11-03', 'Vigente', 2500000.00000, 11, 4, NULL),
	(5, 2, 20, '2254-05-12', '4444-04-15', 'Vigente', 52000.00000, 26279, 26279, NULL),
	(6, 27, 28, '2024-01-01', '2024-08-03', 'Vigente', 2500000.00000, 7, 2, NULL),
	(7, 27, 18, '2024-02-26', '2024-04-05', 'Finalizado', 520000.00000, 1, 0, NULL),
	(8, 2, NULL, '2222-12-12', '2223-03-12', 'Vigente', 800000.00000, 3, 3, NULL),
	(9, 2, 33, '2024-03-13', '2024-07-19', 'Vigente', 9000.00000, 4, 4, NULL),
	(10, 26, 35, '2024-02-29', '2024-08-01', 'Vigente', 30000.00000, 5, 3, NULL),
	(11, 30, 36, '2024-03-14', '2024-09-14', 'Vigente', 98000000.00000, 6, 6, NULL),
	(12, 2, NULL, '2024-03-14', '2024-11-14', 'Vigente', 90000.00000, 8, 8, NULL),
	(13, 1, NULL, '2024-03-14', '2025-02-14', 'Vigente', 3600000.00000, 11, 11, NULL),
	(14, 21, NULL, '2020-02-10', '2020-02-12', 'Vigente', 9000000.00000, 0, 0, NULL),
	(15, 21, 15, '2020-02-10', '2020-02-12', 'Vigente', 9000000.00000, 0, 0, NULL),
	(16, 21, 15, '2020-02-10', '2020-02-12', 'Vigente', 9000000.00000, 0, 0, NULL),
	(17, 26, 15, '2020-02-10', '2020-02-12', 'Vigente', 9000000.00000, 0, 0, NULL),
	(18, 2, NULL, '2024-03-01', '2024-04-05', 'Vigente', 8000.00000, 1, 1, NULL),
	(19, 1, 31, '2024-03-02', '2024-04-03', 'Vigente', 98989.00000, 1, 1, NULL),
	(20, 1, 31, '2024-03-02', '2024-04-03', 'Vigente', 98989.00000, 1, 1, NULL),
	(21, 29, 21, '2024-03-15', '2024-08-15', 'Vigente', 5000000.00000, 5, 5, '2024-03-15'),
	(22, 30, 27, '2024-03-15', '2025-04-15', 'Vigente', 5000000.00000, 13, 13, '2024-03-15'),
	(23, 30, 27, '2024-03-15', '2025-04-15', 'Vigente', 5000000.00000, 13, 13, '2024-03-15'),
	(24, 30, 27, '2024-03-15', '2025-04-15', 'Vigente', 5000000.00000, 13, 13, '2024-03-15'),
	(25, 30, 27, '2024-03-15', '2025-04-15', 'Vigente', 5000000.00000, 13, 13, '2024-03-15'),
	(26, 30, 27, '2024-03-15', '2025-04-15', 'Vigente', 5000000.00000, 13, 13, '2024-03-15'),
	(27, 27, 19, '2024-03-15', '2025-03-15', 'Vigente', 5000.00000, 12, 12, '2024-03-15');
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
  `VAseguramiento` date DEFAULT NULL,
  PRIMARY KEY (`IdInmueble`) USING BTREE,
  KEY `Id_Propietario` (`IdPropietario`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.inmueble: 30 rows
/*!40000 ALTER TABLE `inmueble` DISABLE KEYS */;
INSERT INTO `inmueble` (`IdInmueble`, `IdPropietario`, `NoMatricula`, `Direccion`, `Estrato`, `Ciudad`, `Barrio`, `Tipo`, `NoNiveles`, `NoBanos`, `ServiciosPublicos`, `NoHabitaciones`, `Estado`, `NoTerraza`, `AreaConstruidaM2`, `Aseguramiento`, `ValorInmueble`, `booleanos`, `Descripcion`, `VAseguramiento`) VALUES
	(11, 5, 2, 'Holas', '3', 'jhkjhjh', 'si soy', 'Apartamento', '1', '1', 'jhkjhkjhk', NULL, 'Ocupado', '2', NULL, '2024-02-12', 2000, 'true', 'trdfgjkjfdgfgf', NULL),
	(10, 4, 2, '+ñp', '1', '´l+p´+', 'pkk', 'Bodega', NULL, '2', 'p´´pp', NULL, 'Ocupado', NULL, NULL, NULL, 2000, 'true', 'lhjkljkhhj', NULL),
	(1, 1, 123456, 'Calle 456', '6', 'Ciudad A', 'Barrio X', 'Casa', '2', '2', 'Agua, EnergÃ­a', '3', 'Ocupado', '1', '120.5', '2024-03-01', 1500000, 'true', 'Casa de dos pisos', NULL),
	(9, 20, 1, 'kjlkjl', '1', 'kkjl', 'jhkjhk', 'Oficina', NULL, '2', 'cgkjkj', NULL, 'Disponible', NULL, NULL, '2024-03-01', 2000, 'true', 'uiuku', NULL),
	(2, 2, 67890, 'Avenida 789', '5', 'Ciudad B', 'Barrio Y', 'Apartamento', '1', '1', 'Agua, EnergÃ­a, Gas', '2', 'Disponible', '0', '80.5', '2024-06-01', 2000000, 'true', 'Apartamento con vista al mar', NULL),
	(12, 22, 900, 'fgff', '1', 'fdgfdg', 'dfgfdg', 'Apartamento', '9', '3', 'fgfgfdgfdfdfgfdg', NULL, 'Ocupado', '9', NULL, '2024-02-12', 8000, 'true', 'dfgfgfgf', NULL),
	(13, 25, 900, 'fgff', '8', 'fgfg', 'fhfh', 'Apartamento', '9', '2', 'sd', NULL, 'Ocupado', '6', NULL, '2024-02-12', 700, 'true', 'dfdfdf', NULL),
	(14, 14, 2, 'fdfd', '1', 'palmira', 'fhfh', 'Apartamento', '2', '2', 'fgffgf', NULL, 'Ocupado', '1', NULL, '2024-02-12', 1000000, 'true', '  n n n nvbvbbvbvvb', NULL),
	(15, 15, 896, 'calle #2 cr33', '3', 'palmira', 'dfdfd', 'Apartamento', '2', '9', 'jiisgsdjsdjdjss', NULL, 'Ocupado', '1', NULL, '2024-02-12', 2000, 'true', 'vgygg', NULL),
	(16, 16, 55, 'kj,k,kj,jk,', '4', 'fgfgfd', 'dfgfgfdg', 'Bodega', NULL, '5', 'gfgfgf', NULL, NULL, NULL, NULL, NULL, 20000, 'false', ',k.kl.jk.', NULL),
	(17, 16, 2001, 'carrera 90', '1', 'palmira', 'paraiso', 'Apartamento', '3', '3', 'agua y luz', NULL, NULL, '2', NULL, '2024-02-16', 200000, 'true', 'nada de mascotas', NULL),
	(18, 17, 200089, 'carrera 10 no 3 # 5e98', '4', 'villa hermosda', 'paraiso papa', 'Apartamento', '5', '7', '', NULL, 'Ocupado', '2', NULL, '2024-04-05', 3000000, 'true', 'no se permite perros', NULL),
	(19, 15, 564545, 'carrera nose', '4', 'hila', 'manuel', 'Apartamento', '6', '7', 'gua NOMAS', NULL, 'Ocupado', '2', NULL, '2004-05-12', 12000, 'true', 'jnsjdkdffds', NULL),
	(20, 11, 22555, 'carrera nose', '3', 'hila', 'manuel', 'Bodega', NULL, '3', 'gua NOMAS', NULL, 'Disponible', NULL, NULL, NULL, 2500, 'true', 'ggfgfdffdd', NULL),
	(21, 1, 22555, 'carrera nose', '3', 'hila', 'manuel', 'Bodega', NULL, '3', 'gua NOMAS', NULL, 'Ocupado', NULL, NULL, NULL, 2500, 'true', 'ggfgfdffdd', NULL),
	(22, 2, 22555, 'carrera nose', '3', 'hila', 'manuel', 'Bodega', NULL, '3', 'gua NOMAS', NULL, 'Disponible', NULL, NULL, NULL, 2500, 'true', 'ggfgfdffdd', NULL),
	(23, 5, 22555, 'carrera nose', '3', 'hila', 'manuel', 'Bodega', NULL, '3', 'gua NOMAS', NULL, 'Disponible', NULL, NULL, NULL, 2500, 'true', 'ggfgfdffdd', NULL),
	(24, 11, 45, 'nose por palmira', '4', 'hila', 'manuel', 'Bodega', NULL, '3', 'gua NOMAS', NULL, 'Disponible', NULL, NULL, NULL, 5536, 'true', 'dfdsfddssd', NULL),
	(25, 11, 4546, 'Calle 123', '6', 'hila', 'manueldfd', 'Bodega', NULL, '3', 'sdfs', NULL, 'Disponible', NULL, NULL, NULL, 20000, 'true', 'dfdsfsdfds', NULL),
	(26, 12, 456, 'nose por palmira', '4', 'gfdgfdgf', 'manuel', 'Casa', NULL, '4', 'sgfdgmg', NULL, 'Disponible', NULL, NULL, '2024-04-02', 20000, 'true', 'dfgifhdgifdgfg', NULL),
	(27, 17, 56465, 'carrera alcancela', '1', 'hila', 'encuentrela', 'Oficina', NULL, '7', 'gua NOMAS', NULL, 'Ocupado', NULL, NULL, '2024-03-30', 30000, 'true', 'dfdgfd', NULL),
	(28, 4, 455645646, 'carrera enbusca', '3', 'encuntrela', 'aqui en mi casa', 'Local', NULL, '8', 'lfjkvklfjg', NULL, 'Disponible', NULL, NULL, '2024-04-05', 20000, 'true', 'no kgatos gucataela', NULL),
	(29, 25, NULL, 'Calle 123', '4', 'Ciudad A', 'manuel', 'Apartamento', '2', NULL, 'gua NOMAS', NULL, 'Disponible', '1', NULL, '2024-03-06', 560000, 'true', 'no se permiten mascotas', NULL),
	(30, 25, NULL, 'nose por palmira', '3', 'hila', 'manuel', 'Apartamento', '9', NULL, 'gua NOMAS', NULL, 'Disponible', '7', NULL, '2024-03-07', 60000, 'true', 'jnjknjk', NULL),
	(31, 24, 65498489, 'nose por palmira', '4', 'Ciudad A', 'manuel', 'Oficina', NULL, '9', 'gua NOMAS', NULL, 'Ocupado', NULL, NULL, '2024-04-06', 23000, 'true', 'no hay agua', NULL),
	(32, 25, NULL, 'nose por palmira', '5', 'Ciudad A', 'Barrio X', 'Apartamento', '2', '4', 'gua NOMAS', '3', 'Disponible', '7', NULL, '2024-04-06', 50000, 'true', 'ggvh', NULL),
	(33, 1, 598489, 'nose por palmira', '3', 'Ciudad A', 'Barrio X', 'Apartamento', '1', '9', 'gua NOMAS', '7', 'Ocupado', '9', NULL, '2024-04-05', 3000, 'true', 'cydfhdjfh', NULL),
	(34, 1, 315456, 'gfghf', '1', 'fgfg', 'ghgfhfg', 'Apartamento', '2', '4', 'fghfghfgh', '1', 'Disponible', '2', NULL, '2024-04-05', 3000, 'false', 'ghgfhfghgf', NULL),
	(35, 21, 35224000, 'calle 6c 98-65', '4', 'Ciudad A', 'paraiso', 'Bodega', NULL, '6', 'agua NOMAS', NULL, 'Ocupado', NULL, NULL, '2024-10-19', 900000, 'true', 'No se permiten mascotas', NULL),
	(36, 26, 6598989, 'calle 6c 98-65', '6', 'Ciudad A', 'manuel', 'Bodega', NULL, '8', 'gas, agua, luz', '8', 'Ocupado', '5', NULL, '2024-10-04', 6000000, 'true', '', NULL);
/*!40000 ALTER TABLE `inmueble` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.pagos_arrendamiento
CREATE TABLE IF NOT EXISTS `pagos_arrendamiento` (
  `IdPagoArrendamiento` int NOT NULL AUTO_INCREMENT,
  `IdArrendatario` int unsigned DEFAULT NULL,
  `IdContrato` int DEFAULT NULL,
  `FechaPago` date DEFAULT NULL,
  `FechaPagoFija` date DEFAULT NULL,
  `ValorPago` int unsigned DEFAULT NULL,
  `FormaPago` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `DiasDMora` int DEFAULT NULL,
  `booleanos` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`IdPagoArrendamiento`) USING BTREE,
  KEY `Id_Arrendatario` (`IdArrendatario`) USING BTREE,
  KEY `IdContrato` (`IdContrato`)
) ENGINE=MyISAM AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.pagos_arrendamiento: 43 rows
/*!40000 ALTER TABLE `pagos_arrendamiento` DISABLE KEYS */;
INSERT INTO `pagos_arrendamiento` (`IdPagoArrendamiento`, `IdArrendatario`, `IdContrato`, `FechaPago`, `FechaPagoFija`, `ValorPago`, `FormaPago`, `Estado`, `DiasDMora`, `booleanos`) VALUES
	(1, 1, 1, '2024-03-02', NULL, 1500000, 'Transferencia', 'Pagado', 0, 'true'),
	(2, 2, NULL, '2024-03-16', NULL, 2000000, 'Efectivo', 'Pendiente', 5, 'true'),
	(3, 5, NULL, '2024-03-02', NULL, 500000, 'Transferencia', NULL, NULL, 'true'),
	(4, 6, NULL, '2024-03-02', NULL, 30000, 'Transferencia', 'Pagado', NULL, 'true'),
	(5, 8, NULL, '2024-03-02', NULL, 5000000, 'Efectivo', 'Pagado', NULL, 'true'),
	(6, 2, NULL, '2024-03-02', NULL, 20000, 'Efectivo', 'Pagado', NULL, 'true'),
	(7, 2, NULL, '2024-03-02', NULL, 20000, 'Efectivo', 'Pagado', NULL, 'true'),
	(8, 2, 4, '2024-03-03', NULL, 20000, 'Efectivo', 'Pagado', NULL, 'true'),
	(9, 1, 2, '2024-03-03', NULL, 1200000, 'Efectivo', 'Pagado', NULL, 'true'),
	(10, 2, 4, '2024-03-03', NULL, 1200000, 'Efectivo', 'Pagado', NULL, 'true'),
	(11, 2, 4, '2024-03-03', NULL, 50000, 'Efectivo', 'Pagado', NULL, 'true'),
	(12, 2, 4, '2024-03-03', NULL, 2000, 'Efectivo', 'Pagado', NULL, 'true'),
	(13, 2, 4, '2024-03-03', NULL, 2000, 'Efectivo', 'Pagado', NULL, 'true'),
	(14, 1, 2, '2024-03-04', NULL, 1123456789, 'Efectivo', 'Pagado', NULL, 'true'),
	(15, 2, 4, '2024-03-04', NULL, 123, 'Efectivo', 'Pagado', NULL, 'true'),
	(16, 2, 4, '2024-03-06', NULL, 3000, 'Efectivo', 'Pagado', NULL, 'true'),
	(17, 2, 4, '2024-03-06', NULL, 300, 'Transferencia', 'Pagado', NULL, 'true'),
	(18, 2, 4, '2024-03-06', NULL, 99999, 'Efectivo', 'Pagado', NULL, 'true'),
	(19, 2, 4, '2024-03-06', NULL, 65444, 'Efectivo', 'Pagado', NULL, 'true'),
	(20, 2, 4, '2024-03-06', NULL, 65656, 'Efectivo', 'Pagado', NULL, 'true'),
	(21, 2, 4, '2024-03-06', NULL, 65656, 'Efectivo', 'Pagado', NULL, 'true'),
	(22, 2, 4, '2024-03-06', NULL, 65656, 'Efectivo', 'Pagado', NULL, 'true'),
	(23, 2, 3, '2024-03-06', NULL, 25000, 'Transferencia', 'Pagado', NULL, 'true'),
	(24, 2, 3, '2024-03-06', NULL, 26000, 'Transferencia', 'Pagado', NULL, 'true'),
	(25, 2, 3, '2024-03-06', NULL, 36000, 'Efectivo', 'Pagado', NULL, 'true'),
	(26, 2, 3, '2024-03-06', NULL, 6000, 'Efectivo', 'Pagado', NULL, 'true'),
	(27, 2, 3, '2024-03-06', NULL, 20, 'Efectivo', 'Pagado', NULL, 'true'),
	(28, 2, 3, '2024-03-06', NULL, 36000, 'Efectivo', 'Pagado', NULL, 'true'),
	(29, 27, 6, '2024-03-06', NULL, 560000, 'Efectivo', 'Pagado', NULL, 'true'),
	(30, 27, 7, '2024-03-06', NULL, 5000, 'Efectivo', 'Pagado', NULL, 'true'),
	(31, 2, 4, '2024-03-07', NULL, 500000, 'Transferencia', 'Pagado', -14, 'true'),
	(32, 2, 4, '2024-03-07', NULL, 30000, 'Efectivo', 'Pagado', 11, 'true'),
	(33, 27, 6, '2024-03-07', NULL, 30000, 'Efectivo', 'Pagado', 6, 'true'),
	(34, 2, 4, '2024-03-07', NULL, 65562, 'Transferencia', 'Pagado', -2039, 'true'),
	(35, 2, 4, '2024-03-07', NULL, 900000, 'Efectivo', 'Pagado', 1468, 'true'),
	(36, 27, 6, '2024-03-08', NULL, 500000, 'Efectivo', 'Pagado', -29, 'true'),
	(37, 2, 4, '2024-03-08', NULL, 3000, 'Efectivo', 'Pagado', -19, 'true'),
	(38, 2, 4, '2024-03-08', NULL, 30000, 'Efectivo', 'Pagado', -72303, 'true'),
	(39, 2, 4, '2024-03-08', NULL, 3030, 'Efectivo', 'Pagado', -478125, 'true'),
	(40, 27, 6, '2024-03-13', NULL, 9000, 'Efectivo', 'Pagado', -14, 'true'),
	(41, 27, 6, '2024-03-13', NULL, 333333, 'Efectivo', 'Pagado', 617608, 'true'),
	(42, 26, 10, '2024-03-13', NULL, 8000, 'Transferencia', 'Pagado', -43, 'true'),
	(43, 26, 10, '2024-03-13', NULL, 3000, 'Efectivo', 'Pagado', 8, 'true'),
	(44, 30, 25, NULL, '2024-03-15', NULL, NULL, NULL, NULL, 'true'),
	(45, 30, 26, NULL, '2024-03-15', NULL, NULL, NULL, NULL, 'true'),
	(46, 30, 26, NULL, '2024-04-15', NULL, NULL, NULL, NULL, 'true'),
	(47, 30, 26, NULL, '2024-05-15', NULL, NULL, NULL, NULL, 'true'),
	(48, 30, 26, NULL, '2024-06-15', NULL, NULL, NULL, NULL, 'true'),
	(49, 30, 26, NULL, '2024-07-15', NULL, NULL, NULL, NULL, 'true'),
	(50, 30, 26, NULL, '2024-08-15', NULL, NULL, NULL, NULL, 'true'),
	(51, 30, 26, NULL, '2024-09-15', NULL, NULL, NULL, NULL, 'true'),
	(52, 30, 26, NULL, '2024-10-15', NULL, NULL, NULL, NULL, 'true'),
	(53, 30, 26, NULL, '2024-11-15', NULL, NULL, NULL, NULL, 'true'),
	(54, 30, 26, NULL, '2024-12-15', NULL, NULL, NULL, NULL, 'true'),
	(55, 30, 26, NULL, '2025-01-15', NULL, NULL, NULL, NULL, 'true'),
	(56, 30, 26, NULL, '2025-02-15', NULL, NULL, NULL, NULL, 'true'),
	(57, 30, 26, NULL, '2025-03-15', NULL, NULL, NULL, NULL, 'true'),
	(58, 27, 27, NULL, '2024-03-15', NULL, NULL, NULL, NULL, 'true'),
	(59, 27, 27, NULL, '2024-04-15', NULL, NULL, NULL, NULL, 'true'),
	(60, 27, 27, NULL, '2024-05-15', NULL, NULL, NULL, NULL, 'true'),
	(61, 27, 27, NULL, '2024-06-15', NULL, NULL, NULL, NULL, 'true'),
	(62, 27, 27, NULL, '2024-07-15', NULL, NULL, NULL, NULL, 'true'),
	(63, 27, 27, NULL, '2024-08-15', NULL, NULL, NULL, NULL, 'true'),
	(64, 27, 27, NULL, '2024-09-15', NULL, NULL, NULL, NULL, 'true'),
	(65, 27, 27, NULL, '2024-10-15', NULL, NULL, NULL, NULL, 'true'),
	(66, 27, 27, NULL, '2024-11-15', NULL, NULL, NULL, NULL, 'true'),
	(67, 27, 27, NULL, '2024-12-15', NULL, NULL, NULL, NULL, 'true'),
	(68, 27, 27, NULL, '2025-01-15', NULL, NULL, NULL, NULL, 'true'),
	(69, 27, 27, NULL, '2025-02-15', NULL, NULL, NULL, NULL, 'true');
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
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.propietario: 37 rows
/*!40000 ALTER TABLE `propietario` DISABLE KEYS */;
INSERT INTO `propietario` (`IdPropietario`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Direccion`, `Telefono`, `Correo`, `Banco`, `TipoCuenta`, `NumeroCuenta`, `booleanos`, `FechaIngreso`) VALUES
	(1, 'David Gonzales A', 'Cedula Ciudadania', '123456789', 'Calle 1234', '1234567890', 'juan@gmail.com', 'Banco A', 'Cuenta Ahorros', '987654321', 'true', '2024-03-13'),
	(2, 'María González', 'Cedula Extranjera', '987654321', 'Avenida 456', '4294967295', 'maria@gmail.com', 'Banco B', 'Cuenta Ahorro', '123456789', 'true', '2024-01-10'),
	(4, 'Juan Arenas', 'Cedula Ciudadania', '1114541165', 'crrera 80 #7 e 98', '3132025146', 'jua@gmail.com', 'aveces', 'Cuenta Ahorros', '1234567890', 'true', '2024-02-28'),
	(5, 'Agustin Manuel', 'Cedula Ciudadania', '213456789', 'carrera nose', '123455', 'pedro@gmail.coms', 'av villa', 'Cuenta Ahorros', '1234567890', 'true', '2024-02-28'),
	(6, 'Jose', 'Cedula Ciudadania', '1234567890', 'carrera 89 6b esquina', '4294967295', 'juandeq16@gmail.com', 'We', 'Cuenta Corriente', '1234567890', 'true', '2024-02-28'),
	(7, 'pachos', 'Cedula Ciudadania', '36098', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(8, 'pachoss', 'Cedula Ciudadania', '360984', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(9, 'pachosss', 'Cedula Ciudadania', '360989', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(11, 'pancho', 'Cedula Ciudadania', '951357', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(12, 'ricardo', 'Cedula Extranjera', '1016713467', 'villa de las palmas', '3215064879', 'richardforever@gmail.com', 'Banco bogota', 'Cuenta Corriente', '2564258697', 'true', '2024-03-02'),
	(13, 'quijontes', 'Cedula Ciudadania', '456321547', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(14, 'quijontes richi', 'Cedula Ciudadania', '1114578965', 'nose por palmira', '3132025146', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(15, 'flin david', 'Cedula Ciudadania', '1233212', 'nose por palmira', '32150412', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(16, '12', 'Cedula Ciudadania', '45685123', 'fsfsfdsd', '32150412', 'pacho@gmail.com', 'av villa', 'Cuenta Ahorros', '20000', 'true', '2024-03-02'),
	(17, 'emiliano', 'Cedula Extranjera', '145415487', 'carrera 10 no 3 # 5e98', '321654759', 'juan@gmail.com', 'av villa', 'Cuenta Corriente', '2022254416356', 'true', '2024-02-28'),
	(21, 'Ingryd Insegura', 'Cedula Extranjera', '46564', 'Calle 123', '3225445717', 'Ingryy@gmail.com', 'Nequi', 'Cuenta Corriente', '112233', 'true', '2024-02-28'),
	(22, 'intentoo', 'Cedula Ciudadania', '1234567', 'noseque poner', '12345678', 'descobarquezada@gmailcom', 'Wers', 'Cuenta Ahorros', '23456789', 'true', '2024-02-28'),
	(23, 'Mariano ortega', 'Cedula Ciudadania', '659788', 'calle 96 #5 a 78', '12345678', 'juandeq16@gmail.com', 'avecesss', 'Cuenta Ahorros', '123456789011', 'true', '2024-02-28'),
	(24, 'peter el anguila', 'Cedula Ciudadania', '1234567890', 'calle 6c 98-65', '123456789', 'sdfd@gmial-com', 'nequi', 'Cuenta Ahorros', '123456789011', 'true', '2024-03-04'),
	(25, 'Yeison waldir', 'Cedula Ciudadania', '25689711', 'nose por palmira', '12345678', 'descobarquezada@gmailcom', 'av villa', 'Cuenta Ahorros', '2500265', 'true', '2024-03-06'),
	(26, 'Gaston', '', NULL, 'Calle 123', '1234567890', 'gaston@gmail.com', 'avvilla', NULL, '6545566689855', 'true', NULL),
	(27, 'manuel', 'Cedula Extranjeria', NULL, 'Calle 123', '1234567890', 'gaston@gmail.com', 'bobta', NULL, 'cvxxcx', 'true', NULL),
	(28, 'segura Vannessa', '', NULL, 'Calle 123', '1234567890', 'gaston@gmail.com', 'Banco A', NULL, '1234567890', 'true', NULL),
	(29, 'juan ayuda', '', NULL, 'nose por palmira', '3132025146', 'ingrid@gmail.com', ',m,j', NULL, '454225', 'true', NULL),
	(30, NULL, '', NULL, '', '', '', NULL, NULL, NULL, 'true', NULL),
	(31, NULL, '', NULL, 'nose por palmira', '3132025146', 'ingrid@gmail.com', 'Nequi', NULL, '65695665', 'true', '2024-03-15'),
	(32, 'maniales', 'Cedula Ciudadania', '212002', 'nose por palmira', '3132025146', 'ingrid@gmail.co,', 'kikk', '', '57454545', 'true', '2024-03-13'),
	(33, '', '', '', '', '', '', NULL, '', '', 'true', '2024-03-15'),
	(34, 'manuelita', 'Cedula Ciudadania', '564669', 'Calle 1234', '1234567890', 'juan4@gmail.com', 'kikk', 'Cuenta Ahorros', '57454545', 'true', '2024-03-15'),
	(35, 'manuelitas', 'Cedula Ciudadania', '5646694', 'Calle 1234', '123456789', 'juan4@gmail.com', 'kikk', 'Cuenta Ahorros', '57454545', 'true', '2024-03-15'),
	(36, 'judas', 'Cedula Extranjeria', '5646694', 'Calle 1234', '1234567890', 'juan4@gmail.com', 'kikk', 'Cuenta Corriente', '57454545', 'true', '2024-03-15'),
	(37, '', '', '', '', '', '', NULL, '', '', 'true', '2024-03-15'),
	(38, 'emilio', 'Pasaporte', '1234567890', 'Calle 123', '12345678', 'juan@gmail.com', 'edfdfd', 'Cuenta Ahorros', '4544353', 'true', '2024-03-15'),
	(39, 'emilios', 'Cedula Extranjeria', '1234567890', 'Calle 123', '12345678', 'juan@gmail.com', 'edfdfd', 'Cuenta Ahorros', '4544353', 'true', '2024-03-15'),
	(40, 'emilios2', 'Pasaporte', '1234567890', 'Calle 123', '12345678', 'juan@gmail.com', 'edfdfd', 'Cuenta Corriente', '4544353', 'true', '2024-03-15'),
	(41, 'emilios3', 'Cedula Extranjeria', '1234567890', 'Calle 123', '12345678', 'juan@gmail.com', 'edfdfd', 'Cuenta Ahorros', '4544353', 'true', '2024-03-15'),
	(42, 'emilios4', 'Cedula Extranjeria', '1234567890', 'Calle 123', '12345678', 'juan@gmail.com', 'edfdfd', 'Cuenta Ahorros', '4544353', 'true', '2024-03-15');
/*!40000 ALTER TABLE `propietario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `Idrol` int NOT NULL AUTO_INCREMENT,
  `NombreRol` varchar(50) NOT NULL,
  PRIMARY KEY (`Idrol`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.rol: 3 rows
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` (`Idrol`, `NombreRol`) VALUES
	(1, 'Administrador'),
	(2, 'Empleado'),
	(3, 'SuperUsuario');
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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.trabajador: 4 rows
/*!40000 ALTER TABLE `trabajador` DISABLE KEYS */;
INSERT INTO `trabajador` (`IdTrabajador`, `Nombre`, `Apellido`, `Correo`, `Contrasena`, `Telefono`, `Idrol`, `Booleanos`) VALUES
	(1, 'Juan', 'Pérez', 'juan@example.com', 'contraseña123', '555-1234', 1, 'true'),
	(2, 'María Sambrano', 'Gómez    ', 'maria@example.com    ', 'contraseña456    ', '555-5678', 2, 'true'),
	(5, 'Arenas', 'Quezad', 'juan@gmail.com', '12345', '3132025146', 3, 'true'),
	(6, 'Arenas', 'Quezad', 'ramy@gmail.com', '65878544', '3132025146', 1, 'true');
/*!40000 ALTER TABLE `trabajador` ENABLE KEYS */;

-- Volcando estructura para disparador adminmuebles.After_Insert_ContratoArrendamiento
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `After_Insert_ContratoArrendamiento` AFTER INSERT ON `contratoarrendamiento` FOR EACH ROW BEGIN
    -- Actualizar estado del inmueble a 'Ocupado' cuando se crea un nuevo contrato
    UPDATE inmueble
    SET Estado = 'Ocupado'
    WHERE IdInmueble = NEW.IdInmueble;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador adminmuebles.After_Insert_PagosArrendamiento
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `After_Insert_PagosArrendamiento` AFTER INSERT ON `pagos_arrendamiento` FOR EACH ROW BEGIN
    -- Actualizar estado de contrato y disponible en inmueble cuando CuotasPendientes llega a 0
    -- UPDATE contratoarrendamiento
    -- SET EstadoContrato = 'Finalizado'
    -- WHERE CuotasPendientes = 1 AND IdContrato = NEW.IdContrato;

    UPDATE inmueble
    SET Estado = 'Disponible'
    WHERE IdInmueble IN (SELECT IdInmueble FROM contratoarrendamiento WHERE CuotasPendientes = 0 AND IdContrato = NEW.IdContrato);

    -- Actualizar cuotaspendientes en contratoarrendamiento al agregar un nuevo pago
    -- UPDATE contratoarrendamiento c
    -- SET CuotasPendientes = CuotasPendientes - 1
    -- WHERE c.IdContrato = NEW.IdContrato;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador adminmuebles.Before_Insert_ContratoArrendamiento
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
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

-- Volcando estructura para disparador adminmuebles.Before_Insert_PagosArrendamiento
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `Before_Insert_PagosArrendamiento` BEFORE INSERT ON `pagos_arrendamiento` FOR EACH ROW BEGIN
    

    -- Calcular la diferencia de días entre FechaFin y FechaPago y asignar a la columna DiasDMora
    SET NEW.DiasDMora = DATEDIFF(NEW.FechaPago, NEW.FechaPagoFija);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador adminmuebles.generar_pagos
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `generar_pagos` AFTER INSERT ON `contratoarrendamiento` FOR EACH ROW BEGIN
    DECLARE fecha_pago DATE;
    DECLARE diferencia_meses INT;
    DECLARE i INT;

    SET fecha_pago = NEW.FechaInicioContrato;
    SET diferencia_meses = TIMESTAMPDIFF(MONTH, NEW.FechaInicioContrato, NEW.FechaFinContrato);

    SET i = 0;
    WHILE i < diferencia_meses DO
        INSERT INTO pagos_arrendamiento (IdArrendatario, IdContrato, FechaPago, FechaPagoFija, ValorPago, FormaPago)
        VALUES (NEW.IdArrendatario, NEW.IdContrato,NULL, ADDDATE(fecha_pago, INTERVAL i MONTH), NULL, NULL);
        SET i = i + 1;
    END WHILE;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
