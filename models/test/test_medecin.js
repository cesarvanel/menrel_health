let joi = require('joi');


const verify_login = (data)=>{

    const schema = joi.object().keys({

        email_medecin : joi.string()
                    .max(255)
                    .required()
                    .email(),

        mot_pass_medecin : joi.string()
                    .max(255)
                    .required(),
    })

    return schema.validate(data);

}


module.exports = {
    verify_login: verify_login
}