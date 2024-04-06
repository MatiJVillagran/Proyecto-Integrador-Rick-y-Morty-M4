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
import Favorites from "./components/Favorites/Favorites.jsx";


function App() {

  const [access, setAccess]= useState(false);
  const navigate= useNavigate();

  // const EMAIL= "matiassjv@hotmail.com";
  // const PASSWORD= "henry2024";

  async function login (userData){
    try {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/';
      let response= await axios(URL + `?email=${email}&password=${password}`)
         const { access } = response.data;
         setAccess(response.data);
         access && navigate('/home');  
    } catch (error) {
      console.log (error.message);
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
    console.log(id);
    // const indent = parseInt(id, 10);
    setCharacters((characters) => characters.filter((el) => el.id !== id));
  };

 const searchCharacters = async (id) => {
    try {
      if (!id) {
        window.alert("¡No se ingreso un ID!");
        return;
      }
      // const parseId= parseInt(id, 10);
      const existe = characters.some((characters) => characters.id === id );
      if (!existe) {
        // axios(`https://rym2.up.railway.app/api/character/${id}?key={pi-matijvillagran}`).then(({ data }) => {
          let response= await axios(`http://localhost:3001/rickandmorty/character/${id}`);  
          if (response.data.name) {
            setCharacters((characters) => [...characters, response.data]);
          } else {
            window.alert("¡No hay personajes con este ID!");
            return;
          }
        }else {
        window.alert("¡Personaje ya existente!");
        return;
      } 
    } catch (error) {
      console.log (error.message);
    } 
  }

  const random = () => {
    const num = Math.floor(Math.random() * 825) + 1;
    const existe = characters.some((characters) => characters.id === num);
    if (!existe) {
      // axios(`https://rym2.up.railway.app/api/character/${num}?key={pi-matijvillagran}`
      axios(`http://localhost:3001/rickandmorty/character/${num}`
      ).then(({ data }) => {
        setCharacters((characters) => [...characters, data]);
      });
    }else {
      // Si el personaje ya existe, llamar de nuevo a la función random para obtener otro personaje
      random();
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
