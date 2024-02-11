import login from "../../assets/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <section className="vh-100 login-section">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
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
                      <form>
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
                            Nombre de usuario
                          </label>
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Contraseña
                          </label>
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="d-grid gap-2">
                          <Link to="/inicio" className="btn btn-warning btn-lg">
                            Iniciar Sesión
                          </Link>
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
        </div>
      </section>
    </>
  );
};
