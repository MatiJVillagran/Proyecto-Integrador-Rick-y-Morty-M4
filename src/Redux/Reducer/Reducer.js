import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "../Action/Action"


const initialState= {
    myFavorites:[],
    allCharacters:[]
}

const rootReducer= (state=initialState, action)=>{

    const {type, payload}= action; //destructuring del parametro action

    switch (type) {
        case ADD_FAV:
            return {...state, myFavorites: [...state.myFavorites, payload], allCharacters: [...state.allCharacters, payload]};

        case REMOVE_FAV:
            return {...state, myFavorites: state.myFavorites.filter((char)=> char.id !== payload)}
            
        case FILTER:
            if (payload==="all"){
                return {...state, myFavorites:[...state.allCharacters]}
            }else{
            return {...state, myFavorites: state.allCharacters.filter((char)=>char.gender === payload)} }
            
        case ORDER:
            if (payload==="A"){
                return {...state, myFavorites: state.allCharacters.sort((a,b)=> a.id-b.id)}
            }else{
                if (payload==="D"){
                    return {...state, myFavorites: state.allCharacters.sort((a,b)=> b.id-a.id)}
                }
            }
                
           
        default:
            return ({...state})
    }
}

export default rootReducer;