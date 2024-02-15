import "./App.css";
import React from "react";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Detail from "./Views/Detail/Detail.jsx";
import About from "./Views/About/About.jsx";
import Cards from "./components/Cards/Cards.jsx"
import Error from "./Views/Error/Error.jsx"
import Form from "./components/Form/Form.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import Favourites from "./components/Favourites/Favourites.jsx";
import Favorites from "./components/Favourites/Favourites.jsx";


function App() {

  const [access, setAccess]= useState(false);
  const navigate= useNavigate();

  const EMAIL= "matiassjv@hotmail.com";
  const PASSWORD= "henry2024";

  function login (userData){
    if (userData.email===EMAIL && userData.password===PASSWORD){
      setAccess(true);
      navigate ("/home");
    }
  }

  function logout (){
    setAccess(false);
    navigate ("/home");
  }

  useEffect(() => {
    !access && (navigate('/'));
 }, [access, navigate]);

 
 const location= useLocation ();

 const [characters, setCharacters] = useState([]);
  
  const onClose = (id) => {
    const indent = parseInt(id, 10);
    setCharacters((characters) => characters.filter((el) => el.id !== indent));
    
  };

  const searchCharacters = (id) => {
    if (!id) {
      window.alert("¡No se ingreso un ID!");
      return;
    }

    const existe = characters.some(
      (characters) => characters.id === parseInt(id, 10)
    );
    if (!existe) {
      axios(
        `https://rym2.up.railway.app/api/character/${id}?key={pi-matijvillagran}`
      ).then(({ data }) => {
        if (data.name) {
          setCharacters((characters) => [...characters, data]);
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      });
    } else {
      window.alert("¡Personaje ya existente!");
    }
  };

  const random = () => {
    const num = Math.floor(Math.random() * 825) + 1;
    const existe = characters.some((characters) => characters.id === num);
    if (!existe) {
      axios(
        `https://rym2.up.railway.app/api/character/${num}?key={pi-matijvillagran}`
      ).then(({ data }) => {
        setCharacters((characters) => [...characters, data]);
      });
    }
  }; 
 
  return (
    <div className="App">
      
      {location.pathname !=="/" && <Nav searchCharacters={searchCharacters} random={random} logout={logout} />} 
      
        <Routes>
          <Route path="/home" element= {<Cards characters={characters} onClose={onClose} />}/>
          <Route path="/about" element= {<About/>}/>
          <Route path="/detail/:id" element= {<Detail/>}/>
          <Route path="/" element={<Form login={login} />}/>
          <Route path="/Favorites" element={<Favorites/>}/>
          <Route path="*"element= {<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
