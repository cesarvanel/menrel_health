const res = require('express/lib/response');
let db = require('../database/database');

class Patient {
    // construction de la classe patient
    constructor(nom_patient, email_patient = null, age_patient,  mot_passe_patient, telephone) {
        this.nom_patient = nom_patient;
        this.age_patient = age_patient;
        this.email_patient = email_patient;
        this.mot_passe_patient = mot_passe_patient;
        this.telephone = telephone;
    }



    static get_patient(calback ){

        let sql = 'SELECT * FROM patient' 
        db.query(sql, (err, rows) =>{
            if(err) throw err;
            calback(rows);
        })
    }

    static post_patient (nom_patient, age, mot_passe_patient, telephone, email_patient , calback) {

        let sql = "INSERT INTO patient SET NOM_PATIENT = ? , AGE = ? , PASSWORD_PATIENT = ? , TELEPHONE = ? , EMAIL_PATIENT = ?  ";
        db.query(sql , [nom_patient, age, mot_passe_patient, telephone, email_patient], (err, result) =>{

            if(err) throw err; 

            calback(result);


        })

    }

    static get_one_patient(email_patient, callback){

        let sql = "SELECT * FROM patient WHERE  EMAIL_PATIENT = ? " ;
        db.query(sql, email_patient, (err, rows) =>{

            if(err) throw err ; 

            callback(rows);
        })
    }

    // retourne le mot de passe et l'email du patient
    static get_login(email_patient, callback) {

        let sql = "SELECT EMAIL_PATIENT, PASSWORD_PATIENT from patient WHERE EMAIL_PATIENT = ?";
        db.query(sql, [email_patient], (err, row) =>{

            if(err) throw err ; 
            callback(row);
            
        })
    }

    static get_patient_by_id(id, callback ){

        let sql = "SELECT * FROM PATIENT where  ID_PATIENT = ? " ; 
        db.query(sql , id, (err, row) =>{

            if(err) throw err ; 
             callback(row);
        })
    }

   

}



module.exports = Patient;