import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Pagination } from "react-bootstrap";
import "./GastosyContrato.css";

export const OperacionInmobi = () => {
  const [propietarios, setPropietarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInmuebles, setSelectedInmuebles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    // Realizar la solicitud a la ruta http://localhost:3006/inmuebles-general
    fetch("http://localhost:3006/inmuebles-general")
      .then((response) => response.json())
      .then((data) => {
        setPropietarios(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const showInmueblesModal = (inmuebles) => {
    setSelectedInmuebles(inmuebles);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  const calcularTotalGeneral = () => {
    let totalArriendo = 0;
    let totalAdministracion = 0;
    let totalDeposito = 0;

    propietarios.forEach((propietario) => {
      propietario.InmueblesAsociados.forEach((inmueble) => {
        totalArriendo += inmueble.ValorInmueble;
        totalAdministracion += inmueble.ValorInmueble * 0.08;
        totalDeposito +=
          inmueble.Deposito !== "N/A" ? parseFloat(inmueble.Deposito) / 2 : 0;
      });
    });

    // Formatear los totales
    const formatoMoneda = {
      style: "currency",
      currency: "COP", // Código de moneda para pesos colombianos
    };

    const totalArriendoFormateado = totalArriendo.toLocaleString(
      "es-CO",
      formatoMoneda
    );
    const totalAdministracionFormateado = totalAdministracion.toLocaleString(
      "es-CO",
      formatoMoneda
    );
    const totalDepositoFormateado = totalDeposito.toLocaleString(
      "es-CO",
      formatoMoneda
    );

    return {
      totalArriendo: totalArriendoFormateado,
      totalAdministracion: totalAdministracionFormateado,
      totalDeposito: totalDepositoFormateado,
    };
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPropietarios = propietarios.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalGeneral = calcularTotalGeneral();

  return (
    <>
      <div className="contener-home">
        <h2>Operación Inmobiliaria</h2>

        {/* Total General */}
        <div className="total-general">
          <p>Total General:</p>
          <p>Arriendo: {totalGeneral.totalArriendo}</p>
          <p>Administración: {totalGeneral.totalAdministracion}</p>
          <p>Depósito: {totalGeneral.totalDeposito}</p>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Propietarios</th>
              <th>Arriendo General</th>
              <th>Administración General</th>
              <th>Depósito General</th>
            </tr>
          </thead>
          <tbody>
            {currentPropietarios.map((propietario, index) => (
              <tr key={index}>
                <td>
                  <Button
                    variant="link"
                    onClick={() =>
                      showInmueblesModal(propietario.InmueblesAsociados)
                    }
                  >
                    {propietario.NombreCompleto}
                  </Button>
                </td>
                <td>
                  {propietario.InmueblesAsociados.reduce(
                    (acc, curr) => acc + curr.ValorInmueble,
                    0
                  )}
                </td>
                <td>
                  {propietario.InmueblesAsociados.reduce(
                    (acc, curr) => acc + curr.ValorInmueble * 0.08,
                    0
                  )}
                </td>
                <td>
                  {isNaN(
                    propietario.InmueblesAsociados.reduce(
                      (acc, curr) => acc + curr.Deposito / 2,
                      0
                    )
                  )
                    ? formatCurrency(0)
                    : formatCurrency(
                        propietario.InmueblesAsociados.reduce(
                          (acc, curr) => acc + curr.Deposito / 2,
                          0
                        )
                      )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Paginador */}
        <Pagination>
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from(
            { length: Math.ceil(propietarios.length / itemsPerPage) },
            (_, i) => (
              <Pagination.Item
                key={i}
                onClick={() => paginate(i + 1)}
                active={i + 1 === currentPage}
              >
                {i + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage >= Math.ceil(propietarios.length / itemsPerPage)
            }
          />
        </Pagination>

        {/* Modal para mostrar los detalles de los inmuebles */}
        <Modal size="lg" show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de Inmuebles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Arriendo</th>
                  <th>Administración</th>
                  <th>Depósito</th>
                  <th>Mitad Depósito</th>
                </tr>
              </thead>
              <tbody>
                {selectedInmuebles.length > 0 ? (
                  selectedInmuebles.map((inmueble, index) => (
                    <tr key={index}>
                      <td>{inmueble.Tipo}</td>
                      <td>{formatCurrency(inmueble.ValorInmueble)}</td>
                      <td>{formatCurrency(inmueble.ValorInmueble * 0.08)}</td>
                      <td>
                        {isNaN(inmueble.Deposito)
                          ? formatCurrency(0)
                          : formatCurrency(inmueble.Deposito)}
                      </td>
                      <td>
                        {inmueble.Deposito !== "N/A"
                          ? formatCurrency(parseFloat(inmueble.Deposito) / 2)
                          : 0}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      No hay inmuebles asociados a este propietario.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
