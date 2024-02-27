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
        setShowSaveModal(true); // Muestra el modal de confirmación
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
    
      <div className="contener-home contener-rpropietario">
      <h2>Registro Propietario</h2>
      <div className="container">
      <Form className="form-propietario" onSubmit={handleSubmit(onSubmitRegistro)}>
       
          
            <Form.Group controlId="formfechaingreso" className="mb-3">
              <Form.Label>Fecha de ingreso:</Form.Label>
              <Form.Control {...register("fechaingreso")} type="date" value={currentDate} />
            </Form.Group>
  
            <Form.Group controlId="formnumerodocumento" className="mb-3">
              <Form.Label>N° Documento Identidad:</Form.Label>
                <Form.Control {...register("numerodocumento")}type="number"/>
            </Form.Group>
  
            <Form.Group controlId="formnombrepropietario" className="mb-3">
              <Form.Label>Nombre de Propietario:</Form.Label>
              <Form.Control {...register("nombrepropietario")} type="text" maxLength={100}/>
            </Form.Group>
  
            <Form.Group controlId="formtelefono" className="mb-3">
              <Form.Label>Teléfono:</Form.Label>
              <Form.Control {...register("telefono")} type="number" />
            </Form.Group>
  
            <Form.Group controlId="formcorreoelectronico" className="mb-3">
              <Form.Label>Correo Eléctronico:</Form.Label>
              <Form.Control {...register("correoelectronico")}type="email"/>
            </Form.Group>         
  
            <Form.Group controlId="formbanco" className="mb-3">
              <Form.Label>Banco:</Form.Label>
              <Form.Control {...register("banco")} type="Text" />
            </Form.Group>

            <Form.Group controlId="formdireccion" className="mb-3">
              <Form.Label>Dirección Del Propietario:</Form.Label>
              <Form.Control {...register("direccion")} type="text" />
            </Form.Group>
            
            <Form.Group controlId="numerocuenta" className="mb-3">
              <Form.Label>Número de cuenta:</Form.Label>
              <Form.Control
                type="number" {...register("documento_cuenta")} max={9999999999}/>
            </Form.Group>

            </Form>
            </div>
        {/* Botones de guardar y cancelar */}
        <div className="col-md-12">
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
    </div>
    </div>
  );
};