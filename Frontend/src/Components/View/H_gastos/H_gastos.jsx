import {
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  Form,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import "moment/locale/es";
import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";
import logo from "../../../assets/Logo.jpg";
import { toast } from "react-toastify";
import NoResultImg from "../../../assets/NoResult.gif";

export const H_gastos = () => {
  const isSmallScreen = useMediaQuery("(max-width: 1366px)");
  const [infoComision, setinfoComision] = useState([]);
  const [PropietariosDisponibles, setPropietariosDisponibles] = useState([]);
  const [selectedPropietario, setSelectedPropietario] = useState("");
  const [mostrarModalA, setMostrarModalA] = useState(false);
  const [NoResult, setNoResult] = useState(false);
  const [filtroData, setFiltroData] = useState({
    Propietario: "",
    FechaElaboracionMin: "",
    FechaElaboracionMax: "",
    FormaPago: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
  };
  const resetPropie = () => {
    setSelectedPropietario("");
    setFiltroData({ ...filtroData, Propietario: "" });
    setMostrarModalA(false);
    fetchDataPropietario("");
  };
  const handlePropietarioChange = async (Propietario) => {
    console.log(Propietario);
    setSelectedPropietario(Propietario);
    setFiltroData({
      ...filtroData,
      ["Propietario"]: Propietario.IdPropietario,
    });
    fetchDataPropietario(Propietario);
    setMostrarModalA(false);
  };
  const handleCloseModalA = () => {
    setMostrarModalA(false);
  };
  const handleMostrarAClick = async () => {
    setMostrarModalA(true);
  };
  // State y funciones para el modal de detalles
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleCloseDetailsModal = () => setShowDetailsModal(false);
  const handleShowDetailsModal = (rowData) => {
    setSelectedRowData(rowData);
    setShowDetailsModal(true);
  };
  // State y funciones para el modal de detalles
  useEffect(() => {
    fetchData();
    fetchDataPropietario();
  }, [filtroData]);

  const fetchData = async () => {
    const queryParams = new URLSearchParams(filtroData);
    try {
      const response = await fetch(
        `http://localhost:3006/VComisionPropie?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setinfoComision(data);
      if (data == 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchDataPropietario = async () => {
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

  const createheader = () => {
    return (
      <tr>
        <th>No Comision</th>
        <th>Propietario</th>
        <th>Fecha Elaboracion</th>
        <th>Forma pago</th>
        <th>Elaborado Por</th>
        <th>Pago Arriendo</th>
        <th>Administracion</th>
        <th>Valor Total</th>
      </tr>
    );
  };
  //formatear fecha
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

  const createrow = (CPropietario) => {
    return (
      <tr
        key={CPropietario.IdComisionPropietario}
        onClick={() => handleShowDetailsModal(CPropietario)}
      >
        <td>{CPropietario.IdComisionPropietario}</td>
        <td>{CPropietario.NombreCompleto}</td>
        <td>{formatDate(CPropietario.FechaElaboracion)}</td>
        <td>{CPropietario.FormaPago}</td>
        <td>{CPropietario.ElaboradoPor}</td>
        <td>${CPropietario.PagoArriendo}</td>
        <td>${CPropietario.AdmInmobi}</td>
        <td>${CPropietario.ValorTotal}</td>
      </tr>
    );
  };
  const renderDetailsModalContent = () => {
    if (!selectedRowData) {
      return (
        <>
          <h1>No hay Detalles</h1>
        </>
      );
    }
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la comisión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Descripción:</strong> {selectedRowData.Descripcion || "N/A"}
          </p>
          <p>
            <strong>Aseo:</strong> ${selectedRowData.AseoEntrega}
          </p>
          <p>
            <strong>Mantenimiento:</strong> ${selectedRowData.Mantenimiento}
          </p>
          <p>
            <strong>Cuota Extraordinaria:</strong> ${selectedRowData.CuotaExtra}
          </p>
          <p>
            <strong>Pagos de Recibos:</strong> ${selectedRowData.PagoRecibos}
          </p>
        </Modal.Body>
      </>
    );
  };
  //Variables Paginacion
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
  const currentItems = infoComision.slice(indexOfFirstItem, indexOfLastItem);

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
    const newPageCount = Math.ceil(infoComision.length / itemsPerPage);
    setPageCount(newPageCount); // Actualizamos el estado de pageCount
    renderPaginator(newPageCount); // Llamamos a la función renderPaginator con el nuevo pageCount
  }, [infoComision, itemsPerPage, currentPage]);
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
    Propietario: " Propietario",
    FormaPago: "Forma Pago",
    FechaElaboracionMin: "Elaboracion Minima",
    FechaElaboracionMax: "Elaboracion Maxima",
  };

  // Formatear los filtros aplicados
  let formattedFilters = "";
  if (Object.values(filtroData).filter((value) => value).length > 0) {
    formattedFilters = Object.keys(filtroData)
      .filter((key) => filtroData[key]) // Filtrar solo los valores que no están vacíos
      .map((key) => ` ${filtroDescriptions[key]}: ${filtroData[key]}`);
  } else {
    formattedFilters = " Ninguno";
  }

  //AQUI EMPIEZA GENERACION DE PDF
  const HistorialPDF = () => {
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
    doc.text("Historial de comisiones propietario", 44, 20);
    doc.setFontSize(13);
    doc.setTextColor(128);
    doc.text("Adminmuebles", 44, 26);
    doc.setFontSize(7);
    doc.text(` Filtros aplicados:\n${formattedFilters}`, 44, 31);

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
      { header: "No Comision", dataKey: "IdComisionPropietario" },
      { header: "Propietario", dataKey: "NombreCompleto" },
      { header: "Fecha Elaboracion", dataKey: "FechaElaboracion" },
      { header: "Forma pago", dataKey: "FormaPago" },
      { header: "Elaborado Por", dataKey: "ElaboradoPor" },
      { header: "Pago Arriendo", dataKey: "PagoArriendo" },
      { header: "Administracion", dataKey: "AdmInmobi" },
      { header: "Aseo Entrega", dataKey: "AseoEntrega" },
      { header: "Mantenimiento", dataKey: "Mantenimiento" },
      { header: "Valor Total", dataKey: "ValorTotal" },
    ];
    // Datos de la tabla
    const data = infoComision.map((Historial) => ({
      IdComisionPropietario: Historial.IdComisionPropietario,
      NombreCompleto: Historial.NombreCompleto,
      FechaElaboracion: formatDate(Historial.FechaElaboracion),
      FormaPago: Historial.FormaPago,
      ElaboradoPor: Historial.ElaboradoPor,
      PagoArriendo: `$${Historial.PagoArriendo}`,
      AdmInmobi: `$${Historial.AdmInmobi}`,
      AseoEntrega: `$${Historial.AseoEntrega}`,
      Mantenimiento: `$${Historial.Mantenimiento}`,
      ValorTotal: `$${Historial.ValorTotal},`,
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
    doc.save("Historial de comisiones propietario-PDF");
  };
  //AQUI TERMINA
  const redireccion = (ruta) => {
    window.location.href = ruta;
  };
  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">
          <div className="conten-inputs">
            <label className="l1">Propietario: </label>
            <Form.Select
              className="input-filtroRe"
              value={
                selectedPropietario ? selectedPropietario.IdPropietario : "a?"
              }
              onChange={(e) => handlePropietarioChange(e.target.value)}
              onClick={() => handleMostrarAClick(true)}
            >
              <option value="" selected>
                Seleccionar Numero de Propietario
              </option>
              {PropietariosDisponibles.map((Propietario, index) => (
                <option key={index} value={Propietario.IdPropietario}>
                  {Propietario.NombreCompleto}
                </option>
              ))}
            </Form.Select>

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
            <label className="l1">Fecha Elaboracion Minima: </label>
            <input
              className="input-filtroRe"
              type="date"
              value={filtroData.FechaElaboracionMin}
              onChange={handleChange}
              name="FechaElaboracionMin"
              id=""
            />
            <label className="l1">Fecha Elaboracion Maxima: </label>
            <input
              className="input-filtroRe"
              type="date"
              value={filtroData.FechaElaboracionMax}
              onChange={handleChange}
              name="FechaElaboracionMax"
              id=""
            />
          </div>

          <OverlayTrigger
            key="tooltip-generar-recibo-gastos"
            placement="bottom"
            overlay={
              showTooltip ? (
                <Tooltip id="tooltip-prop">Generar Recibo gastos</Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button
              variant="success"
              className="btn-add"
              onClick={() => redireccion("/Rcomision")}
            >
              <FontAwesomeIcon className="icon" icon={faUserPlus} />
              <p className="AgregarPA">Generar Recibo gastos</p>
            </Button>
          </OverlayTrigger>
          <Button
            variant="success"
            className="bottom-button"
            onClick={HistorialPDF}
          >
            <FontAwesomeIcon icon={faFilePdf} />
            Generar PDF
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">
            Historial de comisiones propietario
          </h1>
        </div>
        <div className="view_esp">
          {NoResult == true ? (
            <div>
              <img className="Noresult" src={NoResultImg} alt="" />
            </div>
          ) : (
            <div className="table-container">
              <Table striped bordered hover>
                <thead> {createheader()} </thead>
                <tbody>
                  {currentItems.map((CPropietarios) =>
                    createrow(CPropietarios)
                  )}
                </tbody>
              </Table>
              <Modal
                size="lg"
                show={showDetailsModal}
                onHide={handleCloseDetailsModal}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                {renderDetailsModalContent()}
              </Modal>
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
              <Pagination.Item
                className="item-paginador"
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
          <Modal.Title>Seleccionar Propietario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item action onClick={resetPropie}>
              Reset filtro Propietario
            </ListGroup.Item>
            {PropietariosDisponibles.map((Propietario, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handlePropietarioChange(Propietario)}
              >
                {Propietario.TipoDocumento} :{Propietario.DocumentoIdentidad} {Propietario.NombreCompleto}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};
