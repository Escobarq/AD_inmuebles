/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import "./propietarios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserSlash,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { toast } from "react-toastify";
import InhabilitarPropetarios from "../../Hooks/InhabilitarPropetarios";

export const InhabilitarPropetario = () => {
  const [infopropietario, setinfopropietario] = useState([]);
  const [Rol, setRol] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [PropetarioIdToDelete, setPropetarioIdToDelete] = useState(null);

  const notify = () =>
    toast.success("Se Habilito Correctamente ", {
      theme: "dark",
    });
  const errores = () =>
    toast.error("Hubo algun error  ", {
      theme: "dark",
    });

  //Modal para Inhabilitacion
  const handleOpenModal = (PropetarioId) => {
    setPropetarioIdToDelete(PropetarioId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // Hook para actualizar el estado del arrendatario
  const { actualizarEstadoPropetario } = InhabilitarPropetarios();

  //Actualizar Estado Coduedor
  const handleInhabilitarPropetario = async (PropetarioId) => {
    try {
      await actualizarEstadoPropetario(PropetarioId, "true");
      const updatedpropetario = infopropietario.map((Propetario) =>
        Propetario.IdPropietario === Propetario
          ? { ...Propetario, booleanos: "true" }
          : Propetario
      );
      setinfopropietario(updatedpropetario);
      notify();
      setShowModal(false);
    } catch (error) {
      console.error("Error al inhabilitar Propetario:", error);
      errores();
    }
  };

  //Visualizar Datos tabla
  useEffect(() => {
    let a = localStorage.getItem("Rol");
    setRol(a);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/Vpropietarios");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const PropetarioActivos = data.filter(
          (Propetarios) => Propetarios.booleanos === "false"
        );

        setinfopropietario(PropetarioActivos);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  const createheader = () => {
    return (
      <tr>
        <th>No. Documento</th>
        <th>Nombre</th>
        <th>Dirección</th>
        <th>Teléfono</th>
        <th>Correo</th>
        <th>Fecha de ingreso</th>
        <th>Banco</th>
        <th>Tipo de cuenta</th>
        <th>Número de cuenta</th>
        <th>Opciones</th>
      </tr>
    );
  };
  const createrow = (Propietario) => {
    return (
      <tr key={Propietario.IdPropietario}>
        <td>{Propietario.DocumentoIdentidad}</td>
        <td>{Propietario.NombreCompleto}</td>
        <td>{Propietario.Direccion}</td>
        <td>{Propietario.Telefono}</td>
        <td>{Propietario.Correo}</td>
        <td>{Propietario.FechaIngreso}</td>
        <td>{Propietario.Banco}</td>
        <td>{Propietario.TipoCuenta}</td>
        <td>{Propietario.NumeroCuenta}</td>
        <td>
          <Button
            className="btn-opciones"
            variant="danger"
            onClick={() => handleOpenModal(Propietario.IdPropietario)}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
          </Button>
          <Button className="btn-opciones" variant="warning">
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </td>
      </tr>
    );
  };
  //Variables Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infopropietario.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">
          <Button variant="dark" className="btn-add-info ">
            <Link to="/Propietario" className="linkes">
              <FontAwesomeIcon className="icon" icon={faUserSlash} /> Ver
              Habilitados
            </Link>
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Propetarios</h1>
        </div>

        <div className="view_esp">
          <div className="table-container">
            <Table striped bordered hover>
              <thead> {createheader()} </thead>
              <tbody>
                {currentItems.map((Propietarios) => createrow(Propietarios))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="paginador">
          <Pagination>
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(Math.ceil(infopropietario.length / itemsPerPage))].map(
              (item, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(infopropietario.length / itemsPerPage)
              }
            />
          </Pagination>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea inhabilitar este Arrendatario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleInhabilitarPropetario(PropetarioIdToDelete)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
