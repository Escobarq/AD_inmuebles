import React from 'react'
import './ReArrendatario.css'

export const ReArrendatario = () => {
  return (
    <div className='contener-home contener-rpropietario'>
       <div className="izq RA">
      <h1> Registro Arrendatario</h1>

      <form className='form-propietario' action="">

      <article className='componente-form'>
          <p>Tipo de Documento</p>
          <input className='input-form' type="text" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>No. Documento de identidad</p>
          <input className='input-form' type="number" name="" min={1} max={9999999999} id="" />
        </article>

        <article className='componente-form'>
          <p>Nombre Arrendatario</p>
          <input className='input-form' type="text" name="" id="" maxLength={100} />
        </article>

        <article className='componente-form'>
          <p>Direccion Propietario</p>
          <input className='input-form' type="number" name="" min={1000000000} max={9999999999} id="" />
        </article>

        <article className='componente-form'>
          <p>Cuidad Propietario</p>
          <input className='input-form' type="email" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>Barrio Propietario</p>
          <input className='input-form' type="email" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>Correo Propietario</p>
          <input className='input-form' type="email" name="" id="" />
        </article>
        
        <article className='componente-form'>
          <p>Forma de Pago </p>
          <input className='input-form' type="email" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>Telefono Arrendatario</p>
          <input className='input-form' type="email" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>Fecha Inicio Contrato</p>
          <input className='input-form' type="email" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>Fecha Termino Contrato</p>
          <input className='input-form' type="Text" name="" id="" />
        </article>
        
        <article className='componente-form'>
          <p>Meses de Alquiler</p>
          <input className='input-form' type="Text" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>Valor de Desopito</p>
          <input className='input-form' type="Text" name="" id="" />
        </article>

      </form>
      </div>
    </div>
  )
}



