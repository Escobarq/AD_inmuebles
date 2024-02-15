import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./RegistroCodeudor.css";
import { useForm } from "react-hook-form";



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
        <h1 className='tittle__c'>Registro Codeudor</h1>
      </div>
      <Row>
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
        </Col>
        <Col md={6}>
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
      <div className='botones'>
        <Button type='submit' className='guardar'>
          Guardar recibo
        </Button>
        <Button type='button' className='cancelar'>
          Cancelar
        </Button>
      </div>
    </Form>
  </Container>
  );
};