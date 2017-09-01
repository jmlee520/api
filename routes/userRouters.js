const   router          = require('express').Router();
const   passport        = require('passport'),
        passportConfig  = require('../config/passportConfig'),
        UserController  = require('../controllers/userController');
        
        
const   passportSignIn  = passport.authenticate('local',{session:false}),
        passportJWT     = passport.authenticate('jwt',{session:false});

// ROUTES
router.route('/signup')
    .post(UserController.signUp); 

router.route('/signin')
    .post(passportSignIn,UserController.signIn);

    //this can be done from client by deleteing token
router.route('/signout')
        .post(UserController.signOut);

router.route('/secret')
    .get(passportJWT,UserController.secret);


module.exports = router;

