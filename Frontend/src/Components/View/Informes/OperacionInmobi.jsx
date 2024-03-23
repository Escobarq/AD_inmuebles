import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import './GastosyContrato.css'
export const OperacionInmobi = () => {
  // Datos de prueba
  const [propietarios, setPropietarios] = useState([
    {
      nombre: "Propietario 1",
      inmuebles: [
        { id: 1, arriendo: 1000, administracion: 200, deposito: 300 },
        { id: 2, arriendo: 1500, administracion: 250, deposito: 400 }
      ]
    },
    {
      nombre: "Propietario 2",
      inmuebles: [
        { id: 3, arriendo: 1200, administracion: 220, deposito: 320 },
        { id: 4, arriendo: 1700, administracion: 270, deposito: 420 }
      ]
    }
  ]);

  // Estado para controlar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);
  // Estado para almacenar los detalles de los inmuebles seleccionados
  const [selectedInmuebles, setSelectedInmuebles] = useState([]);

  // Función para mostrar el modal con los detalles de los inmuebles
  const showInmueblesModal = (inmuebles) => {
    setSelectedInmuebles(inmuebles);
    setShowModal(true);
  };

  // Función para ocultar el modal
  const handleCloseModal = () => setShowModal(false);

  // Función para calcular el total general de arriendo, administración y depósito
  const calcularTotalGeneral = () => {
    let totalArriendo = 0;
    let totalAdministracion = 0;
    let totalDeposito = 0;

    propietarios.forEach((propietario) => {
      propietario.inmuebles.forEach((inmueble) => {
        totalArriendo += inmueble.arriendo;
        totalAdministracion += inmueble.administracion;
        totalDeposito += inmueble.deposito;
      });
    });

    return { totalArriendo, totalAdministracion, totalDeposito };
  };

  // Calcular el total general
  const totalGeneral = calcularTotalGeneral();

  return (
    <>
    <div className="contener-home">
      <h2>Operación Inmobiliaria</h2>
      <div className="total-general">
      <strong>Total General:</strong> Arriendo: {totalGeneral.totalArriendo}, Administración: {totalGeneral.totalAdministracion}, Depósito: {totalGeneral.totalDeposito}
       </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Propietario</th>
            <th>Valor de Arriendo</th>
            <th>Valor de Administración</th>
            <th>Valor del Depósito</th>
          </tr>
        </thead>
        <tbody>
          {propietarios.map((propietario, index) => (
            <tr key={index}>
              <td>
                <Button variant="link" onClick={() => showInmueblesModal(propietario.inmuebles)}>
                  {propietario.nombre}
                </Button>
              </td>
              <td>{propietario.inmuebles.reduce((acc, curr) => acc + curr.arriendo, 0)}</td>
              <td>{propietario.inmuebles.reduce((acc, curr) => acc + curr.administracion, 0)}</td>
              <td>{propietario.inmuebles.reduce((acc, curr) => acc + curr.deposito, 0)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para mostrar los detalles de los inmuebles */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de Inmuebles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Arriendo</th>
                <th>Administración</th>
                <th>Depósito</th>
              </tr>
            </thead>
            <tbody>
              {selectedInmuebles.map((inmueble, index) => (
                <tr key={index}>
                  <td>{inmueble.id}</td>
                  <td>{inmueble.arriendo}</td>
                  <td>{inmueble.administracion}</td>
                  <td>{inmueble.deposito}</td>
                </tr>
              ))}
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

