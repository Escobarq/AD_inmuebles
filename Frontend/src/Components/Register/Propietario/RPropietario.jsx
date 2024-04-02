/* eslint-disable no-useless-escape */
import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Rpropietario.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const RPropietario = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [identidadesRegistradas, setIdentidadesRegistradas] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [propetarioData, setpropetarioData] = useState({
    IdPropietario: "",
    NombreCompleto: "",
    TipoDocumento: "",
    DocumentoIdentidad: "",
    Telefono: "",
    Correo: "",
    Banco: "",
    TipoCuenta: "",
    NumeroCuenta: "",
    FechaIngreso: "",
    direccion: "",
  });
  const ErrorCC = () =>
    toast.error("El Numero de documento ya existe", { theme: "dark" });

  useEffect(() => {
    setCurrentDate(getCurrentDate());
    if (location.search) {
      const propietario = {
        IdPropietario: searchParams.get("IdPropietario"),
        TipoDocumento: searchParams.get("TipoDocumento"),
        DocumentoIdentidad: searchParams.get("DocumentoIdentidad"),
        NombreCompleto: searchParams.get("NombreCompleto"),
        Telefono: searchParams.get("Telefono"),
        Banco: searchParams.get("Banco"),
        TipoCuenta: searchParams.get("TipoCuenta"),
        NumeroCuenta: searchParams.get("NumeroCuenta"),
        FechaIngreso: searchParams.get("FechaIngreso"),
        direccion: searchParams.get("Direccion"),
        Correo: searchParams.get("Correo"),
      };
      setpropetarioData(propietario);
    } else {
      // Si no hay parámetros de búsqueda en la URL, inicializar propietarioData con un objeto vacío
      setpropetarioData({
        IdPropietario: "",
        NombreCompleto: "",
        TipoDocumento: "",
        DocumentoIdentidad: "",
        Telefono: "",
        Correo: "",
        TipoCuenta: "",
        NumeroCuenta: "",
        FechaIngreso: "",
        direccion: "",
      });
    }
  }, [location.search]);

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
    const formData = {
      ...propetarioData,
      ...data, // Agregar los nuevos datos del formulario
    };
    formData.FechaIngreso = currentDate;
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
        body: JSON.stringify(formData),
      });
      if (response.status === 400) {
        ErrorCC();
      } else if (response.ok) {
        setShowSaveModal(false); // Muestra el modal de confirmación
        const urlParams = new URLSearchParams({
          DocumentoIdentidad: formData.DocumentoIdentidad,
        });
        const url = `/RInmuebleA?${urlParams.toString()}`;
        reset();
        setIdentidadesRegistradas([
          ...identidadesRegistradas,
          data.DocumentoIdentidad,
        ]); // Agregar el número de identidad a la lista de registros
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
    }
  };

  const handleConfirmSave = () => {
    handleSubmit(onSubmitRegistro)();
  };

  const handleConfirmCancel = () => {
    window.location.href = "/Propietario";
    setShowCancelModal(false);
  };
  return (
    <div className="contener-home contener-rpropietario">
      <h2 className="Rtit">Registro Propietario</h2>
      <div className="container">
        <Form
          className="form-propietario"
          onSubmit={handleSubmit(onSubmitRegistro)}
        >
          <Form.Group controlId="formnombrepropietario" className="formSelect">
            <Form.Label>Nombre de Propietario:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("NombreCompleto", {
                required: "Este campo es obligatorio",
              })}
              type="text"
              defaultValue={propetarioData.NombreCompleto}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/gi, "");
              }}
              maxLength={50} // Ajusta la longitud máxima según tus necesidades
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
              <option value=""> Seleccione Tipo Documento</option>
              <option value="Cedula Ciudadania">Cedula Ciudadania</option>
              <option value="Cedula Extranjeria">Cedula Extranjería</option>
              <option value="Pasaporte">Pasaporte</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formDireccion">
            <Form.Label>Dirección Del Propietario:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("direccion", {
                required: "Este campo es obligatorio",
              })}
              type="text"
              defaultValue={propetarioData.direccion}
              onChange={(e) =>
                setpropetarioData({
                  ...propetarioData,
                  direccion: e.target.value,
                })
              }
              maxLength={100} // Ajusta la longitud máxima según tus necesidades
              onKeyDown={(e) => {
                const regex = /^[A-Za-z0-9\s\-#]+$/; // Permitir letras, números, espacios y guiones
                if (!regex.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="formDocumentoIdentidad">
            <Form.Label>Número de Identidad:</Form.Label>
            <Form.Control
              type="text"
              className="InputsRegistros"
              {...register("DocumentoIdentidad", {
                required: "Este campo es obligatorio",
              })}
              defaultValue={propetarioData.DocumentoIdentidad}
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .slice(0, 10);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              type="text"
              maxLength={10}
              className="InputsRegistros"
              {...register("Telefono", {
                required: "Este campo es obligatorio",
              })}
              defaultValue={propetarioData.Telefono}
              required
              onKeyDown={(e) => {
                const regex = /^[0-9]*$/;
                if (!regex.test(e.key)&& e.key !== "Backspace") {
                  e.preventDefault();
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="formcorreoelectronico">
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              type="email"
              name="correo"
              {...register("Correo", {
                required: "Este campo es obligatorio",
              })}
              defaultValue={propetarioData.Correo}
              required
              onChange={(e) =>
                setpropetarioData({ ...propetarioData, Correo: e.target.value })
              }
              onKeyDown={(e) => {
                const regex = /[a-zA-Z0-9._-]/; // Permitir letras, números y caracteres especiales permitidos
                if (!regex.test(e.key) && e.key !== "@") {
                  e.preventDefault();
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="formbanco">
            <Form.Label>Banco:</Form.Label>
            <Form.Select
              className="InputsRegistros"
              {...register("Banco")}
              type="text"
              defaultValue={propetarioData.Banco}
              required
            >
              <option value="">Seleccione un banco</option>
              <option value="Banco Agrario de Colombia">
                {" "}
                Banco Agrario de Colombia
              </option>
              <option value="Banco AV Villas">Banco AV Villas</option>
              <option value="Banco de Bogotá">Banco de Bogotá</option>
              <option value="Bancolombia">Bancolombia</option>
              <option value="BBVA Colombia">BBVA</option>
              <option value="Banco Caja Social">Banco Caja Social</option>
              <option value="CorpBanca">CorpBanca</option>
              <option value="Banco De la República">
                Banco De la República
              </option>
              <option value="Davivienda">Davivienda</option>
              <option value="Banco Occidente">Banco Occidente</option>
              <option value="Banco Popular">Banco Popular</option>
              <option value="Banco Santander Colombia">
                Banco Santander Colombia
              </option>
              <option value="Banco WWB">Banco WWB</option>
            </Form.Select>
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
              <option value="">Seleccion Tipo Cuenta</option>
              <option value="Cuenta Ahorros">Cuenta Ahorros</option>
              <option value="Cuenta Corriente">Cuenta Corriente</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formnumerocuenta">
            <Form.Label>Número de Cuenta:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("NumeroCuenta", {
                required: "Este campo es obligatorio",
              })}
              type="text"
              defaultValue={propetarioData.NumeroCuenta}
              maxLength={20} // Ajusta la longitud máxima según tus necesidades
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9\-]*$/; // Permitir números y -
                if (!regex.test(value)) {
                  e.target.value = value.slice(0, -1); // Eliminar el último carácter no válido
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="formfechaingreso">
            <Form.Label>Fecha de Ingreso:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              disabled
              type="date"
              defaultValue={currentDate} // Usar propetarioData.FechaIngreso si está definido, de lo contrario, usar currentDate
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
              <Button
                variant="secondary"
                onClick={() => setShowSaveModal(false)}
              >
                No
              </Button>
              <Button variant="primary" onClick={handleConfirmSave}>
                Sí
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal de confirmación de cancelar */}
          <Modal
            show={showCancelModal}
            onHide={() => setShowCancelModal(false)}
          >
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
