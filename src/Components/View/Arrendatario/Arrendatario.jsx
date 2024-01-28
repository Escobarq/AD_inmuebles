import React from 'react'
import "../../../assets/boostrap/bootstrap-grid.min.css";
import "../Propietarios/propietarios.css";
import editar from "../../../assets/editar.png";

export const Arrendatario = () => {
  return (
    
    <>
      <div className="contener-home">
        <div className="filtros_propetario">

          <div className="custom-input">
            <label htmlFor="email">Cedula</label>
            <input type="number" id="cedula" placeholder="Numero" />
          </div>

          <div className="custom-input">
            <label htmlFor="email">Nombre Arrendatario</label>
            <input type="text" id="nombre-propetario" placeholder="Nombre" />
          </div>

          <div className="custom-input">
            <label htmlFor="email">Fecha Ingreso</label>
            <input type="date" id="fecha-ingreso" />
          </div>
          
        </div>
        <div className="view_esp">
          <h1 className="tittle_propetario">Arrendatario</h1>
          <table>
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Cédula</th>
              <th>Ciudad</th>
              <th>Fecha de ingreso</th>
              <th>Banco</th>
              <th>Tipo cuenta</th>
              <th>Numero cuenta</th>
              <th>Editar</th>
            </tr>
            <tr>
              <td>Juan Pérez</td>
              <td>312 83893 50</td>
              <td>145 6749</td>
              <td>Popayán</td>
              <td>Cristian Paz</td>
              <td>Cali</td>
              <td>2024/01/23</td>
              <td>Nequi</td>
              <td>Ahorro</td>
              <td>110022334455</td>
              <td>
                <img className="editar" src={editar} alt="" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  )
}
