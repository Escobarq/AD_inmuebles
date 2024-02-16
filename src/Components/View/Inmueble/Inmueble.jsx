import "./inmuebles.css";
import { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination'
import {
  faEye,
  faUserPlus,
  faTrash,
  faPenToSquare,
  faHouseChimneyMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Inmueble = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleMostrarModalClick = () => {
    setMostrarModal(true);
  };

  const handleCloseModal = () => {
    setMostrarModal(false);
  };
  const [infoinmueble, setinfoinmueble] = useState([]);
  const [Rol, setRol] = useState("");

  useEffect(() => {
    let a = localStorage.getItem("Rol");
    setRol(a);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/Vinmueble");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setinfoinmueble(data);

        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  const createheader = () => {
    if (Rol == 2) {
      return (
        <tr>
          <th>Id propietario</th>
          <th>Id inmueble</th>
          <th>Dirección</th>
          <th>Estrato</th>
          <th>Ciudad</th>
          <th>Barrio</th>
          <th>Tipo</th>
          <th>Ver más</th>
          <th>Asignar arrendatario</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th>Id propietario</th>
          <th>Id inmueble</th>
          <th>Dirección</th>
          <th>Estrato</th>
          <th>Ciudad</th>
          <th>Barrio</th>
          <th>Tipo</th>
          <th>Ver más</th>
          <th>Asignar arrendatario</th>
          <th>Opciones</th>
        </tr>
      );
    }
  };
  const createrow = (Inmuebles) => {
    if (Rol == 2) {
      if (Inmuebles.Estado == "Ocupado") {
        return (
          <tr>
            <td>{Inmuebles.Id_Propietario}</td>
            <td>{Inmuebles.Id_Inmueble}</td>
            <td>{Inmuebles.Direccion}</td>
            <td>{Inmuebles.Estrato}</td>
            <td>{Inmuebles.Ciudad}</td>
            <td>{Inmuebles.Barrio}</td>
            <td>{Inmuebles.Tipo}</td>
            <td>
              <Button variant="primary" onClick={handleMostrarModalClick}>
                <FontAwesomeIcon icon={faEye} />{" "}
              </Button>
            </td>
            <td>
              <Button disabled variant="success">
                <FontAwesomeIcon icon={faUserPlus}  /> 
              </Button>
            </td>
          </tr>
        );
      } else {
        <tr>
          <td>{Inmuebles.Id_Propietario}</td>
          <td>{Inmuebles.Id_Inmueble}</td>
          <td>{Inmuebles.Direccion}</td>
          <td>{Inmuebles.Estrato}</td>
          <td>{Inmuebles.Ciudad}</td>
          <td>{Inmuebles.Barrio}</td>
          <td>{Inmuebles.Tipo}</td>
          <td>
            <Button variant="primary" onClick={handleMostrarModalClick}>
              <FontAwesomeIcon icon={faEye} />{" "}
            </Button>
          </td>
          <td>
            <Button variant="success"><FontAwesomeIcon icon={faUserPlus}  /> </Button>
          </td>
        </tr>;
      }
    } else {
      return (
        <tr>
          <td>{Inmuebles.Id_Propietario}</td>
          <td>{Inmuebles.Id_Inmueble}</td>
          <td>{Inmuebles.Direccion}</td>
          <td>{Inmuebles.Estrato}</td>
          <td>{Inmuebles.Ciudad}</td>
          <td>{Inmuebles.Barrio}</td>
          <td>{Inmuebles.Tipo}</td>
          <td>
            <Button variant="primary" onClick={handleMostrarModalClick}>
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </td>
          <td>
            <Button variant="success"><FontAwesomeIcon icon={faUserPlus}  /> </Button>
          </td>
          <td>
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
  };
  return (
    <>
      <div className="contener-home">
      <div className="conten-filtro">
          <div className="conten-inputs">
        <label className="l1" >Tipo Inmueble </label>
        <select className="input-filtroRe" name="" id="">
          <option value="Apartamento">Apartamento</option>
          <option value="Bodega">Bodega</option>
          <option value="Casa">Casa</option>
          <option value="Oficina">Oficina</option>
          <option value="Local">Local</option>
        </select>
        
        <label className="l1" >Estrato </label>
        <select className="input-filtroRe" name="" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>

        <label className="l1" >Estado </label>
        <select className="input-filtroRe" name="" id="">
          <option value="Ocupado">Ocupado</option>
          <option value="Disponible">Disponible</option>          
        </select>
        
          </div>
        
      <Button variant="success" className="btn-add" ><FontAwesomeIcon icon={faHouseChimneyMedical} style={{color: "#ffffff",}} />  Agregar Inmueble</Button>{' '}
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Inmuebles</h1>
        </div>
        <div className="view_esp">
          <div className="table-container">
            <Table striped bordered hover>
              <thead>{createheader()}</thead>
              <tbody>
                {infoinmueble.map((Inmuebles) => createrow(Inmuebles))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="paginador">

        <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
        </div>
        {/* Modal */}
        <Modal
          size="lg" // Agregar la propiedad size="lg" para el modal largo
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
                  <th>Area Construida</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </Modal.Body>
        </Modal>

        
      </div>
      
    </>
  );
};
