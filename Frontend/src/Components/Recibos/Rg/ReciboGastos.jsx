import { useEffect, useState } from "react";
import "./ReciboGastos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ListGroup, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PDFDocument, rgb } from "pdf-lib";
import logo from '../../../assets/Logo.jpg';
import axios from "axios";



export const ReciboGastos = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [infogastos, setinfogastos] = useState([]);
  const [Nombre, setNombre] = useState("");
  const [mostrarModalA, setMostrarModalA] = useState(false);
  const [mostrarModalB, setMostrarModalB] = useState(false);
  const [selectedPropietario, setSelectedPropietario] = useState("");
  const [PropietariosDisponibles, setPropietariosDisponibles] = useState([]);
  const [selectedInmueble, setSelectedInmueble] = useState("");
  const [InmueblesDisponibles, setInmueblesDisponibles] = useState([]);
  const [valorCE, setvalorCE] = useState(0);
  const [ValorPA, setvalorPA] = useState(0);
  const [valorPR, setvalorPR] = useState(0);
  const [valorAE, setvalorAE] = useState(0);
  const [valorM, setvalorM] = useState(0);
  const [valorAD, setvalorAD] = useState(0);
  const [valorTotal, setvalorTotal] = useState(0);
  const [PorcentajeAD, setPorcentajeAD] = useState();

  // Redireccion en caso de confirmar o cancelar
  const handleConfirmSave = () => {
    // Lógica para confirmar el guardado
    handleSubmit(onsubmitGastos)(); // Envia los datos
    setShowSaveModal(false); // Cierra el modal
  };
  const alertError = () =>{
    toast.error("Alerta el los valores de los conceptos no coinciden ", {
      theme: "dark",
    });
  };

  const { handleSubmit, register } = useForm();

  useEffect(() => {
    let a = localStorage.getItem("user");
    let b = localStorage.getItem("apellido");

    setNombre(a + " " + b);

    fetchData();
    setCurrentDate(getCurrentDate());
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

      const response = await axios.get(
        `http://localhost:3006/Vinmueble?IdPropietario=${Propietario.IdPropietario}`
      );
      const Inmuebles = response.data.map((prop) => prop);
      setInmueblesDisponibles(Inmuebles);
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
    window.location.href = "/H_gastos";
    handleSubmit(handleCancel)();
    setShowCancelModal(false); // Cierra el modal
  };

  const handleSave = () => {
    setShowSaveModal(true);
    // Validar que todos los campos estén llenos antes de guardar
  };

  const handleCancel = () => {
    setShowCancelModal(true);
    // Limpiar los datos del formulario al hacer clic en Cancelar
  };
  const handleCalcular = (e) => {
    const { name, value } = e;

    if (name == "PorcentajeAD") {
      if (value == 0) {
        setvalorAD((ValorPA*8)/100)
      }
      else {
        setvalorAD((ValorPA*value)/100)
      }
      setPorcentajeAD(value)
    }
    if (name == "AseoEntrega") {
      setvalorAE(value)
    }
    if (name == "Mantenimiento") {
      setvalorM(value)
    }
    if (name == "PagoRecibo") {
      setvalorPR(value)
    }
    if (name == "CuotaExtra") {
      setvalorCE(value)
    }
  };
  useEffect(() => {
    let res = ValorPA - valorAD - valorAE - valorCE - valorM - valorPR
    setvalorTotal(res)
  }, [handleCalcular]);

  const errores = (text) =>{
    toast.error(text, {
      theme: "colored",

      autoClose: 2000,
    });
  };
  const notify = (text) =>{
    toast.success(text, {
      theme: "colored",

      autoClose: 2000,
    });
  };
  const onsubmitGastos = async (data) => {
    if (valorTotal < 0 || 
      valorAE == 0 && data.Descripcion == "" || 
      valorM == 0 && data.Descripcion == "" ||
      valorCE == 0 && data.Descripcion == "" ||
      valorPR == 0 && data.Descripcion == "" ) {
      alertError();
    } else {
      data.FechaPago = currentDate
      data.PagoArriendo = ValorPA;
      data.AdminInmobiliaria = valorAD;
      data.AseoEntrega = valorAE;
      data.Mantenimiento = valorM;
      data.CuotaExtra = valorCE;
      data.PagoRecibo = valorPR;
      data.ValorTotal = valorTotal;

      data.IdPropietario = selectedPropietario.IdPropietario;
      data.IdInmueble = selectedInmueble.IdInmueble;
      data.ElaboradoPor = Nombre;
      data.Matricula = selectedInmueble.NoMatricula;
      data.TipoInmueble = selectedInmueble.Tipo;
      data.NombrePropietario = selectedPropietario.NombreCompleto;
      data.CedulaPropietario = selectedPropietario.DocumentoIdentidad;

      try {
        const response = await fetch("http://localhost:3006/RComision", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(
            `Error al crear usuario. Código de estado: ${response.status}`
          );
        } else {
          const responseData = await response.json();

          setinfogastos(data); // Actualiza el estado antes de llamar a ReciboGasto
          ReciboGasto(data); // Pasa los datos actualizados al PDF
          notify("se enviaron correctamente los datos");
          return responseData;
        }
      } catch (error) {
        if (error.message.includes("correo ya registrado")) {
          console.log("funciona");
        } else {
          errores("A ocurrido un error ");
          console.error("Error al crear usuario:", error);
          throw error; // Re-lanza el error para que pueda ser manejado en el componente
        }
      }
    }
  };
  const handlePropietarioChange = async (Propietario) => {
    setSelectedPropietario(Propietario);
    fetchData2(Propietario);
    setMostrarModalA(false);
  };
  const handleInmuebleChange = async (Inmueble) => {
    setvalorPA(Inmueble.ValorInmueble)
    setSelectedInmueble(Inmueble);
    setvalorAD(Inmueble.ValorInmueble*0.08)
    setMostrarModalB(false);
  };
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
  //AQUI EMPIEZA FUNCION PARA PDF
  const ReciboGasto = async (data) => {
    const order = [
      "CedulaPropietario",
      "NombrePropietario",
      "TipoInmueble",
      "Matricula",
      "FormaPago",
      "FechaPago",
      //"AdminInmobiliaria",
      // "PagoArriendo",
      // "AseoEntrega",
      // "Mantenimiento",
      "ElaboradoPor",
      // "ValorTotal",
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
      const logoImage = await pdfDoc.embedJpg(logoImageBytes);

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
            if (key == "PagoArriendo" || key == "AseoEntrega" || key == "AdminInmobiliaria" || key == "Mantenimiento" || key == "ValorTotal") {
              page.drawText(`$${value}`, {
                x: leftX,
                y: yOffset - fontSize * 1.5,
                size: fontSize,
                color: rgb(0, 0, 0),
                align: "left",
              });
            }
            else {

              page.drawText(`${value}`, {
                x: leftX,
                y: yOffset - fontSize * 1.5,
                size: fontSize,
                color: rgb(0, 0, 0),
                align: "left",
              });
            }




            // Datos de la tabla
            const tableData = [
              { concepto: "Pago de Arriendo", valor: ValorPA },
              { concepto: "Admin Inmobiliaria", valor: valorAD },
              { concepto: "Aseo Entrega", valor: valorAE },
              { concepto: "Mantenimiento", valor: valorM },
              { concepto: "Valor Total", valor: data.ValorTotal }
            ];

            // Posiciones iniciales para dibujar la tabla
            let tableX = padding;
            let tableY = height - padding - fontSize * 24;


            // Dibujar líneas horizontales y verticales
            const rowHeight = 33; // Altura de cada fila
            const columnWidth = 450; // Ancho de cada columna
            const lineWidth = 0.5; // Grosor de las líneas
            const tableHeight = rowHeight * (tableData.length + 1); // Altura total de la tabla


            // Líneas de las filas y datos de la tabla
            tableData.forEach(async (row, index) => {
              const rowY = tableY - (index + 1) * rowHeight;

              // Líneas horizontales
              page.drawLine({
                start: { x: tableX, y: rowY },
                end: { x: tableX + columnWidth, y: rowY },
                thickness: lineWidth,
                color: rgb(0, 0, 0),
              });

              // Datos de la fila
              page.drawText(row.concepto, {
                x: tableX,
                y: rowY - fontSize * 1.1, // Ajusta la posición vertical según tu diseño
                size: fontSize,
             
              });
              page.drawText(`$${row.valor}`, {
                x: tableX + 279, // Ajusta la posición horizontal según tu diseño
                y: rowY - fontSize * 1.1, // Ajusta la posición vertical según tu diseño
                size: fontSize,

              });
            });

            // Línea inferior
            page.drawLine({
              start: { x: tableX, y: tableY - tableHeight },
              end: { x: tableX + columnWidth, y: tableY - tableHeight },
              thickness: lineWidth,
              color: rgb(0, 0, 0),
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

      link.download = "Recibo Gastos.pdf";
      link.click();
      window.location.href = "/H_gastos"

    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };
return (
  <div className="home-2">
    <div className="contenedor-formulario" id="recibo-gastos">
      <h1 className="tit">Recibo de Gastos</h1>
      <form onSubmit={handleSubmit(onsubmitGastos)} className="tod">
        <div className="fila-formulario1">
          <Form.Group>
            <label htmlFor="fecha">Fecha de Pago:</label>
            <input required
              type="date"
              className="form-control InputsRegistros"
              id="fecha"
              defaultValue={currentDate}
              disabled                
            />
          </Form.Group>

          <Form.Group>
            <label htmlFor="entregadoPor">Entregado por:</label>
            <input required
              type="text"
              className="form-control InputsRegistros"
              id="entregadoPor"
              defaultValue={Nombre}
              disabled
            />

          </Form.Group>

          <Form.Group>
            <Form.Label>Propietario del inmueble</Form.Label>
            <Form.Select
              className="InputsRegistros"

              value={
                selectedPropietario ? selectedPropietario.IdPropietario : "a?"
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
          </Form.Group>

          <Form.Group>
            <Form.Label>Inmueble</Form.Label>

            <Form.Select
              className="InputsRegistros"
              value={selectedInmueble ? selectedInmueble.IdInmueble : "a?"}

              onChange={(e) => handleInmuebleChange(e.target.value)}
              onClick={() => handleMostrarBClick(true)}
            >
              <option value="">Seleccionar Numero de Matricula</option>
              {InmueblesDisponibles.map((Inmueble, index) => (
                <option key={index} value={Inmueble.IdInmueble}>

                  {Inmueble.NoMatricula} {Inmueble.Tipo}

                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        <label>Forma de pago</label>
        <select
          className="InputsRegistros"
          {...register("FormaPago")}
          id="seleccionGasto3"

        >
          <option value="">Seleccione Forma de Pago</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>

        </select>

        <div className="fila-formulario1">

        <Form.Group>
            <label htmlFor="fecha">Pago Arriendo:</label>
            
            <input required
              type="number"
              className="form-control InputsRegistros"
              name="PagoArriendo"
              value={selectedInmueble ? selectedInmueble.ValorInmueble: 0}
              disabled
            />
          </Form.Group>

          <Form.Group>
            <label htmlFor="">Pago Administración:  Ingrese el % <input type="number" name="PorcentajeAD" onChange={(e) => handleCalcular(e.target)} defaultValue={8} id="" /></label>
            <input 
              type="number"
              className="form-control InputsRegistros"
              name="AdmInmobi"
              onChange={(e) => handleCalcular(e.target)}
              value={PorcentajeAD ? (selectedInmueble.ValorInmueble* PorcentajeAD)/100 :  selectedInmueble ? selectedInmueble.ValorInmueble* 0.08: 0}
              disabled
            />
          </Form.Group>

          <Form.Group>
            <label htmlFor="fecha">Gasto de Aseo:</label>
            <input 
              type="number"
              className="form-control InputsRegistros"
              name="AseoEntrega"
              defaultValue={0}
              onChange={(e) => handleCalcular(e.target)}
            />            
          </Form.Group>
          <Form.Group>
            <label htmlFor="fecha">Gasto de Mantenimiento:</label>
            <input 
              type="numnumberber"
              className="form-control InputsRegistros"
              name="Mantenimiento"
              defaultValue={0}
              onChange={(e) => handleCalcular(e.target)}
            />              
          </Form.Group>
          <Form.Group>
            <label htmlFor="fecha">Pagos de Recibos:</label>
            <input 
              type="numnumberber"
              className="form-control InputsRegistros"
              name="PagoRecibo"
              defaultValue={0}
              onChange={(e) => handleCalcular(e.target)}
            />              
          </Form.Group>
          <Form.Group>
            <label htmlFor="fecha">Cuotas Extraordinarias:</label>
            <input 
              type="numnumberber"
              className="form-control InputsRegistros"
              name="CuotaExtra"
              defaultValue={0}
              onChange={(e) => handleCalcular(e.target)}
            />              
          </Form.Group>
          <Form.Group controlId="formNoIdentidadPropietario">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              className="InputsRegistros"
              {...register("Descripcion")}
              as="textarea"
              rows={2}
              style={{ width: "100%", resize: "none" }}
            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="fecha">Valor Total:</label>
            <input 
              type="numnumberber"
              className="form-control InputsRegistros"
              name="Mantenimiento"
              value={valorTotal ? valorTotal: 0}
              onChange={(e) => handleCalcular(e.target)}
            />              
          </Form.Group>
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

          <Button
            variant="primary"
            onClick={() => {
              handleConfirmSave();
            }}
          >

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

          <Button
            variant="primary"
            onClick={() => {
              handleConfirmCancel();
              handleCancel();
            }}
          >

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

                {Propietario.TipoDocumento} :{Propietario.DocumentoIdentidad}

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
                {Inmueble.NoMatricula} :{Inmueble.Tipo}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </div>
  )
}