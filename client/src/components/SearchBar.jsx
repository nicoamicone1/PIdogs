import React from 'react'; 
import './SearchBar.css';
import {useDispatch} from 'react-redux';
import {FilterDogs} from '../actions/index.js'

export default function SearchBar() {
    const [barra,setBarra]=React.useState('')
    const dispatch=useDispatch()

    function FindPerros(barra){
      if(barra==='')return;
      dispatch(FilterDogs(barra))
    }
    return (
      <div className='SearchBar'>
        <form onSubmit={(e) => {
          e.preventDefault();
          FindPerros(barra);
          e.target.reset()
          }}>
          <input
            type="text"
            placeholder="Raza de perro..."
            onChange={(e)=>setBarra(()=>e.target.value)}
          />
          <div className='botonbuscar'>
          <input type="submit" value='O'/>
          </div>
        </form>
      </div>
    );
};
