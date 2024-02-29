import  { useState } from "react";
import "./ReciboGastos.css";
import logo from "../../../assets/Logo.png";   //logo.png
import html2pdf from "html2pdf.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const ReciboGastos = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Redireccion en caso de confirmar o cancelar
  const handleConfirmSave = () => {
    // Lógica para confirmar el guardado
    handleSubmit(handleSave)(); // Envia los datos
    setShowSaveModal(false); // Cierra el modal
  };

  const { handleSubmit } = useForm();

  const handleConfirmCancel = () => {
    window.location.href = "/H_gastos"
    handleSubmit(handleCancel)();
    setShowCancelModal(false); // Cierra el modal
  };

  const [formData, setFormData] = useState({
    numeroGasto: "",
    fecha: "",
    codigoPropietario: "",
    beneficiario: "",
    entregadoPor: "",
    seleccionGasto: "",
    valor: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


   
  const handleSave = () => {
    setShowSaveModal(true)
    // Validar que todos los campos estén llenos antes de guardar

    const notify = (text) => 
    toast.error(text, {
      theme: "colored",
      autoClose: 2000
    });
 
    for (const field in formData) {
      if (formData[field].trim() === "") {
        notify("No puede haber campos vacíos"); // Llama a la notificación una sola vez
        return; // Detén la ejecución del bucle al encontrar un campo vacío
      }
    }
    
    
    const input = document.getElementById("recibo-gastos");
    document.className = "todo";

    const options = {
      margin: 20,
      filename: "recibo-gastos.pdf",
      image: { type: "jpeg", quality: 0.2 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    const contenido = input.cloneNode(true);
    // Clase para el logo pequeño
    const logoElement = document.createElement("img");
    logoElement.src = logo;
    logoElement.className = "logo-pequeno";
    contenido.prepend(logoElement);

    html2pdf().from(contenido).set(options).save();
  };

  const handleCancel = () => {
    setShowCancelModal(true);
    // Limpiar los datos del formulario al hacer clic en Cancelar
    setFormData({
      numeroGasto: "",
      fecha: "",
      codigoPropietario: "",
      beneficiario: "",
      entregadoPor: "",
      seleccionGasto: "",
      seleccionGasto1: "",
      seleccionGasto2: "",
      seleccionGasto3: "",
      valor: "",
      valor1: "",
      valor2: "",
      valor3: "",
    });
  };

  return (
    <div className="home-2">
      <div className="contenedor-formulario" id="recibo-gastos">
        <h1 className="tit">Recibo de Gastos</h1>
        <form className="tod">
          <div className="fila-formulario1">
            <div className="grupo1">
              <label htmlFor="numeroGasto">Gasto N°:</label>
              <input
                type="text"
                className="form-control"
                id="numeroGasto"
                value={formData.numeroGasto}
                onChange={handleInputChange}
              />
              <label htmlFor="fecha">Fecha:</label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
              />
            </div>
            <div className="grupo2">
              <label htmlFor="codigoPropietario">Código propietario:</label>
              <input
                type="text"
                className="form-control"
                id="codigoPropietario"
                value={formData.codigoPropietario}
                onChange={handleInputChange}
              />
              <label htmlFor="beneficiario">Beneficiario:</label>
              <input
                type="text"
                className="form-control"
                id="beneficiario"
                value={formData.beneficiario}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="entregadopor">
            <label htmlFor="entregadoPor">Entregado por:</label>
            <input
              type="text"
              className="form-control"
              id="entregadoPor"
              value={formData.entregadoPor}
              onChange={handleInputChange}
            />
          </div>

          <div className="fila-formulario">
            <div className="grupo-formulario">
              <label htmlFor="seleccionGasto">Concepto:</label>
              <select
                id="seleccionGasto"
                value={formData.seleccionGasto}
                onChange={handleInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Pago arriendo mes">Pago arriendo mes</option>
                <option value="Administración inmobiliaria">
                  Administración inmobiliaria
                </option>
                <option value="Aseo entrega casa">Aseo entrega casa</option>
                <option value="Mantenimiento horno">Mantenimiento horno</option>
              </select>
              <select
                id="seleccionGasto1"
                value={formData.seleccionGasto1}
                onChange={handleInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Pago arriendo mes">Pago arriendo mes</option>
                <option value="Administración inmobiliaria">
                  Administración inmobiliaria
                </option>
                <option value="Aseo entrega casa">Aseo entrega casa</option>
                <option value="Mantenimiento horno">Mantenimiento horno</option>
              </select>
              <select
                id="seleccionGasto2"
                value={formData.seleccionGasto2}
                onChange={handleInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Pago arriendo mes">Pago arriendo mes</option>
                <option value="Administración inmobiliaria">
                  Administración inmobiliaria
                </option>
                <option value="Aseo entrega casa">Aseo entrega casa</option>
                <option value="Mantenimiento horno">Mantenimiento horno</option>
              </select>
              <select
                id="seleccionGasto3"
                value={formData.seleccionGasto3}
                onChange={handleInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Pago arriendo mes">Pago arriendo mes</option>
                <option value="Administración inmobiliaria">
                  Administración inmobiliaria
                </option>
                <option value="Aseo entrega casa">Aseo entrega casa</option>
                <option value="Mantenimiento horno">Mantenimiento horno</option>
              </select>
            </div>
            <div className="valor">
              <label htmlFor="valor">Valor</label>
              <input
                type="text"
                className="form-control"
                id="valor"
                value={formData.valor}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="form-control"
                id="valor1"
                value={formData.valor1}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="form-control"
                id="valor2"
                value={formData.valor2}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="form-control"
                id="valor3"
                value={formData.valor3}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="btns">
        <Button
          type="button"
          variant="success m-2"
          onClick={() => setShowSaveModal(true)}
        >
          <FontAwesomeIcon icon={faSave} />
          <span className="text_button ms-2">Guardar</span>
        </Button>

        {/* Botón de cancelar */}
        <Button
          type="button"
          variant="danger m-2"
          onClick={() => setShowCancelModal(true)}
        >
          <FontAwesomeIcon icon={faTimes} />
          <span className="text_button ms-2">Cancelar</span>
        </Button>
      </div>
      {/* Modal de confirmación de guardar */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton={false}>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas guardar los cambios?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => {handleConfirmSave(); handleSave();}} >
            Sí
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación de cancelar */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton={false}>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas cancelar la operación?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => {handleConfirmCancel(); handleCancel();}}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
