/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import "./propietarios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faPenToSquare
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Propietarios = () => {
  const [infopropietario, setinfopropietario] = useState([]);
  const [Rol, setRol] = useState("");
  useEffect(() => {
   var a = localStorage.getItem("Rol")
    setRol(a)
    const fetchData = async () => {
      
      try {
        const response = await fetch('http://localhost:3006/Vpropietarios');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setinfopropietario(data);

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
            <th>Fecha de ingreso</th>
            <th>Banco</th>
            <th>Tipo de cuenta</th>
            <th>Número de cuenta</th>
            <th>Opciones</th>
            </tr>
         )
        
          
  };
  const createrow = (Propietario) => {

      return (
        <tr key={Propietario.Id_Propietario}>
          <td>{Propietario.Documento_Identidad}</td>
          <td>{Propietario.Nombre_Completo}</td>
          <td>{Propietario.Direccion}</td>
          <td>{Propietario.Telefono}</td>
          <td>{Propietario.Correo}</td>
          <td>pendiente</td>
          <td>{Propietario.Banco}</td>
          <td>{Propietario.Tipo_Cuenta}</td>
          <td>{Propietario.Numero_Cuenta}</td>
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
        <Link to= "/RPropietario">
        <FontAwesomeIcon className="icon" icon={faUserPlus} />  Agregar Propietario
        
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
            <tbody >{infopropietario.map((Propietarios) => createrow(Propietarios))}</tbody>
          </Table>
          </div>
        </div>
      </div>
    </>
  );
};

