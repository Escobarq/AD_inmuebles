import  { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Modal } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import useActualizarEstadoEmpleados from "../../Hooks/InhabilitarEmpleado";
import { toast } from "react-toastify";


export const InhabilitarRol = () => {
    const [infoRol, setInfoRol] = useState([]);
    const { actualizarEstadoempleados } = useActualizarEstadoEmpleados();
    const [Empleados, setHarrenndamiento] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Función para inhabilitar los gastos
    const handleInhabilitarEmpleados = async (EmpleadosID) => {
        try {
            await actualizarEstadoempleados(EmpleadosID, "true");
            const updatedEmpleados = infoRol.map((empleado) =>
                empleado.IdTrabajador === EmpleadosID
                    ? { ...empleado, Estado: "true" } // Actualizar el Estado del empleado habilitado
                    : empleado
            );
            setInfoRol(updatedEmpleados); // Actualizar el estado con los nuevos empleados
            notify();
            setShowModal(false);
        } catch (error) {
            console.error("Error al habilitar empleado:", error);
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
                    (Empleados) => Empleados.Booleanos === "false"
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
        // Mapeo de valores de idrol a textos correspondientes
        const rolesTexto = {
            1: "Administrador",
            2: "Asistente",
        };
        // Devolver el texto correspondiente al idrol proporcionado
        return rolesTexto[idrol] || "Rol desconocido";
    };

    const createRowRol = (roles) => {
        const maskedPassword = '*'.repeat(Math.min(10,roles.Contrasena.length));  
        if (roles.idrol !== 4) {

            return (
                <tr key={roles.IdTrabajador}>
                    <td>{roles.IdTrabajador}</td>
                    <td>{roles.Nombre}</td>
                    <td>{roles.Apellido}</td>
                    <td>{roles.Correo}</td>
                    <td>{maskedPassword}</td>
                    <td>{roles.Telefono}</td>
                    <td>{convertirIdRolATexto(roles.Idrol)}</td>
                    <td>
                        <Button className="btn-opciones"
                            variant="danger"
                            onClick={() => handleOpenModal(roles.IdTrabajador)}>
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

    const redireccion = (ruta) => {
        window.location.href = ruta;
    }

    return (
        <div className="contener-home">
            <div className="title_view">
                <h1 className="tittle_propetario">Empleados</h1>
                <Button variant="dark" className="btn-add-info" onClick={() => redireccion("/AsignarRol")}>
                    <FontAwesomeIcon className="icon" icon={faUserSlash} /> Ver
                    Empleados Inabilitados
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
                    ¿Está seguro de que desea habilitar este empleado?
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
