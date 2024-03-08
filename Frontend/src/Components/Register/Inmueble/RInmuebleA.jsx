import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, ListGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearInmueble } from "../../Hooks/RegisterInmueble";
import { toast } from "react-toastify";
import axios from "axios";

export const RInmuebleA = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [mostrarModalA, setMostrarModalA] = useState(false);
  const [selectedPropietario, setSelectedPropietario] = useState("");
  const [PropietariosDisponibles, setPropietariosDisponibles] = useState([]);
  const [focusedField, setFocusedField] = useState(""); // Agregar esta línea antes de usar focusedField
  const [showWarning, setShowWarning] = useState(false); // Agregar esta línea antes de usar showWarning

  const notify = () =>
    toast.success("Se Registró correctamente", {
      theme: "dark",
    });

  const falla = () =>
    toast.error("Hubo un error al ingresar los datos, intenta nuevamente", {
      theme: "colored",
    });

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3006/Vpropietarios?");
      const Propietarios = response.data.map((prop) => prop);
      setPropietariosDisponibles(Propietarios);
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

  const onsubmitRegistro = async (data) => {
    data.Id_Propietario = selectedPropietario.IdPropietario;
    data.Tipo = "Apartamento";
    try {
      await crearInmueble(data);
      notify();
      reset();
      window.location.href = "/Inmueble";
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
  const handlePropietarioChange = async (Propietario) => {
    setSelectedPropietario(Propietario);
    console.log(Propietario);
    setMostrarModalA(false);
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption) {
      window.location.assign(`/${selectedOption}`);
    }
  };

  // Redireccion en caso de confirmar o cancelar
  const handleConfirmSave = () => {
    // Lógica para confirmar el guardado
    handleSubmit(onsubmitRegistro)(); // Envia los datos
    setShowSaveModal(false); // Cierra el modal
  };

  const handleConfirmCancel = () => {
    window.location.href = "/Inmueble";
    setShowCancelModal(false); // Cierra el modal
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
    setpropetarioData({ ...propetarioData, [fieldName]: fieldValue });
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
    setpropetarioData({ ...propetarioData, [fieldName]: fieldValue });
  };

  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName);
  };


  return (
    <div className="contener-home contener-rpropietario">
      <h2>Registro Inmueble</h2>
      <div className="container">
        <Form
          className=""
          style={{ marginTop: "0" }}
          onSubmit={handleSubmit(onsubmitRegistro)}
          method="post"
        >
          <div className="form-propietario">
            <Form.Group
              controlId="formTipoInmueble"
              className="col col-md.auto"
            >
              <Form.Label>Tipo Inmueble</Form.Label>
              <Form.Select
                className="formSelect InputsRegistros"
                aria-label="Default select example"
                onChange={handleSelectChange}
              >
                <option value="RInmuebleA" disabled hidden selected>
                  Apartamento
                </option>
                <option value="RinmuebleO">Oficina</option>
                <option value="RInmuebleB">Bodega</option>
                <option value="RInmuebleL">Local</option>
                <option value="RInmuebleC">Casa</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formNoMatricula">
              <Form.Label>No. Matricula:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Nmatricula")}
               
                onChange={handleNumberChange}
                onFocus={() => handleFieldFocus("Nmatricula")}
                required
              />
              {focusedField === "Nmatricula" && showWarning && (
                <span className="error-message">Solo se permiten números</span>
              )}
            </Form.Group>

            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Direccion")}
                onChange={handleTextChange}
                 />
                 </Form.Group>

            <Form.Group controlId="formCiudad">
              <Form.Label>Ciudad:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Ciudad")}
                onChange={handleTextChange}
              onFocus={() => handleFieldFocus("Ciudad")}
              required
            />
            {focusedField === "Ciudad" && showWarning && (
              <span className="error-message">
                Solo se permiten letras y espacios
              </span>
            )}
          </Form.Group>

            <Form.Group controlId="formBarrio">
              <Form.Label>Barrio:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Barrio")}
                onChange={handleTextChange}
              onFocus={() => handleFieldFocus("Barrio")}
              required
            />
            {focusedField === "Barrio" && showWarning && (
              <span className="error-message">
                Solo se permiten letras y espacios
              </span>
            )}
          </Form.Group>

            <Form.Group controlId="formEstrato">
              <Form.Label>Estrato:</Form.Label>
              <Form.Select
                className="formSelect InputsRegistros"
                required
                {...register("Estrato")}
                aria-label="Default select example"
              >
                <option value="" selected>
                  Seleccione estrato
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formNBanos">
              <Form.Label>No. Baños:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Nbanos")}
                onChange={handleNumberChange}
              onFocus={() => handleFieldFocus("Nbanos")}
              required
            />
            {focusedField === "Nbanos" && showWarning && (
              <span className="error-message">Solo se permiten números</span>
            )}
          </Form.Group>

            <Form.Group controlId="formValorIn">
              <Form.Label>Valor:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("ValorIn")}
                onChange={handleNumberChange}
              onFocus={() => handleFieldFocus("ValorIn")}
              required
            />
            {focusedField === "ValorIn" && showWarning && (
              <span className="error-message">Solo se permiten números</span>
            )}
          </Form.Group>

            <Form.Group controlId="formNoHabitaciones">
              <Form.Label>No. Habitaciones:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("NoHabita")}
                onChange={handleNumberChange}
              onFocus={() => handleFieldFocus("NoHabita")}
              required
            />
            {focusedField === "NoHabita" && showWarning && (
              <span className="error-message">Solo se permiten números</span>
            )}
          </Form.Group>

            <Form.Group controlId="formNoNiveles">
              <Form.Label>No. Niveles:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("NoNiveles")}
                onChange={handleNumberChange}
                onFocus={() => handleFieldFocus("NoNiveles")}
                required
              />
              {focusedField === "NoNiveles" && showWarning && (
                <span className="error-message">Solo se permiten números</span>
              )}
            </Form.Group>

            <Form.Group controlId="formTerraza">
              <Form.Label>Terraza:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("NoTerraza")}
                onChange={handleNumberChange}
              onFocus={() => handleFieldFocus("NoTerraza")}
              required
            />
            {focusedField === "NoTerraza" && showWarning && (
              <span className="error-message">Solo se permiten números</span>
            )}
          </Form.Group>

            <Form.Group controlId="formServiciosPublicos">
              <Form.Label>Servicios Publicos:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Spublicos")}
                onChange={handleTextChange}
              onFocus={() => handleFieldFocus("ServiciosPublicos")}
              required
            />
            {focusedField === "ServiciosPublicos" && showWarning && (
              <span className="error-message">
                Solo se permiten letras y espacios
              </span>
            )}
          </Form.Group>

            <Form.Group controlId="formAseguramiento">
              <Form.Label>Vencimiento de Aseguramiento:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("aseguramiento")}
                type="date"
              />
            </Form.Group>
            <Form.Group controlId="formNoIdentidadPropietario">
              <Form.Label>Propietario del inmueble</Form.Label>
              <Form.Select
                className="InputsRegistros"
                value={
                  selectedPropietario ? selectedPropietario.IdPropietario : "a?"
                }
                onChange={(e) => handlePropietarioChange(e.target.value)}
                onClick={() => handleMostrarAClick(true)}
              >
                <option value="">Seleccionar Numero de Propietario</option>
                {PropietariosDisponibles.map((Propietario, index) => (
                  <option key={index} value={Propietario.IdPropietario}>
                    {Propietario.NombreCompleto}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <Form.Group controlId="formNoIdentidadPropietario">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("Descripcion")}
              as="textarea"
              rows={2}
              style={{ width: "100%", resize: "none" }}
            />
          </Form.Group>
          {/*Botones para guardar y cancelar*/}
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
          </div>
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

          <Modal
            size="lg"
            show={mostrarModalA}
            onHide={handleCloseModalA}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Seleccionar Propietario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup>
                {PropietariosDisponibles.map((Propietario, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => handlePropietarioChange(Propietario)}
                  >
                    <span style={{ marginRight: "10px" }}>
                      🏢 {/* Icono de propietario */}
                    </span>
                    {Propietario.TipoDocumento} {Propietario.DocumentoIdentidad}{" "}
                    - {Propietario.NombreCompleto}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Modal.Body>
          </Modal>
        </Form>
      </div>
    </div>
  );
};
