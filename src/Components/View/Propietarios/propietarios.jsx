import React from "react";
import "../Propietarios/propietarios.css";

export const Propietarios = () => {
  return (
    <>
      <div className="contener-home">
        <div className="filtros_propetario">

          <div className="custom-input">
            <label htmlFor="email">Cedula</label>
            <input type="number" id="cedula" placeholder="Numero" />
          </div>

          <div className="custom-input">
            <label htmlFor="email">Nombre Propetario</label>
            <input type="text" id="nombre-propetario" placeholder="Nombre" />
          </div>

          <div className="custom-input">
            <label htmlFor="email">Fecha Ingreso</label>
            <input type="date" id="fecha-ingreso" />
          </div>        
        </div>

        <div className="title_view">
          <h1 className="tittle_propetario">Propetarios</h1>
        </div>

        <div className="view_esp">
          <table>
            <tr>
              <th>Id Propetario</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Fecha de ingreso</th>
              <th>Banco</th>
              <th>Tipo cuenta</th>
              <th>Numero cuenta</th>
              <th>Editar</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Jeison Waldir Ortiz</td>
              <td>Calle 17</td>
              <td>+573225478896</td>
              <td>jeisonwaldir@gmail.com</td>
              <td>2024/01/23</td>
              <td>Nequi</td>
              <td>Ahorro</td>
              <td>110022334455</td>
              <td>
              <button class="btn btn-sm btn-warning">
            <span class="editar-icon">&#9998;</span> Editar
          </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};
