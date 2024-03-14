import { useState, useEffect } from "react";
import "./ReArrendatario.css";
import { Button, Form, Modal, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ReArrendatario = () => {
  const [CodeudoresDisponibles, setCodeudoresDisponibles] = useState([]);
  const [selectedCodeudor, setSelectedCodeudor] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [mostrarModalA, setMostrarModalA] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la alerta
  const [focusedField, setFocusedField] = useState(""); // Estado para rastrear el campo enfocado

  // Modal
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const notify = () =>
  toast.success("Se registró correctamente", {
    theme: "dark",
  });

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
    fetchData();
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

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3006/Vcodeudor?");
      const Codeudores = response.data.map((prop) => prop);
      setCodeudoresDisponibles(Codeudores);
    } catch (error) {
      console.error("Error al cargar las matrículas:", error);
      toast.error(
        "Error al cargar las matrículas. Inténtalo de nuevo más tarde."
      );
    }
  };

  
  const handleCloseModalA = () => {
    setMostrarModalA(false);
  };
  const handleMostrarAClick = async () => {
    setMostrarModalA(true);
  };

  const handleCodeudorChange = async (Codeudor) => {
    setSelectedCodeudor(Codeudor);
    console.log(Codeudor);
    setMostrarModalA(false);
  };

  const onSubmitRegistro = async (data) => {
    data.IdCodeudor = selectedCodeudor.IdCodeudor;
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

    // Actualiza los datos del Codeudor
    setarrendatarioData({ ...arrendatarioData, [fieldName]: fieldValue });
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

    // Actualiza los datos del Codeudor
    setarrendatarioData({ ...arrendatarioData, [fieldName]: fieldValue });
  };

  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName);
    console.log("borrar luego");
  };

  return (
    <div className="contener-home contener-ReArrendatario">
      <h2>Registro Arrendatario</h2>
      <div className="container">
        <Form className="" onSubmit={handleSubmit(onSubmitRegistro)}>
          <div className="form-propietario">


            <Form.Group controlId="nombrearrendatario">
              <Form.Label >Nombre arrendatario:</Form.Label>
              <Form.Control className="InputsRegistros"              
               {...register("nombrearrendatario")}
                defaultValue={arrendatarioData.NombreCompleto}


                onChange={handleTextChange}
                onFocus={() => handleFieldFocus("nombrearrendatario")}
                required
              />
              {focusedField === "nombrearrendatario" && showWarning && (
                <span className="error-message">
                  Solo se permiten letras y espacios
                </span>
              )}
            </Form.Group>

            <Form.Group controlId="formtipodocumento">
              <Form.Label >Tipo Documento:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                as="select"
                {...register("tipodocumento")}
                defaultValue={arrendatarioData.TipoDocumento}
              >
                <option value={"Cedula Ciudadania"}>Cédula de Ciudadanía</option>
                <option value={"Cedula Extranjeria"}>Cédula de Extranjería</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formnumerodocumento">
              <Form.Label >N° Documento Identidad:</Form.Label>
              <Form.Control                
                className="InputsRegistros"
                 {...register("numerodocumento")}
                defaultValue={arrendatarioData.DocumentoIdentidad} 
                onChange={handleNumberChange}
                onFocus={() => handleFieldFocus("numerodocumento")}
                required
              />
              {focusedField === "numerodocumento" && showWarning && (
                <span className="error-message">Solo se permiten números</span>
              )}
            </Form.Group>

            <Form.Group controlId="formtelefono">
              <Form.Label > Teléfono Arrendatario: </Form.Label>
              <Form.Control
                className="InputsRegistros"
                
                {...register("telefono")}
                defaultValue={arrendatarioData.Telefono}

                onChange={handleNumberChange}
                onFocus={() => handleFieldFocus("telefono")}
                required
              />
              {focusedField === "telefono" && showWarning && (
                <span className="error-message">Solo se permiten números</span>
              )}
            </Form.Group>

            <Form.Group controlId="correo">
              <Form.Label > Correo Arrendatario:  </Form.Label>
              <Form.Control
                controlId="correo"
                className="InputsRegistros"
                type="email"
                {...register("correo")}
                defaultValue={arrendatarioData.Correo}
              />
            </Form.Group>

            <Form.Group controlId="formNoIdentidadCodeudor">
              <Form.Label>Codeudor del inmueble</Form.Label>
              <Form.Select
                className="InputsRegistros"
                value={
                  selectedCodeudor ? selectedCodeudor.IdCodeudor : "a?"
                }
                onChange={(e) => handleCodeudorChange(e.target.value)}
                onClick={() => handleMostrarAClick(true)}
              >
                <option value="">Seleccionar Numero de Codeudor</option>
                {CodeudoresDisponibles.map((Codeudor, index) => (
                  <option key={index} value={Codeudor.IdCodeudor}>
                    {Codeudor.NombreCompleto}
                  </option>
                ))}
              </Form.Select>
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
        <Modal
            size="lg"
            show={mostrarModalA}
            onHide={handleCloseModalA}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Seleccionar Codeudor</Modal.Title>
            </Modal.Header>
              
            <Modal.Body>
              <ListGroup>
                {CodeudoresDisponibles.map((Codeudor, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => handleCodeudorChange(Codeudor)}
                  >
                    <span style={{ marginRight: "10px" }}>
                      🏢 {/* Icono de Codeudor */}
                    </span>
                    {Codeudor.TipoDocumento} {Codeudor.DocumentoIdentidad}{" "}
                    - {Codeudor.NombreCompleto}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Modal.Body>
            <Modal.Footer><a href="/Registrocodeudor">Agregar Nuevo Codeudor</a></Modal.Footer>
          </Modal>
      </div>
    </div>
  );
};
