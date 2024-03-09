// ParentComponent.js
import React, { useState } from 'react';
import Register from './Register';

function ParentComponent() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div>
      {/* Otros componentes o contenido aquí */}
      <Register setLoggedInUser={setLoggedInUser} />
      {/* Otros componentes o contenido aquí */}
    </div>
  );
}

export default ParentComponent;
