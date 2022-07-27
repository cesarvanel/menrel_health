let express = require('express');

let router = express.Router();
let Medecin = require('../models/medecin');
let { verify_login } = require('../models/test/test_medecin')
let bcrypt = require('bcrypt');


router.post('/login', (req, res) => {


    console.log(req.body);
    const Joi = verify_login(req.body);
    if (Joi.error) {
        res.status(400).send(JSON.stringify(Joi.error.details[0].message))
    }
    else {


        let email = req.body.email_medecin;
        let mot_passe = req.body.mot_pass_medecin;

        

        Medecin.post_login(email, (row) => {

            if (row.length) {

                if (row.length && bcrypt.compareSync(mot_passe, row[0].PASSWORD_MEDECIN)) {

                    res.status(200).send(JSON.stringify(`bienvenue monsieur ${email}`))

                }

                if (row.length && !bcrypt.compareSync(mot_passe, row[0].PASSWORD_MEDECIN)) {

                    res.status(401).send(JSON.stringify(`mot de passe incorrect monsieur ${row[0].NOM_MEDECIN}`))

                }
            }

            else {

                res.status(401).send(JSON.stringify(`le compte ${email} n'existe pas `))
            }

        })

    }




})

router.get('/echantillon', (req, res) => {

    // retourne la liste des analyses 

    Medecin.get_list_echantillon(rows => {

        res.status(200).send(JSON.stringify(rows));
    })

});

router.post('/analyse', (req, res) => {

    Medecin.get_list_analyse((rows) =>{

        console.log(rows)
        res.status(200).send(JSON.stringify(rows));
    });
});

router.post('/details', (req, res) =>{

    console.log(req.body)
    let id = req.body.ID_PATIENT ; 

    console.log(id)

    Medecin.get_all_patient(id, (rows) =>{

        console.log(rows);

        res.status(200).send(JSON.stringify(rows));
    }) ;
    
})




module.exports = router;