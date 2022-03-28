import React from 'react';

export default function Perro(perrito) {
    console.log(perrito.perrito[0])
    return (
      <div>
          <p>Aca va el perro: {perrito.perrito[0][1].name}</p>
      </div>
    );
};
