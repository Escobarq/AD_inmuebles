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

export const Propietarios = () => {
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
    console.log(name, value);
  };

  function formatDate(fechaString) {
    return moment(fechaString).format("MMMM , D , YYYY");
  }

  moment.updateLocale("es", {
    months:
      "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split(
        "_"
      ),
    monthsShort:
      "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
    weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
    weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
    weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
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
        <th>NIT</th>
        <th>Nombre</th>
        <th>Dirección</th>
        <th>Teléfono</th>
        <th>Correo</th>
        <th>Fecha de ingreso</th>
        <th>Banco</th>
        <th>Tipo de cuenta</th>
        <th>Número de cuenta</th>
        <th>Opciones</th>
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
        <td >
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
  //Variables Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      const url = `/RPropietario?${urlParams.toString()}`;
      window.location.href = url;
    } else {
      console.error("No se encontró el propetario con ID:", PropetarioId);
    }
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
            placement="top"
            overlay={
              showTooltip ? (
                <Tooltip id="tooltip-prop">Agregar Propietario</Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button variant="success" className="btn-add">
              <Link to="/RPropietario">
                <FontAwesomeIcon className="icon" icon={faUserPlus} />
                <p className="AgregarPA">Agregar Propietario</p>
              </Link>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            key="tooltip-ver-inhabilitados-propietarios"
            placement="top"
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
            <Button variant="dark" className="btn-add-info">
              <Link to="/InhaPropietarios" className="linkes">
                <FontAwesomeIcon className="icon" icon={faUserSlash} />
                <p className="AgregarPA">Ver Propietarios Inhabilitados</p>
              </Link>
            </Button>
          </OverlayTrigger>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Propetarios</h1>
        </div>

        <div className="view_esp">
          {NoResult == true ? (
            <div>
              <img src={NoResultImg} alt="" />
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
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(Math.ceil(infopropietario.length / itemsPerPage))].map(
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
                currentPage === Math.ceil(infopropietario.length / itemsPerPage)
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
