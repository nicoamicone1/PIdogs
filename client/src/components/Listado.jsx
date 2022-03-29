import React from 'react'
import { useState,useEffect} from 'react';
import Perro from './Perro.jsx'
import './Listado.css'

export default function Listado({perros}) {
    const [page,setPage]=useState(8)
    const [dogs,setDogs]=useState([])

    useEffect(()=>{
      setDogs(perros.slice(0,8))
    },[perros])

    function pageup(){
        setPage(page => page + 8)
        setDogs(()=>perros.slice(page,page+8))
    }

    function pagedown(){
      if(page>15){
        setPage(page => page - 8)
        setDogs(()=>perros.slice(page-8,page))
      }else return;
    }
    
    return (
      <div className='container'>
        <ul className='list'>{
          dogs.map(e=>
            <p><Perro perro={e}/></p>
          )
        }
        </ul>
        <button onClick={()=>pageup()}>up</button>
        <button onClick={()=>pagedown()}>down</button>
      </div>
    );
};
