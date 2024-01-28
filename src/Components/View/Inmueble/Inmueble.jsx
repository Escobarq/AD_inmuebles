import React from "react";

export const Inmueble = () => {
  return (
    <>
      <div className="contener-home">
        <div className="filtros_propetario">
            
          <div className="custom-input">
            <label htmlFor="nombre-arrendatario">Tipo Inmueble</label>
            <select id="nombre-arrendatario">
              <option value="" disabled selected>
                Seleccione un Inmueble
              </option>
              <option value="arrendatario1">Casa</option>
              <option value="arrendatario2">Oficina</option>
              <option value="arrendatario2">Bodega</option>
              <option value="arrendatario2">Local</option>
              <option value="arrendatario2">Apartamento</option>
            </select>
          </div>

          <div className="custom-input">
            <label htmlFor="email">Barrio</label>
            <input type="text" id="barrio" placeholder="Barrio" />
          </div>

          <div className="custom-input">
            <label htmlFor="email">Cuidad</label>
            <input type="text" id="ciudad" placeholder="Cuidad" />
          </div>
        </div>

        <div className="title_view">
          <h1 className="tittle_propetario">Inmueble</h1>
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
  );
};
