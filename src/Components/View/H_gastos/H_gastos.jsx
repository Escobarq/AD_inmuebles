import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState ,useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

export const H_gastos = () => {
  const [infoComision, setinfoComision] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/VComisionPropie");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setinfoComision(data);

        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  const createheader = () => {
    return (
      <tr>
        <th>ID Comision Propietario</th>
        <th>ID Propietario</th>
        <th>Periodo de pago</th>
        <th>Fecha Elaboracion</th>
        <th>Fecha final</th>
        <th>Forma pago</th>
        <th>Valor pago</th>
        <th>Observaciones</th>
        
      </tr>
    );
  };
  const createrow = (CPropietario) => {
    return (
      <tr key={CPropietario.Id_comision_Propietario}>
        <td>{CPropietario.Id_comision_Propietario}</td>
        <td>{CPropietario.Id_Propietario}</td>
        <td>{CPropietario.Periodo_Pagado}</td>
        <td>{CPropietario.Fecha_Elaboracion}</td>
        <td>{CPropietario.Elaborado_por}</td>
        <td>{CPropietario.Forma_Pago}</td>
        <td>${CPropietario.Valor_Arriendo}</td>     
        <td>{CPropietario.Observaciones}</td>     
        
      </tr>
    );
  };
      //Variables Paginacion
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage] = useState(10);
      // Paginación
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = infoComision.slice(indexOfFirstItem, indexOfLastItem);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="contener-home">
      <div className="conten-filtro">
          <div className="conten-inputs">
            <label className="l1">No. Cedula: </label>
            <input
              className="input-filtroRe"
              type="number"
              name=""
              max={9999999999}
              id=""
            />
            <label className="l1">Fecha Ingreso: </label>
            <input className="input-filtroRe" type="date" name="" id="" />
          </div>
          <Button variant="success" className="btn-add">
            <Link to="/RGastos">
              <FontAwesomeIcon className="icon" icon={faUserPlus} /> Generar
              Recibo gastos
            </Link>
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Historial de comisiones propietario</h1>
        </div>
        <div className="view_esp">
          <div className="table-container">
            <Table striped bordered hover>
              <thead> {createheader()} </thead>
              <tbody>
                {currentItems.map((CPropietarios) =>
                  createrow(CPropietarios)
                )}
              </tbody>
              </Table>
          </div>
        </div>
        <div className="paginador">
          <Pagination >
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(Math.ceil(infoComision.length / itemsPerPage))].map(
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
                currentPage === Math.ceil(infoComision.length / itemsPerPage)
              }
            />
          </Pagination>
        </div>
      </div>
    </>
  )
}
