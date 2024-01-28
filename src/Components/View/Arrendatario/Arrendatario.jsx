import React from 'react'
import "../Propietarios/propietarios.css";

export const Arrendatario = () => {
  return (
    
    <>
     <div className="contener-home">
        <div className="filtros_propetario">

          <div className="custom-input">
            <label htmlFor="email">Nombre Arrendatario</label>
            <input type="number" id="nombre-arrendatario" placeholder="Nombre Arrendatario" />
          </div>

          <div className="custom-input">
            <label htmlFor="email">Fecha Vencimiento Seguro</label>
            <input type="date" id="fecha-vencimiento-seguro" />
          </div>

          <div className="custom-input">
            <label htmlFor="email">Fecha Vencimiento Ultima Cuota</label>
            <input type="date" id="fecha-vencimiento-ultima-cuota" />
          </div>        
        </div>

        <div className="title_view">
          <h1 className="tittle_propetario">Arrendatario</h1>
        </div>
        
        <div className="view_esp">
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
              <button class="btn btn-sm btn-warning">
            <span class="editar-icon">&#9998;</span> Editar
          </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  )
}
