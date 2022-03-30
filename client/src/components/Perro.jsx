import React from 'react';
import './Perro.css'

export default function Perro({perro}) {
    return (
      <div className='Container'>
        <div className='Card'>
          <img src={perro.image.url} alt='perroimg'/>
          <span>{perro.name}</span>
          <p>Temperament: {perro.temperament}</p>
          <p>Peso(kg): {perro.weight.metric}</p>
        </div>
      </div>
    );
};
