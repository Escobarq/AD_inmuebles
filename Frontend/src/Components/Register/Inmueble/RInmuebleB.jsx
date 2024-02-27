import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearInmueble } from "../../Hooks/RegisterInmueble";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export const RInmuebleB = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const notify = () =>
    toast.success("Se Registro correctamente", {
      theme: "dark",
    });

  const falla = () =>
    toast.error("Hubo un error al ingresar los datos , itente nuevamente", {
      theme: "colored",
    });

  const { register, handleSubmit, reset } = useForm();

  const onsubmitRegistro = async (data) => {
    data.Tipo = "Bodega";
    try {
      await crearInmueble(data);
      notify();
      reset();
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
  return (
    <div className="contener-home contener-rpropietario">
      <h2>Registro Inmueble </h2>
      <div className="container">
      <Form className="form-propietario" onSubmit={handleSubmit(onsubmitRegistro)}>
       
           
              <Form.Group controlId="formTipoInmueble">
                <Form.Label>Tipo Inmueble</Form.Label>
                <Form.Select
                  className="formSelect"
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
                <Form.Label>No. Matricula</Form.Label>
                <Form.Control
                  required
                  {...register("Nmatricula")}
                  type="number"
                />
              </Form.Group>

              <Form.Group controlId="formDireccion">
                <Form.Label>Dirección:</Form.Label>
                <Form.Control required {...register("Direccion")} type="text" />
              </Form.Group>

              <Form.Group controlId="formCiudad">
                <Form.Label>Ciudad:</Form.Label>
                <Form.Control required {...register("Ciudad")} type="text" />
              </Form.Group>

              <Form.Group controlId="formBarrio">
                <Form.Label>Barrio</Form.Label>
                <Form.Control required {...register("Barrio")} type="text" />
              </Form.Group>

              <Form.Group controlId="formNoBanos">
                <Form.Label>Valor</Form.Label>
                <Form.Control required {...register("ValorIn")} type="number" />
              </Form.Group>

              </Form>
            </div>

            <div className="col-md-6">
              <Form.Group controlId="formEstrato">
                <Form.Label>Estrato</Form.Label>
                <Form.Select
                  className="formSelect"
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
                <Form.Control required {...register("Nbanos")} type="number" />
              </Form.Group>

              <Form.Group controlId="formNoHabitaciones">
                <Form.Label>Servicios Publicos</Form.Label>
                <Form.Control required {...register("Spublicos")} type="text" />
              </Form.Group>

              <Form.Group controlId="formNoNiveles">
                <Form.Label>Aseguramiento</Form.Label>
                <Form.Control
                  required
                  {...register("aseguraiento")}
                  type="date"
                />
              </Form.Group>

              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>No. Identidad Propietario</Form.Label>
                <Form.Control type="number" />
              </Form.Group>

              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  required
                  {...register("Descripcion")}
                  as="textarea"
                  rows={2}
                  style={{ width: "100%", resize: "none" }}
                />
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
          
        </div>
      
  );
};
