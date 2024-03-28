import  { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./inmuebles.css";
import { toast } from "react-toastify";
import {
  faTrash,
  faPenToSquare,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import useActualizarEstadoInmueble from "../../Hooks/InhabilitarInmueble";
import useRoleInfo from "../../Hooks/useRoleInfo";


export const InhabilitarInmuebles = () => {
  const { actualizarEstadoInmueble } = useActualizarEstadoInmueble();
  const roleId = useRoleInfo();
  const [inmuebleIdBoolean, setInmueblesBoolean] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [infoinmueble, setinfoinmueble] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/Vinmueble");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const INmueblesActivos = data.filter(
          (inmueble) => inmueble.booleanos === "false"
        );
        setinfoinmueble(INmueblesActivos);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const createheader = () => {
    return (
      <tr>
        <th>Nombre Propietario</th>
        <th>Dirección</th>
        <th>Estrato</th>
        <th>Ciudad</th>
        <th>Barrio</th>
        <th>Tipo</th>
        {roleId !== 2 && <th>Opciones</th>}
      </tr>
    );
  };

  const createrow = (inmueble) => {
    return (
      <tr key={inmueble.IdInmueble}>
        <td>{inmueble.NombrePropietario}</td>
        <td>{inmueble.Direccion}</td>
        <td>{inmueble.Estrato}</td>
        <td>{inmueble.Ciudad}</td>
        <td>{inmueble.Barrio}</td>
        <td>{inmueble.Tipo}</td>
        {roleId !== 2 && (
        <td>
          <Button
            className="btn-opciones"
            variant="danger"
            onClick={() => handleOpenModal(inmueble.IdInmueble)}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
          </Button>
          <Button className="btn-opciones" variant="warning">
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </td>
      )}
      </tr>
    );
  };

  // Función para mostrar el modal de confirmación
  const handleOpenModal = (IdInmueble) => {
    setInmueblesBoolean(IdInmueble);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Función para inhabilitar el inmueble
  const InhabilitarInmueble = async (IdInmueble) => {
    try {
      await actualizarEstadoInmueble(IdInmueble, "true");

      const updatedInmueble = infoinmueble.map((inmueble) =>
        inmueble.IdInmueble === IdInmueble
          ? { ...inmueble, booleanos: "true" }
          : inmueble
      );

      setinfoinmueble(updatedInmueble);
      notifi();
      setShowModal(false);
    } catch (error) {
      console.error("Error al inhabilitar Inmueble:", error);
      errores();
    }
  };

  // Funciones para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infoinmueble.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Funciones de notificación
  const errores = () =>
    toast.error("Hubo algun error  ", {
      theme: "dark",
    });
 
  const notifi = () =>
    toast.success("Se Inabilito Correctamente ", {
      theme: "dark",
    });
    const redireccion = (ruta) => {
      window.location.href = ruta;
    }
    
  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">
          <Button variant="dark" className="btn-add-info" onClick={() => redireccion("/Inmueble")}>
              <FontAwesomeIcon className="icon" icon={faUserSlash} /> Ver
              Inabilitados
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Inmuebles</h1>
        </div>
        <div className="view_esp">
          <div className="table-container">
            <Table striped bordered hover>
              <thead>{createheader()}</thead>
              <tbody>
                {currentItems.map((inmueble) => createrow(inmueble))}
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
            {[...Array(Math.ceil(infoinmueble.length / itemsPerPage))].map(
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
                currentPage === Math.ceil(infoinmueble.length / itemsPerPage)
              }
            />
          </Pagination>
        </div>
      </div>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea Habilitar este inmueble?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => InhabilitarInmueble(inmuebleIdBoolean)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
