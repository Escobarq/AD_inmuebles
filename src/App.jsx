import { Sidebar } from './Components/Slidebar/Slidebar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import { Propietarios } from './Components/View/Propietarios/propietarios'
import { Arrendatario } from './Components/View/Arrendatario/Arrendatario';
import { Inmueble } from './Components/View/Inmueble/Inmueble';
import { Rarrendatario } from './Components/View/Ra/Rarrendatario';

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
        <Route path="/Reciboarrendatario" element={<Rarrendatario/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
