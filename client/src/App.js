import './App.css';
import React from 'react'
import {Route} from 'react-router-dom'
import SearchBar from './components/SearchBar.jsx'
import { Link } from 'react-router-dom';
import Listado from './components/Listado.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {getDogs} from './actions/index.js'
import Filter from './components/Filter.jsx'
import Detail from './components/Detail.jsx'
import Create from './components/Create.jsx'


function App() {
  const dispatch=useDispatch();
  const perros=useSelector((state)=>state.dogs)
  
  React.useEffect(()=>{
    dispatch(getDogs())
  },[dispatch])

  return (
    <div className='App'>
      <Route exact path='/'>
          <video muted loop autoPlay id="fullscreen-video">
          <source src="video2.mp4" type="video/mp4"/>
          </video>
        <div className='inicio'>
          <h1>Welcome!</h1>
          <Link to='/find'>
            <button className='botoninicio'>Inicio</button>
          </Link>
        </div>
      </Route>
      <Route exact path='/find'>
        <div className='FilterContainer'>
          <div className='Busqueda'>
            <SearchBar/>
            <Filter/>
          </div>
          <div className='List'>
            <Listado perros={perros}/>
          </div>
        </div>
      </Route>
      <Route path='/detail/:id' render={(props)=><Detail id={props.match.params.id}/>}/>
      <Route path='/create' render={()=><Create/>}/>
      
    </div>
  );
}

export default App;
