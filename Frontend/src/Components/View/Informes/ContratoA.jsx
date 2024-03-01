import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import moment from 'moment';
import 'moment/locale/es';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../../../assets/Logo.png'

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
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort: 'ene.feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split(''),
    weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort: 'dom.lun._mar._mié._jue._vie._sáb.'.split(''),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_')
  });

  const createheader = () => {
    return (
      <tr>
        <th>Documento</th>
        <th>Nombre Arrendatario</th>

        <th>Fecha Inicio Contrato</th>
        <th>Fecha Fin Contrato</th>
        <th>Estado</th>
      </tr>
    );
  };

  const createrow = (Arrendatarios) => {
    return (
      <tr key={Arrendatarios.IdArrendatario}>
        <td>{Arrendatarios.DocumentoIdentidad}</td>
        <td>{Arrendatarios.NombreCompleto}</td>
       
       
        <td>{formatDate(Arrendatarios.FechaInicioContrato)}</td>
        <td>{formatDate(Arrendatarios.FechaFinContrato)}</td>
        <td>{Arrendatarios.Estado}</td>
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


  //Funcion para generar pdf
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    


    // Logo-pdf
    doc.addImage(logo, "PNG", 15, 10, 33, 20); // Logo next to the title

    // titulo pdf
    doc.text("Contrato Arrendatario", 60, 23); // Title next to the logo




    // Columnas-pdf
    const columns = [
        { header: "Documento", dataKey: "DocumentoIdentidad" },
        { header: "Nombre Arrendatario", dataKey: "NombreCompleto" },
        { header: "Fecha Inicio Contrato", dataKey: "FechaInicioContrato" },
        { header: "Fecha Fin Contrato", dataKey: "FechaFinContrato" },
        { header: "Estado", dataKey: "Estado" }
    ];

    // Datos de la tabla
    const data = infoarrendatario.map(arrendatario => ({
        DocumentoIdentidad: arrendatario.DocumentoIdentidad,
        NombreCompleto: arrendatario.NombreCompleto,
        FechaInicioContrato: formatDate(arrendatario.FechaInicioContrato),
        FechaFinContrato: formatDate(arrendatario.FechaFinContrato),
        Estado: arrendatario.Estado
    }));

    //informacion en forma de tabla
    autoTable(doc, { 
// theme: 'plain',
//grid
//plain
      columns,
       body: data,
        startY: 40 }); // Move the table further down

    
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
      <button className="bottom-button" onClick={handleGeneratePDF}>
        <FontAwesomeIcon icon={faFilePdf} />
        Generar PDF
      </button>

    </div>
  );
};