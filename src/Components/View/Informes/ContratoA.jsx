import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";


export const ContratoA = () => {

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
        <th>Documento</th>
           <th>Nombre Arrendatario</th>
              <th>Meses de Alquiler</th>
              <th>Cuotas Pendientes</th>
              <th>Fecha Inicio Contrato</th>
              <th>Fecha Fin Contrato</th>
              <th>Estado</th>    
      </tr>
   )
  
    
};
const createrow = (Arrendatarios) => {

return (

  <tr key={Arrendatarios.Id_Arrendatario}>
  <td>{Arrendatarios.Documento_Identidad}</td>
  <td>{Arrendatarios.Nombre_Completo}</td>
 <td>{Arrendatarios.Id_Propietario}</td>
 <td>{Arrendatarios.Cuotas_Pendientes}</td>
 <td>{Arrendatarios.Fecha_Inicio_Contrato}</td>
 <td>{Arrendatarios.Fecha_Fin_Contrato}</td>
 <td>{Arrendatarios.Estado}</td>
  </tr>

);
};

return (
  <div  className='contenerhom'>
  <div className="container">
  
  <div className='ContArrendatario'>
    <h1>Contrato Arrendatario</h1>
  </div>
  
        <div className="table-container">
          <table className="table">
            <thead>
            {createheader()} 
            </thead>
            <tbody>{infoarrendatario.map((Arrendatarios) => createrow(Arrendatarios))}
            </tbody>
          </table>
        </div>
  
      </div>
  
      <button className="bottom-button">
      <FontAwesomeIcon icon={faFilePdf} />
        Generar PDF
      </button>
  
      </div>
    );
  
  };

