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

-- Volcando datos para la tabla adminmuebles.arrendatario: 2 rows
/*!40000 ALTER TABLE `arrendatario` DISABLE KEYS */;
REPLACE INTO `arrendatario` (`Id_Arrendatario`, `Id_Codeudor`, `Nombre_Completo`, `Documento_Identidad`, `Telefono`, `Correo`, `Cuotas_Pagadas`, `Siguiente_Cuota`, `Cuotas_Pendientes`, `Fecha_Inicio_Contrato`, `Fecha_Fin_Contrato`, `Estado`) VALUES
	(1, 1, 'Carlos LÃ³pez', 111222333, 1112223334, 'carlos@gmail.com', 5, '2024-03-01', 7, '2024-01-01', '2024-12-31', 'Vigente'),
	(2, 2, 'Ana RodrÃ­guez', 444555666, 4294967295, 'ana@gmail.com', 10, '2024-03-15', 5, '2023-12-01', '2024-11-30', 'Vigente');
/*!40000 ALTER TABLE `arrendatario` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.codeudor: 2 rows
/*!40000 ALTER TABLE `codeudor` DISABLE KEYS */;
REPLACE INTO `codeudor` (`Id_Codeudor`, `Nombre_Completo`, `Documento_Identidad`, `Telefono`, `Correo`, `Direccion`) VALUES
	(1, 'Pedro RamÃ­rez', 777888999, 4294967295, 'pedro@gmail.com', 'Calle 789'),
	(2, 'Laura MartÃ­nez', 333444555, 3334445556, 'laura@gmail.com', 'Avenida 012');
/*!40000 ALTER TABLE `codeudor` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.inmueble: 2 rows
/*!40000 ALTER TABLE `inmueble` DISABLE KEYS */;
REPLACE INTO `inmueble` (`Id_Inmueble`, `Id_Arrendatario`, `Id_Propietario`, `No_Matricula`, `Direccion`, `Estrato`, `Ciudad`, `Barrio`, `Tipo`, `No_Niveles`, `Valor_Inmueble`, `No_Banos`, `Servicios_Publicos`, `No_Habitaciones`, `Estado`, `No_Terraza`, `Area_Construida_m2`, `Aseguramiento`, `Descripcion`) VALUES
	(1, 1, 1, 12345, 'Calle 456', 4, 'Ciudad A', 'Barrio X', 'Casa', 2, 1500000, 2, 'Agua, EnergÃ­a', 3, 'Desocupado', 1, 120.5, '2024-03-01', 'Casa de dos pisos'),
	(2, 2, 2, 67890, 'Avenida 789', 5, 'Ciudad B', 'Barrio Y', 'Apartamento', 1, 2000000, 1, 'Agua, EnergÃ­a, Gas', 2, 'Ocupado', 0, 80.5, '2024-06-01', 'Apartamento con vista al mar');
/*!40000 ALTER TABLE `inmueble` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.pagos_arrendatario: 2 rows
/*!40000 ALTER TABLE `pagos_arrendatario` DISABLE KEYS */;
REPLACE INTO `pagos_arrendatario` (`Id_Pago_Arrendatario`, `Id_Arrendatario`, `Fecha_Pago`, `Fecha_Inicio`, `Fecha_Fin`, `Valor_Pago`, `Forma_Pago`, `Estado`, `Dias_De_Mora`) VALUES
	(1, 1, '2024-03-02', '2024-03-01', '2024-03-15', 1500000, 'Transferencia', 'Pagado', 0),
	(2, 2, '2024-03-16', '2024-03-16', '2024-03-31', 2000000, 'Efectivo', 'Pendiente', 5);
/*!40000 ALTER TABLE `pagos_arrendatario` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.propietario: 2 rows
/*!40000 ALTER TABLE `propietario` DISABLE KEYS */;
REPLACE INTO `propietario` (`Id_Propietario`, `Nombre_Completo`, `Documento_Identidad`, `Direccion`, `Telefono`, `Correo`, `Banco`, `Tipo_Cuenta`, `Numero_Cuenta`) VALUES
	(1, 'Juan PÃ©rez', 123456789, 'Calle 123', 1234567890, 'juan@gmail.com', 'Banco A', 'Cuenta Corriente', 987654321),
	(2, 'MarÃ­a GonzÃ¡lez', 987654321, 'Avenida 456', 4294967295, 'maria@gmail.com', 'Banco B', 'Cuenta Ahorro', 123456789);
/*!40000 ALTER TABLE `propietario` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.recibo_propietario: 2 rows
/*!40000 ALTER TABLE `recibo_propietario` DISABLE KEYS */;
REPLACE INTO `recibo_propietario` (`Id_Recibo_Propietario`, `Id_Propietario`, `Fecha_Elaboracion`, `Periodo_Pagado`, `Elaborado_por`, `Valor_Arriendo`, `Forma_Pago`, `Observaciones`) VALUES
	(2, 2, '2024-03-01', '2024-03-01', 'Usuario Y', 2000000, 'Efectivo', 'Pendiente de pago'),
	(1, 1, '2024-03-01', '2024-03-01', 'Usuario X', 1500000, 'Transferencia', 'Pago recibido');
/*!40000 ALTER TABLE `recibo_propietario` ENABLE KEYS */;

-- Volcando datos para la tabla adminmuebles.rol: ~2 rows (aproximadamente)
REPLACE INTO `rol` (`idrol`, `nombre_rol`) VALUES
	(1, 'Administrador'),
	(2, 'Empleado'),
	(3, 'Asesor Comercial'),
	(4, 'Super usuario');

-- Volcando datos para la tabla adminmuebles.trabajador: ~3 rows (aproximadamente)
REPLACE INTO `trabajador` (`idtrabajador`, `nombre`, `apellido`, `correo`, `contrasena`, `telefono`, `idrol`) VALUES
	(1, 'Juan', 'Pérez', 'juan@example.com', 'contraseña123', '555-1234', 1),
	(2, 'María', 'Gómez', 'maria@example.com', 'contraseña456', '555-5678', 2),
	(3, 'Carlos', 'Rodríguez', 'carlos@example.com', 'contraseña789', '555-9876', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
