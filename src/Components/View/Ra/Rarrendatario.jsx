import React, { useState } from 'react';
import jsPDF from 'jspdf';
import reciboa from '../Ra/reciboa.jpeg';
import '../Ra/Rarrendatario.css';
export const Rarrendatario = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    cedula: '',
    concepto: '',
    direccion: '',
    recibido_Por: '',
    periodo_Desde: '',
    periodo_Hasta: '',
    numero_del_Arrendatario: '',
  });

  const handleGuardarClick = () => {
    // Check if any field is empty
    for (const key in formData) {
      const element = formData[key];
      if (!element) {
        alert(`Por favor, complete el campo ${key}`);
        return;
      }
    }

    const doc = new jsPDF();
    const imgWidth = 30;
    const imgHeight = 30;
    const x = 10;
    const y = 10;
    doc.text(`RECIBO DE ARRENDAMIENTO `, imgWidth + 20, y + 10); // Agregar Recibo N° al principio
    let yOffset = imgHeight + 20;
    for (const key in formData) {
      const element = formData[key];
      if (element) {
        doc.text(`${key}: ${element}`, 10, yOffset);
        yOffset += 10;
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelarClick = () => {
    setFormData({
      fecha: '',
      cedula: '',
      concepto: '',
      direccion: '',
      recibido_Por: '',
      periodo_Desde: '',
      periodo_Hasta: '',
      numero_del_Arrendatario: '',
    });
  };


    return (
      <form className='formu'>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img src={reciboa} alt="recibo arrendatario" style={{ maxWidth: '80%', height: 'auto', marginRight: '10px' }} />
        </div>
         <center> <span style={{ fontSize: '18px' }}>RECIBO DE ARRENDATARIO </span>  </center>
    
    
 
      
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
          <label htmlFor="fecha">Fecha:</label>
          
          <input type="text" id="fecha" name="fecha" value={formData.fecha} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="numeroArrendatario">Número de arrendatario:</label>
          <input type="text" id="numeroArrendatario" name="numero_del_Arrendatario" value={formData.numero_del_Arrendatario} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="cedula">Cédula:</label>
          <input type="text" id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="recibidoDe">Recibido de:</label>
          <input type="text" id="recibidoDe" name="recibido_Por" value={formData.recibido_Por} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="concepto">Concepto:</label>
          <input type="text" id="concepto" name="concepto" value={formData.concepto} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="periodoDesde">Periodo desde:</label>
          <input type="text" id="periodoDesde" name="periodo_Desde" value={formData.periodo_Desde} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="periodoHasta">Periodo hasta:</label>
          <input type="text" id="periodoHasta" name="periodo_Hasta" value={formData.periodo_Hasta} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="pagadoCon">Pagado con:</label>
          <input type="text" id="pagadoCon" name="pagadoCon" value={formData.pagadoCon} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="direccion">Dirección:</label>
          <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <label htmlFor="recibidoPor">Recibido por:</label>
          <input type="text" id="recibidoPor" name="recibidoPor" value={formData.recibidoPor} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
         
      <button type="button" style={{ backgroundColor: 'green' }} onClick={handleGuardarClick}>
        Guardar recibo
      </button>
      <button type="button" style={{ backgroundColor: 'red', marginLeft: '10px' }} onClick={handleCancelarClick}>
        Cancelar
      </button>
        
        </div>
      </div>
     
    </form>
  );
};
