import { useEffect } from 'react';
import logo from '../../assets/Logo.png'
import './Home.css'

const Home = () => {
    const correousuario = localStorage.getItem('items')
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3006/Infouser?correousuario=${correousuario}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            localStorage.setItem('Rol',(data[0].idrol));
            
            
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchData();
      }, []);
  
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