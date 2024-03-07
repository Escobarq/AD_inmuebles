import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFilePdf, faFileSignature } from "@fortawesome/free-solid-svg-icons";


import Pagination from "react-bootstrap/Pagination";
import moment from 'moment';
import 'moment/locale/es';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../../../assets/Logo.png';
import Button from 'react-bootstrap/Button';

export const ContratoA = () => {
  const [infoarrendatario, setinfoarrendatario] = useState([]);
  const pdfContentRef = useRef(null);
  const [filtroData, setFiltroData] = useState({
    FechaFinMIN: "",
    FechaFinMAX: "",
    NContrato: "",
  });

  useEffect(() => {
    fetchData();
  }, [filtroData]);

  const fetchData = async (filtroData) => {
    console.log(filtroData);
    const queryParams = new URLSearchParams(filtroData);
    try {
      const response = await fetch(`http://localhost:3006/contratoFiltro?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setinfoarrendatario(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  //formatear fecha 
  function formatDate(fechaString) {
    return moment(fechaString).format('MMMM , D , YYYY');
  }

  moment.updateLocale('es', {
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort: 'ene.feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split(''),
    weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort: 'dom.lun._mar._mié._jue._vie._sáb.'.split(''),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_')
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
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
    return (
      <tr key={Contrato.IdContrato}>
        <td>{Contrato.IdContrato}</td>
        <td>{Contrato.DocumentoIdentidad}</td>
        <td>{Contrato.NombreArrendatario}</td>
        <td>{Contrato.NoMatricula}</td>
        <td>{formatDate(Contrato.FechaInicioContrato)}</td>
        <td>{formatDate(Contrato.FechaFinContrato)}</td>
        <td>$ {Contrato.ValorDeposito}</td>
        <td>{Contrato.CuotasPendientes}</td>
        <td>{Contrato.EstadoContrato}</td>
      </tr>
    );
  };

  // Variables Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infoarrendatario.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  function getCurrentDate() {
    return moment().format('MMMM D, YYYY');
  }
  //AQUI EMPIEZA GENERACION DE PDF
  const handleGeneratePDF = () => {
    console.log(infoarrendatario);

    const doc = new jsPDF();
    const addHoraEmision = () => {
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    doc.setTextColor(128); // Gris
    doc.setFontSize(8);
    doc.text(`Hora de Emisión: ${formattedTime}`, 20, doc.internal.pageSize.getHeight() - 10);
    };
    doc.addImage(logo, "PNG", 15, 10, 33, 20); // Logo next to the title
    doc.text("Contrato Arrendatario", 60, 23); // Title next to the logo
    addHoraEmision();
    const date = new Date();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const formattedDate = `${monthNames[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`;
    doc.setTextColor(128); // Gris
    doc.setFontSize(10);
    doc.text(formattedDate, 190, 18, null, null, "right");

    const columns = [
      { header: "Id Contrato", dataKey: "IdContrato", },
      { header: "Documento", dataKey: "DocumentoIdentidad", },
      { header: "Arrendatario", dataKey: "NombreCompleto", },
      { header: "Matricula", dataKey: "NoMatricula", },
      { header: "Fecha Ini_Cont", dataKey: "FechaInicioContrato", },
      { header: "Fecha Fin_Cont", dataKey: "FechaFinContrato", },
      { header: "Deposito", dataKey: "ValorDeposito", },
      { header: "Cuotas Pendientes", dataKey: "CuotasPendientes", },
      { header: "Estado", dataKey: "Estado", }
    ];
    // Datos de la tabla
    const data = infoarrendatario.map(arrendatario => ({
      IdContrato: arrendatario.IdContrato,
      DocumentoIdentidad: arrendatario.DocumentoIdentidad,
      NombreCompleto: arrendatario.NombreArrendatario,
      NoMatricula: arrendatario.NoMatricula,
      FechaInicioContrato: formatDate(arrendatario.FechaInicioContrato),
      FechaFinContrato: formatDate(arrendatario.FechaFinContrato),
      ValorDeposito: arrendatario.ValorDeposito,
      CuotasPendientes: arrendatario.CuotasPendientes,
      Estado: arrendatario.EstadoContrato
    }));

    const itemsPerPage = 21; 
    let startY = 45; 

    for (let i = 0; i < Math.ceil(data.length / itemsPerPage); i++) {
      const currentPageData = data.slice(i * itemsPerPage, (i + 1) * itemsPerPage);
      // Información en forma de tabla
      autoTable(doc, {
        columns,
        body: currentPageData,
        startY: startY, 
        styles: { fontSize: 8 }, 
        margin: { top: 30 } 
      });
      // Si hay más páginas, añadir una nueva página
      if (i < Math.ceil(data.length / itemsPerPage) - 1) {
        doc.addPage();
        startY = 40; 

      }
      addHoraEmision();
      doc.addImage(logo, "PNG", 15, 10, 20, 15); 
      doc.setFontSize(13);
      doc.text("Adminmuebles", 45, 20); 
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

  return (
    <div className="contenerhom">
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
        </div>

        <Button variant="primary" className="NewContract" onClick={() => redireccion("/Generar")}>
          <FontAwesomeIcon icon={faFileSignature} />
          Generar Nuevo contrato
        </Button>
        <button className="bottom-button" onClick={handleGeneratePDF}>
          <FontAwesomeIcon icon={faFilePdf} />
          Generar PDF
        </button>
      </div>
      <div className="container__arrendatario">
        <div className="ContArrendatario">
          <h1>Contrato Arrendatario</h1>
        </div>

        <div className="table-container" ref={pdfContentRef}>
          <table className="table">
            <thead>{createheader()}</thead>
            <tbody>
              {currentItems.map((Contrato) => createrow(Contrato))}
            </tbody>
          </table>
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