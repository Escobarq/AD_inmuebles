import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";

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
    return (
      <tr key={roles.idtrabajador}>
        <td>{roles.idtrabajador}</td>
        <td>{roles.nombre}</td>
        <td>{roles.apellido}</td>
        <td>{roles.correo}</td>
        <td>{roles.contrasena}</td>
        <td>{roles.telefono}</td>
        <td>{convertirIdRolATexto(roles.idrol)}</td>
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
  };
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
            {infoRol.map((roles) => createRowRol(roles))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
