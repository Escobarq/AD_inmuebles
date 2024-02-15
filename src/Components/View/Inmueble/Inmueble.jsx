import "./inmuebles.css";
import { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";

export const Inmueble = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleMostrarModalClick = () => {
    setMostrarModal(true);
  };

  const handleCloseModal = () => {
    setMostrarModal(false);
  };
  const [infoinmueble, setinfoinmueble] = useState([]);
  const [Rol, setRol] = useState("");
  useEffect(() => {
   var a = localStorage.getItem("Rol")
    setRol(a)
    const fetchData = async () => {
      
      try {
        const response = await fetch('http://localhost:3006/Vinmueble');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setinfoinmueble(data);

        console.log(data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  const createheader = () => {
    
      if (Rol == 2){
        return(
          <tr>
          <th>Id propietario</th>
          <th>Id inmueble</th>
          <th>Dirección</th>
          <th>Estrato</th>
          <th>Ciudad</th>
          <th>Barrio</th>
          <th>Tipo</th>          
          <th>Ver más</th>
          <th>Agregar nuevo</th>
        </tr>
          )
        }
        else{
          return(
            <tr>
                <th>Id propietario</th>
                <th>Id inmueble</th>
                <th>Dirección</th>
                <th>Estrato</th>
                <th>Ciudad</th>
                <th>Barrio</th>
                <th>Tipo</th>
                <th>Editar</th>
                <th>Ver más</th>
                <th>Agregar nuevo</th>
              </tr>
            )
        }
          
  };
  const createrow = (Inmuebles) => {
    if (Rol == 2) {

      if (Inmuebles.Estado == "Ocupado"){
      return (
        <tr>
                <td>Inmuebles.Id_Propietario</td>
                <td>Inmuebles.Id_Inmueble</td>
                <td>Inmuebles</td>
                <td>Inmuebles</td>
                <td>Inmuebles</td>
                <td>Inmuebles</td>
                <td>Inmuebles</td>
                <td>
                  <Button variant="primary" onClick={handleMostrarModalClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      widths="20"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                      />
                    </svg>
                    Ver más
                  </Button>
                </td>
                <td>
                  <Button disabled variant="success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 0 320 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"
                      />
                    </svg>
                     Arrendador
                  </Button>
                </td>
              </tr>
      );
    }
    else{
      <tr>
      <td>Inmuebles</td>
      <td>Inmuebles</td>
      <td>Inmuebles</td>
      <td>Inmuebles</td>
      <td>Inmuebles</td>
      <td>Inmuebles</td>
      <td>Inmuebles</td>
      <td>
        <Button variant="primary" onClick={handleMostrarModalClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            widths="20"
            viewBox="0 0 576 512"
          >
            <path
              fill="#ffffff"
              d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
            />
          </svg>
          Ver más
        </Button>
      </td>
      <td>
        <Button variant="success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 320 512"
          >
            <path
              fill="#ffffff"
              d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"
            />
          </svg>
           Arrendador
        </Button>
      </td>
    </tr>

    }
    }
    else {
      return (
        <tr>
                <td>Inmuebles</td>
                <td>Inmuebles</td>
                <td>Inmuebles</td>
                <td>Inmuebles</td>
                <td>Inmuebles</td>
                <td>Inmuebles</td>
                <td>Inmuebles</td>
                <td>
                  <Button variant="warning">
                    <svg
                      className="editar"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      height="20"
                      width="20"
                    >
                      <path
                        fill="#ffffff"
                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                      />
                    </svg>
                    Editar
                  </Button>
                </td>
                <td>
                  <Button variant="primary" onClick={handleMostrarModalClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      widths="20"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                      />
                    </svg>
                    Ver más
                  </Button>
                </td>
                <td>
                  <Button variant="success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 0 320 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"
                      />
                    </svg>
                     Arrendador
                  </Button>
                </td>
              </tr>
  
      );
    }
  };
  return (
    <>
      <div className="contener-home">
        <div className="title_view">
          <h1 className="tittle_propetario">Inmuebles</h1>
        </div>
        <div className="view_esp">
        <div className="table-container">
          <Table striped bordered hover>
            <thead>{createheader()}</thead>
            <tbody>{infoinmueble.map((Inmuebles) => createrow(Inmuebles))}</tbody>
          </Table>
         </div> 
        </div>
        {/* Modal */}
        <Modal
          size="lg" // Agregar la propiedad size="lg" para el modal largo
          show={mostrarModal}
          onHide={handleCloseModal}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Detalles del inmueble</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Numero Niveles</th>
                  <th>Valor Inmueble</th>
                  <th>Numero Baños</th>
                  <th>Servicios Publicos</th>
                  <th>Numero Habitaciones</th>
                  <th>Estado</th>
                  <th>Numero Terrazas</th>
                  <th>Area Construida</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
