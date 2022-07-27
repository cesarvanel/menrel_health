const jsonwebtoken = require('jsonwebtoken')

const get_token =  (req , res, next) =>{

    const token = req.header('auth_token')

    // verificatiion du token 

    if(!token) return res.status(400).send('access refuse')

    try{
        const verify = jsonwebtoken.verify(token, process.env.SECRET_TOKEN) 
        req.email_patient = verify;
        next();
    }

    catch(e){

        e.res.status(400).send('token invalide');
    }
      
}

module.exports =  {
   get_token: get_token
}