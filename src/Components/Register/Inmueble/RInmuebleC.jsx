import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearInmueble } from "../../Hooks/RegisterInmueble";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const RInmuebleC = () => {
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
    data.Tipo = "Casa";
    try {
      await crearInmueble(data);
      notify()
      reset()
    } catch (error) {
      if (error.message.includes("correo ya registrado")) {
        alert("El correo ya está registrado");
      } else {
        console.error("Error al crear usuario:", error);
        falla()
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
      <h2>Registro Inmueble</h2>
      <div className="container">
        <div className="row">
            <Form className="form-propietario row" style={{ marginTop: "0" }} onSubmit={handleSubmit(onsubmitRegistro)}
             method="post">
          <div className="col-md-6">
              <Form.Group controlId="formTipoInmueble">
                <Form.Label>Tipo Inmueble</Form.Label>
                <Form.Select className="formSelect"
                  aria-label="Default select example"
                  onChange={handleSelectChange}
                >
                
                  <option value="RInmuebleA">Apartamento</option>
                  <option value="RinmuebleO">Oficina</option>
                  <option value="RInmuebleB">Bodega</option>
                  <option value="RInmuebleL">Local</option>
                  <option selected disabled hidden value="RInmuebleC">Casa</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formNoMatricula">
                <Form.Label>No. Matricula</Form.Label>
                <Form.Control {...register ("Nmatricula")} type="number" />
              </Form.Group>

              <Form.Group controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control {...register ("Direccion")} type="text" />
              </Form.Group>

              <Form.Group controlId="formCiudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control {...register ("Ciudad")} type="text" />
              </Form.Group>

              <Form.Group controlId="formBarrio">
                <Form.Label>Barrio</Form.Label>
                <Form.Control {...register ("Barrio")} type="text" />
              </Form.Group>

              <Form.Group controlId="formNoBanos">
                <Form.Label>Valor</Form.Label>
                <Form.Control {...register ("ValorIn")} type="number" />
              </Form.Group>
              
          </div>

          <div className="col-md-6">
            <Form.Group controlId="formEstrato">
              <Form.Label>Estrato</Form.Label>
              <Form.Control {...register ("Estrato")} type="number" />
            </Form.Group>

            <Form.Group controlId="formNoBanos">
              <Form.Label>No. Baños</Form.Label>
              <Form.Control {...register ("Nbanos")} type="number" />
            </Form.Group>

            <Form.Group controlId="formNoHabitaciones">
              <Form.Label>Servicios Publicos</Form.Label>
              <Form.Control {...register ("Spublicos")} type="text" />
            </Form.Group>

              <Form.Group controlId="formNoNiveles">
                <Form.Label>Aseguramiento</Form.Label>
                <Form.Control {...register ("aseguramiento")} type="date" />
              </Form.Group>

              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>No. Identidad Propietario</Form.Label>
                <Form.Control  type="number" />
              </Form.Group>
              
              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>Descripción</Form.Label>
                <Form.Control {...register ("Descripcion")} as="textarea" rows={2} style={{ width: '100%' , resize:'none'}}/>
              </Form.Group>
          </div>
          <div className="col-md-12">
              <div className="save_deleter">
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
            </Form>
            <ToastContainer />
        </div>
      </div>
    </div>
  );
};
