import React from 'react';
import './Filter.css'
import {useDispatch,useSelector} from 'react-redux'
import {FilterTemp,getDogs,SortLetter,SortWeight,FilterCreated} from '../actions/index.js'
import axios from 'axios';
import {Link} from 'react-router-dom'


export default function Filter() {
    const dispatch=useDispatch()
    const [temps,setTemps]=React.useState([])
    const perros=useSelector(state=>state.dogs)

    React.useEffect(()=>{
        axios('http://localhost:3001/temperament').then(r=>setTemps(r.data))
    },[])

    React.useEffect(()=>{
        document.getElementById('tempswitch').value='All'
    },[perros])

    const FiltroTemp=(e)=>{
        dispatch(FilterTemp(e.target.value))
    }
    const Letter=(e)=>{
        dispatch(SortLetter(e.target.value)) 
    }
    const Created=()=>{
      let boton=document.getElementById('createdcheck');
      boton.checked? dispatch(FilterCreated('yes')):dispatch(FilterCreated());
    }
    const Peso=(e)=>{
      if(e.target.value!=='def')dispatch(SortWeight(e.target.value));
      else return;
    }
    return (
      <div className='Container'>
        <div className='filterbtns'>
          <button onClick={()=>{
          dispatch(getDogs())
          document.getElementById('letterswitch').value='AZ'
          document.getElementById('weightswitch').value='def'
          }}>RESET</button>
          <Link to='/create'>
            <button>CREATE</button>
          </Link>
          <label class="switch">
            <input type='checkbox' value='Created' id='createdcheck' onClick={()=>Created()}/>
            <span class="slider round"></span>
          </label>
          <label for="createdcheck">Created</label>
        </div>

        <div className='switchs'>
          <select id='tempswitch' className='selector' onChange={(e)=>FiltroTemp(e)}>
                <option value='All'>None</option>
                {temps.map(e=>
                  <option value={e.name} key={e.name}>{e.name}</option>
                  )}
            </select>
            <select id='letterswitch' className='selector' onChange={(e)=>{Letter(e)}}>
              <option value='AZ'>A-Z</option>
              <option value='ZA'>Z-A</option>
            </select>
            <select id='weightswitch' className='selector' onChange={(e)=>Peso(e)}>
              <option value='def'>Filtrar por peso</option>
              <option value='Desc'>Mayor a menor</option>
              <option value='maM'>Menor a mayor</option>
          </select>
        </div>
          
      </div>
    );
};