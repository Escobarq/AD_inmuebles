import {useState} from 'react';
import './GastosyContrato.css'
import { Table,Dropdown  } from "react-bootstrap";

export const GastosIn = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  return (
    <>
      <div className="contener-home">
        <div className="title_views">
          <h1 className="tittle_propetario">Gastos de Inmuebles</h1>
        </div>
        
        <div className="view_esp">
          <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Propietario</th>
                <th>Suma valor de Arriendo</th>
                <th>Suma de Valor Administracion</th>
                <th>Suma Valor Deposito</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Dropdown onClick={toggleDropdown}>
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      Pepito 
                    </Dropdown.Toggle>
                    <Dropdown.Menu show={dropdownOpen}>
                      <Dropdown.Item>
                        Tipo Inmueble: Apto
                      </Dropdown.Item>
                      <Dropdown.Item>
                        Nombre Arrendatario Asociado: Juan 
                      </Dropdown.Item>
                      <Dropdown.Item>
                        Fecha Final Seguro: 7/02/2024 
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>a</td>
                <td>a</td>
                <td>a</td>
              </tr>
            </tbody>
          </Table>
          </div>
        </div>
        <div className="total_general">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Suma total</th>
                  <th>valor Arriendo</th>
                  <th>valor Administracion</th>
                  <th>valor Deposito</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
              </tbody>
            </Table>
          </div>
      </div>
    </>
  )
}
