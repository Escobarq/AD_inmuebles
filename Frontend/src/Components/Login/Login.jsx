import login from "../../assets/login.png";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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


  return (
    <>
      <section className="vh-100 login login-section">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10 conten-login">
            <div
              className="card login-card"
              style={{ boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.1)" }}
            >
              <div className="Login row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={login}
                    alt="login form"
                    className="img-fluid login-img vh-auto"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="contenido card-body p-4 p-lg-5">
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
