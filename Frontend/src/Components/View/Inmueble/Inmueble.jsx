import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./inmuebles.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  faEye,
  faUserPlus,
  faTrash,
  faPenToSquare,
  faHouseChimneyMedical,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import useActualizarEstadoInmueble  from "../../Hooks/InhabilitarInmueble";
import NoResultImg from "../../../assets/NoResult.gif"


export const Inmueble = () => {
  const { actualizarEstadoInmueble } = useActualizarEstadoInmueble(); // Cambiado aquí
  const [NoResult, setNoResult]= useState(false)
  const [filtroData, setFiltroData] = useState({
    estado: '',
    tipo: '',
    estrato: '',
  });
  const [inmuebleIdBoolean, setInmueblesBoolean] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //Actualizar Estado Inmueble
  const InhabilitarInmueble = async (InmuebleId) => {
    try {
      await actualizarEstadoInmueble(InmuebleId, "false"); // Cambiado aquí

      const updatedInmueble = infoinmueble.filter(
        (inmueble) => inmueble.IdCodeudor !== InmuebleId
      );
      
      setinfoinmueble(updatedInmueble);
      notifi();
      setShowModal(false);
    } catch (error) {
      console.error("Error al inhabilitar Inmueble:", error);
      errores();
    }
  };
  //Modal para Inhabilitacion
  const handleOpenModal = (InmuebleId) => {
    setInmueblesBoolean(InmuebleId);
    setShowModal(true);
  };

  const handleCloseModals = () => {
    setShowModal(false);
  };

  const errores = () =>
    toast.error("Hubo algun error  ", {
      theme: "dark",
    });
  const notify = () =>
    toast.success("Se Asigno el arrendatario Exitosamente", {
      theme: "dark",
    });
  const notifi = () =>
    toast.success("Se Inabilito Correctamente ", {
      theme: "dark",
    });
  // Mostrar Modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalA, setMostrarModalA] = useState(false);
  // Mostrar informacion arrendatario
  const [infoarrendatario, setinfoarrendatario] = useState([]);
  // Paginacion
  const [infoinmueble, setinfoinmueble] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  

  // Actualizar Inmueble
  const [inmuebleseleccion, setinmuebleseleccion] = useState(null);

  useEffect(() => {
    fetchDataArren();
    fetchData();
  }, [filtroData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
  };
  
  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams(filtroData);
      const response = await fetch(`http://localhost:3006/Vinmueble?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const INmueblesActivos = data.filter(
        (inmueble) => inmueble.booleanos === "true"
      );

      setinfoinmueble(INmueblesActivos);
      if (INmueblesActivos.length == 0){
        setNoResult(true)
      }
      else {
        setNoResult(false)
        
      }

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchDataArren = async () => {
    try {
      const response = await fetch("http://localhost:3006/Varrendatario");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setinfoarrendatario(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const createheader = () => {
    return (
      <tr>
        <th>NIT Pro</th>
        <th>NIT</th>
        <th>Dirección</th>
        <th>Estrato</th>
        <th>Ciudad</th>
        <th>Barrio</th>
        <th>Tipo</th>
        <th>Estado</th>
        <th>Opciones</th>
      </tr>
    );
  };

  const createrow = (inmueble) => {
      return (
        <tr key={inmueble.IdInmueble}>
          <td>{inmueble.IdPropietario}</td>
          <td>{inmueble.NoMatricula}</td>
          <td>{inmueble.Direccion}</td>
          <td>{inmueble.Estrato}</td>
          <td>{inmueble.Ciudad}</td>
          <td>{inmueble.Barrio}</td>
          <td>{inmueble.Tipo}</td>
          <td>{inmueble.Estado}</td>
          <td>
            <Button
              className="btn-opciones"
              variant="primary"
              onClick={() => handleMostrarModalClick(inmueble)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button
              className="btn-opciones"
              onClick={() => handleMostrarAClick(inmueble)}
              variant="success"
            >
              <FontAwesomeIcon icon={faUserPlus} />
            </Button>
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
        </tr>
      );
    }
  

  const createrowDetalles = () => {
    if (inmuebleseleccion) {
      return (
        <tr>
          <td>{inmuebleseleccion.NoNiveles}</td>
          <td>${inmuebleseleccion.ValorInmueble}</td>
          <td>{inmuebleseleccion.NoBanos}</td>
          <td>{inmuebleseleccion.ServiciosPublicos}</td>
          <td>{inmuebleseleccion.NoHabitaciones}</td>
          <td>{inmuebleseleccion.Estado}</td>
          <td>{inmuebleseleccion.NoTerraza}</td>
        </tr>
      );
    } else {
      return null; // Otra opción es retornar un mensaje de carga o cualquier otro contenido que desees mostrar mientras se carga la información
    }
  };
  const existe = () => {
    if (inmuebleseleccion) {
      if(inmuebleseleccion.IdArrendatario >= 1) {
        return (
          <>
          <p>Alerta Ya se encuentra un arrendador asignado</p>
          <p>Su nombre es {inmuebleseleccion.NombreCompleto}, con No de identidad : {inmuebleseleccion.DocumentoIdentidad}</p>
          <p>Para cambiar de arrendatario solo seleccionelo en la siguiente lista:</p>
          </>
        );
        
      }
      else {
        return null
      }
    } else {
      return null; // Otra opción es retornar un mensaje de carga o cualquier otro contenido que desees mostrar mientras se carga la información
    }
  };

  const createrowA = (Arrendatarios) => {
    return (
      <tr
        onClick={() => handleRowClickAndUpdate(Arrendatarios)}
        key={Arrendatarios.IdArrendatario}
      >
        <td>{Arrendatarios.TipoDocumento}</td>
        <td>{Arrendatarios.DocumentoIdentidad}</td>
        <td>{Arrendatarios.NombreCompleto}</td>
        <td>{Arrendatarios.Estado}</td>
        <td>{Arrendatarios.Telefono}</td>
        <td>{Arrendatarios.Correo}</td>
      </tr>
    );
  };

  const handleRowClickAndUpdate = async (Arrendatarios) => {
    try {
      console.log(inmuebleseleccion)
      const IdInmueble = inmuebleseleccion.IdInmueble;
      const { IdArrendatario } = Arrendatarios;

      const response = await fetch(
        `http://localhost:3006/actualizarInmueble?IdInmueble=${IdInmueble}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            IdArrendatario: IdArrendatario,
            Estado:"Ocupado",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el inmueble");
      }

      notify();
      console.log("Inmueble actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el inmueble:", error);
    }
  };
  const handleRowClickAndDelete = async () => {
    try {
      console.log(inmuebleseleccion)
      const IdInmueble = inmuebleseleccion.IdInmueble;
      const { IdArrendatario } = 0;
      

      const response = await fetch(
        `http://localhost:3006/actualizarInmueble?IdInmueble=${IdInmueble}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            IdArrendatario: IdArrendatario,
            Estado:"Disponible",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el inmueble");
      }

      notify();
      console.log("Inmueble actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el inmueble:", error);
    }
  };

  const handleMostrarModalClick = async (inmueble) => {
    setinmuebleseleccion(inmueble);
    setMostrarModal(true);
  };

  const handleCloseModal = () => {
    setMostrarModal(false);
  };

  const handleMostrarAClick = async (inmueble) => {
    const IdInmueble = inmueble.IdInmueble;

    if (inmueble.Estado === "Ocupado") {
      const ValidarInmArr = async () => {
        
        try {
          const response = await fetch(
            `http://localhost:3006/VinmuArren?IdInmueble=${IdInmueble}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setinmuebleseleccion(data[0]);
          setMostrarModalA(true);
          
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      ValidarInmArr();
    } else {
      setMostrarModalA(true);
      
      setinmuebleseleccion(inmueble);
    }
  };

  const handleCloseModalA = () => {
    setMostrarModalA(false);
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infoinmueble.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">
          <div className="conten-inputs">
            <label className="l1">Tipo Inmueble</label>
            <select className="input-filtroRe"  value={filtroData.tipo} onChange={handleChange} name="tipo" id="">
              <option selected value="">Seleccione el tipo</option>
              <option  value="Apartamento">Apartamento</option>
              <option value="Bodega">Bodega</option>
              <option value="Casa">Casa</option>
              <option value="Oficina">Oficina</option>
              <option value="Local">Local</option>
            </select>

            <label className="l1">Estrato</label>
            <select className="input-filtroRe"   value={filtroData.estrato} onChange={handleChange} name="estrato" id="">
              <option selected value="">Seleccione el estrato</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>

            <label className="l1">Estado</label>
            <select className="input-filtroRe"  value={filtroData.estado} onChange={handleChange} name="estado" id="">
              <option selected value="">Seleccione estado</option>
              <option value="Ocupado">Ocupado</option>
              <option value="Disponible">Disponible</option>
            </select>
          </div>
          <Button variant="success" className="btn-add">
            <Link to="/RInmuebleA">
              <FontAwesomeIcon
                icon={faHouseChimneyMedical}
                style={{ color: "#ffffff" }}
              />
              Agregar Inmueble
            </Link>
          </Button>
          <Button variant="dark" className="btn-add-info ">
            <Link to="/InhaInmueble" className="linkes">
              <FontAwesomeIcon className="icon" icon={faUserSlash} /> Ver
              Inhabilitados
            </Link>
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Inmuebles</h1>
        </div>
        <div className="view_esp">
        {NoResult == true ? (
          <div>
            <img src={NoResultImg} alt="" />
          </div>
        ):(

          <div className="table-container">
            <Table striped bordered hover>
              <thead>{createheader()}</thead>
              <tbody>
                {currentItems.map((inmueble) => createrow(inmueble))}
              </tbody>
            </Table>
          </div>
        )}
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
        {/* Modal */}
        <Modal
          size="lg"
          show={mostrarModal}
          onHide={handleCloseModal}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Detalles del inmueble</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Numero Niveles</th>
                  <th>Valor Inmueble</th>
                  <th>Numero Baños</th>
                  <th>Servicios Publicos</th>
                  <th>Numero Habitaciones</th>
                  <th>Estado</th>
                  <th>Numero Terrazas</th>
                </tr>
              </thead>
              <tbody>{createrowDetalles()}</tbody>
            </Table>
          </Modal.Body>
        </Modal>

        <Modal
          size="lg"
          show={mostrarModalA}
          onHide={handleCloseModalA}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Arrendatarios Disponibles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {existe()}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tipo de Documento</th>
                  <th>No. Documento</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  
                </tr>
              </thead>
              <tbody>
                {infoarrendatario.map((Arrendatarios) =>
                  createrowA(Arrendatarios)
                )}
                <Link to="/ReArrendatario">                  
                <Button variant="primary">Otro</Button>
                </Link>
                <Button variant="danger" onClick={() => handleRowClickAndDelete()}>
                Quitar Arrendatario
                </Button>
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
      <Modal show={showModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea inhabilitar este inmueble?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
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
