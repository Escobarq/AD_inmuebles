import  { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export const EditarDatosIn = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { register, handleSubmit ,reset} = useForm();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [inmuebleData, setInmuebleData] = useState({
    IdInmueble: "",
    NoMatricula: "",
    Direccion: "",
    Estrato: "",
    Ciudad: "",
    Barrio: "",
    Tipo: "",
    NoNiveles: "",
    NoBanos: "",
    ServiciosPublicos: "",
    NoHabitaciones: "",
    Estado: "",
    NoTerraza: "",
    AreaConstruidaM2: "",
    Aseguramiento: "",
    ValorInmueble: "",
    Descripcion: "",
  });

  useEffect(() => {
    // Si hay parámetros de consulta en la URL, significa que se está editando un inmueble existente
    if (location.search) {
      setInmuebleData({
        IdInmueble: searchParams.get("IdInmueble") || "",
        NoMatricula: searchParams.get("NoMatricula") || "",
        Direccion: searchParams.get("Direccion") || "",
        Estrato: searchParams.get("Estrato") || "",
        Ciudad: searchParams.get("Ciudad") || "",
        Barrio: searchParams.get("Barrio") || "",
        Tipo: searchParams.get("Tipo") || "",
        NoNiveles: searchParams.get("NoNiveles") || "",
        NoBanos: searchParams.get("NoBanos") || "",
        ServiciosPublicos: searchParams.get("ServiciosPublicos") || "",
        NoHabitaciones: searchParams.get("NoHabitaciones") || "",
        Estado: searchParams.get("Estado") || "", // Asegúrate de manejar este valor de manera adecuada
        NoTerraza: searchParams.get("NoTerraza") || "",
        AreaConstruidaM2: searchParams.get("AreaConstruidaM2") || "",
        Aseguramiento: searchParams.get("Aseguramiento") || "", // Asegúrate de manejar este valor de manera adecuada
        ValorInmueble: searchParams.get("ValorInmueble") || "",
        Descripcion: searchParams.get("Descripcion") || "",
      });
    } else {
      return null;
    }
  }, [location.search]);

  

  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    reset();
    setShowConfirmationModal(false);
    window.location.href = "/Inmueble"
  };

  // Función para manejar el envío del formulario
  const onSubmitForm = async (data) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        `http://localhost:3006/Reinmueble/${inmuebleData.IdInmueble}`,
        requestOptions
      );
        console.log([data])
      if (response.ok) {
        setShowConfirmationModal(false);
        toast.success("Inmueble actualizado exitosamente");
        window.location.href ="/Inmueble";
      } else {
        throw new Error("Error al actualizar inmueble");
      }
    } catch (error) {
      console.error("Error al actualizar inmueble:", error);
      toast.error("Error al actualizar inmueble");
    }
  };

  return (
    <>
      <div className="contener-home contener-rpropietario">
        <h2>Editar Datos de Inmuebles</h2>
        <Form
          style={{ marginTop: "20px", marginBottom: "20px" }}
          onSubmit={handleSubmit(handleShowConfirmationModal)}
          method="put"
        >
          <div className="form-propietario">
            <Form.Group controlId="formIdInmueble">
              <Form.Label>Id del Inmueble</Form.Label>
              <Form.Control
                className="InputsRegistros"
                type="text"
                placeholder="Id del Inmueble"
                name="IdInmueble"
                value={inmuebleData.IdInmueble}
                disabled
                {...register("IdInmueble")}
              />
            </Form.Group>

            <Form.Group controlId="formTipoInmueble">
              <Form.Label>Tipo de Inmueble</Form.Label>
              <Form.Control
                type="text"
                className="InputsRegistros"
                placeholder="Tipo de Inmueble"
                name="Tipo"
                value={inmuebleData.Tipo}
                disabled
                {...register("Tipo")}
              />
            </Form.Group>

            <Form.Group controlId="formNoMatricula">
              <Form.Label>Número de Matrícula</Form.Label>
              <Form.Control
                type="number"
                className="InputsRegistros"
                placeholder="Número de Matrícula"
                name="NoMatricula"
                defaultValue={inmuebleData.NoMatricula}
                {...register("NoMatricula")}
              />
            </Form.Group>

            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                className="InputsRegistros"
                placeholder="Dirección"
                name="Direccion"
                defaultValue={inmuebleData.Direccion}
                {...register("Direccion")}
              />
            </Form.Group>

            <Form.Group controlId="formEstrato" className="col col-md.auto">
              <Form.Label>Estrato Inmueble</Form.Label>
              <Form.Select
                className="formSelect InputsRegistros"
                {...register("Estrato")}
              >
                <option value="" disabled selected>
                  Seleccione un Estrato
                </option>
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
                <option value={"4"}>4</option>
                <option value={"5"}>5</option>
                <option value={"6"}>6</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formCiudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                className="InputsRegistros"
                placeholder="Ciudad"
                name="Ciudad"
                defaultValue={inmuebleData.Ciudad}
                {...register("Ciudad")}
              />
            </Form.Group>

            <Form.Group controlId="formBarrio">
              <Form.Label>Barrio</Form.Label>
              <Form.Control
                type="text"
                className="InputsRegistros"
                placeholder="Barrio"
                name="Barrio"
                defaultValue={inmuebleData.Barrio}
                {...register("Barrio")}
              />
            </Form.Group>

            <Form.Group controlId="formNoNiveles">
              <Form.Label>Numero Niveles</Form.Label>
              <Form.Control
                type="number"
                className="InputsRegistros"
                placeholder="Numero de niveles"
                name="NoNiveles"
                defaultValue={inmuebleData.NoNiveles}
                {...register("NoNiveles")}
              />
            </Form.Group>

            <Form.Group controlId="formNoBanos">
              <Form.Label>Numero Baños</Form.Label>
              <Form.Control
                type="number"
                className="InputsRegistros"
                placeholder="Numero de baños"
                name=" NoBanos"
                defaultValue={inmuebleData.NoBanos}
                {...register("NoBanos")}
              />
            </Form.Group>

            <Form.Group controlId="formServiciosPublicos">
              <Form.Label>Servicios Publicos</Form.Label>
              <Form.Control
                type="text"
                className="InputsRegistros"
                placeholder="Servicios Publicos"
                name="ServiciosPublicos" // Eliminado el espacio adicional al principio
                defaultValue={inmuebleData.ServiciosPublicos}
                {...register("ServiciosPublicos")}
              />
            </Form.Group>

            <Form.Group controlId="formNoHabitaciones">
              <Form.Label>Numero Habitaciones </Form.Label>
              <Form.Control
                type="number"
                className="InputsRegistros"
                placeholder="Numero Habitaciones"
                name="NoHabitaciones" // Eliminado el espacio adicional al principio
                defaultValue={inmuebleData.NoHabitaciones}
                {...register("NoHabitaciones")}
              />
            </Form.Group>

            <Form.Group controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                className="InputsRegistros"
                placeholder="Estado"
                name=" Estado"
                defaultValue={inmuebleData.Estado}
                disabled
                {...register("Estado")}
              />
            </Form.Group>

            <Form.Group controlId="formNoTerraza">
              <Form.Label>Numero de Terrazas</Form.Label>
              <Form.Control
                type="number"
                className="InputsRegistros"
                placeholder="Numero de Terrazas"
                name=" NoTerraza"
                defaultValue={inmuebleData.NoTerraza}
                {...register("NoTerraza")}
              />
            </Form.Group>

            <Form.Group controlId="formAreaConstruidaM2">
              <Form.Label>Area Construida en M2</Form.Label>
              <Form.Control
                type="number"
                step="0.01" 
                className="InputsRegistros"
                placeholder="Area Construida"
                name=" AreaConstruidaM2"
                defaultValue={inmuebleData.AreaConstruidaM2}
                {...register("AreaConstruidaM2")}
              />
            </Form.Group>

            <Form.Group controlId="formAseguramiento">
              <Form.Label>Aseguramiento</Form.Label>
              <Form.Control
                type="date"
                className="InputsRegistros"
                placeholder="Valor Aseguramiento"
                name="Aseguramiento" // Eliminado el espacio adicional al principio
                defaultValue={inmuebleData.Aseguramiento}
                {...register("Aseguramiento")}
              />
            </Form.Group>

            <Form.Group controlId="formAseguramiento">
              <Form.Label>Valor Inmueble</Form.Label>
              <Form.Control
                type="number"
                className="InputsRegistros"
                placeholder="Valor Inmueble"
                name=" ValorInmueble"
                defaultValue={inmuebleData.ValorInmueble}
                {...register("ValorInmueble")}
              />
            </Form.Group>

            <Form.Group controlId="formAseguramiento">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea" // Cambiado a un textarea
                className="InputsRegistros"
                placeholder="Descripción"
                name="Descripcion"
                defaultValue={inmuebleData.Descripcion}
                {...register("Descripcion")}
              />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
          <Modal
            show={showConfirmationModal}
            onHide={handleCloseConfirmationModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Estás seguro de que deseas guardar los cambios?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseConfirmationModal}
              >
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSubmit(onSubmitForm)}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </div>
    </>
  );
};
