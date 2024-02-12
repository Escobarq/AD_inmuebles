import React, { useState } from 'react';
import "./RegistroCodeudor.css";
import { useForm } from "react-hook-form";



export const RegistroCodeudor = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmitRegistro = async (data) => {
    console.log(data)
    try {
      const response = await fetch('http://localhost:3006/Rcodeudor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        reset(); // Reinicia el formulario si la solicitud es exitosa
        // Muestra un mensaje de éxito o redirige a otra página
      } else {
        // Maneja la respuesta de error del servidor
      }
    } catch (error) {
      // Maneja los errores de red o de la aplicación
      console.error('Error al enviar datos al servidor:', error);
    }
  };


  return (
    <div className='container'>
      <form className='formu'  onSubmit={handleSubmit(onsubmitRegistro)} method="post">
        <div className='titulo'>
          <h1 className='tittle__c'>Registro  Codeudor </h1>
        </div>
        <div className='row'>
          <div className='col-md-6'>
          <label htmlFor='nombre'>Nombre:</label>
            <input type='text' id='nombre' name='nombrecompleto' {...register("nombrecompleto")}  />
            <label htmlFor='numeroIdentidad'>Número de identidad:</label>
            <input type='number' id='numeroIdentidad' name='documentoidentidad' {...register("documentoidentidad")} max={9999999999}/>
            <label htmlFor='codeudorDe'>Telefono:</label>
            <input type='number' id='telefono' name='telefono' {...register("telefono")}  max={9999999999}/>
            <label htmlFor='concepto'>Correo</label>
            <input type='email' id='correoelectronico' name='correoelectronico' {...register("correoelectronico")}  />
           </div>
          <div className='col-md-6'>
            <label htmlFor='direccion'>Dirección:</label>
            <input type='text' id='direccion' name='direccion' {...register("direccion")}  />
          </div>
        </div>
        <div className='botones'>
          <button type='submit' className='guardar'>
            Guardar recibo
          </button>
          <button type='button' className='cancelar'>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};