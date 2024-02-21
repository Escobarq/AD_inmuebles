import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import "./Registrocodeudor.css";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-toastify";

export const Registrocodeudor = () => {
  const notify = () =>
    toast.success("Se Registro correctamente", {
      theme: "dark",
    });
    const error = () =>
    toast.error("Hubo algun error al enviar los datos", {
      theme: "dark",
    });
    const errora = () =>
    toast.error("Hubo algun error al enviar los datos al servidor", {
      theme: "dark",
    });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  
  const onsubmitRegistro = async (data) => {
    try {
      const response = await fetch("http://localhost:3006/Rcodeudor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowSaveModal(true); // Muestra el modal de confirmación
        notify();
        reset(); // Reinicia el formulario si la solicitud es exitosa
      } else {
        error();
      }
    } catch (error) {
      errora();
      console.error("Error al enviar datos al servidor:", error);
    }
  };
  

  const handleConfirmSave = () => {
    // Lógica para confirmar el guardado
    handleSubmit(onsubmitRegistro)(); // Envia los datos
    setShowSaveModal(false); // Cierra el modal
    reset()

  };

  const handleConfirmCancel = () => {
    window.location.href = "/Codeudor";
    setShowCancelModal(false); // Cierra el modal
    
  };

  return (
    <Container>
      <Form className="formulariocodeudor" onSubmit={handleSubmit(onsubmitRegistro)}>
      
          <h2>Registro Codeudor</h2>
        

        <Row className="contener-co">
          <Col md={6}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="nombrecompleto"
                {...register("nombrecompleto")}
              />
            </Form.Group>

            <Form.Group controlId="documentoidentidad">
              <Form.Label>Número de identidad:</Form.Label>
              <Form.Control
                type="number"
                name="documentoidentidad"
                {...register("documentoidentidad")}
                max={9999999999}
              />
            </Form.Group>

            <Form.Group controlId="telefono">
              <Form.Label>Telefono:</Form.Label>
              <Form.Control
                type="number"
                name="telefono"
                {...register("telefono")}
                max={9999999999}
              />
            </Form.Group>

            <Form.Group controlId="correoElectronico">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correoelectronico"
                {...register("correoelectronico")}
              />
            </Form.Group>
            <Form.Group controlId="direccion">
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                {...register("direccion")}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="contener-buttons d-flex justify-content-center">
          <div className="save_deleter">
            <Button
              type="button"
              variant="success m-2"
              onClick={() => setShowSaveModal(true)}
            >
              <FontAwesomeIcon icon={faSave} />
              <span className="text_button ms-2">Guardar</span>
            </Button>

            {/* Botón de cancelar */}
            <Button
              type="button"
              variant="danger m-2"
              onClick={() => setShowCancelModal(true)}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span className="text_button ms-2">Cancelar</span>
            </Button>
          </div>
        </div>
      </Form>
      {/* Modales */}
      {/* Modal de confirmación de guardar */}
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
          <Button variant="primary" onClick={handleConfirmCancel}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
