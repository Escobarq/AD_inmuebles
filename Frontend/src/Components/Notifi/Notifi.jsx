import React, { useState } from 'react';
import { Button, Badge, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './Notifi.css' // Importa el archivo CSS para estilos específicos de Notifi

export const Notifi = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    "Notificación 1",
    "Notificación 2",
    "Notificación 3"
    // Agrega aquí las notificaciones que tengas
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="notification-container"> {/* Utiliza la clase de estilo específica para el contenedor */}
      <Button variant="light" onClick={toggleNotifications} className="notification-button">
        <FontAwesomeIcon icon={faBell} />
        <Badge bg="danger">{notifications.length}</Badge>
      </Button>

      <Popover
        show={showNotifications}
        placement="bottom"
        onClose={() => setShowNotifications(false)}
        className="notification-popover"
        style={{ zIndex: '999' }}
      >
        <Popover.Header as="h3" className='BodyPoppins'>Notificaciones</Popover.Header>
        <Popover.Body className='BodyPoppins'>
          {notifications.map((notification, index) => (
            <div key={index}>{notification}</div>
          ))}
        </Popover.Body>
      </Popover>
    </div>
  );
};
