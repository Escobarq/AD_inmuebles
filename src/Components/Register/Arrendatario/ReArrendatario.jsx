import React from 'react'
import save from '../../../assets/save.png'
import cancel from '../../../assets/cancel.png'
import './ReArrendatario.css'

export const ReArrendatario = () => {
  return (<div className="container">
  <div className='contener-home contener-rpropietario'>
      <div className="row">
          <div className="col-md-6">
              <h1>Arrendatario</h1>
              <form className='form-propietario' action="">
                  <div className="form-group">
                      <label htmlFor="tipoDocumentoArrendatario">Tipo de Documento</label>
                      <input className='form-control' type="text" name="" id="tipoDocumentoArrendatario" />
                  </div>

                  <div className="form-group">
                      <label htmlFor="numeroDocumentoArrendatario">No. Documento de identidad</label>
                      <input className='form-control' type="number" name="" min={1} max={9999999999} id="numeroDocumentoArrendatario" />
                  </div>
              </form>
          </div>
          <div className="col-md-6">
              <h1>Codeudor</h1>
              <form className='form-propietario' action="">
        
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



