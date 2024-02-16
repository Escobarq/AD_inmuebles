
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './Components/Home/Home'
import { Route, Routes,useLocation } from 'react-router-dom'
import { Propietarios } from './Components/View/Propietarios/propietarios'
import { Arrendatario } from './Components/View/Arrendatario/Arrendatario';
import { Inmueble } from './Components/View/Inmueble/Inmueble';
import { Codeudor } from './Components/View/Codeudor/codeudor';
import { H_gastos } from './Components/View/H_gastos/H_gastos';
import { H_recibos } from './Components/View/H_recibos/H_recibos';
import { RPropietario } from './Components/Register/Propietario/RPropietario';
import { ReArrendatario } from './Components/Register/Arrendatario/ReArrendatario';
import { RInmuebleB } from './Components/Register/Inmueble/RInmuebleB';
import { RInmuebleA } from './Components/Register/Inmueble/RInmuebleA';
import { RInmuebleC } from './Components/Register/Inmueble/RInmuebleC';
import { RInmuebleL } from './Components/Register/Inmueble/RInmuebleL';
import { RInmuebleO } from './Components/Register/Inmueble/RinmuebleO';
import { ContratoA } from './Components/View/Informes/ContratoA';
import { GastosIn } from './Components/View/Informes/GastosIn';
import { Rarrendatario } from './Components/Recibos/Ra/Rarrendatario';
import { ReciboGastos } from './Components/Recibos/Rg/ReciboGastos';
import { Login } from './Components/Login/Login';
import { Slidebar } from './Components/Slidebar/Slidebar';
import { RegistroCodeudor } from './Components/Register/Codeudor/Registrocodeudor';
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const location = useLocation();
  
  return (
    <>
     <ToastContainer />
    <div className="Contener-todo">
    {location.pathname !== '/' && <Slidebar/>}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/Propietario" element={<Propietarios />} />
        <Route path="/Arrendatario" element={<Arrendatario />} />
        <Route path="/Inmueble" element={<Inmueble />} />
        <Route path="/Codeudor" element={<Codeudor />} />
        <Route path="/H_gastos" element={<H_gastos />} />
        <Route path="/H_recibos" element={<H_recibos />} />
        <Route path="/RPropietario" element={<RPropietario />} />
        <Route path="/RGastos" element={<ReciboGastos />} />
        <Route path="/Reciboarrendatario" element={<Rarrendatario />} />
        <Route path="/ReArrendatario" element={<ReArrendatario />} />
        <Route path="/RInmuebleA" element={<RInmuebleA />} />
        <Route path="/RInmuebleB" element={<RInmuebleB />} />
        <Route path="/RInmuebleC" element={<RInmuebleC />} />
        <Route path="/RInmuebleL" element={<RInmuebleL />} />
        <Route path="/RInmuebleO" element={<RInmuebleO />} />
        <Route path="/Carrendatario" element={<ContratoA />} />
        <Route path="/Ginmuebles" element={<GastosIn />} />
        <Route path="/Registrocodeudor" element={<RegistroCodeudor/>} />
      </Routes>

    </div>
  </>
  )
}

export default App
