
import { useEffect, useState } from 'react';
import logo from '../../assets/Logo.png'
import './Home.css'
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
   
    return ( 
        <>
        <div className="contener-home c-loading">
            <h1>Bienvenido a AdmInmuebles</h1>
            <img className='logo-img' src={logo} alt="" />
            <Spinner className='loading' animation="border" variant="warning" />
        </div>
        </>
     );
}
 

export default Home;