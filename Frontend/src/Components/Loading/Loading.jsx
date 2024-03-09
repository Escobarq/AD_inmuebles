import logo from '../../assets/Logo2.png'
import './Loading.css'
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
   
    return ( 
        <>
        <div className="contener-home c-loading">
            <h1>Bienvenido a AdmInmuebles</h1>
            <img className='logo-img' src={logo} alt="Logo" />
            <Spinner className='loading' animation="border" variant="warning" />
        </div>
        </>
     );
}
 

export default Loading;