import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Rpropietario.css";

// Función para obtener la fecha actual en formato YYYY-MM-DD
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;
  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
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
        localStorage.setItem("NITPropie", data.numerodocumento);
        console.log(localStorage.getItem("NITPropie"))
        setShowSaveModal(false); // Muestra el modal de confirmación
        localStorage.setItem("NITPropie", data.numerodocumento); // Suponiendo que DocumentoIdentidad es el campo correcto
        reset(); 
      }
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
    }
  };

  const handleConfirmSave = () => {
    
    handleSubmit(onSubmitRegistro)(); 
    
    const method = propetarioData.IdPropietario ? "PUT" : "POST";

    if (method === "PUT") {
      window.location.href = "/Propietario";
    } else {
      window.location.href = "/RInmuebleA";
    }
    
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
        <Form
          className="form-propietario"
          onSubmit={handleSubmit(onSubmitRegistro)}
        >
          <Form.Group controlId="formnombrepropietario" className="mb-3">
            <Form.Label>Nombre de Propietario:</Form.Label>
            <Form.Control
              {...register("fechaingreso")}
              type="date"
              disabled
              value={currentDate}
            />
          </Form.Group>

              {...register("nombrepropietario")}
              type="text"
              maxLength={100}
              defaultValue={propetarioData.NombreCompleto}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTipoCuenta"  className="formSelect InputsRegistros">
            <Form.Label>Tipo De Documento</Form.Label>
            <Form.Select
              {...register("TipoDocumento")}
              className="formSelect InputsRegistros"
              aria-label="Default select example"
            >
              <option value="" disabled hidden selected>
                Seleccione Tipo de Documento
              </option>
              <option defaultValue="Cedula Ciudadania">Cedula Ciudadania</option>
              <option defaultValue="Cedula Extranjera">Cedula Extranjera</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formdireccion" className="InputsRegistros">
            <Form.Label>Dirección Del Propietario:</Form.Label>
            <Form.Control
              {...register("direccion")}
              type="text"
              defaultValue={propetarioData.Direccion}
              required
            />
          </Form.Group>

          <Form.Group controlId="formnumerodocumento" className="InputsRegistros">
            <Form.Label>N° Documento Identidad:</Form.Label>
            <Form.Control
              {...register("telefono")}
              max={9999999999}
              type="number"
              defaultValue={propetarioData.DocumentoIdentidad}
              required
            />
          </Form.Group>

          <Form.Group controlId="formcorreoelectronico" className="mb-3">

          <Form.Group controlId="formBarrio" className="InputsRegistros">
            <Form.Label>Telefono:</Form.Label>
            <Form.Control
              {...register("telefono")}
              max={9999999999}
              type="number"
              defaultValue={propetarioData.Telefono}
              required
            />
          </Form.Group>

          <Form.Group controlId="formcorreoelectronico" className="mb-3">
            <Form.Label>Correo Eléctronico:</Form.Label>
            <Form.Control
              type="email"
              name="Correo"
              {...register("correoelectronico")}
              defaultValue={propetarioData.Correo}
              required
            />
          </Form.Group>

          <Form.Group controlId="formbanco" className="mb-3">
            <Form.Label>Banco:</Form.Label>
            <Form.Control
              {...register("banco")}
              type="Text"
              defaultValue={propetarioData.Banco}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTipoCuenta" className="InputsRegistros">
            <Form.Label>Tipo De Cuenta</Form.Label>
            <Form.Select
              {...register("tipocuenta")}
              className="formSelect InputsRegistros"
              aria-label="Default select example"
            >
              <option value="" disabled hidden selected>
                Seleccione Tipo de Cuenta
              </option>
              <option value="Cuenta Ahorros">Cuenta Ahorros</option>
              <option value="Cuenta Corriente">Cuenta Corriente</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="numerocuenta" className="InputsRegistros">
            <Form.Label>Número de cuenta:</Form.Label>
            <Form.Control
              type="number"
              name="NumeroCuenta"
              {...register("numerocuenta")}
              max={9999999999}
              defaultValue={propetarioData.NumeroCuenta}
              required
            />
          </Form.Group>

          <Form.Group controlId="formfechaingreso" className="InputsRegistros">
            <Form.Label>Fecha de ingreso:</Form.Label>
            <Form.Control
              {...register("fechaingreso")}
              type="date"
              value={currentDate}
              defaultValue={propetarioData.FechaIngreso}
              required
            />
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
