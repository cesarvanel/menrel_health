var express = require('express');
const controller_admin = require('../controller/controller_admin');
var router = express.Router();


/* GET home page. */

router.get('/', controller_admin.acceuil)

router.get('/login', controller_admin.get_login_page);
router.post('/login',controller_admin.login)

router.get('/logout', controller_admin.logout)

// les routes de register
router.get('/register', controller_admin.get_register_page);
router.post('/register', controller_admin.newUser)

router.get('/Dashboard',  controller_admin.get_dashboard);


router.get('/new_doctor', controller_admin.get_new_medecin)
router.post('/new_doctor', controller_admin.newdoctor)

router.get('/profile', controller_admin.get_profile_page)

router.get('/new_hospital', controller_admin.get_hospital)
router.post('/add_hospital', controller_admin.post_hospital )

router.get('/list_consult', controller_admin.get_list_consult)

module.exports = router;
