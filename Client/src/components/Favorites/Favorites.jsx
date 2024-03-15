import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./Favorites.module.css"
import { filterCards, orderCards, removeFav } from "../../Redux/Action/Action";
import { useState,useEffect } from "react";


 const Favorites= ()=>{

    const dispatch= useDispatch();
    const [aux, setAux]= useState(false);

    const myFavorites = useSelector((state)=>state.myFavorites);
   

   

    const handleOrder= (e)=>{
        dispatch(orderCards(e.target.value));
        setAux(!aux);
    }

    const handleFilter= (e)=>{
        dispatch(filterCards(e.target.value));
    }

    useEffect(() => {
        // Este efecto se ejecuta cuando cambia el filtro o el orden
        // Aquí se debería llamar a las acciones para filtrar u ordenar los personajes
        dispatch(filterCards("all")); // Filtro inicial para mostrar todos los personajes
      }, [dispatch]);

    const handleCloseCard = (id) => {
        // Aquí puedes realizar cualquier acción necesaria cuando se cierra una tarjeta
        // Por ejemplo, podrías eliminar el personaje de la lista de favoritos
        dispatch(removeFav(id));
        console.log("Card closed:", id);
      };

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
                onClose= {() => handleCloseCard(fav.id)} />
            ))}
        </div>
    )
}


export default Favorites;