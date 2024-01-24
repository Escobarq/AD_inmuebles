import { Sidebar } from './Componentes/Slidebar/Slidebar'
import './App.css'
import Home from './Componentes/Home/Home'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
    <div className="Contener-todo">
      <Sidebar/>
      <Routes>
        <Route path="/" element= { <Home/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
