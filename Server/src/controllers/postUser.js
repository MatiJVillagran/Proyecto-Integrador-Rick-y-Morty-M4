const {User}= require("../DB_connection");

async function postUser (req, res){
    try {

    const {email, password}= req.body;

    if (!email || !password)  
     return res.status (400).json ({error: "Faltan datos"});

     const [user, userCreated]= await User.findOrCreate({
        where:{email},
        defaults:{
            password,
        }
     })

     if (!userCreated)
     return res.status(409).json({error:"El usuario ya existe"});

    return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
    

}

module.exports= postUser;