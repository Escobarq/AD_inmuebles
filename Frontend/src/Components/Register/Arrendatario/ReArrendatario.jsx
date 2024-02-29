import { useState, useEffect } from "react";
import "./ReArrendatario.css";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const ReArrendatario = () => {
  const notify = () =>
    toast.success("Se registró correctamente", {
      theme: "dark",
    });

  const falla = () =>
    toast.error(
      "Error al ingresar los datos, complete todos los campos e intente nuevamente.",
      {
        theme: "colored",
      }
    );

  const { register, handleSubmit, reset } = useForm();


  // Modal
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleConfirmSave = () => {
    // Lógica para confirmar el guardado
    handleSubmit(onSubmitRegistro)(); // Envia los datos
    setShowSaveModal(false); // Cierra el modal
    reset();
  };

  const handleConfirmCancel = () => {
    window.location.href = "/Arrendatario";
    setShowCancelModal(false); // Cierra el modal
  };

  // Estado para almacenar los datos del codeudor
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [arrendatarioData, setarrendatarioData] = useState({
    TipoDocumento: "",
    DocumentoIdentidad: "",
    NombreCompleto: "",
    Telefono: "",
    Correo: "",
    Estado: "",
  });

  useEffect(() => {
    // Si hay parámetros de consulta en la URL, significa que se está editando un codeudor existente
    if (location.search) {
      const arrendatario = {
        IdArrendatario: searchParams.get("IdArrendatario"),
        TipoDocumento: searchParams.get("TipoDocumento"),
        DocumentoIdentidad: searchParams.get("DocumentoIdentidad"),
        NombreCompleto: searchParams.get("NombreCompleto"),
        Telefono: searchParams.get("Telefono"),
        Correo: searchParams.get("Correo"),
        Estado: searchParams.get("Estado"),
      };
      console.log("Datos de arrendatario recibidos:", arrendatario);
      setarrendatarioData(arrendatario);
    } else {
      // Si no hay parámetros de consulta en la URL, significa que se está creando un nuevo codeudor
      setarrendatarioData({
        NombreCompleto: "",
        TipoDocumento: "",
        DocumentoIdentidad: "",
        Telefono: "",
        Correo: "",
        Estado: "",
      });
    }
  }, [location.search]);


  const onSubmitRegistro = async (data) => {
    try {
      const url = arrendatarioData.IdArrendatario
        ? `http://localhost:3006/Rarrendatarios/${arrendatarioData.IdArrendatario}`
        : "http://localhost:3006/Rarrendatario";
  
      const method = arrendatarioData.IdArrendatario ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Aquí debes asegurarte de incluir el ID del arrendatario si existe
      });
      if (response.ok) {
        setShowSaveModal(true);
        notify();
        reset();
        window.location.href = "/Arrendatario";
      } else {
        falla();
      }
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
    }
  };
  return (
    <div className="contener-home contener-ReArrendatario">
      <h2>Registro Arrendatario</h2>
      <div className="container">
        <Form className="" onSubmit={handleSubmit(onSubmitRegistro)}>
          <div className="form-propietario">
            <Form.Group controlId="nombrearrendatario">
              <Form.Label className="text_normal">Nombre Completo</Form.Label>
              <Form.Control
                className="InputsRegistros"
                type="text"
                maxLength={50}
                {...register("nombrearrendatario")}
                defaultValue={arrendatarioData.NombreCompleto}
              />
            </Form.Group>

            <Form.Group controlId="tipodocumento">
              <Form.Label className="text_normal">Tipo Documento:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                as="select"
                {...register("tipodocumento")}
                defaultValue={arrendatarioData.TipoDocumento}
              >
                <option value={"CC"}>Cédula de Ciudadanía</option>
                <option value={"CE"}>Cédula de Extranjería</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="numerodocumento">
              <Form.Label className="text_normal">Número identidad:</Form.Label>
              <Form.Control
                required
                className="InputsRegistros"
                type="number"
                max={9999999999}
                {...register("numerodocumento")}
                defaultValue={arrendatarioData.DocumentoIdentidad.trim()} 
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
                defaultValue={arrendatarioData.Telefono.trim()}
              />
            </Form.Group>

            <Form.Group controlId="correo">
              <Form.Label className="text_normal">
                Correo Arrendatario:
              </Form.Label>
              <Form.Control
                controlId="correo"
                className="InputsRegistros"
                type="email"
                {...register("correo")}
                defaultValue={arrendatarioData.Correo}
              />
            </Form.Group>

            <Form.Group controlId="estadocontrato">
              <Form.Label className="text_normal">Estado</Form.Label>
              <Form.Control
                className="InputsRegistros"
                type="text"
                {...register("estadocontrato")}
                defaultValue={arrendatarioData.Estado}
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
