import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Rpropietario.css";

// Función para obtener la fecha actual en formato YYYY-MM-DD
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return `${year}-${month}-${day}`;
}

export const RPropietario = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  const onSubmitRegistro = async (data) => {
    try {
      const response = await fetch("http://localhost:3006/RPropietario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowSaveModal(false); // Muestra el modal de confirmación
        localStorage.setItem('NITPropie',(data.numerodocumento));
        reset(); // Reinicia el formulario si la solicitud es exitosa
        // Muestra un mensaje de éxito o redirige a otra página
      }
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
    }
  };

  const handleConfirmSave = () => {
    // Lógica para confirmar el guardado
    handleSubmit(onSubmitRegistro)(); // Envia los datos
    window.location.href = "/RInmuebleA";
    setShowSaveModal(false); // Cierra el modal
  };

  const handleConfirmCancel = () => {
    window.location.href = "/Propietario";
    setShowCancelModal(false); // Cierra el modal
  };

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <Container>
      <h2>Registro Propietario</h2>
      <Form className="form-propietario" onSubmit={handleSubmit(onSubmitRegistro)}>
        <Row className="align-items-start">
          <Col md={6}>
            <Form.Group controlId="formNoMatricula" className="mb-3">
              <Form.Label>Fecha de ingreso:</Form.Label>
              <Form.Control {...register("fechaingreso")} type="date" disabled value={currentDate} />
            </Form.Group>

            <Form.Group
                controlId="formTipoCuenta"
                className="col col-md.auto"
              >
                <Form.Label>Tipo De Cuenta</Form.Label>
                <Form.Select
                {...register("TipoDocumento")}
                  className="formSelect InputsRegistros"
                  aria-label="Default select example">
                  <option value="" disabled hidden selected>
                  Seleccione Tipo de Documento
                  </option>
                  <option value="Cedula Ciudadania">Cedula Ciudadania</option>
                  <option value="Cedula Extranjera">Cedula Extranjera</option>
                </Form.Select>
              </Form.Group>
  
            <Form.Group controlId="formDireccion" className="mb-3">
              <Form.Label>N° Documento Identidad:</Form.Label>
              <Form.Control
                {...register("numerodocumento")}
                type="number"
              />
            </Form.Group>
  
            <Form.Group controlId="formCiudad" className="mb-3">
              <Form.Label>Nombre de Propietario:</Form.Label>
              <Form.Control
                {...register("nombrepropietario")}
                type="text"
                maxLength={100}
              />
            </Form.Group>
  
            <Form.Group controlId="formBarrio" className="mb-3">
              <Form.Label>Telefono:</Form.Label>
              <Form.Control {...register("telefono")}  max={9999999999} type="number" />
            </Form.Group>
  
            <Form.Group controlId="formEstrato" className="mb-3">
              <Form.Label>Correo Electronico:</Form.Label>
              <Form.Control
                {...register("correoelectronico")}
                type="email"
              />
            </Form.Group>
  
  
          </Col>
  
          <Col md={6}>
            <Form.Group controlId="formValor" className="mb-3">
              <Form.Label>Banco</Form.Label>
              <Form.Control {...register("banco")} type="Text" />
            </Form.Group>
            <Form.Group controlId="formNoHabitaciones" className="mb-3">
              <Form.Label>Direccion Del Propetario</Form.Label>
              <Form.Control {...register("direccion")} type="text" />
            </Form.Group>
            <Form.Group
                controlId="formTipoCuenta"
                className="col col-md.auto"
              >
                <Form.Label>Tipo De Cuenta</Form.Label>
                <Form.Select
                {...register("tipocuenta")}
                  className="formSelect InputsRegistros"
                  aria-label="Default select example">
                  <option value="" disabled hidden selected>
                  Seleccione Tipo de Cuenta
                  </option>
                  <option value="Cuenta Ahorros">Cuenta Ahorros</option>
                  <option value="Cuenta Corriente">Cuenta Corriente</option>
                </Form.Select>
              </Form.Group>
            
            <Form.Group controlId="numerocuenta" className="mb-3">
              <Form.Label>Número de cuenta:</Form.Label>
              <Form.Control
                type="number"
                name="numerocuenta"
                {...register("numerocuenta")}
                max={9999999999}
              />
            </Form.Group>
          </Col>
        </Row>
  
        {/* Botones de guardar y cancelar */}
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