import { Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { faFilePdf, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import "moment/locale/es";
import NoResultImg from "../../../assets/NoResult.gif";
import "./H_recibos.css";
import { useMediaQuery } from "@react-hook/media-query";
import logo from "../../../assets/Logo.jpg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



export const H_recibos = () => {
  const isSmallScreen = useMediaQuery("(max-width: 1366px)");
  const [infoPArrendamiento, setinfoPArrendamiento] = useState([]);

  const [filtroData, setFiltroData] = useState({
    estado: "",
    FechaPagoIni: "",
    FechaPagoFin: "",
    FormaPago: "",
  });
  const [NoResult, setNoResult] = useState(false);

  //Mostrar informaicon
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
        `http://localhost:3006/VPagoArren?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const Harrendamiento = data.filter((item) => item.booleanos === "true");
      setinfoPArrendamiento(Harrendamiento);


      if (data.length == 0) {
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
        <th>ID pago arrendatario</th>
        <th>Cod Contrato</th>
        <th>Arrendatario</th>
        <th>Fecha pago</th>
        <th>Fecha Pago Fija</th>
        <th>Forma de Pago</th>
        <th>Valor pago</th>
        <th>Estado pago</th>
        <th>Dias mora</th>
      </tr>
    );
  };
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
  const createrow = (PArrendamiento) => {
    return (
      <tr key={PArrendamiento.IdPagoArrendamiento}>
        <td>{PArrendamiento.IdPagoArrendamiento}</td>
        <td>{PArrendamiento.IdContrato}</td>
        <td>{PArrendamiento.IdArrendatario}</td>
        <td>{formatDate(PArrendamiento.FechaPago)}</td>
        <td>{formatDate(PArrendamiento.FechaPagoFija)}</td>
        <td>{PArrendamiento.FormaPago}</td>
        <td>{PArrendamiento.ValorPago}</td>
        <td>{PArrendamiento.Estado}</td>
        <td>{PArrendamiento.DiasDMora}</td>
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
  const currentItems = infoPArrendamiento.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //formatear fecha
  function formatDate(fechaString) {
    return moment(fechaString).format("MMMM , D , YYYY");
  }
  //Tooltip
  const [showTooltip, setShowTooltip] = useState(window.innerWidth <= 1366);

  useEffect(() => {
    const updateTooltipVisibility = () => {
      setShowTooltip(window.innerWidth < 1366);
    };

    window.addEventListener("resize", updateTooltipVisibility);
    return () => window.removeEventListener("resize", updateTooltipVisibility);
  }, []);


// Objeto para descripciones de filtros
const filtroDescriptions = {
  estado: "Estado",
  FormaPago: "Forma Pago",
  FechaPagoIni: "Pago Inicio",
  FechaPagoFin: "Pago Fin",
};

// Formatear los filtros aplicados
let formattedFilters = "";
if (Object.values(filtroData).filter(value => value).length > 0) {
formattedFilters = Object.keys(filtroData)
  .filter(key => filtroData[key]) // Filtrar solo los valores que no están vacíos
  .map(key => `${filtroDescriptions[key]}: ${filtroData[key]}`);

} else {
  formattedFilters = " Ninguno";
}




  //AQUI EMPIEZA GENERACION DE PDF
  const ArrenPDF = () => {
    const doc = new jsPDF();
    const addHoraEmision = () => {
      const currentDate = new Date();
      const formattedTime = currentDate.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
      doc.setTextColor(128); // Gris
      doc.setFontSize(8);
      doc.text(
        `Hora de Emisión: ${formattedTime}`,
        20,
        doc.internal.pageSize.getHeight() - 10
      );
    };
    doc.addImage(logo, "PNG", 15, 10, 20, 20);
    doc.setFontSize(20);
    doc.text("Historial de Pago Arrendamiento", 44, 20);
    doc.setFontSize(13);
    doc.setTextColor(128);
    doc.text("Adminmuebles", 44, 26); // Title next to the logo
    doc.setFontSize(6);
    doc.setFontSize(7);
    doc.text(` Filtros aplicados:\n${formattedFilters}`, 43, 31);
 
    

    addHoraEmision();
    const date = new Date();
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const formattedDate = `${monthNames[date.getMonth()]
      }/${date.getDate()}/${date.getFullYear()}`;
    doc.setTextColor(128); // Gris
    doc.setFontSize(10);
    doc.text(formattedDate, 190, 18, null, null, "right");


    const columns = [

      { header: "ID pago arrendatario", dataKey: "IdPagoArrendamiento" },
      { header: "ID arrendatario", dataKey: "IdArrendatario" },
      { header: "Fecha pago", dataKey: "FechaPago" },
      { header: "Fecha inicio", dataKey: "FechaInicio" },
      { header: "Fecha final", dataKey: "FechaFin" },
      { header: "Valor pago", dataKey: "ValorPago" },
      { header: "Forma pago", dataKey: "FormaPago" },
      { header: "Estado pago", dataKey: "Estado" },
      { header: "Dias mora", dataKey: "DiasDMora" },
    ];
    // Datos de la tabla
    const data = infoPArrendamiento.map((Arrendamiento) => ({

      IdPagoArrendamiento:Arrendamiento.IdPagoArrendamiento,
      IdArrendatario:Arrendamiento.IdArrendatario,
      FechaPago: formatDate(Arrendamiento.FechaPago),
      FechaInicio: formatDate(Arrendamiento.FechaInicio),
      FechaFin: formatDate(Arrendamiento.FechaFin),
      ValorPago:  `$${Arrendamiento.ValorPago}`,
      FormaPago:Arrendamiento.FormaPago,
      Estado:Arrendamiento.Estado,
      DiasDMora:Arrendamiento.DiasDMora,


    }));
    const itemsPerPage = 21;
    let startY = 45;
    for (let i = 0; i < Math.ceil(data.length / itemsPerPage); i++) {
      const currentPageData = data.slice(
        i * itemsPerPage,
        (i + 1) * itemsPerPage
      );

      // Información en forma de tabla
      autoTable(doc, {
        columns,
        body: currentPageData,
        startY: startY,
        styles: { fontSize: 8 },
        margin: { top: 30 },
      });
      // Si hay más páginas, añadir una nueva página
      if (i < Math.ceil(data.length / itemsPerPage) - 1) {
        doc.addPage();
        startY = 40;
      }

      const date = new Date();
      const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const formattedDate = `${monthNames[date.getMonth()]
        }/${date.getDate()}/${date.getFullYear()}`;
      doc.setTextColor(128); // Gris
      doc.setFontSize(10);
      doc.text(formattedDate, 190, 18, null, null, "right");


      addHoraEmision();
      doc.addImage(logo, "PNG", 15, 15, 20, 15);
      doc.setFontSize(13);
      doc.text("Adminmuebles", 44, 26);
    }

    const totalPages = doc.internal.getNumberOfPages();
    // Numeración de páginas
    for (let j = 1; j <= totalPages; j++) {
      doc.setPage(j);
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        `Pág ${j} / ${totalPages}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }
    doc.save("Historial de Pago Arrendamiento-PDF");



  };
  //AQUI TERMINA







  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">
          <div className="conten-inputs">
            <label className="l1">Estado: </label>
            <select
              className="input-filtroRe"
              name="estado"
              value={filtroData.estado}
              onChange={handleChange}
              id=""
            >
              <option value="">Seleccione el estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Pagado">Pagado</option>
            </select>

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
            <label className="l1">Fecha Pago Minima: </label>
            <input
              className="input-filtroRe"
              type="date"
              value={filtroData.FechaPagoIni}
              onChange={handleChange}
              name="FechaPagoIni"
              id=""
            />
            <label className="l1">Fecha Pago Maxima: </label>
            <input
              className="input-filtroRe"
              type="date"
              value={filtroData.FechaPagoFin}
              onChange={handleChange}
              name="FechaPagoFin"
              id=""
            />
          </div>
          <OverlayTrigger
            key="tooltip-add-arrendamiento"
            placement="top"
            overlay={
              showTooltip ? (
                <Tooltip id="tooltip-prop">Agregar Pago arrendamiento</Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button variant="success" className="btn-add">
              <Link to="/ReArrendamiento">
                <FontAwesomeIcon className="icon" icon={faUserPlus} />
                <p className="AgregarPA">Agregar Pago Arrendamiento</p>
              </Link>
            </Button>
          </OverlayTrigger>

          <Button
            variant="success"
            className="bottom-button"
            onClick={ArrenPDF}
          >
            <FontAwesomeIcon icon={faFilePdf} />
            Generar PDF
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Historial de Pago Arrendamiento</h1>
        </div>

        <div className="view_esp">
          {NoResult == true ? (
            <div className="Noresult">
              <img className="Noresult" src={NoResultImg} alt="" />
            </div>
          ) : (
            <div className="table-container">
              <Table striped bordered hover>
                <thead> {createheader()} </thead>
                <tbody>
                  {currentItems.map((PArrendamientos) =>
                    createrow(PArrendamientos)
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
            {[
              ...Array(Math.ceil(infoPArrendamiento.length / itemsPerPage)),
            ].map((item, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(infoPArrendamiento.length / itemsPerPage)
              }
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};
