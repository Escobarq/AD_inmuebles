/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const Registrocodeudor = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  

  const notify = () => toast.success("Se registró correctamente", { theme: "dark" });
  const error = () => toast.error("Hubo algún error al enviar los datos", { theme: "dark" });
  const errora = () => toast.error("Hubo algún error al enviar los datos al servidor", { theme: "dark" });

  const { register, handleSubmit, reset, setValue } = useForm({ mode: "onChange" });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [arrendatarioData, setarrendatarioData] = useState({
    IdArrendatario: "",
    TipoDocumento: "",
    DocumentoIdentidad: "",
    DocumentoCodeudor: "",
    NombreCompleto: "",
    Telefono: "",
    Correo: "",
    Estado: "",
  });

  useEffect(() => {
    if (location.search) {
      const IdCodeudor = searchParams.get("IdCodeudor") || "";
      const TipoDocumento = searchParams.get("TipoDocumento") || "";
      const DocumentoIdentidad = searchParams.get("DocumentoIdentidad") ? searchParams.get("DocumentoIdentidad") : "";
      const NombreCompleto = searchParams.get("NombreCompleto") ? searchParams.get("NombreCompleto") : "";
      const Direccion = searchParams.get("Direccion") ? searchParams.get("Direccion") : "";
      const Telefono = searchParams.get("Telefono") ? searchParams.get("Telefono") : "";
      const Correo = searchParams.get("Correo") ? searchParams.get("Correo") : "";
      if(IdCodeudor) {
        setValue("IdCodeudor", IdCodeudor);
        setValue("TipoDocumento", TipoDocumento);
        setValue("DocumentoIdentidad", DocumentoIdentidad);
        setValue("NombreCompleto", NombreCompleto);
        setValue("Direccion", Direccion);
        setValue("Telefono", Telefono);
        setValue("Correo", Correo);
      }
      else{
        const arrendatario = {
          TipoDocumento: searchParams.get("TipoDocumento"),
          DocumentoIdentidad: searchParams.get("DocumentoIdentidad"),
          NombreCompleto: searchParams.get("NombreCompleto"),
          Telefono: searchParams.get("Telefono"),
          Correo: searchParams.get("Correo"),
          Estado: searchParams.get("Estado"),
        };
        setarrendatarioData(arrendatario);
      }

    }
    
  }, [location.search, setValue]);

  const onSubmitRegistro = async (data) => {
    try {
      let url = "http://localhost:3006/Rcodeudor";
      let method = "POST";

      if (data.IdCodeudor) {
        url += `/${data.IdCodeudor}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowSaveModal(true);
        notify();
        reset();
        const urlParams = new URLSearchParams({
          DocumentoCodeudor: data.DocumentoIdentidad,
            TipoDocumento: searchParams.get("TipoDocumento"),
            DocumentoIdentidad: searchParams.get("DocumentoIdentidad"),
            NombreCompleto: searchParams.get("NombreCompleto"),
            Telefono: searchParams.get("Telefono"),
            Correo: searchParams.get("Correo"),
            Estado: searchParams.get("Estado"),
        });
        const url = `/ReArrendatario?${urlParams.toString()}`;
        window.location.href = url;
      } else {
        error();
      }
    } catch (error) {
      errora();
      console.error("Error al enviar datos al servidor:", error);
    }
  };

  const handleConfirmSave = () => {
    handleSubmit(onSubmitRegistro)();
    setShowSaveModal(false);
    reset();
  };

  const handleConfirmCancel = () => {
    window.location.href = "/Codeudor";
    setShowCancelModal(false);
  };

  return (
    <div className="contener-home contener-rpropietario">
      <h2>Registro Codeudor</h2>
      <div className="container">
        <Form className="form-propietario" onSubmit={handleSubmit(onSubmitRegistro)}>
          <Form.Group controlId="formnombre">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              {...register("NombreCompleto")}
              required
              onChange={(e) => setValue("NombreCompleto", e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTipoDocumento" className="formSelect">
            <Form.Label>Tipo De Documento</Form.Label>
            <Form.Select
              className="InputsRegistros"
              {...register("TipoDocumento")}
              required
              onChange={(e) => setValue("TipoDocumento", e.target.value)}
            >
              <option defaultValue="" disabled hidden>
                Seleccione Tipo de Documento
              </option>
              <option value="Cedula Ciudadania">Cedula Ciudadania</option>
              <option value="Cedula Extranjeria">Cedula Extranjería</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formDocumentoIdentidad">
            <Form.Label>Número de identidad:</Form.Label>
            <Form.Control
              {...register("DocumentoIdentidad")}
              maxLength={10}
              required
              onChange={(e) => setValue("DocumentoIdentidad", e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formtelefono">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              {...register("Telefono")}
              maxLength={10}
              required
              onChange={(e) => setValue("Telefono", e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formcorreo">
            <Form.Label>Correo:</Form.Label>
            <Form.Control
              type="email"
              {...register("Correo")}
              onChange={(e) => setValue("Correo", e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formdireccion">
            <Form.Label>Dirección:</Form.Label>
            <Form.Control
              {...register("Direccion")}
              onChange={(e) => setValue("Direccion", e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>

      <div className="contener-buttons d-flex justify-content-center">
        <div className="save_deleter">
          <Button type="button" variant="success m-2" onClick={() => setShowSaveModal(true)}>
            <FontAwesomeIcon icon={faSave} />
            <span className="text_button ms-2">Guardar</span>
          </Button>

          <Button type="button" variant="danger m-2" onClick={() => setShowCancelModal(true)}>
            <FontAwesomeIcon icon={faTimes} />
            <span className="text_button ms-2">Cancelar</span>
          </Button>
        </div>
      </div>

      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas guardar los cambios?</Modal.Body>
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
        <Modal.Body>¿Estás seguro de que deseas cancelar la operación?</Modal.Body>
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