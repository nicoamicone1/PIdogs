import './App.css';
import React from 'react'
import {Route} from 'react-router-dom'
import SearchBar from './components/SearchBar.jsx'
import { Link } from 'react-router-dom';
import Listado from './components/Listado.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {getDogs} from './actions/index.js'


function App() {
  const dispatch=useDispatch();
  const perros=useSelector((state)=>state.dogs)
  
  React.useEffect(()=>{
    dispatch(getDogs())
  },[dispatch])

  return (
    <div className='App'>
      <Route exact path='/'>
        <div className='inicio'>
          <h1>Welcome!</h1>
          <Link to='/find'>
            <button className='botoninicio'>Inicio</button>
          </Link>
        </div>
      </Route>
      <Route exact path='/find'>
        <div>
          <SearchBar/>
          <Listado perros={perros}/>
        </div>
      </Route>
      
    </div>
  );
}

export default App;
