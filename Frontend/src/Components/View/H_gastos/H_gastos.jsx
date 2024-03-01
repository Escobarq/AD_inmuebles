import { Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import "moment/locale/es";

export const H_gastos = () => {
  const [infoComision, setinfoComision] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/VComisionPropie");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const Historial = data.filter(
          (Historial) => Historial.booleanos === "true"
        );
        setinfoComision(Historial);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const createheader = () => {
    return (
      <tr>
        <th>ID Comision Propietario</th>
        <th>ID Propietario</th>
        <th>Periodo de pago</th>
        <th>Fecha Elaboracion</th>
        <th>Fecha final</th>
        <th>Forma pago</th>
        <th>Valor pago</th>
        <th>Observaciones</th>
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
        <td>{CPropietario.IdPropietario}</td>
        <td>{formatDate(CPropietario.Periodo_Pagado)}</td>
        <td>{formatDate(CPropietario.FechaElaboracion)}</td>
        <td>{CPropietario.ElaboradoPor}</td>
        <td>{CPropietario.FormaPago}</td>
        <td>${CPropietario.ValorArriendo}</td>
        <td>{CPropietario.Observaciones}</td>
      </tr>
    );
  };
  //Variables Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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
            <label className="l1">No. Cedula: </label>
            <input
              className="input-filtroRe"
              type="number"
              name=""
              max={9999999999}
              id=""
            />
            <label className="l1">Fecha Ingreso: </label>
            <input className="input-filtroRe" type="date" name="" id="" />
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
    </>
  );
};
