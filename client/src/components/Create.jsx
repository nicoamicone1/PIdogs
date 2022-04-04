import React from 'react';
import axios from 'axios'
const reg=/^[a-zA-Z]*$/
const regnum=/^[0-9]*$/

export function validate(e) {
  if(e.target.name==='namecreated'){
    if(reg.test(e.target.value))return true;
    return false
  }
  else{
    if(regnum.test(e.target.value))return true;
    return false
  }
}

export function validatemaxmin(max,min) {
  console.log(min)
  if(max>min)return true;
  return false;
}

export default function Create() {
    const [temps,setTemps]=React.useState([])
    const [obj,setObj]=React.useState({name:'',alt_min:0,alt_max:0,pes_max:0,pes_min:0,lifespan_max:0,lifespan_min:0})
    const [ready,setReady]=React.useState(0)
    const [error,setError]=React.useState({})

    React.useEffect(()=>{
        axios('http://localhost:3001/temperament').then(r=>setTemps(r.data))
    },[])

    function change(e){
      if(e.target.name==='namecreated'){

        setError((old)=>({...old,name:false}))
        validate(e)? 
        setObj((old)=>({...old,name: e.target.value}))
        :setError((old)=>({...old,name:'El nombre debe contener solo letras'}));
      }
      else{
        validate(e)?setObj((old)=>({...old,[e.target.name]:e.target.value})):setError((old)=>({...old,[e.target.name]:'Debe ser un número'}))
        
      }
    }
    return (
      
      <div className='Creator'>
        <form onSubmit={(e)=>{
          e.preventDefault();
          console.log(error)
        }}>
            <input type='text' placeholder='Nombre' name='namecreated'onChange={(e)=>change(e)}/>
            {error.name? <p>{error.name}</p>: <br></br>}
            <input type='text' placeholder='Altura Maxima'name='alt_max'onChange={(e)=>change(e)}/>
            {error.alt_max? <p>{error.alt_max}</p>: null}
            <input type='text' placeholder='Altura Minima'name='alt_min'onChange={(e)=>change(e)}/>
            <input type='text' placeholder='Peso Maximo'name='pes_max'onChange={(e)=>change(e)}/>
            <input type='text' placeholder='Peso Minimo'name='pes_min'onChange={(e)=>change(e)}/>
            <input type='text' placeholder='Años de vida minimo'name='lifespan_min'onChange={(e)=>change(e)}/>
            <input type='text' placeholder='Años de vida maximo'name='lifespan_max'onChange={(e)=>change(e)}/>
            {temps.length?temps.map(e=>
                <div>
                <input type='checkbox' value={e.name} id={e.name}/>
                <label for={e.name}>{e.name}</label>
                </div>
            )
            :<div>Loading...</div>}
            <input type='submit' disabled={ready? false:'disabled'}/>
        </form>
      </div>
      
    );
};
