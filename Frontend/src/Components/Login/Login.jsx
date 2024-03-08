import login from "../../assets/login.png";
import "./login.css";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { crearUser } from "../Hooks/RegisterUser";
import { userLogin } from "../Hooks/Userlogin";

export const Login = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const notify = () =>
    toast.success("Se Registro correctamente", {
      theme: "dark",
    });

  const a = () =>
    toast.success("Se inicio correctamente", {
      theme: "dark",
    });

  const falla = (text) =>
    toast.error(text, {
      theme: "colored",
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //Login
  const onsubmitLoginUser = async (data) => {
    try {
      if (!data.correousuario || !data.contrausuario) {
        toast.error("Por favor, completa todos los campos");
        return; // Detener la ejecución de la función si faltan campos
      }
      await userLogin(data);
      reset();
      a(); // Mostrar mensaje de éxito
    } catch (error) {
      if (
        error.message.includes(
          "Usuario no encontrado o no autorizado para iniciar sesión"
        )
      ) {
        falla("Usuario no encontrado o no autorizado para iniciar sesión");
      } else {
        falla("Error al enviar datos al servidor:", error);
      }
    }
  };

  // Modal //
  const handleMostrarModalClick = () => {
    setMostrarModal(true);
  };

  const handleCloseModal = () => {
    setMostrarModal(false);
  };

  //Registro Usuario //
  const onsubmitNewUser = async (data) => {
    try {
      await crearUser(data);
      setMostrarModal(false);
      notify("Registro Exitoso");
      reset;
    } catch (error) {
      if (
        error.message ===
        "El correo electrónico o la contraseña ya están en uso"
      ) {
        toast.error("El correo electrónico o la contraseña ya están en uso", {
          theme: "colored",
        });
      } else {
        falla();
        console.error("Error al crear usuario:", error);
      }
    }
  };

  return (
    <>
      <section className="vh-100 login login-section">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10 conten-login">
            <div
              className="card login-card"
              style={{ boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.1)" }}
            >
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={login}
                    alt="login form"
                    className="img-fluid login-img vh-auto"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form
                      onSubmit={handleSubmit(onsubmitLoginUser)}
                      method="post"
                    >
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">
                          Bienvenido Usuario
                        </span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Ingresa a tu Cuenta
                      </h5>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          Correo
                        </label>
                        <input
                          type="email"
                          id="correousuario"
                          name="correousuario"
                          className="form-control form-control-lg"
                          {...register("correousuario")}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">
                          Contraseña
                        </label>
                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="contrausuario"
                            name="contrausuario"
                            className="form-control form-control-lg"
                            {...register("contrausuario")}
                            required
                          />
                        </div>
                      </div>

                      <div className="d-grid gap-2">
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg"
                        >
                          Iniciar Sesión
                        </button>
                      </div>

                      <div className="footer_login d-flex justify-content-between mt-3 p-auto">
                        <div className="d-flex align-items-center">
                          <a
                            href="#!"
                            onClick={handleMostrarModalClick}
                            className="btn btn-link"
                            style={{ color: "#393f81" }}
                          >
                            ¿No tienes Cuenta? Regístrate{" "}
                            <FontAwesomeIcon
                              icon={faUserPlus}
                              className="ms-1"
                            />
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal */}
      <Modal
        size="lg"
        show={mostrarModal}
        onHide={handleCloseModal}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={handleSubmit(onsubmitNewUser)}>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control border border-dark"
                  placeholder="Ingresa Nombre"
                  {...register("nombre")}
                  required
                />
                <input
                  type="text"
                  className="form-control border border-dark"
                  placeholder="Ingresa Apellido"
                  {...register("apellido")}
                  required
                />
                <input
                  type="email"
                  className="form-control border border-dark"
                  placeholder="Ingresa Correo"
                  {...register("correo")}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control border border-dark"
                  placeholder="Ingresa Telefono celular"
                  {...register("telefono")}
                  required
                  maxLength={12}
                />
                <div className="input-group">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="contrausuario"
                      name="contrausuario"
                      className="form-control form-control-lg border border-dark"
                      {...register("contrasena")}
                      required
                      placeholder="Ingresa una Contraseña"
                      max={12}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container d-flex flex-row justify-content-around">
              <button type="submit" className="btn btn-success w-50">
                Enviar Datos
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
