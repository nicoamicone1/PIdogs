import React from 'react';

export default function Listado({perros}) {
    const data=perros[0]
    console.log(data)
    return (
      <div>
          <p>Aca va el perro:</p>
      </div>
    );
};
