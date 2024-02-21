/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, Button , Modal } from "react-bootstrap";
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
import InhabilitarPropetario from "../../Hooks/InhabilitarPropetarios";

export const Propietarios = () => {
  const [infopropietario, setinfopropietario] = useState([]);
  const [Rol, setRol] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [PropetarioIdToDelete, setPropetarioIdToDelete] = useState(null);

  const notify = () =>
    toast.success("Se Inabilito Correctamente ", {
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
  const { actualizarEstadoPropetario } = InhabilitarPropetario();

  //Actualizar Estado Coduedor
  const handleInhabilitarPropetario = async (PropetarioId) => {
    try {
      await actualizarEstadoPropetario(PropetarioId, "false");
      const updatedpropetario = infopropietario.filter(
        (Propetarios) => Propetarios.Id_Propietario !== PropetarioId
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
          (Propetarios) => Propetarios.booleanos === "true"
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
      <tr key={Propietario.Id_Propietario}>
        <td>{Propietario.Documento_Identidad}</td>
        <td>{Propietario.Nombre_Completo}</td>
        <td>{Propietario.Direccion}</td>
        <td>{Propietario.Telefono}</td>
        <td>{Propietario.Correo}</td>
        <td>pendiente</td>
        <td>{Propietario.Banco}</td>
        <td>{Propietario.Tipo_Cuenta}</td>
        <td>{Propietario.Numero_Cuenta}</td>
        <td>
          <Button
            className="btn-opciones"
            variant="danger"
            onClick={() => handleOpenModal(Propietario.Id_Propietario)}
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
  const [itemsPerPage] = useState(10);
  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infopropietario.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">
          <div className="conten-inputs">
            <label className="l1">No. Cedula: </label>
            <input
              className="input-filtroRe"
              type="number"
              name=""
              max={9999999999}
              id=""
            />
            <label className="l1">Fecha Ingreso: </label>
            <input className="input-filtroRe" type="date" name="" id="" />
          </div>
          <Button variant="success" className="btn-add">
            <Link to="/RPropietario">
              <FontAwesomeIcon className="icon" icon={faUserPlus} /> Agregar
              Propietario
            </Link>
          </Button>
          <Button variant="dark" className="btn-add-info ">
            <Link to="/InhaPropietarios" className="linkes">
              <FontAwesomeIcon className="icon" icon={faUserSlash} /> Ver
              Inabilitados
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
            onClick={() => handleInhabilitarPropetario (PropetarioIdToDelete)} 
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
