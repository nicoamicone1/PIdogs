import React from 'react';
import './Filter.css'
import {useDispatch, useSelector} from 'react-redux'
import {FilterCreated} from '../actions/index.js'

export default function Filter() {
    const dispatch=useDispatch()
    const perros=useSelector((state)=>state.dogs)

    function Created(){
        dispatch(FilterCreated())
    }

    return (
      <div className='Container'>
          <button onClick={()=>Created()}>X</button>
      </div>
    );
};