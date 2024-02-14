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
      </div>

      <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
              <div className="btn-group" role="group">
                  <button type="button" className="btn btn-primary">
                      <img src={save} alt="" />
                      <span className="text_button">Guardar</span>
                  </button>

                  <button type="button" className="btn btn-secondary">
                      <img src={cancel} alt="" />
                      <span className="text_button">Cancelar</span>
                  </button>
              </div>
          </div>
      </div>
  </div>
</div>


  )
}



