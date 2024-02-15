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
  `Id_Arrendatario` int NOT NULL AUTO_INCREMENT,
  `Id_Codeudor` int unsigned DEFAULT NULL,
  `Nombre_Completo` varchar(100) DEFAULT NULL,
  `Tipo_Documento` varchar(50) DEFAULT NULL,
  `Documento_Identidad` int unsigned DEFAULT NULL,
  `Telefono` int unsigned DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `Cuotas_Pagadas` int DEFAULT NULL,
  `Siguiente_Cuota` date DEFAULT NULL,
  `Cuotas_Pendientes` int DEFAULT NULL,
  `Fecha_Inicio_Contrato` date DEFAULT NULL,
  `Fecha_Fin_Contrato` date DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `Valor_Deposito` decimal(20,5) DEFAULT NULL,
  PRIMARY KEY (`Id_Arrendatario`),
  KEY `Id_Codeudor` (`Id_Codeudor`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.arrendatario: 2 rows
DELETE FROM `arrendatario`;
/*!40000 ALTER TABLE `arrendatario` DISABLE KEYS */;
INSERT INTO `arrendatario` (`Id_Arrendatario`, `Id_Codeudor`, `Nombre_Completo`, `Tipo_Documento`, `Documento_Identidad`, `Telefono`, `Correo`, `Cuotas_Pagadas`, `Siguiente_Cuota`, `Cuotas_Pendientes`, `Fecha_Inicio_Contrato`, `Fecha_Fin_Contrato`, `Estado`, `Valor_Deposito`) VALUES
	(1, 1, 'Carlos LÃ³pez', NULL, 111222333, 1112223334, 'carlos@gmail.com', 5, '2024-03-01', 7, '2024-01-01', '2024-12-31', 'Vigente', 30000000.00000),
	(2, 2, 'Ana RodrÃ­guez', NULL, 444555666, 4294967295, 'ana@gmail.com', 10, '2024-03-15', 5, '2023-12-01', '2024-11-30', 'Vigente', NULL);
/*!40000 ALTER TABLE `arrendatario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.codeudor
CREATE TABLE IF NOT EXISTS `codeudor` (
  `Id_Codeudor` int NOT NULL AUTO_INCREMENT,
  `Nombre_Completo` varchar(100) DEFAULT NULL,
  `Documento_Identidad` int unsigned DEFAULT NULL,
  `Telefono` int unsigned DEFAULT NULL,
  `Correo` varchar(250) DEFAULT NULL,
  `Direccion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`Id_Codeudor`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.codeudor: 2 rows
DELETE FROM `codeudor`;
/*!40000 ALTER TABLE `codeudor` DISABLE KEYS */;
INSERT INTO `codeudor` (`Id_Codeudor`, `Nombre_Completo`, `Documento_Identidad`, `Telefono`, `Correo`, `Direccion`) VALUES
	(1, 'Pedro RamÃ­rez', 777888999, 4294967295, 'pedro@gmail.com', 'Calle 789'),
	(2, 'Laura MartÃ­nez', 333444555, 3334445556, 'laura@gmail.com', 'Avenida 012');
/*!40000 ALTER TABLE `codeudor` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.inmueble
CREATE TABLE IF NOT EXISTS `inmueble` (
  `Id_Inmueble` int NOT NULL AUTO_INCREMENT,
  `Id_Arrendatario` int unsigned DEFAULT NULL,
  `Id_Propietario` int unsigned DEFAULT NULL,
  `No_Matricula` int unsigned DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Estrato` int DEFAULT NULL,
  `Ciudad` varchar(100) DEFAULT NULL,
  `Barrio` varchar(100) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `No_Niveles` int DEFAULT NULL,
  `Valor_Inmueble` int unsigned DEFAULT NULL,
  `No_Banos` int DEFAULT NULL,
  `Servicios_Publicos` varchar(700) DEFAULT NULL,
  `No_Habitaciones` int DEFAULT NULL,
  `Estado` varchar(100) DEFAULT NULL,
  `No_Terraza` int DEFAULT NULL,
  `Area_Construida_m2` float DEFAULT NULL,
  `Aseguramiento` date DEFAULT NULL,
  `Descripcion` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`Id_Inmueble`),
  KEY `Id_Arrendatario` (`Id_Arrendatario`),
  KEY `Id_Propietario` (`Id_Propietario`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.inmueble: 10 rows
DELETE FROM `inmueble`;
/*!40000 ALTER TABLE `inmueble` DISABLE KEYS */;
INSERT INTO `inmueble` (`Id_Inmueble`, `Id_Arrendatario`, `Id_Propietario`, `No_Matricula`, `Direccion`, `Estrato`, `Ciudad`, `Barrio`, `Tipo`, `No_Niveles`, `Valor_Inmueble`, `No_Banos`, `Servicios_Publicos`, `No_Habitaciones`, `Estado`, `No_Terraza`, `Area_Construida_m2`, `Aseguramiento`, `Descripcion`) VALUES
	(11, NULL, NULL, 2, 'jkjhkjh', 3, 'jhkjhjh', 'jhkjhkjh', 'Apartamento', 1, 2000, 1, 'jhkjhkjhk', NULL, NULL, 2, NULL, '2024-02-12', 'trdfgjkjfdgfgf'),
	(10, NULL, NULL, 2, '+ñp', 1, '´l+p´+', 'pkk', 'Bodega', NULL, 2000, 2, 'p´´pp', NULL, NULL, NULL, NULL, NULL, 'lhjkljkhhj'),
	(1, 1, 1, 12345, 'Calle 456', 4, 'Ciudad A', 'Barrio X', 'Casa', 2, 1500000, 2, 'Agua, EnergÃ­a', 3, 'Desocupado', 1, 120.5, '2024-03-01', 'Casa de dos pisos'),
	(9, NULL, NULL, 1, 'kjlkjl', 1, 'kkjl', 'jhkjhk', 'Oficina', NULL, 2000, 2, 'cgkjkj', NULL, NULL, NULL, NULL, '2024-03-01', 'uiuku'),
	(2, 2, 2, 67890, 'Avenida 789', 5, 'Ciudad B', 'Barrio Y', 'Apartamento', 1, 2000000, 1, 'Agua, EnergÃ­a, Gas', 2, 'Ocupado', 0, 80.5, '2024-06-01', 'Apartamento con vista al mar'),
	(12, NULL, NULL, 900, 'fgff', 1, 'fdgfdg', 'dfgfdg', 'Apartamento', 9, 8000, 3, 'fgfgfdgfdfdfgfdg', NULL, NULL, 9, NULL, '2024-02-12', 'dfgfgfgf'),
	(13, NULL, NULL, 900, 'fgff', 8, 'fgfg', 'fhfh', 'Apartamento', 9, 700, 2, 'sd', NULL, NULL, 6, NULL, '2024-02-12', 'dfdfdf'),
	(14, NULL, NULL, 2, 'fdfd', 1, 'palmira', 'fhfh', 'Apartamento', 2, 1000000, 2, 'fgffgf', NULL, NULL, 1, NULL, '2024-02-12', '  n n n nvbvbbvbvvb'),
	(15, NULL, NULL, 896, 'calle #2 cr33', 3, 'palmira', 'dfdfd', 'Apartamento', 2, 2000, 9, 'jiisgsdjsdjdjss', NULL, NULL, 1, NULL, '2024-02-12', 'vgygg'),
	(16, NULL, NULL, 55, 'kj,k,kj,jk,', 4, 'fgfgfd', 'dfgfgfdg', 'Bodega', NULL, 20000, 5, 'gfgfgf', NULL, NULL, NULL, NULL, NULL, ',k.kl.jk.');
/*!40000 ALTER TABLE `inmueble` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.pagos_arrendatario
CREATE TABLE IF NOT EXISTS `pagos_arrendatario` (
  `Id_Pago_Arrendatario` int NOT NULL AUTO_INCREMENT,
  `Id_Arrendatario` int unsigned DEFAULT NULL,
  `Fecha_Pago` date DEFAULT NULL,
  `Fecha_Inicio` date DEFAULT NULL,
  `Fecha_Fin` date DEFAULT NULL,
  `Valor_Pago` int unsigned DEFAULT NULL,
  `Forma_Pago` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `Dias_De_Mora` int DEFAULT NULL,
  PRIMARY KEY (`Id_Pago_Arrendatario`),
  KEY `Id_Arrendatario` (`Id_Arrendatario`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.pagos_arrendatario: 2 rows
DELETE FROM `pagos_arrendatario`;
/*!40000 ALTER TABLE `pagos_arrendatario` DISABLE KEYS */;
INSERT INTO `pagos_arrendatario` (`Id_Pago_Arrendatario`, `Id_Arrendatario`, `Fecha_Pago`, `Fecha_Inicio`, `Fecha_Fin`, `Valor_Pago`, `Forma_Pago`, `Estado`, `Dias_De_Mora`) VALUES
	(1, 1, '2024-03-02', '2024-03-01', '2024-03-15', 1500000, 'Transferencia', 'Pagado', 0),
	(2, 2, '2024-03-16', '2024-03-16', '2024-03-31', 2000000, 'Efectivo', 'Pendiente', 5);
/*!40000 ALTER TABLE `pagos_arrendatario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.propietario
CREATE TABLE IF NOT EXISTS `propietario` (
  `Id_Propietario` int NOT NULL AUTO_INCREMENT,
  `Nombre_Completo` varchar(100) DEFAULT NULL,
  `Documento_Identidad` int unsigned DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Telefono` int unsigned DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `Banco` varchar(100) DEFAULT NULL,
  `Tipo_Cuenta` varchar(50) DEFAULT NULL,
  `Numero_Cuenta` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`Id_Propietario`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.propietario: 2 rows
DELETE FROM `propietario`;
/*!40000 ALTER TABLE `propietario` DISABLE KEYS */;
INSERT INTO `propietario` (`Id_Propietario`, `Nombre_Completo`, `Documento_Identidad`, `Direccion`, `Telefono`, `Correo`, `Banco`, `Tipo_Cuenta`, `Numero_Cuenta`) VALUES
	(1, 'Juan PÃ©rez', 123456789, 'Calle 123', 1234567890, 'juan@gmail.com', 'Banco A', 'Cuenta Corriente', 987654321),
	(2, 'MarÃ­a GonzÃ¡lez', 987654321, 'Avenida 456', 4294967295, 'maria@gmail.com', 'Banco B', 'Cuenta Ahorro', 123456789);
/*!40000 ALTER TABLE `propietario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.recibo_propietario
CREATE TABLE IF NOT EXISTS `recibo_propietario` (
  `Id_Recibo_Propietario` int NOT NULL AUTO_INCREMENT,
  `Id_Propietario` int unsigned DEFAULT NULL,
  `Fecha_Elaboracion` date DEFAULT NULL,
  `Periodo_Pagado` date DEFAULT NULL,
  `Elaborado_por` varchar(100) DEFAULT NULL,
  `Valor_Arriendo` int unsigned DEFAULT NULL,
  `Forma_Pago` varchar(50) DEFAULT NULL,
  `Observaciones` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Id_Recibo_Propietario`),
  KEY `Id_Propietario` (`Id_Propietario`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.recibo_propietario: 2 rows
DELETE FROM `recibo_propietario`;
/*!40000 ALTER TABLE `recibo_propietario` DISABLE KEYS */;
INSERT INTO `recibo_propietario` (`Id_Recibo_Propietario`, `Id_Propietario`, `Fecha_Elaboracion`, `Periodo_Pagado`, `Elaborado_por`, `Valor_Arriendo`, `Forma_Pago`, `Observaciones`) VALUES
	(2, 2, '2024-03-01', '2024-03-01', 'Usuario Y', 2000000, 'Efectivo', 'Pendiente de pago'),
	(1, 1, '2024-03-01', '2024-03-01', 'Usuario X', 1500000, 'Transferencia', 'Pago recibido');
/*!40000 ALTER TABLE `recibo_propietario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `idrol` int NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  PRIMARY KEY (`idrol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla adminmuebles.rol: ~2 rows (aproximadamente)
DELETE FROM `rol`;
INSERT INTO `rol` (`idrol`, `nombre_rol`) VALUES
	(1, 'Administrador'),
	(2, 'Empleado');

-- Volcando estructura para tabla adminmuebles.trabajador
CREATE TABLE IF NOT EXISTS `trabajador` (
  `idtrabajador` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `idrol` int DEFAULT NULL,
  PRIMARY KEY (`idtrabajador`),
  KEY `idrol` (`idrol`),
  CONSTRAINT `trabajador_ibfk_1` FOREIGN KEY (`idrol`) REFERENCES `rol` (`idrol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla adminmuebles.trabajador: ~3 rows (aproximadamente)
DELETE FROM `trabajador`;
INSERT INTO `trabajador` (`idtrabajador`, `nombre`, `apellido`, `correo`, `contrasena`, `telefono`, `idrol`) VALUES
	(1, 'Juan', 'Pérez', 'juan@example.com', 'contraseña123', '555-1234', 1),
	(2, 'María', 'Gómez', 'maria@example.com', 'contraseña456', '555-5678', 2),
	(3, 'Carlos', 'Rodríguez', 'carlos@example.com', 'contraseña789', '555-9876', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
