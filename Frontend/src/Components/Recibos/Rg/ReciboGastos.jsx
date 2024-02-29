import  { useEffect, useState } from "react";
import "./ReciboGastos.css";
import logo from "../../../assets/Logo.png";   //logo.png
import html2pdf from "html2pdf.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InfoPropietario } from "../../Hooks/InfoPropietario";

export const ReciboGastos = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Redireccion en caso de confirmar o cancelar
  const handleConfirmSave = () => {
    // Lógica para confirmar el guardado
    handleSubmit(onsubmitGastos)(); // Envia los datos
    setShowSaveModal(false); // Cierra el modal
  };

  const { handleSubmit, register, reset } = useForm();

  const handleConfirmCancel = () => {
    window.location.href = "/H_gastos"
    handleSubmit(handleCancel)();
    setShowCancelModal(false); // Cierra el modal
  };
    localStorage.getItem("user")
    localStorage.getItem("apellido")

  const [filtroData, setFiltroData] = useState({
    Cedula: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
  };
  
  const [Valor, setValor] = useState({});
  const handleChangeValor = (event) => {
    const { name, value } = event.target;
    setValor({ ...Valor, [name]: value });
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
  };
  const [NoResult, setNoResult] = useState(false);
  const [infopropietario, setinfopropietario] = useState([]);
  const [Nombre, setNombre] = useState("");

  useEffect(() => {
    let a = localStorage.getItem("user");
    let b = localStorage.getItem("apellido");
    setNombre(a + " "+ b)
    fetchData();
  }, [filtroData]);

  const fetchData = async () => {
    try {
      const info = await InfoPropietario(filtroData)
      if(info == "") {
        setNoResult(true)
      }
      else{
        setNoResult(false)
        setinfopropietario(info[0]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const onsubmitGastos = async (data) => {
    let prueba = Valor
    data.Observaciones = prueba;
    console.log(data.Observaciones);
    data.IdPropietario = infopropietario.IdPropietario
    try {
      const response = await fetch("http://localhost:3006/RComision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error al crear usuario. Código de estado: ${response.status}`  );
        
      }else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      if (error.message.includes("correo ya registrado")) {
      } else {
        console.error("Error al crear usuario:", error);
        throw error; // Re-lanza el error para que pueda ser manejado en el componente
      }
    }
  };


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
              <label htmlFor="codigoPropietario">No.Doc propietario:</label>
              <input
                type="number"
                className="form-control"
                value={filtroData.Cedula}
                name="Cedula"
                onChange={handleChange}

              />
              <label htmlFor="beneficiario">Propietario:</label>

              {NoResult == false ?(
                <input
                  type="text"
                  className="form-control"
                  id="beneficiario"
                  
                  defaultValue={infopropietario.NombreCompleto}
                />

              ):(
                <input
                type="text"
                className="form-control"
                id="beneficiario"
                defaultValue={"Registrar Nuevo"}
              />
              )}

            </div>
          </div>

          <div className="entregadopor">
            <label htmlFor="entregadoPor">Entregado por:</label>
            <input
            {...register("ElaboradoPor")}
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
                 value={filtroData.PagoArriendo}
                name="Pago Arriendo:"
                onChange={handleChangeValor}
              />
              <input
                type="text"
                className="form-control"
                 value={filtroData.AdminsMuebles}
                name="Administracion Inmobiliaria:"
                onChange={handleChangeValor}

              />
              <input
                type="text"
                className="form-control"
                 value={filtroData.Aseo}
                name="Aseo Entrega Casa"
                onChange={handleChangeValor}
              />
              <input
                type="text"
                className="form-control"
                 value={filtroData.Mantenimiento}
                name="Mantenimiento"
                onChange={handleChangeValor}
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
