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

-- Volcando estructura para evento adminmuebles.actualizar_estado_pagos_evento
DELIMITER //
CREATE EVENT `actualizar_estado_pagos_evento` ON SCHEDULE EVERY 1 DAY STARTS '2024-03-18 14:15:44' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    UPDATE pagos_arrendamiento
    SET Estado = CASE 
                    WHEN FechaPagoFija < CURDATE() AND Estado = 'Pendiente' THEN 'Atrasado'
                    WHEN FechaPagoFija <= CURDATE() AND Estado = 'Adelantado' THEN 'AlDia'
                    ELSE Estado
                 END;
END//
DELIMITER ;

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
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

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
  `PagoRecibos` int DEFAULT NULL,
  `CuotaExtra` int DEFAULT NULL,
  `Descripcion` varchar(250) DEFAULT NULL,
  `ValorTotal` int DEFAULT NULL,
  PRIMARY KEY (`IdComisionPropietario`) USING BTREE,
  KEY `IdPropietario` (`IdPropietario`) USING BTREE,
  KEY `IdInmueble` (`IdInmueble`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

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
) ENGINE=MyISAM AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

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
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

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
) ENGINE=MyISAM AUTO_INCREMENT=243 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

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
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla adminmuebles.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `Idrol` int NOT NULL AUTO_INCREMENT,
  `NombreRol` varchar(50) NOT NULL,
  PRIMARY KEY (`Idrol`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

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

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para disparador adminmuebles.actualizar_cuotas_pendientes
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `actualizar_cuotas_pendientes` AFTER UPDATE ON `pagos_arrendamiento` FOR EACH ROW BEGIN
    DECLARE cuotas_pendientes INT;

    -- Calcular el número de cuotas pendientes para el contrato actual
    SELECT COUNT(*) INTO cuotas_pendientes
    FROM pagos_arrendamiento
    WHERE IdContrato = NEW.IdContrato AND Estado = 'Pendiente';

    -- Actualizar el campo CuotasPendientes en la tabla contratoarrendamiento
    UPDATE contratoarrendamiento
    SET CuotasPendientes = cuotas_pendientes
    WHERE IdContrato = NEW.IdContrato;

    -- Verificar si las cuotas pendientes son 0 o menos
    IF cuotas_pendientes <= 0 THEN
        -- Actualizar el estado del contrato a Finalizado
        UPDATE contratoarrendamiento
        SET EstadoContrato = 'Finalizado'
        WHERE IdContrato = NEW.IdContrato;
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador adminmuebles.actualizar_estado_finalizado
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `actualizar_estado_finalizado` AFTER UPDATE ON `contratoarrendamiento` FOR EACH ROW BEGIN
    -- Verificar si el estado del contrato se actualizó a 'Finalizado'
    IF NEW.EstadoContrato = 'Finalizado' THEN
        -- Actualizar el estado del inmueble asociado a 'Disponible'
        UPDATE inmueble
        SET Estado = 'Disponible'
        WHERE IdInmueble = NEW.IdInmueble;

        -- Actualizar el estado del arrendatario a 'Libre'
        UPDATE arrendatario
        SET Estado = 'Libre'
        WHERE IdArrendatario = NEW.IdArrendatario;
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador adminmuebles.After_Insert_ContratoArrendamiento
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `After_Insert_ContratoArrendamiento` AFTER INSERT ON `contratoarrendamiento` FOR EACH ROW BEGIN
    -- Actualizar estado del inmueble a 'Ocupado' cuando se crea un nuevo contrato
    UPDATE inmueble
    SET Estado = 'Ocupado'
    WHERE IdInmueble = NEW.IdInmueble;
     UPDATE arrendatario
    SET Estado = 'Ocupado'
    WHERE IdArrendatario = NEW.IdArrendatario;

END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador adminmuebles.Before_Insert_ContratoArrendamiento
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `Before_Insert_ContratoArrendamiento` BEFORE INSERT ON `contratoarrendamiento` FOR EACH ROW BEGIN
    DECLARE meses_contrato INT;
    DECLARE cuotas_pagadas INT;
    DECLARE cuotas_pendientes INT;
    
    SET meses_contrato = TIMESTAMPDIFF(MONTH, NEW.FechaInicioContrato, NEW.FechaFinContrato);
    
    -- Verificar si la fecha de inicio y fin están en el mismo mes
    IF DATE_FORMAT(NEW.FechaInicioContrato, '%Y-%m') = DATE_FORMAT(NEW.FechaFinContrato, '%Y-%m') THEN
        SET meses_contrato = meses_contrato + 1; -- Incluir el mes final
    END IF;
    
    SET cuotas_pagadas = (
        SELECT COUNT(*) FROM pagos_Arrendamiento
        WHERE IdContrato = NEW.IdContrato
    );
    
    SET cuotas_pendientes = meses_contrato - cuotas_pagadas;
    
    IF cuotas_pendientes < 0 THEN
        SET cuotas_pendientes = 0; -- No pueden haber cuotas pendientes negativas
    END IF;
    
    SET NEW.MesesAlquiler = meses_contrato +1;
    SET NEW.CuotasPendientes = cuotas_pendientes + 1;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador adminmuebles.calcular_dias_demora_despues_de_actualizar
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `calcular_dias_demora_despues_de_actualizar` BEFORE UPDATE ON `pagos_arrendamiento` FOR EACH ROW BEGIN
    -- Declarar una variable local para la diferencia en días
    DECLARE diferencia_dias INT;
    
    -- Calcular la diferencia en días
    SET diferencia_dias = DATEDIFF(NEW.FechaPago, NEW.FechaPagoFija);
    IF diferencia_dias < 0 THEN
        SET NEW.Estado = "Adelantado"; -- No pueden haber cuotas pendientes negativas
    END IF;
    
    IF diferencia_dias > 0 THEN
        SET NEW.Estado = "Atrasado"; -- No pueden haber cuotas pendientes negativas
    END IF;
    IF diferencia_dias = 0 THEN
        SET NEW.Estado = "AlDia"; -- No pueden haber cuotas pendientes negativas
    END IF;
    
    -- Asignar el valor de la diferencia a la columna DiasDemora en la fila NEW
    SET NEW.DiasDMora = diferencia_dias;
    
     
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador adminmuebles.generar_pagos_arrendamiento_despues_de_insertar
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `generar_pagos_arrendamiento_despues_de_insertar` AFTER INSERT ON `contratoarrendamiento` FOR EACH ROW BEGIN
    DECLARE fecha_pago DATE;
    DECLARE diferencia_meses INT;
    DECLARE i INT;

    SET fecha_pago = NEW.FechaInicioContrato;
    SET diferencia_meses = TIMESTAMPDIFF(MONTH, NEW.FechaInicioContrato, NEW.FechaFinContrato);

    SET i = 0;
    WHILE i <= diferencia_meses DO
        -- Calculamos la fecha de pago fija
        SET @fecha_pago_fija = DATE_ADD(fecha_pago, INTERVAL i MONTH);
        
        -- Ajustamos la fecha de pago fija al último día del mes si es necesario
        IF DAYOFMONTH(@fecha_pago_fija) > DAY(LAST_DAY(@fecha_pago_fija)) THEN
            SET @fecha_pago_fija = LAST_DAY(@fecha_pago_fija);
        END IF;

        -- Formateamos la fecha de pago fija al formato 'YYYY-MM-DD' utilizando STR_TO_DATE()
        SET @fecha_pago_fija = STR_TO_DATE(@fecha_pago_fija, '%Y-%m-%d');

        INSERT INTO pagos_arrendamiento (IdArrendatario, IdContrato, FechaPago, FechaPagoFija, ValorPago, FormaPago, Estado)
        VALUES (NEW.IdArrendatario, NEW.IdContrato, null, @fecha_pago_fija, 0, 'Pendiente', 'Pendiente');
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
