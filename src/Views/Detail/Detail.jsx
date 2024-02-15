import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Detail.module.css"


const Detail= ()=>{

    const [character, setCharacter]= useState ({});
    const {id}= useParams(); 

    useEffect(() => {
        axios(`https://rym2.up.railway.app/api/character/${id}?key={pi-matijvillagran}`).then(
           ({ data }) => {
              if (data.name) {
                 setCharacter(data);
              } else {
                 window.alert('No hay personajes con ese ID');
              }
           }
        );
        return setCharacter({});
     }, [id]);

    return(
      <div className={style.detallecomp}>
         <img className={style.imagen} src={character.image} alt='' />
         <div className={style.container}>
         <h2 className={style.name}>{character.name}</h2>
         <h2 className={style.datos}>STATUS: {character.status}</h2>
         <h2 className={style.datos}>SPECIES: {character.species}</h2>
         <h2 className={style.datos}>GENDER: {character.gender}</h2>
         <h2 className={style.datos}>ORIGIN: {character.origin?.name}</h2>
         </div>
     </div>
 
              
    
    )
}

export default Detail;