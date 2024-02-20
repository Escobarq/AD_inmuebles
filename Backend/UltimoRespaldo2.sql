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

-- Volcando datos para la tabla adminmuebles.arrendatario: 3 rows
/*!40000 ALTER TABLE `arrendatario` DISABLE KEYS */;
REPLACE INTO `arrendatario` (`Id_Arrendatario`, `Id_Codeudor`, `Nombre_Completo`, `Tipo_Documento`, `Documento_Identidad`, `Telefono`, `Correo`, `Cuotas_Pagadas`, `Siguiente_Cuota`, `Cuotas_Pendientes`, `Fecha_Inicio_Contrato`, `Fecha_Fin_Contrato`, `Estado`, `Valor_Deposito`, `Meses_Alquiler`, `Mostar_Nmostrar`) VALUES
	(1, 1, 'Carlos LÃ³pez', NULL, 111222333, 1112223334, 'carlos@gmail.com', 5, '2024-03-01', 7, '2024-01-01', '2024-12-31', 'Vigente', 30000000.00000, NULL, NULL),
	(2, 2, 'Ana RodrÃ­guez', NULL, 444555666, 4294967295, 'ana@gmail.com', 10, '2024-03-15', 5, '2023-12-01', '2024-11-30', 'Vigente', NULL, NULL, NULL);
/*!40000 ALTER TABLE `arrendatario` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.codeudor: 2 rows
/*!40000 ALTER TABLE `codeudor` DISABLE KEYS */;
REPLACE INTO `codeudor` (`Id_Codeudor`, `Nombre_Completo`, `Tipo_Documento`, `Documento_Identidad`, `Telefono`, `Correo`, `Direccion`, `booleanos`) VALUES
	(1, 'Pedro RamÃ­rez', NULL, 777888999, 4294967295, 'pedro@gmail.com', 'Calle 789', 'true'),
	(2, 'Laura MartÃ­nez', NULL, 333444555, 3334445556, 'laura@gmail.com', 'Avenida 012', 'false'),
	(3, 'arenas', NULL, 1123123, 12312312, 'xd@gmail', 'nose', 'true');
/*!40000 ALTER TABLE `codeudor` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.comision_propietario: 2 rows
/*!40000 ALTER TABLE `comision_propietario` DISABLE KEYS */;
REPLACE INTO `comision_propietario` (`Id_comision_Propietario`, `Id_Propietario`, `Fecha_Elaboracion`, `Periodo_Pagado`, `Elaborado_por`, `Valor_Arriendo`, `Forma_Pago`, `Observaciones`) VALUES
	(2, 2, '2024-03-01', '2024-03-01', 'Usuario Y', 2000000, 'Efectivo', 'Pendiente de pago'),
	(1, 1, '2024-03-01', '2024-03-01', 'Usuario X', 1500000, 'Transferencia', 'Pago recibido');
/*!40000 ALTER TABLE `comision_propietario` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.inmueble: 10 rows
/*!40000 ALTER TABLE `inmueble` DISABLE KEYS */;
REPLACE INTO `inmueble` (`Id_Inmueble`, `Id_Arrendatario`, `Id_Propietario`, `No_Matricula`, `Direccion`, `Estrato`, `Ciudad`, `Barrio`, `Tipo`, `No_Niveles`, `Valor_Inmueble`, `No_Banos`, `Servicios_Publicos`, `No_Habitaciones`, `Estado`, `No_Terraza`, `Area_Construida_m2`, `Aseguramiento`, `Descripcion`) VALUES
	(11, 2, NULL, 2, 'Holas', 3, 'jhkjhjh', 'si soy', 'Apartamento', 1, 2000, 1, 'jhkjhkjhk', NULL, 'Ocupado', 2, NULL, '2024-02-12', 'trdfgjkjfdgfgf'),
	(10, 2, NULL, 2, '+ñp', 1, '´l+p´+', 'pkk', 'Bodega', NULL, 2000, 2, 'p´´pp', NULL, 'Ocupado', NULL, NULL, NULL, 'lhjkljkhhj'),
	(1, 1, 1, 12345, 'Calle 456', 4, 'Ciudad A', 'Barrio X', 'Casa', 2, 1500000, 2, 'Agua, EnergÃ­a', 3, 'Ocupado', 1, 120.5, '2024-03-01', 'Casa de dos pisos'),
	(9, 3, NULL, 1, 'kjlkjl', 1, 'kkjl', 'jhkjhk', 'Oficina', NULL, 2000, 2, 'cgkjkj', NULL, 'Ocupado', NULL, NULL, '2024-03-01', 'uiuku'),
	(2, 2, 2, 67890, 'Avenida 789', 5, 'Ciudad B', 'Barrio Y', 'Apartamento', 1, 2000000, 1, 'Agua, EnergÃ­a, Gas', 2, 'Ocupado', 0, 80.5, '2024-06-01', 'Apartamento con vista al mar'),
	(12, 2, NULL, 900, 'fgff', 1, 'fdgfdg', 'dfgfdg', 'Apartamento', 9, 8000, 3, 'fgfgfdgfdfdfgfdg', NULL, 'Ocupado', 9, NULL, '2024-02-12', 'dfgfgfgf'),
	(13, 3, NULL, 900, 'fgff', 8, 'fgfg', 'fhfh', 'Apartamento', 9, 700, 2, 'sd', NULL, 'Ocupado', 6, NULL, '2024-02-12', 'dfdfdf'),
	(14, 2, NULL, 2, 'fdfd', 1, 'palmira', 'fhfh', 'Apartamento', 2, 1000000, 2, 'fgffgf', NULL, 'Ocupado', 1, NULL, '2024-02-12', '  n n n nvbvbbvbvvb'),
	(15, NULL, NULL, 896, 'calle #2 cr33', 3, 'palmira', 'dfdfd', 'Apartamento', 2, 2000, 9, 'jiisgsdjsdjdjss', NULL, NULL, 1, NULL, '2024-02-12', 'vgygg'),
	(16, NULL, NULL, 55, 'kj,k,kj,jk,', 4, 'fgfgfd', 'dfgfgfdg', 'Bodega', NULL, 20000, 5, 'gfgfgf', NULL, NULL, NULL, NULL, NULL, ',k.kl.jk.');
/*!40000 ALTER TABLE `inmueble` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.pagos_arrendamiento: 2 rows
/*!40000 ALTER TABLE `pagos_arrendamiento` DISABLE KEYS */;
REPLACE INTO `pagos_arrendamiento` (`Id_Pago_Arrendamiento`, `Id_Arrendatario`, `Fecha_Pago`, `Fecha_Inicio`, `Fecha_Fin`, `Valor_Pago`, `Forma_Pago`, `Estado`, `Dias_De_Mora`) VALUES
	(1, 1, '2024-03-02', '2024-03-01', '2024-03-15', 1500000, 'Transferencia', 'Pagado', 0),
	(2, 2, '2024-03-16', '2024-03-16', '2024-03-31', 2000000, 'Efectivo', 'Pendiente', 5);
/*!40000 ALTER TABLE `pagos_arrendamiento` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.propietario: 2 rows
/*!40000 ALTER TABLE `propietario` DISABLE KEYS */;
REPLACE INTO `propietario` (`Id_Propietario`, `Nombre_Completo`, `Tipo_Documento`, `Documento_Identidad`, `Direccion`, `Telefono`, `Correo`, `Banco`, `Tipo_Cuenta`, `Numero_Cuenta`) VALUES
	(1, 'Juan PÃ©rez', NULL, 123456789, 'Calle 123', 1234567890, 'juan@gmail.com', 'Banco A', 'Cuenta Corriente', 987654321),
	(2, 'MarÃ­a GonzÃ¡lez', NULL, 987654321, 'Avenida 456', 4294967295, 'maria@gmail.com', 'Banco B', 'Cuenta Ahorro', 123456789);
/*!40000 ALTER TABLE `propietario` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.rol: 4 rows
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
REPLACE INTO `rol` (`idrol`, `nombre_rol`) VALUES
	(1, 'Administrador'),
	(2, 'Empleado'),
	(3, 'Asesor Comercial'),
	(4, 'Super usuario');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.trabajador: 4 rows
/*!40000 ALTER TABLE `trabajador` DISABLE KEYS */;
REPLACE INTO `trabajador` (`idtrabajador`, `nombre`, `apellido`, `correo`, `contrasena`, `telefono`, `idrol`) VALUES
	(1, 'Juan', 'Pérez', 'juan@example.com', 'contraseña123', '555-1234', 1),
	(2, 'María', 'Gómez', 'maria@example.com', 'contraseña456', '555-5678', 2),
	(3, 'Carlos', 'Rodríguez', 'carlos@example.com', 'contraseña789', '555-9876', 3),
	(4, 'Juan', 'David', 'juandeq15@example.com', 'contraseña111', '555-1133', 4);
/*!40000 ALTER TABLE `trabajador` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
