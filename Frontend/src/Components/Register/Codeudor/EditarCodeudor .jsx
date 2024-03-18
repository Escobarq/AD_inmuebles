import { Form, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const EditarCodeudor = () => {
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la alerta
  const [focusedField, setFocusedField] = useState(""); // Estado para rastrear el campo enfocado

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Estado para almacenar los datos del codeudor
  const [codeudorData, setCodeudorData] = useState({
    IdCodeudor: "",
    NombreCompleto: "",
    TipoDocumento: "",
    DocumentoIdentidad: "",
    Direccion: "",
    Telefono: "",
    Correo: "",
  });

  const notify = () =>
    toast.success("Se actualizó correctamente", {
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

  const { register, handleSubmit, reset } = useForm({ mode: "onChange" });

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    // Si hay parámetros de consulta en la URL, significa que se está editando un codeudor existente
    if (location.search) {
      setCodeudorData({
        IdCodeudor: searchParams.get("IdCodeudor"),
        TipoDocumento: searchParams.get("TipoDocumento"),
        DocumentoIdentidad: searchParams.get("DocumentoIdentidad"),
        NombreCompleto: searchParams.get("NombreCompleto"),
        Direccion: searchParams.get("Direccion"),
        Telefono: searchParams.get("Telefono"),
        Correo: searchParams.get("Correo"),
      });
    } else {
      // Si no hay parámetros de consulta en la URL, redirecciona a la página principal
      window.location.href = "/"; // Cambia la URL de redirección según tu configuración
    }
  }, [location.search]);

  const onsubmitEditar = async (data) => {
    try {
      const url = `http://localhost:3006/Rcodeudor/${codeudorData.IdCodeudor}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(codeudorData),
      });
      console.log(data)

      if (response.ok) {
        setShowSaveModal(true);
        notify();
        reset();
      } else {
        error();
      }
    } catch (error) {
      errora();
      console.error("Error al enviar datos al servidor:", error);
    }
  };

  const handleConfirmSave = () => {
    handleSubmit(onsubmitEditar)();
    setShowSaveModal(false);
    reset();
  };

  const handleConfirmCancel = () => {
    window.location.href = "/Codeudor";
    setShowCancelModal(false);
  };

  return (
    <div className="contener-home contener-rpropietario">
      <h2>Editar Codeudor</h2>
      <div className="container">
        <Form
          className="form-propietario"
          onSubmit={handleSubmit(onsubmitEditar)}
        >
          <Form.Group controlId="formnombre">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              {...register("nombrecompleto")}
              defaultValue={codeudorData.NombreCompleto}
              required
            />
            {focusedField === "nombrecompleto" && showWarning && (
              <span className="error-message">
                Solo se permiten letras y espacios
              </span>
            )}
          </Form.Group>

          <Form.Group controlId="formTipoDocumento" className="formSelect">
            <Form.Label>Tipo De Documento</Form.Label>
            <Form.Select
              className="InputsRegistros"
              {...register("TipoDocumento")}
              defaultValue={codeudorData.TipoDocumento}
              required
            >
              <option defaultValue="" disabled hidden>
                {" "}
                Seleccione Tipo de Documento{" "}
              </option>
              <option value="Cedula Ciudadania">Cedula Ciudadania</option>
              <option value="Cedula Extranjeria">Cedula Extranjería</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formDocumentoIdentidad">
            <Form.Label>Número de identidad:</Form.Label>
            <Form.Control
              {...register("documentoidentidad")}
              defaultValue={codeudorData.DocumentoIdentidad}
              required
            />
            {focusedField === "DocumentoIdentidad" && showWarning && (
              <span className="error-message">Solo se permiten números</span>
            )}
          </Form.Group>

          <Form.Group controlId="formtelefono">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              {...register("telefono")}
              defaultValue={codeudorData.Telefono}
              required
            />
            {focusedField === "telefono" && showWarning && (
              <span className="error-message">Solo se permiten números</span>
            )}
          </Form.Group>

          <Form.Group controlId="formcorreo">
            <Form.Label>Correo:</Form.Label>
            <Form.Control
              type="email"
              {...register("correo")}
              defaultValue={codeudorData.Correo}
            />
          </Form.Group>

          <Form.Group controlId="formdireccion">
            <Form.Label>Dirección:</Form.Label>
            <Form.Control
              {...register("direccion")}
              defaultValue={codeudorData.Direccion}
            />
          </Form.Group>

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
  );
};
