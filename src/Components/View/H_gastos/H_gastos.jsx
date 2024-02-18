import { Table, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faPenToSquare
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


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
          <Button variant="success" className="btn-add" >
        <Link to= "/Rcomision">
        <FontAwesomeIcon className="icon" icon={faUserPlus} /> Nueva Comision Propíetario
        
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
                {infoComision.map((CPropietarios) =>
                  createrow(CPropietarios)
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
