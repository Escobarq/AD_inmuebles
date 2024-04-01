import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export const Contraseña = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
  });
  const [error, setError] = useState(false); // Inicializar como falso
  const [userEmail, setUserEmail] = useState(""); // Estado para almacenar el correo del usuario

  useEffect(() => {
    // Obtener el correo del usuario del localStorage al cargar el componente
    const userEmailFromStorage = localStorage.getItem("items");
    if (userEmailFromStorage) {
      setUserEmail(userEmailFromStorage);
      setUserData((prevData) => ({
        ...prevData,
        correo: userEmailFromStorage,
      }));
    }
  }, []);

  const handleChangePassword = () => {
    const { oldPassword, newPassword } = passwordData;

    // Hacer una solicitud POST al servidor para cambiar la contraseña
    axios
      .post("http://localhost:3006/api/changePassword", {
        ...userData,
        ...passwordData,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Contraseña actualizada exitosamente", {
            theme: "colored",
          });
          setShowPasswordModal(false);
        } else {
          toast.error("Ocurrió un error", { theme: "colored" });
        }
      })
      .catch((error) => {
        console.error("Error al cambiar la contraseña:", error);
        toast.error("Error al cambiar la contraseña", { theme: "colored" });
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSaveChanges = () => {
    if (
      passwordData.newPassword !== passwordData.confirmPassword ||
      !userData.nombre ||
      !userData.apellido
    ) {
      // Si las contraseñas no coinciden o faltan el nombre o apellido, establecer error a true
      setError(true);
    } else {
      // Si las contraseñas coinciden y se proporciona el nombre y apellido, establecer error a false y mostrar el modal
      setError(false);
      setShowPasswordModal(true);
    }
  };

  const handleCancelChanges = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    window.location.href = "/Inmueble";
    setShowConfirmModal(false);
  };

  return (
    <div className="contener-home contener-rpropietario">
      <h1>Editar Perfil</h1>
      <div className="container">
        <Form style={{ width: "100%" }} className="form-propietario">
          <Form.Group controlId="formNombre" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              name="nombre"
              value={userData.nombre}
              onChange={(e) =>
                setUserData({ ...userData, nombre: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formApellido" className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu apellido"
              name="apellido"
              value={userData.apellido}
              onChange={(e) =>
                setUserData({ ...userData, apellido: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formCorreo" className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              name="correo"
              value={userData.correo}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formOldPassword" className="mb-3">
            <Form.Label>Contraseña anterior</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña anterior"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formNewPassword" className="mb-3">
            <Form.Label>Contraseña nueva</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirmar contraseña nueva</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirma tu nueva contraseña"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleInputChange}
            />
            {error && (
              <Form.Text className="text-danger">
                Las contraseñas no coinciden o faltan datos
              </Form.Text>
            )}
          </Form.Group>
        </Form>
        <div className="contener-buttons d-flex justify-content-center">
          <Button variant="primary" className="m-2" onClick={handleSaveChanges}>
            <FontAwesomeIcon icon={faSave} className="me-2" />
            Guardar cambios
          </Button>
          <Button
            variant="danger"
            onClick={handleCancelChanges}
            className="m-2"
          >
            <FontAwesomeIcon icon={faTimes} className="me-2" />
            Cancelar
          </Button>
        </div>
        <Modal
          show={showPasswordModal}
          onHide={() => setShowPasswordModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar cambios</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que deseas cambiar tu contraseña?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleChangePassword}>
              Sí
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar cancelación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que deseas cancelar la operación?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmModal(false)}
            >
              No
            </Button>
            <Button variant="primary" onClick={handleConfirmCancel}>
              Sí
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
