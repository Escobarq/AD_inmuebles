import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom";


function ContactForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

   // Estado para almacenar los datos del codeudor
   const [Empleadosdata, setEmpleadosdata] = useState({
   
    Nombre: "",
    Apellido:"",
    DocumentoIdentidad: "",
    Correo: "",
    Contrasena: "",
    Telefono: "",
  });

  useEffect(() => {
    // Si hay parámetros de consulta en la URL, significa que se está editando un codeudor existente
    if (location.search) {
      setEmpleadosdata({
        Nombre: searchParams.get("Nombre"),
        Apellido: searchParams.get("Apellido"),
        DocumentoIdentidad: searchParams.get("DocumentoIdentidad"),
        Correo: searchParams.get("Correo"),
        Contrasena: searchParams.get("Contrasena"),
        Telefono: searchParams.get("Telefono"),
      });
    } else {
      // Si no hay parámetros de consulta en la URL, significa que se está creando un nuevo codeudor
      setEmpleadosdata({
        Nombre: "",
        Apellido:"",
        DocumentoIdentidad: "",
        Correo: "",
        Contrasena: "",
        Telefono: "",
      });
    }
  }, [location.search]);

  return (

    <Container className=' conteniendo px-5 my-5' >
      <Row className='justify-content-center'>
        <Col lg={8}>
          <Card border='0' className='rounded-3 shadow-lg'>
            <Card.Body className='p-4'>
              <div className='text-center'>
                <h1 className='h1 fw-light'>Editar Perfil Empleados</h1>
                <p className='mb-4 text-muted'>Estas Modificando Perfil de Empleado</p>
              </div>

              <form id='contactForm'>
                <div className='form-floating mb-3'>
                  <input className='form-control' id='name' type='text' placeholder='Nombre' defaultValue={Empleadosdata.Nombre}/>
                  <label htmlFor='name'>Nombre</label>
                </div>

                <div className='form-floating mb-3'>
                  <input className='form-control' id='name' type='text' placeholder='Apellido' defaultValue={Empleadosdata.Apellido}/>
                  <label htmlFor='name'>Apellido</label>
                </div>

                <div className='form-floating mb-3'>
                  <input className='form-control' id='emailAddress' type='email' placeholder='Correo' defaultValue={Empleadosdata.Correo}/>
                  <label htmlFor='emailAddress'>Correo</label>
                </div>

                <div className='form-floating mb-3'>
                  <input className='form-control' id='emailAddress' type='password' placeholder='Contraseña' defaultValue={Empleadosdata.Contrasena}/>
                  <label htmlFor='emailAddress'>Contraseña</label>
                </div>

                <div className='form-floating mb-3'>
                  <input className='form-control' id='emailAddress' type='tel' placeholder='Telefono' defaultValue={Empleadosdata.Telefono} />
                  <label htmlFor='emailAddress'>Telefono</label>
                </div>

                <div className='form-floating mb-3'>
                  <select className="form-control"name="rol" id="rol" >
                    <option defaultValue="">Seleccione el tipo</option>
                    <option value="empleado">Empleado</option>
                    <option value="administrador">Administrador</option>
                  </select>
                  <label htmlFor='emailAddress'>Rol</label>
                </div>

                <div className='d-grid'>
                  <Button variant='primary' type='submit' id='submitButton'>Send</Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactForm;