import ordenamiento from '../utils/ordenamiento.js'

const initialState={
    dogs:[],
    allDogs:[],
    busquedas:[],
    detail:[]
}

function rootReducer(state=initialState,action){
    switch(action.type){
        case 'GET_DOGS':{
            return{
                ...state,
                dogs:action.payload,
                allDogs:action.payload,
                busquedas:[],
                detail:[]
            }
        }
        case 'GET_CREATED':{
            return{
                ...state,dogs:action.payload
            }
        }
        case 'GET_BYTEMP':{
            if(action.payload==='All')return state//{...state,dogs:state.allDogs};
            state.dogs=state.dogs.filter(e=>e.temperament)
            let final=state.dogs.filter(e=>e.temperament.includes(action.payload));

            return{
                ...state,dogs:final,busquedas:state.busquedas.concat({temps: action.payload})
            }
        }
        case 'FILTER_DOGS':{
            let final=state.dogs.filter(e=>e.name.toLowerCase().includes(action.payload.toLowerCase()))
            return{
                ...state,dogs:final,busquedas:state.busquedas.concat({name: action.payload})
            }
        }
        case 'SORT_LETTER':{
            let final=[]
            state.dogs.forEach(e=>final.push(e))
            return{
                ...state,dogs:final.reverse()
            }
        }
        case 'SORT_WEIGHT':{
            let final=[]
            if(action.payload==='maM')final=ordenamiento(state.dogs,'maM');
            else final=ordenamiento(state.dogs)
            return{
                ...state,dogs:final
            }
        }
        case 'GET_DETAIL':{
            return{
                ...state,detail:action.payload
            }
        }
        default: return state;
    }
}

export default rootReducer;