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
    const [selectedPropietario, setSelectedPropietario] = useState('');
    const { register, handleSubmit, reset } = useForm({ mode: "onChange" });

    useEffect(() => {
        cargarPropietariosDisponibles();
    }, []);

    const cargarPropietariosDisponibles = async () => {
        try {
            const response = await axios.get("http://localhost:3006/propietarios-inmuebles");
            const propietarios = response.data.map(propietario => ({
                ...propietario,
                tipoInmuebleAsociado: propietario.TipoInmueble || "No tiene inmueble asociado"
            }));
            setPropietariosDisponibles(propietarios);
        } catch (error) {
            console.error("Error al cargar los propietarios:", error);
            toast.error("Error al cargar los propietarios. Inténtalo de nuevo más tarde.");
        }
    };


    const handleSelectPropietario = (propietario) => {
        const selected = propietariosDisponibles.find(item => item.NombreCompleto === propietario);
        console.log("Propietario seleccionado:", selected); // Verificar qué se ha seleccionado
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
            <h2>Generacion Nuevo  Contrato</h2>
            <div className="container">
                <Form
                    className="form-propietario"
                    onSubmit=""
                >
                    <Form.Group controlId="Propietario" className="mb-3">
                        <Form.Label>Nombre Propietario:</Form.Label>
                        <InputGroup>
                            <Form.Select
                                value={selectedPropietario ? selectedPropietario.NombreCompleto : ""}
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

                    <Form.Group controlId="Propietario" className="mb-3">
                        <Form.Label>Nombre Codeudor:</Form.Label>
                        <InputGroup>
                            <Form.Select>
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="Propietario" className="mb-3">
                        <Form.Label>Nombre Arrendatario:</Form.Label>
                        <InputGroup>
                            <Form.Select>
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="inmueble" className="mb-3">
                        <Form.Label>Inmueble:</Form.Label>
                        <Form.Control
                            type="text"
                            value={selectedPropietario ? selectedPropietario.tipoInmuebleAsociado : ''}
                            readOnly // Hacemos el campo de solo lectura para que no se pueda editar manualmente
                            {...register("inmueble")} // Registramos el campo en el formulario
                            disabled={!selectedPropietario} // Deshabilita el campo si no se ha seleccionado un propietario
                        />
                    </Form.Group>



                    <Form.Group controlId="FechaInicioContrato">
                        <Form.Label>Fecha Inicio Contrato:</Form.Label>
                        <Form.Control
                            type="date"
                            {...register("FechaInicioContrato")}
                        />
                    </Form.Group>

                    <Form.Group controlId="documentoidentidad">
                        <Form.Label>Fecha Final Contrato:</Form.Label>
                        <Form.Control
                            type="date"
                            {...register("FechaFinalContrato")}
                        />
                    </Form.Group>


                    <Form.Group controlId="TipoDocumento">
                        <Form.Label>Estado Contrato:</Form.Label>
                        <Form.Control
                            as="select"
                            {...register("EstadoContrato")}
                        >
                            <option value={'Vigente'}>Vigente</option>
                            <option value={'Finalizado'}>Finalizado</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="documentoidentidad">
                        <Form.Label>Valor Deposito:</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                type="number"
                                {...register("FechaFinalContrato")}
                            />
                        </InputGroup>
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
            {/* Aqui llamo propietarios */}
            <Modal show={showPropietarioModal} onHide={() => setShowPropietarioModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Propietario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {propietariosDisponibles.map((propietario, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                onClick={() => handleSelectPropietario(propietario.NombreCompleto)}
                            >
                                {propietario.NombreCompleto}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>
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
