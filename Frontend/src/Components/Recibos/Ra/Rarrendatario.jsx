import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { PDFDocument, rgb } from "pdf-lib"; 
import { useForm } from "react-hook-form";
import moment from "moment";

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

  const handleGuardarClick = async () => {

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

      page.drawText("RECIBO DE ARRENDAMIENTO", {
        x: width / 2 - 100,
        y: height - padding - fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText(moment().format('MMMM D, YYYY'), {
        x: width - padding - 150,
        y: height - padding - fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      let yOffset = height - padding - fontSize * 4;
      for (const key in formData) {
        const element = formData[key];
        if (element) {
          page.drawText(`${key}: ${element}`, {
            x: padding,
            y: yOffset,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
          yOffset -= fontSize * 1.5; // Adjust the line height for better readability
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "recibo.pdf";
      link.click();

      setShowSaveModal(true);
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al generar el PDF");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFiltroData({ ...filtroData, [name]: value });
  };

  const { register, handleSubmit } = useForm();
  const [infoarrendatario, setinfoarrendatario] = useState([]);

  const [filtroData, setFiltroData] = useState({
    Cedula: "",
    Estado: "Ocupado",
  });

  useEffect(() => {
    fetchData();
  }, [filtroData]);



  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams(filtroData);
      const response = await fetch(
        `http://localhost:3006/Varrendatario?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const arrendatarioActivos = data.filter(
        (Arrendatarios) => Arrendatarios.booleanos === "true"
      );

      setinfoarrendatario(arrendatarioActivos);
      
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const onSubmitArrendatario = (data) => {
    console.log(data);
  };

  return (
    <div className="contener-home contener-ReArrendatario">
      <h2 style={{ textAlign: "center" }}>Recibo Arrendatario</h2>
      <div className="container">
        <Form onSubmit={handleSubmit(onSubmitArrendatario)}>
          <div className="form-propietario">
            <Form.Group controlId="Fecha">
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

            <Form.Group controlId="Nombre">
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

            <Form.Group controlId="Concepto">
              <Form.Label>Concepto:</Form.Label>
              <Form.Control
                type="text"
                {...register("concepto")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="Suma">
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

            <Form.Group controlId="Direccion">
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

            <Button
              type="button"
              variant="success m-2"
              onClick={handleGuardarClick}
            >
              <FontAwesomeIcon icon={faSave} />
              <span className="text_button ms-2">Guardar</span>
            </Button>

            <Button
              type="button"
              variant="danger m-2"
              onClick={() => setShowCancelModal(true)}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span className="text_button ms-2">Cancelar</span>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
