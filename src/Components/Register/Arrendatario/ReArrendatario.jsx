import React from 'react';
import './ReArrendatario.css';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { registerArrendatario } from '../../Hooks/RegisterArrendatario';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const ReArrendatario = () => {
  const notify = () => toast.success("Se Registro correctamente", {
    theme: "dark"
  });
    
  const falla = () => toast.error("Hubo un error al ingresar los datos , intente nuevamente", {
    theme: "colored"
  });
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmitArrendatario = async (data) => {

    try {
      await registerArrendatario(data);
      notify()
      reset()
    } catch (error) {
      if (error.message.includes("correo ya registrado")) {
        alert("El correo ya está registrado");
      } else {
        falla()
        console.error("Error al crear usuario:", error);
        throw error; // Re-lanza el error para que pueda ser manejado en el componente
      }
    }
  }
  return (
    <div className='contener-home contener-rpropietario'>
        <h1>Registro Arrendatario</h1>
        <Form className='form-propietario row' onSubmit={handleSubmit(onsubmitArrendatario)}>
          
            <Col md={6}>
              <Form.Group controlId='tipoDocumento'>
                <Form.Label>Tipo de Documento</Form.Label>
                <Form.Control className='input-form' type='text' {...register("tipodocumento")}/>
              </Form.Group>

              <Form.Group controlId='numeroDocumento'>
                <Form.Label>No Documento identidad</Form.Label>
                <Form.Control className='input-form' type='number' min={1} max={9999999999} {...register("numerodocumento")}/>
              </Form.Group>

              <Form.Group controlId='nombreArrendatario'>
                <Form.Label>Nombre Arrendatario</Form.Label>
                <Form.Control className='input-form' type='text' maxLength={100}{...register("nombrearrendatario")} />
              </Form.Group>

              <Form.Group controlId='nombreArrendatario'>
                <Form.Label>Telefono Arrendatario</Form.Label>
                <Form.Control className='input-form' type='text' maxLength={100} {...register("telefono")} />
              </Form.Group>

              <Form.Group controlId='nombreArrendatario'>
                <Form.Label>Estado del Contrato </Form.Label>
                <Form.Control className='input-form' type='text' maxLength={100} {...register("estado_contrato")} />
              </Form.Group>

            </Col>
            <Col md={6}>
              
              <Form.Group controlId='correoPropietario'>
                <Form.Label>Correo Arrendatario</Form.Label>
                <Form.Control className='input-form' id='correoin' type='email'  {...register("correo")}/>
              </Form.Group>

              <Form.Group controlId='telefonoArrendatario'>
                <Form.Label>Meses de Alquiler</Form.Label>
                <Form.Control className='input-form' type='number' {...register("meses_alquiler")}/>
              </Form.Group>

              <Form.Group controlId='fechaInicioContrato'>
                <Form.Label>Fecha Inicio Contrato</Form.Label>
                <Form.Control className='input-form' type='date' {...register("fecha_inicio")}/>
              </Form.Group>

              <Form.Group controlId='fechaTerminoContrato'>
                <Form.Label>Fecha Termino Contrato</Form.Label>
                <Form.Control className='input-form' type='date'{...register("fecha_final")} />
              </Form.Group>

              <Form.Group controlId='fechaTerminoContrato'>
                <Form.Label>Valor Deposito </Form.Label>
                <Form.Control className='input-form' type='number' {...register("valor_deposito")} />
              </Form.Group>

            </Col>
          
        </Form>
      
      <div className='row'>
        <div className='contener-buttons d-flex justify-content-center'>
          <div className='save_deleter'>
            <Button type='submit' variant='success m-2'>
              <FontAwesomeIcon icon={faSave} />
              <span className='text_button ms-2'>Guardar</span>
            </Button>
            <Button type='reset' variant='danger m-2'>
              <FontAwesomeIcon icon={faTimes} />
              <span className='text_button ms-2'>Cancelar</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
