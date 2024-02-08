import { useEffect, useState } from 'react';
import logo from '../../assets/Logo.png'
import './Home.css'
const Home = () => {
    const [propietarios, setPropietarios] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3006/propietarios');
  
          if (!response.ok) {
            throw new Error('No se pudo obtener la lista de propietarios');
          }
  
          const propietariosData = await response.json();
          setPropietarios(propietariosData);
          console.log(propietariosData)
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchData();
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (propietarios.length === 0) {
      return <div>Cargando...</div>;
    }
  
    return ( 
        <>
        <div className="contener-home">
            <h1>Bienvenido a AdmInmuebles</h1>
            <img className='logo-img' src={logo} alt="" />
        </div>
        </>
     );
}
 
export default Home;