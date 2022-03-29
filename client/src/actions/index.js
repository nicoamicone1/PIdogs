import axios from 'axios';

const api='https://api.thedogapi.com/v1/breeds';

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