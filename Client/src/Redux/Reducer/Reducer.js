import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "../Action/Action"


const initialState= {
    myFavorites:[],
    allCharacters:[],
    filteredCharacters:[]
}

const rootReducer= (state=initialState, action)=>{

    const {type, payload}= action; //destructuring del parametro action

    switch (type) {
        case ADD_FAV:
            return {...state, myFavorites: payload,};

        case REMOVE_FAV:
            const updatedAllCharacters = state.allCharacters.filter(char => char.id !== payload.id);
            return {...state, myFavorites: payload,allCharacters: updatedAllCharacters
            };
            
        case FILTER:
            if (payload==="all"){
                return {...state, filteredCharacters:[...state.allCharacters]}
            }else{
            return {...state, filteredCharacters: state.allCharacters.filter((char)=>char.gender === payload)} }
            
        case ORDER:
            if (payload==="A"){
                return {...state, filteredCharacters:[...state.filteredCharacters].sort((a,b)=> a.id-b.id)}
            }else{
                
                    return {...state, filteredCharacters:[...state.allCharacters].sort((a,b)=> b.id-a.id)}
                
            }
                
           
        default:
            return ({...state})
    }
}

export default rootReducer;