import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Slide.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faHouseUser,
  faPersonShelter,
  faPeopleRoof,
  faReceipt,
  faTable,
  faTableList,
  faRightFromBracket,
  faUserShield
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Modal, Button } from "react-bootstrap";
import { useEffect } from "react";


export const Slidebar = () => {

  const correousuario = localStorage.getItem('items')
  const [nombre, setnombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [Rol, setRol] = useState("");
  const [TTiporol, setTTiporol] = useState("");

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3006/Infouser?correousuario=${correousuario}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          localStorage.setItem('Rol',(data[0].idrol));
          localStorage.setItem('user',(data[0].nombre));
          localStorage.setItem('apellido',(data[0].apellido));
          setnombre(data[0].nombre)
          setApellido(data[0].apellido)
          setRol(data[0].idrol)
          if (data[0].idrol == 1) {
            setTTiporol("Admin");
          } else if (data[0].idrol== 2) {
            setTTiporol("Empleado");
          } else if (data[0].idrol== 3) {
            setTTiporol("Asesor Comercial");
          } else if (data[0].idrol== 4){
            setTTiporol("SuperUsuario");
          }
          console.log("Valor de Rol:", Rol);

        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchData();
    }, []);




  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    localStorage.clear
    window.location.href = "/";
  };

  const renderMenuItems = () => {

    const roleId = parseInt(Rol);

    if (roleId === 4) { //super usuario
      return (
      <>
      <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Propietario"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
        className="icons_sliderbard"
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faUserTie}
        />
        Propetarios
      </Nav.Link>
    </Nav.Item>

    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Inmueble"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faHouseUser}
        />
        Inmuebles
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Arrendatario"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faPersonShelter}
        />
        Arrendatarios
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Codeudor"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faPeopleRoof}
        />
        Codeudores
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/H_recibos"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faReceipt}
        />
        Recibo Arrendatarios
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/H_gastos"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faReceipt}
        />
        Recibo Gastos
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Carrendatario"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faTable}
        />
        Informe Arrendamiento
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Ginmuebles"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faTableList}
        />
        Comisiones Propetario
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/AsignarRol"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faUserShield}
        />
        Asignar Rol Empleados 
      </Nav.Link>
    </Nav.Item>
    </>
      );
    } else if (roleId === 2){// Empleado
      return (
      <>
 <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Propietario"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
        className="icons_sliderbard"
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faUserTie}
        />
        Propetarios
      </Nav.Link>
    </Nav.Item>

    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Inmueble"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faHouseUser}
        />
        Inmuebles
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Arrendatario"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faPersonShelter}
        />
        Arrendatarios
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Codeudor"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faPeopleRoof}
        />
        Codeudores
      </Nav.Link>
    </Nav.Item>
    </>
      );
    }
    else if (roleId === 3){//Asesor Comercial{
      return (
      <>
       <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/H_recibos"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faReceipt}
        />
        Recibo Arrendatarios
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/H_gastos"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faReceipt}
        />
        Recibo Gastos
      </Nav.Link>
    </Nav.Item>
    </>
      );
    } else if (roleId === 1){ //Administrador
      return (
      <>
      <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Carrendatario"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faTable}
        />
        Informe Arrendamiento
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to="/Ginmuebles"
        className="nav-link text-white"
        aria-current="page"
        exact={false}
      >
        <FontAwesomeIcon
          width="32"
          height="32"
          style={{ color: "#ffffff" }}
          icon={faTableList}
        />
        Comisiones Propetario
      </Nav.Link>
    </Nav.Item>
    </>
      );
    }
  }
  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: "280px", marginRight: "3%", minHeight: "100vh"}}
      >
        <span className="fs-4">
          {nombre} {apellido}
        </span>
        <p className="text-start">{TTiporol}</p>

        <hr />
        <Nav className="nav nav-pills flex-column mb-auto">
        {renderMenuItems()}
        </Nav>
        <hr />
        <Button
          variant="link"
          className="nav-link text-white"
          onClick={handleLogout}
        >
          <FontAwesomeIcon
            width="32"
            height="32"
            style={{ color: "#ffffff" }}
            icon={faRightFromBracket}
          />
          <strong>Cerrar Sesión</strong>
        </Button>
        {/* Modal para confirmacion */}
        <Modal
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
        >
          <Modal.Header closeButton={false}>
            <Modal.Title >Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que deseas salir de la sesión?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmation(false)}
            >
              No
            </Button>
            <Button variant="danger" onClick={confirmLogout}>
              Sí
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
