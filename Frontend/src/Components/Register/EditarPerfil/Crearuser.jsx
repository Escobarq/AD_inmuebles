import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { crearUser } from "../../Hooks/RegisterUser";

const Crearuser = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { reset } = useForm({ mode: "onChange" });

  const RedireccionForm = () => {
    setShowCancelModal(true);
  };

  const RedireccionForms = () => {
    reset();
    window.location.href = "/AsignarRol";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowSaveModal(true);
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
      window.location.href = "/AsignarRol"
      reset();
    } catch (error) {
      if (
        error.message ===
        "El correo electrónico o la contraseña ya están en uso"
      ) {
        toast.error("El correo electrónico o la contraseña ya están en uso", {
          theme: "colored",
        });
      } else {
        falla();
        console.error("Error al crear usuario:", error);
      }
    }
  };

  const enviarFormulario = async () => {
    const formData = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      telefono: document.getElementById("telefono").value,
      correo: document.getElementById("correo").value,
      contrasena: document.getElementById("contrausuario").value,
    };

    onsubmitNewUser(formData);
  };

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
              type="number"
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
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              id="contrausuario"
              name="contrausuario"
              className="form-control form-control-lg border border-dark"
              placeholder="Ingresa una Contraseña"
              required
              max={12}
            />
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
        <Modal.Body>¿Estás seguro de que deseas guardar los cambios?</Modal.Body>
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
        <Modal.Body>¿Estás seguro de que deseas cancelar la operación?</Modal.Body>
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
