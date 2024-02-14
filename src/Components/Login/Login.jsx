import login from "../../assets/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const userLogin = async (data) => {
    console.log(data)
    try {
      const response = await fetch('http://localhost:3006/Login_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        reset(); // Reinicia el formulario si la solicitud es exitosa
        window.location.href = '/inicio'; // Redirige al usuario a la vista de inicio
      } else {
        // Maneja la respuesta de error del servidor
      }
    } catch (error) {
      // Maneja los errores de red o de la aplicación
      console.error('Error al enviar datos al servidor:', error);
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
                    <form onSubmit={handleSubmit(userLogin)} method="post">
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

                      <div className="d-flex justify-content-between mt-3">
                        <a className="small text-muted" href="#!">
                          Olvidar Contraseña?
                        </a>
                        <div className="d-flex align-items-center">
                          <p
                            className="mb-0 me-2"
                            style={{ color: "#393f81" }}
                          >
                            No tienes cuenta?
                          </p>
                          <a
                            href="#!"
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
    </>
  );
};
