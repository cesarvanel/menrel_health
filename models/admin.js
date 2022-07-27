let db = require('../database/database');

class Admin {
    // construction de la classe client
    constructor(nom_admin, email_admin = null, mot_de_passe) {
        this.nom_admin = nom_admin;
        this.email_admin = email_admin;
        this.mot_de_passe = mot_de_passe;
    }


    static createNewuser(nom , email, password, callback){

        let sql = 'INSERT INTO admin SET NOM_ADMIN = ? , EMAIL_ADMIN = ? , PASSWORD_ADMIN = ?'; 

        db.query(sql, [nom, email, password], (err, result) =>{

            if(err) throw err; 
            callback(result) ;
        })
    }

    static check_email(email, callback){

        let sql = 'SELECT * from admin where EMAIL_ADMIN = ?' ;
        db.query(sql, email, (err, row) =>{

            if(err) throw err; 

            callback(row);
        })
    }

    static addhospital (nom, address , callback){

        let sql = 'INSERT INTO hopital SET NOM_HOPITAL = ? , ADRESSE = ? ' ;
        db.query(sql, [nom, address], (err, result) =>{

            if(err) throw err;
            callback(result)
        })
    }

    static check_hospital (nom , callback) {

        let sql = 'SELECT * FROM hopital where NOM_HOPITAL = ?' ;
        db.query(sql , nom , (err, row) =>{
            if(err) throw err ; 
            callback(row);
        })
    }

    static get_all_hospital (callback){
        
        let sql = 'SELECT * FROM hopital';
        db.query(sql, (err, rows) =>{

            if(err) throw err ; 
            callback(rows)
        })
    }

    static new_medecin (select, medecin , password,email , number , callback) {

        let sql = 'INSERT INTO medecin SET NOM_HOPITAL = ?, NOM_MEDECIN = ? , PASSWORD_MEDECIN =  ? , EMAIL_MEDECIN = ? ,  TELEPHONE = ?'; 

        db.query(sql, [select, medecin,email ,  password, number], (err,row) =>{
            
            if(err) throw err; 

            callback(row);

        })
    }

    static check_medecin(email, callback){

        let sql = 'SELECT * FROM medecin WHERE EMAIL_MEDECIN = ?' ; 

        db.query(sql , email, (err, row) =>{
            
            if(err) throw err ;
            callback(row)
        })
    }

    static get_all_element(callback) {

        let sql = "SELECT * FROM patient"; 
        db.query(sql,(err, result) =>{
            if(err) throw err;

            callback(result) ;
        })
    }

    static get_all_analyse( callback){

        let sql = "SELECT * FROM analyse " ; 
        db.query(sql, (err, result) =>{

            callback(result) ;

            return result ; 
        })
    }
    
}



module.exports = Admin;