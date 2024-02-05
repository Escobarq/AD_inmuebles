import React from 'react'
import '../assets/ReciboGastos.css'
import { useReactToPrint } from 'react-to-print'
import React, {useState, useRef } from "react"




function Userlisting(){
    const conponentPDF= useRef
    const [ userData, setUserdata] = useState([]);
}
const generatePDF= useReactToPrint({
    content: ()=> conponentPDF.current,
    documentTitle:"Userdata",
    onAfterPrint:()=>alert("Data saved in PDF")
});



export const ReciboGastos = () => {


    return (
        <>
            <div className="contener-home">
                <div ref={conponentPDF} style={{width:'100%'}}>
                <form>
                    <div className='col1'>
                        <label>
                            Gastó N°:
                            <input type="text" />
                        </label>
                        <label>
                            Fecha:
                            <input type="text" />
                        </label>
                    </div>
                    <div className='col2'>
                        <label>
                            Código propietario:
                            <input type="text" />
                        </label>
                        <label>
                            Beneficiario:
                            <input type="text" />
                        </label>
                    </div>
                    <label>
                        Entregado por:
                        <input type="text" />
                    </label>
                    <div className='col3'>
                        <label>
                            Seleccione:
                            <select>
                                <option value="Pago arriendo mes"></option>
                                <option value="Pago arriendo mes">Pago arriendo mes</option>
                                <option value="Administración inmobiliaria">Administración inmobiliaria</option>
                                <option value="Aseo entrega casa">Aseo entrega casa</option>
                                <option value="Mantenimiento horno">Mantenimiento horno</option>
                            </select>
                        </label>
                    </div>
                </form>
                </div>
                <div class="iconos">
                    <button className='btn btn-success' onClick={generatePDF}>PDF</button>
                    <button class="cancelar" onclick="cancelarFormulario()">Cancelar</button>
                </div>
            </div>

        </>
    )
}
