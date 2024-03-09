// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/">Descargar App</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/autores">Autores</Link>
        <Link to="/audiolibros">Audiolibros</Link>
        <Link to="/ayuda">Ayuda</Link>
        <Link to="/acerca-de">Acerca de</Link>
      </div>
    </nav>
  );
}

export default Navbar;
