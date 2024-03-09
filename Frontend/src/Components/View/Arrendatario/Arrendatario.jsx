import { useEffect, useState } from "react";
import { Table, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faPenToSquare,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import ActualizarArrendatario from "../../Hooks/InhabilitarArren";
import { toast } from "react-toastify";
import NoResultImg from "../../../assets/NoResult.gif";
import useRoleInfo from "../../Hooks/useRoleInfo";
import { useMediaQuery } from "@react-hook/media-query";


export const Arrendatario = () => {
  const roleId = useRoleInfo();
  const isSmallScreen = useMediaQuery("(max-width: 1366px)");
  const [infoarrendatario, setinfoarrendatario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [arrendatarioIdToDelete, setarrendatarioIdToDelete] = useState(null);
  const [filtroData, setFiltroData] = useState({
    Cedula: "",
    Estado: "",
  });

  const [NoResult, setNoResult] = useState(false);
  const notify = () =>
    toast.success("Se Inabilito Correctamente ", {
      theme: "dark",
    });
  const errores = () =>
    toast.error("Hubo algun error  ", {
      theme: "dark",
    });

  //Modal para Inhabilitacion
  const handleOpenModal = (ArrendatarioId) => {
    setarrendatarioIdToDelete(ArrendatarioId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // Hook para actualizar el estado del arrendatario
  const { actualizarEstadoArrendatario } = ActualizarArrendatario();

  //Actualizar Estado Coduedor
  const handleInhabilitarArrendatario = async (ArrendatarioId) => {
    try {
      await actualizarEstadoArrendatario(ArrendatarioId, "false");
      const updatedArrendatario = infoarrendatario.filter(
        (arrendatarios) => arrendatarios.IdArrendatario !== ArrendatarioId
      );
      setinfoarrendatario(updatedArrendatario);
      notify();
      setShowModal(false);
    } catch (error) {
      console.error("Error al inhabilitar codeudor:", error);
      errores();
    }
  };

  useEffect(() => {
    fetchData();
  }, [filtroData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
  };

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams(filtroData);
      const response = await fetch(
        `http://localhost:3006/Varrendatario?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const arrendatarioActivos = data.filter(
        (Arrendatarios) => Arrendatarios.booleanos === "true"
      );

      setinfoarrendatario(arrendatarioActivos);

      if (arrendatarioActivos.length == 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const createheader = () => {
    return (
      <tr>
        <th>ID</th>
        <th>Tipo de Documento</th>
        <th>No. Documento</th>
        <th>Nombre</th>
        <th>Estado</th>
        <th>Teléfono</th>
        <th>Correo</th>
        {roleId !== 2 && <th>Opciones</th>}
      </tr>
    );
  };
  const createrow = (Arrendatarios) => {
    return (
      <tr key={Arrendatarios.IdArrendatario}>
        <td>{Arrendatarios.IdArrendatario}</td>
        <td>{Arrendatarios.TipoDocumento}</td>
        <td>{Arrendatarios.DocumentoIdentidad}</td>
        <td>{Arrendatarios.NombreCompleto}</td>
        <td>{Arrendatarios.Estado}</td>
        <td>{Arrendatarios.Telefono}</td>
        <td>{Arrendatarios.Correo}</td>
        <td style={{ display: roleId === 2 ? "none" : "table-cell" }}>
          <Button
            className="btn-opciones"
            variant="danger"
            onClick={() => handleOpenModal(Arrendatarios.IdArrendatario)}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
          </Button>
          <Button 
          className="btn-opciones" 
          variant="warning"
          onClick={() => handleEditArrendatario(Arrendatarios.IdArrendatario)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </td>
      </tr>
    );
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
  const currentItems = infoarrendatario.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 //Tooltip 
 const [showTooltip, setShowTooltip] = useState(window.innerWidth <= 1366);

 useEffect(() => {
   const updateTooltipVisibility = () => {
     setShowTooltip(window.innerWidth < 1366);
   };

   window.addEventListener('resize', updateTooltipVisibility);
   return () => window.removeEventListener('resize', updateTooltipVisibility);
 }, []);

//Pros para enviar a registro arrendatario
const handleEditArrendatario = (ArrendatarioId) => {
  const arrendatario = infoarrendatario.find(
    (arrendatario) => arrendatario.IdArrendatario === ArrendatarioId
  );

  // Verifica si se encontró el arrendatario antes de redirigir
  if (arrendatario) {
    const urlParams = new URLSearchParams({
      IdArrendatario: arrendatario.IdArrendatario,
      TipoDocumento: arrendatario.TipoDocumento,
      DocumentoIdentidad: arrendatario.DocumentoIdentidad,
      NombreCompleto: arrendatario.NombreCompleto,
      Telefono: arrendatario.Telefono,
      Correo: arrendatario.Correo,
      Estado: arrendatario.Estado
    });

    const url = `/ReArrendatario?${urlParams.toString()}`;
    
    window.location.href = url;
  } else {
    console.error("No se encontró el arrendatario con ID:", ArrendatarioId);
  }
};

const redireccion = (ruta) => {
  window.location.href = ruta;
}


  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">
          <div className="conten-inputs">
            <label className="l1">No. Cedula: </label>
            <input
              value={filtroData.Cedula}
              onChange={handleChange}
              className="input-filtroRe"
              type="number"
              name="Cedula"
              max={9999999999}
              id=""
            />
            <label className="l1">Estado: </label>

            <select
              className="input-filtroRe"
              value={filtroData.Estado}
              onChange={handleChange}
              type="date"
              name="Estado"
              id=""
            >
              <option selected value="">
                Seleccione el Estado
              </option>
              <option value="Libre">Libre</option>
              <option value="Ocupado">Ocupado</option>
            </select>
          </div>
          <OverlayTrigger
            key="tooltip-add-arrendatario"
            placement="top"
            overlay={showTooltip ? <Tooltip id="tooltip-prop">Agregar Arrendatario</Tooltip> : <></>}
          >
            <Button variant="success" className="btn-add" onClick={() => redireccion("/ReArrendatario")}>
                <FontAwesomeIcon className="icon" icon={faUserPlus} />
                <p className="AgregarPA">Agregar Arrendatario</p>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            key="tooltip-ver-inhabilitados-arrendatario"
            placement="top"
            overlay={showTooltip ? <Tooltip id="tooltip-prop">Ver Arrendatarios Inhabilitados</Tooltip> : <></>}
          >
            <Button variant="dark" className="btn-add-info" onClick={() => redireccion("/Inharrendatario")}>
                <FontAwesomeIcon className="icon" icon={faUserSlash} />
                <p className="AgregarPA">Ver Arrendatarios Inhabilitados</p>
            </Button>
          </OverlayTrigger>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Arrendatario</h1>
        </div>

        <div className="view_esp">
          {NoResult == true ? (
            <div>
              <img className="Noresult" src={NoResultImg} alt="" />
            </div>
          ) : (
            <div className="table-container">
              <Table striped bordered hover>
                <thead> {createheader()} </thead>
                <tbody>
                  {currentItems.map((Arrendatarios) =>
                    createrow(Arrendatarios)
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </div>
        <div className="paginador">
          <Pagination>
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(Math.ceil(infoarrendatario.length / itemsPerPage))].map(
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
                currentPage ===
                Math.ceil(infoarrendatario.length / itemsPerPage)
              }
            />
          </Pagination>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea inhabilitar este Arrendatario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              handleInhabilitarArrendatario(arrendatarioIdToDelete)
            }
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
