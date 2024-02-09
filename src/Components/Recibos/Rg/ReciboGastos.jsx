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

        const options = {
            margin: 20,
            filename: 'recibo-gastos.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const contenido = input.cloneNode(true);

        const logoElement = document.createElement('img');
        logoElement.src = logo;
        logoElement.className = 'logo-pequeno'; // Clase para el logo pequeño
        contenido.prepend(logoElement);

        const tituloElement = document.createElement('h1');
        tituloElement.innerText = 'Recibo de Gastos';
        contenido.prepend(tituloElement);

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
            valor: ''
        });
    };

    return (
        <div className="contener-home contener-ingry">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo-pequeno" />
            </div>
            <div className="contenedor-formulario" id="recibo-gastos">
                <form>
                    <div className="fila-formulario1">
                        <div className="grupo1">
                            <label htmlFor="numeroGasto">Gasto N°:</label>
                            <input type="text" id="numeroGasto" value={formData.numeroGasto} onChange={handleInputChange} />
                            <label htmlFor="fecha">Fecha:</label>
                            <input type="date" id="fecha" value={formData.fecha} onChange={handleInputChange} />
                        </div>
                        <div className="grupo2">
                            <label htmlFor="codigoPropietario">Código propietario:</label>
                            <input type="text" id="codigoPropietario" value={formData.codigoPropietario} onChange={handleInputChange} />
                            <label htmlFor="beneficiario">Beneficiario:</label>
                            <input type="text" id="beneficiario" value={formData.beneficiario} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="entregadopor">
                        <label htmlFor="entregadoPor">Entregado por:</label>
                        <input type="text" id="entregadoPor" value={formData.entregadoPor} onChange={handleInputChange} />
                    </div>
                    <div className="fila-formulario">
                        <div className="grupo-formulario">
                            <label htmlFor="seleccionGasto">Seleccione:</label>
                            <select id="seleccionGasto" value={formData.seleccionGasto} onChange={handleInputChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="Pago arriendo mes">Pago arriendo mes</option>
                                <option value="Administración inmobiliaria">Administración inmobiliaria</option>
                                <option value="Aseo entrega casa">Aseo entrega casa</option>
                                <option value="Mantenimiento horno">Mantenimiento horno</option>
                            </select>
                        </div>
                        <div className="valor">
                            <label htmlFor="valor">Valor</label>
                            <input type="text" id="valor" value={formData.valor} onChange={handleInputChange} />
                        </div>
                    </div>
                </form>
            </div>
            <div className="btns">
                <button className='btn btn-success guardar-btn' onClick={handleSave}>Guardar</button>
                <button className='btn btn-cancelar cancelar-btn' onClick={handleCancel}>Cancelar</button>
            </div>
        </div>
    );
};
