import { useEffect, useState } from "react";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./inmuebles.css";
import moment from "moment";
import "moment/locale/es";
import { toast } from "react-toastify";
import {
  faEye,
  faUserPlus,
  faTrash,
  faPenToSquare,
  faHouseChimneyMedical,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import useActualizarEstadoInmueble from "../../Hooks/InhabilitarInmueble";
import NoResultImg from "../../../assets/NoResult.gif";
import { format, toDate } from "date-fns";
import useRoleInfo from "../../Hooks/useRoleInfo";
import { useMediaQuery } from "@react-hook/media-query";
import logo from "../../../assets/Logo.jpg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const Inmueble = () => {
  const roleId = useRoleInfo();
  const isSmallScreen = useMediaQuery("(max-width: 1366px)");
  const { actualizarEstadoInmueble } = useActualizarEstadoInmueble(); // Cambiado aquí
  const [NoResult, setNoResult] = useState(false);
  const [filtroData, setFiltroData] = useState({
    estado: "",
    tipo: "",
    estrato: "",
  });
  const [inmuebleIdBoolean, setInmueblesBoolean] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //Actualizar Estado Inmueble
  const InhabilitarInmueble = async (InmuebleId) => {
    try {
      await actualizarEstadoInmueble(InmuebleId, "false"); // Cambiado aquí

      const updatedInmueble = infoinmueble.filter(
        (inmueble) => inmueble.IdCodeudor !== InmuebleId
      );

      setinfoinmueble(updatedInmueble);
      notifi();
      setShowModal(false);
    } catch (error) {
      console.error("Error al inhabilitar Inmueble:", error);
      errores();
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
  //Modal para Inhabilitacion
  const handleOpenModal = (InmuebleId) => {
    setInmueblesBoolean(InmuebleId);
    setShowModal(true);
  };

  const handleCloseModals = () => {
    setShowModal(false);
  };

  const errores = () =>
    toast.error("Hubo algun error  ", {
      theme: "dark",
    });

  const notifi = () =>
    toast.success("Se Inabilito Correctamente ", {
      theme: "dark",
    });
  // Mostrar Modal
  const [mostrarModal, setMostrarModal] = useState(false);
  // Paginacion
  const [infoinmueble, setinfoinmueble] = useState([]);

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

  // Actualizar Inmueble
  const [inmuebleseleccion, setinmuebleseleccion] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filtroData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltroData({ ...filtroData, [name]: value });
    console.log(filtroData);
  };

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams(filtroData);
      const response = await fetch(
        `http://localhost:3006/Vinmueble?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const INmueblesActivos = data.filter(
        (inmueble) => inmueble.booleanos === "true"
      );

      setinfoinmueble(INmueblesActivos);

      if (INmueblesActivos.length == 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const createheader = () => {
    return (
      <tr>
        <th>No Matricula</th>
        <th>Propietario</th>
        <th>Dirección</th>
        <th>Estrato</th>
        <th>Ciudad</th>
        <th>Barrio</th>
        <th>Tipo</th>
        <th>Estado</th>
        <th>Fecha Asegunramiento</th>
        <th>Ven. Aseguramiento</th>
        <th>Opciones</th>
      </tr>
    );
  };

  const createrow = (inmueble) => {
    if (inmueble.Estado == "Ocupado") {
      return (
        <tr key={inmueble.IdInmueble}>
          <td>{inmueble.NoMatricula}</td>
          <td>{inmueble.NombrePropietario}</td>
          <td>{inmueble.Direccion}</td>
          <td>{inmueble.Estrato}</td>
          <td>{inmueble.Ciudad}</td>
          <td>{inmueble.Barrio}</td>
          <td>{inmueble.Tipo}</td>
          <td>{inmueble.Estado}</td>
          <td>{formatDate(inmueble.Aseguramiento)}</td>
          <td>{formatDate(inmueble.VAseguramiento)}</td>
          <td className="responsive">
            <Button
              className="btn-opciones"
              variant="primary"
              onClick={() => handleMostrarModalClick(inmueble)}
            >
              <FontAwesomeIcon className="icon-table" icon={faEye} />
            </Button>
            <Button
              disabled
              className="btn-opciones"
              onClick={() => handleContrato(inmueble.IdInmueble)}
              variant="success"
            >
              <FontAwesomeIcon className="icon-table" icon={faUserPlus} />
            </Button>
            {roleId !== 2 && (
              <>
                <Button
                  className="btn-opciones"
                  variant="danger"
                  onClick={() => handleOpenModal(inmueble.IdInmueble)}
                >
                  <FontAwesomeIcon
                    className="icon-table"
                    icon={faTrash}
                    style={{ color: "#ffffff" }}
                  />
                </Button>
                <Button
                  className="btn-opciones"
                  variant="warning"
                  onClick={() => handleEditInmuebles(inmueble.IdInmueble)}
                >
                  <FontAwesomeIcon
                    className="icon-table"
                    icon={faPenToSquare}
                  />
                </Button>
              </>
            )}
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={inmueble.IdInmueble}>
          <td>{inmueble.NoMatricula}</td>
          <td>{inmueble.NombrePropietario}</td>
          <td>{inmueble.Direccion}</td>
          <td>{inmueble.Estrato}</td>
          <td>{inmueble.Ciudad}</td>
          <td>{inmueble.Barrio}</td>
          <td>{inmueble.Tipo}</td>
          <td>{inmueble.Estado}</td>
          <td>{formatDate(inmueble.Aseguramiento)}</td>
          <td>{formatDate(inmueble.VAseguramiento)}</td>
          <td className="responsive">
            <Button
              className="btn-opciones"
              variant="primary"
              onClick={() => handleMostrarModalClick(inmueble)}
            >
              <FontAwesomeIcon className="icon-table" icon={faEye} />
            </Button>
            <Button
              className="btn-opciones"
              onClick={() => handleContrato(inmueble.IdInmueble)}
              variant="success"
            >
              <FontAwesomeIcon className="icon-table" icon={faUserPlus} />
            </Button>
            {roleId !== 2 && (
              <>
                <Button
                  className="btn-opciones"
                  variant="danger"
                  onClick={() => handleOpenModal(inmueble.IdInmueble)}
                >
                  <FontAwesomeIcon
                    className="icon-table"
                    icon={faTrash}
                    style={{ color: "#ffffff" }}
                  />
                </Button>
                <Button
                  className="btn-opciones"
                  variant="warning"
                  onClick={() => handleEditInmuebles(inmueble.IdInmueble)}
                >
                  <FontAwesomeIcon
                    className="icon-table"
                    icon={faPenToSquare}
                  />
                </Button>
              </>
            )}
          </td>
        </tr>
      );
    }
  };

  //Traer Informacion
  const handleEditInmuebles = (InmuebleId) => {
    const inmueble = infoinmueble.find((inm) => inm.IdInmueble === InmuebleId);

    if (!inmueble) {
      console.error("No se encontró el inmueble con ID:", InmuebleId);
      return;
    }

    // Formatear la fecha Aseguramiento antes de agregarla a inmuebleData
    const aseguramientoDateObject = toDate(new Date(inmueble.Aseguramiento));
    const formattedAseguramiento = format(
      aseguramientoDateObject,
      "yyyy-MM-dd"
    );

    // Crear objeto con los datos del inmueble, incluyendo la fecha formateada
    const inmuebleData = {
      IdInmueble: inmueble.IdInmueble,
      NoMatricula: inmueble.NoMatricula,
      Direccion: inmueble.Direccion,
      Estrato: inmueble.Estrato,
      Ciudad: inmueble.Ciudad,
      Barrio: inmueble.Barrio,
      Tipo: inmueble.Tipo,
      NoNiveles: inmueble.NoNiveles,
      NoBanos: inmueble.NoBanos,
      ServiciosPublicos: inmueble.ServiciosPublicos,
      NoHabitaciones: inmueble.NoHabitaciones,
      Estado: inmueble.Estado,
      NoTerraza: inmueble.NoTerraza,
      AreaConstruidaM2: inmueble.AreaConstruidaM2,
      Aseguramiento: formattedAseguramiento, // Usar la fecha formateada
      ValorInmueble: inmueble.ValorInmueble,
      Descripcion: inmueble.Descripcion,
    };

    // Redireccionar a la ruta de edición de inmueble
    window.location.href = `/EditarDatosIn?${new URLSearchParams(
      inmuebleData
    ).toString()}`;
  };
  //Traer Informacion
  const handleContrato = (InmuebleId) => {
    const inmueble = infoinmueble.find((inm) => inm.IdInmueble === InmuebleId);

    if (!inmueble) {
      console.error("No se encontró el inmueble con ID:", InmuebleId);
      return;
    }

    // Crear objeto con los datos del inmueble, incluyendo la fecha formateada
    const inmuebleData = {
      IdInmueble: inmueble.IdInmueble,
      NoMatricula: inmueble.NoMatricula,
      Tipo: inmueble.Tipo,
    };

    // Redireccionar a la ruta de edición de inmueble
    window.location.href = `/Generar?${new URLSearchParams(
      inmuebleData
    ).toString()}`;
  };

  const createrowDetalles = () => {
    if (inmuebleseleccion) {
      const {
        NoNiveles,
        ValorInmueble,
        AreaConstruidaM2,
        NoBanos,
        ServiciosPublicos,
        NoHabitaciones,
        Estado,
        NoTerraza,
        Descripcion,
      } = inmuebleseleccion;

      const detalles = [
        { label: "Numero Niveles", value: NoNiveles },
        { label: "Area Construida en M2", value: AreaConstruidaM2 },
        { label: "Valor Inmueble", value: ValorInmueble },
        { label: "Numero Baños", value: NoBanos },
        { label: "Servicios Publicos", value: ServiciosPublicos },
        { label: "Numero Habitaciones", value: NoHabitaciones },
        { label: "Estado", value: Estado },
        { label: "Numero Terrazas", value: NoTerraza },
        { label: "Descripcion", value: Descripcion },
      ];

      return (
        <>
          {detalles.map(
            (detalle, index) =>
              detalle.value && (
                <tr key={index}>
                  <th>{detalle.label}</th>
                  <td>{detalle.value}</td>
                </tr>
              )
          )}
        </>
      );
    } else {
      return null;
    }
  };

  const handleMostrarModalClick = async (inmueble) => {
    setinmuebleseleccion(inmueble);
    setMostrarModal(true);
  };

  const handleCloseModal = () => {
    setMostrarModal(false);
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infoinmueble.slice(indexOfFirstItem, indexOfLastItem);
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
    const newPageCount = Math.ceil(infoinmueble.length / itemsPerPage);
    setPageCount(newPageCount); // Actualizamos el estado de pageCount
    renderPaginator(newPageCount); // Llamamos a la función renderPaginator con el nuevo pageCount
  }, [infoinmueble, itemsPerPage, currentPage]);
  //Tooltip
  const [showTooltip, setShowTooltip] = useState(window.innerWidth <= 1366);

  useEffect(() => {
    const updateTooltipVisibility = () => {
      setShowTooltip(window.innerWidth < 1366);
    };

    window.addEventListener("resize", updateTooltipVisibility);
    return () => window.removeEventListener("resize", updateTooltipVisibility);
  }, []);

  const redireccion = (ruta) => {
    localStorage.removeItem("NITPropie");
    window.location.href = ruta;
  };

  // Objeto para descripciones de filtros
  const filtroDescriptions = {
    tipo: "Tipo",
    estrato: "Estrato",
    estado: "Estado",
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
    doc.text("Inmuebles", 43, 20);
    doc.setFontSize(13);
    doc.setTextColor(128);
    // Title next to the logo
    doc.setFontSize(6);

    doc.setFontSize(13);
    doc.setTextColor(128);
    doc.text("Adminmuebles", 43, 26);

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
      { header: "NIT", dataKey: "NoMatricula" },
      { header: "Propietario", dataKey: "NombrePropietario" },
      { header: "Dirección", dataKey: "Direccion" },
      { header: "Estrato", dataKey: "Estrato" },
      { header: "Ciudad", dataKey: "Ciudad" },
      { header: "Barrio", dataKey: "Barrio" },
      { header: "Tipo", dataKey: "Tipo" },
      { header: "Estado", dataKey: "Estado" },
    ];

    const data = infoinmueble.map((Inmueble) => ({
      NoMatricula: Inmueble.NoMatricula,
      NombrePropietario: Inmueble.NombrePropietario,
      Direccion: Inmueble.Direccion,
      Estrato: Inmueble.Estrato,
      Ciudad: Inmueble.Ciudad,
      Barrio: Inmueble.Barrio,
      Tipo: Inmueble.Tipo,
      Estado: Inmueble.Estado,
    }));
    const itemsPerPage = 32;
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
      doc.text("Adminmuebles", 43, 26);
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
    doc.save("Inmuebles");
  };
  //AQUI TERMINA

  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">
          <div className="conten-inputs">
            <label className="l1">Tipo Inmueble</label>
            <select
              className="input-filtroRe"
              value={filtroData.tipo}
              onChange={handleChange}
              name="tipo"
              id=""
            >
              <option selected value="">
                Seleccione el tipo
              </option>
              <option value="Apartamento">Apartamento</option>
              <option value="Bodega">Bodega</option>
              <option value="Casa">Casa</option>
              <option value="Oficina">Oficina</option>
              <option value="Local">Local</option>
            </select>

            <label className="l1">Estrato</label>
            <select
              className="input-filtroRe"
              value={filtroData.estrato}
              onChange={handleChange}
              name="estrato"
              id=""
            >
              <option selected value="">
                Seleccione el estrato
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>

            <label className="l1">Estado</label>
            <select
              className="input-filtroRe"
              value={filtroData.estado}
              onChange={handleChange}
              name="estado"
              id=""
            >
              <option selected value="">
                Seleccione estado
              </option>
              <option value="Ocupado">Ocupado</option>
              <option value="Disponible">Disponible</option>
            </select>
          </div>
          <OverlayTrigger
            key="tooltip-add-inmueble"
            placement="bottom"
            overlay={
              showTooltip ? (
                <Tooltip id="tooltip-prop">Agregar Inmueble</Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button
              variant="success"
              className="btn-add"
              onClick={() => redireccion("/RInmuebleA")}
            >
              <FontAwesomeIcon
                icon={faHouseChimneyMedical}
                style={{ color: "#ffffff" }}
              />
              <p className="AgregarPA">Agregar Inmueble</p>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            key="tooltip-ver-inhabilitados"
            placement="top"
            overlay={
              showTooltip ? (
                <Tooltip id="tooltip-prop">Ver Inhabilitados</Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button
              variant="dark"
              className="btn-add-info"
              onClick={() => redireccion("/InhaInmueble")}
            >
              <FontAwesomeIcon className="icon" icon={faUserSlash} />
              <p className="AgregarPA">Ver Inhabilitados</p>
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
          <h1 className="tittle_propetario">Inmuebles</h1>
        </div>
        <div className="view_esp">
          {NoResult == true ? (
            <div>
              <img className="Noresult" src={NoResultImg} alt="" />
            </div>
          ) : (
            <div className="table-container">
              <Table striped bordered hover>
                <thead>{createheader()}</thead>
                <tbody>
                  {currentItems.map((inmueble) => createrow(inmueble))}
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
        {/* Modal */}
        <Modal
          size="lg"
          show={mostrarModal}
          onHide={handleCloseModal}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Detalles del inmueble</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>{createrowDetalles()}</thead>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
      <Modal show={showModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea inhabilitar este inmueble?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => InhabilitarInmueble(inmuebleIdBoolean)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
