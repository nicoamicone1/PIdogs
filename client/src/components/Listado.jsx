import React from 'react'
import { useState,useEffect} from 'react';
import Perro from './Perro.jsx'
import './Listado.css'

export default function Listado({perros}) {
    const dogsxpage=8;
    const [page,setPage]=useState(1)
    const [buttons,setButtons]=useState([])
    const[dogs,setDogs]=useState(perros.slice(0,dogsxpage))
    
    useEffect(()=>{
      let indexD=dogsxpage*(page-1);
      let indexS=page*dogsxpage
      let botones=new Array(Math.ceil(perros.length/dogsxpage))
      setDogs(()=>perros.slice(indexD,indexS))
      for (let i = 0; i<botones.length; i++) {
        botones[i]=i
      }
      setButtons(()=>botones)
    },[page,perros])

    useEffect(()=>{
      setPage(()=>1)
    },[perros])

    
    

    return (
      <div className='container'>
        <ul className='list'>{
          dogs.map(e=>
            <li key={e.name}><Perro perro={e}/></li>
          )
        }
        </ul>
        <nav onClick={(e)=>setPage(()=>e.target.value)}>
          {
            buttons.map(e=>
              <button key={buttons.indexOf(e)+1} value={buttons.indexOf(e)+1}>{buttons.indexOf(e)+1}</button>
              )
          }
        </nav>
      </div>
    );
};
