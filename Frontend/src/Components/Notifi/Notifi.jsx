import  { useState, useEffect } from "react";
import { Button, Badge, Popover, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import "./Notifi.css";

export const Notifi = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsAseguramiento, setNotificationsAseguramiento] = useState([]);
  const [notificationsContrato, setNotificationsContrato] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3006/fechas');
        const data = response.data;
        const today = new Date();
        const notificationThreshold = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 90);

        const notificationsAseguramientoFiltered = data.filter(notification => {
          if (notification.fechaAseguramiento) {
            const notificationDate = new Date(notification.fechaAseguramiento);
            return notificationDate <= notificationThreshold;
          }
          return false;
        });

        const notificationsContratoFiltered = data.filter(notification => {
          if (notification.fechaFinContrato) {
            const notificationDate = new Date(notification.fechaFinContrato);
            return notificationDate >= notificationThreshold;
          }
          return false;
        });

        setNotificationsAseguramiento(notificationsAseguramientoFiltered);
        setNotificationsContrato(notificationsContratoFiltered);
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };


  return (
    <div className="notification-container">
      <Button
        variant="light"
        onClick={toggleNotifications}
        className="notification-button"
      >
        <FontAwesomeIcon icon={faBell} />
        <Badge pill bg="primary">
          {notificationsAseguramiento.length + notificationsContrato.length}
        </Badge>
      </Button>

      <Popover
        show={showNotifications}
        placement="bottom"
        onClose={() => setShowNotifications(false)}
        className="notification-popover"
      >
        <Popover.Header
          as="h3"
          className="notification-header d-flex justify-content-between align-items-center"
        >
          Notificaciones
        </Popover.Header>
        <Popover.Body className="notification-body">
          <Row>
            <Col>
              <Row>
                <h6 className="tittle">Notificaciones de Aseguramiento</h6>
                {notificationsAseguramiento.map((notification, index) => (
                  <Col key={index} xs={6} md={6}>
                    <div className="notification-item">
                      <div className="notification-details">
                        <small>Fecha final de aseguramiento:</small>
                        <span>{new Date(notification.fechaAseguramiento).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col>
              <Row>
                <h6 className="tittle">Notificaciones de Contrato</h6>
                {notificationsContrato.map((notification, index) => (
                  <Col key={index} xs={6} md={6}>
                    <div className="notification-item">
                      <div className="notification-details">
                        <small>Fecha final de contrato:</small>
                        <span>{new Date(notification.fechaFinContrato).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Popover.Body>
      </Popover>
    </div>
  );
};
