import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const Registrocodeudor = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Estado para almacenar los datos del codeudor
  const [codeudorData, setCodeudorData] = useState({
    IdCodeudor: "",
    DocumentoIdentidad: "",
    NombreCompleto: "",
    Direccion: "",
    Telefono: "",
    Correo: "",
  });

  const notify = () =>
    toast.success("Se registró correctamente", {
      theme: "dark",
    });
  const error = () =>
    toast.error("Hubo algún error al enviar los datos", {
      theme: "dark",
    });
  const errora = () =>
    toast.error("Hubo algún error al enviar los datos al servidor", {
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

  useEffect(() => {
    // Si hay parámetros de consulta en la URL, significa que se está editando un codeudor existente
    if (location.search) {
      setCodeudorData({
        IdCodeudor: searchParams.get("IdCodeudor"),
        DocumentoIdentidad: searchParams.get("DocumentoIdentidad"),
        NombreCompleto: searchParams.get("NombreCompleto"),
        Direccion: searchParams.get("Direccion"),
        Telefono: searchParams.get("Telefono"),
        Correo: searchParams.get("Correo"),
      });
    } else {
      // Si no hay parámetros de consulta en la URL, significa que se está creando un nuevo codeudor
      setCodeudorData({
        IdCodeudor: "",
        DocumentoIdentidad: "",
        NombreCompleto: "",
        Direccion: "",
        Telefono: "",
        Correo: "",
      });
    }
  }, [location.search]);

  const onsubmitRegistro = async (data) => {
    // Convertir los campos documentoidentidad y telefono a números
    data.documentoidentidad = parseInt(data.documentoidentidad);
    data.telefono = parseInt(data.telefono);
    try {
      const url = codeudorData.IdCodeudor
        ? `http://localhost:3006/Rcodeudor/${codeudorData.IdCodeudor}`
        : "http://localhost:3006/Rcodeudor";

      const method = codeudorData.IdCodeudor ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);

      if (response.ok) {
        setShowSaveModal(true);
        notify();
        reset();
        window.location.href = "/Codeudor";
      } else {
        error();
      }
    } catch (error) {
      errora();
      console.error("Error al enviar datos al servidor:", error);
    }
  };

  const handleConfirmSave = () => {
    handleSubmit(onsubmitRegistro)();
    setShowSaveModal(false);
    reset();
  };

  const handleConfirmCancel = () => {
    window.location.href = "/Codeudor";
    setShowCancelModal(false);
  };

  return (
    <Container>
      <Form
        className="formulariocodeudor"
        onSubmit={handleSubmit((data) => onsubmitRegistro(data))}
      >
        <h2>Registro Codeudor</h2>

        <Row className="contener-co">
          <Col md={6}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="nombrecompleto"
                defaultValue={codeudorData.NombreCompleto}
                {...register("nombrecompleto")}
              />
            </Form.Group>

            <Form.Group controlId="documentoidentidad">
              <Form.Label>Número de identidad:</Form.Label>
              <Form.Control
                type="number"
                name="documentoidentidad"
                defaultValue={codeudorData.DocumentoIdentidad}
                {...register("documentoidentidad")}
                max={9999999999}
              />
            </Form.Group>

            <Form.Group controlId="telefono">
              <Form.Label>Teléfono:</Form.Label>
              <Form.Control
                type="number"
                name="telefono"
                defaultValue={codeudorData.Telefono}
                {...register("telefono")}
                max={9999999999}
              />
            </Form.Group>

            <Form.Group controlId="correoElectronico">
              <Form.Label>Correo:</Form.Label>
              <Form.Control
                type="email"
                name="correoelectronico"
                defaultValue={codeudorData.Correo}
                {...register("correoelectronico")}
              />
            </Form.Group>

            <Form.Group controlId="direccion">
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                defaultValue={codeudorData.Direccion}
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
