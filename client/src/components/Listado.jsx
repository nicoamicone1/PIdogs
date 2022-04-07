import React from 'react'
import { useState,useEffect} from 'react';
import {useSelector} from 'react-redux'
import Perro from './Perro.jsx'
import './Listado.css'

export default function Listado({perros}) {
    const dogsxpage=8;
    const [page,setPage]=useState(1)
    const [buttons,setButtons]=useState([])
    const[dogs,setDogs]=useState(perros.slice(0,dogsxpage))
    const busquedas=useSelector(state=>state.busquedas)
    
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
        {busquedas[0]? 
        <div className='Busquedas'>
          <p>Resultados para: </p>
          {busquedas.slice(0,5).map(e=><span> {e.temps? e.temps: e.name}</span>)}
        </div> : null}
        <ul className='list'>{
          dogs.map(e=>
            <li key={e.name}><Perro perro={e}/></li>
          )
        }
        </ul>
        <ul className='Paginado' onClick={(e)=>setPage(()=>e.target.value)}>
          {
            buttons.map(e=>
              <li className={buttons.indexOf(e)+1===page?'active':null}key={buttons.indexOf(e)+1} value={buttons.indexOf(e)+1}>{buttons.indexOf(e)+1}</li>
              )
          }
        </ul>
      </div>
    );
};
