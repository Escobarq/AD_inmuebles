import React from 'react'
import './ReArrendatario.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
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


          <div className="form-group">
            <label htmlFor="tipoDocumentoCodeudor">Tipo de Documento</label>
            <input className='form-control' type="text" name="" id="tipoDocumentoCodeudor" />
          </div>

          <div className="form-group">
            <label htmlFor="numeroDocumentoCodeudor">No. Documento de identidad</label>
            <input className='form-control' type="text" name="" id="numeroDocumentoCodeudor" />
          </div>

        </form>
      </div>
    <div className="row">
    <div className="contener-buttons d-flex justify-content-center">


                
<div className="save_deleter">
  <Button type="submit" variant="success m-2">
    <FontAwesomeIcon icon={faSave} />
    <span className="text_button ms-2">Guardar</span>
  </Button>
  <Button type="reset" variant="danger m-2">
    <FontAwesomeIcon icon={faTimes} />
    <span className="text_button ms-2">Cancelar</span>
  </Button>

  
</div>
  </div>
      </div>
  </div>



  )
}



