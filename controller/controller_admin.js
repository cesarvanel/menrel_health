const { verify_register, verify_login, verify_new_medecin } = require('../models/test/test_admin')
let Admin = require('../models/admin')
let bcrypt = require('bcrypt');


const get_login_page = (req, res) => {


    return res.render("login",
        {
            title: 'Admin-login',
            layout: './layouts/lesswith',
            errors: req.flash("errors"),

        }
    )
}

// methode d'authentification 

const login = (req, res) => {

    console.log(req.body);

    const Joi = verify_login(req.body)

    if (Joi.error) {

        req.flash("errors", Joi.error.details[0].message)
        res.redirect('/login')
    }

    else {

        let email = req.body.email;
        let mot_passe = req.body.password;

        Admin.check_email(email, (row) => {

            if (row.length) {

                if (bcrypt.compareSync(mot_passe, row[0].PASSWORD_ADMIN)) {

                    req.session.user = email;

                    res.redirect('/Dashboard')

                }

                if (!bcrypt.compareSync(mot_passe, row[0].PASSWORD_ADMIN)) {

                    req.flash("errors", `mot de passe incorrect admin ${email}`)
                    res.redirect('/login');
                }
            }

            else {

                req.flash("errors", "Ce compte n'existe pas");
                res.redirect('/login');
            }


        })
    }
}

const logout = (req, res) =>{

    if(req.session.user){

        req.session.destroy()     
    }
    res.redirect('/login')  

    
}

const get_register_page = (req, res) => {

    return res.render("register",
        {
            title: 'Admin-register',
            layout: './layouts/lesswith',
            errors: req.flash('errors')
        }
    )
};


// methode pour s'inscrire 

const newUser = (req, res) => {

    console.log(req.body);

    const Joi = verify_register(req.body);

    if (Joi.error) {

        req.flash("errors", Joi.error.details[0].message);
        res.redirect('/register')
    }

    else {

        let nom = req.body.name;
        let email = req.body.email;
        let mot_passe = req.body.password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(mot_passe, salt);

        Admin.check_email(email, (row) => {

            console.log(row.length);
            if (row.length) {

                req.flash("errors", "Ce compte existe deja")
                res.redirect('/register')

            }

            if (!row.length) {

                Admin.createNewuser(nom, email, hash, (result) => {

                    console.log(result);
                    res.redirect('/Dashboard')
                })

            }



        })

    }

}

const get_profile_page = (req, res) => {

    return res.render('profile', { title: 'Profile',admin :req.session.user });
}

// methodes pour inscrire les hopitaux 


const get_new_medecin = (req, res) => {

    Admin.get_all_hospital((rows) => {

        // console.log(rows);
        return res.render('doctor', {
            title: 'new-doctor',
            rows,
            errors: req.flash('errors'),
            admin: req.session.user
        });
    })


}

const acceuil =(req, res) =>{

    res.render('acceuil', {title : 'bonjour' , layout: './layouts/lesswith',});
}



const newdoctor = (req, res) => {

    let medecin = req.body.medecin;
    let password = req.body.password;
    let email = req.body.email;
    let number = req.body.number;
    let hopital = req.body.select;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    const Joi = verify_new_medecin(req.body);

    if (Joi.error) {

        req.flash("errors", Joi.error.details[0].message);
        res.redirect('/new_doctor')
    }
    else {

        Admin.check_medecin(email, (row) => {

            if (row.length) {

                req.flash('errors', "Ce medecin existe deja")
            }
            else {

                Admin.new_medecin(hopital, medecin, email, hash, number, (result) => {

                    console.log(result);
                    res.redirect('/new_doctor');
                })

            }
        })


    }


}

const get_hospital = (req, res) => {

    return res.render('hospital',
        {
            title: 'add-hospital',
            admin: req.session.user,
            errors: req.flash('errors')
        }
    )
}

const post_hospital = (req, res) => {

    let hopital = req.body.name;
    let adresse = req.body.address;

    console.log(req.body)

    if (hopital === '' && adresse === '' || hopital === '' || adresse === '') {

        req.flash("errors", " remplissez tous les champs")
        console.log('bonjour')

    }

    Admin.check_hospital(hopital, (row) => {

        if (row.length) {

            console.log(row.length)
            req.flash("error", "Ce centre existe deja")
            res.redirect('/new_hospital')

        }
        else {

            Admin.addhospital(hopital, adresse, (result) => {

                console.log(result);
                req.flash("success", "Ajout d'un nouveau hopital")
                res.redirect('/new_hospital');
            })
        }


    })



}

const get_dashboard = (req, res) => {

    Admin.get_all_element((count) =>{

        console.log(count.length) ;
        
    return res.render('index', { title: 'Dashboard', admin: req.session.user ,count: count.length });
    }) ;

   
}

const get_list_consult = (req, res) => {

    Admin.get_all_analyse((rows) =>{
        
        console.log(rows);
        return res.render('list_consult', { title: 'List-consult',  admin: req.session.user,rows : rows})
    })   
}

module.exports = {

    get_login_page: get_login_page,
    get_profile_page: get_profile_page,
    get_new_medecin: get_new_medecin,
    get_dashboard: get_dashboard,
    get_register_page: get_register_page,
    get_hospital: get_hospital,
    get_list_consult: get_list_consult,
    newUser: newUser,
    login: login,
    post_hospital: post_hospital,
    newdoctor: newdoctor,
    logout : logout,
    acceuil : acceuil
}