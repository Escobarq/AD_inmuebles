import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Slide.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserTie,
  faHouseUser,
  faPersonShelter,
  faPeopleRoof,
  faReceipt,
  faTable,
  faTableList,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Modal, Button } from "react-bootstrap";
import { useEffect } from "react";

export const Slidebar = () => {
  const nombre = localStorage.getItem("user");
  const apellido = localStorage.getItem("apellido");
  const Rol = localStorage.getItem("Rol");
  const [TTiporol, setTTiporol] = useState("");

  useEffect(() => {
    if (Rol == 1) {
      setTTiporol("Admin");
    } else if (Rol == 2) {
      setTTiporol("Empleado");
    }
  }, []);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: "280px", marginRight: "3%", height: "100vh" }}
      >
        <span className="fs-4">
          {nombre} {apellido}
        </span>
        <p className="text-start">{TTiporol}</p>

        <hr />
        <Nav className="nav nav-pills flex-column mb-auto">
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="/Propietario"
              className="nav-link text-white"
              aria-current="page"
              exact={false}
            >
              <FontAwesomeIcon
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
              Historial Arrendamiento
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
              Historial Comision Propetario
            </Nav.Link>
          </Nav.Item>
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
          <strong>Salir Sesión</strong>
        </Button>
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
