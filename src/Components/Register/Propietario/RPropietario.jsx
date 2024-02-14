import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import Btn_inmueble from "../../../assets/btn_inmueble.png"
import "./RPropietario.css"
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";


export const RPropietario = () => {


 
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmitRegistro = async (data) => {
    try {
      const response = await fetch('http://localhost:3006/RPropietario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset(); // Reinicia el formulario si la solicitud es exitosa
        // Muestra un mensaje de éxito o redirige a otra página
      } else {
        // Maneja la respuesta de error del servidor
      }
    } catch (error) {
      // Maneja los errores de red o de la aplicación
      console.error('Error al enviar datos al servidor:', error);
    }
  };

  return (
    <>
      <div className='contener-home contener-rpropietario'>
        <div className='container'>
          <h1 className="m-5">Registro Propietario</h1>
          <div className='row'>
            <Form className="form-propietario row" style={{ marginTop: "0" }} onSubmit={handleSubmit(onsubmitRegistro)} method="post">
              <div className='col-md-6'>

                <div className='todoform' style={{ marginRight: "15px" }} >
                  <div className='izquier'>


                    <Form.Group controlId='formNoMatricula'>
                      <Form.Label>Fecha de ingreso:</Form.Label>
                      <Form.Control {...register("fechaingreso")} type='date' />
                    </Form.Group>




                    <Form.Group controlId='formDireccion'>
                      <Form.Label>Numero de Documento:</Form.Label>
                      <Form.Control {...register("numerodocumento")} type='number' />
                    </Form.Group>

                    <Form.Group controlId='formCiudad'>
                      <Form.Label>Nombre de Propietario:</Form.Label>
                      <Form.Control {...register("nombrepropietario")} type='text'  maxLength={100} />
                    </Form.Group>

                    <Form.Group controlId='formBarrio'>
                      <Form.Label>Telefono:</Form.Label>
                      <Form.Control {...register("telefono")} type='number' />
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='izqui'>

                  <Form.Group controlId='formEstrato'>
                    <Form.Label>Correo Electronico:</Form.Label>
                    <Form.Control {...register("correoelectronico")} type='email' />
                  </Form.Group>

                  <Form.Group controlId="formTipoInmueble" className="col col-md.auto">
                    <Form.Label>Tipo De Cuenta</Form.Label>
                    <Form.Select className="formSelect" {...register("tipocuenta")} aria-label="Default select example">
                      <option value="">Selecciona El tipo de Cuenta</option>
                      <option value="ahorro de cuenta">Ahorro de Cuenta</option>
                      <option value="cuenta corriente">Cuenta Corriente</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId='formValor'>
                    <Form.Label>Banco</Form.Label>
                    <Form.Control {...register("banco")} type='Text' />
                  </Form.Group>

                  <Form.Group controlId='formNoHabitaciones'>
                    <Form.Label>Direccion Del Propetario</Form.Label>
                    <Form.Control {...register("direccion")} type='text' />
                  </Form.Group>
                </div>

              </div>
              <div className=' d-flex justify-content-end'>
            <button className='btn btn-primary btn-sm' style={{ background: 'none', border: 'none' }}>
              <img src={Btn_inmueble} alt="Icono de Inmueble" />
            </button>
          </div>

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

            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
