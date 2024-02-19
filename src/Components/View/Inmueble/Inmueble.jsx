import  { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import {
  faEye,
  faUserPlus,
  faTrash,
  faPenToSquare,
  faHouseChimneyMedical,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./inmuebles.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const Inmueble = () => {
  const notify = () =>
    toast.success("Se Asigno el arrendatario Exitosamente", {
      theme: "dark",
    });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalA, setMostrarModalA] = useState(false);
  const [infoinmueble, setinfoinmueble] = useState([]);
  const [infoarrendatario, setinfoarrendatario] = useState([]);
  const [inmuebleseleccion, setinmuebleseleccion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [existe, setExiste] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/Vinmueble");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setinfoinmueble(data);
        console.log(data)
        setinmuebleseleccion(data);
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

    fetchDataArren();

    fetchData();

  }, []);

  const createheader = () => {
    return (
      <tr>
        <th>Id propietario</th>
        <th>Id inmueble</th>
        <th>Dirección</th>
        <th>Estrato</th>
        <th>Ciudad</th>
        <th>Barrio</th>
        <th>Tipo</th>    
        <th>Opciones</th>
      </tr>
    );
  };

  const createrow = (inmueble) => {

      return (
        <tr key={inmueble.Id_Inmueble}>
          <td>{inmueble.Id_Propietario}</td>
          <td>{inmueble.Id_Inmueble}</td>
          <td>{inmueble.Direccion}</td>
          <td>{inmueble.Estrato}</td>
          <td>{inmueble.Ciudad}</td>
          <td>{inmueble.Barrio}</td>
          <td>{inmueble.Tipo}</td>
          <td>
            <Button className="btn-opciones" variant="primary" onClick={() =>handleMostrarModalClick(inmueble)}>
              <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button className="btn-opciones" onClick={() => handleMostrarAClick(inmueble)} variant="success">
              <FontAwesomeIcon icon={faUserPlus} />
            </Button>
            <Button className="btn-opciones" variant="danger">
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
      return (
        <tr >
          <td>{ inmuebleseleccion.No_Niveles}</td>
          <td>${ inmuebleseleccion.Valor_Inmueble}</td>
          <td>{ inmuebleseleccion.No_Banos}</td>
          <td>{ inmuebleseleccion.Servicios_Publicos}</td>
          <td>{ inmuebleseleccion.No_Habitaciones}</td>
          <td>{ inmuebleseleccion.Estado}</td>
          <td>{ inmuebleseleccion.No_Terraza}</td>
        </tr>
      );
    }


  const createrowA = (Arrendatarios) => {

    return (
      <tr onClick={() => handleRowClickAndUpdate(Arrendatarios)} key={Arrendatarios.Id_Arrendatario}>
      <td>{Arrendatarios.Tipo_Documento}</td>
      <td>{Arrendatarios.Documento_Identidad}</td>
      <td>{Arrendatarios.Nombre_Completo}</td>
      <td>{Arrendatarios.Estado}</td>
      <td>{Arrendatarios.Telefono}</td>
      <td>{Arrendatarios.Correo}</td>
    </tr>
    );
  };
  
  const handleRowClickAndUpdate = async (Arrendatarios) => {
    
    try {
      const Id_Inmueble = inmuebleseleccion[0].Id_Inmueble;
      const { Id_Arrendatario } = Arrendatarios;
      const response = await fetch(`http://localhost:3006/actualizarInmueble?Id_Inmueble=${Id_Inmueble}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id_Arrendatario: Id_Arrendatario,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el inmueble');
      }
      
      notify(),
      // Agrega cualquier lógica adicional o actualizaciones de estado según sea necesario
      console.log('Inmueble actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el inmueble:', error);
    }
  };

  const handleMostrarModalClick = async (inmueble) => {
    setinmuebleseleccion(inmueble)
    setMostrarModal(true);
  };

  const handleCloseModal = () => {
    setMostrarModal(false);
  };
  const handleMostrarAClick = async (inmueble) => {
    const Id_Inmueble = inmueble.Id_Inmueble

    if (inmueble.Estado == "Ocupado"){
      const ValidarInmArr = async () => {
        setExiste(true)
        try {
            const response = await fetch(`http://localhost:3006/Vinmu_Arren?Id_Inmueble=${Id_Inmueble}`);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setinmuebleseleccion(data)
            
            setMostrarModalA(true);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        ValidarInmArr()
        
    }
    else{
      setMostrarModalA(true);
      setExiste(false)
      setinmuebleseleccion(inmueble)

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
            <select className="input-filtroRe" name="" id="">
              <option value="Apartamento">Apartamento</option>
              <option value="Bodega">Bodega</option>
              <option value="Casa">Casa</option>
              <option value="Oficina">Oficina</option>
              <option value="Local">Local</option>
            </select>

            <label className="l1">Estrato</label>
            <select className="input-filtroRe" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>

            <label className="l1">Estado</label>
            <select className="input-filtroRe" name="" id="">
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
            {existe ? ( 
              <p>hola</p>
        
      ) : (
        <p></p>
      )}
          </Modal.Header>
          <Modal.Body>
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
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
