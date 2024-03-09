// Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register({ setLoggedInUser }) {
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    birthdate: '',
    gender: 'male', // Valor predeterminado, puedes ajustarlo según necesites
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    // Verifica que todos los campos requeridos estén llenos antes de continuar
    if (
      formData.username &&
      formData.phoneNumber &&
      formData.email &&
      formData.password &&
      formData.birthdate
    ) {
      // Simulación de registro exitoso
      setLoggedInUser(formData.username);

      // Almacena los datos del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(formData));

      // Redirige a /dashboard después del registro
      navigate('/dashboard');
    } else {
      // Puedes manejar la lógica para mostrar un mensaje de error o realizar otras acciones
      alert('Por favor, completa todos los campos obligatorios.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Nombre de Usuario:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Número de Celular:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Correo Electrónico:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Fecha de Nacimiento:
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Género:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
}

export default Register;
