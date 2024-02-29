import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; // Importar StandardFonts
import moment from "moment";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

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

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const falla = (text) =>
    toast.error(text, {
      theme: "colored",
    });

  const fallo = (text) =>
    toast.error(text, {
      theme: "colored",
    });

  const handleConfirmSave = async () => {
    setShowSaveModal(false);
    // Verificar que todos los campos estén completos
    for (const key in formData) {
      const element = formData[key];
      if (!element) {
        falla(`Por favor, complete el campo ${key}`);
        return;
      }
    }

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 15;
      const padding = 50;

      // Centrar el título "RECIBO DE ARRENDAMIENTO"
      const titleText = "RECIBO DE ARRENDAMIENTO";
      const titleWidth = titleText.length * fontSize * 0.5; // Ajustar según la anchura promedio de caracteres
      const titleX = (width - titleWidth) / 2;
      const titleY = height - padding - fontSize;

      const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold); // Usar StandardFonts
      page.drawText(titleText, {
        x: titleX,
        y: titleY,
        size: fontSize,
        font: titleFont,
        color: rgb(0, 0, 0),
      });

      // Mover la fecha a la esquina superior derecha
      const dateText = moment().format("MMMM D, YYYY");
      const dateWidth = dateText.length * fontSize * 0.5; // Ajustar según la anchura promedio de caracteres
      const dateX = width - padding - dateWidth;
      const dateY = height - padding - fontSize;

      const textFont = await pdfDoc.embedFont(StandardFonts.Helvetica); // Usar StandardFonts
      page.drawText(dateText, {
        x: dateX,
        y: dateY,
        size: fontSize,
        font: textFont,
        color: rgb(0, 0, 0),
      });

      let yOffset = height - padding - fontSize * 4;
      for (const key in formData) {
        const element = formData[key];
        if (element) {
          // Mostrar solo los valores de los campos y mejorar el formato
          page.drawText(`${element}`, {
            x: padding,
            y: yOffset,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
          yOffset -= fontSize * 1.5; // Ajustar la altura de línea para una mejor legibilidad
        }
      }

      // Agregar texto alusivo y espacio para firma
      const alusivoText = "Texto alusivo...";
      const signatureSpaceY = 100;
      page.drawText(alusivoText, {
        x: padding,
        y: signatureSpaceY,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "recibo.pdf";
      link.click();
    } catch (error) {
      console.error(error);
      fallo("Ocurrió un error al generar el PDF");
    }
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    // Restablecer los campos del formulario al cancelar
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
    window.location.href = "/H_recibos";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className="contener-home contener-ReArrendatario">
      <h2 style={{ textAlign: "center" }}>Recibo Arrendatario</h2>
      <div className="container">
        <Form onSubmit={handleSubmit(() => {})}>
          <div className="form-propietario">
            <Form.Group controlId="fecha">
              <Form.Label>Fecha:</Form.Label>
              <Form.Control
                type="date"
                {...register("fecha")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="documentoIdentidad">
              <Form.Label>Documento Identidad:</Form.Label>
              <Form.Control
                type="text"
                {...register("documentoIdentidad")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="nombre">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                {...register("nombre")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="recibidoDe">
              <Form.Label>Recibido de:</Form.Label>
              <Form.Control
                type="text"
                {...register("recibidoDe")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="concepto">
              <Form.Label>Concepto:</Form.Label>
              <Form.Control
                type="text"
                {...register("concepto")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="suma">
              <Form.Label>Suma:</Form.Label>
              <Form.Control
                type="number"
                {...register("suma")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="periodoDesde">
              <Form.Label>Periodo Desde:</Form.Label>
              <Form.Control
                type="date"
                {...register("periodoDesde")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="periodoHasta">
              <Form.Label>Periodo Hasta:</Form.Label>
              <Form.Control
                type="date"
                {...register("periodoHasta")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="pagadoCon">
              <Form.Label>Pagado Con:</Form.Label>
              <Form.Control
                type="text"
                {...register("pagadoCon")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="direccion">
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                type="text"
                {...register("direccion")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="recibidoPor">
              <Form.Label>Recibido Por:</Form.Label>
              <Form.Control
                type="text"
                {...register("recibidoPor")}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div
            className="buttons"
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
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
              onClick={handleCancelClick}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span className="text_button ms-2">Cancelar</span>
            </Button>
          </div>
        </Form>
      </div>

      {/* Modal de confirmación para guardar */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Guardar</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea guardar?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación para cancelar */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cancelar</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea cancelar?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Volver
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
