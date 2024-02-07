import { Sidebar } from './Components/Slidebar/Slidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './Components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import { Propietarios } from './Components/View/Propietarios/propietarios'
import { Arrendatario } from './Components/View/Arrendatario/Arrendatario';
import { Inmueble } from './Components/View/Inmueble/Inmueble';
import { Codeudor } from './Components/View/Codeudor/codeudor';
import { H_gastos } from './Components/View/H_gastos/H_gastos';
import { H_recibos } from './Components/View/H_recibos/H_recibos';
import { RPropietario } from './Components/Register/Propietario/RPropietario';
import { ReciboGastos } from './Components/View/Rg/ReciboGastos';
import { Rarrendatario } from './Components/View/Ra/Rarrendatario';
import { ReArrendatario } from './Components/Register/Arrendatario/ReArrendatario';
import { RInmuebleB } from './Components/Register/Inmueble/RInmuebleB';
import { RInmuebleA } from './Components/Register/Inmueble/RInmuebleA';
import { RInmuebleC } from './Components/Register/Inmueble/RInmuebleC';
import { RInmuebleL } from './Components/Register/Inmueble/RInmuebleL';
import { RInmuebleO } from './Components/Register/Inmueble/RinmuebleO';

function App() {
  return (
    <>
    <div className="Contener-todo">
      <Sidebar/>
      <Routes>
        <Route path="/" element= { <Home/>} />
        <Route path="/Propietario" element= { <Propietarios/>} />
        <Route path="/Arrendatario" element= {<Arrendatario/>} />
        <Route path="/Inmueble" element= {<Inmueble/>} />
        <Route path="/Codeudor" element= {<Codeudor/>} />
        <Route path="/H_gastos" element= {<H_gastos/>} />
        <Route path="/H_recibos" element= {<H_recibos/>} />
        <Route path="/RPropietario" element= {<RPropietario/>} />
        <Route path="/RGastos" element= { <ReciboGastos/>} />
        <Route path="/Reciboarrendatario" element={<Rarrendatario/>} />
        <Route path="/ReArrendatario" element= {<ReArrendatario/>} />
        <Route path="/RInmuebleA" element= {<RInmuebleA/>} />
        <Route path="/RInmuebleB" element= {<RInmuebleB/>} />
        <Route path="/RInmuebleC" element= {<RInmuebleC/>} />
        <Route path="/RInmuebleL" element= {<RInmuebleL/>} />
        <Route path="/RInmuebleO" element= {<RInmuebleO/>} />
      </Routes>
    </div>.
    </>
  )
}

export default App
