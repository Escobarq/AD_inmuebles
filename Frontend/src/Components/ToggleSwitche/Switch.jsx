import { useState } from "react";
import {
  Modal,
  OverlayTrigger,
  Tooltip,
  Card,
  Row,
  Col,
  ModalFooter,
} from "react-bootstrap";
import "./Switch.css";

export const Switch = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSwitchChange = () => {
    setShowModal(true);
  };

  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip-top">Ver mas</Tooltip>}
      >
        <label className="switch">
          <input type="checkbox" onChange={handleSwitchChange} />
          <span className="slider"></span>
        </label>
      </OverlayTrigger>

      <Modal
      
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton:false className="ModalSobreNosotros">Sobre Nosotros</Modal.Header>
        <Modal.Body className="ModalSobreNosotros">
          <Row>
            <Col md={6}>
              <Card style={{ width: "18rem", margin: "10px" ,boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <Card.Img variant="top" src="../../../public/escobar.png" style={{height:"260px"}}/>
                <Card.Body>
                  <Card.Title><a href="https://github.com/Escobarq" className="ModalNosotros">Juan David Escobar Quezada</a></Card.Title>
                  <Card.Text>Frontend Desing</Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: "18rem", margin: "10px",boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Img variant="top" src="../../../public/arenas.jpg" style={{height:"260px"}} />
                <Card.Body>
                  <Card.Title><a href="https://github.com/Arenasssss" className="ModalNosotros">Juan David Arenas Martinez</a></Card.Title>
                  <Card.Text>Backend Developver</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{ width: "18rem", margin: "10px" ,boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <Card.Img variant="top" src="../../../public/ingri.jpg" style={{height:"260px"}}/>
                <Card.Body>
                  <Card.Title><a href="https://github.com/IngSg" className="ModalNosotros">Ingrid Vannesa Segura Montaño </a></Card.Title>
                  <Card.Text>Ux Ui Desing</Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: "18rem", margin: "10px",boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Img
                  variant="top"
                  src="../../../public/jeison.png"
                  style={{height:"260px"}}
                />
                <Card.Body>
                  <Card.Title className="jeison"><a href="https://github.com/jeisonwaldir" className="ModalNosotros">Jeison Waldir Ortiz Ardila</a></Card.Title>
                  <Card.Text>Frontend Design</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <ModalFooter className="ModalSobreNosotros"><img className="logoSena"src="../../../public/logoSena.png" alt="Logo"/></ModalFooter>
      </Modal>
    </>
  );
};
