/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import { crearInmueble } from "../../Hooks/RegisterInmueble";

export const RInmuebleA = () => {
  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption) {
      window.location.assign(`/${selectedOption}`);
    }
  };
  return (
    <div className="contener-home contener-rpropietario">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Form className="form-propietario" style={{ marginTop: "0" }}>
              <Form.Group controlId="formTipoInmueble" className="col col-md.auto">
                <Form.Label>Tipo Inmueble</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleSelectChange}
                >
                  <option value="">Selecciona El tipo de Inmueble</option>
                  <option value="RInmuebleA">Apartamento</option>
                  <option value="RinmuebleO">Oficina</option>
                  <option value="RInmuebleB">Bodega</option>
                  <option value="RInmuebleL">Local</option>
                  <option value="RInmuebleC">Casa</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formNoMatricula">
                <Form.Label>No. Matricula</Form.Label>
                <Form.Control type="number" />
              </Form.Group>

              <Form.Group controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group controlId="formCiudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group controlId="formBarrio">
                <Form.Label>Barrio</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group controlId="formEstrato">
  0              <Form.Label>Estrato</Form.Label>
                <Form.Control type="number" />
              </Form.Group>

              <Form.Group controlId="formNoBanos">
                <Form.Label>No. Baños</Form.Label>
                <Form.Control type="number" />
              </Form.Group>

              <Form.Group controlId="formNoBanos">
                <Form.Label>Valor</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
            </Form>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="formNoHabitaciones">
              <Form.Label>No. Habitaciones</Form.Label>
              <Form.Control type="number" />
            </Form.Group>

            <Form className="form-porpietario">
              <Form.Group controlId="formNoNiveles">
                <Form.Label>No. Niveles</Form.Label>
                <Form.Control type="number" />
              </Form.Group>

              <Form.Group controlId="formTerraza">
                <Form.Label>Terraza</Form.Label>
                <Form.Control type="number" />
              </Form.Group>

              <Form.Group controlId="formServiciosPublicos">
                <Form.Label>Servicios Publicos</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group controlId="formAseguramiento">
                <Form.Label>Aseguramiento</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>No. Identidad Propietario</Form.Label>
                <Form.Control type="number" />
              </Form.Group>

              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={2} style={{ width: '100%' , resize:'none'}}/>
              </Form.Group>
            </Form>
            <div className="col-md-12">
              <div className="save_deleter d-flex flex-row justify-between justify-content-end">
                <Button variant="success m-2">
                  <FontAwesomeIcon icon={faSave} />
                  <span className="text_button ms-2">Guardar</span>
                </Button>
                <Button variant="danger m-2">
                  <FontAwesomeIcon icon={faTimes} />
                  <span className="text_button ms-2">Cancelar</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
