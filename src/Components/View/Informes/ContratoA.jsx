import './GastosyContrato.css'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf,faArrowRight,faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export const ContratoA = () => {

  const [tableData] = useState([
    { id: 1, name: 'Nombre 1', months: 6, pendingPayments: 2 },
    { id: 2, name: 'Nombre 2', months: 12, pendingPayments: 0 },
    { id: 3, name: 'Nombre 3', months: 3, pendingPayments: 1 },
    // Añadir más datos aquí si es necesario
  ]);

  // Paginación
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el índice de inicio y final de los datos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const handlePageChange = (direction) => {
    if (direction === 'prev') {
      setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
    } else if (direction === 'next') {
      setCurrentPage(currentPage < Math.ceil(tableData.length / itemsPerPage) ? currentPage + 1 : currentPage);
    }
  }

  return (

<div  className='contenerhom'>
<div className="container">

<div className='ContArrendatario'>
  <h1>Contrato Arrendatario</h1>
</div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Nombre Arrendatario</th>
              <th>Meses de Alquiler</th>
              <th>Cuotas Pendientes</th>
              <th>Fecha Inicio Contrato</th>
              <th>Fecha Fin Contrato</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.months}</td>
                <td>{item.pendingPayments}</td>
                <td>{/* Agregar fecha de inicio de contrato */}</td>
                <td>{/* Agregar fecha de fin de contrato */}</td>
                <td>{/* Agregar estado */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="pagination-container">
        <button onClick={() => handlePageChange('prev')} className='btnpag'>
        <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        <span>Página {currentPage} de {Math.ceil(tableData.length / itemsPerPage)}</span>
        <button onClick={() => handlePageChange('next')}className='btnpag' >
        <FontAwesomeIcon icon={faArrowRight} />
      
        </button>
      </div>



    </div>

    <button className="bottom-button">
    <FontAwesomeIcon icon={faFilePdf} />
      Generar PDF
    </button>

    </div>
  );
};
    
  
