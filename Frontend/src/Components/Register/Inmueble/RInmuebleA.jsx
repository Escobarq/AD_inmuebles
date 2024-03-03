import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Table, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearInmueble } from "../../Hooks/RegisterInmueble";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const RInmuebleA = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [infopropietario, setinfopropietario] = useState([]);
  const [NoResult, setNoResult] = useState(false);
  const [mostrarModalA, setMostrarModalA] = useState(false);

  const notify = () =>
    toast.success("Se Registró correctamente", {
      theme: "dark",
    });

  const falla = () =>
    toast.error("Hubo un error al ingresar los datos, intenta nuevamente", {
      theme: "colored",
    });

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const NITPropietario = localStorage.getItem("NITPropie");
    fetchData(NITPropietario);
  }, []);

  const fetchData = async (NITPropietario) => {
    if (NITPropietario) {
      setNoResult(false);
      try {
        const response = await fetch(
          `http://localhost:3006/Vpropietarios?Cedula=${NITPropietario}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setinfopropietario(data[0]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setNoResult(true);
      try {
        const response = await fetch(`http://localhost:3006/Vpropietarios?`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setinfopropietario(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };

  const handleCloseModalA = () => {
    setMostrarModalA(false);
  };
  const handleMostrarAClick = async () => {
    setMostrarModalA(true);
  };
  

  const createrowA = (Propietarios) => {
    let NITPropietario =  Propietarios.DocumentoIdentidad
    return (
      <tr
      onClick={() => fetchData(NITPropietario)} 
        key={Propietarios.IdPropietario}>
        <td>{Propietarios.TipoDocumento}</td>
        <td>{Propietarios.DocumentoIdentidad}</td>
        <td>{Propietarios.NombreCompleto}</td>
        <td>{Propietarios.Telefono}</td>
        <td>{Propietarios.Correo}</td>
      </tr>
    );
  };

  const onsubmitRegistro = async (data) => {
    try {
      const url = data.IdInmueble
        ? `http://localhost:3006/Reinmueble/${data.IdInmueble}`
        : "http://localhost:3006/Reinmueble";
  
      const method = data.IdInmueble ? "PUT" : "POST";
  
      const dataToSend = {
        ...data,
        Tipo: "Apartamento", // Esto puede variar según tu lógica
      };
  
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        notify();
        reset();
        localStorage.removeItem("NITPropie");
        window.location.href = "/Inmueble";
      } else {
        falla();
      }
    } catch (error) {
      if (error.message.includes("correo ya registrado")) {
        alert("El correo ya está registrado");
      } else {
        falla();
        console.error("Error al enviar datos al servidor:", error);
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
    localStorage.removeItem("NITPropie");
    window.location.href = "/Inmueble";
    setShowCancelModal(false); // Cierra el modal
  };

  
  // Estado para almacenar los datos del codeudor
  const [inmuebledata, setinmuebledata] = useState({
    NoMatricula: "",
    Direccion:"" ,
    Estrato: "",
    Ciudad:"" ,
    Barrio: "",
    Tipo:"" ,
    NoNiveles: "",
    NoBanos: "",
    ServiciosPublicos: "",
    NoHabitaciones:"" ,
    Estado:"" ,
    NoTerraza: "",
    AreaConstruidaM2: "",
    Aseguramiento: "",
    ValorInmueble:"" ,
    Descripcion: "",
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    // Si hay parámetros de consulta en la URL, significa que se está editando un codeudor existente
    if (location.search) {
      setinmuebledata({
        IdInmueble: searchParams.get("IdInmueble"),
        NoMatricula: searchParams.get("NoMatricula"),
        Direccion: searchParams.get("Direccion"),
        Estrato: searchParams.get("Estrato"),
        Ciudad: searchParams.get("Ciudad"),
        Barrio: searchParams.get("Barrio"),
        Tipo: searchParams.get("Tipo"),
        NoNiveles: searchParams.get("NoNiveles"),
        NoBanos: searchParams.get("NoBanos"),
        ServiciosPublicos: searchParams.get("ServiciosPublicos"),
        NoHabitaciones: searchParams.get("NoHabitaciones"),
        Estado: searchParams.get("Estado"),
        NoTerraza: searchParams.get("NoTerraza"),
        AreaConstruidaM2: searchParams.get("AreaConstruidaM2"),
        Aseguramiento: searchParams.get("Aseguramiento"),
        ValorInmueble: searchParams.get("ValorInmueble"),
        Descripcion: searchParams.get("Descripcion"),
      });
    } else {
      // Si no hay parámetros de consulta en la URL, significa que se está creando un nuevo codeudor
      setinmuebledata({
        NoMatricula:"",
        Direccion:"",
        Estrato:"",
        Ciudad:"",
        Barrio:"",
        Tipo:"",
        NoNiveles:"",
        NoBanos:"",
        ServiciosPublicos:"",
        NoHabitaciones:"",
        Estado:"",
        NoTerraza:"",
        AreaConstruidaM2:"",
        Aseguramiento:"",
        ValorInmueble:"",
        Descripcion:"",
      });
    }
  }, [location.search]);

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
              <Form.Label>No. Matricula:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Nmatricula")}
                type="number"
              />
            </Form.Group>

            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Direccion")}
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="formCiudad">
              <Form.Label>Ciudad:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Ciudad")}
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="formBarrio">
              <Form.Label>Barrio:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Barrio")}
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="formEstrato">
              <Form.Label>Estrato:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Estrato")}
                type="number"
              />
            </Form.Group>

            <Form.Group controlId="formNoBanos">
              <Form.Label>No. Baños:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Nbanos")}
                type="number"
              />
            </Form.Group>

            <Form.Group controlId="formNoBanos">
              <Form.Label>Valor:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("ValorIn")}
                type="number"
              />
            </Form.Group>

            <Form.Group controlId="formNoHabitaciones">
              <Form.Label>No. Habitaciones:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("NHabita")}
                type="number"
              />
            </Form.Group>

            <Form.Group controlId="formNoNiveles">
              <Form.Label>No. Niveles:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("NoNiveles")}
                type="number"
              />
            </Form.Group>

            <Form.Group controlId="formTerraza">
              <Form.Label>Terraza:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("NoTerraza")}
                type="number"
              />
            </Form.Group>

            <Form.Group controlId="formServiciosPublicos">
              <Form.Label>Servicios Publicos:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("Spublicos")}
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="formAseguramiento">
              <Form.Label>Aseguramiento:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                {...register("aseguramiento")}
                type="date"
              />
            </Form.Group>
            {NoResult === true ? (
              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>Propietario del inmueble</Form.Label>
                <Form.Control
                  placeholder="Seleccione aqui"
                  onClick={() => handleMostrarAClick()}
                  className="InputsRegistros"
                  type="text"
                />
              </Form.Group>
            ) : (
              <Form.Group controlId="formNoIdentidadPropietario">
                <Form.Label>Propietario del inmueble</Form.Label>
                {infopropietario && infopropietario.NombreCompleto ? (
                  <Form.Control
                    onClick={() => handleMostrarAClick()}
                    value={infopropietario.NombreCompleto}
                    className="InputsRegistros"
                    type="text"
                  />
                ) : (
                  <Form.Control
                    disabled
                    value=""
                    className="InputsRegistros"
                    type="text"
                    placeholder="Cargando..."
                  />
                )}
              </Form.Group>
            )}
          </div>
          <Form.Group controlId="formNoIdentidadPropietario">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              className="InputsRegistros"
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
          {infopropietario && infopropietario.length > 0 ? (
            <Modal
              size="lg"
              show={mostrarModalA}
              onHide={handleCloseModalA}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Propietarios Disponibles</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Tipo de Documento</th>
                      <th>No. Documento</th>
                      <th>Nombre</th>
                      <th>Teléfono</th>
                      <th>Correo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infopropietario.map((Propietarios) =>
                      createrowA(Propietarios)
                    )}
                  </tbody>
                </Table>
              </Modal.Body>
            </Modal>
          ) : null}
        </Form>
      </div>
    </div>
  );
};
