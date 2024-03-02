import { Form, Button, Modal, InputGroup, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

export const Contrato = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPropietarioModal, setShowPropietarioModal] = useState(false);
  const [propietariosDisponibles, setPropietariosDisponibles] = useState([]);
  const [selectedPropietario, setSelectedPropietario] = useState("");
  const [showArrendatarioModal, setShowArrendatarioModal] = useState(false);
  const [arrendatariosDisponibles, setArrendatariosDisponibles] = useState([]);
  const [selectedArrendatario, setSelectedArrendatario] = useState("");
  const [selectedCodeudor, setSelectedCodeudor] = useState("");
  const { register, handleSubmit, reset } = useForm({ mode: "onChange" });

  useEffect(() => {
    cargarPropietariosDisponibles();
    cargarArrendatariosDisponibles();
  }, []);

  const cargarPropietariosDisponibles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3006/propietarios-inmuebles"
      );
      const propietarios = response.data.map((propietario) => ({
        ...propietario,
        tipoInmuebleAsociado:
          propietario.TipoInmueble || "No tiene inmueble asociado",
        numeroMatricula:
          propietario.NoMatricula || "No tiene número de matrícula",
      }));
      setPropietariosDisponibles(propietarios);
    } catch (error) {
      console.error("Error al cargar los propietarios:", error);
      toast.error(
        "Error al cargar los propietarios. Inténtalo de nuevo más tarde."
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

  const handleSelectArrendatario = (arrendatario) => {
    const selected = arrendatariosDisponibles.find(
      (item) => item.NombreArrendatario === arrendatario
    );
    setSelectedArrendatario(selected);
    setSelectedCodeudor(selected.NombreCodeudor);
    setShowArrendatarioModal(false);
  };

  const handleSelectPropietario = (propietario) => {
    const selected = propietariosDisponibles.find(
      (item) => item.NombreCompleto === propietario
    );
    setSelectedPropietario(selected);
    setShowPropietarioModal(false);
  };

  const handleConfirmSave = () => {
    setShowSaveModal(false);
    window.location.href = "/Carrendatario";
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    window.location.href = "/Carrendatario";
    reset();
  };

  return (
    <div className="contener-home contener-rpropietario">
      <h2>Generacion Nuevo Contrato</h2>
      <div className="container">
        <Form className="form-propietario" onSubmit="">
          <Form.Group controlId="Propietario" className="mb-3">
            <Form.Label>Nombre Propietario:</Form.Label>
            <InputGroup>
              <Form.Select
                value={
                  selectedPropietario ? selectedPropietario.NombreCompleto : ""
                }
                onChange={(e) => setSelectedPropietario(e.target.value)}
                onClick={() => setShowPropietarioModal(true)}
              >
                <option value="">Seleccionar Propietario</option>
                {propietariosDisponibles.map((propietario, index) => (
                  <option key={index} value={propietario.NombreCompleto}>
                    {propietario.NombreCompleto}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="tipoInmueble" className="mb-3">
            <Form.Label>Tipo de Inmueble:</Form.Label>
            <Form.Control
              type="text"
              value={
                selectedPropietario
                  ? selectedPropietario.tipoInmuebleAsociado
                  : ""
              }
              readOnly
              disabled={!selectedPropietario}
            />
          </Form.Group>

          <Form.Group controlId="numeroMatricula" className="mb-3">
            <Form.Label>Número de Matrícula:</Form.Label>
            <Form.Control
              type="text"
              value={
                selectedPropietario ? selectedPropietario.numeroMatricula : ""
              }
              readOnly
              disabled={!selectedPropietario}
            />
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
            <Form.Control type="date" {...register("FechaInicioContrato")} />
          </Form.Group>

          <Form.Group controlId="documentoidentidad">
            <Form.Label>Fecha Final Contrato:</Form.Label>
            <Form.Control type="date" {...register("FechaFinalContrato")} />
          </Form.Group>

          <Form.Group controlId="TipoDocumento">
            <Form.Label>Estado Contrato:</Form.Label>
            <Form.Control as="select" {...register("EstadoContrato")}>
              <option value={"Vigente"}>Vigente</option>
              <option value={"Finalizado"}>Finalizado</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="documentoidentidad">
            <Form.Label>Valor Deposito:</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="number" {...register("FechaFinalContrato")} />
            </InputGroup>
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

      {/* Modales Mostrar info propietario*/}
      <Modal
        show={showPropietarioModal}
        onHide={() => setShowPropietarioModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Propietario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {propietariosDisponibles.map((propietario, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() =>
                  handleSelectPropietario(propietario.NombreCompleto)
                }
              >
                {propietario.NombreCompleto}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
       {/* Modales Mostrar info arrendatario*/}
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
          <Button variant="primary" onClick={handleConfirmSave}>
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
