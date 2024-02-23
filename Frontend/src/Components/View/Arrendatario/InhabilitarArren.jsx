import { useEffect, useState } from "react";
import { Table, Button ,Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faTrash,
  faPenToSquare,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import ActualizarArrendatario from "../../Hooks/InhabilitarArren";
import { toast } from "react-toastify";

export const InhabilitarArren = () => {
  const [infoarrendatario, setinfoarrendatario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [arrendatarioIdToDelete, setarrendatarioIdToDelete] = useState(null);

  const notify = () =>
    toast.success("Se Habilito Correctamente ", {
      theme: "dark",
    });
  const errores = () =>
    toast.error("Hubo algun error  ", {
      theme: "dark",
    });

  //Modal para Inhabilitacion
  const handleOpenModal = (ArrendatarioId) => {
    setarrendatarioIdToDelete(ArrendatarioId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // Hook para actualizar el estado del arrendatario
  const { actualizarEstadoArrendatario } = ActualizarArrendatario();

  //Actualizar Estado Coduedor
  const handleHabilitarArrendatario = async (ArrendatarioId) => {
    try {
      await actualizarEstadoArrendatario(ArrendatarioId, "true");
      const updatedArrendatario = infoarrendatario.map((arrendatarios) =>
        arrendatarios.IdArrendatario === arrendatarios
          ? { ...arrendatarios, booleanos: "true" }
          : arrendatarios
      );
      setinfoarrendatario(updatedArrendatario);
      notify();
      setShowModal(false);
    } catch (error) {
      console.error("Error al inhabilitar arrendatario:", error);
      errores();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/Varrendatario");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const arrendatarioActivos = data.filter(
          (Arrendatarios) => Arrendatarios.booleanos === "false"
        );

        setinfoarrendatario(arrendatarioActivos);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const createheader = () => {
    return (
      <tr>
        <th>ID</th>
        <th>Tipo de Documento</th>
        <th>No. Documento</th>
        <th>Nombre</th>
        <th>Estado</th>
        <th>Teléfono</th>
        <th>Correo</th>
        <th>Opciones</th>
      </tr>
    );
  };
  const createrow = (Arrendatarios) => {
    return (
      <tr key={Arrendatarios.IdArrendatario}>
        <td>{Arrendatarios.IdArrendatario}</td>
        <td>{Arrendatarios.TipoDocumento}</td>
        <td>{Arrendatarios.DocumentoIdentidad}</td>
        <td>{Arrendatarios.NombreCompleto}</td>
        <td>{Arrendatarios.Estado}</td>
        <td>{Arrendatarios.Telefono}</td>
        <td>{Arrendatarios.Correo}</td>
        <td>
          <Button
            className="btn-opciones"
            variant="danger"
            onClick={() => handleOpenModal(Arrendatarios.IdArrendatario)}
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
  const currentItems = infoarrendatario.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
            <label className="l1">Estado: </label>
            <input className="input-filtroRe" type="text" name="" id="" />
          </div>
         
          <Button variant="dark" className="btn-add-info ">
            <Link to="/Arrendatario" className="linkes">
              <FontAwesomeIcon className="icon" icon={faUserSlash} /> Ver
              Habilitados
            </Link>
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Arrendatario</h1>
        </div>

        <div className="view_esp">
          <div className="table-container">
            <Table striped bordered hover>
              <thead> {createheader()} </thead>
              <tbody>
                {currentItems.map((Arrendatarios) => createrow(Arrendatarios))}
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
            {[...Array(Math.ceil(infoarrendatario.length / itemsPerPage))].map(
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
                currentPage ===
                Math.ceil(infoarrendatario.length / itemsPerPage)
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
          ¿Está seguro de que desea Habilitar este Arrendatario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleHabilitarArrendatario (arrendatarioIdToDelete)} 
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
