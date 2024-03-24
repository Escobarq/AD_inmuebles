import { useState, useEffect } from "react";
import { Button, Badge, Popover } from "react-bootstrap";
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
        const notificationThreshold = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90); // Rango de 90 días antes de la fecha actual

        const notificationsAseguramientoFiltered = data.filter(notification => {
          const notificationDate = new Date(notification.fechaAseguramiento);
          return notificationDate <= notificationThreshold && notificationDate >= today;
        });

        const notificationsContratoFiltered = data.filter(notification => {
          const notificationDate = new Date(notification.fechaFinContrato);
          return notificationDate <= notificationThreshold && notificationDate >= today;
        });

        setNotificationsAseguramiento(notificationsAseguramientoFiltered);
        setNotificationsContrato(notificationsContratoFiltered);

        // Eliminar notificaciones de aseguramiento que han superado su fecha de vencimiento
        const deletedNotificationsAseguramiento = notificationsAseguramiento.filter(notification => {
          const notificationDate = new Date(notification.fechaAseguramiento);
          return notificationDate > today;
        });
        deletedNotificationsAseguramiento.forEach(notification => {
          axios.delete(`http://localhost:3006/fechas/${notification.id}`);
        });

        // Eliminar notificaciones de contrato que han superado su fecha de vencimiento
        const deletedNotificationsContrato = notificationsContrato.filter(notification => {
          const notificationDate = new Date(notification.fechaFinContrato);
          return notificationDate > today;
        });
        deletedNotificationsContrato.forEach(notification => {
          axios.delete(`http://localhost:3006/fechas/${notification.id}`);
        });
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
          <div className="notification-list">
            <h6 className="tittle">Notificaciones de Aseguramiento</h6>
            {notificationsAseguramiento.map((notification, index) => (
              <div key={index} className="notification-item">
                <div className="notification-details">
                  <small>Fecha final de aseguramiento:</small>
                  <span>{new Date(notification.fechaAseguramiento).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
            <h6 className="tittle">Notificaciones de Contrato</h6>
            {notificationsContrato.map((notification, index) => (
              <div key={index} className="notification-item">
                <div className="notification-details">
                  <small>Fecha final de contrato:</small>
                  <span>{new Date(notification.fechaFinContrato).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Popover.Body>
      </Popover>
    </div>
  );
};
