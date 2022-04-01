import React from 'react';
import axios from 'axios'

export default function Create() {
    const [temps,setTemps]=React.useState([])

    React.useEffect(()=>{
        axios('http://localhost:3001/temperament').then(r=>setTemps(r.data))
    },[])

    return (
      
      <div className='Creator'>
        <form>
            <input type='text' placeholder='Nombre'/>
            <input type='text' placeholder='Altura Maxima'/>
            <input type='text' placeholder='Altura Minima'/>
            <input type='text' placeholder='Peso Maximo'/>
            <input type='text' placeholder='Peso Minimo'/>
            <input type='text' placeholder='Años de vida'/>
            {temps.length?temps.map(e=>
                <div>
                <input type='checkbox' value={e.name} id={e.name}/>
                <label for={e.name}>{e.name}</label>
                </div>
            ):<div>Loading...</div>}
        </form>
      </div>
      
    );
};
