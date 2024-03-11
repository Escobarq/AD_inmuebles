import React, { useState, useEffect } from "react";
import { Button, Badge, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./Notifi.css";
import useContratoInfo from "../Hooks/useObtenerInfoContrac";

export const Notifi = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsCleared, setNotificationsCleared] = useState(false);

  // Obtener la información de los contratos usando el hook useContratoInfo
  const contratoInfo = useContratoInfo("http://localhost:3006/contratoFiltro");

  useEffect(() => {
    // Función para cargar las notificaciones
    const loadNotifications = () => {
      if (contratoInfo && !notificationsCleared) {
        const currentDate = new Date();
        const fourWeeksLater = new Date(currentDate.getTime() + 4 * 7 * 24 * 60 * 60 * 1000); // Fecha actual más 4 semanas en milisegundos

        const newNotifications = contratoInfo.filter((contrato) => {
          const fechaFinContrato = new Date(contrato.FechaFinContrato);
          return fechaFinContrato.getTime() <= fourWeeksLater.getTime();
        });

        setNotifications(newNotifications);
      }
    };

    // Cargar las notificaciones inicialmente
    loadNotifications();

    // Establecer el intervalo para cargar las notificaciones cada 30 minutos
    const interval = setInterval(loadNotifications, 30 * 60 * 1000); // 30 minutos en milisegundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [contratoInfo, notificationsCleared]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setNotificationsCleared(true);
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
          {notifications.length}
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
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={clearNotifications}
            style={{ color: "white", backgroundColor: "red", padding: "5px", borderRadius: "50%", cursor: "pointer" }}
          />
        </Popover.Header>
        <Popover.Body className="notification-body">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <div className="notification-details">
                <div>
                  <span>Un contrato esta apunto de terminar en la fecha: </span>
                  <span>{new Date(notification.FechaFinContrato).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </Popover.Body>
      </Popover>
    </div>
  );
};
