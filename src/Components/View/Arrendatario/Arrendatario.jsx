import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faPenToSquare
} from "@fortawesome/free-solid-svg-icons";

export const Arrendatario = () => {
  const [infoarrendatario, setinfoarrendatario] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/Varrendatario");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setinfoarrendatario(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  const createheader = () => {
          
    return(
      <tr>
      <th>Tipo de Documento</th>
      <th>No. Documento</th>
      <th>Nombre</th>
      <th>Estado</th>
      <th>Teléfono</th>
      <th>Correo</th>
      <th>Opciones</th>
      </tr>
   )
  
    
};
const createrow = (Arrendatarios) => {

return (
  <tr key={Arrendatarios.Id_Arrendatario}>
    <td>{Arrendatarios.Tipo_Documento}</td>
    <td>{Arrendatarios.Documento_Identidad}</td>
    <td>{Arrendatarios.Nombre_Completo}</td>
    <td>{Arrendatarios.Estado}</td>
    <td>{Arrendatarios.Telefono}</td>
    <td>{Arrendatarios.Correo}</td>
    <td>
<Button className="btn-opciones" variant="danger">
<FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} />
</Button>
<Button className="btn-opciones" variant="warning">
<FontAwesomeIcon icon={faPenToSquare} />
</Button>
</td>
    
  </tr>

);
};

return (
<>
<div className="contener-home">
  <div className="conten-filtro">
    <div className="conten-inputs">
  <label className="l1" >No. Cedula: </label>
  <input className="input-filtroRe" type="number" name="" max={9999999999} id="" />
  <label className="l1" >Estado: </label>
  <input className="input-filtroRe" type="text" name="" id="" />
    </div>
<Button variant="success" className="btn-add" >
  <Link to= "/ReArrendatario">
  <FontAwesomeIcon className="icon" icon={faUserPlus} />  Agregar Arrendatario
  
  </Link>
  </Button>
  </div>
  <div className="title_view">
    <h1 className="tittle_propetario">Arrendatario</h1>
  </div>

  <div className="view_esp">
  <div className="table-container">
    <Table striped bordered hover>
      <thead> {createheader()} </thead>
      <tbody >{infoarrendatario.map((Arrendatarios) => createrow(Arrendatarios))}</tbody>
    </Table>
    </div>
  </div>
</div>
</>
);
}
