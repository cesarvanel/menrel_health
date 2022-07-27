var express = require('express');
var router = express.Router();
let Patient = require('../models/patient');
let { verify_register, verify_login } = require('../models/test/test_patient')
const bcrypt = require('bcrypt');
const fs = require('fs');
const axios = require('axios');
const Formdata = require('form-data');

var nodemailer = require('nodemailer')



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/get_patient', (req, res) => {

    Patient.get_patient(rows => {

        console.log(rows)
        res.status(200).send(JSON.stringify(rows))
    })
})



router.post('/register', (req, res) => {

    console.log(req.body);
    const Joi = verify_register(req.body);
    if (Joi.error) {
        res.status(400).send(JSON.stringify(Joi.error.details[0].message))
    }

    else {


        let nom = req.body.nom_patient;
        let age = req.body.age_patient;
        let mot_passe = req.body.mot_pass_patient;
        let telephone = req.body.telephone;
        let email = req.body.email_patient
        console.log(nom, age, mot_passe, telephone, email);

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(mot_passe, salt);

        Patient.get_one_patient(email, (row) => {

            if (row.length) {

                res.status(401).send(JSON.stringify(`le patient ${email} existe deja`))
            }

            if (!row.length) {

                Patient.post_patient(nom, age, hash, telephone, email, (result) => {

                    console.log(result);
                    res.status(200).send(JSON.stringify(`bienvenue monsieur ${email}`));
                });

            }
        })

    }




})

// deuxieme methode 

router.post('/login', (req, res) => {

    console.log(req.body);
    const Joi = verify_login(req.body);
    if (Joi.error) {
        res.status(400).send(JSON.stringify(Joi.error.details[0].message))
    }

    else {

        let email = req.body.email_patient;
        let mot_passe = req.body.mot_pass_patient;

        Patient.get_login(email, (row) => {

            if (row.length) {

                if (row.length && bcrypt.compareSync(mot_passe, row[0].PASSWORD_PATIENT)) {

                    res.status(200).send(JSON.stringify(`bienvenue monsieur ${email}`))
                }

                if (row.length && !bcrypt.compareSync(mot_passe, row[0].PASSWORD_PATIENT)) {

                    res.status(401).send(JSON.stringify(`mot de passe incorrect`))
                }
            }

            else {

                res.status(401).send(JSON.stringify(`le compte ${email} n'existe pas `))
            }


        })

    }



});

router.get('/resultats/:id', (req, res) => {

    const token = req.params.token;

    Patient.get_patient_by_id(token, (row) => {

        res.status(200).send(Json.stringify(row));
    });



})

router.post('/images', (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {

        res.status(400).send(JSON.stringify(`pas d'image choisis`))
    }

    else {

        console.log(req.files);

        let oeil_droit = req.files.oeil_droit;
        let oeil_gauche = req.files.oeil_gauche;

        let paths_droit = process.cwd() + '/images/' + oeil_droit.name;
        let path_gauche = process.cwd() + '/images/' + oeil_gauche.name;

        fs.writeFileSync('./images/oeil_droit.png', oeil_droit.data);
        fs.writeFileSync('./images/oeil_gauche.png', oeil_gauche.data);

        // envoie de l'image sur le dossier test

        fs.writeFileSync('./test2/Severe/oeil_droit.png', oeil_droit.data);
        fs.writeFileSync('./test/Severe/oeil_gauche.png', oeil_gauche.data);


        oeil_droit.mv(paths_droit, (err) => {

            if (err) throw err;
            else {

                console.log(oeil_droit.data);
            }
        });

        oeil_gauche.mv(path_gauche, (err) => {

            if (err) throw err;

            else {

                console.log(oeil_gauche.name);
            }
        })

        res.status(200).send('image bien envoye');

    }


})

router.get('/analyses', async (req, res) => {


    let path1 = process.cwd() + '\\test';

    let path2 = process.cwd() + '\\test2';

    console.log(path1)
    console.log(path2)


    const  transporter = nodemailer.createTransport({

        host: '192.168.43.72',
        service: 'Gmail',
        secure : true,
        auth: {
            user: 'cesarzoleko@gmail.com',
            pass: '#Bankai1472'
        }
    })


    await axios({
        url: 'http://127.0.0.1:8000/app/',
        method: "get",
        params: {
            oeil_droit: path2,
            oeil_gauche: path1
        }
    }).then((response) => {
        console.log(response['data'])

        let email = response['data']
        console.log(typeof(email), email);

        /*var mailOptions = {
            from: ' "mon compte" <cesarzoleko@gmail.com>',
            to: 'cesarzoleko@gmail.com',
            subject: "resultat d'analyse",
            text: "bonjour les amis",
        }

        transporter.sendMail(mailOptions, (err,info) =>{
            
            if(err) throw err; 
            else{
                console.log('email envoye : ' + info.response)
            }

        })*/


        res.send(JSON.stringify(response['data']))




    }).catch((err) => {
        console.log(err);
    })

})




module.exports = router;