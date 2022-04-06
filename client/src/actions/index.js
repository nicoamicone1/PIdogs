import axios from 'axios';

const api='http://localhost:3001/dogs';

export function getDogs(){
    return async function(dispatch){
        try {
            let perros=await axios.get(api);
            let a=perros.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            return dispatch({
            type: 'GET_DOGS',
            payload: a
        })
        } catch (error) {
            console.log(error)
        }
    }
}
export function FilterCreated(payload){
    return async function(dispatch){
        let perros=await axios.get(api);
        if(payload==='yes'){perros=perros.data.filter((e)=> typeof e.id!=='number')}
        else{perros=perros.data}
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
export function getDetail(payload){
    return async function(dispatch){
        try {
            let perros=await axios.get(`${api}/${payload}`);
            return dispatch({
            type: 'GET_DETAIL',
            payload: perros.data
        })
        } catch (error) {
            console.log(error)
        }
    }
}