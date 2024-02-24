import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import "./Rarrendatario.css";

export const Rarrendatario = () => {
  const [formData, setFormData] = useState({
    fecha: "",
    documentoIdentidad: "",
    nombre: "",
    recibidoDe: "",
    concepto: "",
    suma: "",
    periodoDesde: "",
    periodoHasta: "",
    pagadoCon: "",
    direccion: "",
    recibidoPor: "",
  });

  const handleGuardarClick = async () => {
    
    // Validar el formulario antes de generar el PDF
    for (const key in formData) {
      const element = formData[key];
      if (!element) {
        alert(`Por favor, complete el campo ${key}`);
        return;
      }
    }

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 15;
      const padding = 50;

      // Añadir los datos del formulario al PDF
      page.drawText("RECIBO DE ARRENDAMIENTO", {
        x: padding,
        y: height - padding - fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      let yOffset = height - padding - fontSize * 2;
      for (const key in formData) {
        const element = formData[key];
        if (element) {
          page.drawText(`${key}: ${element}`, {
            x: padding,
            y: yOffset,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
          yOffset -= fontSize;
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "recibo.pdf";
      link.click();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al generar el PDF");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelarClick = () => {
    setFormData({
      fecha: "",
      documentoIdentidad: "",
      nombre: "",
      recibidoDe: "",
      concepto: "",
      suma: "",
      periodoDesde: "",
      periodoHasta: "",
      pagadoCon: "",
      direccion: "",
      recibidoPor: "",
    });
  };

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Redireccion en caso de confirmar o cancelar
  const handleConfirmSave = () => {
    // Lógica para confirmar el guardado
    handleSubmit(handleGuardarClick)(); // Envia los datos
    setShowSaveModal(false); // Cierra el modal
  };

  const { handleSubmit } = useForm();

  const handleConfirmCancel = () => {
    handleSubmit(handleCancelarClick)();
    setShowCancelModal(false); // Cierra el modal
  };
  return (
    <div className="contener-home">
      <form className="form-propietario">
        <div className="titulo">
          <span>RECIBO DE ARRENDATARIO </span>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="fecha">Fecha:</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
            />
            <label htmlFor="numeroArrendatario">Número de identidad:</label>
            <input
              type="number"
              id="numeroArrendatario"
              name="documentoIdentidad"
              value={formData.documentoIdentidad}
              onChange={handleInputChange}
            />
            <label htmlFor="cedula">nombre:</label>
            <input
              type="text"
              id="cedula"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <label htmlFor="recibidoDe">Recibido de:</label>
            <input
              type="text"
              id="recibidoDe"
              name="recibidoDe"
              value={formData.recibidoDe}
              onChange={handleInputChange}
            />
            <label htmlFor="concepto">Concepto:</label>
            <input
              type="text"
              id="concepto"
              name="concepto"
              value={formData.concepto}
              onChange={handleInputChange}
            />
            <label htmlFor="suma">Suma :</label>
            <input
              type="number"
              id="suma"
              name="suma"
              value={formData.suma}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="periodoDesde">Periodo desde:</label>
            <input
              type="date"
              id="periodoDesde"
              name="periodoDesde"
              value={formData.periodoDesde}
              onChange={handleInputChange}
            />
            <label htmlFor="periodoHasta">Periodo hasta:</label>
            <input
              type="date"
              id="periodoHasta"
              name="periodoHasta"
              value={formData.periodoHasta}
              onChange={handleInputChange}
            />
            <label htmlFor="pagadoCon">Pagado con :</label>
            <input
              type="text"
              id="pagadoCon"
              name="pagadoCon"
              value={formData.pagadoCon}
              onChange={handleInputChange}
            />
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
            />
            <label htmlFor="recibidoPor">Recibido por:</label>
            <input
              type="text"
              id="recibidoPor"
              name="recibidoPor"
              value={formData.recibidoPor}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="botones">
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
      </form>
          {/* Modal de confirmación de guardar */}
          <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton={false}>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas guardar los cambios?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => {handleConfirmSave(); handleGuardarClick();}} >
            Sí
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación de cancelar */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton={false}>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas cancelar la operación?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => {handleConfirmCancel(); handleCancelarClick();}}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
