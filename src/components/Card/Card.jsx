import { useEffect, useState } from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../../Redux/Action/Action";

export default function Card({
  id,
  name,
  status,
  species,
  gender,
  origin,
  image,
  onClose,
}) {
  const [isFav, setIsFav] = useState(false);

  const dispatch = useDispatch();

  const myFavorites= useSelector ((state)=> state.myFavorites);

  const char={
      name: name,
      species: species,
      gender: gender,
      id: id,
      image: image,
      onClose:onClose,
  }

  useEffect(()=>{
   myFavorites.forEach((fav) => {
      if (fav.id === id){
         setIsFav (true);
      }
   });
  }, [myFavorites])

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(removeFav(id));
    } else {
      setIsFav(true);
      dispatch(addFav(char));
    }
  };

  const handleClose=()=>{
   onClose(id);
   if (isFav) {
      dispatch(removeFav(id));
    }
  }

  return (
    <div className={style.tarjeta}>
      <button className={style.btn} onClick={handleClose}>X</button>
      
      {
      isFav ? (
        <button className={style.favBtn} onClick={handleFavorite}>❤️</button>
      ) : (
        <button className={style.UnfavBtn} onClick={handleFavorite}>🤍</button>
      )}
     
      <Link to={`/detail/${id}`}>
        <h2 className={style.name}>{name}</h2>
      </Link>
      {/* <h2 className={style.datos}>{status}</h2> */}
      <h2 className={style.datos}>{species}</h2>
      <h2 className={style.datos}>{gender}</h2>
      <h2 className={style.datos}>{origin?.name}</h2>
      <img className={style.imagen_borde} src={image} alt="" />
    </div>
  );
}
