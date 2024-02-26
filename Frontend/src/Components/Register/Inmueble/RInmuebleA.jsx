import  { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearInmueble } from "../../Hooks/RegisterInmueble";
import { toast } from "react-toastify";

export const RInmuebleA = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const notify = () =>
    toast.success("Se Registró correctamente", {
      theme: "dark",
    });

  const falla = () =>
    toast.error("Hubo un error al ingresar los datos, intenta nuevamente", {
      theme: "colored",
    });

  const { register, handleSubmit, reset } = useForm();

  const onsubmitRegistro = async (data) => {
    data.Tipo = "Apartamento";
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
                <Form.Label>No. Matricula</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("Nmatricula")} type="number" />
              </Form.Group>

              <Form.Group controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("Direccion")} type="text" />
              </Form.Group>

              <Form.Group controlId="formCiudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("Ciudad")} type="text" />
              </Form.Group>

              <Form.Group controlId="formBarrio">
                <Form.Label>Barrio</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("Barrio")} type="text" />
              </Form.Group>

              <Form.Group controlId="formEstrato">
                <Form.Label>Estrato</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("Estrato")} type="number" />
              </Form.Group>

              <Form.Group controlId="formNoBanos">
                <Form.Label>No. Baños</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("Nbanos")} type="number" />
              </Form.Group>

              <Form.Group controlId="formNoBanos">
                <Form.Label>Valor</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("ValorIn")} type="number" />
              </Form.Group>

              <Form.Group controlId="formNoHabitaciones">
                <Form.Label>No. Habitaciones</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("NHabita")} type="number" />
              </Form.Group>

              <Form.Group controlId="formNoNiveles">
                <Form.Label>No. Niveles</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("NoNiveles")} type="number" />
              </Form.Group>

              <Form.Group controlId="formTerraza">
                <Form.Label>Terraza</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("NoTerraza")} type="number" />
              </Form.Group>

              <Form.Group controlId="formServiciosPublicos">
                <Form.Label>Servicios Publicos</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("Spublicos")} type="text" />
              </Form.Group>

              <Form.Group controlId="formAseguramiento">
                <Form.Label>Aseguramiento</Form.Label>
                <Form.Control  className="InputsRegistros" {...register("aseguramiento")} type="date" />
              </Form.Group>

              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>No. Identidad Propietario</Form.Label>
                <Form.Control  className="InputsRegistros" type="number" />
              </Form.Group>

              </div>
              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>Descripción</Form.Label>
                <Form.Control  className="InputsRegistros"
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
          </Form>
      </div>
    </div>
  );
};
