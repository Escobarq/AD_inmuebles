import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Modal, ListGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearInmueble } from "../../Hooks/RegisterInmueble";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const RInmuebleB = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [mostrarModalA, setMostrarModalA] = useState(false);
  const [selectedPropietario, setSelectedPropietario] = useState("");
  const [PropietariosDisponibles, setPropietariosDisponibles] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [propetarioData, setpropetarioData] = useState({
    DocumentoIdentidad: "",
  });

  const notify = () =>
    toast.success("Se Registro correctamente", {
      theme: "dark",
    });

  const falla = () =>
    toast.error("Hubo un error al ingresar los datos , itente nuevamente", {
      theme: "colored",
    });
  const Nmatricula = () =>
    toast.error("Numero de Matricula duplicado", {
      theme: "colored",
    });

  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    setCurrentDate(getCurrentDate());
    if (location.search) {
      const propietario = {
        DocumentoIdentidad: searchParams.get("DocumentoIdentidad"),
      };
      console.log("Datos de propietario recibidos:", propietario);
      setpropetarioData(propietario);
      fetchData(propietario);
    } else {
      // Si no hay parámetros de consulta en la URL, significa que se está creando un nuevo propietario
      setpropetarioData({
        DocumentoIdentidad: "",
      });
      fetchData();
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


  const fetchData = async (propietario) => {
    try {
      const response = await axios.get(`http://localhost:3006/Vpropietarios?Cedula=${propietario.DocumentoIdentidad}`);
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
    data.Tipo = "Bodega";
    data.aseguramiento = currentDate;
    try {
      await crearInmueble(data);
      notify();
      reset();
      window.location.href = "/Inmueble";
    } catch (error) {
      if (error.message.includes("Numero de Matricula duplicado")) {
        Nmatricula();
      } else {
        falla();
        console.error("Error al crear el inmueble:", error);
        throw error; // Re-lanza el error para que pueda ser manejado en el componente
      }
    }
  };
  const handlePropietarioChange = async (Propietario) => {
    setSelectedPropietario(Propietario);
    setMostrarModalA(false);
  };

  const handleSelectChange = (event) => {
    const urlParams = new URLSearchParams({
      DocumentoIdentidad: propetarioData.DocumentoIdentidad,
    });
    const selectedOption = event.target.value;
    if (selectedOption) {
      window.location.assign(`/${selectedOption}?${urlParams.toString()}`);
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

  return (
    <div className="contener-home contener-rpropietario">
      <h2>Registro Inmueble </h2>
      <div className="container">
        <Form
          className="form-propietario"
          onSubmit={handleSubmit(onsubmitRegistro)}
        >
          <Form.Group controlId="formTipoInmueble">
            <Form.Label>Tipo Inmueble</Form.Label>
            <Form.Select
              className="formSelect InputsRegistros"
              aria-label="Default select example"
              onChange={handleSelectChange}
            >
              <option value="" selected>
                Bodega
              </option>
              <option value="RInmuebleA">Apartamento</option>
              <option value="RinmuebleO">Oficina</option>
              <option value="RInmuebleL">Local</option>
              <option value="RInmuebleC">Casa</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formNoMatricula">
            <Form.Label>No. Matricula:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              required
              {...register("Nmatricula")}
              type="number"
              onKeyDown={(e) => {
                const key = e.key;
                const regex = /^[a-zA-Z0-9]+$/;
                if (
                  !regex.test(key) &&
                  key !== "Backspace" &&
                  key !== "Delete"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="formDireccion">
            <Form.Label>Dirección:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              required
              {...register("Direccion")}
              type="text"
              onKeyDown={(e) => {
                const regex = /^[A-Za-z0-9\s\-#]+$/; // Permitir letras, números, espacios y guiones
                if (!regex.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="formCiudad">
            <Form.Label>Ciudad:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              required
              {...register("Ciudad")}
              type="text"
              onKeyDown={(e) => {
                const key = e.key;

                // Permitimos solo letras y espacios
                const regex = /^[a-zA-Z\s]+$/;
                if (
                  !regex.test(key) &&
                  key !== "Backspace" &&
                  key !== "Delete"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBarrio">
            <Form.Label>Barrio:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              required
              {...register("Barrio")}
              type="text"
              onKeyDown={(e) => {
                const regex = /^[A-Za-z0-9\s\-#]+$/; // Permitir letras, números, espacios y guiones
                if (!regex.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="formNoBanos">
            <Form.Label>Valor:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              required
              {...register("ValorIn")}
              type="number"
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
              }}
            />
          </Form.Group>

          <Form.Group controlId="formEstrato">
            <Form.Label>Estrato</Form.Label>
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

          <Form.Group controlId="formNoBanos">
            <Form.Label>No. Baños</Form.Label>
            <Form.Control
              className="InputsRegistros"
              required
              {...register("Nbanos")}
              type="number"
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
              }}
            />
          </Form.Group>

          <Form.Group controlId="formNoHabitaciones">
            <Form.Label>Servicios Publicos</Form.Label>
            <Form.Control
              className="InputsRegistros"
              required
              {...register("Spublicos")}
              type="text"
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^A-Za-z\s,]/g, "")
              }}
            />
          </Form.Group>

          <Form.Group controlId="formNoHabitaciones">
            <Form.Label>Area Construida en M2</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("AreaM")}
              type="number"
              onInput={(e) => {
                // Permitir solo números y un punto decimal
                e.target.value = e.target.value.replace(/[^0-9],/g, "");
              }}
            />
          </Form.Group>

          <Form.Group controlId="formNoNiveles">
            <Form.Label>Fecha de Aseguramiento:</Form.Label>
            <Form.Control
            value={currentDate}
            disabled
              className="InputsRegistros"
              type="date"
            />
          </Form.Group>

          <Form.Group controlId="formNoNiveles">
            <Form.Label>Vencimiento de Aseguramiento:</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("vaseguramiento")}
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

          <Form.Group controlId="formNoIdentidadPropietario">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              className="InputsRegistros"
              required
              {...register("Descripcion")}
              as="textarea"
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^A-Za-z\s]/g, "")
              }}
              style={{ width: "100%", resize: "none" }}
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
                {Propietario.TipoDocumento} {Propietario.DocumentoIdentidad} -{" "}
                {Propietario.NombreCompleto}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
};
