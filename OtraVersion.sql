-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.1.72-community - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla adminmuebles.arrendatario
CREATE TABLE IF NOT EXISTS `arrendatario` (
  `IdArrendatario` int(11) NOT NULL AUTO_INCREMENT,
  `IdCodeudor` int(10) unsigned DEFAULT NULL,
  `NombreCompleto` varchar(100) DEFAULT NULL,
  `TipoDocumento` varchar(50) DEFAULT NULL,
  `DocumentoIdentidad` int(10) unsigned DEFAULT NULL,
  `Telefono` int(10) unsigned DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `booleanos` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`IdArrendatario`) USING BTREE,
  KEY `Id_Codeudor` (`IdCodeudor`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.arrendatario: 3 rows
/*!40000 ALTER TABLE `arrendatario` DISABLE KEYS */;
INSERT INTO `arrendatario` (`IdArrendatario`, `IdCodeudor`, `NombreCompleto`, `TipoDocumento`, `DocumentoIdentidad`, `Telefono`, `Correo`, `Estado`, `booleanos`) VALUES
	(1, 1, 'Carlos López', 'CC', 111222333, 1112223334, 'carlos@gmail.com', 'Vigente', 'true'),
	(2, 2, 'Ana Rodríguez', 'CE', 444555666, 4294967295, 'ana@gmail.com', 'Vigente', 'true'),
	(12, NULL, 'Juan', 'CC', 111211, 313202545, 'Juan@gmail.com', NULL, 'true');
/*!40000 ALTER TABLE `arrendatario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.codeudor
CREATE TABLE IF NOT EXISTS `codeudor` (
  `IdCodeudor` int(11) NOT NULL AUTO_INCREMENT,
  `NombreCompleto` varchar(100) DEFAULT NULL,
  `TipoDocumento` varchar(50) DEFAULT NULL,
  `DocumentoIdentidad` int(10) unsigned DEFAULT NULL,
  `Telefono` int(10) unsigned DEFAULT NULL,
  `Correo` varchar(250) DEFAULT NULL,
  `Direccion` varchar(150) DEFAULT NULL,
  `booleanos` varchar(10) DEFAULT 'true' COMMENT 'Datos booleanos si esta activo mostrar de lo contario no mostrar',
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
  `IdComisionPropietario` int(11) NOT NULL AUTO_INCREMENT,
  `IdPropietario` int(10) unsigned DEFAULT NULL,
  `FechaElaboracion` date DEFAULT NULL,
  `PeriodoPagado` date DEFAULT NULL,
  `ElaboradoPor` varchar(100) DEFAULT NULL,
  `ValorArriendo` int(10) unsigned DEFAULT NULL,
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
  `IdContrato` int(11) NOT NULL AUTO_INCREMENT,
  `IdArrendatario` int(11) DEFAULT NULL,
  `FechaInicioContrato` date NOT NULL,
  `FechaFinContrato` date NOT NULL,
  `EstadoContrato` varchar(50) DEFAULT NULL,
  `ValorDeposito` decimal(20,5) DEFAULT NULL,
  `MesesAlquiler` int(11) DEFAULT NULL,
  `CuotasPendientes` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdContrato`),
  KEY `IdArrendatario` (`IdArrendatario`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.contratoarrendamiento: 0 rows
/*!40000 ALTER TABLE `contratoarrendamiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `contratoarrendamiento` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.inmueble
CREATE TABLE IF NOT EXISTS `inmueble` (
  `IdInmueble` int(11) NOT NULL AUTO_INCREMENT,
  `IdArrendatario` int(10) unsigned DEFAULT NULL,
  `IdPropietario` int(10) unsigned DEFAULT NULL,
  `NoMatricula` int(10) unsigned DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Estrato` int(11) DEFAULT NULL,
  `Ciudad` varchar(100) DEFAULT NULL,
  `Barrio` varchar(100) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `NoNiveles` int(11) DEFAULT NULL,
  `NoBanos` int(11) DEFAULT NULL,
  `ServiciosPublicos` varchar(700) DEFAULT NULL,
  `NoHabitaciones` int(11) DEFAULT NULL,
  `Estado` varchar(100) DEFAULT NULL,
  `NoTerraza` int(11) DEFAULT NULL,
  `AreaConstruidaM2` float DEFAULT NULL,
  `Aseguramiento` date DEFAULT NULL,
  `ValorInmueble` int(10) unsigned DEFAULT NULL,
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
  `IdPagoArrendamiento` int(11) NOT NULL AUTO_INCREMENT,
  `IdArrendatario` int(10) unsigned DEFAULT NULL,
  `IdContrato` int(11) DEFAULT NULL,
  `FechaPago` date DEFAULT NULL,
  `FechaInicio` date DEFAULT NULL,
  `FechaFin` date DEFAULT NULL,
  `ValorPago` int(10) unsigned DEFAULT NULL,
  `FormaPago` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `DiasDMora` int(11) DEFAULT NULL,
  `booleanos` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`IdPagoArrendamiento`) USING BTREE,
  KEY `Id_Arrendatario` (`IdArrendatario`) USING BTREE,
  KEY `IdContrato` (`IdContrato`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.pagos_arrendamiento: 2 rows
/*!40000 ALTER TABLE `pagos_arrendamiento` DISABLE KEYS */;
INSERT INTO `pagos_arrendamiento` (`IdPagoArrendamiento`, `IdArrendatario`, `IdContrato`, `FechaPago`, `FechaInicio`, `FechaFin`, `ValorPago`, `FormaPago`, `Estado`, `DiasDMora`, `booleanos`) VALUES
	(1, 1, NULL, '2024-03-02', '2024-03-01', '2024-03-15', 1500000, 'Transferencia', 'Pagado', 0, 'true'),
	(2, 2, NULL, '2024-03-16', '2024-03-16', '2024-03-31', 2000000, 'Efectivo', 'Pendiente', 5, 'true');
/*!40000 ALTER TABLE `pagos_arrendamiento` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.propietario
CREATE TABLE IF NOT EXISTS `propietario` (
  `IdPropietario` int(11) NOT NULL AUTO_INCREMENT,
  `NombreCompleto` varchar(100) DEFAULT NULL,
  `TipoDocumento` varchar(50) DEFAULT NULL,
  `DocumentoIdentidad` int(10) unsigned DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Telefono` int(10) unsigned DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `Banco` varchar(100) DEFAULT NULL,
  `TipoCuenta` varchar(50) DEFAULT NULL,
  `NumeroCuenta` bigint(20) unsigned DEFAULT NULL,
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
  `Idrol` int(11) NOT NULL AUTO_INCREMENT,
  `NombreRol` varchar(50) NOT NULL,
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
  `IdTrabajador` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Idrol` int(11) DEFAULT NULL,
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

-- Volcando estructura para disparador adminmuebles.Before_Insert_ContratoArrendamiento
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='';
DELIMITER //
CREATE TRIGGER `Before_Insert_ContratoArrendamiento` BEFORE INSERT ON `contratoarrendamiento` FOR EACH ROW BEGIN
    SET NEW.MesesAlquiler = TIMESTAMPDIFF(MONTH, NEW.FechaInicioContrato, NEW.FechaFinContrato);
    SET NEW.CuotasPendientes = NEW.MesesAlquiler - (
        SELECT COUNT(*) FROM PagoArrendamiento
        WHERE IdArrendatario = NEW.IdArrendatario
    );
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
