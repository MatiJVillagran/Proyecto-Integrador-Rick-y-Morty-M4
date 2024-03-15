import axios from "axios";
export const ADD_FAV= "ADD_FAV";
export const REMOVE_FAV= "REMOVE_FAV";
export const FILTER= "FILTER";
export const ORDER= "ORDER";



export const addFav= (char)=>{
 const endpoint = 'http://localhost:3001/rickandmorty/fav';
 return async (dispatch) => {
    try {
       let response= await axios.post(endpoint, char)
            return dispatch({
                type: ADD_FAV,
                payload: response.data,
            });
            
    } catch (error) {
      console.log(error.message);  
    }
}
}

export const removeFav= (id)=>{
    const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
    return async (dispatch) => {
        try {
           let response= await axios.delete(endpoint)
                return dispatch({
                    type: REMOVE_FAV,
                    payload: response.data,
            });
                
        } catch (error) {
          console.log(error.message);  
        }
    };
}

export const filterCards= (gender)=>{

    return (
        {type: FILTER, payload: gender }

    )
}


export const orderCards= (orden)=>{

    return ({
        type: ORDER, payload: orden
    }

    )
}

