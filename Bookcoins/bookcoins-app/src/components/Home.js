import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import bookImage from './images/_75f5cd27-52a7-49a1-97df-e4506987c1dd.jpeg';

function Home() {
  return (
    <div className="container">
      <Navbar />
      
      <div className="text-container">
        <h2>Bienvenido a Bookcoins</h2>
        <p>Una aplicación para intercambiar libros.</p>

        <div className="links-container">
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Registrarse</Link>
        </div>
      </div>

      <div className="image-container">
        <img src={bookImage} alt="Book" />
      </div>
    </div>
  );
}

export default Home;


