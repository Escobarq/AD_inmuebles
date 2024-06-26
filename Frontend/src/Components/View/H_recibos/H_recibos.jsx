import { Table, Button, OverlayTrigger, Tooltip, Form, Modal, ListGroup } from "react-bootstrap";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import "moment/locale/es";
import { toast } from "react-toastify";
import axios from "axios";
import NoResultImg from "../../../assets/NoResult.gif";
import "./H_recibos.css";
import { useMediaQuery } from "@react-hook/media-query";
import logo from "../../../assets/Logo.jpg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const H_recibos = () => {
  const isSmallScreen = useMediaQuery("(max-width: 1366px)");
  const [infoPArrendamiento, setinfoPArrendamiento] = useState([]);
  const [ArrendatariosDisponibles, setArrendatariosDisponibles] = useState([]);
  const [mostrarModalA, setMostrarModalA] = useState(false);
  const [selectedArrendatario, setSelectedArrendatario] = useState("");

  const [filtroData, setFiltroData] = useState({
    estado: "",
    Arrendatario: "",
    FechaPagoIni: "",
    FechaPagoFin: "",
    FormaPago: "",
  });
  const [NoResult, setNoResult] = useState(false);

  //Mostrar informaicon
  useEffect(() => {
    fetchData();
    fetchDataArrendatario();
  }, [filtroData]);

  const resetPropie = () => {
    setSelectedArrendatario("");
    setFiltroData({ ...filtroData, "Arrendatario": "" });
    setMostrarModalA(false);
    fetchDataArrendatario("");
  };
  const handleArrendatarioChange = async (Arrendatario) => {
    console.log(Arrendatario);
    setSelectedArrendatario(Arrendatario);
    setFiltroData({ ...filtroData, ["Arrendatario"]: Arrendatario.IdArrendatario });
    fetchDataArrendatario(Arrendatario);
    setMostrarModalA(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
  };
  const handleCloseModalA = () => {
    setMostrarModalA(false);
  };
  const handleMostrarAClick = async () => {
    setMostrarModalA(true);
  };

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams(filtroData);
      const response = await fetch(
        `http://localhost:3006/VPagoArren?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const Harrendamiento = data.filter((item) => item.booleanos === "true");
      setinfoPArrendamiento(Harrendamiento);

      if (data.length == 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchDataArrendatario = async () => {
    try {
      const response = await axios.get("http://localhost:3006/VArrendatario?");
      const Arrendatarios = response.data.map((prop) => prop);
      setArrendatariosDisponibles(Arrendatarios);
    } catch (error) {
      console.error("Error al cargar las matrículas:", error);
      toast.error(
        "Error al cargar las matrículas. Inténtalo de nuevo más tarde."
      );
    }
  };
  const createheader = () => {
    return (
      <tr>
        <th>ID pago arrendatario</th>
        <th>Cont Cliente</th>
        <th>Arrendatario</th>
        <th>Fecha pago</th>
        <th>Fecha Pago Fija</th>
        <th>Forma de Pago</th>
        <th>Valor pago</th>
        <th>Estado pago</th>
        <th>Dias mora</th>
      </tr>
    );
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
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };
  
  const createrow = (PArrendamiento) => {
    const estadoColores = {
      AlDia: { backgroundColor: 'green', color: 'white' },
      Adelantado: { backgroundColor: 'blue', color: 'white' },
      Pendiente: { backgroundColor: 'yellow', color: 'black' },
      Atrasado: { backgroundColor: 'red', color: 'white' },
    };
  
    let estadoStyle;
    let diasTexto = PArrendamiento.DiasDMora;
  
    if (PArrendamiento.Estado === 'AlDia' && PArrendamiento.DiasDMora === 0) {
      estadoStyle = estadoColores['AlDia'];
    } else if (PArrendamiento.Estado === 'Adelantado' && PArrendamiento.DiasDMora < 0) {
      estadoStyle = estadoColores['Adelantado'];
      diasTexto = Math.abs(PArrendamiento.DiasDMora) + ' días adelantado';
    } else if (PArrendamiento.Estado === 'Atrasado' && PArrendamiento.DiasDMora < 0) {
      estadoStyle = estadoColores['Atrasado'];
      diasTexto = Math.abs(PArrendamiento.DiasDMora) + ' días atrasado';
    } else {
      estadoStyle = estadoColores[PArrendamiento.Estado] || { backgroundColor: 'white', color: 'black' };
    }
  
    const rowStyle = {
      backgroundColor: estadoStyle.backgroundColor,
      color: estadoStyle.color,
    };
  
    if (PArrendamiento.FechaPago === null) {
      return (
        <tr key={PArrendamiento.IdPagoArrendamiento}>
          <td>{PArrendamiento.IdPagoArrendamiento}</td>
          <td>{PArrendamiento.IdContrato}</td>
          <td>{PArrendamiento.NombreArrendatario}</td>
          <td>Pendiente</td>
          <td>{formatDate(PArrendamiento.FechaPagoFija)}</td>
          <td>{PArrendamiento.FormaPago}</td>
          <td>{formatCurrency(PArrendamiento.ValorPago)}</td>
          <td style={rowStyle}>{PArrendamiento.Estado}</td>
          <td>{diasTexto}</td>
        </tr>
      );
    } else {
      return (
        <tr key={PArrendamiento.IdPagoArrendamiento}>
          <td>{PArrendamiento.IdPagoArrendamiento}</td>
          <td>{PArrendamiento.IdContrato}</td>
          <td>{PArrendamiento.NombreArrendatario}</td>
          <td>{formatDate(PArrendamiento.FechaPago)}</td>
          <td>{formatDate(PArrendamiento.FechaPagoFija)}</td>
          <td>{PArrendamiento.FormaPago}</td>
          <td>{formatCurrency(PArrendamiento.ValorPago)}</td>
          <td style={rowStyle}>{PArrendamiento.Estado}</td>
          <td>{diasTexto}</td>
        </tr>
      );
    }
  };
  
  // Variables Paginacion
  useEffect(() => {
    // Cambiar el número de ítems por página según el tamaño de la pantalla
    if (isSmallScreen) {
      setItemsPerPage(5);
    } else {
      setItemsPerPage(8);
    }
  }, [isSmallScreen]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infoPArrendamiento.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const [pagesToShow, setPagesToShow] = useState([]);
  const [pageCount, setPageCount] = useState(0); // Agregamos el estado de pageCount

  const renderPaginator = (pageCount) => {
    // Pasamos pageCount como parámetro
    const maxPagesToShow = 10; // Cambia el número máximo de páginas mostradas

    if (pageCount <= maxPagesToShow) {
      setPagesToShow(Array.from({ length: pageCount }, (_, i) => i + 1));
    } else {
      if (currentPage <= maxPagesToShow - Math.floor(maxPagesToShow / 2)) {
        setPagesToShow(Array.from({ length: maxPagesToShow }, (_, i) => i + 1));
      } else if (currentPage >= pageCount - Math.floor(maxPagesToShow / 2)) {
        setPagesToShow(
          Array.from(
            { length: maxPagesToShow },
            (_, i) => pageCount - maxPagesToShow + i + 1
          )
        );
      } else {
        setPagesToShow(
          Array.from(
            { length: maxPagesToShow },
            (_, i) => currentPage - Math.floor(maxPagesToShow / 2) + i
          )
        );
      }
    }
  };

  useEffect(() => {
    const newPageCount = Math.ceil(infoPArrendamiento.length / itemsPerPage);
    setPageCount(newPageCount); // Actualizamos el estado de pageCount
    renderPaginator(newPageCount); // Llamamos a la función renderPaginator con el nuevo pageCount
  }, [infoPArrendamiento, itemsPerPage, currentPage]); // Dependencias del useEffect

  
  //Tooltip
  const [showTooltip, setShowTooltip] = useState(window.innerWidth <= 1366);

  useEffect(() => {
    const updateTooltipVisibility = () => {
      setShowTooltip(window.innerWidth < 1366);
    };

    window.addEventListener("resize", updateTooltipVisibility);
    return () => window.removeEventListener("resize", updateTooltipVisibility);
  }, []);

  // Objeto para descripciones de filtros
  const filtroDescriptions = {
    Arrendatario: " Arrendatario",
    estado: "Estado",
    FormaPago: "Forma Pago",
    FechaPagoIni: "Pago Inicio",
    FechaPagoFin: "Pago Fin",
  };

// Formatear los filtros aplicados
let formattedFilters = "";
if (Object.values(filtroData).filter(value => value).length > 0) {
formattedFilters = Object.keys(filtroData)
  .filter(key => filtroData[key]) // Filtrar solo los valores que no están vacíos
  .map(key => `${filtroDescriptions[key]}: ${filtroData[key]}`);

} else {
  formattedFilters = "Ninguno";
}

  //AQUI EMPIEZA GENERACION DE PDF
  const ArrenPDF = () => {
    const doc = new jsPDF();
    const addHoraEmision = () => {
      const currentDate = new Date();
      const formattedTime = currentDate.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
      doc.setTextColor(128); // Gris
      doc.setFontSize(8);
      doc.text(
        `Hora de Emisión: ${formattedTime}`,
        20,
        doc.internal.pageSize.getHeight() - 10
      );
    };
    doc.addImage(logo, "PNG", 15, 10, 20, 20);
    doc.setFontSize(20);
    doc.text("Historial de Pago Arrendamiento", 44, 20);
    doc.setFontSize(13);
    doc.setTextColor(128);
    doc.text("Adminmuebles", 44, 26); // Title next to the logo
    doc.setFontSize(7);
    doc.text(` Filtros aplicados:\n${formattedFilters}`, 43, 31);


    addHoraEmision();
    const date = new Date();
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const formattedDate = `${
      monthNames[date.getMonth()]
    }/${date.getDate()}/${date.getFullYear()}`;
    doc.setTextColor(128); // Gris
    doc.setFontSize(10);
    doc.text(formattedDate, 190, 18, null, null, "right");

    const columns = [
      { header: "ID pago arrendatario", dataKey: "IdPagoArrendamiento" },
      { header: "ID arrendatario", dataKey: "IdArrendatario" },
      { header: "Fecha pago", dataKey: "FechaPago" },
      { header: "Fecha inicio", dataKey: "FechaInicio" },
      { header: "Fecha final", dataKey: "FechaFin" },
      { header: "Valor pago", dataKey: "ValorPago" },
      { header: "Forma pago", dataKey: "FormaPago" },
      { header: "Estado pago", dataKey: "Estado" },
      { header: "Dias mora", dataKey: "DiasDMora" },
    ];
    // Datos de la tabla
    const data = infoPArrendamiento.map((Arrendamiento) => ({
      IdPagoArrendamiento: Arrendamiento.IdPagoArrendamiento,
      IdArrendatario: Arrendamiento.IdArrendatario,
      FechaPago:  Arrendamiento.FechaPago == null ? "Pendiente" : formatDate(Arrendamiento.FechaPago),
      FechaInicio: formatDate(Arrendamiento.FechaInicio),
      FechaFin: formatDate(Arrendamiento.FechaFin),
      ValorPago: `$${Arrendamiento.ValorPago}`,
      FormaPago: Arrendamiento.FormaPago,
      Estado: Arrendamiento.Estado,
      DiasDMora: Arrendamiento.DiasDMora == null ? "Pendiente" : Arrendamiento.DiasDMora,
    }));
    const itemsPerPage = 21;
    let startY = 45;
    for (let i = 0; i < Math.ceil(data.length / itemsPerPage); i++) {
      const currentPageData = data.slice(
        i * itemsPerPage,
        (i + 1) * itemsPerPage
      );

      // Información en forma de tabla
      autoTable(doc, {
        columns,
        body: currentPageData,
        startY: startY,
        styles: { fontSize: 8 },
        margin: { top: 30 },
      });
      // Si hay más páginas, añadir una nueva página
      if (i < Math.ceil(data.length / itemsPerPage) - 1) {
        doc.addPage();
        startY = 40;
      }

      const date = new Date();
      const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const formattedDate = `${
        monthNames[date.getMonth()]
      }/${date.getDate()}/${date.getFullYear()}`;
      doc.setTextColor(128); // Gris
      doc.setFontSize(10);
      doc.text(formattedDate, 190, 18, null, null, "right");

      addHoraEmision();
      doc.addImage(logo, "PNG", 15, 15, 20, 15);
      doc.setFontSize(13);
      doc.text("Adminmuebles", 44, 26);
    }

    const totalPages = doc.internal.getNumberOfPages();
    // Numeración de páginas
    for (let j = 1; j <= totalPages; j++) {
      doc.setPage(j);
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        `Pág ${j} / ${totalPages}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }
    doc.save("Historial de Pago Arrendamiento-PDF");
  };
  //AQUI TERMINA
  const redireccion = (ruta) => {
    window.location.href = ruta;
  }
  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">
          <div className="conten-inputs">
          <label className="l1">Arrendatario: </label>
            <Form.Select
              className="input-filtroRe"

              value={
                selectedArrendatario ? selectedArrendatario.IdArrendatario : "a?"
              }
              onChange={(e) => handleArrendatarioChange(e.target.value)}
              onClick={() => handleMostrarAClick(true)}
            >
              <option value="" selected >Seleccionar Numero de Arrendatario</option>
              {ArrendatariosDisponibles.map((Arrendatario, index) => (
                <option key={index} value={Arrendatario.IdArrendatario}>
                  {Arrendatario.NombreCompleto}
                </option>
              ))}
            </Form.Select>

            <label className="l1">Estado: </label>
            <select
              className="input-filtroRe"
              name="estado"
              value={filtroData.estado}
              onChange={handleChange}
              id=""
            >
              <option value="">Seleccione el estado</option>
              <option value="Atrasado">Atrasado</option>
              <option value="Adelantado">Adelantado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="AlDia">AlDia</option>
            </select>

            <label className="l1">Forma de Pago: </label>
            <select
              className="input-filtroRe"
              name="FormaPago"
              value={filtroData.FormaPago}
              onChange={handleChange}
              id=""
            >
              <option selected value="">
                Seleccion forma de pago
              </option>
              <option value="Transferencia">Transferencia</option>
              <option value="Efectivo">Efectivo</option>
            </select>
            <label className="l1">Fecha Pago Inicial: </label>
            <input
              className="input-filtroRe"
              type="date"
              value={filtroData.FechaPagoIni}
              onChange={handleChange}
              name="FechaPagoIni"
              id=""
            />
            <label className="l1">Fecha Pago Final: </label>
            <input
              className="input-filtroRe"
              type="date"
              value={filtroData.FechaPagoFin}
              onChange={handleChange}
              name="FechaPagoFin"
              id=""
            />
          </div>
          <OverlayTrigger
            key="tooltip-add-arrendamiento"
            placement="bottom"
            overlay={
              showTooltip ? (
                <Tooltip id="tooltip-prop">Agregar Pago arrendamiento</Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button variant="success" className="btn-add" onClick={() => redireccion("/ReArrendamiento")}>
                <FontAwesomeIcon className="icon" icon={faUserPlus} />
                <p className="AgregarPA">Agregar Pago Arrendamiento</p>
            </Button>
          </OverlayTrigger>

          <Button
            variant="success"
            className="bottom-button"
            onClick={ArrenPDF}
          >
            <FontAwesomeIcon icon={faFilePdf} />
            Generar PDF
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Historial de Pago Arrendamiento</h1>
        </div>

        <div className="view_esp">
          {NoResult == true ? (
            <div className="Noresult">
              <img className="Noresult" src={NoResultImg} alt="" />
            </div>
          ) : (
            <div className="table-container">
              <Table striped bordered hover>
                <thead> {createheader()} </thead>
                <tbody>
                  {currentItems.map((PArrendamientos) =>
                    createrow(PArrendamientos)
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </div>
        <div className="paginador">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {pagesToShow.map((page) => (
              <Pagination.Item className="item-paginador"
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageCount}
            />
          </Pagination>
        </div>
      </div>
      <Modal
        size="lg"
        show={mostrarModalA}
        onHide={handleCloseModalA}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Arrendatario</Modal.Title>             
          </Modal.Header>
        <Modal.Body>         
          <ListGroup>
          <ListGroup.Item
                action
                onClick={resetPropie}
              >
                Reset filtro Arrendatario
              </ListGroup.Item>
            {ArrendatariosDisponibles.map((Arrendatario, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleArrendatarioChange(Arrendatario)}
              >
                {Arrendatario.TipoDocumento} :{Arrendatario.DocumentoIdentidad} {Arrendatario.NombreCompleto}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};
