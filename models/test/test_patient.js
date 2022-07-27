let joi = require('joi');

const verify_register = (data)=>{
    
    const schema = joi.object().keys({

        nom_patient: joi.string()
            .min(3)
            .max(255)
            .required(),

        age_patient : joi.number() 
                    .max(30)
                    .required(),
                       

        email_patient: joi.string()
            .max(255)
            .required()
            .email(),

        mot_pass_patient : joi.string()
                .min(8) 
                .max(255)
                .required(),
                
            
        //repeat_mot_passe : joi.ref('mot_passe_patient') ,       

        telephone: joi.string()
            .pattern(new RegExp('^[0-9]{8,14}$')), // pour les numeros de telephones ordinaires
    });

    return schema.validate(data);
}


const verify_login = (data)=>{

    const schema = joi.object().keys({

        email_patient : joi.string()
                    .max(255)
                    .required()
                    .email(),

        mot_pass_patient : joi.string()
                    .min(6)
                    .max(255)
                    .required(),
    })

    return schema.validate(data);

}


module.exports = {
    verify_register: verify_register,
    verify_login: verify_login
}