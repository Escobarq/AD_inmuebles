import React from 'react';
import './ReciboGastos.css';
import logo from '../../../assets/logo.png';
import html2pdf from 'html2pdf.js';

export const ReciboGastos = () => {

    const handleSave = () => {
        const input = document.getElementById('recibo-gastos');

        const options = {
            margin: 20,
            filename: 'recibo-gastos.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Obtener el contenido del formulario
        const contenido = input.cloneNode(true);

        // Agregar el logo al contenido
        const logoElement = document.createElement('img');
        logoElement.src = logo;
        logoElement.className = 'logo';
        contenido.prepend(logoElement);

        // Agregar el título al contenido
        const tituloElement = document.createElement('h1');
        tituloElement.innerText = 'Recibo de Gastos';
        contenido.prepend(tituloElement);

        // Generar el PDF
        html2pdf().from(contenido).set(options).save();
    };

    return (
        <div className="contener-home">
            <div className="contenedor-formulario" id="recibo-gastos">
                <form>
                    <div className="fila-formulario">
                        <div className="grupo-formulario">
                            <label htmlFor="numeroGasto">Gasto N°:</label>
                            <input type="text" id="numeroGasto" />
                        </div>
                        <div className="grupo-formulario">
                            <label htmlFor="fecha">Fecha:</label>
                            <input type="text" id="fecha" />
                        </div>
                    </div>
                    <div className="fila-formulario">
                        <div className="grupo-formulario">
                            <label htmlFor="codigoPropietario">Código propietario:</label>
                            <input type="text" id="codigoPropietario" />
                        </div>
                        <div className="grupo-formulario">
                            <label htmlFor="beneficiario">Beneficiario:</label>
                            <input type="text" id="beneficiario" />
                        </div>
                    </div>
                    <div className="fila-formulario">
                        <div className="grupo-formulario">
                            <label htmlFor="entregadoPor">Entregado por:</label>
                            <input type="text" id="entregadoPor" />
                        </div>
                        <div className="grupo-formulario">
                            <label htmlFor="seleccionGasto">Seleccione:</label>
                            <select id="seleccionGasto">
                                <option value="Pago arriendo mes">Pago arriendo mes</option>
                                <option value="Administración inmobiliaria">Administración inmobiliaria</option>
                                <option value="Aseo entrega casa">Aseo entrega casa</option>
                                <option value="Mantenimiento horno">Mantenimiento horno</option>
                            </select>
                            <select id="seleccionGasto">
                                <option value="Pago arriendo mes">Pago arriendo mes</option>
                                <option value="Administración inmobiliaria">Administración inmobiliaria</option>
                                <option value="Aseo entrega casa">Aseo entrega casa</option>
                                <option value="Mantenimiento horno">Mantenimiento horno</option>
                            </select>
                            <select id="seleccionGasto">
                                <option value="Pago arriendo mes">Pago arriendo mes</option>
                                <option value="Administración inmobiliaria">Administración inmobiliaria</option>
                                <option value="Aseo entrega casa">Aseo entrega casa</option>
                                <option value="Mantenimiento horno">Mantenimiento horno</option>
                            </select>
                            <select id="seleccionGasto">
                                <option value="Pago arriendo mes">Pago arriendo mes</option>
                                <option value="Administración inmobiliaria">Administración inmobiliaria</option>
                                <option value="Aseo entrega casa">Aseo entrega casa</option>
                                <option value="Mantenimiento horno">Mantenimiento horno</option>
                            </select>
                        </div>

                        <div className="valor">
                            <label htmlFor="valor">Valor</label>
                            <input type="text" id="valor" />
                            <input type="text" id="valor" />
                            <input type="text" id="valor" />
                            <input type="text" id="valor" />
                        </div>

                    </div>
                </form>
            </div>
            <button className='btn btn-success guardar-btn' onClick={handleSave}>Guardar</button>
        </div>
    );
};
