/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import "./propietarios.css";

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
    
      if (Rol == 2){
        return(
          <tr>
          <th>Id Propietario</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Fecha de ingreso</th>
          <th>Banco</th>
          <th>Tipo de cuenta</th>
          <th>Número de cuenta</th>          
          </tr>
          )
        }
        else{
          
          return(
            <tr>
            <th>Id Propietario</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Fecha de ingreso</th>
            <th>Banco</th>
            <th>Tipo de cuenta</th>
            <th>Número de cuenta</th>
            <th>Editar</th>
            </tr>
            )
        }
          
  };
  const createrow = (Propietario) => {
    if (Rol == 2) {
      return (
        <tr key={Propietario.Id_Propietario}>
          <td>{Propietario.Id_Propietario}</td>
          <td>{Propietario.Nombre_Completo}</td>
          <td>{Propietario.Direccion}</td>
          <td>{Propietario.Telefono}</td>
          <td>{Propietario.Correo}</td>
          <td>pendiente</td>
          <td>{Propietario.Banco}</td>
          <td>{Propietario.Tipo_Cuenta}</td>
          <td>{Propietario.Numero_Cuenta}</td>

          
        </tr>
  
      );
    }
    else {
      return (
        <tr key={Propietario.Id_Propietario}>
          <td>{Propietario.Id_Propietario}</td>
          <td>{Propietario.Nombre_Completo}</td>
          <td>{Propietario.Direccion}</td>
          <td>{Propietario.Telefono}</td>
          <td>{Propietario.Correo}</td>
          <td>pendiente</td>
          <td>{Propietario.Banco}</td>
          <td>{Propietario.Tipo_Cuenta}</td>
          <td>{Propietario.Numero_Cuenta}</td>
          <td>
      <Button variant="warning">
        <svg
          className="editar"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="20"
          width="20"
        >
          <path
            fill="#ffffff"
            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
          />
        </svg>
        Editar
      </Button>
    </td>
          
        </tr>
  
      );
    }
  };

  return (
    <>
      <div className="contener-home">
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

