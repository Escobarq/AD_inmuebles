import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import "moment/locale/es";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../assets/Logo.jpg";
import { Button, Table } from "react-bootstrap";
import useContratoInfo from '../../Hooks/useObtenerInfoContrac';
import { useMediaQuery } from "@react-hook/media-query";

export const ContratoA = () => {
  const contratoInfo = useContratoInfo('http://localhost:3006/contratoFiltro');
  const [infoarrendatario, setinfoarrendatario] = useState([]);
  const pdfContentRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width: 1366px)");


  const [filtroData, setFiltroData] = useState({
    FechaFinMIN: "",
    FechaFinMAX: "",
    NContrato: "",
    Estado: "",
  });

  useEffect(() => {
    fetchData();
  }, [filtroData]);

  const fetchData = async () => {
    const queryParams = new URLSearchParams(filtroData);
    try {
      const response = await fetch(
        `http://localhost:3006/contratoFiltro?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setinfoarrendatario(data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
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
      "ene.feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split(""),
    weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
    weekdaysShort: "dom.lun._mar._mié._jue._vie._sáb.".split(""),
    weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
    console.log(filtroData);
  };

  const createheader = () => {
    return (
      <tr>
        <th>No Contrato</th>
        <th>No Documento</th>
        <th>Arrendatario</th>
        <th>Matricula Inmueble</th>
        <th>Inicio de Contrato</th>
        <th>Fin de Contrato</th>
        <th>Valor Deposito</th>
        <th>Cuotas Pendientes</th>
        <th>Estado</th>
      </tr>
    );
  };

  const createrow = (Contrato) => {
    // Calcula la fecha actual y la fecha actual + 4 semanas en milisegundos
    const currentDate = new Date();
    const fourWeeksLater = new Date(currentDate.getTime() + 4 * 7 * 24 * 60 * 60 * 1000).getTime();

    // Color para la fecha de fin de contrato
    const colorFechaFinContrato = new Date(Contrato.FechaFinContrato).getTime() <= fourWeeksLater ? "#ff696198" : "#f8e44bbd";

    return (
      <tr key={Contrato.IdContrato}>
        <td>{Contrato.IdContrato}</td>
        <td>{Contrato.DocumentoIdentidad}</td>
        <td>{Contrato.NombreArrendatario}</td>
        <td>{Contrato.NoMatricula}</td>
        <td>{formatDate(Contrato.FechaInicioContrato)}</td>
        <td style={{ backgroundColor: colorFechaFinContrato }}>{formatDate(Contrato.FechaFinContrato)}</td>
        <td>{Contrato.ValorDeposito}</td>
        <td>{Contrato.CuotasPendientes}</td>
        <td>{Contrato.EstadoContrato}</td>
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
  const currentItems = infoarrendatario.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function getCurrentDate() {
    return moment().format("MMMM D, YYYY");
  }



  // Objeto para descripciones de filtros
  const filtroDescriptions = {
    FechaFinMIN: "Final mínimo",
    FechaFinMAX: "Final máximo",
    NContrato: "No Contrato",
    Estado: "Estado"
  };

// Formatear los filtros aplicados
let formattedFilters = "";
if (Object.values(filtroData).filter(value => value).length > 0) {
  formattedFilters = Object.keys(filtroData)
    .filter(key => filtroData[key]) // Filtrar solo los valores que no están vacíos
    .map(key => `${filtroDescriptions[key]}: ${filtroData[key]}`)
    .join("\n");
  } else {
    formattedFilters = "Ninguno";
  }
  

  //AQUI EMPIEZA GENERACION DE PDF
  const handleGeneratePDF = () => {
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
    doc.text("Contrato Arrendatario", 44, 20);
    doc.setFontSize(13);
    doc.setTextColor(128);

    doc.text("Adminmuebles", 44, 26);
    doc.setFontSize(6);

    doc.setFontSize(7);
    doc.text(`Filtros aplicados:\n${formattedFilters}`, 44, 31);


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
      { header: "Id Contrato", dataKey: "IdContrato" },
      { header: "Documento", dataKey: "DocumentoIdentidad" },
      { header: "Arrendatario", dataKey: "NombreCompleto" },
      { header: "Matricula", dataKey: "NoMatricula" },
      { header: "Fecha Ini_Cont", dataKey: "FechaInicioContrato" },
      { header: "Fecha Fin_Cont", dataKey: "FechaFinContrato" },
      { header: "Deposito", dataKey: "ValorDeposito" },
      { header: "Cuotas Pendientes", dataKey: "CuotasPendientes" },
      { header: "Estado", dataKey: "Estado" },
    ];
    // Datos de la tabla
    const data = infoarrendatario.map((arrendatario) => ({
      IdContrato: arrendatario.IdContrato,
      DocumentoIdentidad: arrendatario.DocumentoIdentidad,
      NombreCompleto: arrendatario.NombreArrendatario,
      NoMatricula: arrendatario.NoMatricula,
      FechaInicioContrato: formatDate(arrendatario.FechaInicioContrato),
      FechaFinContrato: formatDate(arrendatario.FechaFinContrato),
      ValorDeposito: arrendatario.ValorDeposito,
      CuotasPendientes: arrendatario.CuotasPendientes,
      Estado: arrendatario.EstadoContrato,
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
      doc.addImage(logo, "PNG", 15, 10, 20, 15);
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
    doc.save("Contrato_Arrendatario.pdf");
  };
  //AQUI TERMINA PDF
  const redireccion = (ruta) => {
    window.location.href = ruta;
  };

  return (
    <div className="contener-home">
      <div className="conten-filtro">
        <div className="conten-inputs">
          <label className="l1">No. Contrato: </label>
          <input
            value={filtroData.NContrato}
            onChange={handleChange}
            className="input-filtroRe"
            type="number"
            name="NContrato"
            max={9999999999}
            id=""
          />
          <label className="l1">Fecha Final Minimo: </label>
          <input
            className="input-filtroRe"
            value={filtroData.FechaFinMIN}
            onChange={handleChange}
            type="date"
            name="FechaFinMIN"
            id=""
          />
          <label className="l1">Fecha Final Maxima: </label>
          <input
            className="input-filtroRe"
            value={filtroData.FechaFinMAX}
            onChange={handleChange}
            type="date"
            name="FechaFinMAX"
            id=""
          />
          <label className="l1">Estado Contrato: </label>
          <select
            className="input-filtroRe"
            value={filtroData.Estado}
            onChange={handleChange}
            name="Estado"
            id=""
          >
            <option value="">Seleccione el estado</option>
            <option value="Vigente">Vigente</option>
            <option value="Finalizado">Finalizado</option>
          </select>
          <label className="l1">Fecha Final Maxima: </label>
          <input
            className="input-filtroRe"
            value={filtroData.FechaFinMAX}
            onChange={handleChange}
            type="date"
            name="FechaFinMAX"
            id=""
          />
        </div>
        <Button
          variant="primary"
          className="NewContract"
          onClick={() => redireccion("/Generar")}
        >
          <FontAwesomeIcon icon={faFileSignature} />
          Generar Nuevo contrato
        </Button>
        <Button
          variant="success"
          className="bottom-button"
          onClick={handleGeneratePDF}
        >
          <FontAwesomeIcon icon={faFilePdf} />
          Generar PDF
        </Button>
      </div>

      <div className="view_esp">
        <div className="ContArrendatario">
          <h1>Contrato Arrendatario</h1>
        </div>
        <div className="table-container" ref={pdfContentRef}>
          <Table striped bordered hover>
            <thead>{createheader()}</thead>
            <tbody>{currentItems.map((Contrato) => createrow(Contrato))}</tbody>
          </Table>
        </div>
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
              currentPage === Math.ceil(infoarrendatario.length / itemsPerPage)
            }
          />
        </Pagination>
      </div>
    </div>
  );
};
