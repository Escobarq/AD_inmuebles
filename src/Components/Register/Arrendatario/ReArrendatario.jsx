import React from 'react'
import save from '../../../assets/save.png'
import cancel from '../../../assets/cancel.png'
import './ReArrendatario.css'

export const ReArrendatario = () => {
  return (
    <div className='contener-home contener-rpropietario'>
       <div className="izq RA">
      <h1> Arrendatario</h1>

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
      <div className="der RA">
      <h1>Codeudor</h1>
      <form className='form-propietario' action="">
      <article className='componente-form'>
          <p>Tipo de Documento</p>
          <input className='input-form' type="text" name="" id="" />
        </article>
      <article className='componente-form'>
          <p>No Documento Identidad</p>
          <input className='input-form' type="text" name="" id="" />
        </article>
      <article className='componente-form'>
          <p>Nombre Codeudor</p>
          <input className='input-form' type="text" name="" id="" />
        </article>
      <article className='componente-form'>
          <p>Direccion Codeudor</p>
          <input className='input-form' type="text" name="" id="" />
        </article>
      <article className='componente-form'>
          <p>Cuidad Codeudor</p>
          <input className='input-form' type="text" name="" id="" />
        </article>
      <article className='componente-form'>
          <p>Correo Codeudor</p>
          <input className='input-form' type="text" name="" id="" />
        </article>
      <article className='componente-form'>
          <p>Telefono Codeudor</p>
          <input className='input-form' type="text" name="" id="" />
        </article>
      <article className='componente-form'>
          <p>No Matricula</p>
          <input className='input-form' type="text" name="" id="" />
        </article>
        <article className='componente-form'>
          <p>Tipo de Inmueble </p>
          <select className='input-form' name="" id="">
            <option value="" disabled hidden selected>Seleccion el Tipo </option>
            <option value="Ahorro de cuenta">Casa</option>
            <option value="Cuenta Corriente">Bodega</option>
            <option value="Cuenta Corriente">Apartamento</option>
            <option value="Cuenta Corriente">Local</option>
            <option value="Cuenta Corriente">Oficina</option>
          </select>
        </article>
        </form>

        <article className="save_deleter">
          <button type="button">
        <img src={save} alt="" />
        <p className="text_button">Guardar</p>
          </button>

        <button type="button">
        <img src={cancel} alt="" />
        <p className="text_button">Cancelar</p>
        </button>

        </article> 
      </div>
    </div>
  )
}



