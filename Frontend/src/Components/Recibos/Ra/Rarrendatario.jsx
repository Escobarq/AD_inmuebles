import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { PDFDocument, rgb } from "pdf-lib";
import moment from "moment";
import logo from '../../../assets/Logo.png'

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


    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
  };
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
  
        // Organizamos los campos en dos columnas
        const columnWidth = width / 2 - padding;
        let leftX = padding;
        let rightX = width / 2 + padding;
  
        let yOffset = height - padding - fontSize * 2;
  
        // Dibujamos los campos y las respuestas
        for (const key in formData) {
            const element = formData[key];
            if (element) {
                // Dibujamos el nombre del campo en negrita y centrado
                page.drawText(`${key.charAt(0).toUpperCase() + key.slice(1)}:`, {
                    x: leftX,
                    y: yOffset,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                    font: await pdfDoc.embedFont("Helvetica-Bold"),
                    align: 'center',
                });
  
                // Dibujamos la respuesta debajo del nombre del campo
                page.drawText(`${element}`, {
                    x: leftX,
                    y: yOffset - fontSize * 1.5,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                    align: 'center',
                });
  
                // Movemos a la siguiente columna o siguiente línea si no hay más espacio
                if (leftX === padding) {
                    leftX = rightX;
                } else {
                    leftX = padding;
                    yOffset -= fontSize * 3; // Espacio entre campos
                    if (yOffset < padding) {
                        // Agregar una nueva página si no hay espacio suficiente en la página actual
                        page.drawText("Continuar en la siguiente página...", {
                            x: padding,
                            y: padding,
                            size: fontSize,
                            color: rgb(0, 0, 0),
                        });
                        page.drawText("Página 2", {
                            x: width - padding,
                            y: padding,
                            size: fontSize,
                            color: rgb(0, 0, 0),
                            align: 'right',
                        });
                        page.drawText("Continuación...", {
                            x: padding,
                            y: height - padding,
                            size: fontSize,
                            color: rgb(0, 0, 0),
                        });
                        page.drawText("Página 2", {
                            x: width - padding,
                            y: height - padding,
                            size: fontSize,
                            color: rgb(0, 0, 0),
                            align: 'right',
                        });
                        page.drawText("Página 2", {
                            x: width / 2,
                            y: height - padding,
                            size: fontSize,
                            color: rgb(0, 0, 0),
                            align: 'center',
                        });
                        const newPage = pdfDoc.addPage();
                        yOffset = height - padding - fontSize * 2; // Restablecer el yOffset para la nueva página
                        page.drawText(`${key.charAt(0).toUpperCase() + key.slice(1)}:`, {
                            x: leftX,
                            y: yOffset,
                            size: fontSize,
                            color: rgb(0, 0, 0),
                            font: await pdfDoc.embedFont("Helvetica-Bold"),
                            align: 'center',
                        });
                    }
                }
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

  };
};
    return (
        <div className="contener-home contener-ReArrendatario">
            <h2 style={{ textAlign: "center" }}>Recibo Arrendatario</h2>
            <div className="container">
                <Form>
                    <div className="form-propietario">
                        <Form.Group controlId="fecha">
                            <Form.Label>Fecha:</Form.Label>
                            <Form.Control
                                type="date"
                                name="fecha"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="documentoIdentidad">
                            <Form.Label>Documento Identidad:</Form.Label>
                            <Form.Control
                                type="text"
                                name="documentoIdentidad"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="nombre">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="recibidoDe">
                            <Form.Label>Recibido de:</Form.Label>
                            <Form.Control
                                type="text"
                                name="recibidoDe"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="concepto">
                            <Form.Label>Concepto:</Form.Label>
                            <Form.Control
                                type="text"
                                name="concepto"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="suma">
                            <Form.Label>Suma:</Form.Label>
                            <Form.Control
                                type="number"
                                name="suma"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="periodoDesde">
                            <Form.Label>Periodo Desde:</Form.Label>
                            <Form.Control
                                type="date"
                                name="periodoDesde"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="periodoHasta">
                            <Form.Label>Periodo Hasta:</Form.Label>
                            <Form.Control
                                type="date"
                                name="periodoHasta"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="pagadoCon">
                            <Form.Label>Pagado Con:</Form.Label>
                            <Form.Control
                                type="text"
                                name="pagadoCon"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="direccion">
                            <Form.Label>Dirección:</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="recibidoPor">
                            <Form.Label>Recibido Por:</Form.Label>
                            <Form.Control
                                type="text"
                                name="recibidoPor"
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
                            onClick={() => setShowSaveModal(false)}
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
