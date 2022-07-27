const res = require('express/lib/response');
const { resume } = require('../database/database');
let db = require('../database/database')

class Medecin {

    constructor(email_medecin, mot_passe, telephone){

        this.email_medecin = email_medecin ;
        this.mot_passe = mot_passe,
        this.telephone = telephone
    }


    static post_login(email, callback){

        let sql = "SELECT * FROM medecin WHERE EMAIL_MEDECIN = ?";
        db.query(sql, email, (err, row) =>{
            
            if(err) throw err ;

            callback(row);
        })
    }

    static get_list_echantillon(callback){

        let sql = "SELECT * FROM echantillon" ;
        db.query(sql, (err, rows) =>{

            if(err) throw err ; 
            callback(rows);
        })
    }

    static get_list_analyse(callback){
        
        let sql = 'SELECT *  FROM analyse' ; 
        db.query(sql , (err, rows) =>{

            if(err) throw err ;

            callback(rows)
        })
    }

     static get_all_patient( id ,callback) {

        let sql = "SELECT * FROM patient    WHERE ID_PATIENT = ? " ; 

        db.query(sql , id, (err, result) =>{

            if(err) throw err ;
            
            let sql = 'SELECT * FROM echantillon WHERE ID_ECHANTILLON = ? ' ;

            db.query(sql, result[0].ID_PATIENT, (err, row) =>{

                if(err) throw err ; 

                let sql = 'SELECT * FROM analyse WHERE ID_ANALYSE = ? ' ; 
                db.query(sql ,row[0].ID_ECHANTILLON, (err,rows) =>{

                    if(err) throw err ; 

                    callback(rows);
                })
            })
        })
    }
    

    //static analyse()
 
}

module.exports = Medecin ;