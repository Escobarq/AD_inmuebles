import { useEffect, useState } from "react";
import { InputGroup, Modal, Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTimes,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

function ContactForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [password, setPassword] = useState("");
  const [shown, setShown] = useState(false);
  const [Empleadosdata, setEmpleadosdata] = useState({
    Nombre: "",
    Apellido: "",
    DocumentoIdentidad: "",
    Correo: "",
    Contrasena: "",
    Telefono: "",
    Idrol: "",
  });
  const [rol, setRol] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false); // Estado para mostrar/ocultar el modal de guardar
  const [showCancelModal, setShowCancelModal] = useState(false);

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
      autoClose: 1000,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowSaveModal(true);
  };

  const handleConfirmSave = async () => {
    const {
      Nombre,
      Apellido,
      DocumentoIdentidad,
      Correo,
      Contrasena,
      Telefono,
    } = Empleadosdata;

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
      window.location.href = "/AsignarRol";
    } catch (error) {
      console.error("Error al enviar la solicitud PUT:", error);
    }
  };

  const { reset } = useForm({ mode: "onChange" });

  const RedireccionForm = () => {
    setShowCancelModal(true); // Actualiza el estado para ocultar el modal
  };
  const RedireccionForms = () => {
    window.location.href = "/AsignarRol"; // Actualiza el estado para ocultar el modal
  };
  const handleChange = (event) => {
    setRol(event.target.value);
  };

  const onChange = ({ currentTarget }) => setPassword(currentTarget.value);
  const switchShown = () => setShown(!shown);

  return (
    <div className="contener-home contener-rpropietario">
      <h2> Actualizar Informacion de Empleados</h2>
      <div className="container">
        <Form className="form-propietario" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              className="form-control"
              id="Nombre"
              type="text"
              placeholder="Nombre"
              value={Empleadosdata.Nombre}
              onChange={(e) =>
                setEmpleadosdata({ ...Empleadosdata, Nombre: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Apellido:</Form.Label>
            <Form.Control
              className="form-control"
              id="Apellido"
              type="text"
              placeholder="Apellido"
              value={Empleadosdata.Apellido}
              onChange={(e) =>
                setEmpleadosdata({ ...Empleadosdata, Apellido: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Correo:</Form.Label>
            <Form.Control
              className="form-control"
              id="Correo"
              type="email"
              placeholder="Correo"
              value={Empleadosdata.Correo}
              onChange={(e) =>
                setEmpleadosdata({ ...Empleadosdata, Correo: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña:</Form.Label>
            <div className="password-input">
              <Form.Control
                className="form-control"
                id="Contraseña"
                onBlur={onChange}
                type={shown ? "text" : "password"}
                placeholder="Contraseña"
                value={Empleadosdata.Contrasena}
                onChange={(e) =>
                  setEmpleadosdata({
                    ...Empleadosdata,
                    Contrasena: e.target.value,
                  })
                }
              />
              <Button style={{margin:'1%'}} variant="success" onClick={switchShown}>
                {shown ? "Ocultar" : "Mostrar"}
              </Button>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Telefono:</Form.Label>
            <Form.Control
              className="form-control"
              id="Telefono"
              type="tel"
              placeholder="Telefono"
              value={Empleadosdata.Telefono}
              onChange={(e) =>
                setEmpleadosdata({ ...Empleadosdata, Telefono: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="TipoDocumento">
            <Form.Label>Selecione Rol</Form.Label>
            <Form.Control
              as="select"
              className="form-control"
              name="Rol"
              id="Rol"
              value={rol}
              onChange={handleChange}
            >
              <option value="">Seleccione un rol</option>
              <option value="2">Asistente</option>
              <option value="1">Administrador</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className="contener-buttons d-flex justify-content-center">
        <div className="save_deleter">
          <Button type="button" variant="success m-2" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faSave} />
            <span className="text_button ms-2">Guardar</span>
          </Button>

          <Button type="button" variant="danger m-2" onClick={RedireccionForm}>
            <FontAwesomeIcon icon={faTimes} />
            <span className="text_button ms-2">Cancelar</span>
          </Button>
        </div>
      </div>
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas guardar los cambios?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmSave}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal de confirmación de cancelar */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas cancelar la operación?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={RedireccionForms}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ContactForm;
