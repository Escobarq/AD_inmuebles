import  { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";

export const CodeudorInha = () => {
    const [infoCodeudor, setinfoCodeudor] = useState([]);
//   const [codeudoresInhabilitados, setCodeudoresInhabilitados] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/Vcodeudor");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        // Filtrar los datos para incluir solo aquellos con booleanos=true
        const codeudoresActivos = data.filter(codeudor => codeudor.booleanos === 'false');
        
        setinfoCodeudor(codeudoresActivos);
  
        console.log(codeudoresActivos);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchData();
  }, []);

  const createheader = () => {
    return (
        <tr>
        <th>ID</th>
        <th>No. Documento</th>
        <th>Nombre</th>
        <th>Dirección</th>
        <th>Teléfono</th>
        <th>Correo</th>
        <th>Opciones</th>
      </tr>
      );
  };

  const createrow = (Codeudor) => {
    return (
      <tr key={Codeudor.Id_Codeudor}>
        <td>{Codeudor.Id_Codeudor}</td>
        <td>{Codeudor.Documento_Identidad}</td>
        <td>{Codeudor.Nombre_Completo}</td>
        <td>{Codeudor.Direccion}</td>
        <td>{Codeudor.Telefono}</td>
        <td>{Codeudor.Correo}</td>
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
    const currentItems = infoCodeudor.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
 <div className="contener-home">
        <div className="conten-filtro">
          <Button variant="dark" className="btn-add-info ">
            <Link to="/Codeudor" className="linkes">
              <FontAwesomeIcon className="icon" icon={faEye} /> Ver
              Habilidatos
            </Link>
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Codeudores Inhabilitados</h1>
        </div>

        <div className="view_esp">
          <div className="table-container">
            <Table striped bordered hover>
              <thead> {createheader()} </thead>
              <tbody>
                {currentItems.map((Codeudors) => createrow(Codeudors))}
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
            {[...Array(Math.ceil(infoCodeudor.length / itemsPerPage))].map(
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
                currentPage === Math.ceil(infoCodeudor.length / itemsPerPage)
              }
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};