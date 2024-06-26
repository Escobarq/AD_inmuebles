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
  faFileContract,
  faRightFromBracket,
  faUserShield,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  Dropdown,
} from "react-bootstrap";
import { useEffect } from "react";
import useRoleInfo from "../Hooks/useRoleInfo";

// eslint-disable-next-line react/prop-types
export const Slidebar = ({ darkMode, handleDarkModeToggle }) => {
  const roleId = useRoleInfo();
  const correousuario = localStorage.getItem("items");
  const [nombre, setnombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [Rol, setRol] = useState("");
  const [TTiporol, setTTiporol] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3006/Infouser?correousuario=${correousuario}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        localStorage.setItem("Rol", data[0].Idrol);
        localStorage.setItem("user", data[0].Nombre);
        localStorage.setItem("apellido", data[0].Apellido);
        setnombre(data[0].Nombre);
        setApellido(data[0].Apellido);
        setRol(data[0].Idrol);
        if (data[0].Idrol == 1) {
          setTTiporol("Administrador");
        } else if (data[0].Idrol == 2) {
          setTTiporol("Asistente");
        } else if (data[0].Idrol == 3) {
          setTTiporol("SuperUsuario");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const [showConfirmation, setShowConfirmation] = useState(undefined);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    localStorage.clear;
    window.location.href = "/";
  };

  const [showTooltip, setShowTooltip] = useState(window.innerWidth <= 1366);

  useEffect(() => {
    const updateTooltipVisibility = () => {
      setShowTooltip(window.innerWidth < 1366);
    };

    window.addEventListener("resize", updateTooltipVisibility);
    return () => window.removeEventListener("resize", updateTooltipVisibility);
  }, []);

  const renderMenuItems = () => {
    const roleId = parseInt(Rol);

    if (roleId === 1 || roleId ===2) {
      //Administrador
      return (
        <>
          <Nav.Item>
            <OverlayTrigger
              placement="right"
              overlay={
                showTooltip ? (
                  <Tooltip id="tooltip-prop">Propietarios</Tooltip>
                ) : (
                  <></>
                )
              }
            >
              <Nav.Link
                as={NavLink}
                to="/Propietario"
                className="nav-link text-white"
                aria-current="page"
                exact={undefined}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FontAwesomeIcon
                  className="icons_sliderbard"
                  width="32"
                  height="32"
                  style={{ color: "#ffffff" }}
                  icon={faUserTie}
                />
                <p className="Links_Icons" style={{ margin: "2%" }}>
                  Propietarios
                </p>
              </Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
          <Nav.Item>
            <OverlayTrigger
              placement="right"
              overlay={
                showTooltip ? (
                  <Tooltip id="tooltip-prop">Inmuebles</Tooltip>
                ) : (
                  <></>
                )
              }
            >
              <Nav.Link
                as={NavLink}
                to="/Inmueble"
                className="nav-link text-white"
                aria-current="page"
                exact={undefined}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FontAwesomeIcon
                  width="32"
                  height="32"
                  style={{ color: "#ffffff" }}
                  icon={faHouseUser}
                />
                <p className="Links_Icons" style={{ margin: "2%" }}>
                  Inmuebles
                </p>
              </Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
          <Nav.Item>
            <OverlayTrigger
              placement="right"
              overlay={
                showTooltip ? (
                  <Tooltip id="tooltip-prop">Arrendatarios</Tooltip>
                ) : (
                  <></>
                )
              }
            >
              <Nav.Link
                as={NavLink}
                to="/Arrendatario"
                className="nav-link text-white"
                aria-current="page"
                exact={undefined}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FontAwesomeIcon
                  width="32"
                  height="32"
                  style={{ color: "#ffffff" }}
                  icon={faPersonShelter}
                />
                <p className="Links_Icons" style={{ margin: "2%" }}>
                  Arrendatarios
                </p>
              </Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
          <Nav.Item>
            <OverlayTrigger
              placement="right"
              overlay={
                showTooltip ? (
                  <Tooltip id="tooltip-prop">Codeudores</Tooltip>
                ) : (
                  <></>
                )
              }
            >
              <Nav.Link
                as={NavLink}
                to="/Codeudor"
                className="nav-link text-white"
                aria-current="page"
                exact={undefined}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FontAwesomeIcon
                  width="32"
                  height="32"
                  style={{ color: "#ffffff" }}
                  icon={faPeopleRoof}
                />
                <p className="Links_Icons" style={{ margin: "2%" }}>
                  Codeudores
                </p>
              </Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
          <Nav.Item>
            <OverlayTrigger
              placement="right"
              overlay={
                showTooltip ? (
                  <Tooltip id="tooltip-prop">Contrato Arrendamiento</Tooltip>
                ) : (
                  <></>
                )
              }
            >
              <Nav.Link
                as={NavLink}
                to="/Carrendatario"
                className="nav-link text-white"
                aria-current="page"
                exact={undefined}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FontAwesomeIcon
                  width="32"
                  height="32"
                  style={{ color: "#ffffff" }}
                  icon={faFileContract}
                />
                <p className="Links_Icons" style={{ margin: "2%" }}>
                  Contrato Arrendamiento
                </p>
              </Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
          <Nav.Item>
            <OverlayTrigger
              placement="right"
              overlay={
                showTooltip ? (
                  <Tooltip id="tooltip-prop">Pagos Arrendamiento</Tooltip>
                ) : (
                  <></>
                )
              }
            >
              <Nav.Link
                as={NavLink}
                to="/H_recibos"
                className="nav-link text-white"
                aria-current="page"
                exact={undefined}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FontAwesomeIcon
                  width="32"
                  height="32"
                  style={{ color: "#ffffff" }}
                  icon={faReceipt}
                />
                <p className="Links_Icons" style={{ margin: "2%" }}>
                  Pagos Arrendamiento
                </p>
              </Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
          <Nav.Item>
            <OverlayTrigger
              placement="right"
              overlay={
                showTooltip ? (
                  <Tooltip id="tooltip-prop">Comision Propietario</Tooltip>
                ) : (
                  <></>
                )
              }
            >
              <Nav.Link
                as={NavLink}
                to="/H_gastos"
                className="nav-link text-white"
                aria-current="page"
                exact={undefined}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FontAwesomeIcon
                  width="32"
                  height="32"
                  style={{ color: "#ffffff" }}
                  icon={faReceipt}
                />
                <p className="Links_Icons" style={{ margin: "2%" }}>
                  Comision Propietario
                </p>
              </Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
          <Nav.Item>
            <OverlayTrigger
              placement="right"
              overlay={
                showTooltip ? (
                  <Tooltip id="tooltip-prop">Informe Operacion Inmobiliaria</Tooltip>
                ) : (
                  <></>
                )
              }
            >
              <Nav.Link
                as={NavLink}
                to="/Operacionimbo"
                className="nav-link text-white"
                aria-current="page"
                exact={undefined}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FontAwesomeIcon
                  width="32"
                  height="32"
                  style={{ color: "#ffffff" }}
                  icon={faTable}
                />
                <p className="Links_Icons" style={{ margin: "2%" }}>
                  Informe Operacion Inmobiliaria 
                </p>
              </Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
        </>
      );
    } else if (roleId === 3) {
      return (
        <>
      <Nav.Item>
        <OverlayTrigger
          placement="right"
          overlay={
            showTooltip ? (
              <Tooltip id="tooltip-prop">Asignar Rol Empleados</Tooltip>
            ) : (
              <></>
            )
          }
        >
          <Nav.Link
            as={NavLink}
            to="/AsignarRol"
            className="nav-link text-white"
            aria-current="page"
            exact={undefined}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FontAwesomeIcon
              width="32"
              height="32"
              style={{ color: "#ffffff" }}
              icon={faUserShield}
            />
            <p className="Links_Icons" style={{ margin: "2%" }}>
              Asignar Rol Empleados
            </p>
          </Nav.Link>
        </OverlayTrigger>
      </Nav.Item>
        </>
      );

    }
  };

  const redireccion = (ruta) => {
    window.location.href = ruta;
  }

  return (
    <>
      <div
        className=" sliderbard d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: "280px", marginRight: "1.5%", minHeight: "100vh" }}
      >
        <span className=" User fs-4">
          {nombre} {apellido}
        </span>
        <p className="text-start">{TTiporol}</p>

        <hr />
        <Nav className="nav nav-pills d-flex flex-column align-items-stretch justify-content-evenly align-content-stretch mb-auto">
          {renderMenuItems()}
        </Nav>
        <hr />
        {(roleId === 1 || roleId === 2) && (
        <Dropdown style={{ display: "flex", justifyContent: "center" }}>
          <Dropdown.Toggle variant="link" className="nav-link text-white">
            <FontAwesomeIcon width="32" height="32" style={{ color: "#ffffff" }} icon={darkMode ? faMoon : faSun} />
            <strong>Opciones</strong>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleDarkModeToggle}>
              <FontAwesomeIcon style={{ marginRight: "10px" }} icon={darkMode ? faSun : faMoon} />
              {darkMode ? "Modo Claro" : "Modo Oscuro"}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Button variant="white" onClick={() => redireccion("/Contraseñanew")}>
                Cambiar Contraseña
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      {roleId === 3 && (
        <Dropdown style={{ display: "flex", justifyContent: "center" }}>
          <Dropdown.Toggle variant="link" className="nav-link text-white">
            <FontAwesomeIcon width="32" height="32" style={{ color: "#ffffff" }} icon={faMoon} />
            <strong>Opciones</strong>
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item onClick={handleDarkModeToggle}>
              <FontAwesomeIcon style={{ marginRight: "10px" }} icon={darkMode ? faSun : faMoon} />
              {darkMode ? "Modo Claro" : "Modo Oscuro"}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
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
            <Modal.Title>Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que deseas salir de la sesión?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmation(undefined)}
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
