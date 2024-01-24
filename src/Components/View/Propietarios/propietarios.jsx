import React from 'react'
import "../../../assets/boostrap/bootstrap-grid.min.css"
import "../Propietarios/propietarios.css"
import editar from "../../../assets/editar.png"

export const Propietarios = () => {
  return (
    <>
    <div className="contener-home"> 
    
    <div className="view_esp">

    <h1>Propetario</h1> 

    <table>
    <tr>
      <th>Nombre</th>
      <th>Teléfono</th>
      <th>Cédula</th>
      <th>Ciudad</th>
      <th>Nombre del Codeudor</th>
      <th>Monto del Arriendo</th>
      <th>Editar</th>
    </tr>
    <tr>
      <td>Juan Pérez</td>
      <td>312 83893 50</td>
      <td>145 6749</td>
      <td>Popayán</td>
      <td>Cristian Paz</td>
      <td>$800,000</td>
      <td><img className='editar' src={editar} alt="" /></td>
    </tr>
  </table>

            </div>

    </div>
    </>
  )
}
