import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from "../../../assets/Logo.png";
import moment from 'moment';
import 'moment/locale/es';


export const ContratoA = () => {
  const [infoarrendatario, setinfoarrendatario] = useState([]);
  const pdfContentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/Varrendatario");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setinfoarrendatario(data);
      } catch (error) {
        console.error("Error fetching products:", error);
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

  const createheader = () => {
    return (
      <tr>
        <th>Documento</th>
        <th>Nombre Arrendatario</th>
        <th>Meses de Alquiler</th>
        <th>Cuotas Pendientes</th>
        <th>Fecha Inicio Contrato</th>
        <th>Fecha Fin Contrato</th>
        <th>Estado</th>
      </tr>
    );
  };

  const createrow = (Arrendatarios) => {
    return (
      <tr key={Arrendatarios.Id_Arrendatario}>
        <td>{Arrendatarios.Documento_Identidad}</td>
        <td>{Arrendatarios.Nombre_Completo}</td>
        <td>{Arrendatarios.Meses_Alquiler}</td>
        <td>{Arrendatarios.Cuotas_Pendientes}</td>
        <td>{formatDate(Arrendatarios.Fecha_Inicio_Contrato)}</td>
        <td>{formatDate(Arrendatarios.Fecha_Fin_Contrato)}</td>
        <td>{Arrendatarios.Estado}</td>
      </tr>
    );
  };

  // Variables Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infoarrendatario.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


// Función para generar el PDF
const generatePDF = () => {
  html2canvas(pdfContentRef.current, { width: pdfContentRef.current.scrollWidth }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Añadir un margen de 10mm a la izquierda y a la derecha
    const marginLeft = 10;
    const marginRight = 10;
    const tableWidth = imgWidth - marginLeft - marginRight;

    // Calcular la posición y el tamaño de la tabla en el PDF
    const marginTop = 50; // Ajusta este valor según tus necesidades
    const tableX = marginLeft;
    const tableY = marginTop;
    const tableHeight = (canvas.height * tableWidth) / canvas.width;

    // Agregar el logo
    const logoWidth = 35; // Ancho del logo
    const logoHeight = 20; // Alto del logo
    pdf.addImage(logo, 'PNG', marginLeft, 10, logoWidth, logoHeight);

    // Agregar el título al lado del logo
    pdf.setFontSize(16);
    pdf.text("Contrato Arrendatario", marginLeft + logoWidth + 5, 20);

    // Agregar la tabla
    pdf.addImage(imgData, 'PNG', marginLeft, marginTop, tableWidth, tableHeight);
    
    pdf.save("contrato_arrendatario.pdf");
  });
};



  return (
    <div className="contenerhom">
      <div className="container__arrendatario">
        <div className="ContArrendatario">
          <h1>Contrato Arrendatario</h1>
        </div>

        <div className="table-container" ref={pdfContentRef}>
          <table className="table">
            <thead>{createheader()}</thead>
            <tbody>
              {currentItems.map((Arrendatarios) => createrow(Arrendatarios))}
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
      <button className="bottom-button" onClick={generatePDF}>
        <FontAwesomeIcon icon={faFilePdf} />
        Generar PDF
      </button>
    </div>
  );
};
