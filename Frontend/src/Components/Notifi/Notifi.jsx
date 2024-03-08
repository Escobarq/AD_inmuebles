import React, { useState, useEffect } from 'react';
import { Button, Badge, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Notifi.css';

export const Notifi = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3006/notificaciones');
        setNotifications(response.data);
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
            <div key={index} className={notification.EstadoContrato === 'Finalizado' ? 'notification-finished' : 'notification-pending'}>
              {notification.NombreArrendatario} - {notification.NumeroMatricula}
            </div>
          ))}
        </Popover.Body>
      </Popover>
    </div>
  );
};
