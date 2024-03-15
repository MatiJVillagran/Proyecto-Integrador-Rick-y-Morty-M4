import style from "./SearchBar.module.css";
import { useState } from "react";

export default function SearchBar ({onSearch}) {
   const [id,setId]= useState ("");
   
   const handleChange = (event)=>{
      setId (event.target.value);
   }
   return (
      <div className={style.searchContainer}>
          <input className={style.searchBar} placeholder="Number of character" type='search'  onChange={handleChange}/>
         <button className={style.searchBtn} onClick={()=> onSearch(id)}>Agregar</button>
      </div>
   );
}

