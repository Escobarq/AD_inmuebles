import { Form, Button, Modal, InputGroup, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

export const Contrato = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [valorDeposito, setValorDeposito] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showMatriculaModal, setShowMatriculaModal] = useState(false);
  const [showArrendatarioModal, setShowArrendatarioModal] = useState(false);
  const [arrendatariosDisponibles, setArrendatariosDisponibles] = useState([]);
  const [selectedArrendatario, setSelectedArrendatario] = useState("");
  const [selectedCodeudor, setSelectedCodeudor] = useState("");
  const [selectedTipoInmueble, setSelectedTipoInmueble] = useState("");
  const [selectedMatricula, setSelectedMatricula] = useState("");
  const [matriculasDisponibles, setMatriculasDisponibles] = useState([]);
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    mode: "onChange",
  });
  const [selectedIdInmueble, setSelectedIdInmueble] = useState(null);
  const [selectedIdArrendatario, setSelectedIdArrendatario] = useState("");

  const [inmuebleData, setInmuebleData] = useState({
    IdInmueble: "",
    NoMatricula: "",
    Tipo: "",
  });
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
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

  useEffect(() => {
    cargarMatriculasDisponibles();
    cargarArrendatariosDisponibles();
    setCurrentDate(getCurrentDate());

    if (location.search) {
      setInmuebleData({
        IdInmueble: searchParams.get("IdInmueble") || "",
        NoMatricula: searchParams.get("NoMatricula") || "",
        Tipo: searchParams.get("Tipo") || "",
      });
    } else {
      // Si no hay parámetros de consulta en la URL, significa que se está creando un nuevo codeudor
      setInmuebleData({
        IdInmueble: "",
        NoMatricula: "",
        Tipo: "",
      });
    }
  }, [location.search]);

  const cargarMatriculasDisponibles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3006/propietarios-inmuebles"
      );
      const matriculas = response.data.map((prop) => prop.NoMatricula);
      setMatriculasDisponibles(matriculas);
    } catch (error) {
      console.error("Error al cargar las matrículas:", error);
      toast.error(
        "Error al cargar las matrículas. Inténtalo de nuevo más tarde."
      );
    }
  };

  const cargarArrendatariosDisponibles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3006/arrendatarios-codeudores"
      );
      setArrendatariosDisponibles(response.data);
    } catch (error) {
      console.error("Error al cargar los arrendatarios:", error);
      toast.error(
        "Error al cargar los arrendatarios. Inténtalo de nuevo más tarde."
      );
    }
  };

  const handleConfirmSave = () => {
    setShowSaveModal(true); // Mostrar modal de confirmación antes de guardar
  };

  const handleConfirmCancel = () => {
    reset();
    window.location.href = "/Carrendatario";
    setShowCancelModal(true); // Mostrar modal de confirmación antes de cancelar
  };

 
  const handleSubmitForm = async () => {
    // Aquí puedes enviar los datos del formulario al backend
    try {
      if (location.search !== "") {
        const response = await axios.post(
          "http://localhost:3006/contratoarrendamiento",
          {
            IdArrendatario: selectedIdArrendatario,
            IdInmueble: inmuebleData.IdInmueble,
            FechaInicioContrato: currentDate,
            FechaPagoFija: currentDate,
            FechaFinContrato: watch("FechaFinContrato"),
            EstadoContrato: "Vigente",
            ValorDeposito: watch("ValorDeposito"),
          }
        );
        console.log("Respuesta del servidor:", response.data);
        toast.success("Contrato de arrendamiento creado correctamente");
        console.log(selectedIdInmueble);
        reset();
        // Después de guardar los datos, redirigir a la página de Carrendatario
        window.location.href = "/Carrendatario";
      } else {
        const response = await axios.post(
          "http://localhost:3006/contratoarrendamiento",
          {
            IdArrendatario: selectedIdArrendatario,
            IdInmueble: selectedIdInmueble,
            FechaInicioContrato: currentDate,
            FechaPagoFija: currentDate,
            FechaFinContrato: watch("FechaFinContrato"),
            EstadoContrato: "Vigente",
            ValorDeposito: watch("ValorDeposito"),
          }
        );
        console.log("Respuesta del servidor:", response.data);
        toast.success("Contrato de arrendamiento creado correctamente");
        reset();
        // Después de guardar los datos, redirigir a la página de Carrendatario
        window.location.href = "/Carrendatario";
      }
    } catch (error) {
      console.error("Error al guardar el contrato:", error);
      toast.error("Error al guardar el contrato. Inténtalo de nuevo.");
    }
  };

  const handleMatriculaChange = async (matricula) => {
    setSelectedMatricula(matricula);
    try {
      const response = await axios.get(
        `http://localhost:3006/propietarios-inmuebles`
      );
      const inmueble = response.data.find(
        (prop) => prop.NoMatricula === matricula
      );
      if (inmueble) {
        setSelectedTipoInmueble(inmueble.TipoInmueble);
        setSelectedIdInmueble(inmueble.IdInmueble);

        // Calcular el valor del depósito como la mitad del valor del inmueble
        const mitadValorInmueble = inmueble.ValorInmueble / 2;
        setValorDeposito(mitadValorInmueble);

        // Establecer el valor del depósito en el campo del formulario utilizando setValue
        setValue("ValorDeposito", mitadValorInmueble);
      } else {
        setSelectedTipoInmueble("");
        setSelectedIdInmueble(null);
      }
    } catch (error) {
      console.error("Error al obtener el tipo de inmueble:", error);
      toast.error("Error al obtener el tipo de inmueble. Inténtalo de nuevo.");
    }
  };

  const handleSelectArrendatario = (arrendatario) => {
    const selected = arrendatariosDisponibles.find(
      (item) => item.NombreArrendatario === arrendatario
    );
    setSelectedArrendatario(selected);
    setSelectedCodeudor(selected.NombreCodeudor);
    setSelectedIdArrendatario(selected.IdArrendatario);
    setShowArrendatarioModal(false);
  };

  return (
    <div className="contener-home contener-rpropietario">
      <h2>Generación Nuevo Contrato</h2>
      <div className="container">
        <Form
          className="form-propietario"
          onSubmit={handleSubmit(handleConfirmSave)}
        >
          <Form.Group controlId="Matricula" className="mb-3">
            <Form.Label>Número de Matrícula:</Form.Label>
            {location.search !== "" && (
              <>
                <Form.Control
                  type="text"
                  value={inmuebleData.NoMatricula}
                  readOnly
                  disabled={!selectedTipoInmueble}
                />
              </>
            )}
            {location.search == "" && (
              <>
                <InputGroup>
                  <Form.Select
                    value={selectedMatricula}
                    onChange={(e) => handleMatriculaChange(e.target.value)}
                    onClick={() => setShowMatriculaModal(true)}
                  >
                    <option value="">Seleccionar Matrícula</option>
                    {matriculasDisponibles.map((matricula, index) => (
                      <option key={index} value={matricula}>
                        {matricula}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </>
            )}
          </Form.Group>

          <Form.Group controlId="TipoInmueble" className="mb-3">
            <Form.Label>Tipo de Inmueble:</Form.Label>

            {location.search !== "" && (
              <>
                <Form.Control
                  type="text"
                  value={inmuebleData.Tipo}
                  readOnly
                  disabled={!selectedTipoInmueble}
                />
              </>
            )}
            {location.search == "" && (
              <>
                <Form.Control
                  type="text"
                  value={selectedTipoInmueble}
                  readOnly
                  disabled={!selectedTipoInmueble}
                />
              </>
            )}
          </Form.Group>

          <Form.Group controlId="Arrendatario" className="mb-3">
            <Form.Label>Nombre Arrendatario:</Form.Label>
            <InputGroup>
              <Form.Select
                value={
                  selectedArrendatario
                    ? selectedArrendatario.NombreArrendatario
                    : ""
                }
                onChange={(e) => setSelectedArrendatario(e.target.value)}
                onClick={() => setShowArrendatarioModal(true)}
              >
                <option value="">Seleccionar Arrendatario</option>
                {arrendatariosDisponibles.map((arrendatario, index) => (
                  <option key={index} value={arrendatario.NombreArrendatario}>
                    {arrendatario.NombreArrendatario}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="Codeudor" className="mb-3">
            <Form.Label>Nombre Codeudor Asociado:</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={selectedCodeudor ? selectedCodeudor : ""}
                readOnly
                disabled={!selectedArrendatario}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="FechaInicioContrato">
            <Form.Label>Fecha Inicio Contrato:</Form.Label>
            <Form.Control
              value={currentDate}
              disabled
              type="date"
              {...register("FechaInicioContrato")}
            />
          </Form.Group>

          <Form.Group controlId="FechaFinContrato">
            <Form.Label>Fecha Fin Contrato:</Form.Label>
            <Form.Control type="date" {...register("FechaFinContrato")} />
          </Form.Group>

          <Form.Group controlId="FechaPagoFija">
            <Form.Label>Fecha Pago Fija:</Form.Label>
            <Form.Control
              type="date"
              value={currentDate}
              disabled
              {...register("FechaPagoFija")}
            />
          </Form.Group>

          <Form.Group controlId="documentoidentidad">
            <Form.Label>Valor Deposito:</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="number" {...register("ValorDeposito")} />
            </InputGroup>
          </Form.Group>
        </Form>
        <div className="contener-buttons d-flex justify-content-center">
          <div className="save_deleter">
            <Button
              type="button"
              variant="success m-2"
              onClick={handleConfirmSave}
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
      </div>

      {/* Modal para seleccionar la matrícula */}
      <Modal
        show={showMatriculaModal}
        onHide={() => setShowMatriculaModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Matrícula</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {matriculasDisponibles.map((matricula, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleMatriculaChange(matricula)}
              >
                {matricula}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

      <Modal
        show={showArrendatarioModal}
        onHide={() => setShowArrendatarioModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Arrendatario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {arrendatariosDisponibles.map((arrendatario, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() =>
                  handleSelectArrendatario(arrendatario.NombreArrendatario)
                }
              >
                {arrendatario.NombreArrendatario}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

      {/* Modales de confirmación */}
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
          <Button variant="primary" onClick={handleSubmit(handleSubmitForm)}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>

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
