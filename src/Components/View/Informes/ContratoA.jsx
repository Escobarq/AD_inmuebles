import './GastosyContrato.css'
import { Table } from "react-bootstrap";

export const ContratoA = () => {
  return (
    <>
    <div className="contener-home">
    <div className="title_view">
          <h1 className="tittle_propetario">Contrato Arrendatario</h1>
        </div>
        
        <div className="view_esp">
        <div className="table-container">
        <Table striped bordered hover>
            <thead>
              <tr>
              <th>Documento Arrendatario</th>
              <th>Nombre Arrendatario</th>
              <th>Meses de Alquiler</th>
              <th>Cuotas Pendientes</th>
              <th>Fecha Inicio Contrato</th>
              <th>Fecha Final Contrato</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>a</td>
                <td>a</td>
                <td>a</td>
                <td>a</td>
                <td>a</td>
                <td>a</td>
              </tr>
            </tbody>
          </Table>
          </div>
        </div>
    </div>
    </>
  )
}
