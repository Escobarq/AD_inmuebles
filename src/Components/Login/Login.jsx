import login from "../../assets/login.png";
import './login.css'
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { crearUser } from "../Hooks/RegisterUser";
import { userLogin } from "../Hooks/Userlogin";

export const Login = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);

  const notify = () => toast.success("Se Registro correctamente", {
    theme: "dark",
  });

  const a = () => toast.success("Se inicio correctamente", {
    theme: "dark",
  });

  const notifi = () => toast.success("Ya existes en la base de datos", {
    theme: "dark",

  });
  const falla = () => toast.error("Hubo un error al ingresar los datos , intente nuevamente", {
    theme: "colored"
  });


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 

  //Login//
  const onsubmitLoginUser = async (data) => {

    try {
      await userLogin(data);
      a();
    } catch (error) {
      if (error.message.includes("Cliente ya registrado")) {
        notifi()
      } else {
        falla()
        throw error; // Re-lanza el error para que pueda ser manejado en el componente
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
      notify('Registro Exioso')
      reset()
    } catch (error) {
      if (error.message.includes("Cliente ya registrado")) {
        notifi();
      } else {
        falla()
        console.error("Error al crear usuario:", error);
        throw error; // Re-lanza el error para que pueda ser manejado en el componente
      }
    }
  }
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
                    <form onSubmit={handleSubmit(onsubmitLoginUser)} method="post">
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
                        <label
                          className="form-label"
                          htmlFor="form2Example17"
                        >
                          Correo
                        </label>
                        <input
                        required
                          type="email"
                          id="correousuario"
                          name="correousuario"
                          className="form-control form-control-lg"
                          {...register("correousuario")}
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
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={{ height: "3rem" }}
                          >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                          </button>
                        </div>
                      </div>

                      <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-warning btn-lg">
                          Iniciar Sesión
                        </button>
                      </div>

                      <div className="footer_login d-flex justify-content-between mt-3 p-auto">
                        <a className="small text-muted" href="#!">
                          Olvidar Contraseña?
                        </a>
                        <div className="d-flex align-items-center">
                          <p
                            className="text_footer mb-0 me-2"
                            style={{ color: "#393f81" }}
                          >
                            No tienes cuenta?
                          </p>
                          <a
                            href="#!"
                            onClick={handleMostrarModalClick}
                            className="btn btn-link"
                            style={{ color: "#393f81" }}
                          >
                            Regístrate{" "}
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
                <input type="text" className="form-control border border-dark" placeholder="Ingresa Nombre"  {...register("nombre")} required/>
                <input type="text" className="form-control border border-dark" placeholder="Ingresa Apellido"  {...register("apellido")}required/>
                <input type="email" className="form-control border border-dark" placeholder="Ingresa Correo"  {...register("correo")}required/>

              </div>
              <div className="col">

                <input type="number" className="form-control border border-dark" placeholder="Ingresa Telefono celular"  {...register("telefono" ,)}required />
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="contrausuario"
                    name="contrausuario"
                    className="form-control form-control-lg"
                    placeholder="Ingresa Contraseña"
                    maxLength={9999999999}
                    max={15}
                    required
                    {...register("contrasena")}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{ height: "3rem" }}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
            </div>
            <div className="container d-flex flex-row justify-content-around">
              <button type="submit" className="btn btn-success w-50">Enviar Datos</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
