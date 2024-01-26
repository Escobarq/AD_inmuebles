import { Sidebar } from './Components/Slidebar/Slidebar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import { Propietarios } from './Components/View/Propietarios/propietarios'

function App() {
  return (
    <>
    <div className="Contener-todo">
      <Sidebar/>
      <Routes>
        <Route path="/home" element= { <Home/>} />
        <Route path="/RPropietario" element= { <Propietarios/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
