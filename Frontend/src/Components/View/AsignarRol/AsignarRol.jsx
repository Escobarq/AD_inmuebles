import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";


export const AsignarRol = () => {
  const [infoRol, setInfoRol] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/Vroles");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setInfoRol(data);

        console.log(data);
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
    // Mapeo de valores de idrol a textos correspondientes
    const rolesTexto = {
      1: "Administrador",
      2: "Empleado",
      3: "Asesor Comercial",
      4: "Super Usuario",
    };
    // Devolver el texto correspondiente al idrol proporcionado
    return rolesTexto[idrol] || "Rol desconocido";
  };

  const createRowRol = (roles) => {
    if (roles.Idrol !== 4) {

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
            <Button className="btn-opciones" variant="danger">
              <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
            </Button>
            <Button className="btn-opciones" variant="warning">
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
  const [itemsPerPage] = useState(10);
  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infoRol.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="contener-home">
      <div className="title_view">
        <h1 className="tittle_propetario">Empleados</h1>
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
    </div>
  );
};
