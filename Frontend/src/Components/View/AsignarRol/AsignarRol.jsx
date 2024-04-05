import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faUserSlash ,faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Modal } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import useActualizarEstadoEmpleados from "../../Hooks/InhabilitarEmpleado";
import { toast } from "react-toastify";
import { useMediaQuery } from "@react-hook/media-query";


export const AsignarRol = () => {
  const [infoRol, setInfoRol] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 1366px)");
  const { actualizarEstadoempleados } = useActualizarEstadoEmpleados();
  const [Empleados, setHarrenndamiento] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filtroData, setFiltroData] = useState({
    VRol: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
  };

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
    fetchData();
  }, [filtroData]);
  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams(filtroData);
      const response = await fetch(`http://localhost:3006/Vroles?${queryParams.toString()}`);
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
      3: "Superusuario",
    };
    return rolesTexto[idrol] || "Rol desconocido";
  };

  const createRowRol = (roles) => {
    const maskedPassword = '*'.repeat(Math.min(10,roles.Contrasena.length));  
    
    if (roles.Idrol === 1 || roles.Idrol === 2) {
      return (
        <tr key={roles.IdTrabajador}>
          <td>{roles.IdTrabajador}</td>
          <td>{roles.Nombre}</td>
          <td>{roles.Apellido}</td>
          <td>{roles.Correo}</td>
          <td>{maskedPassword}</td>
          <td>{roles.Telefono}</td>
          <td>{convertirIdRolATexto(roles.Idrol)}</td>
          <td >
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
  useEffect(() => {
    // Cambiar el número de ítems por página según el tamaño de la pantalla
    if (isSmallScreen) {
      setItemsPerPage(5);
    } else {
      setItemsPerPage(8);
    }
  }, [isSmallScreen]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infoRol.slice(indexOfFirstItem, indexOfLastItem);

  const [pagesToShow, setPagesToShow] = useState([]);
  const [pageCount, setPageCount] = useState(0); // Agregamos el estado de pageCount

  const renderPaginator = (pageCount) => {
    // Pasamos pageCount como parámetro
    const maxPagesToShow = 10; // Cambia el número máximo de páginas mostradas

    if (pageCount <= maxPagesToShow) {
      setPagesToShow(Array.from({ length: pageCount }, (_, i) => i + 1));
    } else {
      if (currentPage <= maxPagesToShow - Math.floor(maxPagesToShow / 2)) {
        setPagesToShow(Array.from({ length: maxPagesToShow }, (_, i) => i + 1));
      } else if (currentPage >= pageCount - Math.floor(maxPagesToShow / 2)) {
        setPagesToShow(
          Array.from(
            { length: maxPagesToShow },
            (_, i) => pageCount - maxPagesToShow + i + 1
          )
        );
      } else {
        setPagesToShow(
          Array.from(
            { length: maxPagesToShow },
            (_, i) => currentPage - Math.floor(maxPagesToShow / 2) + i
          )
        );
      }
    }
  };

  useEffect(() => {
    const newPageCount = Math.ceil(infoRol.length / itemsPerPage);
    setPageCount(newPageCount); // Actualizamos el estado de pageCount
    renderPaginator(newPageCount); // Llamamos a la función renderPaginator con el nuevo pageCount
  }, [infoRol, itemsPerPage, currentPage]);

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
  
  const redireccion = (ruta) => {
    window.location.href = ruta;
  }
  
  return (
    <div className="contener-home">
      <div className="title_view">
        <h1 className="tittle_propetario">Empleados</h1>
        <div className="conten-filtro">        
        <div className="conten-inputs">
          <label className="l1">Rol</label>
          <select value={filtroData.VRol}
              onChange={handleChange} className="input-filtroRe"name="VRol" id="rol">
            <option selected value="">Seleccione el tipo</option>
            <option value="2">Asistente</option>
            <option value="1">Administrador</option>
          </select>
        </div>
        <Button variant="success" className="btn-add-success" onClick={() => redireccion("/Crearperfil")}>
            <FontAwesomeIcon className="icon" icon={faUserPlus} /> Agregar Empleado
        </Button>
        <Button variant="dark" className="btn-add-info" onClick={() => redireccion("/InhabilitarRol")}>
            <FontAwesomeIcon className="icon" icon={faUserSlash} /> Ver
            Inhabilitados
        </Button>
        </div>
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
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {pagesToShow.map((page) => (
              <Pagination.Item className="item-paginador"
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageCount}
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
