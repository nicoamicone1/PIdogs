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