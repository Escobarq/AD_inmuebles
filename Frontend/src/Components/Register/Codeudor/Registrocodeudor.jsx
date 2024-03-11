import { Form, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const Registrocodeudor = () => {

  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la alerta
  const [focusedField, setFocusedField] = useState(""); // Estado para rastrear el campo enfocado

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Estado para almacenar los datos del codeudor
  const [codeudorData, setCodeudorData] = useState({
    NombreCompleto: "",
    TipoDocumento: "",
    DocumentoIdentidad: "",
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


    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onChange" });

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
      // Si no hay parámetros de consulta en la URL, significa que se está creando un nuevo codeudor
      setCodeudorData({
        NombreCompleto: "",
        TipoDocumento: "",
        DocumentoIdentidad: "",
        Direccion: "",
        Telefono: "",
        Correo: "",
      });
    }
  }, [location.search]);

  const onsubmitRegistro = async () => {
    try {
      const url = codeudorData.IdCodeudor
        ? `http://localhost:3006/Rcodeudor/${codeudorData.IdCodeudor}`
        : "http://localhost:3006/Rcodeudor";
  
      const method = codeudorData.IdCodeudor ? "PUT" : "POST";
  
      const dataToSend = {
        ...codeudorData,
        TipoDocumento: codeudorData.TipoDocumento, // Este es el cambio para incluir el tipo de documento seleccionado
      };
  
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        setShowSaveModal(true);
        notify();
        console.log(dataToSend);
        //reset();
        // window.location.href = "/Codeudor";
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
  
  const handleTextChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    // Expresión regular para permitir solo letras y espacios
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/;

    // Si el campo no cumple con la expresión regular y el campo enfocado es el mismo que el actual, muestra la alerta de advertencia
    if (!regex.test(fieldValue) && focusedField === fieldName) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }

    // Actualiza los datos del propietario
    setCodeudorData({ ...codeudorData, [fieldName]: fieldValue });
  };

  const handleNumberChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    // Expresión regular para permitir solo números
    const regex = /^[0-9]*$/;

    // Si el campo no cumple con la expresión regular y el campo enfocado es el mismo que el actual, muestra la alerta de advertencia
    if (!regex.test(fieldValue) && focusedField === fieldName) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }

    // Actualiza los datos del propietario
    setCodeudorData({ ...codeudorData, [fieldName]: fieldValue });
  };

  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName);
  };


  return (
    <div className="contener-home contener-rpropietario">
      <h2>Registro Codeudor</h2>
      <div className="container">
        <Form
          className="form-propietario"
          onSubmit={handleSubmit(onsubmitRegistro)}
        >
          <Form.Group controlId="formnombre" >
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              {...register("NombreCompleto")}
              defaultValue={codeudorData.NombreCompleto}
            
              onChange={handleTextChange}
              onFocus={() => handleFieldFocus("NombreCompleto")}
              required
            />
            {focusedField === "NombreCompleto" && showWarning && (
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
              onChange={(e) =>
                setCodeudorData({
                  ...codeudorData,
                  TipoDocumento: e.target.value,
                })
              }
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
              {...register("DocumentoIdentidad")}
              defaultValue={codeudorData.DocumentoIdentidad}
              
              onChange={handleNumberChange}
              onFocus={() => handleFieldFocus("DocumentoIdentidad")}
              required
            />
            {focusedField === "DocumentoIdentidad" && showWarning && (
              <span className="error-message">Solo se permiten números</span>
            )}
          </Form.Group>

          <Form.Group controlId="formtelefono">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              {...register("Telefono")}
              defaultValue={codeudorData.Telefono}


              onChange={handleNumberChange}
              onFocus={() => handleFieldFocus("Telefono")}
              required
            />
            {focusedField === "Telefono" && showWarning && (
              <span className="error-message">Solo se permiten números</span>
            )}
          </Form.Group>

          <Form.Group controlId="formcorreo">
            <Form.Label>Correo:</Form.Label>
            <Form.Control
              type="email"
              {...register("Correo")}
              defaultValue={codeudorData.Correo}
            />
          </Form.Group>

          <Form.Group controlId="formdireccion">
            <Form.Label>Dirección:</Form.Label>
            <Form.Control              
              {...register("Direccion")}
              defaultValue={codeudorData.Direccion}
            />
          </Form.Group>
        </Form>
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
