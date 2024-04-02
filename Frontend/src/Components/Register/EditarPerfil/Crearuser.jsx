import { useState } from "react";
import { Modal, Button, Form, InputGroup, ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTimes,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { crearUser } from "../../Hooks/RegisterUser";
import zxcvbn from "zxcvbn";

const Crearuser = () => {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { reset } = useForm({ mode: "onChange" });
  const [shown, setShown] = useState(false);

  const RedireccionForm = () => {
    setShowCancelModal(true);
  };

  const RedireccionForms = () => {
    reset();
    window.location.href = "/AsignarRol";
  };

  const falla = (text) => {
    toast.error(text, {
      theme: "colored",
    });
  };

  const notify = () => {
    toast.success("Se Registro correctamente", {
      theme: "dark",
    });
  };

  const onsubmitNewUser = async (data) => {
    try {
      await crearUser(data);
      setShowSaveModal(false);
      notify("Registro Exitoso");
      window.location.href = "/AsignarRol";
      reset();
    } catch (error) {
      if (error.message.includes("Numero de Matricula duplicado")) {
        toast.error("El correo electrónico o la contraseña ya están en uso", {
          theme: "colored",
        });
      } else {
        falla();
        console.error("Error al crear usuario:", error);
      }
    }
  };

  const isPasswordValid = (password) => {
    // Define expresiones regulares para validar la contraseña
    const upperCaseRegex = /^(?=.*[A-Z])/;
    const lowerCaseRegex = /^(?=.*[a-z])/;
    const specialCharRegex = /^(?=.*[!@#$%^&*])/;
    const digitRegex = /^(?=.*[0-9])/;

    // Aplica las expresiones regulares para verificar cada criterio de validación
    return (
      password.length >= 8 &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password) &&
      specialCharRegex.test(password) &&
      digitRegex.test(password)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isPasswordValid(password)) {
      toast.error("La contraseña no cumple con los requisitos de seguridad", {
        theme: "colored",
      });
      return;
    }
    setShowSaveModal(true);
  };

  const enviarFormulario = async () => {
    const formData = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      telefono: document.getElementById("telefono").value,
      correo: document.getElementById("correo").value,
      contrasena: document.getElementById("contrausuario").value,
      rol: document.getElementById("rol").value,
    };

    onsubmitNewUser(formData);
  };

  const onChange = ({ currentTarget }) => {
    setPassword(currentTarget.value);
    const strength = zxcvbn(currentTarget.value).score;
    setPasswordStrength(strength);
  };

  const switchShown = () => setShown(!shown);

  return (
    <div className="contener-home contener-rpropietario">
      <h2>Crear Nuevo Usuario</h2>
      <div className="container">
        <Form className="form-propietario" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              id="nombre"
              className="form-control border border-dark"
              placeholder="Ingresa Nombre"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Apellido:</Form.Label>
            <Form.Control
              type="text"
              id="apellido"
              className="form-control border border-dark"
              placeholder="Ingresa Apellido"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              type="tel"
              id="telefono"
              className="form-control border border-dark"
              placeholder="Ingresa Teléfono celular"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Correo:</Form.Label>
            <Form.Control
              type="email"
              id="correo"
              className="form-control border border-dark"
              placeholder="Ingresa Correo"
              required
            />
            <div className="email-hint">
              <p className="text-danger">
                Por favor, recuerde muy bien su correo.
              </p>
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Contraseña:</Form.Label>
            <div className="password-input">
              <InputGroup>
                <Form.Control
                  onChange={onChange}
                  type={shown ? "text" : "password"}
                  id="contrausuario"
                  name="contrausuario"
                  className="form-control  border border-dark"
                  placeholder="Ingresa una Contraseña"
                  required
                  max={12}
                />
                <InputGroup.Text style={{ height: "100%" }}>
                  <FontAwesomeIcon
                    icon={shown ? faEyeSlash : faEye}
                    onClick={switchShown}
                    style={{ cursor: "pointer", height: "1.5rem" }}
                  />
                </InputGroup.Text>
              </InputGroup>
            </div>
            <ProgressBar
            now={(passwordStrength  + 1) * 20} // Convertir el puntaje en un valor entre 0 y 100
            label={`${passwordStrength  * 25}%`} // Mostrar la fuerza de la contraseña como porcentaje
          />
            {!isPasswordValid(password) && (
              <Form.Text className="text-danger">
                La contraseña debe tener al menos 8 caracteres y contener al
                menos una letra mayúscula, una letra minúscula, un número y un
                carácter especial.
              </Form.Text>
            )}
          </Form.Group>
        

          <Form.Group controlId="formNoIdentidadCodeudor">
            <Form.Label>Selecione Rol</Form.Label>
            <Form.Select
              className="form-control border border-dark"
              id="rol"
              name="rol"
            >
              <option value="1">Administrador</option>
              <option value="2">Asistente</option>
            </Form.Select>
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
          <Button variant="primary" onClick={enviarFormulario}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
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
};

export default Crearuser;
