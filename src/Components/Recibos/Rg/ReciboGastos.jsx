import React, { useState } from 'react';
import './ReciboGastos.css';
import logo from '../../../assets/logo.png';
import html2pdf from 'html2pdf.js';

export const ReciboGastos = () => {
    const [formData, setFormData] = useState({
        numeroGasto: '',
        fecha: '',
        codigoPropietario: '',
        beneficiario: '',
        entregadoPor: '',
        seleccionGasto: '',
        valor: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSave = () => {
        // Validar que todos los campos estén llenos antes de guardar
        for (const field in formData) {
            if (formData[field].trim() === '') {
                alert(`El campo ${field} no puede estar vacío.`);
                return;
            }
        }

        const input = document.getElementById('recibo-gastos');
        document.className = 'todo';

        const options = {
            margin: 20,
            filename: 'recibo-gastos.pdf',
            image: { type: 'jpeg', quality: 0.20 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const contenido = input.cloneNode(true);
         // Clase para el logo pequeño
        const logoElement = document.createElement('img');
        logoElement.src = logo;
        logoElement.className = 'logo-pequeno';
        contenido.prepend(logoElement);



        html2pdf().from(contenido).set(options).save();
    };

    const handleCancel = () => {
        // Limpiar los datos del formulario al hacer clic en Cancelar
        setFormData({
            numeroGasto: '',
            fecha: '',
            codigoPropietario: '',
            beneficiario: '',
            entregadoPor: '',
            seleccionGasto: '',
            seleccionGasto1: '',
            seleccionGasto2: '',
            seleccionGasto3: '',
            valor: '',
            valor1: '',
            valor2: '',
            valor3: ''
        });
    };

    return (
    <div className="container">

    <div className="contener-home contener-ingry">
        <div className="contenedor-formulario" id="recibo-gastos">
        <h1 className='tit'>Recibo de Gastos</h1>
            <form className='tod'>
          


                <div className="fila-formulario1">
                    <div className="grupo1">
                        <label htmlFor="numeroGasto">Gasto N°:</label>
                        <input type="text" className="form-control" id="numeroGasto" value={formData.numeroGasto} onChange={handleInputChange} />
                        <label htmlFor="fecha">Fecha:</label>
                        <input type="date" className="form-control" id="fecha" value={formData.fecha} onChange={handleInputChange} />
                    </div>
                    <div className="grupo2">
                        <label htmlFor="codigoPropietario">Código propietario:</label>
                        <input type="text" className="form-control" id="codigoPropietario" value={formData.codigoPropietario} onChange={handleInputChange} />
                        <label htmlFor="beneficiario">Beneficiario:</label>
                        <input type="text" className="form-control" id="beneficiario" value={formData.beneficiario} onChange={handleInputChange} />
                    </div>
                </div>


                <div className="entregadopor">
                    <label htmlFor="entregadoPor">Entregado por:</label>
                    <input type="text" className="form-control" id="entregadoPor" value={formData.entregadoPor} onChange={handleInputChange} />
                </div>


                <div className="fila-formulario">
                    <div className="grupo-formulario">
                        <label htmlFor="seleccionGasto">Seleccione:</label>
                        <select className="form-control" id="seleccionGasto" value={formData.seleccionGasto} onChange={handleInputChange}>
                            <option value="">Seleccione una opción</option>
                            <option value="Pago arriendo mes">Pago arriendo mes</option>
                            <option value="Administración inmobiliaria">Administración inmobiliaria</option>
                            <option value="Aseo entrega casa">Aseo entrega casa</option>
                            <option value="Mantenimiento horno">Mantenimiento horno</option>
                        </select>
                        <select className="" id="seleccionGasto1" value={formData.seleccionGasto1} onChange={handleInputChange}>
                            <option value="">Seleccione una opción</option>
                            <option value="Pago arriendo mes">Pago arriendo mes</option>
                            <option value="Administración inmobiliaria">Administración inmobiliaria</option>
                            <option value="Aseo entrega casa">Aseo entrega casa</option>
                            <option value="Mantenimiento horno">Mantenimiento horno</option>
                        </select>
                        <select className="form-control" id="seleccionGasto2" value={formData.seleccionGasto2} onChange={handleInputChange}>
                            <option value="">Seleccione una opción</option>
                            <option value="Pago arriendo mes">Pago arriendo mes</option>
                            <option value="Administración inmobiliaria">Administración inmobiliaria</option>
                            <option value="Aseo entrega casa">Aseo entrega casa</option>
                            <option value="Mantenimiento horno">Mantenimiento horno</option>
                        </select>
                        <select className="form-control" id="seleccionGasto3" value={formData.seleccionGasto3} onChange={handleInputChange}>
                            <option value="">Seleccione una opción</option>
                            <option value="Pago arriendo mes">Pago arriendo mes</option>
                            <option value="Administración inmobiliaria">Administración inmobiliaria</option>
                            <option value="Aseo entrega casa">Aseo entrega casa</option>
                            <option value="Mantenimiento horno">Mantenimiento horno</option>
                        </select>
                    </div>
                    <div className="valor">
                        <label htmlFor="valor">Valor</label>
                        <input type="text" className="form-control" id="valor" value={formData.valor} onChange={handleInputChange} />
                        <input type="text" className="form-control" id="valor1" value={formData.valor1} onChange={handleInputChange} />
                        <input type="text" className="form-control" id="valor2" value={formData.valor2} onChange={handleInputChange} />
                        <input type="text" className="form-control" id="valor3" value={formData.valor3} onChange={handleInputChange} />
                    </div>
                </div>
            </form>
        </div>
        <div className="btns">
            <button className='btn btn-success guardar-btn' onClick={handleSave}>Generar</button>
            <button className='btn btn-cancelar cancelar-btn' onClick={handleCancel}>Cancelar</button>
        </div>
    </div>
</div>

    );
};
