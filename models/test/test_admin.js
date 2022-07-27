let joi = require('joi');

const verify_register = (data)=>{
    
    const schema = joi.object().keys({

        name: joi.string()
            .min(3, "utf-8" , "la taille minimum est de 6")
            .max(255)
            .required(),


        email: joi.string()
            .max(255)
            .required()
            .email(),

        password : joi.string()
                .min(8,"utf-8", "la taille minimum est de 8") 
                .max(255)
                .required()
                .pattern(new RegExp('^[a-zA-Z0-9]{8,100}$')),
            

        //repeat_mot_passe : joi.ref('mot_passe_patient') ,       

        //telephone: joi.string()
           //.pattern(new RegExp('^[0-9]{8,14}$')), // pour les numeros de telephones ordinaires
    });

    return schema.validate(data);
}


const verify_login = (data)=>{

    const schema = joi.object().keys({

        email : joi.string()
                    .min(8)
                    .max(255)
                    .required()
                    .email(),

        password : joi.string()
                    .min(8)
                    .max(255)
                    .required(),
    })

    return schema.validate(data);

}


const verify_new_medecin = (data)=>{

    const schema = joi.object().keys({

        medecin : joi.string()
                    .max(255)
                    .required(),
                    

        password : joi.string()
                    .min(6)
                    .max(255)
                    .required(),
        email    : joi.string()
                    .max(255)
                    .email()
                    .required(),

        number  : joi.string()
                    .pattern(new RegExp('^[0-9]{8,14}$'))
                    .required(),

        select  : joi.string()
                    .required()                
    })

    return schema.validate(data);

}



module.exports = {
    verify_register: verify_register,
    verify_login: verify_login, 
    verify_new_medecin : verify_new_medecin
}