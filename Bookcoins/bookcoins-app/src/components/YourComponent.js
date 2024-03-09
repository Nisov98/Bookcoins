// YourComponent.js
import React, { useState } from 'react';
import Register from './Register';

function YourComponent() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div>
      {/* Otros componentes o contenido aquí */}
      <Register setLoggedInUser={setLoggedInUser} />
    </div>
  );
}

export default YourComponent;
