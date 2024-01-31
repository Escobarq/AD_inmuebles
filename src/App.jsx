import { Sidebar } from './Components/Slidebar/Slidebar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import { Propietarios } from './Components/View/Propietarios/propietarios'
import { Arrendatario } from './Components/View/Arrendatario/Arrendatario';
import { Inmueble } from './Components/View/Inmueble/Inmueble';
import { Codeudor } from './Components/View/Codeudor/codeudor';
import { H_gastos } from './Components/View/H_gastos/H_gastos';
import { H_recibos } from './Components/View/H_recibos/H_recibos';


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
      </Routes>
    </div>
    </>
  )
}

export default App
