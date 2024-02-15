
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Slide.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPersonCirclePlus ,faFileInvoiceDollar ,faMagnifyingGlass,faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { Nav,Accordion  } from 'react-bootstrap';
import logo from '../../assets/Logo.png'
import { useEffect } from 'react';
export const Slidebar = () => {
  const nombre = localStorage.getItem("user")
  const apellido = localStorage.getItem("apellido")
  const Rol = localStorage.getItem("Rol")
  const [activeItem, setActiveItem] = useState('');
  const [TTiporol, setTTiporol] = useState('');
  
  useEffect(() => {
    if(Rol == 1){
      setTTiporol("Admin")
    }
    else if(Rol == 2){
      setTTiporol("Empleado")
    }
   }, []);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <>
     <div className="bg-light border-end" id="sidebar" style={{ width: '300px' ,marginRight:'3%', height: "100vh"}}>
      <div className="sidebar-heading p-3 bg-dark text-white">
        <p>Bienvenido {nombre}  {apellido}</p>
        <p>Rol {TTiporol}</p>
        
      </div>
      <Nav className="flex-column pt-3">
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/inicio"
            onClick={() => handleItemClick('Home')}
            active={activeItem === 'Home'}
          >
            <FontAwesomeIcon icon={faHome} size='xl' className="me-2" />
            Inicio
          </Nav.Link>
          <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
            <FontAwesomeIcon icon={faPersonCirclePlus} size='xl' className="me-2" />Registros</Accordion.Header>
            <Accordion.Body>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/RPropietario"
                  onClick={() => handleItemClick('SubItem1')}
                  active={activeItem === 'SubItem1'}
                >
                  Propetarios
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/RInmuebleB"
                  onClick={() => handleItemClick('SubItem2')}
                  active={activeItem === 'SubItem2'}
                >
                  Inmuebles
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/ReArrendatario"
                  onClick={() => handleItemClick('SubItem3')}
                  active={activeItem === 'SubItem3'}
                >
                  Arrendatarios
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/Registrocodeudor"
                  onClick={() => handleItemClick('SubItem4')}
                  active={activeItem === 'SubItem4'}
                >
                  Codeudor
                </Nav.Link>
              </Nav.Item>


            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/**2 columna del navbar **/}
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
            <FontAwesomeIcon icon={faFileInvoiceDollar} size='xl'  className="me-2" />Recibos</Accordion.Header>
            <Accordion.Body>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/Reciboarrendatario"
                  onClick={() => handleItemClick('SubItem1')}
                  active={activeItem === 'SubItem1'}
                >
                  Recibo Arrendatario
                </Nav.Link>
              </Nav.Item>
              
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/RGastos"
                  onClick={() => handleItemClick('SubItem2')}
                  active={activeItem === 'SubItem2'}
                >
                  Recibo gastos
                </Nav.Link>
              </Nav.Item>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/**3 columna del navbar **/}
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
            <FontAwesomeIcon icon={faMagnifyingGlass}size='xl' className="me-2" />Consultar</Accordion.Header>
            <Accordion.Body>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/Propietario"
                  onClick={() => handleItemClick('SubItem1')}
                  active={activeItem === 'SubItem1'}
                >
                  Propetarios
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/Inmueble"
                  onClick={() => handleItemClick('SubItem2')}
                  active={activeItem === 'SubItem2'}
                >
                  Inmuebles
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/Arrendatario"
                  onClick={() => handleItemClick('SubItem3')}
                  active={activeItem === 'SubItem3'}
                >
                  Arrendatarios
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/Codeudor"
                  onClick={() => handleItemClick('SubItem4')}
                  active={activeItem === 'SubItem4'}
                >
                  Codeudores
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/H_recibos"
                  onClick={() => handleItemClick('SubItem5')}
                  active={activeItem === 'SubItem5'}
                >
                  Hisotorial Recibos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/H_gastos"
                  onClick={() => handleItemClick('SubItem2')}
                  active={activeItem === 'SubItem2'}
                >
                  Historial Gastos
                </Nav.Link>
              </Nav.Item>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/**4 columna del navbar **/}
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
            <FontAwesomeIcon icon={faChartColumn} size='xl'  className="me-2" />Informes</Accordion.Header>
            <Accordion.Body> 
             
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/Carrendatario"
                  onClick={() => handleItemClick('SubItem2')}
                  active={activeItem === 'SubItem2'}
                >
                  Historial Arrendamiento
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/Ginmuebles"
                  onClick={() => handleItemClick('SubItem2')}
                  active={activeItem === 'SubItem2'}
                >
                  Historial Comision Propetario
                </Nav.Link>
              </Nav.Item>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </Nav.Item>
      </Nav>
      <img className='logo-icon' src={logo} alt="" />
    </div>
    </>
  )
};

