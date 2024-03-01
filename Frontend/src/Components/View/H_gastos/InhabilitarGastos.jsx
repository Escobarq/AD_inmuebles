import { Table, Button ,Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faPenToSquare,
  faUserSlash
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState ,useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import moment from 'moment';
import 'moment/locale/es';
import { toast } from "react-toastify";
import useActualizarEstadoHistorialGasto  from "../../Hooks/InhabilitarHgastos";

export const InhabilitarGastos = () => {
  const [infoComision, setinfoComision] = useState([]);
  const { actualizarEstadoHgastos } = useActualizarEstadoHistorialGasto();
  const [Hgastos, setHgastos] = useState(null);
  const [showModal, setShowModal] = useState(false);

   //Actualizar Estado Historial
  // Función para inhabilitar los gastos
  const handleInhabilitarHgastos = async (HgastosId) => {
    try {
      await actualizarEstadoHgastos(HgastosId, "true"); // Llamando a la función correctamente

      const updatedHgastos = infoComision.map((CPropietario) => // Corrigiendo el mapeo de infoComision
        CPropietario.IdComisionPropietario === HgastosId
          ? { ...CPropietario, Estado: "true" } // Cambiando Estado en lugar de Hgastos
          : CPropietario
      );
      setinfoComision(updatedHgastos);
      notify();
      setShowModal(false);
    } catch (error) {
      console.error("Error al habilitar gasto:", error); // Corrigiendo mensaje de error
      errores();
    }
  };
  //Modal para Inhabilitacion
  const handleOpenModal = (HgastosId) => {
    setHgastos(HgastosId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const notify = () =>
  toast.success("Se Habilito Correctamente ", {
    theme: "dark",
  });
  const errores = () =>
  toast.error("Hubo algun error  ", {
    theme: "dark",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/VComisionPropie");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const Historial = data.filter(
            (Historial) => Historial.booleanos === "false"
          );
        setinfoComision(Historial);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const createheader = () => {
    return (
      <tr>
        <th>ID Comision Propietario</th>
        <th>ID Propietario</th>
        <th>Periodo de pago</th>
        <th>Fecha Elaboracion</th>
        <th>Fecha final</th>
        <th>Forma pago</th>
        <th>Valor pago</th>
        <th>Observaciones</th>
        <th>Opciones</th>
        
      </tr>
    );
  };
  //formatear fecha 
  function formatDate(fechaString) {
    return moment(fechaString).format('MMMM , D , YYYY');
  }

  moment.updateLocale('es', {
    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort : 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_')
  });
  const createrow = (CPropietario) => {
    return (
      <tr key={CPropietario.IdComisionPropietario}>
        <td>{CPropietario.IdComisionPropietario}</td>
        <td>{CPropietario.IdPropietario}</td>
        <td>{formatDate(CPropietario.PeriodoPagado)}</td>
        <td>{formatDate(CPropietario.FechaElaboracion)}</td>
        <td>{CPropietario.ElaboradoPor}</td>
        <td>{CPropietario.FormaPago}</td>
        <td>${CPropietario.ValorArriendo}</td>     
        <td>{CPropietario.Observaciones}</td>     
        <td>
          <Button
            className="btn-opciones"
            variant="danger"
            onClick={() => handleOpenModal(CPropietario.IdComisionPropietario)}
          >
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
      const [itemsPerPage] = useState(8);
      // Paginación
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = infoComision.slice(indexOfFirstItem, indexOfLastItem);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="contener-home">
      <div className="conten-filtro">
          <Button variant="dark" className="btn-add-info ">
            <Link to="/H_gastos" className="linkes">
              <FontAwesomeIcon className="icon" icon={faUserSlash} /> Ver
              Inabilitados
            </Link>
          </Button>
        </div>
        <div className="title_view">
          <h1 className="tittle_propetario">Historial de comisiones propietario</h1>
        </div>
        <div className="view_esp">
          <div className="table-container">
            <Table striped bordered hover>
              <thead> {createheader()} </thead>
              <tbody>
                {currentItems.map((CPropietarios) =>
                  createrow(CPropietarios)
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
            {[...Array(Math.ceil(infoComision.length / itemsPerPage))].map(
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
                currentPage === Math.ceil(infoComision.length / itemsPerPage)
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
          ¿Está seguro de que desea habilitar?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleInhabilitarHgastos(Hgastos)} 
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
