/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearInmueble } from "../../Hooks/RegisterInmueble";
import { toast } from "react-toastify";
import { useState } from "react";

export const RInmuebleA = () => {
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const Confirmacion = () => {
    setShowConfirmation(true);
  };

  const Delete = () => {
    setShowDelete(true);
  };

  const confirmSeccion = () => {
    window.location.href = "/Inmueble";
  };

  return (
    <div className="contener-home contener-rpropietario">
      <h2>Registro Inmueble</h2>
      <div className="container">
        <div className="row">
          <Form
            className="form-propietario row"
            style={{ marginTop: "0" }}
            onSubmit={handleSubmit(onsubmitRegistro)}
            method="post"
          >
            <div className="col-md-6">
              <Form.Group
                controlId="formTipoInmueble"
                className="col col-md.auto"
              >
                <Form.Label>Tipo Inmueble</Form.Label>
                <Form.Select
                  className="formSelect"
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
                <Form.Control {...register("Nmatricula")} type="number" />
              </Form.Group>

              <Form.Group controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control {...register("Direccion")} type="text" />
              </Form.Group>

              <Form.Group controlId="formCiudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control {...register("Ciudad")} type="text" />
              </Form.Group>

              <Form.Group controlId="formBarrio">
                <Form.Label>Barrio</Form.Label>
                <Form.Control {...register("Barrio")} type="text" />
              </Form.Group>

              <Form.Group controlId="formEstrato">
                <Form.Label>Estrato</Form.Label>
                <Form.Control {...register("Estrato")} type="number" />
              </Form.Group>

              <Form.Group controlId="formNoBanos">
                <Form.Label>No. Baños</Form.Label>
                <Form.Control {...register("Nbanos")} type="number" />
              </Form.Group>

              <Form.Group controlId="formNoBanos">
                <Form.Label>Valor</Form.Label>
                <Form.Control {...register("ValorIn")} type="number" />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group controlId="formNoHabitaciones">
                <Form.Label>No. Habitaciones</Form.Label>
                <Form.Control {...register("NHabita")} type="number" />
              </Form.Group>

              <Form.Group controlId="formNoNiveles">
                <Form.Label>No. Niveles</Form.Label>
                <Form.Control {...register("NoNiveles")} type="number" />
              </Form.Group>

              <Form.Group controlId="formTerraza">
                <Form.Label>Terraza</Form.Label>
                <Form.Control {...register("NoTerraza")} type="number" />
              </Form.Group>

              <Form.Group controlId="formServiciosPublicos">
                <Form.Label>Servicios Publicos</Form.Label>
                <Form.Control {...register("Spublicos")} type="text" />
              </Form.Group>

              <Form.Group controlId="formAseguramiento">
                <Form.Label>Aseguramiento</Form.Label>
                <Form.Control {...register("aseguramiento")} type="date" />
              </Form.Group>

              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>No. Identidad Propietario</Form.Label>
                <Form.Control type="number" />
              </Form.Group>

              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  {...register("Descripcion")}
                  as="textarea"
                  rows={2}
                  style={{ width: "100%", resize: "none" }}
                />
              </Form.Group>
            </div>
            {/*Botones para guardar y cancelar*/}
            <div className="col-md-12">
              <div className="save_deleter">
                <Button
                type="button"
                  variant="success m-2"
                  onClick={Confirmacion}
                >
                  <FontAwesomeIcon icon={faSave} />
                  <span className="text_button ms-2">Guardar</span>
                </Button>
                <Button type="button" variant="danger m-2" onClick={Delete}>
                  <FontAwesomeIcon icon={faTimes} />
                  <span className="text_button ms-2">Cancelar</span>
                </Button>
              </div>
            </div>
               {/* Modal confirmacion si */}
               <Modal
              show={showConfirmation}
              onHide={() => setShowConfirmation(false)}
            >
              <Modal.Header closeButton={false}>
                <Modal.Title>Confirmación</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de que los datos son correctos?
              </Modal.Body>
              <Modal.Footer>
                <Button
                type="button"
                  variant="secondary"
                  onClick={() => setShowConfirmation(false)}
                >
                  No
                </Button>
                <Button variant="danger" type="submit">
                  Sí
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal Cancelacion si */}
            <Modal show={showDelete} onHide={() => setShowDelete(false)}>
              <Modal.Header closeButton={false}>
                <Modal.Title>Confirmación</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de que deseas cancelar la operacion?
              </Modal.Body>
              <Modal.Footer>
                <Button
                type="button"
                  variant="secondary"
                  onClick={() => setShowDelete(false)}
                >
                  No
                </Button>
                <Button variant="danger" onClick={confirmSeccion}>Sí</Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </div>
      </div>
    </div>
  );
};
