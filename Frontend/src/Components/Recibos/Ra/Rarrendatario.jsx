import { useEffect, useState } from "react";
import { Button, Form, Modal, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { PDFDocument, rgb } from "pdf-lib"; // Importar StandardFonts
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import logo from "../../../assets/Logo.jpg";
import moment from "moment";
import "moment/locale/es";
export const Rarrendatario = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [showContratoModal, setShowContratoModal] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState("");
  const [ContratosDisponibles, setContratosDisponibles] = useState([]);
  const [showFechaModal, setShowFechaModal] = useState(false);
  const [FechasPagosFijas, setFechasPagosFijas] = useState([]);
  const [selectedFecha, setSelectedFecha] = useState("");

  const funcional = (text) =>
    toast.success(text, {
      theme: "colored",
    });

  const falla = (text) =>
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
      const response = await axios.get(
        "http://localhost:3006/contrato-arren-inmue"
      );
      const Contratos = response.data.map((prop) => prop);
      setContratosDisponibles(Contratos);
      console.log(response.data);
    } catch (error) {
      console.error("Error al cargar las matrículas:", error);
      toast.error(
        "Error al cargar las matrículas. Inténtalo de nuevo más tarde."
      );
    }
  };
  const cargarFechasContratos = async (Contrato) => {
    try {
      const response = await axios.get(
        `http://localhost:3006/VPagoArren?IdContrato=${Contrato.IdContrato}&estado=Pendiente`
      );
      const FechasPagosFijas = response.data.map((prop) => prop);
      setFechasPagosFijas(FechasPagosFijas);
      console.log("fechas", FechasPagosFijas);
    } catch (error) {
      console.error("Error al cargar las matrículas:", error);
      toast.error(
        "Error al cargar las matrículas. Inténtalo de nuevo más tarde."
      );
    }
  };

  const onSubmitRegistro = async (data) => {
    data.NombreArrendatario = selectedContrato.NombreArrendatario;
    data.IdContrato = selectedContrato.IdContrato;
    data.IdPagoArrendamiento = selectedFecha.IdPagoArrendamiento;
    data.IdArrendatario = selectedContrato.IdArrendatario;
    data.FechaPago = currentDate;
    data.NoDocumento = selectedContrato.DocumentoIdentidad;
    data.NoMatricula = selectedContrato.NoMatricula;
    data.TipoInmueble = selectedContrato.TipoInmueble;
    data.FechaPagoFija = getCurrentDate(selectedFecha.FechaPagoFija);
    if (currentDate > selectedFecha.FechaPagoFija) {
      data.Estado = "Atrasado"
    }
    else if (currentDate < selectedFecha.FechaPagoFija) {
      data.Estado = "Adelantado"
    }
    else {

      data.Estado = "AlDia"
    }

    try {
      const response = await fetch("http://localhost:3006/RPagoArrendamiento", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Aquí debes asegurarte de que data contenga todos los campos necesarios
      });
      if (response.ok) {
        handleGuardarClick(data),
          funcional('se an enviado los datos correctamente'),
          setShowSaveModal(false); // Muestra el modal de confirmación
        reset();
      }
    } catch (error) {
      falla("Error al enviar datos al servidor:", error);
    }
  };


  const handleConfirmSave = async () => {
    handleSubmit(onSubmitRegistro)();
    setShowSaveModal(false);
  };

  const handleContratoChange = async (Contrato) => {
    setSelectedContrato(Contrato);
    cargarFechasContratos(Contrato)
    setShowContratoModal(false);
  };
  const handleFechasChange = async (Fechas) => {
    setSelectedFecha(Fechas);
    setShowFechaModal(false);
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    // Restablecer los campos del formulario al cancelar
    setFormData({});
    window.location.href = "/H_recibos";
  };

  const [pagosSeleccionados, setPagosSeleccionados] = useState(new Set());
  const [IdpagosSeleccionados, setIdPagosSeleccionados] = useState(new Set());

  // Función para manejar el cambio de estado cuando se hace clic en el interruptor
  const handleSwitchChange = (index) => {
    const nuevaListaFechasPagos = new Set(pagosSeleccionados);
    const nuevaListaPagos = new Set(IdpagosSeleccionados);

    // Si el índice ya está en el conjunto, lo eliminamos, de lo contrario lo agregamos
    if (nuevaListaFechasPagos.has(formatDate(index.FechaPagoFija))) {
      nuevaListaFechasPagos.delete(formatDate(index.FechaPagoFija));
    } else {
      nuevaListaFechasPagos.add(formatDate(index.FechaPagoFija));
    }
    if (nuevaListaPagos.has(index.IdPagoArrendamiento)) {
      nuevaListaPagos.delete(index.IdPagoArrendamiento);
    } else {
      nuevaListaPagos.add(index.IdPagoArrendamiento);
    }
    console.log(nuevaListaFechasPagos);
    console.log(nuevaListaPagos);
    // Actualizar el estado con la nueva lista de pagos seleccionados
    setPagosSeleccionados(nuevaListaFechasPagos);
    setIdPagosSeleccionados(nuevaListaPagos);
  };

  const mostrarFechasSeleccionadas = () => {
    // Convertir el conjunto de fechas seleccionadas a una cadena separada por comas
    return Array.from(pagosSeleccionados)
      .map((index) => formatDate(FechasPagosFijas[index]))
      .join(', ');
  };

  //FUNCION PARA GENERAR PDF
  const handleGuardarClick = async (data) => {

    const order = [
      "NoDocumento",
      "NombreArrendatario",
      "NoMatricula",
      "TipoInmueble",
      "FormaPago",
      "ValorPago",
      "FechaPago",
      "FechaPagoFija",
      "Estado",
    ];
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 19;
      const padding = 50;
      const currentfech = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      const footerText = `Hora de emisión: ${currentTime}`;
      const textWidth = (await pdfDoc.embedFont("Helvetica")).widthOfTextAtSize(currentfech, fontSize);
      const textX = width - padding - textWidth;




      page.drawText(footerText, {
        x: padding,
        y: padding,
        size: 13,
        color: rgb(0.5, 0.5, 0.5),
        font: await pdfDoc.embedFont("Helvetica"),
      });

      let leftX = padding;
      let rightX = width / 2 + 20;
      let yOffset = height - padding - fontSize * 2;
      const logoImageBytes = await fetch(logo).then((res) => res.arrayBuffer());
      const logoImage = await pdfDoc.embedJpg(logoImageBytes);

      //encabezado-pdf
      page.drawImage(logoImage, {
        x: padding - 10,
        y: height - padding - fontSize * 0.6,
        width: 100,
        height: 50,
        color: rgb(0.7, 0.7, 0.7),
      });

      page.drawText("Adminmuebles", {
        x: padding + 120,
        y: height - padding - fontSize * 0.0,
        size: fontSize + 0,
        color: rgb(0.8, 0.8, 0.8),
        font: await pdfDoc.embedFont("Helvetica"),
      });

      page.drawText(`${currentfech}`, {
        x: textX,
        y: height - padding - fontSize * 0.1,
        size: fontSize - 2,
        color: rgb(0.5, 0.5, 0.5),
        font: await pdfDoc.embedFont("Helvetica"),
      });

      // Título del recibo
      page.drawText("Recibo de Arrendatario", {
        x: width / 10,
        y: height - padding - fontSize * 6,
        size: fontSize + 9,
        font: await pdfDoc.embedFont("Helvetica"),
      });
      yOffset -= fontSize * 9;

      // los campos y las respuestas en el orden especificado
      for (const key of order) {
        const element = data[key];
        if (element) {
          //el nombre del campo en negrita y centrado
          page.drawText(`${key}:`, {
            x: leftX,
            y: yOffset,
            size: fontSize,
            color: rgb(0, 0, 0),
            font: await pdfDoc.embedFont("Helvetica-Bold"),
            align: "right",
          });



          //la respuesta debajo del nombre del campo

          if (key == "ValorPago"){

            page.drawText(`$${element}`, {
              x: leftX,
              y: yOffset - fontSize * 1.5,
              size: fontSize,
              color: rgb(0, 0, 0),
              align: "left",
            });

          } else {

            page.drawText(`${element}`, {
              x: leftX,
              y: yOffset - fontSize * 1.5,
              size: fontSize,
              color: rgb(0, 0, 0),
              align: "left",
            });

          }

         

          if (leftX === padding) {
            leftX = rightX;
          } else {
            leftX = padding;
            yOffset -= fontSize * 5;
            if (yOffset < padding) {
              page.drawText(`${key}:`, {
                x: leftX,
                y: yOffset,
                size: fontSize,
                color: rgb(0, 0, 0),

                font: await pdfDoc.embedFont("Helvetica"),
                align: "center",
              });
            }
          }
        }
      }
      // línea encabezado
      page.drawLine({
        start: { x: padding, y: height - padding - fontSize * 0.9 - 20 },
        end: { x: width - padding, y: height - padding - fontSize * 0.9 - 20 },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
      });

      //línea arriba de la hora actual
      page.drawLine({
        start: { x: padding, y: padding + fontSize * 0.5 + 20 },
        end: { x: width - padding, y: padding + fontSize * 0.5 + 20 },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
      });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Recibo-Arrendatario.pdf";
      link.click();
      window.location.href = "/H_recibos"
    } catch (error) {
      console.log(error)
    }
  };

  function formatDate(fechaString) {
    return moment(fechaString).format("MMMM , D , YYYY");
  }

  moment.updateLocale("es", {
    months:
      "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
        "_"
      ),
    monthsShort:
      "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_"),
    weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
    weekdaysShort: "Dom._Lun._Mar._Mié._Jue._Vie._Sáb.".split("_"),
    weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
  });


  //AQUI TERMINA PDF

  return (
    <div className="contener-home contener-ReArrendatario">
      <h2 style={{ textAlign: "center" }}>Recibo Arrendatario</h2>
      <div className="container">
        <Form action="" onSubmit={handleSubmit(onSubmitRegistro)}>
          <div className="form-propietario">
            <Form.Group controlId="fecha">
              <Form.Label>Fecha de Pago:</Form.Label>
              <Form.Control required
                className="InputsRegistros"
                disabled
                defaultValue={currentDate}
                type="date"
              />
            </Form.Group>

            <Form.Group controlId="documentoIdentidad">
              <Form.Label>Contrato:</Form.Label>
              <Form.Select
                className="InputsRegistros"
                value={selectedContrato ? selectedContrato.IdContrato : ""}
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
              <Form.Control required
                className="InputsRegistros"
                disabled
                value={
                  selectedContrato ? selectedContrato.DocumentoIdentidad : ""
                }
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="nombre">
              <Form.Label>No Matricula Inmueble:</Form.Label>
              <Form.Control required
                className="InputsRegistros"
                disabled
                value={selectedContrato ? selectedContrato.NoMatricula : ""}
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="nombre">
              <Form.Label>Nombre Arrendatario:</Form.Label>
              <Form.Control required
                className="InputsRegistros"
                disabled
                value={
                  selectedContrato ? selectedContrato.NombreArrendatario : ""
                }
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="nombre">
              <Form.Label>Tipo de Inmueble:</Form.Label>
              <Form.Control required
                className="InputsRegistros"
                disabled
                value={selectedContrato ? selectedContrato.TipoInmueble : ""}
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="suma">
              <Form.Label>Valor del Pago:</Form.Label>
              <Form.Control required
                className="InputsRegistros"
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

            <Form.Group controlId="documentoIdentidad">
              <Form.Label>Lista de Fechas De Pagos:</Form.Label>
              <Form.Control
                className="InputsRegistros"
                value={mostrarFechasSeleccionadas ? mostrarFechasSeleccionadas : ""}
                onChange={(e) => handleFechasChange(e.target.value)}
                onClick={() => setShowFechaModal(true)}
              >

              </Form.Control>
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
          <Modal.Title>Seleccionar No Contrato</Modal.Title>
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
      {/* Modal de lista de Fechas Fijas de Contrato */}
      <Modal
        show={showFechaModal}
        onHide={() => setShowFechaModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Fecha del Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {FechasPagosFijas.map((Fechas, index) => (
            <Form.Check // prettier-ignore
              type="switch"
              key={index}
              id={`custom-switch-${index}`}
              label={formatDate(Fechas.FechaPagoFija)}
              onChange={() => handleSwitchChange(Fechas)}              
            />
          ))}

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
