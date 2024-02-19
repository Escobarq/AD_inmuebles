import { Table, Button } from "react-bootstrap";
import  { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

export const H_recibos = () => {
  const [infoPArrendamiento, setinfoPArrendamiento] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/VPagoArren");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setinfoPArrendamiento(data);

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
        <th>ID pago arrendatario</th>
        <th>ID arrendatario</th>
        <th>Fecha pago</th>
        <th>Fecha inicio</th>
        <th>Fecha final</th>
        <th>Valor pago</th>
        <th>Forma pago</th>
        <th>Estado pago</th>
        <th>Dias mora</th>
        <th>Editar</th>
      </tr>
    );
  };
  const createrow = (PArrendamiento) => {
    return (
      <tr key={PArrendamiento.Id_Pago_Arrendamiento}>
        <td>{PArrendamiento.Id_Pago_Arrendamiento}</td>
        <td>{PArrendamiento.Id_Arrendatario}</td>
        <td>{PArrendamiento.Fecha_Pago}</td>
        <td>{PArrendamiento.Fecha_Inicio}</td>
        <td>{PArrendamiento.Fecha_Fin}</td>
        <td>{PArrendamiento.Valor_Pago}</td>
        <td>{PArrendamiento.Forma_Pago}</td>
        <td>{PArrendamiento.Estado}</td>
        <td>{PArrendamiento.Dias_De_Mora}</td>
        <td>
          <Button className="btn-opciones" variant="danger">
            <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
          </Button>
          <Button className="btn-opciones" variant="warning">
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </td>
      </tr>
    );
  };
    //Variables Paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = infoPArrendamiento.slice(indexOfFirstItem, indexOfLastItem);
  
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
            <Link to="/Reciboarrendatario">
              <FontAwesomeIcon className="icon" icon={faUserPlus} /> Agregar
              PArrendamiento
            </Link>
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Historial de Pago Arrendamiento</h1>
        </div>

        <div className="view_esp">
          <div className="table-container">
            <Table striped bordered hover>
              <thead> {createheader()} </thead>
              <tbody>
                {currentItems.map((PArrendamientos) =>
                  createrow(PArrendamientos)
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
            {[...Array(Math.ceil(infoPArrendamiento.length / itemsPerPage))].map(
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
                currentPage === Math.ceil(infoPArrendamiento.length / itemsPerPage)
              }
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};
