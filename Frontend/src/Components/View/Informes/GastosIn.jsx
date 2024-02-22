import { useState, useEffect, useRef } from "react";
import "./GastosyContrato.css";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from "../../../assets/Logo.png";
import moment from 'moment';
import 'moment/locale/es';

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
        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort : 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_')
      });

  // Objeto javascript para hacer el tbody de la table
  const createRow = (Gastonin) => {
    return (
      <tr key={Gastonin.Id_comision_Propietario}>
        <td>{Gastonin.Id_comision_Propietario}</td>
        <td>{Gastonin.Id_Propietario}</td>
        <td>{formatDate(Gastonin.Fecha_Elaboracion)}</td>
        <td>{formatDate(Gastonin.Periodo_Pagado)}</td>
        <td>{Gastonin.Elaborado_por}</td>
        <td>{Gastonin.Forma_Pago}</td>
        <td>{Gastonin.Valor_Arriendo}</td>
        <td>{Gastonin.Observaciones}</td>
      </tr>
    );
  };

  // Variables Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


// Función para generar el PDF
const generatePDF = () => {
  html2canvas(pdfContentRef.current, { width: pdfContentRef.current.scrollWidth }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4'); // Cambiado a 'a4' para tamaño A4
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const margin = 10; // Margen de 10mm
    const logoWidth = 35; // Ancho del logo
    const logoHeight = 20; // Alto del logo
    const tableHeight = 45; // Altura deseada de la tabla en mm

    let heightLeft = imgHeight;
    let position = 0;

    // Verificar si la tabla cabe en una sola página
    if (heightLeft < pdf.internal.pageSize.getHeight()) {

      // Agregar título y logo
      pdf.setFont('Poppins');
      pdf.setFontSize(25);
      pdf.text("Comisión de Gastos", margin + logoWidth + 10, 25);
      pdf.addImage(logo, 'PNG', margin, margin, logoWidth, logoHeight);

      // Calcular el tamaño de la tabla en función del alto deseado
      const tableWidth = imgWidth - 2 * margin;

      // Agregar tabla con el alto deseado
      pdf.addImage(imgData, 'PNG', margin, margin + logoHeight + 10, tableWidth, tableHeight);
    } else {
      // Añadir la tabla en varias páginas
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position + margin, imgWidth - 2 * margin, imgHeight - 2 * margin);
        heightLeft -= (imgHeight - 2 * margin);
      }
    }

    pdf.save("comision_de_gastos.pdf");
  });
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
        <button className="bottom-button" onClick={generatePDF}>
          <FontAwesomeIcon icon={faFilePdf} />
          Generar PDF
        </button>
      </div>
    </>
  );
};
