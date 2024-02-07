import  { useState } from 'react';
import jsPDF from 'jspdf';
import reciboa from './reciboa.jpeg';

export const Rarrendatario = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    numeroArrendatario: '',
    cedula: '',
    recibidoDe: '',
    concepto: '',
    periodoDesde: '',
    periodoHasta: '',
    pagadoCon: '',
    direccion: '',
    recibidoPor: '',
  });

  const handleGuardarClick = () => {
    const doc = new jsPDF();
    const imgWidth = 30; // Ancho deseado de la imagen
    const imgHeight = 30; // Alto deseado de la imagen
    const x = 10; // Posición horizontal de la imagen
    const y = 10; // Posición vertical de la imagen
    doc.addImage(reciboa, 'JPEG', x, y, imgWidth, imgHeight); // Agregar imagen más pequeña y a la izquierda
    doc.text(`Recibo N.: ${formData.reciboNumber}`, imgWidth + 20, y + 10); // Agregar número de recibo al lado de la imagen
    let yOffset = imgHeight + 20; // Ajustar el desplazamiento vertical para el texto
    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key) && key !== 'reciboNumber') {
        const element = formData[key];
        doc.text(`${key}: ${element}`, 10, yOffset);
        yOffset += 10;
      }
    }
    doc.setFontSize(8); // Establecer el tamaño de fuente más pequeño
    doc.setFillColor(255, 255, 0); // Establecer el color de fondo amarillo
    doc.rect(0, doc.internal.pageSize.height - 20, doc.internal.pageSize.width, 20, 'F'); // Agregar un rectángulo amarillo en la parte inferior
    doc.text('Constructora e Inmobiliaria grupo 360 - Dir. Calle 48A # 23B-49 Palmira Tel: 60 2 2826103 Cel: 3006083511 - 3154861216 - 3226418672', 10, doc.internal.pageSize.height - 10); // Agregar el texto pequeño en la parte inferior
    doc.save('recibo.pdf');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src={reciboa} alt="recibo arrendatario" style={{ maxWidth: '50px', height: 'auto', marginRight: '10px' }} />
        <span style={{ fontSize: '12px' }}>Recibo arrendatario</span>
      </div>
      <label htmlFor="reciboNumber">Recibo N.:</label>
      <input type="text" id="reciboNumber" name="reciboNumber" onChange={handleInputChange} style={{ marginBottom: '10px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
          <label htmlFor="fecha">Fecha:</label>
          <input type="text" id="fecha" name="fecha" value={formData.fecha} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="numeroArrendatario">Número de arrendatario:</label>
          <input type="text" id="numeroArrendatario" name="numeroArrendatario" value={formData.numeroArrendatario} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="cedula">Cédula:</label>
          <input type="text" id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="recibidoDe">Recibido de:</label>
          <input type="text" id="recibidoDe" name="recibidoDe" value={formData.recibidoDe} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="concepto">Concepto:</label>
          <input type="text" id="concepto" name="concepto" value={formData.concepto} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="periodoDesde">Periodo desde:</label>
          <input type="text" id="periodoDesde" name="periodoDesde" value={formData.periodoDesde} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="periodoHasta">Periodo hasta:</label>
          <input type="text" id="periodoHasta" name="periodoHasta" value={formData.periodoHasta} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="pagadoCon">Pagado con:</label>
          <input type="text" id="pagadoCon" name="pagadoCon" value={formData.pagadoCon} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="direccion">Dirección:</label>
          <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="recibidoPor">Recibido por:</label>
          <input type="text" id="recibidoPor" name="recibidoPor" value={formData.recibidoPor} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
        </div>
      </div>
      <button type="button" style={{ backgroundColor: 'green' }} onClick={handleGuardarClick}>
        Guardar recibo
      </button>
    </form>
  );
};
