import React from 'react'
import { useState,useEffect} from 'react';

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
      <div>
        <ul>{
          dogs.map(e=>
            <li>{e.name}</li>
          )
        }
        </ul>
        <button onClick={()=>pageup()}>up</button>
        <button onClick={()=>pagedown()}>down</button>
      </div>
    );
};
