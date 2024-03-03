import { useState, useEffect, useRef } from "react";
import "./GastosyContrato.css";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import logo from "../../../assets/Logo.png";
import moment from 'moment';
import 'moment/locale/es';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


export const GastosIn = () => {
  const [tableData, setTableData] = useState([]);
  const pdfContentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/VComisionPropie");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //formatear fecha 
  function formatDate(fechaString) {
    return moment(fechaString).format('MMMM , D , YYYY');
  }

  moment.updateLocale('es', {
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort: 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
    weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_')
  });
  // Objeto javascript para hacer el tbody de la table
  const createRow = (Gastonin) => {
    return (
      <tr >
        <td>{Gastonin.IdPropietario}</td>

        <td>{Gastonin.NombreCompleto}</td>
        <td>{Gastonin.ValorArriendo}</td>

        <td>{formatDate(Gastonin.PeriodoPagado)}</td>
        <td>{ }</td>
        <td>{Gastonin.FormaPago}</td>
        <td>{ }</td>


        <td>{Gastonin.Observaciones}</td>
      </tr>
    );
  };
  // Variables Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  function getCurrentDate() {
    return moment().format('MMMM D, YYYY');
  }

  //Funcion para generar pdf
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    // Logo-pdf
    doc.addImage(logo, "PNG", 15, 10, 33, 20); // Logo next to the title
    // titulo pdf
    doc.text("Contrato Arrendatario", 60, 23); // Title next to the logo
    // Columnas-pdf
    const columns = [
      { header: "N°", dataKey: "IdPropietario" },
      { header: "Nombre Propietario", dataKey: "NombreCompleto" },
      { header: "Arrendamiento", dataKey: "ValorArriendo" },
      { header: "Periodo Pagado", dataKey: "PeriodoPagado" },
      { header: "Deposito", dataKey: "" },
      { header: "Forma de Pago", dataKey: "FormaPago" },
      { header: "Total", dataKey: "" },
      { header: "Observaciones", dataKey: "Observaciones" }
    ];
    // Datos de la tabla
    const data = currentItems.map(item => ({
      IdPropietario: item.IdPropietario,
      NombreCompleto: item.NombreCompleto,
      ValorArriendo: item.ValorArriendo,
      PeriodoPagado: formatDate(item.PeriodoPagado),
      FormaPago: item.FormaPago,
      Observaciones: item.Observaciones
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
    // Agregar fecha actual en la parte superior derecha
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      getCurrentDate(),
      doc.internal.pageSize.getWidth() - 30,
      10,
      { align: "right" }
    );
    // nombre de pdf
    doc.save("Contrato_Arrendatario.pdf");
  };


  
  return (
    <>
      <div className="contener-home" >
        <div className="title_views">
          <h1 className="ContArrendatario">Comisión de Gastos</h1>
        </div>

        <div className="view_esp">
          <div className="table-container" ref={pdfContentRef} >
            <Table className="table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre Propietario</th>
                  <th>Arrendamiento</th>
                  <th>Periodo Pagado</th>
                  <th>Deposito</th>
                  <th>Forma de Pago</th>
                  <th>Total</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((Gastonin) => createRow(Gastonin))}
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
            {[...Array(Math.ceil(tableData.length / itemsPerPage))].map(
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
                currentPage === Math.ceil(tableData.length / itemsPerPage)
              }
            />
          </Pagination>
        </div>
        <button className="bottom-button" onClick={handleGeneratePDF} >
          <FontAwesomeIcon icon={faFilePdf} />
          Generar PDF
        </button>
      </div>
    </>
  );
};
