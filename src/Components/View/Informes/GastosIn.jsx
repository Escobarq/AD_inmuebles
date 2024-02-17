import { useState, useEffect, useRef } from 'react';
import './GastosyContrato.css';
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const GastosIn = () => {



  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const itemsPerPage = 10;
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3006/VReciboPropie');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 
  return (
    <>
      <div className="contener-home">
        <div className="title_views">
          <h1 className="ContArrendatario">Comisión de Gastos</h1>
        </div>

        <div className="view_esp">
          <div className="table-container" ref={tableRef}>
            <Table className="table" style={{ transform: `translateX(-${scrollPosition}px)` }}>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre Propietario</th>
                  <th>Arrendamiento</th>
                  <th>Comisión</th>
                  <th>Deposito</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((propiedad, index) => (
                  <tr key={propiedad.Id_Propietario}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{propiedad.Nombre_Completo}</td>
                    <td></td>
                    <td></td> 
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

      

        <button className="bottom-button">
          <FontAwesomeIcon icon={faFilePdf} />
          Generar PDF
        </button>
      </div>
    </>
  );
}
