import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./Favourites.module.css"
import { filterCards, orderCards } from "../../Redux/Action/Action";
import { useState } from "react";


 const Favorites= ()=>{

    const dispatch= useDispatch();
    const [aux, setAux]= useState(false);

    const myFavorites = useSelector((state)=>state.myFavorites);

    const handleOrder= (e)=>{
        dispatch(orderCards(e.target.value));
        if (aux){
        setAux (false)}
        else{setAux(true)};
    }

    const handleFilter= (e)=>{
        dispatch(filterCards(e.target.value));
    }

    return(
        <div className={style.contenedor}>
            <nav className={style.containerselec}>
            <select className={style.selector} onChange={handleOrder}>
                <option className={style.opcion} value="A">Ascendente</option>
                <option className={style.opcion} value="D">Descendente</option>
            </select>
            <select className={style.selector} onChange={handleFilter}>
                <option className={style.opcion} value="Male">Male</option>
                <option className={style.opcion} value="Female">Female</option>
                <option className={style.opcion} value="Genderless">Genderless</option>
                <option className={style.opcion} value="unknown">Unknown</option>
                <option className={style.opcion} value="all">All</option>
            </select>
            </nav>
            {myFavorites?.map((fav)=>(
                <Card 
                key= {fav.id}
                id= {fav.id}
                name= {fav.name}
                species= {fav.species}
                gender= {fav.gender}
                image= {fav.image}
                onClose= {fav.onClose} />
            ))}
        </div>
    )
}


export default Favorites;