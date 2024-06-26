import { Table, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faPenToSquare,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import ActualizarCodeudor from "../../Hooks/Inhabilitarcodeudor";
import { toast } from "react-toastify";
import NoResultImg from "../../../assets/NoResult.gif";
import useRoleInfo from "../../Hooks/useRoleInfo";
import { useMediaQuery } from "@react-hook/media-query";


export const Codeudor = () => {
  const isSmallScreen = useMediaQuery("(max-width: 1366px)");
  const roleId = useRoleInfo();
  const [infoCodeudor, setinfoCodeudor] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { actualizarEstadoCodeudor } = ActualizarCodeudor();
  const [codeudorIdToDelete, setCodeudorIdToDelete] = useState(null);
  const [filtroData, setFiltroData] = useState({
    Cedula: "",
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

  //Actualizar Estado Coduedor
  const handleInhabilitarCodeudor = async (codeudorId) => {
    try {
      await actualizarEstadoCodeudor(codeudorId, "false");
      const updatedCodeudores = infoCodeudor.filter(
        (codeudor) => codeudor.IdCodeudor !== codeudorId
      );
      setinfoCodeudor(updatedCodeudores);
      notify();
      setShowModal(false);
    } catch (error) {
      console.error("Error al inhabilitar codeudor:", error);
      errores();
    }
  };
  //Modal para Inhabilitacion
  const handleOpenModal = (codeudorId) => {
    setCodeudorIdToDelete(codeudorId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        `http://localhost:3006/Vcodeudor?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Filtrar los datos para incluir solo aquellos con booleanos=true
      const codeudoresActivos = data.filter(
        (codeudor) => codeudor.booleanos === "true"
      );
      setinfoCodeudor(codeudoresActivos);

      if (codeudoresActivos.length == 0) {
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
        <th>Tipo Documento</th>
        <th>No. Documento</th>
        <th>Nombre</th>
        <th>Dirección</th>
        <th>Teléfono</th>
        <th>Correo</th>
        {roleId !== 2 && <th>Opciones</th>}
      </tr>
    );
  };
  const handleEditCodeudor = (codeudorId) => {
    // Encuentra el codeudor seleccionado
    const codeudor = infoCodeudor.find(
      (codeudor) => codeudor.IdCodeudor === codeudorId
    );

    if (codeudor) {
      const urlParams = new URLSearchParams({
        IdCodeudor: codeudor.IdCodeudor,
        TipoDocumento: codeudor.TipoDocumento,
        DocumentoIdentidad: codeudor.DocumentoIdentidad,
        NombreCompleto: codeudor.NombreCompleto,
        Direccion: codeudor.Direccion,
        Telefono: codeudor.Telefono,
        Correo: codeudor.Correo,
      });

      const url = `/Registrocodeudor?${urlParams}`;

      window.location.href = url;
    } else {
      console.error("No se encontró el codeudor con ID:", codeudorId);
    }
  };

  const createrow = (Codeudor) => {
    return (
      <tr key={Codeudor.IdCodeudor}>
        <td>{Codeudor.TipoDocumento}</td>
        <td>{Codeudor.DocumentoIdentidad}</td>
        <td>{Codeudor.NombreCompleto}</td>
        <td>{Codeudor.Direccion}</td>
        <td>{Codeudor.Telefono}</td>
        <td>{Codeudor.Correo}</td>
        <td style={{ display: roleId === 2 ? "none" : "table-cell" }}>
          <Button
            className="btn-opciones"
            variant="danger"
            onClick={() => handleOpenModal(Codeudor.IdCodeudor)}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
          </Button>

          <Button
            className="btn-opciones"
            variant="warning"
            onClick={() => handleEditCodeudor(Codeudor.IdCodeudor)}
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
  const currentItems = infoCodeudor.slice(indexOfFirstItem, indexOfLastItem);
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
    const newPageCount = Math.ceil(infoCodeudor.length / itemsPerPage);
    setPageCount(newPageCount); // Actualizamos el estado de pageCount
    renderPaginator(newPageCount); // Llamamos a la función renderPaginator con el nuevo pageCount
  }, [infoCodeudor, itemsPerPage, currentPage]);
  //Tooltip
  const [showTooltip, setShowTooltip] = useState(window.innerWidth <= 1366);

  useEffect(() => {
    const updateTooltipVisibility = () => {
      setShowTooltip(window.innerWidth < 1366);
    };

    window.addEventListener("resize", updateTooltipVisibility);
    return () => window.removeEventListener("resize", updateTooltipVisibility);
  }, []);

  const redireccion = (ruta) => {
    window.location.href = ruta;
  };

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
          </div>
          <OverlayTrigger
            key="tooltip-add-codeudor"
            placement="bottom"
            overlay={
              showTooltip ? (
                <Tooltip id="tooltip-prop">Agregar Codeudor</Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button
              variant="success"
              className="btn-add"
              onClick={() => redireccion("/Registrocodeudor")}
            >
              <FontAwesomeIcon className="icon" icon={faUserPlus} />
              <p className="AgregarPA">Agregar Codeudor</p>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            key="tooltip-ver-inhabilitados-codeudores"
            placement="bottom"
            overlay={
              showTooltip ? (
                <Tooltip id="tooltip-prop">
                  Ver Codeudores Inhabilitados
                </Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button
              variant="dark"
              className="btn-add-info"
              onClick={() => redireccion("/Codeudores")}
            >
              <FontAwesomeIcon className="icon" icon={faUserSlash} />
              <p className="AgregarPA">Ver Inhabilitados</p>
            </Button>
          </OverlayTrigger>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Codeudor</h1>
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
                  {currentItems.map((Codeudors) => createrow(Codeudors))}
                </tbody>
              </Table>
            </div>
          )}
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
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea inhabilitar este codeudor?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleInhabilitarCodeudor(codeudorIdToDelete)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
