import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearInmueble } from "../../Hooks/RegisterInmueble";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const RInmuebleB = () => {

  const notify = () => toast.success("Se Registro correctamente", {
    theme: "dark"
  });
    
  const falla = () => toast.error("Hubo un error al ingresar los datos , itente nuevamente", {
    theme: "colored"
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmitRegistro = async (data) => {
    data.Tipo = "Bodega";
    try {
      await crearInmueble(data);
      notify()
      reset()
    } catch (error) {
      if (error.message.includes("correo ya registrado")) {
        alert("El correo ya está registrado");
      } else {
        falla()
        console.error("Error al crear usuario:", error);
        throw error; // Re-lanza el error para que pueda ser manejado en el componente
      }
    }
  }

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
            <Form className="form-propietario row" style={{ marginTop: "0" }}
             onSubmit={handleSubmit(onsubmitRegistro)}
             method="post">
          <div className="col-md-6">
              <Form.Group controlId="formTipoInmueble">
                <Form.Label>Tipo Inmueble</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleSelectChange}
                >
                  <option value="" selected disabled hidden >Bodega</option>
                  <option value="RInmuebleA">Apartamento</option>
                  <option value="RinmuebleO">Oficina</option>
                  <option value="RInmuebleL">Local</option>
                  <option value="RInmuebleC">Casa</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formNoMatricula">
                <Form.Label>No. Matricula</Form.Label>
                <Form.Control required {...register("Nmatricula")} type="number" />
              </Form.Group>

              <Form.Group controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control required {...register("Direccion")} type="text" />
              </Form.Group>

              <Form.Group controlId="formCiudad">
                <Form.Label>Ciudad</Form.Label>
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

            
          </div>

          <div className="col-md-6">
            <Form.Group controlId="formEstrato">
              <Form.Label>Estrato</Form.Label>
              <Form.Control required {...register("Estrato")} type="number" />
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
                <Form.Control required {...register("aseguraiento")} type="date" />
              </Form.Group>

              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>No. Identidad Propietario</Form.Label>
                <Form.Control  type="number" />
              </Form.Group>

              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>Descripción</Form.Label>
                <Form.Control required {...register("Descripcion")} as="textarea" rows={2} style={{ width: '100%', resize: 'none' }} />
              </Form.Group>

      
            <div className="col-md-12">
              <div className="save_deleter d-flex flex-row justify-between justify-content-end">
                <Button type="submit" variant="success m-2">
                  <FontAwesomeIcon icon={faSave} />
                  <span className="text_button ms-2">Guardar</span>
                </Button>
                <Button type="reset" variant="danger m-2">
                  <FontAwesomeIcon icon={faTimes} />
                  <span className="text_button ms-2">Cancelar</span>
                </Button>
              </div>
            </div>
          </div>
          </Form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
