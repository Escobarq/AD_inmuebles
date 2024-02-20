import { useState, useEffect } from "react";
import "./GastosyContrato.css";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";

export const GastosIn = () => {
  const [tableData, setTableData] = useState([]);

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
  //Objeto javascript para hacer el tbody de la table
  const createrow = (Gastonin) => {
    return (
      <tr key={Gastonin.Id_comision_Propietario}>
        <td>{Gastonin.Id_comision_Propietario}</td>
        <td>{Gastonin.Id_Propietario}</td>
        <td>{Gastonin.Fecha_Elaboracion}</td>
        <td>{Gastonin.Periodo_Pagado}</td>
        <td>{Gastonin.Elaborado_por}</td>
        <td>{Gastonin.Valor_Arriendo}</td>
        <td>{Gastonin.Forma_Pago}</td>
        <td>{Gastonin.Observaciones}</td>
      </tr>
    );
  };
  //Variables Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="contener-home">
        <div className="title_views">
          <h1 className="ContArrendatario">Comisión de Gastos</h1>
        </div>

        <div className="view_esp">
          <div className="table-container">
            <Table className="table">
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
                {currentItems.map((Gastonin) => createrow(Gastonin))}
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
        <button className="bottom-button">
          <FontAwesomeIcon icon={faFilePdf} />
          Generar PDF
        </button>
      </div>
    </>
  );
};
