import React from 'react'; 
import './SearchBar.css'

export default function SearchBar() {
    return (
      <div className='SearchBar'>
        <form onSubmit={(e) => {
          e.preventDefault();
          }}>
          <input
            type="text"
            placeholder="Raza de perro..."
          />
          <input type="submit" value="BUSCAR" />
        </form>
      </div>
    );
};
