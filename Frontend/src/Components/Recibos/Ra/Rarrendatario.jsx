import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { PDFDocument, rgb } from "pdf-lib";
import logo from '../../../assets/Logo.png'

export const Rarrendatario = () => {
    const [formData, setFormData] = useState({
        fecha: "",
        documento: "",
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
    /*quiero que en la hoja, ahiga un encabezado
    con el logo, importado. color opaco y al lado un titulo que diga adminmuebles */

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
            const fontSize = 19;
            const padding = 60;
            // Agregar texto con la hora de emisión en la parte inferior de la página
            const currentTime = new Date().toLocaleTimeString();
            const footerText = `Hora de emisión: ${currentTime}`;
    
            page.drawText(footerText, {
                x: padding, // Ajusta la posición horizontal según sea necesario
                y: padding, // Ajusta la posición vertical según sea necesario
                size: 13, // Tamaño de la fuente del texto
                color: rgb(0.5, 0.5, 0.5), // Color gris opaco
                font: await pdfDoc.embedFont("Helvetica"),
            });
            // Organizamos los campos en dos columnas
            let leftX = padding;
            let rightX = width / 2 + 20;
    
            let yOffset = height - padding - fontSize * 2;
    
    
            // Load the logo image
            const logoImageBytes = await fetch(logo).then((res) =>
                res.arrayBuffer()
            );
            const logoImage = await pdfDoc.embedPng(logoImageBytes);
            // Dibuja el logo en el encabezado
    
            page.drawImage(logoImage, {
                x: padding - 20, // Ajusta la posición hacia la izquierda según sea necesario
                y: height - padding - fontSize * 0.6, // Ajusta la posición vertical según sea necesario
                width: 100, // Ajusta el ancho según sea necesario
                height: 50, // Ajusta la altura según sea necesario
                color: rgb(0.7, 0.7, 0.7), // Cambia el color del logo a un tono más opaco
            });
    
            // Dibuja el título al lado del logo con color gris opaco y posición vertical más alta
            page.drawText("Adminmuebles", {
                x: padding + 120, // Ajusta la posición horizontal según sea necesario
                y: height - padding - fontSize * 0.0, // Ajusta la posición vertical más arriba
                size: fontSize + 0,
                color: rgb(0.8, 0.8, 0.8), // Color gris opaco
                font: await pdfDoc.embedFont("Helvetica"),
            });
    
    
            // Título del recibo
            page.drawText("Recibo de Arrendatario", {
                x: width / 10,
                y: height - padding - fontSize * 3.5,
                size: fontSize + 9, // Aumentar el tamaño del texto para el título
    
                font: await pdfDoc.embedFont("Helvetica"),
    
            });
    
            yOffset -= fontSize * 5.5;
    
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
                        align: 'right',
                    });
    
    
    
                    // Dibujamos la respuesta debajo del nombre del campo
                    page.drawText(`${element}`, {
                        x: leftX,
                        y: yOffset - fontSize * 1.5,
                        size: fontSize,
                        color: rgb(0, 0, 0),
                        align: 'left',
                    });
    
    
                    if (leftX === padding) {
                        leftX = rightX;
                    } else {
                        leftX = padding;
                        yOffset -= fontSize * 5; // Espacio entre campos
                        if (yOffset < padding) {
    
                            page.drawText(`${key.charAt(0).toUpperCase() + key.slice(1)}:`, {
                                x: leftX,
                                y: yOffset,
                                size: fontSize,
                                color: rgb(0, 0, 0),
                                font: await pdfDoc.embedFont("Helvetica"),
                                align: 'center',
    
    
                            });
                        }
    
    
                    }
                }
            }
    
            // Dibujar línea horizontal en el encabezado
         // Dibujar línea horizontal en el encabezado
page.drawLine({
    start: { x: padding, y: height - padding - fontSize * 0.6 - 20 }, // Punto de inicio - ajusta y para bajar la línea
    end: { x: width - padding, y: height - padding - fontSize * 0.6 - 20 }, // Punto final - ajusta y para bajar la línea
    thickness: 1, // Grosor de la línea
    color: rgb(0.7, 0.7, 0.7) // Color de la línea
});

// Dibujar línea horizontal arriba de la hora actual
page.drawLine({
    start: { x: padding, y: padding + fontSize * 2 + 20 }, // Ajusta el valor de y para bajar la línea
    end: { x: width - padding, y: padding + fontSize * 2 + 20 }, // Ajusta el valor de y para bajar la línea
    thickness: 1, // Grosor de la línea
    color: rgb(0.7, 0.7, 0.7) // Color de la línea
});
    
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "recibo.pdf";
            link.click();
    
    
    
        // eslint-disable-next-line no-empty
        } catch (error) {
    
        }
    
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

                        <Form.Group controlId="documento">
                            <Form.Label>Documento Identidad:</Form.Label>
                            <Form.Control
                                type="text"
                                name="documento"
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
                                maxLength={17}
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
