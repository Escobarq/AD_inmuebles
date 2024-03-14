CREATE TABLE IF NOT EXISTS arrendatario (
  IdArrendatario SERIAL PRIMARY KEY,
  IdCodeudor INTEGER,
  NombreCompleto VARCHAR(100),
  TipoDocumento VARCHAR(50),
  DocumentoIdentidad VARCHAR(10),
  Telefono VARCHAR(10),
  Correo VARCHAR(200),
  Estado VARCHAR(50),
  booleanos VARCHAR(50) DEFAULT 'true'
);

CREATE TABLE IF NOT EXISTS codeudor (
  IdCodeudor SERIAL PRIMARY KEY,
  NombreCompleto VARCHAR(100),
  TipoDocumento VARCHAR(50),
  DocumentoIdentidad VARCHAR(10),
  Telefono VARCHAR(10),
  Correo VARCHAR(250),
  Direccion VARCHAR(150),
  booleanos VARCHAR(10) DEFAULT 'true'
);

CREATE TABLE IF NOT EXISTS comision_propietario (
  IdComisionPropietario SERIAL PRIMARY KEY,
  IdPropietario INTEGER,
  IdInmueble INTEGER,
  FechaElaboracion DATE,
  ElaboradoPor VARCHAR(100),
  FormaPago VARCHAR(50),
  PagoArriendo INTEGER,
  AdmInmobi INTEGER,
  AseoEntrega INTEGER,
  Mantenimiento INTEGER,
  ValorTotal INTEGER
);

CREATE TABLE IF NOT EXISTS contratoarrendamiento (
  IdContrato SERIAL PRIMARY KEY,
  IdArrendatario INTEGER,
  IdInmueble INTEGER,
  FechaInicioContrato DATE NOT NULL,
  FechaFinContrato DATE NOT NULL,
  EstadoContrato VARCHAR(50),
  ValorDeposito DECIMAL(20,5),
  MesesAlquiler INTEGER,
  CuotasPendientes INTEGER
);

CREATE TABLE IF NOT EXISTS inmueble (
  IdInmueble SERIAL PRIMARY KEY,
  IdPropietario INTEGER,
  NoMatricula INTEGER,
  Direccion VARCHAR(200),
  Estrato VARCHAR(1),
  Ciudad VARCHAR(100),
  Barrio VARCHAR(100),
  Tipo VARCHAR(50),
  NoNiveles VARCHAR(50),
  NoBanos VARCHAR(50),
  ServiciosPublicos VARCHAR(700),
  NoHabitaciones VARCHAR(50),
  Estado VARCHAR(100),
  NoTerraza VARCHAR(50),
  AreaConstruidaM2 VARCHAR(50),
  Aseguramiento DATE,
  ValorInmueble INTEGER,
  booleanos VARCHAR(50) NOT NULL DEFAULT 'true',
  Descripcion VARCHAR(700)
);

CREATE TABLE IF NOT EXISTS pagos_arrendamiento (
  IdPagoArrendamiento SERIAL PRIMARY KEY,
  IdArrendatario INTEGER,
  IdContrato INTEGER,
  FechaPago DATE,
  FechaInicio DATE,
  FechaFin DATE,
  ValorPago INTEGER,
  FormaPago VARCHAR(50),
  Estado VARCHAR(50),
  DiasDMora INTEGER,
  booleanos VARCHAR(50) DEFAULT 'true'
);

CREATE TABLE IF NOT EXISTS propietario (
  IdPropietario SERIAL PRIMARY KEY,
  NombreCompleto VARCHAR(100),
  TipoDocumento VARCHAR(50),
  DocumentoIdentidad VARCHAR(10),
  Direccion VARCHAR(200),
  Telefono VARCHAR(10),
  Correo VARCHAR(200),
  Banco VARCHAR(100),
  TipoCuenta VARCHAR(50),
  NumeroCuenta VARCHAR(20),
  booleanos VARCHAR(50) NOT NULL DEFAULT 'true',
  FechaIngreso DATE
);

CREATE TABLE IF NOT EXISTS rol (
  Idrol SERIAL PRIMARY KEY,
  NombreRol VARCHAR(50) NOT NULL
);

INSERT INTO rol (NombreRol) VALUES
  ('Administrador'),
  ('Empleado'),
  ('SuperUsuario');

CREATE TABLE IF NOT EXISTS trabajador (
  IdTrabajador SERIAL PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL,
  Apellido VARCHAR(50) NOT NULL,
  Correo VARCHAR(100) NOT NULL,
  Contrasena VARCHAR(255) NOT NULL,
  Telefono VARCHAR(20),
  Idrol INTEGER,
  Booleanos CHAR(50) NOT NULL DEFAULT 'true'
);

INSERT INTO trabajador (Nombre, Apellido, Correo, Contrasena, Telefono, Idrol, Booleanos) VALUES
  ('Juan', 'Pérez', 'juan@example.com', 'contraseña123', '555-1234', 1, 'true'),
  ('María Sambrano', 'Gómez', 'maria@example.com', 'contraseña456', '555-5678', 2, 'true'),
  ('Arenas', 'Quezad', 'juan@gmail.com', '12345', '3132025146', 3, 'true');

CREATE OR REPLACE FUNCTION After_Insert_ContratoArrendamiento() RETURNS TRIGGER AS $$
BEGIN
    -- Actualizar estado del inmueble a 'Ocupado' cuando se crea un nuevo contrato
    UPDATE inmueble
    SET Estado = 'Ocupado'
    WHERE IdInmueble = NEW.IdInmueble;
    UPDATE arrendatario SET Estado = 'Ocupado' WHERE IdArrendatario = NEW.IdArrendatario;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_contratoarrendamiento
AFTER INSERT ON contratoarrendamiento
FOR EACH ROW
EXECUTE FUNCTION After_Insert_ContratoArrendamiento();

CREATE OR REPLACE FUNCTION After_Insert_PagosArrendamiento() RETURNS TRIGGER AS $$
BEGIN
    -- Actualizar estado de contrato y disponible en inmueble cuando CuotasPendientes llega a 0
    UPDATE contratoarrendamiento
    SET EstadoContrato = 'Finalizado'
    WHERE CuotasPendientes = 1 AND IdContrato = NEW.IdContrato;
    -- Actualizar cuotaspendientes en contratoarrendamiento al agregar un nuevo pago
    UPDATE contratoarrendamiento c
    SET CuotasPendientes = CuotasPendientes - 1
    WHERE c.IdContrato = NEW.IdContrato;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_pagosarrendamiento
AFTER INSERT ON pagos_arrendamiento
FOR EACH ROW
EXECUTE FUNCTION After_Insert_PagosArrendamiento();

CREATE OR REPLACE FUNCTION after_update_contrato() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.EstadoContrato = 'Finalizado' THEN
        UPDATE inmueble SET Estado = 'Disponible' WHERE IdInmueble = NEW.IdInmueble;
        UPDATE arrendatario SET Estado = 'Libre' WHERE IdArrendatario = NEW.IdArrendatario;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_update_contrato
AFTER UPDATE ON contratoarrendamiento
FOR EACH ROW
EXECUTE FUNCTION after_update_contrato();

CREATE OR REPLACE FUNCTION after_update_contratoarrendamiento() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.EstadoContrato = 'Finalizado' THEN
        UPDATE inmueble
        SET Estado = 'Disponible'
        WHERE IdInmueble = NEW.IdInmueble;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_update_contratoarrendamiento
AFTER UPDATE ON contratoarrendamiento
FOR EACH ROW
EXECUTE FUNCTION after_update_contratoarrendamiento();

CREATE OR REPLACE FUNCTION Before_Insert_ContratoArrendamiento() RETURNS TRIGGER AS $$
BEGIN
    NEW.MesesAlquiler := EXTRACT(MONTH FROM NEW.FechaFinContrato) - EXTRACT(MONTH FROM NEW.FechaInicioContrato);
    NEW.CuotasPendientes := NEW.MesesAlquiler - (
        SELECT COUNT(*) FROM pagos_Arrendamiento
        WHERE IdContrato = NEW.IdContrato
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_contratoarrendamiento
BEFORE INSERT ON contratoarrendamiento
FOR EACH ROW
EXECUTE FUNCTION Before_Insert_ContratoArrendamiento();

CREATE OR REPLACE FUNCTION Before_Insert_PagosArrendamiento() RETURNS TRIGGER AS $$
BEGIN
    -- Calcular la diferencia de días entre FechaFin y FechaPago y asignar a la columna DiasDMora
    NEW.DiasDMora := DATE_PART('day', NEW.FechaPago - NEW.FechaFin);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_pagosarrendamiento
BEFORE INSERT ON pagos_arrendamiento
FOR EACH ROW
EXECUTE FUNCTION Before_Insert_PagosArrendamiento();
