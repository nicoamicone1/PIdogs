import React from 'react';
import './Perro.css'
import {Link} from 'react-router-dom'

export default function Perro({perro}) {
    return (
      
      <div className='Container'>
        <Link to={'/detail/'+perro.id}>
        <div className='Card'>
          <img src={perro.image.url} alt='perroimg'/>
          <span>{perro.name}</span>
          <p>Temperament: {perro.temperament}</p>
          <p>Peso(kg): {perro.weight.metric}</p>
        </div>
        </Link>
      </div>
      
    );
};
