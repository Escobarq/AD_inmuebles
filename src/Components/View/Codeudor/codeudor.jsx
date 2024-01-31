import React from 'react'

export const Codeudor = () => {
  return (
    <>
    <div className="contener-home">
        <div className="filtros_propetario">

          <div className="custom-input">
            <label htmlFor="email">Nombre del Codeudor</label>
            <input type="text" id="n-codeudor" placeholder="nombre del codeudor" />
          </div>

          <div className="custom-input">
            <label htmlFor="email">Numero Documento</label>
            <input type="text" id="numero-documento" placeholder="numero de documento" />
          </div>

          <div className="custom-input">
            <label htmlFor="email">Telefono</label>
            <input type='tel' id="telefono" placeholder="Telefono" />
          </div>        
        </div>

        <div className="title_view">
          <h1 className="tittle_propetario">Codeudores</h1>
        </div>

        <div className="view_esp">
          <table>
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Editar</th>
            </tr>
            <tr>
              <td>Juan Pérez</td>
              <td>312 83893 50</td>
              <td>145 6749</td>
              <td>Popayán</td>
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
