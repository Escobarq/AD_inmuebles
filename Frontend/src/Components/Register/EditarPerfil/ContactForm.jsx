import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";


function ContactForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Estado para almacenar los datos del empleado y el rol seleccionado
  const [Empleadosdata, setEmpleadosdata] = useState({
    Nombre: "",
    Apellido: "",
    DocumentoIdentidad: "",
    Correo: "",
    Contrasena: "",
    Telefono: "",
    Idrol: "",
  });
  const [rol, setRol] = useState(""); // Estado para almacenar el rol seleccionado

  useEffect(() => {
    if (location.search) {
      setEmpleadosdata({
        Nombre: searchParams.get("Nombre"),
        Apellido: searchParams.get("Apellido"),
        DocumentoIdentidad: searchParams.get("DocumentoIdentidad"),
        Correo: searchParams.get("Correo"),
        Contrasena: searchParams.get("Contrasena"),
        Telefono: searchParams.get("Telefono"),
        Idrol: searchParams.get("Idrol"),
        IdTrabajador: searchParams.get("IdTrabajador"),
      });
    } else {
      setEmpleadosdata({
        Nombre: "",
        Apellido: "",
        DocumentoIdentidad: "",
        Correo: "",
        Contrasena: "",
        Telefono: "",
        Idrol: "",
        IdTrabajador: "",
      });
    }
  }, [location.search]);

  const notify = () =>
  toast.success("Se Actualizo Correctamente ", {
    theme: "dark",
    autoClose: 1000
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { Nombre, Apellido, DocumentoIdentidad, Correo, Contrasena, Telefono } = Empleadosdata;
  
    try {
      const response = await fetch(
        `http://localhost:3006/empleados/${Empleadosdata.IdTrabajador}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Nombre,
            Apellido,
            DocumentoIdentidad,
            Correo,
            Contrasena,
            Telefono,
            Idrol: rol,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el empleado");
      }
      notify();
      window.location.href = "/AsignarRol"
    } catch (error) {
      console.error("Error al enviar la solicitud PUT:", error);
    }
  };
  

  const handleChange = (event) => {
    setRol(event.target.value); // Manejar los cambios en el select y actualizar el estado del rol
  };

  return (
    <Container className=" conteniendo px-5 my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card border="0" className="rounded-3 shadow-lg">
            <Card.Body className="p-4">
              <div className="text-center">
                <h1 className="h1 fw-light">Editar Perfil Empleados</h1>
                <p className="mb-4 text-muted">
                  Estas Modificando Perfil de Empleado
                </p>
              </div>

              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    value={Empleadosdata.Nombre}
                    onChange={(e) => setEmpleadosdata({ ...Empleadosdata, Nombre: e.target.value })}
                  />
                  <label htmlFor="name">Nombre</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="lastname"
                    type="text"
                    placeholder="Apellido"
                    value={Empleadosdata.Apellido}
                    onChange={(e) => setEmpleadosdata({ ...Empleadosdata, Apellido: e.target.value })}
                  />
                  <label htmlFor="lastname">Apellido</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="emailAddress"
                    type="email"
                    placeholder="Correo"
                    value={Empleadosdata.Correo}
                    onChange={(e) => setEmpleadosdata({ ...Empleadosdata, Correo: e.target.value })}
                  />
                  <label htmlFor="emailAddress">Correo</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    value={Empleadosdata.Contrasena}
                    onChange={(e) => setEmpleadosdata({ ...Empleadosdata, Contrasena: e.target.value })}
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder="Telefono"
                    value={Empleadosdata.Telefono}
                    onChange={(e) => setEmpleadosdata({ ...Empleadosdata, Telefono: e.target.value })}
                  />
                  <label htmlFor="phone">Telefono</label>
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    name="rol"
                    id="rol"
                    value={rol}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione el tipo</option>
                    <option value="2">Asistente</option>
                    <option value="1">Administrador</option>
                  </select>
                  <label htmlFor="rol">Rol</label>
                </div>

                <div className="d-grid">
                  <Button variant="primary" type="submit" id="submitButton">
                    Enviar
                  </Button>
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
