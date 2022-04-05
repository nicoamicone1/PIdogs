import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

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
  if(parseInt(max)>parseInt(min))return true;
  else return false;
}

export default function Create() {
    const [temps,setTemps]=React.useState([])
    const [obj,setObj]=React.useState({name:'',alt_min:0,alt_max:0,pes_max:0,pes_min:0,lifespan_max:0,lifespan_min:0})
    const [ready,setReady]=React.useState(false)
    const [error,setError]=React.useState({})
    let ts=[]

    React.useEffect(()=>{
        axios('http://localhost:3001/temperament').then(r=>setTemps(r.data))
    },[])

    React.useEffect(()=>{
      if(error.name===false){
        if(error.pes_min===false){
          if(error.pes_max===false){
            if(error.alt_min===false){
              if(error.alt_max===false){
                if(error.lifespan_min===false){
                  if(error.lifespan_max===false){
                    setReady(()=>true);
                  }
                }
              }
            }
          }
        }
      }
  },[error])

    function clicktemp(e){
      if(ts.includes(e.target.value)){
        ts.splice(ts.indexOf(e.target.value),1);
      }else ts.push(e.target.value);
      console.log(ts)
    }

    function change(e){
      if(e.target.name==='namecreated'){
        setError((old)=>({...old,name:false}))
        validate(e)? 
        setObj((old)=>({...old,name: e.target.value}))
        :setError((old)=>({...old,name:'El nombre debe contener solo letras'}));
      }
      else{
        setError((old)=>({...old,[e.target.name]:false}))
        if(validate(e)){
          if(e.target.name.includes('max')){
            validatemaxmin(e.target.value,obj[`${e.target.name.split('_')[0]+'_min'}`])?
            setObj((old)=>({...old,[e.target.name]: e.target.value}))
            :setError((old)=>({...old,[e.target.name]:'El valor debe ser mayor que el campo siguiente'}));
          }else{
            validatemaxmin(obj[`${e.target.name.split('_')[0]+'_max'}`],e.target.value)?
            setObj((old)=>({...old,[e.target.name]: e.target.value}))
            :setError((old)=>({...old,[e.target.name]:'El valor debe ser menor que el campo anterior'}));
          }
        }else{
          setError((old)=>({...old,[e.target.name]:'Debe ser un número'}));
        }
        
      }
    }
    return (
      
      <div className='Creator'>
        <Link to='/find'>
          <button>Volver</button>
        </Link>
        <form onSubmit={(e)=>{
          e.preventDefault();
          axios.post('http://localhost:3001/dog',{
            "name": obj.name,
            "weight": {"metric":`${obj.pes_min} - ${obj.pes_max}`},
            "height":{"metric":`${obj.alt_min} - ${obj.alt_max}`},
            "life_span": `${obj.lifespan_min} - ${obj.lifespan_max}`,
            "temps": ts
          })
        }}>
            <input type='text' placeholder='Nombre' name='namecreated'onChange={(e)=>change(e)}/>
            {error.name? <p>{error.name}</p>: null}
            <input type='text' placeholder='Altura Maxima'name='alt_max'onChange={(e)=>change(e)}/>
            {error.alt_max? <p>{error.alt_max}</p>: null}
            <input type='text' placeholder='Altura Minima'name='alt_min'onChange={(e)=>change(e)}/>
            {error.alt_min? <p>{error.alt_min}</p>: null}
            <input type='text' placeholder='Peso Maximo'name='pes_max'onChange={(e)=>change(e)}/>
            {error.pes_max? <p>{error.pes_max}</p>: null}
            <input type='text' placeholder='Peso Minimo'name='pes_min'onChange={(e)=>change(e)}/>
            {error.pes_min? <p>{error.pes_min}</p>: null}
            <input type='text' placeholder='Años de vida maximo'name='lifespan_max'onChange={(e)=>change(e)}/>
            {error.lifespan_max? <p>{error.lifespan_max}</p>: null}
            <input type='text' placeholder='Años de vida minimo'name='lifespan_min'onChange={(e)=>change(e)}/>
            {error.lifespan_min? <p>{error.lifespan_min}</p>: null}
            {temps.length?temps.map(e=>
                <div>
                <input type='checkbox' value={e.name} id={e.name} onClick={(e)=>clicktemp(e)}/>
                <label for={e.name}>{e.name}</label>
                </div>
            )
            :<div>Loading...</div>}
            {ready?<input type='submit'/>:<input type='submit' disabled/>}
        </form>
      </div>
      
    );
};
