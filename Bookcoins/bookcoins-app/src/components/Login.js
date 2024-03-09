// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setLoggedInUser }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loginMessage, setLoginMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (formData.username && formData.password) {
      setLoggedInUser(formData.username);
      setLoginMessage('Has iniciado sesión correctamente!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <label>
          Usuario:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
}

export default Login;
