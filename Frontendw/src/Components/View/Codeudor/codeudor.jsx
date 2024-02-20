import { Table, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faPenToSquare,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

export const Codeudor = () => {
  const [infoCodeudor, setinfoCodeudor] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //Modal para Inhabilitacion
  const handleOpenModal = () => {
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
          (codeudor) => codeudor.booleanos === "true"
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
      <tr key={Codeudor.Id_Codeudor}>
        <td>{Codeudor.Id_Codeudor}</td>
        <td>{Codeudor.Documento_Identidad}</td>
        <td>{Codeudor.Nombre_Completo}</td>
        <td>{Codeudor.Direccion}</td>
        <td>{Codeudor.Telefono}</td>
        <td>{Codeudor.Correo}</td>
        <td>
          <Button
            className="btn-opciones"
            variant="danger"
            onClick={handleOpenModal}
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
  const currentItems = infoCodeudor.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Actualizar estado
  const handleInhabilitarCodeudor = async (id) => {
    try {
      const response = await fetch(`http://localhost:3006/Vcodeudor/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: 'false' }), // Cambiar el estado a 'false'
      });
      if (!response.ok) {
        throw new Error('Error al cambiar el estado del codeudor');
      }
      // Actualizar la lista de codeudores activos después de cambiar el estado
      const nuevosCodeudoresActivos = infoCodeudor.filter(codeudor => codeudor.Id_Codeudor !== id);
      setinfoCodeudor(nuevosCodeudoresActivos);
    } catch (error) {
      console.error('Error al inhabilitar el codeudor:', error);
    }
  };
  
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
            <Link to="/Registrocodeudor">
              <FontAwesomeIcon className="icon" icon={faUserPlus} /> Agregar
              Codeudor
            </Link>
          </Button>
          <Button variant="dark" className="btn-add-info ">
            <Link to="/Codeudores" className="linkes">
              <FontAwesomeIcon className="icon" icon={faUserSlash} /> Ver
              Inabilitados
            </Link>
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Codeudor</h1>
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
          ¿Está seguro de que desea inhabilitar este codeudor?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleInhabilitarCodeudor}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};