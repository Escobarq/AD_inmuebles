import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export const Contraseña = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false); // Inicializar como falso

  const handleChangePassword = () => {
    const { oldPassword, newPassword } = passwordData;
  
    // Hacer una solicitud POST al servidor para cambiar la contraseña
    axios
      .post("http://localhost:3006/api/changePassword", { oldPassword, newPassword })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Contraseña actualizada exitosamente", { theme: "colored" });
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
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // Si las contraseñas no coinciden, establecer error a true
      setError(true);
    } else {
      // Si las contraseñas coinciden, establecer error a false y mostrar el modal
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
    <div className="contener-home">
      <div>
        <Form
          style={{ width: "400px" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
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
                Las contraseñas no coinciden
              </Form.Text>
            )}
          </Form.Group>

          <Button variant="primary" className="mb-3" onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
          <Button
            variant="secondary"
            onClick={handleCancelChanges}
            className="ms-2"
          >
            Cancelar
          </Button>
        </Form>

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
