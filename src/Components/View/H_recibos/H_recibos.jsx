import { Table, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faPenToSquare
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const H_recibos = () => {
  
  const [infoPArrendamiento, setinfoPArrendamiento] = useState([]);
  const [Rol, setRol] = useState("");
  useEffect(() => {
   var a = localStorage.getItem("Rol")
    setRol(a)
    const fetchData = async () => {
      
      try {
        const response = await fetch('http://localhost:3006/VPagoArren');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setinfoPArrendamiento(data);

        console.log(data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  const createheader = () => {
    
          
          return(
            <tr>
              <th>ID pago arrendatario</th>
              <th>ID arrendatario</th>
              <th>Fecha  pago</th>
              <th>Fecha inicio</th>
              <th>Fecha final</th>
              <th>Valor pago</th>
              <th>Forma pago</th>
              <th>Estado pago</th>
              <th>Dias mora</th>
              <th>Editar</th>              
              </tr>           
         )
        
          
  };
  const createrow = (PArrendamiento) => {

      return (
        <tr key={PArrendamiento.Id_Pago_Arrendatario}>
          <td>{PArrendamiento.Id_Pago_Arrendatario}</td>
          <td>{PArrendamiento.Id_Arrendatario}</td>
          <td>{PArrendamiento.Fecha_Pago}</td>
          <td>{PArrendamiento.Fecha_Inicio}</td>
          <td>{PArrendamiento.Fecha_Fin}</td>
          <td>{PArrendamiento.Valor_Pago}</td>
          <td>{PArrendamiento.Forma_Pago}</td>
          <td>{PArrendamiento.Estado}</td>
          <td>{PArrendamiento.Dias_De_Mora}</td>
          <td>{PArrendamiento.Dias_De_Mora}</td>
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
        <label className="l1" >Fecha Ingreso: </label>
        <input className="input-filtroRe" type="date" name="" id="" />
          </div>
      <Button variant="success" className="btn-add" >
        <Link to= "/RegistroPArrendamiento">
        <FontAwesomeIcon className="icon" icon={faUserPlus} />  Agregar PArrendamiento
        
        </Link>
        </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Propetarios</h1>
        </div>

        <div className="view_esp">
        <div className="table-container">
          <Table striped bordered hover>
            <thead> {createheader()} </thead>
            <tbody >{infoPArrendamiento.map((PArrendamientos) => createrow(PArrendamientos))}</tbody>
          </Table>
          </div>
        </div>
      </div>
    </>
  );
};
