import { Table, Button, OverlayTrigger, Tooltip, Form, Modal, ListGroup  } from "react-bootstrap";
import { faFilePdf, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import "moment/locale/es";
import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";


export const H_gastos = () => {
  const isSmallScreen = useMediaQuery("(max-width: 1366px)");
  const [infoComision, setinfoComision] = useState([]);
  const [PropietariosDisponibles, setPropietariosDisponibles] = useState([]);
  const [selectedPropietario, setSelectedPropietario] = useState("");
  const [mostrarModalA, setMostrarModalA] = useState(false);

  const [filtroData, setFiltroData] = useState({
    Propietario: "",
    FechaElaboracionMin: "",
    FechaElaboracionMax: "",
    FormaPago: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
  };
  const resetPropie = () => {
    setSelectedPropietario("Seleccione Propietario");
    setFiltroData({ ...filtroData, "Propietario": "" });
    setMostrarModalA(false);
  };
  const handlePropietarioChange = async (Propietario) => {
    setSelectedPropietario(Propietario);
    setFiltroData({ ...filtroData, ["Propietario"]: Propietario.IdPropietario });
    fetchDataPropietario(Propietario);
    setMostrarModalA(false);
  };
  const handleCloseModalA = () => {
    setMostrarModalA(false);
  };
  const handleMostrarAClick = async () => {
    setMostrarModalA(true);
  };

  useEffect(() => {
    fetchData();
    fetchDataPropietario();
  }, [filtroData]);

  const fetchData = async () => {
    const queryParams = new URLSearchParams(filtroData);
    try {
      const response = await fetch(`http://localhost:3006/VComisionPropie?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setinfoComision(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  const fetchDataPropietario = async () => {
    try {
      const response = await axios.get("http://localhost:3006/Vpropietarios?");
      const Propietarios = response.data.map((prop) => prop);
      setPropietariosDisponibles(Propietarios);
    } catch (error) {
      console.error("Error al cargar las matrículas:", error);
      toast.error(
        "Error al cargar las matrículas. Inténtalo de nuevo más tarde."
      );
    }
  };

  const createheader = () => {
    return (
      <tr>
        <th>No Comision</th>
        <th>Propietario</th>
        <th>Fecha Elaboracion</th>
        <th>Forma pago</th>
        <th>Elaborado Por</th>
        <th>Pago Arriendo</th>
        <th>Administracion</th>
        <th>Aseo Entrega</th>
        <th>Mantenimiento</th>
        <th>Valor Total</th>
      </tr>
    );
  };
  //formatear fecha
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
  const createrow = (CPropietario) => {
    return (
      <tr key={CPropietario.IdComisionPropietario}>
        <td>{CPropietario.IdComisionPropietario}</td>
        <td>{CPropietario.NombreCompleto}</td>
        <td>{formatDate(CPropietario.FechaElaboracion)}</td>
        <td>{CPropietario.FormaPago}</td>
        <td>{CPropietario.ElaboradoPor}</td>
        <td>${CPropietario.PagoArriendo}</td>
        <td>${CPropietario.AdmInmobi}</td>
        <td>${CPropietario.AseoEntrega}</td>
        <td>${CPropietario.Mantenimiento}</td>
        <td>${CPropietario.ValorTotal}</td>
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
  const currentItems = infoComision.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //Tooltip
  const [showTooltip, setShowTooltip] = useState(window.innerWidth <= 1366);

  useEffect(() => {
    const updateTooltipVisibility = () => {
      setShowTooltip(window.innerWidth < 1366);
    };

    window.addEventListener("resize", updateTooltipVisibility);
    return () => window.removeEventListener("resize", updateTooltipVisibility);
  }, []);
  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">
          <div className="conten-inputs">
            <label className="l1">Propietario: </label>
            <Form.Select
              className="input-filtroRe"

              value={
                selectedPropietario ? selectedPropietario.IdPropietario : "a?"
              }
              onChange={(e) => handlePropietarioChange(e.target.value)}
              onClick={() => handleMostrarAClick(true)}
            >
              <option value="" selected >Seleccionar Numero de Propietario</option>
              {PropietariosDisponibles.map((Propietario, index) => (
                <option key={index} value={Propietario.IdPropietario}>
                  {Propietario.NombreCompleto}
                </option>
              ))}
            </Form.Select>

            <label className="l1">Forma de Pago: </label>
            <select
              className="input-filtroRe"
              name="FormaPago"
              value={filtroData.FormaPago}
              onChange={handleChange}
              id=""
            >
              <option selected value="">
                Seleccion forma de pago
              </option>
              <option value="Transferencia">Transferencia</option>
              <option value="Efectivo">Efectivo</option>
            </select>
            <label className="l1">Fecha Elaboracion Minima: </label>
            <input
              className="input-filtroRe"
              type="date"
              value={filtroData.FechaElaboracionMin}
              onChange={handleChange}
              name="FechaElaboracionMin"
              id=""
            />
            <label className="l1">Fecha Elaboracion Maxima: </label>
            <input
              className="input-filtroRe"
              type="date"
              value={filtroData.FechaElaboracionMax}
              onChange={handleChange}
              name="FechaElaboracionMax"
              id=""
            />
          </div>
          
          <OverlayTrigger
            key="tooltip-generar-recibo-gastos"
            placement="top"
            overlay={showTooltip ? <Tooltip id="tooltip-prop">Generar Recibo gastos</Tooltip> : <></>}
          >
            <Button variant="success" className="btn-add">
              <Link to="/Rcomision">
                <FontAwesomeIcon className="icon" icon={faUserPlus} />
                <p className="AgregarPA">Generar Recibo gastos</p>
              </Link>
            </Button>
          </OverlayTrigger>
          <Button
        variant="success"
        className="bottom-button"
        
      >
        <FontAwesomeIcon icon={faFilePdf} />
        Generar PDF
      </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">
            Historial de comisiones propietario
          </h1>
        </div>
        <div className="view_esp">
          <div className="table-container">
            <Table striped bordered hover>
              <thead> {createheader()} </thead>
              <tbody>
                {currentItems.map((CPropietarios) => createrow(CPropietarios))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="paginador">
          <Pagination>
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(Math.ceil(infoComision.length / itemsPerPage))].map(
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
                currentPage === Math.ceil(infoComision.length / itemsPerPage)
              }
            />
          </Pagination>
        </div>
      </div>
      <Modal
      size="lg"
      show={mostrarModalA}
      onHide={handleCloseModalA}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Seleccionar Propietario</Modal.Title>
        <p onClick={resetPropie} >Reset</p>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {PropietariosDisponibles.map((Propietario, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => handlePropietarioChange(Propietario)}
            >
              {Propietario.TipoDocumento} :{Propietario.DocumentoIdentidad}

              {Propietario.NombreCompleto}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
    </>
  );
};
