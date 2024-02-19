import React, { useState } from "react";
import "./RPropietario.css";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import Btn_inmueble from "../../../assets/btn_inmueble.png";

export const RPropietario = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  return (
    <>
      <div className="contener-home contener-rpropietario">
        <div className="container">
          <h1 className="m-5">Registro Propietario</h1>
          <div className="row">
            <Form
              className="form-propietario row"
              style={{ marginTop: "0" }}
              onSubmit={handleSubmit(onSubmitRegistro)}
              method="post"
            >
              <div className="col-md-6">
                <div className="todoform" style={{ marginRight: "15px" }}>
                  <div className="izquier">
                    <Form.Group controlId="formNoMatricula">
                      <Form.Label>Fecha de ingreso:</Form.Label>
                      <Form.Control {...register("fechaingreso")} type="date" />
                    </Form.Group>

                    <Form.Group controlId="formDireccion">
                      <Form.Label>Numero de Documento:</Form.Label>
                      <Form.Control
                        {...register("numerodocumento")}
                        type="number"
                      />
                    </Form.Group>

                    <Form.Group controlId="formCiudad">
                      <Form.Label>Nombre de Propietario:</Form.Label>
                      <Form.Control
                        {...register("nombrepropietario")}
                        type="text"
                        maxLength={100}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBarrio">
                      <Form.Label>Telefono:</Form.Label>
                      <Form.Control {...register("telefono")} type="number" />
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="izqui">
                  <Form.Group controlId="formEstrato">
                    <Form.Label>Correo Electronico:</Form.Label>
                    <Form.Control
                      {...register("correoelectronico")}
                      type="email"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formTipoInmueble"
                    className="col col-md.auto"
                  >
                    <Form.Label>Tipo De Cuenta</Form.Label>
                    <Form.Select
                      className="formSelect"
                      {...register("tipocuenta")}
                      aria-label="Default select example"
                    >
                      <option value="">Selecciona El tipo de Cuenta</option>
                      <option value="ahorro de cuenta">Ahorro de Cuenta</option>
                      <option value="cuenta corriente">Cuenta Corriente</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="formValor">
                    <Form.Label>Banco</Form.Label>
                    <Form.Control {...register("banco")} type="Text" />
                  </Form.Group>

                  <Form.Group controlId="formNoHabitaciones">
                    <Form.Label>Direccion Del Propetario</Form.Label>
                    <Form.Control {...register("direccion")} type="text" />
                  </Form.Group>
                </div>
              </div>
              <div className=" d-flex justify-content-end">
                <button
                  className="btn btn-primary btn-sm"
                  style={{ background: "none", border: "none" }}
                >
                  <img src={Btn_inmueble} alt="Icono de Inmueble" />
                </button>
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
          </div>
        </div>
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
    </>
  );
};
