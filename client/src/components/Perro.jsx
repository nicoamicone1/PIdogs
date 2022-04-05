import React from 'react';
import './Perro.css'
import {Link} from 'react-router-dom'

export default function Perro({perro}) {
    let perroimagen=''
    if(Array.isArray(perro.temperaments)){
      let arr=perro.temperaments.map(e=>e.name);
      perro.temperament=arr.join(', ');
      perroimagen='https://i.pinimg.com/originals/6d/f1/f8/6df1f8b5eb595358becaad1a8264e966.png';
    }else{
      perroimagen=perro.image.url
    }
    return (

      <div className='Container'>
        <Link to={'/detail/'+perro.id}>
        <div className='Card'>
          <img src={perroimagen} alt='perroimg'/>
          <span>{perro.name}</span>
          <p>Temperament: {perro.temperament}</p>
          <p>Peso(kg): {perro.weight.metric}</p>
        </div>
        </Link>
      </div>

    );
};
