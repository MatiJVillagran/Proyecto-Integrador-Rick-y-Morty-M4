import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css"
import { Link } from "react-router-dom";


function Nav({searchCharacters, random, logout}) {
  return ( 
    <div className={style.navcontainer}>
   <SearchBar className={style.searchBar} onSearch={searchCharacters} />
   <Link to= "/home" >
   <button className={style.randomBtn}>Home</button>
   </Link>
   <button className={style.randomBtn} onClick={random}>Random</button>
   <Link to="/Favorites">
   <button className={style.randomBtn}>Favorites</button>
   </Link>
   <Link to="/about">
   <button className={style.randomBtn}>About</button>
   </Link>
   <button className={style.randomBtn} onClick={()=> logout()}>Logout</button>
   
   </div>
  )
}

export default Nav;
