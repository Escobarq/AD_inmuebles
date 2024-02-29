import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Modal } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import useActualizarEstadoEmpleados from "../../Hooks/InhabilitarEmpleado";
import { toast } from "react-toastify";


export const AsignarRol = () => {
  const [infoRol, setInfoRol] = useState([]);
  const { actualizarEstadoempleados } = useActualizarEstadoEmpleados();
  const [Empleados, setHarrenndamiento] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Función para inhabilitar los gastos
  const handleInhabilitarEmpleados = async (EmpleadosID) => {
    try {
      await actualizarEstadoempleados(EmpleadosID, "false");
      // Filtrar los empleados activos excluyendo el empleado que se inhabilitó
      const updatedEmpleados = infoRol.filter(empleado => empleado.IdTrabajador !== EmpleadosID);
      // Actualizar el estado con los nuevos empleados
      setInfoRol(updatedEmpleados);
      notify();
      setShowModal(false);
    } catch (error) {
      console.error("Error al inhabilitar Historial Arrendamiento:", error);
      errores();
    }
  };


  //Modal para Inhabilitacion
  const handleOpenModal = (EmpleadosID) => {
    setHarrenndamiento(EmpleadosID);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const notify = () =>
    toast.success("Se Inabilito Correctamente ", {
      theme: "dark",
    });
  const errores = () =>
    toast.error("Hubo algun error  ", {
      theme: "dark",
    });
  //Mostrar datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/Vroles");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const Empleados = data.filter(
          (Empleados) => Empleados.Booleanos === "true"
        )
        setInfoRol(Empleados);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const createHeaderRol = () => {
    return (
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Correo</th>
        <th>Contraseña</th>
        <th>Telefono</th>
        <th>ID rol</th>
        <th>Opciones</th>
      </tr>
    );
  };
  // Función auxiliar para convertir idrol a texto
  const convertirIdRolATexto = (idrol) => {
    const rolesTexto = {
      1: "Administrador",
      2: "Asistente",
    };
    return rolesTexto[idrol] || "Rol desconocido";
  };

  const createRowRol = (roles) => {
    if (roles.Idrol !== 1) {

      return (
        <tr key={roles.IdTrabajador}>
          <td>{roles.IdTrabajador}</td>
          <td>{roles.Nombre}</td>
          <td>{roles.Apellido}</td>
          <td>{roles.Correo}</td>
          <td>{roles.Contrasena}</td>
          <td>{roles.Telefono}</td>
          <td>{convertirIdRolATexto(roles.Idrol)}</td>
          <td>
            <Button className="btn-opciones"
              variant="danger"
              onClick={() => handleOpenModal(roles.IdTrabajador)}>
              <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
            </Button>
            <Button className="btn-opciones"
              variant="warning"
              onClick={() => EditarPerfil(roles.IdTrabajador)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </td>
        </tr>
      );
    } else {
      return null;
    }
  };

  //Variables Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infoRol.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const EditarPerfil = (EmpleadosID) => {
    // Encuentra el empleado seleccionado
    const Empleado = infoRol.find(
      (empleado) => empleado.IdTrabajador === EmpleadosID
    );
  
    if (Empleado) {
      const urlParams = new URLSearchParams({
        IdTrabajador: Empleado.IdTrabajador,
        Idrol: Empleado.Idrol,
        Nombre: Empleado.Nombre,
        Apellido: Empleado.Apellido,
        Correo: Empleado.Correo,
        Contrasena: Empleado.Contrasena,
        Telefono: Empleado.Telefono
      });
  
      const url = `/EditarPerfil?${urlParams.toString()}`;
  
      window.location.href = url;
    } else {
      console.error("No se encontró el empleado con ID:", EmpleadosID);
    }
  };
  
  
  return (
    <div className="contener-home">
      <div className="title_view">
        <h1 className="tittle_propetario">Empleados</h1>
        <div className="conten-inputs">
          <label className="l1">Rol</label>
          <select className="input-filtroRe" value="" onChange="" name="rol" id="rol">
            <option selected value="">Seleccione el tipo</option>
            <option value="Asistente">Asistente</option>
          </select>
        </div>
        <Button variant="dark" className="btn-add-info ">
          <Link to="/InhabilitarRol" className="linkes">
            <FontAwesomeIcon className="icon" icon={faUserSlash} /> Ver
            Empleados Inhabilitados
          </Link>
        </Button>
      </div>

      <div className="view_esp">
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              {createHeaderRol()}
            </thead>
            <tbody>
              {currentItems.map((roles) => createRowRol(roles))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="paginador">
        <Pagination >
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(infoRol.length / itemsPerPage))].map(
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
              currentPage === Math.ceil(infoRol.length / itemsPerPage)
            }
          />
        </Pagination>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea inhabilitar este empleado?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleInhabilitarEmpleados(Empleados)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};