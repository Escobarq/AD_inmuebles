import { useState } from "react";
import "./ReArrendatario.css";
import { Button, Form, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { registerArrendatario } from "../../Hooks/RegisterArrendatario";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const ReArrendatario = () => {
  const notify = () =>
    toast.success("Se registró correctamente", {
      theme: "dark",
    });

  const falla = () =>
    toast.error("Error al ingresar los datos, complete todos los campos e intente nuevamente.", {
      theme: "colored",
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmitArrendatario = async (data) => {
    try {
      const response = await registerArrendatario(data);
      if (response.ok) {
        notify();
        reset();
      }
    } catch (error) {
      if (error.message.includes("correo ya registrado")) {
        alert("El correo ya está registrado");
      } else {
        falla();
        console.error("Error al crear usuario:", error);
        throw error; // Re-lanza el error para que pueda ser manejado en el componente
      }
    }
  };
  // Modal
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleConfirmSave = () => {
    // Lógica para confirmar el guardado
    handleSubmit(onsubmitArrendatario)(); // Envia los datos
    setShowSaveModal(false); // Cierra el modal
    reset();
  };

  const handleConfirmCancel = () => {
    window.location.href = "/Arrendatario";
    setShowCancelModal(false); // Cierra el modal
  };

  return (
    
      <div className="contener-home contener-ReArrendatario">
        <h2 >Registro Arrendatario</h2>
        <div className="container">
        <Form
          className=""
          onSubmit={handleSubmit(onsubmitArrendatario)}
>
         <div className="form-propietario">

            <Form.Group controlId="tipodocumento">
           <Form.Label  className="text_normal">Tipo de Documento:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                type="text"
                {...register("tipodocumento")}
              />
            </Form.Group>
            
          
            <Form.Group controlId="numerodocumento">
              <Form.Label className="text_normal">Número identidad:</Form.Label>
              <Form.Control
              required
                className="InputsRegistros"
                type="number"
                min={20}
                max={9999999999}
                {...register("numerodocumento")}
              />
            </Form.Group>


            <Form.Group controlId="telefono">
              <Form.Label className="text_normal">
                Teléfono Arrendatario:
              </Form.Label>
              <Form.Control
                className="InputsRegistros"
                type="number"
                max={9999999999}
                {...register("telefono")}
              />
            </Form.Group>

            <Form.Group controlId="correo">
              <Form.Label className="text_normal">
                Correo Arrendatario:
              </Form.Label>
              <Form.Control controlId="correo"
                className="InputsRegistros"
                type="email"
                {...register("correo")}
              />
            </Form.Group>
          
          
            <Form.Group controlId="nombrearrendatario">
              <Form.Label className="text_normal">
                Nombre Arrendatario:
              </Form.Label>
              <Form.Control
                className="InputsRegistros"
                type="text"
                maxLength={50}
                {...register("nombrearrendatario")}
              />
            </Form.Group>


            <Form.Group controlId="fecha_inicio">
              <Form.Label className="text_normal">
                Fecha Inicio Contrato:
              </Form.Label>
              <Form.Control
                className="InputsRegistros"
                type="date"
                {...register("fechainicio")}
              />
            </Form.Group>


            <Form.Group controlId="valor_deposito">
              <Form.Label className="text_normal">Valor Deposito:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                type="number"
                {...register("valordeposito")}
              />
            </Form.Group>
         
            <Form.Group controlId="fecha_final">
              <Form.Label className="text_normal">
                Fecha Termino Contrato:
              </Form.Label>
              <Form.Control
                className="InputsRegistros"
                type="date"
                {...register("fechafinal")}
              />
            </Form.Group>
            </div>

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
            <Button
              variant="secondary"
              onClick={() => setShowCancelModal(false)}
            >
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
