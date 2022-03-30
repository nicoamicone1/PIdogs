import React from 'react';
import './Filter.css'
import {useDispatch,useSelector} from 'react-redux'
import {FilterTemp,getDogs,SortLetter} from '../actions/index.js'
import axios from 'axios'

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
    
    return (
      <div className='Container'>
          <select id='tempswitch' className='selector' onChange={(e)=>FiltroTemp(e)}>
              <option value='All'>None</option>
              {temps.map(e=>
                <option value={e.name} key={e.name}>{e.name}</option>
                )}
          </select>
          <input type='checkbox' value='Created' id='createdcheck'/>
          <label for="createdcheck">Only created Dogs</label>
          <button onClick={()=>{
              dispatch(getDogs())
              document.getElementById('letterswitch').value='Descendente'
              }}>RESET</button>
          <select id='letterswitch' className='selector' onChange={(e)=>{Letter(e)}}>
            <option value='Descendente'>A-Z</option>
            <option value='Ascendente'>Z-A</option>
          </select>
      </div>
    );
};