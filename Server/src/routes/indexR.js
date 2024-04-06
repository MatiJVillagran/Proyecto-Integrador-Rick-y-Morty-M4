const getCharById= require ("../controllers/getCharById");
const postUser= require ("../controllers/postUser");
const login= require ("../controllers/login");
const postFav= require("../controllers/postFav");
const deleteFav= require ("../controllers/deleteFav")
const express= require ("express");


const myRouter= express.Router();

myRouter.get("/character/:id", getCharById);
myRouter.get("/", login);
myRouter.post("/", postUser);
myRouter.post ("/fav", postFav);
myRouter.delete("/fav/:id", deleteFav);
// myRouter.get("/", login);
// myRouter.post("/fav", postFav);
// myRouter.delete("/fav/:id", deleteFav);


module.exports= (myRouter);