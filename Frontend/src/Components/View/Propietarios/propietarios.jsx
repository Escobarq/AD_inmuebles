/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./propietarios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserSlash,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment/locale/es";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { toast } from "react-toastify";
import InhabilitarPropetario from "../../Hooks/InhabilitarPropetarios";
import NoResultImg from "../../../assets/NoResult.gif";
import { InfoPropietario } from "../../Hooks/InfoPropietario";
import useRoleInfo from "../../Hooks/useRoleInfo";
import { useMediaQuery } from "@react-hook/media-query";

export const Propietarios = () => {
  const roleId = useRoleInfo();
  const isSmallScreen = useMediaQuery("(max-width: 1366px)");
  const [infopropietario, setinfopropietario] = useState([]);
  const [Rol, setRol] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [PropetarioIdToDelete, setPropetarioIdToDelete] = useState(null);
  const [filtroData, setFiltroData] = useState({
    FechaIngresoMIN: "",
    FechaIngresoMAX: "",
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

  //Modal para Inhabilitacion
  const handleOpenModal = (PropetarioId) => {
    setPropetarioIdToDelete(PropetarioId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // Hook para actualizar el estado del propetario
  const { actualizarEstadoPropetario } = InhabilitarPropetario();

  //Actualizar Estado Coduedor
  const handleInhabilitarPropetario = async (PropetarioId) => {
    try {
      await actualizarEstadoPropetario(PropetarioId, "false");
      const updatedpropetario = infopropietario.filter(
        (Propetarios) => Propetarios.IdPropietario !== PropetarioId
      );
      setinfopropietario(updatedpropetario);
      notify();
      setShowModal(false);
    } catch (error) {
      console.error("Error al inhabilitar Propetario:", error);
      errores();
    }
  };

  //Visualizar Datos tabla
  useEffect(() => {
    let a = localStorage.getItem("Rol");
    setRol(a);
    fetchData();
  }, [filtroData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
  };

  function formatDate(fechaString) {
    return moment(fechaString).format("MMMM , D , YYYY");
  }

  moment.updateLocale("es", {
    months:
      "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
        "_"
      ),
    monthsShort:
      "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_"),
    weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
    weekdaysShort: "Dom._Lun._Mar._Mié._Jue._Vie._Sáb.".split("_"),
    weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
  });


  const fetchData = async () => {
    try {
      const info = await InfoPropietario(filtroData)
      setinfopropietario(info);

      if (info.length == 0) {
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
        <th>No Identidad</th>
        <th>Nombre</th>
        <th>Dirección</th>
        <th>Teléfono</th>
        <th>Correo</th>
        <th>Fecha de ingreso</th>
        <th>Banco</th>
        <th>Tipo de cuenta</th>
        <th>Número de cuenta</th>
        {roleId !== 2 && <th>Opciones</th>}
      </tr>
    );
  };
  const createrow = (Propietario) => {
    return (
      <tr key={Propietario.IdPropietario}>
        <td>{Propietario.DocumentoIdentidad}</td>
        <td>{Propietario.NombreCompleto}</td>
        <td>{Propietario.Direccion}</td>
        <td>{Propietario.Telefono}</td>
        <td>{Propietario.Correo}</td>
        <td>{formatDate(Propietario.FechaIngreso)}</td>
        <td>{Propietario.Banco}</td>
        <td>{Propietario.TipoCuenta}</td>
        <td>{Propietario.NumeroCuenta}</td>
        <td style={{ display: roleId === 2 ? "none" : "table-cell" }}>
          <Button
            className="btn-opciones"
            variant="danger"
            onClick={() => handleOpenModal(Propietario.IdPropietario)}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
          </Button>
          <Button
            className="btn-opciones"
            variant="warning"
            onClick={() => handleEditPropetario(Propietario.IdPropietario)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </td>
      </tr>
    );
  };
    // Variables Paginacion
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
  const currentItems = infopropietario.slice(indexOfFirstItem, indexOfLastItem);

  const [showTooltip, setShowTooltip] = useState(window.innerWidth <= 1366);

  useEffect(() => {
    const updateTooltipVisibility = () => {
      setShowTooltip(window.innerWidth < 1366);
    };

    window.addEventListener("resize", updateTooltipVisibility);
    return () => window.removeEventListener("resize", updateTooltipVisibility);
  }, []);

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
    const newPageCount = Math.ceil(infopropietario.length / itemsPerPage);
    setPageCount(newPageCount); // Actualizamos el estado de pageCount
    renderPaginator(newPageCount); // Llamamos a la función renderPaginator con el nuevo pageCount
  }, [infopropietario, itemsPerPage, currentPage]);

  //Pros para enviar a registro propetario
  const handleEditPropetario = (PropetarioId) => {
    const propetario = infopropietario.find(
      (propetario) => propetario.IdPropietario === PropetarioId
    );
    // Verifica si se encontró el propetario antes de redirigir
    if (propetario) {
      const urlParams = new URLSearchParams({
        IdPropietario: propetario.IdPropietario,
        TipoDocumento: propetario.TipoDocumento,
        DocumentoIdentidad: propetario.DocumentoIdentidad,
        NombreCompleto: propetario.NombreCompleto,
        Telefono: propetario.Telefono,
        Correo: propetario.Correo,
        Banco: propetario.Banco,
        TipoCuenta: propetario.TipoCuenta,
        NumeroCuenta: propetario.NumeroCuenta,
        FechaIngreso: propetario.FechaIngreso,
        Direccion: propetario.Direccion
      });

      const url = `/RPropietario?${urlParams}`;
      window.location.href = url;
    } else {
      console.error("No se encontró el propetario con ID:", PropetarioId);
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
            <label className="l1">Fecha Ingreso Minimo: </label>
            <input
              className="input-filtroRe"
              value={filtroData.FechaIngresoMIN}
              onChange={handleChange}
              type="date"
              name="FechaIngresoMIN"
              id=""
            />

            <label className="l1">Fecha Ingreso Maxima: </label>
            <input
              className="input-filtroRe"
              value={filtroData.FechaIngresoMAX}
              onChange={handleChange}
              type="date"
              name="FechaIngresoMAX"
              id=""
            />
          </div>

          <OverlayTrigger
            key="tooltip-add-propietario"
            placement="bottom"
            overlay={
              showTooltip ? (
                <Tooltip id="tooltip-prop">Agregar Propietario</Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button variant="success" className="btn-add" onClick={() => redireccion("/RPropietario")}>
              <FontAwesomeIcon className="icon" icon={faUserPlus} />
              <p className="AgregarPA">Agregar Propietario</p>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            key="tooltip-ver-inhabilitados-propietarios"
            placement="bottom"
            overlay={
              showTooltip ? (
                <Tooltip id="tooltip-prop">
                  Ver Propietarios Inhabilitados
                </Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button variant="dark" className="btn-add-info" onClick={() => redireccion("/InhaPropietarios")}>
              <FontAwesomeIcon className="icon" icon={faUserSlash} />
              <p className="AgregarPA">Ver Inhabilitados</p>
            </Button>
          </OverlayTrigger>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Propetarios</h1>
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
                  {currentItems.map((Propietarios) => createrow(Propietarios))}
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
          ¿Está seguro de que desea inhabilitar este propetario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleInhabilitarPropetario(PropetarioIdToDelete)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
