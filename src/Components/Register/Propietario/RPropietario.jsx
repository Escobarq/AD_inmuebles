
import "./RPropietario.css"
import Btn_inmueble from '../../../assets/btn_inmueble.png'
import save from '../../../assets/save.png'
import cancel from '../../../assets/cancel.png'
export const RPropietario = () => {
  return (
    <>
    <div className='contener-home contener-rpropietario'>
      <div className="izq">
      <h1>Registro Propietario</h1>

      <form className='form-propietario' action="">

      <article className='componente-form'>
          <p>Fecha de ingreso</p>
          <input className='input-form' type="date" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>Número Documento de identidad</p>
          <input className='input-form' type="number" name="" min={1} max={9999999999} id="" />
        </article>

        <article className='componente-form'>
          <p>Nombre Propietario</p>
          <input className='input-form' type="text" name="" id="" maxLength={100} />
        </article>

        <article className='componente-form'>
          <p>Telefono Propietario</p>
          <input className='input-form' type="number" name="" min={1000000000} max={9999999999} id="" />
        </article>

        <article className='componente-form'>
          <p>Correo Propietario</p>
          <input className='input-form' type="email" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>Tipo de Cuenta Bancaria</p>
          <select className='input-form' name="" id="">
            <option value="" disabled hidden selected>Seleccion el Tipo de Cuenta</option>
            <option value="Ahorro de cuenta">Ahorro de cuenta</option>
            <option value="Cuenta Corriente">Cuenta Corriente</option>
          </select>
        </article>

        <article className='componente-form'>
          <p>Banco</p>
          <input className='input-form' type="Text" name="" id="" />
        </article>
        
        <article className='componente-form'>
          <p>Dirección del propietario</p>
          <input className='input-form' type="Text" name="" id="" />
        </article>

      </form>
      </div>
      <div className="der">

        <article className="save_delete">
        <button type="button">
        <img src={Btn_inmueble} alt="" />
        </button>

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
    </>
  )
}


