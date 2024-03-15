const URL= "https://rickandmortyapi.com/api/character";
const axios= require ("axios");

async function getCharById (req,res) {
    let {id}= req.params;
    try {
        let response= await axios.get (`${URL}/${id}`)
        let { 
            name,
            gender,
            species,
            origin,
            image,
            status
        } = response.data;
    if (name){
        let character= { id, name, gender, species, origin: origin.name, image, status } 
        return res.send ( character )
    }else{
        return res.status (404).send({message:"Not Found!"})
    }
    } catch (error) {

        res.status (500).send({message:error.message})
    }
}

module.exports= getCharById;