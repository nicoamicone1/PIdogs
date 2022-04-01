import React from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {getDetail} from '../actions/index.js'


export default function Detail({id}) {
    const dispatch=useDispatch();
    
    React.useEffect(()=>{
        dispatch(getDetail(id))
        // eslint-disable-next-line
    },[dispatch])
    const perro=useSelector((state)=>state.detail)
    console.log (perro)
    return (
       perro[0]?
        <div className='Container'>
            <div className='Card'>
                <img src={perro[0].image.url} alt='perroimg'/>
                <span>{perro[0].name}</span>
                <p>Temperament: {perro[0].temperament}</p>
                <p>Peso(kg): {perro[0].weight.metric}</p>
            </div>
        </div>
        :<div>Loading...</div>
        )
        
};