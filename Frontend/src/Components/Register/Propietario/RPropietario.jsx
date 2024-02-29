import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Rpropietario.css";
import { useLocation } from "react-router-dom";

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

  const { register, handleSubmit, reset } = useForm();

  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  // Estado para almacenar los datos del codeudor
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [propetarioData, setpropetarioData] = useState({
    TipoDocumento: "",
    DocumentoIdentidad: "",
    NombreCompleto: "",
    Telefono: "",
    Correo: "",
    Banco: "",
    TipoCuenta: "",
    NumeroCuenta: "",
    FechaIngreso: "",
    Direccion: "",
    IdPropietario: "" // Agregamos el campo IdPropietario
  });

  useEffect(() => {
    // Si hay parámetros de consulta en la URL, significa que se está editando un propietario existente
    if (location.search) {
      const arrendatario = {
        IdPropietario: searchParams.get("IdPropietario"),
        TipoDocumento: searchParams.get("TipoDocumento"),
        DocumentoIdentidad: searchParams.get("DocumentoIdentidad"),
        NombreCompleto: searchParams.get("NombreCompleto"),
        Telefono: searchParams.get("Telefono"),
        Banco: searchParams.get("Banco"),
        TipoCuenta: searchParams.get("TipoCuenta"),
        NumeroCuenta: searchParams.get("NumeroCuenta"),
        FechaIngreso: searchParams.get("FechaIngreso"),
        Direccion: searchParams.get("Direccion"),
        Correo: searchParams.get("Correo"),
      };
      console.log("Datos de propietario recibidos:", arrendatario);
      setpropetarioData(arrendatario);
    } else {
      // Si no hay parámetros de consulta en la URL, significa que se está creando un nuevo propietario
      setpropetarioData({
        IdPropietario: "" ,// Agregamos el campo IdPropietario
        NombreCompleto: "",
        TipoDocumento: "",
        DocumentoIdentidad: "",
        Telefono: "",
        Correo: "",
        TipoCuenta: "",
        NumeroCuenta: "",
        FechaIngreso: "",
        Direccion: "",
      });
    }
  }, [location.search]);

  const onSubmitRegistro = async (data) => {
    try {
      const url = propetarioData.IdPropietario
        ? `http://localhost:3006/RPropietario/${propetarioData.IdPropietario}`
        : "http://localhost:3006/RPropietario";

      const method = propetarioData.IdPropietario ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Aquí debes asegurarte de que data contenga todos los campos necesarios
      });
      console.log(data);
      if (response.ok) {
        setShowSaveModal(false); // Muestra el modal de confirmación
        localStorage.setItem("NITPropie", data.DocumentoIdentidad); // Suponiendo que DocumentoIdentidad es el campo correcto
        reset(); // Reinicia el formulario si la solicitud es exitosa
        // Muestra un mensaje de éxito o redirige a otra página
      }
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
    }
  };

  const handleConfirmSave = () => {
    // Lógica para confirmar el guardado
    handleSubmit(onSubmitRegistro)(); // Envía los datos
    
    // Determina si la solicitud es un PUT o un POST
    const method = propetarioData.IdPropietario ? "PUT" : "POST";
  
    // Redirige a diferentes rutas dependiendo del método de solicitud
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
              defaultValue={propetarioData.TipoDocumento}
              required
            >
              <option defaultValue="" disabled hidden selected>
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
              {...register("numerodocumento")}
              type="number"
              defaultValue={propetarioData.DocumentoIdentidad}
              required
            />
          </Form.Group>

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
              defaultValue={propetarioData.TipoCuenta}
              required
            >
              <option defaultValue="" disabled hidden selected>
                Seleccione Tipo de Cuenta
              </option>
              <option defaultValue="Cuenta Ahorros">Cuenta Ahorros</option>
              <option defaultValue="Cuenta Corriente">Cuenta Corriente</option>
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
