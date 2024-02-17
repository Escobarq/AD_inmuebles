
import { Table, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faPenToSquare
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Codeudor = () => {  
  
  const [infoCodeudor, setinfoCodeudor] = useState([]);
  const [Rol, setRol] = useState("");
  useEffect(() => {
   var a = localStorage.getItem("Rol")
    setRol(a)
    const fetchData = async () => {
      
      try {
        const response = await fetch('http://localhost:3006/Vcodeudor');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setinfoCodeudor(data);

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
            <th>No. Documento</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Opciones</th>
            </tr>
         )
        
          
  };
  const createrow = (Codeudor) => {

      return (
        <tr key={Codeudor.Id_Codeudor}>
          <td>{Codeudor.Documento_Identidad}</td>
          <td>{Codeudor.Nombre_Completo}</td>
          <td>{Codeudor.Direccion}</td>
          <td>{Codeudor.Telefono}</td>
          <td>{Codeudor.Correo}</td>
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
        <Link to= "/Registrocodeudor">
        <FontAwesomeIcon className="icon" icon={faUserPlus} />  Agregar Codeudor
        
        </Link>
        </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Codeudor</h1>
        </div>

        <div className="view_esp">
        <div className="table-container">
          <Table striped bordered hover>
            <thead> {createheader()} </thead>
            <tbody >{infoCodeudor.map((Codeudors) => createrow(Codeudors))}</tbody>
          </Table>
          </div>
        </div>
      </div>
    </>
  );
}
