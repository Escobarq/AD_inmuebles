import React, { useState } from 'react';
import "./Rarrendatario.css"
import { pdfjs } from 'react-pdf';
import { pdf } from 'pdf';


export const Rarrendatario = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    documentoIdentidad: '',
    nombre: '',
    recibidoDe: '',
    concepto: '',
    suma: '',
    periodoDesde: '',
    periodoHasta: '',
    pagadoCon: '',
    direccion: '',
    recibidoPor: '',
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
      page.drawText('RECIBO DE ARRENDAMIENTO', {
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
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'recibo.pdf';
      link.click();
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al generar el PDF');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelarClick = () => {
    setFormData({
      fecha: '',
      documentoIdentidad: '',
      nombre: '',
      recibidoDe: '',
      concepto: '',
      suma: '',
      periodoDesde: '',
      periodoHasta: '',
      pagadoCon: '',
      direccion: '',
      recibidoPor: '',
    });
  };

  return (
    <div className='container'>
      <form className='formu'>
        <div className='titulo'>
          <span>RECIBO DE ARRENDATARIO </span>
        </div>
        <div className="row" >
          <div className='col-md-6'>
            <label htmlFor='fecha'>Fecha:</label>
            <input type='date' id='fecha' name='fecha' value={formData.fecha} onChange={handleInputChange} />
            <label htmlFor='numeroArrendatario'>Número de identidad:</label>
            <input type='number' id='numeroArrendatario' name='documentoIdentidad' value={formData.documentoIdentidad} onChange={handleInputChange} />
            <label htmlFor='cedula'>nombre:</label>
            <input type='text' id='cedula' name='nombre' value={formData.nombre} onChange={handleInputChange} />
            <label htmlFor='recibidoDe'>Recibido de:</label>
            <input type='text' id='recibidoDe' name='recibidoDe' value={formData.recibidoDe} onChange={handleInputChange} />
            <label htmlFor='concepto'>Concepto:</label>
            <input type='text' id='concepto' name='concepto' value={formData.concepto} onChange={handleInputChange} />
            <label htmlFor='suma'>Suma :</label>
            <input type='number' id='suma' name='suma' value={formData.suma} onChange={handleInputChange} />
          </div>
          <div className='col-md-6'>
            <label htmlFor='periodoDesde'>Periodo desde:</label>
            <input type='date' id='periodoDesde' name='periodoDesde' value={formData.periodoDesde} onChange={handleInputChange} />
            <label htmlFor='periodoHasta'>Periodo hasta:</label>
            <input type='date' id='periodoHasta' name='periodoHasta' value={formData.periodoHasta} onChange={handleInputChange} />
            <label htmlFor='pagadoCon'>Pagado con :</label>
            <input type='text' id='pagadoCon' name='pagadoCon' value={formData.pagadoCon} onChange={handleInputChange} />
            <label htmlFor='direccion'>Dirección:</label>
            <input type='text' id='direccion' name='direccion' value={formData.direccion} onChange={handleInputChange} />
            <label htmlFor='recibidoPor'>Recibido por:</label>
            <input type='text' id='recibidoPor' name='recibidoPor' value={formData.recibidoPor} onChange={handleInputChange} />
          </div>
        </div>
        <div className='botones'>
          <button type='button' className='guardar' onClick={handleGuardarClick}>
           Generar recibo
          </button>
          <button type='button' className='cancelar' onClick={handleCancelarClick}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};