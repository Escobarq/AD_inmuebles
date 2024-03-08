import { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import ActualizarCodeudor from "../../Hooks/Inhabilitarcodeudor";
import { toast } from "react-toastify";


export const CodeudorInha = () => {
  const [infoCodeudor, setinfoCodeudor] = useState([]);
  const { actualizarEstadoCodeudor } = ActualizarCodeudor();
  const [showModal, setShowModal] = useState(false);
  const [codeudorIdToDelete, setCodeudorIdToDelete] = useState(null);

  const notify = () =>
  toast.success("Se Habilito Correctamente ", {
    theme: "dark",
  });
  const errores = () =>
  toast.error("Hubo algun error  ", {
    theme: "dark",
  });
  //Actualizar Estado Coduedor
  const handleHabilitarCodeudor = async (codeudorId) => {
    try {
      await actualizarEstadoCodeudor(codeudorId, "true");
      
      const updatedCodeudores = infoCodeudor.map((codeudor) =>
        codeudor.IdCodeudor === codeudorId
          ? { ...codeudor, booleanos: "true" }
          : codeudor
      );
      setinfoCodeudor(updatedCodeudores);
      setShowModal(false);
      notify();
    } catch (error) {
      console.error("Error al habilitar codeudor:", error);
      errores();
    }
  };
  //Modal para Inhabilitacion
  const handleOpenModal = (codeudorId) => {
    setCodeudorIdToDelete(codeudorId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/Vcodeudor");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Filtrar los datos para incluir solo aquellos con booleanos=true
        const codeudoresActivos = data.filter(
          (codeudor) => codeudor.booleanos === "false"
        );

        setinfoCodeudor(codeudoresActivos);

        console.log(codeudoresActivos);
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
        <th>No. Documento</th>
        <th>Nombre</th>
        <th>Dirección</th>
        <th>Teléfono</th>
        <th>Correo</th>
        <th>Opciones</th>
      </tr>
    );
  };

  const createrow = (Codeudor) => {
    return (
      <tr key={Codeudor.IdCodeudor}>
        <td>{Codeudor.IdCodeudor}</td>
        <td>{Codeudor.DocumentoIdentidad}</td>
        <td>{Codeudor.NombreCompleto}</td>
        <td>{Codeudor.Direccion}</td>
        <td>{Codeudor.Telefono}</td>
        <td>{Codeudor.Correo}</td>
        <td>
          <Button
            className="btn-opciones"
            variant="danger"
            onClick={() => handleOpenModal(Codeudor.IdCodeudor)}
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
  const currentItems = infoCodeudor.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const redireccion = (ruta) => {
    window.location.href = ruta;
  }
  
  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">
          <Button variant="dark" className="btn-add-info" onClick={() => redireccion("/Codeudor")}>
              <FontAwesomeIcon className="icon" icon={faEye} /> Ver Habilidatos
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Codeudores Inhabilitados</h1>
        </div>

        <div className="view_esp">
          <div className="table-container">
            <Table striped bordered hover>
              <thead> {createheader()} </thead>
              <tbody>
                {currentItems.map((Codeudors) => createrow(Codeudors))}
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
            {[...Array(Math.ceil(infoCodeudor.length / itemsPerPage))].map(
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
                currentPage === Math.ceil(infoCodeudor.length / itemsPerPage)
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
          ¿Está seguro de que desea Habilitar este codeudor?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleHabilitarCodeudor(codeudorIdToDelete)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
