import logo from '../../assets/Logo.png'
import './Home.css'
const Home = () => {
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