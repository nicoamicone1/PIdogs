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
    const fix=()=>{
        let arr=perro[0].temperaments.map(e=>e.name);
        return arr.join(', ');
    }
    return (
       perro[0]?
        <div className=''>
            <div className=''>
                <img src={perro[0].image? perro[0].image.url : 'https://i.pinimg.com/originals/6d/f1/f8/6df1f8b5eb595358becaad1a8264e966.png' } alt='perroimg'/>
                <span>{perro[0].name}</span>
                <p>Temperament: {perro[0].temperament? perro[0].temperament : fix()}</p>
                <p>Peso(kg): {perro[0].weight.metric}</p>
                <p>Altura(cm): {perro[0].height.metric}</p>
                <p>Esperanza de vida: {perro[0].life_span}</p>
            </div>
        </div>
        :<div>Loading...</div>
        )
        
};