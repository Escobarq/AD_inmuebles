import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Rpropietario.css";
import { useLocation } from "react-router-dom";

export const RPropietario = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la alerta
  const [focusedField, setFocusedField] = useState(""); // Estado para rastrear el campo enfocado
  const [identidadesRegistradas, setIdentidadesRegistradas] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  // Estado para almacenar los datos del propietario
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
    IdPropietario: "", // Agregamos el campo IdPropietario
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
        IdPropietario: "", // Agregamos el campo IdPropietario
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

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

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

  const onSubmitRegistro = async (data) => {
    try {
      // Verificar si el número de identidad ya está registrado
      if (identidadesRegistradas.includes(data.DocumentoIdentidad)) {
        alert('Esta persona ya está registrada con este número de identidad.');
        return;
      }

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
        reset();
        setIdentidadesRegistradas([...identidadesRegistradas, data.DocumentoIdentidad]); // Agregar el número de identidad a la lista de registros
      }
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
    }
  };

  const handleConfirmSave = () => {
    handleSubmit(onSubmitRegistro)();
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false); // Cierra el modal
  };

  const handleTextChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setpropetarioData({ ...propetarioData, [fieldName]: fieldValue });
  };

  const handleNumberChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setpropetarioData({ ...propetarioData, [fieldName]: fieldValue });
  };

  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  return (
    <div className="contener-home contener-rpropietario">
      <h2>Registro Propietario</h2>
      <div className="container">
        <Form
          className="form-propietario"
          onSubmit={handleSubmit(onSubmitRegistro)}
        >
          <Form.Group controlId="formnombrepropietario" className="formSelect">
            <Form.Label>Nombre de Propietario:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("nombrepropietario")}
              type="text"
              defaultValue={propetarioData.NombreCompleto}
              onChange={handleTextChange}
              onFocus={() => handleFieldFocus("nombrepropietario")}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTipoDocumento" className="formSelect">
            <Form.Label>Tipo De Documento</Form.Label>
            <Form.Select
              className="InputsRegistros"
              {...register("TipoDocumento")}
              defaultValue={propetarioData.TipoDocumento}
              required
              onChange={(e) =>
                setpropetarioData({
                  ...propetarioData,
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
              <option value="Pasaporte">Pasaporte</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formDireccion">
            <Form.Label>Dirección Del Propietario:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("direccion")}
              type="text"
              defaultValue={propetarioData.Direccion}
            />
          </Form.Group>

          <Form.Group controlId="formDocumentoIdentidad">
            <Form.Label>Número de Identidad:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("DocumentoIdentidad")}
              defaultValue={propetarioData.DocumentoIdentidad}
              onChange={(e) => handleNumberChange(e)}
              onFocus={() => handleFieldFocus("DocumentoIdentidad")}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("Telefono")}
              defaultValue={propetarioData.Telefono}
              onChange={(e) => handleNumberChange(e)}
              onFocus={() => handleFieldFocus("Telefono")}
              required
            />
          </Form.Group>

          <Form.Group controlId="formcorreoelectronico">
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              type="email"
              name="correo"
              {...register("Correo")}
              defaultValue={propetarioData.Correo}
              required
              onChange={(e) =>
                setpropetarioData({ ...propetarioData, Correo: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formbanco">
            <Form.Label>Banco:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("banco")}
              type="text"
              defaultValue={propetarioData.Banco}
              onChange={handleTextChange}
              onFocus={() => handleFieldFocus("banco")}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTipoCuenta">
            <Form.Label>Tipo De Cuenta</Form.Label>
            <Form.Select
              {...register("tipocuenta")}
              className="formSelect InputsRegistros"
              aria-label="Default select example"
              defaultValue={propetarioData.TipoCuenta}
              required
              onChange={(e) =>
                setpropetarioData({
                  ...propetarioData,
                  TipoCuenta: e.target.value,
                })
              }
            >
              <option defaultValue="" disabled hidden>
                Seleccione Tipo de Cuenta
              </option>
              <option value="Cuenta Ahorros">Cuenta Ahorros</option>
              <option value="Cuenta Corriente">Cuenta Corriente</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formnumerocuenta">
            <Form.Label>Número de Cuenta:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("numerocuenta")}
              max={9999999999}
              defaultValue={propetarioData.NumeroCuenta}
              required
              onChange={handleNumberChange}
              onFocus={() => handleFieldFocus("numerocuenta")}
            />
          </Form.Group>

          <Form.Group controlId="formfechaingreso">
            <Form.Label>Fecha de Ingreso:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("fechaingreso")}
              type="date"
              defaultValue={propetarioData.FechaIngreso || currentDate} // Usar propetarioData.FechaIngreso si está definido, de lo contrario, usar currentDate
              onChange={(e) =>
                setpropetarioData({
                  ...propetarioData,
                  FechaIngreso: e.target.value,
                })
              }
            />
          </Form.Group>

        

        </Form>
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
    </div>
  );
};
