import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Pagination } from "react-bootstrap";
import "./GastosyContrato.css";

export const OperacionInmobi = () => {
  // Estado para almacenar los datos procesados de los propietarios
  const [propietariosProcesados, setPropietariosProcesados] = useState([]);

  // Estado para controlar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);
  // Estado para almacenar los detalles de los inmuebles seleccionados
  const [selectedInmuebles, setSelectedInmuebles] = useState([]);

  // Estado para controlar la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Función para mostrar el modal con los detalles de los inmuebles
  const showInmueblesModal = (inmuebles) => {
    setSelectedInmuebles(inmuebles);
    setShowModal(true);
  };

  // Función para ocultar el modal
  const handleCloseModal = () => setShowModal(false);

  // Función para procesar los datos de los propietarios
  const procesarDatosPropietarios = async () => {
    try {
      // Realizar la solicitud a la API http://localhost:3006/inmuebles-general
      const response = await fetch("http://localhost:3006/inmuebles-general");
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la API");
      }
      const data = await response.json();

      // Procesar los datos recibidos
      const propietariosUnicos = {};
      data.forEach((dato) => {
        const nombrePropietario = dato["Nombre Propietario"];
        const tiposInmuebles = dato["Tipos de Inmuebles"].split(",");
        const arriendo = dato["Pago Arriendo Total"];
        const administracion = dato["Administración Inmobiliaria Total"];
        const deposito = dato["Valor Depósito"];

        tiposInmuebles.forEach((tipoInmueble) => {
          const regexMatricula = /NoMatricula: (\d+)/;
          const matchMatricula = tipoInmueble.match(regexMatricula);
          const numeroMatricula = matchMatricula ? matchMatricula[1] : "";

          if (!propietariosUnicos[nombrePropietario]) {
            propietariosUnicos[nombrePropietario] = {
              nombre: nombrePropietario,
              inmuebles: [],
              totalArriendo: 0,
              totalAdministracion: 0,
              totalDeposito: 0,
            };
          }

          propietariosUnicos[nombrePropietario].inmuebles.push({
            tipoInmueble,
            numeroMatricula,
            arriendo,
            administracion,
            deposito,
          });

          propietariosUnicos[nombrePropietario].totalArriendo += arriendo;
          propietariosUnicos[nombrePropietario].totalAdministracion +=
            administracion;
          propietariosUnicos[nombrePropietario].totalDeposito += deposito;
        });
      });

      const propietariosArray = Object.values(propietariosUnicos);
      setPropietariosProcesados(propietariosArray);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Cargar los datos al montar el componente
  useEffect(() => {
    procesarDatosPropietarios();
  }, []);

  // Función para obtener los propietarios a mostrar en la tabla según la página actual
  const getPropietariosToDisplay = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return propietariosProcesados.slice(startIndex, endIndex);
  };

  // Calcular el total general
  // Función para formatear un número como moneda colombiana
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

// Calcular el total general
const calcularTotalGeneral = () => {
  let totalArriendo = 0;
  let totalAdministracion = 0;
  let totalDeposito = 0;

  getPropietariosToDisplay().forEach((propietario) => {
    totalArriendo += propietario.totalArriendo;
    totalAdministracion += propietario.totalAdministracion;
    totalDeposito += propietario.totalDeposito;
  });

  return {
    totalArriendo: formatCurrency(totalArriendo),
    totalAdministracion: formatCurrency(totalAdministracion),
    totalDeposito: formatCurrency(totalDeposito),
  };
};

// Calcular el total general para la página actual
const totalGeneral = calcularTotalGeneral();


  return (
    <>
      <div className="contener-home">
        <h2>Operación Inmobiliaria</h2>
        <div className="total-general">
          <strong>Total General:</strong>
          <p>Arriendo: {totalGeneral.totalArriendo}</p>
          <p>Administración: {totalGeneral.totalAdministracion}</p>
          <p>Deposito: {totalGeneral.totalDeposito}</p>
        </div>
        <Table striped bordered hover id="mostrar-resultados">
          <thead>
            <tr>
              <th>Propietario</th>
              <th>Valor de Arriendo</th>
              <th>Valor de Administración</th>
              <th>Valor del Depósito</th>
            </tr>
          </thead>
          <tbody>
            {getPropietariosToDisplay().map((propietario, index) => (
              <tr key={index}>
                <td>
                  <Button
                    variant="link"
                    onClick={() => showInmueblesModal(propietario.inmuebles)}
                  >
                    {propietario.nombre}
                  </Button>
                </td>
                <td>{formatCurrency(propietario.totalArriendo)}</td>
                <td>{formatCurrency(propietario.totalAdministracion)}</td>
                <td>{formatCurrency(propietario.totalDeposito)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal para mostrar los detalles de los inmuebles */}
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          id="operacion"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Detalles de Inmuebles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tipo de Inmueble</th>
                  <th>Arriendo</th>
                  <th>Administración</th>
                  <th>Depósito</th>
                </tr>
              </thead>
              <tbody>
                {selectedInmuebles.map((inmueble, index) => (
                  <tr key={index}>
                    <td>{inmueble.tipoInmueble}</td>
                    <td>{formatCurrency(inmueble.arriendo)}</td>
                    <td>{formatCurrency(inmueble.administracion)}</td>
                    <td>{formatCurrency(inmueble.deposito)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>

        {/* Paginador */}
        <Pagination >
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from(
            { length: Math.ceil(propietariosProcesados.length / itemsPerPage) },
            (_, i) => i + 1
          ).map((pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage >=
              Math.ceil(propietariosProcesados.length / itemsPerPage)
            }
          />
        </Pagination>
      </div>
    </>
  );
};
