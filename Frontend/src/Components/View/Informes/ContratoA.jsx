import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFilePdf, faFileSignature} from "@fortawesome/free-solid-svg-icons";


import Pagination from "react-bootstrap/Pagination";
import moment from 'moment';
import 'moment/locale/es';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../../../assets/Logo.png'
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



  //Funcion para generar pdf

  const handleGeneratePDF = () => {

console.log(infoarrendatario);

    const doc = new jsPDF();
    // Logo-pdf
    doc.addImage(logo, "PNG", 15, 10, 33, 20); // Logo next to the title

    // titulo pdf
    doc.text("Contrato Arrendatario", 60, 23); // Title next to the logo


    const date = new Date();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const formattedDate = `${monthNames[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`;
    doc.setTextColor(128); // Gris
    doc.setFontSize(10);
    doc.text(formattedDate, 190, 10, null, null, "right");




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




    //informacion en forma de tabla
    autoTable(doc, {
      // theme: 'plain',
      //grid
      //plain
      columns,
      body: data,
      startY: 40
    }); // Move the table further down


    // obtener el numero total de paginas
    const totalPages = doc.internal.getNumberOfPages();

    // numeracion de paginas
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        `Pág ${i} / ${totalPages}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }

    // nombre de pdf
    doc.save("Contrato_Arrendatario.pdf");
  };




const redireccion = (ruta) => {
  window.location.href = ruta;
}

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
            <FontAwesomeIcon icon={faFileSignature}/>
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