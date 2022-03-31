import axios from 'axios';

const api='http://localhost:3001/dogs';

export function getDogs(){
    return async function(dispatch){
        let perros=await axios.get(api);
        return dispatch({
            type: 'GET_DOGS',
            payload: perros.data
        })
    }
}
export function FilterCreated(){
    return async function(dispatch){
        let perros=await axios.get(api);
        perros=perros.data.filter((e)=> typeof e.id!=='number')
        return dispatch({
            type: 'GET_CREATED',
            payload: perros
        })
    }
}
export function FilterTemp(payload){
        return ({
            type: 'GET_BYTEMP',
            payload
        })
}

export function FilterDogs(payload){
    return ({
        type: 'FILTER_DOGS',
        payload
    })
}

export function SortLetter(payload){
    return ({
        type: 'SORT_LETTER',
        payload
    })
}

export function SortWeight(payload){
    return ({
        type: 'SORT_WEIGHT',
        payload
    })
}