const {Favorite}= require ("../DB_connection");

async function postFav (req, res){

    try {

      const {id, name, image, species, gender}=req.body;

      if (!id || !name || !image || !species || !gender)
       return res.status(401).json ({error:"Faltan datos"});
      
      const [favChar, favCharCreated]= await Favorite.findOrCreate({
        where: {id},
        defaults: { name, image, species, gender}
      })
      
      if (!favCharCreated)
      return res.status(400).json({error:"Personaje ya existente"});

      const allFavs= await Favorite.findAll();

      return res.status(200).json (allFavs);

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

module.exports= postFav;