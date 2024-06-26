import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Loading from "./Components/Loading/Loading";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Propietarios } from "./Components/View/Propietarios/propietarios";
import { Arrendatario } from "./Components/View/Arrendatario/Arrendatario";
import { Inmueble } from "./Components/View/Inmueble/Inmueble";
import { Codeudor } from "./Components/View/Codeudor/codeudor";
import { H_gastos } from "./Components/View/H_gastos/H_gastos";
import { H_recibos } from "./Components/View/H_recibos/H_recibos";
import { RPropietario } from "./Components/Register/Propietario/RPropietario";
import { ReArrendatario } from "./Components/Register/Arrendatario/ReArrendatario";
import { Registrocodeudor } from "./Components/Register/Codeudor/Registrocodeudor";
import { RInmuebleB } from "./Components/Register/Inmueble/RInmuebleB";
import { RInmuebleA } from "./Components/Register/Inmueble/RInmuebleA";
import { RInmuebleC } from "./Components/Register/Inmueble/RInmuebleC";
import { RInmuebleL } from "./Components/Register/Inmueble/RInmuebleL";
import { RInmuebleO } from "./Components/Register/Inmueble/RinmuebleO";
import { ContratoA } from "./Components/View/Informes/ContratoA";
import { Rarrendatario } from "./Components/Recibos/Ra/Rarrendatario";
import { ReciboGastos } from "./Components/Recibos/Rg/ReciboGastos";
import { Login } from "./Components/Login/Login";
import { Slidebar } from "./Components/Slidebar/Slidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { AsignarRol } from "./Components/View/AsignarRol/AsignarRol";
import { CodeudorInha } from "./Components/View/Codeudor/CodeudorInha";
import { InhabilitarArren } from "./Components/View/Arrendatario/InhabilitarArren";
import { InhabilitarPropetario } from "./Components/View/Propietarios/InhabilitarPropetario";
import { InhabilitarInmuebles } from "./Components/View/Inmueble/InhabilitarInmuebles";
import { InhabilitarRol } from "./Components/View/AsignarRol/InhabilitarRol";
import ContactForm from "./Components/Register/EditarPerfil/ContactForm";
import { Contrato } from "./Components/Register/Contrato/Contrato";
import { Switch } from "./Components/ToggleSwitche/Switch";
import { EditarDatosIn } from "./Components/Register/EditarDatosInmueble/EditarDatosIn";
import { Notifi } from "./Components/Notifi/Notifi";
import useRoleInfo from "./Components/Hooks/useRoleInfo";
import Crearuser from "./Components/Register/EditarPerfil/Crearuser";
import { Contraseña } from "./Components/CambiarContraseña/Contraseña";
import { OperacionInmobi } from "./Components/View/Informes/OperacionInmobi";

function App() {
  const location = useLocation();
  const roleId = useRoleInfo();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const darkModeEnabled = localStorage.getItem("darkMode");
    return darkModeEnabled ? JSON.parse(darkModeEnabled) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("loading");
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="contener-carga">
        <Loading />
      </div>
    );
  } else {
    return (
      <>
        <ToastContainer />
        <div className="Contener-todo">
          {location.pathname !== "/" && (
            <Slidebar
              darkMode={darkMode}
              handleDarkModeToggle={handleDarkModeToggle}
            />
          )}

          {roleId !== 3 &&
            location.pathname !== "/" &&
            location.pathname !== "/login" && <Notifi />}

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inicio" element={<Loading />} />
            <Route path="/Propietario" element={<Propietarios />} />
            <Route
              path="/InhaPropietarios"
              element={<InhabilitarPropetario />}
            />
            <Route path="/Arrendatario" element={<Arrendatario />} />
            <Route path="/Inharrendatario" element={<InhabilitarArren />} />
            <Route path="/Inmueble" element={<Inmueble />} />
            <Route path="/InhaInmueble" element={<InhabilitarInmuebles />} />
            <Route path="/Codeudor" element={<Codeudor />} />
            <Route path="/Codeudores" element={<CodeudorInha />} />
            <Route path="/H_gastos" element={<H_gastos />} />
            <Route path="/H_recibos" element={<H_recibos />} />
            <Route path="/RPropietario" element={<RPropietario />} />
            <Route path="/Rcomision" element={<ReciboGastos />} />
            <Route path="/ReArrendamiento" element={<Rarrendatario />} />
            <Route path="/ReArrendatario" element={<ReArrendatario />} />
            <Route path="/Registrocodeudor" element={<Registrocodeudor />} />
            <Route path="/RInmuebleA" element={<RInmuebleA />} />
            <Route path="/RInmuebleB" element={<RInmuebleB />} />
            <Route path="/RInmuebleC" element={<RInmuebleC />} />
            <Route path="/RInmuebleL" element={<RInmuebleL />} />
            <Route path="/RInmuebleO" element={<RInmuebleO />} />
            <Route path="/Carrendatario" element={<ContratoA />} />
            <Route path="/Contraseñanew" element={<Contraseña />} />
            <Route path="/Operacionimbo" element={<OperacionInmobi />} />
            {roleId === 3 && (
              <>
                <Route path="/AsignarRol" element={<AsignarRol />} />
                <Route path="/EditarPerfil" element={<ContactForm />} />
                <Route path="/Crearperfil" element={<Crearuser />} />
              </>
            )}
            <Route path="/InhabilitarRol" element={<InhabilitarRol />} />
            <Route path="/Generar" element={<Contrato />} />
            <Route path="/EditarDatosIn" element={<EditarDatosIn />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Switch />
        </div>
      </>
    );
  }
}

export default App;
