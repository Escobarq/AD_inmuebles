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
  `Id_Arrendatario` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Codeudor` int(10) unsigned DEFAULT NULL,
  `Nombre_Completo` varchar(100) DEFAULT NULL,
  `Documento_Identidad` int(10) unsigned DEFAULT NULL,
  `Telefono` int(10) unsigned DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `Cuotas_Pagadas` int(11) DEFAULT NULL,
  `Siguiente_Cuota` date DEFAULT NULL,
  `Cuotas_Pendientes` int(11) DEFAULT NULL,
  `Fecha_Inicio_Contrato` date DEFAULT NULL,
  `Fecha_Fin_Contrato` date DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_Arrendatario`),
  KEY `Id_Codeudor` (`Id_Codeudor`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.arrendatario: 2 rows
DELETE FROM `arrendatario`;
/*!40000 ALTER TABLE `arrendatario` DISABLE KEYS */;
INSERT INTO `arrendatario` (`Id_Arrendatario`, `Id_Codeudor`, `Nombre_Completo`, `Documento_Identidad`, `Telefono`, `Correo`, `Cuotas_Pagadas`, `Siguiente_Cuota`, `Cuotas_Pendientes`, `Fecha_Inicio_Contrato`, `Fecha_Fin_Contrato`, `Estado`) VALUES
	(1, 1, 'Carlos LÃ³pez', 111222333, 1112223334, 'carlos@gmail.com', 5, '2024-03-01', 7, '2024-01-01', '2024-12-31', 'Vigente'),
	(2, 2, 'Ana RodrÃ­guez', 444555666, 4294967295, 'ana@gmail.com', 10, '2024-03-15', 5, '2023-12-01', '2024-11-30', 'Vigente');
/*!40000 ALTER TABLE `arrendatario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.codeudor
CREATE TABLE IF NOT EXISTS `codeudor` (
  `Id_Codeudor` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_Completo` varchar(100) DEFAULT NULL,
  `Documento_Identidad` int(10) unsigned DEFAULT NULL,
  `Telefono` int(10) unsigned DEFAULT NULL,
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
  `Id_Inmueble` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Arrendatario` int(10) unsigned DEFAULT NULL,
  `Id_Propietario` int(10) unsigned DEFAULT NULL,
  `No_Matricula` int(10) unsigned DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Estrato` int(11) DEFAULT NULL,
  `Ciudad` varchar(100) DEFAULT NULL,
  `Barrio` varchar(100) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `No_Niveles` int(11) DEFAULT NULL,
  `Valor_Inmueble` int(10) unsigned DEFAULT NULL,
  `No_Banos` int(11) DEFAULT NULL,
  `Servicios_Publicos` varchar(700) DEFAULT NULL,
  `No_Habitaciones` int(11) DEFAULT NULL,
  `Estado` varchar(100) DEFAULT NULL,
  `No_Terraza` int(11) DEFAULT NULL,
  `Area_Construida_m2` float DEFAULT NULL,
  `Aseguramiento` date DEFAULT NULL,
  `Descripcion` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`Id_Inmueble`),
  KEY `Id_Arrendatario` (`Id_Arrendatario`),
  KEY `Id_Propietario` (`Id_Propietario`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.inmueble: 2 rows
DELETE FROM `inmueble`;
/*!40000 ALTER TABLE `inmueble` DISABLE KEYS */;
INSERT INTO `inmueble` (`Id_Inmueble`, `Id_Arrendatario`, `Id_Propietario`, `No_Matricula`, `Direccion`, `Estrato`, `Ciudad`, `Barrio`, `Tipo`, `No_Niveles`, `Valor_Inmueble`, `No_Banos`, `Servicios_Publicos`, `No_Habitaciones`, `Estado`, `No_Terraza`, `Area_Construida_m2`, `Aseguramiento`, `Descripcion`) VALUES
	(1, 1, 1, 12345, 'Calle 456', 4, 'Ciudad A', 'Barrio X', 'Casa', 2, 1500000, 2, 'Agua, EnergÃ­a', 3, 'Desocupado', 1, 120.5, '2024-03-01', 'Casa de dos pisos'),
	(2, 2, 2, 67890, 'Avenida 789', 5, 'Ciudad B', 'Barrio Y', 'Apartamento', 1, 2000000, 1, 'Agua, EnergÃ­a, Gas', 2, 'Ocupado', 0, 80.5, '2024-06-01', 'Apartamento con vista al mar');
/*!40000 ALTER TABLE `inmueble` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.pagos_arrendatario
CREATE TABLE IF NOT EXISTS `pagos_arrendatario` (
  `Id_Pago_Arrendatario` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Arrendatario` int(10) unsigned DEFAULT NULL,
  `Fecha_Pago` date DEFAULT NULL,
  `Fecha_Inicio` date DEFAULT NULL,
  `Fecha_Fin` date DEFAULT NULL,
  `Valor_Pago` int(10) unsigned DEFAULT NULL,
  `Forma_Pago` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `Dias_De_Mora` int(11) DEFAULT NULL,
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
  `Id_Propietario` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_Completo` varchar(100) DEFAULT NULL,
  `Documento_Identidad` int(10) unsigned DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Telefono` int(10) unsigned DEFAULT NULL,
  `Correo` varchar(200) DEFAULT NULL,
  `Banco` varchar(100) DEFAULT NULL,
  `Tipo_Cuenta` varchar(50) DEFAULT NULL,
  `Numero_Cuenta` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`Id_Propietario`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.propietario: 2 rows
DELETE FROM `propietario`;
/*!40000 ALTER TABLE `propietario` DISABLE KEYS */;
INSERT INTO `propietario` (`Id_Propietario`, `Nombre_Completo`, `Documento_Identidad`, `Direccion`, `Telefono`, `Correo`, `Banco`, `Tipo_Cuenta`, `Numero_Cuenta`) VALUES
	(1, 'Juan PÃ©rez', 123456789, 'Calle 123', 1234567890, 'juan@gmail.com', 'Banco A', 'Cuenta Corriente', 987654321),
	(2, 'MarÃ­a GonzÃ¡lez', 987654321, 'Avenida 456', 4294967295, 'maria@gmail.com', 'Banco B', 'Cuenta Ahorro', 123456789);
/*!40000 ALTER TABLE `propietario` ENABLE KEYS */;

-- Volcando estructura para tabla adminmuebles.recibo_propietario
CREATE TABLE IF NOT EXISTS `recibo_propietario` (
  `Id_Recibo_Propietario` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Propietario` int(10) unsigned DEFAULT NULL,
  `Fecha_Elaboracion` date DEFAULT NULL,
  `Periodo_Pagado` date DEFAULT NULL,
  `Elaborado_por` varchar(100) DEFAULT NULL,
  `Valor_Arriendo` int(10) unsigned DEFAULT NULL,
  `Forma_Pago` varchar(50) DEFAULT NULL,
  `Observaciones` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Id_Recibo_Propietario`),
  KEY `Id_Propietario` (`Id_Propietario`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla adminmuebles.recibo_propietario: 2 rows
DELETE FROM `recibo_propietario`;
/*!40000 ALTER TABLE `recibo_propietario` DISABLE KEYS */;
INSERT INTO `recibo_propietario` (`Id_Recibo_Propietario`, `Id_Propietario`, `Fecha_Elaboracion`, `Periodo_Pagado`, `Elaborado_por`, `Valor_Arriendo`, `Forma_Pago`, `Observaciones`) VALUES
	(1, 1, '2024-03-01', '2024-03-01', 'Usuario X', 1500000, 'Transferencia', 'Pago recibido'),
	(2, 2, '2024-03-01', '2024-03-01', 'Usuario Y', 2000000, 'Efectivo', 'Pendiente de pago');
/*!40000 ALTER TABLE `recibo_propietario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
