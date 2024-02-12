import React, { useState } from 'react';
import "./RegistroCodeudor.css";
import axios from 'axios';


export const RegistroCodeudor = () => {

  
  const [formData, setFormData] = useState({
    fecha: '',
    numeroIdentidad: '',
    nombre: '',
    codeudorDe: '',
    concepto: '',
    
    periodoDesde: '',
    periodoHasta: '',
    direccion: '',
    recibidoPor: '',
  });
  const handleGuardarClick = async () => {
    // Validar el formulario antes de guardar en la base de datos
    for (const key in formData) {
      const element = formData[key];
      if (!element) {
        alert(`Por favor, complete el campo ${key}`);
        return;
      }
    }
  
    try {
      // Realizar la solicitud POST a la API
      const response = await axios.post('/registro-codeudor', formData);
      console.log('Datos guardados:', response.data);
      // Aquí puedes manejar la respuesta de la API, por ejemplo, mostrar un mensaje de éxito al usuario
  
      // Si deseas realizar alguna acción adicional después de guardar los datos en la base de datos, puedes hacerlo aquí
  
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelarClick = () => {
    setFormData({
      fecha: '',
      numeroIdentidad: '',
      nombre: '',
      codeudorDe: '',
      concepto: '',
      
      periodoDesde: '',
      periodoHasta: '',
      
      direccion: '',
      recibidoPor: '',
    });
  };

  return (
    <div className='container'>
      <form className='formu'>
        <div className='titulo'>
          <span>REGISTRO DE ARRENDAMIENTO (CODEUDOR) </span>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label htmlFor='fecha'>Fecha:</label>
            <input type='date' id='fecha' name='fecha' value={formData.fecha} onChange={handleInputChange} />
            <label htmlFor='numeroIdentidad'>Número de identidad:</label>
            <input type='number' id='numeroIdentidad' name='numeroIdentidad' value={formData.numeroIdentidad} onChange={handleInputChange} />
            <label htmlFor='nombre'>Nombre:</label>
            <input type='text' id='nombre' name='nombre' value={formData.nombre} onChange={handleInputChange} />
            <label htmlFor='codeudorDe'>Codeudor de:</label>
            <input type='text' id='codeudorDe' name='codeudorDe' value={formData.codeudorDe} onChange={handleInputChange} />
            <label htmlFor='concepto'>Concepto:</label>
            <input type='text' id='concepto' name='concepto' value={formData.concepto} onChange={handleInputChange} />
           </div>
          <div className='col-md-6'>
            <label htmlFor='periodoDesde'>Periodo desde:</label>
            <input type='date' id='periodoDesde' name='periodoDesde' value={formData.periodoDesde} onChange={handleInputChange} />
            <label htmlFor='periodoHasta'>Periodo hasta:</label>
            <input type='date' id='periodoHasta' name='periodoHasta' value={formData.periodoHasta} onChange={handleInputChange} />
            <label htmlFor='direccion'>Dirección:</label>
            <input type='text' id='direccion' name='direccion' value={formData.direccion} onChange={handleInputChange} />
            <label htmlFor='recibidoPor'>Recibido por:</label>
            <input type='text' id='recibidoPor' name='recibidoPor' value={formData.recibidoPor} onChange={handleInputChange} />
          </div>
        </div>
        <div className='botones'>
          <button type='button' className='guardar' onClick={handleGuardarClick}>
            Guardar recibo
          </button>
          <button type='button' className='cancelar' onClick={handleCancelarClick}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};