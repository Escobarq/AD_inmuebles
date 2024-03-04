import { useEffect, useState } from "react";
import { Button, Form, Modal, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; // Importar StandardFonts
import moment from "moment";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";

export const Rarrendatario = () => {
  const [formData, setFormData] = useState({

  });

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [showContratoModal, setShowContratoModal] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState("");
  const [ContratosDisponibles, setContratosDisponibles] = useState([]);

  const success = (text) =>
    toast.success(text, {
      theme: "colored",
    });
  const falla = (text) =>
    toast.error(text, {
      theme: "colored",
    });

  const fallo = (text) =>
    toast.error(text, {
      theme: "colored",
    });
    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    // Función para obtener la fecha actual en formato YYYY-MM-DD
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;
  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
  return `${year}-${month}-${day}`;
}
useEffect(() => {
  cargarContratosDisponibles();
  setCurrentDate(getCurrentDate());
}, []);

const cargarContratosDisponibles = async () => {
  try {
    const response = await axios.get("http://localhost:3006/contrato-arren-inmue");
    const Contratos = response.data.map((prop) => prop);

    setContratosDisponibles(Contratos);

    console.log(response.data);
  } catch (error) {
    console.error("Error al cargar las matrículas:", error);
    toast.error("Error al cargar las matrículas. Inténtalo de nuevo más tarde.");
  }
};


const onSubmitRegistro = async (data) => {
  data.IdContrato = selectedContrato.IdContrato
  data.IdArrendatario = selectedContrato.IdArrendatario
  data.FechaPago = currentDate
  data.Estado = "Pagado"
  console.log(data);
  try {
    const response = await fetch('http://localhost:3006/RPagoArrendamiento', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Aquí debes asegurarte de que data contenga todos los campos necesarios
    });
    if (response.ok) {
      success()
      setShowSaveModal(false); // Muestra el modal de confirmación
      reset(); 
    }
  } catch (error) {
    console.error("Error al enviar datos al servidor:", error);
  }
};


  const handleConfirmSave = async () => {
    handleSubmit(onSubmitRegistro)(); 
    setShowSaveModal(false);
    // Verificar que todos los campos estén completos
    for (const key in formData) {
      const element = formData[key];
      if (!element) {
        falla(`Por favor, complete el campo ${key}`);
        return;
      }
    }

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 15;
      const padding = 50;

      // Centrar el título "RECIBO DE ARRENDAMIENTO"
      const titleText = "RECIBO DE ARRENDAMIENTO";
      const titleWidth = titleText.length * fontSize * 0.5; // Ajustar según la anchura promedio de caracteres
      const titleX = (width - titleWidth) / 2;
      const titleY = height - padding - fontSize;

      const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold); // Usar StandardFonts
      page.drawText(titleText, {
        x: titleX,
        y: titleY,
        size: fontSize,
        font: titleFont,
        color: rgb(0, 0, 0),
      });

      // Mover la fecha a la esquina superior derecha
      const dateText = moment().format("MMMM D, YYYY");
      const dateWidth = dateText.length * fontSize * 0.5; // Ajustar según la anchura promedio de caracteres
      const dateX = width - padding - dateWidth;
      const dateY = height - padding - fontSize;

      const textFont = await pdfDoc.embedFont(StandardFonts.Helvetica); // Usar StandardFonts
      page.drawText(dateText, {
        x: dateX,
        y: dateY,
        size: fontSize,
        font: textFont,
        color: rgb(0, 0, 0),
      });

      let yOffset = height - padding - fontSize * 4;
      for (const key in formData) {
        const element = formData[key];
        if (element) {
          // Mostrar solo los valores de los campos y mejorar el formato
          page.drawText(`${element}`, {
            x: padding,
            y: yOffset,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
          yOffset -= fontSize * 1.5; // Ajustar la altura de línea para una mejor legibilidad
        }
      }

      // Agregar texto alusivo y espacio para firma
      const alusivoText = "Texto alusivo...";
      const signatureSpaceY = 100;
      page.drawText(alusivoText, {
        x: padding,
        y: signatureSpaceY,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "recibo.pdf";
      link.click();
    } catch (error) {
      console.error(error);
      fallo("Ocurrió un error al generar el PDF");
    }
  };

  const handleContratoChange = async (Contrato) => {
    setSelectedContrato(Contrato);
    setShowContratoModal(false);
  };


  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    // Restablecer los campos del formulario al cancelar
    setFormData({

    });
    window.location.href = "/H_recibos";
  };

  const   handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <div className="contener-home contener-ReArrendatario">
      <h2 style={{ textAlign: "center" }}>Recibo Arrendatario</h2>
      <div className="container">
        <Form  action="" onSubmit={handleSubmit(onSubmitRegistro)}>
          <div className="form-propietario">
            <Form.Group controlId="fecha">
              <Form.Label>Fecha de Pago:</Form.Label>
              <Form.Control className="InputsRegistros"
              disabled
                defaultValue={currentDate}
                type="date"                         
              />
            </Form.Group>

            <Form.Group controlId="documentoIdentidad">
              <Form.Label>Contrato:</Form.Label>
              <Form.Select className="InputsRegistros"
                value={
                  selectedContrato
                    ? selectedContrato.IdContrato
                    : ""
                }
                onChange={(e) => handleContratoChange(e.target.value)}
                onClick={() => setShowContratoModal(true)}
              >
                <option value="">Seleccionar Numero de contrato</option>
                {ContratosDisponibles.map((Contrato, index) => (
                  <option key={index} value={Contrato.IdContrato}>
                    {Contrato.IdContrato}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="nombre">
              <Form.Label>No Documento Arrendatario:</Form.Label>
              <Form.Control className="InputsRegistros"
              disabled
              value={
                selectedContrato
                  ? selectedContrato.DocumentoIdentidad
                  : ""
              }
                type="text"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="nombre">
              <Form.Label>No Matricula Inmueble:</Form.Label>
              <Form.Control className="InputsRegistros"
              disabled
              value={
                selectedContrato
                  ? selectedContrato.NoMatricula
                  : ""
              }
                type="text"                
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="nombre">
              <Form.Label>Nombre Arrendatario:</Form.Label>
              <Form.Control className="InputsRegistros"
              disabled
              value={
                selectedContrato
                  ? selectedContrato.NombreArrendatario
                  : ""
              }
                type="text"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="nombre">
              <Form.Label>Tipo de Inmueble:</Form.Label>
              <Form.Control className="InputsRegistros"
              disabled
              value={
                selectedContrato
                  ? selectedContrato.TipoInmueble
                  : ""
              }
                type="text"                
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="suma">
              <Form.Label>Valor del Pago:</Form.Label>
              <Form.Control className="InputsRegistros"
                type="number"
                {...register("ValorPago")}
                
              />
            </Form.Group>

            

            <Form.Group controlId="pagadoCon">
              <Form.Label>Forma de Pagado:</Form.Label>
              <Form.Select
              {...register("FormaPago")}
              className="formSelect InputsRegistros"
              aria-label="Default select example"
              required
            >
              <option defaultValue="Cedula Ciudadania">Efectivo</option>
              <option defaultValue="Cedula Extranjera">Transferencia</option>
            </Form.Select>
            </Form.Group>


            <Form.Group controlId="periodoDesde">
              <Form.Label>Fecha Inicial de Pago:</Form.Label>
              <Form.Control className="InputsRegistros"
                type="date"
                {...register("FechaIni")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="periodoHasta">
              <Form.Label>Fecha Final Pago:</Form.Label>
              <Form.Control className="InputsRegistros"
                type="date"
                {...register("FechaFin")}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div
            className="buttons"
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="button"
              variant="success m-2"
              onClick={() => setShowSaveModal(true)}
            >
              <FontAwesomeIcon icon={faSave} />
              <span className="text_button ms-2">Guardar</span>
            </Button>

            <Button
              type="button"
              variant="danger m-2"
              onClick={handleCancelClick}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span className="text_button ms-2">Cancelar</span>
            </Button>
          </div>
        </Form>
      </div>

            {/* Modal de lista de contratos */}
      <Modal
        show={showContratoModal}
        onHide={() => setShowContratoModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Matrícula</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {ContratosDisponibles.map((Contrato, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleContratoChange(Contrato)}
              >
                {Contrato.IdContrato}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

      {/* Modal de confirmación para guardar */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Guardar</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea guardar?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación para cancelar */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cancelar</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea cancelar?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Volver
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
