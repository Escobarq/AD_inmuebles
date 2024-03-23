import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./Configure.css"; // Importa el archivo CSS
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export const Configure = () => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad de la ventana modal
  const [formData, setFormData] = useState({
    host: "",
    user: "",
    password: "",
    database: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3006/api/config", formData);

      if (response.status === 200) {
        toast.success("Datos de conexión enviados con éxito",{
            theme:"colored"
        });
        console.log(formData);
        // Puedes realizar acciones adicionales, como restablecer el formulario o cerrar la ventana modal
      } else {
        toast.error("Error al enviar los datos de conexión", {
            theme: "colored",
          });
      }
    } catch (error) {
        toast.error("Error en la solicitud: " + error.message, {
            theme: "colored",
          });
    }
  };

  // Función para mostrar u ocultar la ventana modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <button className="configure-button" onClick={toggleModal}>
        <FontAwesomeIcon icon={faGear} className="configure-button-icon" />
        Ajustes de Conexión
      </button>
      {showModal && (
        <div className="modales">
          <div className="modales-content">
            <h4>Hora de conectarse al servidor</h4>
            <div className="container">
              <Form onSubmit={handleSubmit}>
                <div className="form-propietario">
                  <Form.Group controlId="Host">
                    <Form.Label className="host-cone">Escriba el host o la dirección del servidor:</Form.Label>
                    <Form.Control
                      type="text"
                      name="host"
                      value={formData.host}
                      onChange={handleInputChange}
                      className="InputsRegistros"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="User">
                    <Form.Label className="host-cone">
                      Escriba el Usuario de la base de datos:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="user"
                      value={formData.user}
                      onChange={handleInputChange}
                      className="InputsRegistros"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="Password">
                    <Form.Label className="host-cone">Escriba la contraseña del servidor:</Form.Label>
                    <Form.Control
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="InputsRegistros"
                    />
                  </Form.Group>
                  <Form.Group controlId="Database">
                    <Form.Label className="host-cone">
                      Escriba el nombre de la base de datos:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="database"
                      value={formData.database}
                      onChange={handleInputChange}
                      className="InputsRegistros"
                      required
                    />
                  </Form.Group>
                </div>
                <div className="contener-buttons d-flex justify-content-center">
                  <div className="save_deleter">
                    <Button type="submit" variant="success m-2">
                      <FontAwesomeIcon icon={faSave} />
                      <span className="text_button ms-2">Guardar</span>
                    </Button>
                    <Button type="button" variant="danger m-2" onClick={toggleModal}>
                      <FontAwesomeIcon icon={faTimes} />
                      <span className="text_button ms-2">Cancelar</span>
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
