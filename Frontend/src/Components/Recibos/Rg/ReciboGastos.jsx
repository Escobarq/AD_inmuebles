import { useEffect, useState } from "react";
import "./ReciboGastos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ListGroup, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import logo from '../../../assets/Logo.jpg';

import { InfoPropietario } from "../../Hooks/InfoPropietario";
import { PDFDocument, rgb, } from "pdf-lib";
import axios from "axios";



export const ReciboGastos = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [infogastos, setinfogastos] = useState([]);
  const [PagoGasto, setPagoGasto] = useState([]);
  const [Nombre, setNombre] = useState("");
  const [mostrarModalA, setMostrarModalA] = useState(false);
  const [mostrarModalB, setMostrarModalB] = useState(false);
  const [selectedPropietario, setSelectedPropietario] = useState("");
  const [PropietariosDisponibles, setPropietariosDisponibles] = useState([]);
  const [selectedInmueble, setSelectedInmueble] = useState("");
  const [InmueblesDisponibles, setInmueblesDisponibles] = useState([]);

  // Redireccion en caso de confirmar o cancelar
  const handleConfirmSave = () => {
    // Lógica para confirmar el guardado
    handleSubmit(onsubmitGastos)(); // Envia los datos
    setShowSaveModal(false); // Cierra el modal
  };

  const { handleSubmit, register } = useForm();

  useEffect(() => {
    let a = localStorage.getItem("user");
    let b = localStorage.getItem("apellido");
    setNombre(a + " " + b)
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3006/Vpropietarios?");
      const Propietarios = response.data.map((prop) => prop);
      setPropietariosDisponibles(Propietarios);
    } catch (error) {
      console.error("Error al cargar las matrículas:", error);
      toast.error(
        "Error al cargar las matrículas. Inténtalo de nuevo más tarde."
      );
    }
  };

  const fetchData2 = async (Propietario) => {
    try {
      const response = await axios.get(`http://localhost:3006/Vinmueble?IdPropietario=${Propietario.IdPropietario}`);
      const Inmuebles = response.data.map((prop) => prop);
      setInmueblesDisponibles(Inmuebles);
      console.log("hola", Inmuebles)
    } catch (error) {
      console.error("Error al cargar las matrículas:", error);
      toast.error(
        "Error al cargar las matrículas. Inténtalo de nuevo más tarde."
      );
    }
  };


  const handleCloseModalA = () => {
    setMostrarModalA(false);
  };
  const handleMostrarAClick = async () => {
    setMostrarModalA(true);
  };
  const handleCloseModalB = () => {
    setMostrarModalB(false);
  };
  const handleMostrarBClick = async () => {
    setMostrarModalB(true);
  };

  const handleConfirmCancel = () => {
    window.location.href = "/H_gastos"
    handleSubmit(handleCancel)();
    setShowCancelModal(false); // Cierra el modal
  };

  const handleSave = () => {
    setShowSaveModal(true)
    // Validar que todos los campos estén llenos antes de guardar
  };

  const notify = (text) =>
    toast.success(text, {
      theme: "colored",
      autoClose: 2000
    });

  const handleCancel = () => {
    setShowCancelModal(true);
    // Limpiar los datos del formulario al hacer clic en Cancelar
  };

  const errores = (text) =>
    toast.error(text, {
      theme: "colored",
      autoClose: 2000
    });

  const onsubmitGastos = async (data) => {

    data.IdPropietario = selectedPropietario.IdPropietario;
    data.IdInmueble = selectedInmueble.IdInmueble;
    data.Nombre = selectedPropietario.NombreCompleto;
    data.Documento = selectedPropietario.DocumentoIdentidad;
    data.Matricula = selectedInmueble.NoMatricula;
    data.Tipo = selectedInmueble.Tipo
    data.ElaboradoPor = Nombre;


    try {
      const response = await fetch("http://localhost:3006/RComision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error al crear usuario. Código de estado: ${response.status}`);

      } else {
        const responseData = await response.json();

        setinfogastos(data); // Actualiza el estado antes de llamar a ReciboGasto
        ReciboGasto(data); // Pasa los datos actualizados al PDF
        console.log(data)
        notify('se enviaron correctamente los datos');

        window.location.href="/H_gastos"        

        return responseData;

      }
    } catch (error) {
      if (error.message.includes("correo ya registrado")) {
        console.log("funciona")
      } else {
        errores('A ocurrido un error ');
        console.error("Error al crear usuario:", error);
        throw error; // Re-lanza el error para que pueda ser manejado en el componente
      }
    }
  };
  const handlePropietarioChange = async (Propietario) => {
    setSelectedPropietario(Propietario);
    fetchData2(Propietario)
    setMostrarModalA(false);
  };
  const handleInmuebleChange = async (Inmueble) => {
    setSelectedInmueble(Inmueble);
    setMostrarModalB(false);
  };
  //AQUI EMPIEZA FUNCION PARA PDF
  const ReciboGasto = async (data) => {
    const order = [
      "Documento",
      "Nombre",
      "Tipo",
      "FormaPago",
      "FechaPago",
      "Matricula",
      "AdminInmobiliaria",
      "PagoArriendo",
      "AseoEntrega",
      "Mantenimiento",
      "ElaboradoPor"
    ];

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage(); 
      const { width, height } = page.getSize();
      const fontSize = 19; 
      const padding = 50; 
      const middle = width / 2; 
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString(); 
      const footerText = `Hora de emisión: ${currentTime}`; 
      const textWidth = (await pdfDoc.embedFont("Helvetica")).widthOfTextAtSize(currentDate, fontSize);
      const textX = width - padding - textWidth;

      //texto en el pie de página
      page.drawText(footerText, {
        x: padding,
        y: padding,
        size: 13,
        color: rgb(0.5, 0.5, 0.5),
        font: await pdfDoc.embedFont("Helvetica"),
      });

      //la imagen del logo
      const logoImageBytes = await fetch(logo).then((res) =>
        res.arrayBuffer()
      );
      const logoImage = await pdfDoc.embedPng(logoImageBytes);

      //logo en el encabezado
      page.drawImage(logoImage, {
        x: padding - 10,
        y: height - padding - fontSize * 0.6,
        width: 100,
        height: 50,
        color: rgb(0.7, 0.7, 0.7),
      });

      //fecha actual
      page.drawText(`${currentDate}`, {
        x: textX,
        y: height - padding - fontSize * 0.1, 
        size: fontSize - 2,
        color: rgb(0.5, 0.5, 0.5),
        font: await pdfDoc.embedFont("Helvetica"),

      });
      // Dibujar el nombre de la empresa junto al logo
      page.drawText("Adminmuebles", {
        x: padding + 120,
        y: height - padding - fontSize * 0.0,
        size: fontSize + 0,
        color: rgb(0.8, 0.8, 0.8),
        font: await pdfDoc.embedFont("Helvetica"),
      });

      // Título del recibo
      page.drawText("Recibo Gastos", {
        x: width / 10,
        y: height - padding - fontSize * 4.5,
        size: fontSize + 9,
        font: await pdfDoc.embedFont("Helvetica"),
      });
      //línea horizontal en el encabezado
      page.drawLine({
        start: { x: padding, y: height - padding - fontSize * 0.9 - 20 },
        end: { x: width - padding, y: height - padding - fontSize * 0.9 - 20 },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
      });
      //línea horizontal sobre la hora actual
      page.drawLine({
        start: { x: padding, y: padding + fontSize * 0.5 + 20 },
        end: { x: width - padding, y: padding + fontSize * 0.5 + 20 },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
      });
      //campos en dos columnas
      let leftX = padding;
      let rightX = width / 2 + 20;
      let yOffset = height - padding - fontSize * 8;
 
      for (const key of order) {
        if (key !== "IdPropietario" && key !== "IdInmueble") {
          const value = data[key];
          if (value) {
            //Nombre del campo en negrita y centrado
            page.drawText(`${key}:`, {
              x: leftX,
              y: yOffset,
              size: fontSize,
              color: rgb(0, 0, 0),
              font: await pdfDoc.embedFont("Helvetica-Bold"),
              align: "right",
            });
            //la respuesta debajo del nombre del campo
            page.drawText(`${value}`, {
              x: leftX,
              y: yOffset - fontSize * 1.5,
              size: fontSize,
              color: rgb(0, 0, 0),
              align: "left",
            });
            // Alternamos entre columnas izquierda y derecha
            if (leftX === padding) {
              leftX = rightX;
            } else {
              leftX = padding;
              yOffset -= fontSize * 5;
              if (yOffset < padding) {
                // Si llegamos al límite de la página, continuamos en la siguiente página
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
      }
      // Guardar el PDF y descargarlo
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Recibo Gastos_pdf";
      link.click();
      window.location.href = "/H_gastos"
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };
//AQUI TERMINA PDF
  return (
    <div className="home-2">
      <div className="contenedor-formulario" id="recibo-gastos">
        <h1 className="tit">Recibo de Gastos</h1>
        <form onSubmit={handleSubmit(onsubmitGastos)} className="tod">
          <div className="fila-formulario1">
            <div className="grupo1">
              <label htmlFor="numeroGasto">Gasto N°:</label>
              <input
                type="text"
                className="form-control"
                id="numeroGasto"
                {...register("numerogasto")}
              />
              <label htmlFor="fecha">Fecha de Pago:</label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                {...register("FechaPago")}

              />
            </div>
            <div className="grupo2">
              <Form.Label>Propietario del inmueble</Form.Label>
              <Form.Select className="InputsRegistros"
                value={
                  selectedPropietario
                    ? selectedPropietario.IdPropietario
                    : "a?"
                }
                onChange={(e) => handlePropietarioChange(e.target.value)}
                onClick={() => handleMostrarAClick(true)}
              >
                <option value="">Seleccionar Numero de Propietario</option>
                {PropietariosDisponibles.map((Propietario, index) => (
                  <option key={index} value={Propietario.IdPropietario}>
                    {Propietario.NombreCompleto}
                  </option>
                ))}
              </Form.Select>

              <Form.Label>Inmueble</Form.Label>
              <Form.Select className="InputsRegistros"
                value={
                  selectedInmueble
                    ? selectedInmueble.IdInmueble
                    : "a?"
                }
                onChange={(e) => handleInmuebleChange(e.target.value)}
                onClick={() => handleMostrarBClick(true)}
              >
                <option value="">Seleccionar Numero de Matricula</option>
                {InmueblesDisponibles.map((Inmueble, index) => (
                  <option key={index} value={Inmueble.IdInmueble}>
                    {Inmueble.NoMatricula}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>

          <div className="entregadopor">
            <label htmlFor="entregadoPor">Entregado por:</label>
            <input
              type="text"
              className="form-control"
              id="entregadoPor"
              defaultValue={Nombre}
              disabled
            />
          </div>
          <label>Forma de pago</label>
          <select
            {...register("FormaPago")}
            id="seleccionGasto3"

          >
            <option value="">Seleccione Forma de Pago</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>

          </select>

          <div className="fila-formulario">
            <div className="grupo-formulario">
              <label htmlFor="seleccionGasto">Concepto:</label>
              <input
                disabled
                defaultValue={"Pago arriendo mes"}
                type="text"
                className="form-control"
                id="valor2"
              />
              <input
                disabled
                defaultValue={"Administracion Inmobiliaria"}
                type="text"
                className="form-control"
                id="valor2"
              />
              <input
                disabled
                defaultValue={"Aseo entrega casa"}
                type="text"
                className="form-control"
                id="valor2"
              />
              <input
                disabled
                defaultValue={"Mantenimiento"}
                type="text"
                className="form-control"
                id="valor2"
              />

            </div>
            <div className="valor">
              <label htmlFor="valor">Valor</label>

              <input
                type="text"
                className="form-control"
                name="Pago Arriendo:"
                defaultValue={"0"}
                {...register("PagoArriendo")}
              />
              <input
                type="text"
                className="form-control"
                name="AdmInmobi"
                defaultValue={"0"}
                {...register("AdminInmobiliaria")}

              />
              <input
                type="text"
                className="form-control"
                name="AseoEntrega"
                defaultValue={0}
                {...register("AseoEntrega")}
              />
              <input
                type="text"
                className="form-control"
                name="Mantenimiento:"
                defaultValue={0}
                {...register("Mantenimiento")}
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
          Recuerda que si confirmas no se podran editar
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => { handleConfirmSave(); }} >
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
          <Button variant="primary" onClick={() => { handleConfirmCancel(); handleCancel(); }}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={mostrarModalA}
        onHide={handleCloseModalA}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Propietario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {PropietariosDisponibles.map((Propietario, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handlePropietarioChange(Propietario)}
              >
                {Propietario.TipoDocumento} :
                {Propietario.DocumentoIdentidad}
                {Propietario.NombreCompleto}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={mostrarModalB}
        onHide={handleCloseModalB}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Inmueble</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {InmueblesDisponibles.map((Inmueble, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleInmuebleChange(Inmueble)}
              >
                {Inmueble.NoMatricula} :
                {Inmueble.Tipo}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

    </div>
  );
};
