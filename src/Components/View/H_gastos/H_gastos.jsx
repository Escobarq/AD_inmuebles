import React from 'react'
import generado from '../../../assets/iconSlide/reci.png'

export const H_gastos = () => {
  return (
    <>
      <div className="contener-home">
        <div className="filtros_propetario">

          <div className="custom-input">
            <label htmlFor="email">Cedula Ciudadania </label>
            <input type="number" id="cedula-cuidadania" placeholder="Cedula Cuidadania" />
          </div>

          <div className="custom-input">
            <label htmlFor="email">Fecha de Ingreso</label>
            <input type="date" id="fecha-ingreso"/>
          </div>

          <div className="custom-input">
            <label htmlFor="email">Nombre del Cliente</label>
            <input type="text" id="nombre-cliente" placeholder="Nombre del Cliente"/>
          </div> 

           <div className="custom-input">
            <label htmlFor="email">Ciudad</label>
            <input type="text" id="ciudad" placeholder="Cuidad"/>
          </div>

            <div className="custom-input">
            <label htmlFor="metodo-pago">Metodo de Pago</label>
            <select id="metodo-pago">
              <option value="" disabled selected>
                Seleccione un Metodo de pago
              </option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>     
        </div>

        <div className="title_view">
          <h1 className="tittle_propetario">Historial de gastos arrendatario</h1>
        </div>

        <div className="view_esp">
          <table>
            <tr>
              <th>ID pago arrendatario</th>
              <th>ID arrendatario</th>
              <th>Fecha de pago</th>
              <th>Fecha de inicio</th>
              <th>Fecha de fin</th>
              <th>Valor pago</th>
              <th>Forma de pago</th>
              <th>Estado de pago</th>
              <th>Dias de mora</th>
              <th>Editar</th>
              <th>Generar Recibo</th>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>31/01/2024</td>
              <td>01/02/2024</td>
              <td>03/02/2024</td>
              <td>350000</td>
              <td>transferencia</td>
              <td>Al dia</td>
              <td>0</td>
              <td>
              <button class="btn btn-sm btn-warning">
            <span class="editar-icon">&#9998;</span> Editar
          </button>
              </td>
              <td>
                <button className='btn btn-sm btn-send'>
              <img src={generado} alt="Generar Recibo" className='button_send'/>
              <p>Generar Recibo</p>
              </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  )
}