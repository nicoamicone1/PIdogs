import './App.css';
import React from 'react'
import {Route} from 'react-router-dom'
import SearchBar from './components/SearchBar.jsx'
import { Link } from 'react-router-dom';
import Listado from './components/Listado.jsx'


function App() {
  const [perros,setPerros]=React.useState([]);
  const api='https://api.thedogapi.com/v1/breeds'
  
  React.useEffect(()=>{
    fetch(api).then(r=>r.json()).then(res=>{
      setPerros((oldPerros)=>[...oldPerros,res])
      });
  },[])
  
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
