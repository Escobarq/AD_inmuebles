import { Table, Button } from "react-bootstrap";


export const H_gastos = () => {
  return (
    <>
      <div className="contener-home">
        <div className="filtros_propetario">

          <div className="custom-input">
            <label htmlFor="email">Cedula Ciudadania </label>
            <input type="number" id="cedula-cuidadania" placeholder="Cedula Cuidadania" />
          </div>

          <div className="custom-input">
            <label htmlFor="email">Fecha de Ingreso</label>
            <input type="date" id="fecha-ingreso"/>
          </div>

          <div className="custom-input">
            <label htmlFor="email">Nombre del Cliente</label>
            <input type="text" id="nombre-cliente" placeholder="Nombre del Cliente"/>
          </div> 

           <div className="custom-input">
            <label htmlFor="email">Ciudad</label>
            <input type="text" id="ciudad" placeholder="Cuidad"/>
          </div>

            <div className="custom-input">
            <label htmlFor="metodo-pago">Metodo de Pago</label>
            <select id="metodo-pago">
              <option value="" disabled selected>
                Seleccione un Metodo de pago
              </option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>     
        </div>

        <div className="title_view">
          <h1 className="tittle_propetario">Historial de gastos arrendatario</h1>
        </div>

        <div className="view_esp">
        <Table striped bordered hover>
            <thead>
              <tr>
              <th>ID pago arrendatario</th>
              <th>ID arrendatario</th>
              <th>Fecha  pago</th>
              <th>Fecha inicio</th>
              <th>Fecha final</th>
              <th>Valor pago</th>
              <th>Forma pago</th>
              <th>Estado pago</th>
              <th>Dias mora</th>
              <th>Editar</th>
              <th>Generar Recibo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>1</td>
              <td>1</td>
              <td>31/01/2024</td>
              <td>01/02/2024</td>
              <td>03/02/2024</td>
              <td>350000</td>
              <td>transferencia</td>
              <td>Al dia</td>
              <td>0</td>
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
                  <Button variant="success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 0 384 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5 .1 0 0 0 0c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16V422.2c-11.2-2.1-21.7-5.7-30.9-8.9l0 0 0 0c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5 .8 4.8 1.6 7.1 2.4l0 0 0 0 0 0c13.6 4.6 24.6 8.4 36.3 8.7c9.1 .3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5 0 0c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7V232c0-8.8 7.2-16 16-16z"
                      />
                    </svg>
                    recibo
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}
