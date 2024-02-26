import { Table, Button , Modal} from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faUserSlash
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import moment from 'moment';
import 'moment/locale/es';
import { toast } from "react-toastify";
import useActualizarEstadoHistorialArrendamiento from "../../Hooks/InhabilitarHarrendamiento";

export const H_recibosInha = () => {
  const [infoPArrendamiento, setinfoPArrendamiento] = useState([]);
  const { actualizarEstadoHarrendamiento } = useActualizarEstadoHistorialArrendamiento();
  const [Harrendamiento, setHarrenndamiento] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Función para inhabilitar los gastos
  const handleInhabilitarHarrendamiento = async (arrendamientoID) => {
    try {
      await actualizarEstadoHarrendamiento(arrendamientoID, "true"); // Utilizando la función correcta
      const updatedHarrendamiento = infoPArrendamiento.map((Harrendamiento) => // Corrigiendo el mapeo de infoComision
      Harrendamiento.Id_Pago_Arrendamiento === arrendamientoID
        ? { ...Harrendamiento, Estado: "true" } // Cambiando Estado en lugar de Hgastos
        : Harrendamiento
    );
      setinfoPArrendamiento(updatedHarrendamiento); // Cambio en el nombre de la variable
      notify();
      setShowModal(false);
    } catch (error) {
      console.error("Error al inhabilitar Historial Arrendamiento:", error);
      errores();
    }
  };
  //Modal para Inhabilitacion
  const handleOpenModal = (arrendamientoID) => {
    setHarrenndamiento(arrendamientoID);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const notify = () =>
    toast.success("Se Inabilito Correctamente ", {
      theme: "dark",
    });
  const errores = () =>
    toast.error("Hubo algun error  ", {
      theme: "dark",
    });
  //Mostrar informaicon
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/VPagoArren");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const Harrendamiento =data.filter(
            (Harrendamiento) => Harrendamiento.booleanos === "false"
        )
        setinfoPArrendamiento(Harrendamiento);

        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  const createheader = () => {
    return (
      <tr>
        <th>ID pago arrendatario</th>
        <th>ID arrendatario</th>
        <th>Fecha pago</th>
        <th>Fecha inicio</th>
        <th>Fecha final</th>
        <th>Valor pago</th>
        <th>Forma pago</th>
        <th>Estado pago</th>
        <th>Dias mora</th>
        <th>Editar</th>
      </tr>
    );
  };
  moment.updateLocale('es', {
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort: 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
    weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_')
  });
  const createrow = (PArrendamiento) => {
    return (
      <tr key={PArrendamiento.Id_Pago_Arrendamiento}>
        <td>{PArrendamiento.Id_Pago_Arrendamiento}</td>
        <td>{PArrendamiento.Id_Arrendatario}</td>
        <td>{formatDate(PArrendamiento.Fecha_Pago)}</td>
        <td>{formatDate(PArrendamiento.Fecha_Inicio)}</td>
        <td>{formatDate(PArrendamiento.Fecha_Fin)}</td>
        <td>{PArrendamiento.Valor_Pago}</td>
        <td>{PArrendamiento.Forma_Pago}</td>
        <td>{PArrendamiento.Estado}</td>
        <td>{PArrendamiento.Dias_De_Mora}</td>
        <td>
          <Button className="btn-opciones"
            variant="danger"
            onClick={() => handleOpenModal(PArrendamiento.Id_Pago_Arrendamiento)}>
            <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
          </Button>
          <Button className="btn-opciones" variant="warning">
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </td>
      </tr>
    );
  };
  //Variables Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infoPArrendamiento.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //formatear fecha 
  function formatDate(fechaString) {
    return moment(fechaString).format('MMMM , D , YYYY');
  }
  return (
    <>
      <div className="contener-home">
        <div className="conten-filtro">

          <Button variant="dark" className="btn-add-info ">
            <Link to="/H_recibos" className="linkes">
              <FontAwesomeIcon className="icon" icon={faUserSlash} /> Ver
               Historial Habilitados
            </Link>
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Historial de Pago Arrendamiento</h1>
        </div>

        <div className="view_esp">
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
        </div>
        <div className="paginador">
          <Pagination >
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(Math.ceil(infoPArrendamiento.length / itemsPerPage))].map(
              (item, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(infoPArrendamiento.length / itemsPerPage)
              }
            />
          </Pagination>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea Habilitar este Historial?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleInhabilitarHarrendamiento(Harrendamiento)} 
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
