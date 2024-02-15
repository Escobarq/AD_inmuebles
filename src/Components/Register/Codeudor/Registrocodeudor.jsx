import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./RegistroCodeudor.css";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';



export const RegistroCodeudor = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmitRegistro = async (data) => {
    console.log(data)
    try {
      const response = await fetch('http://localhost:3006/Rcodeudor', {
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
    <Container>
    <Form className='formu' onSubmit={handleSubmit(onsubmitRegistro)}>
      <div className='titulo'>
        <h2>Registro Codeudor</h2>
      </div>
      
      <Row className='contener-co'>
        <Col md={6}>
          
          <Form.Group controlId='nombre'>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type='text' name='nombrecompleto' {...register("nombrecompleto")} />
          </Form.Group>

          <Form.Group controlId='numeroIdentidad'>
            <Form.Label>Número de identidad:</Form.Label>
            <Form.Control type='number' name='documentoidentidad' {...register("documentoidentidad")} max={9999999999}/>
          </Form.Group>

          <Form.Group controlId='telefono'>
            <Form.Label>Telefono:</Form.Label>
            <Form.Control type='number' name='telefono' {...register("telefono")} max={9999999999}/>
          </Form.Group>
        
          <Form.Group controlId='correoElectronico'>
            <Form.Label>Correo</Form.Label>
            <Form.Control type='email' name='correoelectronico' {...register("correoelectronico")} />
          </Form.Group>
          <Form.Group controlId='direccion'>
            <Form.Label>Dirección:</Form.Label>
            <Form.Control type='text' name='direccion' {...register("direccion")} />
          </Form.Group>
    
        </Col>
        
      </Row>
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
    </Form>
  </Container>
  );
};