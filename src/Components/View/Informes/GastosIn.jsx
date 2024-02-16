import { useState, useRef } from 'react';
import './GastosyContrato.css';
import { Table, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const GastosIn = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tableData] = useState([
    { id: 1, name: 'Nombre 1', months: 6, pendingPayments: 2 },
    { id: 2, name: 'Nombre 2', months: 12, pendingPayments: 0 },

  ]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);

  const tableRef = useRef(null);

  const handlePageChange = (direction) => {
    if (direction === 'prev') {
      setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
    } else if (direction === 'next') {
      setCurrentPage(currentPage < Math.ceil(tableData.length / itemsPerPage) ? currentPage + 1 : currentPage);
    }
  }

  const handleHorizontalScroll = (direction) => {
    const tableContainer = tableRef.current;
    if (tableContainer) {
      const containerWidth = tableContainer.offsetWidth;
      const newPosition = direction === 'prev' ? scrollPosition - containerWidth : scrollPosition + containerWidth;
      setScrollPosition(Math.max(0, Math.min(newPosition, tableContainer.scrollWidth - containerWidth)));
      tableContainer.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  }

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
                {tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                     a
                    </td>
                    <td>{item.months}</td>
                    <td>{item.pendingPayments}</td>
                    <td>a</td>
                    <td>a</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="pagination-container">
          <button onClick={() => handlePageChange('prev')} className='btnpag'>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span className="page-info">Página {currentPage} de {Math.ceil(tableData.length / itemsPerPage)}</span>
          <button onClick={() => handlePageChange('next')} className='btnpag'>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <button className="bottom-button">
          <FontAwesomeIcon icon={faFilePdf} />
          Generar PDF
        </button>
      </div>
    </>
  );
}
